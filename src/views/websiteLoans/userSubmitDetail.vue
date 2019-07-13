<template>
  <div class="usermanage" v-if="data">
    <div class="crumbs" v-if="from==1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('websiteLoans.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/usersubmitlist'}">{{$t('websiteLoans.no2')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('public.detail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="crumbs" v-if="from==2">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('websiteLoans.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/mytailafterorder'}">{{$t('websiteLoans.no3')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('public.detail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------ 用户信息开始------------------------ -->
    <div class="xuanxiangka">
      <ul class="xuan-1">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active1==value.id}" @click="active1=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="xuan-2">
        <li class="xuan-2-2" v-if="active1==1">
          <template >
            <div class="xuan-2-2-1">
              <p>{{$t('public.no1')}}:
                <span v-if="data.officiaUserDetails.name!==null&&data.officiaUserDetails.name!==undefined&&data.officiaUserDetails.name!==''">{{data.officiaUserDetails.name}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>{{$t('public.no18')}}:
                <span v-if="data.officiaUserDetails.phone!==null&&data.officiaUserDetails.phone!==undefined&&data.officiaUserDetails.phone!==''">{{data.officiaUserDetails.phone}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <!-- <p v-if="$store.state.common.lang==='vi'">
                {{$t('yuenan.no23')}}:
                <span v-if="data.officiaUserDetails.phone!==null&&data.officiaUserDetails.phone!==undefined&&data.officiaUserDetails.phone!==''">{{$store.getters.vn_phone(data.officiaUserDetails.phone)}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p> -->
              <p>{{$t('public.no2')}}:
                <span v-if="data.officiaUserDetails.idCard!==null&&data.officiaUserDetails.idCard!==undefined&&data.officiaUserDetails.idCard!==''">{{data.officiaUserDetails.idCard}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <!-- <p>{{$t('websiteLoans.no5')}}:
                <span v-if="data.officiaUserDetails.orderLoanType!==null&&data.officiaUserDetails.orderLoanType!==undefined&&data.officiaUserDetails.orderLoanType!==''">{{$t($store.getters.loanTypeState(data.officiaUserDetails.orderLoanType))}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p> -->
            </div>
            <div class="xuan-2-2-1">
              <p >
                PC{{$t('public.submitDate')}}:
                <span v-if="data.officiaUserDetails.strSubTime!==null&&data.officiaUserDetails.strSubTime!==undefined&&data.officiaUserDetails.strSubTime!==''">{{data.officiaUserDetails.strSubTime}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
              <p>
                APP{{$t('public.registerDate')}}:
                <span v-if="data.officiaUserDetails.strAppRegTime!==null&&data.officiaUserDetails.strAppRegTime!==undefined&&data.officiaUserDetails.strAppRegTime!==''">{{data.officiaUserDetails.strAppRegTime}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div> 
            <div class="xuan-2-2-1">
              <p>
                APP{{$t('websiteLoans.no12')}}:
                <span v-if="data.officiaUserDetails.downloadLink!==null&&data.officiaUserDetails.downloadLink!==undefined&&data.officiaUserDetails.downloadLink!==''">{{data.officiaUserDetails.downloadLink}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </div>
          </template>
        </li>
      </ul>
    </div>

    <div class="paixu mt15 pb10">
      <span></span>
      <p>{{$t('websiteLoans.no9')}}：</p>
    </div>
    <div class="loansTypeImg">
      <template >
        <div v-if="data.officiaUserDetails.onePicUrlStr!==null&&data.officiaUserDetails.onePicUrlStr!==undefined&&data.officiaUserDetails.onePicUrlStr!==''" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.officiaUserDetails.onePicUrlStr})">
          <img :src="data.officiaUserDetails.onePicUrlStr"  :alt="$t('websiteLoans.no9')" >
        </div>
        <div v-if="data.officiaUserDetails.twoPicUrlStr!==null&&data.officiaUserDetails.twoPicUrlStr!==undefined&&data.officiaUserDetails.twoPicUrlStr!==''" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.officiaUserDetails.twoPicUrlStr})">
          <img :src="data.officiaUserDetails.twoPicUrlStr"  :alt="$t('websiteLoans.no9')" >
        </div>
        <div v-if="data.officiaUserDetails.threePicUrlStr!==null&&data.officiaUserDetails.threePicUrlStr!==undefined&&data.officiaUserDetails.threePicUrlStr!==''" class="loansTypeImg-1 pic" @click="openBox({imgUrl:data.officiaUserDetails.threePicUrlStr})">
          <img :src="data.officiaUserDetails.threePicUrlStr"  :alt="$t('websiteLoans.no9')" >
        </div>
      </template>
    </div>
    

    <!-- ------------  跟踪记录栏  ------------------------ -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('auditDetail.no65')}}</p>
        </div>
      </el-col>
    </el-row>
    <div class="xuan-3">
      <table class="bank-table" width="100%" border="1" cellspacing="0" cellpadding="20">
        <tr>
          <th width="25%">{{$t('websiteLoans.no13')}}</th>
          <th width="25%">{{$t('new.no8')}}</th>
          <th width="50%">{{$t('public.no37')}}</th>
        </tr>
        <template v-if="data.trackList!=''">
          <tr v-for="value in data.trackList" :key="value.id">
            <template>
              <td v-if="value.strTrackTime!==null&&value.strTrackTime!==undefined">{{value.strTrackTime}}</td>
            </template>
            <template>
              <td v-if="value.trackStatus!==null&&value.trackStatus!==undefined">{{$t($store.getters.trackStatus_Status(value.trackStatus))}}</td>
              <td v-else>{{$store.state.common.nullData}}</td>
            </template>
            <template>
              <td v-if="value.remark!==null&&value.remark!==undefined&&value.remark!==''">{{value.remark}}</td>
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
    </div>
    <div class="foot"></div>

    <!-- ------------ 跟进说明开始------------------------ -->
    <div class="xuanxiangka" v-if="type==2">
      <ul class="xuan-1">
       <li v-for="(value,index) in arr3" :key="index" :class="{active:active3==value.id}" @click="active3=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="xuan-2">
        <!-- --------------- 跟进说明开始   ------------------------ -->
        <li class="xuan-2-7" v-if="active3==1&&$store.state.common.permiss.includes('RIGHT_PC_USER_ME_SUB')">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item :label="$t('operationDetail.no23')" prop="status">
              <el-select v-model="ruleForm.status" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('public.no38')" prop="remark">
              <el-input type="textarea" v-model="ruleForm.remark" :rows="4"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{$t('operationDetail.no22')}}</el-button>
            </el-form-item>
          </el-form>
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
      id: '', // 传过来的跟踪单号
      type: '', // 传过来的订单类型
      from: '', // 从哪个页面进来的
      lightBoxToggle: false, // 图片放大显示层开关
      flag: true,
      active1: 1, // 第一个选项卡当前选中项
      active3: 1, // 第三个选项卡当前选中项
      data: {// 页面信息汇总
        officiaUserDetails: '',
        trackList: [],
      },
      ruleForm: {// 跟踪提交数据
        status: '',
        remark: ''
      },
      options1: this.$store.state.options.trackStatus_options,
      rules: {// 表单验证项
        status: [
          { required: true, message: this.$t('operationDetail.no20'), trigger: 'change' }
        ],
        remark: [
          { required: true, message: this.$t('operationDetail.no20'), trigger: 'change' }
        ],
      },
    }
  },
  computed: {
    arr1 () {
      return [
        {id: 1, title: this.$t('operationDetail.tab1.no1')},
      ]
    },
    arr3 () {
      return [
        {id: 1, title: this.$t('operationDetail.tab3.no1')},
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
          action: this.$store.state.actionMap.website_myorderListDetail,
          'sessionid': this.sessionid
        },
        'id': this.id
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.data.officiaUserDetails = res.data.data.officiaUserDetails
          this.data.trackList = res.data.data.trackList
        } else {
          this.data = []
        }
      })
    },
    submitForm (formName) { // 跟进说明提交操作
      // 然后表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.flag) {
            this.flag = false
            let option = {
              header: {
                ...this.$base,
                action: this.$store.state.actionMap.website_myorderListSubmit,
                sessionid: this.sessionid
              },
              id: this.id,
              ...this.ruleForm
            }
            this.$axios.post('', option).then(res => {
              this.flag = true
              if (res.data.header.code == 0) {
                this.$globalMsg.success(this.$t('message.success'))
              } else {
                this.$globalMsg.error(res.data.header.msg)
              }
              this.ruleForm.remark = '';
              this.ruleForm.status = '';
            })
          }
        } else {
          return false
        }
      })
    },
    back () { // 页面无数据时，点击返回
      window.history.go(-1)
    },
  },
  watch: {
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.from = this.$route.query.from;
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

.paixu {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: rgba(224, 229, 246, 1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    display: block;
    background-color: rgba(84, 126, 245, 1);
    width: 4px;
    height: 30px;
    border-radius: 5px;
  }
  p {
    color: rgba(84, 126, 245, 1);
    font-size: 16px;
    margin: 0 20px;
  }
  .tooltip{
    width: 15px;
    height: 15px;
    img{
      display: block;
    }
  }
}
.pai-active{
  margin: 30px 0 0;
}
.mt15{
  margin-top: 15px;
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
