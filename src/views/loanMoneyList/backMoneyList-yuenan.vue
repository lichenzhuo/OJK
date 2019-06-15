<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="paixu">
      <span></span>
      <p>{{$t('loanMoney.title')}}</p>
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
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" label="userId" v-model="formInline.userId"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" label="name" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no2')}}:</span>
            <el-input size="small" label="idCard" v-model="formInline.idCard"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no53')}}:</span>
          <el-select size="small" v-model="formInline.isOverdue" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('add.no7')}}:</span>
          <el-select size="small" v-model="formInline.orderDeviceType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options6" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no59')}}:</span>
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
          <span>{{$t('public.no28')}}:</span>
          <el-input size="small" style="width:80px" v-model="formInline.overdueBegin"></el-input>
          ~
          <el-input size="small" style="width:80px" v-model="formInline.overdueEnd"></el-input>
        </div>
        <template v-if="$store.state.common.lang==='vi'">
          <div class="search-input">
            <span>{{$t('websiteLoans.no5')}}:</span>
            <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options4" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        <div class="search-input">
          <span>{{$t('public.no58')}}:</span>
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
        <div class="search-input">
          <span>{{$t('public.no60')}}:</span>
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_QUERY')">
          <div class="search-input">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_EXP')">
          <div class="search-input">
            <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe v-loading="loadFlag">
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" >
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" >
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" >
          </el-table-column>
          <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')" >
            <template slot-scope="scope">
              <span v-if="scope.row.orderLoanType!==null&&scope.row.orderLoanType!==undefined&&scope.row.orderLoanType!==''">{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="idCard" :label="$t('public.no2')" >
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no54')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" >
          </el-table-column>
          <el-table-column align="center" prop="currentInterest" :label="$t('public.no55')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.currentInterest!==null&&scope.row.currentInterest!==undefined&&scope.row.currentInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.currentInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" :label="$t('public.no56')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no57')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no58')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="strMustRefundTime" :label="$t('public.no59')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.no60')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="orderDeviceType" :label="$t('add.no7')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.clientStatus(scope.row.orderDeviceType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" >
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no43')" >
            <template slot-scope="scope">
              <span v-if="scope.row.overdueDays!==null&&scope.row.overdueDays!==undefined&&scope.row.overdueDays!==''">{{$t($store.getters.overDue(scope.row.overdueDays!=0?1:-1))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" >
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.backList_rejectStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="240">
            <template slot-scope="scope">
              <span class="table_opr" @click="detail(scope.row.orderNo,scope.row.userId)">{{$t('public.detail')}}</span>
              <template>
                <span 
                  v-if="scope.row.status!==51"
                  class="table_opr" 
                  @click="sure(scope.row.orderNo)">
                  {{$t('public.no61')}}
                </span>
              </template>
              <span class="table_opr" @click="modify(scope.row.id)">{{$t('public.no51')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row  type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_LIST')">
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

    <!-- 确认还款弹窗 -->
    <el-dialog :title="$t('public.no61')" :visible.sync="flag1"  width="660px" :show-message="false">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="160px" size="medium">
        <el-form-item :label="$t('public.no57')" prop="amount" >
          <el-input type="text" v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.no83')" prop="transId" >
          <el-input type="text" v-model="form.transId"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.no60')" prop="repayTime">
           <el-date-picker
            size="small"
            v-model="form.repayTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :placeholder="$t('public.backMoneyDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('public.orderStatus')"  prop="repayType" >
          <el-select v-model="form.repayType">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in options3" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('yuenan.no27')" prop="backChannel">
          <el-select v-model="form.payType" :placeholder="$t('public.placeholder')">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in backChannel" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('public.no37')" prop="remark" >
          <el-input type="textarea" v-model="form.remark" :rows="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sureSubmit('ruleForm1')">{{$t('operationDetail.no22')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改弹窗 -->
    <el-dialog :title="$t('public.no61')" :visible.sync="modifyFlag"  width="1200px" :show-message="false">
      <el-table 
        :data="modifyData" 
        size="small" 
        style="width:100%" 
        highlight-current-row
        @current-change="tableRowChange">
        <el-table-column align="right" label="" width="60">
            <template slot-scope="scope">
              <template>
                <el-radio v-model="radioVal"
                          :label="scope.row.id"
                          >&nbsp;
                </el-radio>
              </template>
            </template>
          </el-table-column>
        <el-table-column align="center" prop="id" :label="$t('public.backMoneyId')">
        </el-table-column>
        <el-table-column align="center" prop="btId" :label="$t('public.no83')">
        </el-table-column>
        <el-table-column align="center" prop="userName" :label="$t('public.name')" >
        </el-table-column>
        <el-table-column align="center" prop="phone" :label="$t('public.userTel')" >
        </el-table-column>
        <el-table-column align="center" prop="loanAmount" :label="$t('public.no54')">
          <template slot-scope="scope">
            <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
            <span v-else>{{$store.state.common.nullData}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" >
        </el-table-column>
        <el-table-column align="center" prop="repaymentAmount" :label="$t('public.no65')" >
          <template slot-scope="scope">
            <span v-if="scope.row.repaymentAmount!==null&&scope.row.repaymentAmount!==undefined&&scope.row.repaymentAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.repaymentAmount)}}{{$store.state.common.vi_currency}}</span>
            <span v-else>{{$store.state.common.nullData}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="payType" :label="$t('finance.payType')">
        </el-table-column>
        <el-table-column align="center" prop="strUpdateTime" :label="$t('public.no60')" width="86">
        </el-table-column>
        <el-table-column align="center" prop="repaymentResult" :label="$t('add.no52')">
          <template >
            <span>{{$t('add.no53')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" :label="$t('public.no37')">
        </el-table-column>
      </el-table>
      <div class="foot"></div>
      <el-form :model="modifyForm" label-width="140px" :inline="true" size="medium">
        <el-form-item :label="$t('public.no57')" >
          <el-input type="text" style="width:200px;" :disabled="modifyForm.repaymentResult==-1" v-model="modifyForm.repaymentAmount"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.no83')" >
          <el-input type="text" style="width:200px;" :disabled="modifyForm.repaymentResult==-1" v-model="modifyForm.btId"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('public.orderStatus')">
          <el-select v-model="modifyForm.status" :disabled="modifyForm.repaymentResult==-1" :placeholder="$t('public.placeholder')">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in modify_orderStatus " :key="i"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="$t('yuenan.no27')">
          <el-select v-model="modifyForm.payType" :disabled="modifyForm.repaymentResult==-1" :placeholder="$t('public.placeholder')">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in backChannel" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('public.no60')" >
           <el-date-picker
            :disabled="modifyForm.repaymentResult==-1"
            size="small"
            v-model="modifyForm.repayTime"
            type="datetime"
            :placeholder="$t('public.backMoneyDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('add.no52')">
          <el-select v-model="modifyForm.repaymentResult" :placeholder="$t('public.placeholder')">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in options7" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('public.no37')" >
          <el-input type="textarea" style="width:400px;" v-model="modifyForm.remark" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div  class="dialog-footer">
        <!-- <el-button @click="modifyFlag = false">{{$t('public.no50')}}</el-button> -->
        <el-button type="primary" @click="modifySure">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    
    <!-- 底部多出空白 -->
    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'backMoneyList',
  data () {
    return {
      flag: true,
      loadFlag: true,
      sessionid: '',
      pageTotal: 0,// 当前页数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 还款时间
      searchTime2: [], // 应还时间
      searchTime3: [], // 放款日期
      formInline: {// 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        userId: '',
        idCard: '',
        orderDeviceType: '',
        name: '',
        phone: '',
        orderLoanType: '',
        orderState: '',
        isOverdue: '',
        refundTimeBegin: '',
        refundTimeEnd: '',
        repayTimeBegin: '',
        repayTimeEnd: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        overdueBegin: '',
        overdueEnd: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.backMoney_options, // 订单状态下拉选框信息
      options2: this.$store.state.options.isOverdue_option, // 逾期状态下拉选框信息
      options3: this.$store.state.options.backOrder_status, // 确认还款弹窗还款状态下拉选框信息
      options4: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      options6: this.$store.state.options.loanDevice_options, // 借款客户端
      options7: this.$store.state.options.backSuccessOrfailed_option, // 借款客户端
      tableData: [],// 用户信息数据模拟
      flag1: false,// 确认还款弹窗开关
      orderNo_dialog: '',// 弹窗选中orderNo
      form: {
        repayType: '',
        amount: '',
        repayTime: '',
        transId: '',
        payType: '',
        remark: '',
        repaymentResult: '',
      },
      rules:{
        amount: [
          { required:true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        transId: [
          { required:true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        repayTime: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        repayType: [
          { required:true, message: this.$t('login.required'), trigger: 'change' }
        ],
        payType: [
          { required:true, message: this.$t('login.required'), trigger: 'change' }
        ],
        remark: [
          { required:true, message: this.$t('login.required'), trigger: 'blur' }
        ],
      },
      modifyFlag: false,
      modifyData: [],
      tableSelect: '',
      modifyId: '',
      radioVal: '',
      modifyForm:{
        btId: '',
        id: '',
        status: '',
        repaymentAmount: '',
        repayTime: '',
        payType: '',
        remark: '',
        repaymentResult: '',
      },
      backChannel: this.$store.state.options.backMoney_backType_vi,// 还款渠道
      modify_orderStatus: this.$store.state.options.partialRepaymentApplyOption// 弹窗订单状态
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.backList();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.backList (val);
    },
    backList (val) { // 获取还款列表数据
      this.loadFlag = true;
      if(val){
        this.currentPage = val;
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.backmoney_list,
          'page': {'index': this.currentPage, 'size': 10},
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
    },
    select () { // 点击查询操作
      this.$store.commit('backMoneyList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.backList ();
      }
    },
    putExcel () { // excel下载
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.backMoneyList_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            window.location.href = res.data.data.fileName;
          }
        })
      }
    },
    sure (orderNo) { // 确认还款弹窗
      if (orderNo) {
        this.form.repayType = '';
        this.form.amount = '';
        this.form.repayTime = '';
        this.form.remark = '';
        this.form.transId = '';
        this.orderNo_dialog = orderNo;
        this.flag1 = true;
      }
    },
    sureSubmit () {// 确认还款操作
      const self = this;
      self.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.sure_backmoney,
              sessionid: sessionStorage.getItem('sessionid')
            },
            ...self.form,
            orderNo: this.orderNo_dialog
          }
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              self.$message.success(self.$t('message.success'));
              this.backList();
            }else{
              self.$message.error(res.data.header.msg);
            }
          })
          this.flag1 = false;
        } else {
          return false;
        }
      })
    },
    detail (orderNo, userId) { // 跳转详情页
      this.$router.push({path: '/loanmoneydetail', query: {userId, orderNo}});
    },
    modify(id){
      this.getModifyData(id);
    },
    getModifyData(id){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ORDER0010,
          'sessionid': this.sessionid
        },
        orderId:id
      }
      this.$axios.post('', option).then(res => {
        this.modifyFlag = true;
        if (res.data.header.code == 0) {
          this.modifyData = res.data.data;
        }
      })
    },
    modifySure(){
      const self = this
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ORDER0011,
          sessionid: this.sessionid
        },
        ...self.modifyForm
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          self.$message.success(self.$t('message.success'));
          this.backList();
        }else{
          self.$message.error(res.data.header.msg);
        }
      })
      this.modifyFlag = false;
    },
    tableRowChange (val) {
      this.tableSelect = val.id;
      this.radioVal = val.id;
      this.modifyForm.btId = val.btId;
      this.modifyForm.id = val.id;
      this.modifyForm.status = val.status;
      this.modifyForm.repaymentAmount = val.repaymentAmount;
      this.modifyForm.repayTime = val.strUpdateTime;
      this.modifyForm.payType = val.payType;
      this.modifyForm.remark = val.remark;
      this.modifyForm.repaymentResult = 1;
    }
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.refundTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.refundTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.refundTimeBegin = '';
        this.formInline.refundTimeEnd = '';
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.repayTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.repayTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.repayTimeBegin = '';
        this.formInline.repayTimeEnd = '';
      }
    },
    searchTime3 () {
      if (this.searchTime3) {
        this.formInline.loanTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime3[0]);
        this.formInline.loanTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime3[1]);
      } else {
        this.formInline.loanTimeBegin = '';
        this.formInline.loanTimeEnd = '';
      }
    },
    modifyFlag(){
      if(!this.modifyFlag){
        this.tableSelect = '';
        this.radioVal = '';
        this.modifyForm.btId = '';
        this.modifyForm.id = '';
        this.modifyForm.status = '';
        this.modifyForm.repaymentAmount = '';
        this.modifyForm.repayTime = '';
        this.modifyForm.payType = '';
        this.modifyForm.remark = '';
        this.modifyForm.repaymentResult = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.backMoneyList_select) !== '{}') {
      this.formInline = this.$store.state.common.backMoneyList_select;
      if(this.formInline.refundTimeBegin!==''){
        this.searchTime1.push(this.formInline.refundTimeBegin);
        this.searchTime1.push(this.formInline.refundTimeEnd);
      }
      if(this.formInline.repayTimeBegin!==''){
        this.searchTime2.push(this.formInline.repayTimeBegin);
        this.searchTime2.push(this.formInline.repayTimeEnd);
      }
      if(this.formInline.loanTimeBegin!==''){
        this.searchTime3.push(this.formInline.loanTimeBegin);
        this.searchTime3.push(this.formInline.loanTimeEnd);
      }
    }
    this.backList();
  }
}
</script>
<style scoped lang="scss">

.el-dialog__body{
  padding-bottom: 0;
}
.dialog-footer{
  padding-left: 160px;
  text-align: left;
}


</style>
