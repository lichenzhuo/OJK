<template>
  <div v-if="orderNo">
    <div class="tagList" v-if="$store.state.common.lang!=='PHL'">
      <el-tag>{{$t('new.no74')}}:{{tagList.isFirst==1?$t('auditDetail.isAdressBook.no1'):$t('auditDetail.isAdressBook.no2')}}</el-tag>
      <el-tag class="ml15">{{$t('new.no75')}}:{{tagList.loanCount}}</el-tag>
      <el-tag class="ml15">{{$t('new.no76')}}:{{tagList.overdueCount}}</el-tag>
      <el-tag class="ml15">{{$t('new.no77')}}:{{tagList.maxOverdueDays}}</el-tag>
    </div>

    <div class="table">
      <template>
        <el-table :data="tableData" stripe size="small">
          <el-table-column align="center" prop="orderNo" :label="$t('public.orderNo')"></el-table-column>
          <el-table-column
            align="center"
            prop="strLastRefundTime"
            :label="$t('public.backMoneyDate')"
            width="86"
          ></el-table-column>
          <el-table-column align="center" prop="isOverdue" :label="$t('public.no43')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.overDue(scope.row.isOverdue))}}</span>
            </template>
          </el-table-column>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="instalment" :label="$t('fei.no17')"></el-table-column>
          </template>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="overdueDays" :label="$t('fei.no20')"></el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')"></el-table-column>
          </template>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="还款计划">
            <template slot-scope="scope">
              <span
                v-if="scope.row.status==43||scope.row.status==50||scope.row.status==51||scope.row.status==-50"
                class="table_opr"
                @click="Plan(scope.row.orderNo)"
              >{{$t('public.no29')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="willPayBackCount" :label="$t('new.no79')"></el-table-column>
          <el-table-column align="center" prop="refuseRepaymentCount" :label="$t('new.no80')"></el-table-column>
          <el-table-column align="center" prop="noheardCount" :label="$t('new.no81')"></el-table-column>
          <el-table-column align="center" prop="complaintTendencyCount" :label="$t('new.no82')"></el-table-column>
          <el-table-column
            align="center"
            prop="operation"
            :label="$t('public.operation')"
            min-width="100"
          >
            <template slot-scope="scope">
              <span class="table_opr" @click="socialDetali(scope.row.orderNo)">{{$t('public.no29')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog title="还款计划" :visible.sync="dialogPlanVisible2" width="1000px">
      <el-table :data="PlanData2">
        <el-table-column label="期数" prop="stages" align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.stages}}期</span>
          </template>
        </el-table-column>
        <el-table-column label="本期应还时间" prop="dueTime" width="120px" align="center"></el-table-column>
        <el-table-column label="本期应还本息" prop="amount" align="center"></el-table-column>
        <el-table-column label="本期逾期天数" prop="overDueDays" align="center"></el-table-column>
        <el-table-column label="本期逾期罚息" prop="overdueInterest" align="center"></el-table-column>
        <el-table-column label="本期应还金额" prop="returnMoney" align="center"></el-table-column>
        <el-table-column label="已还金额" prop="repayAmount" align="center"></el-table-column>
        <el-table-column label="还款状态" prop="status" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==51">已还清</span>
            <span v-else>未还清</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
    </el-row>-->
  </div>
</template>
<script>
export default {
  props: ["orderNo", "userId", "tableData", "tagList"],
  data() {
    return {
      sessionid: "",
      dialogPlanVisible2: false, //还款计划弹框
      PlanData2: [], //还款计划数据
      currentPage: 1, // 分页当前页下标
      // 下拉选框选中项
      status1: "",
      id: "" // 当前行的ID
    };
  },
  computed: {
    isFirst() {
      return (
        this.$t("new.74") +
        ":" +
        (this.tagList.isFirst == 1
          ? this.$t("auditDetail.isAdressBook.no1")
          : this.$t("auditDetail.isAdressBook.no2"))
      );
    }
  },
  methods: {
    Plan(e) {
      console.log(e);
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.OrderPlan,
          sessionid: this.sessionid
        },
        orderNo: e
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          console.log(res, 1111);
          this.PlanData2 = res.data.data;
          this.dialogPlanVisible2 = true;
        } else {
        }
      });
    },
    socialDetali(orderNo) {
      this.$router.push({
        path: "/loanmoneydetail",
        query: { orderNo, userId: this.userId }
      });
    }
  },
  mounted() {
    this.sessionid = sessionStorage.getItem("sessionid");
  }
};
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
}

.tagList {
  padding: 10px 0;
}
</style>
