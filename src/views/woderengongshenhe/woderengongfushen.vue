<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('myAuditList.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('myAuditList.no6')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('myAuditList.no7')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.orderId"></el-input>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xl="3">
          <div class="search-input">
            <span>{{$t('public.orderNo')}}:</span>
            <el-input size="small" label="orderNo" v-model="formInline.orderNo"></el-input>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xl="3">
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" label="userId" v-model="formInline.userId"></el-input>
          </div>
        </el-col>
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
            <span>{{$t('new.no8')}}:</span>
            <el-select size="small" v-model="formInline.trackStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderStatus')}}:</span>
            <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <template v-if="$store.state.common.lang==='vi'">
          <el-col :md="9" :lg="6" :xl="5">
            <div class="search-input">
              <span>{{$t('websiteLoans.no5')}}:</span>
              <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options4" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </template>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('public.CreateDate')}}:</span>
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
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('new.no9')}}:</span>
            <el-date-picker 
              id="shenhe"
              size="small"
              v-model="searchTime1" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('new.no13')}}:</span>
            <el-date-picker 
              id="renling"
              size="small"
              v-model="searchTime2" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ME_REVIEW_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>

    <template v-if="level!==1">
      <div class="search act" v-if="$store.state.common.permiss.includes('RIGHT_ME_REVIEW_CLAIM')">
        <el-row>
          <el-col :span="5">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="claim">{{$t('myAuditList.no8')}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ME_REVIEW_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe style="width:100%"  empty-text>
          <!-- <el-table-column align="center" prop="orderNo" :label="$t('public.orderNo')" width="120">
          </el-table-column> -->
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" width="60">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" min-width="100">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="userPhone" :label="$t('yuenan.no23')" min-width="100">
              <template slot-scope="scope">
                <span >{{$store.getters.vn_phone(scope.row.userPhone)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')" min-width="90">
              <template slot-scope="scope">
                <span v-if="scope.row.orderLoanType!==null&&scope.row.orderLoanType!==undefined&&scope.row.orderLoanType!==''">{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
                <span v-else>{{$store.state.common.nullData}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strApproveTime" :label="$t('new.no9')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="strSecondApproveAllotTime" :label="$t('new.no13')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="trackStatus" :label="$t('new.no8')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.trackStatus!==null&&scope.row.trackStatus!==undefined&&scope.row.trackStatus!==''">{{$t($store.getters.follow_status(scope.row.trackStatus))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('public.no32')" min-width="80">
            <template slot-scope="scope">
              <span>{{userName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="140">
            <template slot-scope="scope">
              <span
                v-if="scope.row.status!=30"
                style="color:#547ef6;cursor:pointer"
                @click="socialDetali(scope.row.orderNo,scope.row.userId,scope.row.id)">
                {{$t('public.no29')}}
              </span>
              <span 
                v-else
                style="color:#547ef6;cursor:pointer"
                @click="socialDetali(scope.row.orderNo,scope.row.userId,scope.row.id)">
                {{$t('myAuditList.no9')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end" v-if="$store.state.common.permiss.includes('RIGHT_ME_REVIEW_LIST')">
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
      flag: true,
      sessionid: '',
      level: '',
      userName: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询日期
      searchTime1: [], // 审核日期
      searchTime2: [], // 认领日期
      formInline: {// 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        orderLoanType: '',
        trackStatus: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        approveTimeBegin: '',
        approveTimeEnd: '',
        approvAllotTimeBegin: '',
        approvAllotTimeEnd: '',
        orderState: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.recheckOrder_option, // 订单状态下拉选框信息
      options2: '', // 审核员下拉选框信息
      options3: this.$store.state.options.follow_option2, // 跟踪状态下拉选框信息
      options4: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      tableData: [], // 用户信息数据模拟
      orderNo: ''
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.listAll();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      this.listAll();
    },
    socialDetali (orderNo, userid, orderId) { // 点击人工初审跳转
      this.$router.push({path: '/fushendetail', query: {orderNo, userid, orderId, block: 2}})
    },
    select () { // 点击查询按钮操作
      this.$store.commit('myrengongfushenList', this.formInline)
      if (this.flag) {
        this.flag = false
        this.listAll();
      }
    },
    listAll () { // 获取订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.myAuditTwo_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    claim () { // 复审订单认领功能
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.myAudit_claim,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          operType: 2
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.listAll()
          }else{
            this.$globalMsg.error(res.data.header.msg)
          }
        })
      }
    },
    chuPeople () { // 获取初审人员列表数据
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
          this.options2 = arr
        }
      })
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
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.approveTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0])
        this.formInline.approveTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1])
      } else {
        this.formInline.approveTimeBegin = ''
        this.formInline.approveTimeEnd = ''
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.approvAllotTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0])
        this.formInline.approvAllotTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1])
      } else {
        this.formInline.approvAllotTimeBegin = ''
        this.formInline.approvAllotTimeEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.level = Number(sessionStorage.getItem('level'))
    this.userName = sessionStorage.getItem('name')
    if (JSON.stringify(this.$store.state.common.myrengongfushen_select) !== '{}') {
      this.formInline = this.$store.state.common.myrengongfushen_select
      if(this.formInline.applyTimeBegin!==''){
        this.searchTime.push(this.formInline.applyTimeBegin)
        this.searchTime.push(this.formInline.applyTimeEnd)
      }
    }
    // this.chuPeople();// 获取复审人员列表数据
    this.listAll()
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
  height: auto;
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
.act{
  padding: 5px 28px 5px 5px;
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
