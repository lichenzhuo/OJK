<template>
  <div class="operatorManage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('couponSetting.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('operatorManage.no1')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('operatorManage.no1')}}</p>
        </div>
      </el-col>
    </el-row>
     
  <!-- ------------  搜索查询栏  -------------------- -->
  <search-filter :filter="filter" 
    :searchRight="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_HAND_QUERY')"
    @search="search" ></search-filter>
  
  <!-- ------------  消息发送  --------------------- -->
    <div class="search" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_HAND_SEND')">
      <el-row type="flex" justify="start" align="middle" :gutter="10">
        <el-col :span="3">
          <div 
          class="search-add" 
          @click="sendNote()">
          +{{$t('operatorManage.no6')}}
          </div>
        </el-col>
      </el-row>
    </div>

  <!-- ------------  优惠券列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_HAND_LIST')">
      <template>
        <el-table :data="tableList" size="small" stripe style="width: 100%"  empty-text>
          <el-table-column align="center" prop="messageId" :label="$t('operatorManage.no3')">
          </el-table-column>
          <el-table-column align="center" prop="strSendTime" :label="$t('operatorManage.no5')">
          </el-table-column>
          <el-table-column align="center" prop="sendType" :label="$t('operatorManage.no4')">
            <template slot-scope="scope">
              <span v-if="scope.row.sendType!==null&&scope.row.sendType!==undefined&&scope.row.sendType!==''">{{$t($store.getters.sendTypeState(scope.row.sendType))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
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
              style="color:#547ef6;cursor:pointer;" 
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
        <el-form-item :label="$t('operatorManage.no4')" prop="sendType">
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
      <h4>{{$t('operatorManage.no17')}}</h4>
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
          <el-form-item :label="$t('operatorManage.no14')" >
            <el-input type="text" style="width:215px;" v-model="evenForm.successfulLendings"></el-input>
          </el-form-item>
          <el-form-item :label="$t('operatorManage.no15')" >
            <el-input type="text" style="width:215px;" v-model="evenForm.overDueDays"></el-input>
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
      <p class="detail_con"><span>{{$t('operatorManage.no4')}}:</span><span>{{detailData.sendType==1?$t('operatorManage.sendType.no1'):$t('operatorManage.sendType.no2')}}</span></p>
      <p class="detail_con"><span>{{$t('operatorManage.no10')}}:</span><span>{{detailData.title}}</span></p>
      <p class="detail_con"><span>{{$t('operatorManage.no11')}}:</span><span>{{detailData.description}}</span></p>
      <p class="detail_con"><span>{{$t('operatorManage.no12')}}:</span><span>{{detailData.message}}</span></p>
      <h4>{{$t('operatorManage.no18')}}</h4>
      <p class="detail_con" v-if="detailData.phone"><span>{{$t('public.userTel')}}:</span><span>{{detailData.phone}}</span></p>
      <p class="detail_con" v-if="detailData.packageName"><span>{{$t('new.no48')}}:</span><span>{{detailData.packageName}}</span></p>
      <p class="detail_con" v-if="detailData.userStatus"><span>{{$t('public.userSelfStatus')}}:</span><span>{{$t($store.getters.blackStatus(detailData.userStatus))}}</span></p>
      <p class="detail_con" v-if="detailData.isAuth"><span>{{$t('public.approveStatus')}}:</span><span>{{$t($store.getters.isAuth_Status(detailData.isAuth))}}</span></p>
      <p class="detail_con" v-if="detailData.lastOrderStatus"><span>{{$t('public.orderStatus')}}:</span><span>{{$t($store.getters.rejectStatus(detailData.lastOrderStatus))}}</span></p>
      <p class="detail_con" v-if="detailData.successfulLendings"><span>{{$t('operatorManage.no14')}}:</span><span>{{detailData.successfulLendings}}</span></p>
      <p class="detail_con" v-if="detailData.overDueDays"><span>{{$t('operatorManage.no15')}}:</span><span>{{detailData.overDueDays}}</span></p>
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
import searchFilter from '../../components/component/filter'
export default {
  name: 'operatorManage',
  components: {searchFilter},
  data () {
    return {
      dialogFormVisible: false,
      dialogDetailVisible: false,
      formLabelWidth: '90px',
      tableList: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      filter: {
        messageId: '',
        sendType: '',
        sendTime: ''
      },
      form: {
        sendType: '',
        title: '',
        description: '',
        message: '',
      },
      couponTypeOption:  this.$store.state.options.couponType,
      option1:[],// App包名
      option2:this.$store.state.options.operatorManage_blackStatus,
      option3:this.$store.state.options.operatorManage_approveStatus,
      option4:this.$store.state.options.operatorManage_orderStatus,
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
        overDueDays:''
      },
      detailData:{},
      rules:{
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
    this.fetchData()
    this.getAppName()// 获取包名
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.page.size = val;
      this.fetchData(this.condition);
    },
    fetchData (condition) {
      const self = this
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
        sendType: condition?condition.sendType: '',
        messageId: condition?condition.messageId: '',
        sendTimeBegin:  condition?condition.sendTime?condition.sendTime[0]: '':'',
        sendTimeEnd: condition?condition.sendTime?condition.sendTime[1]: '':'',
      }
      this.$axios.post('', option).then(res => {
        this.flag = true
        if (res.data.header.code == 0) {
          self.tableList = res.data.data
          self.page.total = res.data.header.page.total
        } else {
          self.$message.error(res.data.header.msg)
        }
      })
    },
    search (condition) {// 查询按钮点击
      const self= this
      self.page.current = 1
      self.condition = condition
      if(this.flag){
        this.flag = false;
        this.fetchData(self.condition)
      }
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val
      this.fetchData(this.condition)
    },
    sendNote () {
      const self = this
      self.odd = {
        phone:''
      },
      self.evenForm = {
        packageName:'',
        userStatus:'',
        isAuth:'',
        lastOrderStatus:'',
        successfulLendings:'',
        overDueDays:''
      },
      self.form = {
        sendType: '',
        title: '',
        description: '',
        message: '',
      },
      self.dialogFormVisible = true
    },
    save () {// 消息发送确认操作
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
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
              this.$globalMsg.success(this.$t('message.success'))
              this.fetchData()
            }else{
              this.$globalMsg.error(res.data.header.msg)
            }
          })
          this.dialogFormVisible = false
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
          action: this.$store.state.actionMap.select_allData,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data.package
          arr.forEach(value => {
            this.option1.push({value: value.optionValue, label: value.optionValue})
          })
          this.addContent = true
        }
      })
    },
  },
  watch:{
    'form.sendType'(){
      if(this.form.sendType==1){
        this.evenForm.packageName = ''
        this.evenForm.userStatus = ''
        this.evenForm.isAuth = ''
        this.evenForm.lastOrderStatus = ''
        this.evenForm.successfulLendings = ''
        this.evenForm.overDueDays = ''
      }else if(this.form.sendType==2){
        this.odd.phone = ''
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @mixin flex-cen {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @mixin p-span {
    p{
      line-height: 24px;
      span:nth-child(1){
        white-space: nowrap;
        color: $color1;
        font-size: 16px;
      }
      span:nth-child(2),span:nth-child(3),span:nth-child(4){
        color: $color2;
        font-size: 16px;
        margin: 0 10px;
        word-break: break-all;
      } 
    }
  }
  
  .operatorManage {
    width: 100%;
    height: auto;
    padding: 20px 30px;
    background-color: rgba(246, 249, 252, 1);
    position: relative;
    .paixu {
      width: 100%;
      height: 48px;
      line-height: 48px;
      background: rgba(224, 229, 246, 1);
      border-radius: 4px;
      span {
        display: block;
        float: left;
        margin-top: 10px;
        background-color: rgba(84, 126, 245, 1);
        width: 4px;
        height: 30px;
        border-radius: 5px;
      }
      p {
        color: rgba(84, 126, 245, 1);
        font-size: 16px;
        margin-left: 20px;
      }
      
    }
    .search {
      width: 100%;
      background-color: #ffffff;
      margin-top: 18px;
      margin-bottom: 22px;
      padding: 22px 28px 22px 5px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      .search-add{
        width: 114px;
        height: 100%;
        border: 1px solid #547ef6;
        border-radius:5px;
        text-align: center;
        line-height: 36px;
        color:#547ef5;
        margin-left: 30px;
        cursor:pointer;
      }
      .search-input {
        height: 50px;
        display: flex;
        align-items: center;
        // margin-right: 10px;
        & > span {
          padding: 0 5px;
          font-size: 14px;
          white-space: nowrap;
          @include flex-cen;
        }
        .el-input {
          flex: auto;
          @include flex-cen;
        }
        .el-date-editor {
          margin: 0 5px;
        }
        .el-select {
          flex: auto;
          @include flex-cen;
        }
        .el-button--primary{
          height: 40px;
          
        }
        .button-color{
          background-color: #1D7BFF;
          border-color: #547ef6;
        }
      }
    }
  }
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
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    span:nth-child(1){
      padding-left: 50px;
      padding-right: 14px;
    }
  }
</style>
