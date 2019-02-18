<template>
  <div class="gezi" v-if="orderNo">
    <div class="tagList">
      <el-tag>{{$t('new.no74')}}:{{tagList.isFirst==1?$t('auditDetail.isAdressBook.no1'):$t('auditDetail.isAdressBook.no2')}}</el-tag>
      <el-tag>{{$t('new.no75')}}:{{tagList.loanCount}}</el-tag>
      <el-tag>{{$t('new.no76')}}:{{tagList.overdueCount}}</el-tag>
      <el-tag>{{$t('new.no77')}}:{{tagList.maxOverdueDays}}</el-tag>
    </div>
    
    <div class="table">
      <template>
        <el-table :data="tableData" stripe style="width: 100%" >
          <el-table-column align="center" prop="orderNo" :label="$t('public.orderNo')" >
          </el-table-column>
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" min-width="95">
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no24')" >
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no25')" >
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')" >
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.backMoneyDate')" min-width="95">
          </el-table-column>
          <el-table-column align="center" prop="isOverdue" :label="$t('public.no43')" >
            <template slot-scope="scope">
              <span v-if="scope.row.isOverdue!==null&&scope.row.isOverdue!==undefined&&scope.row.isOverdue!=''">{{$t($store.getters.overDue(scope.row.isOverdue))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')" >
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" >
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
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
  props: {
    orderNo: [String, Number],
    userId: [String, Number],
    tableData: [Object, Array],
    tagList: [Object, Array]
  },
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
    handleCurrentChange (val) {
      this.currentPage = val
    },
    socialDetali (orderNo) {
      this.$router.push({path: '/loanmoneydetail', query: {orderNo, userId: this.userId}})
    }

  },
  mounted () {
    
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

.table {
  width: 100%;
  min-height: 340px;
}
span.active1{
  color: #FF6700;
}
span.active2{
  color: #8FD78D;
}
span.active3{
  color: #3b56ee;
}


.reply{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main{
    width: 694px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .reply-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .reply-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .chu-select{
        margin: 20px 20px;
        padding: 5px 0;
        display: flex;
        .chu-select-left{
          width: 15%;
          
        }
        .chu-select-right{
          width: 85%;
          .search_inpu{
            width: 100%;
            height: 150px;
            padding: 5px;
            font-size: 16px;
          }
        }
      }
      .reply-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 0 auto;
        text-align: center;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
.tagList{
  padding: 10px 0;
}


</style>
