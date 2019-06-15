<template>
  <div class="public_main" v-if="data">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('userList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/userlist'}">{{$t('userList.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('userDetail.crumbs')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- -------------用户详情------------------------ -->
    <div class="detail">
      <ul class="ul-one">
        <li>
          <span>{{$t('public.userId')}}:</span>
          <span>{{data.id | dataIsTrue}}</span>
        </li>
        <li>
          <span>{{$t('public.registerDate')}}:</span>
          <span>{{data.strRegTime | dataIsTrue}}</span>
        </li>
        <li>
          <span>{{$t('public.userPhone')}}:</span>
          <span>{{data.phone | dataIsTrue}}</span>
        </li>
        <li>
          <span>{{$t('public.registerClient')}}:</span>
          <span>{{$t($store.getters.clientStatus(data.regDevice))}}</span>
        </li>
        <li>
          <span>{{$t('new.no48')}}:</span>
          <span>{{data.appName | dataIsTrue}}</span>
        </li>
        <li>
          <span>{{$t('new.no49')}}:</span>
          <span>{{data.appPackage | dataIsTrue}}</span>
        </li>
        <li>
          <span>{{$t('public.registerChannel')}}:</span>
          <span>{{data.regChannel | dataIsTrue}}</span>
        </li>
      </ul>
    </div>

    <div class="tabs">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active==value.id}" @click="active=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <li v-if="active==1">
          <div class="oneLineHasOne">
            <p><span>{{$t('public.no1')}}: </span><span>{{userIdcard.name | dataIsTrue}}</span> </p>
          </div>
          <div class="oneLineHasOne">
            <p><span>{{$t('fei.idType')}}: </span><span>{{userIdcard.strIdType | dataIsTrue}}</span> </p>
          </div>
          <div class="oneLineHasOne">
            <p><span>{{$t('fei.id')}}: </span><span>{{userIdcard.idCard | dataIsTrue}}</span> </p>
          </div>
          <div class="idimgbox">
            <template>
              <div v-if="userIdcard.idcardPhotoUrl" class="idimg pic" @click="openBox({imgUrl:userIdcard.idcardPhotoUrl})">
                <img :src="userIdcard.idcardPhotoUrl" :alt="$t('pic.no1')" :title="$t('pic.no1')">
              </div>
              <div v-else class="idimg pic">
                <img src="../../../assets/img/null.png" :title="$t('pic.no1')">
              </div>
            </template>
            <template>
              <div v-if="userIdcard.facetimePhotoUrl" class="idimg pic" @click="openBox({imgUrl:userIdcard.facetimePhotoUrl})">
                <img :src="userIdcard.facetimePhotoUrl" :alt="$t('pic.no2')" :title="$t('pic.no2')">
              </div>
              <div v-else class="idimg pic">
                <img src="../../../assets/img/null.png" :title="$t('pic.no2')">
              </div>
            </template>
          </div>
        </li>
        <li v-if="active==2">
          <div class="oneLineHasThree">
            <p><span>{{$t('public.no1')}}:</span> 
            <span v-if="userSelf.name">{{userSelf.name+' '+userSelf.middleName+' '+userSelf.surname}}</span>
            <span v-else>-</span>
            </p>

            <p><span>{{$t('public.sex')}}:</span> <span>{{$t($store.getters.sexStatus(userSelf.sex))}}</span></p>

            <p><span>{{$t('public.no3')}}:</span> <span>{{$t($store.getters.marriage(userSelf.marriage))}}</span> </p>
          </div>
          <div class="oneLineHasThree">

            <p><span>{{$t('fei.idType')}}:</span> <span>{{userIdcard.strIdType | dataIsTrue}}</span> </p>

            <p><span>{{$t('fei.id')}}:</span> <span>{{userIdcard.idCard | dataIsTrue}}</span> </p>

            <p><span>{{$t('public.no5')}}:</span> <span>{{$t($store.getters.education_phl(userSelf.degree))}}</span>
            </p>

          </div>
          <div class="oneLineHasThree">
            <p><span>{{$t('public.birthday')}}:</span> <span>{{userSelf.birthday | dataIsTrue}}</span> </p>
            <p><span>{{$t('yuenan.no2')}}:</span>
              <span>{{userSelf.liveProvinceName | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('yuenan.no17')}}:</span>
              <span>{{userSelf.liveCityName | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasThree">
            <p>
              <span>Facebook:</span>
              <span>{{userSelf.facebook | dataIsTrue}}</span>
            </p>
            <p>
              <span>Email:</span>
              <span>{{userSelf.email | dataIsTrue}}</span>
            </p>
          </div>

          <div class="oneLineHasOne">
            <p><span>{{$t('public.no7')}}:</span> <span>{{userSelf.liveAddress | dataIsTrue}}</span> </p>
          </div>

        </li>
        <li class="flex" v-if="active==3">
          <div class="oneType-1">
            <div class="oneLineHasThree">
              <p><span>{{$t('public.no9')}}:</span> <span>{{userWork.company | dataIsTrue}}</span> </p>

              <p><span>{{$t('public.no10')}}:</span> <span>{{userWork.strEntryTime | dataIsTrue}}</span> </p>

              <p><span>{{$t('public.no13')}}:</span> <span>{{$store.state.common.id_currency+$store.getters.moneySplit(userWork.monthIncome)+$store.state.common.vi_currency}}</span>
              </p>

            </div>
            <div class="oneLineHasThree">
              <p><span>{{$t('yuenan.no5')}}:</span> <span>{{userWork.industryName | dataIsTrue}}</span> </p>

              <p><span>{{$t('public.no12')}}:</span> <span>{{userWork.companyPhone | dataIsTrue}}</span> </p>

              <p><span>{{$t('fei.inComeDate')}}:</span> <span>{{userWork.payday | dataIsTrue}}</span> </p>
            </div>
            <div class="oneLineHasThree">
              <p><span>{{$t('yuenan.no6')}}:</span> <span>{{userWork.companyProvinceName | dataIsTrue}}</span> </p>

              <p><span>{{$t('yuenan.no15')}}:</span> <span>{{userWork.companyCityName | dataIsTrue}}</span> </p>
            </div>
            <div class="oneLineHasOne">
              <p><span>{{$t('public.no15')}}:</span> <span>{{userWork.companyAddress | dataIsTrue}}</span> </p>
            </div>
          </div>
          <div class="oneType-2">
            <template>
              <div v-if="userWork.incomePicUrl" class="gongziimg pic" @click="openBox({imgUrl:userWork.incomePicUrl})">
                <img :src="userWork.incomePicUrl" :alt="$t('pic.no3')" :title="$t('pic.no3')">
              </div>
              <div v-else class="gongziimg pic">
                <img src="../../../assets/img/null.png" :title="$t('pic.no3')">
              </div>
            </template>
          </div>
        </li>
        <li class="xuan-2-4" v-if="active==4">
          <div class="xuan-2-4-1">
            <p class="xuan-2-4-1-1"><span></span>{{$t('public.no16')}}1</p>
            <div class="xuan-2-4-1-2">

              <p>{{$t('public.no17')}}: <span>{{userUrgentContact.contactOneRelationName | dataIsTrue}}</span> </p>

              <p>{{$t('public.name')}}: <span>{{userUrgentContact.contactOneName | dataIsTrue}}</span> </p>

              <p>{{$t('public.no18')}}: <span>{{userUrgentContact.contactOnePhone | dataIsTrue}}</span> </p>

            </div>
          </div>
          <div class="xuan-2-4-1">
            <p class="xuan-2-4-1-1"><span></span>{{$t('public.no16')}}2</p>
            <div class="xuan-2-4-1-2">

              <p>{{$t('public.no17')}}: <span>{{userUrgentContact.contactTwoRelationName | dataIsTrue}}</span> </p>


              <p>{{$t('public.name')}}: <span>{{userUrgentContact.contactTwoName | dataIsTrue}}</span> </p>

              <p>{{$t('public.no18')}}: <span>{{userUrgentContact.contactTwoPhone | dataIsTrue}}</span> </p>

            </div>
          </div>
          <div class="xuan-2-4-1">
            <p class="xuan-2-4-1-1"><span></span>{{$t('public.no16')}}3</p>
            <div class="xuan-2-4-1-2">
              <template>
                <p>{{$t('public.no17')}}: <span>{{userUrgentContact.contactThreeRelationName | dataIsTrue}}</span> </p>
              </template>
              <template>
                <p>{{$t('public.name')}}: <span>{{userUrgentContact.contactThreeName | dataIsTrue}}</span> </p>
              </template>
              <template>
                <p>{{$t('public.no18')}}: <span>{{userUrgentContact.contactThreePhone | dataIsTrue}}</span> </p>
              </template>
            </div>
          </div>
        </li>
        <li v-if="active==6">
          <template>
            <el-table :data="tableData" stripe size="small">
              <el-table-column align="center" prop="orderNo" :label="$t('public.orderNo')">
              </el-table-column>
              <el-table-column align="center" prop="id" :label="$t('public.orderId')">
              </el-table-column>
              <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')">
              </el-table-column>
              <el-table-column align="center" prop="loanAmount" :label="$t('public.no24')">
                <template slot-scope="scope">
                  <span>{{$store.state.common.id_currency+$store.getters.moneySplit(scope.row.loanAmount)+$store.state.common.vi_currency}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="productPeriod" :label="$t('public.no25')+'('+$t('public.no26')+')'">
              </el-table-column>
              <el-table-column align="center" prop="instalment" :label="$t('fei.no17')">
              </el-table-column>
              <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')">
                <template slot-scope="scope">
                  <span>{{$store.state.common.id_currency+$store.getters.moneySplit(scope.row.returnMoney)+$store.state.common.vi_currency}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.backMoneyDate')" width="86">
              </el-table-column>
              <el-table-column align="center" prop="isOverdue" :label="$t('public.isOverdue')">
                <template slot-scope="scope">
                  <span>{{$t($store.getters.overdueState(scope.row.isOverdue))}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')">
              </el-table-column>
              <el-table-column align="center" prop="status" :label="$t('public.orderStatus')">
                <template slot-scope="scope">
                  <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="operation" :label="$t('public.operation')">
                <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_HIS_DETAIL')">
                  <span @click="selLoan(scope.row.orderNo)">{{$t('public.no29')}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </li>
        <li style="padding:0;" v-if="active==7">
          <coupon-list :user-id="userId"></coupon-list>
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
  import appLightbox from '../../../components/component/lightbox' // 图片点击放大组件
  import couponList from '../../../components/component/coupon' // 优惠券列表

  export default {
    name: 'userManage',
    components: {
      appLightbox,
      couponList
    },
    data() {
      return {
        sessionid: '',
        userId: '', // 上个页面传进来的用户ID
        // arr1:['身份验证信息','个人信息认证','工作单位信息','紧急联系人信息','银行卡信息','历史借款记录'],// 选项卡内容
        active: 1, // 当前选中项选项卡下标
        data: [], // 用户基本信息
        userIdcard: [], // 身份验证信息
        userSelf: [], // 个人信息认证
        userWork: [], // 工作单位信息
        userUrgentContact: [], // 紧急联系人信息
        userBank: [], // 银行卡信息
        tableData: [], // 历史借款记录
        currentObj: '', // 当前点击选中的图片信息
        lightBoxToggle: false // 图片放大显示层开关
      }
    },
    computed: { // 选项卡国际化
      arr1() {
        let arr = []
        if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_IDENTITY')) {
          arr.push({
            id: 1,
            title: this.$t('tab.no1')
          })
        }
        if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_PERSONAL')) {
          arr.push({
            id: 2,
            title: this.$t('tab.no2')
          })
        }
        if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_JOB')) {
          arr.push({
            id: 3,
            title: this.$t('tab.no3')
          })
        }
        if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_LINK')) {
          arr.push({
            id: 4,
            title: this.$t('tab.no4')
          })
        }

        if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_HIS')) {
          arr.push({
            id: 6,
            title: this.$t('tab.no6')
          })
        }
        arr.push({
          id: 7,
          title: this.$t('tab.no7')
        })
        return arr
      }
    },
    methods: {
      detail() { // 获取用户详细数据列表
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.consumer_detail,
            'sessionid': this.sessionid
          },
          'userId': this.userId
        }
        this.$axios.post('', option).then(res => {
          if (res.data.header.code == 0) {
            this.data = res.data.data.userBase
            this.userIdcard = res.data.data.userIdcard
            this.userSelf = res.data.data.userSelf
            this.userWork = res.data.data.userWork
            this.userUrgentContact = res.data.data.userUrgentContact
            this.userBank = res.data.data.userBank
            this.tableData = res.data.data.orderList
          }
        })
      },
      openBox: function (obj) { // 图片放大显示
        this.currentObj = obj
        this.lightBoxToggle = !this.lightBoxToggle
      },
      closeBox: function () { // 图片放大关闭
        this.lightBoxToggle = false
      },
      selLoan(orderNo) { // 借款查询
        this.$router.push({
          path: '/loanmoneydetail?',
          query: {
            orderNo,
            userId: this.userId
          }
        })
      },
      back() { // 页面无数据时，点击返回
        window.history.go(-1)
      }
    },
    mounted() {
      this.sessionid = sessionStorage.getItem('sessionid')
      this.userId = this.$route.query.userId
      this.detail()
    }
  }
