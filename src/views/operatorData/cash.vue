<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('cash.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('cash.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('cash.crumbsTwo')}}</p>
    </div>
     
  <!-- -------------搜索查询栏------------------------ -->
  <search-filter 
    :filter="filter" 
    @search="search" 
    @output="putExcel" 
    :searchRight="$store.state.common.permiss.includes('RIGHT_RECORD_WITHDRAW_QUERY')" 
    :outputRight="$store.state.common.permiss.includes('RIGHT_RECORD_WITHDRAW_EXP')">
  </search-filter>
  
  <!-- ------------  优惠券列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_RECORD_WITHDRAW_LIST')">
      <template>
        <el-table :data="couponsList" size="small" stripe >
          <el-table-column align="center" prop="id" :label="$t('cash.no1')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('cash.no2')">
          </el-table-column>
          <el-table-column align="center" prop="amount" :label="$t('cash.no3')">
          </el-table-column>
          <el-table-column align="center" prop="useNumber" :label="$t('cash.no4')">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('cash.no5')">
          </el-table-column>
          <el-table-column align="center" prop="strStatus" :label="$t('cash.no6')">
          </el-table-column>
        </el-table>
      </template>
    </div>
  
  <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page.current"
            layout="total, prev, pager, next, ->"
            :total="page.total?page.total:0">
          </el-pagination>
        </div>
    </el-row>

  </div>
</template>
<script>
import searchFilter from '../../components/component/filter'
export default {
  name: 'operatorManage',
  components: {searchFilter},
  data () {
    return {
      condition: {},
      formLabelWidth: '90px',
      couponsList: [],
      page: {
        current: 1,
        total: 0,
        size:10
      },
      filter: {
        userId: '',
        cashStatus: '',
        cashTime: ''
      },
      statusOptions: [],
      form: {
        name: '',
        category: '',
        content: '',
        unit: ''
      },
      flag: true
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    fetchData (condition) {
      const self = this;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.cashList,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        userId: condition?condition.userId:'',
        status: condition?condition.cashStatus:'',
        dayBegin:  condition?condition.cashTime?condition.cashTime[0]: '':'',
        dayEnd: condition?condition.cashTime?condition.cashTime[1]: '':''
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          self.couponsList = res.data.data;
          self.page.total = res.data.header.page.total;
        } else {
          self.$message.error(res.data.header.msg);
        }
      })
    },
    search (condition) {
      const self = this;
      self.page.current = 1;
      self.condition = condition;
      self.fetchData(self.condition);
    },
    putExcel (condition) {
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.cash_list_excel,
            'page': {'index': this.page.current, 'size': 10},
            'sessionid': sessionStorage.getItem('sessionid')
          },
          userId: condition?condition.userId?condition.userId:'':'',
          status: condition?condition.cashStatus?condition.cashStatus:'':'',
          dayBegin:  condition?condition.cashTime!==null?condition.cashTime[0]: '':'',
          dayEnd: condition?condition.cashTime!==null?condition.cashTime[1]: '':''
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      const self = this;
      this.page.current = val;
      this.fetchData(self.condition);
    }
  }
}
</script>
<style scoped lang="scss">

</style>
