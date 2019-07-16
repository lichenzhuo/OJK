<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('teleMarketing.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('teleMarketing.no2')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('teleMarketing.no2')}}</p>
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
          <span>{{$t('teleMarketing.no6')}}:</span>
          <el-select clearable size="small" @clear="clearChannel" v-model="formInline.regChannel" :placeholder="$t('public.placeholder')">
            <el-option  v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('teleMarketing.no9')}}:</span>
          <el-select size="small" v-model="formInline.isFollowup" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('teleMarketing.no7')}}:</span>
          <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in adminOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('teleMarketing.no14')}}:</span>
          <el-select clearable size="small" v-model="formInline.isBorrow" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in loanOptions" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('teleMarketing.no44')}}:</span>
          <el-select clearable size="small" v-model="formInline.isSendCoupon" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('auditDetail.no43')}}:</span>
          <el-select clearable size="small" v-model="formInline.phoneResult" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in telresultOptions" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no21')}}:</span>
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_QUARY')">
          <div class="search-input ml15">
            <el-button type="primary" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_EXP')">
          <div class="search-input ml15">
            <el-button type="primary" @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_INDIVIDUAL_ORDERS')" -->
    <div class="list_operation" >
      <el-button 
        v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_ADDDATA')"
        type="primary" 
        @click="showaddData"
       >{{$t('teleMarketing.no12')}}
       </el-button>
      <el-button 
        v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_TRANSFER')"
        type="primary" 
        @click="todayRedeploy"
      >{{$t('loanAfterManage.redeploy')}}
      </el-button>
      <el-button 
        v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_SEPERATE')"
        type="primary" 
        @click="selfdomAllotBegin"
      >
      {{$t('OutsourcedManage.no14')}}
      </el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_LIST_LIST')">
      <template>
        <el-table :data="tableData" 
        size="small" 
        v-loading="loadFlag" 
        stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" :selectable="unSelect" width="55">
          </el-table-column>
          <el-table-column align="center" prop="id" :label="$t('teleMarketing.no8')">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')">
          </el-table-column>
          <el-table-column align="center" prop="idCard" :label="$t('public.no2')">
          </el-table-column>
          <el-table-column align="center" prop="appUrl" :label="$t('add.no74')">
          </el-table-column>
          <el-table-column align="center" prop="regChannel" :label="$t('teleMarketing.no6')">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.no21')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('teleMarketing.no7')">
          </el-table-column>
          <el-table-column align="center" prop="followUpStatus" :label="$t('teleMarketing.no9')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.is_addressBook(scope.row.followUpStatus))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isBorrow" :label="$t('teleMarketing.no14')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.is_addressBook(scope.row.isBorrow))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strFinalFollowupTime" :label="$t('teleMarketing.no10')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strApplyTime" :label="$t('public.CreateDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('teleMarketing.no11')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="isSendCoupon" :label="$t('teleMarketing.no44')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.is_addressBook(scope.row.isSendCoupon))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="phoneResult" :label="$t('auditDetail.no43')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.tel_through(scope.row.phoneResult))}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_DETAIL')"
                class="table_opr" 
                @click="selectDetail(scope.row.adminId,scope.row.userId,scope.row.name,scope.row.phone)"
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
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_LIST_LIST')">
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
      <!-- <div class="left2right">
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
      </div> -->
      <div class="left2right">
        <span class="left">{{$t('loanAfterManage.redeployTo')}}:</span>
        <div class="right">
          <el-select size="small" v-model="redeployStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in adminOptions" :key="item.value" :label="item.label" :value="item.value">
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

    <!-- ------------------ 点击个性分单弹窗开始 -------------------- -->
    <el-dialog :title="$t('OutsourcedManage.no14')" :visible.sync="selfdomFlag"  width="1200px">
      <p class="form-p mt-10">
        <span class="form-span2 red">{{$t('teleMarketing.no6')}}:</span>
        <span class="mr20 red">{{this.formInline.regChannel}}</span>
        <span class="form-span2 red">{{$t('OutsourcedManage.no17')}}:</span>
        <span class="mr20 red">{{noallotOrdersNew}}</span>
      </p>
      <el-table :data="tableData2" size="small" style="min-height:240px">
        <el-table-column type="index" :label="$t('serviceManage.index')">
        </el-table-column>
        <el-table-column align="center" prop="name" :label="$t('public.name')" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="loginName" :label="$t('OutsourcedManage.no25')" min-width="70">
        </el-table-column>
        <el-table-column align="center" prop="distributeUser" :label="$t('teleMarketing.no35')" min-width="70">
        </el-table-column>
        <el-table-column align="center" prop="followUpDistributeUser" :label="$t('teleMarketing.no36')" min-width="70">
        </el-table-column>
        <el-table-column align="center" prop="noFollowUpDistributeUser" :label="$t('teleMarketing.no37')" min-width="90">
        </el-table-column>
        <el-table-column align="center" prop="operation" :label="$t('public.operation')" width="220">
          <template slot-scope="scope">
           <div class="fenpei mb5">
              <span>{{$t('OutsourcedManage.no24')}}</span>
              <el-input style="width:60px;" size="mini" v-model="inputValueNew[scope.row.adminId]"></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
          <el-pagination
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            layout="prev, pager, next, ->"
            :total="pageTotal1?pageTotal1:0">
          </el-pagination>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selfdomFlag = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="selfdomSure">{{$t('public.no49')}}</el-button>
      </span>
      
    </el-dialog>
    <!-- ------------------ 点击个性分单弹窗结束 -------------------- -->

    <!-- ------------------ 查看详情弹窗开始 -------------------- -->
    <el-dialog :title="$t('public.no29')" :visible.sync="detailFlag"  width="1000px">
      <p class="form-p">
        <span class="form-span2">{{$t('public.name')}}:</span>
        <span class="mr20">{{detailData.name}}</span>
        <span class="form-span2">{{$t('public.userTel')}}:</span>
        <span class="mr20">{{detailData.phone}}</span>
      </p>
      <el-table :data="tableData3" size="small" style="min-height:240px">
        <el-table-column align="center" prop="strCreateTime" :label="$t('public.no21')">
        </el-table-column>
        <el-table-column align="center" prop="callResult" :label="$t('auditDetail.no43')" >
          <template slot-scope="scope">
              <span>{{$t($store.getters.tel_through(scope.row.callResult))}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="isSendMessage" :label="$t('operationDetail.no25')" >
          <template slot-scope="scope">
              <span>{{$t($store.getters.is_addressBook(scope.row.isSendMessage))}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="isBorrow" :label="$t('teleMarketing.no14')" >
          <template slot-scope="scope">
              <span>{{$t($store.getters.is_addressBook(scope.row.isBorrow))}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" :label="$t('public.no37')" >
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <el-pagination
          @current-change="handleCurrentChange3"
          :current-page="currentPage3"
          layout="prev, pager, next, ->"
          :total="pageTotal3?pageTotal3:0">
        </el-pagination>
      </el-row>
      
    </el-dialog>
    <!-- ------------------ 查看详情弹窗结束 -------------------- -->

    <!-- 添加营销数据 -->
    <el-dialog :title="$t('teleMarketing.no12')" :visible.sync="addDataFlag"  width="500px">
      <div class="box">
        <el-upload class="upload-demo" :action="$axios.defaults.baseURL" :http-request="httpRequest" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :before-upload="beforeUpload" :on-remove="removeHandler" :on-success="uploadSuccess" ref="upload">
          <!-- <el-button size="small" type="primary">{{$t('teleMarketing.no16')}}</el-button> -->
          <span class="upload">{{$t('teleMarketing.no16')}}</span>
        </el-upload>
        
      </div>
      
      <p class="form-p mt15">
        <span class="form-span2 cp" @click="downExcel">{{$t('teleMarketing.no13')}}:</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDataFlag = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="addExcel">{{$t('public.no49')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: 'marketing',
  data () {
    return {
      sessionid: '',
      flag: true,
      loadFlag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 添加时间
      formInline: { // 用户查询信息数据对应字段
        adminId: '',
        idCard: '',
        name: '',
        phone: '',
        regChannel: '',
        isFollowup: '',
        addTimeBegin:'',
        addTimeEnd:'',
      },
      currentPage: 1, // 当前页下标
      currentPage2: 1, // 当前页下标
      currentPage3: 1, // 当前页下标
      pageTotal2: 0, // 分页总数
      pageTotal3: 0, // 分页总数
      options1: [], // 渠道来源
      options2: this.$store.state.options.isOverdue_option, // 是否更进,是否发送优惠券
      loanOptions: this.$store.state.options.loanIntention_status, // 借款意向
      telresultOptions: this.$store.state.options.telResult_select, // 通话结果
      adminOptions: [], // 电销员
      tableData: [],// 借款信息数据模拟
      options4: [], // 在职客服员列表
      options5: [], // 在职客服员列表
      remindType: [], // 在职客服员列表
      options6: this.$store.state.options.groupCalls_options, // 群呼结果下拉选框信息
      redeployFlag: false, // 转派弹窗开关
      redeployStatus: '', // 转派弹窗客服下拉框对应数据
      multipleSelection: [], // 可勾选表格选中项
      orderIds: [], // 选中的订单ID数组
      userIds: [], // 选中的订单ID数组
      userName: [], // 选中的信审员
      orderType: '', // 订单类型
      reason: '',// 转派原因描述
      pageTotal1: 0, // 个性分单分页总数
      currentPage1: 0, // 个性分单分页总数
      isshowselfdom: '',// 个性分单按钮是否展示
      selfdomFlag: false,// 个性分单弹窗
      tableData1: [],// 个性分单列表信息数据
      tableData2: [],// 个性分单列表信息数据
      tableData3: [],// 个性分单列表信息数据
      noallotOrdersType: '',// 个性平均分单未分配总量
      noallotOrdersNew: 0,// 个性平均分单未分配总量
      noallotOrdersOld: 0,// 个性平均分单未分配总量
      inputValueNew: {},// 个性分单分配的值新客
      inputValueOld: {},// 个性分单分配的值老客
      allocationNumber1: [],// 个性分单新客分单集合
      allocationNumber2: [],// 个性分单老客分单集合
      addDataFlag: false,
      detailFlag: false,
      detailData:{

      },
      fileList: [],
      fileReader: '',
      base64Str: '',
      fileType: '',
    }
  },
  methods: {
    clearChannel(){
      this.formInline.regChannel = '';
    },
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.getTableData();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = val;
      this.getTableData();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('noBackOrderList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.getTableData();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.PHONEMARKET0001EXP,
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
    selectDetail (adminId, userId, name, phone) { // 查看详情操作
      this.detailData.adminId = adminId;
      this.detailData.userId = userId;
      this.detailData.name = name;
      this.detailData.phone = phone;
      this.getDetailTable()
    },
    getDetailTable(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0006,
          'page': {'index': this.currentPage3, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.detailData
      };
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData3 = res.data.data;
          this.pageTotal3 = res.data.header.page.total;
          this.detailFlag = true;
        }else{
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
    handleCurrentChange3(val){
      this.currentPage3 = val;
      this.getDetailTable()
    },
    getTableData () { // 获取列表数据
      this.loadFlag = true;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0001,
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
    handleSelectionChange (val) { // 表格选中项数据
      this.multipleSelection = val;
    },
    unSelect (row) {
      return (row.followUpStatus != 1||(row.followUpStatus == -1&&row.strApplyTime == ''));
    },
    todayRedeploy () { // 转派按钮点击操作
      
      if (this.orderIds == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.selFirst'));
      } else if(this.userName.some(value=>!value)){
        this.$globalMsg.error(this.$t('teleMarketing.no38'));
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
      let crr = [];
      this.multipleSelection.forEach(value => {
        arr.push(value.id);
        brr.push(value.userId);
        crr.push(value.adminName);
      })
      this.userName = crr;
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
            action: this.$store.state.actionMap.PHONEMARKET0005,
            'sessionid': this.sessionid
          },
          adminId: this.redeployStatus,
          transferList: this.orderIds,
          remark: this.reason
        };
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.getTableData();
          this.redeployClose();
        })
      }
    },
    getchannel(){ // 获取渠道下拉框数据
      this.options1 = []
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0011,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            this.options1.push({value,label:value})
          })
        }
      })
    },
    getexcelHref(){ // 获取渠道下拉框数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
          'sessionid': this.sessionid
        },
        optionGroup:'excel.url'
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          window.location.href = res.data.data[0].optionName;
        }
      })
    },
    getpeople(){ // 获取电销员下拉框
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_people_option,
          'sessionid': this.sessionid
        },
        outSource: 1,
        type: 4
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          res.data.data.forEach(value=>{
            this.adminOptions.push({value:value.id,label:value.name})
          })
        }
      })
    },
    selfdomAllotBegin(){// 个性分单按钮点击操作
      if(this.formInline.addTimeBegin===''||this.formInline.regChannel===''){
        return this.$globalMsg.error(this.$t('add.no82'));
      }
      this.selfdomFlag = true;
      this.getselfdomTable();
    },
    getselfdomTable(){// 获取个性分单列表
      this.tableData1 = [];
      this.tableData2 = [];
      this.noallotOrdersNew = 0;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0008,
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData1 = res.data.data.distributionPhoneMarketList;
          this.tableData2 = this.tableData1.slice(0,10);
          this.pageTotal1 = this.tableData1.length;
          this.noallotOrdersNew = res.data.data.noDistributeUserAll.noDistributeUserAll;
        }
      })
    },
    handleCurrentChange1 (val) { // 个性分单分页按钮操作
      this.currentPage1 = val;
      this.tableData2 = this.tableData1.slice((val-1)*10,val*10);
    },
    selfdomSure(){// 个性分单确认按钮
      let sum1 = 0;
      let arr = [];
      for (var index in this.inputValueNew){
        if(this.inputValueNew[index]!=''){
          sum1+=Number(this.inputValueNew[index]);
          arr.push({adminId:index,distributeCount:Number(this.inputValueNew[index])});
        }
      }
      this.allocationNumber1 = arr;
      
      if(this.allocationNumber1==''){
        this.$globalMsg.error(this.$t('OutsourcedManage.no20'));
        return false;
      }
      if(sum1>Number(this.noallotOrdersNew)){
        this.$globalMsg.error(this.$t('OutsourcedManage.no19'));
        return false;
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0009,
          'sessionid': this.sessionid
        },
        ...this.formInline,
        noDistributeAllCount: this.noallotOrdersNew,
        distributeList: this.allocationNumber1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
      })
      setTimeout(()=>{
        this.getTableData()
      },500)
      this.inputValueNew = {};
      this.selfdomFlag = false;
    },
    showaddData(){
      this.addDataFlag = true;
    },
    addExcel(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0010,
          'sessionid': this.sessionid
        },
        fileType: this.fileType,
        fileBase64: this.base64Str,
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(res.data.data);
          setTimeout(()=>{
            this.getTableData()
            this.getchannel()
          },1000)
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
      })
      
      this.addDataFlag = false;
      this.fileList = [];
      
    },
    downExcel(){
      this.getexcelHref()
    },
    // 上传文件相关
    httpRequest (options) {
      let file = options.file;
      // console.log(file.name.split('.')[file.name.split('.').length-1])
      if (file) {
        this.fileReader.readAsDataURL(file);
      }
      this.fileReader.onload = () => {
        let base64Str = this.fileReader.result;
        this.base64Str = this.fileReader.result.split(",")[1];
        this.fileType = file.name.split('.')[file.name.split('.').length-1]
        options.onSuccess("123", file);
      };
    },
    removeHandler (file) {
      this.fileList=this.fileList.filter(value=>{
        return file.uid!==value.uid;
      })
    },
    beforeUpload (file) {
      
      // const isIMAGE = file.type === 'application/pdf';
      if (this.fileList.length >= 1) {
        this.$globalMsg.error('最多上传一个');
        return false;
      }
      // if (!isIMAGE) {
      //   this.$globalMsg.error('文件类型错误');
      //   return false;
      // }
    },
    uploadSuccess (res, file) {
      let data = res;
      this.fileList.push({data,uid:file.uid})
    },
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.addTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.addTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.addTimeBegin = '';
        this.formInline.addTimeEnd = '';
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
    this.fileReader = new FileReader();
    this.getTableData();
    this.getpeople();// 获取在职电销员
    this.getchannel();// 获取渠道来源
  }
}
</script>

<style scoped lang="scss">
  div .upload-demo .el-upload--text{
    width: auto;
  }
  .mr20{
    margin-right: 20px;
  }
  .mb5{
    margin-bottom: 6px;
  }
  .box{
    // width: 100px;
    // height: 40px;
    .el-upload--text {
      width: 100px;
      height: auto;
    }
  }
  .el-upload {
    width: auto;
    height: auto;
  }
  .upload{
    background-color: #3a8ee6;
    display: inline-block;
    color: #ffffff;
    padding: 8px 6px;
    text-align: center;
    border-radius: 5px;
  }
  .mt-10{
    margin-top: -20px;
    margin-bottom: 6px;
  }
</style>
