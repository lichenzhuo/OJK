<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterOperation.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterOperation.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('loanAfterOperation.crumbsTwo')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row :gutter="10">
        <el-col :md="14" :lg="11" :xl="7">
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
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_RPT_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_RPT_LIST')">
      <template>
        <el-table :data="tableData" stripe style="width: 100%"  empty-text>
          <el-table-column align="center" prop="strRepaymentTime" :label="$t('public.no33')" width="160">
          </el-table-column>
          <el-table-column align="center" prop="collectionCnt" :label="$t('loanAfterOperation.collectionCnt')" min-width="140">
          </el-table-column>
          <el-table-column align="center" prop="repaymentAmount" :label="$t('loanAfterOperation.repaymentAmount')" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.repaymentAmount!==null&&scope.row.repaymentAmount!==undefined&&scope.row.repaymentAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.repaymentAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="repaymentAmountRate" :label="$t('loanAfterOperation.collectionRate')" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.repaymentAmountRate!==null&&scope.row.repaymentAmountRate!==undefined&&scope.row.repaymentAmountRate!==''">{{scope.row.repaymentAmountRate}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="collectionRate" :label="$t('loanAfterOperation.repaymentAmountRate')" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.collectionRate!==null&&scope.row.collectionRate!==undefined&&scope.row.collectionRate!==''">{{scope.row.collectionRate}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="tableData1" :row-style="rowStyle" :row-class-name="tableRowClassName" :show-header="false" size="small" style="width: 100%">
          <el-table-column align="center"  prop="strCreateTime" :label="$t('public.CreateDate')" width="160">
            <template slot-scope="scope">
              <span>{{$t('public.addTotal')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="collectionCnt" :label="$t('loanAfterOperation.collectionCnt')" min-width="140">
          </el-table-column>
          <el-table-column align="center" prop="repaymentAmount" :label="$t('loanAfterOperation.repaymentAmount')" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.repaymentAmount!==null&&scope.row.repaymentAmount!==undefined&&scope.row.repaymentAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.repaymentAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="repaymentAmountRate" :label="$t('loanAfterOperation.collectionRate')" min-width="140">
          </el-table-column>
          <el-table-column align="center" prop="collectionRate" :label="$t('loanAfterOperation.repaymentAmountRate')" min-width="140">
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
  name: 'userManage',
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
      tableData1:[],
      rowStyle:{
        backgroundColor:'rgb(241,241,241)'
      }
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      this.dataList();
    },
    socialDetali (id) {
      this.$router.push({path: '/userdetail?id=' + id})
    },
    dataList () { // 获取数据列表
      this.tableData1 = []
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
            this.tableData1.push(res.data.data.reportCollectionCount);
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    select () {
      this.$store.commit('cuihuiTotalList', this.formInline)
      if (this.flag) {
        this.flag = false
        this.dataList();
      }
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
        this.formInline.dayBegin = this.searchTime[0]
        this.formInline.dayEnd = this.searchTime[1]
      } else {
        this.formInline.dayBegin = ''
        this.formInline.dayEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.cuihuiTotalList_select) !== '{}') {
      this.formInline = this.$store.state.common.cuihuiTotalList_select
      if(this.formInline.dayBegin!==''){
        this.searchTime.push(this.formInline.dayBegin)
        this.searchTime.push(this.formInline.dayEnd)
      }
      
    }
    this.dataList()
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
  min-height: 530px;
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
