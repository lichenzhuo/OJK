<template>
  <div class="operatorManage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('couponSetting.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('couponSetting.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('couponSetting.crumbsTwo')}}</p>
        </div>
      </el-col>
    </el-row>

     
    <div class="search">
      <el-row type="flex" justify="start" align="middle" :gutter=10>
        <el-col :span="3">
          <div class="search-add" @click="editCoupons()" v-if="$store.state.common.permiss.includes('RIGHT_OPERATE_COUPON_ADD')">
            +{{$t('couponSetting.edit')}}
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- ------------  优惠券列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_OPERATE_COUPON_LIST')">
      <template>
        <el-table :data="couponsList" size="small" stripe style="width: 100%"  empty-text>
          <el-table-column align="center" prop="id" :label="$t('filter.couponId')">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('filter.couponName')">
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
              <span v-if= "parseInt(scope.row.couponType) === 1">{{scope.row.couponAmount}}</span>
              <span v-if= "parseInt(scope.row.couponType) === 2">{{scope.row.couponDays}}</span>
              <span v-if= "parseInt(scope.row.couponType) === 3">{{scope.row.couponAmount}}</span>
              <span v-if= "parseInt(scope.row.couponType) === 4">{{scope.row.couponInterest}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="unit" :label="$t('filter.couponUnit')">
          </el-table-column>
          <el-table-column align="center" :label="$t('public.operation')">
            <template slot-scope="scope">
              <el-button @click="editCoupons(scope.row)" type="text" size="small" v-if="$store.state.common.permiss.includes('RIGHT_OPERATE_COUPON_EDIT')">{{$t('public.no51')}}</el-button>
              <el-button @click="deleteCoupons(scope.row.id)" type="text" size="small" v-if="$store.state.common.permiss.includes('RIGHT_OPERATE_COUPON_DELETE')">{{$t('permission.del')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

  <!-- ------------  编辑优惠券弹框  ------------------------ -->
    <el-dialog title="添加/修改优惠券" :visible.sync="dialogFormVisible"  width="660px" >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item :label="$t('filter.couponName')" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.couponItem')" :label-width="formLabelWidth">
          <el-select v-model="form.couponType">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in option" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('filter.couponType.no1')" prop="couponAmount" :label-width="formLabelWidth" v-if="parseInt(form.couponType) === 1 || form.couponType  === ''">
          <el-input type="number" v-model="form.couponAmount"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.couponType.no2')" prop="couponDays" :label-width="formLabelWidth" v-if="parseInt(form.couponType) === 2">
          <el-input type="number" v-model="form.couponDays"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.couponType.no3')" prop="couponAmount" :label-width="formLabelWidth" v-if="parseInt(form.couponType) === 3">
          <el-input type="number" v-model="form.couponAmount"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.couponType.no4')" prop="couponInterest" :label-width="formLabelWidth" v-if="parseInt(form.couponType) === 4">
          <el-input type="number" v-model="form.couponInterest"></el-input>
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

export default {
  name: 'operatorManage',
  data () {
    var validateNum = (rule, value, callback) => {
      if ((!value || !/^[1-9]\d*$/.test(value))) {
        callback(new Error(this.$t('login.num')));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      formLabelWidth: '90px',
      page: {
        current: 1,
        total: 0,
        size: 10
      },
      couponsList: [],
      form: {
        name: '',
        couponType: '',
        couponAmount: '',
        couponDays: '',
        couponInterest: '',
      },
      rules: {
        couponAmount: [
          { validator: validateNum, trigger: 'change' }
        ],
        couponDays: [
          { validator: validateNum, trigger: 'change' }
        ],
        couponInterest: [
          { validator: validateNum, trigger: 'change' }
        ]
      },
      option: this.$store.state.options.couponType
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
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
          self.couponsList = res.data.data
          self.page.total = res.data.header.page.total
        } else {
          self.$message.error(res.data.header.msg)
        }
      })
    },
    editCoupons (obj) {
      const self = this
      self.dialogFormVisible = true
      if (obj) {
        this.form = Object.assign({}, obj)
      }else {
        this.form = {
          name: '',
          couponType: '',
          couponAmount: '',
          couponDays: '',
          couponInterest: '',
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
              action: this.$store.state.actionMap.couponsSettingEdit,
              sessionid: sessionStorage.getItem('sessionid')
            },
            id: self.form.id?self.form.id: '',
            name: self.form.name,
            couponType:  self.form.couponType,
            couponAmount:  (self.form.couponType === 1 || self.form.couponType === 3)?self.form.couponAmount: '',
            couponDays:  self.form.couponType === 2?self.form.couponDays: '',
            couponInterest:  self.form.couponType === 4?self.form.couponInterest: ''
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
      });
      
    },
    deleteCoupons (id) {
      const self = this
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.couponsSettingDelete,
          sessionid: sessionStorage.getItem('sessionid')
        },
        id:id,
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          self.$message.success(self.$t('message.success'))
          this.fetchData()
        }else{
          self.$message.error(res.data.header.msg)
        }
      })
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val
      this.fetchData()
    }
  }
}
</script>
<style scoped lang="scss">

  
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
      height: 80px;
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
