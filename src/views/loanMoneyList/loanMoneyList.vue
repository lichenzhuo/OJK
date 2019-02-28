<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.crumbsThr')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanMoney.title2')}}</p>
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
        <el-col :md="6" :lg="4" :xl="4">
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
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no2')}}:</span>
            <el-input size="small" label="idCard" v-model="formInline.idCard"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.lang==='vi'">
          <div class="search-input">
            <span>{{$t('websiteLoans.no5')}}:</span>
            <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        <template v-if="$store.state.common.lang==='id'">
          <div class="search-input">
            <span>{{$t('yn.no4')}}:</span>
            <el-select size="small" v-model="formInline.dealStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options5" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('yn.no5')}}:</span>
            <el-select size="small" v-model="formInline.problemType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options4" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        <div class="search-input">
          <span>{{$t('public.CreateDate')}}:</span>
          <form autocomplete="off">
            <el-date-picker id="timesel" size="small" v-model="searchTime" type="daterange" range-separator="~" :default-value="$store.state.common.preMonth"
              :start-placeholder="$t('public.beginTime')" :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </form>
        </div>
        <div class="search-input ml15" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
        <div class="search-input ml15" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_EXP')">
          <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe empty-text>
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" >
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" >
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" >
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="userPhone" :label="$t('yuenan.no23')" >
              <template slot-scope="scope">
                <span>{{$store.getters.vn_phone(scope.row.userPhone)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')" >
              <template slot-scope="scope">
                <span>{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="idCard" :label="$t('public.no2')" >
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" >
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')+'('+$t('public.no26')+')'" >
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" width="86">
          </el-table-column>
          <template v-if="$store.state.common.lang==='id'">
            <el-table-column align="center" prop="problemType" :label="$t('yn.no4')" >
              <template slot-scope="scope">
                <span >{{$t($store.getters.handlingProblem1(scope.row.problemType))}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dealStatus" :label="$t('yn.no5')">
              <template slot-scope="scope">
                <span>{{$t($store.getters.handlingStatus(scope.row.dealStatus))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="160">
            <template slot-scope="scope">
              <span v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_SHOW')"      
                class="table_opr"
                @click="loanDetali(scope.row.orderNo,scope.row.userId)">
                {{$t('public.detail')}}
              </span>
              <span v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_DOWN')"
                class="table_opr" 
                @click="download(scope.row.contractPathUrl)">
                {{$t('public.no52')}}
              </span>
              <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LIST_DEAL')">
                <span v-if="$store.state.common.lang==='id'&&(scope.row.status === 43||scope.row.status === 50)&&scope.row.dealStatus==0"
                  class="mg5" style="color:#547ef6;cursor:pointer" @click="handle(scope.row.id)">
                  {{$t('yn.no9')}}
                </span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" layout="sizes, prev, pager, next, total,->"
          :page-sizes="[10, 15, 20, 30]" :page-size="pageNumber" @size-change="handleSizeChange" :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>

    <!-- 处理弹窗 -->
    <el-dialog :title="$t('yn.no4')" :visible.sync="handleFlag" width="660px" :show-message="false">
      <el-form :model="form" ref="ruleForm" label-width="100px" size="medium">
        <el-form-item :label="$t('yn.no10')" prop="amount">
          <el-select v-model="form.problemType" :placeholder="$t('public.placeholder')">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in options5 " :key="i"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.problemType==1">
          <el-form-item :label="$t('loanAfterManage.paycode')" prop="amount">
            <el-input v-model="form.repaymentCode" style="width:215px;"></el-input>
          </el-form-item>
        </template>
        <el-form-item :label="$t('serviceManage.requestDes')" prop="remark">
          <el-input type="textarea" v-model="form.problemDes" :rows="4"></el-input>
        </el-form-item>
        <p class="chu-title" style="margin-top:10px">{{$t('fei.no11')}}:
          <span style="color:red">(最多三张)</span>
        </p>
        <el-upload :action="$axios.defaults.baseURL" :http-request="httpRequest" list-type="picture-card" accept="image/jpeg,image/gif,image/png"
          :before-upload="beforeUpload" :on-remove="removeHandler" :on-success="uploadSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-form-item>
          <el-button style="margin-top:10px;" type="primary" @click="handleSubmit('ruleForm')">{{$t('operationDetail.no22')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'loanMoneyList',
  data() {
    return {
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询时间
      formInline: { // 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        userId: '',
        idCard: '',
        name: '',
        phone: '',
        orderLoanType: '',
        dealStatus: '',
        problemType: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        orderState: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.order_select, // 订单状态下拉选框信息
      options2: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      options3: this.$store.state.options.handlingProblem, // 处理问题
      options4: this.$store.state.options.handlingStatus, // 处理状态
      options5: this.$store.state.options.handlingType, // 处理状态
      tableData: [], // 借款信息数据模拟
      handleFlag: false, // 处理弹窗开关
      form: {},
      fileReader: '', // 图片上传new FileReader()的实例化
      fileList: [], // 资料补充图片
    }
  },
  methods: {
    handleSizeChange(val) { // 每页条数变化时操作
      this.pageNumber = val;
      this.loansList();
    },
    handleCurrentChange(val) { // 分页按钮操作
      this.currentPage = val;
      this.loansList();
    },
    select() { // 点击查询按钮操作
      this.$store.commit('loanMoneyList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.loansList();
      }
    },
    putExcel() { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.loneMoneyList_excel,
            'page': {
              'index': this.currentPage,
              'size': this.pageNumber
            },
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
            this.$export2Excel(title, fields, data);
          }
        })
      }
    },
    loanDetali(orderNo, userId) { // 查看详情操作
      this.$router.push({
        path: '/loanmoneydetail',
        query: {
          userId,
          orderNo
        }
      })
    },
    loansList() { // 获取借款列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.loanmoney_list,
          'page': {
            'index': this.currentPage,
            'size': this.pageNumber
          },
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
    download(url) { // 印尼版合同下载
      if (this.$store.state.common.lang !== 'vi') {
        if (url) {
          window.location.href = url;
        }
      } else if (this.$store.state.common.lang === 'vi') {
        window.location.href = 'http://nas.mydong.vn/protocol/protocol.html';
      }
    },
    handle(orderId) { // 处理按钮点击弹窗
      this.form.orderId = orderId;
      this.handleFlag = true;
    },
    handleSubmit() { // 处理提交操作
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ORDERP0001,
          'sessionid': this.sessionid
        },
        ...this.form,
        dealStatus: 1,
        problemPictureOne: this.fileList[0] ? this.fileList[0].data : '',
        problemPictureTwo: this.fileList[1] ? this.fileList[1].data : '',
        problemPictureThree: this.fileList[2] ? this.fileList[2].data : ''
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
          this.loansList();
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
        this.form = {};
        this.handleFlag = false;
      })
    },
    httpRequest(options) {
      let file = options.file;
      // let filename = file.name;
      if (file) {
        this.fileReader.readAsDataURL(file)
      }
      this.fileReader.onload = () => {
        let base64Str = this.fileReader.result
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.all_picupload,
            'sessionid': this.sessionid
          },
          imageType: base64Str.split(',')[0].split(';')[0].slice(5),
          imageBase64: base64Str.split(',')[1]
        }
        this.$axios.post('', option).then(res => {
          if (res.data.header.code == 0) {
            options.onSuccess(res.data.data, file);
          }
        })
      }
    },
    removeHandler(file, fileList) {
      this.fileList = this.fileList.filter(value => {
        return file.uid !== value.uid;
      })

    },
    beforeUpload(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png';
      if (this.fileList.length >= 3) {
        this.$globalMsg.error('At most 3 files');
        return false
      }
      if (!isIMAGE) {
        this.$globalMsg.error('Mangyaring mag-upload ng isang imahe');
      }
      // if (!isLt5M) {
      //   alert('The max size is 5MB')
      //   return false
      // }
    },
    uploadSuccess(res, file, fileList) {
      let data = res;
      this.fileList.push({
        data,
        uid: file.uid
      })
    }
  },
  watch: {
    searchTime() {
      if (this.searchTime) {
        this.formInline.applyTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.applyTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.applyTimeBegin = '';
        this.formInline.applyTimeEnd = '';
      }
    },
    handleFlag() {
      if (!this.handleFlag) {
        this.form = {};
        this.fileList = [];
      }
    }
  },
  mounted() {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.loanMoneyList_select) !== '{}') {
      this.formInline = this.$store.state.common.loanMoneyList_select;
      if (this.formInline.applyTimeBegin !== '') {
        this.searchTime.push(this.formInline.applyTimeBegin);
        this.searchTime.push(this.formInline.applyTimeEnd);
      }
    }
    this.loansList(); // 获取借款列表
    this.fileReader = new FileReader();
  }
}
</script>
<style scoped lang="scss">

</style>