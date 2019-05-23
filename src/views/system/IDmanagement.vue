<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('idManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('idManage.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------------ 横条 ------------------- -->
    <div class="paixu">
      <span></span>
      <p>{{$t('idManage.userList')}}</p>
    </div>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('idManage.userName')}}:</span>
            <el-input size="small" label="ID" v-model="formInline.loginName"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no1')}}:</span>
            <el-input size="small" label="name" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.no18')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
          <div class="search-input">
            <span>{{$t('idManage.roleName')}}:</span>
            <el-select size="small" clearable v-model="formInline.roleId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('public.no21')}}:</span>
            <el-date-picker 
              id="dateSuccess"
              size="small"
              v-model="searchTime" 
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>
    
    <!-- ------------ 搜索查询栏结束 -------------- -->
    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_ADD')">
      <el-button type="primary" @click="addUser">
        +{{$t('idManage.add')}}
      </el-button>
    </div>
    
    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="id" :label="$t('idManage.id')">
          </el-table-column>
          <el-table-column align="center" prop="loginName" :label="$t('idManage.name')">
          </el-table-column>
          <el-table-column align="center" prop="roleName" :label="$t('idManage.roleId')">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('public.no1')">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.no18')">
          </el-table-column>
          <el-table-column align="center" prop="createTime" :label="$t('public.no21')" width="86">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="180">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_REST')"
                class="table_opr"
                @click="modifyPre(scope.row.id,scope.row.loginName)">
                {{$t('idManage.replace')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_REST')"
                class="table_opr"
                @click="changePre(scope.row.id)">
                {{$t('public.no51')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_DEL')"
                class="table_opr"
                @click="delPre(scope.row.id,scope.row.name)">
                {{$t('idManage.del')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- ----------------------确认是否删除开始------------------ -->
    <el-dialog :title="$t('public.no48')" :visible.sync="del" width="550px">
      <div class="left2right">
        <span class="left"></span>
        <span class="right">{{$t('idManage.delRole')}} {{delName}} ？</span>
      </div>
      <div class="left2right mt15">
        <span class="left"></span>
        <span class="right">
          <el-button type="primary" @click="delSure()">{{$t('public.no49')}}</el-button>
        </span>
      </div>
    </el-dialog>
    
    <!-- ---------------------- 确认是否删除结束 ------------------- -->

    <!-- ------------------ 确认是否修改密码开始 -------------------- -->
    <el-dialog :title="$t('idManage.replace')" :visible.sync="modify" width="550px">
      <div class="left2right">
        <span class="left">{{$t('idManage.no1')}}</span>
        <div class="right">
          <el-input v-model="formModify.loginName" disabled></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('idManage.no2')}}</span>
        <div class="right">
          <el-input v-model="formModify.password"></el-input>
        </div>
      </div>
      <div class="left2right mt15">
        <span class="left"></span>
        <span class="right">
          <el-button type="primary" @click="modifySure">{{$t('public.no49')}}</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <!-- ----------------------确认是否添加账号开始------------------ -->
    <el-dialog :title="$t('idManage.add')" :visible.sync="add" width="600px">
      <adduser 
        :addclose="addClose" 
        :collectionType="collectionType" 
        :options="options" 
        :userlist="userList"
      >
      </adduser>
    </el-dialog>
    <!-- ----------------------确认是否添加账号结束------------------- -->

    <!-- ----------------------确认是否添加账号开始------------------ -->
    <el-dialog :title="$t('public.no51')" :visible.sync="change" width="600px">
      <el-form :model="ruleForm2" size="small" status-icon :rules="rules" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
        <el-form-item :label="$t('idManage.no7')" prop="loginName">
            <el-input type="user" v-model="ruleForm2.loginName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('idManage.no8')" prop="name">
            <el-input type="name" v-model="ruleForm2.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.no18')" prop="phone">
            <el-input type="tel" v-model="ruleForm2.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('idManage.no9')" prop="roleId">
            <el-select size="small" v-model="ruleForm2.roleId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('new.no12')" >
          <el-checkbox-group v-model="ruleForm2.collectionTypes" >
            <div class="types">
              <ul>
                <li v-for="value in collectionType" :key="value.value">
                  <el-checkbox :label="value.value"><span>{{value.label}}</span></el-checkbox>
                </li>
              </ul>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">{{$t('public.no41')}}</el-button>
          <el-button @click="addClose">{{$t('public.no50')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- <div v-if="change" class="modify">
      <div class="modify-main">
        <div class="modify-main-head">
          <span></span>
          <p>{{$t('public.no51')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="change=false"></i>
        </div>
        <div class="modify-main-con">
          <div class="modify-con">
            <el-form :model="ruleForm2" size="small" status-icon :rules="rules" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
              <el-form-item :label="$t('idManage.no7')" prop="loginName">
                  <el-input type="user" v-model="ruleForm2.loginName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('idManage.no8')" prop="name">
                  <el-input type="name" v-model="ruleForm2.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('public.no18')" prop="phone">
                  <el-input type="tel" v-model="ruleForm2.phone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('idManage.no9')" prop="roleId">
                  <el-select size="small" v-model="ruleForm2.roleId" :placeholder="$t('public.placeholder')">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item :label="$t('new.no12')" >
                <el-checkbox-group v-model="ruleForm2.collectionTypes" >
                  <div class="types">
                    <ul>
                      <li v-for="value in collectionType" :key="value.value">
                        <el-checkbox :label="value.value"><span>{{value.label}}</span></el-checkbox>
                      </li>
                    </ul>
                  </div>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">{{$t('public.no41')}}</el-button>
                  <el-button @click="addClose">{{$t('public.no50')}}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div> -->
    <!-- ----------------------确认是否添加账号结束------------------- -->

    <!-- -------------- 分页显示栏开始 ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>
    <!-- -------------分页显示栏开始------------------------ -->

    <div class="foot"></div>
  </div>
</template>
<script>
import adduser from './adduser'

export default {
  components: {
    adduser
  },
  data () {
    return {
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      searchTime: [], // 搜索栏时间
      formInline: {// 查询信息数据对应字段
        loginName: '',
        name: '',
        phone: '',
        roleId: '',
        addTimeBegin: '',
        addTimeEnd: ''
      },
      formModify: {// 修改密码对应数据
        loginName: '',
        password: ''
      },
      options: [],
      tableData: [], // 用户信息数据模拟
      collectionType: [], // 催收阶段类型
      del: false, // 删除弹窗
      modify: false, // 修改密码弹窗
      add: false, // 添加账号弹窗
      change: false, // 修改账号弹窗
      delId: '', // 删除目标行数对应的id
      delName: '', // 删除目标行数对应的名字
      modifyId: '', // 修改目标行数对应的id
      changeId: '', // 修改目标行数对应的id
      ruleForm2: {
        name: '',
        loginName: '',
        phone: '',
        roleId: '',
        collectionTypes: []
      },
      rules: {
        loginName: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        phone: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        password: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        collectionTypes: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页当前页下标
      this.currentPage = val;
      this.userList();
    },
    delPre (id,name) { // 删除按钮弹窗
      this.del = true;
      this.delId = id;
      this.delName = name;
    },
    delSure () { // 删除确认操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            action: this.$store.state.actionMap.user_del,
            ...this.$base,
            'sessionid': this.sessionid
          },
          id: this.delId
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('idManage.no3'));
            this.tableData = this.tableData.filter(value => {
              return value.id != this.delId;
            })
          } else {
            this.$globalMsg.error(this.$t('idManage.no4'));
          }
          this.del = false;
        })
      }
    },
    modifyPre (id, name) { // 修改按钮弹窗
      this.modify = true;
      this.modifyId = id;
      this.formModify.loginName = name;
    },
    modifyClose () { // 修改弹窗关闭
      this.modify = false;
      this.modifyId = '';
      this.formModify.password = '';
    },
    modifySure () { // 修改密码确认操作
      if (this.flag) {
        this.flag = false;
        // eslint-disable-next-line
        let jse = new JSEncrypt();
        jse.setPublicKey(this.$store.state.common.publicKey);
        //   设置需要加密的字符串
        let pass = jse.encrypt(this.formModify.password);
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.user_pass,
            sessionid: this.sessionid
          },
          id: this.modifyId,
          password: pass
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('idManage.no5'));
          } else {
            this.$globalMsg.error(this.$t('idManage.no6'));
          }
          this.modify = false;
        })
      }
    },
    addUser () { // 添加账号开关
      this.add = true;
    },
    select () { // 搜索栏点击查询按钮操作
      this.$store.commit('idMangeList', this.formInline)
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.userList();
      }
    },
    userList () { // 获取账号管理列表
      let option = {
        header: {
          action: this.$store.state.actionMap.user_manage,
          ...this.$base,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    addClose () {
      this.add = false;
      this.change = false;
      this.ruleForm2 = {
        name: '',
        loginName: '',
        phone: '',
        roleId: '',
        collectionTypes: []
      }
    },
    roleList () { // 获取权限名字下拉框列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.role_list,
          sessionid: this.sessionid,
          page: {index: 1, size: 1000}
        }
      }
      let options = [];
      this.$axios.post('', option).then(res => {
        if (res.data.data) {
          res.data.data.forEach(value => {
            options.push({value: value.id, label: value.roleName});
          })
        }
      })
      this.options = options;
    },
    changePre (id) {
      this.change = true;
      this.changeId = id;
      let option = {
        header: {
          action: this.$store.state.actionMap.select_user,
          ...this.$base,
          sessionid: this.sessionid
        },
        id: id
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.ruleForm2.name = res.data.data.name;
          this.ruleForm2.loginName = res.data.data.loginName;
          this.ruleForm2.phone = res.data.data.phone;
          this.ruleForm2.roleId = res.data.data.roleId;
          this.ruleForm2.collectionTypes = res.data.data.collectionTypes ? res.data.data.collectionTypes.split(',') : [];
        }
      })
    },
    submitForm (formName) {// 修改账号信息操作
      let option = {
        header: {
          action: this.$store.state.actionMap.change_user,
          ...this.$base,
          sessionid: this.sessionid
        },
        ...this.ruleForm2,
        id: this.changeId
      }
      option.collectionTypes = option.collectionTypes.join();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'));
              this.userList();
            } else {
              this.$globalMsg.error(res.data.header.msg);
            }
            this.addClose();
          })
        } else {
          return false;
        }
      })
    },
    getcollectionType(){ // 获取催收阶段
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'overdue.type'
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.collectionType = arr;
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.addTimeBegin = this.searchTime[0];
        this.formInline.addTimeEnd = this.searchTime[1];
      } else {
        this.formInline.addTimeBegin = '';
        this.formInline.addTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.idMangeList_select) !== '{}') {
      this.formInline = this.$store.state.common.idMangeList_select;
      if(this.formInline.addTimeBegin!==''){
        this.searchTime.push(this.formInline.addTimeBegin);
        this.searchTime.push(this.formInline.addTimeEnd);
      }
    }
    this.userList();// 获取账号列表
    this.getcollectionType();// 获取催收阶段
    this.roleList();// 获取角色列表
  }
}
</script>
<style scoped lang="scss">

.demo-ruleForm{
  width: 430px;
}
.types{
  width: 100%;
  ul{
    display: flex;
    flex-wrap: nowrap;
    li{
      flex: 1;
      margin-right: 20px;
    }
  }
}
</style>
