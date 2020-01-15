<template>
  <div class="adduser">
    <el-form
      :model="ruleForm2"
      size="mini"
      status-icon
      :rules="rules"
      ref="ruleForm2"
      label-width="160px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('new.no49')" prop="appPackage">
        <el-select v-model="ruleForm2.appPackage" placeholder="请选择APP包名" style="width:240px">
          <el-option
            v-for="item in appNameOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
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
      <el-form-item :label="$t('proManage.no6')" prop="serviceFeeCharge">
        <el-select v-model="ruleForm2.serviceFeeCharge" placeholder="请选择" style="width:240px">
          <el-option
            v-for="item in advanceArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item :label="$t('proManage.no6')" prop="serviceFeeCharge">
        <el-radio v-model="ruleForm2.serviceFeeCharge" label="1">是</el-radio>
        <el-radio v-model="ruleForm2.serviceFeeCharge" label="2">否</el-radio>
      </el-form-item> -->
      <el-form-item :label="$t('proManage.dayInterest')" prop="dayInterest">
        <el-input type="text" v-model="ruleForm2.dayInterest" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('proManage.no7')" prop="interestCharge">
        <el-select v-model="ruleForm2.interestCharge" placeholder="请选择" style="width:240px">
          <el-option
            v-for="item in advanceArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item :label="$t('proManage.no7')" prop="interestCharge">
        <el-radio v-model="ruleForm2.interestCharge" label="1">是</el-radio>
        <el-radio v-model="ruleForm2.interestCharge" label="2">否</el-radio>
      </el-form-item> -->
      <!------------ 应还金额 ------------->
      <el-form-item :label="$t('public.no27')">
        <el-input type="text" v-model="Amountdue" :disabled="true" style="width:240px"></el-input>
        <!-- <el-button type="primary" size="mini" @click="CalcMoney" style="margin-left: 10px;">计算金额</el-button> -->
      </el-form-item>
      <el-form-item label="分期期数" prop="totalPeriod">
        <el-select
          v-model="ruleForm2.totalPeriod"
          placeholder="请选择分期数"
          @change="qishuChange"
          style="width:240px"
        >
          <el-option v-for="item in qishuArr" :key="item.index" v-model="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每期天数" prop="perTime">
        <span>
          <template v-if="inputArr.length==0">
            <el-input
              type="text"
              size="mini"
              disabled="true"
              placeholder="请选择"
              style="width:70px;margin-right:10px;margin-bottom:5px"
            ></el-input>
          </template>
          <template v-else>
            <el-input
              type="text"
              size="mini"
              style="width:70px;margin-right:10px;margin-bottom:5px"
              v-for="item in inputArr"
              :key="item.index"
              v-model="item.period"
            ></el-input>
          </template>
        </span>
      </el-form-item>
      <el-form-item label="每期应还金额" prop="perMoney">
        <span>
          <template v-if="inputArr.length==0">
            <el-input
              type="text"
              size="mini"
              disabled="true"
              placeholder="请选择"
              style="width:70px;margin-right:10px;margin-bottom:5px"
            ></el-input>
          </template>
          <template v-else>
            <el-input
              type="text"
              size="mini"
              style="width:70px;margin-right:10px;margin-bottom:5px"
              v-for="item in inputArr"
              :key="item.index"
              v-model="item.amount"
            ></el-input>
          </template>
        </span>
      </el-form-item>
      <el-form-item label="还款宽限期" prop="gracePeriod">
        <el-select v-model="ruleForm2.gracePeriod" placeholder="请选择宽限期" style="width:240px">
          <el-option
            v-for="item in NoPayBackTimeArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
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
      <el-form-item label="成功还款次数≥" prop="minSuccessRepayments">
        <el-input type="text" v-model="ruleForm2.minSuccessRepayments" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="投资端-年化利率" prop="investmentRate">
        <el-input type="text" v-model="ruleForm2.investmentRate"></el-input>
      </el-form-item>
      <el-form-item label="借款产品slogan" prop="loanSlogan">
        <el-input type="text" v-model="ruleForm2.loanSlogan"></el-input>
      </el-form-item>
      <el-form-item label="投资产品slogan">
        <el-input type="text" v-model="ruleForm2.investmentSlogan"></el-input>
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
    appNameOption: Object,
    userGreadeOption: Array
  },
  data() {
    var validateNumber = (rule, value, callback) => {
      let reg = /^\+?[1-9][0-9]*$/;
      if (value === "") {
        callback(new Error(this.$t("login.required")));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t("login.num")));
        }
      }
    };
    var validateNumber2 = (rule, value, callback) => {
      let reg = /^\+?[0-9]*$/;
      if (value === "") {
        callback(new Error(this.$t("login.required")));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t("login.num")));
        }
      }
    };
    var validateFloat = (rule, value, callback) => {
      let reg = /^[0-9]+(.[0-9]{1,4})?$/;
      if (value === "") {
        callback(new Error(this.$t("login.required")));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t("login.float")));
        }
      }
    };
    var validateperTime = (rule, value, callback) => {};
    return {
      sessionid: "",
      NoPayBackTimeArr: [
        { value: 0, label: 0 },
        { value: 1, label: 1 },
        { value: 2, label: 2 }
      ],
      // CanLoanArr:[{value:0,label:'新老用户均可'},{value:1,label:'新用户'},{value:2,label:'老用户'},],
      ruleForm2: {
        productAmount: "", //可贷金额
        productPeriod: "", //借款周期
        feeRate: "", //服务费率
        serviceFeeCharge: "", //服务费是否先收
        interestCharge: "", //利息是否先收
        dayInterest: "", //日利率
        overdueInterest: "", //逾期费率
        overdueMaxDays: "", //最多逾期天数
        overdueMaxAmount: "", //逾期封顶
        appPackage: "", //包名
        minSuccessRepayments: "",
        totalPeriod: "", //分期数
        gracePeriod: "", //还款宽限期
        investmentRate: "", //投资端-年化利率
        loanSlogan: "", //借款产品slogan
        investmentSlogan: "", //投资产品slogan
        plans: [] //分期数组
      },
      advanceArr:[{value:1,label:'是'},{value:2,label:'否'}],
      inputArr: [], //分期数对应的input数组
      // inputValue:'',
      qishuArr: [
        //分期数下拉框
        { value: 1, label: "1期" },
        { value: 2, label: "2期" },
        { value: 3, label: "3期" },
        { value: 4, label: "4期" },
        { value: 5, label: "5期" },
        { value: 6, label: "6期" },
        { value: 7, label: "7期" },
        { value: 8, label: "8期" },
        { value: 9, label: "9期" },
        { value: 10, label: "10期" },
        { value: 11, label: "11期" },
        { value: 12, label: "12期" }
      ],
      Amountdue: "",
      rules: {
        // 验证规则
        productAmount: [
          { validator: validateFloat, trigger: "blur", required: true }
        ],
        productPeriod: [
          { validator: validateNumber, trigger: "blur", required: true }
        ],
        feeRate: [
          { validator: validateFloat, trigger: "blur", required: true }
        ],
        dayInterest: [
          { validator: validateFloat, trigger: "blur", required: true }
        ],
        overdueInterest: [
          { validator: validateFloat, trigger: "blur", required: true }
        ],
        validateZero: [
          { validator: validateFloat, trigger: "blur", required: true }
        ],
        overdueMaxAmount: [
          { validator: validateFloat, trigger: "blur", required: true }
        ],
        overdueMaxDays: [
          { validator: validateNumber, trigger: "blur", required: true }
        ],
        // canAdvanceDay: [
        //   { validator: validateNumber, trigger: 'blur', required: true }
        // ],
        gracePeriod: [
          { required: true, message: "Required", trigger: "change" }
        ],
        minSuccessRepayments: [
          { validator: validateNumber2, trigger: "blur", required: true }
        ],
        investmentRate: [{ required: true, trigger: "blur", required: true }],
        loanSlogan: [{ required: true, trigger: "blur", required: true }],
        // perTime: [       //每期天数校验
        //   { validator: validateperTime, trigger: 'blur', required: true }
        // ],
        userGrade: [{ required: true, trigger: "change" }],
        appPackage: [
          { required: true, message: "Required", trigger: "change" }
        ],
        totalPeriod: [
          { required: true, message: "Required", trigger: "change" }
        ],
        serviceFeeCharge: [
          { required: true, message: "Required", trigger: "change" }
        ],
        interestCharge: [
          { required: true, message: "Required", trigger: "change" }
        ],
        CanLoan: [{ required: true, message: "Required", trigger: "change" }]
      }
    };
  },
  methods: {
    CalcMoney(e) {
      let option = {
        header: {
          action: this.$store.state.actionMap.Moneycalc,
          ...this.$base,
          sessionid: this.sessionid
        },
        productAmount: this.ruleForm2.productAmount,
        productPeriod: this.ruleForm2.productPeriod,
        feeRate: this.ruleForm2.feeRate,
        dayInterest: this.ruleForm2.dayInterest,
        serviceFeeCharge: this.ruleForm2.serviceFeeCharge,
        interestCharge: this.ruleForm2.interestCharge
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          this.Amountdue = res.data.data;
        } else {
        }
      });
    },
    qishuChange(e) {
      console.log(e);
      let newArr = [];
      // newArr.push({id:e,value:e})
      for (let i = 0; i < e; i++) {
        newArr.push({ stages: i + 1, period: "", amount: "" });
      }
      console.log(newArr);
      this.inputArr = newArr;
    },
    submitForm(formName) {
      // console.log(this.inputValue)
      this.ruleForm2.plans = this.inputArr;
      console.log(this.ruleForm2);

      let option = {
        header: {
          action: this.$store.state.actionMap.pro_add_modify,
          ...this.$base,
          sessionid: this.sessionid
        },
        method: "add",
        ...this.ruleForm2
        // userGrade:this.ruleForm2.userGrade.join(',')
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("", option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t("message.success"));
              this.addclose();
              this.proList();
            } else {
              this.$globalMsg.error(this.$t("idManage.err"));
            }
          });
        } else {
          return false;
        }
      });
    },
    // reset() {
    //   this.$router.push({path:'/promanage'})
    // }
    watchChange(){
      if (
        this.ruleForm2.productAmount &&
        this.ruleForm2.productPeriod &&
        this.ruleForm2.feeRate &&
        this.ruleForm2.serviceFeeCharge &&
        this.ruleForm2.dayInterest &&
        this.ruleForm2.interestCharge
      ) {
        this.CalcMoney()
      } else {
        // console.log("222");
      }
    },
  },
  watch: {
    // 可贷金额监听
    "ruleForm2.productAmount": function(e, olde) {
      this.watchChange()
    },
    // 借款周期
    "ruleForm2.productPeriod": function(e, olde) {
      this.watchChange()
    },
    // 服务费率
    "ruleForm2.feeRate": function(e, olde) {
      this.watchChange()
    },
    // 服务费是否先收
    "ruleForm2.serviceFeeCharge": function(e, olde) {
      this.watchChange()
    },
    // 日利率
    "ruleForm2.dayInterest": function(e, olde) {
      this.watchChange()
    },
    // 利息是否先收
    "ruleForm2.interestCharge": function(e, olde) {
      this.watchChange()
    }
  },
  mounted() {
    let sessionid = sessionStorage.getItem("sessionid");
    this.sessionid = sessionid;
  }
};
</script>
<style lang="scss" scoped>
.adduser {
  width: 100%;
  height: 100%;
  position: relative;
}
.demo-ruleForm {
  width: 400px;
}
.types {
  width: 100%;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
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
