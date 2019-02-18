<template>
  <div v-if="data" class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/nobackOrderList'}">{{$t('serviceManage.crumbsTwo')}}</el-breadcrumb-item>
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
    <div class="xuan-2-2" v-if="$store.state.common.lang==='id'">
      <div class="xuan-2-2-1">
        <p>{{$t('new.no48')}}: 
          <span v-if="data.userBase.appName!==null&&data.userBase.appName!==undefined&&data.userBase.appName!==''">{{data.userBase.appName}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('new.no49')}}: 
          <span v-if="data.userBase.appPackage!==null&&data.userBase.appPackage!==undefined&&data.userBase.appPackage!==''">{{data.userBase.appPackage}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>   
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p>{{$t('public.userId')}}: 
          <span v-if="data.userBase.id!==null&&data.userBase.id!==undefined&&data.userBase.id!==''">{{data.userBase.id}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('public.name')}}: 
          <span v-if="data.userBase.name!==null&&data.userBase.name!==undefined&&data.userBase.name!==''">{{data.userBase.name}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>   
        </p>
        <p>{{$t('public.registerDate')}}: 
          <span v-if="data.userBase.strRegTime!==null&&data.userBase.strRegTime!==undefined&&data.userBase.strRegTime!==''">{{data.userBase.strRegTime}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('public.registerChannel')}}: 
          <span v-if="data.userBase.regChannel!==null&&data.userBase.regChannel!==undefined&&data.userBase.regChannel!==''">{{data.userBase.regChannel}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p>{{$t('public.no18')}}: 
          <span v-if="data.userBase.phone!==null&&data.userBase.phone!==undefined&&data.userBase.phone!==''">{{data.userBase.phone}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('public.no2')}}: 
          <span v-if="data.userIdcard.idCard!==null&&data.userIdcard.idCard!==undefined&&data.userIdcard.idCard!==''">{{data.userIdcard.idCard}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('public.no9')}}: 
          <span v-if="data.userWork.company!==null&&data.userWork.company!==undefined&&data.userWork.company!==''">{{data.userWork.company}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('public.no12')}}: 
          <span v-if="data.userWork.companyPhone!==null&&data.userWork.companyPhone!==undefined&&data.userWork.companyPhone!==''">{{data.userWork.companyPhone}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
      </div> 
      <div class="xuan-2-2-1">
        <p style="width:100%">{{$t('public.no64')}}: 
          <span v-if="data.userWork.companyAddress!==null&&data.userWork.companyAddress!==undefined&&data.userWork.companyAddress!==''">
            {{data.userWork.companyAddress}}
          </span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
      </div> 
      <div class="xuan-2-2-1">
        <p style="width:100%">{{$t('public.no63')}}: 
          <span v-if="data.userSelf.liveProvinceName!==null&&data.userSelf.liveProvinceName!==undefined&&data.userSelf.liveProvinceName!==''">
            {{data.userSelf.liveProvinceName}}-
            <template v-if="data.userSelf.liveCityName!==null&&data.userSelf.liveCityName!==undefined&&data.userSelf.liveCityName!==''">
              {{data.userSelf.liveCityName}}
            </template>
            <!-- <template v-if="data.userSelf.liveRegionId!==null&&data.userSelf.liveRegionId!==undefined&&data.userSelf.liveRegionId!==''">
              {{data.userSelf.liveCityName}}
            </template> -->
          </span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
      </div> 
    </div>
    <div class="xuan-2-2" v-if="$store.state.common.lang==='vi'">
      <div class="xuan-2-2-1">
        <p>{{$t('new.no48')}}: 
          <span v-if="data.userBase.appName!==null&&data.userBase.appName!==undefined&&data.userBase.appName!==''">{{data.userBase.appName}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('new.no49')}}: 
          <span v-if="data.userBase.appPackage!==null&&data.userBase.appPackage!==undefined&&data.userBase.appPackage!==''">{{data.userBase.appPackage}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>   
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p>{{$t('public.userId')}}: 
          <span v-if="data.userBase.id!==null&&data.userBase.id!==undefined&&data.userBase.id!==''">{{data.userBase.id}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('public.name')}}: 
          <span v-if="data.userBase.name!==null&&data.userBase.name!==undefined&&data.userBase.name!==''">{{data.userBase.name}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>   
        </p>
        <p>{{$t('public.registerDate')}}: 
          <span v-if="data.userBase.strRegTime!==null&&data.userBase.strRegTime!==undefined&&data.userBase.strRegTime!==''">{{data.userBase.strRegTime}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('public.registerChannel')}}: 
          <span v-if="data.userBase.regChannel!==null&&data.userBase.regChannel!==undefined&&data.userBase.regChannel!==''">{{data.userBase.regChannel}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p>{{$t('public.no18')}}: 
          <span v-if="data.userBase.phone!==null&&data.userBase.phone!==undefined&&data.userBase.phone!==''">{{data.userBase.phone}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('public.no2')}}: 
          <span v-if="data.order.idCard!==null&&data.order.idCard!==undefined&&data.order.idCard!==''">{{data.order.idCard}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>
          {{$t('public.sex')}}:
          <span v-if="data.userSelf.sex!==null&&data.userSelf.sex!==undefined&&data.userSelf.sex!==''">{{$t($store.getters.sexStatus(data.userSelf.sex))}}</span> 
          <span v-else> {{$store.state.common.nullData}} </span> 
        </p>
        <template>
          <p v-if="data.userSelf.strIdCardAwardTime!==null&&data.userSelf.strIdCardAwardTime!==undefined&&data.userSelf.strIdCardAwardTime!==''">
            {{$t('yuenan.no1')}}: <span>{{data.userSelf.strIdCardAwardTime}}</span> 
          </p>
          <p v-else>{{$t('yuenan.no1')}}: <span> {{$store.state.common.nullData}} </span> </p>
        </template>
      </div> 
      <div class="xuan-2-2-1">
        <template>
          <p v-if="data.userSelf.liveProvinceName!==null&&data.userSelf.liveProvinceName!==undefined&&data.userSelf.liveProvinceName!==''">{{$t('yuenan.no2')}}:
            <span>{{data.userSelf.liveProvinceName}}</span>
          </p>
          <p v-else><span>{{$t('yuenan.no2')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
        </template>
        <template>
          <p v-if="data.userSelf.liveCityName!==null&&data.userSelf.liveCityName!==undefined&&data.userSelf.liveCityName!==''">{{$t('yuenan.no17')}}:
            <span>{{data.userSelf.liveCityName}}</span>
          </p>
          <p v-else><span>{{$t('yuenan.no17')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
        </template>
        <template>
          <p v-if="data.userSelf.liveRegionName!==null&&data.userSelf.liveRegionName!==undefined&&data.userSelf.liveRegionName!==''">{{$t('yuenan.no3')}}:
            <span>{{data.userSelf.liveRegionName}}</span>
          </p>
          <p v-else><span>{{$t('yuenan.no3')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
        </template>
      </div> 
      <div class="xuan-2-2-1">
        <p style="width:100%">{{$t('public.no63')}}: 
          <span v-if="data.userSelf.liveAddress!==null&&data.userSelf.liveAddress!==undefined&&data.userSelf.liveAddress!==''">
            {{data.userSelf.liveAddress}}
          </span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
      </div> 
    </div>
    <div class="xuan-2-2" v-if="$store.state.common.lang==='PHL'">
      <div class="xuan-2-2-1">
        <p>{{$t('new.no48')}}: 
          <span v-if="data.userBase.appName!==null&&data.userBase.appName!==undefined&&data.userBase.appName!==''">{{data.userBase.appName}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('new.no49')}}: 
          <span v-if="data.userBase.appPackage!==null&&data.userBase.appPackage!==undefined&&data.userBase.appPackage!==''">{{data.userBase.appPackage}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>   
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p>{{$t('public.userId')}}: 
          <span v-if="data.userBase.id!==null&&data.userBase.id!==undefined&&data.userBase.id!==''">{{data.userBase.id}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('fei.loanId')}}: 
          <span v-if="data.userBase.contractNo!==null&&data.userBase.contractNo!==undefined&&data.userBase.contractNo!==''">{{data.userBase.contractNo}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>   
        </p>
        <p>{{$t('public.registerDate')}}: 
          <span v-if="data.userBase.strRegTime!==null&&data.userBase.strRegTime!==undefined&&data.userBase.strRegTime!==''">{{data.userBase.strRegTime}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('public.registerChannel')}}: 
          <span v-if="data.userBase.regChannel!==null&&data.userBase.regChannel!==undefined&&data.userBase.regChannel!==''">{{data.userBase.regChannel}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p>
          {{$t('public.sex')}}:
          <span v-if="data.userSelf.sex!==null&&data.userSelf.sex!==undefined&&data.userSelf.sex!==''">{{$t($store.getters.sexStatus(data.userSelf.sex))}}</span> 
          <span v-else> {{$store.state.common.nullData}} </span> 
        </p>
        <p>{{$t('public.no18')}}: 
          <span v-if="data.userBase.phone!==null&&data.userBase.phone!==undefined&&data.userBase.phone!==''">{{data.userBase.phone}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('fei.id')}}: 
          <span v-if="data.userIdcard.idCard!==null&&data.userIdcard.idCard!==undefined&&data.userIdcard.idCard!==''">{{data.userIdcard.idCard}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('fei.idType')}}: 
          <span v-if="data.userIdcard.strIdType!==null&&data.userIdcard.strIdType!==undefined&&data.userIdcard.strIdType!==''">{{data.userIdcard.strIdType}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <!-- <template>
          <p v-if="data.userSelf.strIdCardAwardTime!==null&&data.userSelf.strIdCardAwardTime!==undefined&&data.userSelf.strIdCardAwardTime!==''">
            {{$t('yuenan.no1')}}: <span>{{data.userSelf.strIdCardAwardTime}}</span> 
          </p>
          <p v-else>{{$t('yuenan.no1')}}: <span> {{$store.state.common.nullData}} </span> </p>
        </template> -->
      </div> 
      <div class="xuan-2-2-1">
        <p>{{$t('public.name')}}: 
          <span v-if="data.userBase.name!==null&&data.userBase.name!==undefined&&data.userBase.name!==''">{{data.userSelf.name+' '+data.userSelf.middleName+' '+data.userSelf.surname}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>   
        </p>
        <template>
          <p v-if="data.userSelf.liveProvinceName!==null&&data.userSelf.liveProvinceName!==undefined&&data.userSelf.liveProvinceName!==''">{{$t('yuenan.no2')}}:
            <span>{{data.userSelf.liveProvinceName}}</span>
          </p>
          <p v-else><span>{{$t('yuenan.no2')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
        </template>
        <template>
          <p v-if="data.userSelf.liveCityName!==null&&data.userSelf.liveCityName!==undefined&&data.userSelf.liveCityName!==''">{{$t('yuenan.no17')}}:
            <span>{{data.userSelf.liveCityName}}</span>
          </p>
          <p v-else><span>{{$t('yuenan.no17')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
        </template>
      </div> 
      <div class="xuan-2-2-1">
        <p style="width:100%">{{$t('public.no63')}}: 
          <span v-if="data.userSelf.liveAddress!==null&&data.userSelf.liveAddress!==undefined&&data.userSelf.liveAddress!==''">
            {{data.userSelf.liveAddress}}
          </span>
          <span v-else>{{$store.state.common.nullData}}</span> 
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
    
    <div class="xuan-2-2">
      <div class="xuan-2-2-1">
        <p>{{$t('new.no48')}}: 
          <span v-if="data.orderExtra.appName!==null&&data.orderExtra.appName!==undefined&&data.orderExtra.appName!==''">{{data.orderExtra.appName}}</span>
          <span v-else>{{$store.state.common.nullData}}</span> 
        </p>
        <p>{{$t('new.no49')}}: 
          <span v-if="data.orderExtra.appPackage!==null&&data.orderExtra.appPackage!==undefined&&data.orderExtra.appPackage!==''">{{data.orderExtra.appPackage}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>   
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p>{{$t('public.orderNo')}}: 
          <span v-if="data.order.orderNo!==null&&data.order.orderNo!==undefined&&data.order.orderNo!==''">{{data.order.orderNo}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('public.CreateDate')}}: 
          <span v-if="data.order.strCreateTime!==null&&data.order.strCreateTime!==undefined&&data.order.strCreateTime!==''">{{data.order.strCreateTime}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('public.no24')}}: 
          <span v-if="data.order.loanAmount!==null&&data.order.loanAmount!==undefined&&data.order.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.loanAmount)}}{{$store.state.common.vi_currency}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('public.no31')}}: 
          <span v-if="data.order.productPeriod!==null&&data.order.productPeriod!==undefined&&data.order.productPeriod!==''">{{data.order.productPeriod}}天</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p>{{$t('public.CreateTime')}}: 
          <span v-if="data.order.strMustRefundTime!==null&&data.order.strMustRefundTime!==undefined&&data.order.strMustRefundTime!==''">{{data.order.strMustRefundTime}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('public.no27')}}: 
          <span v-if="data.order.returnMoney!==null&&data.order.returnMoney!==undefined&&data.order.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.returnMoney)}}{{$store.state.common.vi_currency}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('proManage.dayInterest')}}: 
          <span v-if="data.order.dayInterestRate!==null&&data.order.dayInterestRate!==undefined&&data.order.dayInterestRate!==''">{{$store.getters.twoPoint(data.order.dayInterestRate)}}%</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('loanMoneyDetail.currentInterest')}}: 
          <span v-if="data.order.currentInterest!==null&&data.order.currentInterest!==undefined&&data.order.currentInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.currentInterest)}}{{$store.state.common.vi_currency}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
      </div> 
      <div class="xuan-2-2-1">
        <p>{{$t('proManage.feeRate')}}: 
          <span v-if="data.order.feeRate!==null&&data.order.feeRate!==undefined&&data.order.feeRate!==''">{{$store.getters.twoPoint(data.order.feeRate)}}%</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('loanMoneyDetail.feeAmount')}}: 
          <span v-if="data.order.feeAmount!==null&&data.order.feeAmount!==undefined&&data.order.feeAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.feeAmount)}}{{$store.state.common.vi_currency}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('public.no28')}}: 
          <span v-if="data.order.overdueDays!==null&&data.order.overdueDays!==undefined&&data.order.overdueDays!==''">{{data.order.overdueDays}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('loanMoneyDetail.overdueInterest')}}: 
          <span v-if="data.order.overdueInterest!==null&&data.order.overdueInterest!==undefined&&data.order.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
      </div> 
      <div class="xuan-2-2-1">
        <p>{{$t('loanMoneyDetail.bankName')}}: 
          <span v-if="data.userBank.bankName!==null&&data.userBank.bankName!==undefined&&data.userBank.bankName!==''">{{data.userBank.bankName}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('loanMoneyDetail.bankNo')}}: 
          <span v-if="data.userBank.bankAccount!==null&&data.userBank.bankAccount!==undefined&&data.userBank.bankAccount!==''">{{data.userBank.bankAccount}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('public.no65')}}: 
          <span v-if="data.order.refundAmount!==null&&data.order.refundAmount!==undefined&&data.order.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.refundAmount)}}{{$store.state.common.vi_currency}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('public.no66')}}: 
          <span v-if="data.order.strLastRefundTime!==null&&data.order.strLastRefundTime!==undefined&&data.order.strLastRefundTime!==''">{{data.order.strLastRefundTime}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p>{{$t('filter.couponName')}}: 
          <span v-if="data.coupon.couponName!==null&&data.coupon.couponName!==undefined&&data.coupon.couponName!==''">{{data.coupon.couponName}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('filter.couponItem')}}: 
          <span v-if="data.coupon.couponType!==null&&data.coupon.couponType!==undefined&&data.coupon.couponType!==''">{{$t($store.getters.couponTypeState(data.coupon.couponType))}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('filter.couponCon')}}: 
          <span v-if="data.coupon.couponType==1||data.coupon.couponType==3||data.coupon.couponType==5">{{$store.getters.moneySplit(data.coupon.couponAmount)}}</span>
          <span v-else-if="data.coupon.couponType==2">{{data.coupon.couponDays+$t('public.no26')}}</span>
          <span v-else-if="data.coupon.couponType==4">{{data.coupon.couponInterest}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('filter.interest')}}: 
          <span v-if="data.order.couponAmount!==null&&data.order.couponAmount!==undefined&&data.order.couponAmount!==''">{{$store.getters.moneySplit(data.order.couponAmount)}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
      </div>
      <div class="xuan-2-2-1" v-if="$store.state.common.lang==='vi'">
        <p>{{$t('yuenan.no18')}}: 
          <span v-if="data.userBank.bankType!==null&&data.userBank.bankType!==undefined&&data.userBank.bankType!==''">{{data.userBank.bankType}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('yuenan.no19')}}: 
          <span v-if="data.userBank.email!==null&&data.userBank.email!==undefined&&data.userBank.email!==''">{{data.userBank.email}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
        <p>{{$t('websiteLoans.no5')}}: 
          <span v-if="data.order.orderLoanType!==null&&data.order.orderLoanType!==undefined&&data.order.orderLoanType!==''">{{$t($store.getters.loanTypeState(data.order.orderLoanType))}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </p>
      </div>
      <div class="xuan-2-2-1">
        <p style="width:100%">{{$t('public.no34')}}: 
          <span v-if="data.order.orderAddress!==null&&data.order.orderAddress!==undefined&&data.order.orderAddress!==''">{{data.order.orderAddress}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
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
    <div class="xuan-2-5">
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
          <template v-if="data.orderApproveList!==null&&data.orderApproveList!==undefined&&data.orderApproveList!=''">
            <tr v-for="value in data.orderApproveList" :key="value.id">
              <template>
                <td v-if="value.adminName!==null&&value.adminName!==undefined">{{value.adminName}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <td>{{$t('loanMoneyDetail.loanMoney')}}</td>
              <template>
                <td v-if="value.strApproveTime!==null&&value.strApproveTime!==undefined">{{value.strApproveTime}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <template>
                <td v-if="value.notApproveReason!==null&&value.notApproveReason!==undefined">
                  {{value.notApproveReason}}
                  <template v-if="value.notApproveSubReason!==null&&value.notApproveSubReason!==undefined">
                    {{value.notApproveSubReason}}
                  </template>
                </td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <template>
                <td v-if="value.approveType!==null&&value.approveType!==undefined">{{$t($store.getters.loanMoneyRecordStatus(value.approveType))}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <template>
                <td v-if="value.approveResult!==null&&value.approveResult!==undefined">{{$t($store.getters.loanMoneyResultStatus(value.approveResult))}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <!-- <template>
                <td v-if="value.remark!==null&&value.remark!==undefined">{{value.remark}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template> -->
              <template v-if="value.approveType==1">
                <td v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_SHOW_OPERATION_REMARK')">
                  {{value.remark}}
                </td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <template v-else>
                <td v-if="value.remark!==null&&value.remark!==undefined">
                  {{value.remark}}
                </td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
            </tr>
          </template>
          <template v-if="data.orderLendingList!==null&&data.orderLendingList!==undefined&&data.orderLendingList!=''">
            <tr v-for="value in data.orderLendingList" :key="value.id">
              <td>-</td>
              <td>{{$t('loanMoneyDetail.putMoney')}}</td>
              <template>
                <td v-if="value.strUpdateTime!==null&&value.strUpdateTime!==undefined&&value.strUpdateTime!==''">{{value.strUpdateTime}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <td>-</td>
              <td>-</td>
              <template>
                <td v-if="value.status!==null&&value.status!==undefined&&value.status!==''">{{$t($store.getters.putMoneyResultStatus(value.status))}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <template>
                <td v-if="value.remark!==null&&value.remark!==undefined&&value.remark!==''">{{value.remark}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
            </tr>
          </template>
          <template v-if="data.orderRepaymentList!==null&&data.orderRepaymentList!==undefined&&data.orderRepaymentList!=''">
            <tr v-for="value in data.orderRepaymentList" :key="value.id">
              <td>-</td>
              <td>{{$t('loanMoneyDetail.backMoney')}}</td>
              <template>
                <td v-if="value.strUpdateTime!==null&&value.strUpdateTime!==undefined&&value.strUpdateTime!==''">{{value.strUpdateTime}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <td>-</td>
              <td>-</td>
              <template>
                <td v-if="value.status!==null&&value.status!==undefined&&value.status!==''">{{$t($store.getters.backMoneyResultStatus(value.status))}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
              <template>
                <td v-if="value.remark!==null&&value.remark!==undefined&&value.remark!==''">{{value.remark}}</td>
                <td v-else>{{$store.state.common.nullData}}</td>
              </template>
            </tr>
          </template>
        </template>
        <template v-else>
          <div style="textAlign:center;width:700%;height:40px;lineHeight:40px">
            {{$t('public.no23')}}
          </div>
        </template>

      </table>
    </div>


    <div class="foot"></div>

  </div>
  <div v-else class="back">
    <p>{{$t('public.no23')}}，<span @click="back">{{$t('back.no1')}}</span> {{$t('back.no2')}}</p>
  </div>
</template>
<script>
export default {
  name: 'userManage',
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
          action: this.$store.state.actionMap.kf_noBackOrder_detail,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId,
        approveStage: ''
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
          this.data.orderPhoneApprove = res.data.data.orderPhoneApprove;
          this.data.orderLendingList = res.data.data.orderLendingList;
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
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}
$color1:#959fb9;
$color2:#000;
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

    
.xuan-2-2{
  
  .xuan-2-2-1{
    margin-bottom: 20px;
    margin-top: 10px;
    display: flex;
    p{
      line-height: 24px;
      width: 25%;
      span:nth-child(1){
        white-space: nowrap;
        color: $color1;
        font-size: 16px;
      }
      span:nth-child(2),span:nth-child(3),span:nth-child(4){
        color: $color2;
        font-size: 16px;
        margin: 0 10px;
        word-break: break-all;
      } 
    }
    .active{
      margin-left: -90px;
    }
  }
}

.xuan-2-5{
  .bank-table{
    background-color: #fff;
    border: 1px solid #ddd;
    tr{
      width: 100%;
      td{
        border: 1px solid #ddd;
        height: 40px;
        text-align: center;
        word-break: break-all;
      }
      th{
        height: 40px;
        text-align: center;
        background-color: #1D7BFF;
        color: #fff;
      }
    }
    
  }
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
