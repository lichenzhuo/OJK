<template>
  <div v-if="data" class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/loanmoney'}">{{$t('loanMoney.crumbsThr')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.crumbsFive')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- ------------ 用户信息栏 ------------------------ -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('loanMoneyDetail.userInfor')}}</p>
        </div>
      </el-col>
    </el-row>
    <div>
      <div class="oneLineHasFour">
        <p><span>{{$t('new.no48')}}:</span>
          <span>{{data.userBase.appName | dataIsTrue}}</span>
        </p>
        <p style="width:50%"><span>{{$t('new.no49')}}:</span>
          <span>{{data.userBase.appPackage | dataIsTrue}}</span>
        </p>
      </div>
      <div class="oneLineHasFour">
        <p><span>{{$t('public.userId')}}:</span>
          <span>{{data.userBase.id | dataIsTrue}}</span>
        </p>
        <p><span>{{$t('public.name')}}:</span>
          <span>{{data.userBase.name | dataIsTrue}}</span> 
        </p>
        <p><span>{{$t('public.registerDate')}}:</span>
          <span>{{data.userBase.strRegTime | dataIsTrue}}</span>
        </p>
        <p>{{$t('public.registerChannel')}}: 
          <span>{{data.userBase.regChannel}}</span>
        </p>
      </div>
      <div class="oneLineHasFour">
        <p><span>{{$t('public.no18')}}:</span>
          <span>{{data.userBase.phone}}</span>
        </p>
        <p>{{$t('yuenan.no23')}}: 
          <span>{{$store.getters.vn_phone(data.userBase.phone)}}</span>
        </p>
        <p><span>{{$t('yuenan.no25')}}:</span>
          <span>{{data.userSelf.alternativePhone}}</span> 
        </p>
        <p>
          <span>{{$t('public.sex')}}:</span>
          <span>{{$t($store.getters.sexStatus(data.userSelf.sex))}}</span>
        </p>
      </div> 
      <div class="oneLineHasFour">
        <p><span>{{$t('public.no2')}}:</span>
          <span>{{data.order.idCard}}</span>
        </p>
        <p>
          <span>{{$t('yuenan.no1')}}:</span>
          <span>{{data.userSelf.strIdCardAwardTime}}</span> 
        </p>
      </div> 
      <div class="oneLineHasFour">
          <p><span>{{$t('yuenan.no2')}}:</span>
            <span>{{data.userSelf.liveProvinceName | dataIsTrue}}</span>
          </p>
          <p><span>{{$t('yuenan.no17')}}:</span>
            <span>{{data.userSelf.liveCityName | dataIsTrue}}</span>
          </p>
          <p><span>{{$t('yuenan.no3')}}:</span>
            <span>{{data.userSelf.liveRegionName | dataIsTrue}}</span>
          </p>
      </div> 
      <div class="oneLineHasOne">
        <p><span>{{$t('public.no63')}}:</span>
          <span>
            {{data.userSelf.liveAddress}}
          </span>
        </p>
      </div> 
    </div>

    <!-- ------------ 借款订单详情栏 ------------------------ -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('loanMoney.orderDetail')}}</p>
        </div>
      </el-col>
    </el-row>
    <div >
      <div class="oneLineHasFour">
        <p><span>{{$t('new.no48')}}:</span>
          <span>{{data.orderExtra.appName | dataIsTrue}}</span>
        </p>
        <p style="width:50%"><span>{{$t('new.no49')}}:</span>
          <span>{{data.orderExtra.appPackage | dataIsTrue}}</span> 
        </p>
      </div>
      <div class="oneLineHasFour">
        <p><span>{{$t('public.orderNo')}}:</span>
          <span>{{data.order.orderNo | dataIsTrue}}</span>
        </p>
        <p><span>{{$t('public.CreateDate')}}:</span>
          <span>{{data.order.strCreateTime | dataIsTrue}}</span>
        </p>
        <p><span>{{$t('public.no58')}}:</span>
          <span>{{data.order.strLoanTime}}</span>
        </p>
        <p><span>{{$t('public.CreateTime')}}:</span>
          <span>{{data.order.strMustRefundTime | dataIsTrue}}</span>
        </p>
        
      </div>
      <div class="oneLineHasFour">
        <p><span>{{$t('public.no24')}}:</span>
          <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.loanAmount)}}{{$store.state.common.vi_currency}}</span>
        </p>
        <p><span>{{$t('public.no31')}}:</span>
          <span>{{data.order.productPeriod | dataIsTrue}}</span>
        </p>
        <p><span>{{$t('proManage.dayInterest')}}:</span>
          <span>{{$store.getters.twoPoint(data.order.dayInterestRate)}}%</span>
        </p>
        <p><span>{{$t('proManage.feeRate')}}:</span>
          <span>{{$store.getters.twoPoint(data.order.feeRate)}}%</span>
        </p>
      </div> 
      <div class="oneLineHasFour">
        <p><span>{{$t('public.no28')}}:</span>
          <span>{{data.order.overdueDays | dataIsTrue}}</span>
        </p>
        <p><span>{{$t('loanMoneyDetail.overdueInterest')}}:</span>
          <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
        </p>
        <p><span>{{$t('loanMoneyDetail.currentInterest')}}:</span>
          <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.currentInterest)}}{{$store.state.common.vi_currency}}</span>
        </p>
        <p><span>{{$t('loanMoneyDetail.feeAmount')}}:</span>
          <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.feeAmount)}}{{$store.state.common.vi_currency}}</span>
        </p>
      </div> 
      <div class="oneLineHasFour">
        <p><span>{{$t('websiteLoans.no5')}}:</span>
          <span>{{$t($store.getters.loanTypeState(data.order.orderLoanType))}}</span>
        </p>
        <p><span>{{$t('public.no27')}}:</span>
          <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.returnMoney)}}{{$store.state.common.vi_currency}}</span>
        </p>
        <p><span>{{$t('public.no65')}}:</span>
          <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.refundAmount)}}{{$store.state.common.vi_currency}}</span>
        </p>
        <p><span>{{$t('public.no66')}}:</span>
          <span>{{data.order.strLastRefundTime}}</span>
        </p>
      </div>
      <div class="oneLineHasFour">
        <p><span>{{$t('yuenan.no18')}}:</span>
          <span>{{data.userBank.bankType}}</span>
        </p>
        <p><span>{{$t('public.no19')}}:</span>
          <span>{{data.userBank.bankName}}</span>
        </p>
        <p><span>{{$t('public.no20')}}:</span>
          <span>{{data.userBank.bankAccount}}</span>
        </p>
        <p><span>{{$t('yuenan.no19')}}:</span>
          <span>{{data.userBank.email}}</span>
        </p>
      </div>
      <div class="oneLineHasFour">
        <p><span>{{$t('filter.couponName')}}:</span>
          <span>{{data.coupon.couponName}}</span>
        </p>
        <p><span>{{$t('filter.couponItem')}}:</span>
          <span>{{$t($store.getters.couponTypeState(data.coupon.couponType))}}</span>
        </p>
        <p><span>{{$t('filter.couponCon')}}:</span>
          <span v-if="data.coupon.couponType==1||data.coupon.couponType==3||data.coupon.couponType==5">{{$store.getters.moneySplit(data.coupon.couponAmount)}}</span>
          <span v-else-if="data.coupon.couponType==2">{{data.coupon.couponDays+$t('public.no26')}}</span>
          <span v-else-if="data.coupon.couponType==4">{{data.coupon.couponInterest}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p><span>{{$t('filter.interest')}}:</span>
          <span>{{$store.getters.moneySplit(data.order.couponAmount)}}</span>
        </p>
      </div>
      <div class="oneLineHasOne">
        <p><span>{{$t('public.no34')}}:</span>
          <span>{{data.order.orderAddress | dataIsTrue}}</span>
        </p>
      </div> 
    </div>

    <!-- ------------  审核记录栏  ------------------------ -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('loanMoneyDetail.opeHistory')}}</p>
        </div>
      </el-col>
    </el-row>
    <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
      <tr>
        <th width="14.2%">{{$t('loanMoneyDetail.opePeople')}}</th>
        <th width="14.2%">{{$t('loanMoneyDetail.opeType')}}</th>
        <th width="14.2%">{{$t('loanMoneyDetail.opeTime')}}</th>
        <th width="14.2%">{{$t('loanMoneyDetail.opeCon')}}</th>
        <th width="14.2%">{{$t('loanMoneyDetail.opeType2')}}</th>
        <th width="14.2%">{{$t('loanMoneyDetail.opeResult')}}</th>
        <th width="auto">{{$t('public.no37')}}</th>
      </tr>
      <template v-if="(data.orderApproveList!==null&&data.orderApproveList!==undefined&&data.orderApproveList!='')||(data.orderLendingList!==null&&data.orderLendingList!==undefined&&data.orderLendingList!='')||(data.orderRepaymentList!==null&&data.orderRepaymentList!==undefined&&data.orderRepaymentList!='')">
        <template v-if="data.orderApproveList">
          <tr v-for="value in data.orderApproveList" :key="value.id">
            <td >{{value.adminName | dataIsTrue}}</td>
            <td>{{$t('loanMoneyDetail.loanMoney')}}</td>
            <td>{{value.strApproveTime | dataIsTrue}}</td>
            <td>
              {{value.notApproveReason}}
              {{value.notApproveSubReason}}
            </td>
            <td>{{$t($store.getters.loanMoneyRecordStatus(value.approveType))}}</td>
            <td>{{$t($store.getters.loanMoneyResultStatus(value.approveResult))}}</td>
            <template v-if="value.approveType==1">
              <td v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_SHOW_OPERATION_REMARK')">
                {{value.remark}}
              </td>
              <td v-else>{{$store.state.common.nullData}}</td>
            </template>
            <template v-else>
              <td>
                {{value.remark | dataIsTrue}}
              </td>
            </template>
          </tr>
        </template>
        <template v-if="data.orderLendingList">
          <tr v-for="value in data.orderLendingList" :key="value.id">
            <td>-</td>
            <td>{{$t('loanMoneyDetail.putMoney')}}</td>
            <td>{{value.strUpdateTime | dataIsTrue}}</td>
            <td>-</td>
            <td>-</td>
            <td>{{$t($store.getters.putMoneyResultStatus(value.status))}}</td>
            <td>{{value.remark | dataIsTrue}}</td>
          </tr>
        </template>
        <template v-if="data.orderRepaymentList">
          <tr v-for="value in data.orderRepaymentList" :key="value.id">
            <td>-</td>
            <td>{{$t('loanMoneyDetail.backMoney')}}</td>
            <td>{{value.strUpdateTime | dataIsTrue}}</td>
            <td>-</td>
            <td>-</td>
            <td>{{$t($store.getters.backMoneyResultStatus(value.status))}}</td>
            <td>{{value.remark}}</td>
          </tr>
        </template>
      </template>
      <template v-else>
        <div style="textAlign:center;width:700%;height:40px;lineHeight:40px">
          {{$t('public.no23')}}
        </div>
      </template>

    </table>


    <div class="foot"></div>

  </div>
  <div v-else class="back">
    <p>{{$t('public.no23')}}，<span @click="back">{{$t('back.no1')}}</span> {{$t('back.no2')}}</p>
  </div>
