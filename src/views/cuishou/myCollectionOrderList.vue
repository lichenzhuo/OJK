<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('operationList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('operationList.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('operationList.crumbsTwo')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" >
        <el-col :md="8" :lg="5" :xl="4">
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
          <el-input size="small" style="width:50px"   v-model="formInline.overdueDaysBegin"></el-input>
          ~
          <el-input size="small" style="width:50px"   v-model="formInline.overdueDaysEnd"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('new.no77')}}:</span>
          <el-input size="small" style="width:50px"   v-model="formInline.maxOverdueDaysBegin"></el-input>
          ~
          <el-input size="small" style="width:50px"   v-model="formInline.maxOverdueDaysEnd"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('new.no78')}}:</span>
          <el-input size="small" style="width:50px"   v-model="formInline.repeatCountBegin"></el-input>
          ~
          <el-input size="small" style="width:50px"   v-model="formInline.repeatCountEnd"></el-input>
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
        <div class="search-input ml15">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table">
      <template>
        <el-table :data="tableData" size="small">
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')">
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('add.no2')">
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="waitAmount" :label="$t('loanAfterManage.waitAmount')">
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.waitAmount)}}{{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="userPhone" :label="$t('fei.no17')">
            </el-table-column>
            <el-table-column align="center" prop="userPhone" :label="$t('fei.no37')">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')">
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" :label="$t('public.no56')">
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')">
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strLastTime" :label="$t('loanAfterManage.time')" width="86">
          </el-table-column>
          <template>
            <el-table-column align="center" prop="strLastTime" :label="$t('fei.no38')" width="86">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.no71')" width="86">
          </el-table-column>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="strPromiseTime" :label="$t('operationDetail.no8')" width="86">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="status" :label="$t('loanAfterManage.status')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.operationStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="maxOverdueDays" :label="$t('new.no77')">
          </el-table-column>
          <el-table-column align="center" prop="repeatCount" :label="$t('new.no78')">
          </el-table-column>
          <template v-if="$store.state.common.lang!=='PHL'">
            <el-table-column align="center" prop="strCallTime" :label="$t('new.no83')" width="86">
            </el-table-column>
            <el-table-column align="center" prop="callStatus" :label="$t('new.no84')">
              <template slot-scope="scope">
                <span >{{$t($store.getters.callStatus_status(scope.row.callStatus))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="180">
            <template slot-scope="scope">
              <span 
                v-if="!(scope.row.status==100||(scope.row.dealStatus>0&&scope.row.dealStatus<3))"
                class="table_opr"
                @click="socialDetali(scope.row.orderNo,scope.row.orderId)">
                {{$t('operationList.no1')}}
              </span>
              <template v-if="$store.state.common.lang==='id'&&scope.row.blackStatus===0">
                <span class="table_opr" @click="openAudit('1',scope.row.userId,scope.row.orderId)"
                v-if="$store.state.common.permiss.includes('RIGHT_COLLECT_ME_OTHER_REPAYMENT')">{{$t('yn.no43')}}</span>
                <span class="table_opr" @click="openAudit('2',scope.row.userId,scope.row.orderId)"
                v-if="$store.state.common.permiss.includes('RIGHT_COLLECT_ME_BAD_ATTITUDE')">{{$t('yn.no44')}}</span>
              </template>
              <template v-else>
                <span class="table_opr cl777" 
                v-if="$store.state.common.permiss.includes('RIGHT_COLLECT_ME_OTHER_REPAYMENT')">{{$t('yn.no43')}}</span>
                <span class="table_opr cl777" 
                v-if="$store.state.common.permiss.includes('RIGHT_COLLECT_ME_BAD_ATTITUDE')">{{$t('yn.no44')}}</span>
              </template>
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

    <el-dialog :title="auditTitle" :visible.sync="auditFlag" width="650px">
      <div class="left2right">
        <span class="left">{{$t('public.no37')}}:</span>
        <div class="right">
          <el-input type="textarea" :rows="4" v-model="remark"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left"></span>
        <div class="right">
          <el-button type="primary" size="small" @click="auditSubmit">{{$t('public.no41')}}</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: 'myCollectionOrderList',
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
      auditFlag: false,
      sign: '',
      auditTitle: '',
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
      tableData: [],// 列表数据模拟
      remark: '', // 弹窗备注内容
      orderId: '',// 他人还款或者态度恶劣选中行订单ID
      userId: '',// 他人还款或者态度恶劣选中行用户ID
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.operationList();
    },
    handleCurrentChange (val) { // 点击分页按钮操作
      this.currentPage = val;
      this.operationList();
    },
    socialDetali (orderNo,orderId) { // 查看详情
      this.$router.push({path: '/cuishoudetail', query: {orderNo, orderId, type: '1'}});
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
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 查询按钮点击操作
      this.$store.commit('mycuishouList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.operationList();
      }
    },
    openAudit( str, userId, orderId){// 审核弹窗
      if(str==='1'){
        this.auditTitle = this.$t('yn.no43');
      }
      if(str==='2'){
        this.auditTitle = this.$t('yn.no44');
      }
      this.sign = str;
      this.userId = userId;
      this.orderId = orderId;
      this.auditFlag = true;
    },
    auditSubmit(){// 审核确认操作
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.MECOLLECTION00012,
          'sessionid': this.sessionid
        },
        blackStatus: this.sign,
        remark: this.remark,
        orderId: this.orderId,
        userId: this.userId,
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('userSuggest.success'));
          this.operationList();
          this.remark = '';
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
        this.auditFlag = false;
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.collectionTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.collectionTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.collectionTimeBegin = '';
        this.formInline.collectionTimeEnd = '';
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.goCollectionTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.goCollectionTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.goCollectionTimeBegin = '';
        this.formInline.goCollectionTimeEnd = '';
      }
    },
    searchTime4 () {
      if (this.searchTime4) {
        this.formInline.promiseTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime4[0]);
        this.formInline.promiseTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime4[1]);
      } else {
        this.formInline.promiseTimeBegin = '';
        this.formInline.promiseTimeEnd = '';
      }
    },
    searchTime5 () {
      if (this.searchTime5) {
        this.formInline.callStartTime = this.$store.getters.yyyy_m_d(this.searchTime5[0]);
        this.formInline.callEndTime = this.$store.getters.yyyy_m_d(this.searchTime5[1]);
      } else {
        this.formInline.callStartTime = '';
        this.formInline.callEndTime = '';
      }
    },
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    // if (JSON.stringify(this.$store.state.common.mycuishouList_select) !== '{}') {
    //   this.formInline = this.$store.state.common.mycuishouList_select;
    //   if(this.formInline.collectionTimeBegin!==''){
    //     this.searchTime.push(this.formInline.collectionTimeBegin);
    //     this.searchTime.push(this.formInline.collectionTimeEnd);
    //   }
    // }
    this.operationList();
  }
}
</script>

<style scoped lang="scss">
.cl777{
  color: #777;
}
</style>
