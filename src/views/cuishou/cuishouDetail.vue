<template>
  <div class="public_main" v-if="data">
    <div class="crumbs" v-if="type==1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('operationList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/myCollectionOrderList'}">{{$t('operationList.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.orderDetail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="type==2">
      
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
      <div class="crumbs" v-else>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/inTheRushOrders'}">{{$t('loanAfterManage.crumbsTwo')}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$t('loanMoney.orderDetail')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    

    <!-- ------------ 用户信息、借款信息开始------------------------ -->
    <div class="tabs mb20">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active1==value.id}" @click="active1=value.id">
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
        <li  v-if="active1==1">
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
            <p><span>{{$t('public.no2')}}:</span>
              <span>{{data.collectionInfo.idCard | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.birthday')}}:</span>
              <span>{{data.orderUserSelf.birthday | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour" v-if="$store.state.common.lang==='vi'">
            <p><span>{{$t('public.no18')}}:</span>
              <span>{{data.collectionInfo.userPhone}}</span>
            </p>
            <p >
              <span>{{$t('yuenan.no23')}}:</span>
              <span>{{$store.getters.vn_phone(data.collectionInfo.userPhone)}}</span>
            </p>
            <p >
              <span>{{$t('yuenan.no25')}}:</span>
              <span>{{data.orderUserSelf.alternativePhone | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p >
              <span>{{$t('new.no56')}}:</span>
              <span>{{$store.getters.getAge(data.orderUserSelf.birthday)}}</span>
            </p>
            <p><span>{{$t('public.sex')}}:</span>
              <span>{{$t($store.getters.sexStatus(data.orderUserSelf.sex))}}</span>
            </p>
            <p><span>{{$t('public.no3')}}:</span>
              <span>{{$t($store.getters.marriage(data.orderUserSelf.marriage))}}</span> 
            </p>
            <p><span>{{$t('public.no4')}}:</span>
              <span>{{$t($store.getters.birthState(data.orderUserSelf.bear))}}</span>
            </p>
          </div> 
          <div class="oneLineHasFour" v-if="$store.state.common.lang=='id'">
            <p v-if="$store.state.common.lang==='id'">
              <span>{{$t('yn.no27')}}:</span>
              <span>{{data.orderUserWork.payDate | dataIsTrue}}</span>
            </p>
            <p ><span>{{$t('public.no12')}}:</span>
              <span>{{data.orderUserWork.companyPhone | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no9')}}:</span>
              <span>{{data.orderUserWork.company | dataIsTrue}}</span>
            </p>
            <p><span>Email:</span>
              <span>{{data.orderUserSelf.email | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasTwo">
            <p><span>{{$t('operationDetail.no1')}}:</span>
              <span>{{data.orderUserIdcard.ocrAddress | dataIsTrue}}</span>
            </p>
            <p v-if="$store.state.common.lang==='vi'">
              <span>faceBook:</span> 
              <span @click="openWindow(data.orderFacebook.fblink)" class="td-ul">{{data.orderFacebook.fblink | dataIsTrue}}</span>
            </p>
          </div> 
          <div class="oneLineHasOne">
            <p >
              <span>{{$t('public.no6')}}:</span>
              <span>{{data.orderUserSelf.liveAddress | dataIsTrue}}</span>
            </p>
          </div> 
          <div class="loansTypeImg">
            <span>{{$t('pic.no1')}}:</span>
            <template >
              <div v-if="data.orderUserIdcard.idcardPhotoUrl" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.orderUserIdcard.idcardPhotoUrl})">
                <img :src="data.orderUserIdcard.idcardPhotoUrl">
              </div>
              <div v-else class="loansTypeImg-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no2')}}:</span>
            <template >
              <div v-if="data.orderUserIdcard.facetimePhotoUrl" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.orderUserIdcard.facetimePhotoUrl})">
                <img :src="data.orderUserIdcard.facetimePhotoUrl">
              </div>
              <div v-else class="loansTypeImg-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no3')}}:</span>
            <template >
              <div v-if="data.orderUserWork.incomePicUrl" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.orderUserWork.incomePicUrl})">
                <img :src="data.orderUserWork.incomePicUrl">
              </div>
              <div v-else class="loansTypeImg-1 pic" >
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
            <p v-if="$store.state.common.lang==='id'">
              <span>{{$t('yn.no28')}}:</span>
              <span>{{$t($store.getters.loanUse_status(data.orderExtra.loanUse))}}</span>
            </p>
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
        <div v-if="data.webInfo.onePicUrlStr" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.webInfo.onePicUrlStr})">
          <img :src="data.webInfo.onePicUrlStr"  :alt="$t('websiteLoans.no9')">
        </div>
        <div v-if="data.webInfo.twoPicUrlStr" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.webInfo.twoPicUrlStr})">
          <img :src="data.webInfo.twoPicUrlStr"  :alt="$t('websiteLoans.no9')">
        </div>
        <div v-if="data.webInfo.threePicUrlStr" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.webInfo.threePicUrlStr})">
          <img :src="data.webInfo.threePicUrlStr"  :alt="$t('websiteLoans.no9')">
        </div>
      </div>
    </template>
    
    <!-- ------------  电话审核记录栏  ------------------------ -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('new.no58')}}</p>
        </div>
      </el-col>
    </el-row>
    <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
      <tr>
        <th width="15%">{{$t('new.no59')}}</th>
        <th width="15%">{{$t('public.no39')}}</th>
        <th width="15%">{{$t('public.no40')}}</th>
        <th width="40%">{{$t('public.no37')}}</th>
        <th width="15%">{{$t('loanMoneyDetail.opeTime')}}</th>
      </tr>
      <template v-if="phoneAuditLogTwo">
        <tr v-for="value in phoneAuditLogTwo" :key="value.id">
          <td >{{value.approveStage==1?$t('myAuditList.no5'):value.approveStage==2?$t('myAuditList.no9'):''}}</td>
          <td>{{value.userName | dataIsTrue}}</td>
          <td>{{$t($store.getters.tel_through(value.connectStatus))}}</td>
          <td>{{value.remark | dataIsTrue}}</td>
          <td>{{value.strFirstApproveTime | dataIsTrue}}</td>
        </tr>
      </template>
      <template v-else>
        <div style="textAlign:center;width:660%;height:40px;lineHeight:40px">
          {{$t('public.no23')}}
        </div>
      </template>
    </table>
    <div class="foot"></div>

    <!-- ------------ 催收记录、紧急联系人、通话联系人开始------------------------ -->
    <div class="tabs">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr2" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
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
            <template v-if="data.orderUrgentContact!==null&&data.orderUrgentContact!==undefined&&data.orderUrgentContact!=''">
              <el-radio-group v-model="emeContact" class="radio1">
                <el-radio v-for="(item,index) in data.orderUrgentContact" :key="index" :label="item.contactName+','+item.contactRelation+','+item.contactPhone">
                  <span>{{$t('public.name')}}：{{item.contactName}}</span>
                  <span style="margin:0 20px;">{{$t('operationDetail.no13')}}:{{item.contactPhone}}</span>
                  <span class="mg5">{{$t('operationDetail.no14')}}:{{item.contactCnt?item.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
                  <span class="mg5">{{$t('new.no57')}}:{{item.keepTime?item.keepTime:0}}s </span>
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
            <div class="xuan-2-9-1" v-if="data.orderFacebook.friendOneFblink">
              <el-radio-group v-model="fbContact" class="radio1">
                <el-radio  :label="data.orderFacebook.friendOneName+','+'9'+','+data.orderFacebook.friendOnePhone">
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendOneName}}</span>
                  <span style="margin:0 10px;">{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendOnePhone}}</span>
                  <span >{{$t('yuenan.no33')}}:</span>
                  <span @click="openWindow(data.orderFacebook.friendOneFblink)" class="td-ul">
                    {{data.orderFacebook.friendOneFblink}}
                  </span>
                </el-radio>
                <el-radio  :label="data.orderFacebook.friendTwoName+','+'9'+','+data.orderFacebook.friendTwoPhone">
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendTwoName}}</span>
                  <span style="margin:0 10px;">{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendTwoPhone}}</span>
                  <span >{{$t('yuenan.no33')}}:</span>
                  <span @click="openWindow(data.orderFacebook.friendTwoFblink)" class="td-ul">
                    {{data.orderFacebook.friendTwoFblink}}
                  </span>
                </el-radio>
                <el-radio  :label="data.orderFacebook.friendThreeName+','+'9'+','+data.orderFacebook.friendThreePhone">
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendThreeName}}</span>
                  <span style="margin:0 10px;">{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendThreePhone}}</span>
                  <span >{{$t('yuenan.no33')}}:</span>
                  <span @click="openWindow(data.orderFacebook.friendThreeFblink)" class="td-ul">
                    {{data.orderFacebook.friendOneFblink}}
                  </span>
                </el-radio>
                <el-radio  :label="data.orderFacebook.friendFourName+','+'9'+','+data.orderFacebook.friendFourPhone">
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendFourName}}</span>
                  <span style="margin:0 10px;">{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendOFourPhone}}</span>
                  <span >{{$t('yuenan.no33')}}:</span>
                  <span @click="openWindow(data.orderFacebook.friendFourFblink)" class="td-ul">
                    {{data.orderFacebook.friendFourFblink}}
                  </span>
                </el-radio>
                <el-radio  :label="data.orderFacebook.friendFiveName+','+'9'+','+data.orderFacebook.friendFivePhone">
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendFiveName}}</span>
                  <span style="margin:0 10px;">{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendFivePhone}}</span>
                  <span >{{$t('yuenan.no33')}}:</span>
                  <span @click="openWindow(data.orderFacebook.friendFiveFblink)" class="td-ul">
                    {{data.orderFacebook.friendFiveFblink}}
                  </span>
                </el-radio>
              </el-radio-group>
            </div>
            <div v-else style="padding:0 30px">
              {{$t('public.no23')}}
            </div>
          </template>
          
        </li>
        <!-- ------------ 通话联系人开始------------------------ -->
        <li  v-if="active2==3">
          <div class="xuan-2-3-1">
            <address-list :get-address="getLinkMan" :order-no="orderNo"></address-list>
          </div>
        </li>
        <!-- ------------ 公司电话开始 ------------------------ -->
        <li class="xuan-2-9" v-if="active2==4">
          <div class="xuan-2-9-1">
            <template v-if="$store.state.common.lang==='vi'">
              <template v-if="data.companyContact!==null&&data.companyContact!==undefined&&data.companyContact!=''">
                <el-radio-group v-model="emeContact" class="radio1">
                  <el-radio  :label="data.companyContact.name+','+data.companyContact.relation+','+data.companyContact.phone">
                    <span>{{data.companyContact.name}}</span>
                    <span style="margin:0 20px;">{{data.companyContact.phone}}</span>
                    <span>{{data.companyContact.contactCnt?data.companyContact.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
                  </el-radio>
                </el-radio-group>
              </template>
              <div v-else style="padding:0 30px">
                {{$t('public.no23')}}
              </div>
            </template>
            <template v-else>
              <template v-if="data.companyContact!==null&&data.companyContact!==undefined&&data.companyContact!=''">
                <el-radio-group v-model="emeContact" class="radio1">
                  <el-radio  :label="data.companyContact.name+','+data.companyContact.relation+','+data.companyContact.phone">
                    <span>{{data.companyContact.name}}</span>
                    <span style="margin:0 20px;">{{data.companyContact.phone}}</span>
                    <span>{{data.companyContact.contactCnt?data.companyContact.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
                  </el-radio>
                </el-radio-group>
              </template>
              <template v-else-if="data.orderUserWork.companyPhone!==null&&data.orderUserWork.companyPhone!==undefined&&data.orderUserWork.companyPhone!=''">
                <el-radio-group v-model="emeContact" class="radio1">
                  <el-radio :label="data.orderUserWork.company+','+98+','+data.orderUserWork.companyPhone">
                    <span>{{data.orderUserWork.company}}</span>
                    <span style="margin:0 20px;">{{data.orderUserWork.companyPhone}}</span>
                    <span>0{{$t('operationDetail.no15')}}</span>
                  </el-radio>
                </el-radio-group>
              </template>
              <div v-else style="padding:0 30px">
                {{$t('public.no23')}}
              </div>
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
          <audit-record type="1" :orderId="data.orderInfo.id"></audit-record>
        </li>
        <!-- ------------ 催收录音开始 ------------------------ -->
        <li v-if="active2==7&&$store.state.common.lang==='id'">
          <audit-record type="2" :orderId="data.orderInfo.id"></audit-record>
        </li>
      </ul>
    </div>
    <div class="foot"></div>
    <!-- ------------ 电话催收、短信催收开始------------------------ -->
    <div class="tabs" v-if="type==1">
      <ul class="tabs_title">
       <li v-for="(value,index) in arr3" :key="index" :class="{active:active3==value.id}" @click="active3=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <!-- --------------- 电话催收开始 ------------------------ -->
        <li  v-if="active3==1">
          <el-button 
            v-if="$store.state.common.lang==='id'" 
            style="margin:0 0 16px 30px;" 
            @click="openTelWindow"
            >
            {{$t('yn.no46')}}
          </el-button>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item :label="$t('operationDetail.no23')" prop="status">
              <el-select v-model="ruleForm.status" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
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
                      v-model="ruleForm.promiseTime">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </template>
            
            <el-form-item :label="$t('public.no38')">
              <el-input type="textarea" v-model="ruleForm.remark" :rows="4"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{$t('operationDetail.no22')}}</el-button>
            </el-form-item>
          </el-form>
        </li>
        <!-- --------------- 短信催收开始------------------------ -->
        <li  v-if="active3==2">
          <div class="xuan-2-2-1">
            <template v-if="data.collectionSmsTemplateList">
              <el-radio-group v-model="noteSel" class="radio1">
                <el-radio v-for="(item,index) in data.collectionSmsTemplateList" :key="index" :label="item.id">
                  <span style="word-break:break-all">{{item.content}}</span>
                </el-radio>
              </el-radio-group>
            </template>
            <div v-else style="padding:0 30px">
              {{$t('public.no23')}}
            </div>
          </div>
          <el-row type="flex" justify="center">
            <el-col :span="3">
              <el-button type="primary" @click="noteSubmit">{{$t('operationDetail.no25')}}</el-button>
            </el-col>
          </el-row>
        </li>
        <!-- --------------- 特权申请开始------------------------ -->
        <li  v-if="active3==3">
          <template v-if="data.partialShow=='1'||data.overCouponShow=='1'">
            <div class="radio-select">
              <template>
                <el-radio v-if="data.overCouponShow=='1'" v-model="radio" label="1" border>{{$t('new.no61')}}</el-radio>
                <el-radio v-if="data.partialShow=='1'" v-model="radio" label="2" border>{{$t('new.no60')}}</el-radio>
              </template>
            </div>
            <div class="part" v-if="radio=='2'&&data.partialShow=='1'">
              <el-form :model="part" :rules="rules" ref="ruleForm1" size="medium" label-width="120px">
                <el-form-item :label="$t('new.no62')" prop="money">
                  <el-input v-model="part.money" size="medium" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item :label="$t('loanAfterManage.payType')" prop="type">
                  <el-select v-model="part.type" :placeholder="$t('public.placeholder')">
                    <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
                  </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('public.backMoneyDate')" required>
                  <el-col :span="11">
                    <el-form-item >
                      <el-date-picker
                        v-model="part.time"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        :placeholder="$t('public.backMoneyDate')">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item :label="$t('public.no37')">
                  <el-input type="textarea" v-model="part.remark" :rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="partSubmit('ruleForm1')">{{$t('operationDetail.no22')}}</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="part" v-if="radio=='1'&&data.overCouponShow=='1'">
              <el-form :model="remission" :rules="rules" ref="ruleForm2" size="medium" label-width="120px" class="demo-ruleForm">
                <el-form-item :label="$t('new.no63')" prop="money">
                  <el-input v-model="remission.money" size="medium" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item :label="$t('filter.usedDate')" required >
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
                        :end-placeholder="$t('public.endTime')">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item :label="$t('public.no37')">
                  <el-input type="textarea" v-model="remission.remark" :rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="remissionSubmit('ruleForm2')">{{$t('operationDetail.no22')}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>
          <p v-else>{{$t('new.no64')}}</p>
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
import auditRecord from '../../components/component/auditRecord'

export default {
  name: 'Detail',
  components: {
    appLightbox,
    cuishouList,
    groupBusyResult,
    auditRecord,
    addressList
  },
  data () {
    return {
      sessionid: '',
      collectionId: '', // 传过来的催收ID
      orderNo: '', // 传过来的订单编号
      type: '', // 传过来的订单编号
      lightBoxToggle: false, // 图片放大显示层开关
      flag: true,
      // arr1:['用户信息','借款信息'],// 第一个选项卡
      active1: 1, // 第一个选项卡当前选中项
      // arr2:['催收记录','紧急联系人','通话联系人'],// 第二个选项卡
      active2: 1, // 第二个选项卡当前选中项
      // arr3:['电话催收','短信催收'],// 第三个选项卡
      active3: 1, // 第三个选项卡当前选中项
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
        collectionSmsTemplateList: [{id:1,content:'213213'}], // 短信模版
        collectionRecordList: '', // 催收记录列表
        orderUrgentContact: '', // 紧急联系人列表
        companyContact: '',// 紧急联系人列表
        orderFacebook:'',
        orderPhoneApprove:'',
        partialShow:'',
        overCouponShow:'',
        webInfo:'',
      },
      emeContact: '', // 紧急联系人选中项
      fbContact: '', // FB联系人选中项
      contact: '', // 通话记录联系人选中项
      ruleForm: {// 电话催收模块
        contactName: '',
        contactPhone: '',
        relation: '',
        status: '',
        promise: '',
        promiseTime: '',
        remark: ''
      },
      options1: this.$store.state.options.collection_option_submit, // 电话接通状态下拉选框信息
      options2: this.$store.state.options.channelAll_option, // 还款方式下拉选框信息
      rules: {// 电话催收表单验证项
        status: [
          { required: true, message: this.$t('operationDetail.no20'), trigger: 'change' }
        ],
        type: [
          { required: true, message: this.$t('operationDetail.no20'), trigger: 'change' }
        ],
        promise: [
          { required: true, message: this.$t('operationDetail.no21'), trigger: 'change' }
        ],
        money:[
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        time: [
          { type: 'date', required: true, message: this.$t('public.placeholder'), trigger: 'change' }
        ],
      },
      noteSel: '',// 短信催收列表选中项
      radio: '1',// 特权申请选中项
      part:{// 部分还款表单
        money:'',
        time:[],
        type:'',
        remark:'',
      },
      remission:{// 减免表单
        money:'',
        time:[],
        remark:'',
      },
      phoneAuditLog:'',
      phoneAuditLogTwo:'',
      telHref:'',
      telTip:false,
      from:'',// 从哪个页面打开的
    }
  },
  computed: {
    arr1 () {
      return [
        {id: 1, title: this.$t('operationDetail.tab1.no1'), black: this.data.userBase.isBlack},
        {id: 2, title: this.$t('operationDetail.tab1.no2')}
      ]
    },
    arr2 () {
      let arr = [
        {id: 1, title: this.$t('operationDetail.tab2.no1')},
        {id: 2, title: this.$t('operationDetail.tab2.no2')},
        {id: 3, title: this.$t('operationDetail.tab2.no3')},
        {id: 4, title: this.$t('public.no12')},
        {id: 5, title: this.$t('new.no93')}
      ];
      if(this.$store.state.common.lang==='id'){
        if(this.$store.state.common.permiss.includes('RIGHT_COLLECT_ME_ELECTRIC_RECORDING')){
          arr.push({id: 6, title: this.$t('yn.no35')})
        }
        if(this.$store.state.common.permiss.includes('RIGHT_COLLECT_ME_COLLECTION_RECORDING')){
          arr.push({id: 7, title: this.$t('yn.no30')})
        }
      }
      return  arr;
    },
    arr3 () {
      return [
        {id: 1, title: this.$t('operationDetail.tab3.no1')},
        {id: 2, title: this.$t('operationDetail.tab3.no2')},
        {id: 3, title: this.$t('operationDetail.tab3.no3')},
      ]
    }
  },
  methods: {
    openBox: function (obj) { // 图片放大显示
      this.currentObj = obj;
      this.lightBoxToggle = !this.lightBoxToggle;
    },
    closeBox: function () { // 图片放大关闭
      this.lightBoxToggle = false;
    },
    detail () { // 获取详情页数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.myOperation_detail,
          'sessionid': this.sessionid
        },
        'orderNo': this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.data.orderLending = res.data.data.orderLending;
          this.data.orderUserWork = res.data.data.orderUserWork;
          this.data.orderUserContactList = res.data.data.orderUserContactList;
          this.data.orderUserIdcard = res.data.data.orderUserIdcard;
          this.data.collectionInfo = res.data.data.collectionInfo;
          this.data.orderInfo = res.data.data.orderInfo;
          this.data.userBase = res.data.data.userBase;
          this.data.orderExtra = res.data.data.orderExtra;
          this.data.orderUserSelf = res.data.data.orderUserSelf;
          this.data.collectionRecordList = res.data.data.collectionRecordList;
          this.data.orderUrgentContact = res.data.data.orderUrgentContact;
          this.data.companyContact = res.data.data.companyContact;
          this.data.partialShow = res.data.data.partialShow;
          this.data.overCouponShow = res.data.data.overCouponShow;
          this.data.webInfo = res.data.data.webInfo;
          this.data.orderFacebook = res.data.data.orderFacebook;
          this.telAuditLogTwo('2');
        } else {
          this.data = []
        }
      })
    },
    submitForm (formName) { // 电话催收提交操作
      // 判断联系人字段是否填写
      if(this.$store.state.common.lang==='vi'){
        if (this.emeContact === '' && this.contact === ''&&this.fbContact === '') {
          this.$globalMsg.error(this.$t('operationDetail.no28'));
          return
        }
      }else{
        if (this.emeContact === '' && this.contact === '') {
          this.$globalMsg.error(this.$t('operationDetail.no28'));
          return
        }
      }
      // 然后表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.promise == 1 && this.ruleForm.promiseTime == '') {
            this.$globalMsg.error(this.$t('operationDetail.no27'));
            return
          }
          if (this.flag) {
            this.flag = false
            let option = {
              header: {
                ...this.$base,
                action: this.$store.state.actionMap.telOperation_submit,
                sessionid: this.sessionid
              },
              orderNo: this.orderNo,
              type: '1',
              ...this.ruleForm
            }
            this.$axios.post('', option).then(res => {
              this.flag = true
              if (res.data.header.code == 0) {
                this.$globalMsg.success(this.$t('message.success'));
                setTimeout(() => {
                  this.$router.push('/myCollectionOrderList');
                }, 1000)
              } else {
                this.$globalMsg.error(res.data.header.msg);
              }
              this.emeContact = '';
              this.contact = '';
              this.ruleForm.remark = '';
              this.ruleForm.status = '';
              this.ruleForm.promiseTime = '';
            })
          }
        } else {
          return false;
        }
      })
    },
    noteSubmit () { // 短信模版发送
      if (this.emeContact === '' && this.contact === '') {
        this.$globalMsg.error(this.$t('operationDetail.no28'));
        return
      }
      if (this.noteSel === '') {
        this.$globalMsg.error(this.$t('operationDetail.no29'));
        return
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
          type: '2',
          contactName: this.ruleForm.contactName,
          contactPhone: this.ruleForm.contactPhone,
          relation: this.ruleForm.relation,
          smsDemoId: this.noteSel
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
            setTimeout(() => {
              this.$router.push('/cuishoudetail');
            }, 1000)
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.emeContact = '';
          this.contact = '';
          this.noteSel = '';
        })
      }
    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1)
    },
    getLinkMan (val) {
      this.contact = val
    },
    remissionSubmit(){// 逾期减免提交
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.cuishou_remission,
            sessionid: this.sessionid
          },
          orderId: this.data.orderUserSelf.orderId,
          userId: this.data.orderUserSelf.userId,
          operating: "1",
          effectiveTimeBegin: this.remission.time?this.remission.time[0]:'',
          effectiveTimeEnd: this.remission.time?this.remission.time[1]:'',
          couponAmount: this.remission.money,
          remark: this.remission.remark
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.remission.money='';
          this.remission.time=[];
          this.remission.remark='';
        })
      }
    },
    partSubmit(){// 部分还款提交
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.cuishou_part,
            sessionid: this.sessionid
          },
          orderId: this.data.orderUserSelf.orderId,
          userId: this.data.orderUserSelf.userId,
          operating: "1",
          committedRepaymentTime: this.part.time?this.part.time:'',
          couponAmount: this.part.money,
          payType: this.part.type,
          channel: 'bluepay',
          remark: this.part.remark
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.part.money='';
          this.part.time=[];
          this.part.remark='';
          this.part.type='';
        })
      }
    },
    telAuditLogTwo(type){// 信审电话审核记录
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.telRecord_one,
          'sessionid': this.sessionid
        },
        approveType: type,
        orderNo: this.orderNo,
        adminId: this.data.orderUserSelf.userId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.phoneAuditLogTwo = res.data.data
        }
      })
    },
    openWindow(href){
      if(href){
        window.open(href);
      }
    },
    openTelWindow(){
      if (this.emeContact === '' && this.contact === '') {
        this.$globalMsg.error(this.$t('operationDetail.no28'))
        return
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.TELEPHONE0001,
          'sessionid': this.sessionid
        },
        orderId:this.orderId,
        phone:this.ruleForm.contactPhone,
        type:2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.telHref = 'sip:'+this.ruleForm.contactPhone+','+res.data.data;
          window.location.href = this.telHref;
        }else{
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    }
  },
  watch: {
    emeContact () {
      if (this.emeContact !== '') {
        this.contact = '';
        this.fbContact = '';
        let arr = String(this.emeContact).split(',');
        this.ruleForm.contactName = arr[0];
        this.ruleForm.relation = arr[1];
        this.ruleForm.contactPhone = arr[2];
      }
    },
    contact () {
      if (this.contact !== '') {
        this.emeContact = '';
        this.fbContact = '';
        let arr = String(this.contact).split(',');
        this.ruleForm.contactName = arr[0];
        this.ruleForm.relation = arr[1];
        this.ruleForm.contactPhone = arr[2];
      }
    },
    fbContact () {
      if (this.fbContact !== '') {
        this.emeContact = '';
        this.contact = '';
        let arr = String(this.fbContact).split(',');
        this.ruleForm.contactName = arr[0];
        this.ruleForm.relation = arr[1];
        this.ruleForm.contactPhone = arr[2];
      }
    },
    'ruleForm.promise' () {
      if (this.ruleForm.promise === -1) {
        this.ruleForm.promiseTime = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.orderNo = this.$route.query.orderNo;
    this.orderId = this.$route.query.orderId;
    this.type = this.$route.query.type;
    this.from = this.$route.query.from;
    this.detail();
    
  }
}
</script>
<style scoped lang="scss">

.loansTypeImg{
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: 15px;
  padding-top: 10px;
  .loansTypeImg-1{
    width: 200px;
    height: 110px;
    margin-right: 40px;
  }
}
.radio-select{
  padding:0px 20px 20px;
}
.el-textarea{
  width: 50%;
}

.foot{
  height: 16px;
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

.el-radio span{
  user-select: text;
}


</style>
