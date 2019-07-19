<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('sidebar.adminTotal')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('sidebar.adminTotal')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>{{$t('loanAfterManage.name')}}:</span>
          <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('loanAfterManage.type1')}}:</span>
          <el-select size="small" clearable v-model="formInline.type" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no20')}}:</span>
          <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no21')}}:</span>
          <el-select clearable size="small" v-model="formInline.leaderId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_COLLECTOR_STATISTICS_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_COLLECTOR_STATISTICS_EXP')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_COLLECTOR_STATISTICS_LIST')">
      <template>
        <el-table :data="tableData" stripe size="small">
          <el-table-column align="center" prop="adminName" :label="$t('loanAfterManage.name')">
          </el-table-column>
          <el-table-column align="center" prop="roleName" :label="$t('loanAfterManage.type1')">
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('new.no18')">
          </el-table-column>
          <el-table-column align="center" prop="leaderName" :label="$t('new.no19')">
          </el-table-column>
          <el-table-column align="center" prop="historyNumber" :label="$t('loanAfterManage.historyNum')">
          </el-table-column>
          <el-table-column align="center" prop="historyMoney" :label="$t('loanAfterManage.historyMoney')">
            <template slot-scope="scope">
              <span v-if="scope.row.historyMoney!==null&&scope.row.historyMoney!==undefined&&scope.row.historyMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.historyMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="collectionNumber" :label="$t('loanAfterManage.nowNum')">
          </el-table-column>
          <el-table-column align="center" prop="collectionMoney" :label="$t('loanAfterManage.nowMoney')">
            <template slot-scope="scope">
              <span v-if="scope.row.collectionMoney!==null&&scope.row.collectionMoney!==undefined&&scope.row.collectionMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.collectionMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ReturnNumber" :label="$t('loanAfterManage.alreadyNum')">
          </el-table-column>
          <el-table-column align="center" prop="ReturnMoney" :label="$t('loanAfterManage.alreadyMoney')">
            <template slot-scope="scope">
              <span v-if="scope.row.ReturnMoney!==null&&scope.row.ReturnMoney!==undefined&&scope.row.ReturnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.ReturnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="waitNumber" :label="$t('loanAfterManage.noneNum')">
          </el-table-column>
          <el-table-column align="center" prop="waitMoney" :label="$t('loanAfterManage.noneMoney')">
            <template slot-scope="scope">
              <span v-if="scope.row.waitMoney!==null&&scope.row.waitMoney!==undefined&&scope.row.waitMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.waitMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_COLLECTOR_STATISTICS_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'debtCollectorTotal',
  data () {
    return {
      sessionid: '',
      flag: true, // 点击一次开关
      pageTotal: 0, // 分页总数
      searchTime: [], // 查询时间
      formInline: {// 用户查询信息数据对应字段
        type: '',
        adminId: '',
        groupId: '',
        leaderId: '',
        beginTime: '',
        endTime: ''
      },
      currentPage: 1, // 当前页下标
      options1: [], // 催收状态下拉选框信息
      tableData: [], // 列表信息数据模拟
      options2: [], // 催收员列表
      options3: [], // 组名列表
      options4: []// 组长列表
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.dataList();
    },
    dataList () { // 获取入催订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.adminCollection_total,
          'page': {'index': this.currentPage, 'size': 10},
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
    select () { // 查询按钮点击操作
      this.$store.commit('collectionPeopleList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.dataList();
      }
    },
    operationAdmin () { // 获取全部催收员列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        status: 1,
        type:0,
        outSource:1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options2 = arr;
        }
      })
    },
    groupList () { // 获取组名列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_groupName,
          'sessionid': this.sessionid
        },
        type: 2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options3.push({value: value.id, label: value.groupName});
          })
        }
      })
    },
    leaderName_option () { // 获取组长列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_leaderName,
          'sessionid': this.sessionid
        },
        type: 2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options4.push({value: value.leaderId, label: value.leaderName});
          })
        }
      })
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.adminCollection_total_excel,
            'page': {'index': this.currentPage, 'size': 10},
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
    getcollectionType(){ // 获取催收阶段
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'overdue.type'
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.options1 = arr;
        }
      })
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.collectionPeopleList_select) !== '{}') {
      this.formInline = this.$store.state.common.collectionPeopleList_select;
      if(this.formInline.beginTime!==''){
        this.searchTime.push(this.formInline.beginTime);
        this.searchTime.push(this.formInline.endTime);
      }
      
    }
    this.dataList();// 获取入催订单列表
    this.operationAdmin();// 获取催收员列表
    this.groupList();// 获取组员列表
    this.leaderName_option();// 获取组长列表
    this.getcollectionType();// 获取催收阶段
  }
}
</script>
<style scoped lang="scss">

</style>
