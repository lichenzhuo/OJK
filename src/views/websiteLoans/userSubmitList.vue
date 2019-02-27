<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('websiteLoans.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('websiteLoans.no2')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="paixu">
      <span></span>
      <p>{{$t('websiteLoans.no2')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" label="name" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no2')}}:</span>
            <el-input size="small" label="idCard" v-model="formInline.idCard"></el-input>
          </div>
        </el-col>
          <div class="search-input">
            <span>{{$t('new.no8')}}:</span>
            <el-select size="small" v-model="formInline.trackStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('websiteLoans.no5')}}:</span>
            <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>PC{{$t('public.submitDate')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                size="small"
                v-model="searchTime1" 
                type="daterange" 
                range-separator="~" 
                :default-value="$store.state.common.preMonth" 
                :start-placeholder="$t('public.beginTime')" 
                :end-placeholder="$t('public.endTime')">
              </el-date-picker>
            </form>
          </div>
          <div class="search-input">
            <span>{{$t('public.registerDate')}}:</span>
            <form autocomplete="off">
              <el-date-picker 
                size="small"
                v-model="searchTime2" 
                type="daterange" 
                range-separator="~" 
                :default-value="$store.state.common.preMonth" 
                :start-placeholder="$t('public.beginTime')" 
                :end-placeholder="$t('public.endTime')">
              </el-date-picker>
            </form>
          </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_PC_USER_LIST_QUERY')">
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
        </template>
        
        <template v-if="$store.state.common.permiss.includes('RIGHT_PC_USER_LIST_EXP')">
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
        </template>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PC_USER_LIST_INFO')">
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="id" label="PC ID">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')">
          </el-table-column>
          <el-table-column align="center" prop="idCard" :label="$t('public.no2')">
          </el-table-column>
          <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strSubTime" :label="'PC'+$t('public.submitDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strAppRegTime" :label="$t('public.registerDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="trackStatus" :label="$t('new.no8')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.trackStatus_Status(scope.row.trackStatus))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="trackAdminName" :label="$t('websiteLoans.no6')">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="140">
            <template slot-scope="scope">
              <template v-if="$store.state.common.permiss.includes('RIGHT_PC_USER_LIST_DETAIL')">
                <span 
                  v-if="scope.row.status!=0"
                  style="color:#547ef6;cursor:pointer" 
                  @click="loanDetali(scope.row.id,1,1)"
                >
                {{$t('public.detail')}}
                </span>
                <span
                  v-else 
                  style="color:#547ef6;cursor:pointer" 
                  @click="loanDetali(scope.row.orderNo,scope.row.userId,2,1)"
                >
                {{$t('public.no29')}}
                </span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PC_USER_LIST_INFO')">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="sizes, prev, pager, next, total,->"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="pageNumber"
          @size-change="handleSizeChange"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
        </div>
    </el-row>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'userSubmitList',
  data () {
    return {
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 提交时间
      searchTime2: [], // 注册时间
      formInline: { // 用户查询信息数据对应字段
        idCard: '',
        name: '',
        phone: '',
        trackStatus: '',
        orderLoanType: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        regTimeBegin: '',
        regTimeEnd: '',
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.loansType_options, //   贷款类型下拉选框信息
      options2: this.$store.state.options.trackStatus_options, //   跟踪状态下拉选框信息
      tableData: []// 借款信息数据模拟
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.getList();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = val;
      this.getList();
    },
    select () { // 点击查询按钮操作
      if (this.flag) {
        this.flag = false;
        this.getList();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.website_userSubmitListExcel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
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
    loanDetali (id, type, from) { // 点击详情跳转
      this.$router.push({path: '/usersubmitdetail', query: {id, type, from}});
    },
    getList () { // 获取用户提交列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.website_userSubmitList,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.applyTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.applyTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.applyTimeBegin = '';
        this.formInline.applyTimeEnd = '';
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.regTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.regTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.regTimeBegin = '';
        this.formInline.regTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getList();// 获取用户提交列表
  }
}
</script>
<style scoped lang="scss">

</style>
