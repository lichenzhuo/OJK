<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('couponSetting.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('operatorManage.no1')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('operatorManage.no1')}}</p>
    </div>
     
  <!-- ------------  搜索查询栏  -------------------- -->
  <search-filter :filter="filter" 
    :searchRight="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_HAND_QUERY')"
    @search="search" ></search-filter>
  
  <!-- ------------  消息发送  --------------------- -->
    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_HAND_SEND')">
      <el-button 
        type="primary"
        @click="sendNote()">
        +{{$t('operatorManage.no6')}}
      </el-button>
    </div>

  <!-- ------------  优惠券列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_HAND_LIST')">
      <template>
        <el-table :data="tableList" size="small" stripe>
          <el-table-column align="center" prop="messageId" :label="$t('operatorManage.no3')">
          </el-table-column>
          <el-table-column align="center" prop="strSendTime" :label="$t('operatorManage.no5')">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="messageType" :label="$t('operatorManage.no4')">
              <template slot-scope="scope">
                <span>{{$t($store.getters.manual_sendStatus(scope.row.messageType))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="sendType" :label="$t('operatorManage.no18')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.sendTypeState(scope.row.sendType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="resolved" :label="$t('operatorManage.no7')">
          </el-table-column>
          <el-table-column align="center" prop="delivered" :label="$t('operatorManage.no8')">
          </el-table-column>
          <el-table-column align="center" prop="click" :label="$t('operatorManage.no9')">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" >
            <template slot-scope="scope" >
              <span 
              v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_HAND_DETAIL')"
              class="table_opr" 
              @click="detail(scope.row)">{{$t('public.no29')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

  <!-- ------------  添加活动弹框  ------------------------ -->
    <el-dialog :title="$t('operatorManage.no6')" :visible.sync="dialogFormVisible"  width="850px">
      <h4>{{$t('operatorManage.no16')}}</h4>
      <el-form :model="form" size="small" :rules="rules" ref="ruleForm" label-width="140px">
        <template v-if="$store.state.common.lang==='vi'">
          <el-form-item :label="$t('operatorManage.no4')" prop="messageType">
            <el-select size="small" v-model="form.messageType">
              <el-option v-for="item in option5" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item :label="$t('operatorManage.no18')" prop="sendType">
          <el-radio-group v-model="form.sendType">
            <el-radio :label="1">{{$t('operatorManage.sendType.no1')}}</el-radio>
            <el-radio :label="2">{{$t('operatorManage.sendType.no2')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('operatorManage.no10')" prop="title">
          <el-input type="text" style="width:215px;" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item :label="$t('operatorManage.no11')" prop="description">
          <el-input type="textarea" style="width:400px;" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item :label="$t('operatorManage.no12')" prop="message">
          <el-input type="textarea" style="width:400px;" v-model="form.message"></el-input>
        </el-form-item>
      </el-form>
      <h4 class="mb20">{{$t('operatorManage.no17')}} <span class="red">({{$t('add.no5')}})</span></h4>
      <div class="even" v-if="form.sendType==2">
        <el-form :inline="true" :model="evenForm" size="small" label-width="120px">
          <el-form-item :label="$t('new.no48')">
            <el-select v-model="evenForm.packageName" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,index) in option1" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item :label="$t('public.userSelfStatus')">
            <el-select v-model="evenForm.userStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="(item,index) in option2" :key="index" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('public.approveStatus')">
            <el-select v-model="evenForm.isAuth" :placeholder="$t('public.placeholder')">
              <el-option v-for="(item,index) in option3" :key="index" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('public.orderStatus')">
            <el-select v-model="evenForm.lastOrderStatus" :placeholder="$t('public.placeholder')">
              <el-option v-for="(item,index) in option4" :key="index" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('operatorManage.no14')+'≥'" >
            <el-input type="text" style="width:215px;" v-model="evenForm.successfulLendings"></el-input>
          </el-form-item>
          <el-form-item :label="$t('operatorManage.no15')+'≤'" >
            <el-input type="text" style="width:215px;" v-model="evenForm.overDueDays"></el-input>
          </el-form-item>
          <el-form-item label="最新订单应还时间" v-if="$store.state.common.lang==='vi'">
            <el-date-picker 
              size="small"
              v-model="RefundTime" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="odd" v-if="form.sendType==1">
        <span >{{$t('public.userTel')}}</span>
        <el-input type="text" style="width:215px;" size="small" v-model="odd.phone"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="save">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('public.detail')" :visible.sync="dialogDetailVisible"  width="750px">
      <h4>{{$t('operatorManage.no16')}}</h4>
      <div class="left2right">
        <span class="left" style="width:120px">{{$t('operatorManage.no4')}}:</span>
        <div class="right">
          {{detailData.sendType==1?$t('operatorManage.sendType.no1'):$t('operatorManage.sendType.no2')}}
        </div>
      </div>
      <div class="left2right">
        <span class="left" style="width:120px">{{$t('operatorManage.no10')}}:</span>
        <div class="right">
          {{detailData.title}}
        </div>
      </div>
      <div class="left2right">
        <span class="left" style="width:120px">{{$t('operatorManage.no11')}}:</span>
        <div class="right">
          {{detailData.description}}
        </div>
      </div>
      <div class="left2right">
        <span class="left" style="width:120px">{{$t('operatorManage.no12')}}:</span>
        <div class="right">
          {{detailData.message}}
        </div>
      </div>
      <!-- <p class="detail_con"><span>{{$t('operatorManage.no4')}}:</span><span>{{detailData.sendType==1?$t('operatorManage.sendType.no1'):$t('operatorManage.sendType.no2')}}</span></p>
      <p class="detail_con"><span>{{$t('operatorManage.no10')}}:</span><span>{{detailData.title}}</span></p>
      <p class="detail_con"><span>{{$t('operatorManage.no11')}}:</span><span>{{detailData.description}}</span></p>
      <p class="detail_con"><span>{{$t('operatorManage.no12')}}:</span><span>{{detailData.message}}</span></p> -->
      <h4>{{$t('operatorManage.no18')}}</h4>
      <p class="detail_con" v-if="detailData.phone"><span>{{$t('public.userTel')}}:</span><span>{{detailData.phone}}</span></p>
      <p class="detail_con" v-if="detailData.packageName"><span>{{$t('new.no48')}}:</span><span>{{detailData.packageName}}</span></p>
      <p class="detail_con" v-if="detailData.userStatus"><span>{{$t('public.userSelfStatus')}}:</span><span>{{$t($store.getters.blackStatus(detailData.userStatus))}}</span></p>
      <p class="detail_con" v-if="detailData.isAuth"><span>{{$t('public.approveStatus')}}:</span><span>{{$t($store.getters.isAuth_Status(detailData.isAuth))}}</span></p>
      <p class="detail_con" v-if="detailData.lastOrderStatus"><span>{{$t('public.orderStatus')}}:</span><span>{{$t($store.getters.rejectStatus(detailData.lastOrderStatus))}}</span></p>
      <p class="detail_con" v-if="detailData.successfulLendings"><span>{{$t('operatorManage.no14')}}:</span><span>{{detailData.successfulLendings}}</span></p>
      <p class="detail_con" v-if="detailData.overDueDays"><span>{{$t('operatorManage.no15')}}:</span><span>{{detailData.overDueDays}}</span></p>
      <p class="detail_con" v-if="detailData.mustRefundTimeBegin"><span>{{$t('operatorManage.no15')}}:</span><span>{{detailData.mustRefundTimeBegin+'~'+detailData.mustRefundTimeEnd}}</span></p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetailVisible = false">{{$t('public.no50')}}</el-button>
      </div>
    </el-dialog>
    
    <!-- ------------  分页   ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_HAND_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[10, 15, 20, 30]"
          layout="sizes, prev, pager, next, total,->"
          :page-size="page.size"
          @size-change="handleSizeChange"
          :total="page.total?page.total:0">
        </el-pagination>
      </div>
    </el-row>

  </div>
</template>
<script>
import searchFilter from '../../components/component/filter';
export default {
  name: 'ManualnotePut',
  components: {searchFilter},
  data () {
    return {
      dialogFormVisible: false,
      dialogDetailVisible: false,
      formLabelWidth: '90px',
      tableList: [],
      RefundTime: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      filter: {
        messageId: '',
        sendType: '',
        sendTime: '',
        sendObj: '',
        messageType: ''
      },
      form: {
        sendType: '',
        title: '',
        description: '',
        message: '',
        messageType:''
      },
      couponTypeOption:  this.$store.state.options.couponType,
      option1:[],// App包名
      option2:this.$store.state.options.operatorManage_blackStatus,
      option3:this.$store.state.options.operatorManage_approveStatus,
      option4:this.$store.state.options.operatorManage_orderStatus,
      option5:this.$store.state.options.buildInSendType_options,
      flag: true,
      odd:{
        phone:''
      },
      evenForm:{
        packageName:'',
        userStatus:'',
        isAuth:'',
        lastOrderStatus:'',
        successfulLendings:'',
        overDueDays:'',
        mustRefundTimeBegin:'',
        mustRefundTimeEnd:'',
      },
      detailData:{},
      rules:{
        messageType: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        sendType: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        title: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        description: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        message: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
      }
    }
  },
  mounted () {
    this.fetchData();
    this.getAppName();// 获取包名
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.page.size = val;
      this.fetchData(this.condition);
    },
    fetchData (condition) {
      const self = this;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.MESSAGEPUSH0001,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        messageType: condition?condition.messageType: '',
        sendType: condition?condition.sendType: '',
        messageId: condition?condition.messageId: '',
        sendTimeBegin:  condition?condition.sendTime?condition.sendTime[0]: '':'',
        sendTimeEnd: condition?condition.sendTime?condition.sendTime[1]: '':'',
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          self.tableList = res.data.data;
          self.page.total = res.data.header.page.total;
        } else {
          self.$message.error(res.data.header.msg);
        }
      })
    },
    search (condition) {// 查询按钮点击
      const self= this;
      self.page.current = 1;
      self.condition = condition;
      if(this.flag){
        this.flag = false;
        this.fetchData(self.condition);
      }
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val;
      this.fetchData(this.condition);
    },
    sendNote () {
      const self = this;
      self.odd = {
        phone:''
      },
      self.evenForm = {
        packageName:'',
        userStatus:'',
        isAuth:'',
        lastOrderStatus:'',
        successfulLendings:'',
        overDueDays:'',
        mustRefundTimeBegin:'',
        mustRefundTimeEnd:'',
      },
      self.form = {
        messageType: '',
        sendType: '',
        title: '',
        description: '',
        message: '',
      },
      self.dialogFormVisible = true;
    },
    save () {// 消息发送确认操作
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.sendType==1&&this.odd.phone==='') return
          if (this.form.sendType==2&&!this.RefundTime.length&&this.evenForm.packageName===''&&this.evenForm.userStatus===''&&this.evenForm.isAuth===''&&this.evenForm.lastOrderStatus===''&&this.evenForm.successfulLendings===''&&this.evenForm.overDueDays==='') return
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.MESSAGEPUSH0002,
              sessionid: sessionStorage.getItem('sessionid')
            },
            ...this.form,
            ...this.evenForm,
            ...this.odd
          }
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'));
              this.fetchData();
            }else{
              this.$globalMsg.error(res.data.header.msg);
            }
          })
          this.dialogFormVisible = false;
          this.$refs.ruleForm.resetFields();
          this.RefundTime = []
        } else {
          return false;
        }
      })
    },
    detail(detailData){
      this.detailData = detailData;
      this.dialogDetailVisible = true;
    },
    getAppName () { // 获取app名字和包名
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
          'sessionid': this.sessionid
        },
        'optionGroup': 'package'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            this.options1.push({value: value.optionValue, label: value.optionValue});
          })
          this.addContent = true;
        }
      })
    },
  },
  watch:{
    'form.sendType'(){
      if(this.form.sendType==1){
        this.evenForm.packageName = '';
        this.evenForm.userStatus = '';
        this.evenForm.isAuth = '';
        this.evenForm.lastOrderStatus = '';
        this.evenForm.successfulLendings = '';
        this.evenForm.overDueDays = '';
        this.evenForm.mustRefundTimeBegin = ''
        this.evenForm.mustRefundTimeEnd = ''
      }else if(this.form.sendType==2){
        this.odd.phone = '';
      }
    },
    RefundTime(){
      if (this.RefundTime) {
        this.evenForm.mustRefundTimeBegin = this.$store.getters.yyyy_m_d(this.RefundTime[0]);
        this.evenForm.mustRefundTimeEnd = this.$store.getters.yyyy_m_d(this.RefundTime[1]);
      } else {
        this.evenForm.mustRefundTimeBegin = '';
        this.evenForm.mustRefundTimeEnd = '';
      }
    }
  }
}
</script>
<style scoped lang="scss">

  .odd{
    display: flex;
    span{
      display: block;
      width: 140px;
      text-align: right;
      padding-right: 12px;
    }
  }
  .detail_con{
    width: 100%;
    min-height: 40px;
    line-height: 40px;
    font-size: 16px;
    span:nth-child(1){
      padding-left: 50px;
      padding-right: 14px;
    }
  }
  .red{
    color: crimson;
    
  }
</style>
