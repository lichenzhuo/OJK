<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('couponSetting.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('operatorManage.no2')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('operatorManage.no2')}}</p>
    </div>

    <!-- ------------ 内置搜索查询栏开始 -------------- -->
    <div class="search" v-if="$store.state.common.lang==='vi'">
      <el-row type="flex" justify="start" >
        <div class="search-input">
          <span>{{$t('operatorManage.no4')}}:</span>
          <el-select size="small" clearable v-model="formInline.messageType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('yuenan.no37')}}:</span>
          <el-select size="small" clearable v-model="formInline.deviceType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_QUERY')">
          <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

  <!-- ***************  消息发送  *************** -->
    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_AUTO_ADD')">
      <el-button type="primary" @click="sendNote()">
        +{{$t('operatorManage.no6')}}
      </el-button>
    </div>

  <!-- ***************  优惠券列表  *************** -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_AUTO_LIST')">
      <template>
        <el-table :data="tableList" size="small" stripe>
          <el-table-column align="center" prop="messageId" :label="$t('operatorManage.no3')">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="messageType" :label="$t('operatorManage.no4')">
              <template slot-scope="scope">
                <span>{{$t($store.getters.manual_sendStatus(scope.row.messageType))}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="deviceType" :label="$t('yuenan.no37')">
              <template slot-scope="scope">
                <span>{{$t($store.getters.deviceType_status(scope.row.deviceType))}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" prop="sendObject" :label="$t('operatorManage.no18')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.sendObjStatus(scope.row.sendObject))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="title" :label="$t('operatorManage.no19')">
          </el-table-column>
          <el-table-column align="center" prop="description" :label="$t('operatorManage.no11')">
          </el-table-column>
          <el-table-column align="center" prop="message" :label="$t('operatorManage.no12')">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" >
            <template slot-scope="scope" >
              <span 
              v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_AUTO_EDIT')"
              class="table_opr"
              @click="detail(scope.row)">{{$t('public.no29')}}</span>
              <span 
              v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_AUTO_DELETE')"
              class="table_opr" 
              @click="del(scope.row.messageId,scope.row.sendObject)">{{$t('idManage.del')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ***************  添加活动弹框  *************** -->
    <el-dialog :title="$t('operatorManage.no6')" :visible.sync="dialogFormVisible"  width="750px">
      <h4>{{$t('operatorManage.no16')}}</h4>
      <el-form :model="form" size="small" :rules="rules" ref="ruleForm" label-width="140px">
        <template v-if="$store.state.common.lang==='vi'">
          <el-form-item :label="$t('operatorManage.no4')" prop="messageType">
            <el-select size="small" v-model="form.messageType">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('yuenan.no37')" prop="deviceType">
            <el-select size="small" v-model="form.deviceType">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item :label="$t('operatorManage.no18')" prop="sendObject">
          <el-select size="small" v-model="form.sendObject">
            <el-option v-for="item in sendObj" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('operatorManage.no19')" prop="title">
          <el-input type="text" style="width:215px;" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item :label="$t('operatorManage.no11')" prop="description">
          <el-input type="textarea" style="width:400px;" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item :label="$t('operatorManage.no12')" prop="message">
          <el-input type="textarea" style="width:400px;" v-model="form.message"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="save">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('public.detail')" :visible.sync="dialogDelVisible"  width="600px">
      <h4>{{$t('operatorManage.no20')}} ( {{$t($store.getters.sendObjStatus(delObj))}} ) {{$t('operatorManage.no18')}}?</h4>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDelVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="delSure">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    
    <!-- ***************  分页   *************** -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_AUTO_LIST')">
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
export default {
  name: 'buildInNotePut',
  data () {
    return {
      dialogFormVisible: false,
      dialogDelVisible: false,
      formLabelWidth: '90px',
      tableList: [],
      formInline:{
        messageType:'',
        deviceType:'',
      },
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      form: {
        sendObject: '',
        title: '',
        description: '',
        message: '',
        messageType: '',
        deviceType: '',
      },
      sendObj:  this.$store.state.options.sendObj_options,
      flag: true,// 点击一次开关
      detailData:{},
      delId:'',
      delObj:'',
      rules:{
        sendObject: [
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
        deviceType: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        messageType: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
      },
      options1:this.$store.state.options.buildInSendType_options,
      options2:this.$store.state.options.buildInSendDevice_options,
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.page.size = val;
      this.fetchData();
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val;
      this.fetchData();
    },
    select(){
      if(this.flag){
        this.currentPage = 1;
        this.fetchData();
      }
    },
    fetchData () {
      const self = this;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.MESSAGEPUSH0006,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        type: 2,
        ...this.formInline
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
    sendNote () {
      const self = this;
      self.form = {
        sendObject: '',
        title: '',
        description: '',
        message: '',
        messageType: '',
        deviceType: '',
      }
      self.dialogFormVisible = true;
    },
    save () {// 消息发送确认操作
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.MESSAGEPUSH0005,
              sessionid: sessionStorage.getItem('sessionid')
            },
            ...this.form
          }
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'));
              this.fetchData();
            }else{
              this.$globalMsg.error(res.data.header.msg);
            }
            this.$refs.ruleForm.resetFields();
          })
        } else {
          return false;
        }
      })
    },
    detail (detailData) {
      this.form = detailData;
      this.dialogFormVisible = true;
    },
    del (id,obj) {
      this.delId = id;
      this.delObj = obj;
      this.dialogDelVisible = true;
    },
    delSure(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.MESSAGEPUSH0004,
          sessionid: sessionStorage.getItem('sessionid')
        },
        messageId:this.delId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
          this.fetchData();
        }else{
          this.$globalMsg.error(res.data.header.msg);
        }
        this.dialogDelVisible = false;
      })
    }
  },
  watch:{
    
  }
}
</script>
<style scoped lang="scss">

</style>
