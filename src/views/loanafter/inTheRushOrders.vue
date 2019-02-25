<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanAfterManage.crumbsTwo')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" >
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.orderId"></el-input>
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
          <span>{{$t('loanAfterManage.status')}}:</span>
          <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('loanAfterManage.name')}}:</span>
          <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('loanAfterManage.type')}}:</span>
          <el-select size="small" clearable v-model="formInline.type" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no28')}}:</span>
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.overdueDaysBegin"></el-input>
          ~
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.overdueDaysEnd"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('new.no77')}}:</span>
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.maxOverdueDaysBegin"></el-input>
          ~
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.maxOverdueDaysEnd"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('new.no78')}}:</span>
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.repeatCountBegin"></el-input>
          ~
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.repeatCountEnd"></el-input>
        </div>
        <div class="search-input" v-if="$store.state.common.lang==='PHL'">
          <span>{{$t('public.no65')}}:</span>
          <el-select size="small" v-model="formInline.refundAmountIsZero" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options5" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('loanAfterManage.time')}}:</span>
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
          <span>{{$t('loanAfterManage.paidanTime')}}:</span>
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
          <span>{{$t('public.no71')}}:</span>
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
        <div class="search-input">
          <span>{{$t('public.backMoneyDate')}}:</span>
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
        <div class="search-input" v-if="$store.state.common.lang=='PHL'">
          <span>{{$t('operationDetail.no8')}}:</span>
          <el-date-picker 
            size="small"
            v-model="searchTime4" 
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
            <span>{{$t('new.no83')}}:</span>
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
            <span>{{$t('new.no84')}}:</span>
            <el-select size="small" v-model="formInline.callStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options6" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        <div class="search-input" v-if="$store.state.common.permiss.includes('RIGHT_LOANLAST_INCOME_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>
    
    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_LOANLAST_INCOME_TRANSFER')">
      <el-button type="primary" class="button-color" @click="todayRedeploy">{{$t('loanAfterManage.redeploy')}}</el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOANLAST_INCOME_LIST')">
      <template>
        <el-table :data="tableData" size="mini" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" :selectable="unSelect" width="55">
          </el-table-column>
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" >
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" >
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="userPhone" :label="$t('yuenan.no23')" >
              <template slot-scope="scope">
                <span >{{$store.getters.vn_phone(scope.row.userPhone)}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" >
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" >
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" :label="$t('public.no56')" >
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')" >
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="waitAmount" :label="$t('loanAfterManage.waitAmount')">
            <template slot-scope="scope">
              <span v-if="scope.row.waitAmount!==null&&scope.row.waitAmount!==undefined&&scope.row.waitAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.waitAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strLastTime" :label="$t('loanAfterManage.time')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.no71')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.backMoneyDate')" width="86">
          </el-table-column>
          <template v-if="$store.state.common.lang=='PHL'">
            <el-table-column align="center" prop="strPromiseTime" :label="$t('operationDetail.no8')" width="86">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="status" :label="$t('loanAfterManage.status')" min-width="100">
            <template slot-scope="scope">
              <span >{{$t($store.getters.operationStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('loanAfterManage.name')">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('loanAfterManage.type')">
            <template slot-scope="scope">
              <span >{{$t($store.getters.collectionStatus(scope.row.type))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="maxOverdueDays" :label="$t('new.no77')">
          </el-table-column>
          <el-table-column align="center" prop="repeatCount" :label="$t('new.no78')">
          </el-table-column>
          <template v-if="$store.state.common.lang!=='PHL'">
            <el-table-column align="center" prop="strCallTime" :label="$t('new.no83')" width="86">
            </el-table-column>
            <el-table-column align="center" prop="callStatus" :label="$t('new.no84')">
              <template slot-scope="scope">
                <span >{{$t($store.getters.callStatus_status(scope.row.callStatus))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_LOANLAST_INCOME_DETAIL')"
                class="table_opr" 
                @click="detail(scope.row.orderNo)">
                {{$t('loanAfterManage.sel')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_LOANLAST_INCOME_LIST')">
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

    <!-- ------------------ 点击转派弹窗开始 -------------------- -->
    <el-dialog :title="$t('loanAfterManage.redeploy')" :visible.sync="redeployFlag" width="650px">
      <div class="left2right">
        <span class="left">{{$t('loanAfterManage.type')}}:</span>
        <div class="right">
          {{orderType}}
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

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'inTheRushOrders',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      flag: true, // 点击开关
      searchTime: [], // 最后催收时间
      searchTime1: [], // 派单时间
      searchTime2: [], // 入催时间
      searchTime3: [], // 还款时间
      searchTime4: [], // 承诺还款时间
      searchTime5: [], // 最近群呼时间
      formInline: {// 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        name: '',
        phone: '',
        collectionTimeBegin: '',
        collectionTimeEnd: '',
        dispatchTimeBegin: '',
        dispatchTimeEnd: '',
        createTimeBegin: '',
        createTimeEnd: '',
        status: '',
        overdueDaysEnd: '',
        overdueDaysBegin: '',
        maxOverdueDaysBegin: '',
        maxOverdueDaysEnd: '',
        repeatCountBegin: '',
        repeatCountEnd: '',
        lastRefundTimeBegin:'',
        lastRefundTimeEnd:'',
        promiseTimeBegin:'',
        promiseTimeEnd:'',
        type: '',
        refundAmountIsZero: '',
        callStatus: '',
        callStartTime:'',
        callEndTime:'',
        adminId: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.collection_option, // 催收状态下拉选框信息
      options2: [], // 全部催收员列表
      options4: [], // 在职催收员列表
      options3: [], // 逾期类型
      options5: this.$store.state.options.returnMoney_option, // 已还金额下拉选框信息
      options6: this.$store.state.options.groupCalls_options, // 群呼结果下拉选框信息
      tableData: [], // 列表表格数据汇总
      redeployFlag: false, // 转派弹窗开关
      redeployStatus: '', // 转派弹窗审核员下拉框对应数据
      multipleSelection: [], // 可勾选表格选中项
      orderIds: [], // 选中的订单ID数组
      orderType: '', // 订单类型
      reason: ''// 转派原因描述
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.operationList();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.operationList();
    },
    detail (orderNo) { // 查看详情点击操作
      this.$router.push({path: '/cuishoudetail', query: {orderNo, type: '2'}});
    },
    operationList () { // 获取入催订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.comeOperation_list,
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
        }
      })
    },
    select () { // 查询按钮点击操作
      this.$store.commit('rucuiList', this.formInline);
      if (this.flag) {
        this.flag = false;
        this.operationList();
      }
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
            action: this.$store.state.actionMap.order_operation,
            'sessionid': this.sessionid
          },
          orderNos: this.orderIds,
          adminId: this.redeployStatus,
          remark: this.reason
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
          } else {
            this.$globalMsg.error(this.$t('message.warning'));
          }
          this.operationList();
          this.orderIds = [];
          this.multipleSelection = [];
          this.redeployStatus = '';
          this.reason = '';
          this.redeployFlag = false;
        })
      }
    },
    handleSelectionChange (val) { // 表格选中项数据
      this.multipleSelection = val;
    },
    todayRedeploy () { // 转派按钮点击操作
      if (this.orderType == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.selFirst'));
      } else {
        this.operationAdmin1();// 获取在职催收员列表
        this.redeployFlag = true;
      }
    },
    redeployClose () {
      this.redeployFlag = false;
      this.redeployStatus = '';
      this.reason = '';
    },
    operationAdmin () { // 获取全部催收员列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        status: 1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options2 = arr;
        }
      })
    },
    operationAdmin1 () { // 获取在职催收员列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        status: 1,
        type:0,
        outSource:1
      }
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
    joinType () { // 订单转派弹窗对应数据处理
      let unique = function (arr) {
        var res = [];
        var json = {};
        for (var i = 0; i < arr.length; i++) {
          if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
          }
        }
        return res;
      }
      let arr = [];
      let brr = [];
      let crr = [];
      this.multipleSelection.forEach(value => {
        arr.push(value.orderNo);
        brr.push(value.type);
      })
      brr = unique(brr);
      brr.forEach(item => {
        if (item == 1) {
          crr.push('S1');
        }
        if (item == 2) {
          crr.push('S2');
        }
        if (item == 3) {
          crr.push('M1');
        }
        if (item == 4) {
          crr.push('M2');
        }
        if (item == 5) {
          crr.push('M3');
        }
        if (item == 6) {
          crr.push('S3');
        }
        if (item == 7) {
          crr.push('M3+');
        }
        if (item == 0) {
          crr.push('S1');
        }
      })
      this.orderIds = arr;
      this.orderType = crr.join();
    },
    unSelect (row, index) {
      return row.status != 100;
    },
    getcollectionType(){ // 获取催收阶段
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'overdue.type'
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.options3 = arr;
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.collectionTimeBegin = this.searchTime[0];
        this.formInline.collectionTimeEnd = this.searchTime[1];
      } else {
        this.formInline.collectionTimeBegin = ''
        this.formInline.collectionTimeEnd = ''
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.dispatchTimeBegin = this.searchTime1[0];
        this.formInline.dispatchTimeEnd = this.searchTime1[1];
      } else {
        this.formInline.dispatchTimeBegin = ''
        this.formInline.dispatchTimeEnd = ''
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.createTimeBegin = this.searchTime2[0];
        this.formInline.createTimeEnd = this.searchTime2[1];
      } else {
        this.formInline.createTimeBegin = ''
        this.formInline.createTimeEnd = ''
      }
    },
    searchTime3 () {
      if (this.searchTime3) {
        this.formInline.lastRefundTimeBegin = this.searchTime3[0];
        this.formInline.lastRefundTimeEnd = this.searchTime3[1];
      } else {
        this.formInline.lastRefundTimeBegin = '';
        this.formInline.lastRefundTimeEnd = '';
      }
    },
    searchTime4 () {
      if (this.searchTime4) {
        this.formInline.promiseTimeBegin = this.searchTime4[0];
        this.formInline.promiseTimeEnd = this.searchTime4[1];
      } else {
        this.formInline.promiseTimeBegin = '';
        this.formInline.promiseTimeEnd = '';
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
      this.joinType();
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.rucuiList_select) !== '{}') {
      this.formInline = this.$store.state.common.rucuiList_select;
      if(this.formInline.collectionTimeBegin!==''){
        this.searchTime.push(this.formInline.collectionTimeBegin);
        this.searchTime.push(this.formInline.collectionTimeEnd);
      }
      if(this.formInline.dispatchTimeBegin!==''){
        this.searchTime1.push(this.formInline.dispatchTimeBegin);
        this.searchTime1.push(this.formInline.dispatchTimeEnd);
      }
      
      
    }
    this.operationList();// 获取入催订单列表
    this.operationAdmin();// 获取催收员列表
    this.getcollectionType();// 获取催收阶段
  }
}
</script>

<style scoped lang="scss">

</style>
