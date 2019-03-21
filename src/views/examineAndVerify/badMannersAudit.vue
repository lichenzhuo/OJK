<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('auditManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('yn.no37')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('yn.no37')}}</p>
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
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" label="userName" v-model="formInline.userName"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>{{$t('public.submitDate')}}:</span>
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
        <div class="search-input ml15" v-if="$store.state.common.permiss.includes('RIGHT_BAD_ATTITUDE_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_BAD_ATTITUDE_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')">
          </el-table-column>
          <el-table-column align="center" prop="waitAmount" :label="$t('public.no27')">
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.waitAmount)}}{{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')">
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('yn.no38')">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.submitDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strReviewTime" :label="$t('yn.no39')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="reviewResult" :label="$t('yn.no47')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.reviewResult_status(scope.row.reviewResult))}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="160">
            <template slot-scope="scope">
              <span 
                class="table_opr"
                v-if="$store.state.common.permiss.includes('RIGHT_BAD_ATTITUDE_REVIEW')&&scope.row.reviewResult===0"
                @click="openAuditDialog(scope.row.orderId,scope.row.userId,scope.row.remark)">
                {{$t('public.no76')}}
              </span>
              <span 
                class="table_opr"
                v-if="$store.state.common.permiss.includes('RIGHT_BAD_ATTITUDE_DETAIL')"
                @click="jumpDetali(scope.row.orderNo,scope.row.orderId)">
                {{$t('public.no29')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_BAD_ATTITUDE_LIST')">
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

    <el-dialog :title="$t('public.no76')" :visible.sync="auditFlag" width="650px">
      <div class="left2right">
        <span class="left">{{$t('public.orderId')}}:</span>
        <span class="right">{{orderId}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('public.userId')}}:</span>
        <span class="right">{{userId}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('public.no37')}}:</span>
        <div class="right">{{remark}}</div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('yn.no42')}}:</span>
        <div class="right">
          <el-select size="small" v-model="auditStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <p class="red">{{$t('yn.no49')}}</p>
      <div class="left2right">
        <span class="left"></span>
        <div class="right">
          <el-button type="primary" size="small" @click="auditSubmit">{{$t('public.no41')}}</el-button>
        </div>
      </div>
    </el-dialog>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'badMannersAudit',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      currentPage: 1, // 当前页下标
      searchTime: [],
      flag: true,
      auditFlag: false,
      // 用户查询信息数据对应字段
      formInline: {
        userId: '',
        orderId: '',
        uploadTimeBegin: '',
        uploadTimeEnd: '',
      },
      options: this.$store.state.options.auditResult_options, // 同意审核下拉选框信息
      tableData: [],// 列表数据模拟
      auditStatus: '',// 审核是否同意
      remark: '', // 弹窗备注内容
      orderId: '',// 他人还款或者态度恶劣
      userId: '',// 他人还款或者态度恶劣
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.getTableList();
    },
    handleCurrentChange (val) { // 点击分页按钮操作
      this.currentPage = val;
      this.getTableList();
    },
    jumpDetali (orderNo,orderId) { // 查看详情
      this.$router.push({path: '/cuishoudetail', query: {orderNo, orderId, type: '2', from: '2'}});
    },
    getTableList () { // 列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.MECOLLECTION00013,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline,
        blackStatus:'2'
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        } else {
          this.$globalMsg.error(res.data.header.msg);
          this.tableData = [];
        }
      })
    },
    select () { // 查询按钮点击操作
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.getTableList();
      }
    },
    openAuditDialog(orderId, userId, remark){// 审核弹窗
      this.orderId = orderId;
      this.userId = userId;
      this.remark = remark;
      this.auditFlag = true;
    },
    auditSubmit(){// 审核弹窗确认操作
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.MECOLLECTION00014,
          'sessionid': this.sessionid
        },
        reviewResult: this.auditStatus,
        orderId: this.orderId,
        userId: this.userId,
        blackStatus:'2'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('userSuggest.success'));
          this.getTableList();
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
        this.auditStatus = '';
        this.auditFlag = false;
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.uploadTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.uploadTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.uploadTimeBegin = '';
        this.formInline.uploadTimeEnd = '';
      }
    },
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableList();
  }
}
</script>

<style scoped lang="scss">
.red{
  color: crimson;
  margin: 10px;
  padding-left: 30px;
}
</style>
