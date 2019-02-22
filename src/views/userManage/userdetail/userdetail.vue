<template>
  <div class="usermanage" v-if="data">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('userList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/userlist'}">{{$t('userList.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('userDetail.crumbs')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- -------------用户详情------------------------ -->
    <div class="detail">
      <div class="left">
      </div>
      <div class="right">
        <ul class="ul-one">
          <li >
            <span>{{$t('public.userId')}}:</span> 
            <span v-if="data.id!=''">{{data.id}}</span>  
            <span v-else> {{$store.state.common.nullData}} </span>
          </li>
          <li >
            <span>{{$t('public.registerDate')}}:</span> 
            <span v-if="data.strRegTime!=''">{{data.strRegTime}}</span>  
            <span v-else> {{$store.state.common.nullData}} </span>
          </li>
          <li >
            <span>{{$t('public.userPhone')}}:</span> 
            <span v-if="data.phone!=''">{{data.phone}}</span>  
            <span v-else> {{$store.state.common.nullData}} </span>
          </li>
          <li >
            <span>{{$t('public.registerClient')}}:</span>
            <span>{{$t($store.getters.clientStatus(data.regDevice))}}</span> 
          </li>
          <li >
            <span>{{$t('new.no48')}}:</span> 
            <span v-if="data.appName!=''">{{data.appName}}</span>  
            <span v-else> {{$store.state.common.nullData}} </span>
          </li>
          <li >
            <span>{{$t('new.no49')}}:</span> 
            <span v-if="data.appPackage!=''">{{data.appPackage}}</span>  
            <span v-else> {{$store.state.common.nullData}} </span>
          </li>
          <li >
            <span>{{$t('public.registerChannel')}}:</span> 
            <span v-if="data.regChannel!=''">{{data.regChannel}}</span>  
            <span v-else> {{$store.state.common.nullData}} </span>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="xuanxiangka">
      <ul class="xuan-1">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active==value.id}" @click="active=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="xuan-2">
        <li class="xuan-2-1" v-if="active==1">
          <template>
            <li v-if="userIdcard.name!==null&&userIdcard.name!==undefined&&userIdcard.name!==''">{{$t('public.no1')}}: <span>{{userIdcard.name}}</span>  </li>
            <li v-else>{{$t('public.no1')}}: <span> {{$store.state.common.nullData}} </span> </li>
          </template>
          <template>
            <li v-if="userIdcard.idCard!==null&&userIdcard.idCard!==undefined&&userIdcard.idCard!==''">{{$t('public.no2')}}: <span>{{userIdcard.idCard}}</span>  </li>
            <li v-else>{{$t('public.no2')}}: <span> {{$store.state.common.nullData}} </span> </li>
          </template>
          <div class="idimgbox">
            <template>
              <div v-if="userIdcard.idcardPhotoUrl!==null&&userIdcard.idcardPhotoUrl!==undefined&&userIdcard.idcardPhotoUrl!==''" class="idimg pic" @click="openBox({imgUrl:userIdcard.idcardPhotoUrl})">
                <img :src="userIdcard.idcardPhotoUrl" :alt="$t('pic.no1')" :title="$t('pic.no1')">
              </div>
              <div v-else class="idimg pic" >
                <img src="../../../assets/img/null.png" :title="$t('pic.no1')">
              </div>
            </template>
            <template>
              <div v-if="userIdcard.facetimePhotoUrl!==null&&userIdcard.facetimePhotoUrl!==undefined&&userIdcard.facetimePhotoUrl!==''" class="idimg pic" @click="openBox({imgUrl:userIdcard.facetimePhotoUrl})">
                <img :src="userIdcard.facetimePhotoUrl" :alt="$t('pic.no2')" :title="$t('pic.no2')">
              </div>
              <div v-else class="idimg pic" >
                <img src="../../../assets/img/null.png" :title="$t('pic.no2')">
              </div>
            </template>
          </div>
        </li>
        <li class="xuan-2-2" v-if="active==2">
          <div class="xuan-2-2-1">
            <template>
              <p v-if="userIdcard.name!==null&&userIdcard.name!==undefined&&userIdcard.name!==''"><span>{{$t('public.no1')}}:</span> <span>{{userIdcard.name}}</span>  </p>
              <p v-else><span>{{$t('public.no1')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
            <template>
              <p v-if="userSelf.sex!==null&&userSelf.sex!==undefined&&userSelf.sex!==''"><span>{{$t('public.sex')}}:</span> <span>{{$t($store.getters.sexStatus(userSelf.sex))}}</span></p>
              <p v-else><span>{{$t('public.sex')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
            <template>
              <p v-if="userSelf.marriage!==null&&userSelf.marriage!==undefined&&userSelf.marriage!==''"><span>{{$t('public.no3')}}:</span> <span>{{$t($store.getters.marriage(userSelf.marriage))}}</span> </p>
              <p v-else><span>{{$t('public.no3')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
          </div>
          <div class="xuan-2-2-1">
            <template>
              <p v-if="userIdcard.idCard!==null&&userIdcard.idCard!==undefined&&userIdcard.idCard!==''"><span>{{$t('public.no2')}}:</span> <span>{{userIdcard.idCard}}</span>  </p>
              <p v-else><span>{{$t('public.no2')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
            <template v-if="$store.state.common.lang=='id'">
              <p v-if="userSelf.bear!==null&&userSelf.bear!==undefined&&userSelf.bear!==''"><span>{{$t('public.no4')}}:</span> <span>{{$t($store.getters.birthState(userSelf.bear))}}</span> </p>
              <p v-else><span>{{$t('public.no4')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
            <template>
              <p v-if="userSelf.degree!==null&&userSelf.degree!==undefined&&userSelf.degree!==''"><span>{{$t('public.no5')}}:</span> <span>{{$t($store.getters.education(userSelf.degree))}}</span> </p>
              <p v-else><span>{{$t('public.no5')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
          </div> 
          <div class="xuan-2-2-1">
            <template>
              <p v-if="userSelf.liveTime!==null&&userSelf.liveTime!==undefined&&userSelf.liveTime!==''"><span>{{$t('public.no8')}}:</span> <span>{{$t($store.getters.liveTime(userSelf.liveTime))}}</span> </p>
              <p v-else><span>{{$t('public.no8')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
            <template>
              <p v-if="data.birthday!==null&&data.birthday!==undefined&&data.birthday!==''"><span>{{$t('public.birthday')}}:</span> <span>{{data.birthday}}</span> </p>
              <p v-else><span>{{$t('public.birthday')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
          </div> 
          <div class="xuan-2-2-1" style="width:100%">
            <template>
              <p v-if="userSelf.liveProvinceName!==null&&userSelf.liveProvinceName!==undefined&&userSelf.liveProvinceName!==''"><span>{{$t('public.no6')}}:</span>
                <span>{{userSelf.liveProvinceName}}</span>
                <span v-if="userSelf.liveCityName!==null&&userSelf.liveCityName!==undefined&&userSelf.liveCityName!==''">{{userSelf.liveCityName}}</span>
                <!-- <span v-if="userSelf.liveRegionId!==null&&userSelf.liveRegionId!==undefined&&userSelf.liveRegionId!==''">{{userSelf.liveRegionId}}</span> -->
              </p>
              <p v-else><span>{{$t('public.no6')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
          </div> 
          <div class="xuan-2-2-1" style="width:100%">
            <template>
              <p v-if="userSelf.liveAddress!==null&&userSelf.liveAddress!==undefined&&userSelf.liveAddress!==''"><span>{{$t('public.no7')}}:</span> <span>{{userSelf.liveAddress}}</span>  </p>
              <p v-else><span>{{$t('public.no7')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
            </template>
          </div>
          
        </li>
        <li class="xuan-2-3" v-if="active==3">
          <div class="xuan-2-3-1">
            <div class="xuan-2-3-1-1">
              <template>
                <p v-if="userWork.company!==null&&userWork.company!==undefined&&userWork.company!==''"><span>{{$t('public.no9')}}:</span> <span>{{userWork.company}}</span> </p>
                <p v-else><span>{{$t('public.no9')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="userWork.strEntryTime!==null&&userWork.strEntryTime!==undefined&&userWork.strEntryTime!==''"><span>{{$t('public.no10')}}:</span> <span>{{userWork.strEntryTime}}</span> </p>
                <p v-else><span>{{$t('public.no10')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="userWork.monthIncome!==null&&userWork.monthIncome!==undefined&&userWork.monthIncome!==''"><span>{{$t('public.no13')}}:</span> <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(userWork.monthIncome)}}{{$store.state.common.vi_currency}}</span> </p>
                <p v-else><span>{{$t('public.no13')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
            </div>
            <div class="xuan-2-3-1-1">
               <template>
                <p v-if="userWork.title!==null&&userWork.title!==undefined&&userWork.title!==''"><span>{{$t('public.no11')}}:</span> <span>{{userWork.title}}</span> </p>
                <p v-else><span>{{$t('public.no11')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="userWork.companyPhone!==null&&userWork.companyPhone!==undefined&&userWork.companyPhone!==''"><span>{{$t('public.no12')}}:</span> <span>{{userWork.companyPhone}}</span> </p>
                <p v-else><span>{{$t('public.no12')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
            </div>
            <div class="xuan-2-3-1-1">
              <template>
                <p style="width:100%" v-if="userWork.companyProvinceName!==null&&userWork.companyProvinceName!==undefined&&userWork.companyProvinceName!==''"><span>{{$t('public.no14')}}:</span> 
                  <span>{{userWork.companyProvinceName}}</span>-
                  <span v-if="userWork.companyCityName!==null&&userWork.companyCityName!==undefined&&userWork.companyCityName!==''">{{userWork.companyCityName}}</span>
                  <!-- <span v-if="userWork.companyRegionName!==null&&userWork.companyRegionName!==undefined&&userWork.companyRegionName!==''">{{userWork.companyRegionName}}</span> -->
                </p>
                <p v-else><span>{{$t('public.no14')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
            </div>
            <div class="xuan-2-3-1-1">
              <template>
                <p style="width:100%" v-if="userWork.companyAddress!==null&&userWork.companyAddress!==undefined&&userWork.companyAddress!==''"><span>{{$t('public.no15')}}:</span> <span>{{userWork.companyAddress}}</span>  </p>
                <p v-else><span>{{$t('public.no15')}}:</span> <span> {{$store.state.common.nullData}} </span> </p>
              </template>
            </div>
          </div>
          <div class="xuan-2-3-2">
            <template>
              <div v-if="userWork.incomePicUrl!==null&&userWork.incomePicUrl!==undefined&&userWork.incomePicUrl!==''" class="gongziimg pic" @click="openBox({imgUrl:userWork.incomePicUrl})">
                <img :src="userWork.incomePicUrl" :alt="$t('pic.no3')" :title="$t('pic.no3')">
              </div>
              <div v-else class="gongziimg pic" >
                <img src="../../../assets/img/null.png" :title="$t('pic.no3')">
              </div>
            </template>
          </div>
        </li>
        <li class="xuan-2-4" v-if="active==4">
          <div class="xuan-2-4-1">
            <p class="xuan-2-4-1-1"><span></span>{{$t('public.no16')}}1</p>
            <div class="xuan-2-4-1-2">
              <template>
                <p v-if="userUrgentContact.contactOneRelationName!==null&&userUrgentContact.contactOneRelationName!==undefined&&userUrgentContact.contactOneRelationName!==''">{{$t('public.no17')}}: <span>{{userUrgentContact.contactOneRelationName}}</span> </p>
                <p v-else>{{$t('public.no17')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="userUrgentContact.contactOneName!==null&&userUrgentContact.contactOneName!==undefined&&userUrgentContact.contactOneName!==''">{{$t('public.name')}}: <span>{{userUrgentContact.contactOneName}}</span> </p>
                <p v-else>{{$t('public.name')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="userUrgentContact.contactOnePhone!==null&&userUrgentContact.contactOnePhone!==undefined&&userUrgentContact.contactOnePhone!==''">{{$t('public.no18')}}: <span>{{userUrgentContact.contactOnePhone}}</span> </p>
                <p v-else>{{$t('public.no18')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
            </div>
          </div>
          <div class="xuan-2-4-1">
            <p class="xuan-2-4-1-1"><span></span>{{$t('public.no16')}}2</p>
            <div class="xuan-2-4-1-2">
              <template>
                <p v-if="userUrgentContact.contactTwoRelationName!==null&&userUrgentContact.contactTwoRelationName!==undefined&&userUrgentContact.contactTwoRelationName!==''">{{$t('public.no17')}}: <span>{{userUrgentContact.contactTwoRelationName}}</span> </p>
                <p v-else>{{$t('public.no17')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="userUrgentContact.contactTwoName!==null&&userUrgentContact.contactTwoName!==undefined&&userUrgentContact.contactTwoName!==''">{{$t('public.name')}}: <span>{{userUrgentContact.contactTwoName}}</span> </p>
                <p v-else>{{$t('public.name')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="userUrgentContact.contactTwoPhone!==null&&userUrgentContact.contactTwoPhone!==undefined&&userUrgentContact.contactTwoPhone!==''">{{$t('public.no18')}}: <span>{{userUrgentContact.contactTwoPhone}}</span> </p>
                <p v-else>{{$t('public.no18')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
            </div>
          </div>
          <div class="xuan-2-4-1">
            <p class="xuan-2-4-1-1"><span></span>{{$t('public.no16')}}3</p>
            <div class="xuan-2-4-1-2">
              <template>
                <p v-if="userUrgentContact.contactThreeRelationName!==null&&userUrgentContact.contactThreeRelationName!==undefined&&userUrgentContact.contactThreeRelationName!==''">{{$t('public.no17')}}: <span>{{userUrgentContact.contactThreeRelationName}}</span> </p>
                <p v-else>{{$t('public.no17')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="userUrgentContact.contactThreeName!==null&&userUrgentContact.contactThreeName!==undefined&&userUrgentContact.contactThreeName!==''">{{$t('public.name')}}: <span>{{userUrgentContact.contactThreeName}}</span> </p>
                <p v-else>{{$t('public.name')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
              <template>
                <p v-if="userUrgentContact.contactThreePhone!==null&&userUrgentContact.contactThreePhone!==undefined&&userUrgentContact.contactThreePhone!==''">{{$t('public.no18')}}: <span>{{userUrgentContact.contactThreePhone}}</span> </p>
                <p v-else>{{$t('public.no18')}}: <span> {{$store.state.common.nullData}} </span> </p>
              </template>
            </div>
          </div>
        </li>
        <li class="xuan-2-5" v-if="active==5">
          <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
            <tr>
              <th>{{$t('public.no19')}}</th>
              <th>{{$t('public.no20')}}</th>
              <th>{{$t('public.no21')}}</th>
              <th>{{$t('public.no22')}}</th>
            </tr>
            <template v-if="userBank!==null&&userBank!==undefined&&userBank!==''">
              <tr>
                <template>
                  <td v-if="userBank.bankName!==null&&userBank.bankName!==undefined&&userBank.bankName!==''">{{userBank.bankName}}</td>
                  <td v-else>{{$store.state.common.nullData}}</td>
                </template>
                <template>
                  <td v-if="userBank.bankAccount!==null&&userBank.bankAccount!==undefined&&userBank.bankAccount!==''">{{userBank.bankAccount}}</td>
                  <td v-else>{{$store.state.common.nullData}}</td>
                </template>
                <template>
                  <td v-if="userBank.strCreateTime!==null&&userBank.strCreateTime!==undefined&&userBank.strCreateTime!==''">{{userBank.strCreateTime}}</td>
                  <td v-else>{{$store.state.common.nullData}}</td>
                </template>
                <template>
                  <td v-if="userBank.status!==null&&userBank.status!==undefined&&userBank.status!==''">{{$t($store.getters.bankIdStatus(userBank.status))}}</td>
                  <td v-else>{{$store.state.common.nullData}}</td>
                </template>
              </tr>
            </template>
            <template v-else>
              <div style="textAlign:center;width:400%;height:40px;lineHeight:40px">
                {{$t('public.no23')}}
              </div>
            </template>
          </table>
          <div class="imgbox">
            <div v-if="userBank.bankPicUrl!==null&&userBank.bankPicUrl!==undefined&&userBank.bankPicUrl!==''" class="idimg pic" @click="openBox({imgUrl:userBank.bankPicUrl})">
              <img :src="userBank.bankPicUrl" :alt="$t('pic.no7')" :title="$t('pic.no7')">
            </div>
            <div v-else class="idimg pic" >
              <img src="../../../assets/img/null.png">
            </div>
          </div>
        </li>
        <li class="xuan-2-6" v-if="active==6">
          <template>
            <el-table :data="tableData" stripe style="width: 100%" max-height=530>
              <el-table-column align="center" prop="orderNo" :label="$t('public.orderNo')" width="80">
              </el-table-column>
              <el-table-column align="center" prop="id" :label="$t('public.orderId')" width="80">
              </el-table-column>
              <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" min-width="140">
              </el-table-column>
              <el-table-column align="center" prop="loanAmount" :label="$t('public.no24')"  min-width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
                  <span v-else>{{$store.state.common.nullData}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="productPeriod" :label="$t('public.no25')+'('+$t('public.no26')+')'" min-width="80">
              </el-table-column>
              <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')" min-width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
                  <span v-else>{{$store.state.common.nullData}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.backMoneyDate')" min-width="140">
              </el-table-column>
              <el-table-column align="center" prop="isOverdue" :label="$t('public.isOverdue')" min-width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.isOverdue!==null&&scope.row.isOverdue!==undefined&&scope.row.isOverdue!==''">{{$t($store.getters.overdueState(scope.row.isOverdue))}}</span>
                  <span v-else>{{$store.state.common.nullData}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" min-width="80">
              </el-table-column>
              <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" min-width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
                  <span v-else>{{$store.state.common.nullData}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="180">
                <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_HIS_DETAIL')">
                  <span style="color:#547ef6;cursor:pointer;margin:0 5px;" @click="selLoan(scope.row.orderNo)">{{$t('public.no29')}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </li>
        <li class="xuan-2-6" v-if="active==7">
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

import appLightbox from '../../../components/component/lightbox'// 图片点击放大组件
import couponList from '../../../components/component/coupon'// 优惠券列表

export default {
  name: 'userManage',
  components: {
    appLightbox,
    couponList
  },
  data () {
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
      lightBoxToggle: false// 图片放大显示层开关
    }
  },
  computed: {// 选项卡国际化
    arr1 () {
      let arr = []
      if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_IDENTITY')) {
        arr.push({id: 1, title: this.$t('tab.no1')})
      }
      if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_PERSONAL')) {
        arr.push({id: 2, title: this.$t('tab.no2')})
      }
      if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_JOB')) {
        arr.push({id: 3, title: this.$t('tab.no3')})
      }
      if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_LINK')) {
        arr.push({id: 4, title: this.$t('tab.no4')})
      }
      if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_BANK')) {
        arr.push({id: 5, title: this.$t('tab.no5')})
      }
      if (this.$store.state.common.permiss.includes('RIGHT_USER_LIST_HIS')) {
        arr.push({id: 6, title: this.$t('tab.no6')})
      }
      arr.push({id: 7, title: this.$t('tab.no7')})
      return arr
    }
  },
  methods: {
    detail () { // 获取用户详细数据列表
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
    selLoan (orderNo) { // 借款查询
      this.$router.push({path: '/loanmoneydetail?', query: {orderNo, userId: this.userId}})
    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1)
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.userId = this.$route.query.userId
    this.detail()
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
  height: 100%;
  padding: 20px 30px;
  background-color: rgba(246, 249, 252, 1);
  position: relative;
}
.detail{
  width: 100%;
  height: 200px;
  background-color: #fff;
  display: flex;
  margin-bottom: 30px;
  .left{
    width: 30px;
    height: 100%;
    position: relative;
    @include flex-cen;
    .headPortrait{
      width: 116px;
      height: 116px;
      margin: 0 30px;
      border-radius: 50%;
      overflow: hidden;
    }
    .sex{
        width: 22px;
        height: 22px;
        position: absolute;
        bottom: 46px;
        right: 36px;
        background-color: #fff;
        border-radius: 50%;
      }
  }
  .right{
    width: calc(100vw - 176px);
    height: 100%;
    display: flex;
    .ul-one{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-content: space-between;
      flex-wrap: wrap;
      padding: 65px 0;
      li{
        width: 25%;
        display: flex;
        align-items: center;
        span:nth-child(1){
          font-size: 16px;
          color: $color1;
          margin: 0 12px;
          white-space: nowrap;
        }
        span:nth-child(2){
          font-size: 16px;
          color: $color2;
          margin: 0 12px;
        }
      }
    }
    .ul-two{
      width: 50%;
      height: 100%;
      padding-right: 40px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      li{
        width: 80px;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        .logo{
          width: 35px;
          height: 31px;
          margin: 0 auto;
        }
        .miaoshu{
          width: 100%;
          text-align: center;
          font-size: 16px;
          padding: 8px 0;
        }
      }
    }
  }
}

.xuanxiangka{
  width: 100%;
  height: auto;
  background-color: #fff;
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
          width: 33%;
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
    }
    .xuan-2-3{
      display: flex;
      .xuan-2-3-1{
        width: 80%;
        .xuan-2-3-1-1{
          margin-bottom: 26px;
          display: flex;
          // justify-content: space-between;
          p{
            line-height: 24px;
            width: 32%;
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
      }
      .xuan-2-3-2{
        width: 20%;
        @include flex-cen;
        .gongziimg{
          width: 95%;
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
            // width: 25%;
            height: 40px;
            text-align: center;
            border: 1px solid #ddd;
            word-break: break-all;
          }
          th{
            // width: 25%;
            height: 40px;
            text-align: center;
            background-color: #1D7BFF;
            color: #fff;
          }
        }
        
      }
    }
  }
  
}

.bigimg{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
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
.imgbox{
    width: 200px;
    height: auto;
    margin: 20px 0;
    .idimg{
      width: 200px;
      height: auto;
    }
  }
</style>
