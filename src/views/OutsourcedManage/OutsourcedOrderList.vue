<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('OutsourcedManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('OutsourcedManage.no2')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('OutsourcedManage.no2')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" >
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('loanAfterManage.orderId')}}:</span>
            <el-input size="small" label="id" v-model="formInline.orderId"></el-input>
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
          <el-select clearable size="small" v-model="adminId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in adminOptions" :key="item.value" :label="item.label" :value="item.value">
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
          <el-input size="small" style="width:50px" label="phone" v-model="formInline.overdueDaysBegin"></el-input>
          ~
          <el-input size="small" style="width:50px" label="phone" v-model="formInline.overdueDaysEnd"></el-input>
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
        <div class="search-input">
          <span>{{$t('OutsourcedManage.no5')}}:</span>
          <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
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
        <template >
          <!-- <el-col :md="3" :lg="2" :xl="2"> -->
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
      </el-row>
    </div>

    <div class="action act" >
      <div class="search-input mar15" v-if="$store.state.common.permiss.includes('RIGHT_OUTSOURCING_MANAGEMENT_TRANSFER')">
        <el-button type="primary" class="button-color" @click="todayRedeploy">{{$t('loanAfterManage.redeploy')}}</el-button>
      </div>
      <div class="search-input mar15" v-if="$store.state.common.permiss.includes('RIGHT_OUTSOURCING_MANAGEMENT_WITHDRAW')">
        <el-button type="primary" class="button-color" @click="gobackBegin">{{$t('OutsourcedManage.no13')}}</el-button>
      </div>
      <div class="search-input mar15" v-if="$store.state.common.permiss.includes('RIGHT_OUTSOURCING_MANAGEMENT_PERSONALITY_ORDER')">
        <el-button type="primary" class="button-color" @click="selfdomAllotBegin">{{$t('OutsourcedManage.no14')}}</el-button>
      </div>
      <div class="search-input mar15" v-if="$store.state.common.permiss.includes('RIGHT_OUTSOURCING_MANAGEMENT_AVG_ORDER')">
        <el-button type="primary" class="button-color" @click="averageBegin">{{$t('OutsourcedManage.no15')}}</el-button>
      </div>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_OUTSOURCING_MANAGEMENT_QUERY')">
      <template>
        <el-table :data="tableData" size="small" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" :selectable="unSelect">
          </el-table-column>
          <el-table-column align="center" prop="orderId" :label="$t('loanAfterManage.orderId')" width="60">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" min-width="80">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="userPhone" :label="$t('yuenan.no23')" min-width="80">
              <template slot-scope="scope">
                <span >{{$store.getters.vn_phone(scope.row.userPhone)}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" min-width="68">
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" :label="$t('public.no56')" min-width="68">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="waitAmount" :label="$t('loanAfterManage.waitAmount')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.waitAmount!==null&&scope.row.waitAmount!==undefined&&scope.row.waitAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.waitAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strLastTime" :label="$t('loanAfterManage.time')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.no71')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.backMoneyDate')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('loanAfterManage.status')" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.operationStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('loanAfterManage.name')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('OutsourcedManage.no5')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('loanAfterManage.type')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.type!==null&&scope.row.type!==undefined&&scope.row.type!==''">{{$t($store.getters.collectionStatus(scope.row.type))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('OutsourcedManage.no5')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="maxOverdueDays" :label="$t('new.no77')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="repeatCount" :label="$t('new.no78')" min-width="100">
          </el-table-column>
          <template v-if="$store.state.common.lang!=='PHL'">
            <el-table-column align="center" prop="strCallTime" :label="$t('new.no83')" min-width="86">
            </el-table-column>
            <el-table-column align="center" prop="callStatus" :label="$t('new.no84')" min-width="80">
              <template slot-scope="scope">
                <span >{{$t($store.getters.callStatus_status(scope.row.callStatus))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" width="100" >
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_OUTSOURCING_MANAGEMENT_DETAIL')"
                style="color:#547ef6;cursor:pointer" 
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
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_OUTSOURCING_MANAGEMENT_QUERY')">
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
    <div v-if="redeployFlag" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p>{{$t('loanAfterManage.redeploy')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="redeployClose"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-con-one">
            <p>{{$t('loanAfterManage.type')}}:&nbsp;&nbsp;&nbsp;&nbsp; <span>{{orderType}}</span> </p>
          </div>
          <div class="detail-con-one">
            <div class="detail-con-one-4">
              {{$t('loanAfterManage.redeployTo')}}: &nbsp;&nbsp;
            </div>
            <div class="detail-con-one-3">
              <el-select size="small" v-model="redeployStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="detail-con-one">
            <div class="detail-con-one-4" style="line-height:26px;">
              {{$t('loanAfterManage.reason')}}:
            </div>
            <div class="detail-con-one-3">
              <textarea class="search_inpu" v-model="reason" :placeholder="$t('loanAfterManage.placeholder')+'~'"></textarea>
            </div>
          </div>
          <div class="detail-but" @click="redeploySubmit">{{$t('loanAfterManage.sure')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击转派弹窗结束 -------------------- -->

    <!-- ------------------ 点击撤销弹窗开始 -------------------- -->
    <el-dialog :title="$t('OutsourcedManage.no13')" :visible.sync="gobackFlag"  width="660px">
      <p>{{ gobackNumber + $t('OutsourcedManage.no16')}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gobackFlag = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="gobackSure">{{$t('public.no49')}}</el-button>
      </span>
    </el-dialog>
    <!-- ------------------ 点击撤销弹窗结束 -------------------- -->

    <!-- ------------------ 点击个性分单弹窗开始 -------------------- -->
    <el-dialog :title="$t('OutsourcedManage.no14')" :visible.sync="selfdomFlag"  width="1200px">
      <p class="form-p">
        <span class="form-span2">{{$t('OutsourcedManage.no17')}}:</span>
        <span>{{noallotOrders}}</span>
      </p>
      <el-table :data="tableData2" size="small" style="min-height:440px">
        <el-table-column type="index" :label="$t('serviceManage.index')">
        </el-table-column>
        <el-table-column align="center" prop="adminName" :label="$t('public.name')" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="account" :label="$t('OutsourcedManage.no25')" min-width="70">
        </el-table-column>
        <el-table-column align="center" prop="adminTotalAmount" :label="$t('OutsourcedManage.no21')" min-width="70">
        </el-table-column>
        <el-table-column align="center" prop="recallAmount" :label="$t('OutsourcedManage.no22')" min-width="70">
          <template slot-scope="scope">
            <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
            <span v-else>{{$store.state.common.nullData}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remainAmount" :label="$t('OutsourcedManage.no23')" min-width="90">
        </el-table-column>
        <el-table-column align="center" prop="operation" :label="$t('public.operation')" width="140">
          <template slot-scope="scope">
            <div class="fenpei">
              <span>{{$t('OutsourcedManage.no24')}}</span>
              <el-input size="mini" v-model="inputValue[scope.row.adminId]"></el-input>
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

    <!-- ------------------ 点击平均分单弹窗开始 -------------------- -->
    <el-dialog :title="$t('OutsourcedManage.no15')" :visible.sync="averageFlag"  width="660px">
      <!-- <p>请设置一个数值，系统将会从筛选出的案件中，给予现有的坐席账号同等的案件数</p> -->
      <el-form :model="averageForm" label-width="140px" size="medium">
        <p class="form-p">
          <span class="form-span1">{{$t('OutsourcedManage.no17')}}:</span>
          <span>{{noallotOrders}}</span>
        </p>
        <el-form-item :label="$t('OutsourcedManage.no15')"  >
          <el-input v-model="averageForm.numbers" @blur="judgeOrderNum" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="averageFlag = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="averageSure">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    <!-- ------------------ 点击平均分单弹窗结束 -------------------- -->

  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      pageTotal1: 0, // 个性分单分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 最后催收时间
      searchTime2: [], // 入催时间
      searchTime3: [], // 还款时间
      searchTime4: [], // 承诺还款时间
      searchTime5: [], // 最近群呼时间
      formInline: { // 用户查询信息数据对应字段
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
        callStartTime:'',
        callEndTime:'',
        callStatus: '',
        type: ''
      },
      adminId: '',
      currentPage: 1, // 当前页下标
      currentPage1: 1, // 当前页下标
      options1: this.$store.state.options.collection_option, // 催收状态下拉选框信息
      options2: [], // 全部催收员列表
      adminOptions: [], // 全部催收员列表
      options3: [], // 逾期类型
      options4: [], // 委外公司
      options6: this.$store.state.options.groupCalls_options, // 群呼结果下拉选框信息
      tableData: [],// 列表信息数据
      tableData1: [],// 个性分单列表信息数据
      tableData2: [],// 个性分单列表信息数据
      redeployFlag: false, // 转派弹窗开关
      gobackFlag: false, // 撤回弹窗开关
      selfdomFlag: false, // 个性分单弹窗开关
      averageFlag: false, // 平均分单弹窗开关
      redeployStatus: '', // 转派弹窗客服下拉框对应数据
      multipleSelection: [], // 可勾选表格选中项
      orderIds: [], // 选中的订单ID数组
      orderNos: [], // 选中的订单编号数组
      orderType: '', // 订单类型
      reason: '',// 转派原因描述
      gobackNumber:'',// 撤回时选择的订单数量
      averageForm:{// 平均分单数据
        numbers:'',
        getNum:''
      },
      noallotOrders:0,// 个性平均分单未分配总量
      inputValue:{},// 个性分单分配的值
      allocationNumber:[]// 个性分单集合
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.dataList();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = val
      this.dataList();
    },
    select () { // 点击查询按钮操作
      if (this.flag) {
        this.flag = false
        this.dataList();
      }
    },
    loanDetali (orderNo, userId) { // 查看详情操作
      this.$router.push({path: '/outsourceddetail', query: {userId, orderNo,block:1}})
    },
    dataList () { // 获取委外订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.outSourcedList,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline,
        adminId:this.adminId
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    handleSelectionChange (val) { // 表格选中项数据
      this.multipleSelection = val
    },
    unSelect (row, index) {// 限制选择内容
      return row.status != 100
    },
    todayRedeploy () { // 转派按钮点击操作
      if (this.orderIds == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.selFirst'))
      } else {
        this.redeployFlag = true
      }
    },
    redeployClose () {// 转派弹窗关闭操作
      this.redeployFlag = false
      this.redeployStatus = ''
      this.reason = ''
    },
    joinType () { // 订单转派弹窗对应数据处理
      let unique = function (arr) {
        var res = []
        var json = {}
        for (var i = 0; i < arr.length; i++) {
          if (!json[arr[i]]) {
            res.push(arr[i])
            json[arr[i]] = 1
          }
        }
        return res
      }
      let arr = []
      let brr = []
      let crr = []
      this.multipleSelection.forEach(value => {
        arr.push(value.orderNo)
        brr.push(value.type)
      })
      brr = unique(brr)
      brr.forEach(item => {
        if (item == 1) {
          crr.push('S1')
        }
        if (item == 2) {
          crr.push('S2')
        }
        if (item == 3) {
          crr.push('M1')
        }
        if (item == 4) {
          crr.push('M2')
        }
        if (item == 5) {
          crr.push('M3')
        }
        if (item == 6) {
          crr.push('S3')
        }
        if (item == 7) {
          crr.push('M3+')
        }
        if (item == 0) {
          crr.push('S1')
        }
      })
      this.orderIds = arr
      this.orderType = crr.join()
    },
    redeploySubmit () { // 转派确认操作
      if (this.redeployStatus == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.adminFirst'))
        return
      }
      if (this.reason == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.placeholder'))
        return
      }
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.outSourcedList_zhuan,
            'sessionid': this.sessionid
          },
          orderNos: this.orderIds,
          adminId: this.redeployStatus,
          remark: this.reason
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.dataList()
          this.multipleSelection = []
          this.redeployStatus = ''
          this.reason = ''
          this.redeployFlag = false
        })
      }
    },
    operationAdmin () { // 获取在职催收员列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        status: 1,
        type:0,
        outSource:2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data
          arr.forEach(value => {
            value.value = value.id
            value.label = value.name
          })
          this.options2 = arr
          this.adminOptions = arr
          this.adminOptions.push({label:'无',value:0})
        }
      })
    },
    gobackBegin(){// 撤回操作开始
      if (this.orderIds == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.selFirst'))
      } else {
        this.gobackNumber = this.orderIds.length
        this.gobackFlag = true
      }
    },
    gobackSure(){// 撤回弹窗确认操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.outSourcedList_goback,
            'sessionid': this.sessionid
          },
          orderNos: this.orderIds
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.dataList()
          this.gobackFlag = false
        })
      }
    },
    averageSure(){// 平均分单弹窗确认操作
      if(this.averageForm.getNum!==''){
        if(this.averageForm.getNum==1){
          this.$globalMsg.error(this.$t('OutsourcedManage.no19'))
          return false;
        }
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.averageSure,
            'sessionid': this.sessionid
          },
          ...this.formInline,
          numbers: this.averageForm.numbers
        }
        this.$axios.post('', option).then(res => {
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
        })
        this.averageFlag = false
        
      }else{
        this.$globalMsg.error(this.$t('OutsourcedManage.no20'))
      }
    },
    judgeOrderNum(){// 判断数值是否大于筛选出的案件数
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.judgeOrderNum,
          'sessionid': this.sessionid
        },
        numbers: this.averageForm.numbers,
        totalAmount: this.noallotOrders
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.averageForm.getNum = res.data.data
          if(res.data.data==0){
            this.$globalMsg.success(this.$t('OutsourcedManage.no18'))
          }else{
            this.$globalMsg.error(this.$t('OutsourcedManage.no19'))
          }
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
    selfdomAllotBegin(){// 个性分单按钮点击操作
      this.selfdomFlag = true;
      this.getselfdomTable()
    },
    averageBegin(){
      this.averageFlag = true;
      this.getselfdomTable()
    },
    getselfdomTable(){// 获取个性分单列表
      this.tableData1 = [];
      this.tableData2 = [];
      this.noallotOrders = 0;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.getselfdomTable,
          'sessionid': this.sessionid
        },
        ...this.formInline,
        adminId:this.adminId
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData1 = res.data.data
          this.tableData2 = this.tableData1.slice(0,10)
          this.pageTotal1 = this.tableData1.length
          if(this.tableData1!=''){
            this.noallotOrders = this.tableData1[0].totalAmount
          }
        }
      })
    },
    handleCurrentChange1 (val) { // 个性分单分页按钮操作
      this.currentPage1 = val
      this.tableData2 = this.tableData1.slice((val-1)*10,val*10)
    },
    selfdomSure(){// 个性分单确认按钮
      let sum = 0;
      let arr = [];
      for (var index in this.inputValue){
        if(this.inputValue[index]!=''){
          sum+=Number(this.inputValue[index])
          arr.push({adminId:index,numbers:Number(this.inputValue[index])})
        }
      }
      this.allocationNumber = arr
      // console.log(this.allocationNumber)
      if(this.allocationNumber==''){
        this.$globalMsg.error(this.$t('OutsourcedManage.no20'));
        return false;
      }
      if(sum>Number(this.noallotOrders)){
        this.$globalMsg.error(this.$t('OutsourcedManage.no19'));
        return false;
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.selfdomSure,
          'sessionid': this.sessionid
        },
        ...this.formInline,
        adminIdAndNumbers: this.allocationNumber
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
      this.inputValue = {}
      this.selfdomFlag = false
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
            value.label = value.optionName
            value.value = value.optionValue
          })
          this.options3 = arr;
        }
      })
    },
    getOutCompany () { // 获取委外公司名称
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_groupName,
          'sessionid': this.sessionid
        },
        outSource:2,
        type:2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data
          arr.forEach(value => {
            value.value = value.id
            value.label = value.groupName
          })
          this.options4 = arr;
        }
      })
    },
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.collectionTimeBegin = this.searchTime[0]
        this.formInline.collectionTimeEnd = this.searchTime[1]
      } else {
        this.formInline.collectionTimeBegin = ''
        this.formInline.collectionTimeEnd = ''
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.createTimeBegin = this.searchTime2[0]
        this.formInline.createTimeEnd = this.searchTime2[1]
      } else {
        this.formInline.createTimeBegin = ''
        this.formInline.createTimeEnd = ''
      }
    },
    searchTime3 () {
      if (this.searchTime3) {
        this.formInline.lastRefundTimeBegin = this.searchTime3[0]
        this.formInline.lastRefundTimeEnd = this.searchTime3[1]
      } else {
        this.formInline.lastRefundTimeBegin = ''
        this.formInline.lastRefundTimeEnd = ''
      }
    },
    searchTime4 () {
      if (this.searchTime4) {
        this.formInline.promiseTimeBegin = this.searchTime4[0]
        this.formInline.promiseTimeEnd = this.searchTime4[1]
      } else {
        this.formInline.promiseTimeBegin = ''
        this.formInline.promiseTimeEnd = ''
      }
    },
    searchTime5 () {
      if (this.searchTime5) {
        this.formInline.callStartTime = this.searchTime5[0]
        this.formInline.callEndTime = this.searchTime5[1]
      } else {
        this.formInline.callStartTime = ''
        this.formInline.callEndTime = ''
      }
    },
    multipleSelection () {
      this.joinType()
    },
    gobackFlag () {
      if(!this.gobackFlag){
        this.dataList()
      }
    },
    selfdomFlag () {
      if(!this.selfdomFlag){
        this.inputValue = {}
        this.tableData1 = [];
        this.tableData2 = [];
        this.noallotOrders = 0;
        this.dataList()
      }
    },
    averageFlag(){
      if(!this.selfdomFlag){
        this.averageForm.numbers = ''
        this.averageForm.getNum = ''
        this.noallotOrders = 0;
        setTimeout(()=>{
          this.dataList()
        },500)
        
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.dataList()// 获取借款列表
    this.getcollectionType()// 获取催收阶段
    this.operationAdmin()// 获取在职催收员
    this.getOutCompany()// 获取在职催收员
  }
}
</script>

