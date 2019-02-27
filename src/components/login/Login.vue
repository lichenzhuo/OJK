<template>
  <div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
    <div class="ms-login">
      <div class="ms-title">{{$t('login.management_system')}}</div>
      <el-form :model="ruleForm" :rules="rule" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="loginName">
            <el-input v-model="ruleForm.loginName" placeholder="userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input :type="text" placeholder="passWord" @focus="typeToPass" auto-complete="off" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="logining">{{$t('login.login')}}</el-button>
        </div>
      </el-form>
    </div>
    <div class="langSelect">
      <el-select size="small" v-model="langStyle" placeholder="请选择语言">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      ruleForm: {
        loginName: '',
        password: ''
      },
      ruleForm1: {},
      // rules: '',
      logining: false,
      sessionid: '',
      text:'text',
      langStyle: '1'// 当前选择的语言

    }
  },
  computed: {
    rule () {
      return {
        loginName: [{ required: true, message: this.$t('login.required'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('login.required'), trigger: 'blur' }]
      }
    },
    options () {
      let arr = [{value: '1', label: '中文'}]
      if (this.$store.state.common.lang === 'id') {
        arr.push({value: '2', label: 'indonesia'})
      } else if (this.$store.state.common.lang === 'vi') {
        arr.push({value: '3', label: 'Tiếng việt nam'})
      } else if (this.$store.state.common.lang === 'PHL') {
        arr.push({value: '4', label: 'English'})
      }
      return arr
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logining = true
          let jse = new JSEncrypt()
          jse.setPublicKey(this.$store.state.common.publicKey)
          //   设置需要加密的字符串
          let encrypted = jse.encrypt(this.ruleForm.password)
          let option = {
            header: {
              action: this.$store.state.actionMap.login,
              ...this.$base
            },
            loginName: this.ruleForm.loginName,
            password: encrypted
          }
          this.$axios.post('', option).then(res => {
            this.logining = false
            if (res.data.header.code == 0) {
              this.ruleForm.password = ''
              sessionStorage.setItem('level', res.data.data.admininfo.level)
              sessionStorage.setItem('sessionid', res.data.data.sessionid)
              sessionStorage.setItem('name', res.data.data.admininfo.name)
              sessionStorage.setItem('roleId', res.data.data.admininfo.roleId)
              sessionStorage.setItem('list', JSON.stringify(res.data.data.admininfo.rightList))
              this.$router.push('/adminhome')
            } else {
              this.$globalMsg.error(res.data.header.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    addrouters (arr) {
      let item = []
      arr.forEach(value => {
        if (value.id == 10) {
          item.push({icon: 'el-icon-shop-shouye', index: 'adminhome', title: '系统首页'})
        }
        // 用户管理
        if (value.id == 11) {
          item.push({icon: 'el-icon-shop-user',
            index: '3',
            title: '用户管理',
            subs: [
            ]
          })
        }
        if (value.id == 1101) {
          item.filter(index => {
            return index.index == '3'
          })[0].subs.push({index: 'userlist', title: '用户列表'})
        }
        if (value.id == 1102) {
          item.filter(index => {
            return index.index == '3'
          })[0].subs.push({index: 'usersug', title: '用户反馈列表'})
        }
        // 借款管理
        if (value.id == 12) {
          item.push({icon: 'el-icon-shop-chanpin2',
            index: '4',
            title: '借款管理',
            subs: [
            ]
          })
        }
        if (value.id == 1201) {
          item.filter(index => {
            return index.index == '4'
          })[0].subs.push({index: 'loanmoney', title: '借款列表'})
        }
        if (value.id == 1202) {
          item.filter(index => {
            return index.index == '4'
          })[0].subs.push({index: 'putmoney', title: '放款列表'})
        }
        if (value.id == 1203) {
          item.filter(index => {
            return index.index == '4'
          })[0].subs.push({index: 'backmoney', title: '还款列表'})
        }
        // 风控审核管理
        if (value.id == 13) {
          item.push({icon: 'el-icon-shop-zhengxin',
            index: '5',
            title: '风控审核管理',
            subs: []
          })
        }
        if (value.id == 1301) {
          item.filter(index => {
            return index.index == '5'
          })[0].subs.push({index: 'daichushen', title: '待初审订单'})
        }
        if (value.id == 1302) {
          item.filter(index => {
            return index.index == '5'
          })[0].subs.push({index: 'rengongchushen', title: '人工初审列表'})
        }
        if (value.id == 1303) {
          item.filter(index => {
            return index.index == '5'
          })[0].subs.push({index: 'rengongfushen', title: '人工复审列表'})
        }
        if (value.id == 1304) {
          item.filter(index => {
            return index.index == '5'
          })[0].subs.push({index: 'rengongshenhetongji', title: '人工审核统计'})
        }
        // 我的审核订单
        if (value.id == 14) {
          item.push({icon: 'el-icon-shop-wenjian',
            index: '2',
            title: '我的审核订单',
            subs: [
            ]
          })
        }
        if (value.id == 1401) {
          item.filter(index => {
            return index.index == '2'
          })[0].subs.push({index: 'wodechushen', title: '我的人工初审'})
        }
        if (value.id == 1402) {
          item.filter(index => {
            return index.index == '2'
          })[0].subs.push({index: 'wodefushen', title: '我的人工复审'})
        }
        // 财务数据
        if (value.id == 15) {
          item.push({icon: 'el-icon-shop-chanpin3fankui',
            index: '1',
            title: '财务数据',
            subs: []
          })
        }
        if (value.id == 1501) {
          item.filter(index => {
            return index.index == '1'
          })[0].subs.push({index: 'putloglist', title: '放款日志列表'})
        }
        if (value.id == 1502) {
          item.filter(index => {
            return index.index == '1'
          })[0].subs.push({index: 'backloglist', title: '还款日志列表'})
        }
        // 产品管理
        if (value.id == 16) {
          item.push({icon: 'el-icon-shop-shujutongji',
            index: '6',
            title: '产品管理',
            subs: []
          })
        }
        if (value.id == 1601) {
          item.filter(index => {
            return index.index == '6'
          })[0].subs.push({index: 'promanage', title: '产品列表'})
        }
        // 贷后管理
        if (value.id == 17) {
          item.push({icon: 'el-icon-view',
            index: '10',
            title: '贷后管理',
            subs: []
          })
        }
        if (value.id == 1701) {
          item.filter(index => {
            return index.index == '10'
          })[0].subs.push({index: 'inTheRushOrders', title: '入催订单列表'})
        }
        if (value.id == 1702) {
          item.filter(index => {
            return index.index == '10'
          })[0].subs.push({index: 'null2', title: '坏账订单列表'})
        }
        // 催收管理
        if (value.id == 18) {
          item.push({
            icon: 'el-icon-star-on',
            index: '8',
            title: '催收管理',
            subs: []
          })
        }
        if (value.id == 1801) {
          item.filter(index => {
            return index.index == '8'
          })[0].subs.push({index: 'null3', title: '我的催收订单'})
        }
        // 统计管理
        if (value.id == 19) {
          item.push({
            icon: 'el-icon-menu',
            index: '9',
            title: '统计管理',
            subs: []
          })
        }
        if (value.id == 1901) {
          item.filter(index => {
            return index.index == '9'
          })[0].subs.push({index: 'null5', title: '通过率报表'})
        }
        if (value.id == 1902) {
          item.filter(index => {
            return index.index == '9'
          })[0].subs.push({index: 'null6', title: '入催率报表'})
        }
        if (value.id == 1903) {
          item.filter(index => {
            return index.index == '9'
          })[0].subs.push({index: 'null7', title: '回款率报表'})
        }
        // 系统管理
        if (value.id == 20) {
          item.push({icon: 'el-icon-shop-shezhi',
            index: '7',
            title: '系统管理',
            subs: []
          })
        }
        if (value.id == 2001) {
          item.filter(index => {
            return index.index == '7'
          })[0].subs.push({index: 'idmanagement', title: '账号管理'})
        }
        if (value.id == 2002) {
          item.filter(index => {
            return index.index == '7'
          })[0].subs.push({index: 'permission', title: '权限分配'})
        }
      })
    },
    lang () { // 设置默认本地语言
      if (this.langStyle == 1) {
        sessionStorage.setItem('lang', 'cn')
        this.$i18n.locale = 'cn'
      }
    },
    vuexData () {
      this.$store.commit('userList', {})
      this.$store.commit('userSugList', {})
      this.$store.commit('loanMoneyList', {})
      this.$store.commit('backMoneyList', {})
      this.$store.commit('putMoneyList', {})
      this.$store.commit('rengongchushenList', {})
      this.$store.commit('rengongfushenList', {})
      this.$store.commit('rengongtongjiList', {})
      this.$store.commit('rengongchushentongjiList', {})
      this.$store.commit('rengongfushentongjiList', {})
      this.$store.commit('myrengongchushenList', {})
      this.$store.commit('myrengongfushenList', {})
      this.$store.commit('backMoneyLogList', {})
      this.$store.commit('putMoneyLogList', {})
      this.$store.commit('rucuiList', {})
      this.$store.commit('todaypaidanList', {})
      this.$store.commit('todaycuihuiList', {})
      this.$store.commit('collectionPeopleList', {})
      this.$store.commit('mycuishouList', {})
      this.$store.commit('passingRate', {})
      this.$store.commit('overdueRate', {})
      this.$store.commit('rateOfReturn', {})
      this.$store.commit('idMangeList', {})
      this.$store.commit('cuishouNoteList', {})
      this.$store.commit('cuihuiTotalList', {})
      this.$store.commit('noBackOrderList', {})
    },
    typeToPass(){
      this.text = 'password'
    }

  },
  watch: {
    langStyle () {
      if (this.langStyle === '1') {
        this.$i18n.locale = 'cn'
        sessionStorage.setItem('lang', 'cn')
      }
      if (this.langStyle === '2') {
        this.$i18n.locale = 'id'
        sessionStorage.setItem('lang', 'id')
      }
      if (this.langStyle === '3') {
        this.$i18n.locale = 'vi'
        sessionStorage.setItem('lang', 'vi')
      }
      if (this.langStyle === '4') {
        this.$i18n.locale = 'phl'
        sessionStorage.setItem('lang', 'phl')
      }
    }
  },
  mounted () {
    this.vuexData();
    sessionStorage.clear();
    this.lang();
  }
}

</script>

<style scoped>
.login-container {
  height: 100vh;
  background-color: #2d3a4b;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  
}
.noclick{
  display: none;
}
.ms-title {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  /* position: absolute; */
  /* left: 50%; */
  /* top: 50%; */
  min-width: 400px;
  height: auto;
  /* margin: -200px 0 0 -200px; */
  padding:10px 40px;
  border-radius: 5px;
  /* background: #fff; */
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}

.langSelect{
  position: absolute;
  width: 300px;
  padding: 5px;
  right: 10%;
  top: 5%;
}



</style>
