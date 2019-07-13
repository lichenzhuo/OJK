<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('totalManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('totalManage.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('totalManage.crumbsFour')}}</p>
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
        <div class="search-input" v-if="$store.state.common.lang!=='PHL'">
          <span>{{$t('public.no25')}}:</span>
          <el-select clearable size="small" v-model="formInline.period" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        
        <div class="search-input">
          <span>{{$t('channelManage.name')}}:</span>
          <el-select clearable size="small" v-model="formInline.mediaSource" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_REPORT_PASS_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_REPORT_PASS_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table">
      <template>
        <el-table :data="tableData" size="small" :summary-method="getSummaries"
          show-summary>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.strCreateTime!==null&&scope.row.strCreateTime!==undefined&&scope.row.strCreateTime!==''">{{scope.row.strCreateTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no25')" v-if="$store.state.common.lang!=='PHL'">
          </el-table-column>
          <el-table-column align="center" prop="applyCount" :label="$t('totalManage.applyCount')">
          </el-table-column>
          <el-table-column align="center" prop="machineCount" :label="$t('totalManage.machineCount')">
          </el-table-column>
          <el-table-column align="center" prop="firstCount" :label="$t('totalManage.firstCount')">
          </el-table-column>
          <el-table-column align="center" prop="reviewCount" :label="$t('totalManage.reviewCount')">
          </el-table-column>
          <el-table-column v-if="$store.state.common.lang!=='PHL'" align="center" prop="machinePassRate" :label="$t('add.no13')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.machinePassRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="$store.state.common.lang!=='PHL'" align="center" prop="manualReviewPassRate" :label="$t('add.no14')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.manualReviewPassRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="$store.state.common.lang!=='PHL'" align="center" prop="lendRate" :label="$t('add.no15')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.lendRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="laveCount" :label="$t('totalManage.laveCount')">
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages">
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
  name: 'userManage',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0,
      searchTime: [],
      // 用户查询信息数据对应字段
      formInline: {
        period: '',
        mediaSource: '',
        dayBegin: '',
        dayEnd: ''
      },
      currentPage: 1, // 当前页下标
      // 用户信息数据模拟
      tableData: [],
      tableData1: [],
      options1: [],
      options2: [],
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.getTableData();
    },
    getTableData () { // 获取通过率列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.through_rate,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data[0];
          this.tableData1 = res.data.data[1][0];
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 搜索栏查询按钮点击操作
      this.$store.commit('passingRate', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.getTableData();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.through_rate_excel,
            'page': {'index': this.currentPage, 'size': 10},
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
    },
    getSummaries() {// 总和
      let sums;
      if(this.$store.state.common.lang!=='PHL'){
        sums = [
          this.$t('public.addTotal'),
          '-',
          this.tableData1.applyCounts,
          this.tableData1.machineCounts,
          this.tableData1.firstCounts,
          this.tableData1.reviewCounts,
          this.$store.getters.twoPoint(this.tableData1.machinePassRateAll),
          this.$store.getters.twoPoint(this.tableData1.manualReviewPassRateAll),
          this.$store.getters.twoPoint(this.tableData1.lendRateAll),
          this.tableData1.laveCounts,
        ]
      }else{
        sums = [
          this.$t('public.addTotal'),
          this.tableData1.applyCounts,
          this.tableData1.machineCounts,
          this.tableData1.firstCounts,
          this.tableData1.reviewCounts,
          this.tableData1.laveCounts,
        ]
      }
      return sums;
    },
    getchannel(){ // 获取渠道下拉框数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
          'sessionid': this.sessionid
        },
        'optionGroup': this.$store.state.common.lang==='PHL'?'appsflyer.media.source':'media.source'
      };
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.optionName;
            value.label = value.optionName;
          })
          this.options2 = arr;
        }
      })
    },
    getPeriod(){// 获取借款周期下拉框
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.REPORT0007,
          'sessionid': this.sessionid
        }
      };
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.productPeriod;
            value.label = value.productPeriod;
          })
          this.options1 = arr;
        }
      })
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
    if (JSON.stringify(this.$store.state.common.tongguolv_select) !== '{}') {
      this.formInline = this.$store.state.common.tongguolv_select;
      if(this.formInline.dayBegin!==''){
        this.searchTime.push(this.formInline.dayBegin);
        this.searchTime.push(this.formInline.dayEnd);
      }
    }
    this.getTableData();
    this.getchannel();
    this.getPeriod();
  }
}
</script>
<style scoped lang="scss">

</style>
