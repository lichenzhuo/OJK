<template>
  <div class="gezi" v-if="orderNo">
    <div class="table">
      <template>
        <el-table :data="tableData" stripe style="width: 100%" >
          <el-table-column align="center" prop="contactName" :label="$t('public.name')" width="140">
          </el-table-column>
          <el-table-column align="center" prop="relationName" :label="$t('public.no17')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="contactPhone" :label="$t('public.no18')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('operationDetail.no16')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.type!==null&&scope.row.type!==undefined&&scope.row.type!==''">
                {{scope.row.type==1?$t('operationDetail.type.no1'):$t('operationDetail.type.no2')}}
              </span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('operationDetail.no17')" min-width="400">
            <template slot-scope="scope">
              <template v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">
                {{$t('operationDetail.no10')+':'+$t($store.getters.operationStatus(scope.row.status))}},
              </template>
              <template v-else>
                {{$t('operationDetail.no10')+':'+$store.state.common.nullData}},
              </template>
              <template v-if="scope.row.promise!==null&&scope.row.promise!==undefined&&scope.row.promise!==''">
                {{$t('operationDetail.no7')+':'+(scope.row.promise==1?$t('operationDetail.no11'):$t('operationDetail.no12'))}},
              </template>
              <template v-else>
                {{$t('operationDetail.no7')+':'+$store.state.common.nullData}},
              </template>
              <template v-if="scope.row.strPromiseTime!==null&&scope.row.strPromiseTime!==undefined&&scope.row.strPromiseTime!==''">
                {{$t('operationDetail.no8')+':'+scope.row.strPromiseTime}},
              </template>
              <template v-else>
                {{$t('operationDetail.no8')+':'+$store.state.common.nullData}},
              </template>
              <template v-if="scope.row.remark!==null&&scope.row.remark!==undefined&&scope.row.remark!==''">
                {{$t('operationDetail.no9')+':'+scope.row.remark}}
              </template>
              <template v-else>
                {{$t('operationDetail.no9')+':'+$store.state.common.nullData}},
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('operationDetail.no18')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('operationDetail.no19')" min-width="100">
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
      this.currentPage = val
      this.tableList()
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
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (this.orderNo) {
      this.tableList()
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

.table {
  width: 100%;
  min-height: 240px;
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
