<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbssix')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanAfterManage.crumbssix')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.orderId"></el-input>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xl="3">
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" label="userId" v-model="formInline.userId"></el-input>
          </div>
        </el-col>
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
        <div class="search-input">
          <span>{{$t('loanAfterManage.paycodeState')}}:</span>
          <el-select clearable size="small" v-model="formInline.codeStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('loanAfterManage.paycodetime')}}:</span>
          <el-date-picker 
            id="date1"
            size="small"
            v-model="searchTime" 
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <template >
          <div class="search-input">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <div class="list_operation" >
      <el-button type="primary" @click="addPayCode">{{$t('loanAfterManage.addPaycode')}}</el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" >
      <template>
        <el-table :data="tableData" stripe size="small">
          <el-table-column align="center" prop="id" :label="$t('public.backId')">
          </el-table-column>
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')">
          </el-table-column>
          <el-table-column align="center" prop="payType" :label="$t('loanAfterManage.payType')">
            <template slot-scope="scope">
              <span>{{scope.row.payType=='atm'?scope.row.bankName:scope.row.payType}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="paymentCode" :label="$t('loanAfterManage.paycode')">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('loanAfterManage.paycodetime')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strPaymentCodeOvertime" :label="$t('loanAfterManage.lostTime')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="codeStatus" :label="$t('loanAfterManage.paycodeState')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.bankIdStatus(scope.row.codeStatus))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="orderStatus" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.orderStatus))}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_COLLECTION_STATISTICS_DAY_LIST')">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
        </div>
    </el-row>

    <!-- ------------------确认是否修改开始-------------------- -->
    <el-dialog :title="$t('loanAfterManage.addPaycode')" :visible.sync="addCodeFlag" width="650px">
      <div class="left2right">
        <span class="left">{{$t('public.orderId')}}:</span>
        <div class="right">
          <el-input size="small" style="width:210px" v-model="ruleForm2.orderId"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanAfterManage.payType')}}:</span>
        <div class="right">
          <el-select size="small" v-model="ruleForm2.repayType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="left2right">
        <span class="left"></span>
        <div class="right">
          <el-button type="primary" size="small" @click="addSure">{{$t('proManage.sure')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'paymentCode',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      flag: true,
      searchTime: [], // 查询时间
      formInline: {// 用户查询信息数据对应字段
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        adminId: '',
        codeStatus: '',
        createTimeBegin: '',
        createTimeEnd: ''
      },
      ruleForm2: {
        orderId: '',
        channel: 'bluepay',
        repayType: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.paymentCode_option, // 还款码状态下拉选框信息
      options2: this.$store.state.options.channelAll_option, // 生成还款码支付方式
      tableData: [], // 表单信息数据模拟
      addCodeFlag: false,// 生成还款码开关
      roleId:''
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.payCodeList();
    },
    payCodeList () { // 获取还款码订单列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.payCode_list,
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
      if(this.roleId==43){
        if (this.flag&&this.formInline.phone!=='') {
          this.flag = false;
          this.payCodeList();
        }else{
          this.$globalMsg.error(this.$t('new.no54'));
        }
      }else{
        if (this.flag) {
          this.flag = true;
          this.payCodeList();
        }
      }
    },
    addPayCode () { // 添加窗口弹出
      this.addCodeFlag = true;
    },
    addSure () { // 生成还款码确定操作
      if (this.ruleForm2.orderId == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.firstOne'));
        return;
      }
      if (this.ruleForm2.repayType == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.firstTwo'));
        return;
      }
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.payCode_add,
            'sessionid': this.sessionid
          },
          ...this.ruleForm2
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
            this.formInline.orderId = this.ruleForm2.orderId;
            this.payCodeList();// 获取每日催回统计列表
            
          } else {
            this.$globalMsg.error(this.$t('message.warning'));
          }
          this.addClose();
        })
      }
    },
    addClose () { // 添加窗口关闭
      this.addCodeFlag = false;
      this.ruleForm2.orderId = '';
      this.ruleForm2.repayType = '';
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.createTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.createTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.createTimeBegin = '';
        this.formInline.createTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.roleId = sessionStorage.getItem('roleId');
    if(this.roleId!=43){
      this.payCodeList();// 获取没日催回统计列表
    }
    
  }

}
</script>
<style scoped lang="scss">

</style>
