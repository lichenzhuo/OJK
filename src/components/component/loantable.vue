<template>
  <div v-if="orderNo">
    <div class="tagList">
      <el-tag>{{$t('new.no74')}}:{{tagList.isFirst==1?$t('auditDetail.isAdressBook.no1'):$t('auditDetail.isAdressBook.no2')}}</el-tag>
      <el-tag class="ml15">{{$t('new.no75')}}:{{tagList.loanCount}}</el-tag>
      <el-tag class="ml15">{{$t('new.no76')}}:{{tagList.overdueCount}}</el-tag>
      <el-tag class="ml15">{{$t('new.no77')}}:{{tagList.maxOverdueDays}}</el-tag>
    </div>
    
    <div class="table">
      <template>
        <el-table :data="tableData" stripe size="small">
          <el-table-column align="center" prop="orderNo" :label="$t('public.orderNo')" >
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.backMoneyDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="isOverdue" :label="$t('public.no43')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.overDue(scope.row.isOverdue))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" >
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="willPayBackCount" :label="$t('new.no79')" >
          </el-table-column>
          <el-table-column align="center" prop="refuseRepaymentCount" :label="$t('new.no80')" >
          </el-table-column>
          <el-table-column align="center" prop="noheardCount" :label="$t('new.no81')" >
          </el-table-column>
          <el-table-column align="center" prop="complaintTendencyCount" :label="$t('new.no82')" >
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="100">
            <template slot-scope="scope">
              <span style="color:#547ef6;cursor:pointer;margin:0 5px;" @click="socialDetali(scope.row.orderNo)">{{$t('public.no29')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <!-- <el-row v-if="tableData.length>10" type="flex" justify="center">
      <el-col :lg="18" :xl="11">
        <div class="pages">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next,  ->"
          >
        </el-pagination>
        </div>
      </el-col>
    </el-row> -->

  </div>

</template>
<script>
export default {
  props: [
    'orderNo',
    'userId',
    'tableData',
    'tagList'
  ],
  data () {
    return {
      currentPage: 1, // 分页当前页下标
      // 下拉选框选中项
      status1: '',
      id: ''// 当前行的ID

    }
  },
  computed:{
    isFirst(){
      return this.$t('new.74')+':'+(this.tagList.isFirst==1?this.$t('auditDetail.isAdressBook.no1'):this.$t('auditDetail.isAdressBook.no2'))
    }
  },
  methods: {
    socialDetali (orderNo) {
      this.$router.push({path: '/loanmoneydetail', query: {orderNo, userId: this.userId}})
    }

  },
  mounted () {
    
  }
}
</script>
<style lang="scss" scoped>


.table {
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
}

.tagList{
  padding: 10px 0;
}


</style>
