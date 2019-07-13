<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('totalManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('totalManage.crumbsThr')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('totalManage.crumbsThr')}}</p>
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
        <div class="search-input">
          <span>{{$t('public.no25')}}:</span>
          <el-select clearable size="small" v-model="formInline.period" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('add.no86')}}:</span>
          <el-select size="small" v-model="formInline.userStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_REPORT_INCOME_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_REPORT_INCOME_QUERY')">
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
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no58')" width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.strLoanTime!==null&&scope.row.strLoanTime!==undefined&&scope.row.strLoanTime!==''">{{scope.row.strLoanTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" min-width="68" >
          </el-table-column>
          <el-table-column align="center" prop="loanCount" :label="$t('totalManage.lendingCount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('totalManage.amount')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundCount" :label="$t('totalManage.overCount')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="moneyRate" :label="$t('totalManage.firstRate')+'('+$t('totalManage.money')+')'" min-width="100">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.moneyRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="countRate" :label="$t('totalManage.firstRate')+'('+$t('totalManage.order')+')'" min-width="80">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.countRate)}}</span>
            </template>
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
  name: 'overdueRate',
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
      options2:this.$store.state.options.userType_option,
      rowStyle:{
        backgroundColor:'rgb(241,241,241)'
      }
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.getTableData();
    },
    getTableData () { // 获取首逾率列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.first_rate,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data.overList;
          this.tableData1 =res.data.data.overAll;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 搜索栏查询按钮点击操作
      this.$store.commit('overdueRate', this.formInline);
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
            action: this.$store.state.actionMap.first_rate_excel,
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
          this.tableData1.loanCount,
          this.$store.getters.moneySplit(this.tableData1.loanAmount),
          this.tableData1.refundCount,
          this.$store.getters.moneySplit(this.tableData1.refundAmount),
          this.$store.getters.twoPoint(this.tableData1.moneyRate),
          this.$store.getters.twoPoint(this.tableData1.countRate),
        ]
      }else{
        sums = [
          this.$t('public.addTotal'),
          this.tableData1.loanCount,
          this.$store.getters.moneySplit(this.tableData1.loanAmount),
          this.tableData1.refundCount,
          this.$store.getters.moneySplit(this.tableData1.refundAmount),
          this.$store.getters.twoPoint(this.tableData1.moneyRate),
          this.$store.getters.twoPoint(this.tableData1.countRate),
        ];
      }
      return sums;
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
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.shouyulv_select) !== '{}') {
      this.formInline = this.$store.state.common.shouyulv_select
      if(this.formInline.dayBegin!==''){
        this.searchTime.push(this.formInline.dayBegin)
        this.searchTime.push(this.formInline.dayEnd)
      }
    }
    this.getTableData()
    this.getPeriod()
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