</script>
<style scoped lang="scss">
  .detail {
    width: 100%;
    background-color: #fff;
    display: flex;
    padding: 20px 0;
    margin-bottom: 30px;

    .ul-one {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-content: space-between;
      flex-wrap: wrap;

      li {
        width: 25%;
        display: flex;
        align-items: center;
        font-size: 16px;
        margin: 10px 0;

        span:nth-child(1) {
          color: $color3;
          white-space: nowrap;
          font-weight: 600;
        }

        span:nth-child(2) {
          color: $color4;
          margin: 0 12px;
        }
      }
    }
  }

  .xuan-2-4 {
    .xuan-2-4-1 {
      margin-bottom: 24px;
      border-bottom: 1px solid #ddd;

      .xuan-2-4-1-1 {
        color: #333;
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;

        span {
          display: block;
          width: 4px;
          height: 40px;
          background-color: #1D7BFF;
          border-radius: 5px;
          margin: 0px 10px;

        }
      }

      .xuan-2-4-1-2 {
        display: flex;

        p {
          margin: 10px 30px 10px 10px;
          color: $color1;
          font-size: 16px;

          span {
            color: $color2;
            font-size: 16px;
            margin: 0 10px;
            font-weight: bold;
          }
        }
      }
    }


  }


  .bigimg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    @include flex-cen;
    background-color: rgba(182, 189, 205, 0.6);
  }

  .back {
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    background-color: rgba(246, 249, 252, 1);
    position: relative;
    @include flex-cen;

    p {
      span {
        font-size: 18px;
        padding: 0 5px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }

  .idimgbox {
    width: 410px;
    height: auto;
    display: flex;
    margin: 20px 0;
    justify-content: space-between;

    .idimg {
      width: 200px;
      height: auto;
    }
  }
</style>