<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}

.usermanage {
  width: 100%;
  height: auto;
  padding: 20px 30px;
  background-color: rgba(246, 249, 252, 1);
  position: relative;
}
.paixu {
  width: 100%;
  height: auto;
  line-height: 48px;
  background: rgba(224, 229, 246, 1);
  border-radius: 4px;
  span {
    display: block;
    float: left;
    margin-top: 10px;
    background-color: rgba(84, 126, 245, 1);
    width: 4px;
    height: 30px;
    border-radius: 5px;
  }
  p {
    color: rgba(84, 126, 245, 1);
    font-size: 16px;
    margin-left: 20px;
  }
  
}
.search {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 18px;
  margin-bottom: 22px;
  padding: 22px 28px 22px 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  .search-input {
    height: 50px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    & > span {
      padding: 0 5px;
      font-size: 14px;
      white-space: nowrap;
      @include flex-cen;
    }
    // .margin{
    //   margin-left: 15px;
    // }
    .el-input {
      flex: auto;
      @include flex-cen;
    }
    .el-date-editor {
      margin: 0 5px;
    }
    .el-select {
      flex: auto;
      @include flex-cen;
    }
    .el-button--primary{
      height: 40px;
      
    }
    .button-color{
      background-color: #1D7BFF;
      border-color: #547ef6;
    }
  }
}
.action{
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 18px;
  margin-bottom: 22px;
  padding: 5px 28px 5px 5px;
  display: flex;
  flex-wrap: nowrap;
}
.mar15{
  margin: 0 15px;
}

