<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('yn.no13')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="paixu">
      <span></span>
      <p>{{$t('yn.no13')}}</p>
    </div>
    

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.orderId"></el-input>
          </div>
        <div class="search-input">
          <span>{{$t('finance.payType')}}:</span>
          <el-select size="small" v-model="formInline.payType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('finance.channel')}}:</span>
          <el-select size="small" v-model="formInline.thirdChannel" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
          <div class="search-input">
            <span>{{$t('yn.no5')}}:</span>
            <el-select size="small" v-model="formInline.dealStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options4" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <div class="search-input">
          <span>{{$t('finance.createTime')}}:</span>
          <form autocomplete="off">
            <el-date-picker 
              id="timesel"
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
          <span>{{$t('yn.no15')}}:</span>
          <form autocomplete="off">
            <el-date-picker 
              id="successtime"
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
        <div class="search-input ml15"
        v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_PROCESSED_QUERY')">
          <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
        </div>
        
        <div class="search-input ml15"
        v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_PROCESSED_EXP')">
          <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_PROCESSED_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')">
          </el-table-column>
          <!----------- 应还金额 ----------->
          <el-table-column align="center" prop="amountDue" :label="$t('public.no27')">
            <template slot-scope="scope">
              <span v-if="scope.row.amountDue!==null&&scope.row.amountDue!==undefined&&scope.row.amountDue!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.amountDue)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" label="已还金额">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="还款计划">
            <template slot-scope="scope">
              <span class="table_opr" @click="loanDetali(scope.row.orderNo)">
                {{$t('loanAfterManage.sel')}}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="payType" :label="$t('loanAfterManage.payType')">
          </el-table-column>
          <el-table-column align="center" prop="bankName" :label="$t('public.no19')">
          </el-table-column>
          <el-table-column align="center" prop="repaymentCode" :label="$t('yn.no16')">
          </el-table-column>
          <el-table-column align="center" prop="repayMentTimeStr" :label="$t('public.no60')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="thirdChannel" :label="$t('finance.channel')">
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('yn.no17')">
          </el-table-column>
          <el-table-column align="center" prop="dealTimeStr" :label="$t('yn.no18')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="dealStatus" :label="$t('yn.no5')" min-width="80">
            <template slot-scope="scope">
              <span>{{$t($store.getters.handlingStatus(scope.row.dealStatus))}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" width="120">
            <template slot-scope="scope">
              <span
                v-if="scope.row.dealStatus<3&&$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_PROCESSED_DEAL')"
                class="table_opr"
                @click="handle(scope.row.orderId)"
              >
              {{$t('yn.no9')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_PROCESSED_LIST')">
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
    <!-- 处理弹窗 -->
    <el-dialog :title="$t('public.no61')" :visible.sync="handleFlag" width="760px" :show-message="false">
      <div class="left2right">
        <span class="left">{{$t('proManage.faqState')}}:</span>
        <span class="right">{{handleData.problemType==1?$t('yn.no11'):$t('yn.no12')}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanAfterManage.paycode')}}:</span>
        <span class="right">{{handleData.repaymentCode}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('serviceManage.requestDes')}}:</span>
        <span class="right">{{handleData.problemDes}}</span>
      </div>
      <div class="imgThree">
        <div v-if="handleData.pictureUrlOne" class="imgshow pic" @click="openBox({imgUrl:handleData.pictureUrlOne})">
          <img :src="handleData.pictureUrlOne" >
        </div>
        <div v-if="handleData.pictureUrlTwo" class="imgshow pic" @click="openBox({imgUrl:handleData.pictureUrlTwo})">
          <img :src="handleData.pictureUrlTwo" >
        </div>
        <div v-if="handleData.pictureUrlThree" class="imgshow pic" @click="openBox({imgUrl:handleData.pictureUrlThree})">
          <img :src="handleData.pictureUrlThree" >
        </div>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px" size="medium">
        <el-form-item :label="$t('yn.no20')" prop="problemType" >
          <el-select v-model="form.orderStatus" :placeholder="$t('public.placeholder')">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in options5 " :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('yn.no10')" prop="dealStatus" >
          <el-select v-model="form.dealStatus" :placeholder="$t('public.placeholder')">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in options4" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('serviceManage.requestDes')" prop="remark" >
          <el-input type="textarea" v-model="form.remark" :rows="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="mt15" type="primary" @click="handleSubmit('ruleForm')">{{$t('operationDetail.no22')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="foot"></div>

    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>

  </div>
</template>
<script>
import appLightbox from '../../components/component/lightbox'// 图片点击放大组件

export default {
  name: 'backMoneyAwait',
  components: {
    appLightbox
  },
  data () {
    return {
      dialogPlanVisible:false,  //还款计划弹框
      PlanData:[],//还款计划数据
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 创建时间
      searchTime2: [], // 还款成功时间
      formInline: { // 用户查询信息数据对应字段
        orderId: '',
        payType: '',
        dealStatus: '',
        thirdChannel: '',
        orderStatus: '',
        createTimeBegin: '',
        createTimeEnd: '',
        repayMentTimeBegin: '',
        repayMentTimeEnd: '',
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.backMoneyType_option,// 还款方式
      options2: this.$store.state.options.thirdChannel,// 通道
      options3: this.$store.state.options.partialRepaymentApplyOption,    // 订单状态
      options4: this.$store.state.options.handlingStatus1,     // 处理状态
      options5: this.$store.state.options.backOrder_status,     // 弹窗修改订单状态
      tableData: [],// 借款信息数据模拟
      handleFlag:false,// 处理弹窗开关
      lightBoxToggle:false,// 处理弹窗开关
      form:{
      },
      handleData:{
        idcardPhotoUrl:'http://e.hiphotos.baidu.com/image/pic/item/b151f8198618367afe76969623738bd4b21ce5fa.jpg'
      },
      rules: {// 电话催收表单验证项
        orderStatus: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        dealStatus: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        remark:[
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ]
      },
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
          this.dialogPlanVisible=true 
        if (res.data.header.code==0) {
          console.log(res,1111)
          this.PlanData=res.data.data
         
        }else{

        }
        
      })
    },
    openBox: function (obj) { // 图片放大显示
      this.currentObj = obj;
      this.lightBoxToggle = !this.lightBoxToggle;
    },
    closeBox: function () { // 图片放大关闭
      this.lightBoxToggle = false;
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
            action: this.$store.state.actionMap.ORDERP0003,
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
    getTableData () { // 获取借款列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ORDERP0002,
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
    handle(orderId){// 处理按钮点击弹窗
      this.form.orderId = orderId;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ORDERP0006,
          'sessionid': this.sessionid
        },
        orderId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.handleData = res.data.data;
        }
      })
      this.handleFlag = true;
    },
    handleSubmit(ruleForm){
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.ORDERP0007,
              'sessionid': this.sessionid
            },
            ...this.form
          }
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'));
              this.getTableData();
            } else {
              this.$globalMsg.error(res.data.header.msg);
            }
            this.form = {};
            this.handleFlag = false;
          })
        }
      })
    },
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.createTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.createTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.createTimeBegin = '';
        this.formInline.createTimeEnd = '';
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.repayMentTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.repayMentTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.repayMentTimeBegin = '';
        this.formInline.repayMentTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableData();// 获取借款列表
  }
}
</script>
<style scoped lang="scss">

.imgThree{
  width: 100%;
  padding: 10px 0 10px 40px;
  display: flex;
  flex-wrap: nowrap;
  .imgshow{
    margin-right: 10px;
    width: 200px;
  }
}
</style>
