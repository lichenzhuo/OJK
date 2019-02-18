<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('yn.no13')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('yn.no13')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.orderId"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('finance.payType')}}:</span>
            <el-select size="small" v-model="formInline.payType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('finance.channel')}}:</span>
            <el-select size="small" v-model="formInline.thirdChannel" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="9" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('public.orderStatus')}}:</span>
            <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="9" :lg="6" :xl="5">
            <div class="search-input">
              <span>{{$t('yn.no5')}}:</span>
              <el-select size="small" v-model="formInline.dealStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options4" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        <el-col :md="14" :lg="11" :xl="7">
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
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
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
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_PROCESSED_QUERY')">
          <!-- <el-col :md="3" :lg="2" :xl="2"> -->
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
        
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_PROCESSED_EXP')">
          <!-- <el-col :md="5" :lg="2" :xl="2"> -->
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_PROCESSED_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe empty-text>
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')" width="60">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="repaymentAmount" :label="$t('public.no27')" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.repaymentAmount!==null&&scope.row.repaymentAmount!==undefined&&scope.row.repaymentAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.repaymentAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="repaymentAmountPay" :label="$t('public.no57')" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.repaymentAmountPay!==null&&scope.row.repaymentAmountPay!==undefined&&scope.row.repaymentAmountPay!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.repaymentAmountPay)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="payType" :label="$t('loanAfterManage.payType')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="bankName" :label="$t('public.no19')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="repaymentCode" :label="$t('yn.no16')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="repayMentTimeStr" :label="$t('public.no60')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="thirdChannel" :label="$t('finance.channel')" min-width="70">
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('yn.no17')" min-width="70">
          </el-table-column>
          <el-table-column align="center" prop="dealTimeStr" :label="$t('yn.no18')" min-width="70">
          </el-table-column>
          <el-table-column align="center" prop="dealStatus" :label="$t('yn.no5')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.dealStatus!==null&&scope.row.dealStatus!==undefined&&scope.row.dealStatus!==''">{{$t($store.getters.handlingStatus(scope.row.dealStatus))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" width="180">
            <template slot-scope="scope">
              <span
                v-if="scope.row.dealStatus<3&&$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_PROCESSED_DEAL')"
                class="mg5"
                style="color:#547ef6;cursor:pointer" 
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

    <!-- 处理弹窗 -->
    <el-dialog :title="$t('public.no61')" :visible.sync="handleFlag"  width="760px" :show-message="false">
      <p class="cl-p">
        <span class="cl-span1">{{$t('proManage.faqState')}}</span>
        <span class="cl-span2">{{handleData.problemType==1?$t('yn.no11'):$t('yn.no12')}}</span>
      </p>
      <p class="cl-p">
        <span class="cl-span1">{{$t('loanAfterManage.paycode')}}</span>
        <span class="cl-span2">{{handleData.repaymentCode}}</span>
      </p>
      <p class="cl-p">
        <span class="cl-span1">{{$t('serviceManage.requestDes')}}</span>
        <span class="cl-span2">{{handleData.problemDes}}</span>
      </p>
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
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
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
  name: 'userManage',
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
    openBox: function (obj) { // 图片放大显示
      this.currentObj = obj
      this.lightBoxToggle = !this.lightBoxToggle
    },
    closeBox: function () { // 图片放大关闭
      this.lightBoxToggle = false
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
        this.flag = false
        this.getTableData();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false
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
          this.flag = true
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
        this.flag = true
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
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
          this.handleData = res.data.data
        }
      })
      this.handleFlag = true
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
              this.$globalMsg.success(this.$t('message.success'))
              this.getTableData();
            } else {
              this.$globalMsg.error(res.data.header.msg)
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
        this.formInline.createTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0])
        this.formInline.createTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1])
      } else {
        this.formInline.createTimeBegin = ''
        this.formInline.createTimeEnd = ''
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.repayMentTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0])
        this.formInline.repayMentTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1])
      } else {
        this.formInline.repayMentTimeBegin = ''
        this.formInline.repayMentTimeEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.getTableData()// 获取借款列表
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
    // margin-right: 10px;
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


//用户详情弹窗
.details{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 95%;
    height: 500px;
    margin-top: -200px;
    background-color: #ffffff;
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
        margin-left: 10px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
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
      height: 452px;
      .year{
        width: 100%;
        height: 58px;
        display: flex;
        padding-left: 50px;
        align-items: flex-end;
        .button-active{
          background-color: #409EFF;
        }
      }
      
      .detail-table{
        width: 100%;
        height: 392px;
        display: flex;
        justify-content: space-around;
        .detail-table-1{
          width: 45%;
          height: 100%;
          .detail-table-2{
            width: 100%;
            height: 100%;
            tr:nth-child(odd){
              background-color: #Ffffff;
            }
            tr:nth-child(even){
              background-color: #F4F6FB;
            }
            .table-head{
              height: 50px;
            }
            .table-head2{
              text-align: center;
            }
            .active{
              background-color: #F4F6FB;
            }
          }
        }
      }
    }
  }
} 
.cl-p{
  display: flex;
  .cl-span1{
    display: inline-block;
    width: 100px;
    text-align: right;
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
  }
  .cl-span2{
    word-break: break-all;
    flex: 1;
  }
}
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
