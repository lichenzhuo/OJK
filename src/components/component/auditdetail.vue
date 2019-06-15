<template>
  <div class="tabs">
    <ul class="tabs_title">
      <li v-for="(value,index) in arr3" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
        <span>{{value.title}}</span>
      </li>
    </ul>
    <ul class="tabs_main">
      <li  v-show="active2==1">
        <div class="oneLineHasFour">
          <p><span>{{$t('new.no48')}}:</span><span>{{data.userBase.appName | dataIsTrue}}</span></p>
          <p><span>{{$t('new.no49')}}:</span><span>{{data.userBase.appPackage | dataIsTrue}}</span></p>
          <p >
            <span>{{$t('new.no55')}}:</span>
            <span>{{data.userSelf.whatsAPP | dataIsTrue}}</span>
          </p>
          <p><span>{{$t('yn.no27')}}:</span>
            <span>{{data.userWork.payDate | dataIsTrue}}</span>
          </p>
        </div>
        <div class="oneLineHasFour">
          <p><span>{{$t('public.userId')}}:</span><span>{{data.userBase.id | dataIsTrue}}</span></p>
          <p><span>{{$t('public.no1')}}:</span><span>{{data.userBase.name | dataIsTrue}}</span></p>
          <p><span>{{$t('public.no2')}}:</span><span>{{data.userIdcard.idCard | dataIsTrue}}</span></p>
          <p><span>{{$t('public.userTel')}}:</span><span>{{data.userBase.phone | dataIsTrue}}</span></p>
        </div>
        <div class="oneLineHasFour">
          <p>
            <span>{{$t('public.sex')}}:</span>
            <span>{{$t($store.getters.sexStatus(data.userSelf.sex))}}</span>
          </p>
          <p><span>{{$t('public.no3')}}:</span>
            <span>{{$t($store.getters.marriage(data.userSelf.marriage))}}</span>
          </p>
          <p><span>{{$t('public.no4')}}:</span>
            <span>{{$t($store.getters.birthState(data.userSelf.bear))}}</span>
          </p>
          <p><span>{{$t('public.no5')}}:</span>
            <span>{{$t($store.getters.education(data.userSelf.degree))}}</span>
          </p>
        </div>
        <div class="oneLineHasFour">
          <p><span>{{$t('auditDetail.no45')}}:</span>
            <span>{{data.userIdcard.ocrReligion | dataIsTrue}}</span>
          </p>
          <p><span>{{$t('public.no8')}}:</span>
            <span>{{$t($store.getters.liveTime(data.userSelf.liveTime))}}</span>
          </p>                      
          <p><span>{{$t('public.birthday')}}:</span>
            <span>{{data.userSelf.birthday | dataIsTrue}}</span>
          </p>
          <p><span>{{$t('new.no56')}}:</span>
            <span>{{$store.getters.getAge(data.userSelf.birthday)}}</span>
          </p>
        </div>
        <div class="oneLineHasFour">
          <p><span>Email:</span>
            <span>{{data.userSelf.email | dataIsTrue}}</span>
          </p>
        </div>
        <div class="oneLineHasOne">
          <p><span>{{$t('public.no6')}}:</span>
            <span>{{data.userSelf.liveProvinceName | dataIsTrue}}-{{data.userSelf.liveCityName | dataIsTrue}}</span>
          </p>
        </div>
        <div class="oneLineHasOne">
          <p><span>{{$t('public.no7')}}:</span><span>{{data.userSelf.liveAddress | dataIsTrue}}</span></p>
        </div>
        <div class="oneLineHasOne">
          <p><span>{{$t('public.no34')}}:</span><span>{{data.order.orderAddress | dataIsTrue}}</span></p>
        </div>
      </li>
      <li  v-show="active2==2">
        <div class="oneLineHasFour">
          <p><span>{{$t('new.no48')}}:</span>
          <span>{{data.orderExtra.appName | dataIsTrue}}</span></p>
          <p><span>{{$t('new.no49')}}:</span>
          <span>{{data.orderExtra.appPackage | dataIsTrue}}</span></p>
          <p><span>{{$t('yn.no28')}}:</span>
          <span>{{$t($store.getters.loanUse_status(data.orderExtra.loanUse))}}</span></p>
          <!-- v-if="!(title==='kilatloan'&&auditType==1)" -->
          <p  class="pinfen"><span style="color: coral;font-size:30px;">{{$t('yn.no51')}}:</span>
            <span style="color: coral;font-size:30px;" v-if="data.orderExtra.auditStrategy">{{data.orderExtra.auditStrategy}}</span>
            <span style="color: coral;font-size:30px;" v-else>{{$t('yn.no52')}}</span>
          </p>
        </div>
        <div class="oneLineHasFour">
          <p><span>{{$t('operationDetail.no2')}}:</span>
            <span>{{data.order.id | dataIsTrue}}</span>
          </p>
          <p><span>{{$t('public.no30')}}:</span>
            <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.loanAmount)}}{{$store.state.common.vi_currency}}</span>
          </p>
          <p><span>{{$t('public.no31')}}:</span>
            <span>{{data.order.productPeriod | dataIsTrue}}</span>
          </p>
        </div>
        <div class="oneLineHasFour">
          <p><span>{{$t('proManage.feeRate')}}:</span>
            <span>{{$store.getters.twoPoint(data.order.feeRate)}}%</span>
          </p>
          <p><span>{{$t('loanMoneyDetail.feeAmount')}}:</span>
            <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.feeAmount)}}{{$store.state.common.vi_currency}}</span>
          </p>
          <p><span>{{$t('operationDetail.no3')}}:</span>
            <span>{{$store.getters.twoPoint(data.order.dayInterestRate)}}%</span>
          </p>
          <p><span>{{$t('loanMoneyDetail.currentInterest')}}:</span>
            <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.currentInterest)}}{{$store.state.common.vi_currency}}</span>
          </p>
        </div>
        <div class="oneLineHasFour">
          <p><span>{{$t('public.no27')}}:</span>
            <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.returnMoney)}}{{$store.state.common.vi_currency}}</span>
          </p>
          <p><span>{{$t('public.no65')}}:</span>
            <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.refundAmount)}}{{$store.state.common.vi_currency}}</span>
          </p>
          <p><span>{{$t('public.CreateDate')}}:</span>
            <span>{{data.order.strCreateTime | dataIsTrue}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['data','auditType'],
  data () {
    return {
      active2: 1,
      title: ''
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

  },
  mounted(){
    this.title = global.config.headerTotal
  }
}
</script>
<style lang="scss" scoped>
  
</style>
