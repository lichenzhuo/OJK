<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('serviceManage.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('serviceManage.crumbsTwo')}}</p>
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
        <el-col :md="8" :lg="5" :xl="4" v-if="$store.state.common.lang!=='PHL'">
          <div class="search-input">
            <span>{{$t('serviceManage.service')}}:</span>
            <el-input size="small" label="name" v-model="formInline.serviceName"></el-input>
          </div>
        </el-col>
        <div class="search-input" v-else>
          <span>{{$t('serviceManage.service')}}:</span>
          <el-select size="small" v-model="formInline.serviceName" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
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
          <span>{{$t('new.no34')}}:</span>
          <el-select size="small" v-model="formInline.serviceStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no28')}}:</span>
          <el-input size="small" style="width:50px;" v-model="formInline.overdueBegin"></el-input>
          ~
          <el-input size="small" style="width:50px;" v-model="formInline.overdueEnd"></el-input>
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
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
          <div class="search-input">
            <span>{{$t('public.no90')}}:</span>
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REFUND_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REFUND_EXP')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- v-if="$store.state.common.permiss.includes('RIGHT_LOANLAST_INCOME_TRANSFER')" -->
    <div class="list_operation" >
      <el-button type="primary" class="button-color" @click="todayRedeploy">{{$t('loanAfterManage.redeploy')}}</el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REFUND_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
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
          <el-table-column align="center" prop="strServiceAllotTime" :label="$t('public.no90')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="serviceName" :label="$t('serviceManage.service')">
          </el-table-column>
          <el-table-column align="center" prop="serviceStatus" :label="$t('new.no34')" min-width="80">
            <template slot-scope="scope">
              <span>{{$t($store.getters.myoveNoticeStatus(scope.row.serviceStatus))}}</span>
            </template>
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="remindNumbers" :label="$t('yuenan.no24')">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <template v-if="$store.state.common.lang!=='PHL'">
            <el-table-column align="center" prop="strCallTime" :label="$t('new.no87')" width="86">
            </el-table-column>
            <el-table-column align="center" prop="callStatus" :label="$t('new.no88')">
              <template slot-scope="scope">
                <span >{{$t($store.getters.callStatus_status(scope.row.callStatus))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REFUND_DETAIL')"
                class="table_opr" 
                @click="loanDetali(scope.row.orderNo,scope.row.userId)"
              >
              {{$t('public.no29')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REFUND_LIST')">
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

    <!-- ------------------ 点击转派弹窗开始 -------------------- -->
    <el-dialog :title="$t('loanAfterManage.redeploy')" :visible.sync="redeployFlag" width="650px">
      <div class="left2right">
        <span class="left">{{$t('public.orderId')}}:</span>
        <div class="right">
          {{orderIds.join()}}
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('public.userId')}}:</span>
        <div class="right">
          {{userIds.join()}}
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanAfterManage.redeployTo')}}:</span>
        <div class="right">
          <el-select size="small" v-model="redeployStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanAfterManage.reason')}}:</span>
        <div class="right">
          <el-input type="textarea" v-model="reason" :placeholder="$t('loanAfterManage.placeholder')+'~'"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left"></span>
        <div class="right">
          <el-button type="primary" size="small" @click="redeploySubmit">{{$t('proManage.sure')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 点击转派弹窗结束 -------------------- -->

  </div>
</template>
<script>
export default {
  name: 'nobackOrderList',
  data () {
    return {
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 还款时间
      searchTime1: [], // 应还时间
      searchTime2: [], // 派单日期
      searchTime5: [], // 最近群呼时间
      formInline: { // 用户查询信息数据对应字段
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        orderLoanType: '',
        orderState: '',
        serviceStatus: '',
        serviceName: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        mustRefundTimeBegin: '',
        mustRefundTimeEnd: '',
        serviceTimeStart: '',
        serviceTimeEnd: '',
        overdueBegin: '',
        callStatus: '',
        callStartTime:'',
        callEndTime:'',
        overdueEnd: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.order_select, // 订单状态下拉选框信息
      options2: this.$store.state.options.notice_option, // 提醒状态下拉选框信息
      options3: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      tableData: [],// 借款信息数据模拟
      options4: [], // 在职客服员列表
      options5: [], // 在职客服员列表
      options6: this.$store.state.options.groupCalls_options, // 群呼结果下拉选框信息
      redeployFlag: false, // 转派弹窗开关
      redeployStatus: '', // 转派弹窗客服下拉框对应数据
      multipleSelection: [], // 可勾选表格选中项
      orderIds: [], // 选中的订单ID数组
      userIds: [], // 选中的订单ID数组
      orderType: '', // 订单类型
      reason: ''// 转派原因描述
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.dataList();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = val;
      this.dataList();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('noBackOrderList', this.formInline);
      if (this.flag) {
        this.flag = false;
        this.dataList();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.kf_noBackOrder_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
        };
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
    loanDetali (orderNo, userId) { // 查看详情操作
      this.$router.push({path: '/telnoticedetail', query: {userId, orderNo,type:2}});
    },
    dataList () { // 获取借款列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_noBackOrder,
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
        }
      })
    },
    chuPeople () { // 获取客服人员列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_people_option,
          'sessionid': this.sessionid
        },
        type: '3'
      };
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options4 = arr;
        }
      })
    },
    handleSelectionChange (val) { // 表格选中项数据
      this.multipleSelection = val;
    },
    todayRedeploy () { // 转派按钮点击操作
      if (this.orderIds == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.selFirst'));
      } else {
        this.redeployFlag = true;
      }
    },
    redeployClose () {
      this.redeployFlag = false;
      this.redeployStatus = '';
      this.reason = '';
    },
    joinType () { // 订单转派弹窗对应数据处理
      let arr = [];
      let brr = [];
      this.multipleSelection.forEach(value => {
        arr.push(value.id);
        brr.push(value.userId);
      })
      this.orderIds = arr;
      this.userIds = brr;
    },
    redeploySubmit () { // 转派确认操作
      if (this.redeployStatus == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.adminFirst'));
        return;
      }
      if (this.reason == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.placeholder'));
        return;
      }
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.zhipai,
            'sessionid': this.sessionid
          },
          operType: '4',
          orderIds: this.orderIds,
          oper: this.redeployStatus,
          remark: this.reason
        };
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.dataList();
          this.redeployClose();
        })
      }
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
    searchTime5 () {
      if (this.searchTime5) {
        this.formInline.callStartTime = this.searchTime5[0];
        this.formInline.callEndTime = this.searchTime5[1];
      } else {
        this.formInline.callStartTime = '';
        this.formInline.callEndTime = '';
      }
    },
    multipleSelection () {
      this.joinType()
    },
    redeployFlag () {
      if(!this.redeployFlag){
        this.redeployClose();
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.noBackOrderList_select) !== '{}') {
      this.formInline = this.$store.state.common.noBackOrderList_select;
      if(this.formInline.loanTimeBegin!==''){
        this.searchTime.push(this.formInline.loanTimeBegin);
        this.searchTime.push(this.formInline.loanTimeEnd);
      }
      if(this.formInline.mustRefundTimeBegin!==''){
        this.searchTime1.push(this.formInline.mustRefundTimeBegin);
        this.searchTime1.push(this.formInline.mustRefundTimeEnd);
      }
    }
    this.dataList();// 获取借款列表
    this.chuPeople();
  }
}
</script>

<style scoped lang="scss">

</style>
