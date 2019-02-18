<template>
    <div class="header">
        <div class="logo pic">
          <img v-if="header==='Go Dana'" class="logo-img" src="../../assets/img/logo_yn.png" alt="">
          <img v-if="header==='My Dong'" class="logo-img" src="../../assets/img/logo_vn.png" alt="">
          <img v-if="header==='Get Peso'" class="logo-img" src="../../assets/img/logo_ph.png" alt="">
          <img v-if="header==='kilatrupiah'" class="logo-img" src="../../assets/img/logo_rupiah.png" alt="">
          <img v-if="header==='kilatloan'" class="logo-img" src="../../assets/img/logo_loan.png" alt="">
            <!-- <span v-if="$store.state.common.lang==='vi'" style="font-size:32px;font-weight:900;color:#1D7BFF;font-style: italic;">{{header}}</span> -->
            <span style="font-size:32px;font-weight:900;color:#1D7BFF;font-style: italic;">{{header}}</span>
            <!-- <span v-if="$store.state.common.lang==='id'" style="font-size:32px;font-weight:900;color:#1D7BFF;font-style: italic;">KilatRupiah</span> -->
            <!-- <span v-if="$store.state.common.lang==='id'" style="font-size:32px;font-weight:900;color:#1D7BFF;font-style: italic;">KilatLoan</span> -->
            <!-- <span v-if="$store.state.common.lang==='PHL'" style="font-size:32px;font-weight:900;color:#1D7BFF;font-style: italic;">Get Peso</span> -->
            <span style="margin:0 14px;font-size:26px;">丨</span>
            {{$t('header.title')}}
        </div>
        <div class="user-info">
          <div class="user-touxiang pic">
            <img class="user-logo" src="../../assets/img/guanliyuan.png">
          </div>
            <span>{{username}}</span>
            <router-link :to="{path:'/adminhome'}">{{$t('header.main')}}</router-link>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{$t('header.changePass')}}
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <div class="changepass">
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                            <el-form-item :label="$t('header.oldPassWord')" prop="oldPassword">
                                <el-input type="password" v-model="ruleForm2.oldPassword" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('header.newPassWord')" prop="password">
                                <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('header.newPassWordTwo')" prop="checkPass">
                                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm2')">{{$t('header.submit')}}</el-button>
                                <!-- <el-button @click="close">{{$t('header.cancel')}}</el-button> -->
                            </el-form-item>
                        </el-form>
                    </div>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="point" @click="loginout">{{$t('header.exit')}}</span>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.required')))
      } else if (value.length <= 5) {
        callback(new Error(this.$t('login.pass.no4')))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.pass.no1')))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error(this.$t('login.pass.no2')))
      } else if (value === this.ruleForm2.oldPassword) {
        callback(new Error(this.$t('login.pass.no3')))
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.required')))
      } else {
        callback()
      }
    }
    return {
      sessionid: '',
      header: '',
      flag: false,
      ruleForm2: {
        oldPassword: '',
        password: '',
        checkPass: ''
      },
      rules2: {
        oldPassword: [
            {validator: validatePass3, trigger: 'blur'}
        ],
        password: [
            { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
            { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    username () {
      let username = sessionStorage.getItem('name')
      return username || ''
    }
  },
  methods: {
    loginout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let jse = new JSEncrypt()
          jse.setPublicKey(this.$store.state.common.publicKey)
          //   设置需要加密的字符串
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.change_pass,
              sessionid: this.sessionid
            },
            password: this.ruleForm2.password,
            oldPassword: this.ruleForm2.oldPassword
          }
          option.password = jse.encrypt(this.ruleForm2.password)
          option.oldPassword = jse.encrypt(this.ruleForm2.oldPassword)
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('idManage.no5'))
              setTimeout(() => {
                this.loginout()
              }, 1000)
            } else {
              this.$globalMsg.error(this.$t('idManage.no6'))
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.header = global.config.headerTotal
  }
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 94px;
  font-size: 24px;
  line-height: 94px;
  color: #1D7BFF;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.header .logo {
  float: left;
  width: auto;
  padding-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 20px;
}
.logo-img{
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 10px;
}
.user-info {
  float: right;
  height: 100%;
  padding-right: 50px;
  font-size: 24px;
  color: #1D7BFF;
  display: flex;
  align-items: center;
  position: relative;
}
.user-touxiang{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 3px 5px rgba(255, 255, 255, 0.3);
}
img{
  display: block;
}
.user-info .right,.el-dropdown-link{
  color: #1D7BFF;
  cursor: pointer;
  vertical-align: middle;
}
.user-info span {
  padding: 0 10px;
  font-size: 16px;
}
.user-info a {
  padding: 0 10px;
  font-size: 16px;
  color: #1D7BFF;
}

.el-dropdown {
  display: block;
  height: 100%;
}
.changepass {
  width: 480px;
  height: auto;
  padding: 10px 15px;
  background-color: #fff;
}
.point{
  cursor: pointer;
}

</style>
