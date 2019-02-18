<template>
  <div class="xuanxiangka">
      <ul class="xuan-1">
        <li v-for="(value,index) in arr3" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul>
        <li class="xuan-2-1" v-if="active2==1">
          <div class="detail">
            <div class="detail-1">
              <p><span>{{$t('new.no48')}}:</span> <span>{{data.userBase.appName!==null&&data.userBase.appName!==undefined&&data.userBase.appName!==''?data.userBase.appName:$store.state.common.nullData}}</span> </p>
              <p><span>{{$t('new.no49')}}:</span> <span>{{data.userBase.appPackage!==null&&data.userBase.appPackage!==undefined&&data.userBase.appPackage!==''?data.userBase.appPackage:$store.state.common.nullData}}</span> </p>
              <p >
                <span>{{$t('new.no55')}}:</span>
                <span v-if="data.userSelf.whatsAPP!==null&&data.userSelf.whatsAPP!==undefined&&data.userSelf.whatsAPP!==''">{{data.userSelf.whatsAPP}}</span>
                <span v-else> {{$store.state.common.nullData}} </span>
              </p>
            </div>
            <div class="detail-1">
              <p><span>{{$t('public.userId')}}:</span> <span>{{data.userBase.id!==null&&data.userBase.id!==undefined&&data.userBase.id!==''?data.userBase.id:$store.state.common.nullData}}</span> </p>
              <p><span>{{$t('public.no1')}}:</span> <span>{{data.userBase.name!==null&&data.userBase.name!==undefined&&data.userBase.name!==''?data.userBase.name:$store.state.common.nullData}}</span> </p>
              <p><span>{{$t('public.no2')}}:</span> <span>{{data.userIdcard.idCard!==null&&data.userIdcard.idCard!==undefined&&data.userIdcard.idCard!==''?data.userIdcard.idCard:$store.state.common.nullData}}</span> </p>
              <p><span>{{$t('public.userTel')}}:</span> <span>{{data.userBase.phone!==null&&data.userBase.phone!==undefined&&data.userBase.phone!==''?data.userBase.phone:$store.state.common.nullData}}</span> </p>
            </div>
            <div class="detail-1">
              <p>
                <span>{{$t('public.sex')}}:</span> 
                <span v-if="data.userSelf.sex!==null&&data.userSelf.sex!==undefined&&data.userSelf.sex!==''">{{$t($store.getters.sexStatus(data.userSelf.sex))}}</span> 
                <span v-else> {{$store.state.common.nullData}} </span> 
              </p>
              <template >
                <p v-if="data.userSelf.marriage!==null&&data.userSelf.marriage!==undefined&&data.userSelf.marriage!==''"><span>{{$t('public.no3')}}: </span>
                  <span>{{$t($store.getters.marriage(data.userSelf.marriage))}}</span>
                </p>
                <p v-else><span>{{$t('public.no3')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="data.userSelf.bear!==null&&data.userSelf.bear!==undefined&&data.userSelf.bear!==''"><span>{{$t('public.no4')}}: </span>
                  <span>{{$t($store.getters.birthState(data.userSelf.bear))}}</span>
                </p>
                <p v-else><span>{{$t('public.no4')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template >
                <p v-if="data.userSelf.degree!==null&&data.userSelf.degree!==undefined&&data.userSelf.degree!==''"><span>{{$t('public.no5')}}: </span>
                  <span>{{$t($store.getters.education(data.userSelf.degree))}}</span>
                </p>
                <p v-else><span>{{$t('public.no5')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
            </div>
            <div class="detail-1">
              <p>
                <span>{{$t('auditDetail.no45')}}:</span> 
                <span v-if="data.userIdcard.ocrReligion!==null&&data.userIdcard.ocrReligion!==undefined&&data.userIdcard.ocrReligion!==''">{{data.userIdcard.ocrReligion}}</span> 
                <span v-else> {{$store.state.common.nullData}} </span> 
              </p>
              <p><span>{{$t('public.no8')}}:</span> <span>{{data.userSelf.liveTime!==null&&data.userSelf.liveTime!==undefined&&data.userSelf.liveTime!==''?$t($store.getters.liveTime(data.userSelf.liveTime)):$store.state.common.nullData}}</span> </p>                      
              <p >
                <span>{{$t('public.birthday')}}:</span>
                <span v-if="data.userSelf.birthday!==null&&data.userSelf.birthday!==undefined&&data.userSelf.birthday!==''">{{data.userSelf.birthday}}</span>
                <span v-else>{{$store.state.common.nullData}}</span>
              </p>
              <p >
                {{$t('new.no56')}}:
                <span v-if="data.userSelf.birthday!==null&&data.userSelf.birthday!==undefined&&data.userSelf.birthday!==''">{{$store.getters.getAge(data.userSelf.birthday)}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div>
            <div class="detail-1">
              <template >
                <p style="width:100%" v-if="data.userSelf.liveProvinceName!==null&&data.userSelf.liveProvinceName!==undefined&&data.userSelf.liveProvinceName!==''"><span>{{$t('public.no6')}}: </span>
                  <span>{{data.userSelf.liveProvinceName}}</span>-
                  <span v-if="data.userSelf.liveCityName!==null&&data.userSelf.liveCityName!==undefined&&data.userSelf.liveCityName!==''">{{data.userSelf.liveCityName}}</span>
                  <!-- <span v-if="data.userSelf.liveRegionName!==null&&data.userSelf.liveRegionName!==undefined&&data.userSelf.liveRegionName!==''">{{data.userSelf.liveRegionName}}</span> -->
                </p>
                <p v-else><span>{{$t('public.no6')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
            </div>
            <div class="detail-1">
              <p style="width:100%"><span>{{$t('public.no7')}}:</span> <span>{{data.userSelf.liveAddress!==null&&data.userSelf.liveAddress!==undefined&&data.userSelf.liveAddress!==''?data.userSelf.liveAddress:$store.state.common.nullData}}</span> </p>
            </div>
            <div class="detail-1">
              <p style="width:100%"><span>{{$t('public.no34')}}:</span> <span>{{data.order.orderAddress!==null&&data.order.orderAddress!==undefined&&data.order.orderAddress!==''?data.order.orderAddress:$store.state.common.nullData}}</span> </p>
            </div>
            
          </div>
        </li>
        <li class="xuan-2-1" v-if="active2==2">
          <div class="detail">
            <div class="detail-1">
              <p><span>{{$t('new.no48')}}:</span> <span>{{data.orderExtra.appName!==null&&data.orderExtra.appName!==undefined&&data.orderExtra.appName!==''?data.orderExtra.appName:$store.state.common.nullData}}</span> </p>
              <p><span>{{$t('new.no49')}}:</span> <span>{{data.orderExtra.appPackage!==null&&data.orderExtra.appPackage!==undefined&&data.orderExtra.appPackage!==''?data.orderExtra.appPackage:$store.state.common.nullData}}</span> </p>
            </div>
            <div class="detail-1">
              <p>{{$t('operationDetail.no2')}}:
                <span v-if="data.order.id!==null&&data.order.id!==undefined&&data.order.id!==''">{{data.order.id}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.no30')}}:
                <span v-if="data.order.loanAmount!==null&&data.order.loanAmount!==undefined&&data.order.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.loanAmount)}}{{$store.state.common.vi_currency}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.no31')}}:
                <span v-if="data.order.productPeriod!==null&&data.order.productPeriod!==undefined&&data.order.productPeriod!==''">{{data.order.productPeriod}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div>
            <div class="detail-1">
              <p>{{$t('proManage.feeRate')}}:
                <span v-if="data.order.feeRate!==null&&data.order.feeRate!==undefined&&data.order.feeRate!==''">{{$store.getters.twoPoint(data.order.feeRate)}}%</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('loanMoneyDetail.feeAmount')}}:
                <span v-if="data.order.feeAmount!==null&&data.order.feeAmount!==undefined&&data.order.feeAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.feeAmount)}}{{$store.state.common.vi_currency}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('operationDetail.no4')}}:
                <span v-if="data.order.overdueInterestRate!==null&&data.order.overdueInterestRate!==undefined&&data.order.overdueInterestRate!==''">{{$store.getters.twoPoint(data.order.overdueInterestRate)}}%</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('operationDetail.no5')}}:
                <span v-if="data.order.overdueInterest!==null&&data.order.overdueInterest!==undefined&&data.order.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div>
            <div class="detail-1">
              <p>{{$t('public.no27')}}:
                <span v-if="data.order.returnMoney!==null&&data.order.returnMoney!==undefined&&data.order.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.returnMoney)}}{{$store.state.common.vi_currency}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.no65')}}:
                <span v-if="data.order.refundAmount!==null&&data.order.refundAmount!==undefined&&data.order.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.refundAmount)}}{{$store.state.common.vi_currency}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.CreateDate')}}:
                <span v-if="data.order.strCreateTime!==null&&data.order.strCreateTime!==undefined&&data.order.strCreateTime!==''">{{data.order.strCreateTime}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.no66')}}:
                <span v-if="data.order.strLastRefundTime!==null&&data.order.strLastRefundTime!==undefined&&data.order.strLastRefundTime!==''">{{data.order.strLastRefundTime}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div>
            <div class="detail-1">
              <p>{{$t('operationDetail.no3')}}:
                <span v-if="data.order.dayInterestRate!==null&&data.order.dayInterestRate!==undefined&&data.order.dayInterestRate!==''">{{$store.getters.twoPoint(data.order.dayInterestRate)}}%</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('loanMoneyDetail.currentInterest')}}:
                <span v-if="data.order.currentInterest!==null&&data.order.currentInterest!==undefined&&data.order.currentInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.currentInterest)}}{{$store.state.common.vi_currency}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.no28')}}:
                <span v-if="data.order.overdueDays!==null&&data.order.overdueDays!==undefined&&data.order.overdueDays!==''">{{data.order.overdueDays}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  props: {
    data: [Object]
  },
  data () {
    return {
      active2: 1
    }
  },
  computed: {
    arr3 () {
      let arr = []
      arr.push({id: 1, title: this.$t('operationDetail.tab1.no1')})
      arr.push({id: 2, title: this.$t('operationDetail.tab1.no2')})
      return arr
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}
@mixin p-span {
  p{
    line-height: 24px;
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
}
$color1:#959fb9;
$color2:#000;
.detail{
  width: 100%;
  height: auto;
  padding: 10px 20px;
  background-color: #fff;
  margin-bottom: 30px;
  .detail-1{
    margin-bottom: 24px;
    display: flex;
    @include p-span;
    p{
      width: 25%;
    }
  }
}

.xuanxiangka{
  width: 100%;
  height: auto;
  background-color: #fff;
  .xuan-1{
    width: 100%;
    height: 60px;
    display: flex;
    li{
      height: 100%;
      padding: 0 20px;
      text-align: center;
      line-height: 60px;
      color: $color2;
      display: flex;
      align-items: center;
      cursor: pointer;
      span{
        display: block;
        height: 40px;
        line-height: 40px;
      }
    }
    .active{
      span{
        border-bottom: 2px solid #547afe;
      }
    }
  }
  .xuan-2{
    width: 100%;
    height: auto;
    li{
      width: 100%;
      padding: 20px;
    }
    
  }
  
}
.xuan-2-1{
  .xuan-2-1-1{
    width: 100%;
    display: flex;
    .xuan-2-1-1-1{
      width: 45%;
      @include p-span;
      p{
        margin: 20px;
      }
    }
    .xuan-2-1-2-2{
      width: 10%;
      display: flex;
      align-items: center;
      p{
        line-height: 20px;
      }
    }
    .xuan-2-1-1-2{
      width: 70%;
      padding-left: 20px;
      .xuan-2-1-1-22{
        display: flex;
        margin: 15px 0;
        @include p-span;
        p{
          width: 33%;
        }
      }
    }
    .xuan-2-1-1-3{
      width: 30%;
    }
    
  }
  .xuan-2-1-2{
    width: 100%;
    .xuan-2-1-2-1{
      margin: 20px 20px;
      display: flex;
      align-items: center;
      @include p-span;
      p{
        padding-right: 50px;
      }
      .tooltip{
        width: 15px;
        height: 15px;
        img{
          display: block;
        }
      }
    }
    .xuan-2-1-2-2{
      margin: 20px 20px;
      display: flex;
      align-items: center;
      span{
        margin: 0 10px;
      }
      @include p-span;
      
      .tooltip{
        width: 15px;
        height: 15px;
        img{
          display: block;
        }
      }
    }
  }
  
  .idimgbox{
    width: 410px;
    height: auto;
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
    .idimg{
      width: 200px;
      height: auto;
    }
  }
}
</style>
