<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('serviceManage.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('serviceManage.crumbsFour')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.userPhone"></el-input>
          </div>
        <div class="search-input">
          <span>{{$t('serviceManage.isJoin')}}:</span>
          <el-select size="small" v-model="formInline.userIsRegist" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('serviceManage.isLoan')}}:</span>
          <el-select size="small" v-model="formInline.userHasOrder" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('serviceManage.isResult')}}:</span>
          <el-select size="small" v-model="formInline.isSolve" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('loanMoneyDetail.opeTime')}}:</span>
          <el-date-picker 
            id="date1"
            size="small"
            v-model="searchTime" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_ADD')">
      <el-button type="primary" @click="addRecord">{{$t('serviceManage.add')}}</el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('serviceManage.isJoin')">
            <template slot-scope="scope">
              <span>{{scope.row.userId?$t('auditDetail.isAdressBook.no1'):$t('auditDetail.isAdressBook.no2')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="lastOrderId" :label="$t('serviceManage.isLoan')">
            <template slot-scope="scope">
              <span>{{scope.row.lastOrderId?$t('auditDetail.isAdressBook.no1'):$t('auditDetail.isAdressBook.no2')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="question" :label="$t('serviceManage.requestDes')">
          </el-table-column>
          <el-table-column align="center" prop="answer" :label="$t('serviceManage.requestRes')">
          </el-table-column>
          <el-table-column align="center" prop="isSolve" :label="$t('serviceManage.isResult')">
            <template slot-scope="scope">
              <span>{{scope.row.isSolve==1?$t('auditDetail.isAdressBook.no1'):$t('auditDetail.isAdressBook.no2')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strUpdateTime" :label="$t('loanMoneyDetail.opeTime')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="serviceName" :label="$t('userSuggest.adminName')">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_SHOW')"
                class="table_opr"
                @click="proModify(scope.row.userPhone,scope.row.userName,scope.row.question,scope.row.answer,scope.row.isSolve)"
              >
              {{$t('public.no29')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_LIST')">
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

    <!-- ------------------确认是否修改开始-------------------- -->
    <el-dialog :title="$t('loanAfterOperation.add2')" :visible.sync="addOrModify" width="650px">
      <div class="left2right">
        <span class="left">{{$t('public.userTel')}}:</span>
        <div class="right">
          <el-input size="small" style="width:210px" label="phone" v-model="ruleForm2.userPhone"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('public.userName')}}:</span>
        <div class="right">
          <el-input size="small" style="width:210px" label="name" v-model="ruleForm2.userName"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('serviceManage.requestDes')}}:</span>
        <div class="right">
          <el-input type="textarea" v-model="ruleForm2.question" :placeholder="$t('new.no44')+'~'"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('serviceManage.requestRes')}}:</span>
        <div class="right">
          <el-input type="textarea" v-model="ruleForm2.answer" :placeholder="$t('new.no45')+'~'"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('serviceManage.isResult')}}:</span>
        <div class="right">
          <el-select size="small" v-model="ruleForm2.isSolve" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="left2right" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_ADD_SUBMIT')||$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_SHOW_SUBMIT')">
        <span class="left"></span>
        <div class="right" v-if="add">
          <el-button type="primary" size="small" @click="addSure">{{$t('proManage.sure')}}</el-button>
        </div>
        <div class="right" v-if="modify">
          <el-button type="primary" size="small" @click="addClose">{{$t('proManage.sure')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'telComeList',
  data () {
    return {
      sessionid: '',
      flag: true,
      searchTime: [],
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      formInline: { // 用户查询信息数据对应字段
        userPhone: '',
        userIsRegist: '',
        userHasOrder: '',
        isSolve: '',
        updateStartTime: '',
        updateEndTime: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.isOverdue_option, // 订单状态下拉选框信息
      tableData: [], // 借款信息数据模拟
      add: false, // 添加修改记录开关
      modify: false, // 修改记录开关
      ruleForm2: {
        userPhone: '',
        userName: '',
        isSolve: '',
        question: '',
        answer: '',
        remark: ''
      },
      addOrModify:false
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.kfsList();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = val;
      this.kfsList();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('telComeList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.kfsList();
      }
    },
    proModify (...arr) { // 查看修改操作
      this.modify = true;
      this.ruleForm2.userPhone = arr[0];
      this.ruleForm2.userName = arr[1];
      this.ruleForm2.question = arr[2];
      this.ruleForm2.answer = arr[3];
      this.ruleForm2.isSolve = String(arr[4]);
      this.addOrModify = true;
    },
    addRecord () { // 查看修改操作
      this.add = true;
      this.addOrModify = true;
    },
    kfsList () { // 获取借款列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_telCome,
          'page': {'index': this.currentPage, 'size': this.currentPage},
          'sessionid': this.sessionid
        },
        ...this.formInline
      };
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    addSure () {
      if (this.ruleForm2.userPhone == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstOne'));
        return;
      }
      if (this.ruleForm2.userName == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstTwo'));
        return;
      }
      if (this.ruleForm2.question == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstThree'));
        return;
      }
      if (this.ruleForm2.answer == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstThree'));
        return;
      }
      if (this.ruleForm2.isSolve == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstFive'));
        return;
      }
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.kf_telCome_add,
            'sessionid': this.sessionid
          },
          ...this.ruleForm2
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
            this.kfsList();
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.addClose();
        })
      }
    },
    addClose () {
      this.add = false;
      this.modify = false;
      this.addOrModify = false;
      this.ruleForm2.userPhone = '';
      this.ruleForm2.userName = '';
      this.ruleForm2.isSolve = '';
      this.ruleForm2.question = '';
      this.ruleForm2.answer = '';
      this.ruleForm2.remark = '';
    }

  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.updateStartTime = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.updateEndTime = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.updateStartTime = '';
        this.formInline.updateEndTime = '';
      }
    },
    addOrModify(){
      if(!this.addOrModify){
        this.addClose();
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.telComeList_select) !== '{}') {
      this.formInline = this.$store.state.common.telComeList_select;
      if(this.formInline.updateStartTime!==''){
        this.searchTime.push(this.formInline.updateStartTime);
        this.searchTime.push(this.formInline.updateEndTime);
      }
    }
    this.kfsList();// 获取借款列表
  }
}
</script>
<style scoped lang="scss">

</style>
