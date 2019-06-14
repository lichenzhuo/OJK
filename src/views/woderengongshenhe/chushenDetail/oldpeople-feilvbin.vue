<template>
  <div v-if="data" class="public_main pos-re">
    <div class="pos pos-fix" >
      <div class="crumbs" v-if="block==2">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{$t('myAuditList.no1')}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/myFirstAuditList'}">{{$t('myAuditList.no2')}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$t('myAuditList.no10')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="crumbs" v-else>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{$t('riskManage.crumbsOne')}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/peopleFirstAudit'}">{{$t('riskManage.crumbsTwo')}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$t('myAuditList.no10')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- ------------- 用户详情,借款详情 ------------------------ -->
      <div class="tabs">
        <ul class="tabs_title">
          <li v-for="(value,index) in arr3" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
            <span>{{value.title}}</span>
          </li>
        </ul>
        <ul class="tabs_main pos_height">
          <li  v-show="active2==1">
            <div class="oneLineHasTwo">
              <p><span>{{$t('fei.no28')}}{{$t('new.no49')}}:</span>
                <span>{{data.userBase.appPackage | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('new.no55')}}:</span>
                <span>{{data.userSelf.whatsAPP | dataIsTrue}}</span>
              </p>
            </div>
            <div class="oneLineHasFour">
              <p><span>{{$t('public.userId')}}:</span><span>{{data.userBase.id | dataIsTrue}}</span></p>
              <p><span>{{$t('public.userTel')}}:</span><span>{{data.userBase.phone | dataIsTrue}}</span></p>
              <p><span>{{$t('public.no1')}}:</span><span>{{data.userBase.name | dataIsTrue}}</span></p>
              <p><span>{{$t('public.sex')}}:</span>
                <span>{{$t($store.getters.sexStatus(data.userSelf.sex))}}</span>
              </p>
            </div>
            <div class="oneLineHasFour">
              <p><span>{{$t('public.no3')}}:</span>
                <span>{{$t($store.getters.marriage(data.userSelf.marriage))}}</span>
              </p>
              <p><span>{{$t('public.no5')}}:</span>
                <span>{{$t($store.getters.education(data.userSelf.degree))}}</span>
              </p>
              <p><span>{{$t('public.birthday')}}:</span>
                <span>{{data.userSelf.birthday | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('new.no56')}}:</span>
                <span>{{$store.getters.getAge(data.userSelf.birthday)}}</span>
              </p>
            </div>
            <div class="oneLineHasFour">
              <p><span>{{$t('auditDetail.no47')}}:</span>
                <span>{{data.userIdcard.industryName | dataIsTrue}}</span>
              </p>
              <p><span>company name:</span><span>{{data.userWork.company | dataIsTrue}}</span></p>
              <p style="width:50%"><span>company landline:</span><span>{{data.userWork.companyPhone | dataIsTrue}}</span></p>
            </div>
            <div class="oneLineHasOne">
              <p><span>{{$t('add.no59')}}:</span>
                <span>
                  {{data.userSelf.liveProvinceName | dataIsTrue}} -
                  {{data.userSelf.liveCityName | dataIsTrue}} -
                  {{data.userSelf.liveAddress | dataIsTrue}}
                </span>
              </p>
            </div>
            <div class="oneLineHasOne">
              <p><span>{{$t('add.no60')}}:</span>
                <span>
                  {{data.userWork.companyProvinceName | dataIsTrue}} -
                  {{data.userWork.companyCityName | dataIsTrue}} -
                  {{data.userWork.companyAddress | dataIsTrue}}
                </span>
              </p>
            </div>
          </li>
          <li  v-show="active2==2">
            <div class="oneLineHasTwo">
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
            <div class="oneLineHasOne">
              <p><span>{{$t('add.no58')}}:</span>
                <span>{{data.order.instalment | dataIsTrue}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <div style="height:410px"></div>

    <!-------------------------- 审核信息 -------------------->
    <div class="tabs mt15">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active==value.id}" @click="active=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <!------------------------ 用户信息 ---------------------------->
        <li  v-show="active==1">
          <div class="info flex" v-if="viewNumber==1">
            <div class="left">
              <!-- 用户信息 -->
              <div class="oneLineHasOne">
                <p><span>ID type:</span><span>{{data.userIdcard.strIdType | dataIsTrue}}</span></p>
              </div>
              <div class="oneLineHasOne">
                <p>
                  <span>bio pic similarity:</span>
                  <span v-if="data.similarity">{{String(data.similarity).slice(0,5)}}%</span>
                  <span v-else>{{$store.state.common.nullData}}</span>
                </p>
              </div>
              <div class="imgbox">
                <div v-if="data.userIdcard.idcardPhotoUrl" class="imglist pic" @click="openBox({imgUrl:data.userIdcard.idcardPhotoUrl})">
                  <span>{{$t('pic.no12')}}</span>
                  <img :src="data.userIdcard.idcardPhotoUrl" alt="证件照" >
                </div>
                <div v-if="data.userIdcard.facetimePhotoUrl" class="imglist pic" @click="openBox({imgUrl:data.userIdcard.facetimePhotoUrl})">
                  <span>{{$t('pic.no13')}}</span>
                  <img :src="data.userIdcard.facetimePhotoUrl" alt="活体照" >
                </div>
              </div>
              <hr class="mg10">
              <!-- 工作信息 -->
              <div class="oneLineHasOne">
                <p><span>facebook:</span><span>{{data.userSelf.facebook | dataIsTrue}}</span></p>
              </div>
              <div class="oneLineHasOne">
                <p><span>email:</span><span>{{data.userSelf.email | dataIsTrue}}</span></p>
              </div>
              <div class="oneLineHasOne">
                <p><span>{{$t('public.no7')}}:</span><span>{{data.userSelf.liveAddress | dataIsTrue}}</span></p>
              </div>
              <div class="imgbox">
                <div v-if="data.userBank.bankPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userBank.bankPicUrl})">
                  <span>{{$t('pic.no7')}}</span>
                  <img :src="data.userBank.bankPicUrl" alt="银行卡照片" >
                </div>
                <template v-if="data.userSelf.picType==1">
                  <div v-if="data.userSelf.livePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.livePicUrl})">
                    <span>{{$t('pic.no14')}}</span>
                    <img :src="data.userSelf.livePicUrl" alt="居住照" >
                  </div>
                </template>
                <template else>
                  <div v-if="data.userSelf.workPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.workPicUrl})">
                    <span>{{$t('pic.no15')}}</span>
                    <img :src="data.userSelf.workPicUrl" alt="工作照" >
                  </div>
                </template>
              </div>
              <hr class="mg10">
              <!-- 工作信息 -->
              <template v-if="data.userWork.industry!='7'">
                <div class="oneLineHasOne">
                  <p><span>company name:</span><span>{{data.userWork.company | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>company landline:</span><span>{{data.userWork.companyPhone | dataIsTrue}}</span></p>
                </div>
                <!-- <div class="oneLineHasOne">
                  <p><span>entry time:</span><span>{{data.userWork.strEntryTime | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>pay day 1:</span><span>{{data.userWork.payday | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>pay day 2:</span><span>{{data.userWork.paydayTwo | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>daily work from:</span><span>{{data.userWork.startWorkTime | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>daily work to:</span><span>{{data.userWork.endWorkTime | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>company full address:</span><span>{{data.userWork.companyAddress | dataIsTrue}}</span></p>
                </div> -->
                <div class="imgbox">
                  <div v-if="data.userWork.incomePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                    <span>{{$t('pic.no16')}}</span>
                    <img :src="data.userWork.incomePicUrl" alt="工资单照片" >
                  </div>
                  <div v-if="data.userWork.workCardPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.workCardPicUrl})">
                    <span>{{$t('pic.no17')}}</span>
                    <img :src="data.userWork.workCardPicUrl" alt="工牌" >
                  </div>
                </div> 
                <hr class="mg10">
              </template>
              
              <!-- 主体信息 -->
              <template v-else>
                <div class="oneLineHasOne">
                  <p><span>business name:</span><span>{{data.userWork.company | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>business phone:</span><span>{{data.userWork.companyPhone | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>business hour:</span><span>{{data.userWork.strEntryTime | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>monthly business cost:</span><span>{{data.userWork.monthIncome | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>monthly business earning:</span><span>{{data.userWork.monthCost | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>business address:</span><span>{{data.userWork.companyAddress | dataIsTrue}}</span></p>
                </div>
                <div class="imgbox">
                  <div v-if="data.userWork.incomePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                    <span>{{$t('pic.no18')}}</span>
                    <img :src="data.userWork.incomePicUrl" alt="授权许可证" >
                  </div>
                  <template v-if="data.userSelf.picType==1">
                    <div v-if="data.userSelf.workPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.workPicUrl})">
                      <span>{{$t('pic.no15')}}</span>
                      <img :src="data.userSelf.workPicUrl" alt="工作照" >
                    </div>
                  </template>
                  <template else>
                    <div v-if="data.userSelf.livePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.livePicUrl})">
                      <span>{{$t('pic.no14')}}</span>
                      <img :src="data.userSelf.livePicUrl" alt="居住照" >
                    </div>
                  </template>
                </div> 
              </template>

              <!-- 埋点信息 -->
              <hr class="mg10">
              <table class="write-table" >
                <tr>
                  <th width="40%">{{$t('fei.no49')}}</th>
                  <th width="60%">GPS</th>
                </tr>
                <template v-if="data.deviceInfo!=''">
                  <tr v-for="(value,index) in data.deviceInfo" :key="index">
                    <td>{{value.eventTypeStr | dataIsTrue}}</td>
                    <td>{{$store.getters.longitudeAndLatitude(value.latitude)+'-'+$store.getters.longitudeAndLatitude(value.longitude)}}</td>
                  </tr>
                </template>
                <template v-else>
                  <div style="textAlign:center;width:250%;height:40px;lineHeight:40px">
                    {{$t('public.no23')}}
                  </div>
                </template>
              </table>
              
            </div>
            
            <div class="right">
              <h4 class="fs14">{{$t('add.no61')}}</h4>
              <h4 class="mg10">本人 :</h4>
              <ul class="right-ul">
                <li class="right-list" v-if="data.userUrgentContact.contactOnePhone!=''">
                  <div class="group">
                    <span title="结果" >{{phoneViewSelect.call_a}}</span>
                    <span class="mr25">{{$t('public.name')}}:{{data.userBase.name | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.userTel')}}:{{data.userBase.phone | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.no17')}}:本人</span>
                    <i class="el-icon-phone phone" @click="showTelAudit(1)"></i>
                  </div>
                </li>
              </ul>
            
              <h4 class="mg10">emergency contact :</h4>
              <ul class="right-ul">
                <li class="right-list" v-if="data.userUrgentContact.contactOnePhone!=''">
                  <div class="group">
                    <span title="结果" >{{phoneViewSelect.call_a}}</span>
                    <span class="mr25">{{$t('public.name')}}:{{data.userUrgentContact.contactOneName | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.userTel')}}:{{data.userUrgentContact.contactOnePhone | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.no17')}}:{{data.userUrgentContact.contactOneRelationName | dataIsTrue}}</span>
                    <i class="el-icon-phone phone" @click="showTelAudit(3,31)"></i>
                  </div>
                </li>
                <li class="right-list" v-if="data.userUrgentContact.contactTwoPhone!=''">
                  <div class="group">
                    <span title="结果" >{{phoneViewSelect.call_b}}</span>
                    <span class="mr25">{{$t('public.name')}}:{{data.userUrgentContact.contactTwoName | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.userTel')}}:{{data.userUrgentContact.contactTwoPhone | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.no17')}}:{{data.userUrgentContact.contactTwoRelationName | dataIsTrue}}</span>
                    <i class="el-icon-phone phone" @click="showTelAudit(3,32)"></i>
                  </div>
                </li>
                <li class="right-list" v-if="data.userUrgentContact.contactThreePhone!=''">
                  <div class="group">
                    <span title="结果" >{{phoneViewSelect.call_c}}</span>
                    <span class="mr25">{{$t('public.name')}}:{{data.userUrgentContact.contactThreeName | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.userTel')}}:{{data.userUrgentContact.contactThreePhone | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.no17')}}:{{data.userUrgentContact.contactThreeRelationName | dataIsTrue}}</span>
                    <i class="el-icon-phone phone" @click="showTelAudit(3,33)"></i>
                  </div>
                </li>
              </ul>

              <h4 class="mg10">company contact :</h4>
              <ul class="right-ul">
                <li class="right-list">
                  <span class="mr20 text-right w200">company landline:</span>
                  <div class="group">
                    <span  class="mr20">{{data.userWork.companyPhone}}</span>
                    <i class="el-icon-phone phone " @click="showTelAudit(2)"></i>
                  </div>
                </li>
              </ul>
              
              <h4 class="mg10">personal suggestion:</h4>
              <div class="suggest mg10">
                <el-input type="textarea" :rows="6" v-model="oneRemark" @change="areachange(2)" maxlength="400"></el-input>
              </div>
              <div class="button mt20 flex flex-center">
                <el-button class="mlr10" type="primary" @click="submit(1)">{{$t('add.no67')}}</el-button>
                <el-button class="mlr10" type="primary" @click="submit(-1)">{{$t('add.no68')}}</el-button>
              </div>

            </div>
          </div>

          <div v-if="viewNumber==3">
            <div class="info flex">
              <div class="left">
                <!-- 用户信息 -->
                <div class="oneLineHasOne">
                  <p><span>ID type:</span><span>{{data.userIdcard.strIdType | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p>
                    <span>bio pic similarity:</span>
                    <span v-if="data.similarity">{{String(data.similarity).slice(0,5)}}%</span>
                    <span v-else>{{$store.state.common.nullData}}</span>
                  </p>
                </div>
                <div class="imgbox">
                  <div v-if="data.userIdcard.idcardPhotoUrl" class="imglist pic" @click="openBox({imgUrl:data.userIdcard.idcardPhotoUrl})">
                    <span>{{$t('pic.no12')}}</span>
                    <img :src="data.userIdcard.idcardPhotoUrl" alt="证件照" >
                  </div>
                  <div v-if="data.userIdcard.facetimePhotoUrl" class="imglist pic" @click="openBox({imgUrl:data.userIdcard.facetimePhotoUrl})">
                    <span>{{$t('pic.no13')}}</span>
                    <img :src="data.userIdcard.facetimePhotoUrl" alt="活体照" >
                  </div>
                </div>
                <hr class="mg10">
                <!-- 工作信息 -->
                <div class="oneLineHasOne">
                  <p><span>facebook:</span><span>{{data.userSelf.facebook | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>email:</span><span>{{data.userSelf.email | dataIsTrue}}</span></p>
                </div>
                <div class="oneLineHasOne">
                  <p><span>{{$t('public.no7')}}:</span><span>{{data.userSelf.liveAddress | dataIsTrue}}</span></p>
                </div>
                <div class="imgbox">
                  <div v-if="data.userBank.bankPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userBank.bankPicUrl})">
                    <span>{{$t('pic.no7')}}</span>
                    <img :src="data.userBank.bankPicUrl" alt="银行卡照片" >
                  </div>
                  <template v-if="data.userSelf.picType==1">
                    <div v-if="data.userSelf.livePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.livePicUrl})">
                      <span>{{$t('pic.no14')}}</span>
                      <img :src="data.userSelf.livePicUrl" alt="居住照" >
                    </div>
                  </template>
                  <template else>
                    <div v-if="data.userSelf.workPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.workPicUrl})">
                      <span>{{$t('pic.no15')}}</span>
                      <img :src="data.userSelf.workPicUrl" alt="工作照" >
                    </div>
                  </template>
                </div>
                
                <hr class="mg10">
                <!-- 工作信息 -->
                <template v-if="data.userWork.industry!='7'">
                  <div class="oneLineHasOne">
                    <p><span>company name:</span><span>{{data.userWork.company | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>company landline:</span><span>{{data.userWork.companyPhone | dataIsTrue}}</span></p>
                  </div>
                  <!-- <div class="oneLineHasOne">
                    <p><span>entry time:</span><span>{{data.userWork.strEntryTime | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>pay day 1:</span><span>{{data.userWork.payday | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>pay day 2:</span><span>{{data.userWork.paydayTwo | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>daily work from:</span><span>{{data.userWork.startWorkTime | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>daily work to:</span><span>{{data.userWork.endWorkTime | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>company full address:</span><span>{{data.userWork.companyAddress | dataIsTrue}}</span></p>
                  </div> -->
                  <div class="imgbox">
                    <div v-if="data.userWork.incomePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                      <span>{{$t('pic.no16')}}</span>
                      <img :src="data.userWork.incomePicUrl" alt="工资单照片" >
                    </div>
                    <div v-if="data.userWork.workCardPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.workCardPicUrl})">
                      <span>{{$t('pic.no17')}}</span>
                      <img :src="data.userWork.workCardPicUrl" alt="工牌" >
                    </div>
                  </div> 
                  <hr class="mg10">
                </template>
                
                <!-- 主体信息 -->
                <template v-else>
                  <div class="oneLineHasOne">
                    <p><span>business name:</span><span>{{data.userWork.company | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>business phone:</span><span>{{data.userWork.companyPhone | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>business hour:</span><span>{{data.userWork.strEntryTime | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>monthly business cost:</span><span>{{data.userWork.monthIncome | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>monthly business earning:</span><span>{{data.userWork.monthCost | dataIsTrue}}</span></p>
                  </div>
                  <div class="oneLineHasOne">
                    <p><span>business address:</span><span>{{data.userWork.companyAddress | dataIsTrue}}</span></p>
                  </div>
                  <div class="imgbox">
                    <div v-if="data.userWork.incomePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                      <span>{{$t('pic.no18')}}</span>
                      <img :src="data.userWork.incomePicUrl" alt="授权许可证" >
                    </div>
                    <template v-if="data.userSelf.picType==1">
                      <div v-if="data.userSelf.workPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.workPicUrl})">
                        <span>{{$t('pic.no15')}}</span>
                        <img :src="data.userSelf.workPicUrl" alt="工作照" >
                      </div>
                    </template>
                    <template else>
                      <div v-if="data.userSelf.livePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.livePicUrl})">
                        <span>{{$t('pic.no14')}}</span>
                        <img :src="data.userSelf.livePicUrl" alt="居住照" >
                      </div>
                    </template>
                  </div> 
                </template>
                
                <hr class="mg10">
                <!-- 埋点信息 -->
                <table class="write-table" >
                  <tr>
                    <th width="40%">{{$t('fei.no49')}}</th>
                    <th width="60%">GPS</th>
                  </tr>
                  <template v-if="data.deviceInfo!=''">
                    <tr v-for="(value,index) in data.deviceInfo" :key="index">
                      <td>{{value.eventTypeStr | dataIsTrue}}</td>
                      <td>{{$store.getters.longitudeAndLatitude(value.latitude)+'-'+$store.getters.longitudeAndLatitude(value.longitude)}}</td>
                    </tr>
                  </template>
                  <template v-else>
                    <div style="textAlign:center;width:250%;height:40px;lineHeight:40px">
                      {{$t('public.no23')}}
                    </div>
                  </template>
                </table>
              </div>
              
              <div class="right">
                <p class="mg10">{{$t('public.no32')}}:{{data.approveAdminName}}</p>
                <p class="mg10">{{$t('new.no9')}}:{{oldReview.createTime + ' ~ ' + oldReview.updateTime}}</p>
                <ul class="right-ul">
                  <li class="right-list" >
                    <span class="mr20">{{$t('add.no62')}}</span>
                    <div class="group">
                      <el-radio-group v-model="radioArray[0].value" disabled>
                        <el-radio v-for="(value,index) in radioArray[0].radioGroup" :key="index" :label="value.label"></el-radio>
                      </el-radio-group>
                    </div>
                  </li>
                  <p class="mg10">personal suggestion:</p>

                </ul>
              </div>
            </div>
          </div>
        </li>
        <!------------------------ 通话记录信息 ------------------------>
        <li  v-show="active==3">
          <template v-if="orderId">
            <tel-record-list :detail="telDetail" :order-no="orderNo" :user-id="userId" :order-id="orderId" :type="1"></tel-record-list>

          </template>
        </li>
        <!------------------------ 电话审核记录信息 ---------------------------->
        <li  v-if="active==4">
          <template v-if="orderId">
            <tel-audit-list :order-id="orderId"></tel-audit-list>
          </template>
        </li>
        <!------------------------ 历史借款记录信息 ---------------------------->
        <li  v-if="active==5">
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
      </ul>
    </div>

    <div class="foot"></div>

    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>

    <!-- ------------------ 点击电话审核弹窗开始 -------------------- -->
    <div v-if="telFlag1||telFlag2||telFlag3" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('auditDetail.no42')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="telClose"></i>
        </div>
        <div class="reply-main-con">
          <div class="left2right">
            <span class="left" style="width:120px">call to whom?:</span>
            <div class="right">
              {{telType}}
            </div>
          </div>
          <div class="left2right">
            <span class="left" style="width:120px">result:</span>
            <div class="right">
              <el-select size="small" v-model="telStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="left2right" v-if="telFlag1">
            <span class="left" style="width:120px">{{$t('add.no62')}}:</span>
            <div class="right">
              <el-radio-group v-model="telStatus1" @change="radioChange(telStatus1, 37, 4)">
                <el-radio v-for="(value,index) in radioArray[0].radioGroup" :key="index" :label="value.label"></el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="left2right">
            <span class="left" style="width:120px">remark:</span>
            <div class="right">
              <el-input type="textarea" rows="4" v-model="telRemark"></el-input>
            </div>
          </div>
          <div class="left2right">
            <span class="left"></span>
            <div class="right">
              <el-button type="primary" @click="telAuditSure">{{$t('public.no49')}}</el-button>
              <el-button type="primary" @click="telClose">{{$t('public.no50')}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-else class="back">
    <p>{{$t('public.no23')}}，<span @click="back">{{$t('back.no1')}}</span> {{$t('back.no2')}}</p>
  </div>

  
</template>
<script>

import telRecordList from '../../../components/component/teltable'
import telAuditList from '../../../components/component/telAuditList'
import loanList from '../../../components/component/loantable'

import appLightbox from '../../../components/component/lightbox'// 图片点击放大组件

export default {
  name: 'auditDetail',
  components: {
    telRecordList,
    telAuditList,
    loanList,
    appLightbox
  },
  data () {
    return {
      flag: true,
      telFlag1: false,
      telFlag2: false,
      telFlag3: false,
      block: '', // 页面上级来源
      sessionid: '',
      userId: '', // 上个页面传过来的用户ID
      orderNo: '', // 上个页面传过来的订单编号
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
        loginCount: '',
        userOrderCount: {},
        contactOtherOne: '',
        contactOtherTwo: '',
        similarity: '',
        approveAdminName: '',
        contactTwo: '',
        contactThree: '',
        userPhoneOperator: '',
        contactOnePhoneOperator: '',
        contactTwoPhoneOperator: '',
        contactThreePhoneOperator: ''
      },
      active: 1,
      active2: 1,
      lightBoxToggle: false, // 图片点击放大开关
      tableData: [], // 电话审核记录数据
      oldReview: {
        // work: 'normal'
      },
      phoneViewSelect: {
        // work: 'normal'
      },
      radioArray:[
        {id: 37, title: 'work/business status', value: '', radioGroup: [ { label: 'no change' }, { label: 'changed' }, { label: 'unemployeed/business failed' } ]} 
      ],
      viewNumber: 0,
      oneRemark: '',
      telStatus: '', // 电话审核下拉框选中项
      telRemark: '', // 电话审核备注信息内容
      telStatus1: '', // 电话审核备注信息内容
      telType: '', // 电话类型
      options: [{id:1,label:'Yes',value:'Yes'},{id:2,label:'No',value:'No'},{id:3,label:'non-c',value:'non-c'}],
      telRadioId: '',// 紧急联系人选中项ID
      isTelAudit: false,
    }
  },
  computed: {// 选项卡国际化
    arr1 () {
      let arr = []
      arr.push({id: 1, title: this.$t('tab2.no1')})
      arr.push({id: 3, title: this.$t('tab2.no2')})
      arr.push({id: 4, title: this.$t('auditDetail.no22')})
      arr.push({id: 5, title: this.$t('tab2.no4')})
      return arr
    },
    arr3 () {
      let arr = []
      arr.push({id: 1, title: this.$t('operationDetail.tab1.no1')})
      arr.push({id: 2, title: this.$t('operationDetail.tab1.no2')})
      return arr
    },
  },
  methods: {
    openBox: function (obj) { // 图片点击放大显示
      this.currentObj = obj
      this.lightBoxToggle = !this.lightBoxToggle
    },
    closeBox: function () { // 图片点击放大关闭
      this.lightBoxToggle = false
    },
    telDetail () { // 传入通话子组件的方法
      // this.telRecord()// 初审电话审核记录
    },
    detail () { // 初审页面详细信息
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
          this.data.loginCount = res.data.data.loginCount;
          this.data.userPhoneOperator = res.data.data.userPhoneOperator;
          this.data.contactOnePhoneOperator = res.data.data.contactOnePhoneOperator;
          this.data.contactTwoPhoneOperator = res.data.data.contactTwoPhoneOperator;
          this.data.contactThreePhoneOperator = res.data.data.contactThreePhoneOperator;
          this.data.userOrderCount = res.data.data.userOrderCount;
          this.data.orderExtra = res.data.data.orderExtra;
          this.data.similarity = res.data.data.similarity;
          this.data.deviceInfo = res.data.data.deviceInfo;
          this.data.approveAdminName = res.data.data.approveAdminName;
          if (res.data.data.recentCollection != '') {
            this.tableData = res.data.data.recentCollection.valueList;
          }
          
          this.getRadioHistory()
          
        }
      })
    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1)
    },
    radioChange(value, id, type){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0017,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        orderId: this.orderId,
        userId: this.userId,
        parentType: type,
        childType: id,
        result: value,
        status: -1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
      
    },
    getRadioHistory(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0021,
          'sessionid': this.sessionid
        },
        orderId: this.orderId,
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if(this.block==1){
            this.viewNumber = 3
          }else{
            this.viewNumber = 1
          }
          if(res.data.data.oldReview){
            if(this.block==1){
              this.viewNumbe = 3
            }else{
              if(this.data.order.status==-20||this.data.order.status==21){
                this.viewNumbe = 3
              }else{
                if(res.data.data.oldReview.some(value => value.status == -1)){
                  this.viewNumbe = 1
                }else{
                  this.viewNumbe = 3
                }
              }
            }
            res.data.data.oldReview.forEach(value => {
              if (value.childType==997){
                this.oneRemark = value.result
              } else {
                if(this.radioArray.filter(item => value.childType == item.id)[0]){
                  this.radioArray.filter(item => value.childType == item.id)[0].value = value.result
                }
              }
            })

          }
        }
      })
    },
    submit(type){
      if(this.isTelAudit){
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.ME0025,
            'sessionid': this.sessionid
          },
          orderNo: this.orderNo,
          orderId: this.orderId,
          userId: this.userId,
          approveResult: type,
        }
        this.$axios.post('', option).then(res => {
          if (res.data.header.code == 0) {
            this.viewNumber = 3
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
        })
      }else{
        return this.$globalMsg.error(this.$t('add.no66'))
      }
      
    },
    areachange(){
      this.radioChange(this.oneRemark,997,4)
    },
    showTelAudit(type,id) {
      if(type == 1){
        this.telFlag1 = true;
        this.telType = 'personal contact';
      }
      if(type == 2){
        this.telFlag2 = true;
        this.telType = 'company contact';
      }
      if(type == 3){
        this.telFlag3 = true;
        this.telRadioId = id;
        this.telType = id==31?'emergency contact-A':id==32?'emergency contact-B':id==33?'emergency contact-C':'emergency contact';
      }
    },
    telClose () {
      this.telFlag1 = false
      this.telFlag2 = false
      this.telFlag3 = false
      this.telStatus = ''
      this.telStatus1 = ''
      this.telRemark = ''
    },
    telAuditSure(){
      if(this.telFlag1&&this.telStatus1==''){
        return this.$globalMsg.error(this.$t('public.no88'))
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0018,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        orderId: this.orderId,
        userId: this.userId,
        phoneType: this.telType,
        phoneFeedback: this.telStatus,
        remark: this.telRemark
      }
      if(this.telFlag1){
        option.parentType = 4;
        option.workStatus = this.telStatus1;
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if(this.telFlag1){
            this.isTelAudit = true
          }
          this.$globalMsg.success(this.$t('message.success'))
          this.telClose()
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
  },
  watch: {
    
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')

    this.userId = this.$route.query.userid
    this.orderNo = this.$route.query.orderNo
    this.orderId = this.$route.query.orderId
    this.block = this.$route.query.block
    
    this.detail()// 初审页面详细信息
    
  }
}
</script>

<style scoped lang="scss">

  .mg10{
    margin: 10px 0;
  }
  .mlr10{
    margin: 0 40px;
  }
  .mr20{
    display: inline-block;
    margin-right: 10px;
  }
  .mr25{
    margin-right: 15px;
  }
  .phone{
    font-size: 20px;
    cursor: pointer;
  }
  .fs14{
    font-size: 14px;
  }
  .fl-right{
    float: right;
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

  .left{
    width: 40%;
  }

  .imgbox{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #fff;
    margin-top: 10px;
    .imglist{
      width: 140px;
      height: 140px;
      margin-right: 10px;
      span{
        height: 40px;
        font-size: 12px;
      }
      img{
        width: 100%;
        height: 100px;
      }
    }

  }

  .write-table{
    width: 100%;
    margin-bottom: 1em;
    overflow: auto;
    display: table;
    box-sizing: border-box;
    text-shadow: 0px 1px 0px #fff;
    border-collapse: collapse;
    border-spacing: 0;
    color: #292e31;
    font-size: 14px;
    tr:last-child {
        border-bottom: 1px solid #ccc;
    }
    tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }
    th {
        padding: 5px 10px;
        border-bottom: 1px solid #ccc;
        vertical-align: bottom;
        line-height: 1.6;
        text-align: center;
        font-weight: bold;
        display: table-cell;
    }
    td{
        display: table-cell;
        padding: 10px;
        vertical-align: top;
        line-height: 1.6;
    }
  }
  .right-list{
    min-height: 40px;
    display: flex;
    font-size: 14px;
  }
  .right-ul{
    padding-left: 10px;
  }
  .group{
    flex: 1;
    .no{
      display: inline-block;
      width: 100px;
      border: 1px solid #333;
      text-align: center;
      height: 40px;
      line-height: 40px;
      &:last-child{
        color: rgb(219, 37, 37);
      }
    }
    
  }
  .span_flex{
    display: flex;
    flex-wrap: wrap;
    width: 610px;
  }

  .info .el-radio{
    margin-bottom: 10px;
    min-width: 80px;
  }
  .phoneview .el-radio{
    margin-bottom: 10px;
    margin-right: 20px;
  }
  .text-right{
    text-align: right;
    padding-right: 10px;
    line-height: 20px;
  }
  .w200{
    width: 150px;
  }
  
  .reply{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    @include flex-cen;
    background-color: rgba(182, 189, 205, 0.6);
    z-index: 1009;
    .reply-main{
      width: 650px;
      height: auto;
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

  .pos-re{
    position: relative;
  }
  .pos-abs{
    position: absolute;
  }
  .pos-fix{
    position: fixed;
  }
  .pos{
    background-color: #fff;
    width: calc(100% - 330px);
    z-index: 100;
  }
  .crumbs{
    padding-top: 30px;
  }
  .public_main{
    padding-top: 0;
  }
  .pos_height{
    overflow-y: scroll;
    height: 300px;
  }
</style>
