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

    <audit-detail :data="data" :audit-type="2"></audit-detail>

    <!-------------------------- 选项卡 -------------------->
    <div class="xuanxiangka">
      <ul class="xuan-1">
        <li
          v-for="(value,index) in arr1"
          :key="index"
          :class="{active:active==value.id}"
          @click="active=value.id"
        >
          <el-badge v-if="value.black==-1" value="black" class="item">
            <span>{{value.title}}</span>
          </el-badge>
          <span v-else>{{value.title}}</span>
        </li>
      </ul>
      <ul class="xuan-2">
        <!------------------------ 历史借款记录信息 ---------------------------->
        <li v-if="active==4">
          <loan-list
            :order-no="orderNo"
            :tag-list="data.userOrderCount"
            :user-id="userId"
            :table-data="data.orderList"
          ></loan-list>
        </li>
        <!------------------------ 用户信息 ---------------------------->
        <li class="xuan-2-1" v-if="active==1">
          <!-- 第一行 -->
          <div class="paixu">
            <span></span>
            <p>{{$t('auditDetail.no2')}}</p>
            <template v-if="data.userIdcard.score!==''">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.userIdcard.score>=0.95?$t('auditDetail.no3'):$t('auditDetail.no4')"
                placement="right"
              >
                <div class="tooltip pic">
                  <img v-if="data.userIdcard.score>=0.95" src="../../../assets/img/lv.png" alt />
                  <img v-else src="../../../assets/img/hong.png" alt />
                </div>
              </el-tooltip>
            </template>

            <p
              v-if="data.order.status==30&&block==2"
              @click="openTelWindow(data.userBase.phone,'1')"
              style="cursor:pointer"
            >{{$t('auditDetail.no42')}}</p>
          </div>
          <div class="xuan-2-1-1">
            <div class="xuan-2-1-1-1">
              <p>
                <span>{{$t('public.no1')}}:</span>
                <span>{{data.userBase.name | dataIsTrue}}</span>
              </p>
              <p>
                <span>{{$t('public.userTel')}}:</span>
                <span>{{data.userBase.phone | dataIsTrue}}</span>
              </p>
              <p>
                <span>{{$t('public.no2')}}:</span>
                <span>{{data.userIdcard.idCard | dataIsTrue}}</span>
              </p>
              <p>
                <span>{{$t('auditDetail.no10')}}:</span>
                <span>{{String(data.userIdcard.similarity).slice(0,5)}}%</span>
              </p>
            </div>
            <div class="xuan-2-1-1-1">
              <div class="idimgbox">
                <template>
                  <div
                    v-if="data.userIdcard.idcardPhotoUrl!==undefined&&data.userIdcard.idcardPhotoUrl!==''"
                    class="idimg pic"
                    @click="openBox({imgUrl:data.userIdcard.idcardPhotoUrl})"
                  >
                    <img
                      :src="data.userIdcard.idcardPhotoUrl"
                      :alt="$t('pic.no1')"
                      :title="$t('pic.no1')"
                    />
                  </div>
                  <div v-else class="idimg pic">
                    <img src="../../../assets/img/null.png" />
                  </div>
                  <div
                    v-if="data.userIdcard.facetimePhotoUrl!==undefined&&data.userIdcard.facetimePhotoUrl!==''"
                    class="idimg pic"
                    @click="openBox({imgUrl:data.userIdcard.facetimePhotoUrl})"
                  >
                    <img
                      :src="data.userIdcard.facetimePhotoUrl"
                      :alt="$t('pic.no2')"
                      :title="$t('pic.no2')"
                    />
                  </div>
                  <div v-else class="idimg pic">
                    <img src="../../../assets/img/null.png" />
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- 第二行 -->
          <div class="paixu">
            <span></span>
            <p>{{$t('auditDetail.no5')}}</p>

            <p
              v-if="data.order.status==30&&block==2"
              @click="openTelWindow(data.userWork.companyPhone,'2')"
              style="cursor:pointer"
            >{{$t('auditDetail.no42')}}</p>
          </div>
          <div class="xuan-2-1-1">
            <div class="xuan-2-1-1-2">
              <div class="xuan-2-1-1-22">
                <p>
                  <span>{{$t('public.no9')}}:</span>
                  <span>{{data.userWork.company | dataIsTrue}}</span>
                </p>
                <p>
                  <span>{{$t('public.no10')}}:</span>
                  <span>{{data.userWork.strEntryTime | dataIsTrue}}</span>
                </p>
                <p>
                  <span>{{$t('public.no13')}}:</span>
                  <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.userWork.monthIncome)}}{{$store.state.common.vi_currency}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p>
                  <span>{{$t('public.no11')}}:</span>
                  <span>{{data.userWork.title | dataIsTrue}}</span>
                </p>
                <p>
                  <span>{{$t('public.no12')}}:</span>
                  <span>{{data.userWork.companyPhone | dataIsTrue}}</span>
                </p>
                <p>
                  <span>{{$t('public.no2')}}:</span>
                  <span>{{data.userIdcard.idCard | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:100%">
                  <span>{{$t('public.no14')}}:</span>
                  <span>{{data.userWork.companyProvinceName | dataIsTrue}}-{{data.userWork.companyCityName | dataIsTrue}}</span>
                </p>
              </div>
              <div class="xuan-2-1-1-22">
                <p style="width:100%">
                  <span>{{$t('public.no15')}}:</span>
                  <span>{{data.userWork.companyAddress | dataIsTrue}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="xuan-2-1-1" style="padding: 0 20px">
            <div
              class="imgbox"
              v-if="data.userWork.incomePicUrl!==''&&!data.userWork.incomePicUrl.includes('CashCash')"
            >
              <div class="imgDes">{{$t('pic.no11')}}:</div>
              <div class="imgbox1 pic" @click="openBox({imgUrl:data.userWork.incomePicUrl})">
                <img :src="data.userWork.incomePicUrl" :title="$t('pic.no11')" />
              </div>
            </div>
            <div
              class="imgbox"
              v-if="data.userWork.workCardUrl!==undefined&&data.userWork.workCardUrl!==''"
            >
              <div class="imgDes">{{$t('pic.no8')}}:</div>
              <div class="imgbox1 pic" @click="openBox({imgUrl:data.userWork.workCardUrl})">
                <img :src="data.userWork.workCardUrl" :title="$t('pic.no8')" />
              </div>
            </div>
            <div
              class="imgbox"
              v-if="data.userWork.staffCardUrl!==undefined&&data.userWork.staffCardUrl!==''"
            >
              <div class="imgDes">{{$t('pic.no10')}}:</div>
              <div class="imgbox1 pic" @click="openBox({imgUrl:data.userWork.staffCardUrl})">
                <img :src="data.userWork.staffCardUrl" :title="$t('pic.no10')" />
              </div>
            </div>
            <div
              class="imgbox"
              v-if="data.userWork.payCardUrl!==undefined&&data.userWork.payCardUrl!==''"
            >
              <div class="imgDes">{{$t('pic.no9')}}:</div>
              <div class="imgbox1 pic" @click="openBox({imgUrl:data.userWork.payCardUrl})">
                <img :src="data.userWork.payCardUrl" :title="$t('pic.no9')" />
              </div>
            </div>
          </div>
          <!-- 第三行 -->
          <div class="paixu">
            <span></span>
            <p>{{$t('public.no16')}}</p>
          </div>
          <div class="xuan-2-1-2">
            <div class="xuan-2-1-2-1">
              <p>1</p>
              <p>
                {{$t('public.no17')}}:
                <span>{{data.userUrgentContact.contactOneRelationName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.name')}}:
                <span>{{data.userUrgentContact.contactOneName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.no18')}}:
                <span>{{data.userUrgentContact.contactOnePhone | dataIsTrue}}</span>
              </p>

              <p
                v-if="data.order.status==30&&block==2"
                style="margin-left:16px;cursor:pointer;color:#1D7BFF"
                @click="openTelWindow(data.userUrgentContact.contactOnePhone,'3')"
              >{{$t('auditDetail.no42')}}</p>
            </div>
            <div class="xuan-2-1-2-1">
              <p>2</p>
              <p>
                {{$t('public.no17')}}:
                <span>{{data.userUrgentContact.contactTwoRelationName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.name')}}:
                <span>{{data.userUrgentContact.contactTwoName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.no18')}}:
                <span>{{data.userUrgentContact.contactTwoPhone}}</span>
              </p>

              <p
                style="margin-left:16px;cursor:pointer;color:#1D7BFF"
                v-if="data.order.status==30&&block==2"
                @click="openTelWindow(data.userUrgentContact.contactTwoPhone,'4')"
              >{{$t('auditDetail.no42')}}</p>
            </div>
            <div class="xuan-2-1-2-1">
              <p>3</p>
              <p>
                {{$t('public.no17')}}:
                <span>{{data.userUrgentContact.contactThreeRelationName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.name')}}:
                <span>{{data.userUrgentContact.contactThreeName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.no18')}}:
                <span>{{data.userUrgentContact.contactThreePhone | dataIsTrue}}</span>
              </p>

              <p
                style="margin-left:16px;cursor:pointer;color:#1D7BFF"
                v-if="data.order.status==30&&block==2"
                @click="openTelWindow(data.userUrgentContact.contactThreePhone,'5')"
              >{{$t('auditDetail.no42')}}</p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userUrgentContact.contactFourName">
              <p>4</p>
              <p>
                {{$t('public.no17')}}:
                <span>{{data.userUrgentContact.contactFourRelationName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.name')}}:
                <span>{{data.userUrgentContact.contactFourName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.no18')}}:
                <span>{{data.userUrgentContact.contactFourPhone | dataIsTrue}}</span>
              </p>

              <p
                style="margin-left:16px;cursor:pointer;color:#1D7BFF"
                v-if="data.order.status==30&&block==2"
                @click="openTelWindow(data.userUrgentContact.contactFourPhone,'8')"
              >{{$t('auditDetail.no42')}}</p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userUrgentContact.contactFiveName">
              <p>5</p>
              <p>
                {{$t('public.no17')}}:
                <span>{{data.userUrgentContact.contactFiveRelationName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.name')}}:
                <span>{{data.userUrgentContact.contactFiveName | dataIsTrue}}</span>
              </p>
              <p>
                {{$t('public.no18')}}:
                <span>{{data.userUrgentContact.contactFivePhone | dataIsTrue}}</span>
              </p>

              <p
                style="margin-left:16px;cursor:pointer;color:#1D7BFF"
                v-if="data.order.status==30&&block==2"
                @click="openTelWindow(data.userUrgentContact.contactFivePhone,'9')"
              >{{$t('auditDetail.no42')}}</p>
            </div>
          </div>
          <!-- 第四行 -->
          <div class="paixu">
            <span></span>
            <p>{{$t('auditDetail.no63')}}</p>
          </div>
          <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="25%">{{$t('public.no19')}}</th>
              <th width="25%">{{$t('public.no36')}}</th>
              <th width="25%">{{$t('public.no21')}}</th>
              <th width="25%">{{$t('public.no22')}}</th>
            </tr>
            <template v-if="data.userBank!==undefined&&data.userBank!==''">
              <tr>
                <td>{{data.userBank.bankName | dataIsTrue}}</td>
                <td>{{data.userBank.bankAccount | dataIsTrue}}</td>
                <td>{{data.userBank.strCreateTime | dataIsTrue}}</td>
                <td>{{data.userBank.status==1?$t('userDetail.bankId_status.no1'):$t('userDetail.bankId_status.no2')}}</td>
              </tr>
            </template>
            <template v-else>
              <div
                style="textAlign:center;width:400%;height:40px;lineHeight:40px"
              >{{$t('public.no23')}}</div>
            </template>
          </table>
          <div class="idimgbox">
            <template>
              <div
                v-if="data.userBank.bankPicUrl!==undefined&&data.userBank.bankPicUrl!==''"
                class="idimg pic"
                @click="openBox({imgUrl:data.userBank.bankPicUrl})"
              >
                <img :src="data.userBank.bankPicUrl" :alt="$t('pic.no1')" :title="$t('pic.no1')" />
              </div>
              <div v-else class="idimg pic">
                <img src="../../../assets/img/null.png" />
              </div>
            </template>
          </div>
        </li>
        <!------------------------ 通话记录信息 ---------------------------->
        <li v-if="active==2">
          <tel-record-list
            :detail="telDetail"
            :order-no="orderNo"
            :user-id="userId"
            :order-id="orderId"
            :type="2"
          ></tel-record-list>
        </li>
        <!------------------------ 短信记录信息 ---------------------------->
        <li v-if="active==3">
          <note-record-list :order-no="orderNo" :user-id="userId"></note-record-list>
        </li>
        <!------------------------ OCR身份检测 ---------------------------->
        <li class="xuan-2-5" v-if="active==5">
          <div
            v-if="data.userIdcard.idcardPhotoUrl!==undefined&&data.userIdcard.idcardPhotoUrl!==''"
            class="xuan-2-5-1 pic"
          >
            <img :src="data.userIdcard.idcardPhotoUrl" :alt="$t('pic.no1')" :title="$t('pic.no1')" />
          </div>
          <div v-else class="xuan-2-5-1 pic">
            <img src="../../../assets/img/null.png" />
          </div>
          <div class="xuan-2-5-2">
            <ul>
              <li>
                <p class="p-1">
                  <span>NIK</span>
                  <span>{{$t('public.no2')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrIdCard!==null&&data.userIdcard.ocrIdCard!==undefined&&data.userIdcard.ocrIdCard!==''"
                  class="p-2"
                >{{data.userIdcard.ocrIdCard}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Name</span>
                  <span>{{$t('public.name')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrName!==null&&data.userIdcard.ocrName!==undefined&&data.userIdcard.ocrName!==''"
                  class="p-2"
                >{{data.userIdcard.ocrName}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Blood Type</span>
                  <span>{{$t('auditDetail.no44')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrBloodType!==null&&data.userIdcard.ocrBloodType!==undefined&&data.userIdcard.ocrBloodType!==''"
                  class="p-2"
                >{{data.userIdcard.ocrBloodType}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Religion</span>
                  <span>{{$t('auditDetail.no45')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrReligion!==null&&data.userIdcard.ocrReligion!==undefined&&data.userIdcard.ocrReligion!==''"
                  class="p-2"
                >{{data.userIdcard.ocrReligion}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Gender</span>
                  <span>{{$t('public.sex')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrGender!==null&&data.userIdcard.ocrGender!==undefined&&data.userIdcard.ocrGender!==''"
                  class="p-2"
                >{{data.userIdcard.ocrGender}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Place & Date of Birth</span>
                  <span>{{$t('auditDetail.no46')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrBirthPlaceBirthday!==null&&data.userIdcard.ocrBirthPlaceBirthday!==undefined&&data.userIdcard.ocrBirthPlaceBirthday!==''"
                  class="p-2"
                >{{data.userIdcard.ocrBirthPlaceBirthday}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>RT / RW</span>
                  <span>{{$t('public.no2')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrRtrw!==null&&data.userIdcard.ocrRtrw!==undefined&&data.userIdcard.ocrRtrw!==''"
                  class="p-2"
                >{{data.userIdcard.ocrRtrw}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Occupation</span>
                  <span>{{$t('auditDetail.no47')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrOccupation!==null&&data.userIdcard.ocrOccupation!==undefined&&data.userIdcard.ocrOccupation!==''"
                  class="p-2"
                >{{data.userIdcard.ocrOccupation}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Province</span>
                  <span>{{$t('auditDetail.no48')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrProvince!==null&&data.userIdcard.ocrProvince!==undefined&&data.userIdcard.ocrProvince!==''"
                  class="p-2"
                >{{data.userIdcard.ocrProvince}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>City</span>
                  <span>{{$t('auditDetail.no49')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrCity!==null&&data.userIdcard.ocrCity!==undefined&&data.userIdcard.ocrCity!==''"
                  class="p-2"
                >{{data.userIdcard.ocrCity}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Region</span>
                  <span>{{$t('auditDetail.no50')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrDistrict!==null&&data.userIdcard.ocrDistrict!==undefined&&data.userIdcard.ocrDistrict!==''"
                  class="p-2"
                >{{data.userIdcard.ocrDistrict}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Village</span>
                  <span>{{$t('auditDetail.no51')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrVillage!==null&&data.userIdcard.ocrVillage!==undefined&&data.userIdcard.ocrVillage!==''"
                  class="p-2"
                >{{data.userIdcard.ocrVillage}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Nationality</span>
                  <span>{{$t('auditDetail.no52')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrNationality!==null&&data.userIdcard.ocrNationality!==undefined&&data.userIdcard.ocrNationality!==''"
                  class="p-2"
                >{{data.userIdcard.ocrNationality}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Expiry Date</span>
                  <span>{{$t('auditDetail.no53')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrExpiryDate!==null&&data.userIdcard.ocrExpiryDate!==undefined&&data.userIdcard.ocrExpiryDate!==''"
                  class="p-2"
                >{{data.userIdcard.ocrExpiryDate}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Marital Status</span>
                  <span>{{$t('auditDetail.no54')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrMaritalStatus!==null&&data.userIdcard.ocrMaritalStatus!==undefined&&data.userIdcard.ocrMaritalStatus!==''"
                  class="p-2"
                >{{data.userIdcard.ocrMaritalStatus}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
              <li>
                <p class="p-1">
                  <span>Address</span>
                  <span>{{$t('auditDetail.no55')}}</span>
                </p>
                <p
                  v-if="data.userIdcard.ocrAddress!==null&&data.userIdcard.ocrAddress!==undefined&&data.userIdcard.ocrAddress!==''"
                  class="p-2"
                >{{data.userIdcard.ocrAddress}}</p>
                <p v-else class="p-2">{{$store.state.common.nullData}}</p>
              </li>
            </ul>
          </div>
        </li>
        <!------------------------ 公司检测 ---------------------------->
        <li class="xuan-2-6" v-if="active==6">
          <div class="xuan-2-6-1">
            <h4>{{$t('auditDetail.no56')}}:&nbsp;&nbsp;{{data.userWork.company}}</h4>
          </div>
          <template>
            <div class="xuan-2-6-2">
              <ul>
                <li>
                  <h3>Guardion Verification</h3>
                </li>
                <template
                  v-if="companyCheckStr.message!==null&&companyCheckStr.message!==undefined&&companyCheckStr.code.toLocaleLowerCase()=='success'"
                >
                  <template
                    v-if="companyCheckStr.data!==null&&companyCheckStr.data!==undefined&&companyCheckStr.data!==''"
                  >
                    <template
                      v-if="companyCheckStr.data.legalCompanyInfoList!==null&&companyCheckStr.data.legalCompanyInfoList!==undefined&&companyCheckStr.data.legalCompanyInfoList!=''"
                    >
                      <li
                        v-for="(value,index) in companyCheckStr.data.legalCompanyInfoList"
                        :key="index"
                      >
                        <div class="p11">
                          <p class="p-1">Company Name</p>
                          <p class="p-2">{{value.companyName}}</p>
                        </div>
                        <div class="p11">
                          <p class="p-1">Company Address</p>
                          <p class="p-2">{{value.address}}</p>
                        </div>
                      </li>
                    </template>
                  </template>
                </template>
                <li v-else style="padding:5px">
                  <h4>{{$t('public.no23')}}</h4>
                </li>
              </ul>
              <ul>
                <li>
                  <h3>Google Verification</h3>
                </li>
                <template
                  v-if="companyCheckStr.message!==null&&companyCheckStr.message!==undefined&&companyCheckStr.code.toLocaleLowerCase()=='success'"
                >
                  <template
                    v-if="companyCheckStr.data!==null&&companyCheckStr.data!==undefined&&companyCheckStr.data!==''"
                  >
                    <template
                      v-if="companyCheckStr.data.googleCompanyInfoList!==null&&companyCheckStr.data.googleCompanyInfoList!==undefined&&companyCheckStr.data.googleCompanyInfoList!=''"
                    >
                      <li
                        v-for="(value,index) in companyCheckStr.data.googleCompanyInfoList.slice(0,1)"
                        :key="index"
                      >
                        <div class="p11">
                          <p class="p-1">Company Name</p>
                          <p class="p-2">{{value.companyName}}</p>
                        </div>
                        <div class="p11">
                          <p class="p-1">Company Address</p>
                          <p class="p-2">{{value.address}}</p>
                        </div>
                      </li>
                      <li
                        v-if="companyCheckStr.data.googleCompanyInfoList.length>1"
                        style="cursor:pointer;padding:5px;"
                        @click="moreCompanyFlag=true"
                      >{{$t('auditDetail.no64')}}</li>
                    </template>
                  </template>
                </template>
                <li v-else style="padding:5px">
                  <h4>{{$t('public.no23')}}</h4>
                </li>
              </ul>
            </div>
          </template>
        </li>
        <!------------------------ 多平台检测 ---------------------------->
        <li class="xuan-2-7" v-if="active==7">
          <template v-if="data.orderMultiCheck!==undefined&&data.orderMultiCheck!==''">
            <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
              <tr>
                <th width="25%">{{$t('auditDetail.no60')}}</th>
                <th width="75%">{{$t('auditDetail.no61')}}</th>
              </tr>
              <tr>
                <td>{{$t($store.getters.orderMultiCheckStatus(data.orderMultiCheck.checkResult))}}</td>
                <td>{{data.orderMultiCheck.remark | dataIsTrue}}</td>
              </tr>
            </table>
            <div class="foot"></div>
            <template
              v-if="data.orderMultiCheck.checkResult!==undefined&&data.orderMultiCheck.checkResult=='1'"
            >
              <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
                <tr>
                  <th width="33.3%">{{$t('auditDetail.no57')}}</th>
                  <th width="33.3%">{{$t('auditDetail.no58')}}</th>
                  <th width="33.3%">{{$t('auditDetail.no59')}}</th>
                </tr>
                <template
                  v-if="orderMultiCheckStr.data!==null&&orderMultiCheckStr.data!==undefined&&orderMultiCheckStr.data!=''"
                >
                  <tr v-for="(value,index) in orderMultiCheckStr.data" :key="index">
                    <td>{{value.type}}</td>
                    <td>{{value.queryCount}}</td>
                    <td>{{value.queryDates.join(',')}}</td>
                  </tr>
                </template>
                <div
                  v-else
                  style="textAlign:center;width:300%;height:40px;lineHeight:40px"
                >{{$t('public.no23')}}</div>
              </table>
            </template>
          </template>
          <div
            v-else
            style="textAlign:center;width:100%;height:40px;lineHeight:40px"
          >{{$t('public.no23')}}</div>
        </li>
        <!------------------------ 反欺诈分 ---------------------------->
        <li class="xuan-2-8" v-if="active==8">
          <Gauge></Gauge>
        </li>
        <!------------------------ 电审录音 ---------------------------->
        <li v-if="active==9">
          <audit-record type="1" :orderId="orderId"></audit-record>
        </li>
      </ul>
    </div>
    <div class="foot" style="height:16px"></div>
    <!----------------------------- 三方评分 ---------------------------------->
    <template v-if="$store.state.common.lang==='id'">
      <div class="paixu">
        <span></span>
        <p>{{$t('auditDetail.no71')}}</p>
      </div>
      <div class="thirdRate" v-if="showqizha||showjiance">
        <div class="row" v-if="showqizha" style="height:40px">
          <span class="thirdLeft" style="margin-right:150px">{{$t('auditDetail.no72')}}</span>
          <span v-if="showqizhascore">
            <span class="classScore">{{qizhascore}}</span>
            <span class="classMessage">{{qizhamessage}}</span>
            <span
              class="threetips"
            >({{$t('auditDetail.no76')}}：{{qizhaupdateTime}}； {{$t('auditDetail.no53')}}：{{qizhatime}}{{$t('public.no26')}})</span>
          </span>
          <el-button
            v-if="!showqizhascore"
            size="small"
            type="primary"
            @click="showRate"
          >{{$t('auditDetail.no73')}}</el-button>
        </div>
        <div class="row" v-if="showjiance">
          <span class="thirdLeft" style="margin-right:118px">{{$t('auditDetail.no74')}}</span>
          <span v-if="showjiancecore" class="classMessage">{{jiancemessage}}</span>
          <span
            v-if="showjiancecore"
            class="threetips"
          >({{$t('auditDetail.no76')}}：{{jianceupdateTime}}； {{$t('auditDetail.no53')}}：{{jiancetime}}{{$t('public.no26')}})</span>
          <el-button
            v-if="!showjiancecore"
            size="small"
            type="primary"
            @click="showduo"
          >{{$t('auditDetail.no73')}}</el-button>
          <div class="thirdLeft" style="margin-top:15px" v-if="showjiancecore">{{$t('auditDetail.no75')}}：</div>
          <table
            class="threeTable"
            border="1"
            cellpadding="0"
            cellspacing="0"
            style="border-color:#F2F6FC"
            v-if="showjiancecore"
          >
            <tr class="tablrtr">
              <th class="tableth">{{$t('auditDetail.no79')}}</th>
              <th
                class="tableth"
                v-for="item in CustomerInfoData"
                :key="item.index"
              >{{item.timePeriod}}</th>
            </tr>
            <tr class="tablrtr">
              <td class="tabletd">{{$t('auditDetail.no58')}}</td>
              <td
                class="tabletd"
                v-for="item in CustomerInfoData"
                :key="item.index"
              >{{item.queryCount}}</td>
            </tr>
          </table>
          <div class="thirdLeft" style="margin-top:15px" v-if="showjiancecore">{{$t('auditDetail.no81')}}</div>
          <table
            class="threeTable"
            border="1"
            cellpadding="0"
            cellspacing="0"
            style="border-color:#F2F6FC"
            v-if="showjiancecore"
          >
            <tr class="tablrtr">
              <th class="tableth">{{$t('auditDetail.no82')}}</th>
              <th
                class="tableth"
                v-for="item in TwoWeeksQueryInfoData"
                :key="item.index"
              >{{item.timeSlice}}</th>
            </tr>
            <tr class="tablrtr">
              <td class="tabletd">{{$t('auditDetail.no83')}}</td>
              <td
                class="tabletd"
                v-for="item in TwoWeeksQueryInfoData"
                :key="item.index"
              >{{item.maxQueryCount}}</td>
            </tr>
            <tr class="tablrtr">
              <td class="tabletd">{{$t('auditDetail.no84')}}</td>
              <td
                class="tabletd"
                v-for="item in TwoWeeksQueryInfoData"
                :key="item.index"
              >{{item.times}}</td>
            </tr>
          </table>
        </div>
      </div>
    </template>
    <div class="foot" style="height:16px"></div>
    <!------------------------ 初审结果展示开始 ---------------------------->
    <el-row>
      <el-col :span="24">
        <div class="paixu pai-active">
          <span></span>
          <p>{{$t('auditDetail.no12')}}</p>
        </div>
      </el-col>
    </el-row>
    <div class="chushenjilu">
      <template v-if="peopleOne_audit!==null&&peopleOne_audit!==undefined&&peopleOne_audit!==''">
        <div class="chu-select">
          <div class="chu-select-left">{{$t('auditDetail.no21')}}</div>
          <div
            v-if="peopleOne_audit.approveResult!==null&&peopleOne_audit.approveResult!==undefined"
            class="chu-select-right"
          >{{peopleOne_audit.approveResult==1?$t('auditDetail.no16'):$t('auditDetail.no17')}}</div>
          <div v-else class="chu-select-right">{{$store.state.common.nullData}}</div>
        </div>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('public.no37')}}</div>
          <div
            class="chu-select-right"
          >{{peopleOne_audit.remark!==null&&peopleOne_audit.remark!==undefined&&peopleOne_audit.remark!==''?peopleOne_audit.remark:$store.state.common.nullData}}</div>
        </div>
        <template v-if="peopleOne_audit.approveResult&&peopleOne_audit.approveResult == -1">
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no18')}}:</div>
            <div
              class="chu-select-right"
            >{{peopleOne_audit.notApproveReason?peopleOne_audit.notApproveReason:$store.state.common.nullData}}</div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no19')}}:</div>
            <div
              class="chu-select-right"
            >{{peopleOne_audit.notApproveSubReason?peopleOne_audit.notApproveSubReason:$store.state.common.nullData}}</div>
          </div>
        </template>
      </template>
    </div>
    <!------------------------ 初审结果展示结束 ---------------------------->

    <div class="foot" style="height:16px"></div>

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
        <div style="textAlign:center;width:400%;height:40px;lineHeight:40px">{{$t('public.no23')}}</div>
      </template>
    </table>
    <!------------------------ 跟踪记录结果展示结束 ---------------------------->

    <div class="foot" style="height:16px"></div>

    <!------------------------ 复审提交操作开始 ---------------------------->
    <template>
      <div
        v-if="peopleTwo_audit!==null&&peopleTwo_audit!==undefined&&peopleTwo_audit!=''"
        class="chushenjilu"
      >
        <el-row>
          <el-col :span="24">
            <div class="paixu pai-active">
              <span></span>
              <p>{{$t('auditDetail.no62')}}</p>
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
            <div
              style="textAlign:center;width:660%;height:40px;lineHeight:40px"
            >{{$t('public.no23')}}</div>
          </template>
        </table>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('auditDetail.no27')}}:</div>
          <div
            class="chu-select-right"
          >{{peopleTwo_audit.strApproveTime?peopleTwo_audit.strApproveTime:$store.state.common.nullData}}</div>
        </div>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('auditDetail.no28')}}:</div>
          <div
            class="chu-select-right"
          >{{peopleTwo_audit.approveResult==1?$t('auditDetail.no16'):$t('auditDetail.no17')}}</div>
        </div>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('public.no37')}}:</div>
          <div
            class="chu-select-right"
          >{{peopleTwo_audit.remark?peopleTwo_audit.remark:$store.state.common.nullData}}</div>
        </div>
        <template v-if="peopleTwo_audit.approveResult == -1">
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no18')}}:</div>
            <div
              class="chu-select-right"
            >{{peopleTwo_audit.notApproveReason?peopleTwo_audit.notApproveReason:$store.state.common.nullData}}</div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no19')}}:</div>
            <div
              class="chu-select-right"
            >{{peopleTwo_audit.notApproveSubReason?peopleTwo_audit.notApproveSubReason:$store.state.common.nullData}}</div>
          </div>
        </template>
      </div>
      <div v-else class="chushenjilu">
        <div class="xuanxiangka" v-if="block==2">
          <ul class="xuan-1">
            <li
              v-for="(value,index) in arr2"
              :key="index"
              :class="{active:active1==value.id}"
              @click="active1=value.id"
            >
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
                    <td>{{value.userName}}</td>
                    <td>{{$t($store.getters.tel_through(value.connectStatus))}}</td>
                    <td>{{value.remark}}</td>
                    <td>{{value.strFirstApproveTime}}</td>
                  </tr>
                </template>
                <template v-else>
                  <div
                    style="textAlign:center;width:660%;height:40px;lineHeight:40px"
                  >{{$t('public.no23')}}</div>
                </template>
              </table>
              <div class="chu-select1">
                <div class="chu-select-left">{{$t('auditDetail.no28')}}</div>
                <div class="chu-select-right">
                  <el-select size="small" v-model="status1" :placeholder="$t('public.placeholder')">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="$t(item.label)"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <template v-if="status1==-1">
                  <div class="chu-select-left">{{$t('auditDetail.no23')}}</div>
                  <div class="chu-select-right">
                    <el-select
                      size="small"
                      v-model="status2"
                      :placeholder="$t('public.placeholder')"
                    >
                      <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="chu-select-right">
                    <el-select
                      size="small"
                      v-model="status3"
                      :placeholder="$t('public.placeholder')"
                    >
                      <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </template>
              </div>
              <div class="chu-select">
                <div class="chu-select-left">{{$t('public.no37')}}</div>
                <div class="chu-select-right">
                  <textarea
                    class="search_inpu"
                    v-model="remark"
                    :placeholder="$t('public.no42')+'~'"
                  ></textarea>
                </div>
              </div>
              <div
                class="input-but"
                v-if="$store.state.common.permiss.includes('RIGHT_REVIEW_SUBMIT')"
              >
                <el-button type="primary" class="button-color" @click="submit">{{$t('public.no41')}}</el-button>
              </div>
            </li>
            <li class="xuan-2-1" v-if="active1==2">
              <div class="chu-select1">
                <div class="chu-select-left">{{$t('public.no37')}}</div>
                <div class="chu-select-right">
                  <textarea
                    class="search_inpu"
                    v-model="remark1"
                    :placeholder="$t('public.no42')+'~'"
                  ></textarea>
                </div>
              </div>
              <div class="input-but">
                <el-button
                  type="primary"
                  class="button-color"
                  @click="submit1"
                >{{$t('public.no41')}}</el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <!-- ------------------ 点击公司检测更多弹窗开始 -------------------- -->
    <div v-if="moreCompanyFlag" class="more">
      <div class="more-main">
        <div class="more-main-head">
          <span></span>
          <p>{{$t('auditDetail.no64')}}</p>
          <i
            class="el-icon-shop-guanbi icon-color"
            style="cursor:pointer"
            @click="moreCompanyFlag=false"
          ></i>
        </div>
        <div class="more-main-con">
          <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th width="25%">{{$t('public.no39')}}</th>
              <th width="25%">{{$t('public.no18')}}</th>
            </tr>
            <tr v-for="(item,index) in companyCheckStr.data.googleCompanyInfoList" :key="index">
              <td>{{item.companyName | dataIsTrue}}</td>
              <td>{{item.address | dataIsTrue}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击公司检测更多弹窗结束 -------------------- -->

    <!-- ---------------------- 复审提交操作结束 ------------------------ -->
    <div class="foot"></div>
    <!-- ---------------------- 图片点击放大组件 ------------------------ -->
    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>

    <!-- ------------------ 点击电话审核弹窗开始 -------------------- -->
    <div v-if="telFlag||telFlag1||telFlag2||telFlag3||telFlag4||telFlag7||telFlag8" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('auditDetail.no42')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="telClose"></i>
        </div>
        <div class="reply-main-con">
          <el-button @click="callPhone" v-if="telTip">{{$t('yn.no46')}}</el-button>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no43')}}</div>
            <div class="chu-select-right">
              <el-select size="small" v-model="telStatus" :placeholder="$t('public.placeholder')">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('public.no37')}}</div>
            <div class="chu-select-right">
              <textarea
                class="search_inpu"
                v-model="telRemark"
                :placeholder="$t('public.no42')+'~'"
              ></textarea>
            </div>
          </div>
          <div class="reply-but" @click="telSubmit">{{$t('public.no41')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击电话审核弹窗结束 -------------------- -->
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
import telRecordList from '../../../components/component/teltable'
import noteRecordList from '../../../components/component/notetable'
import loanList from '../../../components/component/loantable'
import auditDetail from '../../../components/component/auditdetail'
import auditRecord from '../../../components/component/auditRecord'

import Gauge from '../../../components/component/gauge'// 欺诈分图表组件
import appLightbox from '../../../components/component/lightbox'// 图片点击放大组件

export default {
  name: 'detailsAudit',
  components: {
    telRecordList,
    noteRecordList,
    loanList,
    auditDetail,
    auditRecord,
    appLightbox,
    Gauge
  },
  data () {
    return {
      showqizha: false, //欺诈分是否显示
      showjiance: false, //多平台检测是否显示
      showqizhascore: false, //欺诈分点击显示
      showjiancecore: false, //检测点击显示
      qizhascore: "", //欺诈分
      qizhamessage: "", //欺诈分信息
      qizhaupdateTime: "", //欺诈分更新时间
      qizhatime: "", //欺诈分有效期
      jiancetime: "", //检测有效期
      jiancemessage: "", //检测信息
      jianceupdateTime: "", //检测更新时间
      CustomerInfoData: [], //统计客户信息数据
      TwoWeeksQueryInfoData: [], //最近两周查询信息数据
      flag: true,
      block: '', // 控制审核提交操作是否显示
      telFlag: false,
      telFlag1: false,
      telFlag2: false,
      telFlag3: false,
      telFlag4: false,
      telFlag7: false,
      telFlag8: false,
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
        order: '',
        orderExtra: '',
        orderList: '',
        orderMultiCheck: '',
        oldUserIdCard: '',
        userUrgentContact: '',
        userOrderCount: {},
        contactOne: '',
        contactTwo: '',
        contactThree: '',
        contactFour: '',
        contactFive: '',
      },
      // arr1:['用户信息','通话记录信息','短信信息记录','历史借款记录','OCR身份检测','公司检测','多平台检测','反欺诈'],
      active: 4, // 第一个当前点中的选项卡
      active1: 1, // 第二个当前点中的选项卡
      active2: 1, // 用户详情借款详情当前点中的选项卡
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
      peopleTwo_audit: '', // 人工复审结果数据
      moreCompanyFlag: false, // 公司检测点击更多弹窗
      telTip: false, // 电话呼叫按钮是否展示
      companyCheckStr: '', // 公司检测信息
      orderMultiCheckStr: '', // 多平台检测信息
      followReason: '',
      followReason1: '',
      telHref: '', // 打电话路径
      telNumber: '', // 电话号码
    }
  },
  computed: {// 做国际化的选项卡
    arr1 () {
      let arr = []
      if (this.block == 1) {
        arr.push({id: 4, title: this.$t('tab3.no4')})
        arr.push({id: 1, title: this.$t('tab3.no1'), black:this.data.userBase.isBlack})
        arr.push({id: 2, title: this.$t('tab3.no2')})
        arr.push({id: 3, title: this.$t('tab3.no3')})
        
        arr.push({id: 5, title: this.$t('tab3.no5')})
        arr.push({id: 6, title: this.$t('tab3.no6')})
        arr.push({id: 7, title: this.$t('tab3.no7')})
        arr.push({id: 9, title: this.$t('yn.no29')})
      } else {
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_HIS')) {
          arr.push({id: 4, title: this.$t('tab3.no4')})
        }
        
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_USER')) {
          arr.push({id: 1, title: this.$t('tab3.no1')})
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_CALL')) {
          arr.push({id: 2, title: this.$t('tab3.no2')})
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_SMS')) {
          arr.push({id: 3, title: this.$t('tab3.no3')})
        }
        
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REIVEW_OCR')) {
          arr.push({id: 5, title: this.$t('tab3.no5')})
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_COMPANY')) {
          arr.push({id: 6, title: this.$t('tab3.no6')})
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_OTHER')) {
          arr.push({id: 7, title: this.$t('tab3.no7')})
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_ELECTRIC_RECORDING')) {
          arr.push({id: 9, title: this.$t('yn.no29')})
        }
        // if(this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_OTHER')){
        //   arr.push({id:8,title:this.$t('tab3.no8')})
        // }
      }

      return arr
    },
    arr2 () {
      let arr = []
      arr.push({id: 1, title: this.$t('auditDetail.no62')})
      arr.push({id: 2, title: this.$t('auditDetail.no65')})
      return arr
    },
    arr3 () {
      let arr = []
      arr.push({id: 1, title: this.$t('operationDetail.tab1.no1')})
      arr.push({id: 2, title: this.$t('operationDetail.tab1.no2')})
      return arr
    }
  },
  methods: {
    showRate: function(e) {
      //点击获取欺诈分
      let option = {
        header: {
          ...this.$base,
          action: "FRAUDSCORE001",
          sessionid: this.sessionid
        },
        orderId: this.orderId
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          // console.log(res, "2222");
          this.showqizhascore = true;
          this.qizhascore = res.data.data.score;
          this.qizhamessage = res.data.data.message;
          this.qizhaupdateTime = res.data.data.updateTime;
        }else{
          this.$message.error(this.$t("auditDetail.no85"))
        }
      });
    },
    showduo: function(e) {
      //点击获取多平台检测
      let option = {
        header: {
          ...this.$base,
          action: "MULTIDATA001",
          sessionid: this.sessionid
        },
        orderId: this.orderId
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0&&res.data.data.message=='SUCCESS') {
          // console.log(res, "00000");
          this.showjiancecore = true;
          this.jiancemessage = res.data.data.message;
          this.jianceupdateTime = res.data.data.updateTime;
          this.CustomerInfoData = res.data.data.statisticCustomerInfo;
          this.TwoWeeksQueryInfoData = res.data.data.lastTwoWeeksQueryInfo;
        }
        else{ 
             this.$message.error(this.$t("auditDetail.no85"))
        }
        // console.log(this.CustomerInfoData, "666");
      });
    },
    openBox: function (obj) { // 图片点击放大
      this.currentObj = obj
      this.lightBoxToggle = !this.lightBoxToggle
    },
    closeBox: function () { // 图片点击放小
      this.lightBoxToggle = false
    },
    telDetail () { // 传入通话子组件的方法
      this.telRecord2()// 复审电话审核记录
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
          this.data.orderExtra = res.data.data.orderExtra;
          this.data.orderList = res.data.data.orderList;
          this.data.orderMultiCheck = res.data.data.orderMultiCheck;
          this.data.userUrgentContact = res.data.data.userUrgentContact;
          this.data.contactOne = res.data.data.contactOne;
          this.data.contactTwo = res.data.data.contactTwo;
          this.data.contactThree = res.data.data.contactThree;
          this.data.contactFour = res.data.data.contactFour;
          this.data.contactFive = res.data.data.contactFive;
          this.data.userOrderCount = res.data.data.userOrderCount;
          this.data.oldUserIdCard = res.data.data.oldUserIdCard;
          if (res.data.data.userWork.companyCheckStr !== null && res.data.data.userWork.companyCheckStr !== undefined && res.data.data.userWork.companyCheckStr !== '') {
            this.companyCheckStr = JSON.parse(res.data.data.userWork.companyCheckStr)
          }
          if (res.data.data.orderMultiCheck !== null && res.data.data.orderMultiCheck !== undefined && res.data.data.orderMultiCheck !== '') {
            this.orderMultiCheckStr = JSON.parse(res.data.data.orderMultiCheck.checkStr)
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
          this.phoneAuditOne = res.data.data
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
          this.phoneAuditTwo = res.data.data
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
          this.rejectData = res.data.data
          this.rejectData.forEach(value => { // 用户选择第一个驳回原因的时候检测status2的值动态生成第二个驳回原因的值
            value.value = value.optionValue// 取optionValue值作为选择框的value值
            value.label = value.optionName// 取optionName值作为选择框的label值
            this.options2.push({value: value.optionValue, label: value.optionName})
            if (value.children) { // 如果存在children，再次循环做原因子类别的赋值
              value.children.forEach(item => {
                item.value = item.optionValue
                item.label = item.optionName
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
          this.machine_audit = res.data.data
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
          this.peopleOne_audit = res.data.data
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
          this.peopleTwo_audit = res.data.data
        }
      })
    },
    submit () { // 复审结果提交操作
      if (this.status1 == '') { // 验证结果是否选择
        this.$globalMsg.error(this.$t('auditDetail.no29'))
        return
      }
      if (this.status1 == -1) { // 验证驳回结果是否选择
        if (this.status2 == '' || this.status3 == '') {
          this.$globalMsg.error(this.$t('auditDetail.no25'))
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
          option.notApproveReason = this.status2
          option.notApproveSubReason = this.status3
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('auditDetail.no26'))
            setTimeout(() => {
              this.$router.push('/mySecondtAuditList')
            }, 1000)
          } else {
            this.$globalMsg.error(res.data.header.msg)
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
            this.$globalMsg.success(this.$t('auditDetail.no26'))
            this.followHistory()
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.remark1 = ''
        })
      }
    },
    moreCompany () {

    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1)
    },
    telSubmit () {
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
        option.phone = this.data.userBase.phone
        option.userName = this.data.userBase.name
      }
      if (this.telFlag1) {
        option.phone = this.data.userWork.companyPhone
        option.userName = this.data.userWork.company
      }
      if (this.telFlag2) {
        option.phone = this.data.userUrgentContact.contactOnePhone ? this.data.userUrgentContact.contactOnePhone : ''
        option.relation = this.data.userUrgentContact.contactOneRelation ? this.data.userUrgentContact.contactOneRelation : ''
        option.userName = this.data.userUrgentContact.contactOneName ? this.data.userUrgentContact.contactOneName : ''
      }
      if (this.telFlag3) {
        option.phone = this.data.userUrgentContact.contactTwoPhone ? this.data.userUrgentContact.contactTwoPhone : ''
        option.relation = this.data.userUrgentContact.contactTwoRelation ? this.data.userUrgentContact.contactTwoRelation : ''
        option.userName = this.data.userUrgentContact.contactTwoName ? this.data.userUrgentContact.contactTwoName : ''
      }
      if (this.telFlag4) {
        option.phone = this.data.userUrgentContact.contactThreePhone ? this.data.userUrgentContact.contactThreePhone : ''
        option.relation = this.data.userUrgentContact.contactThreeRelation ? this.data.userUrgentContact.contactThreeRelation : ''
        option.userName = this.data.userUrgentContact.contactThreeName ? this.data.userUrgentContact.contactThreeName : ''
      }
      if (this.telFlag7) {
        option.phone = this.data.userUrgentContact.contactFourPhone ? this.data.userUrgentContact.contactFourPhone : '';
        option.relation = this.data.userUrgentContact.contactFourRelation ? this.data.userUrgentContact.contactFourRelation : '';
        option.userName = this.data.userUrgentContact.contactFourName ? this.data.userUrgentContact.contactFourName : '';
      }
      if (this.telFlag8) {
        option.phone = this.data.userUrgentContact.contactFivePhone ? this.data.userUrgentContact.contactFivePhone : '';
        option.relation = this.data.userUrgentContact.contactFiveRelation ? this.data.userUrgentContact.contactFiveRelation : '';
        option.userName = this.data.userUrgentContact.contactFiveName ? this.data.userUrgentContact.contactFiveName : '';
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
        this.telRecord2()
        this.telClose()
      })
    },
    telClose () {
      this.telFlag = false;
      this.telFlag1 = false;
      this.telFlag2 = false;
      this.telFlag3 = false;
      this.telFlag4 = false;
      this.telFlag7 = false;
      this.telFlag8 = false;
      this.telTip = false;
      this.telStatus = '';
      this.telHref = '';
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
          this.followReason = res.data.data
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
          this.followReason1 = res.data.data
        }
      })
    },
    getDefaultActive () {
      if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_HIS')) {
        this.active = 4
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_CALL')) {
        this.active = 2
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_SMS')) {
        this.active = 3
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_USER')) {
        this.active = 1
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_REIVEW_OCR')) {
        this.active = 5
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_COMPANY')) {
        this.active = 6
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_REVIEW_OTHER')) {
        this.active = 7
      }
    },
    openTelWindow( tel, str ){
      if(tel){
        this.telTip = true;
        this.telNumber = tel;
      }
      switch(str){
        case '1':
          this.telFlag = true;
          break;
        case '2':
          this.telFlag1 = true;
          break;
        case '3':
          this.telFlag2 = true;
          break;
        case '4':
          this.telFlag3 = true;
          break;
        case '5':
          this.telFlag4 = true;
          break;
        case '8':
          this.telFlag7 = true;
          break;
        case '9':
          this.telFlag8 = true;
          break;
      }
      
      
    },
    callPhone(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.TELEPHONE0001,
          'sessionid': this.sessionid
        },
        orderId:this.orderId,
        phone:this.telNumber,
        type:1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.telHref = 'sip:'+this.telNumber+','+res.data.data;
          window.location.href = this.telHref;
        }else{
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    }
  },
  watch: {
    status2 () { // 检测驳回结果1，推出相应的驳回原因2
      this.options3 = []
      this.status3 = ''
      let arr = this.rejectData.filter(value => {
        return value.optionValue == this.status2
      })
      this.options3 = arr[0].children
    },
    status1 () { // 结果通过的时候清除驳回原因数据
      if (this.status1 == 1) {
        this.status2 = ''
        this.status3 = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');

    this.userId = this.$route.query.userid;
    this.orderNo = this.$route.query.orderNo;
    this.orderId = this.$route.query.orderId;
    this.block = this.$route.query.block;

    this.detail()// 页面详情数据
    // this.telRecord1()// 初审电话记录列表
    this.telRecord2()// 初审电话记录列表
    this.reject()// 驳回原因树状图
    // this.auditResult1()// 机审结果展示
    this.auditResult2()// 初审结果展示
    this.auditResult3()// 复审结果展示
    this.followHistory()// 获取跟踪记录结果
    this.followHistory1()// 获取初审跟踪记录结果
    this.getDefaultActive()// 获取默认展示的选项卡1
    let option = {
      header: {
        ...this.$base,
        action: "DICT0002",
        sessionid: this.sessionid
      },
      optionGroup: "fraud.score.day"
    };
    this.$axios.post("", option).then(res => {
      if (res.data.header.code == 0 && res !== false) {
        // console.log(res, "33333");
        this.showqizha = true;
        // console.log(res.data.data[0].optionValue);
        this.qizhatime = res.data.data[0].optionValue;
      }
    });
    let option1 = {
      header: {
        ...this.$base,
        action: "DICT0002",
        sessionid: this.sessionid
      },
      optionGroup: "multi.date.day"
    };
    this.$axios.post("", option1).then(res => {
      if (res.data.header.code == 0 && res !== false) {
        // console.log(res, "44444");
        this.showjiance = true;
        // console.log(res.data.data[0].optionValue);
        this.jiancetime = res.data.data[0].optionValue;
      }
    });
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
  p {
    line-height: 24px;
    span:nth-child(1) {
      white-space: nowrap;
      color: $color1;
      font-size: 16px;
    }
    span:nth-child(2),
    span:nth-child(3),
    span:nth-child(4) {
      color: $color2;
      font-size: 16px;
      margin: 0 10px;
      word-break: break-all;
    }
  }
}
$color1: #959fb9;
$color2: #000;

.more {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(182, 189, 205, 0.6);
  .more-main {
    width: 694px;
    height: auto;
    margin-top: 200px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom: 5px;
    .more-main-head {
      width: 100%;
      height: 48px;
      background-color: #333a4d;
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
      .icon-color {
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .more-main-con {
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .more-con-one {
        width: 100%;
        display: flex;
        .more-con-one-1 {
          width: 100px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          color: #999;
        }
        .more-con-one-2 {
          width: 560px;
          height: 40px;
          line-height: 40px;
        }
        .more-con-one-3 {
          width: 560px;
          height: 100%;
          margin-bottom: 10px;
          textarea {
            width: 100%;
            height: 100px;
            font-size: 16px;
            padding: 5px;
          }
        }
        .more-con-one-4 {
          width: 100px;
          height: 40px;
          text-align: center;
          color: #999;
        }
      }
    }
  }
}

.pai-active {
  margin: 16px 0 0;
}

.xuanxiangka {
  width: 100%;
  height: auto;
  background-color: #fff;
  .xuan-1 {
    width: 100%;
    // height: 60px;
    display: flex;
    li {
      height: 100%;
      margin: 10px 12px;
      text-align: center;
      color: $color2;
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        display: block;
        padding-bottom: 10px;
      }
    }
    .active {
      span {
        border-bottom: 2px solid #547afe;
      }
    }
  }
  .xuan-2 {
    width: 100%;
    height: auto;
    & > li {
      width: 100%;
      padding: 10px 20px;
    }
  }
}
.xuan-2-1 {
  .xuan-2-1-1 {
    width: 100%;
    display: flex;
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
      width: 100%;
      padding-left: 20px;
      .xuan-2-1-1-22 {
        display: flex;
        margin: 15px 0;
        @include p-span;
        p {
          width: 33%;
        }
      }
    }
    .xuan-2-1-1-3 {
      width: 30%;
    }
    .imgbox {
      width: 200px;
      height: 190px;
      margin: 0 10px 10px 0;
      .imgDes {
        width: 100%;
        font-size: 18px;
        height: 30px;
        // font-weight: 600;
      }
      .imgbox1 {
        width: 200px;
        height: 150px;
      }
    }
  }
  .xuan-2-1-2 {
    width: 100%;
    .xuan-2-1-2-1 {
      margin: 10px;
      display: flex;
      align-items: center;
      @include p-span;
      p {
        padding-right: 10px;
      }
    }
  }
  .idimgbox {
    width: 410px;
    height: auto;
    display: flex;
    margin: 20px 10px;
    justify-content: space-between;
    .idimg {
      width: 200px;
      height: 150px;
    }
  }
}
.xuan-2-5 {
  .xuan-2-5-1 {
    width: 400px;
    height: 250px;
    margin: 0 auto;
    margin-bottom: 40px;
  }
  .xuan-2-5-2 {
    width: 100%;
    height: auto;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 25%;
        height: 80px;
        padding-left: 20px;
        border-bottom: 1px solid #ddd;
        .p-1 {
          color: $color1;
          line-height: 34px;
          span {
            display: inline;
            vertical-align: bottom;
          }
          span:nth-child(1) {
            color: $color2;
            font-size: 14px;
          }
          span:nth-child(2),
          span:nth-child(3),
          span:nth-child(4) {
            font-size: 16px;
            padding: 0 10px;
          }
        }
        .p-2 {
          line-height: 40px;
        }
      }
    }
  }
}
.xuan-2-6 {
  padding-bottom: 10px;
  .xuan-2-6-1 {
    width: 100%;
    height: 100px;
    line-height: 100px;
    padding: 0 20px;
  }
  .xuan-2-6-2 {
    width: 100%;
    display: flex;
    padding: 0 20px;
    ul {
      width: 50%;
      li {
        width: 100%;
        height: auto;
        padding-right: 40px;
        .p11 {
          .p-1 {
            color: $color1;
            line-height: 40px;
          }
          .p-2 {
            color: $color2;
            word-wrap: break-word;
          }
        }
        &:nth-child(1) {
          border-bottom: 1px solid #ddd;
        }
        h3 {
          line-height: 40px;
        }
      }
    }
  }
}

.xuan-2-8 {
  height: 450px;
}
.chushenjilu {
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 20px 20px;
  .chu-title {
    margin: 0px 0 20px;
    font-size: 16px;
  }
  .chu-select1 {
    margin: 20px 20px;
    padding: 5px 0;
    display: flex;
    .chu-select-left {
      width: 8%;
      padding: 7px 5px;
    }
    .chu-select-right {
      width: 38%;
      .search_inpu {
        width: 100%;
        height: 150px;
        padding: 5px;
        font-size: 16px;
      }
    }
  }
  .chu-select {
    margin: 20px 20px;
    padding: 5px 0;
    display: flex;
    .chu-select-left {
      width: 8%;
    }
    .chu-select-right {
      width: 90%;
      word-break: break-all;
      .search_inpu {
        width: 100%;
        height: 150px;
        padding: 5px;
        font-size: 16px;
      }
    }
  }
  .input-but {
    width: 100px;
    margin: 0 auto;
    .el-button {
      width: 100%;
    }
  }
}

.reply {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main {
    width: 694px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .reply-main-head {
      width: 100%;
      height: 48px;
      background-color: #333a4d;
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
      .icon-color {
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .reply-main-con {
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .chu-select {
        margin: 20px 20px;
        padding: 5px 0;
        display: flex;
        .chu-select-left {
          width: 15%;
        }
        .chu-select-right {
          width: 85%;
          .search_inpu {
            width: 100%;
            height: 150px;
            padding: 5px;
            font-size: 16px;
          }
        }
      }
      .reply-but {
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

.tooltip {
  width: 15px;
  height: 15px;
  img {
    display: block;
  }
}

.old_img {
  width: 160px;
  height: 100px;
  margin-right: 20px;
}
.thirdRate {
  background-color: #ffffff;
  padding: 20px 34px;
  .row {
    margin-bottom: 10px;
  }
}
.classScore {
  font-size: 20px;
  font-weight: bold;
  margin-right: 40px;
}
.classMessage {
  margin-right: 20px;
}
.threetips {
  color: #909399;
}
.thirdLeft {
  color: #409eff;
}
.threeTable {
  text-align: center;
  margin-top: 20px;
  margin-left: 40px;
  .tablrtr {
    height: 40px;
  }
  .tableth {
    width: 100px;
    background-color: #f2f6fc;
  }
  .tabletd {
    width: 100px;
  }
}
</style>
