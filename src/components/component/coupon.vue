<template>
  <div class="coupon" v-if="userId">
    <div class="table">
      <template>
        <el-table :data="tableData" stripe size="small">
          <el-table-column align="center" prop="couponName" :label="$t('filter.couponName')">
          </el-table-column>
          <el-table-column align="center" prop="couponType" :label="$t('filter.couponItem')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.couponTypeState(scope.row.couponType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="couponDays" :label="$t('filter.couponCon')">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType==1||scope.row.couponType==3||scope.row.couponType==5">{{$store.getters.moneySplit(scope.row.couponAmount)}}</span>
              <span v-else-if="scope.row.couponType==2">{{scope.row.couponDays+$t('public.no26')}}</span>
              <span v-else-if="scope.row.couponType==4">{{scope.row.couponInterest}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strReceiveTime" :label="$t('filter.getDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="effectiveTimeBegin" :label="$t('filter.validTime')">
            <template slot-scope="scope">
              <span >{{scope.row.strEffectiveTimeBegin+' - '+scope.row.strEffectiveTimeEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('filter.status')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.couponUseState(scope.row.status))}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row  type="flex" justify="end">
        <div class="pages" >
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next, total,->"
          :total="pageTotal?pageTotal:0">
          size="small"
        </el-pagination>
      </div>
    </el-row>

  </div>

</template>
<script>
export default {
  props: {
    userId: [String, Number]
  },
  data () {
    return {
      currentPage: 1, // 分页当前页下标
      pageTotal: 0, // 分页当前页下标
      tableData: [],
      sessionid:''
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
          action: this.$store.state.actionMap.coupon_userDetail,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        userId: this.userId
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
    this.tableList();
  }
}
</script>
<style lang="scss" scoped>

.coupon{
  width: 100%;
  height: auto;
  position: relative;
}

</style>
