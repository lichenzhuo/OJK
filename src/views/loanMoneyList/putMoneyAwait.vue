<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('yn.no14')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('yn.no14')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.orderId"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.userPhone')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.phone"></el-input>
          </div>
        <div class="search-input">
          <span>{{$t('finance.putMoneyType')}}:</span>
          <el-select size="small" v-model="formInline.loanType" :placeholder="$t('public.placeholder')">
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
          <span>{{$t('finance.status')}}:</span>
          <el-select size="small" v-model="formInline.lendStatus" :placeholder="$t('public.placeholder')">
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
          <span>{{$t('finance.successDate')}}:</span>
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
        <div class="search-input">
          <span>{{$t('yn.no18')}}:</span>
          <form autocomplete="off">
            <el-date-picker 
              id="chulidate"
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
        <div class="search-input ml15" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_PROCESSED_QUERY')">
          <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
        </div>
        <div class="search-input ml15" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_PROCESSED_EXP')">
          <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_PROCESSED_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe empty-text>
          <el-table-column align="center" prop="transactionId" :label="$t('yn.no19')" >
          </el-table-column>
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.no18')" >
          </el-table-column>
          <el-table-column align="center" prop="loanType" :label="$t('finance.putMoneyType')" >
            <template slot-scope="scope">
              <span v-if="scope.row.loanType!==null&&scope.row.loanType!==undefined&&scope.row.loanType!==''">{{scope.row.loanType==1?$t('finance.putType.no1'):$t('finance.putType.no2')}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bankName" :label="$t('public.no19')" >
          </el-table-column>
          <el-table-column align="center" prop="bankAccount" :label="$t('finance.bluePayeeAccount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="amount" :label="$t('finance.amount')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.amount!==null&&scope.row.amount!==undefined&&scope.row.amount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.amount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="thirdChannel" :label="$t('finance.channel')" >
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('finance.status')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.putMoneyLogStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="orderCreateTimeStr" :label="$t('yn.no25')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="lendTimeStr" :label="$t('finance.successTime')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="dealTimeStr" :label="$t('yn.no18')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('yn.no17')" >
          </el-table-column>
          <el-table-column align="center" prop="dealStatus" :label="$t('yn.no5')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.handlingStatus(scope.row.dealStatus))}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <span
                v-if="scope.row.dealStatus<3&&$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_PROCESSED_DEAL')"
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
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_PROCESSED_LIST')">
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

    <!-- 处理弹窗 -->
    <el-dialog :title="$t('public.no61')" :visible.sync="handleFlag"  width="760px" :show-message="false">
      <div class="left2right">
        <span class="left">{{$t('proManage.faqState')}}:</span>
        <span class="right">{{handleData.problemType==1?$t('yn.no11'):$t('yn.no12')}}</span>
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
          <el-button style="margin-top:10px;" type="primary" @click="handleSubmit('ruleForm')">{{$t('operationDetail.no22')}}</el-button>
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
  name: 'putMoneyAwait',
  components: {
    appLightbox
  },
  data () {
    return {
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 创建时间
      searchTime2: [], // 还款成功时间
      searchTime3: [], // 处理时间
      formInline: { // 用户查询信息数据对应字段
        thirdChannel: '',
        orderId: '',
        loanType: '',
        dealStatus: '',
        lendStatus: '',
        phone: '',
        createTimeBegin: '',
        createTimeEnd: '',
        lendTimeBegin: '',
        lendTimeEnd: '',
        dealTimeBegin: '',
        dealTimeEnd: '',
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.putMoneyLog_putType,// 放款类型
      options2: this.$store.state.options.thirdChannel,// 通道
      options3: this.$store.state.options.putStatus_putAwait,    // 打款状态
      options4: this.$store.state.options.handlingStatus1,     // 处理状态
      options5: this.$store.state.options.putStatus_putAwait1,     // 弹窗订单状态修改
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
      this.currentPage = val
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
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.ORDERP0005,
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
    loanDetali (orderNo, userId) { // 查看详情操作
      this.$router.push({path: '/loanmoneydetail', query: {userId, orderNo}});
    },
    getTableData () { // 获取借款列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ORDERP0004,
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
      this.form.orderId = orderId
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
        this.formInline.lendTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.lendTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.lendTimeBegin = '';
        this.formInline.lendTimeEnd = '';
      }
    },
    searchTime3 () {
      if (this.searchTime3) {
        this.formInline.dealTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime3[0]);
        this.formInline.dealTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime3[1]);
      } else {
        this.formInline.dealTimeBegin = '';
        this.formInline.dealTimeEnd = '';
      }
    },
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
