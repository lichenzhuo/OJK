<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('userList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('userList.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="paixu">
      <span></span>
      <p>{{$t('userList.crumbsTwo')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>{{$t('public.userId')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.userId"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.userName')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.name"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.userPhone')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.phone"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.loanNum')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.orderCount"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.registerChannel')}}:</span>
          <el-input size="small" style="width:130px;" label="regChannel" v-model="formInline.regChannel"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('add.no91')}}:</span>
          <el-input size="small" style="width:130px;" label="regChannelSecond" v-model="formInline.regChannelSecond"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.approveStatus')}}:</span>
          <el-select size="small" v-model="formInline.isAuth" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.userSelfStatus')}}:</span>
          <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no48')}}:</span>
          <el-select size="small" clearable v-model="formInline.appName" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,i) in options3" :key="i" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no49')}}:</span>
          <el-select size="small" clearable v-model="formInline.appPackage" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,i) in options4" :key="i" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.lang==='vi'">
          <div class="search-input">
            <span>{{$t('public.registerClient')}}:</span>
            <el-select size="small" v-model="formInline.regDevice" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options5" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
            <div class="search-input">
              <span>{{$t('public.no2')}}:</span>
              <el-input size="small" label="idCard" v-model="formInline.idCard"></el-input>
            </div>
        </template>
          <div class="search-input">
            <span>{{$t('public.registerDate')}}:</span>
            <el-date-picker 
              id="date1"
              v-model="searchTime" 
              size="small"
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_EXP')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <div class="list_operation" >
      <el-button 
        v-if="$store.state.common.permiss.includes('RIGHT_ADD_SPECIAL_USER_STATUS')"
        type="primary"  
        @click="addFlagShow">{{$t('new.no65')}}</el-button>
      <el-button 
        v-if="$store.state.common.permiss.includes('RIGHT_TRANSFER_PHONEMARKET')"
        type="primary" 
        @click="showMarketing">{{$t('add.no71')}}
      </el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table"  v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_LIST')">
      <template v-if="$store.state.common.lang==='vi'">
        <el-table 
          v-loading="loadFlag"
          :data="tableData" 
          size="small"
          style="width: 100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection"  width="55">
          </el-table-column>
          <el-table-column align="center" prop="id" :label="$t('public.userId')" >
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userPhone')" >
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('public.name')" >
          </el-table-column>
          <el-table-column align="center" prop="idCard" :label="$t('public.no2')" >
          </el-table-column>
          <el-table-column align="center" prop="regChannel" :label="$t('public.registerChannel')" >
          </el-table-column>
          <el-table-column align="center" prop="regChannelSecond" :label="$t('add.no91')" >
          </el-table-column>
          <el-table-column align="center" prop="isAuth" :label="$t('public.approveStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.new_userSelfStatus(scope.row.isAuth))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="orderCount" :label="$t('public.loanNum')" >
          </el-table-column>
          <el-table-column align="center" prop="isBlack" :label="$t('public.userSelfStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.blackStatus(scope.row.isBlack))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strRegTime" :label="$t('public.registerDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="appName" :label="$t('new.no48')" >
          </el-table-column>
          <el-table-column align="center" prop="appPackage" :label="$t('new.no49')" >
          </el-table-column>
          <el-table-column align="center" prop="regDeviceName" :label="$t('public.registerClient')" >
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" >
            <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_DETAIL')">
              <span class="table_opr" @click="socialDetali(scope.row.id)">{{$t('public.detail')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-table 
          v-loading="loadFlag"
          :data="tableData" 
          size="small" 
          style="width: 100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection"  width="55">
          </el-table-column>
          <el-table-column align="center" prop="id" :label="$t('public.userId')" >
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userPhone')" >
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('public.name')" >
          </el-table-column>
          <el-table-column align="center" prop="regChannel" :label="$t('public.registerChannel')" >
          </el-table-column>
          <el-table-column align="center" prop="regChannelSecond" :label="$t('add.no91')" >
          </el-table-column>
          <el-table-column align="center" prop="isAuth" :label="$t('public.approveStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.new_userSelfStatus(scope.row.isAuth))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="orderCount" :label="$t('public.loanNum')" >
          </el-table-column>
          <el-table-column align="center" prop="isBlack" :label="$t('public.userSelfStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.blackStatus(scope.row.isBlack))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strRegTime" :label="$t('public.registerDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="appName" :label="$t('new.no48')" >
          </el-table-column>
          <el-table-column align="center" prop="appPackage" :label="$t('new.no49')" >
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" >
            <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_DETAIL')">
              <span class="table_opr" @click="socialDetali(scope.row.id)">{{$t('public.detail')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="sizes, prev, pager, next, total,->"
          :page-sizes="[10, 15, 20, 30, 100]"
          :page-size="pageNumber"
          @size-change="handleSizeChange"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>

    <!-- ------------  添加特殊名单  ------------------------ -->
    <el-dialog :title="$t('new.no65')" :visible.sync="addFlag" width="40%">
      <el-form :model="addUser" size="small" ref="copyForm" label-width="120px">
        <el-form-item :label="$t('public.userSelfStatus')">
          <el-select size="small" v-model="addUser.userStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options6" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('public.no37')">
          <el-input type="textarea" v-model="addUser.remark" :rows="4" :placeholder="$t('loanMoney.placeholder')+'~'"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="addUserSubmit">{{$t('public.no47')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- ------------  转电销  ------------------------ -->
    <el-dialog :title="$t('add.no72')" :visible.sync="marketingFlag" width="560">
      <div class="left2right">
        <span class="left">{{$t('add.no73')}}:</span>
        <span class="right">{{phoneMarketList.length}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('add.no74')}}:  </span>
        <span class="right">
          <el-input size="small" v-model="marketing.appUrl"></el-input>
        </span>
      </div>
      <div class="left2right">
        <span class="left"></span>
        <span class="right">
          <el-button type="primary" size="small" @click="marketingSure">{{$t('proManage.sure')}}</el-button>
        </span>
      </div>
    </el-dialog>


    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      flag: true,
      loadFlag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询日期
      // 用户查询信息数据对应字段
      formInline: {
        userId: '',
        name: '',
        phone: '',
        orderCount: '',
        idCard: '',
        regChannel: '',
        regChannelSecond: '',
        regDateBegin: '',
        regDateEnd: '',
        status: '',
        appName: '',
        appPackage: '',
        regDevice: '',
        isAuth: ''
      },
      currentPage: 1, // 当前页下标
      addFlag: false, // 添加特殊名单弹窗开关
      options1: this.$store.state.options.approveStatus_options, // 认证状态下拉选框信息
      options2: this.$store.state.options.blackStatus_options, // 身份状态下拉选框信息
      options3: [], // APP名下拉选框信息
      options4: [], // APP包名身份状态下拉选框信息
      tableData: [], // 用户信息数据模拟
      options5: this.$store.state.options.registerClient, // 注册客户端类型
      options6: this.$store.state.options.addSpecialUser,  // 添加特殊名单用户状态
      addUser: {
        userStatus: '',
        remark: ''
      },
      tableSelect: '',
      radioVal: '',
      marketingFlag: false,
      marketing:{
        appUrl: ''
      },
      tableSelection: [],
      phoneMarketList: [],
      orderIds: [],
      userIds: [],
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.userList();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.tableSelect = '';
      this.radioVal = '';
      this.currentPage = val;
      this.userList();
    },
    socialDetali (id) { // 查看详情操作
      this.$router.push({path: '/userdetail?userId=' + id});
    },
    select () { // 点击查询按钮操作
      this.tableSelect = '';
      this.radioVal = '';
      this.$store.commit('userList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.userList();
      }
    },
    userList () { // 获取用户列表
      this.tableSelect = '';
      this.radioVal = '';
      this.loadFlag = true;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.consumer_list,
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
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.consumer_list_excel,
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
    getAppName () { // 获取app名字和包名
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
          'sessionid': this.sessionid
        },
        'optionGroup': 'package'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            this.options3.push({value: value.optionName, label: value.optionName});
            this.options4.push({value: value.optionValue, label: value.optionValue});
          })
          this.addContent = true;
        }
      })
    },
    addFlagShow () {
      if(this.userIds==''){
        this.$globalMsg.error(this.$t('public.no89'));
      }else{
        this.addFlag = true;
      }
    },
    addFlagClose () {
      this.addFlag = false;
      this.addUser.userStatus = '';
      this.addUser.remark = '';
    },
    addUserSubmit () {
      if (this.addUser.userStatus == '' || this.addUser.remark == '') {
        this.$globalMsg.error(this.$t('public.no88'))
        return;
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.addSpecialUser,
          'sessionid': this.sessionid
        },
        id: this.userIds,
        status: this.addUser.userStatus,
        remark:this.addUser.remark
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
        }else {
          this.$globalMsg.error(res.data.header.msg)
        }
        this.userList();
        this.addFlag = false;
        this.addUser.userStatus = '';
        this.addUser.remark = '';
      })
    },
    tableRowChange (val) {
      this.tableSelect = val.id;
      this.radioVal = val.id;
    },
    tableRowClassName({row, rowIndex}) {
      if (row.isPhoneMarket == 1) {
        return 'info-row';
      }
      return '';
    },
    showMarketing() {
      if(this.userIds==''){
        this.$globalMsg.error(this.$t('public.no89'));
      }else{
        this.marketingFlag = true;
      }
    },
    marketingSure() {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0007,
          'sessionid': this.sessionid
        },
        phoneMarketList: this.phoneMarketList,
        appUrl:this.marketing.appUrl
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
        }else {
          this.$globalMsg.error(res.data.header.msg)
        }
        this.userList();
        this.marketingFlag = false;
        this.marketing.appUrl = '';
      })
      
    },
    handleSelectionChange (val) { // 表格选中项数据
      this.tableSelection = val;
    },
    joinType () { // 选中数据做处理
      let arr = [];
      let brr = [];
      this.tableSelection.forEach(value => {
        arr.push({userId:value.id,phone:value.phone,name:value.name,idCard:value.idCard,isPhoneMarket:value.isPhoneMarket});
        brr.push(value.id);
      })
      this.phoneMarketList = arr.filter(value=>value.isPhoneMarket!=1);
      this.userIds = brr;
    },
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.regDateBegin = this.$store.getters.yyyy_m_d( this.searchTime[0]);
        this.formInline.regDateEnd = this.$store.getters.yyyy_m_d( this.searchTime[1]);
        
      } else {
        this.formInline.regDateBegin = '';
        this.formInline.regDateEnd = '';
      }
    },
    tableSelection () {
      this.joinType()
    },
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.userList_select) !== '{}') {
      this.formInline = this.$store.state.common.userList_select;
      if(this.formInline.regDateBegin!==''){
        this.searchTime.push(this.formInline.regDateBegin);
        this.searchTime.push(this.formInline.regDateEnd);
      }
      
    }
    this.userList();
    this.getAppName();
  }
}
</script>
<style >
  div.el-table tr.info-row {
    color: #2891fa;
  }
  
</style>
