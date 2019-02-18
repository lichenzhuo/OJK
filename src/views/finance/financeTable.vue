<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('finance.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('finance.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('finance.crumbsFour')}}</p>
        </div>
      </el-col>
    </el-row>
    
    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no49')}}:</span>
            <el-select size="small" clearable v-model="formInline.appPackage" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('totalManage.timeSelect')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                id="cteateTime"
                size="small"
                v-model="searchTime1" 
                type="daterange" 
                range-separator="~"
                :default-value="$store.state.common.preMonth" 
                :start-placeholder="$t('public.beginTime')" 
                :end-placeholder="$t('public.endTime')">
              </el-date-picker>
            </form>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPORT_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPORT_EXP')">
          <el-col :md="5" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPORT_LIST')">
      <template>
        <el-table :data="tableData" size="small" style="width: 100%" empty-text >
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no58')" width="76">
          </el-table-column>
          <el-table-column align="center" prop="productAmount" :label="$t('public.no54')" min-width="85">
            <template slot-scope="scope">
              <span v-if="scope.row.productAmount!==null&&scope.row.productAmount!==undefined&&scope.row.productAmount!==''">{{$store.getters.moneySplit(scope.row.productAmount)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" min-width="68">
          </el-table-column>
          <el-table-column align="center" prop="dayInterestRate" :label="$t('proManage.dayInterest')" min-width="68">
          </el-table-column>
          <el-table-column align="center" prop="feeRate" :label="$t('proManage.feeRate')" min-width="68">
          </el-table-column>
          <el-table-column align="center" prop="overdueInterestRate" :label="$t('proManage.overdueInterest')" min-width="68">
          </el-table-column>
          <el-table-column align="center" prop="loanCount" :label="$t('totalManage.lendingCount')" >
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('totalManage.amount')" >
          </el-table-column>
          <el-table-column align="center" prop="refundCount" :label="$t('totalManage.realReturnCount')" >
          </el-table-column>
          <el-table-column align="center" prop="needRefundPrincipal" :label="$t('totalManage.no2')" >
          </el-table-column>
          <el-table-column align="center" prop="needRefundInterest" :label="$t('totalManage.no3')" >
          </el-table-column>
          <el-table-column align="center" prop="needRefundOverdueInterest" :label="$t('totalManage.no4')" >
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('totalManage.no1')" >
          </el-table-column>
          <el-table-column align="center" prop="couponAmount" :label="$t('new.no63')" >
          </el-table-column>
          <el-table-column align="center" prop="noRefundCount" :label="$t('totalManage.noReturnCount')" >
          </el-table-column>
          <el-table-column align="center" prop="noRefundPrincipal" :label="$t('totalManage.no5')" >
          </el-table-column>
          <el-table-column align="center" prop="noRefundInterest" :label="$t('totalManage.no6')" >
          </el-table-column>
          <el-table-column align="center" prop="noRefundOverdueInterest" :label="$t('totalManage.no7')" >
          </el-table-column>
          <el-table-column align="center" prop="noRefundAmount" :label="$t('totalManage.no8')" >
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-table v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPORT_LIST')" :data="tableData1" :row-style="rowStyle" :row-class-name="tableRowClassName" :show-header="false" size="small" style="width: 100%">
      <el-table-column align="center"  prop="strCreateTime" :label="$t('public.CreateDate')" width="76">
        <template slot-scope="scope">
          <span>{{$t('public.addTotal')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="productAmount" :label="$t('public.no54')" min-width="85">
        <template slot-scope="scope">
          <span v-if="scope.row.productAmount!==null&&scope.row.productAmount!==undefined&&scope.row.productAmount!==''">{{$store.getters.moneySplit(scope.row.productAmount)}}</span>
          <span v-else>{{$store.state.common.nullData}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')" min-width="68">
      </el-table-column>
      <el-table-column align="center" prop="dayInterestRate" :label="$t('proManage.dayInterest')" min-width="68">
      </el-table-column>
      <el-table-column align="center" prop="feeRate" :label="$t('proManage.feeRate')" min-width="68">
      </el-table-column>
      <el-table-column align="center" prop="overdueInterestRate" :label="$t('proManage.overdueInterest')" min-width="68">
      </el-table-column>
      <el-table-column align="center" prop="loanCount" :label="$t('totalManage.lendingCount')" >
      </el-table-column>
      <el-table-column align="center" prop="loanAmount" :label="$t('totalManage.amount')" >
      </el-table-column>
      <el-table-column align="center" prop="refundCount" :label="$t('totalManage.realReturnCount')" >
      </el-table-column>
      <el-table-column align="center" prop="needRefundPrincipal" :label="$t('totalManage.no2')" >
      </el-table-column>
      <el-table-column align="center" prop="needRefundInterest" :label="$t('totalManage.no3')" >
      </el-table-column>
      <el-table-column align="center" prop="needRefundOverdueInterest" :label="$t('totalManage.no4')" >
      </el-table-column>
      <el-table-column align="center" prop="refundAmount" :label="$t('totalManage.no1')" >
      </el-table-column>
      <el-table-column align="center" prop="couponAmount" :label="$t('new.no63')" >
      </el-table-column>
      <el-table-column align="center" prop="noRefundCount" :label="$t('totalManage.noReturnCount')" >
      </el-table-column>
      <el-table-column align="center" prop="noRefundPrincipal" :label="$t('totalManage.no5')" >
      </el-table-column>
      <el-table-column align="center" prop="noRefundInterest" :label="$t('totalManage.no6')" >
      </el-table-column>
      <el-table-column align="center" prop="noRefundOverdueInterest" :label="$t('totalManage.no7')" >
      </el-table-column>
      <el-table-column align="center" prop="noRefundAmount" :label="$t('totalManage.no8')" >
      </el-table-column>
    </el-table>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNT_REPORT_LIST')">
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
  name: 'financeTable',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 订单创建时间数组
      // 用户查询信息数据对应字段
      formInline: {
        loanTimeBegin: "",
        loanTimeEnd: "",
        appName: "",
        appPackage: ""
      },
      currentPage:1,//当前页下标
      options1: [],// APP名
      options2: [],// APP包名
      tableData: [],
      tableData1: [],
      rowStyle:{
        backgroundColor:'rgb(241,241,241)'
      }
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.backMoneyList();
    },
    handleCurrentChange (val) {
      this.backMoneyList(val)
    },
    select () {
      this.backMoneyList()
    },
    putExcel () {
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.financetable_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
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
    backMoneyList (val) {
      this.tableData1 = []
      if(val){
        this.currentPage = val
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.financetable,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data['accountReportList'];
          this.tableData1.push( res.data.data['accountReportTotal'] );
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    getAppName () { // 获取app名字和包名
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.select_allData,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data.package
          arr.forEach(value => {
            this.options1.push({value: value.optionName, label: value.optionName})
            this.options2.push({value: value.optionValue, label: value.optionValue})
          })
          this.addContent = true
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'warning-row';
      }
      return '';
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    }
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.loanTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0])
        this.formInline.loanTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1])
      } else {
        this.formInline.loanTimeBegin = ''
        this.formInline.loanTimeEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.backMoneyList()
    this.getAppName()
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
  background-color: #fff;
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

// 查看详情
.detail{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 694px;
    height: auto;
    margin-top: -150px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom:5px; 
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
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
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
      height: auto;
      padding: 10px 30px;
      .detail-con-one{
        width: 100%;
        // display: flex;
        p{
          margin: 10px 40px 20px 0;
          padding-left: 14px;
          color: #999;
          span{
            color: #000;
            margin: 0 5px;
          }
        }
        .detail-con-one-3{
          width: 100%;
          height: 100%;
          margin-bottom: 10px;
          textarea{
            width: 100%;
            height: 100px;
            padding: 10px;
            font-size: 16px;
          }
        }
        .detail-con-one-4{
          width: 100px;
          height: 40px;
          // text-align: center;
          line-height: 40px;
          color: #000;
        }
      }
      .detail-con-one1{
        width: 200px;
        padding: 0 5px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        text-align: center;
        background-color: #1D7BFF;
        border-radius: 5px;
        cursor: pointer;
      }
      .detail-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 10px auto;
        text-align: center;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
      .detail-con-one2{
        width: 100%;
        display: flex;
        span{
          &:nth-child(1){
            width: 120px;
            white-space: nowrap;
          }
          &:nth-child(2){
            padding: 0 10px;
            word-break:break-all;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>
