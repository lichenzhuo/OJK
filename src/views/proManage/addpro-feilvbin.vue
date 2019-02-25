<template>
  <div class="adduser">
    <el-form :model="ruleForm2" size="mini" status-icon :rules="rules" ref="ruleForm2" label-width="140px" class="demo-ruleForm">
        <el-form-item :label="$t('new.no49')" prop="appPackage">
          <el-select v-model="ruleForm2.appPackage" placeholder="请选择APP包名">
            <el-option v-for="item in appNameOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no1')" prop="productAmountMin">
            <el-input type="user" v-model="ruleForm2.productAmountMin" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item :label="$t('yuenan.product.no2')" prop="productAmountMax">
            <el-input type="user" v-model="ruleForm2.productAmountMax" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no3')" prop="productAmountPer">
            <el-input type="user" v-model="ruleForm2.productAmountPer" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no4')" prop="productPeriodMin">
            <el-input type="user" v-model="ruleForm2.productPeriodMin" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no5')" prop="productPeriodMax">
            <el-input type="user" v-model="ruleForm2.productPeriodMax" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no6')" prop="productPeriodPer">
            <el-input type="user" v-model="ruleForm2.productPeriodPer" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('fei.xianzhi')" prop="limitAmount">
            <el-input type="user" v-model="ruleForm2.limitAmount" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('proManage.dayInterest')" prop="dayInterest">
            <el-input type="text" v-model="ruleForm2.dayInterest" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.feeRate')" prop="feeRate">
          <el-input type="text" v-model="ruleForm2.feeRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.overdueInterest')" prop="overdueInterest">
          <el-input type="text" v-model="ruleForm2.overdueInterest" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.overdueMaxAmount')" prop="overdueMaxRate">
          <el-input type="text" v-model="ruleForm2.overdueMaxRate" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('proManage.overdueMaxDays')" prop="overdueMaxDays">
          <el-input type="text" v-model="ruleForm2.overdueMaxDays" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('proManage.canAdvanceType')" prop="canAdvanceType">
          <el-select v-model="ruleForm2.canAdvanceType" placeholder="请选择可提前还款类型">
            <el-option label="固定天数" value="1"></el-option>
            <el-option label="按比例" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('proManage.canAdvanceDay')" prop="canAdvanceDay">
          <el-input type="text" v-model="ruleForm2.canAdvanceDay" auto-complete="off"></el-input>
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
    proList: Function,
    productId:'',
    type:'',
    appNameOption:[Object,Array]
  },
  data () {
    var validateNumber = (rule, value, callback) => {
      let reg = /^\+?[1-9][0-9]*$/
      if (value == '') {
        callback(new Error(this.$t('login.required')))
      } else {
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(this.$t('login.num')))
        }
      }
    }
    var validateNumber1 = (rule, value, callback) => {
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
      productId: '',
      ruleForm2: {
        productAmountMin: '',
        productAmountMax: '',
        productAmountPer: '',
        productPeriodMin: '',
        productPeriodMax: '',
        productPeriodPer: '',
        dayInterest: '',
        feeRate: '',
        overdueMaxDays: '',
        canAdvanceDay: '',
        overdueInterest: '',
        overdueMaxRate: '',
        canAdvanceType: '',
        appPackage: '',
      },
      rules: {// 验证规则
        productAmountMin: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        productAmountMax: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        productAmountPer: [
          { validator: validateNumber1, trigger: 'blur' }
        ],
        productPeriodMin: [
          { validator: validateNumber, trigger: 'blur' }
        ],
        productPeriodMax: [
          { validator: validateNumber, trigger: 'blur' }
        ],
        productPeriodPer: [
          { validator: validateNumber1, trigger: 'blur' }
        ],
        feeRate: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        dayInterest: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        overdueMaxRate: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        overdueInterest: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        overdueMaxDays: [
          { validator: validateNumber, trigger: 'blur' }
        ],
        canAdvanceDay: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        limitAmount: [
          { validator: validateNumber1, trigger: 'blur' }
        ],
        canAdvanceType: [
          { required: true, message: '请选择可提前还款类型', trigger: 'change' }
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
          action: this.$store.state.actionMap.fpl_pro_add_modify,
          ...this.$base,
          sessionid: this.sessionid
        },
        method: this.type=='edit'?'edit':'add',
        id: this.type=='edit'?this.productId:undefined,
        ...this.ruleForm2
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'))
            } else {
              this.$globalMsg.error(res.data.header.msg)
            }
            this.addclose()
            this.proList()
          })
        } else {
          return false
        }
      })
    },
    proData () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.fpl_pro_list,
          'page': {'index': 1, 'size': 10},
          'sessionid': this.sessionid
        },
        id:this.productId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if (res.data.data) {
            this.ruleForm2.productAmountMin = res.data.data.productAmountMin
            this.ruleForm2.productAmountMax = res.data.data.productAmountMax
            this.ruleForm2.productAmountPer = res.data.data.productAmountPer
            this.ruleForm2.productPeriodMin = res.data.data.productPeriodMin
            this.ruleForm2.productPeriodMax = res.data.data.productPeriodMax
            this.ruleForm2.productPeriodPer = res.data.data.productPeriodPer
            this.ruleForm2.dayInterest = res.data.data.dayInterest
            this.ruleForm2.feeRate = res.data.data.feeRate
            // this.ruleForm2.limitAmount = res.data.data.limitAmount
            this.ruleForm2.overdueMaxDays = res.data.data.overdueMaxDays
            this.ruleForm2.canAdvanceDay = res.data.data.canAdvanceDay
            this.ruleForm2.overdueMaxRate = res.data.data.overdueMaxRate
            this.ruleForm2.overdueInterest = res.data.data.overdueInterest
            this.ruleForm2.canAdvanceType = String(res.data.data.canAdvanceType)
            this.ruleForm2.appPackage = res.data.data.appPackage
          }
        }
      })
    }

  },
  mounted () {
    let sessionid = sessionStorage.getItem('sessionid')
    this.sessionid = sessionid
    if(this.type=='edit'){
      this.proData()
    }
    
  }
}
</script>
<style lang="scss" scoped>
.adduser{
  width: 100%;
  height: 100%;
  // padding: 20px 30px;
  // background-color: rgba(246, 249, 252, 1);
  position: relative;
}
.demo-ruleForm{
  width: 400px;
}
</style>
