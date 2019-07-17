<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('teleMarketing.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('teleMarketing.no3')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('teleMarketing.no3')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>{{$t('public.name')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.name"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.userTel')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.phone"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('public.no2')}}:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.idCard"></el-input>
        </div>
        <div class="search-input">
          <span>{{$t('teleMarketing.no6')}}:</span>
          <el-select clearable size="small" v-model="formInline.regChannel" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('teleMarketing.no9')}}:</span>
          <el-select size="small" v-model="formInline.isFollowup" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('teleMarketing.no14')}}:</span>
          <el-select clearable size="small" v-model="formInline.isBorrow" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in loanOptions" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('teleMarketing.no44')}}:</span>
          <el-select clearable size="small" v-model="formInline.isSendCoupon" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('auditDetail.no43')}}:</span>
          <el-select clearable size="small" v-model="formInline.phoneResult" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in telresultOptions" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('public.no21')}}:</span>
          <el-date-picker 
            size="small"
            v-model="searchTime1" 
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <div class="search-input">
          <span>{{$t('teleMarketing.no17')}}:</span>
          <el-date-picker 
            size="small"
            v-model="searchTime2" 
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MY_MARKET_LIST_QUARY')">
          <div class="search-input ml15">
            <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MY_MARKET_LIST')">
      <template>
        <el-table :data="tableData" size="small" v-loading="loadFlag" stripe>
          <el-table-column align="center" prop="id" :label="$t('teleMarketing.no8')">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('public.name')">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')">
          </el-table-column>
          <el-table-column align="center" prop="idCard" :label="$t('public.no2')">
          </el-table-column>
          <el-table-column align="center" prop="appUrl" :label="$t('add.no74')">
          </el-table-column>
          <el-table-column align="center" prop="regChannel" :label="$t('teleMarketing.no6')">
          </el-table-column>
          <el-table-column align="center" prop="strCreateTime" :label="$t('public.no21')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="followUpStatus" :label="$t('teleMarketing.no9')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.isNo_status(scope.row.followUpStatus))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isBorrow" :label="$t('teleMarketing.no14')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.loanIntention_status(scope.row.isBorrow))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strFinalFollowupTime" :label="$t('teleMarketing.no10')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strApplyTime" :label="$t('public.CreateDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" :label="$t('teleMarketing.no11')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="isSendCoupon" :label="$t('teleMarketing.no44')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.isNo_status(scope.row.isSendCoupon))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="phoneResult" :label="$t('auditDetail.no43')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.tel_through(scope.row.phoneResult))}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MY_MARKET_SAVE')&&scope.row.isFollow==1"
                class="table_opr" 
                @click="showAdd(scope.row.id,scope.row.name,scope.row.phone,scope.row.isDisplayCoupon)"
              >
              {{$t('teleMarketing.no21')}}
              </span>
              <span 
                
                class="table_opr" 
                @click="selectDetail(scope.row.id,scope.row.name,scope.row.phone)"
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
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MY_MARKET_LIST')">
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

    <div class="foot"></div>

    <!-- ------------------ 查看详情弹窗开始 -------------------- -->
    <el-dialog :title="$t('public.no29')" :visible.sync="detailFlag" width="1100px">
      <p class="form-p mt-10">
        <span class="form-span2">{{$t('public.name')}}:</span>
        <span class="mr20">{{detailData.name}}</span>
        <span class="form-span2">{{$t('public.userTel')}}:</span>
        <span class="mr20">{{detailData.phone}}</span>
      </p>
      <el-table :data="tableData2" size="small" style="min-height:240px">
        <el-table-column align="center" prop="strCreateTime" :label="$t('public.no21')">
        </el-table-column>
        <el-table-column align="center" prop="callResult" :label="$t('auditDetail.no43')" >
          <template slot-scope="scope">
              <span>{{$t($store.getters.tel_through(scope.row.callResult))}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="isSendMessage" :label="$t('operationDetail.no25')" >
          <template slot-scope="scope">
              <span>{{$t($store.getters.isNo_status(scope.row.isSendMessage))}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="isBorrow" :label="$t('teleMarketing.no14')" >
          <template slot-scope="scope">
              <span>{{$t($store.getters.loanIntention_status(scope.row.isBorrow))}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" :label="$t('public.no37')" >
        </el-table-column>
        <el-table-column align="center" :label="$t('filter.couponItem')">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType === 1">{{$t('filter.couponType.no1')}}</span>
              <span v-if="scope.row.couponType === 2">{{$t('filter.couponType.no2')}}</span>
              <span v-if="scope.row.couponType === 3">{{$t('filter.couponType.no3')}}</span>
              <span v-if="scope.row.couponType === 4">{{$t('filter.couponType.no4')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('filter.couponCon')">
            <template slot-scope="scope">
              <span v-if= "scope.row.couponType === 1">{{scope.row.couponAmount+''+scope.row.unit}}</span>
              <span v-if= "scope.row.couponType === 2">{{scope.row.couponDays+''+scope.row.unit}}</span>
              <span v-if= "scope.row.couponType === 3">{{scope.row.couponAmount+''+scope.row.unit}}</span>
              <span v-if= "scope.row.couponType === 4">{{scope.row.couponInterest+''+scope.row.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('filter.validTime')" width="200px">
            <template slot-scope="scope">
               <p>{{scope.row.strEffectiveTimeBegin?(scope.row.strEffectiveTimeBegin+'~'+scope.row.strEffectiveTimeEnd): ''}}</p>
            </template>
          </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <el-pagination
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          layout="prev, pager, next, ->"
          :total="pageTotal2?pageTotal2:0">
        </el-pagination>
      </el-row>
    </el-dialog>
    <!-- ------------------ 查看详情弹窗结束 -------------------- -->

    <!-- 添加营销数据 -->
    <el-dialog :title="$t('teleMarketing.no21')" :visible.sync="addFlag" width="850px">
      <el-button 
        v-if="$store.state.common.lang==='id'" 
        type="primary" 
        size="small" 
        @click="openTelWindow">
      {{$t('teleMarketing.no18')}}
      </el-button>
      <div class="left2right">
        <div class="left">{{$t('public.name')}}</div>
        <div class="right">{{addRecord.name}}</div>
      </div>
      <div class="left2right">
        <div class="left">{{$t('public.userTel')}}</div>
        <div class="right">{{addRecord.phone}}</div>
      </div>
      <el-form :model="addRecord" size="small" ref="ruleForm" label-width="130px" :rules="rule">
        <el-form-item :label="$t('auditDetail.no43')" prop="connectStatus">
          <el-select size="small" v-model="addRecord.connectStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options5" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('operationDetail.no25')" prop="isSendMessage">
          <el-radio-group v-model="addRecord.isSendMessage">
            <el-radio :label="1">{{$t('auditDetail.isAdressBook.no1')}}</el-radio>
            <el-radio :label="2">{{$t('auditDetail.isAdressBook.no2')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('teleMarketing.no14')" prop="isBorrow">
          <el-radio-group v-model="addRecord.isBorrow">
            <el-radio :label="1">{{$t('teleMarketing.no19')}}</el-radio>
            <el-radio :label="2">{{$t('teleMarketing.no20')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- &&addRecord.isDisplayCoupon==1 -->
        <el-form-item :label="$t('teleMarketing.no44')" prop="iscoupon" 
          v-if="$store.state.common.permiss.includes('RIGHT_PHONE_MY_MARKET_SEND_COUPON')&&addRecord.isDisplayCoupon==1">
          <div>
            <el-select style="width:224px" size="small" v-model="addRecord.isNo" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
            <br>
            <template v-if="addRecord.isNo==1">
              <el-radio-group v-model="addRecord.couponId" @change="radioChange">
                <el-radio v-for="(n,i) in couponData" :key="i" 
                  :label="n.id">
                  {{n.couponTypeName}}:
                  {{n.couponType==1||n.couponType==3?n.couponAmount:n.couponType==2?n.couponDays:n.couponType==4?n.couponInterest:''}}
                  {{n.unit}}
                   <span class="mr20"></span>{{$t('filter.validTime')}}:
                   <el-date-picker 
                    size="small"
                    v-model="radioDate[n.id]" 
                    value-format="yyyy-MM-dd" 
                    type="daterange" 
                    range-separator="~" 
                    :default-value="$store.state.common.preMonth" 
                    :start-placeholder="$t('public.beginTime')" 
                    :end-placeholder="$t('public.endTime')">
                  </el-date-picker>
                </el-radio>
              </el-radio-group>
            </template>
          </div>
        </el-form-item>
        <el-form-item :label="$t('public.no37')">
          <el-input type="textarea" v-model="addRecord.remark" :rows="4" :placeholder="$t('loanMoney.placeholder')+'~'"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="addRecordSubmit('ruleForm')">{{$t('public.no47')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  name: 'MyMarketing',
  data () {
    return {
      sessionid: '',
      flag: true,
      loadFlag: true,
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime1: [], // 添加时间
      searchTime2: [], // 最后跟进时间
      formInline: { // 用户查询信息数据对应字段
        idCard: '',
        name: '',
        phone: '',
        regChannel: '',
        isFollowup: '',
        addTimeBegin:'',
        addTimeEnd:'',
        finalFollowTimeBegin:'',
        finalFollowTimeEnd:'',
      },
      currentPage: 1, // 当前页下标
      currentPage2: 1, // 当前页下标
      pageTotal2: 0, // 分页总数
      options1: [], // 渠道来源
      options2: this.$store.state.options.isOverdue_option, // 是否更进,是否发送优惠券
      options3: [], // 电销员
      tableData: [],// 表格数据
      tableData2: [],// 弹窗表格数据
      options4: [], // 在职客服员列表
      options5: this.$store.state.options.telResult_select, // 通话结果
      options6: this.$store.state.options.ishang_option, // 是否
      telresultOptions: this.$store.state.options.telResult_select, // 通话结果
      loanOptions: this.$store.state.options.loanIntention_status, // 借款意向
      addFlag: false,
      detailFlag: false,
      detailData: {
        id: '',
        name: '',
        phone: '',
        
      },
      addRecord: {
        connectStatus: '',
        isSendMessage: '',
        isBorrow: '',
        remark: '',
        isNo: '',
        couponId: '',
        isDisplayCoupon: '',
      },
      rule: { 
        connectStatus: [
          { required: true, message:' ', trigger: 'change' }
        ],
        isSendMessage: [
          { required: true, message:' ', trigger: 'change' }
        ],
        isBorrow: [
          { required: true, message:' ', trigger: 'change' }
        ],

      },
      couponData: [],
      radioDate:{}
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.getTableData();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = val;
      this.getTableData();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('noBackOrderList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.getTableData();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.kf_noBackOrder_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
        };
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
    selectDetail (id, name, phone) { // 查看详情操作
      this.detailData.id = id;
      this.detailData.name = name;
      this.detailData.phone = phone;
      this.getDetailTable();
    },
    getDetailTable(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0004,
          'page': {'index': this.currentPage2, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.detailData
      };
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData2 = res.data.data;
          this.pageTotal2 = res.data.header.page.total;
          this.detailFlag = true;
        }else{
          this.$globalMsg.error(res.data.header.msg)
        }
      })
    },
    getTableData () { // 获取列表数据
      this.loadFlag = true;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0002,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      };
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
    chuPeople () { // 获取客服人员列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_people_option,
          'sessionid': this.sessionid
        },
        type: '3'
      };
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options4 = arr;
        }
      })
    },
    handleCurrentChange2 (val) { // 查看弹窗表格分页
      this.currentPage2 = val;
      this.getDetailTable()
    },
    showAdd(id, name, phone,isDisplayCoupon){
      this.addRecord.id = id;
      this.addRecord.name = name;
      this.addRecord.phone = phone;
      this.addRecord.isDisplayCoupon = isDisplayCoupon;
      this.addFlag = true;
    },
    addRecordSubmit(formName){
      if(this.addRecord.isNo==1&&this.addRecord.couponId==''){
        return this.$globalMsg.error(this.$t('teleMarketing.no45'))
      }
      let option = {
        header: {
          action: this.$store.state.actionMap.PHONEMARKET0003,
          ...this.$base,
          sessionid: this.sessionid
        },
        ...this.addRecord
      }
      if(this.addRecord.couponId!==''){
        option.effectiveTimeBegin=this.radioDate[this.addRecord.couponId]?this.radioDate[this.addRecord.couponId][0]:'';
        option.effectiveTimeEnd=this.radioDate[this.addRecord.couponId]?this.radioDate[this.addRecord.couponId][1]:'';
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'))
              setTimeout(()=>{
                this.getTableData()
              },1000)
            } else {
              this.$globalMsg.error(this.$t('idManage.err'))
            }
          })
          
          this.addClose()
        }
      })
    },
    addClose(){
      this.radioDate = {};
      this.addFlag = false;
      this.addRecord.couponId = '';
      this.addRecord.isNo = '';
      this.$refs['ruleForm'].resetFields();
    },
    openTelWindow(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.TELEPHONE0001,
          'sessionid': this.sessionid
        },
        orderId:this.addRecord.id,
        phone:this.addRecord.phone,
        type:4
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          var href  = 'sip:'+this.addRecord.phone+','+res.data.data;
          window.location.href = href;
        }else{
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    },
    getchannel(){ // 获取渠道下拉框数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PHONEMARKET0011,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            this.options1.push({value,label:value})
          })
        }
      })
    },
    getCouponData () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.couponsSettingList,
          sessionid: this.sessionid,
          page: {index: 1,size: 10}
        },
        couponName: '电销使用',
        status: 2,
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.couponData = res.data.data;
        }else {
          this.$message.error(res.data.header.msg);
        }
      })
    },
    radioChange(){
      this.radioDate = {}
    }
  },
  watch: {
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.addTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime1[0]);
        this.formInline.addTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime1[1]);
      } else {
        this.formInline.addTimeBegin = '';
        this.formInline.addTimeEnd = '';
      }
    },
    searchTime2 () {
      if (this.searchTime2) {
        this.formInline.finalFollowTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime2[0]);
        this.formInline.finalFollowTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime2[1]);
      } else {
        this.formInline.finalFollowTimeBegin = '';
        this.formInline.finalFollowTimeEnd = '';
      }
    },
    addFlag(val){
      if(!val){
        this.addClose()
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableData();
    this.getchannel();
    this.getCouponData();
  }
}
</script>

<style scoped lang="scss">
  .mr20{
    margin-right: 20px;
  }
  .mb5{
    margin-bottom: 6px;
  }
  .mt-10{
    margin-top: -20px;
    margin-bottom: 6px;
  }
  .el-radio{
    margin-top: 8px;
  }
</style>
