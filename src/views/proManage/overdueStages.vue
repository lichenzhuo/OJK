<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('proManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('fei.no31')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------------ 横条 ------------------- -->
    <div class="paixu">
      <span></span>
      <p>{{$t('fei.no31')}}</p>
    </div>

    
    <!-- ------------ 搜索查询栏结束 -------------- -->
    <div class="list_operation" >
      <el-button type="primary" @click="addUser">
        +{{$t('proManage.add')}}
      </el-button>
    </div>
    
    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" >
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="id" label="产品ID">
          </el-table-column>
          <el-table-column align="center" prop="loginName" label="应还金额最小值">
          </el-table-column>
          <el-table-column align="center" prop="roleName" label="应还金额最大值">
          </el-table-column>
          <el-table-column align="center" prop="name" label="分期期数">
          </el-table-column>
          <el-table-column align="center" prop="phone" label="每期天数">
          </el-table-column>
          <el-table-column align="center" prop="createTime" label="分期手续费率">
          </el-table-column>
          <el-table-column align="center" prop="createTime" label="应用阶段">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_REST')"
                class="table_opr"
                @click="changePre(scope.row.id)">
                {{$t('public.no51')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- ----------------------确认是否添加账号开始------------------ -->
    <el-dialog title="添加/修改" :visible.sync="addOrchange" width="600px">
      <el-form :model="ruleForm2" size="small" status-icon :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
        <el-form-item label="应还金额最小值" prop="loginName">
            <el-input type="user" v-model="ruleForm2.loginName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="应还金额最大值" prop="loginName">
            <el-input type="user" v-model="ruleForm2.loginName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分期期数" prop="loginName">
            <el-input type="user" v-model="ruleForm2.loginName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="每期天数" prop="loginName">
            <el-input type="user" v-model="ruleForm2.loginName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分期手续费率" prop="loginName">
            <el-input type="user" v-model="ruleForm2.loginName" auto-complete="off"></el-input>
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

export default {
  data () {
    return {
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      tableData: [], // 用户信息数据模拟
      collectionType: [], // 催收阶段类型
      add: false, // 添加账号弹窗
      change: false, // 修改账号弹窗
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
      this.getTableList();
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
    getTableList () { // 获取账号管理列表
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
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableList();// 获取账号列表
    this.getcollectionType();// 获取催收阶段
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
