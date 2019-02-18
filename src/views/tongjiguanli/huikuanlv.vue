<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('totalManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('totalManage.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('totalManage.crumbsTwo')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row :gutter="10">
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('proManage.period')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.period"></el-input>
          </div>
        </el-col>
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_REPORT_REPAY_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_REPORT_REPAY_QUERY')">
          <el-col :md="5" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table">
      <template>
        <el-table :data="tableData" size="small" style="width: 100%" empty-text>
          <el-table-column align="center" prop="strRefundTime" :label="$t('public.no69')" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.strRefundTime!==null&&scope.row.strRefundTime!==undefined&&scope.row.strRefundTime!==''">{{scope.row.strRefundTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" min-width="68">
          </el-table-column>
          <el-table-column align="center" prop="shouldReturnCount" :label="$t('totalManage.returnCount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="receivableAmount" :label="$t('totalManage.returnMoney')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.receivableAmount!==null&&scope.row.receivableAmount!==undefined&&scope.row.receivableAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.receivableAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundCount" :label="$t('totalManage.realReturnCount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('totalManage.realReturnMonry')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="unpaidCount" :label="$t('totalManage.noReturnCount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="unpaidAmount" :label="$t('totalManage.noReturnMonry')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.unpaidAmount!==null&&scope.row.unpaidAmount!==undefined&&scope.row.unpaidAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.unpaidAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="moneyRate" :label="$t('totalManage.overDueNow')+'('+$t('totalManage.money')+')'" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.moneyRate!==null&&scope.row.moneyRate!==undefined&&scope.row.moneyRate!==''">{{$store.getters.twoPoint(scope.row.moneyRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="countRate" :label="$t('totalManage.overDueNow')+'('+$t('totalManage.order')+')'" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.countRate!==null&&scope.row.countRate!==undefined&&scope.row.countRate!==''">{{$store.getters.twoPoint(scope.row.countRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
        
      </template>
    </div>
    <el-table :data="tableData1" :row-style="rowStyle" :show-header="false" size="small" :row-class-name="tableRowClassName" style="width: 100%">
      <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" width="180">
        <template slot-scope="scope">
          <span>{{$t('public.addTotal')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" min-width="68">
      </el-table-column>
      <el-table-column align="center" prop="shouldReturnCount" :label="$t('totalManage.applyCount')" min-width="100">
      </el-table-column>
      <el-table-column align="center" prop="receivableAmount" :label="$t('totalManage.returnMoney')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.receivableAmount!==null&&scope.row.receivableAmount!==undefined&&scope.row.receivableAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.receivableAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundCount" :label="$t('totalManage.realReturnCount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('totalManage.realReturnMonry')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="unpaidCount" :label="$t('totalManage.noReturnCount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="unpaidAmount" :label="$t('totalManage.noReturnMonry')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.unpaidAmount!==null&&scope.row.unpaidAmount!==undefined&&scope.row.unpaidAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.unpaidAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="moneyRate"  min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.moneyRate!==null&&scope.row.moneyRate!==undefined&&scope.row.moneyRate!==''">{{$store.getters.twoPoint(scope.row.moneyRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="countRate"  min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.countRate!==null&&scope.row.countRate!==undefined&&scope.row.countRate!==''">{{$store.getters.twoPoint(scope.row.countRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
    </el-table>

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
        period:'',
        dayBegin: '',
        dayEnd: ''
      },
      // 当前页下标
      currentPage: 1,
      // 用户信息数据模拟
      tableData:[],
      tableData1:[],
      rowStyle:{
        backgroundColor:'rgb(241,241,241)'
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.formList();
    },
    formList () { // 获取回款率列表
      this.tableData1 = [];
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_rate,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data.remittanceList;
          this.tableData1.push(res.data.data.remittanceAll);
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 搜索栏查询按钮点击操作
      this.$store.commit('huikuanlv', this.formInline)
      if (this.flag) {
        this.flag = false
        this.formList();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.back_rate_excel,
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
    if (JSON.stringify(this.$store.state.common.huikuanlv_select) !== '{}') {
      this.formInline = this.$store.state.common.huikuanlv_select
      if(this.formInline.dayBegin!==''){
        this.searchTime.push(this.formInline.dayBegin)
        this.searchTime.push(this.formInline.dayEnd)
      }
      
    }
    this.formList()
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
