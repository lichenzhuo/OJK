<template>
  <div class="usermanage" v-if="data">
    <div class="crumbs" v-if="block==1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('OutsourcedManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/outsourceddetail'}">{{$t('OutsourcedManage.no2')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('OutsourcedManage.no12')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-if="block==2">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/outsourceddetail'}">{{$t('loanAfterManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('OutsourcedManage.no12')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------ 用户信息、借款信息开始------------------------ -->
    <div class="xuanxiangka">
      <ul class="xuan-1">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active1==value.id}" @click="active1=value.id">
            <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="xuan-2">
        <li class="xuan-2-2" v-if="active1==1">
          <template >
            <div class="xuan-2-2-1">
              <p>{{$t('new.no48')}}:
                <span v-if="data.userBase.appName!==null&&data.userBase.appName!==undefined&&data.userBase.appName!==''">{{data.userBase.appName}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('new.no49')}}:
                <span v-if="data.userBase.appPackage!==null&&data.userBase.appPackage!==undefined&&data.userBase.appPackage!==''">{{data.userBase.appPackage}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p >
                {{$t('new.no55')}}:
                <span v-if="data.orderUserSelf.whatsAPP!==null&&data.orderUserSelf.whatsAPP!==undefined&&data.orderUserSelf.whatsAPP!==''">{{data.orderUserSelf.whatsAPP}}</span>
                <span v-else> {{$store.state.common.nullData}} </span>
              </p>
            </div>
            <div class="xuan-2-2-1">
              <p>{{$t('public.userId')}}:
                <span v-if="data.collectionInfo.userId!==null&&data.collectionInfo.userId!==undefined&&data.collectionInfo.userId!==''">{{data.collectionInfo.userId}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.no1')}}:
                <span v-if="data.collectionInfo.userName!==null&&data.collectionInfo.userName!==undefined&&data.collectionInfo.userName!==''">{{data.collectionInfo.userName}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              
              <p>{{$t('public.no18')}}:
                <span v-if="data.collectionInfo.userPhone!==null&&data.collectionInfo.userPhone!==undefined&&data.collectionInfo.userPhone!==''">{{data.collectionInfo.userPhone}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p v-if="$store.state.common.lang==='vi'">
                {{$t('yuenan.no23')}}:
                <span v-if="data.collectionInfo.userPhone!==null&&data.collectionInfo.userPhone!==undefined&&data.collectionInfo.userPhone!==''">{{$store.getters.vn_phone(data.collectionInfo.userPhone)}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <template v-if="$store.state.common.lang=='id'">
                <p>{{$t('public.no4')}}:
                  <span v-if="data.orderUserSelf.bear!==null&&data.orderUserSelf.bear!==undefined&&data.orderUserSelf.bear!==''">{{$t($store.getters.birthState(data.orderUserSelf.bear))}}</span>
                  <span v-else>{{$store.state.common.nullData}}</span> 
                </p>
              </template>
            </div>
            <div class="xuan-2-2-1">
              <p>{{$t('public.no2')}}:
                <span v-if="data.collectionInfo.idCard!==null&&data.collectionInfo.idCard!==undefined&&data.collectionInfo.idCard!==''">{{data.collectionInfo.idCard}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.birthday')}}:
                <span v-if="data.orderUserSelf.birthday!==null&&data.orderUserSelf.birthday!==undefined&&data.orderUserSelf.birthday!==''">{{data.orderUserSelf.birthday}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p >
                {{$t('new.no56')}}:
                <span v-if="data.orderUserSelf.birthday!==null&&data.orderUserSelf.birthday!==undefined&&data.orderUserSelf.birthday!==''">{{$store.getters.getAge(data.orderUserSelf.birthday)}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.sex')}}:
                <span v-if="data.orderUserSelf.sex!==null&&data.orderUserSelf.sex!==undefined&&data.orderUserSelf.sex!==''">{{$t($store.getters.sexStatus(data.orderUserSelf.sex))}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div> 
            <div class="xuan-2-2-1">
              <p >{{$t('public.no12')}}:
                <span v-if="data.orderUserWork.companyPhone!==null&&data.orderUserWork.companyPhone!==undefined&&data.orderUserWork.companyPhone!==''">{{data.orderUserWork.companyPhone}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p v-if="$store.state.common.lang=='id'">
                {{$t('auditDetail.no45')}}: 
                <span v-if="data.orderUserIdcard.ocrReligion!==null&&data.orderUserIdcard.ocrReligion!==undefined&&data.orderUserIdcard.ocrReligion!==''">{{data.orderUserIdcard.ocrReligion}}</span> 
                <span v-else> {{$store.state.common.nullData}} </span> 
              </p>
              <p>{{$t('public.no3')}}:
                <span v-if="data.orderUserSelf.marriage!==null&&data.orderUserSelf.marriage!==undefined&&data.orderUserSelf.marriage!==''">{{$t($store.getters.marriage(data.orderUserSelf.marriage))}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.no9')}}:
                <span v-if="data.orderUserWork.company!==null&&data.orderUserWork.company!==undefined&&data.orderUserWork.company!==''">{{data.orderUserWork.company}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div>
            <div class="xuan-2-2-1" v-if="$store.state.common.lang=='id'">
              <p style="width:100%">{{$t('operationDetail.no1')}}:
                <span v-if="data.orderUserIdcard.ocrAddress!==null&&data.orderUserIdcard.ocrAddress!==undefined&&data.orderUserIdcard.ocrAddress!==''">{{data.orderUserIdcard.ocrAddress}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div> 
            <div class="xuan-2-2-1">
              <p style="width:100%">{{$t('public.no6')}}:
                <span v-if="data.orderUserSelf.liveAddress!==null&&data.orderUserSelf.liveAddress!==undefined&&data.orderUserSelf.liveAddress!==''">{{data.orderUserSelf.liveAddress}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div> 
          </template>
          <div class="xuan-2-2-2">
            <span>{{$t('pic.no1')}}:</span>
            <template >
              <div v-if="data.orderUserIdcard.idcardPhotoUrl!==null&&data.orderUserIdcard.idcardPhotoUrl!==undefined&&data.orderUserIdcard.idcardPhotoUrl!==''" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.orderUserIdcard.idcardPhotoUrl})">
                <img :src="data.orderUserIdcard.idcardPhotoUrl"  :alt="$t('pic.no1')" :title="$t('pic.no1')">
              </div>
              <div v-else class="xuan-2-2-2-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no2')}}:</span>
            <template >
              <div v-if="data.orderUserIdcard.facetimePhotoUrl!==null&&data.orderUserIdcard.facetimePhotoUrl!==undefined&&data.orderUserIdcard.facetimePhotoUrl!==''" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.orderUserIdcard.facetimePhotoUrl})">
                <img :src="data.orderUserIdcard.facetimePhotoUrl"  :alt="$t('pic.no2')" :title="$t('pic.no2')">
              </div>
              <div v-else class="xuan-2-2-2-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no3')}}:</span>
            <template >
              <div v-if="data.orderUserWork.incomePicUrl!==null&&data.orderUserWork.incomePicUrl!==undefined&&data.orderUserWork.incomePicUrl!==''" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.orderUserWork.incomePicUrl})">
                <img :src="data.orderUserWork.incomePicUrl"  :alt="$t('pic.no2')" :title="$t('pic.no2')">
              </div>
              <div v-else class="xuan-2-2-2-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
          </div>
        </li>
        <li class="xuan-2-2" v-if="active1==2">
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
            <p>{{$t('operationDetail.no2')}}:
              <span v-if="data.orderInfo.id!==null&&data.orderInfo.id!==undefined&&data.orderInfo.id!==''">{{data.orderInfo.id}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('public.no30')}}:
              <span v-if="data.orderInfo.loanAmount!==null&&data.orderInfo.loanAmount!==undefined&&data.orderInfo.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('public.no31')}}:
              <span v-if="data.orderInfo.productPeriod!==null&&data.orderInfo.productPeriod!==undefined&&data.orderInfo.productPeriod!==''">{{data.orderInfo.productPeriod}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('operationDetail.no6')}}:
              <span v-if="data.orderLending.amount!==null&&data.orderLending.amount!==undefined&&data.orderLending.amount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderLending.amount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div>
          <div class="xuan-2-2-1">
            <p>{{$t('proManage.feeRate')}}:
              <span v-if="data.orderInfo.feeRate!==null&&data.orderInfo.feeRate!==undefined&&data.orderInfo.feeRate!==''">{{$store.getters.twoPoint(data.orderInfo.feeRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('loanMoneyDetail.feeAmount')}}:
              <span v-if="data.orderInfo.feeAmount!==null&&data.orderInfo.feeAmount!==undefined&&data.orderInfo.feeAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.feeAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('operationDetail.no4')}}:
              <span v-if="data.orderInfo.overdueInterestRate!==null&&data.orderInfo.overdueInterestRate!==undefined&&data.orderInfo.overdueInterestRate!==''">{{$store.getters.twoPoint(data.orderInfo.overdueInterestRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('operationDetail.no5')}}:
              <span v-if="data.orderInfo.overdueInterest!==null&&data.orderInfo.overdueInterest!==undefined&&data.orderInfo.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div> 
          <div class="xuan-2-2-1">
            <p>{{$t('public.no27')}}:
              <span v-if="data.orderInfo.returnMoney!==null&&data.orderInfo.returnMoney!==undefined&&data.orderInfo.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('public.no65')}}:
              <span v-if="data.orderInfo.refundAmount!==null&&data.orderInfo.refundAmount!==undefined&&data.orderInfo.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('public.CreateDate')}}:
              <span v-if="data.orderInfo.strCreateTime!==null&&data.orderInfo.strCreateTime!==undefined&&data.orderInfo.strCreateTime!==''">{{data.orderInfo.strCreateTime}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('public.no66')}}:
              <span v-if="data.orderInfo.strLastRefundTime!==null&&data.orderInfo.strLastRefundTime!==undefined&&data.orderInfo.strLastRefundTime!==''">{{data.orderInfo.strLastRefundTime}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div> 
          <div class="xuan-2-2-1">
            <p>{{$t('operationDetail.no3')}}:
              <span v-if="data.orderInfo.dayInterestRate!==null&&data.orderInfo.dayInterestRate!==undefined&&data.orderInfo.dayInterestRate!==''">{{$store.getters.twoPoint(data.orderInfo.dayInterestRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('loanMoneyDetail.currentInterest')}}:
              <span v-if="data.orderInfo.currentInterest!==null&&data.orderInfo.currentInterest!==undefined&&data.orderInfo.currentInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.currentInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('public.no28')}}:
              <span v-if="data.orderInfo.overdueDays!==null&&data.orderInfo.overdueDays!==undefined&&data.orderInfo.overdueDays!==''">{{data.orderInfo.overdueDays}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('public.no86')}}: 
              <span v-if="data.orderInfo.overdueServiceFee!==null&&data.orderInfo.overdueServiceFee!==undefined&&data.orderInfo.overdueServiceFee!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.overdueServiceFee)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
          </div> 
          <div class="xuan-2-2-1">
            <p>{{$t('public.no58')}}:
              <span v-if="data.orderInfo.strLoanTime!==null&&data.orderInfo.strLoanTime!==undefined&&data.orderInfo.strLoanTime!==''">{{data.orderInfo.strLoanTime}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
            <p>{{$t('public.CreateTime')}}: 
              <span v-if="data.orderInfo.strMustRefundTime!==null&&data.orderInfo.strMustRefundTime!==undefined&&data.orderInfo.strMustRefundTime!==''">{{data.orderInfo.strMustRefundTime}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
          </div> 
          
        </li>
      </ul>
    </div>

    <!-- ------------ 催收记录、紧急联系人、通话联系人开始------------------------ -->
    <div class="xuanxiangka">
      <ul class="xuan-1">
        <li v-for="(value,index) in arr2" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="xuan-2">
        <!-- ------------ 催收记录开始------------------------ -->
        <li class="xuan-2-6" v-if="active2==1">
          <template v-if="orderNo">
            <cuishou-list :order-no="orderNo"></cuishou-list>
          </template>
        </li>
        <!-- ------------ 紧急联系人开始------------------------ -->
        <li class="xuan-2-9" v-if="active2==2">
          <div class="xuan-2-9-1">
            <template v-if="data.orderUrgentContact!==null&&data.orderUrgentContact!==undefined&&data.orderUrgentContact!=''">
              <el-radio-group v-model="emeContact" class="radio1">
                <el-radio v-for="(item,index) in data.orderUrgentContact" :key="index" :label="item.contactName+','+item.contactRelation+','+item.contactPhone">
                  <span>{{$t('public.name')}}：{{item.contactName}}</span>
                  <span style="margin:0 20px;">{{$t('operationDetail.no13')}}:{{item.contactPhone}}</span>
                  <span>{{$t('operationDetail.no14')}}:{{item.contactCnt?item.contactCnt:0}} {{$t('operationDetail.no15')}}</span>
                  <span>{{$t('new.no57')}}:{{item.keepTime?item.keepTime:0}}s </span>
                </el-radio>
              </el-radio-group>
            </template>
            <div v-else style="padding:0 30px">
              {{$t('public.no23')}}
            </div>
          </div>
        </li>
        <!-- ------------ 通话联系人开始------------------------ -->
        <li class="xuan-2-3" v-if="active2==3">
          <div class="xuan-2-3-1">
            <address-list :get-address="getLinkMan" :order-no="orderNo"></address-list>
          </div>
        </li>
        <!-- ------------ 呼叫结果开始 ------------------------ -->
        <li class="xuan-2-6" v-if="active2==5&&$store.state.common.lang!=='PHL'">
          <template v-if="orderNo">
            <group-busy-result :type="1" :order-no="orderNo"></group-busy-result>
          </template>
        </li>
      </ul>
    </div>

    <div class="foot"></div>
    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>
  </div>
  <div v-else class="back">
    <p>{{$t('public.no23')}}，<span @click="back">{{$t('back.no1')}}</span> {{$t('back.no2')}}</p>
  </div>
</template>
<script>
import appLightbox from '../../components/component/lightbox'// 图片点击放大组件
import cuishouList from '../../components/component/cuishou'// 催收记录列表组件
import addressList from '../../components/component/address'// 通讯录列表组件
import groupBusyResult from '../../components/component/groupBusyResult'// 通讯录列表组件

export default {
  name: 'userManage',
  components: {
    appLightbox,
    cuishouList,
    groupBusyResult,
    addressList
  },
  data () {
    return {
      sessionid: '',
      collectionId: '', // 传过来的催收ID
      orderNo: '', // 传过来的订单编号
      lightBoxToggle: false, // 图片放大显示层开关
      block: '', // 判断是从哪个列表进入
      active1: 1, // 第一个选项卡当前选中项
      active2: 1, // 第二个选项卡当前选中项
      data: {// 页面信息汇总
        orderLending: '',
        orderUserWork: '', // 工作单位
        orderUserContactList: '', // 通话记录联系人列表
        orderUserIdcard: '', // 身份相关信息
        collectionInfo: '', // 个人资料
        orderInfo: '', // 借款信息
        userBase: '', // 借款信息
        orderExtra: '', // 借款信息
        orderUserSelf: '', // 生活信息详情
        collectionSmsTemplateList: '', // 短信模版
        collectionRecordList: '', // 催收记录列表
        orderUrgentContact: '', // 紧急联系人列表
        orderPhoneApprove:'',
        partialShow:'',
        overCouponShow:'',
      },
      emeContact: '', // 紧急联系人选中项
      contact: '' // 通话记录联系人选中项
    }
  },
  computed: {
    arr1 () {
      return [
        {id: 1, title: this.$t('operationDetail.tab1.no1')},
        {id: 2, title: this.$t('operationDetail.tab1.no2')}
      ]
    },
    arr2 () {
      return [
        {id: 1, title: this.$t('operationDetail.tab2.no1')},
        {id: 2, title: this.$t('operationDetail.tab2.no2')},
        {id: 3, title: this.$t('operationDetail.tab2.no3')},
        {id: 4, title: this.$t('public.no12')},
        {id: 5, title: this.$t('new.no93')}
      ]
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
    detail () { // 获取详情页数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.myOperation_detail,
          sessionid: this.sessionid
        },
        orderNo: this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.data.orderLending = res.data.data.orderLending
          this.data.orderUserWork = res.data.data.orderUserWork
          this.data.orderUserContactList = res.data.data.orderUserContactList
          this.data.orderUserIdcard = res.data.data.orderUserIdcard
          this.data.collectionInfo = res.data.data.collectionInfo
          this.data.orderInfo = res.data.data.orderInfo
          this.data.userBase = res.data.data.userBase
          this.data.orderExtra = res.data.data.orderExtra
          this.data.orderUserSelf = res.data.data.orderUserSelf
          this.data.collectionSmsTemplateList = res.data.data.collectionSmsTemplateList
          this.data.collectionRecordList = res.data.data.collectionRecordList
          this.data.orderUrgentContact = res.data.data.orderUrgentContact
          this.data.partialShow = res.data.data.partialShow
          this.data.overCouponShow = res.data.data.overCouponShow
        } else {
          this.data = []
        }
      })
    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1)
    },
    getLinkMan (val) {
      this.contact = val
    }
  },
  watch: {
    
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.orderNo = this.$route.query.orderNo
    this.block = this.$route.query.block
    this.detail();
    
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


.xuanxiangka{
  width: 100%;
  height: auto;
  background-color: #fff;
  margin-bottom: 40px;
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
    .xuan-2-1{
      p{
        margin: 10px;
        color: $color1;
        font-size: 16px;
        span{
          color: $color2;
          font-size: 16px;
          margin: 0 10px;
          font-weight: bold;
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
    .xuan-2-2{
      .xuan-2-2-1{
        margin-bottom: 26px;
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
        .radio1{
          .el-radio{
            width:100%;
            margin: 10px 0;
          }
          .el-radio+.el-radio{
            margin: 10px 0;
          }
        }
      
        
      }
      .xuan-2-2-2{
        width: 100%;
        display: flex;
        align-items: center;
        .xuan-2-2-2-1{
          width: 200px;
          height: 110px;
          margin-right: 40px;
        }
      }
    }
    .xuan-2-9{
      .xuan-2-9-1{
        margin-bottom: 40px;
        display: flex;
        .radio1{
          .el-radio{
            width:100%;
            margin: 10px 0;
          }
          .el-radio+.el-radio{
            margin: 10px 0;
          }
        }
      }
    }
    .xuan-2-3{
      display: flex;
      .xuan-2-3-1{
        width: 100%;
        height: auto;
        ul{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          li{
            width: 33%;
          }
        }
      }
    }
    .xuan-2-4{
      .xuan-2-4-1{
        width: 100%;
        height: auto;
        margin-bottom: 24px;  
        border-bottom: 1px solid #ddd;
        .xuan-2-4-1-1{
          color: #333;
          display: flex;
          width: 100%;
          height: 40px;
          line-height: 40px;
          span{
            display: block;
            width: 4px;
            height: 40px;
            background-color: #1D7BFF;
            border-radius: 5px;
            margin: 0px 10px;

          }      
        }
        .xuan-2-4-1-2{
          display: flex;
          p{
            margin: 10px 30px 10px 10px;
            color: $color1;
            font-size: 16px;
            span{
              color: $color2;
              font-size: 16px;
              margin: 0 10px;
              font-weight: bold;
            } 
          }
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
            width: 25%;
            height: 40px;
            text-align: center;
            border: 1px solid #ddd;
            word-break: break-all;
          }
          th{
            width: 25%;
            height: 40px;
            text-align: center;
            background-color: #1D7BFF;
            color: #fff;
          }
        }
        
      }
    }
    .xuan-2-6{
      .loan-table{
        background-color: #fff;
        border: 1px solid #ddd;
        tr{
          width: 100%;
          td{
            height: 40px;
            text-align: center;
            border: 1px solid #ddd;
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
    .xuan-2-7{
      .el-textarea{
        width: 50%;
      }
    }
    .xuan-2-10{
      .radio-select{
        padding:0px 20px 20px;
      }
      .el-textarea{
        width: 50%;
      }
    }
  }
  
}
.xuan-3{
  width: 100%;
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
.foot{
  height: 40px;
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

.el-radio span{
  user-select: text;
}

</style>
