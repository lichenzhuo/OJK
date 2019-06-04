<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('riskManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('add.no17')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="paixu">
      <span></span>
      <p>{{$t('add.no17')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" :gutter="10" justify="start">
        <div class="search-input">
          <span>{{$t('add.no43')}}:</span>
          <el-date-picker 
            size="small"
            v-model="searchTime"
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        
        <div class="search-input"
          v-if="$store.state.common.permiss.includes('RIGHT_MANUAL_REVIEW_DATA_STATISTICS_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
        
        <div class="search-input"
          v-if="$store.state.common.permiss.includes('RIGHT_MANUAL_REVIEW_DATA_STATISTICS_EXP')">
          <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
      </el-row>
    </div>
    
    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_MANUAL_REVIEW_DATA_STATISTICS_LIST')">
      <template>
        <el-table size="small" :data="tableData" :summary-method="getSummaries"
          show-summary>
          <el-table-column align="center" prop="strApproveTime" :label="$t('add.no43')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.strApproveTime!=''">{{(scope.row.strApproveTime).slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('public.no32')">
          </el-table-column>
          <el-table-column align="center" prop="newCustomerOrders" :label="$t('add.no19')">
          </el-table-column>
          <el-table-column align="center" prop="newCustomerPassOrders" :label="$t('add.no20')">
          </el-table-column>
          <el-table-column align="center" label-class-name="red" prop="newCustomerPassRate" :label="$t('add.no21')">
            <template slot-scope="scope">
              <span class="red" v-if="scope.row.newCustomerPassRate!=''">{{$store.getters.twoPoint(scope.row.newCustomerPassRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label-class-name="red" prop="newCustomerOverRate" :label="$t('add.no22')">
            <template slot-scope="scope">
              <span class="red" v-if="scope.row.newCustomerOverRate!=''">{{$store.getters.twoPoint(scope.row.newCustomerOverRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="oldCustomerOrders" :label="$t('add.no23')">
          </el-table-column>
          <el-table-column align="center" prop="oldCustomerPassOrders" :label="$t('add.no24')">
          </el-table-column>
          <el-table-column align="center" label-class-name="red" prop="oldCustomerPassRate" :label="$t('add.no25')">
            <template slot-scope="scope">
              <span class="red" v-if="scope.row.oldCustomerPassRate!=''">{{$store.getters.twoPoint(scope.row.oldCustomerPassRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label-class-name="red" prop="oldCustomerOverRate" :label="$t('add.no26')">
            <template slot-scope="scope">
              <span class="red" v-if="scope.row.oldCustomerOverRate!=''">{{$store.getters.twoPoint(scope.row.oldCustomerOverRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label-class-name="green"  prop="customerPassRate" :label="$t('add.no27')">
            <template slot-scope="scope">
              <span class="green" v-if="scope.row.customerPassRate!=''">{{$store.getters.twoPoint(scope.row.customerPassRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label-class-name="green"  prop="customerOverRate" :label="$t('add.no28')">
            <template slot-scope="scope">
              <span class="green" v-if="scope.row.customerOverRate!=''">{{$store.getters.twoPoint(scope.row.customerOverRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="successRate" :label="$t('riskManage.successRate')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.successRate!=''">{{$store.getters.twoPoint(scope.row.successRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column> -->
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_MANUAL_REVIEW_DATA_STATISTICS_LIST')">
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
  name: 'peopleAuditDataSelect',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询日期
      flag: true,
      formInline: {// 用户查询信息数据对应字段
        approveTimeBegin: '',
        approveTimeEnd: '',
      },
      currentPage: 1, // 当前页下标
      tableData: [],// 列表数据模拟
      tableData1: [],// 列表数据模拟
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.getTableData();
    },
    handleCurrentChange (val) { // 点击分页按钮操作
      this.currentPage = val;
      this.getTableData();
    },
    select () { // 点击查询按钮操作
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.getTableData();
      }
    },
    getTableData () { // 获取人工审核统计列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0015,
          'page': {'index': this.currentPage, 'size': this.pageNumber },
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data.reviewData;
          this.tableData1 = res.data.data.reviewDataAll;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    putExcel () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0016,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let title = res.data.data.titles;
          let fields = res.data.data.fields;
          let data = res.data.data.data;
          this.$export2Excel(title,fields,data);
        }
      })
    },
    getSummaries() {// 总和
      const sums = [
        this.$t('public.addTotal'),
        '-',
        this.tableData1.newCustomerOrders,
        this.tableData1.newCustomerPassOrders,
        this.$store.getters.twoPoint(this.tableData1.newCustomerPassRate)+'%',
        this.$store.getters.twoPoint(this.tableData1.newCustomerOverRate)+'%',
        this.tableData1.oldCustomerOrders,
        this.tableData1.oldCustomerPassOrders,
        this.$store.getters.twoPoint(this.tableData1.oldCustomerPassRate)+'%',
        this.$store.getters.twoPoint(this.tableData1.oldCustomerOverRate)+'%',
        this.$store.getters.twoPoint(this.tableData1.customerPassRate)+'%',
        this.$store.getters.twoPoint(this.tableData1.customerOverRate)+'%'
        // this.$store.getters.twoPoint(this.tableData1.reviewSuccessRateCounts)+'%',
      ];
      return sums;
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.approveTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.approveTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.approveTimeBegin = '';
        this.formInline.approveTimeEnd = '';
      }
    }

  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableData();
  }
}
</script>
<style scoped lang="scss">

</style>
