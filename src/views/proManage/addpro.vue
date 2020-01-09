<template>
  <div class="adduser">
    <el-form :model="ruleForm2" size="mini" status-icon :rules="rules" ref="ruleForm2" label-width="160px" class="demo-ruleForm">
        <el-form-item :label="$t('new.no49')" prop="appPackage">
          <el-select v-model="ruleForm2.appPackage" placeholder="请选择APP包名" style="width:240px">
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
        <el-form-item :label="$t('proManage.no6')" prop="firstFuwu">
             <el-radio v-model="ruleForm2.firstFuwu" label="1">是</el-radio>
             <el-radio v-model="ruleForm2.firstFuwu" label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label="$t('proManage.dayInterest')" prop="dayInterest">
            <el-input type="text" v-model="ruleForm2.dayInterest" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.no7')" prop="firstLixi">
             <el-radio v-model="ruleForm2.firstLixi" label="1">是</el-radio>
             <el-radio v-model="ruleForm2.firstLixi" label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label="$t('public.no27')">
             <el-input type="text" v-model="ruleForm2.Amountdue" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分期期数" prop="qishu">
          <el-select v-model="ruleForm2.qishu" placeholder="请选择分期数" @change="qishuChange" style="width:240px">
            <el-option v-for="item in qishuArr" :key="item.index" v-model="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="每期天数" prop="perTime" >
          <span>
            <template v-if="inputArr.length==0">
              <el-input type="text" size="mini" disabled="true" placeholder="请选择" style="width:70px;margin-right:10px;margin-bottom:5px" ></el-input>
            </template>
            <template v-else>
              <el-input type="text" size="mini" style="width:70px;margin-right:10px;margin-bottom:5px" v-for="item in inputArr" :key="item.index" v-model="item.time" ></el-input>
            </template>
          </span>
        </el-form-item>
         <el-form-item label="每期应还金额" prop="perMoney" >
          <span>
            <template v-if="inputArr.length==0">
              <el-input type="text" size="mini" disabled="true" placeholder="请选择" style="width:70px;margin-right:10px;margin-bottom:5px" ></el-input>
            </template>
            <template v-else>
              <el-input type="text" size="mini" style="width:70px;margin-right:10px;margin-bottom:5px" v-for="item in inputArr" :key="item.index" v-model="item.money" ></el-input>
            </template>
          </span>
        </el-form-item>
        <el-form-item label="还款宽限期">
          <el-select v-model="ruleForm2.NoPayBackTime" placeholder="请选择宽限期" style="width:240px">
            <el-option v-for="item in NoPayBackTimeArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
        <!-- CanLoanArr -->
        <el-form-item label="可贷用户类型" prop="CanLoan">
          <el-select v-model="ruleForm2.CanLoan" placeholder="请选择宽限期" style="width:240px" >
            <el-option v-for="item in CanLoanArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资端-年化利率">
          <el-input type="text" v-model="ruleForm2.a" ></el-input>
        </el-form-item>
        <el-form-item label="借款产品slogan">
          <el-input type="text" v-model="ruleForm2.b" ></el-input>
        </el-form-item>
        <el-form-item label="投资产品slogan">
          <el-input type="text" v-model="ruleForm2.c" ></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('proManage.canAdvanceDay')" prop="canAdvanceDay">
          <el-input type="text" v-model="ruleForm2.canAdvanceDay" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="成功还款次数≥" prop="minSuccessRepayments">
            <el-input type="text" v-model="ruleForm2.minSuccessRepayments" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大逾期天数≤" prop="userOverdueMaxDays">
            <el-input type="text" v-model="ruleForm2.userOverdueMaxDays" auto-complete="off"></el-input>
        </el-form-item> -->
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
    var validateperTime = (rule, value, callback) => {
      
    }
    return {
      sessionid: '',
      NoPayBackTimeArr:[{value:0,label:0},{value:1,label:1},{value:2,label:2},],
      CanLoanArr:[{value:0,label:'新老用户均可'},{value:1,label:'新用户'},{value:2,label:'老用户'},],
      ruleForm2: {
        productAmount: '',
        productPeriod: '',
        feeRate: '',
        firstFuwu:'',   //服务费是否先收
        firstLixi:"",   //利息是否先收
        dayInterest: '',
        overdueInterest: '',
        overdueMaxDays: '',
        // canAdvanceDay: '',
        overdueMaxAmount: '',
        appPackage: '',
        userGrade: [],
        // minSuccessRepayments: '',
        // userOverdueMaxDays: '',
        qishu:'',       //分期数
        NoPayBackTime:'',      //还款宽限期
        CanLoan:'',            //可贷用户类型
        Amountdue:'',          //应还金额
        a:'',
        b:'',
        c:'',
      },
      inputArr:[],     //分期数对应的input数组
      // inputValue:'',
      qishuArr:[      //分期数下拉框
        {value:1,label:'1期'},
        {value:2,label:'2期'},
        {value:3,label:'3期'},
        {value:4,label:'4期'},
        {value:5,label:'5期'},
        {value:6,label:'6期'},
        {value:7,label:'7期'},
        {value:8,label:'8期'},
        {value:9,label:'9期'},
        {value:10,label:'10期'},
        {value:11,label:'11期'},
        {value:12,label:'12期'},
      ],
      rules: {// 验证规则
        productAmount: [
          { validator: validateFloat, trigger: 'blur', required: true }
        ],
        productPeriod: [
          { validator: validateNumber, trigger: 'blur', required: true }
        ],
        feeRate: [
          { validator: validateFloat, trigger: 'blur', required: true }
        ],
        dayInterest: [
          { validator: validateFloat, trigger: 'blur', required: true }
        ],
        overdueInterest: [
          { validator: validateFloat, trigger: 'blur', required: true }
        ],
        validateZero: [
          { validator: validateFloat, trigger: 'blur', required: true }
        ],
        overdueMaxAmount: [
          { validator: validateFloat, trigger: 'blur', required: true }
        ],
        overdueMaxDays: [
          { validator: validateNumber, trigger: 'blur', required: true }
        ],
        // canAdvanceDay: [
        //   { validator: validateNumber, trigger: 'blur', required: true }
        // ],
        // minSuccessRepayments: [
        //   { validator: validateNumber2, trigger: 'blur', required: true }
        // ],
        // perTime: [       //每期天数校验
        //   { validator: validateperTime, trigger: 'blur', required: true }
        // ],
        userGrade: [
          { required: true, trigger: 'change' }
        ],
        appPackage: [
          { required: true,  message:'Required' ,trigger: 'change' }   
        ],
        qishu: [
          { required: true,  message:'Required' ,trigger: 'change' }   
        ],
        firstFuwu: [
          { required: true,  message:'Required' ,trigger: 'change' }
        ],
        firstLixi: [
          { required: true,  message:'Required' ,trigger: 'change' }
        ],
        CanLoan: [
          { required: true,  message:'Required' ,trigger: 'change' }   
        ],
      }

    }
  },
  methods: {
    qishuChange(e){
      console.log(e)
      let newArr=[]
      // newArr.push({id:e,value:e})
      for (let i = 0; i < e; i++) {
        newArr.push({id:i,time:'',money:''})
      }
      console.log(newArr)
      this.inputArr=newArr
    },
    submitForm (formName) {
      // console.log(this.inputValue)
      console.log(this.inputArr)
      // let option = {
      //   header: {
      //     action: this.$store.state.actionMap.pro_add_modify,
      //     ...this.$base,
      //     sessionid: this.sessionid
      //   },
      //   method: 'add',
      //   ...this.ruleForm2,
      //   // userGrade:this.ruleForm2.userGrade.join(',')
      // }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$axios.post('', option).then(res => {
      //       if (res.data.header.code == 0) {
      //         this.$globalMsg.success(this.$t('message.success'))
      //         this.addclose()
      //         this.proList()
      //       } else {
      //         this.$globalMsg.error(this.$t('idManage.err'))
      //       }
      //     })
      //   } else {
      //     return false
      //   }
      // })
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
// .inputClass{
//     width: 70px;
//     margin-right: 10px;
//     margin-bottom: 10px;
//     height: 25px;
//     border-radius: 5px;
//     border: 1px solid #DCDFE6;
//     text-align: center;
// }
</style>
