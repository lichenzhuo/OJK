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
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.orderId"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.userId"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.name"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.phone"></el-input>
          </div>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
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
          <span>{{$t('public.no53')}}:</span>
          <el-select size="small" v-model="formInline.isOverdue" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('add.no86')}}:</span>
          <el-select size="small" v-model="formInline.isNew" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options10" :key="item.value" :label="$t(item.label)" :value="item.value">
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
         <div class="search-input">
          <span>当前应还期数:</span>
          <el-select size="small" v-model="formInline.stages" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options11" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_EXP')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe v-loading="loadFlag">
          <el-table-column align="center" prop="id" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')">
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" label="借款金额">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')">
          </el-table-column>
          <el-table-column align="center" prop="feeAmount" label="服务费">
          </el-table-column>
          <!-- 利息 -->
          <el-table-column align="center" prop="currentInterest" :label="$t('public.no55')">
            <template slot-scope="scope">
              <span v-if="scope.row.currentInterest!==null&&scope.row.currentInterest!==undefined&&scope.row.currentInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.currentInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueInterestRate" label="逾期日利率">
          </el-table-column>
          <el-table-column align="center" prop="lendingAmount" label="到账金额">
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" label="累计逾期罚息">
          </el-table-column>
          <el-table-column align="center" prop="amountDue" label="应还总金额">
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" label="已还总金额">
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" label="剩余应还款总金额">
          </el-table-column>
          <!-- <el-table-column align="center" prop="overdueInterest" :label="$t('public.no56')">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')" >
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no57')">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no58')" width="86">
          </el-table-column>
          <el-table-column align="center" label="当期应还期数">
            <template slot-scope="scope">
              <span>{{scope.row.stages}}/{{scope.row.totalPeriod}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="strMustRefundTime" :label="$t('public.no59')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.no60')" width="86">
          </el-table-column> -->
          <el-table-column align="center" prop="orderDeviceType" :label="$t('add.no7')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.clientStatus(scope.row.orderDeviceType))}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" >
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no43')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.overDue(scope.row.overdueDays!=0?1:-1))}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.backList_rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isNew" :label="$t('add.no86')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.userTypeNewOldOther_status(scope.row.isNew))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('public.operation')" >
            <template slot-scope="scope">
              <span v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_SHOW')"      
                class="table_opr"
                @click="loanDetali(scope.row.orderNo)">
                {{$t('public.detail')}}
              </span>
              <!-- <span v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_DOWN')"
                class="table_opr" 
                @click="download(scope.row.contractPathUrl)">
                {{$t('public.no52')}}
              </span> -->
              <!-- <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_DEAL')">
                <span v-if="$store.state.common.lang==='id'&&(scope.row.status === 43||scope.row.status === 50)&&scope.row.dealStatus==0"
                  class="mg5" style="color:#547ef6;cursor:pointer" @click="handle(scope.row.id)">
                  {{$t('yn.no9')}}
                </span>
              </template> -->
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

    
    <!-- --------------还款计划----------------------------- -->
    <el-dialog title="还款计划" :visible.sync="dialogPlanVisible" width="1000px">
      <el-table :data="PlanData">
        <el-table-column label="期数" prop="stages" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.stages}}期</span>
          </template>
        </el-table-column>
        <el-table-column label="本期应还时间" prop="dueTime" width="120px" align="center"></el-table-column>
        <el-table-column label="本期应还本息" prop="amount" align="center"></el-table-column>
        <el-table-column label="本期逾期天数" prop="overDueDays" align="center"></el-table-column>
        <el-table-column label="本期逾期罚息" prop="overdueInterest" align="center"></el-table-column>
        <el-table-column label="本期应还金额" prop="returnMoney" align="center"></el-table-column>
        <el-table-column label="已还金额" prop="repayAmount" align="center"></el-table-column>
        <el-table-column label="还款状态" prop="status" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==51">已还清</span>
            <span v-else>未还清</span>
          </template>
        </el-table-column>
      </el-table>
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
      dialogPlanVisible:false,  //还款计划弹框
      PlanData:[],//还款计划数据
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
        name: '',
        orderDeviceType: '',
        phone: '',
        orderState: '',
        isOverdue: '',
        isNew: '',
        refundTimeBegin: '',
        refundTimeEnd: '',
        repayTimeBegin: '',
        repayTimeEnd: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        overdueBegin: '',
        overdueEnd: '',
        stages:'',
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.backMoney_options, // 订单状态下拉选框信息
      options2: this.$store.state.options.isOverdue_option, // 逾期状态下拉选框信息
      options6: this.$store.state.options.loanDevice_options, // 借款客户端
      options10: this.$store.state.options.userType_option, // 用户类型
      options11:[{value:1,label:'第一期'},{value:2,label:'其他期'},],
      tableData: []// 用户信息数据模拟

    }
  },
  methods: {
    //查看还款计划
    loanDetali(e){
      console.log(e)
       let option={
        header:{
          ...this.$base,
          action: this.$store.state.actionMap.OrderPlan,
          'sessionid': this.sessionid
        },
        orderNo:e
      }
      this.$axios.post('',option).then(res=>{
        if (res.data.header.code==0) {
          console.log(res,1111)
          this.PlanData=res.data.data
          this.dialogPlanVisible=true
        }else{

        }
        
      })
    },
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.backList(val);
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
    },
    
    select () { // 点击查询操作
      this.$store.commit('backMoneyList', this.formInline)
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.backList ();
      }
    },
    putExcel () { // excel下载
      if (this.flag) {
        this.flag = false;
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


</style>
