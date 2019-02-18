<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbssix')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('loanAfterManage.crumbssix')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.orderId"></el-input>
          </div>
        </el-col>
        <!-- <el-col :md="6" :lg="4" :xl="3">
          <div class="search-input">
            <span>{{$t('public.orderNo')}}:</span>
            <el-input size="small" label="orderNo" v-model="formInline.orderNo"></el-input>
          </div>
        </el-col> -->
        <el-col :md="6" :lg="4" :xl="3">
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" label="userId" v-model="formInline.userId"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" label="name" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <!-- <el-col :md="8" :lg="5" :xl="4"> -->
          <div class="search-input">
            <span>{{$t('loanAfterManage.paycodeState')}}:</span>
            <el-select clearable size="small" v-model="formInline.codeStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <!-- </el-col> -->
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('loanAfterManage.paycodetime')}}:</span>
            <el-date-picker 
              id="date1"
              size="small"
              v-model="searchTime" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        </el-col>
        <template >
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        <!-- <el-col :md="5" :lg="2" :xl="2">
          <div class="search-input">
            <el-button type="primary" class="button-color">{{$t('public.excel')}}</el-button>
          </div>
        </el-col> -->
      </el-row>
    </div>

    <div class="search act" >
      <el-row :gutter='10'>
        <el-col :span="5">
          <div class="search-input">
            <el-button type="primary" class="button-color" @click="addPayCode">{{$t('loanAfterManage.addPaycode')}}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" >
      <template>
        <el-table :data="tableData" stripe style="width: 100%" empty-text>
          <el-table-column align="center" prop="id" :label="$t('public.backId')" width="100">
          </el-table-column>
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')" min-width="65">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="payType" :label="$t('loanAfterManage.payType')" min-width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.payType!==null&&scope.row.payType!==undefined&&scope.row.payType!==''">{{scope.row.payType=='atm'?scope.row.bankName:scope.row.payType}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="paymentCode" :label="$t('loanAfterManage.paycode')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('loanAfterManage.paycodetime')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="strPaymentCodeOvertime" :label="$t('loanAfterManage.lostTime')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="codeStatus" :label="$t('loanAfterManage.paycodeState')" min-width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.codeStatus!==null&&scope.row.codeStatus!==undefined&&scope.row.codeStatus!==''">{{$t($store.getters.bankIdStatus(scope.row.codeStatus))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="orderStatus" :label="$t('public.orderStatus')" min-width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.orderStatus!==null&&scope.row.orderStatus!==undefined&&scope.row.orderStatus!==''">{{$t($store.getters.rejectStatus(scope.row.orderStatus))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_COLLECTION_STATISTICS_DAY_LIST')">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
        </div>
    </el-row>

    <!-- ------------------确认是否修改开始-------------------- -->
    <div v-if="add" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('loanAfterManage.addPaycode')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="addClose"></i>
        </div>
        <div class="reply-main-con">
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('public.orderId')}}:
            </div>
            <div class="reply-con-one-3">
              <el-input size="small" style="width:210px" label="phone" v-model="ruleForm2.orderId"></el-input>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-1">
              {{$t('loanAfterManage.payType')}}:
            </div>
            <div class="reply-con-one-2">
              <el-select size="small" v-model="ruleForm2.repayType" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="reply-but" @click="addSure">{{$t('proManage.sure')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      flag: true,
      searchTime: [], // 查询时间
      formInline: {// 用户查询信息数据对应字段
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        adminId: '',
        codeStatus: '',
        createTimeBegin: '',
        createTimeEnd: ''
      },
      ruleForm2: {
        orderId: '',
        channel: 'bluepay',
        repayType: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.paymentCode_option, // 还款码状态下拉选框信息
      options2: this.$store.state.options.channelAll_option, // 生成还款码支付方式
      tableData: [], // 表单信息数据模拟
      add: false,// 生成还款码开关
      roleId:''
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.payCodeList();
    },
    payCodeList () { // 获取还款码订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.payCode_list,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    select () { // 查询按钮点击操作
      if(this.roleId==43){
        if (this.flag&&this.formInline.phone!=='') {
          this.flag = false;
          this.payCodeList();
        }else{
          this.$globalMsg.error(this.$t('new.no54'))
        }
      }else{
        if (this.flag) {
          this.flag = true;
          this.payCodeList();
        }
      }
    },
    addPayCode () { // 添加窗口弹出
      this.add = true
    },
    addSure () { // 生成还款码确定操作
      if (this.ruleForm2.orderId == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.firstOne'))
        return
      }
      if (this.ruleForm2.repayType == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.firstTwo'))
        return
      }
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.payCode_add,
            'sessionid': this.sessionid
          },
          ...this.ruleForm2
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
            this.formInline.orderId = this.ruleForm2.orderId
            this.payCodeList()// 获取每日催回统计列表
            
          } else {
            this.$globalMsg.error(this.$t('message.warning'))
          }
          this.addClose()
        })
      }
    },
    addClose () { // 添加窗口关闭
      this.add = false
      this.ruleForm2.orderId = ''
      this.ruleForm2.repayType = ''
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.createTimeBegin = this.searchTime[0]
        this.formInline.createTimeEnd = this.searchTime[1]
      } else {
        this.formInline.createTimeBegin = ''
        this.formInline.createTimeEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.roleId = sessionStorage.getItem('roleId')
    if(this.roleId!=43){
      this.payCodeList()// 获取没日催回统计列表
    }
    
  }

}
</script>
<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}

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
  span {
    display: block;
    float: left;
    margin-top: 10px;
    background-color: rgba(84, 126, 245, 1);
    width: 4px;
    height: 30px;
    border-radius: 5px;
  }
  p {
    color: rgba(84, 126, 245, 1);
    font-size: 16px;
    margin-left: 20px;
  }
  
}
.search {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 18px;
  margin-bottom: 22px;
  padding: 22px 28px 22px 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  .search-input {
    height: 50px;
    display: flex;
    align-items: center;
    // margin-right: 10px;
    & > span {
      padding: 0 5px;
      font-size: 14px;
      white-space: nowrap;
      @include flex-cen;
    }
    // .margin{
    //   margin-left: 15px;
    // }
    .el-input {
      flex: auto;
      @include flex-cen;
    }
    .el-date-editor {
      margin: 0 5px;
    }
    .el-select {
      flex: auto;
      @include flex-cen;
    }
    .el-button--primary{
      height: 40px;
      
    }
    .button-color{
      background-color: #1D7BFF;
      border-color: #547ef6;
    }
  }
}
.act{
  padding: 5px 28px 5px 5px;
}


.reply{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main{
    width: 694px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom:5px; 
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
      padding: 30px 30px;
      .reply-con-one{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        .reply-con-one-1{
          width: 100px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          color: #999;
          margin-bottom: 20px;
        }
        .reply-con-one-2{
          width: 560px;
          height: 40px;
          line-height: 40px;
          margin-bottom: 10px;
        }
        .reply-con-one-3{
          width: 560px;
          height: 100%;
          margin-bottom: 10px;
          textarea{
            width: 100%;
            height: 100px;
            font-size: 16px;
            padding: 5px;
          }
        }
        .reply-con-one-4{
          width: 100px;
          height: 40px;
          text-align: center;
          color: #999;
        }
      }
      .reply-con-two{
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
        textarea{
          width: 100%;
          height: 100%;
          padding: 10px;
          font-size: 16px;
          background-color: #f4f6fb;
          color: #000;
        }
      }
      .reply-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 10px auto;
        text-align: center;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}

.table {
  width: 100%;
  min-height: 450px;
}


</style>
