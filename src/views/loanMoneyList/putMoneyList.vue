<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanMoney.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanMoney.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanMoney.title3')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
          <div class="search-input">
            <span>{{$t('public.orderId')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.orderId"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.userId"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.name')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.name"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.phone"></el-input>
          </div>
          <div class="search-input" v-if="$store.state.common.lang==='PHL'">
            <span>{{$t('fei.no17')}}:</span>
            <el-input size="small"  v-model="formInline.instalment"></el-input>
          </div>
        <div class="search-input">
          <span>{{$t('add.no7')}}:</span>
          <el-select size="small" v-model="formInline.orderDeviceType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options6" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.lang==='vi'">
            <div class="search-input">
              <span>{{$t('public.no2')}}:</span>
              <el-input size="small" style="width:130px;" v-model="formInline.idCard"></el-input>
            </div>
            <div class="search-input">
              <span>{{$t('add.no46')}}:</span>
              <el-select size="small" v-model="formInline.isHang" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options7" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
        </template>
        <div class="search-input">
          <span>{{$t('public.orderStatus')}}:</span>
          <el-select size="small" v-model="formInline.orderState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('add.no90')}}:</span>
          <el-select size="small" v-model="formInline.isReLend" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options8" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- <template v-if="$store.state.common.lang==='vi'">
          <div class="search-input">
            <span>{{$t('websiteLoans.no5')}}:</span>
            <el-select size="small" v-model="formInline.orderLoanType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template> -->
        <div class="search-input">
          <span>{{$t('public.CreateDate')}}:</span>
          <el-date-picker 
            id="create-time"
            size="small"
            v-model="searchTime" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <div class="search-input">
          <span>{{$t('public.no82')}}:</span>
          <form autocomplete="off">
            <el-date-picker 
              id="fangkuan-time"
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_QUERY')">
            <div class="search-input ml15">
              <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
            </div>
        </template>
        
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_EXP')">
            <div class="search-input ml15">
              <el-button type="primary"  @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe v-loading="loadFlag">
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('public.userId')" >
          </el-table-column>
          <el-table-column align="center" prop="userName" :label="$t('public.name')" >
          </el-table-column>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')" >
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="idCard" :label="$t('public.no2')" >
            </el-table-column>
            <!-- <el-table-column align="center" prop="orderLoanType" :label="$t('websiteLoans.no5')" >
              <template slot-scope="scope">
                <span>{{$t($store.getters.loanTypeState(scope.row.orderLoanType))}}</span>
              </template>
            </el-table-column> -->
          </template>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" >
            <template slot-scope="scope">
              <span v-if="scope.row.loanAmount!==null&&scope.row.loanAmount!==undefined&&scope.row.loanAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.loanAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="lendingAmount" label="打款金额" >
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.lendingAmount)}}{{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('public.no31')+'('+$t('public.no26')+')'" >
          </el-table-column>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="instalment" :label="$t('fei.no17')" >
            </el-table-column>
          </template>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('public.no82')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="orderDeviceType" :label="$t('add.no7')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.clientStatus(scope.row.orderDeviceType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.orderStatus')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.rejectStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="isHang" :label="$t('add.no46')" >
              <template slot-scope="scope">
                <span>{{$t($store.getters.ishang_status(scope.row.isHang))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="isReLend" :label="$t('add.no90')" >
              <template slot-scope="scope">
                <span>{{$t($store.getters.is_addressBook2(scope.row.isReLend))}}</span>
              </template>
            </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="220">
            <template slot-scope="scope" >
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENGING_CONFIRM')&&scope.row.status!=43&&$store.state.common.lang!=='PHL'&&scope.row.isHang!==-1"
                class="table_opr" 
                @click="sure(scope.row.orderNo)">
                {{$t('add.no93')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENGING_RE_LENDING')&&$store.state.common.lang==='vi'&&scope.row.isHang==-1"
                class="table_opr" 
                @click="showAgain(scope.row)"
              >
                {{$t('add.no47')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_SHOW')" 
                class="table_opr"  
                @click="detail(scope.row.orderNo,scope.row.userId)">
                {{$t('public.no29')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_LIST')">
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

    <!-- 确认放款弹窗 -->
    <el-dialog :title="$t('public.no67')" :visible.sync="surePutFlag" width="650px">
      <div class="left2right mt15">
        <span class="left">{{$t('loanMoney.resultStatus')}}:</span>
        <div class="right">
          {{resultStatus?resultStatus:$store.state.common.nullData}}
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanMoney.resultDesc')}}:</span>
        <div class="right">
          {{resultDesc?resultDesc:$store.state.common.nullData}}
        </div>
      </div>
    </el-dialog>

    <!-- 重新放款弹窗 -->
    <el-dialog :title="$t('add.no47')" :visible.sync="againFlag" width="900px">
      <p>{{$t('userDetail.reject_status.no5')+ ': ' + againDetail.tranferResult}}</p>
      <p class="mgt10">{{$t('add.no51') + ': ' + againDetail.thirdChannel}}</p>
      <p class="mt15 red " v-if="againDetail.refundCount>0">最近一次的成功放款账户</p>
      <table class="box" width="100%" v-if="againDetail.refundCount>0">
        <tr>
          <th width="13%">{{$t('yuenan.no18')}}</th>
          <th width="13%">{{$t('public.no19')}}</th>
          <th width="13%">{{$t('public.no20')}}</th>
          <th width="13%">{{$t('yuenan.no20')}}</th>
          <th width="13%">{{$t('yuenan.no19')}}</th>
          <th width="13%">{{$t('yuenan.no21')}}</th>
          <th width="9%">{{$t('public.no22')}}</th>
        </tr>
        <template v-if="againDetail.successUserBankVN!==null&&againDetail.successUserBankVN!==undefined&&againDetail.successUserBankVN!=''">
          <tr >
              <td >{{againDetail.successUserBankVN.bankType | dataIsTrue}}</td>
              <td>{{againDetail.successUserBankVN.bankType==='NganLuong'?'-':againDetail.successUserBankVN.bankName}}</td>
              <td>{{againDetail.successUserBankVN.bankType==='NganLuong'?'-':againDetail.successUserBankVN.bankAccount}}</td>
              <td >{{againDetail.successUserBankVN.cardFullname}}</td>
              <td>{{againDetail.successUserBankVN.email}}</td>
              <td>{{againDetail.successUserBankVN.cardYear+'-'+againDetail.successUserBankVN.cardMonth}}</td>
              <td >{{againDetail.successUserBankVN.status==1?$t('userDetail.bankId_status.no1'):$t('userDetail.bankId_status.no2')}}</td>
          </tr>
        </template>
        <template v-else>
          <div style="textAlign:center;width:500%;height:40px;lineHeight:40px">
            {{$t('public.no23')}}
          </div>
        </template>
      </table>
      <p class="mt15 red mb20">*{{$t('add.no50')}}</p>
      <div class="tabs">
        <ul class="tabs_main">
          <li>
            <div class="oneLineHasTwo">
              <p><span style="font-weight:500;">{{$t('public.userId')}}:</span>
                <span>{{againDetail.userId | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('public.userName')}}:</span>
                <span>{{againDetail.userName | dataIsTrue}}</span>
              </p>
            </div>
            <div class="oneLineHasTwo">
              <p><span style="font-weight:500;">{{$t('public.userPhone')}}:</span>
                <span>{{againDetail.userPhone | dataIsTrue}}</span>
              </p>
              <p><span>{{$t('add.no48')}}:</span>
                <span>{{againDetail.refundCount | dataIsTrue}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      
      
      
      <!-- <div class="detail-line">
        <span>{{$t('public.userId')}}: <i>{{againDetail.userId}}</i> </span>
        <span>{{$t('public.userName')}}: <i>{{againDetail.userName}}</i> </span>
      </div>
      <div class="detail-line">
        <span>{{$t('public.userPhone')}}: <i>{{againDetail.userPhone}}</i> </span>
        <span>{{$t('add.no48')}}: <i>{{againDetail.refundCount}}</i> </span>
      </div> -->
      
      <!-- <div class="left2right mt15">
        <span class="left">{{$t('public.userId')}}:</span>
        <div class="right">{{againDetail.userId}}</div>
      </div>
      <div class="left2right mt15">
        <span class="left">{{$t('public.userName')}}:</span>
        <div class="right">{{againDetail.userName}}</div>
      </div>
      <div class="left2right mt15">
        <span class="left">{{$t('public.userPhone')}}:</span>
        <div class="right">{{againDetail.userPhone}}</div>
      </div>
      <div class="left2right mt15 ">
        <span class="left">{{$t('add.no48')}}:</span>
        <div class="right">{{againDetail.refundCount}}</div>
      </div> -->
      <div class="left2right">
        <span class="left" style="text-align:left;font-weight:500;">{{$t('yuenan.no18')}}:</span>
        <div class="right">
          <el-select size="small" v-model="againDetail.accountType" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,i) in options4" :key="i" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-form ref="form" :model="againForm" label-width="134px" size="small" :inline="true" label-position="left">
        <template v-if="againDetail.accountType!='1'">
          <el-form-item :label="$t('public.no19')">
            <el-select size="small" v-model="againDetail.bankId" :placeholder="againDetail.bankName">
              <el-option v-for="(item,i) in options3" :key="i" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('public.no20')">
            <el-input v-model="againDetail.bankAccount" style="width:215px"></el-input>
          </el-form-item>
          <el-form-item :label="$t('yuenan.no20')">
            <el-input v-model="againDetail.cardFullname" style="width:215px"></el-input>
          </el-form-item>
          <template v-if="againDetail.accountType=='2'">
            <el-form-item :label="$t('add.no49')">
              <el-input v-model="againDetail.cardYear" style="width:215px"></el-input>
            </el-form-item>
            <el-form-item :label="$t('add.no56')">
              <el-input v-model="againDetail.cardMonth" style="width:215px"></el-input>
            </el-form-item>
            
          </template>
          <template v-if="againDetail.accountType=='3'">
            <el-form-item :label="$t('add.no57')">
              <el-input v-model="againDetail.branchName" style="width:215px"></el-input>
            </el-form-item>
          </template>
        </template>
        <el-form-item :label="$t('yuenan.no19')">
          <el-input v-model="againDetail.email" style="width:215px"></el-input>
        </el-form-item>
      </el-form>
      <div class="flex flex-center">
        <el-button class="mg50" type="info" @click="againClose"> {{$t('public.no50')}} </el-button>
        <el-button class="mg50" type="primary" @click="againSubmit">{{$t('add.no47')}}</el-button>
        
      </div>
    </el-dialog>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'putMoneyList',
  data () {
    return {
      sessionid: '',
      clickFlag: true,
      loadFlag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询时间
      searchTime1: [], // 查询时间
      formInline: { // 用户查询信息数据对应字段
        orderNo: '',
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        orderDeviceType: '',
        instalment: '',
        idCard: '',
        orderLoanType: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        isHang: '',
        isReLend: '',
        orderState: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.putMoney_options, // 订单状态下拉选框信息
      options2: this.$store.state.options.loansType_options, // 贷款类型下拉选框信息
      options3: [], // 银行名称
      options4: [
        {id:1,label:'Ngluaong',value: '1'},
        {id:2,label:'ATM_Card',value:'2'},
        {id:3,label:'bankAccount',value:'3'}
      ], // 账户类型
      options6: this.$store.state.options.loanDevice_options, // 借款客户端
      options7: this.$store.state.options.ishang_option, // 是否挂起
      options8: this.$store.state.options.isOverdue_option, // 是否挂起
      tableData: [], // 借款信息数据模拟
      surePutFlag: false, // 详情弹窗
      againFlag: false, // 重新放款弹窗
      orderNo: '', // 点击当前行的订单ID
      resultStatus: '', // 向支付通道返回的结果状态码
      resultDesc: '',// 向支付通道返回的结果描述
      againForm: {},
      againDetail: {
        accountType: '',
        bankId: '',
        bankAccount: '',
        cardFullname: '',
        cardYear: '',
        cardMonth: '',
        branchName: '',
        email: '',
      },
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.putList();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.putList();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('putMoneyList', this.formInline);
      if (this.clickFlag) {
        this.currentPage = 1;
        this.clickFlag = false;
        this.putList();
      }
    },
    putExcel () {
      if (this.clickFlag) {
        this.clickFlag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.putMoneyList_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
        }
        this.$axios.post('', option).then(res => {
          this.clickFlag = true;
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    },
    putList () { // 放款列表数据
      this.loadFlag = true;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.putmoney_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.clickFlag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }else{
          this.$globalMsg.error(res.data.header.msg)
        }
        this.loadFlag = false;
      })
    },
    sure (id) { // 确认放款款弹窗
      this.orderNo = id;
      this.surePutFlag = true;
      this.putMoneyResult();
    },
    putMoneyResult () { // 点击确认放款按钮项第三方查询结果
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.putmoney_result,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.resultStatus = res.data.data.transferStatus;
          this.resultDesc = res.data.data.transferStatusDesc;
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    },
    detail (orderNo, userId) { // 查看详情操作
      this.$router.push({path: '/loanmoneydetail', query: {userId, orderNo}})
    },
    againSubmit(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ORDER00012,
          'sessionid': this.sessionid
        },
        orderId: this.againDetail.id,
        email: this.againDetail.email,
        payoutType: this.againDetail.accountType,
        bankAccount: this.againDetail.bankAccount,
        cardFullname: this.againDetail.cardFullname,
        cardMonth: this.againDetail.cardMonth,
        cardYear: this.againDetail.cardYear,
        branchName: this.againDetail.branchName,
        bankId: this.againDetail.bankId,
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
          this.putList();
          this.againClose();
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    },
    againClose(){
      this.againDetail = {
        accountType: '',
        bankId: '',
        bankAccount: '',
        cardFullname: '',
        cardYear: '',
        cardMonth: '',
        branchName: '',
        email: '',
      };
      // this.againDetail.accountType = '';
      this.againFlag = false;
    },
    showAgain(row){
      this.againDetail.id = row.id
      this.againDetail.orderNo = row.orderNo
      this.againDetail.userPhone = row.userPhone
      this.againDetail.userId = row.userId
      this.againDetail.userName = row.userName
      this.getBankList();
      this.getDetailData();
    },
    getBankList(){ // 获取银行名称下拉框
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'bank'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.options3 = arr;
          this.againFlag = true
        }
      })
    },
    getAccountType(){ // 获取账户类型
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'payout.type'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.options4 = arr;
        }
      })
    },
    getDetailData(){// 点击单条显示详情数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ORDER00013,
          'sessionid': this.sessionid
        },
        orderNo:this.againDetail.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.againDetail.email = res.data.data.orderUserBankVN.email
          this.againDetail.accountType = res.data.data.orderUserBankVN.accountType
          this.againDetail.refundCount = res.data.data.orderUserBankVN.refundCount
          this.againDetail.tranferResult = res.data.data.orderUserBankVN.tranferResult
          this.againDetail.thirdChannel = res.data.data.orderUserBankVN.thirdChannel
          this.againDetail.cardFullname = res.data.data.orderUserBankVN.cardFullname
          this.againDetail.branchName = res.data.data.orderUserBankVN.branchName
          this.againDetail.bankAccount = res.data.data.orderUserBankVN.bankAccount
          this.againDetail.bankName = res.data.data.orderUserBankVN.bankName
          this.againDetail.cardYear = res.data.data.orderUserBankVN.cardYear
          this.againDetail.cardMonth = res.data.data.orderUserBankVN.cardMonth
          this.againDetail.successUserBankVN = res.data.data.successUserBankVN
          this.againDetail.bankId = (res.data.data.orderUserBankVN.bankId==0||res.data.data.orderUserBankVN.bankId==1)?'':String(res.data.data.orderUserBankVN.bankId)
          // this.againFlag = true
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.applyTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.applyTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.applyTimeBegin = '';
        this.formInline.applyTimeEnd = '';
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.loanTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.loanTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.loanTimeBegin = '';
        this.formInline.loanTimeEnd = '';
      }
    },
    againFlag(val){
      if(!val){
        this.againClose();
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.putMoneyList_select) !== '{}') {
      this.formInline = this.$store.state.common.putMoneyList_select;
      if(this.formInline.applyTimeBegin!==''){
        this.searchTime.push(this.formInline.applyTimeBegin);
        this.searchTime.push(this.formInline.applyTimeEnd);
      }
    }
    this.putList();// 放款列表数据
    // this.getBankList();
  }
}
</script>
<style scoped lang="scss">
  .mg50{
    margin: 0 50px;
  }
  .detail-line{
    margin: 10px 0;
    font-size: 15px;
    color: #333a4d;
    font-weight: bold;
    span{
      margin-right: 50px;
      i{
        font-style: normal;
        color: #585858;
        font-weight: normal;
      }
    }
  }
  .tabs .tabs_main > li{
    padding: 0;
    .oneLineHasTwo{
      margin-bottom: 0;
    }
  }
  .mgt10{
    margin-top: 10px;
  }
  .box{
    width: 100%;
  }
  table{
    margin-bottom: 1em;
    overflow: auto;
    box-sizing: border-box;
    display: table;
    text-shadow: 0px 1px 0px #fff;
    border-collapse: collapse;
    border-spacing: 0;
    color: #292e31;
    font-size: 14px;
    tr:last-child {
        border-bottom: 1px solid #ccc;
    }
    tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }
    th {
        padding: 5px 10px;
        border-bottom: 1px solid #ccc;
        vertical-align: bottom;
        line-height: 1.6;
        text-align: left;
        font-weight: bold;
        display: table-cell;
    }
    tr:nth-child(odd)>td {
        background-color: #f8f8f8;
    }
    td.nowrap {
        word-break: keep-all;
        white-space: nowrap;
    }
    td{
        display: table-cell;
        padding: 10px;
        vertical-align: top;
        line-height: 1.6;
    }
  }
</style>
