<template>
  <div class="gezi">
    <div class="table">
      <template>
        <el-table :data="tableData" stripe style="width: 100%;height:100%" height="450px">
          <el-table-column align="center" prop="userName" :label="$t('public.name')" width="100">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" min-width="90">
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" :label="$t('public.no56')" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no65')" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="waitAmount" :label="$t('loanAfterManage.waitAmount')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.waitAmount!==null&&scope.row.waitAmount!==undefined&&scope.row.waitAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.waitAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="lastTime" :label="$t('loanAfterManage.time')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="collectionStatus" :label="$t('loanAfterManage.status')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.collectionStatus!==null&&scope.row.collectionStatus!==undefined&&scope.row.collectionStatus!==''">{{$t($store.getters.operationStatus(scope.row.collectionStatus))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    
    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <el-col :md="14" :lg="12" :xl="11">
        <div class="pages">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next,  ->"
          :total="pageTotal?pageTotal:0"
          >
        </el-pagination>
        </div>
      </el-col>
    </el-row>

  </div>

</template>
<script>
export default {
  props: {
    time: [String, Number],
    adminId: [String, Number],
    groupId: [String, Number],
    type: [String, Number]
  },
  data () {
    return {
      pageTotal: 0, // 表格信息数据模拟
      tableData: [],
      currentPage: 1, // 分页当前页下标
      id: ''
    }
  },
  computed: {
    type1 () {
      let type = ''
      if (this.type == 'S1') {
        type = 1
      }
      if (this.type == 'S2') {
        type = 2
      }
      if (this.type == 'M1') {
        type = 3
      }
      if (this.type == 'M2') {
        type = 4
      }
      if (this.type == 'M3') {
        type = 5
      }
      return type
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.todayCollection_detail,
          'page': {'index': val, 'size': 10},
          'sessionid': this.sessionid
        },
        adminId: this.adminId,
        groupId: this.groupId,
        type: this.type1,
        beginTime: this.time + ' 00:00:00',
        endTime: this.time + ' 23:59:59'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
        }
      })
    },
    tableList () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.todayCollection_detail,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        adminId: this.adminId,
        groupId: this.groupId,
        type: this.type1,
        beginTime: this.time + ' 00:00:00',
        endTime: this.time + ' 23:59:59'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    }
  },
  watch: {

  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.tableList()
  }
}
</script>
<style lang="scss" scoped>
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gezi{
  width: 100%;
  min-height: 450px;
  position: relative;
}

.table {
  width: 100%;
  height: auto;
}



</style>
