<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('riskManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('riskManage.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="paixu">
      <span></span>
      <p>{{$t('riskManage.title3')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" :gutter="10" justify="start">
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('public.no32')}}:</span>
            <el-input size="small" label="name" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>{{$t('new.no20')}}:</span>
          <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no21')}}:</span>
          <el-select clearable size="small" v-model="formInline.leaderId" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,index) in options3" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('riskManage.selectTime')}}:</span>
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
        v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_RPT_REVIEW_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
        <div class="search-input"
        v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_RPT_REVIEW_EXP')">
          <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
      </el-row>
      
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_RPT_REVIEW_LIST')">
      <template>
        <el-table ref="multipleTable" size="small" :data="tableData" empty-text >
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.no33')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.strCreateTime!=''">{{(scope.row.strCreateTime).slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('public.no32')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('new.no18')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="leaderName" :label="$t('new.no19')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="approveType" :label="$t('loanMoneyDetail.opeType2')" min-width="100">
            <template slot-scope="scope">
              <span>{{$t($store.getters.auditType(scope.row.approveType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="reviewCount" :label="$t('riskManage.reviewCount')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="successCount" :label="$t('riskManage.successCount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="failCount" :label="$t('riskManage.failCount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="successRate" :label="$t('riskManage.successRate')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.successRate!=''">{{$store.getters.twoPoint(scope.row.successRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueCount" :label="$t('new.no3')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="overdueRate" :label="$t('new.no4')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueRate!=''">{{$store.getters.twoPoint(scope.row.overdueRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-table  size="small" :row-style="rowStyle" :data="tableData1" :row-class-name="tableRowClassName" :show-header="false" style="width:100%">
      <el-table-column align="center" prop="strCreateTime" :label="$t('public.no33')" width="140">
        <template slot-scope="scope">
          <span>{{$t('public.addTotal')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="adminName" :label="$t('public.no32')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="groupName" :label="$t('new.no18')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="leaderName" :label="$t('new.no19')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="approveType" :label="$t('loanMoneyDetail.opeType2')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="reviewCounts" :label="$t('riskManage.reviewCount')" min-width="80">
      </el-table-column>
      <el-table-column align="center" prop="successCounts" :label="$t('riskManage.successCount')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="failCounts" :label="$t('riskManage.failCount')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="successRateCounts" :label="$t('riskManage.successRate')" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.successRateCounts!=''">{{$store.getters.twoPoint(scope.row.successRateCounts)}}%</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="overdueCounts" :label="$t('new.no3')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="overdueRateCounts" :label="$t('new.no4')" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.overdueRateCounts!=''">{{$store.getters.twoPoint(scope.row.overdueRateCounts)}}%</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_RPT_REVIEW_LIST')">
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
  name: 'peopleSecondAuditTotal',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询日期
      flag: true,
      formInline: {// 用户查询信息数据对应字段
        applyTimeBegin: '',
        applyTimeEnd: '',
        name: '',
        leaderId: '',
        groupId: ''
      },
      currentPage: 1, // 当前页下标
      options1: [], // 组名下拉选框信息
      options3: [], // 组长下拉选框信息
      tableData: [],// 列表数据模拟
      tableData1: [],// 列表数据模拟
      rowStyle:{
        backgroundColor:'rgb(241,241,241)'
      }
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.tongji();
    },
    handleCurrentChange (val) { // 点击分页按钮操作
      this.currentPage = val;
      this.tongji();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('rengongfushentongjiList', this.formInline);
      if (this.flag) {
        this.flag = false;
        this.tongji();
      }
    },
    tongji () { // 获取人工审核统计列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.auditTwo_people,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data[0];
          this.tableData1 = res.data.data[1];
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    putExcel () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.auditTwo_people_excel,
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
    groupList () { // 获取组名列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_groupName,
          'sessionid': this.sessionid
        },
        type: 1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options1.push({value: value.id, label: value.groupName});
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
        type: 1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options3.push({value: value.leaderId, label: value.leaderName});
          })
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'warning-row';
      }
      return '';
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
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.rengongfushentongji_select) !== '{}') {
      this.formInline = this.$store.state.common.rengongfushentongji_select;
      if(this.formInline.applyTimeBegin!==''){
        this.searchTime.push(this.formInline.applyTimeBegin);
        this.searchTime.push(this.formInline.applyTimeEnd);
      }
    }
    this.tongji();// 获取人工审核统计列表
    this.groupList();// 获取人工审核统计列表
    this.leaderName_option();// 获取人工审核统计列表
  }
}
</script>
<style scoped lang="scss">

</style>
