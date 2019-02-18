<template>
  <div class="usermanage" v-if="data">
    <div class="crumbs" v-if="type==1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('operationList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/wodecuishoudingdan'}">{{$t('operationList.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('operationList.crumbsThree')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-else>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/rucuidingdan'}">{{$t('loanAfterManage.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsThree')}}</el-breadcrumb-item>
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
              <span v-if="data.collectionInfo.userName!==null&&data.collectionInfo.userName!==undefined&&data.collectionInfo.userName!==''">{{data.orderUserSelf.name+' '+data.orderUserSelf.middleName+' '+data.orderUserSelf.surname}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <template>
              <p>{{$t('fei.loanId')}}:
                <span v-if="data.userBase.contractNo!==null&&data.userBase.contractNo!==undefined&&data.userBase.contractNo!==''">{{data.userBase.contractNo}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </template>
            <p>{{$t('public.no18')}}:
              <span v-if="data.collectionInfo.userPhone!==null&&data.collectionInfo.userPhone!==undefined&&data.collectionInfo.userPhone!==''">{{data.collectionInfo.userPhone}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div>
          <div class="xuan-2-2-1">
            <p>{{$t('public.birthday')}}:
              <span v-if="data.orderUserSelf.birthday!==null&&data.orderUserSelf.birthday!==undefined&&data.orderUserSelf.birthday!==''">{{data.orderUserSelf.birthday}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('public.no3')}}:
              <span v-if="data.orderUserSelf.marriage!==null&&data.orderUserSelf.marriage!==undefined&&data.orderUserSelf.marriage!==''">{{$t($store.getters.marriage(data.orderUserSelf.marriage))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('fei.id')}}:
              <span v-if="data.orderUserIdcard.idCard!==null&&data.orderUserIdcard.idCard!==undefined&&data.orderUserIdcard.idCard!==''">{{data.orderUserIdcard.idCard}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('fei.idType')}}:
              <span v-if="data.orderUserIdcard.strIdType!==null&&data.orderUserIdcard.strIdType!==undefined&&data.orderUserIdcard.strIdType!==''">{{data.orderUserIdcard.strIdType}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div> 
          <div class="xuan-2-2-1" >
            <p >
              {{$t('new.no56')}}:
              <span v-if="data.orderUserSelf.birthday!==null&&data.orderUserSelf.birthday!==undefined&&data.orderUserSelf.birthday!==''">{{$store.getters.getAge(data.orderUserSelf.birthday)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>{{$t('yuenan.no2')}}:
              <span v-if="data.orderUserSelf.liveProvinceName!==null&&data.orderUserSelf.liveProvinceName!==undefined&&data.orderUserSelf.liveProvinceName!==''">{{data.orderUserSelf.liveProvinceName}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <template>
              <p>{{$t('yuenan.no17')}}:
                <span v-if="data.orderUserSelf.liveCityName!==null&&data.orderUserSelf.liveCityName!==undefined&&data.orderUserSelf.liveCityName!==''">{{data.orderUserSelf.liveCityName}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </template>
            <p >{{$t('public.no9')}}:
              <span v-if="data.orderUserWork.company!==null&&data.orderUserWork.company!==undefined&&data.orderUserWork.company!==''">{{data.orderUserWork.company}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div> 
          <div class="xuan-2-2-1" >
            <p >
              Facebook:
              <span v-if="data.orderUserSelf.facebook!==null&&data.orderUserSelf.facebook!==undefined&&data.orderUserSelf.facebook!==''">{{data.orderUserSelf.facebook}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p >
              Email:
              <span v-if="data.orderUserSelf.email!==null&&data.orderUserSelf.email!==undefined&&data.orderUserSelf.email!==''">{{data.orderUserSelf.email}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div> 
          <div class="xuan-2-2-1">
            <p style="width:100%">{{$t('public.no6')}}:
              <span v-if="data.orderUserSelf.liveAddress!==null&&data.orderUserSelf.liveAddress!==undefined&&data.orderUserSelf.liveAddress!==''">{{data.orderUserSelf.liveAddress}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div> 
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
          <h3 style="margin:10px 0;">{{$t('fei.no11')}}</h3>
          <div class="xuan-2-2-2" v-if="data.pictureUrl!==''&&typeof data.pictureUrl==='string'" >
            <div v-if="data.pictureUrl" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.pictureUrl})">
              <img :src="data.pictureUrl" >
            </div>
          </div>
          <div class="xuan-2-2-2" v-else-if="typeof data.pictureUrl==='object'">
            <template >
              <div v-if="data.pictureUrl[0]" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.pictureUrl[0]})">
                <img :src="data.pictureUrl[0]" >
              </div>
            </template>
            <template >
              <div v-if="data.pictureUrl[1]" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.pictureUrl[1]})">
                <img :src="data.pictureUrl[1]" >
              </div>
            </template>
            <template >
              <div v-if="data.pictureUrl[2]" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:data.pictureUrl[2]})">
                <img :src="data.pictureUrl[2]" >
              </div>
            </template>
          </div>
          <div v-else class="xuan-2-2-2" >
            <div class="xuan-2-2-2-1 pic">
              <img src="../../assets/img/null.png">
            </div>
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

    <!-- ------------  电话审核记录栏  ------------------------ -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('new.no58')}}</p>
        </div>
      </el-col>
    </el-row>
    <div class="xuan-3">
      <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
        <tr>
          <th width="15%">{{$t('new.no59')}}</th>
          <th width="15%">{{$t('public.no39')}}</th>
          <th width="15%">{{$t('public.no40')}}</th>
          <th width="40%">{{$t('public.no37')}}</th>
          <th width="15%">{{$t('loanMoneyDetail.opeTime')}}</th>
        </tr>
        <template v-if="phoneAuditLogTwo!=''">
          <tr v-for="value in phoneAuditLogTwo" :key="value.id">
            <template>
              <td v-if="value.approveStage!==null&&value.approveStage!==undefined">{{value.approveStage==1?$t('myAuditList.no5'):value.approveStage==2?$t('myAuditList.no9'):''}}</td>
            </template>
            <template>
              <td v-if="value.userName!==null&&value.userName!==undefined">{{value.userName}}</td>
              <td v-else>{{$store.state.common.nullData}}</td>
            </template>
            <template>
              <td v-if="value.connectStatus!==null&&value.connectStatus!==undefined&&value.connectStatus!==''">{{$t($store.getters.tel_through(value.connectStatus))}}</td>
              <td v-else>{{$store.state.common.nullData}}</td>
            </template>
            <template>
              <td v-if="value.remark!==null&&value.remark!==undefined&&value.remark!==''">{{value.remark}}</td>
              <td v-else>{{$store.state.common.nullData}}</td>
            </template>
            <template>
              <td v-if="value.strFirstApproveTime!==null&&value.strFirstApproveTime!==undefined">{{value.strFirstApproveTime}}</td>
              <td v-else>{{$store.state.common.nullData}}</td>
            </template>
          </tr>
        </template>
        <template v-else>
          <div style="textAlign:center;width:660%;height:40px;lineHeight:40px">
            {{$t('public.no23')}}
          </div>
        </template>
      </table>
    </div>
    <div class="foot"></div>

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
                  <span style="marginLeft:20px;">{{$t('fei.no8')}}：{{item.operator}}</span>
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
        <!-- ------------ 公司电话开始------------------------ -->
        <li class="xuan-2-9" v-if="active2==4">
          <div class="xuan-2-9-1">
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
          </div>
        </li>
      </ul>
    </div>

    <!-- ------------ 电话催收、短信催收开始------------------------ -->
    <div class="xuanxiangka" v-if="type==1">
      <ul class="xuan-1">
       <li v-for="(value,index) in arr3" :key="index" :class="{active:active3==value.id}" @click="active3=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="xuan-2">
        <!-- --------------- 电话催收开始 ------------------------ -->
        <li class="xuan-2-7" v-if="active3==1">
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
        <li class="xuan-2-2" v-if="active3==2">
          <div class="xuan-2-2-1">
            <template v-if="data.collectionSmsTemplateList!==null&&data.collectionSmsTemplateList!==undefined&&data.collectionSmsTemplateList!=''">
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
        <li class="xuan-2-10" v-if="active3==3">
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

export default {
  name: 'userManage',
  components: {
    appLightbox,
    cuishouList,
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
        collectionSmsTemplateList: '', // 短信模版
        collectionRecordList: '', // 催收记录列表
        orderUrgentContact: '', // 紧急联系人列表
        companyContact: '',// 紧急联系人列表
        orderPhoneApprove:'',
        partialShow:'',
        overCouponShow:'',
        pictureUrl:''
      },
      emeContact: '', // 紧急联系人选中项
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
      phoneAuditLogTwo:''
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
      return [
        {id: 1, title: this.$t('operationDetail.tab2.no1')},
        {id: 2, title: this.$t('operationDetail.tab2.no2')},
        {id: 3, title: this.$t('operationDetail.tab2.no3')},
        {id: 4, title: this.$t('public.no12')}
      ]
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
          'sessionid': this.sessionid
        },
        'orderNo': this.orderNo
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
          this.data.companyContact = res.data.data.companyContact
          this.data.partialShow = res.data.data.partialShow
          this.data.overCouponShow = res.data.data.overCouponShow
          this.data.pictureUrl = res.data.data.pictureUrl.indexOf('|')!=-1?res.data.data.pictureUrl.split('|'):res.data.data.pictureUrl
          this.telAuditLogTwo('2');
        } else {
          this.data = []
        }
      })
    },
    submitForm (formName) { // 电话催收提交操作
      // 判断联系人字段是否填写
      if (this.emeContact === '' && this.contact === '') {
        this.$globalMsg.error(this.$t('operationDetail.no28'))
        return
      }
      // 然后表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.promise == 1 && this.ruleForm.promiseTime == '') {
            this.$globalMsg.error(this.$t('operationDetail.no27'))
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
                this.$globalMsg.success(this.$t('message.success'))
              } else {
                this.$globalMsg.error(res.data.header.msg)
              }
              this.ruleForm.remark = ''
              this.ruleForm.status = ''
              this.ruleForm.promiseTime = ''
                // this.ruleForm.promise = '';
            })
          }
        } else {
          return false
        }
      })
    },
    noteSubmit () { // 短信模版发送
      if (this.emeContact === '' && this.contact === '') {
        this.$globalMsg.error(this.$t('operationDetail.no28'))
        return
      }
      if (this.noteSel === '') {
        this.$globalMsg.error(this.$t('operationDetail.no29'))
        return
      }
      if (this.flag) {
        this.flag = false
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
            this.$globalMsg.success(this.$t('message.success'))
            setTimeout(() => {
              this.$router.push('/cuishoudetail')
            }, 1000)
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.emeContact = ''
          this.contact = ''
          this.noteSel = ''
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
    }
  },
  watch: {
    emeContact () {
      if (this.emeContact !== '') {
        this.contact = ''
        let arr = String(this.emeContact).split(',')
        this.ruleForm.contactName = arr[0]
        this.ruleForm.relation = arr[1]
        this.ruleForm.contactPhone = arr[2]
      }
    },
    contact () {
      if (this.contact !== '') {
        this.emeContact = ''
        let arr = String(this.contact).split(',')
        this.ruleForm.contactName = arr[0]
        this.ruleForm.relation = arr[1]
        this.ruleForm.contactPhone = arr[2]
      }
    },
    'ruleForm.promise' () {
      if (this.ruleForm.promise === -1) {
        this.ruleForm.promiseTime = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.orderNo = this.$route.query.orderNo
    this.type = this.$route.query.type
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
