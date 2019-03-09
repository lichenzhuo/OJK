<template>
  <div class="public_main" v-if="data">
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
    <div class="tabs mb20">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active1==value.id}" @click="active1=value.id">
            <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <li  v-if="active1==1">
          <template >
            <div class="oneLineHasFour">
              <p><span>{{$t('new.no48')}}:</span>
                <span>{{data.userBase.appName | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('new.no49')}}:</span>
                <span>{{data.userBase.appPackage | dataIsTrue}}</span>
              </p>
            </div>
            <div class="oneLineHasFour">
              <p><span>{{$t('public.userId')}}:</span>
                <span>{{data.collectionInfo.userId | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('public.no1')}}:</span>
                <span>{{data.collectionInfo.userName | dataIsTrue}}</span>
              </p>
              <p>{{$t('public.no18')}}:
                <span>{{data.collectionInfo.userPhone | dataIsTrue}}</span>
              </p>
              <p v-if="$store.state.common.lang==='vi'">
                <span>{{$t('yuenan.no23')}}:</span>
                <span>{{$store.getters.vn_phone(data.collectionInfo.userPhone)}}</span>
              </p>
              <template v-if="$store.state.common.lang=='id'">
                <p><span>{{$t('public.no4')}}:</span>
                  <span>{{$t($store.getters.birthState(data.orderUserSelf.bear))}}</span>
                </p>
              </template>
            </div>
            <div class="oneLineHasFour">
              <p><span>{{$t('public.no2')}}:</span>
                <span>{{data.collectionInfo.idCard | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('public.birthday')}}:</span>
                <span>{{data.orderUserSelf.birthday | dataIsTrue}}</span>
              </p>
              <p >
                <span>{{$t('new.no56')}}:</span>
                <span>{{$store.getters.getAge(data.orderUserSelf.birthday)}}</span>
              </p>
              <p><span>{{$t('public.sex')}}:</span>
                <span>{{$t($store.getters.sexStatus(data.orderUserSelf.sex))}}</span>
              </p>
            </div> 
            <div class="oneLineHasFour">
              <p ><span>{{$t('public.no12')}}:</span>
                <span>{{data.orderUserWork.companyPhone | dataIsTrue}}</span>
              </p>
              <p v-if="$store.state.common.lang=='id'">
                <span>{{$t('auditDetail.no45')}}: </span>
                <span>{{data.orderUserIdcard.ocrReligion | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('public.no3')}}:</span>
                <span>{{$t($store.getters.marriage(data.orderUserSelf.marriage))}}</span>
              </p>
              <p><span>{{$t('public.no9')}}:</span>
                <span>{{data.orderUserWork.company | dataIsTrue}}</span>
              </p>
              <p v-if="$store.state.common.lang==='vi'">
                <span>faceBook:</span> 
                <span>{{data.orderFacebook.fblink | dataIsTrue}}</span>
              </p>
            </div>
            <div class="oneLineHasOne" v-if="$store.state.common.lang=='id'">
              <p ><span>{{$t('operationDetail.no1')}}:</span>
                <span>{{data.orderUserIdcard.ocrAddress | dataIsTrue}}</span>
              </p>
            </div> 
            <div class="oneLineHasOne">
              <p ><span>{{$t('public.no6')}}:</span>
                <span>{{data.orderUserSelf.liveAddress | dataIsTrue}}</span>
              </p>
            </div> 
          </template>
          <div class="xuan-2-2-2">
            <span>{{$t('pic.no1')}}:</span>
            <template >
              <div v-if="data.orderUserIdcard.idcardPhotoUrl" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.orderUserIdcard.idcardPhotoUrl})">
                <img :src="data.orderUserIdcard.idcardPhotoUrl" >
              </div>
              <div v-else class="xuan-2-2-2-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no2')}}:</span>
            <template >
              <div v-if="data.orderUserIdcard.facetimePhotoUrl" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.orderUserIdcard.facetimePhotoUrl})">
                <img :src="data.orderUserIdcard.facetimePhotoUrl" >
              </div>
              <div v-else class="xuan-2-2-2-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no3')}}:</span>
            <template >
              <div v-if="data.orderUserWork.incomePicUrl" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.orderUserWork.incomePicUrl})">
                <img :src="data.orderUserWork.incomePicUrl" >
              </div>
              <div v-else class="xuan-2-2-2-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
          </div>
        </li>
        <li  v-if="active1==2">
          <div class="oneLineHasFour">
            <p>{{$t('new.no48')}}: 
              <span>{{data.orderExtra.appName | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('new.no49')}}: </span>
              <span>{{data.orderExtra.appPackage | dataIsTrue}}</span> 
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('operationDetail.no2')}}:</span>
              <span>{{data.orderInfo.id | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no30')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.loanAmount)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p><span>{{$t('public.no31')}}:</span>
              <span>{{data.orderInfo.productPeriod | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('operationDetail.no6')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderLending.amount)}}{{$store.state.common.vi_currency}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('proManage.feeRate')}}:</span>
              <span>{{$store.getters.twoPoint(data.orderInfo.feeRate)}}%</span>
            </p>
            <p><span>{{$t('loanMoneyDetail.feeAmount')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.feeAmount)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p><span>{{$t('operationDetail.no4')}}:</span>
              <span>{{$store.getters.twoPoint(data.orderInfo.overdueInterestRate)}}%</span>
            </p>
            <p><span>{{$t('operationDetail.no5')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
            </p>
          </div> 
          <div class="oneLineHasFour">
            <p><span>{{$t('public.no27')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.returnMoney)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p><span>{{$t('public.no65')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.refundAmount)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p><span>{{$t('public.CreateDate')}}:</span>
              <span>{{data.orderInfo.strCreateTime | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no66')}}</span>
              <span>{{data.orderInfo.strLastRefundTime | dataIsTrue}}</span>
            </p>
          </div> 
          <div class="oneLineHasFour">
            <p><span>{{$t('operationDetail.no3')}}:</span>
              <span >{{$store.getters.twoPoint(data.orderInfo.dayInterestRate)}}%</span>
            </p>
            <p><span>{{$t('loanMoneyDetail.currentInterest')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.currentInterest)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p><span>{{$t('public.no28')}}:</span>
              <span>{{data.orderInfo.overdueDays | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no86')}}:</span> 
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.overdueServiceFee)}}{{$store.state.common.vi_currency}}</span>
            </p>
          </div> 
          <div class="oneLineHasFour">
            <p><span>{{$t('public.no58')}}:</span>
              <span>{{data.orderInfo.strLoanTime | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.CreateTime')}}: </span>
              <span >{{data.orderInfo.strMustRefundTime | dataIsTrue}}</span>
            </p>
          </div> 
          
        </li>
      </ul>
    </div>

    <!-- ------------ 催收记录、紧急联系人、通话联系人开始------------------------ -->
    <div class="tabs">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr2" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <!-- ------------ 催收记录开始------------------------ -->
        <li  v-if="active2==1">
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
                  
                  <span :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{$t('public.name')}}:{{item.contactName}}</span>
                  <span :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}" style="margin:0 10px;" >{{$t('operationDetail.no13')}}:{{item.contactPhone}}</span>
                  <span :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{$t('operationDetail.no14')}}:{{item.contactCnt?item.contactCnt:0}} {{$t('operationDetail.no15')}}</span>
                  <span :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}" style="margin:0 10px;" >{{item.keepTime?item.keepTime:0}}s</span>
                  <!-- <span :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{item.operator?item.operator:''}}</span> -->
                  <template v-if="item.isEffective&&$store.state.common.lang==='PHL'">
                    <span class="mg5" :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{item.isEffective=='-1'?0:1}}</span>
                  </template>
                </el-radio>
              </el-radio-group>
            </template>
            <div v-else style="padding:0 30px">
              {{$t('public.no23')}}
            </div>
          </div>
          <template v-if="$store.state.common.lang==='vi'">
            <div class="paixu">
              <span></span><p>{{'FaceBook'+$t('yuenan.no35')}}</p>
            </div>
            <div class="xuan-2-1-2">
              <div class="xuan-2-1-2-1" v-if="data.orderFacebook.friendOneFblink">
                <p>{{$t('yuenan.no34')}}: <span>{{data.orderFacebook.friendOneName | dataIsTrue}}</span> </p>
                <p>{{$t('public.no18')}}: <span>{{data.orderFacebook.friendOnePhone | dataIsTrue}}</span> </p>
                <p>{{$t('yuenan.no33')}}: <span>{{data.orderFacebook.friendOneFblink | dataIsTrue}}</span> </p>
              </div>
              <div v-else class="xuan-2-1-2-1">
                <p>{{$t('public.no23')}}</p>
              </div>
              <div class="xuan-2-1-2-1" v-if="data.orderFacebook.friendTwoFblink">
                <p>{{$t('yuenan.no34')}}: <span>{{data.orderFacebook.friendTwoName | dataIsTrue}}</span> </p>
                <p>{{$t('public.no18')}}: <span>{{data.orderFacebook.friendTwoPhone | dataIsTrue}}</span> </p>
                <p>{{$t('yuenan.no33')}}: <span>{{data.orderFacebook.friendTwoFblink | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-2-1" v-if="data.orderFacebook.friendThreeFblink">
                <p>{{$t('yuenan.no34')}}: <span>{{data.orderFacebook.friendThreeName | dataIsTrue}}</span> </p>
                <p>{{$t('public.no18')}}: <span>{{data.orderFacebook.friendThreePhone | dataIsTrue}}</span> </p>
                <p>{{$t('yuenan.no33')}}: <span>{{data.orderFacebook.friendThreeFblink | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-2-1" v-if="data.orderFacebook.friendFourFblink">
                <p>{{$t('yuenan.no34')}}: <span>{{data.orderFacebook.friendFourName | dataIsTrue}}</span> </p>
                <p>{{$t('public.no18')}}: <span>{{data.orderFacebook.friendFourPhone | dataIsTrue}}</span> </p>
                <p>{{$t('yuenan.no33')}}: <span>{{data.orderFacebook.friendFourFblink | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-2-1" v-if="data.orderFacebook.friendFiveFblink">
                <p>{{$t('yuenan.no34')}}: <span>{{data.orderFacebook.friendFiveName | dataIsTrue}}</span> </p>
                <p>{{$t('public.no18')}}: <span>{{data.orderFacebook.friendFivePhone | dataIsTrue}}</span> </p>
                <p>{{$t('yuenan.no33')}}: <span>{{data.orderFacebook.friendFiveFblink | dataIsTrue}}</span> </p>
              </div>
            </div>
          </template>
          
        </li>
        <!-- ------------ 通话联系人开始------------------------ -->
        <li  v-if="active2==3">
          <div class="xuan-2-3-1">
            <address-list :get-address="getLinkMan" :order-no="orderNo"></address-list>
          </div>
        </li>
        <!-- ------------ 呼叫结果开始 ------------------------ -->
        <li  v-if="active2==5&&$store.state.common.lang!=='PHL'">
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
  name: 'Detail',
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
        orderFacebook:'',
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
        // {id: 4, title: this.$t('public.no12')},
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
          this.data.orderFacebook = res.data.data.orderFacebook
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
    this.sessionid = sessionStorage.getItem('sessionid');
    this.orderNo = this.$route.query.orderNo;
    this.block = this.$route.query.block;
    this.detail();
    
  }
}
</script>
<style scoped lang="scss">

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

.xuan-2-1-2{
  width: 100%;
  .xuan-2-1-2-1{
    margin: 20px 20px;
    display: flex;
    align-items: center;
    @include p-span;
    p{
      padding-right: 50px;
      font-size: 14px;
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

.el-radio span{
  user-select: text;
}

</style>
