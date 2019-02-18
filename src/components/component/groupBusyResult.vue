<template>
  <div class="groupBusyResult" >

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" >
        <div class="search-input" >
            <span>{{$t('new.no94')}}:</span>
            <el-date-picker 
              id="latecollection"
              size="small"
              v-model="searchTime5" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
          <div class="search-input" >
            <span>{{$t('new.no95')}}:</span>
            <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <div class="search-input">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table">
      <template>
        <el-table :data="tableData" stripe style="width: 100%"  empty-text>
          <el-table-column align="center" prop="name" :label="$t('public.name')" >
          </el-table-column>
          <el-table-column align="center" prop="relationName" :label="$t('public.no17')" >
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.no18')" >
          </el-table-column>
          <el-table-column align="center" prop="strCallTime" :label="$t('new.no94')" >
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('new.no95')" >
            <template slot-scope="scope">
              <span >{{$t($store.getters.callStatus_status(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="duration" :label="$t('new.no91')" >
          </el-table-column>
          <el-table-column align="center" prop="isUrgentContact" :label="$t('new.no92')" >
            <template slot-scope="scope">
              <span >{{$t($store.getters.is_addressBook(scope.row.isUrgentContact))}}</span>
            </template>
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
          layout="prev, pager, next, total,->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'groupBusyResult',
  props: {
    orderNo: [String, Number],
    type: [String, Number],
  },
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      searchTime5: [],
      formInline: {
        status: '',
        callStartTime:'',
        callEndTime:''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.groupCalls_options, // 入催状态下拉选框信息
      tableData: []// 列表数据模拟
    }
  },
  methods: {
    handleCurrentChange (val) { // 点击分页按钮操作
      this.currentPage = val
      this.getTableList();
    },
    getTableList () { // 入催订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.MECOLLECTION00011,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline,
        orderNo: this.orderNo,
        type:this.type
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    select () { // 查询按钮点击操作
      this.getTableList();
    }
  },
  watch: {
    searchTime5 () {
      if (this.searchTime5) {
        this.formInline.callStartTime = this.searchTime5[0]
        this.formInline.callEndTime = this.searchTime5[1]
      } else {
        this.formInline.callStartTime = ''
        this.formInline.callEndTime = ''
      }
    },
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (this.orderNo) {
      this.getTableList();
    }
  }
}
</script>
<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}

.groupBusyResult {
  width: 100%;
  height: auto;
  // padding: 10px;
  // background-color: rgba(246, 249, 252, 1);
  position: relative;
}

.search {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  // margin-top: 18px;
  margin-bottom: 22px;
  // padding: 6px 28px 6px 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  .search-input {
    height: 50px;
    display: flex;
    align-items: center;
    margin-right: 10px;
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
  min-height: 230px;
}

</style>
