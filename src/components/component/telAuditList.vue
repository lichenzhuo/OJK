<template>
  <div class="gezi" v-if="orderId">
    <div class="table">
      <template>
        <el-table :data="tableData"  size="small" >
          <el-table-column align="center" prop="strCreateTime" label="电话时间" >
          </el-table-column>
          <el-table-column align="center" prop="phoneType" label="电话类型" >
          </el-table-column>
          <el-table-column align="center" prop="phoneFeedback" label="电话反馈" >
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注" >
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
          layout="total, prev, pager, next,  ->"
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
    orderId: [String, Number]
  },
  data () {
    return {
      currentPage: 1, // 分页当前页下标
      sessionid: '', // 分页当前页下标
      pageTotal: 0, // 分页当前页下标
      tableData: []
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val;
      this.tableList();
    },
    tableList () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ME0019,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        orderId: this.orderId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (this.orderId) {
      this.tableList();
    }
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
  height: auto;
  position: relative;
}
.table{
  min-height: 220px;
}
</style>
