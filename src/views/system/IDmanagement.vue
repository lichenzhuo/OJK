<template>
  <div class="jurisdiction">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('idManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('idManage.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- ------------------ 横条 ------------------- -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('idManage.userList')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="40">
        <el-col :md="8" :lg="5" :xl="3">
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
        <el-col :md="8" :lg="6" :xl="4">
          <div class="search-input">
            <span>{{$t('idManage.roleName')}}:</span>
            <el-select size="small" clearable v-model="formInline.roleId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7" >
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
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
    
    <!-- ------------ 搜索查询栏结束 -------------- -->
    <div class="search" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_ADD')">
      <el-row type="flex" justify="start" >
        <!-- <el-col :md="5" :lg="4" :xl="3"> -->
          <div class="search-add" @click="addUser">
            +{{$t('idManage.add')}}
          </div>
        <!-- </el-col> -->
      </el-row>
      
    </div>
    
    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe style="width: 100%" >
          <el-table-column align="center" prop="id" :label="$t('idManage.id')" width="140">
          </el-table-column>
          <el-table-column align="center" prop="loginName" :label="$t('idManage.name')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="roleName" :label="$t('idManage.roleId')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('public.no1')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.no18')" min-width="180">
          </el-table-column>
          <el-table-column align="center" prop="createTime" :label="$t('public.no21')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="140">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_REST')"
                style="color:#547ef6;cursor:pointer;margin:0 5px;" 
                @click="modifyPre(scope.row.id,scope.row.loginName)">
                {{$t('idManage.replace')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_REST')"
                style="color:#547ef6;cursor:pointer;margin:0 5px;" 
                @click="changePre(scope.row.id)">
                {{$t('public.no51')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_SYSTEIM_USER_DEL')"
                style="color:#547ef6;cursor:pointer;margin:0 15px;" 
                @click="delPre(scope.row.id)">
                {{$t('idManage.del')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- ----------------------确认是否删除开始------------------ -->
    <div v-if="del" class="del">
      <div class="del-main">
        <div class="del-main-head">
          <span></span>
          <p>{{$t('public.no48')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="del=false"></i>
        </div>
        <div class="del-main-con">
          <div class="del-con-one">{{$t('idManage.delRole')}}？</div>
          <div class="del-but">
            <div class="del-but-1" @click="delSure()">{{$t('public.no49')}}</div>
            <div class="del-but-1 active" @click="del=false">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------确认是否删除结束------------------- -->

    <!-- ------------------确认是否修改密码开始-------------------- -->
    <div v-if="modify" class="modify">
      <div class="modify-main">
        <div class="modify-main-head">
          <span></span>
          <p>{{$t('idManage.replace')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="modifyClose"></i>
        </div>
        <div class="modify-main-con">
          <div class="modify-con">
            <el-form label-position="left" label-width="80px" >
              <el-form-item :label="$t('idManage.no1')">
                <el-input v-model="formModify.loginName" disabled></el-input>
              </el-form-item>
              <el-form-item :label="$t('idManage.no2')">
                <el-input v-model="formModify.password"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="modify-but">
            <div class="modify-but-1" @click="modifySure">{{$t('public.no49')}}</div>
            <div class="modify-but-1 active" @click="modifyClose">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <!-- ----------------------确认是否添加账号开始------------------ -->
    <div v-if="add" class="add">
      <div class="add-main">
        <div class="add-main-head">
          <span></span>
          <p>{{$t('idManage.add')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="add=false"></i>
        </div>
        <adduser :addclose="addClose" :collectionType="collectionType" :options="options" :userlist="userList"></adduser>
      </div>
    </div>
    <!-- ----------------------确认是否添加账号结束------------------- -->

    <!-- ----------------------确认是否添加账号开始------------------ -->
    <div v-if="change" class="modify">
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
    </div>
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
      this.currentPage = val
      this.userList();
    },
    delPre (id) { // 删除按钮弹窗
      this.del = true
      this.delId = id
    },
    delSure () { // 删除确认操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            action: this.$store.state.actionMap.user_del,
            ...this.$base,
            'sessionid': this.sessionid
          },
          id: this.delId
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('idManage.no3'))
            this.tableData = this.tableData.filter(value => {
              return value.id != this.delId
            })
          } else {
            this.$globalMsg.error(this.$t('idManage.no4'))
          }
          this.del = false
        })
      }
    },
    modifyPre (id, name) { // 修改按钮弹窗
      this.modify = true
      this.modifyId = id
      this.formModify.loginName = name
    },
    modifyClose () { // 修改弹窗关闭
      this.modify = false
      this.modifyId = ''
      this.formModify.password = ''
    },
    modifySure () { // 修改密码确认操作
      if (this.flag) {
        this.flag = false
        let jse = new JSEncrypt()
        jse.setPublicKey(this.$store.state.common.publicKey)
        //   设置需要加密的字符串
        let pass = jse.encrypt(this.formModify.password)
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
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('idManage.no5'))
          } else {
            this.$globalMsg.error(this.$t('idManage.no6'))
          }
          this.modify = false;
        })
      }
    },
    addUser () { // 添加账号开关
      this.add = true
    },
    select () { // 搜索栏点击查询按钮操作
      this.$store.commit('idMangeList', this.formInline)
      if (this.flag) {
        this.flag = false
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
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    addClose () {
      this.add = false
      this.change = false
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
      let options = []
      this.$axios.post('', option).then(res => {
        if (res.data.data) {
          res.data.data.forEach(value => {
            options.push({value: value.id, label: value.roleName})
          })
        }
      })
      this.options = options
    },
    changePre (id) {
      this.change = true
      this.changeId = id
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
          this.ruleForm2.name = res.data.data.name
          this.ruleForm2.loginName = res.data.data.loginName
          this.ruleForm2.phone = res.data.data.phone
          this.ruleForm2.roleId = res.data.data.roleId
          this.ruleForm2.collectionTypes = res.data.data.collectionTypes ? res.data.data.collectionTypes.split(',') : []
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
      option.collectionTypes = option.collectionTypes.join()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'))
              this.userList();
            } else {
              this.$globalMsg.error(res.data.header.msg)
            }
            this.addClose()
          })
        } else {
          return false
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
            value.label = value.optionName
            value.value = value.optionValue
          })
          this.collectionType = arr;
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.addTimeBegin = this.searchTime[0]
        this.formInline.addTimeEnd = this.searchTime[1]
      } else {
        this.formInline.addTimeBegin = ''
        this.formInline.addTimeEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.idMangeList_select) !== '{}') {
      this.formInline = this.$store.state.common.idMangeList_select
      if(this.formInline.addTimeBegin!==''){
        this.searchTime.push(this.formInline.addTimeBegin)
        this.searchTime.push(this.formInline.addTimeEnd)
      }
      
    }
    this.userList()// 获取账号列表
    this.getcollectionType()// 获取催收阶段
    this.roleList()// 获取角色列表
  }
}
</script>
<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}
.jurisdiction {
  width: 100%;
  height: auto;
  padding: 20px 30px;
  background-color: rgba(246, 249, 252, 1);
  position: relative;
}
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
  height: auto;
  background-color: #ffffff;
  margin-top: 18px;
  margin-bottom: 22px;
  padding: 22px 28px 22px 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  .search-add {
    width: 114px;
    height: 40px;
    border: 1px solid #547ef6;
    border-radius: 5px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    color: #547ef5;
    margin-left: 30px;
    cursor: pointer;
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
    .el-button--primary {
      height: 40px;
      
    }
    .button-color {
      background-color: #1D7BFF;
      border-color: #547ef6;
    }
  }
  .kongge{
    width: 100%;
    height: 40px;
  }
}

