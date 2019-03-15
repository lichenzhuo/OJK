<template>
  <div class="gezi" v-if="userId&&orderNo">
    <div class="list_operation mt0" style="margin-top:0;">
      <el-button  type="primary" :class="{active:activeId==1}"  @click="filter('',1)">
        {{$t('auditDetail.no34')}}
      </el-button>
      <el-button class="ml15" type="primary" :class="{active:activeId==4}" @click="filter('MultiLoan',4)">
        {{$t('auditDetail.no69')}}{{noteDataNum.multiLoanCount?noteDataNum.multiLoanCount:0}}{{$t('auditDetail.no9')}}
      </el-button>
      <el-button class="ml15" type="primary" :class="{active:activeId==2}" @click="filter('isOver',2)">
        {{$t('auditDetail.no35')}}{{noteDataNum.overdueCount?noteDataNum.overdueCount:0}}{{$t('auditDetail.no9')}}
      </el-button>
      <el-button class="ml15" type="primary" :class="{active:activeId==3}" @click="filter('LendingCompanyPhone',3)">
        {{$t('auditDetail.no70')}}{{noteDataNum.phoneCount?noteDataNum.phoneCount:0}}{{$t('auditDetail.no9')}}
      </el-button>
    </div>
    <div class="table">
      <template>
        <el-table :data="tableData" v-loading="loading" stripe>
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')">
          </el-table-column>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="operator" :label="$t('fei.no8')">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="messageContent" :label="$t('auditDetail.no31')">
          </el-table-column>
          <el-table-column align="center" prop="callOrOut" :label="$t('public.no22')">
            <template slot-scope="scope">
              <span v-if="scope.row.callOrOut!==null&&scope.row.callOrOut!==undefined&&scope.row.callOrOut!==''" style="cursor:pointer">{{scope.row.callOrOut==1?$t('auditDetail.no32'):$t('auditDetail.no33')}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="messageTime" :label="$t('auditDetail.no41')">
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
          :total="pageTotal?pageTotal:0"
          >
        </el-pagination>
      </div>
    </el-row>


  </div>

</template>
<script>
export default {
  props: {
    orderNo: [String, Number],
    userId: [String, Number]
  },
  data () {
    return {
      sessionid: '',
      activeId: 1,
      pageTotal: 0,
      tableData: [], // 表格信息数据模拟
      currentPage: 1, // 分页当前页下标
      flag: false, // 弹窗开关
      status1: '', // 下拉选框选中项
      keywords: '', // 当前选中的关键词
      noteDataNum: {// 短信标签个数统计
        multiLoanCount: '', // 多头借贷条数
        overdueCount: '', // 逾期短信条数
        phoneCount: ''// 贷款平台电话
      },
      loading: true
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.noteRecord_List,
          'page': {'index': val, 'size': 10},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId,
        keywords: this.keywords
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
        }
      })
    },
    filter (str, id) { // 敏感词点击操作
      this.activeId = id
      this.keywords = str
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.noteRecord_List,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId,
        keywords: str
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    noteList () { // 短信记录列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.noteRecord_List,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId
      }
      this.$axios.post('',option).then(res=>{
        this.loading = false;
        if(res.data.header.code==0){
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    noteDataNumber () { // 短信标签记录统计
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.noteNumber,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.noteDataNum.overdueCount = res.data.data.overdueCount;
          this.noteDataNum.multiLoanCount = res.data.data.multiLoanCount;
          this.noteDataNum.phoneCount = res.data.data.phoneCount;
        }
      })
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (this.orderNo) {
      this.noteList();
      this.noteDataNumber();
    }
  }
}
</script>
<style lang="scss" scoped>

.gezi{
  width: 100%;
  height: auto;
  position: relative;
}
.table {
  width: 100%;
  min-height: 200px;
}

</style>
