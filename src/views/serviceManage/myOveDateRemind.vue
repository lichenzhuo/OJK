<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('serviceManage.crumbsThree')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('serviceManage.crumbsThree')}}</p>
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
          <div class="search-input">
            <span>{{$t('new.no34')}}:</span>
            <el-select size="small" v-model="formInline.serviceStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('public.orderStatus')}}:</span>
            <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('public.no28')}}:</span>
            <el-input size="small"  style="width:50px;" v-model="formInline.overdueBegin"></el-input>
            ~
            <el-input size="small"  style="width:50px;" v-model="formInline.overdueEnd"></el-input>
          </div>
        <template v-if="$store.state.common.lang==='vi'">
            <div class="search-input">
              <span>{{$t('websiteLoans.no5')}}:</span>
              <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
        </template>
          <div class="search-input">
            <span>{{$t('public.no58')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
          <div class="search-input">
            <span>{{$t('public.no59')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime1" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
          <div class="search-input">
            <span>{{$t('serviceManage.paidantime')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime2" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
          <div class="search-input" v-if="$store.state.common.lang==='PHL'">
            <span>{{$t('fei.no15')}}:</span>
            <el-input size="small" style="width:50px;" v-model="formInline.remindCount"></el-input>
          </div>
          <div class="search-input" v-if="$store.state.common.lang==='PHL'">
            <span>{{$t('serviceManage.noticeTime')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime3" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        <template v-if="$store.state.common.lang!=='PHL'">
          <div class="search-input" >
            <span>{{$t('new.no87')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime5" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
          <div class="search-input" >
            <span>{{$t('new.no88')}}:</span>
            <el-select size="small" v-model="formInline.callStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options6" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_LIST')">
      <template>
        <el-table :data="tableData" v-loading="loadFlag" size="small" stripe>
          <el-table-column align="center" prop="id" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="userPhone" :label="$t('yuenan.no23')">
              <template slot-scope="scope">
                <span >{{$store.getters.vn_phone(scope.row.userPhone)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')">
              <template slot-scope="scope">
                <span>{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')">
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no58')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strMustRefundTime" :label="$t('public.no59')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strServiceAllotTime" :label="$t('serviceManage.paidantime')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="serviceStatus" :label="$t('new.no34')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.myoveNoticeStatus(scope.row.serviceStatus))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.no22')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="strRemindTime" :label="$t('serviceManage.noticeTime')">
            </el-table-column>
            <el-table-column align="center" prop="serviceRecordTodayCount" :label="$t('fei.no15')">
            </el-table-column>
          </template>
          <template v-if="$store.state.common.lang!=='PHL'">
            <el-table-column align="center" prop="strCallTime" :label="$t('new.no87')" width="86">
            </el-table-column>
            <el-table-column align="center" prop="callStatus" :label="$t('new.no88')">
              <template slot-scope="scope">
                <span >{{$t($store.getters.callStatus_status(scope.row.callStatus))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_REMIND')">
                <template v-if="$store.state.common.lang==='vi'">
                  <span 
                    v-if="scope.row.status==51||scope.row.overdueDays>isover"
                    class="table_opr"
                  >
                  {{$t('serviceManage.telNotice')}}
                  </span>
                  <span 
                    v-else
                    class="table_opr"
                    @click="loanDetali(scope.row.orderNo,scope.row.userId,scope.row.overdueDays)"
                  >
                  {{$t('serviceManage.telNotice')}}
                  </span>
                </template>
                <template v-else>
                  <span 
                    v-if="scope.row.status!=51"
                    class="table_opr"
                    @click="loanDetali(scope.row.orderNo,scope.row.userId,scope.row.overdueDays)"
                  >
                  {{$t('serviceManage.telNotice')}}
                  </span>
                  <span 
                    v-else
                    class="table_opr"
                  >
                  {{$t('serviceManage.telNotice')}}
                  </span>
                </template>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_LIST')">
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
  name: 'myOveDateRemind',
  data () {
    return {
      sessionid: '',
      flag: true,
      loadFlag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 还款时间
      searchTime1: [], // 应还时间
      searchTime2: [], // 派单时间
      searchTime3: [], // 提醒时间
      searchTime5: [], // 最近群呼时间
      formInline: { // 用户查询信息数据对应字段
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        orderLoanType: '',
        serviceStatus: '',
        orderStatus: '',
        callStatus: '',
        remindCount: '',
        callStartTime:'',
        callEndTime:'',
        serviceTimeStart: '',
        serviceTimeEnd: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        mustRefundTimeBegin: '',
        mustRefundTimeEnd: '',
        reminderTimeBegin: '',
        reminderTimeEnd: '',
        overdueBegin: '',
        overdueEnd: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.order_select, // 订单状态下拉选框信息
      options2: this.$store.state.options.notice_option, // 提醒状态下拉选框信息
      options3: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      options6: this.$store.state.options.groupCalls_options, // 群呼结果下拉选框信息
      tableData: [],// 借款信息数据模拟
      isover:''// 判断电话提醒按钮是否展示
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.loansList();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = val;
      this.loansList();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('myOveDateRemindList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.loansList();
      }
    },
    loanDetali (orderNo, userId,overdueDays) { // 查看详情操作
      this.$router.push({path: '/telnoticedetail', query: {orderNo, userId,overdueDays,type:1}});
    },
    loansList () { // 获取借款列表
      this.loadFlag = true;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_myOveDate,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      };
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
    getcollectionType(){ // 获取催收阶段判断电话提醒按钮是否展示
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'overdue.type'
      };
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let str = res.data.data[0].remark;
          this.isover = JSON.parse(str).start;
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.loanTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.loanTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.loanTimeBegin = '';
        this.formInline.loanTimeEnd = '';
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.mustRefundTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.mustRefundTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.mustRefundTimeBegin = '';
        this.formInline.mustRefundTimeEnd = '';
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.serviceTimeStart = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.serviceTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.serviceTimeStart = '';
        this.formInline.serviceTimeEnd = '';
      }
    },
    searchTime3 () {
      if (this.searchTime3) {
        this.formInline.reminderTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime3[0]);
        this.formInline.reminderTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime3[1]);
      } else {
        this.formInline.reminderTimeBegin = '';
        this.formInline.reminderTimeEnd = '';
      }
    },
    searchTime5 () {
      if (this.searchTime5) {
        this.formInline.callStartTime = this.$store.getters.yyyy_m_d(this.searchTime5[0]);
        this.formInline.callEndTime = this.$store.getters.yyyy_m_d(this.searchTime5[1]);
      } else {
        this.formInline.callStartTime = '';
        this.formInline.callEndTime = '';
      }
    },
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.myOveDateRemindList_select) !== '{}') {
      this.formInline = this.$store.state.common.myOveDateRemindList_select;
      if(this.formInline.serviceTimeStart!==''){
        this.searchTime2.push(this.formInline.serviceTimeStart);
        this.searchTime2.push(this.formInline.serviceTimeEnd);
      }
      if(this.formInline.mustRefundTimeBegin!==''){
        this.searchTime1.push(this.formInline.mustRefundTimeBegin);
        this.searchTime1.push(this.formInline.mustRefundTimeEnd);
      }
      if(this.formInline.loanTimeBegin!==''){
        this.searchTime.push(this.formInline.loanTimeBegin);
        this.searchTime.push(this.formInline.loanTimeEnd);
      }
    }
    this.loansList();// 获取借款列表
    this.getcollectionType();// 获取借款列表
  }
}
</script>

<style scoped lang="scss">

</style>
