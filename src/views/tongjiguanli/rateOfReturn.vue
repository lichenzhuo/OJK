<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('totalManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('totalManage.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('totalManage.crumbsTwo')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>{{$t('totalManage.timeSelect')}}:</span>
          <el-date-picker 
            v-model="searchTime" 
            size="small"
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_REPORT_REPAY_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_REPORT_REPAY_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table">
      <template>
        <el-table :data="tableData" size="small" 
          :summary-method="getSummaries"
          show-summary
          >
          <el-table-column align="center" prop="strRefundTime" :label="$t('public.no69')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.strRefundTime!==null&&scope.row.strRefundTime!==undefined&&scope.row.strRefundTime!==''">{{scope.row.strRefundTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="shouldReturnCount" :label="$t('totalManage.returnCount')">
          </el-table-column>
          <el-table-column align="center" prop="newCustomerRate" :label="$t('add.no80')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.newCustomerRate)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundCount" :label="$t('add.no81')">
          </el-table-column>
          <el-table-column align="center" prop="d0" label="D0">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d0)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d1" label="D1">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d1)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d2" label="D2">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d2)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d3" label="D3">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d3)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d4" label="D4">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d4)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d5" label="D5">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d5)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d6" label="D6">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d6)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d7" label="D7">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d7)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d8" label="D8">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d8)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d9" label="D9">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d9)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d10" label="D10">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d10)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d15" label="D15">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d15)}}%</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="d15More" label="D15+">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.d15More)}}%</span>
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
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'rateOfReturn',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0,
      searchTime: [],
      // 用户查询信息数据对应字段
      formInline: {
        period:'',
        dayBegin: '',
        dayEnd: ''
      },
      // 当前页下标
      currentPage: 1,
      // 用户信息数据模拟
      tableData:[],
      tableData1:[]
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getTableData();
    },
    getTableData () { // 获取回款率列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_rate,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data.payBackRateReportList;
          this.tableData1 = res.data.data.payBackRateReportAll;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 搜索栏查询按钮点击操作
      this.$store.commit('rateOfReturn', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.getTableData();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.back_rate_excel,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          ...this.formInline
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
    getSummaries() {// 总和
      let sums;
      sums = [
        this.$t('public.addTotal'),
        this.tableData1.shouldReturnCount,
        this.$store.getters.twoPoint(this.tableData1.newCustomerRate)+'%',
        this.tableData1.refundCount,
        this.$store.getters.twoPoint(this.tableData1.d0)+'%',
        this.$store.getters.twoPoint(this.tableData1.d1)+'%',
        this.$store.getters.twoPoint(this.tableData1.d2)+'%',
        this.$store.getters.twoPoint(this.tableData1.d3)+'%',
        this.$store.getters.twoPoint(this.tableData1.d4)+'%',
        this.$store.getters.twoPoint(this.tableData1.d5)+'%',
        this.$store.getters.twoPoint(this.tableData1.d6)+'%',
        this.$store.getters.twoPoint(this.tableData1.d7)+'%',
        this.$store.getters.twoPoint(this.tableData1.d8)+'%',
        this.$store.getters.twoPoint(this.tableData1.d9)+'%',
        this.$store.getters.twoPoint(this.tableData1.d10)+'%',
        this.$store.getters.twoPoint(this.tableData1.d15)+'%',
        this.$store.getters.twoPoint(this.tableData1.d15More)+'%',
      ]
      return sums;
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.dayBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.dayEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.dayBegin = '';
        this.formInline.dayEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.huikuanlv_select) !== '{}') {
      this.formInline = this.$store.state.common.huikuanlv_select;
      if(this.formInline.dayBegin!==''){
        this.searchTime.push(this.formInline.dayBegin);
        this.searchTime.push(this.formInline.dayEnd);
      }
    }
    this.getTableData();
  }
}
</script>

<style scoped lang="scss">
  
</style>
