<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('serviceManage.crumbsThree')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('serviceManage.crumbsThree')}}</p>
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
        <el-col :md="9" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no34')}}:</span>
            <el-select size="small" v-model="formInline.serviceStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="9" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('public.orderStatus')}}:</span>
            <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no28')}}:</span>
            <el-input size="small"  label="phone" v-model="formInline.overdueBegin"></el-input>
            ~
            <el-input size="small"  label="phone" v-model="formInline.overdueEnd"></el-input>
          </div>
        </el-col>
        <template v-if="$store.state.common.lang==='vi'">
          <el-col :md="9" :lg="6" :xl="5">
            <div class="search-input">
              <span>{{$t('websiteLoans.no5')}}:</span>
              <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </template>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('public.no58')}}:</span>
            <el-date-picker 
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
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('public.no59')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime1" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('serviceManage.paidantime')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime2" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        </el-col>
        <template v-if="$store.state.common.lang!=='PHL'">
          <div class="search-input" >
            <span>{{$t('new.no87')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime5" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
          <div class="search-input" >
            <span>{{$t('new.no88')}}:</span>
            <el-select size="small" v-model="formInline.callStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options6" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe empty-text>
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" width="60">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" min-width="120">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="userPhone" :label="$t('yuenan.no23')" min-width="120">
              <template slot-scope="scope">
                <span >{{$store.getters.vn_phone(scope.row.userPhone)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')" min-width="90">
              <template slot-scope="scope">
                <span v-if="scope.row.orderLoanType!==null&&scope.row.orderLoanType!==undefined&&scope.row.orderLoanType!==''">{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
                <span v-else>{{$store.state.common.nullData}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" min-width="90">
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no58')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="strMustRefundTime" :label="$t('public.no59')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="strServiceAllotTime" :label="$t('serviceManage.paidantime')" width="85">
          </el-table-column>
          <el-table-column align="center" prop="serviceStatus" :label="$t('new.no34')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.serviceStatus!==null&&scope.row.serviceStatus!==undefined&&scope.row.serviceStatus!==''">{{$t($store.getters.myoveNoticeStatus(scope.row.serviceStatus))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.no22')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <template v-if="$store.state.common.lang!=='PHL'">
            <el-table-column align="center" prop="strCallTime" :label="$t('new.no87')" min-width="86">
            </el-table-column>
            <el-table-column align="center" prop="callStatus" :label="$t('new.no88')" min-width="80">
              <template slot-scope="scope">
                <span >{{$t($store.getters.callStatus_status(scope.row.callStatus))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_REMIND')">
                <template v-if="$store.state.common.lang==='vi'">
                  <span 
                    v-if="scope.row.status==51||scope.row.overdueDays>isover"
                    style="color:#CFCFCF"
                  >
                  {{$t('serviceManage.telNotice')}}
                  </span>
                  <span 
                    v-else
                    style="color:#547ef6;cursor:pointer" 
                    @click="loanDetali(scope.row.orderNo,scope.row.userId,scope.row.overdueDays)"
                  >
                  {{$t('serviceManage.telNotice')}}
                  </span>
                </template>
                <template v-else>
                  <span 
                    v-if="scope.row.status!=51"
                    style="color:#547ef6;cursor:pointer" 
                    @click="loanDetali(scope.row.orderNo,scope.row.userId,scope.row.overdueDays)"
                  >
                  {{$t('serviceManage.telNotice')}}
                  </span>
                  <span 
                    v-else
                    style="color:#CFCFCF"
                  >
                  {{$t('serviceManage.telNotice')}}
                  </span>
                </template>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_REMIND_LIST')">
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
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 还款时间
      searchTime1: [], // 应还时间
      searchTime2: [], // 派单时间
      searchTime5: [], // 最近群呼时间
      formInline: { // 用户查询信息数据对应字段
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        orderLoanType: '',
        serviceStatus: '',
        orderStatus: '',
        callStatus: '',
        callStartTime:'',
        callEndTime:'',
        serviceTimeStart: '',
        serviceTimeEnd: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        mustRefundTimeBegin: '',
        mustRefundTimeEnd: '',
        overdueBegin: '',
        overdueEnd: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.order_select, // 订单状态下拉选框信息
      options2: this.$store.state.options.notice_option, // 提醒状态下拉选框信息
      options3: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      options6: this.$store.state.options.groupCalls_options, // 群呼结果下拉选框信息
      tableData: [],// 借款信息数据模拟
      isover:''// 判断电话提醒按钮是否展示
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.loansList();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = val
      this.loansList();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('myOveDateRemindList', this.formInline)
      if (this.flag) {
        this.flag = false
        this.loansList();
      }
    },
    loanDetali (orderNo, userId,overdueDays) { // 查看详情操作
      this.$router.push({path: '/telnoticedetail', query: {orderNo, userId,overdueDays,type:1}})
    },
    loansList () { // 获取借款列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_myOveDate,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    getcollectionType(){ // 获取催收阶段判断电话提醒按钮是否展示
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'overdue.type'
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let str = res.data.data[0].remark;
          this.isover = JSON.parse(str).start;
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.loanTimeBegin = this.searchTime[0]
        this.formInline.loanTimeEnd = this.searchTime[1]
      } else {
        this.formInline.loanTimeBegin = ''
        this.formInline.loanTimeEnd = ''
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.mustRefundTimeBegin = this.searchTime1[0]
        this.formInline.mustRefundTimeEnd = this.searchTime1[1]
      } else {
        this.formInline.mustRefundTimeBegin = ''
        this.formInline.mustRefundTimeEnd = ''
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.serviceTimeStart = this.searchTime2[0]
        this.formInline.serviceTimeEnd = this.searchTime2[1]
      } else {
        this.formInline.serviceTimeStart = ''
        this.formInline.serviceTimeEnd = ''
      }
    },
    searchTime5 () {
      if (this.searchTime5) {
        this.formInline.callStartTime = this.searchTime5[0]
        this.formInline.callEndTime = this.searchTime5[1]
      } else {
        this.formInline.callStartTime = ''
        this.formInline.callEndTime = ''
      }
    },
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.myOveDateRemindList_select) !== '{}') {
      this.formInline = this.$store.state.common.myOveDateRemindList_select
      if(this.formInline.serviceTimeStart!==''){
        this.searchTime2.push(this.formInline.serviceTimeStart)
        this.searchTime2.push(this.formInline.serviceTimeEnd)
      }
      if(this.formInline.mustRefundTimeBegin!==''){
        this.searchTime1.push(this.formInline.mustRefundTimeBegin)
        this.searchTime1.push(this.formInline.mustRefundTimeEnd)
      }
      if(this.formInline.loanTimeBegin!==''){
        this.searchTime.push(this.formInline.loanTimeBegin)
        this.searchTime.push(this.formInline.loanTimeEnd)
      }
      
      
      
    }
    this.loansList()// 获取借款列表
    this.getcollectionType()// 获取借款列表
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
  height: auto;
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
  position: fixed;
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
