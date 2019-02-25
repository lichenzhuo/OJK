<template>
  <div class="operatorManage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('couponSetting.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('operatorManage.no2')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('operatorManage.no2')}}</p>
        </div>
      </el-col>
    </el-row>

  <!-- ------------  消息发送  --------------------- -->
    <div class="search" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_AUTO_ADD')">
      <el-row type="flex" justify="start" align="middle" :gutter="10">
        <el-col :span="3">
          <div class="search-add" @click="sendNote()">
            +{{$t('operatorManage.no6')}}
          </div>
        </el-col>
      </el-row>
    </div>

  <!-- ------------  优惠券列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_AUTO_LIST')">
      <template>
        <el-table :data="tableList" size="small" stripe style="width: 100%"  empty-text>
          <el-table-column align="center" prop="messageId" :label="$t('operatorManage.no3')">
          </el-table-column>
          <el-table-column align="center" prop="sendObject" :label="$t('operatorManage.no18')">
            <template slot-scope="scope">
              <span v-if="scope.row.sendObject!==null&&scope.row.sendObject!==undefined&&scope.row.sendObject!==''">{{$t($store.getters.sendObjStatus(scope.row.sendObject))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
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
              style="color:#547ef6;cursor:pointer;" 
              @click="detail(scope.row)">{{$t('public.no29')}}</span>
              <span 
              v-if="$store.state.common.permiss.includes('RIGHT_MESSAGE_PUSH_AUTO_DELETE')"
              style="color:#547ef6;cursor:pointer;" 
              @click="del(scope.row.messageId,scope.row.sendObject)">{{$t('idManage.del')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  添加活动弹框  ------------------------ -->
    <el-dialog :title="$t('operatorManage.no6')" :visible.sync="dialogFormVisible"  width="850px">
      <h4>{{$t('operatorManage.no16')}}</h4>
      <el-form :model="form" size="small" :rules="rules" ref="ruleForm" label-width="140px">
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
    
    <!-- ------------  分页   ------------------------ -->
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
import searchFilter from '../../components/component/filter'
export default {
  name: 'operatorManage',
  components: {searchFilter},
  data () {
    return {
      dialogFormVisible: false,
      dialogDelVisible: false,
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
        sendObject: '',
        title: '',
        description: '',
        message: '',
        messageId:''
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
      }
    }
  },
  mounted () {
    this.fetchData()
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
          action: this.$store.state.actionMap.MESSAGEPUSH0006,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        type: 2,
        userId: condition?condition.userId: '',
        couponType: condition?condition.couponType:'',
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
      self.form = {
        sendObject: '',
        title: '',
        description: '',
        message: '',
        messageId:''
      }
      self.dialogFormVisible = true
    },
    save () {// 消息发送确认操作
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
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
              this.$globalMsg.success(this.$t('message.success'))
              this.fetchData()
            }else{
              this.$globalMsg.error(res.data.header.msg)
            }
            this.form = {
              sendObject: '',
              title: '',
              description: '',
              message: '',
              messageId:''
            }
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
          this.$globalMsg.success(this.$t('message.success'))
          this.fetchData()
        }else{
          this.$globalMsg.error(res.data.header.msg)
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
