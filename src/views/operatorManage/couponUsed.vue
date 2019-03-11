<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('couponUsed.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('couponUsed.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('couponUsed.crumbsTwo')}}</p>
    </div>
     
  <!-- -------------搜索查询栏------------------------ -->
  <search-filter :filter="filter" @search="search" @output="putExcel" :searchRight="$store.state.common.permiss.includes('RIGHT_OPERATE_COUPON_USE_QUERY')" :outputRight="$store.state.common.permiss.includes('RIGHT_OPERATE_COUPON_USE_EXP')"></search-filter>
  
  <!-- ------------  优惠券列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_OPERATE_COUPON_USE_LIST')">
      <template>
        <el-table :data="couponsList" size="small" stripe>
          <el-table-column align="center" prop="userId" :label="$t('couponUsed.no1')">
          </el-table-column>
          <el-table-column align="center" prop="couponId" :label="$t('couponUsed.no2')">
          </el-table-column>
          <el-table-column align="center" :label="$t('couponUsed.no3')">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType === 1">{{$t('filter.couponType.no1')}}</span>
              <span v-if="scope.row.couponType === 2">{{$t('filter.couponType.no2')}}</span>
              <span v-if="scope.row.couponType === 3">{{$t('filter.couponType.no3')}}</span>
              <span v-if="scope.row.couponType === 4">{{$t('filter.couponType.no4')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('couponUsed.no4')">
            <template slot-scope="scope">
              <span v-if= "parseInt(scope.row.couponType) === 1">{{scope.row.couponAmount+''+scope.row.unit}}</span>
              <span v-if= "parseInt(scope.row.couponType) === 2">{{scope.row.couponDays+''+scope.row.unit}}</span>
              <span v-if= "parseInt(scope.row.couponType) === 3">{{scope.row.couponAmount+''+scope.row.unit}}</span>
              <span v-if= "parseInt(scope.row.couponType) === 4">{{scope.row.couponInterest+''+scope.row.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="effectiveDays" :label="$t('couponUsed.no5')">
          </el-table-column>
          <el-table-column align="center" prop="strReceiveTime" :label="$t('couponUsed.no6')">
          </el-table-column>
          <el-table-column align="center" :label="$t('couponUsed.no7')">
            <template slot-scope="scope">
               <p>{{scope.row.strEffectiveTimeBegin?(scope.row.strEffectiveTimeBegin+'~'+scope.row.strEffectiveTimeEnd): ''}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strUseTime" :label="$t('couponUsed.no8')">
          </el-table-column>
          <el-table-column align="center" :label="$t('couponUsed.no9')">
            <template slot-scope="scope">
              <span v-if= "scope.row.status === 1">{{$t('filter.couponStatusOptions.no1')}}</span>
              <span v-if= "scope.row.status === -1">{{$t('filter.couponStatusOptions.no2')}}</span>
              <span v-if= "scope.row.status === -2">{{$t('filter.couponStatusOptions.no3')}}</span>
              <span v-if= "scope.row.status === -3">{{$t('filter.couponStatusOptions.no4')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    
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
import searchFilter from '../../components/component/filter';
export default {
  name: 'public_main',
  components: {searchFilter},
  data () {
    return {
      condition: {},
      dialogFormVisible: false,
      formLabelWidth: '90px',
      couponsList: [],
      page: {
        current: 1,
        total: 0,
        size:10
      },
      filter: {
        userId: '',
        couponId: '',
        couponType: '',
        couponStatus: '',
        getDate: '',
        usedDate: ''
      },
      flag: true
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    fetchData (condition) {
      const self = this
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.couponUsed,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        type: 1,
        userId: condition?condition.userId: '',
        couponId: condition?condition.couponId:'',
        couponType: condition?condition.couponType:'',
        status: condition?condition.couponStatus: '',
        receiveTimeBegin:  condition?condition.getDate?condition.getDate[0]: '':'',
        receiveTimeEnd: condition?condition.getDate?condition.getDate[1]: '':'',
        useTimeBegin:  condition?condition.usedDate?condition.usedDate[0]: '':'',
        useTimeEnd: condition?condition.usedDate?condition.usedDate[1]: '':'',
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          self.couponsList = res.data.data;
          self.page.total = res.data.header.page.total;
        } else {
          self.$message.error(res.data.header.msg);
        }
      })
    },
    search (condition) {
      const self= this;
      self.page.current = 1;
      self.condition = condition;
      this.fetchData(self.condition);
    },
    putExcel (condition) {
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.couponUsed_list_excel,
            'page': {'index': this.page.current, 'size': 10},
            'sessionid': sessionStorage.getItem('sessionid')
          },
          type: 1,
          userId: condition?condition.userId: '',
          couponId: condition?condition.couponId:'',
          couponType: condition?condition.couponType:'',
          status: condition?condition.couponStatus: '',
          receiveTimeBegin:  condition?condition.getDate?condition.getDate[0]: '': '',
          receiveTimeEnd: condition?condition.getDate?condition.getDate[1]: '': '',
          useTimeBegin:  condition?condition.usedDate[0]?condition.usedDate[1]: '': '',
          useTimeEnd: condition?condition.usedDate[1]?condition.usedDate[1]: '': '',
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val;
      this.fetchData(this.condition);
    }
  }
}
</script>

<style scoped lang="scss">

</style>
