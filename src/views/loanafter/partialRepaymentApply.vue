<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsEight')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanAfterManage.crumbsEight')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <!-- 订单ID -->
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input clearable size="small" style="width:130px;" v-model="formInline.orderId"></el-input>
          </div>
        <!-- 手机号 -->
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input clearable size="small" style="width:130px;" v-model="formInline.phone"></el-input>
          </div>
        <!-- 订单状态 -->
          <div class="search-input">
            <span>{{$t('public.orderStatus')}}:</span>
            <el-select clearable size="small" v-model="formInline.oStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <!-- 还款码生成时间 -->
          <div class="search-input">
            <span>{{$t('public.no81')}}</span>
            <el-date-picker
                id="date-picker"
                v-model="searchTime"
                size="small"
                type="daterange"
                value-format="yyyy-MM-dd" 
                align="right"
                unlink-panels
                range-separator="~" 
                :default-value="$store.state.common.preMonth" 
                :start-placeholder="$t('public.beginTime')" 
                :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
       
        <!-- 部分还款查询 -->
        <template v-if="$store.state.common.permiss.includes('RIGHT_PARTIAL_REPAYMENT_QUERY')">
            <div class="search-input">
              <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
            </div>
        </template>

        <!-- execl导出 -->
        <template v-if="$store.state.common.permiss.includes('RIGHT_PARTIAL_REPAYMENT_LIST_EXP')">
            <div class="search-input">
              <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
        </template>
        
      </el-row>
    </div>
    
    <!-- -------------表单显示栏------------------------ -->
    <div class="table"  v-if="$store.state.common.permiss.includes('RIGHT_PARTIAL_REPAYMENT_LIST')">
      <template>
        <el-table :data="tableData" size="mini" stripe>
          <!-- 订单id -->
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')">
          </el-table-column>
          <!-- 姓名 -->
          <el-table-column align="center" prop="userName" :label="$t('public.name')">
          </el-table-column>
          <!-- 手机号 -->
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')">
          </el-table-column>
          <!-- 借款本金 -->
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <!-- 借款周期 -->
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no25')">
          </el-table-column>
          <!-- 逾期天数 -->
          <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')">
          </el-table-column>
          <!-- 应还金额 -->
          <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')">
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <!-- 部分还款 -->
          <el-table-column align="center" prop="couponAmount" :label="$t('filter.partialRepaymentApplyOption.no3')">
            <template slot-scope="scope">
              <span v-if="scope.row.couponAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.couponAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <!-- 还款方式 -->
          <el-table-column align="center" prop="payType" :label="$t('loanAfterManage.payType')">
            <template slot-scope="scope">
              <span>{{scope.row.bankName?scope.row.bankName:scope.row.payType}}</span>
            </template>
          </el-table-column>
          <!-- 还款码 -->
          <el-table-column align="center" prop="paymentCode" :label="$t('loanAfterManage.paycode')">
          </el-table-column>
          <!-- 还款生成时间 -->
          <el-table-column align="center" prop="strCodeCreateTime" :label="$t('loanAfterManage.paycodetime')" width="86">
          </el-table-column>
          <!-- 订单状态 -->
          <el-table-column align="center" prop="oStatus" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.backList_rejectStatus(scope.row.oStatus))}}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
           <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="160">
            <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_PARTIAL_REPAYMENT_REVIEW')">
              <span v-if="scope.row.status === 1"
                style="color:#547ef6;cursor:pointer;" 
                @click="handleOpen(scope.row)">
                {{$t('public.no76')}}
              </span>
              <span v-else
                style="color:#547ef6;cursor:pointer;margin-left:5px" 
                @click="handleOpen(scope.row)">
                {{$t('loanAfterManage.sel')}}
              </span>
              <span 
                v-if="scope.row.oStatus == 43||(scope.row.oStatus == 50&&scope.row.status == 2)"
                style="color:#547ef6;cursor:pointer;margin-left:5px" 
                @click="addCodeOpen(scope.row)">
                {{$t('loanAfterManage.addPaycode')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- -------- 点击弹窗开始 -------- -->
    <div v-if="modifyFlag" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p v-if="modifyDataReviewFlag">{{$t('public.no78')}}</p>
          <p v-else>{{$t('public.no79')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="handleClose"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-line">
            <span>{{$t('public.orderId')}}: <i>{{modifyData.orderId}}</i></span>
            <span>{{$t('public.userTel')}}: <i>{{modifyData.userPhone}}</i></span>
          </div>
          <div class="detail-line">
            <span>{{$t('public.no24')}}: <i>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(modifyData.loanAmount)}}{{$store.state.common.vi_currency}}</i></span>
            <span>{{$t('public.no28')}}: <i>{{modifyData.overdueDays}}{{$t('public.no26')}}</i></span>
            <span>{{$t('public.no25')}}: <i>{{modifyData.productPeriod}}{{$t('public.no26')}}</i></span>
            <span>{{$t('public.no27')}}: <i>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(modifyData.returnMoney)}}{{$store.state.common.vi_currency}}</i></span>
          </div>
        </div>
        <div class="detail-main-con">
          <!-- 部分还款 -->
          <div class="detail-line">
            <span class="special text-right">{{$t('filter.partialRepaymentApplyOption.no3')}}： </span>
            <span style="margin-right:5px" class="special" v-if="modifyDataReviewFlag"><el-input style="width:200px" size="mini" v-model="modifyFirstValue" clearable></el-input></span>
            <span style="margin-right:5px" v-else>{{modifyFirstValue}}</span>
            <i style="font-weight:normal;font-style:normal">{{modifyData.unit}}</i>
            <span class="error" v-if="modifyErrorTips[0] !== ''">! {{modifyErrorTips[0]}}</span>
          </div>
          <!-- 承诺还款时间 -->
          <div class="detail-line" style="margin-top:10px">
            <span class="special text-right">{{$t('operationDetail.no8')}}： </span>
            <span class="special" v-if="modifyDataReviewFlag">
              <el-date-picker
                style="width:200px"
                v-model="modifyThirdValue"
                size="mini"
                id="modify-picker"
                type="datetime"
                :clearable="false"
                :placeholder="$t('public.placeholder')">
              </el-date-picker>
            </span>
            <span v-else>{{this.$store.getters.getYMDHMS(this.modifyThirdValue)}}</span>
          </div>
          <div class="detail-line">
            <span class="special text-right">{{$t('public.no37')}}： </span><span class="special">{{modifyFourthValue}}</span>
          </div>
          <!-- 备注 -->
          <div class="detail-line sub-btn-wapper" v-if="modifyDataReviewFlag">
            <el-button size="mini" @click="handleClose">{{$t('public.no50')}}</el-button>
            <el-button size="mini" type="primary"  @click="handleRejectOrResolve">{{$t('public.no49')}}</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- -------- 点击生成还款码开始 -------- -->
    <div v-if="makeCodeFlag" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p >{{$t('loanAfterManage.addPaycode')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="addCodeClose"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-line">
            <span>{{$t('public.orderId')}}: <i>{{addCodeData.orderId}}</i></span>
            <span>{{$t('public.userTel')}}: <i>{{addCodeData.userPhone}}</i></span>
          </div>
          <div class="detail-line">
            <span>{{$t('public.no24')}}: <i>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(addCodeData.loanAmount)}}{{$store.state.common.vi_currency}}</i></span>
            <span>{{$t('public.no28')}}: <i>{{addCodeData.overdueDays}}{{$t('public.no26')}}</i></span>
            <span>{{$t('public.no25')}}: <i>{{addCodeData.productPeriod}}{{$t('public.no26')}}</i></span>
          </div>
          <div class="detail-line">
            <span>{{$t('new.no60')}}: <i>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(addCodeData.couponAmount)}}{{$store.state.common.vi_currency}}</i></span>
          </div>
        </div>
        <div class="detail-main-con">
          <!-- 还款方式 -->
          <div class="detail-line">
            <span class="special text-right">{{$t('loanAfterManage.payType')}}：</span>
            <span style="margin-right:5px" class="special" >
              <el-select style="width:200px" size="mini" v-model="payValue" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="detail-line sub-btn-wapper" >
            <el-button size="mini" @click="addCodeClose">{{$t('public.no50')}}</el-button>
            <el-button size="mini" type="primary"  @click="addCodeSure">{{$t('public.no49')}}</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PARTIAL_REPAYMENT_LIST')">
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
  </div>
