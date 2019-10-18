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
        <div class="search-input">
          <span>{{$t('public.orderId')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.orderId"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.userId')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.userId"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.backId')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.repaymentNo"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.putId')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.transactionId"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select clearable  size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('auditManage.no8')}}:</span>
          <el-select clearable  size="small" v-model="formInline.thirdChannel" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input" v-if="$store.state.common.lang==='id'">
          <span>{{$t('finance.payType')}}:</span>
          <el-select clearable  size="small" v-model="formInline.payType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('finance.successTime')}}:</span>
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
        <div class="search-input">
          <span>{{$t('public.no66')}}:</span>
          <form autocomplete="off">
            <el-date-picker 
              size="small"
              v-model="searchTime2" 
              type="daterange" 
              range-separator="~"  
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </form>
        </div>
        <div class="search-input">
          <span>{{$t('public.CreateTime')}}:</span>
          <form autocomplete="off">
            <el-date-picker 
              size="small"
              v-model="searchTime3" 
              type="daterange" 
              range-separator="~"  
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </form>
        </div>
        <div class="search-input"
          v-if="$store.state.common.permiss.includes('RIGHT_FINANCIALSTATISTICS_REPORT_QUERY')">
          <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
        </div>
        <div class="search-input"
          v-if="$store.state.common.permiss.includes('RIGHT_FINANCIALSTATISTICS_REPORT_EXP')">
          <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <p style="font-size:14px;color:red;margin-bottom:5px;">注：实际打款金额=本金-头息<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在贷金额=应还本金+应还利息-已还本金-已还利息<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;减免利息，减免罚息：总的减免金额，先计入减免利息，若减免金额>应还利息，剩余的计入减免罚息</p>
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_FINANCIALSTATISTICS_REPORT_LIST')">
      <template>
        <el-table :data="tableData" size="small" >
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" >
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" >
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" >
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="transactionId" :label="$t('public.putId')" >
            <template  slot-scope="scope">
              <template v-if="scope.row.listLoan&&scope.row.listLoan.length">
                <el-popover
                  placement="top-start"
                  title="历史流水号"
                  width="200"
                  trigger="hover"
                  :content="scope.row.listLoan.map((value,index)=>{return `${index+1}:${value}`}).join()">
                  <span slot="reference">{{scope.row.transactionId}}</span>
                </el-popover>
              </template>
              <span v-else>{{scope.row.transactionId}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="repaymentNo" :label="$t('public.backId')" >
            <template  slot-scope="scope">
              <template v-if="scope.row.listRepay&&scope.row.listRepay.length">
                <el-popover
                  placement="top-start"
                  title="历史流水号"
                  width="200"
                  trigger="hover"
                  :content="scope.row.listRepay.map((value,index)=>{return `${index+1}:${value}`}).join()">
                  <span slot="reference">{{scope.row.repaymentNo}}</span>
                </el-popover>
              </template>
              <span v-else>{{scope.row.repaymentNo}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="lendingAmount" :label="$t('add.no95')" >
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')">
          </el-table-column>
          <el-table-column align="center" prop="dayInterestRate" :label="$t('proManage.dayInterest')">
          </el-table-column>
          <el-table-column align="center" prop="feeRate" :label="$t('proManage.feeRate')">
          </el-table-column>
          <el-table-column align="center" prop="overdueInterestRate" :label="$t('proManage.overdueInterest')">
          </el-table-column>
          <!-- 应还本金 -->
          <el-table-column align="center" prop="loanAmount" :label="$t('totalManage.no2')" >
          </el-table-column>
          <el-table-column align="center" prop="currentInterest" :label="$t('totalManage.no3')" >
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" :label="$t('totalManage.no4')" >
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')" >
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('finance.successDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strMustRefundTime" :label="$t('add.no96')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.no66')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" >
          </el-table-column>
          <el-table-column align="center" prop="loaningAmount" :label="$t('add.no97')" >
          </el-table-column>
          <el-table-column align="center" prop="couponType" :label="$t('filter.couponItem')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.couponTypeState(scope.row.couponType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="couponAmount" :label="$t('add.no98')" >
          </el-table-column>
          <el-table-column align="center" prop="couponAmountInterest" :label="$t('filter.interest')" >
          </el-table-column>
          <el-table-column align="center" prop="couponAmountOverdue" :label="$t('add.no99')" >
          </el-table-column>
          <template v-if="$store.state.common.lang!=='id'">
            <el-table-column align="center" prop="thirdChannel" :label="$t('auditManage.no8')" >
              <template  slot-scope="scope">
                <template v-if="scope.row.listChannel&&scope.row.listChannel.length">
                  <el-popover
                    placement="top-center"
                    title="历史渠道"
                    width="300"
                    trigger="hover"
                    :content="scope.row.listChannel.map((value,index)=>{return `${index+1}: ${value}`}).join()">
                    <span slot="reference">{{scope.row.thirdChannel}}</span>
                  </el-popover>
                </template>
                <span v-else>{{scope.row.thirdChannel}}</span>
              </template>
				    </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" prop="payType" :label="$t('finance.payType')">
            </el-table-column>
            <el-table-column align="center" prop="bankName" :label="$t('public.no19')">
            </el-table-column>
            <el-table-column align="center" prop="thirdChannel" :label="$t('finance.channel')">
            </el-table-column>
          </template>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_FINANCIALSTATISTICS_REPORT_LIST')">
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
      currentPage:1,//当前页下标
      searchTime1: [], // 打款成功时间
      searchTime2: [], // 实际还款时间
      searchTime3: [], // 应还款时间
      formInline: {// 查询信息数据对应字段
        loanTimeBegin: "",
        loanTimeEnd: "",
        lastRefundTimeBegin: "",
        lastRefundTimeEnd: "",
        mustRefundTimeBegin: "",
        mustRefundTimeEnd: "",
        orderId: "",
        transactionId: "",
        repaymentNo: "",
        status: "",
        payType: "",
        thirdChannel: "",
        userId: ""
      },
      options1: this.$store.state.options.overdueOrderStatusOptions,// 订单状态
      options2: '', // 通道
      options3: this.$store.state.options.backMoneyType_option, // 通道
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.getTableData();
    },
    handleCurrentChange (val) {
      this.getTableData(val);
    },
    select () {
      this.currentPage = 1;
      this.getTableData();
    },
    putExcel () {
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.AR0004,
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
    getTableData (val) {
      if(val){
        this.currentPage = val;
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.AR0003,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data.listnew;
          this.pageTotal = res.data.header.page.total;
        }
      })
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
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.lastRefundTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.lastRefundTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.lastRefundTimeBegin = '';
        this.formInline.lastRefundTimeEnd = '';
      }
    },
    searchTime3 () {
      if (this.searchTime3) {
        this.formInline.mustRefundTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime3[0]);
        this.formInline.mustRefundTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime3[1]);
      } else {
        this.formInline.mustRefundTimeBegin = '';
        this.formInline.mustRefundTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableData();
    if(this.$store.state.common.lang==='id'){
      this.options2 = this.$store.state.options.thirdChannel
    }else if(this.$store.state.common.lang==='PHL'){
      this.options2 = this.$store.state.options.backMoneyType_option_PHL
    }else {
      this.options2 = this.$store.state.options.backMoney_backType_vi
    }
  }
}
</script>

<style scoped lang="scss">

</style>
