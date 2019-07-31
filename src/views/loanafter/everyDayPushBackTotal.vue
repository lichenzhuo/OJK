<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsFive')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanAfterManage.crumbsFive')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>{{$t('loanAfterManage.name')}}:</span>
          <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('loanAfterManage.type1')}}:</span>
          <el-select size="small" clearable v-model="formInline.type" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no20')}}:</span>
          <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no21')}}:</span>
          <el-select clearable size="small" v-model="formInline.leaderId" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,index) in options4" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('totalManage.timeSelect')}}:</span>
          <el-date-picker 
            id="date1"
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_COLLECTION_STATISTICS_DAY_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_COLLECTION_STATISTICS_DAY_EXP')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_COLLECTION_STATISTICS_DAY_LIST')">
      <template>
        <el-table :data="tableData" stripe size="small" :summary-method="getSummaries"
          show-summary>
          <el-table-column align="center" prop="reportTime" :label="$t('public.no33')" width="160">
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('loanAfterManage.name')">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('loanAfterManage.type1')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.collectionStatus(scope.row.type))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('new.no18')">
          </el-table-column>
          <el-table-column align="center" prop="leaderName" :label="$t('new.no19')">
          </el-table-column>
          <el-table-column align="center" prop="allCollection" :label="$t('loanAfterManage.num')">
          </el-table-column>
          <el-table-column align="center" prop="allMoney" :label="$t('loanAfterManage.money')">
            <template slot-scope="scope">
              <span v-if="scope.row.allMoney!==null&&scope.row.allMoney!==undefined&&scope.row.allMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.allMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_COLLECTION_STATISTICS_DAY_LIST')">
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
import fendanTable from '../../components/component/fendantable'

export default {
  name: 'everyDayPushBackTotal',
  components: {
    fendanTable
  },
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      flag: true,
      searchTime: [], // 查询时间
      formInline: {// 用户查询信息数据对应字段
        adminId: '',
        type: '',
        groupId: '',
        leaderId: '',
        beginTime: '',
        endTime: ''
      },
      options2: [], // 催收员列表
      options3: [], // 组名列表
      options4: [], // 组长列表
      currentPage: 1, // 当前页下标
      options1: [], // 催收状态下拉选框信息
      tableData: [], // 表单信息数据模拟
      tableData1:[]
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.rucuiList();
    },
    rucuiList () { // 获取入催订单列表
      this.tableData1 = [];
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.todayCollection_list,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data.collectionReportList;
          this.tableData1 = res.data.data.allRecallSum;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 查询按钮点击操作
      this.tableData1 = [];
      this.$store.commit('todaycuihuiList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.rucuiList();
      }
    },
    operationAdmin () { // 获取全部催收员列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        status: 1,
        type:0,
        outSource:1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options2 = arr;
        }
      })
    },
    groupList () { // 获取组名列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_groupName,
          'sessionid': this.sessionid
        },
        type: 2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options3.push({value: value.id, label: value.groupName});
          })
        }
      })
    },
    leaderName_option () { // 获取组长列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_leaderName,
          'sessionid': this.sessionid
        },
        type: 2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options4.push({value: value.leaderId, label: value.leaderName});
          })
        }
      })
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.todayCollection_list_excel,
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
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.options1 = arr;
        }
      })
    },
    getSummaries() {
      const sums = [
        this.$t('public.addTotal'),
        '-',
        '-',
        '-',
        '-',
        this.tableData1.collectionAllCount,
        this.tableData1.allRecallAmount,
      ];
      return sums;
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.beginTime = this.searchTime[0];
        this.formInline.endTime = this.searchTime[1];
      } else {
        this.formInline.beginTime = '';
        this.formInline.endTime = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.todaycuihuiList_select) !== '{}') {
      this.formInline = this.$store.state.common.todaycuihuiList_select;
      if(this.formInline.beginTime!==''){
        this.searchTime.push(this.formInline.beginTime);
        this.searchTime.push(this.formInline.endTime);
      }
    }
    this.rucuiList();// 获取没日催回统计列表
    this.operationAdmin();// 获取催收员列表
    this.groupList();// 获取组员列表
    this.leaderName_option();// 获取组长列表
    this.getcollectionType();// 获取催收阶段
  }

}
</script>
<style scoped lang="scss">

</style>