</template>
<script>
export default {
  name: 'partialRepaymentApply',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      flag: true, // 点击开关
      searchTime: [], // 优惠券有效时间
      formInline: {// 用户查询信息数据对应字段
        orderId: '',
        phone: '',
        effectiveTimeBegin: '',
        effectiveTimeEnd: '',
        oStatus: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.overdueStatusOptions, // 优惠券状态
      options2: this.$store.state.options.partialRepaymentApplyOption, // 订单状态
      options3: this.$store.state.options.channelAll_option, // 还款方式
      tableData: [], // 列表表格数据汇总

      modifyFlag: false,
      makeCodeFlag: false,
      modifyData: {},
      addCodeData: {},
      modifyFirstValue: '',
      payValue: '',
      makecodeId: '',
      modifySecondValue: '',
      modifyThirdValue: '',
      modifyFourthValue: '',
      modifyErrorTips: ['']
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.tableList();// 获取主列表
  },
  computed: {
    modifyDataReviewFlag: function () {
      return this.modifyData.status === 1;
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.effectiveTimeBegin =this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.effectiveTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.effectiveTimeBegin = '';
        this.formInline.effectiveTimeEnd = '';
      }
    },
    modifyFirstValue (val) { // 修改部分还款验证
      const validateNum = (value, callback) => {
        if ((!value || !/^[1-9]\d*$/.test(value))) {
          callback(this.$t('login.num'));
        } else {
          callback();
        }
      }
      validateNum(val, (msg = '') => {
        this.$set(this.modifyErrorTips, 0, msg);
      })
    }
  },
  methods: {
    
    handleOpen (row) { // 点开修改
      this.modifyFlag = true;
      this.modifyData = row;

      // 点开修改 查询详情
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.overdueCouponApply_detail, // 部分还款详情和逾期优惠券详情一致的action code
          'sessionid': this.sessionid
        },
        'type': 2,
        'couponId': row.id
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code === 0) {
          this.modifyFirstValue = res.data.data.userCoupon.couponAmount;
          this.modifySecondValue = res.data.data.userCoupon.payType;
          this.modifyThirdValue = new Date(res.data.data.userCoupon.strEffectiveTimeEnd);
          this.modifyFourthValue = res.data.data.userCoupon.remark;
        }
      })
    },
    handleClose () { // 关闭修改
      this.modifyFlag = false;
      this.modifyData = {};

      this.modifyFirstValue = '';
      this.modifySecondValue = null;
    },
    handleRejectOrResolve () { // 通过申请或者驳回
      // 验证字段
      for (let x in this.modifyErrorTips) {
        if (this.modifyErrorTips[x] !== '') {
          return;
        }
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.partialRepaymentApply_change_status,
          'sessionid': this.sessionid
        },
        'operating': 2, // 审核
        'orderId': this.modifyData.orderId,
        'userId': this.modifyData.userId,
        'committedRepaymentTime': this.$store.getters.getYMDHMS(this.modifyThirdValue),
        'couponAmount': this.modifyFirstValue,
        'remark': this.modifyFourthValue,
        // 'payType': this.modifySecondValue,
        // 'channel': 'bluepay',
        'status': 2,
        'approveId': this.modifyData.id
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code === 0) {
          this.$globalMsg.success(this.$t('message.success'));
          this.handleClose();
          this.tableList();
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    },

    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.tableList();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.tableList();
    },

    tableList () { // 主表格数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.partialRepaymentApply_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code === 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },

    select () { // 查询按钮点击操作
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.tableList();
      }
    },
    putExcel () {
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.partialRepayment_list_excel,
            sessionid: sessionStorage.getItem('sessionid'),
            page: {
              index: this.currentPage,
              size: this.pageNumber
            }
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
    addCodeOpen(row){
      this.makeCodeFlag = true;
      this.makecodeId = row.id;
      this.addCodeData = row;
    },
    addCodeClose(){
      this.makeCodeFlag = false;
      this.makecodeId = '';
      this.payValue = '';
    },
    addCodeSure(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PARTIAL0005,
          'sessionid': this.sessionid
        },
        'payType': this.payValue,
        'channel': 'bluepay',
        'approveId': this.makecodeId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code === 0) {
          this.$globalMsg.success(this.$t('message.success'));
          this.addCodeClose();
          this.tableList();
        } else {
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 查看详情
.detail{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 694px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom:5px; 
    .detail-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 15px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 16px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 18px;
        position: absolute;
        right: 15px;
        top: 15px;
      }
    }
    .detail-main-con{
      width: 100%;
      height: auto;
      box-sizing: border-box;
      margin: 20px 30px 10px 30px;
      padding-bottom: 5px;
      border-bottom: 1px dashed #f1f1f1;
      .sub-btn-wapper{
        padding-left: 125px;
        padding-top: 15px;
        box-sizing: border-box;
      }
      &:nth-last-child(1){
        border: none;
      }
      .detail-line{
        margin: 10px 0;
        font-size: 15px;
        color: #333a4d;
        font-weight: bold;
        .text-right{
          display:inline-block;
          width:110px;
          text-align: right;
          margin-right: 10px;
        }
        .error{
          margin-left: 20px;
          color: crimson;
          font-size: 12px;
          font-weight: normal;
        }
        span:not(.special){
          margin-right: 30px;
          i{
            font-style: normal;
            color: #585858;
            font-weight: normal;
          }
        }
      }
      .detail-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 10px auto;
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
