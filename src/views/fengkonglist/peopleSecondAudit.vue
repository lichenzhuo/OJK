<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('riskManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('riskManage.crumbsThr')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="paixu">
      <span></span>
      <p>{{$t('riskManage.title2')}}</p>
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
            <span>{{$t('public.userName')}}:</span>
            <el-input size="small" label="name" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.registerPhone')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>{{$t('public.no32')}}:</span>
          <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select clearable size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.lang==='vi'">
          <div class="search-input">
            <span>{{$t('websiteLoans.no5')}}:</span>
            <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options4" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-col :md="8" :lg="5" :xl="4">
            <div class="search-input">
              <span>{{$t('public.no2')}}:</span>
              <el-input size="small" label="idCard" v-model="formInline.idCard"></el-input>
            </div>
          </el-col>
        </template>
        <div class="search-input">
          <span>{{$t('public.CreateDate')}}:</span>
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
          <span>{{$t('new.no9')}}:</span>
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
        <template v-if="$store.state.common.lang==='PHL'">
          <div class="search-input">
            <span>{{$t('fei.no14')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime2" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        </template>
        <div class="search-input"
        v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_REVIEW_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>

    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_REVIEW_APPOINT')">
      <el-button type="primary" @click="todayRedeploy">{{$t('new.no1')}}</el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_REVIEW_LIST')">
      <template>
        <el-table :data="tableData" stripe size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection" :selectable="unSelect" width="55">
          </el-table-column>
          <el-table-column align="center" prop="id" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.registerPhone')">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="userPhone" :label="$t('yuenan.no23')">
              <template slot-scope="scope">
                <span >{{$store.getters.vn_phone(scope.row.userPhone)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="idCard" :label="$t('public.no2')">
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
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')+'('+$t('public.no26')+')'" >
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strSecondApproveTime" :label="$t('new.no9')" width="86">
          </el-table-column>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="strPromiseTime" :label="$t('fei.no14')" width="86">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('public.no32')">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_REVIEW_DETAIL')"
                class="table_opr"
                @click="detail(scope.row.orderNo,scope.row.userId)">
                {{$t('public.detail')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_REVIEW_LIST')">
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
    <el-dialog :title="$t('new.no1')" :visible.sync="redeployFlag" width="650px">
      <div class="left2right">
        <span class="left">{{$t('public.orderId')}}:</span>
        <span class="right">{{orderIds.join()}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('public.userId')}}:</span>
        <span class="right">{{userIds.join()}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanAfterManage.redeployTo')}}:</span>
        <div class="right">
          <el-select size="small" v-model="redeployStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanAfterManage.reason')}}:</span>
        <div class="right">
          <el-input type="textarea" :rows="4" v-model="reason"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left"></span>
        <div class="right">
          <el-button type="primary" size="small" @click="redeploySubmit">{{$t('new.no14')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 点击转派弹窗结束 -------------------- -->

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'peopleSecondAudit',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询日期
      searchTime1: [], // 审核时间
      searchTime2: [], // 最后跟进时间
      formInline: {// 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        idCard: '',
        orderLoanType: '',
        orderState: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        approveTimeBegin: '',
        approveTimeEnd: '',
        trackTimeBegin: '',
        trackTimeEnd: '',
        adminId: ''
      },
      currentPage: 1, // 当前页下标
      options1: [], // 审核员下拉选框信息
      options2: this.$store.state.options.recheckOrder_option1, // 复审列表订单状态下拉选框信息
      options4: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      tableData: [], // 用户信息数据模拟
      flag: true, // 点击一次开关
      multipleSelection: [],
      redeployFlag: false, // 转派弹窗开关
      redeployStatus: '', // 选中的信审员
      reason: '', // 备注
      orderIds: [], // 选中订单id集合
      userIds: [], // 选中的用户ID集合
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.fushenList();
    },
    handleCurrentChange (val) { // 分页操作
      this.currentPage = val;
      this.fushenList();
    },
    detail (orderNo, userid) { // 点击详情操作
      this.$router.push({path: '/fushendetail', query: {userid, orderNo, block: 1}});
    },
    select () { // 点击查询按钮操作
      this.$store.commit('rengongfushenList', this.formInline);
      if (this.flag) {
        this.flag = false;
        this.fushenList();
      }
    },
    fushenList () { // 获取复审列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.auditTwo_list,
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
    fuPeople () { // 获取复审人员名单
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.audit_people,
          'sessionid': this.sessionid
        },
        operType: '3'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options1 = arr;
        }
      })
    },
    handleSelectionChange (val) { // 表格选中项数据
      this.multipleSelection = val;
    },
    unSelect (row, index) {
      return row.status == 21||row.status == 30;
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
          operType: '3',
          orderIds: this.orderIds,
          oper: this.redeployStatus,
          remark: this.reason
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.fushenList();
          this.redeployStatus = '';
          this.reason = '';
          this.redeployFlag = false;
        })
      }
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.applyTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.applyTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.applyTimeBegin = '';
        this.formInline.applyTimeEnd = '';
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.approveTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.approveTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.approveTimeBegin = '';
        this.formInline.approveTimeEnd = '';
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.trackTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.trackTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.trackTimeBegin = '';
        this.formInline.trackTimeEnd = '';
      }
    },
    multipleSelection () {
      this.joinType();
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');// 获取sessionid
    if (JSON.stringify(this.$store.state.common.rengongfushen_select) !== '{}') {
      this.formInline = this.$store.state.common.rengongfushen_select;
      if(this.formInline.applyTimeBegin!==''){
        this.searchTime.push(this.formInline.applyTimeBegin);
        this.searchTime.push(this.formInline.applyTimeEnd);
      }
      if(this.formInline.approveTimeBegin!==''){
        this.searchTime1.push(this.formInline.approveTimeBegin);
        this.searchTime1.push(this.formInline.approveTimeEnd);
      }
    }
    this.fushenList();
    this.fuPeople();
  }
}
</script>
<style scoped lang="scss">

</style>
