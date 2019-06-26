<template>
  <div class="adduser">
    <el-form :model="ruleForm2" size="mini" status-icon :rules="rules" ref="ruleForm2" label-width="110px" class="demo-ruleForm">
        <el-form-item :label="$t('new.no49')" prop="appPackage">
          <el-select v-model="ruleForm2.appPackage" placeholder="请选择APP包名">
            <el-option v-for="item in appNameOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('proManage.productAmount')" prop="productAmount">
            <el-input type="user" v-model="ruleForm2.productAmount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.no31')" prop="productPeriod">
            <el-input type="name" v-model="ruleForm2.productPeriod" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.feeRate')" prop="feeRate">
            <el-input type="tel" v-model="ruleForm2.feeRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.dayInterest')" prop="dayInterest">
            <el-input type="text" v-model="ruleForm2.dayInterest" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.overdueInterest')" prop="overdueInterest">
          <el-input type="text" v-model="ruleForm2.overdueInterest" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.overdueMaxAmount')" prop="overdueMaxAmount">
          <el-input type="text" v-model="ruleForm2.overdueMaxAmount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.overdueMaxDays')" prop="overdueMaxDays">
          <el-input type="text" v-model="ruleForm2.overdueMaxDays" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.canAdvanceDay')" prop="canAdvanceDay">
          <el-input type="text" v-model="ruleForm2.canAdvanceDay" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="成功还款次数≥" prop="minSuccessRepayments">
            <el-input type="text" v-model="ruleForm2.minSuccessRepayments" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大逾期天数≤" prop="userOverdueMaxDays">
            <el-input type="text" v-model="ruleForm2.userOverdueMaxDays" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('proManage.userGrade')" >
          <el-checkbox-group v-model="ruleForm2.userGrade">
            <div class="types">
              <ul>
                <li v-for="value in userGreadeOption" :key="value.value">
                  <el-checkbox :label="value.value"><span>{{value.value}}</span></el-checkbox>
                </li>
              </ul>
            </div>
          </el-checkbox-group>
        </el-form-item> -->
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
    proList: Function,
    appNameOption:Object,
    userGreadeOption:Array
  },
  data () {
    var validateNumber = (rule, value, callback) => {
      let reg = /^\+?[1-9][0-9]*$/
      if (value === '') {
        callback(new Error(this.$t('login.required')))
      } else {
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(this.$t('login.num')))
        }
      }
    }
    var validateNumber2 = (rule, value, callback) => {
      let reg = /^\+?[0-9]*$/
      if (value === '') {
        callback(new Error(this.$t('login.required')))
      } else {
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(this.$t('login.num')))
        }
      }
    }
    var validateFloat = (rule, value, callback) => {
      let reg = /^[0-9]+(.[0-9]{1,4})?$/
      if (value === '') {
        callback(new Error(this.$t('login.required')))
      } else {
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(this.$t('login.float')))
        }
      }
    }
    return {
      sessionid: '',
      ruleForm2: {
        productAmount: '',
        productPeriod: '',
        feeRate: '',
        dayInterest: '',
        overdueInterest: '',
        overdueMaxDays: '',
        canAdvanceDay: '',
        overdueMaxAmount: '',
        appPackage: '',
        userGrade: [],
        minSuccessRepayments: '',
        userOverdueMaxDays: '',
      },
      rules: {// 验证规则
        productAmount: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        productPeriod: [
          { validator: validateNumber, trigger: 'blur' }
        ],
        feeRate: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        dayInterest: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        overdueInterest: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        validateZero: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        overdueMaxDays: [
          { validator: validateNumber, trigger: 'blur' }
        ],
        canAdvanceDay: [
          { validator: validateNumber, trigger: 'blur' }
        ],
        minSuccessRepayments: [
          { validator: validateNumber2, trigger: 'blur' }
        ],
        userGrade: [
          { required: true, trigger: 'change' }
        ],
        appPackage: [
          { required: true, trigger: 'change' }
        ]
      }

    }
  },
  methods: {
    submitForm (formName) {
      let option = {
        header: {
          action: this.$store.state.actionMap.pro_add_modify,
          ...this.$base,
          sessionid: this.sessionid
        },
        method: 'add',
        ...this.ruleForm2,
        // userGrade:this.ruleForm2.userGrade.join(',')
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'))
              this.addclose()
              this.proList()
            } else {
              this.$globalMsg.error(this.$t('idManage.err'))
            }
          })
        } else {
          return false
        }
      })
    }
    // reset() {
    //   this.$router.push({path:'/promanage'})
    // }
  },
  mounted () {
    let sessionid = sessionStorage.getItem('sessionid')
    this.sessionid = sessionid
  }
}
</script>
<style lang="scss" scoped>
.adduser{
  width: 100%;
  height: 100%;
  position: relative;
}
.demo-ruleForm{
  width: 400px;
}
.types{
  width: 100%;
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      flex: 1;
      margin-right: 20px;
    }
  }
}
</style>
