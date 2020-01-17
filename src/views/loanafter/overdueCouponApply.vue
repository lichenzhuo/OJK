<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsSeven')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanAfterManage.crumbsSeven')}}</p>
    </div>

    <!-- -------- 搜索查询栏 -------- -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <!-- 订单id -->
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input clearable size="small" style="width:130px;" v-model="formInline.orderId"></el-input>
          </div>
        <!-- 手机号 -->
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input clearable size="small" style="width:130px;" v-model="formInline.phone"></el-input>
          </div>
        <!-- 优惠券状态 -->
        <div class="search-input">
          <span>{{$t('loanAfterManage.couponStatus')}}:</span>
          <el-select clearable size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- 订单状态 -->
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select clearable size="small" v-model="formInline.oStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- 有效时间 -->
        <div class="search-input">
          <span>{{$t('loanAfterManage.couponEffectiveDate')}}:</span>
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
        
        <!-- 优惠券查询 -->
        <template v-if="$store.state.common.permiss.includes('RIGHT_OVERDUE_COUPON_QUERY')">
          <div class="search-input">
            <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        
        <!-- execl导出 -->
        <template v-if="$store.state.common.permiss.includes('RIGHT_OVERDUE_COUPON_EXP')">
          <div class="search-input">
            <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
        
      </el-row>
    </div>
    
    <!-- -------- 表单显示栏 -------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_OVERDUE_COUPON_LIST')">
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
          <!-- 借款金额 -->
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')">
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <!-- 借款周期 -->
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no25')">
          </el-table-column>
          <!-- 逾期期数 -->
          <el-table-column align="center" prop="stages" label="逾期期数">
          </el-table-column>
          <!-- 当前逾期天数 -->
          <el-table-column align="center" prop="overdueDays" label="当前逾期天数">
          </el-table-column>
           <!-- 当前逾期费 -->
          <el-table-column align="center" prop="overdueInterest" label="当前逾期费">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <!-- 当前未还金额 -->
          <el-table-column align="center" prop="returnMoney" label="当前未还金额">
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <!-- 逾期天数 -->
          <!-- <el-table-column align="center" prop="overdueDays" :label="$t('public.no28')">
          </el-table-column> -->
          <!-- 逾期费 -->
          <!-- <el-table-column align="center" prop="overdueInterest" :label="$t('operationDetail.no5')">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueInterest)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column> -->
          <!-- 应还金额 -->
          <!-- <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')">
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column> -->
          <!-- 逾期减免 -->
          <el-table-column align="center" prop="couponAmount" :label="$t('public.no72')">
            <template slot-scope="scope">
              <span v-if="scope.row.couponAmount!==null&&scope.row.couponAmount!==undefined&&scope.row.couponAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.couponAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <!-- 优惠时间 -->
          <!-- <el-table-column align="center" prop="strEffectiveTimeBegin" :label="$t('loanAfterManage.couponEffectiveDate')" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.strEffectiveTimeBegin}} ~ {{scope.row.strEffectiveTimeEnd}}</span>
            </template>
          </el-table-column> -->
          <!-- 优惠券状态 -->
          <!-- <el-table-column align="center" prop="status" :label="$t('loanAfterManage.couponStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.couponUseState(scope.row.status))}}</span>
            </template>
          </el-table-column> -->
          <!-- 优惠还款码 -->
          <!-- <el-table-column align="center" prop="paymentCode" :label="$t('new.no67')">
            <template slot-scope="scope">
              <span v-if="scope.row.paymentCode!=''">{{scope.row.paymentCode}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column> -->
          <!-- 还款码有效期 -->
          <!-- <el-table-column align="center" prop="strPaymentOvertime" :label="$t('new.no68')">
          </el-table-column> -->
          <!-- 还款方式 -->
          <el-table-column align="center" prop="payType" :label="$t('loanAfterManage.payType')">
            <template slot-scope="scope">
              <span>{{scope.row.bankName?scope.row.bankName:scope.row.payType}}</span>
            </template>
          </el-table-column>
          <!-- 订单状态 -->
          <el-table-column align="center" prop="oStatus" :label="$t('public.orderStatus')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.backList_rejectStatus(scope.row.oStatus))}}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="160">
            <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_OVERDUE_COUPON_ISSUE')">
              <span v-if="scope.row.status === 2"
                style="color:#547ef6;cursor:pointer;" 
                @click="handleOpen(scope.row)">
                {{$t('public.no76')}}
              </span>
              <span v-else
                style="color:#547ef6;cursor:pointer;margin:0 5px" 
                @click="handleOpen(scope.row)">
                {{$t('loanAfterManage.sel')}}
              </span>
              <!-- <span 
                v-if="$store.state.common.lang==='id'"
                style="color:#547ef6;cursor:pointer;" 
                @click="addCodeOpen(scope.row)"
              >
              {{$t('loanAfterManage.addPaycode')}}
              </span> -->
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
          <p v-if="modifyDataReviewFlag">{{$t('public.no74')}}</p>
          <p v-else>{{$t('public.no77')}}</p>
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
            <span>{{$t('operationDetail.no5')}}: <i>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(modifyData.overdueInterest)}}{{$store.state.common.vi_currency}}</i></span>
          </div>
        </div>
        <div class="detail-main-con">
          <div class="detail-line">
            <span class="special text-right">{{$t('public.no72')}}： </span>
            <span style="margin-right:5px" class="special" v-if="modifyDataReviewFlag"><el-input style="width:200px" size="mini" v-model="modifyFirstValue" clearable></el-input></span>
            <span style="margin-right:5px" v-else>{{modifyFirstValue}}</span>
            <i style="font-weight:normal;font-style:normal">{{modifyData.unit}}</i>
            <span class="error" v-if="modifyErrorTips[0] !== ''">! {{modifyErrorTips[0]}}</span>
          </div>
          <!-- <div class="detail-line" style="margin-top:10px">
            <span class="special text-right">{{$t('loanAfterManage.couponEffectiveDate')}}： </span>
            <span class="special" v-if="modifyDataReviewFlag">
              <el-date-picker
                  id="modify-picker"
                  v-model="modifySecondValue"
                  size="mini"
                  type="daterange"
                  value-format="yyyy-MM-dd" 
                  align="right"
                  unlink-panels
                  range-separator="~"
                  :default-value="$store.state.common.preMonth" 
                  :start-placeholder="$t('public.beginTime')" 
                  :end-placeholder="$t('public.endTime')">
              </el-date-picker>
            </span>
            <span v-else>{{modifySecondValue[0]}} ~ {{modifySecondValue[1]}}</span>
            <span class="error" v-if="modifyErrorTips[1] !== ''">! {{modifyErrorTips[1]}}</span>
          </div> -->
          <div class="detail-line">
            <span class="special text-right">{{$t('public.no37')}}： </span><span class="special">{{modifyData.remark}}</span>
          </div>
          <div class="detail-line sub-btn-wapper" v-if="modifyDataReviewFlag">
            <el-button size="mini" @click="handleRejectOrResolve(-4)">{{$t('public.no73')}}</el-button>
            <el-button size="mini" type="primary"  @click="handleRejectOrResolve(1)">{{$t('otherCoupons.edit')}}</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- -------- 点击生成还款码弹窗开始 -------- -->
    <!-- <div v-if="addCodeFlag" class="detail">
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
            <span>{{$t('operationDetail.no5')}}: <i>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(addCodeData.overdueInterest)}}{{$store.state.common.vi_currency}}</i></span>
          </div>
        </div>
        <div class="detail-main-con">
          <div class="detail-line">
            <span class="special text-right">{{$t('public.no72')}}： </span>
            <span style="margin-right:5px" >{{addCodeData.couponAmount}}</span>
            <i style="font-weight:normal;font-style:normal">{{addCodeData.unit}}</i>
          </div>
          <div class="detail-line">
            <span class="special text-right">{{$t('loanAfterManage.payType')}}： 
            </span><span class="special">
              <el-select clearable size="small" v-model="payTypeStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="detail-line sub-btn-wapper" >
            <el-button size="mini" type="primary"  @click="addCodeSure">{{$t('proManage.sure')}}</el-button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- -------- 分页显示栏 -------- -->
    <el-row type="flex" justify="end"  >
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
  name: 'overdueCouponApply',
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
        status: '',
        effectiveTimeBegin: '',
        effectiveTimeEnd: '',
        oStatus: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.overdueStatusOptions, // 优惠券状态
      options2: this.$store.state.options.overdueOrderStatusOptions, // 订单状态
      options3: this.$store.state.options.channelAll_option, // 生成还款码支付方式
      tableData: [], // 列表表格数据汇总
      payTypeStatus: '',
      modifyFlag: false,
      // addCodeFlag: false,
      modifyData: {},
      addCodeData: {},
      modifyFirstValue: '',
      // modifySecondValue: null,
      modifyErrorTips: ['', '']
    }
  },
  computed: {
    modifyDataReviewFlag: function () {
      return this.modifyData.status === 2;
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.tableList();// 获取主列表
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.effectiveTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.effectiveTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.effectiveTimeBegin = '';
        this.formInline.effectiveTimeEnd = '';
      }
    },
    modifyFirstValue (val) { // 修改逾期减免验证
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
    },
    // modifySecondValue (val) { // 修改时间验证
    //   this.$set(this.modifyErrorTips, 1, val === null ? this.$t('public.no75') : '');
    // }
  },
  methods: {
    handleOpen (row) { // 点开修改
      this.modifyFlag = true;
      this.modifyData = row;
      this.modifyFirstValue = row.couponAmount;
      // this.modifySecondValue = [row.strEffectiveTimeBegin, row.strEffectiveTimeEnd];
      console.log(this.modifyData.id,'111')
    },
    addCodeOpen (row) { // 点开修改
      // this.addCodeFlag = true;
      this.addCodeData = row;

      this.modifyFirstValue = row.couponAmount;
      // this.modifySecondValue = [row.strEffectiveTimeBegin, row.strEffectiveTimeEnd];
    },
    handleClose () { // 关闭修改
      this.modifyFlag = false;
      this.modifyData = {};

      this.modifyFirstValue = '';
      // this.modifySecondValue = null;
    },

    handleRejectOrResolve (statusCode) { // 通过申请或者驳回
      // 验证字段
      for (let x in this.modifyErrorTips) {
        if (this.modifyErrorTips[x] !== '') {
          return;
        }
      }

      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.overdueCouponApply_change_status,
          'sessionid': this.sessionid
        },
        // 'effectiveTimeBegin': this.modifySecondValue[0],
        // 'effectiveTimeEnd': this.modifySecondValue[1],
        'status': statusCode,
        'couponAmount': this.modifyFirstValue,
        'orderId': this.modifyData.orderId,
        'couponId': this.modifyData.id,
        'operating': 2, // 2 审核
        'userId': this.modifyData.userId,
        'remark': this.modifyData.remark
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
          action: this.$store.state.actionMap.overdueCouponApply_list,
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
            action: this.$store.state.actionMap.overdueCoupon_list_excel,
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
    addCodeSure () {// 确定生成还款码
      if (this.payTypeStatus == '') {
        this.$globalMsg.error(this.$t('public.no88'));
        return;
      }
      
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.coupon_markCode,
          'sessionid': this.sessionid
        },
        couponId: this.addCodeData.id,
        channel: 'bluepay',
        payType:this.payTypeStatus
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
        }else {
          this.$globalMsg.error(res.data.header.msg);
        }
        this.tableList();
        this.addCodeClose ();
      })
    },
    addCodeClose () {
      // this.addCodeFlag = false;
      this.payTypeStatus = '';
    },
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
        padding-left: 85px;
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
          width:75px;
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
          margin-right: 50px;
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
