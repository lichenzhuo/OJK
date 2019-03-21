<template>
  <div class="public_main" v-if="data">
    <div class="crumbs" v-if="type==1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('operationList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/myCollectionOrderList'}">{{$t('operationList.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('operationList.crumbsThree')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-else>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/inTheRushOrders'}">{{$t('loanAfterManage.crumbsTwo')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsThree')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------ 用户信息、借款信息开始------------------------ -->
    <div class="tabs mb20">
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
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.no1')}}:</span>
              <span>{{data.orderUserSelf.name+' '+data.orderUserSelf.middleName+' '+data.orderUserSelf.surname}}</span>
            </p>
              <p><span>{{$t('fei.loanId')}}:</span>
                <span>{{data.userBase.contractNo | dataIsTrue}}</span>
              </p>
            <p><span>{{$t('public.no18')}}:</span>
              <span>{{data.collectionInfo.userPhone | dataIsTrue}}</span>
            </p>
          </div>
          <div class="oneLineHasFour">
            <p><span>{{$t('public.birthday')}}:</span>
              <span>{{data.orderUserSelf.birthday | dataIsTrue}}</span>
            </p>
            <p>{{$t('public.no3')}}:
              <span>{{$t($store.getters.marriage(data.orderUserSelf.marriage))}}</span>
            </p>
            <p>{{$t('fei.id')}}:
              <span>{{data.orderUserIdcard.idCard | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('fei.idType')}}:</span>
              <span>{{data.orderUserIdcard.strIdType | dataIsTrue}}</span>
            </p>
          </div> 
          <div class="oneLineHasFour" >
            <p >
              <span>{{$t('new.no56')}}:</span>
              <span>{{$store.getters.getAge(data.orderUserSelf.birthday)}}</span>
            </p>
            <p>
              <span>{{$t('yuenan.no2')}}:</span>
              <span>{{data.orderUserSelf.liveProvinceName | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('yuenan.no17')}}:</span>
              <span>{{data.orderUserSelf.liveCityName | dataIsTrue}}</span>
            </p>
            <p ><span>{{$t('public.no9')}}:</span>
              <span>{{data.orderUserWork.company | dataIsTrue}}</span>
            </p>
          </div> 
          <div class="oneLineHasFour" >
            <p >
              <span>Facebook:</span>
              <span>{{data.orderUserSelf.facebook | dataIsTrue}}</span>
            </p>
            <p >
              <span>Email:</span>
              <span>{{data.orderUserSelf.email | dataIsTrue}}</span>
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
              <div v-if="data.orderUserIdcard.idcardPhotoUrl!==null&&data.orderUserIdcard.idcardPhotoUrl!==undefined&&data.orderUserIdcard.idcardPhotoUrl!==''" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.orderUserIdcard.idcardPhotoUrl})">
                <img :src="data.orderUserIdcard.idcardPhotoUrl"  :alt="$t('pic.no1')" :title="$t('pic.no1')">
              </div>
              <div v-else class="loansTypeImg-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no2')}}:</span>
            <template >
              <div v-if="data.orderUserIdcard.facetimePhotoUrl!==null&&data.orderUserIdcard.facetimePhotoUrl!==undefined&&data.orderUserIdcard.facetimePhotoUrl!==''" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.orderUserIdcard.facetimePhotoUrl})">
                <img :src="data.orderUserIdcard.facetimePhotoUrl"  :alt="$t('pic.no2')" :title="$t('pic.no2')">
              </div>
              <div v-else class="loansTypeImg-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
            <span>{{$t('pic.no3')}}:</span>
            <template >
              <div v-if="data.orderUserWork.incomePicUrl!==null&&data.orderUserWork.incomePicUrl!==undefined&&data.orderUserWork.incomePicUrl!==''" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.orderUserWork.incomePicUrl})">
                <img :src="data.orderUserWork.incomePicUrl"  :alt="$t('pic.no2')" :title="$t('pic.no2')">
              </div>
              <div v-else class="loansTypeImg-1 pic" >
                <img src="../../assets/img/null.png">
              </div>
            </template>
          </div>
          <h3 style="margin:10px 0;">{{$t('fei.no11')}}</h3>
          <div class="loansTypeImg" v-if="data.pictureUrl!==''&&typeof data.pictureUrl==='string'" >
            <div v-if="data.pictureUrl" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.pictureUrl})">
              <img :src="data.pictureUrl" >
            </div>
          </div>
          <div class="loansTypeImg" v-else-if="typeof data.pictureUrl==='object'">
            <template >
              <div v-if="data.pictureUrl[0]" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.pictureUrl[0]})">
                <img :src="data.pictureUrl[0]" >
              </div>
            </template>
            <template >
              <div v-if="data.pictureUrl[1]" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.pictureUrl[1]})">
                <img :src="data.pictureUrl[1]" >
              </div>
            </template>
            <template >
              <div v-if="data.pictureUrl[2]" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.pictureUrl[2]})">
                <img :src="data.pictureUrl[2]" >
              </div>
            </template>
          </div>
          <div v-else class="loansTypeImg" >
            <div class="loansTypeImg-1 pic">
              <img src="../../assets/img/null.png">
            </div>
          </div>
        </li>
        <li  v-if="active1==2">
          <div class="oneLineHasFour">
            <p><span>{{$t('new.no48')}}:</span>
              <span>{{data.orderExtra.appName | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('new.no49')}}:</span>
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
            <p><span>{{$t('operationDetail.no5')}}:</span>
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
            </p>
            <p><span>{{$t('public.no28')}}:</span>
              <span>{{data.orderInfo.overdueDays | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.no86')}}:</span> 
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(data.orderInfo.overdueServiceFee)}}{{$store.state.common.vi_currency}}</span>
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
            <p><span>{{$t('public.no58')}}:</span>
              <span>{{data.orderInfo.strLoanTime | dataIsTrue}}</span>
            </p>
            <p><span>{{$t('public.CreateTime')}}: </span>
              <span >{{data.orderInfo.strMustRefundTime | dataIsTrue}}</span>
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
            <template v-if="data.orderApproveList">
              <tr v-for="value in data.orderApproveList" :key="value.id">
                <td>{{value.adminName | dataIsTrue}}</td>
                <td>{{$t('loanMoneyDetail.loanMoney')}}</td>
                <td>{{value.strApproveTime | dataIsTrue}}</td>
                <td>
                  {{value.notApproveReason | dataIsTrue}}
                </td>
                <td>{{$t($store.getters.loanMoneyRecordStatus(value.approveType))}}</td>
                <td>{{$t($store.getters.loanMoneyResultStatus(value.approveResult))}}</td>
                <td>{{$t($store.getters.loanMoneyResultStatus(value.approveResult))}}</td>
                <td>{{$t($store.getters.loanMoneyResultStatus(value.approveResult))}}</td>
              </tr>
            </template>
            <template v-else>
              <div style="textAlign:center;width:1000%;height:40px;lineHeight:40px">
                {{$t('public.no23')}}
              </div>
            </template>
          </table>
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
        <li  v-if="active2==1">
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
                  <span class="cl555" :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{$t('public.name')}}：{{item.contactName}}</span>
                  <span class="mg5 cl555" :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{$t('operationDetail.no13')}}:{{item.contactPhone}}</span>
                  <span class="cl555" :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{$t('operationDetail.no14')}}:{{item.contactCnt?item.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
                  <span class="mg5 cl555" :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{$t('new.no57')}}:{{item.keepTime?item.keepTime:0}}s </span>
                  <span class="cl555" :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{$t('fei.no8')}}：{{item.operator}}</span>
                  <span class="mg5 cl555" :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}" v-if="item.isEffective">{{item.isEffective=='-1'?0:1}}</span>
                </el-radio>
              </el-radio-group>
            </template>
            <div v-else style="padding:0 30px">
              {{$t('public.no23')}}
            </div>
          </div>
        </li>
        <!-- ------------ 通话联系人开始------------------------ -->
        <li  v-if="active2==3">
          <div class="component">
            <ul>
              <li v-for="(item,index) in tableData" :key="index">
                <el-radio-group v-model="contact" class="radio1">
                  <el-radio :label="item.name+','+item.relation+','+item.phone">
                    <span :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99,fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{item.name}}</span>
                    <span :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99,fw600:item.isEffective===1,cl999:item.isEffective===-1}" style="margin:0 5px;" >{{item.phone}}</span>
                    <span :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99,fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{item.contactCnt?item.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
                    <span :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99,fw600:item.isEffective===1,cl999:item.isEffective===-1}" style="margin:0 5px;" >{{item.keepTime?item.keepTime:0}}s</span>
                    <span :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99,fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{item.operator?item.operator:''}}</span>
                    <template v-if="item.isEffective">
                      <span class="mg5" :class="{fw600:item.isEffective===1,cl999:item.isEffective===-1}">{{item.isEffective=='-1'?0:1}}</span>
                    </template>
                  </el-radio>
                </el-radio-group>
              </li>
            </ul>
            <el-row type="flex" justify="end">
              <div class="pages">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="total, prev, pager, next,  ->"
                  :total="pageTotal?pageTotal:0"
                  :page-size="30"
                >
                </el-pagination>
              </div>
            </el-row>
          </div>
        </li>
        <!-- ------------ 公司电话开始------------------------ -->
        <li  v-if="active2==4">
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
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item :label="$t('fei.no16')" >
              <el-select v-model="ruleForm.contactStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
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
            
            <el-form-item :label="$t('public.no38')" prop="remark">
              <el-input type="textarea" v-model="ruleForm.remark" :rows="4"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{$t('operationDetail.no22')}}</el-button>
            </el-form-item>
          </el-form>
        </li>
        <!-- --------------- 短信催收开始------------------------ -->
        <li  v-if="active3==2">
          <div >
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

