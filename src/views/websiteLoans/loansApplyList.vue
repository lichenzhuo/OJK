<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('websiteLoans.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('websiteLoans.no4')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="paixu">
      <span></span>
      <p>{{$t('websiteLoans.no4')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.name"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.phone"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.no2')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.idCard"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.orderStatus')}}:</span>
            <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- <div class="search-input">
            <span>{{$t('websiteLoans.no5')}}:</span>
            <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div> -->
          <div class="search-input">
            <span>{{$t('staffManage.xinshenyuan')}}:</span>
            <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('public.registerDate')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                size="small"
                v-model="searchTime" 
                type="daterange" 
                range-separator="~" 
                :default-value="$store.state.common.preMonth" 
                :start-placeholder="$t('public.beginTime')" 
                :end-placeholder="$t('public.endTime')">
              </el-date-picker>
            </form>
          </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_QUERY')">
            <div class="search-input ml15">
              <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
            </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_EXP')">
            <div class="search-input ml15">
              <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
        </template>
      </el-row>
    </div>

    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_ASSIGN')">
      <el-button v-if="claimFlag" type="primary" @click="todayRedeploy">{{$t('loanAfterManage.redeploy')}}</el-button>
      <el-button v-else type="info"  >{{$t('loanAfterManage.redeploy')}}</el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_INFO')">
      <template>
        <el-table :data="tableData" size="small" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" :selectable="unSelect" width="55">
          </el-table-column>
          <el-table-column align="center" prop="id" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')">
          </el-table-column>
          <!-- <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="loanAmount" :label="$t('websiteLoans.no10')">
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('websiteLoans.no11')">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('websiteLoans.no6')">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_DETAIL')"
                style="color:#547ef6;cursor:pointer"
                @click="detail(scope.row.orderNo,scope.row.userId)"
              >
              {{$t('public.detail')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    
    
    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_INFO')">
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
        <span class="left">{{$t('public.orderNo')}}:</span>
        <span class="right">{{orderIds}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('public.userId')}}:</span>
        <span class="right">{{userIds}}</span>
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
        <span class="left">{{$t('loanAfterManage.redeployTo')}}:</span>
        <div class="right">
          <template v-if="formInline.orderState=='10'||formInline.orderState=='20'">
            <el-select size="small" v-model="redeployStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template v-if="formInline.orderState=='21'||formInline.orderState=='30'">
            <el-select size="small" v-model="redeployStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanAfterManage.reason')}}:</span>
        <div class="right">
          <el-input type="textarea" :rows="4" v-model="reason" :placeholder="$t('loanAfterManage.placeholder')+'~'"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left"></span>
        <div class="right">
          <el-button type="primary" size="small" @click="redeploySubmit">{{$t('loanAfterManage.sure')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 点击转派弹窗结束 -------------------- -->

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'loansApplyList',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      flag: true, // 点击开关
      claimFlag: false, // 指派按钮开关
      searchTime: [], // 申请时间
      formInline: {// 用户查询信息数据对应字段
        idCard: '',
        name: '',
        phone: '',
        orderState: '',
        orderLoanType: '',
        promiseTimeBegin:'',
        promiseTimeEnd:'',
        adminId: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.loansType_options, //   贷款类型下拉选框信息
      options2: this.$store.state.options.order_select, // 订单状态下拉选框信息
      options3: [], // 信审员下拉框
      options4: [], // 初审员下拉框
      options5: [], // 复审员下拉框
      tableData: [], // 列表表格数据汇总
      redeployFlag: false, // 转派弹窗开关
      redeployStatus: '', // 转派弹窗审核员下拉框对应数据
      multipleSelection: [], // 可勾选表格选中项
      orderIds: [], // 选中的订单ID数组
      userIds: [], // 选中的用户ID数组
      reason: ''// 转派原因描述
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.getList();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.getList();
    },
    detail (orderNo,userId) { // 查看详情点击操作
      this.$router.push({path: '/loanmoneydetail',query: {userId, orderNo}});
    },
    getList () { // 获取订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.website_loansApplyList,
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
          if(this.formInline.orderState=='10'||this.formInline.orderState=='20'||this.formInline.orderState=='21'||this.formInline.orderState=='30'){
            this.claimFlag = true;
          }else{
            this.claimFlag = false;
          }
        }
      })
    },
    select () { // 查询按钮点击操作
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.getList();
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
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.zhipai,
            'sessionid': this.sessionid
          },
          operType: this.formInline.orderState=='10'||this.formInline.orderState=='20'?'2':'3',
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
          this.getList();
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
    unSelect (row) {
      return row.status != 100;
    },
    chuPeople () { // 获取初审人员列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.audit_people,
          'sessionid': this.sessionid
        },
        operType: '2'
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
          this.options5 = arr;
        }
      })
    },
    allPeople () { // 获取全部人员名单
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.audit_people,
          'sessionid': this.sessionid
        },
        operType: '4'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options3 = arr;
        }
      })
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.website_loansApplyListExcel,
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
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.collectionTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.collectionTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.collectionTimeBegin = '';
        this.formInline.collectionTimeEnd = '';
      }
    },
    multipleSelection () {
      this.joinType();
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getList();// 获取入催订单列表
    this.chuPeople();// 获取初审员下拉框
    this.fuPeople();// 获取复审员下拉框
    this.allPeople();// 获取复审员下拉框
  }
}
</script>
<style scoped lang="scss">

</style>
