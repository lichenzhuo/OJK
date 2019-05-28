<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('serviceManage.crumbsFive')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('serviceManage.crumbsFive')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input" v-if="$store.state.common.lang!=='PHL'">
          <span>{{$t('add.no12')}}:</span>
          <el-select size="small" v-model="formInline.remindType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in remindType" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no87')}}:</span>
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
        <div class="search-input">
          <span>{{$t('public.CreateTime')}}:</span>
          <el-date-picker 
            v-model="searchTime1" 
            size="small"
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <!-- 优惠券状态 -->
        <div class="search-input">
          <span>{{$t('serviceManage.service')}}:</span>
          <el-select clearable size="small" filterable v-model="formInline.customerServicerId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_STATISTICS_QUERY')">
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_LIST_EXP')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_STATISTICS_LIST')">
      <template>
        <el-table :data="tableData" size="small" :summary-method="getSummaries"
          show-summary>
          <el-table-column align="center" prop="strDateTime" :label="$t('public.no87')" width="140">
          </el-table-column>
          <el-table-column align="center" prop="strMustRefundTime" :label="$t('public.CreateTime')" width="140">
          </el-table-column>
          <el-table-column align="center" prop="servicerName" :label="$t('serviceManage.service')">
          </el-table-column>
          <template v-if="$store.state.common.lang!=='PHL'">
            <el-table-column align="center" prop="remindType" :label="$t('add.no12')">
              <template slot-scope="scope">
                <span >{{$store.getters.serveStatus(scope.row.remindType)}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="assignOrderCount" :label="$t('serviceManage.no1')">
          </el-table-column>
          <el-table-column align="center" prop="reminderOrderCount" :label="$t('serviceManage.no2')">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="normalRepaidOrderCount" :label="$t('yuenan.no28')">
            </el-table-column>
            <el-table-column align="center" prop="overDueRepaidOrderCount" :label="$t('yuenan.no29')">
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" prop="repaidOrderCount" :label="$t('serviceManage.no3')">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="noRepaidOrderCount" :label="$t('serviceManage.no4')">
          </el-table-column>
        </el-table>
      </template>
    </div>
    
    

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_STATISTICS_LIST')">
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
  name: 'myOveDateRemindTotal',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [],
      searchTime1: [],
      // 用户查询信息数据对应字段
      formInline: {
        remindType: '',
        distributionBeginTime: '',
        distributionEndTime: '',
        mustRefundBeginTime: '',
        mustRefundEndTime: '',
        customerServicerId: ''
      },
      options1:[],// 客服员下拉框列表
      remindType:[],// 客服员下拉框列表
      currentPage: 1,// 当前页下标
      tableData:[],// 用户信息数据模拟
      tableData1:[],// 用户信息数据模拟
      rowStyle:{
        backgroundColor:'rgb(241,241,241)'
      }
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.formList();
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.formList();
    },
    formList () { // 获取回款率列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_total,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data.reminderStatistics;
          this.tableData1 = res.data.data.reminderStatisticsAll;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 搜索栏查询按钮点击操作
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.formList();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.kf_total_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
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
    getServerPeople () { // 获取客服员下拉框
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_people_option,
          'sessionid': this.sessionid
        },
        type: 3,
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        if(res.data.header.code==0){
          res.data.data.forEach(value=>{
            this.options1.push({value:value.id,label:value.name})
          })
        }
      })
    },
    getSummaries() {// 总和
      let sums;
      if(this.$store.state.common.lang==='vi'){
        sums = [
          this.$t('public.addTotal'),
          '-',
          '-',
          '-',
          this.tableData1.assignOrderCount,
          this.tableData1.reminderOrderCount,
          this.tableData1.normalRepaidOrderCount,
          this.tableData1.overDueRepaidOrderCount,
          this.tableData1.noRepaidOrderCount,
        ]
      }else if(this.$store.state.common.lang==='id'){
        sums = [
          this.$t('public.addTotal'),
          '-',
          '-',
          '-',
          this.tableData1.assignOrderCount,
          this.tableData1.reminderOrderCount,
          this.tableData1.repaidOrderCount,
          this.tableData1.noRepaidOrderCount,
        ]
      }else{
        sums = [
          this.$t('public.addTotal'),
          '-',
          '-',
          this.tableData1.assignOrderCount,
          this.tableData1.reminderOrderCount,
          this.tableData1.repaidOrderCount,
          this.tableData1.noRepaidOrderCount,
        ]
      }
      return sums;
    },
    getremindTypes(){ // 获取催收阶段
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'customer.type'
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.remindType = arr;
        }
      })
    },
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.distributionBeginTime = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.distributionEndTime = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.distributionBeginTime = '';
        this.formInline.distributionEndTime = '';
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.mustRefundBeginTime = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.mustRefundEndTime = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.mustRefundBeginTime = '';
        this.formInline.mustRefundEndTime = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.formList();
    this.getServerPeople();
    this.getremindTypes();
  }
}
</script>
<style scoped lang="scss">

</style>