.table {
  width: 100%;
  min-height: 450px;
  position: relative;
  .recycle {
    width: 100px;
    height: 40px;
    position: absolute;
    top: 0px;
    right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .recycle-png {
      width: 18px;
      height: 16px;
    }
    .recycle-title {
      padding-left: 5px;
      font-size: 16px;
      color: #547ef6;
      height: 40px;
      line-height: 40px;
    }
  }
}

.switch {
  width: 24px;
  height: 16px;
  display: inline-block;
}

.del {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .del-main {
    width: 474px;
    height: 240px;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .del-main-head {
      width: 100%;
      height: 48px;
      background-color: #333a4d;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color {
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .del-main-con {
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .del-con-one {
        width: 100%;
        height: 40px;
        padding-top: 10px;
        color: #6b7283;
        font-size: 16px;
        text-align: center;
        margin: 30px 0;
      }
      .del-con-two {
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
      }
      .del-but {
        width: 260px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .del-but-1 {
          width: 45%;
          height: 100%;
          background-color: #547ef5;
          border-radius: 5px;
          text-align: center;
          line-height: 38px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
        .active {
          background-color: #ebeef6;
          color: #333;
        }
      }
    }
  }
}
.add{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .add-main{
    width: 600px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .add-main-head {
      width: 100%;
      height: 48px;
      background-color: #333a4d;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color {
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
  }
}
.modify {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .modify-main {
    width: 600px;
    height: auto;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .modify-main-head {
      width: 100%;
      height: 48px;
      background-color: #333a4d;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color {
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .modify-main-con {
      width: 100%;
      height: auto;
      padding: 10px 10px;
      .modify-con {
        width: 100%;
        // height: 40px;
        padding: 0px 60px;
        color: #6b7283;
        font-size: 14px;
      }
      .modify-con-two {
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
      }
      .modify-but {
        width: 260px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .modify-but-1 {
          width: 45%;
          height: 100%;
          background-color: #547ef5;
          border-radius: 5px;
          text-align: center;
          line-height: 38px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
        .active {
          background-color: #ebeef6;
          color: #333;
        }
      }
    }
  }
}
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
