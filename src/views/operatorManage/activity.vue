<template>
  <div class="operatorManage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('activity.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('activity.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('activity.crumbsTwo')}}</p>
        </div>
      </el-col>
    </el-row>
     
  <!-- -------------搜索查询栏------------------------ -->
  <search-filter :filter="filter" @search="search" @output="putExcel" :searchRight="$store.state.common.permiss.includes('RIGHT_OPERATE_ACTIVITY_QUERY')" :outputRight="$store.state.common.permiss.includes('RIGHT_OPERATE_ACTIVITY_EXP')"></search-filter>
  
  <!-- ------------  添加活动  ------------------------ -->
    <div class="search" v-if="$store.state.common.permiss.includes('RIGHT_OPERATE_ACTIVITY_ADD')">
      <el-row type="flex" justify="start" align="middle" :gutter="10">
        <el-col :span="3">
          <div class="search-add" @click="editActivity()">
            +{{$t('activity.edit')}}
          </div>
        </el-col>
      </el-row>
    </div>


  <!-- ------------  优惠券列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_OPERATE_ACTIVITY_LIST')">
      <template>
        <el-table :data="couponsList" size="small" stripe style="width: 100%"  empty-text>
          <el-table-column align="center" prop="id" :label="$t('serviceManage.index')">
          </el-table-column>
          <el-table-column align="center" prop="couponId" :label="$t('cash.id')">
          </el-table-column>
          <el-table-column align="center" :label="$t('filter.couponItem')">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType === 1">{{$t('filter.couponType.no1')}}</span>
              <span v-if="scope.row.couponType === 2">{{$t('filter.couponType.no2')}}</span>
              <span v-if="scope.row.couponType === 3">{{$t('filter.couponType.no3')}}</span>
              <span v-if="scope.row.couponType === 4">{{$t('filter.couponType.no4')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('filter.couponCon')">
            <template slot-scope="scope">
              <span v-if= "scope.row.couponType === 1">{{scope.row.couponAmount+''+scope.row.unit}}</span>
              <span v-if= "scope.row.couponType === 2">{{scope.row.couponDays+''+scope.row.unit}}</span>
              <span v-if= "scope.row.couponType === 3">{{scope.row.couponAmount+''+scope.row.unit}}</span>
              <span v-if= "scope.row.couponType === 4">{{scope.row.couponInterest+''+scope.row.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="effectiveDays" :label="$t('filter.expiryTypeOption.no2')">
          </el-table-column>
          <el-table-column align="center" :label="$t('filter.validTime')" width="200px">
            <template slot-scope="scope">
               <p>{{scope.row.strEffectiveTimeBegin?(scope.row.strEffectiveTimeBegin+'~'+scope.row.strEffectiveTimeEnd): ''}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="activityDateRange" :label="$t('filter.activityDateRange')" width="200px">
            <template slot-scope="scope">
               <p>{{scope.row.strActivityBegin?(scope.row.strActivityBegin+'~'+scope.row.strActivityEnd): ''}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('filter.couponTarget')" width="220px">
            <template slot-scope="scope">
              <span v-if= "scope.row.activityObject === 1">{{$t('filter.couponTargetOptions.no1')}}</span>
              <span v-if= "scope.row.activityObject === 2">{{$t('filter.couponTargetOptions.no2')}}</span>
              <span v-if= "scope.row.activityObject === 3">{{$t('filter.couponTargetOptions.no3')}}</span>
              <span v-if= "scope.row.activityObject === 4">{{$t('filter.couponTargetOptions.no4')}}</span>
              <span v-if= "scope.row.activityObject === 6">{{$t('filter.couponTargetOptions.no5')}}</span>
              <span v-if= "scope.row.activityObject === 7">{{$t('filter.couponTargetOptions.no6')}}</span>
              <span v-if= "scope.row.activityObject === 8">{{$t('filter.couponTargetOptions.no7')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="couponNumber" :label="$t('filter.everyDayPut')">
          </el-table-column>
          <el-table-column align="center" prop="couponGiveNumber" :label="$t('filter.getNum')">
          </el-table-column>
          <el-table-column align="center" prop="statusName" :label="$t('public.no22')">
            <template slot-scope="scope">
              <span v-if= "scope.row.status === 1">{{$t('filter.activityStatusOptions.no1')}}</span>
              <span v-if= "scope.row.status === 2">{{$t('filter.activityStatusOptions.no2')}}</span>
              <span v-if= "scope.row.status === 3">{{$t('filter.activityStatusOptions.no3')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('public.operation')">
            <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_OPERATE_ACTIVITY_EDIT')">
              <el-button @click="editActivity(scope.row)" type="text" size="small">{{$t('public.no51')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  <!-- ------------  添加活动弹框  ------------------------ -->
    <el-dialog :title="$t('filter.addModifyActivity')" :visible.sync="dialogFormVisible"  width="660px" :show-message="false">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item :label="$t('cash.id')" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.couponId"></el-input>
          <!-- <el-select v-model="form.couponId">
            <el-option :label="item.label" :value="item.value" v-for="(item, i) in couponIdList" :key="i"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item :label="$t('filter.couponTarget')" :label-width="formLabelWidth">
          <el-select v-model="form.activityObject">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in couponTargetOption" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('filter.twoGet')" prop="repeatNumber" :label-width="formLabelWidth" v-if="form.activityObject == 4">
          <el-input type="number" v-model="form.repeatNumber"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.validType')" :label-width="formLabelWidth">
          <el-select v-model="form.periodType">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in periodTypeOption" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('filter.expiryTypeOption.no2')" :label-width="formLabelWidth" v-if="form.periodType == 2 || form.periodType == '有效天数'">
          <el-input type="number" v-model="form.effectiveDays"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.expiryTypeOption.no1')" :label-width="formLabelWidth" v-if="form.periodType ==  1 || form.periodType == '时间范围'">
          <el-date-picker
            size="small"
            id="expiryDateRange"
            v-model="form.expiryDateRange" 
            value-format="yyyy-MM-dd"
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth"
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('filter.everyDayPut')" prop="couponNumber"   :label-width="formLabelWidth">
          <el-input type="number" v-model="form.couponNumber"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.activityDateRange')" :label-width="formLabelWidth">
           <el-date-picker
            size="small"
            id="activityTime"
            v-model="form.dateRange"
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth"
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="save">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    
  <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page.current"
            layout="total, prev, pager, next, ->"
            :total="page.total?page.total:0">
          </el-pagination>
        </div>
    </el-row>

  </div>
</template>
<script>
import searchFilter from '../../components/component/filter'
export default {
  name: 'operatorManage',
  components: {searchFilter},
  data () {
    var validateNum = (rule, value, callback) => {
      if ((!value || !/^[1-9]\d*$/.test(value))) {
        callback(new Error(this.$t('login.num')));
      } else {
        callback();
      }
    };
    var validateRepeatNumber = (rule, value, callback) => {
      if(this.form.activityObject === 4 && (!value || !/^[1-9]\d*$/.test(value))) {
        callback(new Error(this.$t('login.num')));
      } else {
        callback();
      }
    };
    return {
      condition: {},
      dialogFormVisible: false,
      formLabelWidth: '90px',
      couponsList: [],
      page:{
        current: 1,
        total: 0,
        size:10
      },
      filter: {
        couponId: '',
        couponType: '',
        couponTarget: '',
        activityStatus: '',
        dateRange: ''
      },
      couponTargetOption: this.$store.state.options.couponTargetOptions,
      periodTypeOption: this.$store.state.options.periodTypeOption,
      form: {
        couponId: '',
        activityObject: '',
        repeatNumber: '',
        periodType: '',
        effectiveDays: '',
        expiryDateRange: [],
        couponNumber: '',
        dateRange: []
      },
      flag: true,
      couponIdList: [],
      rules: {
        repeatNumber: [
          { validator: validateRepeatNumber, trigger: 'change' }
        ],
        couponNumber: [
          { validator: validateNum, trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    // this.fetchCouponID()
    this.fetchData ()
  },
  methods: {
    fetchCouponID () {
      const self = this
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.couponsSettingList,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach((item) => {
            self.couponIdList.push({label: item.id, value: item.id })
          })
        } else {
          self.$message.error(res.data.header.msg)
        }
      })
    },
    fetchData (condition) {
      const self = this
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.activityList,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        couponId: condition?condition.couponId: '',
        couponType: condition?condition.couponType: '',
        activityObject: condition?condition.couponTarget: '',
        status: condition?condition.activityStatus: '',
        activityTimeBegin: condition?condition.dateRange?condition.dateRange[0]:'': '',
        activityTimeEnd: condition?condition.dateRange?condition.dateRange[1]:'': ''
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          self.couponsList = res.data.data
          self.page.total = res.data.header.page.total
        }else {
          self.$message.error(res.data.header.msg)
        }
      })
    },
    search (condition) {
      const self= this
      self.page.current = 1
      self.condition = condition
      this.fetchData(self.condition)
    },
    putExcel (condition) {
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.activity_list_excel,
            'page': {'index': this.page.current, 'size': 10},
            'sessionid': sessionStorage.getItem('sessionid'),
          },
          couponId: condition?condition.couponId: '',
          couponType: condition?condition.couponType: '',
          activityObject: condition?condition.couponTarget: '',
          status: condition?condition.activityStatus: '',
          activityTimeBegin: condition?condition.dateRange[0]: '',
          activityTimeEnd: condition?condition.dateRange[1]: ''
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    },
    editActivity (obj) {
      const self = this
      self.dialogFormVisible = true
      if (obj) {
        obj.dateRange = []
        obj.expiryDateRange = []
        this.form = Object.assign({}, obj)
        
        if (this.form.periodType === 1 && obj.strEffectiveTimeBegin) {
          this.form.expiryDateRange.push(obj.strEffectiveTimeBegin)
          this.form.expiryDateRange.push(obj.strEffectiveTimeEnd)
        }
        this.form.dateRange.push(obj.strActivityBegin)
        this.form.dateRange.push(obj.strActivityEnd)
      } else {
        self.form = {
          couponId: '',
          activityObject: '',
          repeatNumber: '',
          periodType: '',
          effectiveDays: '',
          expiryDateRange: [],
          couponNumber: '',
          dateRange: []
        }
      }
    },
    save () {
      const self = this
      self.$refs.ruleForm.validate((valid) => {
        if (valid) {
          self.dialogFormVisible = false
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.activityEdit,
              sessionid: sessionStorage.getItem('sessionid')
            },
            id: self.form.id?self.form.id: '',
            couponId: self.form.couponId,
            activityObject: self.form.activityObject,
            repeatNumber: self.form.activityObject === 4?self.form.repeatNumber:'',
            periodType: self.form.periodType,
            effectiveTimeBegin: self.form.periodType === 1?self.form.expiryDateRange[0]: '',
            effectiveTimeEnd: self.form.periodType === 1?self.form.expiryDateRange[1]: '',
            effectiveDays: self.form.periodType === 2?self.form.effectiveDays: '',
            couponNumber: self.form.couponNumber,
            activityBegin: self.form.dateRange[0],
            activityEnd: self.form.dateRange[1],
          }
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              self.$message.success(self.$t('message.success'))
              this.fetchData()
            }else{
              self.$message.error(res.data.header.msg)
            }
          })
        } else {
          /* eslint-disable */
          console.log('error submit!!');
          return false;
        }
      })
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val
      this.fetchData(this.condition)
    }
  }
}
</script>
<style scoped lang="scss">
  @mixin flex-cen {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .operatorManage {
    width: 100%;
    height: auto;
    padding: 20px 30px;
    background-color: rgba(246, 249, 252, 1);
    position: relative;
    .paixu {
      width: 100%;
      height: 48px;
      line-height: 48px;
      background: rgba(224, 229, 246, 1);
      border-radius: 4px;
      span {
        display: block;
        float: left;
        margin-top: 10px;
        background-color: rgba(84, 126, 245, 1);
        width: 4px;
        height: 30px;
        border-radius: 5px;
      }
      p {
        color: rgba(84, 126, 245, 1);
        font-size: 16px;
        margin-left: 20px;
      }
      
    }
    .search {
      width: 100%;
      background-color: #ffffff;
      margin-top: 18px;
      margin-bottom: 22px;
      padding: 22px 28px 22px 5px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      .search-add{
        width: 114px;
        height: 100%;
        border: 1px solid #547ef6;
        border-radius:5px;
        text-align: center;
        line-height: 36px;
        color:#547ef5;
        margin-left: 30px;
        cursor:pointer;
      }
      .search-input {
        height: 50px;
        display: flex;
        align-items: center;
        // margin-right: 10px;
        & > span {
          padding: 0 5px;
          font-size: 14px;
          white-space: nowrap;
          @include flex-cen;
        }
        .el-input {
          flex: auto;
          @include flex-cen;
        }
        .el-date-editor {
          margin: 0 5px;
        }
        .el-select {
          flex: auto;
          @include flex-cen;
        }
        .el-button--primary{
          height: 40px;
          
        }
        .button-color{
          background-color: #1D7BFF;
          border-color: #547ef6;
        }
      }
    }
  }
</style>