</template>
<script>
export default {
  name: 'loanMoneyDetail',
  data () {
    return {
      sessionid: '',
      data: {
        userBase: '',
        userBank: '',
        userIdcard: '',
        userSelf: '',
        userWork: '',
        order: '',
        coupon: '',
        orderExtra: '',
        orderApproveList: '',
        orderLendingList: '',
        orderPhoneApprove: '',
        orderRepaymentList: ''
      }
    }
  },
  methods: {
    detail () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.consumer_loan,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.data.userBase = res.data.data.userBase;
          this.data.userBank = res.data.data.userBank;
          this.data.userIdcard = res.data.data.userIdcard;
          this.data.userSelf = res.data.data.userSelf;
          this.data.userWork = res.data.data.userWork;
          this.data.order = res.data.data.order;
          this.data.orderExtra = res.data.data.orderExtra;
          this.data.orderApproveList = res.data.data.orderApproveList;
          this.data.orderLendingList = res.data.data.orderLendingList;
          this.data.orderPhoneApprove = res.data.data.orderPhoneApprove;
          this.data.orderRepaymentList = res.data.data.orderRepaymentList;
          this.data.coupon = res.data.data.coupon;
        }
      })
    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1)
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.orderNo = this.$route.query.orderNo
    this.userId = this.$route.query.userId
    this.detail()
  }
}
</script>
<style scoped lang="scss">
 .oneLineHasFour {
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  @include p-span2(25%);
}
 .oneLineHasOne {
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  @include p-span2(100%);
}
.back{
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  background-color: rgba(246, 249, 252, 1);
  position: relative;
  @include flex-cen;
  p{
    span{
      font-size: 18px;
      padding: 0 5px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
