<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('myAuditList.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('myAuditList.no2')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('myAuditList.no3')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.orderId"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.userId"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.name"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.registerPhone')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.phone"></el-input>
          </div>
          <div class="search-input" v-if="$store.state.common.lang==='PHL'">
            <span>{{$t('fei.no17')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.instalment"></el-input>
          </div>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no8')}}:</span>
          <el-select size="small" v-model="formInline.trackStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('add.no86')}}:</span>
          <el-select size="small" v-model="formInline.isNew" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options10" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-------------- 首贷、复贷下拉框 ----------------->
         <div class="search-input">
         <span>{{$t('public.no91')}}:</span>
          <el-select clearable  size="small" v-model="formInline.isRepeat" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- <template v-if="$store.state.common.lang==='vi'">
          <div class="search-input">
            <span>{{$t('websiteLoans.no5')}}:</span>
            <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options4" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template> -->
        <div class="search-input">
          <span>{{$t('public.CreateDate')}}:</span>
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
        <div class="search-input">
          <span>{{$t('new.no9')}}:</span>
          <el-date-picker 
            size="small"
            v-model="searchTime1" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <div class="search-input">
          <span>{{$t('new.no13')}}:</span>
          <el-date-picker 
            size="small"
            v-model="searchTime2" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <div class="search-input"
          v-if="$store.state.common.permiss.includes('RIGHT_ME_FIRST_QUERY')">
          <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>

    <template v-if="level!==1">
      <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_ME_FIRST_CLAIM')">
        <el-button type="primary" @click="claim">{{$t('myAuditList.no4')}}</el-button>
      </div>
    </template>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ME_FIRST_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe >
          <el-table-column align="center" prop="id" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')">
          </el-table-column>
          <!---------- tag标签 --------------->
          <template v-if="$store.state.common.lang==='id'">
             <el-table-column align="center" prop="userName" :label="$t('public.name')">
              <template slot-scope="scope">
                <span>{{scope.row.userName}}</span>
                <el-tag size="mini" :type="scope.row.isRepeat==1?'success':'warning'">{{scope.row.isRepeat==1?'R':'F'}}</el-tag>
                <!-- <el-tag type="warning" v-if="scope.row.isFirst==1" size="small">First loan</el-tag>
                <el-tag type="success" v-else size="small">reloan</el-tag> -->
               </template>
            </el-table-column>
          </template>
          <template v-if="$store.state.common.lang!=='id'">
             <el-table-column align="center" prop="userName" :label="$t('public.name')">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="loanAmount" label="借款金额">
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" label="借款周期">
          </el-table-column>
          <el-table-column align="center" prop="totalPeriod" :label="$t('ojk.no1')">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="userPhone" :label="$t('yuenan.no23')">
              <template slot-scope="scope">
                <span >{{$store.getters.vn_phone(scope.row.userPhone)}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')">
              <template slot-scope="scope">
                <span>{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
              </template>
            </el-table-column> -->
          </template>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="instalment" :label="$t('fei.no17')">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strApproveTime" :label="$t('new.no9')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strFirstApproveAllotTime" :label="$t('new.no13')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="trackStatus" :label="$t('new.no8')">
            <template slot-scope="scope">
              <span >{{$t($store.getters.follow_status(scope.row.trackStatus))}}</span>
              <!-- <span v-else>{{$t($store.getters.follow_status_phl(scope.row.trackStatus))}}</span> -->
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('public.no32')">
            <template>
              <span>{{userName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isNew" :label="$t('add.no86')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.userTypeNewOldOther_status(scope.row.isNew))}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_ME_FIRST')">
              <span
                
                class="table_opr"
                @click="socialDetali(scope.row.orderNo, scope.row.userId, scope.row.id, scope.row.isFirst)">
                {{scope.row.status!=20?$t('public.no29'):$t('myAuditList.no5')}}
              </span>
              <!-- <span 
                v-else
                class="table_opr"
                @click="socialDetali(scope.row.orderNo,scope.row.userId,scope.row.id)">
                {{$t('myAuditList.no5')}}
              </span> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_ME_FIRST_LIST')">
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
  name: 'myAuditFirstList',
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
      searchTime2: [], // 审核日期
      formInline: {// 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        instalment: '',
        orderLoanType: '',
        trackStatus: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        approveTimeBegin: '',
        approveTimeEnd: '',
        approvAllotTimeBegin: '',
        approvAllotTimeEnd: '',
        orderState: '',
        isRepeat:''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.peopleAuditOneStatus_options, // 订单状态下拉选框信息
      // options2: this.$store.state.options.follow_option, // 跟踪状态下拉选框信息
      options3: this.$store.state.options.isRepeat_option, // 首贷、复贷下拉选框信息
      options4: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      options10: this.$store.state.options.userType_option, // 用户类型
      tableData: []// 用户信息数据模拟

    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.listAll();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.listAll();
    },
    socialDetali (orderNo, userid, orderId, isFirst) { // 点击人工初审跳转
      if(this.$store.state.common.lang==='PHL'){
        if(isFirst==1){
          this.$router.push({path: '/chushendetail', query: {orderNo, userid, orderId, block: 2}});
        }else{
          this.$router.push({path: '/oldpeople', query: {orderNo, userid, orderId, block: 2}});
        }
      }else{
        this.$router.push({path: '/chushendetail', query: {orderNo, userid, orderId, block: 2}});
      }
    },
    select () { // 查询按钮点击操作
      this.$store.commit('myrengongchushenList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.listAll();
      }
    },
    listAll () { // 获取订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.myAuditOne_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    claim () { // 初审订单认领功能
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.myAudit_claim,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          operType: 1
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.listAll();
          }else{
            this.$globalMsg.error(res.data.header.msg);
          }
        })
      }
    }
  },
  computed: {
    options2(){
      if(this.$store.state.common.lang!=='PHL'){
        return this.$store.state.options.follow_option
      }else{
        return this.$store.state.options.follow_option_phl
      }
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
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.approveTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.approveTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.approveTimeBegin = '';
        this.formInline.approveTimeEnd = '';
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.approvAllotTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.approvAllotTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.approvAllotTimeBegin = '';
        this.formInline.approvAllotTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.level = Number(sessionStorage.getItem('level'));
    this.userName = sessionStorage.getItem('name');
    if (JSON.stringify(this.$store.state.common.myrengongchushen_select) !== '{}') {
      this.formInline = this.$store.state.common.myrengongchushen_select;
      if(this.formInline.applyTimeBegin!==''){
        this.searchTime.push(this.formInline.applyTimeBegin);
        this.searchTime.push(this.formInline.applyTimeEnd);
      }
      
    }
    this.listAll();
  }
}
</script>
<style scoped lang="scss">

</style>
