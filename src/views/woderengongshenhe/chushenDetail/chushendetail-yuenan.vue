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

    <div class="tabs">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr3" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <!-- -------------用户详情------------------------ -->
        <li  v-if="active2==1">
          <div class="oneLineHasFour">
            <p><span>{{$t('new.no48')}}:</span> <span>{{data.userBase.appName | dataIsTrue}}</span> </p>
            <p><span>{{$t('new.no49')}}:</span> <span>{{data.userBase.appPackage | dataIsTrue}}</span> </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.no1')}}:</span><span>{{data.userBase.name | dataIsTrue}}</span></p>
            <p><span>{{$t('public.userTel')}}:</span><span>{{data.userBase.phone | dataIsTrue}}</span></p>
            <p><span>{{$t('yuenan.no23')}}:</span><span>{{$store.getters.vn_phone(data.userBase.phone)}}</span></p>
            <p><span>{{$t('public.sex')}}:</span><span>{{$t($store.getters.sexStatus(data.userSelf.sex))}}</span></p>
          </div>
          <div class="oneLineHasFour">
            <p ><span>{{$t('public.no3')}}: </span>
                <span>{{$t($store.getters.marriage(data.userSelf.marriage))}}</span>
              </p>
              <p><span>{{$t('public.no5')}}: </span>
                <span>{{$t($store.getters.vi_education(data.userSelf.degree))}}</span>
              </p>
              <p >
                <span>{{$t('public.birthday')}}:</span>
                <span>{{data.userSelf.birthday | dataIsTrue}}</span>
              </p>
              <p >
                <span>{{$t('new.no56')}}:</span>
                <span>{{$store.getters.getAge(data.userSelf.birthday)}}</span>
              </p>
          </div>
          <div class="oneLineHasOne">
            <p>
              <span>faceBook:</span> 
              <span @click="openWindow(data.userFaceBook.fblink)" class="td-ul">{{data.userFaceBook.fblink | dataIsTrue}}</span>
            </p>
          </div>
          <!-- <div class="oneLineHasOne">
            <p>
              <span>faceBook2:</span>
              <span>{{$t($store.getters.loanTypeState(data.order.orderLoanType))}}</span>
            </p>
          </div> -->
        </li>
        <!-- ------------ 借款详情 ------------------------ -->
        <li  v-if="active2==2">
          <div class="oneLineHasFour">
            <p><span>{{$t('new.no48')}}:</span> <span>{{data.orderExtra.appName | dataIsTrue}}</span> </p>
            <p style="width:50%;"><span>{{$t('new.no49')}}:</span> <span>{{data.orderExtra.appPackage | dataIsTrue}}</span> </p>
          </div>
          <div class="oneLineHasFour">
            <p>
              <span>{{$t('operationDetail.no2')}}:</span>
              <span>{{data.order.id | dataIsTrue}}</span>
            </p>
            <p>
              <span>{{$t('public.no30')}}:</span> 
              <span>{{$store.state.common.id_currency+$store.getters.moneySplit(data.order.loanAmount)+$store.state.common.vi_currency}}</span>
            </p>
            <p><span>{{$t('public.no31')}}:</span> 
              <span>{{data.order.productPeriod | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.CreateDate')}}:</span> 
              <span>{{data.order.strCreateTime | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('proManage.feeRate')}}:</span>
              <span>{{$store.getters.twoPoint(data.order.feeRate)}}%</span>
            </p>
            <p><span>{{$t('loanMoneyDetail.feeAmount')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.feeAmount)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p><span>{{$t('operationDetail.no3')}}:</span>
              <span>{{$store.getters.twoPoint(data.order.dayInterestRate)}}%</span>
            </p>
            <p><span>{{$t('loanMoneyDetail.currentInterest')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.order.currentInterest)}}{{$store.state.common.vi_currency}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.no27')}}:</span>
              <span>
                {{$store.state.common.id_currency}}
                {{$store.getters.moneySplit(data.order.returnMoney)}}
                {{$store.state.common.vi_currency}}
              </span>
            </p>
          </div>
        </li>
        <!-- ------------ 优惠券详情 ------------------------ -->
        <li v-if="active==3">
          <coupon-list :user-id="userId"></coupon-list>
        </li>
      </ul>
    </div>

    <template v-if="data.order.orderLoanType!==1">
      <div class="paixu mt15" >
        <span></span>
        <p>{{$t('websiteLoans.no9')}}</p>
      </div>
      <div class="loansTypeImg">
        <template >
          <div v-if="data.webInfo.onePicUrlStr" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.webInfo.onePicUrlStr})">
            <img :src="data.webInfo.onePicUrlStr" :alt="$t('websiteLoans.no9')">
          </div>
          <div v-if="data.webInfo.twoPicUrlStr" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.webInfo.twoPicUrlStr})">
            <img :src="data.webInfo.twoPicUrlStr" :alt="$t('websiteLoans.no9')">
          </div>
          <div v-if="data.webInfo.threePicUrlStr" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.webInfo.threePicUrlStr})">
            <img :src="data.webInfo.threePicUrlStr" :alt="$t('websiteLoans.no9')">
          </div>
        </template>
      </div>
    </template>
    
    
    <!-------------------------- 选项卡 -------------------->
    <div class="xuanxiangka">
      <ul class="xuan-1">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active==value.id}" @click="active=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="xuan-2">
        <!------------------------ 历史借款记录信息 ---------------------------->
        <li class="xuan-2-4" v-if="active==4">
          <div class="paixu">
            <span></span><p>{{$t('yuenan.no14')}}</p>
          </div>
          <loan-list :order-no="orderNo" :tag-list="data.userOrderCount" :user-id="userId" :table-data="data.orderList"></loan-list>
          <div class="paixu">
            <span></span><p>{{$t('yuenan.no13')}}</p>
          </div>
          <table class="bank-table" width="100%" border="1" cellspacing="0" >
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
            <template v-if="tableData!==''">
              <tr>
                <td>{{tableData.valueList[0]}}</td>
                <td>{{tableData.valueList[2]}}</td>
                <td>{{tableData.valueList[4]}}</td>
                <td>{{tableData.valueList[5]}}</td>
                <td>{{tableData.valueList[6]}}</td>
                <td>{{tableData.valueList[14]}}</td>
                <td>{{tableData.valueList[12]}}</td>
                <td>{{tableData.valueList[13]}}</td>
                <td>{{tableData.valueList[8]}}</td>
              </tr>
            </template>
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
            <template v-if="data.userIdcard.identityCheckResult!==null&&data.userIdcard.identityCheckResult!==undefined">
              <el-tooltip class="item" effect="dark" :content="data.userIdcard.identityCheckResult==1?$t('auditDetail.no3'):$t('auditDetail.no4')" placement="right">
                <div class="tooltip pic">
                  <img v-if="data.userIdcard.identityCheckResult==1" src="../../../assets/img/lv.png" alt="">
                  <img v-else src="../../../assets/img/hong.png" alt="">
                </div>
              </el-tooltip>
            </template>
            <p v-if="data.order.status==20&&block==2" @click="telFlag=true" class="cp">{{$t('auditDetail.no42')}}</p>
            
          </div>
          <div class="xuan-2-1-1">
            <div class="xuan-2-1-1-2">
              <div class="xuan-2-1-1-22 xuan-2-1-1-50">
                  <p>
                    <span>{{$t('public.no1')}}:</span> <span>{{data.userBase.name | dataIsTrue}}</span> 
                  </p>
                  <p><span>{{$t('public.no2')}}:</span> <span>{{data.order.idCard | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-1-22 xuan-2-1-1-50">
                  <p>
                    <span>{{$t('yuenan.no1')}}:</span> <span>{{data.userSelf.strIdCardAwardTime | dataIsTrue}}</span> 
                  </p>
                  <p><span>{{$t('public.birthday')}}:</span> <span>{{data.userBase.birthday | dataIsTrue}}</span> </p>
              </div>
              <div class="xuan-2-1-1-22 xuan-2-1-1-50">
                  <p><span>{{$t('yuenan.no2')}}:</span> 
                    <span>{{data.userSelf.liveProvinceName | dataIsTrue}}</span>
                  </p>
                  <p><span>{{$t('yuenan.no3')}}:</span> 
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
            </div>
            <div class="xuan-2-1-1-3">
              <div class="idimgbox">
                <template >
                  
                  <div v-if="data.userIdcard.idcardPhotoUrl" class="idimg pic" @click="openBox({imgUrl:data.userIdcard.idcardPhotoUrl})">
                    <img :src="data.userIdcard.idcardPhotoUrl" :alt="$t('pic.no1')" :title="$t('pic.no1')">
                    <template v-if="block==2">
                      <template v-if="data.userIdcard.idcardReturn!==null&&data.userIdcard.idcardReturn!==undefined&&data.userIdcard.idcardReturn=='-1'">
                        <el-tooltip class="item" effect="dark" 
                        :content="$t('new.no38')+':'+data.userIdcard.idcardReturnCount+';'+$t('new.no11')+':'+data.userIdcard.idcardReturnReasonDesc" 
                        placement="right">
                          <p >
                            {{$t('new.no37')}}
                          </p>
                        </el-tooltip>
                      </template>
                      <p v-else @click.stop="backFlag1=true" class="back-p" style="cursor:pointer">{{$t('new.no39')}}</p>
                    </template>
                    
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
                    <template v-if="block==2">
                      <template v-if="data.userIdcard.idcardReverseReturn!==null&&data.userIdcard.idcardReverseReturn!==undefined&&data.userIdcard.idcardReverseReturn=='-1'">
                        <el-tooltip class="item" effect="dark" 
                        :content="$t('new.no38')+':'+data.userIdcard.idcardReverseReturnCount+';'+$t('new.no11')+':'+data.userIdcard.idcardReverseReturnReasonDesc" 
                        placement="right">
                          <p >
                            {{$t('new.no37')}}
                          </p>
                        </el-tooltip>
                      </template>
                      <p v-else @click.stop="backFlag2=true" class="back-p" style="cursor:pointer">{{$t('new.no40')}}</p>
                    </template>
                     
                  </div>
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png" :title="$t('pic.no4')">
                  </div>
                </template>
              </div>
              <div class="idimgbox">
                <template>
                  <div v-if="data.userIdcard.idcardFairPhotoUrl" class="idimg pic" @click="openBox({imgUrl:data.userIdcard.idcardFairPhotoUrl})">
                    <img :src="data.userIdcard.idcardFairPhotoUrl" :alt="$t('pic.no5')" :title="$t('pic.no5')">
                    <template v-if="block==2">
                      <template v-if="data.userIdcard.idcardFairReturn!==null&&data.userIdcard.idcardFairReturn!==undefined&&data.userIdcard.idcardFairReturn=='-1'">
                        <el-tooltip class="item" effect="dark" 
                        :content="$t('new.no38')+':'+data.userIdcard.idcardFairReturnCount+';'+$t('new.no11')+':'+data.userIdcard.idcardFairReturnReasonDesc" 
                        placement="right">
                          <p >
                            {{$t('new.no37')}}
                          </p>
                        </el-tooltip>
                      </template>
                      <p v-else @click.stop="backFlag3=true" class="back-p" style="cursor:pointer">{{$t('new.no41')}}</p>
                    </template>
                     
                  </div>
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png" :title="$t('pic.no5')">
                  </div>
                </template>
              </div>
              <div class="idimgbox">
                <template>
                  <div v-if="data.userIdcard.idcardFairPhotoReverseUrl" class="idimg pic" @click="openBox({imgUrl:data.userIdcard.idcardFairPhotoReverseUrl})">
                    <img :src="data.userIdcard.idcardFairPhotoReverseUrl" :alt="$t('pic.no6')" :title="$t('pic.no6')">
                    <template v-if="block==2">
                      <template v-if="data.userIdcard.idcardFairReverseReturn!==null&&data.userIdcard.idcardFairReverseReturn!==undefined&&data.userIdcard.idcardFairReverseReturn=='-1'">
                        <el-tooltip class="item" effect="dark" 
                        :content="$t('new.no38')+':'+data.userIdcard.idcardFairReverseReturnCount+';'+$t('new.no11')+':'+data.userIdcard.idcardFairReverseReturnReasonDesc" 
                        placement="right">
                          <p >
                            {{$t('new.no37')}}
                          </p>
                        </el-tooltip>
                      </template>
                      <p v-else @click.stop="backFlag4=true" class="back-p" style="cursor:pointer">{{$t('new.no42')}}</p>
                    </template>
                    
                  </div>
                  <div v-else class="idimg pic" >
                    <img src="../../../assets/img/null.png" :title="$t('pic.no6')">
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
            <template v-if="data.userWork.companyCheckResult">
              <el-tooltip class="item" effect="dark" :content="data.userWork.companyCheckResult==1?$t('auditDetail.no6'):$t('auditDetail.no7')" placement="right">
                <div class="tooltip pic">
                  <img v-if="data.userWork.companyCheckResult==1" src="../../../assets/img/lv.png" alt="">
                  <img v-else src="../../../assets/img/hong.png" alt="">
                </div>
              </el-tooltip>
            </template>
            <p v-if="data.order.status==20&&block==2" @click="telFlag1=true" style="cursor:pointer">{{$t('auditDetail.no42')}}</p>
            <template v-if="block==2">
              <!-- <template v-if="data.userWork.incomeReturn!==null&&data.userWork.incomeReturn!==undefined&&data.userWork.incomeReturn=='-1'">
                <el-tooltip class="item" effect="dark" 
                :content="$t('new.no38')+':'+data.userWork.incomeReturnCount+';'+$t('new.no11')+':'+data.userWork.incomeReturnReasonDesc" 
                placement="right">
                  <p >
                    {{$t('new.no37')}}
                  </p>
                </el-tooltip>
              </template> -->
              <!-- <p v-else @click="backFlag5=true"  style="cursor:pointer">{{$t('new.no10')}}</p> -->
            </template>
            
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
        <!------------------------ 通话记录信息 ---------------------------->
        <li class="xuan-2-2" v-if="active==2">
          <tel-record-list :detail="telDetail" :order-no="orderNo" :user-id="userId" :order-id="orderId" :type="1"></tel-record-list>
        </li>
        <!------------------------ 短信记录信息 ---------------------------->
        <li class="xuan-2-3" v-if="active==3">
          <note-record-list :order-no="orderNo" :user-id="userId" ></note-record-list>
        </li>
        
        <!------------------------ 联系人记录信息 ---------------------------->
        <li class="xuan-2-1" v-if="active==5">
          <!-- 第三行 -->
          <div class="paixu">
            <span></span><p>{{$t('public.no16')}}</p>
            <template v-if="this.$store.state.common.permiss.includes('RIGHT_ORDER_URGRNT_CONTACT_OTHER_ADD')">
              <p v-if="block==2&&data.userUrgentContact.otherTwoName===''" class="add" @click="addContentFlag">+</p>              
            </template>
          </div>
          <div class="xuan-2-1-2">
            <div class="xuan-2-1-2-1">
              <p>{{$t('public.no16')}}1 </p>
              <p>{{$t('public.no17')}}: <span>{{data.userUrgentContact.contactOneRelationName | dataIsTrue}}</span> </p>
              <p>{{$t('public.name')}}: <span>{{data.userUrgentContact.contactOneName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userUrgentContact.contactOnePhone | dataIsTrue}}</span> </p>
              <template v-if="data.contactOne!==null&&data.contactOne!==undefined&&data.contactOne!==0">
                <div class="tooltip pic">
                  <img src="../../../assets/img/lv.png" alt="">
                </div>
              </template>
              <template v-else>
                  <div class="tooltip pic">
                    <img src="../../../assets/img/hong.png" alt="">
                  </div>
              </template>
              <p v-if="data.order.status==20&&block==2" style="margin-left:20px;cursor:pointer;color:#1D7BFF"  @click="telFlag2=true">{{$t('auditDetail.no42')}}</p>
              <p style="margin-left:20px">{{$t('auditDetail.no8')+data.contactOne+$t('auditDetail.no9')}}</p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userUrgentContact.contactTwoRelationName!==null&&data.userUrgentContact.contactTwoRelationName!==undefined&&data.userUrgentContact.contactTwoRelationName!==''">
              <p>{{$t('public.no16')}}2 </p>
              <p>{{$t('public.no17')}}: <span>{{data.userUrgentContact.contactTwoRelationName | dataIsTrue}}</span> </p>
              <p>{{$t('public.name')}}: <span>{{data.userUrgentContact.contactTwoName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userUrgentContact.contactTwoPhone | dataIsTrue}}</span> </p>
              <template v-if="data.contactTwo!==null&&data.contactTwo!==undefined&&data.contactTwo!==0">
                  <div class="tooltip pic">
                    <img src="../../../assets/img/lv.png" alt="">
                  </div>
              </template>
              <template v-else>
                  <div class="tooltip pic">
                    <img src="../../../assets/img/hong.png" alt="">
                  </div>
              </template>
              <p style="margin-left:20px;cursor:pointer;color:#1D7BFF" v-if="data.order.status==20&&block==2" @click="telFlag3=true">{{$t('auditDetail.no42')}}</p>
              <p style="margin-left:20px">{{$t('auditDetail.no8')+data.contactTwo+$t('auditDetail.no9')}}</p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userUrgentContact.contactThreeRelationName!==null&&data.userUrgentContact.contactThreeRelationName!==undefined&&data.userUrgentContact.contactThreeRelationName!==''">
              <p>{{$t('public.no16')}}3 </p>
              <p>{{$t('public.no17')}}: <span>{{data.userUrgentContact.contactThreeRelationName | dataIsTrue}}</span> </p>
              <p>{{$t('public.name')}}: <span>{{data.userUrgentContact.contactThreeName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userUrgentContact.contactThreePhone | dataIsTrue}}</span> </p>
              <template v-if="data.contactThree!==null&&data.contactThree!==undefined&&data.contactThree!==0">
                  <div class="tooltip pic">
                    <img src="../../../assets/img/lv.png" alt="">
                  </div>
              </template>
              <template v-else>
                  <div class="tooltip pic">
                    <img src="../../../assets/img/hong.png" alt="">
                  </div>
              </template>
              <p style="margin-left:20px;cursor:pointer;color:#1D7BFF" v-if="data.order.status==20&&block==2" @click="telFlag4=true">{{$t('auditDetail.no42')}}</p>
              <p style="margin-left:20px">{{$t('auditDetail.no8')+data.contactThree+$t('auditDetail.no9')}}</p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userUrgentContact.otherOneName!==''">
              <p>{{$t('public.no16')}}4 </p>
              <p>{{$t('public.no17')}}: <span>{{data.userUrgentContact.otherOneRelationName | dataIsTrue}}</span> </p>
              <p>{{$t('public.name')}}: <span>{{data.userUrgentContact.otherOneName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userUrgentContact.otherOnePhone | dataIsTrue}}</span> </p>
              <template v-if="data.contactOtherOne!==null&&data.contactOtherOne!==undefined&&data.contactOtherOne!==0">
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
              <p>{{$t('public.no17')}}: <span>{{data.userUrgentContact.otherTwoRelationName | dataIsTrue}}</span> </p>
              <p>{{$t('public.name')}}: <span>{{data.userUrgentContact.otherTwoName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userUrgentContact.otherTwoPhone | dataIsTrue}}</span> </p>
              <template v-if="data.contactOtherTwo!==null&&data.contactOtherTwo!==undefined&&data.contactOtherTwo!==0">
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
          <div class="paixu">
            <span></span><p>{{'FaceBook'+$t('yuenan.no35')}}</p>
          </div>
          <div class="xuan-2-1-2">
            <div class="xuan-2-1-2-1" v-if="data.userFaceBook.friendOneFblink">
              <p>{{$t('yuenan.no34')}}: <span>{{data.userFaceBook.friendOneName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userFaceBook.friendOnePhone | dataIsTrue}}</span> </p>
              <p>{{$t('yuenan.no33')}}: <span @click="openWindow(data.userFaceBook.friendOneFblink)" class="td-ul">{{data.userFaceBook.friendOneFblink | dataIsTrue}}</span> </p>
            </div>
            <div v-else class="xuan-2-1-2-1">
              <p>{{$t('public.no23')}}</p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userFaceBook.friendTwoFblink">
              <p>{{$t('yuenan.no34')}}: <span>{{data.userFaceBook.friendTwoName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userFaceBook.friendTwoPhone | dataIsTrue}}</span> </p>
              <p>{{$t('yuenan.no33')}}: <span @click="openWindow(data.userFaceBook.friendTwoFblink)" class="td-ul">{{data.userFaceBook.friendTwoFblink | dataIsTrue}}</span> </p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userFaceBook.friendThreeFblink">
              <p>{{$t('yuenan.no34')}}: <span>{{data.userFaceBook.friendThreeName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userFaceBook.friendThreePhone | dataIsTrue}}</span> </p>
              <p>{{$t('yuenan.no33')}}: <span @click="openWindow(data.userFaceBook.friendThreeFblink)" class="td-ul">{{data.userFaceBook.friendThreeFblink | dataIsTrue}}</span> </p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userFaceBook.friendFourFblink">
              <p>{{$t('yuenan.no34')}}: <span>{{data.userFaceBook.friendFourName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userFaceBook.friendFourPhone | dataIsTrue}}</span> </p>
              <p>{{$t('yuenan.no33')}}: <span @click="openWindow(data.userFaceBook.friendFourFblink)" class="td-ul">{{data.userFaceBook.friendFourFblink | dataIsTrue}}</span> </p>
            </div>
            <div class="xuan-2-1-2-1" v-if="data.userFaceBook.friendFiveFblink">
              <p>{{$t('yuenan.no34')}}: <span>{{data.userFaceBook.friendFiveName | dataIsTrue}}</span> </p>
              <p>{{$t('public.no18')}}: <span>{{data.userFaceBook.friendFivePhone | dataIsTrue}}</span> </p>
              <p>{{$t('yuenan.no33')}}: <span @click="openWindow(data.userFaceBook.friendFiveFblink)" class="td-ul">{{data.userFaceBook.friendFiveFblink | dataIsTrue}}</span> </p>
            </div>
          </div>
        </li>
        <!------------------------ 账户记录信息 ---------------------------->
        <li class="xuan-2-1" v-if="active==6">
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
        <li class="xuan-2-6" v-if="active==7">
          <h1>敬请期待</h1>
        </li>
      </ul>
    </div>


    <div class="foot" style="height:40px"></div>


    <!------------------------ 跟踪记录结果展示开始 ---------------------------->
    <div class="paixu">
      <span></span><p>{{$t('auditDetail.no66')}}</p>
    </div>
    <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
        <tr>
          <th width="25%">{{$t('auditDetail.no67')}}</th>
          <th width="75%">{{$t('auditDetail.no68')}}</th>
        </tr>
        <template v-if="followReason!==null&&followReason!==undefined&&followReason!=''">
          <tr v-for="(item,index) in followReason" :key="index">
            <td>{{item.strCreateTime | dataIsTrue}}</td>
            <td>{{item.remark | dataIsTrue}}</td>
          </tr>
        </template>
        <template v-else>
          <div style="textAlign:center;width:400%;height:40px;lineHeight:40px">
            {{$t('public.no23')}}
          </div>
        </template>
      </table>
    <!------------------------ 跟踪记录结果展示结束 ---------------------------->

    <div class="foot" style="height:40px"></div>

    <!------------------------ 人工初审开始 ---------------------------->
    
    
    <template>
      <div v-if="peopleOne_audit!==null&&peopleOne_audit!==undefined&&peopleOne_audit!=''" class="chushenjilu">
        <el-row>
          <el-col :span="24">
            <div class="paixu pai-active">
              <span></span><p>{{$t('auditDetail.no12')}}</p>
            </div>
          </el-col>
        </el-row>
        <p class="chu-title">{{$t('auditDetail.no22')}}:</p>
        <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
          <tr>
            <th width="25%">{{$t('public.no39')}}</th>
            <th width="25%">{{$t('public.no18')}}</th>
            <th width="25%">{{$t('public.no40')}}</th>
            <th width="25%">{{$t('public.no37')}}</th>
          </tr>
          <template v-if="rejectList!==null&&rejectList!==undefined&&rejectList!=''">
            <tr  v-for="(item,index) in rejectList" :key="index">
              <td >{{item.userName | dataIsTrue}}</td>
              <td >{{item.phone | dataIsTrue}}</td>
              <td>{{$t($store.getters.tel_through(item.connectStatus))}}</td>
              <td >{{item.remark | dataIsTrue}}</td>
            </tr>
          </template>
          <template v-else>
            <div style="textAlign:center;width:400%;height:40px;lineHeight:40px">
              {{$t('public.no23')}}
            </div>
          </template>
        </table>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('auditDetail.no20')}}:</div>
          <div class="chu-select-right">
            {{peopleOne_audit.strApproveTime | dataIsTrue}}
          </div>
        </div>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('auditDetail.no21')}}:</div>
          <div class="chu-select-right">
            {{peopleOne_audit.approveResult==1?$t('auditDetail.no16'):$t('auditDetail.no17')}}
          </div>
        </div>
        <div class="chu-select">
          <div class="chu-select-left">{{$t('public.no37')}}:</div>
          <div class="chu-select-right">
            {{peopleOne_audit.remark?peopleOne_audit.remark:$store.state.common.nullData}}
          </div>
        </div>
        <template v-if="peopleOne_audit.approveResult == -1">
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
                  <th width="25%">{{$t('public.no39')}}</th>
                  <th width="25%">{{$t('public.no18')}}</th>
                  <th width="25%">{{$t('public.no40')}}</th>
                  <th width="25%">{{$t('public.no37')}}</th>
                </tr>
                <template v-if="rejectList!==null&&rejectList!==undefined&&rejectList!=''">
                  <tr  v-for="(item,index) in rejectList" :key="index">
                    
                      <td >{{item.userName | dataIsTrue}}</td>
                      <td >{{item.phone | dataIsTrue}}</td>
                      <td >{{$t($store.getters.tel_through(item.connectStatus))}}</td>
                      <td >{{item.remark | dataIsTrue}}</td>
                    
                  </tr>
                </template>
                <template v-else>
                  <div style="textAlign:center;width:400%;height:40px;lineHeight:40px">
                    {{$t('public.no23')}}
                  </div>
                </template>
              </table>
              <div  class="chu-select">
                <div class="chu-select-left">{{$t('auditDetail.no21')}}</div>
                <div class="chu-select-right">
                  <el-select size="small" v-model="status1" :placeholder="$t('public.placeholder')">
                    <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <template v-if="status1 == -1">
                  <div class="chu-select-left">{{$t('auditDetail.no23')}}</div>
                  <div class="chu-select-right">
                    <el-select style="width:90%" size="small" v-model="status2" :placeholder="$t('public.placeholder')">
                      <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="chu-select-right">
                    <el-select style="width:90%" size="small" v-model="status3" :placeholder="$t('public.placeholder')">
                      <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </template>
              </div>
              <div class="chu-select1">
                <div class="chu-select-left">{{$t('public.no37')}}</div>
                <div class="chu-select-right">
                  <textarea class="search_inpu" v-model="remark" :placeholder="$t('public.no42')+'~'"></textarea>
                </div>
              </div>
              <div class="input-but" v-if="$store.state.common.permiss.includes('RIGHT_FIRST_SUBMIT')">
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
    <!------------------------ 人工初审结束 ---------------------------->

    <div class="foot"></div>

    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>

    <!-- ------------------ 点击电话审核弹窗开始 -------------------- -->
    <div v-if="telFlag||telFlag1||telFlag2||telFlag3||telFlag4||telFlag5||telFlag6" class="reply">
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


    <!-- ----------------------确认是否删除开始------------------ -->
    <div v-if="backFlag1||backFlag2||backFlag3||backFlag4||backFlag5" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('new.no10')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="backFlagClose"></i>
        </div>
        <div class="reply-main-con">
          <div class="chu-select">
            <div class="chu-select-left">{{$t('new.no11')}}</div>
            <div class="chu-select-right">
              <el-select size="small" v-model="backStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('public.no37')}}</div>
            <div class="chu-select-right">
              <textarea class="search_inpu" v-model="backRemark" :placeholder="$t('public.no42')+'~'"></textarea>
            </div>
          </div>
          <div class="del-but">
            <div class="reply-but" @click="delSure">{{$t('public.no49')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------确认是否删除结束------------------- -->

    <!-- ----------------------添加紧急联系人开始------------------ -->
    <div v-if="addContent" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('new.no50')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="addContentClose"></i>
        </div>
        <div class="reply-main-con">
          <div class="chu-select">
            <div class="chu-select-left">{{$t('public.no17')}}:</div>
            <div class="chu-select-right">
              <el-select size="small" v-model="instancyContent.contactRelation" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('public.name')}}:</div>
            <div class="chu-select-right">
              <el-input size="small" style="width:300px" label="name" v-model="instancyContent.contactName"></el-input>
            </div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('public.userTel')}}:</div>
            <div class="chu-select-right">
              <el-input size="small" style="width:300px" label="phone" v-model="instancyContent.contactPhone"></el-input>
            </div>
          </div>
          <div class="del-but">
            <div class="reply-but" @click="addContentSure">{{$t('public.no49')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------添加紧急联系人结束------------------- -->
    
  </div>
  <div v-else class="back">
    <p>{{$t('public.no23')}}，<span @click="back">{{$t('back.no1')}}</span> {{$t('back.no2')}}</p>
  </div>
</template>
<script>

import telRecordList from '../../../components/component/teltable'
import noteRecordList from '../../../components/component/notetable'
import loanList from '../../../components/component/loantable'

import appLightbox from '../../../components/component/lightbox'// 图片点击放大组件
import couponList from '../../../components/component/coupon' // 优惠券列表

export default {
  name: 'auditDetail',
  components: {
    telRecordList,
    noteRecordList,
    loanList,
    couponList,
    appLightbox
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
      telFlag5: false,
      telFlag6: false,
      backFlag1: false,
      backFlag2: false,
      backFlag3: false,
      backFlag4: false,
      backFlag5: false,
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
        order: '',
        orderExtra: '',
        orderList: [],
        orderMultiCheck: '',
        userUrgentContact: '',
        loginCount: '',
        userOrderCount: {},
        webInfo: '',
        userFaceBook: '',
        contactOtherOne: '',
        contactOtherTwo: '',
        contactOne: '',
        contactTwo: '',
        contactThree: ''
      },
      // arr1:['用户信息','通话记录信息','短信信息记录','历史借款记录'],// 选项卡
      active: 4,
      active1: 1, // 第二个当前点中的选项卡
      active2: 1, // 用户详情借款详情当前点中的选项卡
      status1: '', // 初审是否通过选择状态
      options: this.$store.state.options.telStatus_select, // 下拉选框内容
      telStatus: '', // 电话审核下拉框选中项
      telRemark: '', // 电话审核备注信息内容
      options1: this.$store.state.options.peopleAuditOne_option, // 初审是否通过下拉选框
      status2: '', // 初审驳回原因1
      options2: [], // 初审驳回原因下拉框
      status3: '', // 初审驳回原因2
      options3: [], // 初审驳回原因2下拉框
      options4: [], // 退回原因下拉框
      remark: '', // 备注信息内容
      remark1: '', // 跟踪备注信息内容
      lightBoxToggle: false, // 图片放大显示层开关
      currentObj: '', // 当前点击选中的图片信息
      rejectList: '', // 初审电话审核记录表数据
      rejectData: [], // 驳回原因树状图
      tableData: '', // 最近催收记录表格
      machine_audit: '', // 机审结果
      peopleOne_audit: '', // 初审结果
      followReason: '', // 跟踪记录结果列表
      backStatus: '', // 退回原因2下拉框选中项
      backRemark: '', // 退回原因2下拉框选中项
      backData: [], // 驳回原因树状图
      addContent: false, // 点击添加紧急联系人弹窗开关
      options5: [], // 点击添加紧急联系人弹窗关系下拉框
      instancyContent: {
        contactRelation: '',
        contactName: '',
        contactPhone: ''
      }
    }
  },
  computed: {// 选项卡国际化
    arr1 () {
      let arr = []
      if (this.block == 1) {
        arr.push({id: 4, title: this.$t('tab2.no4')})
        arr.push({id: 1, title: this.$t('tab2.no1')})
        arr.push({id: 5, title: this.$t('tab.no4')})
        arr.push({id: 6, title: this.$t('tab2.no5')})
        arr.push({id: 2, title: this.$t('tab2.no2')})
        arr.push({id: 3, title: this.$t('tab2.no3')})
        
      } else {
        if (this.$store.state.common.permiss.includes('RIGHT_ME_FIRST_HIS')) {
          arr.push({id: 4, title: this.$t('tab2.no4')})
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_FIRST_USER')) {
          arr.push({id: 1, title: this.$t('tab2.no1')})
          arr.push({id: 5, title: this.$t('tab.no4')})
          arr.push({id: 6, title: this.$t('tab2.no5')})
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_FIRST_CALL')) {
          arr.push({id: 2, title: this.$t('tab2.no2')})
        }
        if (this.$store.state.common.permiss.includes('RIGHT_ME_FIRST_SMS')) {
          arr.push({id: 3, title: this.$t('tab2.no3')})
        }
        
      }

      return arr
    },
    arr2 () {
      let arr = []
      arr.push({id: 1, title: this.$t('auditDetail.no13')})
      arr.push({id: 2, title: this.$t('auditDetail.no65')})
      return arr
    },
    arr3 () {
      let arr = []
      arr.push({id: 1, title: this.$t('operationDetail.tab1.no1')})
      arr.push({id: 2, title: this.$t('operationDetail.tab1.no2')})
      arr.push({id: 2, title: this.$t('tab.no7')})
      return arr
    }
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
      this.telRecord()// 初审电话审核记录
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
          this.data.userBase = res.data.data.userBase
          this.data.userBank = res.data.data.userBank
          this.data.userIdcard = res.data.data.userIdcard
          this.data.userSelf = res.data.data.userSelf
          this.data.userWork = res.data.data.userWork
          this.data.order = res.data.data.order
          this.data.orderExtra = res.data.data.orderExtra
          this.data.orderList = res.data.data.orderList
          this.data.orderMultiCheck = res.data.data.orderMultiCheck
          this.data.userUrgentContact = res.data.data.userUrgentContact
          this.data.contactOne = res.data.data.contactOne
          this.data.contactTwo = res.data.data.contactTwo
          this.data.contactThree = res.data.data.contactThree
          this.data.loginCount = res.data.data.loginCount
          this.data.webInfo = res.data.data.webInfo
          this.data.userFaceBook = res.data.data.userFaceBook
          this.data.userOrderCount = res.data.data.userOrderCount
          if (res.data.data.recentCollection !== '') {
            this.tableData = res.data.data.recentCollection
          }
        }
      })
    },
    telRecord () { // 初审电话审核记录
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
          this.rejectList = res.data.data
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
    submit () { // 初审结果提交操作
      if (this.status1 == '') { // 验证结果是否选择
        this.$globalMsg.error(this.$t('auditDetail.no24'))
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
            action: this.$store.state.actionMap.Result_oneSubmit,
            'sessionid': this.sessionid
          },
          approveType: '2',
          orderNo: this.orderNo,
          orderId: this.orderId,
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
              this.$router.push('/myFirstAuditList')
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
          approveType: '2',
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
        } else {
          this.peopleOne_audit = ''
        }
      })
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
        approveType: '1',
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
      if (this.telFlag5) {
        option.phone = this.data.userUrgentContact.otherOnePhone ? this.data.userUrgentContact.otherOnePhone : ''
        option.relation = this.data.userUrgentContact.otherOneRelation ? this.data.userUrgentContact.otherOneRelation : ''
        option.userName = this.data.userUrgentContact.otherOneName ? this.data.userUrgentContact.otherOneName : ''
      }
      if (this.telFlag6) {
        option.phone = this.data.userUrgentContact.otherTwoPhone ? this.data.userUrgentContact.otherTwoPhone : ''
        option.relation = this.data.userUrgentContact.otherTwoRelation ? this.data.userUrgentContact.otherTwoRelation : ''
        option.userName = this.data.userUrgentContact.otherTwoName ? this.data.userUrgentContact.otherTwoName : ''
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
        this.telRecord()
        this.telClose()
      })
    },
    telClose () {
      this.telFlag = false
      this.telFlag1 = false
      this.telFlag2 = false
      this.telFlag3 = false
      this.telFlag4 = false
      this.telStatus = ''
      this.telRemark = ''
    },
    followHistory () { // 获取跟踪记录查询历史
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
          this.followReason = res.data.data
        }
      })
    },
    delSure () { // 退回确认操作
      if (this.backStatus == '') {
        this.$globalMsg.error(this.$t('auditDetail.no25'))
        return
      }
      if (this.backRemark == '') {
        this.$globalMsg.error(this.$t('public.no42'))
        return
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason_submit,
          'sessionid': this.sessionid
        },
        orderId: this.orderId,
        returnReason: this.backStatus,
        remark: this.backRemark,
        type: ''
      }
      if (this.backFlag1) { // 身份反面
        option.type = 31
      }
      if (this.backFlag2) { // 身份正面
        option.type = 32
      }
      if (this.backFlag3) { // 公正正面
        option.type = 33
      }
      if (this.backFlag4) { // 公正反面
        option.type = 34
      }
      if (this.backFlag5) { // 工资
        option.type = 52
      }
      if (this.flag) {
        this.flag = false
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
            this.detail()
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.backFlagClose()
        })
      }
    },
    backFlagClose () { // 回退操作，待开发
      this.backFlag1 = false
      this.backFlag2 = false
      this.backFlag3 = false
      this.backFlag4 = false
      this.backFlag5 = false
      this.backStatus = ''
      this.backRemark = ''
    },
    backReason () { // 退回原因下拉框
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
          'sessionid': this.sessionid
        },
        'optionGroup': 'return.reason'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.backData = res.data.data
          this.backData.forEach(value => { // 用户选择第一个驳回原因的时候检测status2的值动态生成第二个驳回原因的值
            value.value = value.optionValue// 取optionValue值作为选择框的value值
            value.label = value.optionName// 取optionName值作为选择框的label值

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
    getDefaultActive () {
      if (this.$store.state.common.permiss.includes('RIGHT_ME_FIRST_HIS')) {
        this.active = 4
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_FIRST_CALL')) {
        this.active = 2
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_FIRST_SMS')) {
        this.active = 3
      } else if (this.$store.state.common.permiss.includes('RIGHT_ME_FIRST_USER')) {
        this.active = 1
      }
    },
    getRelation () { // 获取关系
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.select_allData,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data.relation
          arr.forEach(value => {
            this.options5.push({value: value.optionValue, label: value.optionName})
          })
          this.addContent = true
        }
      })
    },
    addContentFlag () { // 添加联系人弹窗出现
      this.getRelation()
    },
    addContentSure () { // 添加紧急联系人确定
      if (this.instancyContent.contactRelation === '') {
        this.$globalMsg.error(this.$t('new.no52'))
        return
      }
      if (this.instancyContent.contactName === '') {
        this.$globalMsg.error(this.$t('new.no53'))
        return
      }
      if (this.instancyContent.contactPhone === '') {
        this.$globalMsg.error(this.$t('new.no54'))
        return
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.add_content,
          'sessionid': this.sessionid
        },
        userId: this.userId,
        orderNo: this.orderNo,
        ...this.instancyContent
      }
      if (this.flag) {
        this.flag = false
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
            this.detail()
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.addContentClose()
        })
      }
    },
    addContentClose () { // 添加紧急联系人关闭
      this.addContent = false
      this.options5 = []
      this.instancyContent.contactRelation = ''
      this.instancyContent.contactName = ''
      this.instancyContent.contactPhone = ''
    },
    openWindow(href){
      if(href){
        window.open(href);
      }
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
    },
    backFlag1 () {
      this.options4 = this.backData.filter(value => {
        return value.optionValue == '21'
      })[0].children
    },
    backFlag2 () {
      this.options4 = this.backData.filter(value => {
        return value.optionValue == '21'
      })[0].children
    },
    backFlag3 () {
      this.options4 = this.backData.filter(value => {
        return value.optionValue == '22'
      })[0].children
    },
    backFlag4 () {
      this.options4 = this.backData.filter(value => {
        return value.optionValue == '22'
      })[0].children
    },
    backFlag5 () {
      this.options4 = this.backData.filter(value => {
        return value.optionValue == '23'
      })[0].children
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')

    this.userId = this.$route.query.userid
    this.orderNo = this.$route.query.orderNo
    this.orderId = this.$route.query.orderId
    this.block = this.$route.query.block

    this.detail()// 初审页面详细信息
    this.telRecord()// 初审电话审核记录表数据
    this.reject()// 驳回原因内容
    // this.auditResult1()// 获取机审结果
    this.auditResult2()// 获取初审结果
    this.followHistory()// 获取跟踪记录结果
    this.getDefaultActive()// 获取默认第一个选项卡的展示
    this.backReason()// 获取退回原因下拉框
  }
}
</script>
<style scoped lang="scss">

