<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('finance.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('finance.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('finance.crumbsTwo')}}</p>
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
        <el-col :md="6" :lg="4" :xl="3">
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" label="userId" v-model="formInline.userId"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('finance.repaymentNo')}}:</span>
            <el-input size="small" label="repaymentNo" v-model="formInline.repaymentNo"></el-input>
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
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no53')}}:</span>
            <el-select size="small" v-model="formInline.isOverdue" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options4" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('public.CreateDate')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                id="cteateTime"
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
            <span>{{$t('public.no66')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                id="dateSuccess"
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
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no22')}}:</span>
            <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('filter.couponItem')}}:</span>
            <el-select size="small" v-model="formInline.couponType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options5" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPAY_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPAY_EXP')">
          <el-col :md="5" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPAY_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe style="width:100%" empty-text>
          <!-- <el-table-column align="center" prop="orderNo" :label="$t('public.orderNo')" width="80">
          </el-table-column> -->
          <el-table-column align="center" prop="repaymentNo" :label="$t('public.backId')" width="80">
          </el-table-column>
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" min-width="62">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" min-width="66">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.no18')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="couponType" :label="$t('filter.couponItem')" min-width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType!==null&&scope.row.couponType!==undefined&&scope.row.couponType!==''">{{$t($store.getters.couponTypeState(scope.row.couponType))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="couponDays" :label="$t('filter.couponCon')" min-width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType==1||scope.row.couponType==3||scope.row.couponType==5">{{$store.getters.moneySplit(scope.row.couponAmount)}}</span>
              <span v-else-if="scope.row.couponType==2">{{scope.row.couponDays+$t('public.no26')}}</span>
              <span v-else-if="scope.row.couponType==4">{{scope.row.couponInterest}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no54')" min-width="70">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" min-width="50">
          </el-table-column>
          <!-- <el-table-column align="center" prop="dayInterestRate" :label="$t('proManage.dayInterest')" min-width="50">
            <template slot-scope="scope">
              <span v-if="scope.row.dayInterestRate!==null&&scope.row.dayInterestRate!==undefined&&scope.row.dayInterestRate!==''">{{$store.getters.twoPoint(scope.row.dayInterestRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="overdueInterestRate" :label="$t('proManage.overdueInterest')" min-width="70">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterestRate!==null&&scope.row.overdueInterestRate!==undefined&&scope.row.overdueInterestRate!==''">{{$store.getters.twoPoint(scope.row.overdueInterestRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="repaymentAmount" :label="$t('public.no27')" min-width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.repaymentAmount!==null&&scope.row.repaymentAmount!==undefined&&scope.row.repaymentAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.repaymentAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')" min-width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="payType" :label="$t('finance.payType')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="bankName" :label="$t('public.no19')" min-width="62">
          </el-table-column>
          <el-table-column align="center" prop="paymentCode" :label="$t('finance.bluePaymentCode')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="strApplyTime" :label="$t('public.CreateDate')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.backMoneyDate')" min-width="85">
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no43')" min-width="50">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueDays!==null&&scope.row.overdueDays!==undefined&&scope.row.overdueDays!==''">{{scope.row.overdueDays>0?$t('operationDetail.no11'):$t('operationDetail.no12')}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.no22')" min-width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.backMoneyLogStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="thirdChannel" :label="$t('finance.channel')" min-width="70">
          </el-table-column>
          <el-table-column align="center" prop="remark" :label="$t('public.no37')" min-width="70">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" width="130">
            <template slot-scope="scope">
              <span style="color:#547ef6;cursor:pointer" @click="detail(scope.row.orderNo,scope.row.userId)">{{$t('public.detail')}}</span>
              
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPAY_LIST')">
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

    <!-- ------------------ 点击查看详情弹窗开始 -------------------- -->
    <div v-if="flag1" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p>{{$t('public.no61')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="flag1=false"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-con-one2" style="width:100%;height:auto;padding:10px 0;margin-bottom5px;">
            <span>{{$t('public.no61')}}:</span><span>{{result?result:$store.state.common.nullData}} </span>  
          </div>
          <div class="detail-con-one2" style="width:100%;height:auto;padding:10px 0;margin-bottom5px;">
            <span>{{$t('public.backMoneyDate')}}:</span><span>{{resultTime?resultTime:$store.state.common.nullData}} </span>   
          </div>
          <div class="detail-con-one">
            <div class="detail-con-one-4">
              {{$t('public.no37')}}:
            </div>
            <div class="detail-con-one-3">
              <textarea v-model="remark" :placeholder="$t('loanMoney.placeholder')"></textarea>
            </div>
          </div>
          <div class="detail-but" @click="sureSubmit">{{$t('public.no61')}}</div>
        </div>
      </div>
    </div>

    <div class="foot"></div>
    

  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 订单创建时间数组
      searchTime2: [], // 申请成功时间数组
      // 用户查询信息数据对应字段
      formInline: {
        orderNo: "",
        orderId: "",
        userId: "",
        repaymentNo:'',
        payType: "",
        thirdChannel: "",
        paySuccessBegin: "",
        paySuccessEnd: "",
        createTimeBegin: "",
        createTimeEnd: "",
        status: "",
        couponType:''
      },
      currentPage:1,//当前页下标
      options1: this.$store.state.options.backMoneyType_option,// 还款方式
      options2: this.$store.state.options.thirdChannel,// 通道
      options3: this.$store.state.options.backMoneyLog_select,// 状态下拉选框信息
      options4: this.$store.state.options.isOverdue_option,// 逾期状态下拉选框信息
      options5: this.$store.state.options.couponType_option,// 优惠券类型下拉选框信息
      tableData:[],//用户信息数据模拟
      repaymentNo:'',// 还款单编号
      flag1:false,// 确认还款弹窗开关
      remark:'',// 备注
      result:'',// 向支付通道返回的结果
      resultTime:''// 向支付通道返回的结果时间
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.backMoneyList();
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.backMoneyList();
    },
    select () {
      this.$store.commit('backMoneyLogList', this.formInline)
      if (this.flag) {
        this.flag = false
        this.backMoneyList();
      }
    },
    socialDetali (id) {
      this.$router.push({path: '/userdetail?id=' + id})
    },
    putExcel () {
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.backMoney_logExcel,
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
    backMoneyList () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.backMoney_logList,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    sure (repaymentNo) { // 确认还款弹窗
      if (repaymentNo) {
        this.repaymentNo = repaymentNo
        this.flag1 = true
        this.backMoneyResult()
      }
    },
    sureSubmit () { // 发送备注操作
      if (this.flag) {
        this.flag = false
        if (this.remark != '') {
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.sure_backmoney,
              'sessionid': this.sessionid
            },
            repaymentNo: this.repaymentNo,
            remark: this.remark
          }
          this.$axios.post('', option).then(res => {
            this.flag = true
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'))
              this.backMoneyList()
            } else {
              this.$globalMsg.error(res.data.header.msg)
            }
            this.flag1 = false
          })
        } else {
          this.$globalMsg.error(this.$t('public.no42'))
          this.flag = true
        }
      }
    },
    backMoneyResult () { // 向第三方获取还款结果
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.backmoney_result,
          'sessionid': this.sessionid
        },
        repaymentNo: this.repaymentNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.result = res.data.data.transferStatusDesc
          this.resultTime = res.data.data.time
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
    detail (orderNo, userId) { // 跳转详情页
      this.$router.push({path: '/loanmoneydetail', query: {userId, orderNo}})
    }
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
        this.formInline.paySuccessBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0])
        this.formInline.paySuccessEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1])
      } else {
        this.formInline.paySuccessBegin = ''
        this.formInline.paySuccessEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.backMoneyLogList_select) !== '{}') {
      this.formInline = this.$store.state.common.backMoneyLogList_select
      if(this.formInline.createTimeBegin!==''){
        this.searchTime1.push(this.formInline.createTimeBegin)
      this.searchTime1.push(this.formInline.createTimeEnd)
      }
      if(this.formInline.paySuccessBegin!==''){
        this.searchTime2.push(this.formInline.paySuccessBegin)
      this.searchTime2.push(this.formInline.paySuccessEnd)
      }
    }
    this.backMoneyList()
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
  height: 48px;
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
  width: 100%;
  min-height: 540px;
  background-color: #fff;
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
  position: fixed;
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

// 查看详情
.detail{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 694px;
    height: auto;
    margin-top: -150px;
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
        // display: flex;
        p{
          margin: 10px 40px 20px 0;
          padding-left: 14px;
          color: #999;
          span{
            color: #000;
            margin: 0 5px;
          }
        }
        .detail-con-one-3{
          width: 100%;
          height: 100%;
          margin-bottom: 10px;
          textarea{
            width: 100%;
            height: 100px;
            padding: 10px;
            font-size: 16px;
          }
        }
        .detail-con-one-4{
          width: 100px;
          height: 40px;
          // text-align: center;
          line-height: 40px;
          color: #000;
        }
      }
      .detail-con-one1{
        width: 200px;
        padding: 0 5px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        text-align: center;
        background-color: #1D7BFF;
        border-radius: 5px;
        cursor: pointer;
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
      .detail-con-one2{
        width: 100%;
        display: flex;
        span{
          &:nth-child(1){
            width: 120px;
            white-space: nowrap;
          }
          &:nth-child(2){
            padding: 0 10px;
            word-break:break-all;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>
