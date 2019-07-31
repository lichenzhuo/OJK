<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('teleMarketing.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('teleMarketing.no43')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('teleMarketing.no43')}}</p>
    </div>

    <search-com 
			:searchData="searchData" 
			@search="search" 
			@putExcel="putExcel" 
			:searchRight="$store.state.common.permiss.includes('RIGHT_PHONE_CHANNEL_TRANSFER_LIST_QUERY')"
			:outputRight="$store.state.common.permiss.includes('RIGHT_PHONE_CHANNEL_TRANSFER_LIST_EXP')"
    ></search-com>
    <!-- -------------搜索查询栏------------------------ -->
    <!-- <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>{{$t('teleMarketing.no6')}}:</span>
          <el-select clearable size="small" v-model="formInline.regChannel" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
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
    </div> -->

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PHONE_CHANNEL_TRANSFER_LIST')">
      <template>
        <el-table :data="tableData" size="small" :summary-method="getSummaries"
          show-summary>
          <el-table-column align="center" prop="createTime" :label="$t('public.no33')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.createTime!==undefined&&scope.row.createTime!==''">{{scope.row.createTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="regChannel" :label="$t('teleMarketing.no42')">
          </el-table-column>
          <el-table-column align="center" prop="userCount" :label="$t('teleMarketing.no39')">
          </el-table-column>
          <el-table-column align="center" prop="distributeCount" :label="$t('teleMarketing.no40')">
          </el-table-column>
          <el-table-column align="center" prop="followCount" :label="$t('teleMarketing.no41')">
          </el-table-column>
          <el-table-column align="center" prop="applyOneRate" :label="$t('teleMarketing.no29')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.applyOneRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="loanOneRate" :label="$t('teleMarketing.no30')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.loanOneRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="applyThreeRate" :label="$t('teleMarketing.no31')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.applyThreeRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="loanThreeRate" :label="$t('teleMarketing.no32')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.loanThreeRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="applySevenRate" :label="$t('teleMarketing.no33')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.applySevenRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="loanSevenRate" :label="$t('teleMarketing.no34')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.loanSevenRate)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PHONE_CHANNEL_TRANSFER_LIST')">
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
import searchCom from 'src/components/public/search.vue'

export default {
  name: 'EverydayMarketingTotal',
  components: { searchCom },
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0,
      searchTime: [],
      condition: {},
      searchData:[],
      formInline: {
        adminId:'',
        beginTime: '',
        endTime: ''
      },
      currentPage: 1,
      tableData:[],
      tableData1:[],
      options1:[],
    }
  },
  methods: {
    updateSearchData() {
      this.searchData = [{
        type: 'select',
        attr: 'regChannel',
        label: this.$t('teleMarketing.no6'),
        option: this.options1,
        value: '',
      }, {
        type: 'rangePicker',
        label: this.$t('public.no33'),
        attr: 'addTime',
        value: [],
      }];
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getTableData();
    },
    getTableData () { // 获取列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0012,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.condition
      };
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data.phoneMarketTransferList;
          this.tableData1 = res.data.data.phoneMarketTransferAll;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    search(condition) { // 搜索
      this.condition = {
        regChannel: condition.regChannel,
        addTimeBegin: condition.addTime&&condition.addTime[0]?this.$store.getters.yyyy_m_d(condition.addTime[0]):'',
        addTimeEnd: condition.addTime&&condition.addTime[1]?this.$store.getters.yyyy_m_d(condition.addTime[1]):'',
      };
      this.currentPage = 1;
      this.getTableData();
    },
    putExcel (condition) { // excel下载操作
      if (this.flag) {
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.PHONEMARKET0012EXP,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          regChannel: condition.regChannel,
          addTimeBegin: condition.addTime&&condition.addTime[0]?this.$store.getters.yyyy_m_d(condition.addTime[0]):'',
          addTimeEnd: condition.addTime&&condition.addTime[1]?this.$store.getters.yyyy_m_d(condition.addTime[1]):'',
        };
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if(res.data.header.code==0){
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
        sums = [
          this.$t('public.addTotal'),
          '-',
          this.tableData1.userCountAll,
          this.tableData1.distributeCountAll,
          this.tableData1.followCountAll,
          this.$store.getters.twoPoint(this.tableData1.applyOneRateAll),
          this.$store.getters.twoPoint(this.tableData1.loanOneRateAll),
          this.$store.getters.twoPoint(this.tableData1.applyThreeRateAll),
          this.$store.getters.twoPoint(this.tableData1.loanThreeRateAll),
          this.$store.getters.twoPoint(this.tableData1.applySevenRateAll),
          this.$store.getters.twoPoint(this.tableData1.loanSevenRateAll),
        ]
      return sums;
    },
    getchannel(){ // 获取渠道下拉框数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0011,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            this.options1.push({value,label:value})
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
    this.getchannel();
    this.updateSearchData();
    
    this.getTableData();
    
  }
}
</script>

<style scoped lang="scss">
  
</style>