.pai-active{
  margin: 30px 0 0;
}


.back-p{
  position: absolute;
  color: #1D7BFF;
  text-align: center;
  width: 100%;
  margin-top: 5px;
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
      color: $color2;
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
    li{
      width: 100%;
      padding: 20px;
    }
    
  }
  
}
.xuan-2-1{
  .xuan-2-1-1{
    width: 100%;
    display: flex;
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
        margin: 15px 0;
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
        padding-right: 50px;
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
    width: 35%;
    height: auto;
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
    .idimg{
      width: 200px;
      height: auto;
      position: relative;
    }
  }
}
.xuan-2-2{
  .xuan-2-2-1{
    margin-bottom: 24px;
    display: flex;
    @include p-span;
  }
}
.xuan-2-3{
  display: flex;
  .xuan-2-3-1{
    width: 80%;
    .xuan-2-3-1-1{
      margin-bottom: 24px;
      display: flex;
      @include p-span;
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
      @include p-span;
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
        word-break: break-all;
        height: 40px;
        text-align: center;
        border: 1px solid #ddd;
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

.chushenjilu{
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 20px 20px;
  .chu-title{
    margin: 0px 0 20px;
    font-size: 16px;
  }
  .chu-select{
    margin: 20px 20px;
    padding: 5px 0;
    display: flex;
    align-items: center;
    .chu-select-left{
      width: 8%;
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
  .chu-select1{
    margin: 20px 20px;
    padding: 5px 0;
    display: flex;
    .chu-select-left{
      width: 8%;
    }
    .chu-select-right{
      width: 90%;
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

.del {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .del-main {
    width: 474px;
    height: 240px;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .del-main-head {
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
    .del-main-con {
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .del-con-one {
        width: 100%;
        height: 40px;
        padding-top: 10px;
        color: #6b7283;
        font-size: 16px;
        text-align: center;
        margin: 30px 0;
      }
      .del-con-two {
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
      }
      .del-but {
        width: 260px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .del-but-1 {
          width: 45%;
          height: 100%;
          background-color: #547ef5;
          border-radius: 5px;
          text-align: center;
          line-height: 38px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
        .active {
          background-color: #ebeef6;
          color: #333;
        }
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

</style>