export default {
  name: 'detail',
  components: {
    appLightbox,
    cuishouList,
    addressList
  },
  data () {
    return {
      currentPage: 1, // 分页当前页下标
      pageTotal: 0, // 分页总数
      tableData: [],
      sessionid: '',
      collectionId: '', // 传过来的催收ID
      orderNo: '', // 传过来的订单编号
      type: '', // 传过来的订单编号
      lightBoxToggle: false, // 图片放大显示层开关
      flag: true,
      active1: 1, // 第一个选项卡当前选中项
      active2: 1, // 第二个选项卡当前选中项
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
        contactStatus: '',
        promise: '',
        promiseTime: '',
        remark: ''
      },
      options1: this.$store.state.options.collection_option_submit, // 电话接通状态下拉选框信息
      options2: this.$store.state.options.channelAll_option, // 还款方式下拉选框信息
      options3: this.$store.state.options.paymentCode_option, // 是否有效
      rules: {// 电话催收表单验证项
        status: [
          { required: true, message: this.$t('operationDetail.no20'), trigger: 'change' }
        ],
        contactStatus: [
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
        remark:[
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
              this.flag = true;
              if (res.data.header.code == 0) {
                this.$globalMsg.success(this.$t('message.success'));
                this.detail();
                if(this.contact !== ''){
                  this.tableList();
                }
                this.$refs.ruleForm.resetFields();
              } else {
                this.$globalMsg.error(res.data.header.msg);
              }
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
            this.detail();
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
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.tableList();
    },
    tableList () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.address_list,
          'page': {'index': this.currentPage, 'size': 30},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
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
    this.sessionid = sessionStorage.getItem('sessionid');
    this.orderNo = this.$route.query.orderNo;
    this.type = this.$route.query.type;
    this.detail();
    this.tableList();
    
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
.component{
  width: 100%;
  height: auto;
  ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    li{
      width: 33%;
      margin-bottom: 10px;
      
    }
  }
}

span.active1{
  color: rgb(238, 45, 55);
}


</style>
