<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('finance.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('finance.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="paixu">
      <span></span>
      <p>{{$t('finance.crumbsTwo')}}</p>
    </div>
    
    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.orderId"></el-input>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderNo')}}:</span>
            <el-input size="small" label="orderNo" v-model="formInline.orderNo"></el-input>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" label="userId" v-model="formInline.userId"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>{{$t('finance.payType')}}:</span>
          <el-select size="small" v-model="formInline.payType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no53')}}:</span>
          <el-select size="small" v-model="formInline.isOverdue" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options4" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.CreateDate')}}:</span>
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
          <span>{{$t('public.backMoneyDate')}}:</span>
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
          <span>{{$t('public.no22')}}:</span>
          <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('filter.couponItem')}}:</span>
          <el-select size="small" v-model="formInline.couponType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options5" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input"
        v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPAY_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
        <div class="search-input"
        v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPAY_EXP')">
          <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPAY_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe v-loading="loadFlag">
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.no18')">
          </el-table-column>
          <el-table-column align="center" prop="couponType" :label="$t('filter.couponItem')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.couponTypeState(scope.row.couponType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="couponDays" :label="$t('filter.couponCon')">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType==1||scope.row.couponType==3||scope.row.couponType==5">{{$store.getters.moneySplit(scope.row.couponAmount)}}</span>
              <span v-else-if="scope.row.couponType==2">{{scope.row.couponDays+$t('public.no26')}}</span>
              <span v-else-if="scope.row.couponType==4">{{scope.row.couponInterest}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no54')">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')+'('+$t('public.no26')+')'">
          </el-table-column>
          <el-table-column align="center" prop="overdueInterestRate" :label="$t('proManage.overdueInterest')">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterestRate!=''">{{$store.getters.twoPoint(scope.row.overdueInterestRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')">
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="payType" :label="$t('finance.payType')">
          </el-table-column>
          <el-table-column align="center" prop="strApplyTime" :label="$t('public.CreateDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="contractNo" :label="$t('fei.loanId')">
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.backMoneyDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no43')">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueDays!=''">{{scope.row.overdueDays>0?$t('operationDetail.no11'):$t('operationDetail.no12')}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.no22')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.backMoneyLogStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" :label="$t('public.no37')">
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPAY_LIST')">
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
  name: 'backLogList',
  data () {
    return {
      flag: true,
      loadFlag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 订单创建时间数组
      searchTime2: [], // 申请成功时间数组
      // 用户查询信息数据对应字段
      formInline: {
        orderNo: '',
        orderId: '',
        userId: '',
        repaymentNo: '',
        payType: '',
        couponType: '',
        thirdChannel: '',
        paySuccessBegin: '',
        paySuccessEnd: '',
        createTimeBegin: '',
        createTimeEnd: '',
        status: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.backMoneyType_option_PHL, // 还款方式
      options2: this.$store.state.options.thirdChannel_vi, // 通道
      options3: this.$store.state.options.backMoneyLog_select, // 状态下拉选框信息
      options4: this.$store.state.options.isOverdue_option, // 逾期状态下拉选框信息
      options5: this.$store.state.options.couponType_option,// 优惠券类型下拉选框信息
      tableData: []// 用户信息数据模拟

    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.backMoneyList();
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.backMoneyList();
    },
    select () {
      this.$store.commit('backMoneyLogList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.backMoneyList();
      }
    },
    detail (orderNo, userId) { // 跳转详情页
      this.$router.push({path: '/loanmoneydetail', query: {userId, orderNo}});
    },
    putExcel () {
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.backMoney_logExcel,
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
    backMoneyList () {
      this.loadFlag = true;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.backMoney_logList,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }else{
          this.$globalMsg.error(res.data.header.msg)
        }
        this.loadFlag = false;
      })
    }
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.createTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.createTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.createTimeBegin = '';
        this.formInline.createTimeEnd = '';
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.paySuccessBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.paySuccessEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.paySuccessBegin = '';
        this.formInline.paySuccessEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.backMoneyLogList_select) !== '{}') {
      this.formInline = this.$store.state.common.backMoneyLogList_select;
      if(this.formInline.createTimeBegin!==''){
        this.searchTime1.push(this.formInline.createTimeBegin);
      this.searchTime1.push(this.formInline.createTimeEnd);
      }
      if(this.formInline.paySuccessBegin!==''){
        this.searchTime2.push(this.formInline.paySuccessBegin);
      this.searchTime2.push(this.formInline.paySuccessEnd);
      }
    }
    this.backMoneyList();
  }
}
</script>
<style scoped lang="scss">

</style>
