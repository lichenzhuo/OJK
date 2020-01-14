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
          <p><span style="color:crimson">{{$t('add.no70')}}:</span>
            <span style="color:crimson">{{data.userBase.regChannel | dataIsTrue}}</span>
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
          <!-- <p><span>{{$t('public.no3')}}:</span>
            <span>{{$t($store.getters.marriage(data.userSelf.marriage))}}</span>
          </p> -->
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
          <p><span>{{$t('yn.no27')}}:</span>
            <span>{{data.userWork.payDate | dataIsTrue}}</span>
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
        <template v-if="data.oldUserIdCard">
          <p  class="oneLineHasOne red fw600" >{{$t('add.no88')}}</p>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.name')}}:</span>
              <span>{{data.oldUserIdCard.name | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no2')}}:</span>
              <span>{{data.oldUserIdCard.idCard | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oldimg flex flex-justify-start">
            <div v-if="data.oldUserIdCard.idcardPhotoUrl" class="old_img pic" @click="openBox({imgUrl:data.oldUserIdCard.idcardPhotoUrl})">
              <img :src="data.oldUserIdCard.idcardPhotoUrl"  :alt="$t('pic.no1')" :title="$t('pic.no1')">
            </div>
            <div v-if="data.oldUserIdCard.facetimePhotoUrl" class="old_img pic" @click="openBox({imgUrl:data.oldUserIdCard.facetimePhotoUrl})">
              <img :src="data.oldUserIdCard.facetimePhotoUrl" :alt="$t('pic.no2')" :title="$t('pic.no2')">
            </div>
          </div>
        </template>
        
      </li>
      <li  v-show="active2==2">
        <div class="oneLineHasFour">
          <p><span>{{$t('new.no48')}}:</span>
          <span>{{data.orderExtra.appName | dataIsTrue}}</span></p>
          <p><span>{{$t('new.no49')}}:</span>
          <span>{{data.orderExtra.appPackage | dataIsTrue}}</span></p>
          <p><span style="color:crimson">{{$t('add.no69')}}:</span>
            <span style="color:crimson">{{data.orderExtra.partnerName | dataIsTrue}}</span>
          </p>
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
            <span>{{$store.getters.twoPoint(data.order.feeRate)}}</span>
          </p>
          <p><span>{{$t('loanMoneyDetail.feeAmount')}}:</span>
            <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.feeAmount)}}{{$store.state.common.vi_currency}}</span>
          </p>
          <p><span>{{$t('operationDetail.no3')}}:</span>
            <span>{{$store.getters.twoPoint(data.order.dayInterestRate)}}</span>
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
          <p><span>{{$t('yn.no28')}}:</span>
          <span>{{$t($store.getters.loanUse_status(data.orderExtra.loanUse))}}</span></p>
        </div>
        <div class="oneLineHasFour">
          <p><span>分期计划:</span>
            <span style="font-size: 18px;color: red;cursor: pointer;" @click="ShowPlan">{{$t('loanAfterManage.sel')}}</span>
          </p>
        </div>
      </li>
    </ul>

    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>
     <el-dialog title="分期计划" :visible.sync="dialogPlanVisible1" width="600px">
      <el-table :data="PlanData1" show-summary>
        <el-table-column label="期数" prop="stages" width="150">
          <template slot-scope="scope">
            <span>第{{scope.row.stages}}期</span>
          </template>
        </el-table-column>
        <el-table-column label="天数分期" prop="instalmentPeriod" width="200"></el-table-column>
        <el-table-column label="金额分期" prop="amount"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import appLightbox from './lightbox'// 图片点击放大组件

export default {
  props: ['data','auditType'],
  components: {
    appLightbox
  },
  data () {
    return {
      dialogPlanVisible1:false,
      sessionid:'',
      orderNo:'',
      PlanData1:[],
      active2: 1,
      title: '',
      currentObj: '',
      lightBoxToggle: false, // 图片放大显示层开关
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
    //分期计划
    ShowPlan(e){
      console.log(this.$route.query.orderNo,'666')
      this.orderNo=this.$route.query.orderNo
       let option={
        header:{
          ...this.$base,
          action: this.$store.state.actionMap.OrderPlan,
          'sessionid': this.sessionid
        },
        orderNo:this.orderNo
      }
      this.$axios.post('',option).then(res=>{
        if (res.data.header.code==0) {
          console.log(res,1111)
          this.PlanData1=res.data.data
          this.dialogPlanVisible1=true
        }else{

        }
        
      })
    },
    openBox: function (obj) { // 图片点击放大显示
      this.currentObj = obj;
      this.lightBoxToggle = !this.lightBoxToggle;
    },
    closeBox: function () { // 图片点击放大关闭
      this.lightBoxToggle = false;
    },
  },
  mounted(){
    this.title = global.config.headerTotal;
    this.sessionid = sessionStorage.getItem("sessionid");
  }
}
</script>
<style lang="scss" scoped>
  .old_img{
    width: 160px;
    height: 100px;
    margin-right: 20px;
  }
</style>
