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
			@putExcel="putExcel" 
			:searchRight="$store.state.common.permiss.includes('RIGHT_ACCOUNTING_REVIEWE_QUERY')"
			:outputRight="$store.state.common.permiss.includes('RIGHT_ACCOUNTING_REVIEWE_LIST_EXP')"
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
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNTING_REVIEW_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe v-loading="loadFlag">
          <el-table-column align="center" prop="orderId" :label="$t('public.orderId')" >
          </el-table-column>
          <el-table-column align="center" prop="repaymentNo" :label="$t('public.no83')" >
          </el-table-column>
          <el-table-column align="center" prop="loanAmount" :label="$t('public.no30')" >
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}
                {{$store.getters.moneySplit(scope.row.loanAmount)}}
                {{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('public.no27')" >
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}
                {{$store.getters.moneySplit(scope.row.returnMoney)}}
                {{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundAmount" :label="$t('public.no57')" >
            <template slot-scope="scope">
              <span>{{$store.state.common.id_currency}}
                {{$store.getters.moneySplit(scope.row.refundAmount)}}
                {{$store.state.common.vi_currency}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="refundTime" :label="$t('public.no60')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="thirdChannel" :label="$t('auditManage.no8')" >
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('auditManage.no9')" >
          </el-table-column>
          <el-table-column align="center" prop="applicationTime" :label="$t('public.submitDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="applicationResult" :label="$t('auditManage.no10')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.applicationResult_status(scope.row.applicationResult))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('auditManage.no3')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.applicationResult_status(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="reviewTime" :label="$t('new.no9')" width="86">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="180">
            <template slot-scope="scope" >
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNTING_REVIEWE_OPERATING')&&scope.row.isNotReview==1"
                class="table_opr" 
                @click="showAudit(scope.row)">
                {{$t('public.no76')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNTING_REVIEWE_VIEW')&&scope.row.isReview==1" 
                class="table_opr"  
                @click="showDetail(scope.row.orderId)">
                {{$t('public.no29')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_ACCOUNTING_REVIEW_LIST')">
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
    <el-dialog :title="$t('public.no29')" :visible.sync="detailFlag" width="1100px">
      <el-table :data="detailTableData" size="small">
				<el-table-column align="center" prop="id" :label="$t('auditManage.no17')" >
				</el-table-column>
				<el-table-column align="center" prop="repaymentId" :label="$t('public.backMoneyId')" >
          <template slot-scope="scope">
            <span>{{scope.row.repaymentId==0?'-':scope.row.repaymentId}}</span>
          </template>
				</el-table-column>
				<el-table-column align="center" prop="orderId" :label="$t('public.orderId')" >
        </el-table-column>
				<el-table-column align="center" prop="repaymentNo" :label="$t('public.no83')" >
				</el-table-column>
				<el-table-column align="center" prop="refundAmount" :label="$t('public.no65')" >
          <template slot-scope="scope">
            <span>{{$store.state.common.id_currency}}
              {{$store.getters.moneySplit(scope.row.refundAmount)}}
              {{$store.state.common.vi_currency}}</span>
          </template>
				</el-table-column>
				<el-table-column align="center" prop="thirdChannel" :label="$t('loanAfterManage.payType')" >
				</el-table-column>
				<el-table-column align="center" prop="refundTime" :label="$t('public.no60')" width="86">
        </el-table-column>
				<el-table-column align="center" prop="repaymentStatus" :label="$t('add.no52')" >
          <template slot-scope="scope">
            <span>{{$t($store.getters.applicationResult_status(scope.row.repaymentStatus))}}</span>
          </template>
				</el-table-column>
				<el-table-column align="center" prop="status" :label="$t('auditManage.no3')" >
          <template slot-scope="scope">
            <span>{{$t($store.getters.applicationResult_status(scope.row.status))}}</span>
          </template>
				</el-table-column>
				<el-table-column align="center" prop="reviewTime" :label="$t('new.no9')" width="86">
				</el-table-column>
        <el-table-column align="center" prop="name" :label="$t('auditManage.no4')" width="86">
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="end">
				<div class="pages" >
					<el-pagination
						@current-change="handleCurrentChange2"
						:current-page="currentPage2"
						layout=" prev, pager, next, total,->"
						:total="pageTotal2?pageTotal2:0">
					</el-pagination>
				</div>
			</el-row>
    </el-dialog>

    <!-- 平账审核弹窗 -->
    <el-dialog :title="$t('public.no76')" :visible.sync="PingZangFlag" width="1100px">
      <p class="title" style="margin-top:-20px;">{{$t('operationDetail.tab1.no2')}}</p>
      <p class="line"></p>
      <div class="oneLineHasThree">
				<p><span>{{$t('public.orderId')}}:</span>
					<span>{{AuditDetail.id | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('public.userName')}}:</span>
					<span>{{AuditDetail.userName | dataIsTrue}}</span>
				</p>
			</div>
      <div class="oneLineHasThree">
				<p><span>{{$t('public.no30')}}:</span>
					<span>{{AuditDetail.loanAmount | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('public.no27')}}:</span>
					<span>{{AuditDetail.returnMoney | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('public.no59')}}:</span>
					<span>{{AuditDetail.mustRefundTime | dataIsTrue}}</span>
				</p>
			</div>
			<p class="title">{{$t('auditManage.no12')}}</p>
      <p class="line"></p>
			<el-table ref="singleTable" :data="PingZangTableData" size="small" stripe highlight-current-row
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
          <template slot-scope="scope">
            <span>{{scope.row.repaymentId==0?'-':scope.row.repaymentId}}</span>
          </template>
				</el-table-column>
				<el-table-column align="center" prop="refundAmount" :label="$t('public.no57')" >
          <template slot-scope="scope">
            <span>{{$store.state.common.id_currency}}
              {{$store.getters.moneySplit(scope.row.refundAmount)}}
              {{$store.state.common.vi_currency}}</span>
          </template>
				</el-table-column>
				<el-table-column align="center" prop="refundTime" :label="$t('public.backMoneyDate')" >
				</el-table-column>
				<el-table-column align="center" prop="repaymentNo" :label="$t('public.no83')" >
				</el-table-column>
				<el-table-column align="center" prop="thirdChannel" :label="$t('auditManage.no8')" >
				</el-table-column>
				<el-table-column align="center" prop="remark" :label="$t('public.no37')" >
				</el-table-column>
				<el-table-column align="center" prop="createTime" :label="$t('public.submitDate')" width="86">
				</el-table-column>
				<el-table-column align="center" prop="applicationResult" :label="$t('auditManage.no10')" >
          <template slot-scope="scope">
            <span>{{$t($store.getters.applicationResult_status(scope.row.applicationResult))}}</span>
          </template>
				</el-table-column>
        <el-table-column align="center" prop="name" :label="$t('auditManage.no4')" width="86">
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="end">
				<div class="pages">
					<el-pagination
						@current-change="handleCurrentChange1"
						:current-page="currentPage1"
						layout="prev, pager, next, total,->"
						:total="pageTotal1?pageTotal1:0">
					</el-pagination>
				</div>
			</el-row>
			<p class="title">{{$t('auditManage.no11')}}</p>
      <p class="line"></p>
			<div class="oneLineHasThree">
				<p><span>{{$t('public.no57')}}:</span>
					<span>{{tableSelect.refundAmount | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('public.backMoneyDate')}}:</span>
					<span>{{tableSelect.refundTime | dataIsTrue}}</span>
				</p>
			</div>
      <div class="oneLineHasThree">
				<p><span>{{$t('public.no83')}}:</span>
					<span>{{tableSelect.repaymentNo | dataIsTrue}}</span>
				</p>
				<p><span>{{$t('auditManage.no8')}}:</span>
					<span>{{tableSelect.thirdChannel | dataIsTrue}}</span>
				</p>
				<p><span style="color:crimson">{{$t('auditManage.no10')}}:</span>
					<span style="color:crimson">{{$t($store.getters.applicationResult_status(tableSelect.applicationResult))}}</span>
				</p>
			</div>
			<el-form :model="PingZhangform" :rules="rules" ref="ruleForm" label-position="left" label-width="120px" size="small">
				<el-form-item :label="$t('yn.no10')" prop="amount">
          <el-select v-model="PingZhangform.status" :placeholder="$t('public.placeholder')">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in options5 " :key="i"></el-option>
          </el-select>
        </el-form-item>
				<el-form-item :label="$t('serviceManage.requestDes')" prop="remark">
          <el-input type="textarea" v-model="PingZhangform.remark" :rows="4"></el-input>
        </el-form-item>
			</el-form>
      <div class="flex flex-center">
        <el-button class="mg50" type="primary" @click="AuditSubmit('ruleForm')">{{$t('public.no49')}}</el-button>
        <el-button class="mg50" type="primary" @click="AuditClose"> {{$t('public.no50')}} </el-button>
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
      searchData:[],
      formInline: { // 用户查询信息数据对应字段
        orderId: '',
        name: '',
        transId: '',
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
        status: '',
        remark: '',
      },
      AuditDetail:{},
			tableSelect: {},
      radioVal: '',
      rules: {
        status: [
          { required: true, message: ' ', trigger: 'change' }
        ],
      }
    }
	},
	computed:{
		options5(){
      if(this.tableSelect.isDefault==1){
        return [
          {value: 1, label: 'auditManage.no14'}, // 还款成功
          {value: -1, label: 'userDetail.reject_status.no6'} // 还款失败
        ]
      }else if(this.tableSelect.isDefault==0){
        return [
          {value: 50, label: 'userDetail.reject_status.no19'}, // 部分还款
          {value: 51, label: 'userDetail.reject_status.no20'}, // 已还款
          {value: -2, label: 'auditManage.no6'}// 未到账
        ]
      }else if(this.tableSelect.isDefault==-1){
        return [
          {value: -3, label: 'auditManage.no16'}// 系统默认
        ]
      }
      
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
        attr: 'name',
        value: '',
        maxLength: 10,
      },{
        type: 'input',
        label: this.$t('public.no83'),
        attr: 'transId',
        value: '',
        maxLength: 10,
      }, {
        type: 'select',
        attr: 'status',
        label: this.$t('auditManage.no3'),
        option: this.$store.state.options.pingZhang_auditStatus,
        value: '',
        langFlag: true,
      }, {
        type: 'rangePicker',
        label: this.$t('public.no60'),
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
		search(condition) { // 搜索
      this.condition = {
        orderId: condition.orderId,
        name: condition.name,
        transId: condition.transId,
        status: condition.status,
        refundTimeBegin: condition.refundTime&&condition.refundTime[0]?this.$store.getters.yyyy_m_d(condition.refundTime[0]):'',
        refundTimeEnd: condition.refundTime&&condition.refundTime[1]?this.$store.getters.yyyy_m_d(condition.refundTime[1]):'',
      };
      this.currentPage = 1;
      this.getTableData();
    },
    putExcel (condition) {
      if (this.clickFlag) {
        this.clickFlag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.FLAT0004,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          orderId: condition.orderId,
          name: condition.name,
          transId: condition.transId,
          status: condition.status,
          refundTimeBegin: condition.refundTime&&condition.refundTime[0]?this.$store.getters.yyyy_m_d(condition.refundTime[0]):'',
          refundTimeEnd: condition.refundTime&&condition.refundTime[1]?this.$store.getters.yyyy_m_d(condition.refundTime[1]):'',
        };
        this.$axios.post('', option).then(res => {
          this.clickFlag = true;
          if(res.data.header.code==0){
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    },
		getTableData () { // 列表数据
			let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.FLAT0001,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.condition
      };
      this.loadFlag = true;
      this.$axios.post('', option).then( res => {
        this.clickFlag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
          this.loadFlag = false;
        }
      })
    },
    getDetailData(orderId,status){
			let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.FLAT0003,
          'page': {'index': status==1?this.currentPage1:this.currentPage2, 'size': status==1?5:10},
          'sessionid': this.sessionid
        },
        orderId,
        status
      };
			this.$axios.post('', option).then( res => {
				if(res.data.header.code==0){
					if(status==2){
						this.detailTableData = res.data.data;
						this.pageTotal2 = res.data.header.page.total;
						this.detailFlag = true;
					}
					if(status==1){
						this.PingZangTableData = res.data.data;
            this.pageTotal1 = res.data.header.page.total;
            this.PingZangFlag = true;
            setTimeout(()=>{
              this.$refs.singleTable.setCurrentRow(this.PingZangTableData[0]);
              this.radioVal = this.PingZangTableData[0].id
            },500)
					}
				} else {
          this.$globalMsg.error(res.data.header.msg);
        }
      })
		},
    showDetail (orderId) { // 查看详情操作
      this.getDetailData(orderId,2)
    },
    AuditSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.FLAT0002,
              'sessionid': this.sessionid
            },
            id:this.tableSelect.id,
            type:this.tableSelect.type,
            ...this.PingZhangform
          };
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'));
              this.getTableData();
              this.AuditClose();
            } else {
              this.$globalMsg.error(res.data.header.msg);
            }
          })
        }
      });
    },
    AuditClose(){
      this.AuditDetail = {};
      this.tableSelect = {};
      this.PingZhangform.status = '';
      this.PingZhangform.remark = '';
      this.PingZangFlag = false;
    },
    showAudit(row){
      this.AuditDetail = row
      this.getDetailData(row.orderId,1);
		},
		tableRowChange (val) {
      this.tableSelect = val;
      this.radioVal = val.id;
		},
		

  },
  watch: {
    PingZangFlag(val){
      if(!val){
        this.AuditClose();
      }
    }
  },
  mounted () {
    this.updateSearchData();
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableData();
    
    
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
    margin-bottom: 6px;
  }
  .line{
    width: 200px;
    border-bottom: 1px dashed rgb(173, 173, 173);
        margin-bottom: 8px;
  }
</style>
