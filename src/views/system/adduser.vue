<template>
  <div class="adduser">
    <el-form :model="ruleForm2" 
             size="small" status-icon 
             :rules="rules" 
             ref="ruleForm2"
             autoComplete="off" 
             label-width="80px" 
             class="demo-ruleForm">
        <el-form-item :label="$t('idManage.no7')" prop="loginName">
            <el-input type="user" v-model="ruleForm2.loginName" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('idManage.no8')" prop="name">
            <el-input type="name" v-model="ruleForm2.name" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.no18')" prop="phone">
            <el-input type="tel" v-model="ruleForm2.phone" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('idManage.no9')" prop="roleId">
            <el-select size="small" v-model="ruleForm2.roleId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('idManage.no10')" prop="password">
            <el-input type="password".
             v-model="ruleForm2.password" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('new.no12')">
          <el-checkbox-group v-model="ruleForm2.collectionTypes">
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
            <el-button @click="addclose">{{$t('public.no50')}}</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    addclose: Function,
    userlist: Function,
    options: Array,
    collectionType: Array,
  },
  data () {
    return {
      sessionid: '',
      ruleForm2: {
        name: '',
        loginName: '',
        phone: '',
        roleId: '',
        password: 123456,
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
        type: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let jse = new JSEncrypt()
      jse.setPublicKey(this.$store.state.common.publicKey)
      let option = {
        header: {
          action: this.$store.state.actionMap.add_user,
          ...this.$base,
          sessionid: this.sessionid
        },
        ...this.ruleForm2
      }
      option.collectionTypes = option.collectionTypes.join()
      option.password = jse.encrypt(this.ruleForm2.password)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'))
              this.userlist()
            } else {
              this.$globalMsg.error(res.data.header.msg)
            }
            this.addclose()
          })
        } else {
          return false
        }
      })
    },
    passFocus(){
      this.$refs.passInput.type = 'password';
      console.log(this.$refs.passInput.type)
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    console.log(this.collectionType)
  }
}
</script>
<style lang="scss" scoped>
.adduser{
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  // background-color: rgba(246, 249, 252, 1);
  position: relative;
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
