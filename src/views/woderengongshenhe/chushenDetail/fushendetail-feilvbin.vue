<template>
  <div v-if="data" class="public_main">
    <div class="crumbs" v-if="block==2">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('myAuditList.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/mySecondtAuditList'}">{{$t('myAuditList.no6')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('myAuditList.no11')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-else>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('riskManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/peopleSecondAudit'}">{{$t('riskManage.crumbsThr')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('myAuditList.no11')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------- 用户详情,借款详情 ------------------------ -->
    <div class="tabs">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr3" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <li  v-if="active2==1">
          <div class="oneLineHasFour">
            <p><span>{{$t('fei.no28')}}{{$t('new.no48')}}:</span>
              <span>{{data.userBase.appName | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('fei.no28')}}{{$t('new.no49')}}:</span>
              <span>{{data.userBase.appPackage | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('new.no55')}}:</span>
              <span>{{data.userSelf.whatsAPP | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.userId')}}:</span><span>{{data.userBase.id | dataIsTrue}}</span></p>
            <p><span>{{$t('public.no1')}}:</span><span>{{data.userBase.name | dataIsTrue}}</span></p>
            <p><span>{{$t('public.CreateDate')}}:</span><span>{{data.userSelf.strCreateTime | dataIsTrue}}</span></p>
            <p><span>{{$t('public.userTel')}}:</span><span>{{data.userBase.phone | dataIsTrue}}</span></p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.sex')}}:</span>
              <span>{{$t($store.getters.sexStatus(data.userSelf.sex))}}</span>
            </p>
            <p><span>{{$t('public.no3')}}:</span>
              <span>{{$t($store.getters.marriage(data.userSelf.marriage))}}</span>
            </p>
            <p><span>{{$t('public.no5')}}:</span>
              <span>{{$t($store.getters.education(data.userSelf.degree))}}</span>
            </p>
            <p><span>{{$t('fei.loanId')}}:</span>
              <span>{{data.userBase.contractNo | dataIsTrue}}</span>  
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.birthday')}}:</span>
              <span>{{data.userSelf.birthday | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('new.no56')}}:</span>
              <span>{{$store.getters.getAge(data.userSelf.birthday)}}</span>
            </p>
            <p><span>Facebook:</span>
              <span>{{data.userSelf.facebook | dataIsTrue}}</span>
            </p>
            <p><span>Email:</span>
              <span>{{data.userSelf.email | dataIsTrue}}</span>
            </p>
          </div>
        </li>
        <li  v-if="active2==2">
          <div class="oneLineHasFour">
            <p><span>{{$t('fei.no29')}}{{$t('new.no48')}}:</span>
              <span>{{data.orderExtra.appName | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('fei.no29')}}{{$t('new.no49')}}:</span>
              <span>{{data.orderExtra.appPackage | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('fei.loanId')}}:</span>
              <span>{{data.order.id | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no30')}}:</span>
              <span>{{$store.getters.moneySplit(data.order.loanAmount)}}</span>
            </p>
            <p><span>{{$t('public.no31')}}:</span> 
              <span>{{data.order.productPeriod | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.CreateDate')}}:</span> 
              <span>{{data.order.strCreateTime | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('fei.no17')}}:</span>
              <span>{{data.order.instalment | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('fei.no22')}}:</span>
              <span>{{$t($store.getters.loanUse_status(data.orderExtra.loanUse))}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!--------------- 选项卡 -------------------->
    <div class="xuanxiangka mt15">
      <ul class="xuan-1">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active==value.id}" @click="active=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="xuan-2">
        <!------------------------ 历史借款记录信息 ---------------------------->
        <li  v-if="active==4">
          <div class="paixu">
            <span></span><p>{{$t('yuenan.no14')}}</p>
          </div>
          <loan-list :order-no="orderNo" :tag-list="data.userOrderCount" :user-id="userId" :table-data="data.orderList"></loan-list>
          <div class="paixu">
            <span></span><p>{{$t('yuenan.no13')}}</p>
          </div>
          <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="20%">{{$t('public.orderNo')}}</th>
              <th width="10%">{{$t('loanAfterManage.collection_option.no2')}}</th>
              <th width="10%">{{$t('loanAfterManage.collection_option.no4')}}</th>
              <th width="10%">{{$t('loanAfterManage.collection_option.no5')}}</th>
              <th width="10%">{{$t('loanAfterManage.collection_option.no6')}}</th>
              <th width="10%">{{$t('loanAfterManage.collection_option.no14')}}</th>
              <th width="10%">{{$t('loanAfterManage.collection_option.no12')}}</th>
              <th width="10%">{{$t('loanAfterManage.collection_option.no13')}}</th>
              <th width="10%">{{$t('loanAfterManage.collection_option.no8')}}</th>
            </tr>
            <tr v-if="tableData!=''">
              <td >{{tableData[0]}}</td>
              <td >{{tableData[2]}}</td>
              <td >{{tableData[4]}}</td>
              <td >{{tableData[5]}}</td>
              <td >{{tableData[6]}}</td>
              <td >{{tableData[14]}}</td>
              <td >{{tableData[12]}}</td>
              <td >{{tableData[13]}}</td>
              <td >{{tableData[8]}}</td>
            </tr>
            <template v-else>
              <div style="textAlign:center;width:500%;height:40px;lineHeight:40px">
                {{$t('public.no23')}}
              </div>
            </template>
          </table>
        </li>
        <!------------------------ 用户信息 ---------------------------->
        <li class="xuan-2-1" v-if="active==1">
          <!-- 第一行 -->
          <div class="paixu">
            <span></span>
            <p>{{$t('auditDetail.no2')}}</p>
            <p v-if="data.order.status==30&&block==2" @click="telFlag=true" style="cursor:pointer">{{$t('auditDetail.no42')}}</p>
          </div>
          <div class="xuan-2-1-1">
            <div class="xuan-2-1-1-2">
              <div class="xuan-2-1-1-22">
                <p v-if="data.userBase.name!==null&&data.userBase.name!==undefined&&data.userBase.name!==''">
                  <span>{{$t('public.no1')}}:</span> <span>{{data.userSelf.name+' '+data.userSelf.middleName+' '+data.userSelf.surname}}</span> 
                </p>
                <p v-else><span>{{$t('public.no1')}}:</span><span>{{$store.state.common.nullData}}</span></p>
                <p><span>{{$t('public.birthday')}}:</span>
                  <span>{{data.userBase.birthday | dataIsTrue}}</span>
                </p>
                
              </div>
              <div class="xuan-2-1-1-22">
                <p><span>{{$t('fei.id')}}:</span>
                  <span>{{data.userIdcard.idCard | dataIsTrue}}</span>
                </p>
                <p><span>{{$t('fei.idType')}}:</span> 
                  <span>{{data.userIdcard.strIdType | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p><span>{{$t('yuenan.no2')}}:</span> 
                  <span>{{data.userSelf.liveProvinceName | dataIsTrue}}</span>
                </p>
                <p><span>{{$t('yuenan.no17')}}:</span> 
                  <span>{{data.userSelf.liveCityName | dataIsTrue}}</span> 
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p><span>{{$t('public.no7')}}:</span><span>{{data.userSelf.liveAddress | dataIsTrue}}</span></p>
              </div>
              <div class="xuan-2-1-1-22">
                <p><span>{{$t('fei.no12')}}:</span><span>{{data.userSelf.numbernOfChildren | dataIsTrue}}</span></p>
              </div>
              <div class="xuan-2-1-1-22">
                <p><span>{{$t('auditDetail.no10')}}:</span>
                  <span v-if="data.similarity">{{String(data.similarity).slice(0,5)}}%</span>
                  <span v-else>{{$store.state.common.nullData}}</span>
                </p>
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
                  <div v-if="data.userIdcard.facetimePhotoUrl" class="idimg pic" @click="openBox({imgUrl:data.userIdcard.facetimePhotoUrl})">
                    <img :src="data.userIdcard.facetimePhotoUrl" :alt="$t('pic.no4')" :title="$t('pic.no4')">
                  </div>
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png" :title="$t('pic.no4')">
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- 第二行 -->
          <div class="paixu">
            <span></span><p>{{$t('auditDetail.no5')}}</p>
            <p v-if="data.order.status==30&&block==2" @click="telFlag1=true" style="cursor:pointer">{{$t('auditDetail.no42')}}</p>
          </div>
          <div class="xuan-2-1-1">
            <div class="xuan-2-1-1-2">
              <div class="xuan-2-1-1-22">
                <p><span>{{$t('public.no9')}}:</span><span>{{data.userWork.company | dataIsTrue}}</span></p>
                <p><span>{{$t('public.no10')}}:</span><span>{{data.userWork.strEntryTime | dataIsTrue}}</span></p>
                <p><span>{{$t('public.no13')}}:</span><span>
                  {{$store.state.common.id_currency}}
                  {{$store.getters.moneySplit(data.userWork.monthIncome)}}
                  {{$store.state.common.vi_currency}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p><span>{{$t('yuenan.no5')}}:</span><span>{{data.userWork.industryName | dataIsTrue}}</span></p>
                <p><span>{{$t('public.no12')}}:</span><span>{{data.userWork.companyPhone | dataIsTrue}}</span></p>
                <p><span>{{$t('fei.inComeDate')}}:</span><span>{{data.userWork.payday | dataIsTrue}}</span></p>
              </div>
              <div class="xuan-2-1-1-22">
                <p><span>{{$t('yuenan.no6')}}:</span><span>{{data.userWork.companyProvinceName | dataIsTrue}}</span></p>
                <p><span>{{$t('yuenan.no15')}}:</span><span>{{data.userWork.companyCityName | dataIsTrue}}</span></p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:100%"><span>{{$t('public.no15')}}:</span>
                <span>{{data.userWork.companyAddress | dataIsTrue}}</span></p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:100%"><span>{{$t('yuenan.no9')}}:</span>
                <span>{{data.order.orderAddress | dataIsTrue}}</span></p>
              </div>
            </div>
            <div class="xuan-2-1-1-3">
              <div class="idimgbox">
                <template >
                  <div v-if="data.userWork.incomePicUrl" class="idimg pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                    <img :src="data.userWork.incomePicUrl" alt="工资单照片" title="工资单照片">
                  </div>
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png">
                  </div>
                </template>
              </div>
              <div class="idimgbox">
                <template >
                  <div v-if="data.userWork.bankPicUrl" class="idimg pic" @click="openBox({imgUrl:data.userWork.bankPicUrl})">
                    <img :src="data.userWork.bankPicUrl" :alt="$t('fei.no13')" :title="$t('fei.no13')">
                  </div>
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png">
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- 第三行 -->
          <div class="paixu">
            <span></span><p>{{$t('fei.no47')}}</p>
          </div>
          <div class="loansTypeImg">
            <template v-if="data.userSelf.livePicUrl">
              <span>{{$t('fei.no45')}}:</span>
              <div  class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.userSelf.livePicUrl})">
                <img :src="data.userSelf.livePicUrl">
              </div>
            </template>
            <template v-else-if="data.userSelf.workPicUrl" >
              <span>{{$t('fei.no46')}}:</span>
              <div class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.userSelf.workPicUrl})">
                <img :src="data.userSelf.workPicUrl">
              </div>
            </template>
            <span v-else>{{$t('fei.no48')}}</span>
          </div>
          <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="10%">{{$t('fei.no49')}}</th>
              <th width="10%">imei</th>
              <th width="10%">imsi</th>
              <th width="10%">ip</th>
              <th width="10%">macAddress</th>
              <th width="10%">wifiBssid</th>
              <th width="20%">gps</th>
              <th width="20%">{{$t('finance.createTime')}}</th>
            </tr>
            <template v-if="data.deviceInfo!=''">
              <tr v-for="(value,index) in data.deviceInfo" :key="index">
                <td>{{value.eventTypeStr | dataIsTrue}}</td>
                <td>{{value.imei | dataIsTrue}}</td>
                <td>{{value.imsi | dataIsTrue}}</td>
                <td>{{value.ip | dataIsTrue}}</td>
                <td>{{value.macAddress | dataIsTrue}}</td>
                <td>{{value.wifiBssid | dataIsTrue}}</td>
                <td>{{value.gpsAddress | dataIsTrue}}</td>
                <td>{{value.strCreateTime | dataIsTrue}}</td>
              </tr>
            </template>
            <template v-else>
              <div style="textAlign:center;width:1000%;height:40px;lineHeight:40px">
                {{$t('public.no23')}}
              </div>
            </template>
          </table>
        </li>
        <!------------------------ 通话记录信息 ---------------------------->
        <li  v-if="active==2">
          <tel-record-list :detail="telDetail" :order-no="orderNo" :user-id="userId" :order-id="orderId" :type="2"></tel-record-list>
        </li>
        <!------------------------ 短信记录信息 ---------------------------->
        <li  v-if="active==3">
          <note-record-list :order-no="orderNo" :user-id="userId" ></note-record-list>
        </li>
        
        <!------------------------ 联系人记录信息 ---------------------------->
        <li class="xuan-2-1" v-if="active==5">
          <!-- 第三行 -->
          <div class="paixu">
            <span></span><p>{{$t('public.no16')}}</p>
          </div>
          <div class="xuan-2-1-2">
            <div class="xuan-2-1-2-1">
              <p>{{$t('public.no16')}}1 </p>
              <p>{{$t('public.no17')}}:<span>{{data.userUrgentContact.contactOneRelationName | dataIsTrue}}</span></p>
              <p>{{$t('public.name')}}:<span>{{data.userUrgentContact.contactOneName | dataIsTrue}}</span></p>
              <p v-if="data.userUrgentContact.contactOnePhone!==undefined&&data.userUrgentContact.contactOnePhone!==''">{{$t('public.no18')}}:<span>{{data.userUrgentContact.contactOnePhone+' '+data.contactOnePhoneOperator}}</span></p>
              <p v-else>{{$t('public.no18')}}:<span>{{$store.state.common.nullData}}</span></p>
              <template v-if="data.contactOne!==undefined&&data.contactOne!==0">
                <div class="tooltip pic">
                  <img src="../../../assets/img/lv.png" alt="">
                </div>
              </template>
              <template v-else>
                <div class="tooltip pic">
                  <img src="../../../assets/img/hong.png" alt="">
                </div>
              </template>
              <p style="margin-left:20px;cursor:pointer;color:#1D7BFF" v-if="data.order.status==30&&block==2" @click="telFlag2=true">{{$t('auditDetail.no42')}}</p>
              <p style="margin-left:20px">{{$t('auditDetail.no8')+data.contactOne+$t('auditDetail.no9')}}</p>
            </div>
            <div class="xuan-2-1-2-1">
              <p>{{$t('public.no16')}}2 </p>
              <template >
                <p>{{$t('public.no17')}}:<span>{{data.userUrgentContact.contactTwoRelationName | dataIsTrue}}</span></p>
                <p>{{$t('public.name')}}:<span>{{data.userUrgentContact.contactTwoName | dataIsTrue}}</span></p>
              </template>
              <template >
                <p v-if="data.userUrgentContact.contactTwoPhone!==undefined&&data.userUrgentContact.contactTwoPhone!==''">{{$t('public.no18')}}: <span>{{data.userUrgentContact.contactTwoPhone+' '+data.contactTwoPhoneOperator}}</span> </p>
                <p v-else>{{$t('public.no18')}}:<span>{{$store.state.common.nullData}}</span></p>
              </template>
              <template v-if="data.contactTwo!==undefined&&data.contactTwo!==0">
                  <div class="tooltip pic">
                    <img src="../../../assets/img/lv.png" alt="">
                  </div>
              </template>
              <template v-else>
                  <div class="tooltip pic">
                    <img src="../../../assets/img/hong.png" alt="">
                  </div>
              </template>
              <p style="margin-left:20px;cursor:pointer;color:#1D7BFF" v-if="data.order.status==30&&block==2" @click="telFlag3=true">{{$t('auditDetail.no42')}}</p>
              <p style="margin-left:20px">{{$t('auditDetail.no8')+data.contactTwo+$t('auditDetail.no9')}}</p>
            </div>
            <div class="xuan-2-1-2-1">
              <p>{{$t('public.no16')}}3 </p>
                <p>{{$t('public.no17')}}:<span>{{data.userUrgentContact.contactThreeRelationName | dataIsTrue}}</span></p>
                <p>{{$t('public.name')}}: <span>{{data.userUrgentContact.contactThreeName}}</span></p>
                <p v-if="data.userUrgentContact.contactThreePhone!==undefined&&data.userUrgentContact.contactThreePhone!==''">{{$t('public.no18')}}: <span>{{data.userUrgentContact.contactThreePhone+' '+data.contactThreePhoneOperator}}</span> </p>
                <p v-else>{{$t('public.no18')}}: <span> {{$store.state.common.nullData}} </span> </p>
              <template v-if="data.contactThree!==undefined&&data.contactThree!==0">
                <div class="tooltip pic">
                  <img src="../../../assets/img/lv.png" alt="">
                </div>
              </template>
              <template v-else>
                <div class="tooltip pic">
                  <img src="../../../assets/img/hong.png" alt="">
                </div>
              </template>
              <p style="margin-left:20px;cursor:pointer;color:#1D7BFF" v-if="data.order.status==30&&block==2" @click="telFlag4=true">{{$t('auditDetail.no42')}}</p>
              <p style="margin-left:20px">{{$t('auditDetail.no8')+data.contactThree+$t('auditDetail.no9')}}</p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userUrgentContact.otherOneName!==''">
              <p>{{$t('public.no16')}}4 </p>
              <p>{{$t('public.no17')}}:<span>{{data.userUrgentContact.otherOneRelationName | dataIsTrue}}</span></p>
              <p>{{$t('public.name')}}:<span>{{data.userUrgentContact.otherOneName | dataIsTrue}}</span></p>
              <p v-if="data.userUrgentContact.otherOnePhone!==undefined&&data.userUrgentContact.otherOnePhone!==''">{{$t('public.no18')}}: <span>{{data.userUrgentContact.otherOnePhone}}</span> </p>
              <p v-else>{{$t('public.no18')}}: <span> {{$store.state.common.nullData}} </span> </p>
              <template v-if="data.contactOtherOne!==undefined&&data.contactOtherOne!==0">
                  <div class="tooltip pic">
                    <img src="../../../assets/img/lv.png" alt="">
                  </div>
              </template>
              <template v-else>
                  <div class="tooltip pic">
                    <img src="../../../assets/img/hong.png" alt="">
                  </div>
              </template>
              <p style="margin-left:20px;cursor:pointer;color:#1D7BFF" v-if="data.order.status==20&&block==2" @click="telFlag5=true">{{$t('auditDetail.no42')}}</p>
              <p style="margin-left:20px">{{$t('auditDetail.no8')+data.contactOtherOne+$t('auditDetail.no9')}}</p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userUrgentContact.otherTwoName!==''">
              <p>{{$t('public.no16')}}5 </p>
              <template >
                <p>{{$t('public.no17')}}:<span>{{data.userUrgentContact.otherTwoRelationName | dataIsTrue}}</span></p>
                <p>{{$t('public.name')}}:<span>{{data.userUrgentContact.otherTwoName | dataIsTrue}}</span></p>
                <p v-if="data.userUrgentContact.otherTwoPhone!==undefined&&data.userUrgentContact.otherTwoPhone!==''">{{$t('public.no18')}}: <span>{{data.userUrgentContact.otherTwoPhone}}</span> </p>
                <p v-else>{{$t('public.no18')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template v-if="data.contactOtherTwo!==undefined&&data.contactOtherTwo!==0">
                  <div class="tooltip pic">
                    <img src="../../../assets/img/lv.png" alt="">
                  </div>
              </template>
              <template v-else>
                  <div class="tooltip pic">
                    <img src="../../../assets/img/hong.png" alt="">
                  </div>
              </template>
              <p style="margin-left:20px;cursor:pointer;color:#1D7BFF" v-if="data.order.status==20&&block==2" @click="telFlag6=true">{{$t('auditDetail.no42')}}</p>
              <p style="margin-left:20px">{{$t('auditDetail.no8')+data.contactOtherTwo+$t('auditDetail.no9')}}</p>
            </div>
          </div>
        </li>
        <!------------------------ 账户记录信息 ---------------------------->
        <li  v-if="active==6">
          <div class="paixu">
            <span></span><p>{{$t('yuenan.no10')}}</p>
          </div>
          <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="25%">{{$t('yuenan.no11')}}</th>
              <th width="25%">{{$t('yuenan.no12')}}</th>
              <th width="25%">{{$t('public.no21')}}</th>
              <th width="25%">{{$t('public.no22')}}</th>
            </tr>
            <template v-if="data.userBank!==undefined&&data.userBank!==''">
              <tr>
                <template>
                  <td>{{data.userBank.bankName | dataIsTrue}}</td>
                  <td>{{data.userBank.email | dataIsTrue}}</td>
                  <td>{{data.userBank.strCreateTime | dataIsTrue}}</td>
                  <td>{{data.userBank.status==1?$t('userDetail.bankId_status.no1'):$t('userDetail.bankId_status.no2')}}</td>
                </template>
              </tr>
            </template>
            <template v-else>
              <div style="textAlign:center;width:400%;height:40px;lineHeight:40px">
                {{$t('public.no23')}}
              </div>
            </template>
          </table>
        </li>
        <li  v-if="active==7">
          <h1>大年初三，敬请期待</h1>
        </li>
      </ul>
    </div>
    


    <!------------------------ 初审结果展示开始 ---------------------------->
    <div class="paixu pai-active">
      <span></span><p>{{$t('auditDetail.no12')}}</p>
    </div>
    <div class="chushenjilu">
      <template v-if="peopleOne_audit!==null&&peopleOne_audit!==undefined&&peopleOne_audit!==''">
        <div class="chu-select">
          <div class="chu-select-left">{{$t('auditDetail.no21')}}</div>
          <div v-if="peopleOne_audit.approveResult!==null&&peopleOne_audit.approveResult!==undefined" class="chu-select-right">
            {{peopleOne_audit.approveResult==1?$t('auditDetail.no16'):$t('auditDetail.no17')}}
          </div>
          <div v-else class="chu-select-right">
            {{$store.state.common.nullData}}
          </div>
        </div>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('public.no37')}}</div>
          <div class="chu-select-right">
            {{peopleOne_audit.remark!==null&&peopleOne_audit.remark!==undefined?peopleOne_audit.remark:$store.state.common.nullData}}
          </div>
        </div>
        <template v-if="peopleOne_audit.approveResult&&peopleOne_audit.approveResult == -1">
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no18')}}:</div>
            <div class="chu-select-right">
              {{peopleOne_audit.notApproveReason?peopleOne_audit.notApproveReason:$store.state.common.nullData}}
            </div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no19')}}:</div>
            <div class="chu-select-right">
              {{peopleOne_audit.notApproveSubReason?peopleOne_audit.notApproveSubReason:$store.state.common.nullData}}
            </div>
          </div>
        </template>
      </template>
      <h3 style="margin:10px 0;">{{$t('fei.no11')}}</h3>
      <div class="xuan-2-2-2" v-if="pictureUrl!==''&&typeof pictureUrl==='string'">
        <div v-if="pictureUrl" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:pictureUrl})">
          <img :src="pictureUrl" >
        </div>
      </div>
      <div class="xuan-2-2-2" v-else-if="typeof pictureUrl==='object'">
        <template >
          <div v-if="pictureUrl[0]" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:pictureUrl[0]})">
            <img :src="pictureUrl[0]" >
          </div>
        </template>
        <template >
          <div v-if="pictureUrl[1]" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:pictureUrl[1]})">
            <img :src="pictureUrl[1]" >
          </div>
        </template>
        <template >
          <div v-if="pictureUrl[2]" class="xuan-2-2-2-1 pic" @click="openBox({imgUrl:pictureUrl[2]})">
            <img :src="pictureUrl[2]" >
          </div>
        </template>
      </div>
      <div v-else class="xuan-2-2-2-1 pic" >
        <img src="../../../assets/img/null.png">
      </div>
    </div>
    <!------------------------ 初审结果展示结束 ---------------------------->
    <div class="foot" ></div>
    <!------------------------ 跟踪记录结果展示开始 ---------------------------->
    <div class="paixu">
      <span></span>
      <p>{{$t('auditDetail.no66')}}</p>
    </div>
    <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
      <tr>
        <th width="25%">{{$t('auditDetail.no67')}}</th>
        <th width="75%">{{$t('auditDetail.no68')}}</th>
      </tr>
      <template v-if="followReason!==undefined&&followReason!=''">
        <tr v-for="(item,index) in followReason" :key="index">
          <td>{{item.strCreateTime | dataIsTrue}}</td>
          <td>{{item.remark | dataIsTrue}}</td>
        </tr>
      </template>
      <template v-if="followReason1!==undefined&&followReason1!=''">
        <tr v-for="(item,index) in followReason1" :key="index">
          <td>{{item.strCreateTime | dataIsTrue}}</td>
          <td>{{item.remark | dataIsTrue}}</td>
        </tr>
      </template>
      <template v-if="followReason==''&&followReason1==''">
        <div style="textAlign:center;width:400%;height:40px;lineHeight:40px">
          {{$t('public.no23')}}
        </div>
      </template>
    </table>
    <!------------------------ 跟踪记录结果展示结束 ---------------------------->

    <div class="foot" ></div>

    <!------------------------ 复审提交操作开始 ---------------------------->
    <template>
      <div v-if="peopleTwo_audit!==undefined&&peopleTwo_audit!=''" class="chushenjilu">
        <el-row>
          <el-col :span="24">
            <div class="paixu pai-active">
              <span></span><p>{{$t('auditDetail.no62')}}</p>
            </div>
          </el-col>
        </el-row>
        <p class="chu-title">{{$t('auditDetail.no22')}}:</p>
        <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
          <tr>
            <th width="15%">{{$t('new.no59')}}</th>
            <th width="15%">{{$t('public.no39')}}</th>
            <th width="15%">{{$t('public.no40')}}</th>
            <th width="40%">{{$t('public.no37')}}</th>
            <th width="15%">{{$t('loanMoneyDetail.opeTime')}}</th>
          </tr>
          <template v-if="phoneAuditTwo!=''">
            <tr v-for="(value,index) in phoneAuditTwo" :key="index">
              <td>{{value.approveStage==1?$t('myAuditList.no5'):value.approveStage==2?$t('myAuditList.no9'):''}}</td>
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
        <div class="chu-select">
          <div class="chu-select-left">{{$t('auditDetail.no27')}}:</div>
          <div class="chu-select-right">
            {{peopleTwo_audit.strApproveTime?peopleTwo_audit.strApproveTime:$store.state.common.nullData}}
          </div>
        </div>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('auditDetail.no28')}}:</div>
          <div class="chu-select-right">
            {{peopleTwo_audit.approveResult==1?$t('auditDetail.no16'):$t('auditDetail.no17')}}
          </div>
        </div>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('public.no37')}}:</div>
          <div class="chu-select-right">
            {{peopleTwo_audit.remark?peopleTwo_audit.remark:$store.state.common.nullData}}
          </div>
        </div>
        <template v-if="peopleTwo_audit.approveResult == -1">
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no18')}}:</div>
            <div class="chu-select-right">
              {{peopleTwo_audit.notApproveReason?peopleTwo_audit.notApproveReason:$store.state.common.nullData}}
            </div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no19')}}:</div>
            <div class="chu-select-right">
              {{peopleTwo_audit.notApproveSubReason?peopleTwo_audit.notApproveSubReason:$store.state.common.nullData}}
            </div>
          </div>
        </template>
      </div>
      <div v-else class="chushenjilu">
        <div class="xuanxiangka" v-if="block==2">
          <ul class="xuan-1">
            <li v-for="(value,index) in arr2" :key="index" :class="{active:active1==value.id}" @click="active1=value.id">
              <span>{{value.title}}</span>
            </li>
          </ul>
          <ul class="xuan-2">
            <li class="xuan-2-1" v-if="active1==1">
              <p class="chu-title">{{$t('auditDetail.no22')}}:</p>
              <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
                <tr>
                  <th width="15%">{{$t('new.no59')}}</th>
                  <th width="15%">{{$t('public.no39')}}</th>
                  <th width="15%">{{$t('public.no40')}}</th>
                  <th width="40%">{{$t('public.no37')}}</th>
                  <th width="15%">{{$t('loanMoneyDetail.opeTime')}}</th>
                </tr>
                <template v-if="phoneAuditTwo!=''">
                  <tr v-for="(value,index) in phoneAuditTwo" :key="index">
                    <td>{{value.approveStage==1?$t('myAuditList.no5'):value.approveStage==2?$t('myAuditList.no9'):''}}</td>
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
              <div class="chu-select1">
                <div class="chu-select-left">{{$t('auditDetail.no28')}}</div>
                <div class="chu-select-right">
                  <el-select size="small" v-model="status1" :placeholder="$t('public.placeholder')">
                    <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <template v-if="status1==-1">
                  <div class="chu-select-left">{{$t('auditDetail.no23')}}</div>
                  <div class="chu-select-right">
                    <el-select size="small" v-model="status2" :placeholder="$t('public.placeholder')">
                      <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="chu-select-right">
                    <el-select size="small" v-model="status3" :placeholder="$t('public.placeholder')">
                      <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </template>
              </div>
              <div class="chu-select">
                <div class="chu-select-left">{{$t('public.no37')}}</div>
                <div class="chu-select-right">
                  <textarea class="search_inpu" v-model="remark" :placeholder="$t('public.no42')+'~'"></textarea>
                </div>
              </div>
              <div class="input-but" v-if="$store.state.common.permiss.includes('RIGHT_REVIEW_SUBMIT')">
                <el-button type="primary" class="button-color" @click="submit">{{$t('public.no41')}}</el-button>
              </div>
            </li>
            <li class="xuan-2-1" v-if="active1==2">
              <div class="chu-select1">
                <div class="chu-select-left">{{$t('public.no37')}}</div>
                <div class="chu-select-right">
                  <textarea class="search_inpu" v-model="remark1" :placeholder="$t('public.no42')+'~'"></textarea>
                </div>
              </div>
              <div class="input-but" >
                <el-button type="primary" class="button-color" @click="submit1">{{$t('public.no41')}}</el-button>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
    </template>
    <!-- ---------------------- 复审提交操作结束 ------------------------ -->

    <div class="foot"></div>

    <!-- ---------------------- 图片点击放大组件 ------------------------ -->
    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>

    <!-- ------------------ 点击电话审核弹窗开始 -------------------- -->
    <div v-if="telFlag||telFlag1||telFlag2||telFlag3||telFlag4" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('auditDetail.no42')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="telClose"></i>
        </div>
        <div class="reply-main-con">
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no43')}}</div>
            <div class="chu-select-right">
              <el-select size="small" v-model="telStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('public.no37')}}</div>
            <div class="chu-select-right">
              <textarea class="search_inpu" v-model="telRemark" :placeholder="$t('public.no42')+'~'"></textarea>
            </div>
          </div>
          <div class="reply-but" @click="telSubmit">{{$t('public.no41')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击电话审核弹窗结束 -------------------- -->

  </div>
  <div v-else class="back">
    <p>{{$t('public.no23')}}，<span @click="back">{{$t('back.no1')}}</span> {{$t('back.no2')}}</p>
  </div>
</template>
<script>
import telRecordList from '../../../components/component/teltable'
import noteRecordList from '../../../components/component/notetable-feilvbin'
import loanList from '../../../components/component/loantable'

import Gauge from '../../../components/component/gauge'// 欺诈分图表组件

import appLightbox from '../../../components/component/lightbox'// 图片点击放大组件

export default {
  name: 'auditDetail',
  components: {
    telRecordList,
    noteRecordList,
    loanList,
    appLightbox,
    Gauge
  },
  data () {
    return {
      flag: true,
      block: '', // 控制审核提交操作是否显示
      telFlag: false,
      telFlag1: false,
      telFlag2: false,
      telFlag3: false,
      telFlag4: false,
      sessionid: '',
      userId: '', // 上个页面传过来的用户ID
      orderNo: '', // 上个页面传过来的订单ID
      orderId: '', // 上个页面传过来的订单ID
      data: {// 页面详情字段对象集合
        userBase: '',
        userBank: '',
        userIdcard: '',
        userSelf: '',
        userWork: '',
        orderExtra: '',
        order: '',
        orderList: [],
        deviceInfo: [],
        orderMultiCheck: '',
        userUrgentContact: '',
        similarity: '',
        contactOne: '',
        contactTwo: '',
        contactThree: '',
        userPhoneOperator: '',
        userOrderCount: {},
        contactOnePhoneOperator: '',
        contactTwoPhoneOperator: '',
        contactThreePhoneOperator: ''
      },
      // arr1:['用户信息','通话记录信息','短信信息记录','历史借款记录','OCR身份检测','公司检测','多平台检测','反欺诈'],
      active: 4, // 第一个当前点中的选项卡
      active2: 1, // 第一个当前点中的选项卡
      active1: 1, // 第二个当前点中的选项卡
      status1: '', // 复审是否通过选择状态
      options: this.$store.state.options.telStatus_select, // 电话审核下拉选框内容
      telStatus: '', // 电话审核下拉框选中项
      telRemark: '', // 电话审核备注信息内容
      options1: this.$store.state.options.peopleAuditTwo_option, // 复审是否通过下拉选框
      status2: '', // 驳回原因1
      options2: [], // 复审驳回原因1下拉选框
      status3: '', // 驳回原因2
      options3: [], // 复审驳回原因2下拉选框
      remark: '', // 备注信息内容
      remark1: '', // 跟踪备注信息内容
      lightBoxToggle: false, // 图片放大显示层开关
      currentObj: '', // 当前点击选中的图片信息
      rejectData: [], // 驳回原因树状图
      phoneAuditOne: '', // 初审电话审核记录表数据
      phoneAuditTwo: '', // 复审电话审核记录表数据
      machine_audit: '', // 机审结果数据
      peopleOne_audit: '', // 人工初审结果数据
      pictureUrl:'',
      peopleTwo_audit: '', // 人工复审结果数据
      flag2: false, // 公司检测点击更多弹窗
      companyCheckStr: '', // 公司检测信息
      followReason: '', // 复审跟踪记录
      followReason1: '', // 初审跟踪记录
      tableData: []// 最近催收记录表格
    }
  },
  computed: {// 做国际化的选项卡
    arr1 () {
      let arr = []
      if (this.block == 1) {
        arr.push({id: 4, title: this.$t('tab2.no4')});
        arr.push({id: 1, title: this.$t('tab2.no1')});
        arr.push({id: 5, title: this.$t('tab.no4')});
        arr.push({id: 2, title: this.$t('tab2.no2')});
        arr.push({id: 3, title: this.$t('tab2.no3')});
      } else {
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_HIS')) {
          arr.push({id: 4, title: this.$t('tab2.no4')});
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_USER')) {
          arr.push({id: 1, title: this.$t('tab2.no1')});
          arr.push({id: 5, title: this.$t('tab.no4')});
          // arr.push({id:6,title:this.$t('tab2.no5')})
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_CALL')) {
          arr.push({id: 2, title: this.$t('tab2.no2')});
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_SMS')) {
          arr.push({id: 3, title: this.$t('tab2.no3')});
        }
      }

      return arr
    },
    arr2 () {
      let arr = [];
      arr.push({id: 1, title: this.$t('auditDetail.no62')});
      arr.push({id: 2, title: this.$t('auditDetail.no65')});
      return arr;
    },
    arr3 () {
      let arr = []
      arr.push({id: 1, title: this.$t('operationDetail.tab1.no1')})
      arr.push({id: 2, title: this.$t('operationDetail.tab1.no2')})
      return arr
    }
  },
  methods: {
    getDefaultActive () {
      if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_HIS')) {
        this.active = 4;
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_CALL')) {
        this.active = 2;
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_SMS')) {
        this.active = 3;
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_USER')) {
        this.active = 1;
      }
    },
    openBox: function (obj) { // 图片点击放大
      this.currentObj = obj;
      this.lightBoxToggle = !this.lightBoxToggle;
    },
    closeBox: function () { // 图片点击放小
      this.lightBoxToggle = false;
    },
    telDetail () { // 传入通话子组件的方法
      this.telRecord2();// 复审电话审核记录
    },
    detail () { // 复审页面详细信息
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.myAuditDetail_list,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.data = res.data.data;
          this.data.userBase = res.data.data.userBase;
          this.data.userBank = res.data.data.userBank;
          this.data.userIdcard = res.data.data.userIdcard;
          this.data.userSelf = res.data.data.userSelf;
          this.data.userWork = res.data.data.userWork;
          this.data.order = res.data.data.order;
          this.data.orderList = res.data.data.orderList;
          this.data.orderMultiCheck = res.data.data.orderMultiCheck;
          this.data.userUrgentContact = res.data.data.userUrgentContact;
          this.data.contactOne = res.data.data.contactOne;
          this.data.contactTwo = res.data.data.contactTwo;
          this.data.contactThree = res.data.data.contactThree;
          this.data.userPhoneOperator = res.data.data.userPhoneOperator;
          this.data.contactOnePhoneOperator = res.data.data.contactOnePhoneOperator;
          this.data.contactTwoPhoneOperator = res.data.data.contactTwoPhoneOperator;
          this.data.contactThreePhoneOperator = res.data.data.contactThreePhoneOperator;
          this.data.userOrderCount = res.data.data.userOrderCount;
          this.data.orderExtra = res.data.data.orderExtra;
          this.data.similarity = res.data.data.similarity;
          this.data.deviceInfo = res.data.data.deviceInfo;
          
          if (res.data.companyCheckStr !== null && res.data.companyCheckStr !== undefined && res.data.companyCheckStr !== '') {
            this.companyCheckStr = JSON.parse(res.data.companyCheckStr);
          }
          if (res.data.data.recentCollection != '') {
            this.tableData = res.data.data.recentCollection.valueList;
          }
        }
      })
    },
    telRecord1 () { // 初审电话审核记录
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.telRecord_one,
          'sessionid': this.sessionid
        },
        approveType: '1',
        orderNo: this.orderNo,
        adminId: this.userId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.phoneAuditOne = res.data.data;
        }
      })
    },
    telRecord2 () { // 复审电话审核记录
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.telRecord_one,
          'sessionid': this.sessionid
        },
        approveType: '2',
        orderNo: this.orderNo,
        adminId: this.userId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.phoneAuditTwo = res.data.data;
        }
      })
    },
    reject () { // 驳回原因内容
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.reject,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.rejectData = res.data.data;
          this.rejectData.forEach(value => { // 用户选择第一个驳回原因的时候检测status2的值动态生成第二个驳回原因的值
            value.value = value.optionValue;// 取optionValue值作为选择框的value值
            value.label = value.optionName;// 取optionName值作为选择框的label值
            this.options2.push({value: value.optionValue, label: value.optionName});
            if (value.children) { // 如果存在children，再次循环做原因子类别的赋值
              value.children.forEach(item => {
                item.value = item.optionValue;
                item.label = item.optionName;
              })
            }
          })
        }
      })
    },
    auditResult1 () { // 机审结果展示
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.audit_result,
          'sessionid': this.sessionid
        },
        approveType: '1',
        orderNo: this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.machine_audit = res.data.data;
        }
      })
    },
    auditResult2 () { // 初审结果展示
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.audit_result,
          'sessionid': this.sessionid
        },
        approveType: '2',
        orderNo: this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.peopleOne_audit = res.data.data;
          if(res.data.data.pictureUrl!==''){
            this.pictureUrl = res.data.data.pictureUrl.indexOf('|')!=-1?res.data.data.pictureUrl.split('|'):res.data.data.pictureUrl
          }
        }
      })
    },
    auditResult3 () { // 复审结果展示
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.audit_result,
          'sessionid': this.sessionid
        },
        approveType: '3',
        orderNo: this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.peopleTwo_audit = res.data.data;
        }
      })
    },
    submit () { // 复审结果提交操作
      if (this.status1 == '') { // 验证结果是否选择
        this.$globalMsg.error(this.$t('auditDetail.no29'));
        return
      }
      if (this.status1 == -1) { // 验证驳回结果是否选择
        if (this.status2 == '' || this.status3 == '') {
          this.$globalMsg.error(this.$t('auditDetail.no25'));
          return
        }
      }
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.Result_twoSubmit,
            'sessionid': this.sessionid
          },
          orderNo: this.orderNo,
          approveResult: this.status1,
          remark: this.remark
        }
        if (this.status1 == -1) {
          option.notApproveReason = this.status2;
          option.notApproveSubReason = this.status3;
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('auditDetail.no26'));
            setTimeout(() => {
              this.$router.push('/mySecondtAuditList');
            }, 1000)
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
        })
      }
    },
    submit1 () { // 跟踪结果提交操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.follow_submit,
            'sessionid': this.sessionid
          },
          approveType: '3',
          orderNo: this.orderNo,
          orderId: this.orderId,
          remark: this.remark1
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('auditDetail.no26'));
            this.followHistory();
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.remark1 = '';
        })
      }
    },
    moreCompany () {

    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1)
    },
    telSubmit () { // 电话审核提交
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.telRecord_submit,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        orderId: this.orderId,
        approveType: '2',
        phone: '',
        userName: '',
        connectStatus: this.telStatus,
        relation: '',
        remark: this.telRemark
      }
      if (this.telFlag) {
        option.phone = this.data.userBase.phone;
        option.userName = this.data.userBase.name;
      }
      if (this.telFlag1) {
        option.phone = this.data.userWork.companyPhone;
        option.userName = this.data.userWork.company;
      }
      if (this.telFlag2) {
        option.phone = this.data.userUrgentContact.contactOnePhone ? this.data.userUrgentContact.contactOnePhone : '';
        option.relation = this.data.userUrgentContact.contactOneRelation ? this.data.userUrgentContact.contactOneRelation : '';
        option.userName = this.data.userUrgentContact.contactOneName ? this.data.userUrgentContact.contactOneName : '';
      }
      if (this.telFlag3) {
        option.phone = this.data.userUrgentContact.contactTwoPhone ? this.data.userUrgentContact.contactTwoPhone : '';
        option.relation = this.data.userUrgentContact.contactTwoRelation ? this.data.userUrgentContact.contactTwoRelation : '';
        option.userName = this.data.userUrgentContact.contactTwoName ? this.data.userUrgentContact.contactTwoName : '';
      }
      if (this.telFlag4) {
        option.phone = this.data.userUrgentContact.contactThreePhone ? this.data.userUrgentContact.contactThreePhone : '';
        option.relation = this.data.userUrgentContact.contactThreeRelation ? this.data.userUrgentContact.contactThreeRelation : '';
        option.userName = this.data.userUrgentContact.contactThreeName ? this.data.userUrgentContact.contactThreeName : '';
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
        this.telRecord2();
        this.telClose();
      })
    },
    telClose () { // 电话审核弹窗关闭
      this.telFlag = false;
      this.telFlag1 = false;
      this.telFlag2 = false;
      this.telFlag3 = false;
      this.telFlag4 = false;
      this.telStatus = '';
      this.telRemark = '';
    },
    followHistory () { // 获取跟踪记录查询历史
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.follow_history,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        approveType: '3'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.followReason = res.data.data;
        }
      })
    },
    followHistory1 () { // 获取跟踪记录查询历史
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.follow_history,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        approveType: '2'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.followReason1 = res.data.data;
        }
      })
    }
  },
  watch: {
    status2 () { // 检测驳回结果1，推出相应的驳回原因2
      this.options3 = [];
      this.status3 = '';
      let arr = this.rejectData.filter(value => {
        return value.optionValue == this.status2;
      })
      this.options3 = arr[0].children;
    },
    status1 () { // 结果通过的时候清除驳回原因数据
      if (this.status1 == 1) {
        this.status2 = '';
        this.status3 = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');

    this.userId = this.$route.query.userid;
    this.orderNo = this.$route.query.orderNo;
    this.orderId = this.$route.query.orderId;
    this.block = this.$route.query.block;

    this.detail();// 页面详情数据
    // this.telRecord1()// 初审电话记录列表
    this.telRecord2();// 复审电话记录列表
    this.reject();// 驳回原因树状图
    // this.auditResult1()// 机审结果展示
    this.auditResult2();// 初审结果展示
    this.auditResult3();// 复审结果展示
    this.followHistory();// 获取跟踪记录结果
    this.followHistory1();// 获取初审跟踪记录结果
    this.getDefaultActive();// 获取默认展示的选项卡1
    
  }
}
</script>
<style scoped lang="scss">
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

.pai-active{
  margin: 16px 0 0;
}

.xuanxiangka{
  width: 100%;
  height: auto;
  background-color: #fff;
  .xuan-1{
    width: 100%;
    display: flex;
    li{
      height: 100%;
      margin: 10px 12px;
      text-align: center;
      color: #000;
      display: flex;
      align-items: center;
      cursor: pointer;
      span{
        display: block;
        padding-bottom: 10px;
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
    &>li{
      width: 100%;
      padding: 10px 16px;
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
      width: 40%;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .xuan-2-1-2{
    width: 100%;
    .xuan-2-1-2-1{
      margin: 20px 16px;
      display: flex;
      align-items: center;
      @include p-span;
      p{
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
  }
  .idimgbox{
    width: 35%;
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
.chushenjilu{
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 10px 20px;
  .chu-title{
    margin: 10px 20px;
    font-size: 16px;
  }
  .chu-select1{
    margin: 10px 0px;
    padding: 5px 0;
    display: flex;
    .chu-select-left{
      width: 12%;
    }
    .chu-select-right{
      width: 38%;
      .search_inpu{
        width: 100%;
        height: 150px;
        padding: 5px;
        font-size: 16px;
      }
    }
  }
  .chu-select{
    margin: 10px 20px;
    padding: 5px 0;
    display: flex;
    .chu-select-left{
      width: 10%;
    }
    .chu-select-right{
      width: 88%;
      word-break: break-all;
      .search_inpu{
        width: 100%;
        height: 150px;
        padding: 5px;
        font-size: 16px;
      }
    }
  }
  .input-but{
    width: 100px;
    margin: 0 auto;
    .el-button{
      width: 100%;
    }
  }
}

.reply{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main{
    width: 694px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .reply-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .reply-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .chu-select{
        margin: 20px 20px;
        padding: 5px 0;
        display: flex;
        .chu-select-left{
          width: 15%;
          
        }
        .chu-select-right{
          width: 85%;
          .search_inpu{
            width: 100%;
            height: 150px;
            padding: 5px;
            font-size: 16px;
          }
        }
      }
      .reply-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 0 auto;
        text-align: center;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
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

.xuan-2-2-2{
  width: 100%;
  display: flex;
  align-items: center;
}
.xuan-2-2-2-1{
  width: 200px;
  height: 110px;
  margin-right: 40px;
}

</style>
