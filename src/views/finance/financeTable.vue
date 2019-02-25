<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('finance.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('finance.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="paixu">
      <span></span>
      <p>{{$t('finance.crumbsFour')}}</p>
    </div>
    
    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <!-- <div class="search-input">
          <span>{{$t('new.no49')}}:</span>
          <el-select size="small" clearable v-model="formInline.appPackage" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="search-input">
          <span>{{$t('totalManage.timeSelect')}}:</span>
          <form autocomplete="off">
            <el-date-picker 
              size="small"
              v-model="searchTime1" 
              type="daterange" 
              range-separator="~"
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </form>
        </div>
        <div class="search-input"
        v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPORT_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
        <div class="search-input"
        v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPORT_EXP')">
          <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPORT_LIST')">
      <template>
        <el-table 
          :data="tableData" 
          size="small" 
          :summary-method="getSummaries"
          show-summary
        >
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no58')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="productAmount" :label="$t('public.no54')" >
            <template slot-scope="scope">
              <span v-if="scope.row.productAmount!==null&&scope.row.productAmount!==undefined&&scope.row.productAmount!==''">{{$store.getters.moneySplit(scope.row.productAmount)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')">
          </el-table-column>
          <el-table-column align="center" prop="dayInterestRate" :label="$t('proManage.dayInterest')">
          </el-table-column>
          <el-table-column align="center" prop="feeRate" :label="$t('proManage.feeRate')">
          </el-table-column>
          <el-table-column align="center" prop="overdueInterestRate" :label="$t('proManage.overdueInterest')">
          </el-table-column>
          <el-table-column align="center" prop="loanCount" :label="$t('totalManage.lendingCount')" >
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('totalManage.amount')" min-width="130">
          </el-table-column>
          <el-table-column align="center" prop="refundCount" :label="$t('totalManage.realReturnCount')" >
          </el-table-column>
          <el-table-column align="center" prop="needRefundPrincipal" :label="$t('totalManage.no2')" min-width="130">
          </el-table-column>
          <el-table-column align="center" prop="needRefundInterest" :label="$t('totalManage.no3')" min-width="130">
          </el-table-column>
          <el-table-column align="center" prop="needRefundOverdueInterest" :label="$t('totalManage.no4')" min-width="130">
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('totalManage.no1')" min-width="130">
          </el-table-column>
          <el-table-column align="center" prop="couponAmount" :label="$t('new.no63')" >
          </el-table-column>
          <el-table-column align="center" prop="noRefundCount" :label="$t('totalManage.noReturnCount')" >
          </el-table-column>
          <el-table-column align="center" prop="noRefundPrincipal" :label="$t('totalManage.no5')" min-width="130">
          </el-table-column>
          <el-table-column align="center" prop="noRefundInterest" :label="$t('totalManage.no6')" min-width="130">
          </el-table-column>
          <el-table-column align="center" prop="noRefundOverdueInterest" :label="$t('totalManage.no7')" min-width="130">
          </el-table-column>
          <el-table-column align="center" prop="noRefundAmount" :label="$t('totalManage.no8')" min-width="130">
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPORT_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="sizes, prev, pager, next, total,->"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="pageNumber"
          @size-change="handleSizeChange"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>


    <div class="foot"></div>
    

  </div>
</template>
<script>
export default {
  name: 'financeTable',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 订单创建时间数组
      // 用户查询信息数据对应字段
      formInline: {
        loanTimeBegin: "",
        loanTimeEnd: "",
        appName: "",
        appPackage: ""
      },
      currentPage:1,//当前页下标
      options1: [],// APP名
      options2: [],// APP包名
      tableData: [],
      tableData1: {}
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.backMoneyList();
    },
    handleCurrentChange (val) {
      this.backMoneyList(val);
    },
    select () {
      this.backMoneyList();
    },
    putExcel () {
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.financetable_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
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
    backMoneyList (val) {
      this.tableData1 = [];
      if(val){
        this.currentPage = val;
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.financetable,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data['accountReportList'];
          this.tableData1 = res.data.data['accountReportTotal'];
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    getAppName () { // 获取app名字和包名
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.select_allData,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data.package;
          arr.forEach(value => {
            this.options1.push({value: value.optionName, label: value.optionName});
            this.options2.push({value: value.optionValue, label: value.optionValue});
          })
          this.addContent = true;
        }
      })
    },
    getSummaries() {
      const sums = [
        this.$t('public.addTotal'),
        '-',
        '-',
        '-',
        '-',
        '-',
        this.tableData1.loanCount,
        this.tableData1.loanAmount,
        this.tableData1.refundCount,
        this.tableData1.needRefundPrincipal,
        this.tableData1.needRefundInterest,
        this.tableData1.needRefundOverdueInterest,
        this.tableData1.refundAmount,
        this.tableData1.couponAmount,
        this.tableData1.noRefundCount,
        this.tableData1.noRefundPrincipal,
        this.tableData1.noRefundInterest,
        this.tableData1.noRefundOverdueInterest,
        this.tableData1.noRefundAmount,
      ];
      return sums;
    }
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.loanTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.loanTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.loanTimeBegin = '';
        this.formInline.loanTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.backMoneyList();
    this.getAppName();
  }
}
</script>
<style scoped lang="scss">

</style>
