<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('riskManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('riskManage.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('riskManage.title3')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" :gutter="20" justify="start">
        <el-col :md="9" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('public.no32')}}:</span>
            <el-input size="small" label="name" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no20')}}:</span>
            <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
              <el-option v-for="(item,index) in options1" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no21')}}:</span>
            <el-select clearable size="small" v-model="formInline.leaderId" :placeholder="$t('public.placeholder')">
              <el-option v-for="(item,index) in options3" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('riskManage.selectTime')}}:</span>
            <el-date-picker 
              id="date1"
              size="small"
              v-model="searchTime"
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_RPT_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_RPT_EXP')">
          <el-col :md="5" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
    
    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_RPT_LIST')">
      <template>
        <el-table ref="multipleTable" size="small" :data="tableData" empty-text >
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.no33')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.strCreateTime!==null&&scope.row.strCreateTime!==undefined&&scope.row.strCreateTime!==''">{{(scope.row.strCreateTime).slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('public.no32')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('new.no18')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="leaderName" :label="$t('new.no19')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="approveType" :label="$t('loanMoneyDetail.opeType2')" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.approveType!==null&&scope.row.approveType!==undefined&&scope.row.approveType!==''">{{$t($store.getters.auditType(scope.row.approveType))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
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
              <span v-if="scope.row.successRate!==null&&scope.row.successRate!==undefined&&scope.row.successRate!==''">{{$store.getters.twoPoint(scope.row.successRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="reviewSuccessCount" :label="$t('new.no6')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="reviewSuccessRate" :label="$t('new.no7')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.reviewSuccessRate!==null&&scope.row.reviewSuccessRate!==undefined&&scope.row.reviewSuccessRate!==''">{{$store.getters.twoPoint(scope.row.reviewSuccessRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-table  size="small" :row-style="rowStyle" :data="tableData1" :row-class-name="tableRowClassName" style="width:100%" :show-header="false" >
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
      <el-table-column align="center" prop="approveType" :label="$t('loanMoneyDetail.opeType2')" min-width="120">
      </el-table-column>
      <el-table-column align="center" prop="reviewCounts" :label="$t('riskManage.reviewCount')" min-width="80">
      </el-table-column>
      <el-table-column align="center" prop="successCounts" :label="$t('riskManage.successCount')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="failCounts" :label="$t('riskManage.failCount')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="successRateCounts" :label="$t('riskManage.successRate')" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.successRateCounts!==null&&scope.row.successRateCounts!==undefined&&scope.row.successRateCounts!==''">{{$store.getters.twoPoint(scope.row.successRateCounts)}}%</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="reviewSuccessCounts" :label="$t('new.no3')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="reviewSuccessRateCounts" :label="$t('new.no4')" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.reviewSuccessRateCounts!==null&&scope.row.reviewSuccessRateCounts!==undefined&&scope.row.reviewSuccessRateCounts!==''">{{$store.getters.twoPoint(scope.row.reviewSuccessRateCounts)}}%</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_RISKCONTROL_RPT_LIST')">
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
  name: 'userManage',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询日期
      flag: true,
      formInline: {// 用户查询信息数据对应字段
        type: '2',
        groupId: '',
        leaderId: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        name: ''
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
      this.currentPage = val
      this.tongji();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('rengongchushentongjiList', this.formInline)
      if (this.flag) {
        this.flag = false
        this.tongji();
      }
    },
    tongji () { // 获取人工审核统计列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.auditTotal_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber },
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
          action: this.$store.state.actionMap.auditTotal_excel,
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
            this.options1.push({value: value.id, label: value.groupName})
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
            this.options3.push({value: value.leaderId, label: value.leaderName})
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
        this.formInline.applyTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0])
        this.formInline.applyTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1])
      } else {
        this.formInline.applyTimeBegin = ''
        this.formInline.applyTimeEnd = ''
      }
    }

  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.rengongchushentongji_select) !== '{}') {
      this.formInline = this.$store.state.common.rengongchushentongji_select
      if(this.formInline.applyTimeBegin!==''){
        this.searchTime.push(this.formInline.applyTimeBegin)
        this.searchTime.push(this.formInline.applyTimeEnd)
      }
      
    }
    this.tongji()// 获取人工审核统计列表
    this.groupList()// 获取人工审核统计列表
    this.leaderName_option()// 获取人工审核统计列表
  }
}
</script>
<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}

.usermanage {
  width: 100%;
  height: auto;
  padding: 20px 30px;
  background-color: rgba(246, 249, 252, 1);
  position: relative;
}
.paixu {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: rgba(224, 229, 246, 1);
  border-radius: 4px;
  span {
    display: block;
    float: left;
    margin-top: 10px;
    background-color: rgba(84, 126, 245, 1);
    width: 4px;
    height: 30px;
    border-radius: 5px;
  }
  p {
    color: rgba(84, 126, 245, 1);
    font-size: 16px;
    margin-left: 20px;
  }
  
}
.search {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 18px;
  margin-bottom: 22px;
  padding: 22px 28px 22px 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  .search-input {
    height: 50px;
    display: flex;
    align-items: center;
    // margin-right: 10px;
    & > span {
      padding: 0 5px;
      font-size: 14px;
      white-space: nowrap;
      @include flex-cen;
    }
    // .margin{
    //   margin-left: 15px;
    // }
    .el-input {
      flex: auto;
      @include flex-cen;
    }
    .el-date-editor {
      margin: 0 5px;
    }
    .el-select {
      flex: auto;
      @include flex-cen;
    }
    .el-button--primary{
      height: 40px;
      
    }
    .button-color{
      background-color: #1D7BFF;
      border-color: #547ef6;
    }
  }
}

.table {
  width: 100%;
  min-height: 440px;
}
span.active1{
  color: #FF6700;
}
span.active2{
  color: #8FD78D;
}
span.active3{
  color: #3b56ee;
}


//用户详情弹窗
.details{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  z-index: 100;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 95%;
    height: 500px;
    margin-top: -200px;
    background-color: #ffffff;
    .detail-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 10px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .detail-main-con{
      width: 100%;
      height: 452px;
      .year{
        width: 100%;
        height: 58px;
        display: flex;
        padding-left: 50px;
        align-items: flex-end;
        .button-active{
          background-color: #409EFF;
        }
      }
      
      .detail-table{
        width: 100%;
        height: 392px;
        display: flex;
        justify-content: space-around;
        .detail-table-1{
          width: 45%;
          height: 100%;
          .detail-table-2{
            width: 100%;
            height: 100%;
            tr:nth-child(odd){
              background-color: #Ffffff;
            }
            tr:nth-child(even){
              background-color: #F4F6FB;
            }
            .table-head{
              height: 50px;
            }
            .table-head2{
              text-align: center;
            }
            .active{
              background-color: #F4F6FB;
            }
          }
        }
      }
    }
  }
} 

</style>
