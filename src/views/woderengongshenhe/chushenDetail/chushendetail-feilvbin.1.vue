<template>
  <div v-if="data" class="public_main">
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
      <ul class="tabs_main">
        <li  v-show="active2==1">
          <div class="oneLineHasFour">
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
            <p><span>ID Card:</span>
              <span>{{data.userIdcard.idCard | dataIsTrue}}</span>
            </p>
            <p><span>Bank No:</span>
              <span>{{data.userBank.bankAccount | dataIsTrue}}</span>
            </p>
          </div>
        </li>
        <li  v-show="active2==2">
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
          <!-- <div class="oneLineHasFour">
            <p><span>{{$t('fei.no17')}}:</span>
              <span>{{data.order.instalment | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('fei.no22')}}:</span>
              <span>{{$t($store.getters.loanUse_status(data.orderExtra.loanUse))}}</span>
            </p>
          </div> -->
        </li>
      </ul>
    </div>
    
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
          <div class="info flex" v-if="viewNumbe==1">
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
                  <img :src="data.userIdcard.idcardPhotoUrl" alt="证件照" >
                </div>
                <div v-if="data.userIdcard.facetimePhotoUrl" class="imglist pic" @click="openBox({imgUrl:data.userIdcard.facetimePhotoUrl})">
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
                  <img :src="data.userBank.bankPicUrl" alt="银行卡照片" >
                </div>
                <template v-if="data.userSelf.picType==1">
                  <div v-if="data.userSelf.livePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.livePicUrl})">
                    <img :src="data.userSelf.livePicUrl" alt="居住照" >
                  </div>
                </template>
                <template else>
                  <div v-if="data.userSelf.workPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.workPicUrl})">
                    <img :src="data.userSelf.workPicUrl" alt="居住照" >
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
                <div class="oneLineHasOne">
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
                </div>
                <div class="imgbox">
                  <div v-if="data.userWork.incomePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                    <img :src="data.userWork.incomePicUrl" alt="工资单照片" >
                  </div>
                  <div v-if="data.userWork.workCardPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.workCardPicUrl})">
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
                    <img :src="data.userWork.incomePicUrl" alt="授权许可证" >
                  </div>
                  <template v-if="data.userSelf.picType==1">
                    <div v-if="data.userSelf.workPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.workPicUrl})">
                      <img :src="data.userSelf.workPicUrl" alt="居住照" >
                    </div>
                  </template>
                  <template else>
                    <div v-if="data.userSelf.livePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.livePicUrl})">
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
              <ul class="right-ul">
                <li class="right-list" v-for="(item,index) in radioArray" :key="index">
                  <span class="mr20">{{item.title}}</span>
                  <div class="group">
                    <el-radio-group v-model="item.value" @change="radioChange(item.value, item.id, 1)">
                      <el-radio v-for="(value,index) in item.radioGroup" :key="index" :label="value.label"></el-radio>
                    </el-radio-group>
                  </div>
                </li>
                <h4 class="mg10">personal suggestion:</h4>
                <div class="suggest mg10">
                  <el-input v-model="oneRemark" type="textarea" :rows="6" @change="areachange(1)" maxlength="400"></el-input>
                </div>
                <div class="button mt20 flex flex-center">
                  <el-button type="primary" @click="submit(1)">{{$t('public.no49')}}</el-button>
                </div>
              </ul>
            </div>
          </div>
          <div class="phoneview" v-if="viewNumbe==2">
            <section></section>
            <h4 class="mg10"> <span class="mr25">personal contact :</span> <i class="el-icon-phone phone" @click="showTelAudit(1)"></i></h4>
            <ul class="right-ul">
              <li class="right-list" v-for="item in phoneradioArray.filter(value=>value.id<=28)" :key="item.id">
                <span class="mr20 text-right w200">{{item.title}}:</span>
                <div class="group">
                  <template v-if="item.hasOneInput">
                    <el-input  v-model="item.radioInput" @change="InputChange(item.radioInput,item.id)" size="small" style="width:100px;margin-right:20px"></el-input>
                  </template>
                  <template v-if="item.inputLabel1">
                    <span>{{item.inputLabel1}}</span>
                    <el-input  v-model="item.oneInput" @change="InputChange(item.oneInput,item.id,1)" size="small" style="width:100px;margin-right:20px"></el-input>
                  </template>
                  <template v-if="item.inputLabel2">
                    <span>{{item.inputLabel2}}</span>
                    <el-input  v-model="item.twoInput" @change="InputChange(item.twoInput,item.id,2)" size="small" style="width:100px;;margin-right:20px"></el-input>
                  </template>
                  <el-radio-group 
                    v-model="item.value" 
                    v-for="(value,index) in item.radioGroup" 
                    :key="index" 
                    @change="phoneRadioChange(item.value,item.id)">
                    <el-radio :label="value.label"></el-radio>
                  </el-radio-group>
                </div>
              </li>
              
              <template v-if="data.userWork.industry!='7'">
                <li  class="right-list " v-for="item in phoneradioArray.filter(value=>value.id==29)" :key="item.id" >
                  <span class="mr20 text-right w200">attended or not when apply</span>
                  <div class="group">
                    <el-radio-group 
                      v-model="item.value"
                      v-for="(value,index) in item.radioGroup" 
                      :key="index" 
                      @change="radioChange(item.value,item.id,2)">
                      <el-radio :label="value.label"></el-radio>
                      <!-- <el-radio label="yes--suspicious"></el-radio> -->
                    </el-radio-group>
                  </div>
                </li>
                <template v-if="phoneradioArray.filter(value=>value.id==29)[0].value=='No'">
                  <li  class="right-list " v-for="item in phoneradioArray.filter(value=>value.id==30)" :key="item.id">
                    <span class="mr20 text-right w200">why not attended</span>
                    <div class="group">
                      <el-radio-group 
                        v-model="item.value"
                        v-for="(value,index) in item.radioGroup" 
                        :key="index" 
                        @change="radioChange(item.value,item.id,2)">
                        <el-radio :label="value.label"></el-radio>
                        <!-- <el-radio label="on leave"></el-radio>
                        <el-radio label="outside the office"></el-radio>
                        <el-radio label="on business trip"></el-radio>
                        <el-radio label="unemployeed"></el-radio> -->
                      </el-radio-group>
                    </div>
                  </li>
                </template>
                
              </template>
  
            </ul>

            <template v-if="data.userWork.industry!='7'">
              <h4 class="mg10">company contact :</h4>
              <ul class="right-ul">
                <li class="right-list">
                  <span class="mr20 text-right w200">company landline:</span>
                  <div class="group">
                    <el-input 
                      v-if="radioArray.filter(value=>value.id==17)[0].value=='No'"
                      size="small" 
                      v-model="changeuser.phone" 
                      style="width:224px;margin-right:20px"
                      @change="modifyUserInfo(3)"></el-input>
                    <span v-else class="mr20">{{data.userWork.companyPhone}}</span>
                    <i class="el-icon-phone phone " @click="showTelAudit(2)"></i>
                  </div>
                </li>
                <li class="right-list">
                  <span class="mr20 text-right w200">call out:</span>
                  <div class="group ">
                    <div class="span_flex">
                      <template >
                      <span v-for="(item,index) in callOutList" :key="index" class="no">
                        {{item.result?item.result:' '}}
                      </span>
                      <br >
                      </template>
                      
                    </div>
                    
                  </div>
                </li>
                <li  class="right-list mt15" v-for="item in phoneradioArray.filter(value=>value.id==35)" :key="item.id">
                  <span class="mr20 text-right w200">{{item.title}}</span>
                  <div class="group">
                    <el-radio-group v-model="item.value" @change="radioChange(item.value, item.id, 2)">
                      <el-radio v-for="(value,index) in item.radioGroup" :key="index" :label="value.label"></el-radio>
                    </el-radio-group>
                  </div>
                </li>
                <!-- <li class="right-list mt15">
                  <span class="mr20 text-right w200">verify information:</span>
                  <div class="group">
                    <el-input size="small" style="width:80px;margin-right:20px"></el-input>
                    <el-radio-group v-model="phoneViewSelect.id">
                      <el-radio label="hesitate"></el-radio>
                      <el-radio label="non-C"></el-radio>
                    </el-radio-group>
                  </div>
                </li> -->
              </ul>
            </template>
            
            <h4 class="mg10">emergency contact :</h4>
            <ul class="right-ul">
              <li class="right-list" v-if="data.userUrgentContact.contactOnePhone!=''">
                <span class="mr20 text-right w200">call--A:</span>
                <div class="group">
                  <span title="结果" class="mr25">{{phoneViewSelect.call_a}}</span>
                  <span class="mr25">{{$t('public.name')}}:{{data.userUrgentContact.contactOneName | dataIsTrue}}</span>
                  <span class="mr25">{{$t('public.userTel')}}:{{data.userUrgentContact.contactOnePhone | dataIsTrue}}</span>
                  <span class="mr25">{{$t('public.no17')}}:{{data.userUrgentContact.contactOneRelationName | dataIsTrue}}</span>
                  <i class="el-icon-phone phone" @click="showTelAudit(3,31)"></i>
                </div>
              </li>
              <li class="right-list" v-if="data.userUrgentContact.contactTwoPhone!=''">
                <span class="mr20 text-right w200">call--B:</span>
                <div class="group">
                  <span title="结果" class="mr25">{{phoneViewSelect.call_b}}</span>
                  <span class="mr25">{{$t('public.name')}}:{{data.userUrgentContact.contactTwoName | dataIsTrue}}</span>
                  <span class="mr25">{{$t('public.userTel')}}:{{data.userUrgentContact.contactTwoPhone | dataIsTrue}}</span>
                  <span class="mr25">{{$t('public.no17')}}:{{data.userUrgentContact.contactTwoRelationName | dataIsTrue}}</span>
                  <i class="el-icon-phone phone" @click="showTelAudit(3,32)"></i>
                </div>
              </li>
              <li class="right-list" v-if="data.userUrgentContact.contactThreePhone!=''">
                <span class="mr20 text-right w200">call--C:</span>
                <div class="group">
                  <span title="结果" class="mr25">{{phoneViewSelect.call_c}}</span>
                  <span class="mr25">{{$t('public.name')}}:{{data.userUrgentContact.contactThreeName | dataIsTrue}}</span>
                  <span class="mr25">{{$t('public.userTel')}}:{{data.userUrgentContact.contactThreePhone | dataIsTrue}}</span>
                  <span class="mr25">{{$t('public.no17')}}:{{data.userUrgentContact.contactThreeRelationName | dataIsTrue}}</span>
                  <i class="el-icon-phone phone" @click="showTelAudit(3,33)"></i>
                </div>
              </li>
            </ul>


            <h4 class="mg10">personal suggestion:</h4>
            <div class="suggest mg10">
              <el-input type="textarea" :rows="6" v-model="twoRemark" @change="areachange(2)" maxlength="400"></el-input>
            </div>
            <div class="button mt20 flex flex-center">
              <el-button type="primary" @click="submit(2)">{{$t('public.no49')}}</el-button>
            </div>
          </div>

          <div v-if="viewNumbe==3">
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
                    <img :src="data.userIdcard.idcardPhotoUrl" alt="证件照" >
                  </div>
                  <div v-if="data.userIdcard.facetimePhotoUrl" class="imglist pic" @click="openBox({imgUrl:data.userIdcard.facetimePhotoUrl})">
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
                    <img :src="data.userBank.bankPicUrl" alt="银行卡照片" >
                  </div>
                  <template v-if="data.userSelf.picType==1">
                    <div v-if="data.userSelf.livePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.livePicUrl})">
                      <img :src="data.userSelf.livePicUrl" alt="居住照" >
                    </div>
                  </template>
                  <template else>
                    <div v-if="data.userSelf.workPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.workPicUrl})">
                      <img :src="data.userSelf.workPicUrl" alt="居住照" >
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
                  <div class="oneLineHasOne">
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
                  </div>
                  <div class="imgbox">
                    <div v-if="data.userWork.incomePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                      <img :src="data.userWork.incomePicUrl" alt="工资单照片" >
                    </div>
                    <div v-if="data.userWork.workCardPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userWork.workCardPicUrl})">
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
                      <img :src="data.userWork.incomePicUrl" alt="授权许可证" >
                    </div>
                    <template v-if="data.userSelf.picType==1">
                      <div v-if="data.userSelf.workPicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.workPicUrl})">
                        <img :src="data.userSelf.workPicUrl" alt="居住照" >
                      </div>
                    </template>
                    <template else>
                      <div v-if="data.userSelf.livePicUrl" class="imglist pic" @click="openBox({imgUrl:data.userSelf.livePicUrl})">
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
                <ul class="right-ul">
                  <li class="right-list" v-for="item in radioArray" :key="item.id">
                    <span class="mr20">{{item.title}}</span>
                    <div class="group">
                      <el-radio-group v-model="item.value" disabled>
                        <el-radio v-for="(value,index) in item.radioGroup" :key="index" :label="value.label"></el-radio>
                      </el-radio-group>
                    </div>
                  </li>
                  <h4 class="mg10">personal suggestion:</h4>
                  <div class="suggest mg10">
                    <el-input type="textarea" :rows="6" v-model="oneRemark" disabled></el-input>
                  </div>

                  <li class="right-list" v-for="item in phoneradioArray" :key="item.id">
                    <span class="mr20 ">{{item.title}}:</span>
                    <div class="group">
                      <template v-if="item.hasOneInput">
                        <el-input  v-model="item.radioInput" disabled  size="small" style="width:100px;margin-right:20px"></el-input>
                      </template>
                      <template v-if="item.inputLabel1">
                        <span>{{item.inputLabel1}}</span>
                        <el-input  v-model="item.oneInput" disabled  size="small" style="width:100px;margin-right:20px"></el-input>
                      </template>
                      <template v-if="item.inputLabel2">
                        <span>{{item.inputLabel2}}</span>
                        <el-input  v-model="item.twoInput" disabled  size="small" style="width:100px;;margin-right:20px"></el-input>
                      </template>
                      <el-radio-group 
                        disabled
                        v-model="item.value" 
                        v-for="(value,index) in item.radioGroup" 
                        :key="index" 
                        @change="phoneRadioChange(item.value,item.id)">
                        <el-radio :label="value.label"></el-radio>
                      </el-radio-group>
                    </div>
                  </li>
                  <h4 class="mg10">personal suggestion:</h4>
                  <div class="suggest mg10" >
                    <el-input type="textarea" v-model="twoRemark" :rows="6" disabled></el-input>
                  </div>
                </ul>
              </div>
            </div>
            <div class="phoneview">
              <ul class="right-ul">
                <li class="right-list">
                  <span class="mr20 text-right w200">company landline:</span>
                  <div class="group">
                    {{data.userWork.companyPhone}}
                  </div>
                </li>
                <li class="right-list">
                  <span class="mr20 text-right w200">call out:</span>
                  <div class="group">
                    <div class="span_flex">
                      <span v-for="(item,index) in callOutList" :key="index" class="no">
                        {{item.result?item.result:' '}}
                      </span>
                    </div>
                  </div>
                </li>
                <li  class="right-list mt15" v-for="item in phoneradioArray.filter(value=>value.id==35)" :key="item.id">
                  <span class="mr20 text-right w200">{{item.title}}</span>
                  <div class="group">
                    <el-radio-group v-model="item.value" disabled>
                      <el-radio v-for="(value,index) in item.radioGroup" :key="index" :label="value.label"></el-radio>
                    </el-radio-group>
                  </div>
                </li>
              </ul>


              <h4 class="mg10">emergency contact :</h4>
              <ul class="right-ul">
                <li class="right-list" v-if="data.userUrgentContact.contactOnePhone!=''">
                  <span class="mr20 text-right w200">call--A:</span>
                  <div class="group">
                    <span title="结果" class="mr25">{{phoneViewSelect.call_a}}</span>
                    <span class="mr25">{{$t('public.name')}}:{{data.userUrgentContact.contactOneName | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.userTel')}}:{{data.userUrgentContact.contactOnePhone | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.no17')}}:{{data.userUrgentContact.contactOneRelationName | dataIsTrue}}</span>
                  </div>
                </li>
                <li class="right-list" v-if="data.userUrgentContact.contactTwoPhone!=''">
                  <span class="mr20 text-right w200">call--B:</span>
                  <div class="group">
                    <span title="结果" class="mr25">{{phoneViewSelect.call_b}}</span>
                    <span class="mr25">{{$t('public.name')}}:{{data.userUrgentContact.contactTwoName | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.userTel')}}:{{data.userUrgentContact.contactTwoPhone | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.no17')}}:{{data.userUrgentContact.contactTwoRelationName | dataIsTrue}}</span>
                  </div>
                </li>
                <li class="right-list" v-if="data.userUrgentContact.contactThreePhone!=''">
                  <span class="mr20 text-right w200">call--C:</span>
                  <div class="group">
                    <span title="结果" class="mr25">{{phoneViewSelect.call_c}}</span>
                    <span class="mr25">{{$t('public.name')}}:{{data.userUrgentContact.contactThreeName | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.userTel')}}:{{data.userUrgentContact.contactThreePhone | dataIsTrue}}</span>
                    <span class="mr25">{{$t('public.no17')}}:{{data.userUrgentContact.contactThreeRelationName | dataIsTrue}}</span>
                  </div>
                </li>
              </ul>

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
        <!------------------------ 附加信息 ---------------------------->
        <li  v-show="active==2">
          <div class="info flex" v-if="supplementArray!=''">
            <div class="left">
              <!-- 证件照片 -->
              <template v-if="SupplementInfo.userIdCard.newIdcardPhotoUrl">
                <div class="imgbox" v-if="SupplementInfo.userIdCard.newIdcardPhotoUrl">
                  <div v-if="SupplementInfo.userIdCard.idcardPhotoUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userIdCard.idcardPhotoUrl})">
                    <img :src="SupplementInfo.userIdCard.idcardPhotoUrl" alt="证件照" title="证件照">
                  </div>
                  <div v-if="SupplementInfo.userIdCard.newIdcardPhotoUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userIdCard.newIdcardPhotoUrl})">
                    <img :src="SupplementInfo.userIdCard.newIdcardPhotoUrl" title="证件照" >
                  </div>
                </div>
                <div class="oneLineHasOne" v-if="SupplementInfo.userIdCardGPS">
                  <p><span>GPS:</span><span>{{$store.getters.longitudeAndLatitude(SupplementInfo.userIdCardGPS.longitude) + 'N ~ ' + $store.getters.longitudeAndLatitude(SupplementInfo.userIdCardGPS.latitude)+'E'}}</span></p>
                </div>
                <hr class="mg10">
              </template>
              <template v-if="SupplementInfo.userBank.newBankPicUrl">
                <!-- 银行卡照片 -->
                <div class="imgbox" v-if="SupplementInfo.userBank.newBankPicUrl">
                  <div v-if="SupplementInfo.userBank.bankPicUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userBank.bankPicUrl})">
                    <img :src="SupplementInfo.userBank.bankPicUrl" title="银行卡照片" >
                  </div>
                  <div v-if="SupplementInfo.userBank.newBankPicUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userBank.newBankPicUrl})">
                    <img :src="SupplementInfo.userBank.newBankPicUrl" title="银行卡照片" >
                  </div>
                </div>
                <div class="oneLineHasOne" v-if="SupplementInfo.userBankGPS">
                  <p><span>GPS:</span><span>{{$store.getters.longitudeAndLatitude(SupplementInfo.userBankGPS.longitude) + 'N ~ ' + $store.getters.longitudeAndLatitude(SupplementInfo.userBankGPS.latitude)+'E'}}</span></p>
                </div>
                <hr class="mg10">
              </template>
              <template v-if="SupplementInfo.userSelf.newWorkPicUrl">
                <!-- 居住/工作场所照片 -->
                <div class="imgbox" v-if="SupplementInfo.userSelf.newWorkPicUrl">
                  <div v-if="SupplementInfo.userSelf.idcardPhotoUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userSelf.idcardPhotoUrl})">
                    <img :src="SupplementInfo.userSelf.idcardPhotoUrl" title="工作场所照片" >
                  </div>
                  <div v-if="SupplementInfo.userSelf.newWorkPicUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userSelf.newWorkPicUrl})">
                    <img :src="SupplementInfo.userSelf.newWorkPicUrl" title="工作场所照片" >
                  </div>
                </div> 
                <div class="oneLineHasOne" v-if="SupplementInfo.userWorkPhotoGPS">
                  <p><span>GPS:</span><span>{{$store.getters.longitudeAndLatitude(SupplementInfo.userWorkPhotoGPS.longitude) + 'N ~ ' + $store.getters.longitudeAndLatitude(SupplementInfo.userWorkPhotoGPS.latitude)+'E'}}</span></p>
                </div>
                <hr class="mg10">
              </template>
              <template v-if="SupplementInfo.userSelf.newLivePicUrl">
                <!-- 居住/工作场所照片 -->
                <div class="imgbox" v-if="SupplementInfo.userSelf.newLivePicUrl">
                  <div v-if="SupplementInfo.userSelf.livePicUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userSelf.livePicUrl})">
                    <img :src="SupplementInfo.userSelf.livePicUrl" title="生活照片" >
                  </div>
                  <div v-if="SupplementInfo.userSelf.newLivePicUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userSelf.newLivePicUrl})">
                    <img :src="SupplementInfo.userSelf.newLivePicUrl" title="生活照片" >
                  </div>
                  
                </div> 
                <div class="oneLineHasOne" v-if="SupplementInfo.userLiveGPS">
                  <p><span>GPS:</span><span>{{$store.getters.longitudeAndLatitude(SupplementInfo.userLiveGPS.longitude) + 'N ~ ' + $store.getters.longitudeAndLatitude(SupplementInfo.userLiveGPS.latitude)+'E'}}</span></p>
                </div>
                <hr class="mg10">
              </template>
              <template v-if="SupplementInfo.userWork.newIncomePicUrl">
                <!-- 工资单/工作证明 -->
                <div class="imgbox" v-if="SupplementInfo.userWork.newIncomePicUrl">
                  <div v-if="SupplementInfo.userWork.incomePicUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userWork.incomePicUrl})">
                    <img :src="SupplementInfo.userWork.incomePicUrl" title="工作证明" >
                  </div>
                  <div v-if="SupplementInfo.userWork.newIncomePicUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userWork.newIncomePicUrl})">
                    <img :src="SupplementInfo.userWork.newIncomePicUrl" title="工作证明" >
                  </div>
                </div> 
                <div class="oneLineHasOne" v-if="SupplementInfo.userInComeGPS">
                  <p><span>GPS:</span><span>{{$store.getters.longitudeAndLatitude(SupplementInfo.userInComeGPS.longitude) + 'N ~ ' + $store.getters.longitudeAndLatitude(SupplementInfo.userInComeGPS.latitude)+'E'}}</span></p>
                </div>
                <hr class="mg10">
              </template>
              <template v-if="SupplementInfo.userWork.newWorkCardPicUrl">
                <!-- 工牌 -->
                <div class="imgbox" v-if="SupplementInfo.userWork.newWorkCardPicUrl">
                  <div v-if="SupplementInfo.userWork.workCardPicUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userWork.workCardPicUrl})">
                    <img :src="SupplementInfo.userWork.workCardPicUrl" title="工牌" >
                  </div>
                  <div v-if="SupplementInfo.userWork.newWorkCardPicUrl" class="imglist pic" @click="openBox({imgUrl:SupplementInfo.userWork.newWorkCardPicUrl})">
                    <img :src="SupplementInfo.userWork.newWorkCardPicUrl" title="工牌" >
                  </div>
                  
                </div> 
                <div class="oneLineHasOne" v-if="SupplementInfo.userWorkCardGPS">
                  <p><span>GPS:</span><span>{{$store.getters.longitudeAndLatitude(SupplementInfo.userWorkCardGPS.longitude) + 'N ~ ' + $store.getters.longitudeAndLatitude(SupplementInfo.userWorkCardGPS.latitude)+'E'}}</span></p>
                </div>
                <hr class="mg10">
              </template>
              
              
              
              
              
              
              
              
              
              
              <!-- 授权许可证 -->
              <!-- <div class="imgbox">
                <img src="../../../assets/img/null.png" class="imglist" alt="">
                <img src="../../../assets/img/null.png" class="imglist" alt="">
              </div>  -->
            </div>
            
            <div class="right" >
              <ul class="right-ul">
                <li class="right-list" v-for="(item,index) in supplementArray" :key="index">
                  <span class="mr20">{{item.title}}</span>
                  <div class="group">
                    <el-radio-group v-model="item.value" :disabled="supplementFlag" @change="radioChange(item.value,item.id,3)">
                      <el-radio v-for="(value,index) in item.radioGroup" :key="index" :label="value.label"></el-radio>
                    </el-radio-group>
                  </div>
                </li>
                <!-- <hr class="mg10"> -->
                <div class="button mt20 flex flex-center" v-if="!supplementFlag">
                  <el-button type="primary" @click="submit(3)">{{$t('public.no49')}}</el-button>
                </div>
              </ul>
            </div>
          </div>
          <p v-else>暂无信息</p>
        </li>
      </ul>
    </div>

    <div class="foot"></div>

    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>

    <!-- ------------------ ID信息修改 -------------------- -->
    <div v-if="radioArray[2].value === 'Different'" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>ID信息</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="radioArray[2].value = ''"></i>
        </div>
        <div class="reply-main-con">
          <div class="left2right">
            <span class="left" style="width:120px">name:</span>
            <div class="right">
              <el-input type="text" v-model="changeuser.userName"></el-input>
            </div>
          </div>
          <div class="left2right">
            <span class="left" style="width:120px;">ID Card:</span>
            <div class="right">
              <el-input type="text" v-model="changeuser.IDCard"></el-input>
            </div>
          </div>
          <div class="left2right">
            <span class="left"></span>
            <div class="right">
              <el-button type="primary" @click="modifyUserInfo(1)">{{$t('public.no49')}}</el-button>
              <el-button type="primary" @click="radioArray[2].value = ''">{{$t('public.no50')}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ------------------ 银行卡ID修改 -------------------- -->
    <div v-if="radioArray[4].value === 'Different'" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>银行卡ID</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="radioArray[4].value = ''"></i>
        </div>
        <div class="reply-main-con">
          <div class="left2right">
            <span class="left" style="width:120px">bank ID:</span>
            <div class="right">
              <el-input type="text" v-model="changeuser.BankId"></el-input>
            </div>
          </div>
          <div class="left2right">
            <span class="left"></span>
            <div class="right">
              <el-button type="primary" @click="modifyUserInfo(2)">{{$t('public.no49')}}</el-button>
              <el-button type="primary" @click="radioArray[4].value = ''">{{$t('public.no50')}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

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

import appLightbox from '../../../components/component/lightbox'// 图片点击放大组件
import { setTimeout } from 'timers';

export default {
  name: 'auditDetail',
  components: {
    telRecordList,
    telAuditList,
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
        contactOne: '',
        contactTwo: '',
        contactThree: '',
        userPhoneOperator: '',
        contactOnePhoneOperator: '',
        contactTwoPhoneOperator: '',
        contactThreePhoneOperator: ''
      },
      active: 1,
      active2: 1,
      addContent: false, // 点击添加紧急联系人弹窗开关
      lightBoxToggle: false, // 图片点击放大开关
      tableData: [], // 电话审核记录数据
      userInforSelect: {
        // work: 'normal'
      },
      phoneViewSelect: {
        // work: 'normal'
      },
      radioArray: [
        {id: 1, title: 'ID Pic', value: '', radioGroup: [ { label: 'True' }, { label: 'False' }, { label: 'unclear' } ] },
        {id: 2, title: 'FACE', value: '', radioGroup: [ { label: 'True' }, { label: 'False' } ] },
        {id: 3, title: 'ID信息', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },

        {id: 4, title: 'Bank name', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' }, { label: 'unclear' } ] },
        {id: 5, title: 'Bank ID', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' }, { label: 'unclear' } ] },
        
        {id: 12, title: 'Payroll/COE', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'unclear' } ] },
        {id: 13, title: 'Working ID', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'unclear' } ] },
        
        {id: 14, title: 'Pay day', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },
        {id: 15, title: 'Apply during work time?', value: '', radioGroup: [ { label: 'Yes' }, { label: 'No' } ] },
        {id: 16, title: 'Pic location', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },
        {id: 17, title: 'Is the company number a landline?', value: '', radioGroup: [ { label: 'Yes' }, { label: 'No' } ] },
      ],
      supplementArray:[],
      phoneradioArray:[
        {id: 18, title: 'identity', radioInput: '', value: '', 
          radioGroup: [ 
            { label: 'True' }, 
            { label: 'False' } 
          ] 
        },
        {id: 19, title: 'number of family members', hasOneInput: true, radioInput: '', value: '', radioGroup: [ { label: 'hesitate' }, { label: 'non-c' } ] },
        {id: 20, title: 'number of children', hasOneInput: true, radioInput: '', value: '', radioGroup: [ { label: 'hesitate' }, { label: 'non-c' } ] },
        {id: 21, title: 'use of loan', oneInput: '', radioInput: '', value: '', radioGroup: [ 
          { label: 'shopping' }, 
          { label: 'education' }, 
          { label: 'medical' }, 
          { label: 'family' }, 
          { label: 'child' }, 
          { label: 'repayment' }, 
          { label: 'business' }, 
          { label: 'hesitate' }, 
          { label: 'non-c' } ,
          ] },
        {id: 22, title: 'ASD', 
        inputLabel1: 'wage: ', 
        inputLabel2: 'household income: ', radioInput: '', oneInput: '',twoInput: '', value: '', radioGroup: [ 
          { label: 'hesitate' }, 
          { label: 'non-c' } ] },
        {id: 23, title: 'family expense/month', hasOneInput: true, oneInput: '', radioInput: '', value: '', radioGroup: [ { label: 'hesitate' }, { label: 'non-c' } ] },
        {id: 24, title: 'monthly debt repayment', hasOneInput: true, oneInput: '', radioInput: '', value: '', radioGroup: [ { label: 'hesitate' }, { label: 'non-c' } ] },
        {id: 25, title: 'number of debt from other company', hasOneInput: true, oneInput: '', radioInput: '', value: '', radioGroup: [ { label: 'hesitate' }, { label: 'non-c' } ] },
        {id: 26, title: 'loan amount from  other company', hasOneInput: true, oneInput: '', radioInput: '', value: '', radioGroup: [ { label: 'hesitate' }, { label: 'non-c' } ] },
        {id: 27, title: 'comany business',  oneInput: '', radioInput: '', value: '', 
          radioGroup: [
            { label: 'normal' }, 
            { label: 'hesitate' }, { label: 'non-c' }
          ] 
        },
        {id: 28, title: 'position and daily work',  oneInput: '', radioInput: '', value: '', 
          radioGroup: [ 
            { label: 'normal' }, 
            { label: 'hesitate' }, { label: 'non-c' }
          ] 
        },
        {id: 35, title: 'verify information',  oneInput: '', radioInput: '', value: '', 
          radioGroup: [ 
            { label: 'True' }, 
            { label: 'false' },
            { label: 'non-c' }
          ] 
        }
      ],
      replenishArray:[

      ],
      changeuser: {
        phone: ''
      },
      bankInfo: {},
      userFlag: false,
      viewNumbe: 0,
      telStatus: '', // 电话审核下拉框选中项
      telRemark: '', // 电话审核备注信息内容
      telType: '', // 电话类型
      options: [{id:1,label:'Yes',value:'Yes'},{id:2,label:'No',value:'No'},{id:3,label:'non-c',value:'non-c'}],
      oneRemark: '',
      twoRemark: '',
      telRadioId: '',// 紧急联系人选中项ID
      supplementFlag: false,
      SupplementInfo: {
        userIdCard: '',
        userWork: '',
        userBank: '',
        userIdCardGPS: '',
        userWorkCardGPS: '',
        userInComeGPS: '',
        userBankGPS: '',
        userSelf: '',
        userLiveGPS: '',
        userWorkPhotoGPS: '',
      },
      callOutList: []
    }
  },
  computed: {// 选项卡国际化
    arr1 () {
      let arr = []
      arr.push({id: 1, title: this.$t('tab2.no1')})
      arr.push({id: 2, title: this.$t('fei.no50')})
      arr.push({id: 3, title: this.$t('tab2.no2')})
      arr.push({id: 4, title: this.$t('auditDetail.no22')})
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
          // if(res.data.data.order.status==-20||res.data.data.order.status==21){
          //   this.viewNumbe = 3
          // }

          if(res.data.data.userBank.bankAccount){
            this.radioArray = [
              {id: 1, title: 'ID Pic', value: '', radioGroup: [ { label: 'True' }, { label: 'False' }, { label: 'unclear' } ] },
              {id: 2, title: 'FACE', value: '', radioGroup: [ { label: 'True' }, { label: 'False' } ] },
              {id: 3, title: 'ID信息', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },

              {id: 4, title: 'Bank name', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' }, { label: 'unclear' } ] },
              {id: 5, title: 'Bank ID', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' }, { label: 'unclear' } ] },
              
              {id: 12, title: 'Payroll/COE', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'unclear' } ] },
              // {id: 13, title: 'Working ID', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'unclear' } ] },

              {id: 14, title: 'Pay day', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },
              {id: 15, title: 'Apply during work time?', value: '', radioGroup: [ { label: 'Yes' }, { label: 'No' } ] },
              {id: 16, title: 'Pic location', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },
              {id: 17, title: 'Is the company number a landline?', value: '', radioGroup: [ { label: 'Yes' }, { label: 'No' } ] },
            ]
          }else{
            this.radioArray = [
              {id: 1, title: 'ID Pic', value: '', radioGroup: [ { label: 'True' }, { label: 'False' }, { label: 'unclear' } ] },
              {id: 2, title: 'FACE', value: '', radioGroup: [ { label: 'True' }, { label: 'False' } ] },
              {id: 3, title: 'ID信息', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },
              {id: 12, title: 'Payroll/COE', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'unclear' } ] },
              // {id: 13, title: 'Working ID', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'unclear' } ] },
              {id: 14, title: 'Pay day', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },
              {id: 15, title: 'Apply during work time?', value: '', radioGroup: [ { label: 'Yes' }, { label: 'No' } ] },
              {id: 16, title: 'Pic location', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },
              {id: 17, title: 'Is the company number a landline?', value: '', radioGroup: [ { label: 'Yes' }, { label: 'No' } ] },
            ]
          }
          if(res.data.data.userWork.industry!='7'){
            this.radioArray.push(
              {id: 13, title: 'Working ID', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'unclear' } ] },
            )
            this.phoneradioArray.push(
              {id: 29, title: 'attended or not when apply',  oneInput: '', radioInput: '', value: '', 
                radioGroup: [ 
                  { label: 'No' }, 
                  { label: 'Yes' }
                ] 
              },
              {id: 30, title: 'why not attended',  oneInput: '', radioInput: '', value: '', 
                radioGroup: [ 
                  { label: 'on leave' }, 
                  { label: 'outside the office' }, 
                  { label: 'on business trip' },
                  { label: 'unemployeed' }
                ] 
              },
            )
          }
          if(res.data.data.userSelf.picType==1){
            this.radioArray.push(
              {id: 6, title: 'Family Address', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },
              {id: 8, title: 'Live-place', value: '', radioGroup: [ { label: 'luxury' }, { label: 'poor' }, { label: 'non-compliant' }, { label: 'simple' }, { label: 'shanty town' }, { label: 'unclear' } ] },
              {id: 10, title: 'Residence GPS street view on map', value: '', radioGroup: [ { label: 'residential zone' }, { label: 'shanty town' }, { label: 'remote countryside' } ] },
            )
          } else {
            this.radioArray.push(
              {id: 7, title: 'Working Address:', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' } ] },
              {id: 9, title: 'Work-place', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'non-compliant' }, { label: 'unclear' } ] },
              {id: 11, title: 'Work place GPS street view on map', value: '', radioGroup: [ { label: 'Office building or commercial zone' }, { label: 'shanty town' }, { label: 'remote countryside' } ] },
            )
          }
          
          
          this.getRadioHistory()
          
        }
      })
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
      this.telRemark = ''
    },
    telAuditSure(){
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
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
          if(this.telFlag3){
            if(this.telRadioId==31){
              this.phoneViewSelect.call_a = this.telStatus;
            }
            if(this.telRadioId==32){
              this.phoneViewSelect.call_b = this.telStatus;
            }
            if(this.telRadioId==33){
              this.phoneViewSelect.call_c = this.telStatus;
            }
            
            this.radioChange(this.telStatus,this.telRadioId,2)
          }
          if(this.telFlag2){
            this.radioChange(this.telStatus,34,2)
            setTimeout(()=>{
              this.getCallOutList()
            },500)
          }
          this.telClose()
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1)
    },
    radioChange(value,id,type){
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
    phoneRadioChange(value,id){
      this.phoneradioArray.filter(item=>item.id == id)[0].radioInput = ''
      this.phoneradioArray.filter(item=>item.id == id)[0].oneInput = ''
      this.phoneradioArray.filter(item=>item.id == id)[0].twoInput = ''
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0017,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        orderId: this.orderId,
        userId: this.userId,
        parentType: 2,
        childType: id,
        result: value,
        status: -1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
        } else {
          this.phoneradioArray.filter(item=>item.id == id)[0].radioInput = ''
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
    InputChange(value,id,type=0){
      this.phoneradioArray.filter(item=>item.id == id)[0].value = ''
      if(type==2){
        this.phoneradioArray.filter(item=>item.id == id)[0].oneInput = ''
      }
      if(type==1){
        this.phoneradioArray.filter(item=>item.id == id)[0].twoInput = ''
      }
      
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0017,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        orderId: this.orderId,
        userId: this.userId,
        parentType: 2,
        childType: id,
        result: type==1?'wage':type==2?'household income':value,
        status: -1,
        resultNumber: type==0?'':value
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
    modifyUserInfo(type){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0020,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        orderId: this.orderId,
        userId: this.userId,
        type,
        ...this.changeuser
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
          if(type==1){
            this.radioArray[2].value = 'Same'
            this.radioChange('Same',3,1)
          }
          if(type==2){
            this.radioArray[4].value = 'Same'
            this.radioChange('Same',5,1)
          }
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
            this.viewNumbe = 3
          }else{
            this.viewNumbe = 1
          }
          if(res.data.data.DataReview){
            if(this.block==1){
              this.viewNumbe = 3
            }else{
              if(this.data.order.status==-20||this.data.order.status==21){
                this.viewNumbe = 3
              }else{
                if(res.data.data.DataReview.some(value => value.status == -1)){
                  this.viewNumbe = 1
                }else{
                  this.viewNumbe = 2
                }
              }
            }
            
            
            res.data.data.DataReview.forEach(value => {
              if (value.childType==999){
                this.oneRemark = value.result
              } else {
                if(this.radioArray.filter(item => value.childType == item.id)[0]){
                  this.radioArray.filter(item => value.childType == item.id)[0].value = value.result
                }
              }
            })
          }
          if(res.data.data.PhoneReview){
            if(this.block==1){
              this.viewNumbe = 3
            }else{
              if(this.data.order.status==-20||this.data.order.status==21){
                this.viewNumbe = 3
              }else{
                if(res.data.data.PhoneReview.some(value => value.status == -1)){
                  this.viewNumbe = 2
                }else{
                  this.viewNumbe = 3
                }
              }
            }
            
            
            res.data.data.PhoneReview.forEach(value=>{
              if(value.resultNumber){
                if(value.result=='wage'){
                  this.phoneradioArray[4].oneInput = value.resultNumber
                }
                if(value.result=='household income'){
                  this.phoneradioArray[4].twoInput = value.resultNumber
                }
              }else{
                if(value.childType==998){
                  this.twoRemark = value.result
                }else if(value.childType<34){
                  if(Number(value.result)){
                    if(this.phoneradioArray.filter(item => value.childType == item.id)[0]){
                      this.phoneradioArray.filter(item => value.childType == item.id)[0].radioInput = value.result
                    }
                  }else{
                    if(value.childType==31||value.childType==32||value.childType==33){
                      if(value.childType==31){
                        this.phoneViewSelect.call_a = value.result
                      }
                      if(value.childType==32){
                        this.phoneViewSelect.call_b = value.result
                      }
                      if(value.childType==33){
                        this.phoneViewSelect.call_c = value.result
                      }
                    }else{
                      if(this.phoneradioArray.filter(item => value.childType == item.id)[0]){
                        this.phoneradioArray.filter(item => value.childType == item.id)[0].value = value.result
                      }
                      
                    }
                    
                  }
                }
                
              }
            })
          }
          if(res.data.data.supplementReview){
            if(!res.data.data.supplementReview.some(value=>value.status==-1)){
              this.supplementFlag = true
            }
            res.data.data.supplementReview.forEach(value=>{
              this.supplementArray.filter(item => value.childType == item.id)[0].value = value.result
            })
          }
          
        }
      })
    },
    submit(type){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0022,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        orderId: this.orderId,
        userId: this.userId,
        parentType: type,
        remark: ''
      }
      if(type==1){
        option.remark = this.oneRemark
      }
      if(type==2){
        option.remark = this.twoRemark
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if(res.data.data == 2 ){
            if(type==1){
              this.viewNumbe = 2
            }
            if(type==2){
              this.viewNumbe = 3
            }
            if(type==3){
              this.supplementFlag = true
            }
          }else if (res.data.data == -1) {
            this.viewNumbe = 3
            if(type==3){
              this.supplementFlag = true
            }
          }else if (res.data.data == 1){
            this.viewNumbe = 3
          }
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
    getSupplementInfo(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0023,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        orderId: this.orderId,
        userId: this.userId,
        status: -1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.SupplementInfo = res.data.data;
          if(res.data.data.userIdCard&&res.data.data.userIdCard.newIdcardPhotoUrl){
            this.supplementArray.push({id: 1, title: 'ID Pic', value: '', radioGroup: [ { label: 'True' }, { label: 'False' }, { label: 'unclear' } ] })
          }
          if(res.data.data.userBank&&res.data.data.userBank.newBankPicUrl){
            this.supplementArray.push({id: 4, title: 'Bank name', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' }, { label: 'unclear' } ] })
          }
          if(res.data.data.userSelf&&res.data.data.userSelf.newWorkPicUrl){
            this.supplementArray.push(
              {id: 7, title: 'Working Address:', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' }, { label: 'unclear' } ] },
              {id: 9, title: 'Work-place', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'non-compliant' } ] },
              {id: 11, title: 'Work place GPS street view on map', value: '', radioGroup: [ { label: 'Office building or commercial zone' }, { label: 'shanty town' }, { label: 'remote countryside' } ] },
            )
          }
          if(res.data.data.userSelf&&res.data.data.userSelf.newLivePicUrl){
            this.supplementArray.push(
              {id: 6, title: 'Family Address', value: '', radioGroup: [ { label: 'Same' }, { label: 'Different' }, { label: 'unclear' } ] },
              {id: 8, title: 'Live-place', value: '', radioGroup: [ { label: 'luxury' }, { label: 'poor' }, { label: 'non-compliant' }, { label: 'simple' }, { label: 'shanty town' } ] },
              {id: 10, title: 'Residence GPS street view on map', value: '', radioGroup: [ { label: 'residential zone' }, { label: 'shanty town' }, { label: 'remote countryside' } ] },
            )
          }
          if(res.data.data.userWork&&res.data.data.userWork.newIncomePicUrl){
            this.supplementArray.push({id: 12, title: 'Payroll/COE', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'unclear' } ] })
          }
          if(res.data.data.userWork&&res.data.data.userWork.newWorkCardPicUrl){
            this.supplementArray.push({id: 13, title: 'Working ID', value: '', radioGroup: [ { label: 'normal' }, { label: 'suspicious' }, { label: 'unclear' } ] })
          }
        }
      })
    },
    getCallOutList(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0024,
          'sessionid': this.sessionid
        },
        orderId: this.orderId,
        childType: 34
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.callOutList = res.data.data
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
    areachange(type){
      if(type==1){
        this.radioChange(this.oneRemark,999,1)
      }
      if(type==2){
        this.radioChange(this.twoRemark,998,2)
      }
    }
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
    this.getSupplementInfo()// 获取补充信息
    this.getCallOutList()// 获取补充信息
    // this.getRadioHistory()// 初审页面详细信息
    
  }
}
</script>

<style scoped lang="scss">

  .mg10{
    margin: 10px 0;
  }
  .mr20{
    display: inline-block;
    width: 160px;
    margin-right: 20px;
  }
  .mr25{
    margin-right: 20px;
  }
  .phone{
    font-size: 20px;
    cursor: pointer;
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
      height: 100px;
      margin-right: 10px;
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
    width: 300px;
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
</style>
