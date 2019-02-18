<template>
  <div class="gezi" v-if="userId">
    <div class="table">
      <template>
        <el-table :data="tableData" stripe style="width: 100%" >
          <el-table-column align="center" prop="couponName" :label="$t('filter.couponName')" width="100">
          </el-table-column>
          <el-table-column align="center" prop="couponType" :label="$t('filter.couponItem')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType!==null&&scope.row.couponType!==undefined&&scope.row.couponType!==''">{{$t($store.getters.couponTypeState(scope.row.couponType))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="couponDays" :label="$t('filter.couponCon')" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType==1||scope.row.couponType==3||scope.row.couponType==5">{{$store.getters.moneySplit(scope.row.couponAmount)}}</span>
              <span v-else-if="scope.row.couponType==2">{{scope.row.couponDays+$t('public.no26')}}</span>
              <span v-else-if="scope.row.couponType==4">{{scope.row.couponInterest}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strReceiveTime" :label="$t('filter.getDate')" min-width="140">
          </el-table-column>
          <el-table-column align="center" prop="effectiveTimeBegin" :label="$t('filter.validTime')" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.effectiveTimeBegin!==null&&scope.row.effectiveTimeBegin!==undefined&&scope.row.effectiveTimeBegin!==''">{{scope.row.strEffectiveTimeBegin+' - '+scope.row.strEffectiveTimeEnd}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('filter.status')" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.couponUseState(scope.row.status))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row  type="flex" justify="center">
        <div class="pages">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="pageTotal?pageTotal:0"
          layout="prev, pager, next,  ->"
          >
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
      this.currentPage = val
      this.tableList()
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
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    }

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
  height: auto;
  position: relative;
}
.search {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-bottom: 22px;
  padding: 10px 10px 10px 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  .search-input {
    height: 50px;
    display: flex;
    align-items: center;
    // margin-right: 10px;
    & > span {
      padding: 0 5px;
      font-size: 14px;
      white-space: nowrap;
      @include flex-cen;
    }
    // .margin{
    //   margin-left: 15px;
    // }
    .el-input {
      flex: auto;
      @include flex-cen;
    }
    .el-date-editor {
      margin: 0 5px;
    }
    .el-select {
      flex: auto;
      @include flex-cen;
    }
    .el-button--primary{
      height: 40px;
    }
    .button-color{
      background-color: #1D7BFF;
      border-color: #547ef6;
    }
  }
}
.table {
  width: 100%;
  min-height: 540px;
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



</style>