.table {
  min-height: 540px;
}
span.active1{
  color: #FF6700;
}
span.active2{
  color: #8FD78D;
}
span.active3{
  color: #3b56ee;
}


// 查看详情
.detail{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 694px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom:5px; 
    .detail-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .detail-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .detail-con-one{
        width: 100%;
        display: flex;
        margin: 10px 0;
        p{
          padding-left: 14px;
          color: #999;
          span{
            color: #000;
            margin: 0 5px;
          }
        }
        .detail-con-one-4{
          width: auto;
          height: 40px;
          text-align: center;
          padding: 0 15px;
          white-space: nowrap;
          line-height: 40px;
          color: #999;
        }
        .detail-con-one-3{
          width: 100%;
          display: flex;
          align-items: center;
          textarea{
            width: 100%;
            height: 100px;
            padding: 5px;
            font-size: 16px;
          }
        }
      }
      .detail-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 10px auto;
        text-align: center;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
} 

.form-p{
  display: flex;
  height: 38px;
  .form-span1{
    width: 140px;
    display: block;
    text-align: right;
    padding-right: 14px;
    margin-right: 8px;
  }
  .form-span2{
    text-align: left;
  }
}
.fenpei{
  display: flex;
  span{
    white-space: nowrap;
    padding-top: 5px;
  }
}
</style>
