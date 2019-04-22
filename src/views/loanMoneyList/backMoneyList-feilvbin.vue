<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="paixu">
      <span></span>
      <p>{{$t('loanMoney.title')}}</p>
    </div>
      

    <!-- ------------- 搜索查询栏 ------------- -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small"  v-model="formInline.orderId"></el-input>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small"  v-model="formInline.userId"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small"  v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small"  v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('fei.no17')}}:</span>
            <el-input size="small"  v-model="formInline.instalment"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no53')}}:</span>
          <el-select size="small" v-model="formInline.isOverdue" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('add.no7')}}:</span>
          <el-select size="small" v-model="formInline.orderDeviceType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options6" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('fei.no20')}}:</span>
          <el-input size="small" style="width:80px" v-model="formInline.overdueBegin"></el-input>
          ~
          <el-input size="small" style="width:80px" v-model="formInline.overdueEnd"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('fei.no19')}}:</span>
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
        <div class="search-input">
          <span>{{$t('public.no58')}}:</span>
          <form autocomplete="off">
            <el-date-picker 
              size="small"
              v-model="searchTime3" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </form>
        </div>
        <div class="search-input">
          <span>{{$t('public.no60')}}:</span>
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
        <div class="search-input" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
        <div class="search-input" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_EXP')">
          <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
      </el-row>
    </div>

    <!-- ------------- 表单显示栏 ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe v-loading="loadFlag">
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')">
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')">
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no54')">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')">
          </el-table-column>
          <el-table-column align="center" prop="instalment" :label="$t('fei.no17')">
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('fei.no18')">
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no57')">
            <template slot-scope="scope">
              <span v-if="scope.row.refundAmount!==null&&scope.row.refundAmount!==undefined&&scope.row.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no58')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strMustRefundTime" :label="$t('fei.no19')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strLastRefundTime" :label="$t('public.no60')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="orderDeviceType" :label="$t('add.no7')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.clientStatus(scope.row.orderDeviceType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')">
          </el-table-column>
          <el-table-column align="center" prop="overdueDays" :label="$t('fei.no20')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.overDue(scope.row.overdueDays!=0?1:-1))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.backList_rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="180">
            <template slot-scope="scope">
              <span class="table_opr"  @click="detail(scope.row.orderNo,scope.row.userId)">{{$t('public.detail')}}</span>
              <template >
                <span 
                  v-if="scope.row.status!==51"
                  class="table_opr" 
                  @click="sure(scope.row.orderNo)">
                  {{$t('public.no61')}}
                </span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row  type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_REPAY_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>

    <el-dialog :title="$t('public.no61')" :visible.sync="flag1"  width="680px" :show-message="false">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="160px" size="medium">
        <el-form-item :label="$t('public.no57')" prop="amount" >
          <el-input type="text" v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.no60')" prop="repayTime">
           <el-date-picker
            size="small"
            id="suretimes"
            v-model="form.repayTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :placeholder="$t('public.backMoneyDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('fei.no39')"  prop="repayType" >
          <el-select v-model="form.repayType">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in options3" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('public.no85')" >
          <div class="imgList flex">
            <div class="flex flex-align-end">
              <a href="javascript:;" :style="'background-image: url('+imageBase64+');background-size: 100% 100%'" class="add-btn"><div class="add-icon" :class="imageBase64?'':error?'red-border':'grey-bg'"><span v-if="!imageBase64">+</span><input type="file" class="updata" @change="imgChange" accept=".gif,.jpg,.jpeg,.png,.mp4"></div></a>
              <span class="red">{{$t('public.imgLimit')}}</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('public.no37')" prop="remark" >
          <el-input type="textarea" v-model="form.remark" :rows="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sureSubmit('ruleForm1')">{{$t('operationDetail.no22')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    

    <!-- 底部多出空白 -->
    <div class="foot"></div>

  </div>
</template>
<script>
import ImageFile from '../../utils/image-file'
export default {
  name: 'backMoneyList',
  data () {
    return {
      flag: true,
      loadFlag: true,
      sessionid: '',
      pageTotal: 0,// 当前页数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 还款时间
      searchTime2: [], // 应还时间
      searchTime3: [], // 放款日期
      formInline: {// 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        instalment: '',
        orderState: '',
        orderDeviceType: '',
        isOverdue: '',
        refundTimeBegin: '',
        refundTimeEnd: '',
        repayTimeBegin: '',
        repayTimeEnd: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        overdueBegin: '',
        overdueEnd: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.backMoney_options, // 订单状态下拉选框信息
      options2: this.$store.state.options.isOverdue_option, // 逾期状态下拉选框信息
      options3: this.$store.state.options.backOrder_status_PHL, // 确认还款弹窗还款状态下拉选框信息
      options6: this.$store.state.options.loanDevice_options, // 借款客户端
      tableData: [],// 用户信息数据模拟
      flag1: false,
      imageBase64: '',
      orderNo_dialog: '',// 弹窗选中orderNo
      error: '',// 弹窗选中orderNo
      form:{
        repayType:'',
        amount:'',
        repayTime:'',
        pic1:'',
        pic2:'',
        remark:''
      },
      rules:{
        amount: [
          { required:true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        transId: [
          { required:true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        repayTime: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        repayType: [
          { required:true, message: this.$t('login.required'), trigger: 'change' }
        ],
        remark: [
          { required:true, message: this.$t('login.required'), trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.backList();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = 1;
      this.backList (val);
    },
    backList (val) { // 获取还款列表数据
      this.loadFlag = true;
      if(val){
        this.currentPage = val;
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.backmoney_list,
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
        }else{
          this.$globalMsg.error(res.data.header.msg)
        }
        this.loadFlag = false;
      })
    },
    select () { // 点击查询操作
      this.$store.commit('backMoneyList', this.formInline);
      if (this.flag) {
        this.flag = false;
        this.backList ();
      }
    },
    putExcel () { // excel下载
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.backMoneyList_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            window.location.href = res.data.data.fileName;
          }
        })
      }
    },
    sure (orderNo) { // 确认还款弹窗
      if (orderNo) {
        this.imageBase64 = '';
        this.form.repayType = '';
        this.form.amount = '';
        this.form.repayTime = '';
        this.form.remark = '';
        this.form.pic1 = '';
        this.orderNo_dialog = orderNo;
        this.flag1 = true;
      }
    },
    sureSubmit () {
      const self = this;
      self.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if(!this.imageBase64){
            this.$globalMsg.error(this.$t('public.no84'));
            return;
          }
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.sure_backmoney,
              sessionid: sessionStorage.getItem('sessionid')
            },
            ...self.form,
            orderNo: this.orderNo_dialog 
          }
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              self.$message.success(self.$t('message.success'));
              this.backList();
            }else{
              self.$message.error(res.data.header.msg);
            }
          })
          this.flag1 = false;
        } else {
          return false;
        }
      })
    },
    detail (orderNo, userId) { // 跳转详情页
      this.$router.push({path: '/loanmoneydetail', query: {userId, orderNo}});
    },
    imgChange (e) {
      const self = this;
      let image = new ImageFile();
      image.compress({file: e.target.files[0]}).then(res => {
        const imgRes = res;
        if(imgRes.blob.size>(400*1024)){
          self.$message.error(this.$t('public.imgLimit'));
        }else{
          let imgType = imgRes.blob.type;
          this.imageBase64 = imgRes.dataURL;
          let imageBase64 = imgRes.dataURL.split(',')[1];
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.all_picupload,
              sessionid: sessionStorage.getItem('sessionid')
            },
            imageBase64: imageBase64,
            imageType: imgType
          }
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              self.form.pic1 = res.data.data;
            }else{
              self.$message.error(res.data.header.msg);
            }
          })
        }
      })
    },
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.refundTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.refundTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.refundTimeBegin = '';
        this.formInline.refundTimeEnd = '';
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.repayTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.repayTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.repayTimeBegin = '';
        this.formInline.repayTimeEnd = '';
      }
    },
    searchTime3 () {
      if (this.searchTime3) {
        this.formInline.loanTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime3[0]);
        this.formInline.loanTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime3[1]);
      } else {
        this.formInline.loanTimeBegin = '';
        this.formInline.loanTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.backMoneyList_select) !== '{}') {
      this.formInline = this.$store.state.common.backMoneyList_select;
      if(this.formInline.refundTimeBegin!==''){
        this.searchTime1.push(this.formInline.refundTimeBegin);
        this.searchTime1.push(this.formInline.refundTimeEnd);
      }
      if(this.formInline.repayTimeBegin!==''){
        this.searchTime2.push(this.formInline.repayTimeBegin);
        this.searchTime2.push(this.formInline.repayTimeEnd);
      }
      if(this.formInline.loanTimeBegin!==''){
        this.searchTime3.push(this.formInline.loanTimeBegin);
        this.searchTime3.push(this.formInline.loanTimeEnd);
      }
    }
    this.backList();
  }
}
</script>
<style scoped lang="scss">

.add-btn {
  width: 320px;
  display: block;
  text-decoration: none;
  margin: 0px 5px;
  height: 200px;
  .red-border{
    border: dashed 2px red;
  }
  .grey-bg {
    border: dashed 2px #c0c4cc;
    background:rgba(243,246,255,1);
  }
  .add-icon {
    width: 320px;
    height: 200px;
    border-radius: 5px;
    position: relative;
    text-align: center;
    span {
      line-height: 200px;
      font-size: 56px;
      color: #ccc;
    }
    input.updata
    {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      overflow: hidden;
    }
  } 
}
.red {
  color: red;
}


</style>
