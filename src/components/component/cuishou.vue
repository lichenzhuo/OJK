<template>
  <div class="gezi" v-if="orderNo">
    <div class="table">
      <template>
        <el-table :data="tableData" stripe size="small" style="width: 100%" >
          <el-table-column align="center" prop="contactName" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="relationName" :label="$t('public.no17')">
          </el-table-column>
          <el-table-column align="center" prop="contactPhone" :label="$t('public.no18')">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('operationDetail.no16')">
            <template slot-scope="scope">
              <span>{{scope.row.type==1?$t('operationDetail.type.no1'):$t('operationDetail.type.no2')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('operationDetail.no17')">
            <template slot-scope="scope">
                {{$t('operationDetail.no10')+':'+$t($store.getters.operationStatus(scope.row.status))}},
                {{$t('operationDetail.no7')+':'+(scope.row.promise==1?$t('operationDetail.no11'):$t('operationDetail.no12'))}},
                {{$t('operationDetail.no8')+':'}}{{scope.row.strPromiseTime | dataIsTrue}},
                {{$t('operationDetail.no9')+':'}}{{scope.row.remark | dataIsTrue}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('operationDetail.no18')">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('operationDetail.no19')">
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
    orderNo: [String, Number]
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
          action: this.$store.state.actionMap.cuishou_list,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo
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
    if (this.orderNo) {
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
