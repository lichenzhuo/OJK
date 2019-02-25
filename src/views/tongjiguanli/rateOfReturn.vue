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
          <span>{{$t('proManage.period')}}:</span>
          <el-input size="small" label="orderId" v-model="formInline.period"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('totalManage.timeSelect')}}:</span>
          <el-date-picker 
            id="date1"
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
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')">
          </el-table-column>
          <el-table-column align="center" prop="shouldReturnCount" :label="$t('totalManage.returnCount')">
          </el-table-column>
          <el-table-column align="center" prop="receivableAmount" :label="$t('totalManage.returnMoney')">
            <template slot-scope="scope">
              <span v-if="scope.row.receivableAmount!==null&&scope.row.receivableAmount!==undefined&&scope.row.receivableAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.receivableAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundCount" :label="$t('totalManage.realReturnCount')">
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('totalManage.realReturnMonry')">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="unpaidCount" :label="$t('totalManage.noReturnCount')">
          </el-table-column>
          <el-table-column align="center" prop="unpaidAmount" :label="$t('totalManage.noReturnMonry')">
            <template slot-scope="scope">
              <span v-if="scope.row.unpaidAmount!==null&&scope.row.unpaidAmount!==undefined&&scope.row.unpaidAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.unpaidAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="moneyRate" :label="$t('totalManage.overDueNow')+'('+$t('totalManage.money')+')'">
            <template slot-scope="scope">
              <span v-if="scope.row.moneyRate!==null&&scope.row.moneyRate!==undefined&&scope.row.moneyRate!==''">{{$store.getters.twoPoint(scope.row.moneyRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="countRate" :label="$t('totalManage.overDueNow')+'('+$t('totalManage.order')+')'">
            <template slot-scope="scope">
              <span v-if="scope.row.countRate!==null&&scope.row.countRate!==undefined&&scope.row.countRate!==''">{{$store.getters.twoPoint(scope.row.countRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
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
          this.tableData = res.data.data.remittanceList;
          this.tableData1 = res.data.data.remittanceAll;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 搜索栏查询按钮点击操作
      this.$store.commit('rateOfReturn', this.formInline);
      if (this.flag) {
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
    getSummaries() {
      const sums = [
        this.$t('public.addTotal'),
        '-',
        this.tableData1.shouldReturnCount,
        this.$store.getters.moneySplit(this.tableData1.receivableAmount),
        this.tableData1.refundCount,
        this.$store.getters.moneySplit(this.tableData1.refundAmount),
        this.tableData1.unpaidCount,
        this.$store.getters.moneySplit(this.tableData1.unpaidAmount),
        this.$store.getters.twoPoint(this.tableData1.moneyRate)+'%',
        this.$store.getters.twoPoint(this.tableData1.countRate)+'%',
      ];
      return sums;
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.dayBegin = this.searchTime[0];
        this.formInline.dayEnd = this.searchTime[1];
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
