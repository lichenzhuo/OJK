<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('OutsourcedManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('OutsourcedManage.no3')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('OutsourcedManage.no3')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row :gutter="10" type="flex" justify="start">
          <div class="search-input">
            <span>{{$t('OutsourcedManage.no4')}}:</span>
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
          <div class="search-input">
            <span>{{$t('loanAfterManage.name')}}:</span>
            <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('OutsourcedManage.no5')}}:</span>
            <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('OutsourcedManage.no6')}}:</span>
            <el-select clearable size="small" v-model="formInline.type" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ENTRUST_DAILY_REPORT_QUREY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ENTRUST_DAILY_REPORT_EXP')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ENTRUST_DAILY_REPORT_LIST')">
      <template>
        <el-table :data="tableData" size="small" :summary-method="getSummaries"
          show-summary>
          <el-table-column align="center" prop="strCreateTime" :label="$t('OutsourcedManage.no4')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.strCreateTime!=''">{{scope.row.strCreateTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('OutsourcedManage.no5')">
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('loanAfterManage.name')">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('OutsourcedManage.no6')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.collectionStatus(scope.row.type))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="allCollection" :label="$t('OutsourcedManage.no26')">
          </el-table-column>
          <el-table-column align="center" prop="allMoney" :label="$t('OutsourcedManage.no27')">
            <template slot-scope="scope">
              <span v-if="scope.row.allMoney!==null&&scope.row.allMoney!==undefined&&scope.row.allMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.allMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnCount" :label="$t('OutsourcedManage.no28')">
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('OutsourcedManage.no29')">
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnCountRate" :label="$t('OutsourcedManage.no30')+'('+$t('totalManage.order')+')'">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.returnCountRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnMoneyRate" :label="$t('OutsourcedManage.no30')+'('+$t('totalManage.money')+')'">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.returnMoneyRate)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end" v-if="$store.state.common.permiss.includes('RIGHT_ENTRUST_DAILY_REPORT_LIST')">
      <div class="pages">
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
  name: 'everyDayOutsourcedTotal',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [],
      // 用户查询信息数据对应字段
      formInline: {
        groupId:'',
        adminId:'',
        type:'',
        distributionTimeBegin: '',
        distributionTimeEnd: ''
      },
      options1:[],// 委外公司下拉框
      options2:[],// 委外阶段下拉框
      options3: [], // 在职催收员列表
      currentPage: 1,// 当前页下标
      tableData:[],// 列表数据1
      tableData1:[],// 列表数据2
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
      this.formList()
    },
    formList () { // 获取回款率列表
      this.tableData1 = []
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.outSourcedList_total,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data.dailyRepost;
          this.tableData1 = res.data.data.dailyRepostTotal;
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
            action: this.$store.state.actionMap.outSourcedList_total_excel,
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
    getOutCompany () { // 获取委外公司名称
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_groupName,
          'sessionid': this.sessionid
        },
        outSource:2,
        type:2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data
          arr.forEach(value => {
            value.value = value.id
            value.label = value.groupName
          })
          this.options1 = arr;
        }
      })
    },
    collectionPeople () { // 获取催收人员列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        status: 1,
        type:0,
        outSource:2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data
          arr.forEach(value => {
            value.value = value.id
            value.label = value.name
          })
          this.options3 = arr
        }
      })
    },
    getcollectionType(){ // 获取催收阶段
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
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName
            value.value = value.optionValue
          })
          this.options2 = arr;
        }
      })
    },
    getSummaries() {// 总和
      const sums = [
        this.$t('public.addTotal'),
        '-',
        '-',
        '-',
        this.tableData1.allCollection,
        this.$store.getters.moneySplit(this.tableData1.allMoney),
        this.tableData1.returnCount,
        this.$store.getters.moneySplit(this.tableData1.returnMoney),
        this.$store.getters.twoPoint(this.tableData1.returnCountRate),
        this.$store.getters.twoPoint(this.tableData1.returnMoneyRate),
      ];
      return sums;
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.distributionTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.distributionTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.distributionTimeBegin = '';
        this.formInline.distributionTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.formList();
    this.getOutCompany();
    this.getcollectionType();// 获取催收阶段
    this.collectionPeople();// 获取催收人员
  }
}
</script>
<style scoped lang="scss">

</style>
