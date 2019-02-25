<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('finance.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('finance.crumbsThr')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('finance.crumbsThr')}}</p>
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
        <el-col :md="6" :lg="4" :xl="3">
          <div class="search-input">
            <span>{{$t('public.orderNo')}}:</span>
            <el-input size="small" label="orderNo" v-model="formInline.orderNo"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" label="userName" v-model="formInline.userName"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <!-- <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('finance.channel')}}:</span>
            <el-select size="small" v-model="formInline.thirdChannel" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col> -->
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('public.CreateDate')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                id="applyDate"
                size="small"
                v-model="searchTime1" 
                type="daterange" 
                range-separator="~"  
                :default-value="$store.state.common.preMonth" 
                :start-placeholder="$t('public.beginTime')" 
                :end-placeholder="$t('public.endTime')">
              </el-date-picker>
            </form>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('finance.createTime')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                id="createDate"
                size="small"
                v-model="searchTime2" 
                type="daterange" 
                range-separator="~"  
                :default-value="$store.state.common.preMonth" 
                :start-placeholder="$t('public.beginTime')" 
                :end-placeholder="$t('public.endTime')">
              </el-date-picker>
            </form>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('finance.successTime')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                id="searchDate"
                size="small"
                v-model="searchTime3" 
                type="daterange" 
                range-separator="~"  
                :default-value="$store.state.common.preMonth" 
                :start-placeholder="$t('public.beginTime')" 
                :end-placeholder="$t('public.endTime')">
              </el-date-picker>
            </form>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no22')}}:</span>
            <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="5">
          <div class="search-input">
            <span>{{$t('finance.putMoneyType')}}:</span>
            <el-select size="small" v-model="formInline.loanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_LENDING_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_LENDING_EXP')">
          <el-col :md="5" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          </el-col>
        </template>
        
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_LENDING_LIST')">
      <template>
        <el-table :data="tableData" stripe size="small"  empty-text>
          <el-table-column align="center" prop="orderNo" :label="$t('public.orderNo')" width="110">
          </el-table-column>
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" width="100">
          </el-table-column>
          <el-table-column align="center" prop="contractNo" :label="$t('fei.loanId')" width="100">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="loanType" :label="$t('finance.putMoneyType')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.loanType!==null&&scope.row.loanType!==undefined&&scope.row.loanType!==''">{{scope.row.loanType==1?$t('finance.putType.no1'):$t('finance.putType.no2')}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.no18')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="amount" :label="$t('finance.amount')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.amount!==null&&scope.row.amount!==undefined&&scope.row.amount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.amount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strApplyTime" :label="$t('public.CreateDate')" min-width="85">
          </el-table-column>
          <el-table-column align="center" prop="strLendingtime" :label="$t('finance.successDate')" min-width="85">
          </el-table-column>
          <el-table-column align="center" prop="strPaymentCounter" :label="$t('fei.back')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="lendingCode" :label="$t('fei.backCode')" min-width="85">
          </el-table-column>
          <el-table-column align="center" prop="kptn" :label="$t('fei.sanCode')" min-width="85">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('finance.status')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.putMoneyLogStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" :label="$t('public.no37')" min-width="130">
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_LENDING_LIST')">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="sizes, prev, pager, next, total,->"
            :page-sizes="[10, 15, 20, 30]"
            :page-size="pageNumber"
            @size-change="handleSizeChange"
            :total="pageTotal?pageTotal:0">
          </el-pagination>
        </div>
    </el-row>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 申请时间
      searchTime2: [], // 创建时间
      searchTime3: [], // 打款成功时间
      formInline: {// 用户查询信息数据对应字段
        orderId: "",
        userName:'',
        phone: "",
        thirdChannel: "",
        applyTimeBegin: "",
        applyTimeEnd: "",
        createTimeBegin: "",
        createTimeEnd: "",
        loanTimeBegin: "",
        loanTimeEnd: "",
        status: "",
        loanType:''
      },
      currentPage: 1, // 当前页下标
      // 通道下拉选框信息
      options1: this.$store.state.options.thirdChannel_vi, // 通道
      options2: this.$store.state.options.putMoneyLog_select, // 状态下拉选框信息
      options3: this.$store.state.options.putMoneyLog_putType, // 放款类型下拉选框信息
      tableData: []// 用户信息数据模拟
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.putMoneyList();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.putMoneyList();
    },
    select () { // 查询按钮点击操作
      this.$store.commit('putMoneyLogList', this.formInline)
      if (this.flag) {
        this.flag = false;
        this.putMoneyList();
      }
    },
    putMoneyList () { // 放款列表获取
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.putMoney_logList,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    putExcel () { // excel下载
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.putMoney_logExcel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            window.location.href = res.data.data.fileName;
          }
        })
      }
    }
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.applyTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0])
        this.formInline.applyTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1])
      } else {
        this.formInline.applyTimeBegin = ''
        this.formInline.applyTimeEnd = ''
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.createTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0])
        this.formInline.createTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1])
      } else {
        this.formInline.createTimeBegin = ''
        this.formInline.createTimeEnd = ''
      }
    },
    searchTime3 () {
      if (this.searchTime3) {
        this.formInline.loanTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime3[0])
        this.formInline.loanTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime3[1])
      } else {
        this.formInline.loanTimeBegin = ''
        this.formInline.loanTimeEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.putMoneyLogList_select) !== '{}') {
      this.formInline = this.$store.state.common.putMoneyLogList_select
      if(this.formInline.applyTimeBegin!==''){
        this.searchTime1.push(this.formInline.applyTimeBegin)
      this.searchTime1.push(this.formInline.applyTimeEnd)
      }
      if(this.formInline.createTimeBegin!==''){
        this.searchTime2.push(this.formInline.createTimeBegin)
      this.searchTime2.push(this.formInline.createTimeEnd)
      }
      if(this.formInline.loanTimeBegin!==''){
        this.searchTime3.push(this.formInline.loanTimeBegin)
      this.searchTime3.push(this.formInline.loanTimeEnd)
      }
    }
    this.putMoneyList()
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

.table {
  width: 100%;
  min-height: 540px;
}
span.active1{
  color: #FF6700;
}
span.active2{
  color: #8FD78D;
}
span.active3{
  color: #3b56ee;
}


//用户详情弹窗
.details{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 95%;
    height: 500px;
    margin-top: -200px;
    background-color: #ffffff;
    .detail-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 10px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
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
    .detail-main-con{
      width: 100%;
      height: 452px;
      .year{
        width: 100%;
        height: 58px;
        display: flex;
        padding-left: 50px;
        align-items: flex-end;
        .button-active{
          background-color: #409EFF;
        }
      }
      
      .detail-table{
        width: 100%;
        height: 392px;
        display: flex;
        justify-content: space-around;
        .detail-table-1{
          width: 45%;
          height: 100%;
          .detail-table-2{
            width: 100%;
            height: 100%;
            tr:nth-child(odd){
              background-color: #Ffffff;
            }
            tr:nth-child(even){
              background-color: #F4F6FB;
            }
            .table-head{
              height: 50px;
            }
            .table-head2{
              text-align: center;
            }
            .active{
              background-color: #F4F6FB;
            }
          }
        }
      }
    }
  }
} 

</style>
