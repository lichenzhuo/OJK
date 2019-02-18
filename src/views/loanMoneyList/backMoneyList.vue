<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('loanMoney.title')}}</p>
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
        
        <!-- <el-col :md="9" :lg="6" :xl="5"> -->
          <div class="search-input">
            <span>{{$t('public.orderStatus')}}:</span>
            <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <!-- </el-col> -->
        <!-- <el-col :md="9" :lg="6" :xl="5"> -->
          <div class="search-input">
            <span>{{$t('public.no53')}}:</span>
            <el-select size="small" v-model="formInline.isOverdue" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <!-- </el-col> -->
        <!-- <el-col :md="14" :lg="11" :xl="7"> -->
          <div class="search-input">
            <span>{{$t('public.no59')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
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
        <!-- </el-col> -->
        <!-- <el-col :md="8" :lg="5" :xl="4"> -->
          <div class="search-input">
            <span>{{$t('public.no28')}}:</span>
            <el-input size="small" style="width:80px"  label="phone" v-model="formInline.overdueBegin"></el-input>
            ~
            <el-input size="small" style="width:80px"  label="phone" v-model="formInline.overdueEnd"></el-input>
          </div>
        <!-- </el-col> -->
        <!-- <el-col :md="14" :lg="11" :xl="7"> -->
          <div class="search-input">
            <span>{{$t('public.no58')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
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
        <!-- </el-col> -->
        <!-- <el-col :md="14" :lg="11" :xl="7"> -->
          <div class="search-input">
            <span>{{$t('public.no60')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
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
        <!-- </el-col> -->
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_QUERY')">
          <!-- <el-col :md="3" :lg="2" :xl="2"> -->
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
        
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_EXP')">
          <!-- <el-col :md="3" :lg="2" :xl="2"> -->
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe empty-text>
          
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" width="60">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no54')" min-width="85">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" min-width="68">
          </el-table-column>
          <el-table-column align="center" prop="currentInterest" :label="$t('public.no55')" min-width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.currentInterest!==null&&scope.row.currentInterest!==undefined&&scope.row.currentInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.currentInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" :label="$t('public.no56')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no57')" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no58')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strMustRefundTime" :label="$t('public.no59')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.no60')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no43')" min-width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueDays!==null&&scope.row.overdueDays!==undefined&&scope.row.overdueDays!==''">{{$t($store.getters.overDue(scope.row.overdueDays!=0?1:-1))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.backList_rejectStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row  type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_LIST')">
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

    

    <!-- 底部多出空白 -->
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
      pageTotal: 0,// 当前页数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 还款时间
      searchTime2: [], // 应还时间
      searchTime3: [], // 放款日期
      formInline: {// 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        orderState: '',
        isOverdue: '',
        refundTimeBegin: '',
        refundTimeEnd: '',
        repayTimeBegin: '',
        repayTimeEnd: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        overdueBegin: '',
        overdueEnd: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.backMoney_options, // 订单状态下拉选框信息
      options2: this.$store.state.options.isOverdue_option, // 逾期状态下拉选框信息
      tableData: []// 用户信息数据模拟

    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.backList(val)
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.backList (val)
    },
    backList (val) { // 获取还款列表数据
      if(val){
        this.currentPage = val
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.backmoney_list,
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
    select () { // 点击查询操作
      this.$store.commit('backMoneyList', this.formInline)
      if (this.flag) {
        this.flag = false
        this.backList ()
      }
    },
    putExcel () { // excel下载
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.backMoneyList_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    }
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.refundTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0])
        this.formInline.refundTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1])
      } else {
        this.formInline.refundTimeBegin = ''
        this.formInline.refundTimeEnd = ''
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.repayTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0])
        this.formInline.repayTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1])
      } else {
        this.formInline.repayTimeBegin = ''
        this.formInline.repayTimeEnd = ''
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
    if (JSON.stringify(this.$store.state.common.backMoneyList_select) !== '{}') {
      this.formInline = this.$store.state.common.backMoneyList_select
      if(this.formInline.refundTimeBegin!==''){
        this.searchTime1.push(this.formInline.refundTimeBegin)
        this.searchTime1.push(this.formInline.refundTimeEnd)
      }
      if(this.formInline.repayTimeBegin!==''){
        this.searchTime2.push(this.formInline.repayTimeBegin)
        this.searchTime2.push(this.formInline.repayTimeEnd)
      }
      if(this.formInline.loanTimeBegin!==''){
        this.searchTime3.push(this.formInline.loanTimeBegin)
        this.searchTime3.push(this.formInline.loanTimeEnd)
      }
    }
    this.backList()
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



</style>
