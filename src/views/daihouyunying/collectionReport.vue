<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterOperation.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterOperation.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanAfterOperation.crumbsTwo')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>{{$t('totalManage.timeSelect')}}:</span>
          <el-date-picker 
            id="date1"
            v-model="searchTime" 
            size="small"
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_RPT_QUERY')">
          <div class="search-input">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_RPT_LIST')">
      <template>
        <el-table :data="tableData" size="small" :summary-method="getSummaries"
          show-summary>
          <el-table-column align="center" prop="strRepaymentTime" :label="$t('public.no33')" width="160">
          </el-table-column>
          <el-table-column align="center" prop="collectionCnt" :label="$t('loanAfterOperation.collectionCnt')">
          </el-table-column>
          <el-table-column align="center" prop="repaymentAmount" :label="$t('loanAfterOperation.repaymentAmount')">
            <template slot-scope="scope">
              <span v-if="scope.row.repaymentAmount!==null&&scope.row.repaymentAmount!==undefined&&scope.row.repaymentAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.repaymentAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="repaymentAmountRate" :label="$t('loanAfterOperation.collectionRate')">
            <template slot-scope="scope">
              <span v-if="scope.row.repaymentAmountRate!==null&&scope.row.repaymentAmountRate!==undefined&&scope.row.repaymentAmountRate!==''">{{scope.row.repaymentAmountRate}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="collectionRate" :label="$t('loanAfterOperation.repaymentAmountRate')">
            <template slot-scope="scope">
              <span v-if="scope.row.collectionRate!==null&&scope.row.collectionRate!==undefined&&scope.row.collectionRate!==''">{{scope.row.collectionRate}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_RPT_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'collectionReport',
  data () {
    return {
      sessionid: '',
      flag: true, // 点击按钮开关
      searchTime: [], // 用户查询信息数据对应字段
      pageTotal: 0, // 分页总数
      formInline: {// 点击查询信息对应字段
        dayBegin: '',
        dayEnd: ''
      },
      currentPage: 1, // 当前页下标
      tableData: [],// 列表数据模拟
      tableData1:[]
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.dataList();
    },
    socialDetali (id) {
      this.$router.push({path: '/userdetail?id=' + id});
    },
    dataList () { // 获取数据列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.loanOperation_list,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data.reportCollectionList;
          this.tableData1 = res.data.data.reportCollectionCount;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () {
      this.$store.commit('cuihuiTotalList', this.formInline);
      if (this.flag) {
        this.flag = false;
        this.dataList();
      }
    },
    getSummaries() {
      const sums = [
        this.$t('public.addTotal'),
        this.tableData1.collectionCnt,
        this.$store.getters.moneySplit(this.tableData1.repaymentAmount),
        '-',
        '-',
        '-',
      ];
      return sums;
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.dayBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.dayEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.dayBegin = '';
        this.formInline.dayEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.cuihuiTotalList_select) !== '{}') {
      this.formInline = this.$store.state.common.cuihuiTotalList_select;
      if(this.formInline.dayBegin!==''){
        this.searchTime.push(this.formInline.dayBegin);
        this.searchTime.push(this.formInline.dayEnd);
      }
      
    }
    this.dataList()
  }
}
</script>
<style scoped lang="scss">

</style>
