<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('auditManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('auditManage.no2')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('auditManage.no2')}}</p>
    </div>
		<search-com 
			:searchData="searchData" 
			@search="search" 
			:searchRight="$store.state.common.permiss.includes('RIGHT_RECORD_WITHDRAW_QUERY')"
			:outputRight="true"
    ></search-com>

    <!-- -------------搜索查询栏------------------------ -->
    <!-- <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
				<div class="search-input">
					<span>{{$t('public.orderId')}}:</span>
					<el-input size="small" style="width:130px;" v-model="formInline.orderId"></el-input>
				</div>
				<div class="search-input">
					<span>{{$t('public.name')}}:</span>
					<el-input size="small" style="width:130px;" v-model="formInline.name"></el-input>
				</div>
				<div class="search-input">
					<span>{{$t('public.no83')}}:</span>
					<el-input size="small" style="width:130px;" v-model="formInline.phone"></el-input>
				</div>
        <div class="search-input">
          <span>{{$t('auditManage.no3')}}:</span>
          <el-select size="small" v-model="formInline.auditState" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
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
						<el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
					</div>
        </template>
        
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_EXP')">
					<div class="search-input ml15">
						<el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
					</div>
        </template>
      </el-row>
    </div> -->

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe v-loading="loadFlag">
          <el-table-column align="center" prop="id" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="repaymentNo" :label="$t('public.no83')" >
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" >
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')" >
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no57')" >
          </el-table-column>
          <el-table-column align="center" prop="strRefundTime" :label="$t('public.no60')" >
          </el-table-column>
          <el-table-column align="center" prop="thirdChannel" :label="$t('auditManage.no8')" >
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('auditManage.no9')" >
          </el-table-column>
          <el-table-column align="center" prop="strApplicationTime" :label="$t('public.submitDate')" >
          </el-table-column>
          <el-table-column align="center" prop="applicationResult" :label="$t('auditManage.no10')" >
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('auditManage.no3')" >
          </el-table-column>
          <el-table-column align="center" prop="strReviewTime" :label="$t('new.no9')" >
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="180">
            <template slot-scope="scope" >
              <span 
                class="table_opr" 
                @click="sure(scope.row.orderNo)">
                {{$t('public.no76')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_LOAN_LENDING_SHOW')" 
                class="table_opr"  
                @click="showDetail(scope.row.orderNo,scope.row.userId)">
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

    <!-- 查看详细弹窗 -->
    <el-dialog :title="$t('public.no67')" :visible.sync="detailFlag" width="1100px">
      <el-table :data="detailTableData" size="small">
				<el-table-column align="center" prop="id" :label="$t('auditManage.no17')" >
				</el-table-column>
				<el-table-column align="center" prop="repaymentId" :label="$t('public.backMoneyId')" >
				</el-table-column>
				<el-table-column align="center" prop="orderId" :label="$t('public.orderId')" >
        </el-table-column>
				<el-table-column align="center" prop="repaymentNo" :label="$t('public.no83')" >
				</el-table-column>
				<el-table-column align="center" prop="refundAmount" :label="$t('public.no65')" >
				</el-table-column>
				<el-table-column align="center" prop="type" :label="$t('loanAfterManage.payType')" >
				</el-table-column>
				<el-table-column align="center" prop="strRefundTime" :label="$t('public.no60')" >
        </el-table-column>
				<el-table-column align="center" prop="repaymentStatus" :label="$t('add.no52')" >
				</el-table-column>
				<el-table-column align="center" prop="status" :label="$t('auditManage.no3')" >
				</el-table-column>
				<el-table-column align="center" prop="strReviewTime" :label="$t('new.no9')" >
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="end">
				<div class="pages" >
					<el-pagination
						@current-change="handleCurrentChange2"
						:current-page="currentPage2"
						layout=" prev, pager, next, total,->"
						:page-size="pageNumber2"
						:total="pageTotal2?pageTotal2:0">
					</el-pagination>
				</div>
			</el-row>
    </el-dialog>

    <!-- 平账审核弹窗 -->
    <el-dialog :title="$t('add.no47')" :visible.sync="PingZangFlag" width="1100px">
      <p class="title">{{$t('userDetail.reject_status.no5')}}</p>
      <div class="oneLineHasThree">
				<p><span>{{$t('public.orderId')}}:</span>
					<span>{{againDetail.userId | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('public.userName')}}:</span>
					<span>{{againDetail.userName | dataIsTrue}}</span>
				</p>
			</div>
      <div class="oneLineHasThree">
				<p><span>{{$t('public.no30')}}:</span>
					<span>{{againDetail.userId | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('public.no27')}}:</span>
					<span>{{againDetail.userName | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('public.no59')}}:</span>
					<span>{{againDetail.userName | dataIsTrue}}</span>
				</p>
			</div>
			<p class="title">{{$t('auditManage.no12')}}</p>
			<el-table :data="PingZangTableData" size="small" stripe highlight-current-row
          @current-change="tableRowChange">
				<el-table-column align="right" label="" width="60">
					<template slot-scope="scope">
						<template>
							<el-radio v-model="radioVal"
								:label="scope.row.id"
								>&nbsp;
							</el-radio>
						</template>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="repaymentId" :label="$t('public.backMoneyId')" >
				</el-table-column>
				<el-table-column align="center" prop="refundAmount" :label="$t('public.no57')" >
				</el-table-column>
				<el-table-column align="center" prop="strRefundTime" :label="$t('public.backMoneyDate')" >
				</el-table-column>
				<el-table-column align="center" prop="repaymentNo" :label="$t('public.no83')" >
				</el-table-column>
				<el-table-column align="center" prop="thirdChannel" :label="$t('auditManage.no8')" >
				</el-table-column>
				<el-table-column align="center" prop="remark" :label="$t('public.no37')" >
				</el-table-column>
				<el-table-column align="center" prop="strCreateTime" :label="$t('public.submitDate')" >
				</el-table-column>
				<el-table-column align="center" prop="applicationResult" :label="$t('auditManage.no10')" >
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="end">
				<div class="pages">
					<el-pagination
						@current-change="handleCurrentChange1"
						:current-page="currentPage1"
						layout="prev, pager, next, total,->"
						:page-size="pageNumber1"
						:total="pageTotal1?pageTotal1:0">
					</el-pagination>
				</div>
			</el-row>
			<p class="title">{{$t('auditManage.no11')}}</p>
			<div class="oneLineHasThree">
				<p><span>{{$t('public.no57')}}:</span>
					<span>{{againDetail.userId | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('public.backMoneyDate')}}:</span>
					<span>{{againDetail.userName | dataIsTrue}}</span>
				</p>
			</div>
      <div class="oneLineHasThree">
				<p><span>{{$t('public.no83')}}:</span>
					<span>{{againDetail.userId | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('auditManage.no8')}}:</span>
					<span>{{againDetail.userName | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('auditManage.no10')}}:</span>
					<span style="color:crimson">{{againDetail.userName | dataIsTrue}}</span>
				</p>
			</div>
			<el-form :model="PingZhangform" ref="ruleForm" label-width="100px" size="small">
				<el-form-item :label="$t('yn.no10')" prop="amount">
          <el-select v-model="PingZhangform.result" :placeholder="$t('public.placeholder')">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in options5 " :key="i"></el-option>
          </el-select>
        </el-form-item>
				<el-form-item :label="$t('serviceManage.requestDes')" prop="remark">
          <el-input type="textarea" v-model="PingZhangform.remark" :rows="4"></el-input>
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
import searchCom from 'src/components/public/search.vue'

export default {
	components: { searchCom },
  name: 'PingZhangAuditList',
  data () {
    return {
      sessionid: '',
      clickFlag: true,
      loadFlag: true,
      pageTotal: 0, // 分页总数
      pageTotal1: 0, // 分页总数
      pageTotal2: 0, // 分页总数
      pageNumber: 10, // 每页条数
			searchTime1: [], // 查询时间
			condition: {},
      formInline: { // 用户查询信息数据对应字段
        orderId: '',
        name: '',
        phone: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        orderState: ''
      },
      currentPage: 1, // 当前页下标
      currentPage1: 1, // 当前页下标
      currentPage2: 1, // 当前页下标
      options1: this.$store.state.options.putMoney_options, // 订单状态下拉选框信息
      options2: this.$store.state.options.pingZhang_auditStatus, // 审核状态下拉选框信息
      options3: [], // 审核结果下拉选框信息
      tableData: [], // 主表格数据
      PingZangTableData: [], 
      detailTableData: [], 
      detailFlag: false, // 详情弹窗
      PingZangFlag: false, // 重新放款弹窗
      orderNo: '', // 点击当前行的订单ID
      PingZhangform: {
        accountType: '',
        bankId: '',
			},
			tableSelect: {},
			radioVal: ''
    }
	},
	computed:{
		options5(){

		}
	},
  methods: {
		updateSearchData() {
      this.searchData = [{
        type: 'input',
        label: this.$t('public.orderId'),
        attr: 'orderId',
        value: '',
        maxLength: "10",
      }, {
        type: 'input',
        label: this.$t('public.name'),
        attr: 'phone',
        value: '',
        maxLength: 10,
      },{
        type: 'input',
        label: this.$t('public.no83'),
        attr: 'phone',
        value: '',
        maxLength: 10,
      }, {
        type: 'select',
        attr: 'channel',
        label: this.$t('auditManage.no3'),
        option: this.$store.state.options.pingZhang_auditStatus,
        value: '',
      }, {
        type: 'rangePicker',
        label: this.$t('public.no82'),
        attr: 'refundTime',
        value: [],
      }];
    },
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.getTableData();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.getTableData();
    },
    handleCurrentChange1 (val) { // 分页按钮点击操作
      this.currentPage1 = val;
      this.getTableData();
    },
    handleCurrentChange2 (val) { // 分页按钮点击操作
      this.currentPage2 = val;
      this.getTableData();
    },
    select () { // 点击查询按钮操作
      if (this.clickFlag) {
        this.currentPage = 1;
        this.clickFlag = false;
        this.getTableData();
      }
		},
		search(condition) { // 搜索
      this.condition = {
        orderId: condition.orderId,
        name: condition.name,
        transId: condition.transId,
        status: condition.status,
        refundTimeBegin: this.$store.getters.yyyy_m_d(condition.refundTime[0]),
        refundTimeEnd: this.$store.getters.yyyy_m_d(condition.refundTime[1]),
      };
      this.currentPage = 1;
      this.getTableData();
    },
    putExcel () {
      if (this.clickFlag) {
        this.clickFlag = false;
        let option = this.$store.getters.getBaseHeader('FLAT0004',this.condition,{'index': this.currentPage, 'size': this.pageNumber})
        this.$axios.post('', option).then(res => {
          this.clickFlag = true;
					let title = res.data.data.titles;
					let fields = res.data.data.fields;
					let data = res.data.data.data;
					this.$export2Excel(title,fields,data);
        })
      }
    },
		getTableData () { // 放款列表数据
			let option = this.$store.getters.getBaseHeader('FLAT0001',this.condition,{'index': this.currentPage, 'size': this.pageNumber})
      this.loadFlag = true;
      this.$axios.post('', option).then( res => {
        this.clickFlag = true;
				this.tableData = res.data.data;
				this.pageTotal = res.data.header.page.total;
        this.loadFlag = false;
      })
    },
    showDetail (orderId) { // 查看详情操作
      this.getDetailData(orderId,2)
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
          this.getTableData();
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
      this.PingZangFlag = false;
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
		tableRowChange (val) {
      this.tableSelect = val;
      this.radioVal = val.id;
		},
		getDetailData(orderId,type){
			let option = this.$store.getters.getBaseHeader('FLAT0003',{orderId,type},{'index': this.currentPage, 'size': this.pageNumber})
			this.$axios.post('', option).then( res => {
				if(res.data.header.code==0){
					if(type==2){
						this.detailTableData = res.data.data;
						this.pageTotal2 = res.data.header.page.total;
						this.detailFlag = true;
					}
					if(type==2){
						this.PingZangTableData = res.data.data;
						this.pageTotal1 = res.data.header.page.total;
						this.PingZangFlag = true;
					}
					
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
    PingZangFlag(val){
      if(!val){
        this.againClose();
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    // this.getTableData();
    
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
	.title{
		font-size: 16px;
		font-weight: 600;
	}
</style>
