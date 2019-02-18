<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('websiteLoans.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('websiteLoans.no4')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('websiteLoans.no4')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" label="name" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no2')}}:</span>
            <el-input size="small" label="idCard" v-model="formInline.idCard"></el-input>
          </div>
        </el-col>
        <el-col :md="9" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('public.orderStatus')}}:</span>
            <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="9" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('websiteLoans.no5')}}:</span>
            <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="9" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('staffManage.xinshenyuan')}}:</span>
            <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('public.registerDate')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                id="registerDate"
                size="small"
                v-model="searchTime" 
                type="daterange" 
                range-separator="~" 
                :default-value="$store.state.common.preMonth" 
                :start-placeholder="$t('public.beginTime')" 
                :end-placeholder="$t('public.endTime')">
              </el-date-picker>
            </form>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_QUERY')">
          <!-- <el-col :md="3" :lg="2" :xl="2"> -->
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_EXP')">
          <!-- <el-col :md="5" :lg="2" :xl="2"> -->
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
      </el-row>
    </div>

    <div class="search act" v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_ASSIGN')">
      <el-row :gutter='10'>
        <el-col :span="5">
          <div v-if="claimFlag" class="search-input">
            <el-button type="primary" class="button-color" @click="todayRedeploy">{{$t('loanAfterManage.redeploy')}}</el-button>
          </div>
          <div v-else class="search-input">
            <el-button type="info"  >{{$t('loanAfterManage.redeploy')}}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_INFO')">
      <template>
        <el-table :data="tableData" size="small" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" :selectable="unSelect" width="55">
          </el-table-column>
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" min-width="60">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.orderLoanType!==null&&scope.row.orderLoanType!==undefined&&scope.row.orderLoanType!==''">{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('websiteLoans.no10')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('websiteLoans.no11')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('websiteLoans.no6')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="140">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_DETAIL')"
                style="color:#547ef6;cursor:pointer"
                @click="detail(scope.row.orderNo,scope.row.userId)"
              >
              {{$t('public.detail')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    
    
    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PC_LOAN_LIST_INFO')">
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

    <!-- ------------------ 点击转派弹窗开始 -------------------- -->
    <div v-if="redeployFlag" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p>{{$t('loanAfterManage.redeploy')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="redeployClose"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-con-one">
            <p>{{$t('public.orderNo')}}: <span>{{orderIds}}</span> </p>
          </div>
          <div class="detail-con-one">
            <p>{{$t('public.userId')}}: <span>{{userIds}}</span> </p>
          </div>
          <div class="detail-con-one">
            <div class="detail-con-one-4">
              {{$t('loanAfterManage.redeployTo')}}: &nbsp;&nbsp;
            </div>
            <div class="detail-con-one-3" v-if="formInline.orderState=='10'||formInline.orderState=='20'">
              <el-select size="small" v-model="redeployStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="detail-con-one-3" v-if="formInline.orderState=='21'||formInline.orderState=='30'">
              <el-select size="small" v-model="redeployStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="detail-con-one">
            <div class="detail-con-one-4" style="line-height:26px;">
              {{$t('loanAfterManage.reason')}}:
            </div>
            <div class="detail-con-one-3">
              <textarea class="search_inpu" v-model="reason" :placeholder="$t('loanAfterManage.placeholder')+'~'"></textarea>
            </div>
          </div>
          <div class="detail-but" @click="redeploySubmit">{{$t('loanAfterManage.sure')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击转派弹窗结束 -------------------- -->

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
      flag: true, // 点击开关
      claimFlag: false, // 指派按钮开关
      searchTime: [], // 申请时间
      formInline: {// 用户查询信息数据对应字段
        idCard: '',
        name: '',
        phone: '',
        orderState: '',
        orderLoanType: '',
        promiseTimeBegin:'',
        promiseTimeEnd:'',
        adminId: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.loansType_options, //   贷款类型下拉选框信息
      options2: this.$store.state.options.order_select, // 订单状态下拉选框信息
      options3: [], // 信审员下拉框
      options4: [], // 初审员下拉框
      options5: [], // 复审员下拉框
      tableData: [], // 列表表格数据汇总
      redeployFlag: false, // 转派弹窗开关
      redeployStatus: '', // 转派弹窗审核员下拉框对应数据
      multipleSelection: [], // 可勾选表格选中项
      orderIds: [], // 选中的订单ID数组
      userIds: [], // 选中的用户ID数组
      reason: ''// 转派原因描述
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.getList();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      this.getList();
    },
    detail (orderNo,userId) { // 查看详情点击操作
      this.$router.push({path: '/loanmoneydetail',query: {userId, orderNo}})
    },
    getList () { // 获取订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.website_loansApplyList,
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
          if(this.formInline.orderState=='10'||this.formInline.orderState=='20'||this.formInline.orderState=='21'||this.formInline.orderState=='30'){
            this.claimFlag = true;
          }else{
            this.claimFlag = false;
          }
        }
      })
    },
    select () { // 查询按钮点击操作
      if (this.flag) {
        this.flag = false
        this.getList();
      }
    },
    redeploySubmit () { // 转派确认操作
      if (this.redeployStatus == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.adminFirst'))
        return
      }
      if (this.reason == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.placeholder'))
        return
      }
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.zhipai,
            'sessionid': this.sessionid
          },
          operType: this.formInline.orderState=='10'||this.formInline.orderState=='20'?'2':'3',
          orderIds: this.orderIds,
          oper: this.redeployStatus,
          remark: this.reason
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.getList()
          this.orderIds = []
          this.multipleSelection = []
          this.redeployStatus = ''
          this.reason = ''
          this.redeployFlag = false
        })
      }
    },
    handleSelectionChange (val) { // 表格选中项数据
      this.multipleSelection = val
    },
    todayRedeploy () { // 转派按钮点击操作
      if (this.orderIds == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.selFirst'))
      } else {
        this.redeployFlag = true
      }
    },
    redeployClose () {
      this.redeployFlag = false
      this.redeployStatus = ''
      this.reason = ''
    },
    joinType () { // 订单转派弹窗对应数据处理
      let arr = []
      let brr = []
      this.multipleSelection.forEach(value => {
        arr.push(value.id)
        brr.push(value.userId)
      })
      this.orderIds = arr
      this.userIds = brr
    },
    unSelect (row, index) {
      return row.status != 100
    },
    chuPeople () { // 获取初审人员列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.audit_people,
          'sessionid': this.sessionid
        },
        operType: '2'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data
          arr.forEach(value => {
            value.value = value.id
            value.label = value.name
          })
          this.options4 = arr
        }
      })
    },
    fuPeople () { // 获取复审人员名单
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.audit_people,
          'sessionid': this.sessionid
        },
        operType: '3'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data
          arr.forEach(value => {
            value.value = value.id
            value.label = value.name
          })
          this.options5 = arr
        }
      })
    },
    allPeople () { // 获取全部人员名单
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.audit_people,
          'sessionid': this.sessionid
        },
        operType: '4'
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
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.website_loansApplyListExcel,
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
    // 'formInline.orderState' () {
    //   if(this.formInline.orderState=='10'||this.formInline.orderState=='20'||this.formInline.orderState=='21'||this.formInline.orderState=='30'){
    //     this.claimFlag = true;
    //   }else{
    //     this.claimFlag = false;
    //     // this.$globalMsg.error(this.$t('operationDetail.no20'))
    //   }
    // },
    multipleSelection () {
      this.joinType()
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getList();// 获取入催订单列表
    this.chuPeople();// 获取初审员下拉框
    this.fuPeople();// 获取复审员下拉框
    this.allPeople();// 获取复审员下拉框
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
  height: 100%;
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
.act{
  padding: 5px 28px 5px 5px;
}


.table {
  width: 100%;
  min-height: 540px;
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



// 查看详情
.detail{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 694px;
    height: auto;
    // margin-top: -450px;
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
        display: flex;
        margin: 10px 0;
        p{
          margin: 10px 40px 20px 0;
          padding-left: 14px;
          color: #999;
          span{
            color: #000;
            margin: 0 5px;
          }
        }
        .detail-con-one-4{
          width: auto;
          height: 40px;
          text-align: center;
          padding: 0 15px;
          white-space: nowrap;
          line-height: 40px;
          color: #999;
        }
        .detail-con-one-3{
          width: 100%;
          display: flex;
          align-items: center;
          textarea{
            width: 100%;
            height: 100px;
            padding: 5px;
            font-size: 16px;
          }
        }
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
    }
  }
}
</style>
