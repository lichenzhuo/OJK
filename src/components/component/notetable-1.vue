<template>
  <div class="gezi" v-if="userId&&orderNo">
    <div class="search">
      <div class="search-input" :class="{active:activeId==1}"  @click="filter('',1)">
        {{$t('auditDetail.no34')}}
      </div>
      <div class="search-input" :class="{active:activeId==2}" @click="filter('逾期',2)">
        {{$t('auditDetail.no35')}}{{noteDataNum.overdueCount?noteDataNum.overdueCount:0}}{{$t('auditDetail.no9')}}
      </div>
      <div class="search-input" :class="{active:activeId==3}" @click="filter('欠债',3)">
        {{$t('auditDetail.no36')}}{{noteDataNum.debtCount?noteDataNum.debtCount:0}}{{$t('auditDetail.no9')}}
      </div>
    </div>
    <div class="table">
      <template>
        <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')" width="120">
          </el-table-column>
          <el-table-column align="center" prop="messageContent" :label="$t('auditDetail.no31')" min-width="300">
          </el-table-column>
          <el-table-column align="center" prop="callOrOut" :label="$t('public.no22')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.callOrOut!==null&&scope.row.callOrOut!==undefined&&scope.row.callOrOut!==''" style="cursor:pointer">{{scope.row.callOrOut==1?$t('auditDetail.no32'):$t('auditDetail.no33')}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strMessageTime" :label="$t('auditDetail.no41')" min-width="140">
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="center">
      <el-col :md="14" :lg="12" :xl="11">
        <div class="pages">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
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
    orderNo: [String, Number],
    userId: [String, Number]
  },
  data () {
    return {
      sessionid: '',
      activeId: 1,
      pageTotal: 0,
      length: '',
      tableData: [], // 表格信息数据模拟
      dataTotal: [], // 全部信息数据
      currentPage: 1, // 分页当前页下标
      flag: false, // 弹窗开关
      status1: '', // 下拉选框选中项
      keywords: '', // 当前选中的关键词
      noteDataNum: {// 短信标签个数统计
        overdueCount: '', // 逾期短信条数
        debtCount: ''// 欠债短信条数
      },
      loading: true,
      everyData: [], // 全部数据
      isOverData: [], // 逾期数据
      debtDueData: [], // 欠债数据
      length1: '', // 催收数据长度
      length2: ''// 联系人数据长度
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      if (this.activeId == 1) {
        this.tableData = this.everyData.slice((val - 1) * 10, ((val - 1) * 10) + 10)
      }
      if (this.activeId == 2) {
        this.tableData = this.isOverData.slice((val - 1) * 10, ((val - 1) * 10) + 10)
      }
      if (this.activeId == 3) {
        this.tableData = this.debtDueData.slice((val - 1) * 10, ((val - 1) * 10) + 10)
      }
    },
    filter (str, id) { // 敏感词点击操作
      this.keywords = str
      this.activeId = id
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
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.dataTotal = res.data.data
          // 全部数据
          this.everyData = this.dataTotal
          this.tableData = this.dataTotal.slice(0, 10)
          this.length = res.data.data.length
          this.pageTotal = this.length
          // 逾期数据
          this.isOverData = this.dataTotal.filter(value => {
            return value.isOver == 1
          })
          this.length1 = this.isOverData.length
          this.noteDataNum.overdueCount = this.length1
          // 欠钱数据
          this.debtDueData = this.dataTotal.filter(value => {
            return value.debtDue == 1
          })
          this.length2 = this.debtDueData.length
          this.noteDataNum.debtCount = this.length2
        }
      })
    }
  },
  watch: {
    tableData () {
      if (this.tableData) {
        this.loading = false
      }
    },
    activeId () {
      if (this.activeId == 1) {
        this.tableData = this.everyData.slice(0, 10)
        this.pageTotal = this.length
        this.currentPage = 1
      }
      if (this.activeId == 2) {
        this.tableData = this.isOverData.slice(0, 10)
        this.pageTotal = this.length1
        this.currentPage = 1
      }
      if (this.activeId == 3) {
        this.tableData = this.debtDueData.slice(0, 10)
        this.pageTotal = this.length2
        this.currentPage = 1
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (this.orderNo) {
      this.noteList()
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
.search {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-bottom: 22px;
  padding: 10px 10px 10px 5px;
  display: flex;
  justify-content: flex-start;
  .search-input {
    width: auto;
    height: 50px;
    padding: 0 30px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #000;
    cursor: pointer;
  }
  .active{
    color: #fff;
    background-color: #547ef5;
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

.pages{
  height: 50px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
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
