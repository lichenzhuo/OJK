<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('teleMarketing.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('teleMarketing.no5')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('teleMarketing.no5')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>{{$t('teleMarketing.no7')}}:</span>
          <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in adminOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no33')}}:</span>
          <el-date-picker 
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_CONVERT_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_CONVERT_EXP')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_CONVERT_LIST')">
      <template>
        <el-table :data="tableData" size="small" >
          <el-table-column align="center" prop="strTime" :label="$t('teleMarketing.no27')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.strTime!==undefined&&scope.row.strTime!==''">{{scope.row.strTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('teleMarketing.no7')">
          </el-table-column>
          <el-table-column align="center" prop="assignCount" :label="$t('teleMarketing.no22')">
          </el-table-column>
          <el-table-column align="center" prop="followCount" :label="$t('teleMarketing.no23')">
          </el-table-column>
          <el-table-column align="center" prop="oneDayApplyPercent" :label="$t('teleMarketing.no29')">
          </el-table-column>
          <el-table-column align="center" prop="oneDayLoanPercent" :label="$t('teleMarketing.no30')">
          </el-table-column>
          <el-table-column align="center" prop="threeDayApplyPercent" :label="$t('teleMarketing.no31')">
          </el-table-column>
          <el-table-column align="center" prop="threeDayLoanPercent" :label="$t('teleMarketing.no32')">
          </el-table-column>
          <el-table-column align="center" prop="sevenDayApplyPercent" :label="$t('teleMarketing.no33')">
          </el-table-column>
          <el-table-column align="center" prop="sevenDayLoanPercent" :label="$t('teleMarketing.no34')">
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MARKET_CONVERT_LIST')">
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
  name: 'EverydayMarketingTotal',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0,
      searchTime: [],
      formInline: {
        adminId:'',
        beginTime: '',
        endTime: ''
      },
      currentPage: 1,
      tableData:[],
      tableData1:[],
      adminOptions:[],
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getTableData();
    },
    getTableData () { // 获取列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKETCONVERT0001,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 搜索栏查询按钮点击操作
      this.$store.commit('rateOfReturn', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.getTableData();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.PHONEMARKETCONVERT0002,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          ...this.formInline
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    },
    getSummaries() {// 总和
      let sums;
      if(this.$store.state.common.lang!=='PHL'){
        sums = [
          this.$t('public.addTotal'),
          '-',
          this.tableData1.shouldReturnCount,
          this.$store.getters.moneySplit(this.tableData1.receivableAmount),
          this.tableData1.refundCount,
          this.$store.getters.moneySplit(this.tableData1.refundAmount),
          this.tableData1.unpaidCount,
          this.$store.getters.moneySplit(this.tableData1.unpaidAmount),
          this.$store.getters.twoPoint(this.tableData1.firstOverRefundCountRate),
          this.$store.getters.twoPoint(this.tableData1.firstOverRefundAmountRate),
          this.$store.getters.twoPoint(this.tableData1.moneyRate),
          this.$store.getters.twoPoint(this.tableData1.countRate),
        ]
      }else{
        sums = [
          this.$t('public.addTotal'),
          this.tableData1.shouldReturnCount,
          this.$store.getters.moneySplit(this.tableData1.receivableAmount),
          this.tableData1.refundCount,
          this.$store.getters.moneySplit(this.tableData1.refundAmount),
          this.tableData1.unpaidCount,
          this.$store.getters.moneySplit(this.tableData1.unpaidAmount),
          this.$store.getters.twoPoint(this.tableData1.moneyRate),
          this.$store.getters.twoPoint(this.tableData1.countRate),
        ]
      }
      return sums;
    },
    getpeople(){ // 获取电销员下拉框
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_people_option,
          'sessionid': this.sessionid
        },
        outSource: 1,
        type: 4
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value=>{
            this.adminOptions.push({value:value.id,label:value.name})
          })
        }
      })
    },
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.beginTime = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.endTime = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.beginTime = '';
        this.formInline.endTime = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableData();
    this.getpeople();
  }
}
</script>

<style scoped lang="scss">
  
</style>
