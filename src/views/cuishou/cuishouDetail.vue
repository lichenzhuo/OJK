<template>
  <div class="public_main" v-if="data">
    <div class="crumbs" v-if="type==3">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('operationList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/myCollectionOrderList'}">{{$t('operationList.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.orderDetail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-if="from==4">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('operationList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/myOverDueInstalment'}">{{$t('add.no6')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.orderDetail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-if="from==1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('auditManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/otherBackAudit'}">{{$t('yn.no36')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.orderDetail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-else-if="from==2">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('auditManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/badMannersAudit'}">{{$t('yn.no37')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.orderDetail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-if="from==5">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('auditManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/inTheRushOrders'}">{{$t('loanAfterManage.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.orderDetail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-else-if="from==6">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('auditManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/overDueInstalment'}">{{$t('add.no3')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.orderDetail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------ 用户信息、借款信息开始------------------------ -->
    <div class="tabs mb20">
      <ul class="tabs_title">
        <li
          v-for="(value,index) in arr1"
          :key="index"
          :class="{active:active1==value.id}"
          @click="active1=value.id"
        >
          <template v-if="$store.state.common.lang==='id'">
            <el-badge v-if="value.black==-1" value="black" class="item">
              <span>{{value.title}}</span>
            </el-badge>
            <span v-else>{{value.title}}</span>
          </template>
          <template v-else>
            <span>{{value.title}}</span>
          </template>
        </li>
      </ul>
      <ul class="tabs_main">
        <li v-if="active1==1">
          <div class="oneLineHasFour">
            <p>
              <span>{{$t('new.no48')}}:</span>
              <span>{{data.userBase.appName | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('new.no49')}}:</span>
              <span>{{data.userBase.appPackage | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('new.no55')}}:</span>
              <span>{{data.orderUserSelf.whatsAPP | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p>
              <span>{{$t('public.userId')}}:</span>
              <span>{{data.collectionInfo.userId | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.no1')}}:</span>
              <span>{{data.collectionInfo.userName | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.no2')}}:</span>
              <span>{{data.collectionInfo.idCard | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.birthday')}}:</span>
              <span>{{data.orderUserSelf.birthday | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour" v-if="$store.state.common.lang==='vi'">
            <p>
              <span>{{$t('public.no18')}}:</span>
              <span>{{data.collectionInfo.userPhone}}</span>
            </p>
            <p>
              <span>{{$t('yuenan.no23')}}:</span>
              <span>{{$store.getters.vn_phone(data.collectionInfo.userPhone)}}</span>
            </p>
            <p>
              <span>{{$t('yuenan.no25')}}:</span>
              <span>{{data.orderUserSelf.alternativePhone | dataIsTrue}}</span>
            </p>
            <p>
              <span>E-mail:</span>
              <span>{{data.orderUserBankInfo.email | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p>
              <span>{{$t('new.no56')}}:</span>
              <span>{{$store.getters.getAge(data.orderUserSelf.birthday)}}</span>
            </p>
            <p>
              <span>{{$t('public.sex')}}:</span>
              <span>{{$t($store.getters.sexStatus(data.orderUserSelf.sex))}}</span>
            </p>
            <p>
              <span>{{$t('public.no3')}}:</span>
              <span>{{$t($store.getters.marriage(data.orderUserSelf.marriage))}}</span>
            </p>
            <p>
              <span>{{$t('public.no4')}}:</span>
              <span>{{$t($store.getters.birthState(data.orderUserSelf.bear))}}</span>
            </p>
          </div>
          <div class="oneLineHasFour" v-if="$store.state.common.lang=='id'">
            <p v-if="$store.state.common.lang==='id'">
              <span>{{$t('yn.no27')}}:</span>
              <span>{{data.orderUserWork.payDate | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.no12')}}:</span>
              <span>{{data.orderUserWork.companyPhone | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.no9')}}:</span>
              <span>{{data.orderUserWork.company | dataIsTrue}}</span>
            </p>
            <p>
              <span>Email:</span>
              <span>{{data.orderUserSelf.email | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasTwo">
            <p>
              <span>{{$t('operationDetail.no1')}}:</span>
              <span>{{data.orderUserIdcard.ocrAddress | dataIsTrue}}</span>
            </p>
            <p v-if="$store.state.common.lang==='vi'">
              <span>faceBook:</span>
              <span
                @click="openWindow(data.orderFacebook.fblink)"
                class="td-ul"
              >{{data.orderFacebook.fblink | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasOne">
            <p>
              <span>{{$t('public.no6')}}:</span>
              <span>{{data.orderUserSelf.liveAddress | dataIsTrue}}</span>
            </p>
          </div>
          <div class="loansTypeImg">
            <span>{{$t('pic.no1')}}:</span>
            <template>
              <div
                v-if="data.orderUserIdcard.idcardPhotoUrl"
                class="loansTypeImg-1 pic"
                @click="openBox({imgUrl:data.orderUserIdcard.idcardPhotoUrl})"
              >
                <img :src="data.orderUserIdcard.idcardPhotoUrl" />
              </div>
              <div v-else class="loansTypeImg-1 pic">
                <img src="../../assets/img/null.png" />
              </div>
            </template>
            <span>{{$t('pic.no2')}}:</span>
            <template>
              <div
                v-if="data.orderUserIdcard.facetimePhotoUrl"
                class="loansTypeImg-1 pic"
                @click="openBox({imgUrl:data.orderUserIdcard.facetimePhotoUrl})"
              >
                <img :src="data.orderUserIdcard.facetimePhotoUrl" />
              </div>
              <div v-else class="loansTypeImg-1 pic">
                <img src="../../assets/img/null.png" />
              </div>
            </template>
            <span>{{$t('pic.no3')}}:</span>
            <template>
              <div
                v-if="data.orderUserWork.incomePicUrl"
                class="loansTypeImg-1 pic"
                @click="openBox({imgUrl:data.orderUserWork.incomePicUrl})"
              >
                <img :src="data.orderUserWork.incomePicUrl" />
              </div>
              <div v-else class="loansTypeImg-1 pic">
                <img src="../../assets/img/null.png" />
              </div>
            </template>
          </div>
        </li>
        <li v-if="active1==2">
          <div class="oneLineHasFour">
            <p>
              {{$t('new.no48')}}:
              <span>{{data.orderExtra.appName | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('new.no49')}}:</span>
              <span>{{data.orderExtra.appPackage | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p>
              <span>{{$t('operationDetail.no2')}}:</span>
              <span>{{data.orderInfo.id | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.no30')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.loanAmount)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p>
              <span>{{$t('public.no31')}}:</span>
              <span>{{data.orderInfo.productPeriod | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('operationDetail.no6')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderLending.amount)}}{{$store.state.common.vi_currency}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p>
              <span>{{$t('proManage.feeRate')}}:</span>
              <span>{{$store.getters.twoPoint(data.orderInfo.feeRate)}}</span>
            </p>
            <p>
              <span>{{$t('loanMoneyDetail.feeAmount')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.feeAmount)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p>
              <span>{{$t('operationDetail.no4')}}:</span>
              <span>{{$store.getters.twoPoint(data.orderInfo.overdueInterestRate)}}</span>
            </p>
            <p>
              <span>{{$t('operationDetail.no5')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p>
              <span>{{$t('public.no27')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.returnMoney)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p>
              <span>{{$t('public.no65')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.refundAmount)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p>
              <span>{{$t('public.CreateDate')}}:</span>
              <span>{{data.orderInfo.strCreateTime | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.no66')}}</span>
              <span>{{data.orderInfo.strLastRefundTime | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p>
              <span>{{$t('operationDetail.no3')}}:</span>
              <span>{{$store.getters.twoPoint(data.orderInfo.dayInterestRate)}}</span>
            </p>
            <p>
              <span>{{$t('loanMoneyDetail.currentInterest')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.currentInterest)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p>
              <span>{{$t('public.no28')}}:</span>
              <span>{{data.orderInfo.overdueDays | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.no86')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.overdueServiceFee)}}{{$store.state.common.vi_currency}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p>
              <span>{{$t('public.no58')}}:</span>
              <span>{{data.orderInfo.strLoanTime | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.CreateTime')}}:</span>
              <span>{{data.orderInfo.strMustRefundTime | dataIsTrue}}</span>
            </p>
            <p v-if="$store.state.common.lang==='id'">
              <span>{{$t('yn.no28')}}:</span>
              <span>{{$t($store.getters.loanUse_status(data.orderExtra.loanUse))}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p>
              <span>还款计划:</span>
              <span @click="showPlan" style="font-size:18px;color:red;cursor:pointer;">查看</span>
            </p>
            <p>
              <span>剩余金额:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.amountDue)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <!-- <p v-if="$store.state.common.lang==='id'">
              <span>{{$t('yn.no28')}}:</span>
            </p> -->
          </div>
        </li>
      </ul>
    </div>




    <template v-if="$store.state.common.lang==='vi'&&data.orderInfo.orderLoanType!==1">
      <div class="paixu pb10">
        <span></span>
        <p>{{$t('websiteLoans.no9')}}:</p>
      </div>
      <div class="loansTypeImg">
        <div
          v-if="data.webInfo.onePicUrlStr"
          class="loansTypeImg-1 pic"
          @click="openBox({imgUrl:data.webInfo.onePicUrlStr})"
        >
          <img :src="data.webInfo.onePicUrlStr" :alt="$t('websiteLoans.no9')" />
        </div>
        <div
          v-if="data.webInfo.twoPicUrlStr"
          class="loansTypeImg-1 pic"
          @click="openBox({imgUrl:data.webInfo.twoPicUrlStr})"
        >
          <img :src="data.webInfo.twoPicUrlStr" :alt="$t('websiteLoans.no9')" />
        </div>
        <div
          v-if="data.webInfo.threePicUrlStr"
          class="loansTypeImg-1 pic"
          @click="openBox({imgUrl:data.webInfo.threePicUrlStr})"
        >
          <img :src="data.webInfo.threePicUrlStr" :alt="$t('websiteLoans.no9')" />
        </div>
      </div>
    </template>

    <!-- ------------  信审记录 客服记录  ------------------------ -->
    <div class="tabs mb20">
      <ul class="tabs_title">
        <li
          v-for="(value,index) in arr4"
          :key="index"
          :class="{active:active4==value.id}"
          @click="active4=value.id"
        >
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <li v-if="active4==1">
          <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="10%">{{$t('new.no59')}}</th>
              <th width="10%">{{$t('public.no39')}}</th>
              <th width="10%">{{$t('public.userPhone')}}</th>
              <th width="10%">{{$t('public.no40')}}</th>
              <th width="35%">{{$t('public.no37')}}</th>
              <th width="25%">{{$t('loanMoneyDetail.opeTime')}}</th>
            </tr>
            <template v-if="phoneAuditLogTwo!=''">
              <tr v-for="value in phoneAuditLogTwo" :key="value.id">
                <td>{{value.approveStage==1?$t('myAuditList.no5'):value.approveStage==2?$t('myAuditList.no9'):''}}</td>
                <td>{{value.userName | dataIsTrue}}</td>
                <td>{{value.phone | dataIsTrue}}</td>
                <td>{{$t($store.getters.tel_through(value.connectStatus))}}</td>
                <td>{{value.remark | dataIsTrue}}</td>
                <td>{{value.strFirstApproveTime | dataIsTrue}}</td>
              </tr>
            </template>
            <template v-else>
              <div
                style="textAlign:center;width:1000%;height:40px;lineHeight:40px"
              >{{$t('public.no23')}}</div>
            </template>
          </table>
        </li>
        <li v-if="active4==2">
          <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="10%">{{$t('add.no12')}}</th>
              <th width="10%">{{$t('public.no39')}}</th>
              <th width="10%">{{$t('public.userPhone')}}</th>
              <th width="10%">{{$t('public.no40')}}</th>
              <th width="35%">{{$t('public.no37')}}</th>
              <th width="25%">{{$t('loanMoneyDetail.opeTime')}}</th>
            </tr>
            <template v-if="data.serviceRecordList!=''">
              <tr v-for="value in data.serviceRecordList" :key="value.id">
                <td>{{$t('add.no42')}}</td>
                <td>{{value.userName | dataIsTrue}}</td>
                <td>{{value.userPhone | dataIsTrue}}</td>
                <td>{{$t($store.getters.myoveNoticeStatus(value.status))}}</td>
                <td>{{value.remark | dataIsTrue}}</td>
                <td>{{value.strCreateTime | dataIsTrue}}</td>
              </tr>
            </template>
            <template v-else>
              <div
                style="textAlign:center;width:1000%;height:40px;lineHeight:40px"
              >{{$t('public.no23')}}</div>
            </template>
          </table>
        </li>
      </ul>
    </div>

    <!-- <div class="foot"></div> -->

    <!-- ------------ 催收记录、紧急联系人、通话联系人开始------------------------ -->
    <div class="tabs">
      <ul class="tabs_title">
        <li
          v-for="(value,index) in arr2"
          :key="index"
          :class="{active:active2==value.id}"
          @click="active2=value.id"
        >
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <!-- ------------ 催收记录开始------------------------ -->
        <li v-if="active2==1">
          <template v-if="orderNo">
            <cuishou-list :order-no="orderNo"></cuishou-list>
          </template>
        </li>
        <!-- ------------ 紧急联系人开始------------------------ -->
        <li class="xuan-2-9" v-if="active2==2">
          <div class="xuan-2-9-1">
            <template
              v-if="orderUrgentContact!==null&&orderUrgentContact!==undefined&&orderUrgentContact!=''&&$store.state.common.lang==='id'"
            >
              <el-radio-group v-model="emeContact" class="radio1" v-loading="loading">
                <!-- :disabled="buttonCanClick"  按钮禁止点击选项 -->
                <el-button type="primary" @click="checkKong" size="small">{{$t('check.no1')}}</el-button>
                <el-radio
                  v-for="(item,index) in orderUrgentContact"
                  :key="index"
                  :label="item.contactName+','+item.contactRelation+','+item.contactPhone"
                >
                  <span class="publicName">{{$t('public.name')}}：{{item.contactName}}</span>
                  <span class="publicPhone">{{$t('operationDetail.no13')}}:{{item.contactPhone}}</span>
                  <span class="publicButton">
                    <!-- :disabled="item.overCheck"    按钮禁止点击选项     -->
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==1&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="info"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no2')}}</el-button>
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==2&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="success"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no3')}}</el-button>
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==3&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="success"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no4')}}</el-button>
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==4&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="success"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no5')}}</el-button>
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==5&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="success"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no6')}}</el-button>
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==6&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="warning"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no7')}}</el-button>
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==7&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="warning"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no8')}}</el-button>
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==8&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="danger"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no9')}}</el-button>
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==9&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="danger"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no10')}}</el-button>
                    <!-- 未知的状态码是10，不知道有没有其他的 -->
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==10&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="danger"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no11')}}</el-button>
                    <!-- 状态0是未知 -->
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.status==0&&item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="danger"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no11')}}</el-button>
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="!item.success&&item.haveData"
                      @click="clickCheck(item)"
                      type="danger"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no11')}}</el-button>
                    <!-- false应该是未知，空数组是检测失败 -->
                    <el-button
                      :loading="item.buttonLoading"
                      v-if="item.haveData==undefined||item.haveData==''||item.haveData==null"
                      @click="clickCheck(item)"
                      type="danger"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no16')}}</el-button>
                    <!-- 返回数据长度对不上 -->
                    <!-- !==null&&orderUrgentContact!==undefined&&orderUrgentContact!='' -->
                    <!-- <el-button
                      :loading="item.buttonLoading"
                      v-if="item.haveData==undefined"
                      @click="clickCheck(item)"
                      type="danger"
                      size="mini"
                      style="width:110px"
                    >{{$t('check.no16')}}</el-button>-->
                  </span>
                  <span
                    class="mg5"
                  >{{$t('operationDetail.no14')}}:{{item.contactCnt?item.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
                  <span class="mg5">{{$t('new.no57')}}:{{item.keepTime?item.keepTime:0}}s</span>
                  <span
                    v-if="!item.success&&item.haveData"
                    class="mg5"
                    style="color:#F56C6C"
                  >（{{$t('check.no12')}}）</span>
                  <span
                    v-if="item.haveData==undefined||item.haveData==''||item.haveData==null"
                    class="mg5"
                    style="color:#F56C6C"
                  >（{{$t('check.no16')}}）</span>
                </el-radio>
              </el-radio-group>
            </template>
            <template v-else>
              <template
                v-if="orderUrgentContact!==null&&orderUrgentContact!==undefined&&orderUrgentContact!=''"
              >
                <el-radio-group v-model="emeContact" class="radio1">
                  <el-radio
                    v-for="(item,index) in orderUrgentContact"
                    :key="index"
                    :label="item.contactName+','+item.contactRelation+','+item.contactPhone"
                  >
                    <span>{{$t('public.name')}}：{{item.contactName}}</span>
                    <span
                      style="margin:0 20px;"
                    >{{$t('operationDetail.no13')}}:{{item.contactPhone}}</span>
                    <span
                      class="mg5"
                    >{{$t('operationDetail.no14')}}:{{item.contactCnt?item.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
                    <span class="mg5">{{$t('new.no57')}}:{{item.keepTime?item.keepTime:0}}s</span>
                  </el-radio>
                </el-radio-group>
              </template>
            </template>
            <!-- <div v-else style="padding:0 30px">{{$t('public.no23')}}</div> -->
          </div>
          <template v-if="$store.state.common.lang==='vi'">
            <div class="paixu">
              <span></span>
              <p>{{'FaceBook'+$t('yuenan.no35')}}</p>
            </div>
            <div class="xuan-2-9-1" v-if="data.orderFacebook.friendOneFblink">
              <el-radio-group v-model="fbContact" class="radio1">
                <el-radio
                  :label="data.orderFacebook.friendOneName+','+'9'+','+data.orderFacebook.friendOnePhone"
                >
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendOneName}}</span>
                  <span
                    style="margin:0 10px;"
                  >{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendOnePhone}}</span>
                  <span>{{$t('yuenan.no33')}}:</span>
                  <span
                    @click="openWindow(data.orderFacebook.friendOneFblink)"
                    class="td-ul"
                  >{{data.orderFacebook.friendOneFblink}}</span>
                </el-radio>
                <el-radio
                  :label="data.orderFacebook.friendTwoName+','+'9'+','+data.orderFacebook.friendTwoPhone"
                >
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendTwoName}}</span>
                  <span
                    style="margin:0 10px;"
                  >{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendTwoPhone}}</span>
                  <span>{{$t('yuenan.no33')}}:</span>
                  <span
                    @click="openWindow(data.orderFacebook.friendTwoFblink)"
                    class="td-ul"
                  >{{data.orderFacebook.friendTwoFblink}}</span>
                </el-radio>
                <el-radio
                  :label="data.orderFacebook.friendThreeName+','+'9'+','+data.orderFacebook.friendThreePhone"
                >
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendThreeName}}</span>
                  <span
                    style="margin:0 10px;"
                  >{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendThreePhone}}</span>
                  <span>{{$t('yuenan.no33')}}:</span>
                  <span
                    @click="openWindow(data.orderFacebook.friendThreeFblink)"
                    class="td-ul"
                  >{{data.orderFacebook.friendOneFblink}}</span>
                </el-radio>
                <el-radio
                  :label="data.orderFacebook.friendFourName+','+'9'+','+data.orderFacebook.friendFourPhone"
                >
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendFourName}}</span>
                  <span
                    style="margin:0 10px;"
                  >{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendOFourPhone}}</span>
                  <span>{{$t('yuenan.no33')}}:</span>
                  <span
                    @click="openWindow(data.orderFacebook.friendFourFblink)"
                    class="td-ul"
                  >{{data.orderFacebook.friendFourFblink}}</span>
                </el-radio>
                <el-radio
                  :label="data.orderFacebook.friendFiveName+','+'9'+','+data.orderFacebook.friendFivePhone"
                >
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendFiveName}}</span>
                  <span
                    style="margin:0 10px;"
                  >{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendFivePhone}}</span>
                  <span>{{$t('yuenan.no33')}}:</span>
                  <span
                    @click="openWindow(data.orderFacebook.friendFiveFblink)"
                    class="td-ul"
                  >{{data.orderFacebook.friendFiveFblink}}</span>
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else style="padding:0 30px">{{$t('public.no23')}}</div>
          </template>
        </li>
        <!-- ------------ 通话联系人开始------------------------ -->
        <li v-if="active2==3">
          <div class="xuan-2-3-1">
            <address-list :get-address="getLinkMan" :order-no="orderNo"></address-list>
          </div>
        </li>
        <!-- ------------ 公司电话开始 ------------------------ -->
        <li class="xuan-2-9" v-if="active2==4">
          <div class="xuan-2-9-1">
            <template v-if="$store.state.common.lang==='vi'">
              <template
                v-if="data.companyContact!==null&&data.companyContact!==undefined&&data.companyContact!=''"
              >
                <el-radio-group v-model="emeContact" class="radio1">
                  <el-radio
                    :label="data.companyContact.name+','+data.companyContact.relation+','+data.companyContact.phone"
                  >
                    <span>{{data.companyContact.name}}</span>
                    <span style="margin:0 20px;">{{data.companyContact.phone}}</span>
                    <span>{{data.companyContact.contactCnt?data.companyContact.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
                  </el-radio>
                </el-radio-group>
              </template>
              <div v-else style="padding:0 30px">{{$t('public.no23')}}</div>
            </template>
            <template v-else>
              <template
                v-if="data.companyContact!==null&&data.companyContact!==undefined&&data.companyContact!=''"
              >
                <el-radio-group v-model="emeContact" class="radio1">
                  <el-radio
                    :label="data.companyContact.name+','+data.companyContact.relation+','+data.companyContact.phone"
                  >
                    <span>{{data.companyContact.name}}</span>
                    <span style="margin:0 20px;">{{data.companyContact.phone}}</span>
                    <span>{{data.companyContact.contactCnt?data.companyContact.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
                  </el-radio>
                </el-radio-group>
              </template>
              <template
                v-else-if="data.orderUserWork.companyPhone!==null&&data.orderUserWork.companyPhone!==undefined&&data.orderUserWork.companyPhone!=''"
              >
                <el-radio-group v-model="emeContact" class="radio1">
                  <el-radio
                    :label="data.orderUserWork.company+','+98+','+data.orderUserWork.companyPhone"
                  >
                    <span>{{data.orderUserWork.company}}</span>
                    <span style="margin:0 20px;">{{data.orderUserWork.companyPhone}}</span>
                    <span>0{{$t('operationDetail.no15')}}</span>
                  </el-radio>
                </el-radio-group>
              </template>
              <div v-else style="padding:0 30px">{{$t('public.no23')}}</div>
            </template>
          </div>
        </li>
        <!-- ------------ 呼叫结果开始 ------------------------ -->
        <li class="xuan-2-6" v-if="active2==5">
          <template v-if="orderNo">
            <group-busy-result :type="1" :order-no="orderNo"></group-busy-result>
          </template>
        </li>
        <!-- ------------ 信审录音开始 ------------------------ -->
        <li v-if="active2==6&&$store.state.common.lang==='id'">
          <audit-record type="1" :orderId="orderId"></audit-record>
        </li>
        <!-- ------------ 催收录音开始 ------------------------ -->
        <li v-if="active2==7&&$store.state.common.lang==='id'">
          <audit-record type="2" :orderId="orderId"></audit-record>
        </li>
        <!-- ------------ 客服录音开始 ------------------------ -->
        <li v-if="active2==8&&$store.state.common.lang==='id'">
          <audit-record type="3" :orderId="orderId"></audit-record>
        </li>
        <!------------------------ 用户信息 ---------------------------->
        <li class="xuan-2-1" v-if="active2==9">
          <!-- 第一行 -->
          <div class="paixu">
            <span></span>
            <p>{{$t('auditDetail.no2')}}</p>
          </div>
          <div class="xuan-2-1-1">
            <div class="xuan-2-1-1-2">
              <div class="xuan-2-1-1-22">
                <p style="width:50%">
                  <span>{{$t('public.no1')}}:</span>
                  <span>{{data.userBase.name | dataIsTrue}}</span>
                </p>
                <p style="width:50%">
                  <span>{{$t('public.no2')}}:</span>
                  <span>{{data.orderInfo.idCard | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:50%">
                  <span>{{$t('yuenan.no1')}}:</span>
                  <span>{{data.orderUserSelf.strIdCardAwardTime | dataIsTrue}}</span>
                </p>
                <p style="width:50%">
                  <span>{{$t('public.birthday')}}:</span>
                  <span>{{data.userBase.birthday | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:50%">
                  <span>{{$t('yuenan.no2')}}:</span>
                  <span>{{data.orderUserSelf.liveProvinceName | dataIsTrue}}</span>
                </p>
                <p style="width:50%">
                  <span>{{$t('yuenan.no3')}}:</span>
                  <span>{{data.orderUserSelf.liveCityName | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:100%">
                  <span>{{$t('yuenan.no4')}}:</span>
                  <span>{{data.orderUserSelf.liveRegionName | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:100%">
                  <span>{{$t('public.no7')}}:</span>
                  <span>{{data.orderUserSelf.liveAddress | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p>
                  <span style="color:red">{{$t('new.no51')}}:</span>
                  <span style="color:red">{{data.loginCount | dataIsTrue}}</span>
                </p>
              </div>
              <div>
                <span>{{$t('add.no54')}}:</span>
                <span>{{$t($store.getters.idCardType_status(data.orderUserIdcard.idcardType))}}</span>
              </div>
            </div>
            <div class="xuan-2-1-1-3">
              <div class="idimgbox">
                <template>
                  <div
                    v-if="data.orderUserIdcard.idcardPhotoUrl"
                    class="idimg pic"
                    @click="openBox({imgUrl:data.orderUserIdcard.idcardPhotoUrl})"
                  >
                    <img
                      :src="data.orderUserIdcard.idcardPhotoUrl"
                      :alt="$t('pic.no1')"
                      :title="$t('pic.no1')"
                    />
                  </div>

                  <div v-else class="idimg pic">
                    <img src="../../assets/img/null.png" :title="$t('pic.no1')" />
                  </div>
                </template>
              </div>
              <div class="idimgbox">
                <template>
                  <div
                    v-if="data.orderUserIdcard.idcardPhotoReverseUrl"
                    class="idimg pic"
                    @click="openBox({imgUrl:data.orderUserIdcard.idcardPhotoReverseUrl})"
                  >
                    <img
                      :src="data.orderUserIdcard.idcardPhotoReverseUrl"
                      :alt="$t('pic.no4')"
                      :title="$t('pic.no4')"
                    />
                  </div>
                  <div v-else class="idimg pic">
                    <img src="../../assets/img/null.png" :title="$t('pic.no4')" />
                  </div>
                </template>
              </div>
              <div class="idimgbox">
                <template>
                  <div
                    v-if="data.orderUserIdcard.facetimePhotoUrl"
                    class="idimg pic"
                    @click="openBox({imgUrl:data.orderUserIdcard.facetimePhotoUrl})"
                  >
                    <img
                      :src="data.orderUserIdcard.facetimePhotoUrl"
                      :alt="$t('pic.no2')"
                      :title="$t('pic.no2')"
                    />
                  </div>
                  <div v-else class="idimg pic">
                    <img src="../../assets/img/null.png" :title="$t('pic.no2')" />
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- 第二行 -->
          <div class="paixu">
            <span></span>
            <p>{{$t('auditDetail.no5')}}</p>
          </div>
          <div class="xuan-2-1-1">
            <div class="xuan-2-1-1-2">
              <div class="xuan-2-1-1-22">
                <p>
                  <span>{{$t('public.no9')}}:</span>
                  <span>{{data.orderUserWork.company | dataIsTrue}}</span>
                </p>
                <p>
                  <span>{{$t('public.no10')}}:</span>
                  <span>{{data.orderUserWork.strEntryTime | dataIsTrue}}</span>
                </p>
                <p>
                  <span>{{$t('public.no13')}}:</span>
                  <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderUserWork.monthIncome)}}{{$store.state.common.vi_currency}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p>
                  <span>{{$t('yuenan.no5')}}:</span>
                  <span>{{data.orderUserWork.industry | dataIsTrue}}</span>
                </p>
                <p>
                  <span>{{$t('public.no12')}}:</span>
                  <span>{{data.orderUserWork.companyPhone | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p>
                  <span>{{$t('yuenan.no6')}}:</span>
                  <span>{{data.orderUserWork.companyProvinceName | dataIsTrue}}</span>
                </p>
                <p>
                  <span>{{$t('yuenan.no15')}}:</span>
                  <span>{{data.orderUserWork.companyCityName | dataIsTrue}}</span>
                </p>
                <p>
                  <span>{{$t('yuenan.no7')}}:</span>
                  <span>{{data.orderUserWork.companyRegionName | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:100%">
                  <span>{{$t('public.no15')}}:</span>
                  <span>{{data.orderUserWork.companyAddress | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:100%">
                  <span>{{$t('yuenan.no9')}}:</span>
                  <span>{{data.orderInfo.orderAddress | dataIsTrue}}</span>
                </p>
              </div>
            </div>
            <div class="xuan-2-1-1-3">
              <div class="idimgbox">
                <template>
                  <div
                    v-if="data.orderUserWork.incomePicUrl"
                    class="idimg pic"
                    @click="openBox({imgUrl:data.orderUserWork.incomePicUrl})"
                  >
                    <img
                      :src="data.orderUserWork.incomePicUrl"
                      :alt="$t('pic.no3')"
                      :title="$t('pic.no3')"
                    />
                  </div>
                  <div v-else class="idimg pic">
                    <img src="../../assets/img/null.png" />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </li>
        <!------------------------ 账户记录信息 ---------------------------->
        <li class="xuan-2-1" v-if="active2==10">
          <!-- 第四行 -->
          <div class="paixu">
            <span></span>
            <p>{{$t('yuenan.no10')}}</p>
          </div>
          <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="13%">{{$t('yuenan.no18')}}</th>
              <th width="13%">{{$t('public.no19')}}</th>
              <th width="13%">{{$t('public.no20')}}</th>
              <th width="13%">{{$t('yuenan.no20')}}</th>
              <th width="13%">{{$t('yuenan.no19')}}</th>
              <th width="13%">{{$t('public.no21')}}</th>
              <th width="13%">{{$t('yuenan.no21')}}</th>
              <th width="9%">{{$t('public.no22')}}</th>
            </tr>
            <template
              v-if="data.orderUserBankInfo!==null&&data.orderUserBankInfo!==undefined&&data.orderUserBankInfo!=''"
            >
              <tr>
                <td>{{data.orderUserBankInfo.bankType | dataIsTrue}}</td>
                <td>{{data.orderUserBankInfo.bankType==='NganLuong'?'-':data.orderUserBankInfo.bankName}}</td>
                <td>{{data.orderUserBankInfo.bankType==='NganLuong'?'-':data.orderUserBankInfo.bankAccount}}</td>
                <td>{{data.orderUserBankInfo.cardFullname}}</td>
                <td>{{data.orderUserBankInfo.email}}</td>
                <td>{{data.orderUserBankInfo.strCreateTime}}</td>
                <td>{{data.orderUserBankInfo.cardYear+'-'+data.orderUserBankInfo.cardMonth}}</td>
                <td>{{data.orderUserBankInfo.status==1?$t('userDetail.bankId_status.no1'):$t('userDetail.bankId_status.no2')}}</td>
              </tr>
            </template>
            <template v-else>
              <div
                style="textAlign:center;width:500%;height:40px;lineHeight:40px"
              >{{$t('public.no23')}}</div>
            </template>
          </table>
        </li>
      </ul>
    </div>
    <div class="foot"></div>

    <!-- ------------ 电话催收、短信催收开始------------------------ -->
    <div class="tabs" v-if="type==1">
      <ul class="tabs_title">
        <li
          v-for="(value,index) in arr3"
          :key="index"
          :class="{active:active3==value.id}"
          @click="active3=value.id"
        >
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <!-- --------------- 电话催收开始 ------------------------ -->
        <li v-if="active3==1">
          <el-button
            v-if="$store.state.common.lang==='id'"
            style="margin:0 0 16px 30px;"
            @click="openTelWindow"
          >{{$t('yn.no46')}}</el-button>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item :label="$t('operationDetail.no23')" prop="status">
              <el-select v-model="ruleForm.status" :placeholder="$t('public.placeholder')">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('operationDetail.no24')" prop="promise">
              <el-radio-group v-model="ruleForm.promise">
                <el-radio :label="1">
                  <span>{{$t('operationDetail.no11')}}</span>
                </el-radio>
                <el-radio :label="-1">
                  <span>{{$t('operationDetail.no12')}}</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="ruleForm.promise == 1">
              <el-form-item :label="$t('operationDetail.no26')" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      :placeholder="$t('operationDetail.no27')"
                      v-model="ruleForm.promiseTime"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </template>

            <el-form-item :label="$t('public.no38')">
              <el-input type="textarea" v-model="ruleForm.remark" :rows="4"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
              >{{$t('operationDetail.no22')}}</el-button>
            </el-form-item>
          </el-form>
        </li>
        <!-- --------------- 短信催收开始------------------------ -->
        <li v-if="active3==2">
          <div class="xuan-2-2-1">
            <template v-if="data.collectionSmsTemplateList">
              <el-radio-group v-model="noteSel" class="radio1">
                <el-radio
                  v-for="(item,index) in data.collectionSmsTemplateList"
                  :key="index"
                  :label="item.id"
                >
                  <span style="word-break:break-all">{{item.content}}</span>
                </el-radio>
              </el-radio-group>
            </template>
            <div v-else style="padding:0 30px">{{$t('public.no23')}}</div>
          </div>
          <el-row type="flex" justify="center">
            <el-col :span="3">
              <el-button type="primary" @click="noteSubmit">{{$t('operationDetail.no25')}}</el-button>
            </el-col>
          </el-row>
        </li>
        <!-- --------------- 特权申请开始------------------------ -->
        <li v-if="active3==3">
          <template v-if="data.partialShow=='1'||data.overCouponShow=='1'">
            <div class="radio-select">
              <template>
                <!-- ------------逾期减免 -->
                <el-radio
                  v-if="data.overCouponShow=='1'"
                  v-model="radio"
                  label="1"
                  border
                >{{$t('new.no61')}}</el-radio>
                <!------------- 部分还款 -->
                <el-radio
                  v-if="data.partialShow=='1'"
                  v-model="radio"
                  label="2"
                  border
                >{{$t('new.no60')}}</el-radio>
              </template>
            </div>
            <div class="part" v-if="radio=='2'&&data.partialShow=='1'">
              <el-form
                :model="part"
                :rules="rules"
                ref="ruleForm1"
                size="medium"
                label-width="120px"
              >
              <!------------------ 部分还款 ------------------->
              <!-- 部分还款期数 -->
                <el-form-item label="申请减免期数" prop="money">
                  <el-button type="primary" size="mini" @click="showbufenPlanstage">申请减免期数</el-button>
                  <!-- <el-tag closable>1/3</el-tag> -->
                </el-form-item>
              <!-- 部分还款金额 -->
                <el-form-item label="部分还款金额" prop="money">
                  <el-input v-model="part.money" size="medium" style="width:300px"></el-input>
                </el-form-item>
                <!-- 还款方式 -->
                <el-form-item :label="$t('loanAfterManage.payType')" prop="type">
                  <el-select v-model="part.type" :placeholder="$t('public.placeholder')">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="$t(item.label)"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 还款时间 -->
                <el-form-item :label="$t('public.backMoneyDate')" required>
                  <el-col :span="11">
                    <el-form-item>
                      <el-date-picker
                        v-model="part.time"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        :placeholder="$t('public.backMoneyDate')"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <!-- 备注 -->
                <el-form-item :label="$t('public.no37')">
                  <el-input type="textarea" v-model="part.remark" :rows="4"></el-input>
                </el-form-item>
                <!-- 提 交 -->
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="partSubmit('ruleForm1')"
                  >{{$t('operationDetail.no22')}}</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="part" v-if="radio=='1'&&data.overCouponShow=='1'">
              <el-form
                :model="remission"
                :rules="rules"
                ref="ruleForm2"
                size="medium"
                label-width="120px"
                class="demo-ruleForm"
              >
              <!-------------------- 逾期减免 --------------------->
              <!-- 申请减免期数 -->
              <el-form-item label="申请减免期数" prop="money">
                  <el-button type="primary" size="mini" @click="showjianmiaanPlanstage">申请减免期数</el-button>
                </el-form-item>
              <!-- 减免金额 -->
                <el-form-item label="申请减免金额" prop="money">
                  <el-input v-model="remission.money" size="medium" style="width:300px"></el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('filter.usedDate')" required>
                  <el-col :span="11">
                    <el-form-item prop="time">
                      <el-date-picker
                        id="daaaa"
                        v-model="remission.time"
                        size="small"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="~"
                        :default-value="$store.state.common.preMonth"
                        :start-placeholder="$t('public.beginTime')"
                        :end-placeholder="$t('public.endTime')"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item> -->
                <!-- 备注 -->
                <el-form-item :label="$t('public.no37')">
                  <el-input type="textarea" v-model="remission.remark" :rows="4"></el-input>
                </el-form-item>
                <!-- 提 交 -->
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="remissionSubmit('ruleForm2')"
                  >{{$t('operationDetail.no22')}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>
          <p v-else>{{$t('new.no64')}}</p>
        </li>
      </ul>
    </div>

    <el-dialog title="还款计划" :visible.sync="dialogPlanVisible" width="1000px">
      <el-table :data="PlanData">
        <el-table-column label="期数" prop="stages" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.stages}}期</span>
          </template>
        </el-table-column>
        <el-table-column label="本期应还时间" prop="dueTime" width="120px" align="center"></el-table-column>
        <el-table-column label="本期应还本息" prop="amount" align="center"></el-table-column>
        <el-table-column label="本期逾期天数" prop="overDueDays" align="center"></el-table-column>
        <el-table-column label="本期逾期罚息" prop="overdueInterest" align="center"></el-table-column>
        <el-table-column label="本期应还金额" prop="returnMoney" align="center"></el-table-column>
        <el-table-column label="已还金额" prop="repayAmount" align="center"></el-table-column>
        <el-table-column label="还款状态" prop="status" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==51">已还清</span>
            <span v-else>未还清</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>


<!----------------- 部分还款分期计划弹框 ---------------->
    <el-dialog title="还款计划" :visible.sync="dialogPlanVisible1" width="1000px">
      <el-table :data="PlanData1" >
        <!-- <el-table-column  align="center" type="selection">
        </el-table-column> -->
        <el-table-column
          label="选择"
          width="50"
          align="center"
        >
          <template slot-scope="scope">
            <el-radio
            :disabled="scope.row.status==51"
              :label="scope.$index"
              v-model="choiceAccountItem"
              @change.native="tableselectchange(scope.$index,scope.row.stages)"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="期数" prop="stages" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.stages}}期</span>
          </template>
        </el-table-column>
        <el-table-column label="本期应还时间" prop="dueTime" width="120px" align="center"></el-table-column>
        <el-table-column label="本期应还本息" prop="amount" align="center"></el-table-column>
        <el-table-column label="本期逾期天数" prop="overDueDays" align="center"></el-table-column>
        <el-table-column label="本期逾期罚息" prop="overdueInterest" align="center"></el-table-column>
        <el-table-column label="本期应还金额" prop="returnMoney" align="center"></el-table-column>
        <el-table-column label="已还金额" prop="repayAmount" align="center"></el-table-column>
        <el-table-column label="还款状态" prop="status" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==51">已还清</span>
            <span v-else>未还清</span>
          </template>
        </el-table-column>
        
      </el-table>
      <el-button type="primary" @click="sureselectstages">确定</el-button>
    </el-dialog>

<!------------------- 逾期减免分期计划弹框 -------------->
    <el-dialog title="还款计划" :visible.sync="dialogPlanVisible2" width="1000px">
      <el-table :data="PlanData2" >
          <el-table-column
          label="选择"
          width="50"
          align="center"
        >
          <template slot-scope="scope">
            <el-radio
            :disabled="scope.row.status==51"
              :label="scope.$index"
              v-model="choiceAccountItem"
              @change.native="tableselectchange1(scope.$index,scope.row.stages)"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>

        <el-table-column label="期数" prop="stages" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.stages}}期</span>
          </template>
        </el-table-column>
        <el-table-column label="本期应还时间" prop="dueTime" width="120px" align="center"></el-table-column>
        <el-table-column label="本期应还本息" prop="amount" align="center"></el-table-column>
        <el-table-column label="本期逾期天数" prop="overDueDays" align="center"></el-table-column>
        <el-table-column label="本期逾期罚息" prop="overdueInterest" align="center"></el-table-column>
        <el-table-column label="本期应还金额" prop="returnMoney" align="center"></el-table-column>
        <el-table-column label="已还金额" prop="repayAmount" align="center"></el-table-column>
        <el-table-column label="还款状态" prop="status" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==51">已还清</span>
            <span v-else>未还清</span>
          </template>
        </el-table-column>
        
      </el-table>
      <el-button type="primary" @click="yuqisureselectstages">确定</el-button>
    </el-dialog>


    <div class="foot"></div>
    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>
  </div>
  <div v-else class="back">
    <p>
      {{$t('public.no23')}}，
      <span @click="back">{{$t('back.no1')}}</span>
      {{$t('back.no2')}}
    </p>
  </div>
</template>
<script>
import appLightbox from "../../components/component/lightbox"; // 图片点击放大组件
import cuishouList from "../../components/component/cuishou"; // 催收记录列表组件
import addressList from "../../components/component/address"; // 通讯录列表组件
import groupBusyResult from "../../components/component/groupBusyResult"; // 通讯录列表组件
import auditRecord from "../../components/component/auditRecord";
import { Loading, Message } from "element-ui";
export default {
  name: "Detail",
  components: {
    appLightbox,
    cuishouList,
    groupBusyResult,
    auditRecord,
    addressList
  },
  data() {
    return {
      choiceAccountItem: '',//单选
      choiceAccountItem1: '',//单选
      checkList:[],
      bufenselectarr:[],
      // yuqiselectarr:[],
      bufenselectstages:'',//部分还款还款计划选中的期数
      yuqiselectstages:'',
      orderNo:'',
      dialogPlanVisible:false,
      dialogPlanVisible1:false,
      dialogPlanVisible2:false,
      PlanData:[],
      PlanData1:[],
      PlanData2:[],
      orderUrgentContact: "",
      clickNumber: 0,
      loading: true,
      canCheck: false,
      // buttonCanClick: false,
      sessionid: "",
      collectionId: "", // 传过来的催收ID
      orderNo: "", // 传过来的订单编号
      type: "", // 传过来的订单编号
      lightBoxToggle: false, // 图片放大显示层开关
      flag: true,
      // arr1:['用户信息','借款信息'],// 第一个选项卡
      active1: 1, // 第一个选项卡当前选中项
      // arr2:['催收记录','紧急联系人','通话联系人'],// 第二个选项卡
      active2: 1, // 第二个选项卡当前选中项
      // arr3:['电话催收','短信催收'],// 第三个选项卡
      active3: 1, // 第三个选项卡当前选中项
      active4: 1, // 第三个选项卡当前选中项
      data: {
        // 页面信息汇总
        orderLending: "",
        orderUserWork: "", // 工作单位
        orderUserContactList: "", // 通话记录联系人列表
        orderUserIdcard: "", // 身份相关信息
        orderUserBankInfo: "", // 身份相关信息
        collectionInfo: "", // 个人资料
        orderInfo: "", // 借款信息
        userBase: "", // 借款信息
        orderExtra: "", // 借款信息
        orderUserSelf: "", // 生活信息详情
        collectionSmsTemplateList: [{ id: 1, content: "213213" }], // 短信模版
        collectionRecordList: "", // 催收记录列表
        orderUrgentContact: "", // 紧急联系人列表
        companyContact: "", // 紧急联系人列表
        orderFacebook: "",
        orderPhoneApprove: "",
        partialShow: "",
        overCouponShow: "",
        webInfo: "",
        loginCount: "",
        serviceRecordList: []
      },
      emeContact: "", // 紧急联系人选中项
      fbContact: "", // FB联系人选中项
      contact: "", // 通话记录联系人选中项
      ruleForm: {
        // 电话催收模块
        contactName: "",
        contactPhone: "",
        relation: "",
        status: "",
        promise: "",
        promiseTime: "",
        remark: ""
      },
      options1: this.$store.state.options.collection_option_submit, // 电话接通状态下拉选框信息
      options2: this.$store.state.options.channelAll_option, // 还款方式下拉选框信息
      rules: {
        // 电话催收表单验证项
        status: [
          {
            required: true,
            message: this.$t("operationDetail.no20"),
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: this.$t("operationDetail.no20"),
            trigger: "change"
          }
        ],
        promise: [
          {
            required: true,
            message: this.$t("operationDetail.no21"),
            trigger: "change"
          }
        ],
        money: [
          {
            required: true,
            message: this.$t("login.required"),
            trigger: "blur"
          }
        ],
        // time: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: this.$t("public.placeholder"),
        //     trigger: "change"
        //   }
        // ]
      },
      noteSel: "", // 短信催收列表选中项
      radio: "1", // 特权申请选中项
      part: {
        // 部分还款表单
        money: "",
        time: '',
        type: "",
        remark: ""
      },
      remission: {
        // 减免表单
        money: "",
        // time: [],
        remark: ""
      },
      phoneAuditLog: "",
      phoneAuditLogTwo: "",
      telHref: "",
      telTip: false,
      from: "" // 从哪个页面打开的
    };
  },
  computed: {
    arr1() {
      return [
        {
          id: 1,
          title: this.$t("operationDetail.tab1.no1"),
          black: this.data.userBase.isBlack
        },
        { id: 2, title: this.$t("operationDetail.tab1.no2") }
      ];
    },
    arr2() {
      let arr = [
        { id: 1, title: this.$t("operationDetail.tab2.no1") },
        { id: 2, title: this.$t("operationDetail.tab2.no2") },
        { id: 3, title: this.$t("operationDetail.tab2.no3") },
        { id: 4, title: this.$t("public.no12") },
        { id: 5, title: this.$t("new.no93") }
      ];
      if (this.$store.state.common.lang === "id") {
        if (
          this.$store.state.common.permiss.includes(
            "RIGHT_COLLECT_ME_ELECTRIC_RECORDING"
          )
        ) {
          arr.push({ id: 6, title: this.$t("yn.no35") });
        }
        if (
          this.$store.state.common.permiss.includes(
            "RIGHT_COLLECT_ME_COLLECTION_RECORDING"
          )
        ) {
          arr.push({ id: 7, title: this.$t("yn.no30") });
        }
        if (
          this.$store.state.common.permiss.includes(
            "RIGHT_COLLECT_ME_CUSTOMER_SERVICE_REPAYMENT"
          )
        ) {
          arr.push({ id: 8, title: this.$t("yn.no50") });
        }
      }
      if (this.$store.state.common.lang === "vi") {
        arr.push({ id: 9, title: this.$t("tab2.no1") });
        arr.push({ id: 10, title: this.$t("tab2.no5") });
      }
      return arr;
    },
    arr3() {
      return [
        { id: 1, title: this.$t("operationDetail.tab3.no1") },
        { id: 2, title: this.$t("operationDetail.tab3.no2") },
        { id: 3, title: this.$t("operationDetail.tab3.no3") }
      ];
    },
    arr4() {
      return [
        { id: 1, title: this.$t("new.no58") },
        { id: 2, title: this.$t("add.no11") }
      ];
    }
  },
  methods: {
    // handleSelectionChange(row){
    //   this.PlanData2.forEach(item=>{
    //     if (item.status==51) {
    //     }else{
    //       if (item.stages!==row.stages) {
    //       item.checked = false
    //       console.log(row.stages)
    //       }
    //     }
        
    //   })
      
    // },
    boxchange(val){
      if(this.checkList.indexOf(val) > -1){
          this.checkList = [];
          this.checkList.push(val);
        }
    },
    // 逾期分期选择确认
    yuqisureselectstages(){
    //   if (this.yuqiselectarr.length>1) {
    //     Message.error({
    //       message: '不可多选',
    //       duration: 1000
    // })
    //   }else{
      //  alert(this.yuqiselectstages ) 
        this.dialogPlanVisible2=false
      // }
      
    },
    // 部分还款分期选择确认
    sureselectstages(){
    //   if (this.bufenselectarr.length>1) {
    //     Message.error({
    //       message: '不可多选',
    //       duration: 1000
    // })
    //   }else{
        this.dialogPlanVisible1=false
      // }
      
    },
    tableselectchange(index, val){
       console.log("单选-----",index,val)
      // this.yuqiselectarr=e
      this.bufenselectstages=val
      console.log(this.bufenselectstages,'部分还款期数')
      
    },
    //单选
    tableselectchange1(index, val){

      console.log("单选-----",index,val)
      this.yuqiselectstages=val
       console.log(this.yuqiselectstages,'逾期还款期数')
    },

    // 申请减免分期计划弹框
    showjianmiaanPlanstage(e){
      console.log(e)
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
          // console.log(res,1111)
         
          // res.data.data.forEach(item => {
          //   item.checked = false
          // });

          this.PlanData2=res.data.data
          
          this.dialogPlanVisible2=true
        }else{

        }
        
      })
    },
    // 申请部分还款分期计划弹框
    showbufenPlanstage(e){
      console.log(e)
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
          // console.log(res,1111)
          this.PlanData1=res.data.data
          this.dialogPlanVisible1=true
        }else{

        }
        
      })
    },
    showPlan(e){
      console.log(e)
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
          // console.log(res,1111)
          this.PlanData=res.data.data
          this.dialogPlanVisible=true
        }else{

        }
        
      })
    },
    checkKong() {
      //全部检测
      // console.log('111')
      let that = this;
      this.$confirm(this.$t("check.no13"), this.$t("check.no1"), {
        confirmButtonText: this.$t("check.no15"),
        cancelButtonText: this.$t("public.no50"),
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          setTimeout(function() {
            that.loading = false;
          }, 1000);
          let arr = this.orderUrgentContact; //按钮组展示的源数据
          let newarr = [];
          for (let i = 0; i < arr.length; i++) {
            newarr.push(arr[i].contactPhone);
            arr[i].buttonLoading = true;
          }
          let option = {
            header: {
              ...this.$base,
              action: "U0023",
              sessionid: this.sessionid
            },
            phoneNumbers: newarr,
            update: true
          };
          // let loadingInstance = Loading.service();
          // loadingInstance.close();
          this.loading = true;
          //启动局部loading
          this.$axios
            .post("", option)
            .then(res => {
              if (res.data.header.code == 0 && res.data.data.length !== 0) {
                let arr1 = res.data.data;
                for (let j = 0; j < arr1.length; j++) {
                  for (let k = 0; k < arr.length; k++) {
                    if (arr1[j].status < 1 || arr1[j].status > 10) {
                      arr1[j].status == 0;
                    }
                    if (
                      arr1[j].phoneNumber.indexOf(arr[k].contactPhone) != -1 &&
                      // arr1[j].phoneNumber.length -
                      //   arr1[j].phoneNumber.indexOf(arr[k].contactPhone) ==
                      //   arr[k].contactPhone.length &&
                      // arr1[j].phoneNumber.substr(
                      //   arr1[j].phoneNumber.length - 1,
                      //   1
                      // ) ==
                      //   arr[k].contactPhone.substr(
                      //     arr[k].contactPhone.length - 1,
                      //     1
                      //   )
                      arr1[j].phoneNumber.substring(
                        arr1[j].phoneNumber.indexOf(arr[k].contactPhone)
                      ) == arr[k].contactPhone
                    ) {
                      // console.log(arr1[j],'222')
                      arr[k].status = arr1[j].status;
                      arr[k].success = arr1[j].success;
                      arr[k].buttonLoading = false;
                      arr[k].haveData = true;
                    } else {
                      // console.log(arr1[j],'333')
                      // arr[k].haveData = false;
                    }
                  }
                }
                this.$store.state.arr = arr;
                this.orderUrgentContact = this.$store.state.arr;
                // console.log(this.$store.state.arr, "全部做完111");
                this.$forceUpdate();
              } else {
                this.loading = false;
                //  let arr = this.orderUrgentContact;
                for (let k = 0; k < arr.length; k++) {
                  // arr[k].success = false;
                  arr[k].buttonLoading = false;
                  arr[k].haveData = false;
                }
                this.$store.state.arr = arr;
                this.orderUrgentContact = this.$store.state.arr;
                this.$forceUpdate();
              }
            })
            .catch(error => {
              this.loading = false;
              let arr = this.orderUrgentContact;
              for (let k = 0; k < arr.length; k++) {
                // arr[k].success = false;
                arr[k].buttonLoading = false;
                arr[k].haveData = false;
              }
              this.$store.state.arr = arr;
              this.orderUrgentContact = this.$store.state.arr;
              this.$forceUpdate();
            });
        })
        .catch(() => {
          // console.log('取消')
        });
    },
    clickCheck(e) {
      //单个检测
      var thatPhone = e.contactPhone;
      let that = this;
      this.loading = true;
      setTimeout(function() {
        that.loading = false;
      }, 1000);
      // console.log(this.$store.state.arr, "重新开始");
      for (let i = 0; i < this.$store.state.arr.length; i++) {
        if (thatPhone == this.$store.state.arr[i].contactPhone) {
          this.$store.state.arr[i].buttonLoading = true;
        }
      }
      // console.log(this.$store.state.arr, "第一次更改");
      this.fengZhuang(thatPhone, this.$store.state.arr);
    },
    fengZhuang(e, arr) {
      //封装后的点击检测号码
      // console.log(arr, "第一次更改后接收");
      let option = {
        header: {
          ...this.$base,
          action: "U0023",
          sessionid: this.sessionid
        },
        phoneNumbers: [e],
        update: true
      };
      this.$axios
        .post("", option)
        .then(res => {
          if (res.data.header.code == 0 && res.data.data.length !== 0) {
            let arr1 = res.data.data;
            for (let j = 0; j < arr1.length; j++) {
              for (let k = 0; k < arr.length; k++) {
                if (arr1[j].status < 1 || arr1[j].status > 10) {
                  arr1[j].status == 0;
                }
                if (
                  arr1[j].phoneNumber.indexOf(arr[k].contactPhone) != -1 &&
                  // arr1[j].phoneNumber.length -
                  //   arr1[j].phoneNumber.indexOf(arr[k].contactPhone) ==
                  //   arr[k].contactPhone.length &&
                  // arr1[j].phoneNumber.substr(
                  //   arr1[j].phoneNumber.length - 1,
                  //   1
                  // ) ==
                  //   arr[k].contactPhone.substr(
                  //     arr[k].contactPhone.length - 1,
                  //     1
                  //   )
                  arr1[j].phoneNumber.substring(
                    arr1[j].phoneNumber.indexOf(arr[k].contactPhone)
                  ) == arr[k].contactPhone
                ) {
                  arr[k].status = arr1[j].status;
                  arr[k].success = arr1[j].success;
                  arr[k].buttonLoading = false;
                  arr[k].haveData = true;
                } else {
                  // arr[k].haveData = false;
                }
              }
            }
            // console.log(arr,'处理后的')
            this.$store.state.arr = arr;
            // console.log( this.$store.state.arr,'处理后的1')
            this.orderUrgentContact = this.$store.state.arr;
            // console.log( this.orderUrgentContact,'处理后的2')
            // console.log(this.$store.state.arr,'999')
            this.$forceUpdate();
          } else {
            this.loading = false;
            for (let m = 0; m < arr.length; m++) {
              //  arr[m].success = false;
              arr[m].buttonLoading = false;
              arr[m].haveData = false;
            }
            this.$store.state.arr = arr;
            this.orderUrgentContact = this.$store.state.arr;
            this.$forceUpdate();
          }
        })
        .catch(error => {
          this.loading = false;
          for (let n = 0; n < arr.length; n++) {
            //  arr[n].success = false;
            arr[n].buttonLoading = false;
            arr[n].haveData = false;
          }
          this.$store.state.arr = arr;
          this.orderUrgentContact = this.$store.state.arr;
          this.$forceUpdate();
        });
    },
    openBox: function(obj) {
      // 图片放大显示
      this.currentObj = obj;
      this.lightBoxToggle = !this.lightBoxToggle;
    },
    closeBox: function() {
      // 图片放大关闭
      this.lightBoxToggle = false;
    },
    detail() {
      // 获取详情页数据
      console.log("再次调用");
      // console.log(this.orderUrgentContact,'是否有')
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.myOperation_detail,
          sessionid: this.sessionid
        },
        orderNo: this.orderNo
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          this.data.orderLending = res.data.data.orderLending;
          this.data.orderUserWork = res.data.data.orderUserWork;
          this.data.orderUserContactList = res.data.data.orderUserContactList;
          this.data.orderUserIdcard = res.data.data.orderUserIdcard;
          this.data.collectionInfo = res.data.data.collectionInfo;
          this.data.orderUserBankInfo = res.data.data.orderUserBankInfo;
          this.data.orderInfo = res.data.data.orderInfo;
          this.data.userBase = res.data.data.userBase;
          this.data.orderExtra = res.data.data.orderExtra;
          this.data.orderUserSelf = res.data.data.orderUserSelf;
          this.data.collectionRecordList = res.data.data.collectionRecordList;
          this.data.companyContact = res.data.data.companyContact;
          this.data.partialShow = res.data.data.partialShow;
          this.data.overCouponShow = res.data.data.overCouponShow;
          this.data.webInfo = res.data.data.webInfo;
          this.data.orderFacebook = res.data.data.orderFacebook;
          this.data.serviceRecordList = res.data.data.serviceRecordList;
          this.data.loginCount = res.data.data.loginCount;
          this.orderUrgentContact = res.data.data.orderUrgentContact; //111
          this.telAuditLogTwo("2");
          // this.checkKong()      //获取空号检测
          let arr = this.orderUrgentContact; //按钮组展示的源数据
          let newarr = [];
          // this.loading=true
          for (let i = 0; i < arr.length; i++) {
            newarr.push(arr[i].contactPhone);
          }
          let option = {
            header: {
              ...this.$base,
              action: "U0023",
              sessionid: this.sessionid
            },
            phoneNumbers: newarr,
            update: false
          };
          this.$axios
            .post("", option)
            .then(res => {
              // console.log('1')
              // console.log(res.data,'2')
              if (res.data.header.code == 0 && res.data.data.length !== 0) {
                // console.log('3')

                let arr1 = res.data.data;
                // console.log('4')
                for (let j = 0; j < arr1.length; j++) {
                  // console.log('5')
                  for (let k = 0; k < arr.length; k++) {
                    // console.log('6')
                    // arr[k].status = 0;
                    // arr[k].success = false;
                    // arr[k].haveData = false;
                    if (arr1[j].status < 1 || arr1[j].status > 10) {
                      arr1[j].status == 0;
                    }
                    // console.log('7')
                    let long = arr1[j].phoneNumber;
                    let short = arr[k].contactPhone;
                    if (
                      arr1[j].phoneNumber.indexOf(arr[k].contactPhone) != -1 &&
                      // arr1[j].phoneNumber.length -
                      //   arr1[j].phoneNumber.indexOf(arr[k].contactPhone) ==
                      //   arr[k].contactPhone.length &&
                      // arr1[j].phoneNumber.substr(
                      //   arr1[j].phoneNumber.length - 1,
                      //   1
                      // ) ==
                      //   arr[k].contactPhone.substr(
                      //     arr[k].contactPhone.length - 1,
                      //     1
                      //   ) &&
                      arr1[j].phoneNumber.substring(
                        arr1[j].phoneNumber.indexOf(arr[k].contactPhone)
                      ) == arr[k].contactPhone
                    ) {
                      // str.substr(str.length-1,1)
                      // console.log(arr1[j].phoneNumber.length, "777");
                      // console.log(
                      //   arr1[j].phoneNumber.indexOf(arr[k].contactPhone),
                      //   "666"
                      // );

                      // console.log(arr[k].contactPhone.length, "888");
                      // console.log(arr[k].contactPhone,'类型')
                      console.log(k, "index");
                      arr[k].status = arr1[j].status;
                      arr[k].success = arr1[j].success;
                      arr[k].haveData = true;
                    } else {
                      // console.log('8')
                      // console.log(arr[k],'22222')
                      // arr[k].haveData=false
                    }
                    // console.log('9')
                  }
                }
                // console.log('10')
                this.$store.state.arr = arr;
                this.orderUrgentContact = this.$store.state.arr;
                this.$forceUpdate();
                console.log(this.$store.state.arr, "数据");
                this.loading = false;
              } else {
                //返回data是空，处理方式
                this.loading = false;
                for (let m = 0; m < arr.length; m++) {
                  arr[m].haveData = false;
                }
                this.$store.state.arr = arr;
                this.orderUrgentContact = this.$store.state.arr;
                this.$forceUpdate();
              }
            })
            .catch(error => {
              this.loading = false;
              for (let n = 0; n < arr.length; n++) {
                arr[n].haveData = false;
              }
              this.$store.state.arr = arr;
              this.orderUrgentContact = this.$store.state.arr;
              this.$forceUpdate();
            });
        } else {
          this.data = [];
          this.loading = false;
        }
      });
    },
    submitForm(formName) {
      // 电话催收提交操作
      // 判断联系人字段是否填写
      if (this.$store.state.common.lang === "vi") {
        if (
          this.emeContact === "" &&
          this.contact === "" &&
          this.fbContact === ""
        ) {
          this.$globalMsg.error(this.$t("operationDetail.no28"));
          return;
        }
      } else {
        if (this.emeContact === "" && this.contact === "") {
          this.$globalMsg.error(this.$t("operationDetail.no28"));
          return;
        }
      }
      // 然后表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.promise == 1 && this.ruleForm.promiseTime == "") {
            this.$globalMsg.error(this.$t("operationDetail.no27"));
            return;
          }
          if (this.flag) {
            this.flag = false;
            let option = {
              header: {
                ...this.$base,
                action: this.$store.state.actionMap.telOperation_submit,
                sessionid: this.sessionid
              },
              orderNo: this.orderNo,
              type: "1",
              ...this.ruleForm
            };
            this.$axios.post("", option).then(res => {
              this.flag = true;
              if (res.data.header.code == 0) {
                this.$globalMsg.success(this.$t("message.success"));
                setTimeout(() => {
                  this.$router.push("/myCollectionOrderList");
                }, 1000);
              } else {
                this.$globalMsg.error(res.data.header.msg);
              }
              this.emeContact = "";
              this.contact = "";
              this.ruleForm.remark = "";
              this.ruleForm.status = "";
              this.ruleForm.promiseTime = "";
            });
          }
        } else {
          return false;
        }
      });
    },
    noteSubmit() {
      // 短信模版发送
      if (this.emeContact === "" && this.contact === "") {
        this.$globalMsg.error(this.$t("operationDetail.no28"));
        return;
      }
      if (this.noteSel === "") {
        this.$globalMsg.error(this.$t("operationDetail.no29"));
        return;
      }
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.noteOperation_submit,
            sessionid: this.sessionid
          },
          orderNo: this.orderNo,
          type: "2",
          contactName: this.ruleForm.contactName,
          contactPhone: this.ruleForm.contactPhone,
          relation: this.ruleForm.relation,
          smsDemoId: this.noteSel
        };
        this.$axios.post("", option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t("message.success"));
            setTimeout(() => {
              this.$router.push("/cuishoudetail");
            }, 1000);
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.emeContact = "";
          this.contact = "";
          this.noteSel = "";
        });
      }
    },
    back() {
      // 页面无数据时，点击返回
      window.history.go(-1);
    },
    getLinkMan(val) {
      this.contact = val;
    },
    remissionSubmit() {
      // 逾期减免提交
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.cuishou_remission,
            sessionid: this.sessionid
          },
          orderId: this.data.orderUserSelf.orderId,
          userId: this.data.orderUserSelf.userId,
          operating: "1",
          // effectiveTimeBegin: this.remission.time ? this.remission.time[0] : "",
          // effectiveTimeEnd: this.remission.time ? this.remission.time[1] : "",
          couponAmount: this.remission.money,
          remark: this.remission.remark,
          stages:this.yuqiselectstages
        };
        this.$axios.post("", option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t("message.success"));
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.remission.money = "";
          // this.remission.time = [];
          this.remission.remark = "";
        });
      }
    },
    // 部分还款提交
    partSubmit() {
      // 部分还款提交
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.cuishou_part,
            sessionid: this.sessionid
          },
          orderId: this.data.orderUserSelf.orderId,
          userId: this.data.orderUserSelf.userId,
          operating: "1",
          // 还款时间
          committedRepaymentTime: this.part.time ? this.part.time : "",
          couponAmount: this.part.money,
          payType: this.part.type,
          channel: "bluepay",
          remark: this.part.remark,
          stages:this.bufenselectstages
        };
        this.$axios.post("", option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t("message.success"));
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.part.money = "";
          this.part.time = [];
          this.part.remark = "";
          this.part.type = "";
        });
      }
    },
    telAuditLogTwo(type) {
      // 信审电话审核记录
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.telRecord_one,
          sessionid: this.sessionid
        },
        approveType: type,
        orderNo: this.orderNo,
        adminId: this.data.orderUserSelf.userId
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          this.phoneAuditLogTwo = res.data.data;
        }
      });
    },
    openWindow(href) {
      if (href) {
        window.open(href);
      }
    },
    openTelWindow() {
      if (this.emeContact === "" && this.contact === "") {
        this.$globalMsg.error(this.$t("operationDetail.no28"));
        return;
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.TELEPHONE0001,
          sessionid: this.sessionid
        },
        orderId: this.orderId,
        phone: this.ruleForm.contactPhone,
        type: 2
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          this.telHref =
            "sip:" + this.ruleForm.contactPhone + "," + res.data.data;
          window.location.href = this.telHref;
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
      });
    }
  },
  watch: {
    emeContact() {
      if (this.emeContact !== "") {
        this.contact = "";
        this.fbContact = "";
        let arr = String(this.emeContact).split(",");
        this.ruleForm.contactName = arr[0];
        this.ruleForm.relation = arr[1];
        this.ruleForm.contactPhone = arr[2];
      }
    },
    contact() {
      if (this.contact !== "") {
        this.emeContact = "";
        this.fbContact = "";
        let arr = String(this.contact).split(",");
        this.ruleForm.contactName = arr[0];
        this.ruleForm.relation = arr[1];
        this.ruleForm.contactPhone = arr[2];
      }
    },
    fbContact() {
      if (this.fbContact !== "") {
        this.emeContact = "";
        this.contact = "";
        let arr = String(this.fbContact).split(",");
        this.ruleForm.contactName = arr[0];
        this.ruleForm.relation = arr[1];
        this.ruleForm.contactPhone = arr[2];
      }
    },
    "ruleForm.promise"() {
      if (this.ruleForm.promise === -1) {
        this.ruleForm.promiseTime = "";
      }
    }
  },
  mounted() {
    this.orderNo=this.$route.query.orderNo
    this.sessionid = sessionStorage.getItem("sessionid");
    this.orderNo = this.$route.query.orderNo;
    this.orderId = this.$route.query.orderId;
    this.type = this.$route.query.type;
    this.from = this.$route.query.from;
    this.detail();
  }
};
</script>
<style scoped lang="scss">

.table-simple-checkbox{ // 隐藏 1
  .el-checkbox__label{
    display: none;
  }
}
.loansTypeImg {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: 15px;
  padding-top: 10px;
  .loansTypeImg-1 {
    width: 200px;
    height: 110px;
    margin-right: 40px;
  }
}
.radio-select {
  padding: 0px 20px 20px;
}
.el-textarea {
  width: 50%;
}

.foot {
  height: 16px;
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

.xuan-2-9 {
  .xuan-2-9-1 {
    margin-bottom: 20px;
    display: flex;
    .radio1 {
      .el-radio {
        width: 100%;
        margin: 10px 0;
      }
      .el-radio + .el-radio {
        margin: 10px 0;
      }
    }
  }
}

.el-radio span {
  user-select: text;
}

.xuan-2-1 {
  padding: 10px 20px !important;
  .xuan-2-1-1 {
    width: 100%;
    display: flex;
    padding-top: 10px;
    padding-bottom: 20px;
    .xuan-2-1-1-1 {
      width: 45%;
      @include p-span;
      p {
        margin: 20px;
      }
    }
    .xuan-2-1-2-2 {
      width: 10%;
      display: flex;
      align-items: center;
      p {
        line-height: 20px;
      }
    }
    .xuan-2-1-1-2 {
      width: 60%;
      padding-left: 20px;
      .xuan-2-1-1-22 {
        display: flex;
        margin: 0 0 10px;
        @include p-span;
        p {
          width: 33%;
        }
      }
      .xuan-2-1-1-50 {
        p {
          width: 50%;
        }
      }
    }
    .xuan-2-1-1-3 {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  .xuan-2-1-2 {
    width: 100%;
    .xuan-2-1-2-1 {
      margin: 20px 20px;
      display: flex;
      align-items: center;
      @include p-span;
      p {
        font-size: 14px;
        padding-right: 20px;
      }
      .tooltip {
        width: 15px;
        height: 15px;
        img {
          display: block;
        }
      }
    }
    .xuan-2-1-2-2 {
      margin: 20px 20px;
      display: flex;
      align-items: center;
      span {
        margin: 0 10px;
      }
      @include p-span;

      .tooltip {
        width: 15px;
        height: 15px;
        img {
          display: block;
        }
      }
    }
  }
  .idimgbox {
    width: 30%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    // align-content: flex-start;
    .idimg {
      width: 200px;
      height: 150px;
    }
  }
}
.publicName {
  display: inline-block;
  width: 180px;
  margin-right: 30px;
}
.publicPhone {
  display: inline-block;
  width: 220px;
  margin-right: 30px;
}
.publicButton {
  display: inline-block;
  width: 130px;
}
</style>
