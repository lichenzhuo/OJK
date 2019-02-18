<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('operationList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('operationList.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('operationList.crumbsTwo')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" >
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.orderId"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" label="userName" v-model="formInline.userName"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" label="userPhone" v-model="formInline.userPhone"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>{{$t('loanAfterManage.status')}}:</span>
          <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input" v-if="$store.state.common.lang==='PHL'">
          <span>{{$t('public.no65')}}:</span>
          <el-select size="small" v-model="formInline.refundAmountIsZero" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no28')}}:</span>
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.overdueDaysBegin"></el-input>
          ~
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.overdueDaysEnd"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('new.no77')}}:</span>
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.maxOverdueDaysBegin"></el-input>
          ~
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.maxOverdueDaysEnd"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('new.no78')}}:</span>
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.repeatCountBegin"></el-input>
          ~
          <el-input size="small" style="width:50px"  label="phone" v-model="formInline.repeatCountEnd"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('loanAfterManage.time')}}:</span>
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
          <span>{{$t('public.no71')}}:</span>
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
        <div class="search-input" v-if="$store.state.common.lang==='PHL'">
          <span>{{$t('operationDetail.no8')}}:</span>
          <el-date-picker 
            id="chengnuo"
            v-model="searchTime4" 
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <template v-if="$store.state.common.lang!=='PHL'">
          <div class="search-input" >
            <span>{{$t('new.no83')}}:</span>
            <el-date-picker 
              size="small"
              v-model="searchTime5" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
          <div class="search-input" >
            <span>{{$t('new.no84')}}:</span>
            <el-select size="small" v-model="formInline.callStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        
        <!-- <el-col :md="3" :lg="2" :xl="2"> -->
          <div class="search-input">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        <!-- </el-col> -->
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table">
      <template>
        <el-table :data="tableData" stripe style="width: 100%"  empty-text>
          
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')" width="80">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" min-width="90">
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" :label="$t('public.no56')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="waitAmount" :label="$t('loanAfterManage.waitAmount')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.waitAmount!==null&&scope.row.waitAmount!==undefined&&scope.row.waitAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.waitAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strLastTime" :label="$t('loanAfterManage.time')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.no71')" min-width="80">
          </el-table-column>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="strPromiseTime" :label="$t('operationDetail.no8')" min-width="80">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="status" :label="$t('loanAfterManage.status')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.operationStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="maxOverdueDays" :label="$t('new.no77')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="repeatCount" :label="$t('new.no78')" min-width="100">
          </el-table-column>
          <template v-if="$store.state.common.lang!=='PHL'">
            <el-table-column align="center" prop="strCallTime" :label="$t('new.no83')" min-width="86">
            </el-table-column>
            <el-table-column align="center" prop="callStatus" :label="$t('new.no84')" min-width="80">
              <template slot-scope="scope">
                <span >{{$t($store.getters.callStatus_status(scope.row.callStatus))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="160">
            <template slot-scope="scope">
              <span 
              v-if="!(scope.row.status==100||(scope.row.dealStatus>0&&scope.row.dealStatus<3))"
              style="color:#547ef6;cursor:pointer" 
              @click="socialDetali(scope.row.orderNo)">{{$t('operationList.no1')}}</span>
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
      searchTime: [],
      searchTime1: [],
      searchTime4: [], // 承诺还款时间
      searchTime5: [], // 最近群呼时间
      flag: true,
      // 用户查询信息数据对应字段
      formInline: {
        collectionId: '',
        orderNo: '',
        orderId: '',
        userName: '',
        userPhone: '',
        overdueDaysBegin: '',
        overdueDaysEnd: '',
        maxOverdueDaysBegin: '',
        maxOverdueDaysEnd: '',
        repeatCountBegin: '',
        repeatCountEnd: '',
        collectionTimeBegin: '',
        collectionTimeEnd: '',
        goCollectionTimeBegin: '',
        goCollectionTimeEnd: '',
        promiseTimeBegin:'',
        promiseTimeEnd:'',
        status: '',
        callStatus: '',
        callStartTime:'',
        callEndTime:'',
        refundAmountIsZero: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.collection_option, // 入催状态下拉选框信息
      options2: this.$store.state.options.returnMoney_option, // 已还金额下拉选框信息
      options3: this.$store.state.options.groupCalls_options, // 群呼结果下拉选框信息
      tableData: []// 列表数据模拟
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.operationList();
    },
    handleCurrentChange (val) { // 点击分页按钮操作
      this.currentPage = val
      this.operationList();
    },
    socialDetali (orderNo) { // 查看详情
      this.$router.push({path: '/cuishoudetail', query: {orderNo, type: '1'}})
    },
    operationList () { // 入催订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.myOperation_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    select () { // 查询按钮点击操作
      this.$store.commit('mycuishouList', this.formInline)
      if (this.flag) {
        this.flag = false
        this.operationList();
      }
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.collectionTimeBegin = this.searchTime[0]
        this.formInline.collectionTimeEnd = this.searchTime[1]
      } else {
        this.formInline.collectionTimeBegin = ''
        this.formInline.collectionTimeEnd = ''
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.goCollectionTimeBegin = this.searchTime1[0]
        this.formInline.goCollectionTimeEnd = this.searchTime1[1]
      } else {
        this.formInline.goCollectionTimeBegin = ''
        this.formInline.goCollectionTimeEnd = ''
      }
    },
    searchTime4 () {
      if (this.searchTime4) {
        this.formInline.promiseTimeBegin = this.searchTime4[0]
        this.formInline.promiseTimeEnd = this.searchTime4[1]
      } else {
        this.formInline.promiseTimeBegin = ''
        this.formInline.promiseTimeEnd = ''
      }
    },
    searchTime5 () {
      if (this.searchTime5) {
        this.formInline.callStartTime = this.searchTime5[0]
        this.formInline.callEndTime = this.searchTime5[1]
      } else {
        this.formInline.callStartTime = ''
        this.formInline.callEndTime = ''
      }
    },
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.mycuishouList_select) !== '{}') {
      this.formInline = this.$store.state.common.mycuishouList_select
      if(this.formInline.collectionTimeBegin!==''){
        this.searchTime.push(this.formInline.collectionTimeBegin)
        this.searchTime.push(this.formInline.collectionTimeEnd)
      }
      
    }
    this.operationList()
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
    margin-right: 10px;
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
  position: fixed;
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
