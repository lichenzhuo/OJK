<template>
  <div class="public_main" v-if="data">
    <div class="crumbs" v-if="type==1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/myovedateremind'}">{{$t('serviceManage.crumbsThree')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('serviceManage.telNotice')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-if="type==2">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/nobackOrderList'}">{{$t('serviceManage.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('serviceManage.telNotice')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------ 用户信息、借款信息开始------------------------ -->
    <div class="tabs">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active1==value.id}" @click="active1=value.id">
          <span>{{value.title}}</span>
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
            <p >
              <span>{{$t('new.no55')}}:</span>
              <span>{{data.userSelf.whatsAPP | dataIsTrue}}</span>
            </p>
            <p v-if="$store.state.common.lang==='PHL'"><span>{{$t('loanAfterManage.paycode')}}:</span>
              <span>{{data.order.contractNo | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.userId')}}:</span>
              <span>{{data.userSelf.userId | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no1')}}:</span>
              <span>{{data.userBase.name | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no18')}}:</span>
              <span>{{data.userBase.phone | dataIsTrue}}</span>
            </p>
            <template v-if="$store.state.common.lang=='id'">
              <p><span>{{$t('public.no4')}}:</span>
                <span>{{$t($store.getters.birthState(data.userSelf.bear))}}</span>
              </p>
            </template>
            <template v-if="$store.state.common.lang=='PHL'">
              <p><span>facebook:</span>
                <span>{{data.userSelf.facebook | dataIsTrue}}</span>
              </p>
            </template>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.no2')}}:</span>
              <span>{{data.order.idCard | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.birthday')}}:</span>
              <span>{{data.userSelf.birthday | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no3')}}:</span>
              <span>{{$t($store.getters.marriage(data.userSelf.marriage))}}</span>
            </p>
            <p><span>{{$t('public.sex')}}:</span>
              <span>{{$t($store.getters.sexStatus(data.userSelf.sex))}}</span>
            </p>
          </div>
          <div class="oneLineHasFour" v-if="$store.state.common.lang==='vi'">
            <p >
              <span>{{$t('yuenan.no23')}}:</span>
              <span>{{$store.getters.vn_phone(data.userBase.phone)}}</span>
            </p>
            <p >
              <span>{{$t('yuenan.no25')}}:</span>
              <span>{{data.userSelf.alternativePhone}}</span>
            </p>
            <!-- <p><span>{{$t('websiteLoans.no5')}}:</span>
              <span>{{$t($store.getters.loanTypeState(data.order.orderLoanType))}}</span>
            </p> -->
            <p><span>E-mail:</span>
              <span>{{data.userBank.email}}</span>
            </p>
          </div>
          <div class="oneLineHasOne" v-if="$store.state.common.lang=='id'">
            <p><span>{{$t('operationDetail.no1')}}:</span>
              <span>{{data.userIdcard.ocrAddress | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasOne">
            <p><span>{{$t('public.no6')}}:</span>
              <span>{{data.userSelf.liveAddress | dataIsTrue}}</span>
            </p>
          </div> 
          <div class="oneLineHasFour">
            <p><span>{{$t('public.no9')}}:</span>
              <span>{{data.userWork.company | dataIsTrue}}</span>
            </p>
          </div> 
          <div class="xuan-2-2-2">
            <span>{{$t('pic.no1')}}:</span>
            <template >
              <div v-if="data.userIdcard.idcardPhotoUrl" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.userIdcard.idcardPhotoUrl})">
                <img :src="data.userIdcard.idcardPhotoUrl"  :alt="$t('pic.no1')" :title="$t('pic.no1')">
              </div>
              <div v-else class="xuan-2-2-2-1 pic" >
                <img src="../../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no2')}}:</span>
            <template >
              <div v-if="data.userIdcard.facetimePhotoUrl" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.userIdcard.facetimePhotoUrl})">
                <img :src="data.userIdcard.facetimePhotoUrl"  :alt="$t('pic.no2')" :title="$t('pic.no2')">
              </div>
              <div v-else class="xuan-2-2-2-1 pic" >
                <img src="../../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no3')}}:</span>
            <template >
              <div v-if="data.userWork.incomePicUrl" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                <img :src="data.userWork.incomePicUrl"  :alt="$t('pic.no2')" :title="$t('pic.no2')">
              </div>
              <div v-else class="xuan-2-2-2-1 pic" >
                <img src="../../../assets/img/null.png">
              </div>
            </template>
          </div>
        </li>
        <li  v-if="active1==2">
          <template v-if="$store.state.common.lang!=='PHL'">
            <div class="oneLineHasFour">
              <p><span>{{$t('new.no48')}}:</span>
                <span>{{data.orderExtra.appName | dataIsTrue}}</span>
              </p>
              <p style="width:50%"><span>{{$t('new.no49')}}:</span>
                <span>{{data.orderExtra.appPackage | dataIsTrue}}</span> 
              </p>
            </div>
            <div class="oneLineHasFour">
              <p><span>{{$t('operationDetail.no2')}}:</span>
                <span>{{data.order.id | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('public.no30')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.loanAmount)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
              <p><span>{{$t('public.no31')}}:</span>
                <span>{{data.order.productPeriod | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('operationDetail.no6')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.lendingAmount)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
            </div>
            <div class="oneLineHasFour">
              <p><span>{{$t('proManage.feeRate')}}:</span>
                <span>{{$store.getters.twoPoint(data.order.feeRate)}}</span>
              </p>
              <p><span>{{$t('loanMoneyDetail.feeAmount')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.feeAmount)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
              <p><span>{{$t('operationDetail.no4')}}:</span>
                <span>{{$store.getters.twoPoint(data.order.overdueInterestRate)}}</span>
              </p>
              <p><span>{{$t('operationDetail.no5')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.overdueInterest)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
            </div> 
            <div class="oneLineHasFour">
              <p><span>{{$t('public.no27')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.returnMoney)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
              <p><span>{{$t('public.no65')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.refundAmount)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
              <p><span>{{$t('public.CreateDate')}}:</span>
                <span>{{data.order.strCreateTime | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('public.no66')}}:</span>
                <span>{{data.order.strLastRefundTime | dataIsTrue}}</span>
              </p>
            </div> 
            <div class="oneLineHasFour">
              <p><span>{{$t('operationDetail.no3')}}:</span>
                <span>{{$store.getters.twoPoint(data.order.dayInterestRate)}}</span>
              </p>
              <p><span>{{$t('loanMoneyDetail.currentInterest')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.currentInterest)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
              <p><span>{{$t('public.no28')}}:</span>
                <span>{{data.order.overdueDays | dataIsTrue}}</span> 
              </p>
            </div> 
            <div class="oneLineHasFour">
              <p><span>{{$t('public.no58')}}:</span>
                <span>{{data.order.strLoanTime | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('public.CreateTime')}}:</span>
                <span>{{data.order.strMustRefundTime | dataIsTrue}}</span>
              </p>
               <p><span>剩余金额:</span>
                <span>{{data.order.strMustRefundTime | dataIsTrue}}</span>
              </p>
              <p><span>还款计划:</span>
                <span @click="showPlan" style="font-size:18px;color:red;cursor:pointer;">{{$t('public.no29')}}</span>
              </p>
            </div>
          </template>
          <template v-else>
            <div class="oneLineHasFour">
              <p><span>{{$t('operationDetail.no2')}}:</span>
                <span>{{data.order.id | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('public.no30')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.loanAmount)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
              <p><span>{{$t('public.no31')}}:</span>
                <span>{{data.order.productPeriod | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('operationDetail.no6')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.lendingAmount)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
            </div>
            <div class="oneLineHasFour">
              <p><span>{{$t('public.no27')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.returnMoney)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
              <p><span>{{$t('public.no65')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.refundAmount)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
              <p><span>{{$t('public.CreateDate')}}:</span>
                <span>{{data.order.strCreateTime | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('public.no66')}}:</span>
                <span>{{data.order.strLastRefundTime | dataIsTrue}}</span>
              </p>
            </div>
            <div class="oneLineHasFour">
              <p><span>{{$t('operationDetail.no5')}}:</span>
                <span>{{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.order.overdueInterest)}}
                  {{$store.state.common.vi_currency}}</span>
              </p>
              <p><span>{{$t('public.CreateTime')}}:</span>
                <span>{{data.order.strMustRefundTime | dataIsTrue}}</span>
              </p>
            </div>
            <div class="paixu mt15">
              <span></span>
              <p>{{$t('fei.no23')}}</p>
            </div>
            <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
              <tr>
                <th width="10%">{{$t('fei.no24')}}</th>
                <th width="12%">{{$t('public.no59')}}</th>
                <th width="12%">{{$t('public.no28')}}</th>
                <th width="12%">{{$t('fei.no25')}}</th>
                <th width="12%">{{$t('fei.no26')}}</th>
                <th width="14%">{{$t('public.no66')}}</th>
                <th width="14%">{{$t('fei.no27')}}</th>
                <th width="14%">{{$t('public.orderStatus')}}</th>
              </tr>
              <template v-if="data.orderInstalment">
                <tr v-for="value in data.orderInstalment" :key="value.id">
                  <td>{{value.instalmentOrder | dataIsTrue}}</td>
                  <td>{{value.strMustRefundTime | dataIsTrue}}</td>
                  <td>{{value.overdueDays | dataIsTrue}}</td>
                  <td>{{value.overdueInterest | dataIsTrue}}</td>
                  <td>{{value.returnMoney | dataIsTrue}}</td>
                  <td>{{value.strLastRefundTime | dataIsTrue}}</td>
                  <td>{{value.refundAmount | dataIsTrue}}</td>
                  <td>{{$t($store.getters.instalment_status(value.showStatus))}}</td>
                </tr>
              </template>
              <template v-else>
                <div style="textAlign:center;width:1000%;height:40px;lineHeight:40px">
                  {{$t('public.no23')}}
                </div>
              </template>
            </table>
          </template>
        </li>
      </ul>
    </div>

    <template v-if="$store.state.common.lang==='vi'&&data.order.orderLoanType!==1">
      <div class="paixu mt15 pb10">
        <span></span>
        <p>{{$t('websiteLoans.no9')}}:</p>
      </div>
      <div class="loansTypeImg">
        <template >
          <div v-if="data.webInfo.onePicUrlStr" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.webInfo.onePicUrlStr})">
            <img :src="data.webInfo.onePicUrlStr"  :alt="$t('websiteLoans.no9')">
          </div>
          <div v-if="data.webInfo.twoPicUrlStr" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.webInfo.twoPicUrlStr})">
            <img :src="data.webInfo.twoPicUrlStr"  :alt="$t('websiteLoans.no9')">
          </div>
          <div v-if="data.webInfo.threePicUrlStr" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.webInfo.threePicUrlStr})">
            <img :src="data.webInfo.threePicUrlStr"  :alt="$t('websiteLoans.no9')">
          </div>
        </template>
      </div>
    </template>
    
    <!-- ------------ 信审记录 ------------------------ -->
    <div class="paixu mt30">
      <span></span><p>{{$t('new.no58')}}</p>
    </div>
    <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
      <tr>
        <th width="10%">{{$t('new.no59')}}</th>
        <th width="10%">{{$t('public.no39')}}</th>
        <th width="10%">{{$t('public.userPhone')}}</th>
        <th width="10%">{{$t('public.no40')}}</th>
        <th width="35%">{{$t('public.no37')}}</th>
        <th width="25%">{{$t('loanMoneyDetail.opeTime')}}</th>
      </tr>
      <template v-if="auditTableData!=''">
        <tr v-for="value in auditTableData" :key="value.id">
          <td >{{value.approveStage==1?$t('myAuditList.no5'):value.approveStage==2?$t('myAuditList.no9'):''}}</td>
          <td>{{value.userName | dataIsTrue}}</td>
          <td>{{value.phone | dataIsTrue}}</td>
          <td>{{$t($store.getters.tel_through(value.connectStatus))}}</td>
          <td>{{value.remark | dataIsTrue}}</td>
          <td>{{value.strFirstApproveTime | dataIsTrue}}</td>
        </tr>
      </template>
      <template v-else>
        <div style="textAlign:center;width:1000%;height:40px;lineHeight:40px">
          {{$t('public.no23')}}
        </div>
      </template>
    </table>

    <div class="tabs mt15" >
      <ul class="tabs_title">
        <li v-for="(value,index) in arr4" :key="index" :class="{active:active4==value.id}" @click="active4=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <!-- ------------ 电话提醒历史记录 ------------------------ -->
        <li  v-if="active4==1">
          <table class="bank-table" style="table-layout:fixed;" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="10%">{{$t('serviceManage.index')}}</th>
              <th width="16%">{{$t('loanMoneyDetail.opePeople')}}</th>
              <th width="16%">{{$t('serviceManage.noticeTime')}}</th>
              <th width="10%">{{$t('serviceManage.telResult')}}</th>
              <th width="26%">{{$t('serviceManage.isno')}}</th>
              <th width="22%">{{$t('public.no37')}}</th>
            </tr>
            <template v-if="data.serviceRecordList!==null&&data.serviceRecordList!==undefined&&data.serviceRecordList!=''">
              <tr v-for="(value,index) in data.serviceRecordList" :key="index">
                <template>
                  <td >{{index+1}}</td>
                  <td>{{value.adminName | dataIsTrue}}</td>
                  <td>{{value.strCreateTime | dataIsTrue}}</td>
                  <td>{{$t($store.getters.myoveNoticeStatus(value.status))}}</td>
                  <td>{{value.promise==1?$t('loanMoney.isOverdue_options.no1')+';'+value.strPromiseTime.slice(0,10):$t('loanMoney.isOverdue_options.no2')}}</td>
                  <td>{{value.remark | dataIsTrue}}</td>
                </template>
              </tr>
            </template>
            <template v-else>
              <div style="textAlign:center;width:1000%;height:40px;lineHeight:40px">
                {{$t('public.no23')}}
              </div>
            </template>
          </table>
        </li>
        
        <li  v-if="active4==2">
          
        </li>
        <!-- ------------ 呼叫结果开始 ------------------------ -->
        <li  v-if="active4==3">
          <table class="bank-table" style="table-layout:fixed;" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="25%">{{$t('public.name')}}</th>
              <th width="10%">{{$t('public.no17')}}</th>
              <th width="10%">{{$t('public.no18')}}</th>
              <th width="25%">{{$t('new.no94')}}</th>
              <th width="10%">{{$t('new.no95')}}</th>
              <th width="10%">{{$t('new.no91')}}</th>
              <th width="10%">{{$t('new.no92')}}</th>
            </tr>
            <template v-if="tableData!=''">
              <tr v-for="(value,index) in tableData" :key="index">
                <td>{{value.name | dataIsTrue}}</td>
                <td>{{value.relationName | dataIsTrue}}</td>
                <td>{{value.phone | dataIsTrue}}</td>
                <td>{{value.strCallTime | dataIsTrue}}</td>
                <td >{{$t($store.getters.callStatus_status(value.status))}}</td>
                <td>{{value.duration | dataIsTrue}}s</td>
                <td >{{$t($store.getters.is_addressBook(value.isUrgentContact))}}</td>
              </tr>
            </template>
            <template v-else>
              <div style="textAlign:center;width:400%;height:40px;lineHeight:40px">
                {{$t('public.no23')}}
              </div>
            </template>
          </table>
        </li>
      </ul>
    </div>

    <!-- ------------ 催收记录、紧急联系人、通话联系人开始------------------------ -->
    <div class="tabs mt15" v-if="$store.state.common.lang!=='PHL'">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr2" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <li  v-if="active2==1">
          <div class="xuan-2-9-1">
            <template v-if="data.orderUrgentContact!==null&&data.orderUrgentContact!==undefined&&data.orderUrgentContact!=''">
              <el-radio-group v-model="emeContact" class="radio1">
                <el-radio v-for="(item,index) in data.orderUrgentContact" :key="index" :label="item.contactName+','+item.contactRelation+','+item.contactPhone">
                  <span>{{$t('public.name')}}：{{item.contactName}}</span>
                  <span style="margin:0 20px;">{{$t('operationDetail.no13')}}:{{item.contactPhone}}</span>
                  <span>{{$t('operationDetail.no14')}}:{{item.contactCnt?item.contactCnt:0}} {{$t('operationDetail.no15')}}</span>
                  <span style="margin-left:20px;">{{$t('new.no57')}}:{{item.keepTime?item.keepTime:0}}s </span>
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
                <el-radio v-if="data.orderFacebook.friendOneFblink"  :label="data.orderFacebook.friendOneName+','+'9'+','+data.orderFacebook.friendOnePhone">
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendOneName}}</span>
                  <span style="margin:0 10px;">{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendOnePhone}}</span>
                  <span >{{$t('yuenan.no33')}}:</span>
                  <span @click="openWindow(data.orderFacebook.friendOneFblink)" class="td-ul">
                    {{data.orderFacebook.friendOneFblink}}
                  </span>
                </el-radio>
                <el-radio v-if="data.orderFacebook.friendTwoFblink" :label="data.orderFacebook.friendTwoName+','+'9'+','+data.orderFacebook.friendTwoPhone">
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendTwoName}}</span>
                  <span style="margin:0 10px;">{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendTwoPhone}}</span>
                  <span >{{$t('yuenan.no33')}}:</span>
                  <span @click="openWindow(data.orderFacebook.friendTwoFblink)" class="td-ul">
                    {{data.orderFacebook.friendTwoFblink}}
                  </span>
                </el-radio>
                <el-radio v-if="data.orderFacebook.friendThreeFblink" :label="data.orderFacebook.friendThreeName+','+'9'+','+data.orderFacebook.friendThreePhone">
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendThreeName}}</span>
                  <span style="margin:0 10px;">{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendThreePhone}}</span>
                  <span >{{$t('yuenan.no33')}}:</span>
                  <span @click="openWindow(data.orderFacebook.friendThreeFblink)" class="td-ul">
                    {{data.orderFacebook.friendOneFblink}}
                  </span>
                </el-radio>
                <el-radio v-if="data.orderFacebook.friendFourFblink" :label="data.orderFacebook.friendFourName+','+'9'+','+data.orderFacebook.friendFourPhone">
                  <span>{{$t('public.name')}}：{{data.orderFacebook.friendFourName}}</span>
                  <span style="margin:0 10px;">{{$t('operationDetail.no13')}}:{{data.orderFacebook.friendOFourPhone}}</span>
                  <span >{{$t('yuenan.no33')}}:</span>
                  <span @click="openWindow(data.orderFacebook.friendFourFblink)" class="td-ul">
                    {{data.orderFacebook.friendFourFblink}}
                  </span>
                </el-radio>
                <el-radio v-if="data.orderFacebook.friendFiveFblink" :label="data.orderFacebook.friendFiveName+','+'9'+','+data.orderFacebook.friendFivePhone">
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
        <li  v-if="active2==2">
          <div class="xuan-2-3-1">
            <address-list :get-address="getLinkMan" :order-no="orderNo" :type='1'></address-list>
          </div>
        </li>
        <li  v-if="active2==3">
          <div class="xuan-2-9-1">
            <template v-if="data.userWork.companyPhone!==null&&data.userWork.companyPhone!==undefined&&data.userWork.companyPhone!=''">
              <el-radio-group v-model="emeContact" class="radio1">
                <el-radio :label="data.userWork.company+','+98+','+data.userWork.companyPhone">
                  <span>{{data.userWork.company}}</span>
                  <span style="margin:0 20px;">{{data.userWork.companyPhone}}</span>
                  <span>0{{$t('operationDetail.no15')}}</span>
                </el-radio>
              </el-radio-group>
            </template>
            <div v-else style="padding:0 30px">
              {{$t('public.no23')}}
            </div>
          </div>
        </li>
        <!------------------------ 用户信息 ---------------------------->
        <li class="xuan-2-1" v-if="active2==4">
          <!-- 第一行 -->
          <div class="paixu">
            <span></span>
            <p>{{$t('auditDetail.no2')}}</p>
          </div>
          <div class="xuan-2-1-1">
            <div class="xuan-2-1-1-2">
              <div class="xuan-2-1-1-22">
                  <p style="width:50%">
                    <span>{{$t('public.no1')}}:</span> <span>{{data.userBase.name | dataIsTrue}}</span> 
                  </p>
                  <p style="width:50%"><span>{{$t('public.no2')}}:</span> <span>{{data.order.idCard | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-1-22">
                  <p style="width:50%">
                    <span>{{$t('yuenan.no1')}}:</span> <span>{{data.userSelf.strIdCardAwardTime | dataIsTrue}}</span> 
                  </p>
                  <p style="width:50%"><span>{{$t('public.birthday')}}:</span> <span>{{data.userBase.birthday | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-1-22">
                  <p style="width:50%"><span>{{$t('yuenan.no2')}}:</span> 
                    <span>{{data.userSelf.liveProvinceName | dataIsTrue}}</span>
                  </p>
                  <p style="width:50%"><span>{{$t('yuenan.no3')}}:</span> 
                    <span>{{data.userSelf.liveCityName | dataIsTrue}}</span> 
                  </p>
              </div>
              <div class="xuan-2-1-1-22">
                  <p style="width:100%" ><span>{{$t('yuenan.no4')}}:</span> 
                    <span>{{data.userSelf.liveRegionName | dataIsTrue}}</span> 
                  </p>
              </div>
              <div class="xuan-2-1-1-22">
                  <p style="width:100%" ><span>{{$t('public.no7')}}:</span> <span>{{data.userSelf.liveAddress | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-1-22">
                  <p ><span style="color:red">{{$t('new.no51')}}:</span> <span style="color:red">{{data.loginCount | dataIsTrue}}</span> </p>
              </div>
              <div>
                <span>{{$t('add.no54')}}:</span>
                <span >{{$t($store.getters.idCardType_status(data.userIdcard.idcardType))}}</span>
              </div>
            </div>
            <div class="xuan-2-1-1-3">
              <div class="idimgbox">
                <template >
                  <div v-if="data.userIdcard.idcardPhotoUrl" class="idimg pic" @click="openBox({imgUrl:data.userIdcard.idcardPhotoUrl})">
                    <img :src="data.userIdcard.idcardPhotoUrl" :alt="$t('pic.no1')" :title="$t('pic.no1')">
                  </div>
                  
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png" :title="$t('pic.no1')">
                  </div>
                </template>
              </div>
              <div class="idimgbox">
                <template >
                  <div v-if="data.userIdcard.idcardPhotoReverseUrl" class="idimg pic" @click="openBox({imgUrl:data.userIdcard.idcardPhotoReverseUrl})">
                    <img :src="data.userIdcard.idcardPhotoReverseUrl" :alt="$t('pic.no4')" :title="$t('pic.no4')">
                  </div>
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png" :title="$t('pic.no4')">
                  </div>
                </template>
              </div>
              <div class="idimgbox">
                <template >
                  <div v-if="data.userIdcard.facetimePhotoUrl" class="idimg pic" @click="openBox({imgUrl:data.userIdcard.facetimePhotoUrl})">
                    <img :src="data.userIdcard.facetimePhotoUrl" :alt="$t('pic.no2')" :title="$t('pic.no2')">
                  </div>
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png" :title="$t('pic.no2')">
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- 第二行 -->
          <div class="paixu">
            <span></span><p>{{$t('auditDetail.no5')}}</p>
          </div>
          <div class="xuan-2-1-1">
            <div class="xuan-2-1-1-2">
              <div class="xuan-2-1-1-22">
                  <p><span>{{$t('public.no9')}}:</span> <span>{{data.userWork.company | dataIsTrue}}</span> </p>
                  <p><span>{{$t('public.no10')}}:</span> <span>{{data.userWork.strEntryTime | dataIsTrue}}</span> </p>
                  <p><span>{{$t('public.no13')}}:</span> <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.userWork.monthIncome)}}{{$store.state.common.vi_currency}}</span> </p>
              </div>
              <div class="xuan-2-1-1-22">
                  <p><span>{{$t('yuenan.no5')}}:</span> <span>{{data.userWork.industry | dataIsTrue}}</span> </p>
                  <p><span>{{$t('public.no12')}}:</span> <span>{{data.userWork.companyPhone | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-1-22">
                  <p><span>{{$t('yuenan.no6')}}:</span> <span>{{data.userWork.companyProvinceName | dataIsTrue}}</span> </p>
                  <p><span>{{$t('yuenan.no15')}}:</span> <span>{{data.userWork.companyCityName | dataIsTrue}}</span> </p>
                  <p><span>{{$t('yuenan.no7')}}:</span> <span>{{data.userWork.companyRegionName | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-1-22">
                  <p style="width:100%"><span>{{$t('public.no15')}}:</span> <span>{{data.userWork.companyAddress | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:100%"><span>{{$t('yuenan.no9')}}:</span> <span>{{data.order.orderAddress | dataIsTrue}}</span> </p>
              </div>
            </div>
            <div class="xuan-2-1-1-3">
              <div class="idimgbox">
                <template >
                  <div v-if="data.userWork.incomePicUrl!==null&&data.userWork.incomePicUrl!==undefined&&data.userWork.incomePicUrl!==''" class="idimg pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                    <img :src="data.userWork.incomePicUrl" :alt="$t('pic.no3')" :title="$t('pic.no3')">
                  </div>
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png">
                  </div>
                </template>
              </div>
            </div>
          </div>
        </li>
        <!------------------------ 账户记录信息 ---------------------------->
        <li class="xuan-2-1" v-if="active2==5">
          <!-- 第四行 -->
          <div class="paixu">
            <span></span><p>{{$t('yuenan.no10')}}</p>
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
            <template v-if="data.userBank!==null&&data.userBank!==undefined&&data.userBank!=''">
              <tr >
                  <td >{{data.userBank.bankType | dataIsTrue}}</td>
                  <td>{{data.userBank.bankType==='NganLuong'?'-':data.userBank.bankName}}</td>
                  <td>{{data.userBank.bankType==='NganLuong'?'-':data.userBank.bankAccount}}</td>
                  <td >{{data.userBank.cardFullname}}</td>
                  <td>{{data.userBank.email}}</td>
                  <td>{{data.userBank.strCreateTime}}</td>
                  <td>{{data.userBank.cardYear+'-'+data.userBank.cardMonth}}</td>
                  <td >{{data.userBank.status==1?$t('userDetail.bankId_status.no1'):$t('userDetail.bankId_status.no2')}}</td>
              </tr>
            </template>
            <template v-else>
              <div style="textAlign:center;width:500%;height:40px;lineHeight:40px">
                {{$t('public.no23')}}
              </div>
            </template>
          </table>
        </li>
        <!-- ------------ 客服录音开始 ------------------------ -->
        <li v-if="active2==8&&$store.state.common.lang==='id'">
          <audit-record :type="3" :orderId="orderId"></audit-record>
        </li>
      </ul>
    </div>
    

    <!-- ------------ 电话提醒操作开始------------------------ -->
    <div class="tabs mt15" v-if="type==1">
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
              <el-select size="small" v-model="ruleForm.status" :placeholder="$t('public.placeholder')">
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
            <el-form-item :label="$t('public.no38')" prop="remark">
              <el-input type="textarea" v-model="ruleForm.remark" :rows="4"></el-input>
            </el-form-item>
            <el-form-item>
              <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_SUBMIT')">
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('operationDetail.no22')}}</el-button>
              </template>
            </el-form-item>
          </el-form>
        </li>
      </ul>
    </div>


    <!------------------- 还款计划 ------------------------------>
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
import appLightbox from '../../../components/component/lightbox'// 图片点击放大组件
import addressList from '../../../components/component/address'// 通讯录列表组件
import auditRecord from '../../../components/component/auditRecord'// 通讯录列表组件
export default {
  name: 'telNoticeDetail',
  components: {
    appLightbox,
    addressList,
    auditRecord
  },
  data () {
    return {
      dialogPlanVisible:false,
      PlanData:[],
      sessionid: '',
      collectionId: '', // 传过来的催收ID
      orderNo: '', // 传过来的订单编号
      userId: '', // 传过来的订单编号
      orderId: '', // 传过来的订单编号
      type: '', // 传过来的来源,1的时候显示提交按钮
      overdueDays: '', // 传过来的逾期天数
      lightBoxToggle: false, // 图片放大显示层开关
      flag: true,
      // arr1:['用户信息','借款信息'],// 第一个选项卡
      active1: 1, // 第一个选项卡当前选中项
      // arr2:['催收记录','紧急联系人','通话联系人'],// 第二个选项卡
      active2: 1, // 第二个选项卡当前选中项
      // arr3:['电话催收','短信催收'],// 第三个选项卡
      active3: 1, // 第三个选项卡当前选中项
      active4: 1, // 第三个选项卡当前选中项
      data: {// 页面信息汇总
        userBase: '',
        orderExtra: '',
        userBank: '',
        userIdcard: '',
        userSelf: '',
        userWork: '',
        order: '',
        orderExtra: '',
        webInfo: '',
        orderInstalment: '',
        orderFacebook: '',
        serviceRecordList: '',
        orderUserContactList: '', // 通话记录联系人列表
        orderUrgentContact: '', // 紧急联系人列表
      },
      emeContact: '', // 紧急联系人选中项
      contact: '', // 通话记录联系人选中项
      fbContact: '', // FB联系人选中项
      ruleForm: {// 电话催收模块
        userName: '',
        userPhone: '',
        relation: '',
        status: '',
        promise: '',
        promiseTime: '',
        remark: ''
      },
      options1: this.$store.state.options.notice_option2, // 电话接通状态下拉选框信息
      rules: {// 电话催收表单验证项
        status: [
          { required: true, message: this.$t('operationDetail.no20'), trigger: 'change' }
        ],
        promise: [
          { required: true, message: this.$t('operationDetail.no21'), trigger: 'change' }
        ],
        remark: [
          { required: true, message: this.$t('loanMoney.placeholder'), trigger: 'blur' }
        ]
      },
      noteSel: '',// 短信催收列表选中项
      tableData: [],// 列表数据模拟
      auditTableData: []// 信审记录
    }
  },
  computed: {
    arr1 () {
      let arr = []
      if (this.$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_USER')) {
        arr.push({id: 1, title: this.$t('operationDetail.tab1.no1')})
      }
      if (this.$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_ORDER')) {
        arr.push({id: 2, title: this.$t('operationDetail.tab1.no2')})
      }
      return arr
    },
    arr2 () {
      let arr = [
        {id: 1, title: this.$t('operationDetail.tab2.no2')},
        {id: 2, title: this.$t('operationDetail.tab2.no3')},
        {id: 3, title: this.$t('public.no12')}
      ]
      if(this.$store.state.common.lang==='id'){
        if(this.$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_RECORDING')){
          arr.push({id: 8, title: this.$t('yn.no50')})
        }
      }
      if(this.$store.state.common.lang==='vi'){
        arr.push({id: 4, title: this.$t('tab2.no1')})
        arr.push({id: 5, title: this.$t('tab2.no5')})
      }
      return arr;
    },
    arr3 () {
      return [
        {id: 1, title: this.$t('serviceManage.telNoticeOperation')}
      ]
    },
    arr4 () {
      let arr = [
        {id: 1, title: this.$t('serviceManage.telNoticeHis')},
      ]
      if(this.$store.state.common.lang!=='PHL'){
        arr.push({id: 3, title: this.$t('new.no93')},)
      }
      return arr
    },

  },
  methods: {
    showPlan(e){
      // console.log(this.$route.query.orderNo)
      let option={
        header:{
          ...this.$base,
          action: this.$store.state.actionMap.OrderPlan,
          'sessionid': this.sessionid
        },
        orderNo:this.$route.query.orderNo
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
          action: this.$store.state.actionMap.kf_myOveDate_detail,
          'sessionid': this.sessionid
        },
        'orderNo': this.orderNo,
        'userId': this.userId
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
          this.data.serviceRecordList = res.data.data.serviceRecordList;
          this.data.orderUserContactList = res.data.data.orderUserContactList;
          this.data.orderUrgentContact = res.data.data.orderUrgentContact;
          this.data.webInfo = res.data.data.webInfo;
          this.data.orderFacebook = res.data.data.orderFacebook;
          this.data.orderInstalment = res.data.data.orderInstalment;
          this.data.orderExtra = res.data.data.orderExtra;
        } else {
          this.data = {}
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
      }
      if(this.$store.state.common.lang==='id'){
        if (this.emeContact === '' && this.contact === '') {
          this.$globalMsg.error(this.$t('operationDetail.no28'));
          return
        }
      }
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.promise == 1 && this.ruleForm.promiseTime == '') {
            this.$globalMsg.error(this.$t('operationDetail.no27'))
            return
          }
          if (this.flag) {
            this.flag = false;
            let option;
            if(this.$store.state.common.lang==='PHL'){
              option = {
                header: {
                  ...this.$base,
                  action: this.$store.state.actionMap.kf_myOveDate_detail_submit,
                  sessionid: this.sessionid
                },
                ...this.ruleForm,
                orderId: this.data.order.id,
                userName: this.data.userBase.name,
                userPhone: this.data.userBase.phone
              }
            }else{
              option = {
                header: {
                  ...this.$base,
                  action: this.$store.state.actionMap.kf_myOveDate_detail_submit,
                  sessionid: this.sessionid
                },
                orderId: this.data.order.id,
                ...this.ruleForm
              }
            }
            this.$axios.post('', option).then(res => {
              this.flag = true;
              if (res.data.header.code == 0) {
                this.$globalMsg.success(this.$t('message.success'));
                setTimeout(() => {
                  this.$router.push('/myovedateremind');
                }, 1000)
              } else {
                this.$globalMsg.error(res.data.header.msg);
              }
              // this.ruleForm.remark = '';
              // this.ruleForm.status = '';
              this.ruleForm.promiseTime = '';
              this.ruleForm.promise = '';
              this.$refs.ruleForm.resetFields();
            })
          }
        } else {
          return false;
        }
      })
    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1);
    },
    getLinkMan (val) {
      this.contact = val;
    },
    getTableList () { // 呼叫结果列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.MECOLLECTION00011,
          'page': {'index': 1, 'size': 10},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        type:3
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
        }
      })
    },
    openTelWindow(){
      if (this.emeContact === '' && this.contact === '') {
        this.$globalMsg.error(this.$t('operationDetail.no28'));
        return
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.TELEPHONE0001,
          'sessionid': this.sessionid
        },
        orderId:this.orderId,
        phone:this.ruleForm.userPhone,
        type:3
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.telHref = 'sip:'+this.ruleForm.userPhone+','+res.data.data;
          window.location.href = this.telHref;
        }else{
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    },
    openWindow(href){
      if(href){
        window.open(href);
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
        adminId: this.userId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.auditTableData = res.data.data
        }
      })
    },
  },
  watch: {
    'ruleForm.promise' () {
      if (this.ruleForm.promise === -1) {
        this.ruleForm.promiseTime = '';
      }
    },
    emeContact () {
      if (this.emeContact !== '') {
        this.contact = '';
        this.fbContact = '';
        let arr = String(this.emeContact).split(',');
        this.ruleForm.userName = arr[0];
        this.ruleForm.relation = arr[1];
        this.ruleForm.userPhone = arr[2];
      }
    },
    contact () {
      if (this.contact !== '') {
        this.emeContact = '';
        this.fbContact = '';
        let arr = String(this.contact).split(',');
        this.ruleForm.userName = arr[0];
        this.ruleForm.relation = arr[1];
        this.ruleForm.userPhone = arr[2];
      }
    },
    fbContact () {
      if (this.fbContact !== '') {
        this.emeContact = '';
        this.contact = '';
        let arr = String(this.fbContact).split(',');
        this.ruleForm.userName = arr[0];
        this.ruleForm.relation = arr[1];
        this.ruleForm.userPhone = arr[2];
      }
    },
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.orderNo = this.$route.query.orderNo
    this.userId = this.$route.query.userId
    this.orderId = this.$route.query.orderId
    // this.overdueDays = this.$route.query.overdueDays;
    this.type = this.$route.query.type
    this.detail()
    this.getTableList()
    this.telAuditLogTwo(0)
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
.xuan-2-9-1{
  margin-bottom: 20px;
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

.xuan-2-1{
  padding: 10px 20px !important;
  .xuan-2-1-1{
    width: 100%;
    display: flex;
    padding-top: 10px;
    padding-bottom: 20px;
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
      width: 60%;
      padding-left: 20px;
      .xuan-2-1-1-22{
        display: flex;
        margin: 0 0 10px;
        @include p-span;
        p{
          width: 33%;
        }
      }
      .xuan-2-1-1-50{
        p{
          width: 50%;
        }
      }
    }
    .xuan-2-1-1-3{
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
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
        font-size: 14px;
        padding-right: 20px;
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
    width: 30%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    // align-content: flex-start;
    .idimg{
      width: 200px;
      height: 150px;
    }
  }
}


</style>
