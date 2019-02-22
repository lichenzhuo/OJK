<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanMoney.title3')}}</p>
    </div>

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
        <template v-if="$store.state.common.lang==='vi'">
          <el-col :md="8" :lg="5" :xl="4">
            <div class="search-input">
              <span>{{$t('public.no2')}}:</span>
              <el-input size="small" label="idCard" v-model="formInline.idCard"></el-input>
            </div>
          </el-col>
        </template>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.lang==='vi'">
          <div class="search-input">
            <span>{{$t('websiteLoans.no5')}}:</span>
            <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        <div class="search-input">
          <span>{{$t('public.CreateDate')}}:</span>
          <el-date-picker 
            id="create-time"
            size="small"
            v-model="searchTime" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <div class="search-input">
          <span>{{$t('public.no82')}}:</span>
          <form autocomplete="off">
            <el-date-picker 
              id="fangkuan-time"
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_QUERY')">
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
        </template>
        
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_EXP')">
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe >
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" >
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" >
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" >
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="idCard" :label="$t('public.no2')" >
            </el-table-column>
            <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')" >
              <template slot-scope="scope">
                <span>{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" >
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')+'('+$t('public.no26')+')'" >
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no82')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" >
            <template slot-scope="scope" >
              <span v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENGING_CONFIRM')&&scope.row.status!=43&&$store.state.common.lang!=='PHL'" class="table_opr"  @click="sure(scope.row.orderNo)">{{$t('public.no67')}}</span>
              <span v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_SHOW')" class="table_opr"  @click="detail(scope.row.orderNo,scope.row.userId)">{{$t('public.no29')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_LIST')">
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

    <!-- ------------------ 点击查看详情弹窗开始 -------------------- -->
    <!-- <div v-if="surePutFlag" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p>{{$t('public.no67')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="surePutFlag=false"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-con-one" style="width:100%;height:auto;padding:10px 0;margin-bottom:5px;">
            <span>{{$t('loanMoney.resultStatus')}}: </span><span>{{resultStatus?resultStatus:$store.state.common.nullData}} </span>
          </div>
          <div class="detail-con-one" style="width:100%;height:auto;padding:10px 0;margin-bottom:5px;">
            <span>{{$t('loanMoney.resultDesc')}}: </span> <span>{{resultDesc?resultDesc:$store.state.common.nullData}}</span>
          </div>
        </div>
      </div>
    </div> -->

    <el-dialog :title="$t('public.no67')" :visible.sync="surePutFlag" width="650px">
      <div class="left2right mt15">
        <span class="left">{{$t('loanMoney.resultStatus')}}:</span>
        <div class="right">
          {{resultStatus?resultStatus:$store.state.common.nullData}}
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanMoney.resultDesc')}}:</span>
        <div class="right">
          {{resultDesc?resultDesc:$store.state.common.nullData}}
        </div>
      </div>
    </el-dialog>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'putMoneyList',
  data () {
    return {
      sessionid: '',
      clickFlag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询时间
      searchTime1: [], // 查询时间
      formInline: { // 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        idCard: '',
        orderLoanType: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        orderState: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.putMoney_options, // 订单状态下拉选框信息
      options2: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      tableData: [], // 借款信息数据模拟
      surePutFlag: true, // 详情弹窗
      orderNo: '', // 点击当前行的订单ID
      resultStatus: '3213123', // 向支付通道返回的结果状态码
      resultDesc: '3123213'// 向支付通道返回的结果描述
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.putList();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.putList();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('putMoneyList', this.formInline);
      if (this.clickFlag) {
        this.clickFlag = false;
        this.putList();
      }
    },
    putExcel () {
      if (this.clickFlag) {
        this.clickFlag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.putMoneyList_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
        }
        this.$axios.post('', option).then(res => {
          this.clickFlag = true;
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    },
    putList () { // 放款列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.putmoney_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.clickFlag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    sure (id) { // 确认放款款弹窗
      this.orderNo = id;
      this.surePutFlag = true;
      // this.putMoneyResult();
    },
    putMoneyResult () { // 点击确认放款按钮项第三方查询结果
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.putmoney_result,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.resultStatus = res.data.data.transferStatus;
          this.resultDesc = res.data.data.transferStatusDesc;
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    },
    detail (orderNo, userId) { // 查看详情操作
      this.$router.push({path: '/loanmoneydetail', query: {userId, orderNo}})
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.applyTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.applyTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.applyTimeBegin = '';
        this.formInline.applyTimeEnd = '';
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.loanTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.loanTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.loanTimeBegin = '';
        this.formInline.loanTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.putMoneyList_select) !== '{}') {
      this.formInline = this.$store.state.common.putMoneyList_select;
      if(this.formInline.applyTimeBegin!==''){
        this.searchTime.push(this.formInline.applyTimeBegin);
        this.searchTime.push(this.formInline.applyTimeEnd);
      }
    }
    this.putList();// 放款列表数据
  }
}
</script>
<style scoped lang="scss">

</style>
