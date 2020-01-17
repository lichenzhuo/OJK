<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('proManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('proManage.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------------ 横条 ------------------- -->
    <div class="paixu">
      <span></span>
      <p>{{$t('proManage.title')}}</p>
    </div>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search">
      <el-row type="flex" justify="start" align="middle">
        <div class="search-input">
          <span>{{$t('new.no48')}}:</span>
          <el-select
            size="small"
            filterable
            clearable
            v-model="formInline.appName"
            :placeholder="$t('public.placeholder')"
          >
            <el-option
              v-for="(item,i) in options3"
              :key="i"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no49')}}:</span>
          <el-select
            size="small"
            filterable
            clearable
            v-model="formInline.appPackage"
            :placeholder="$t('public.placeholder')"
          >
            <el-option
              v-for="(item,i) in appNameOption"
              :key="i"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div
          class="search-input"
          v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_QUERY')"
        >
          <el-button type="primary" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="list_operation">
      <el-button
        v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_ADD')"
        type="primary"
        @click.stop="addloans"
      >+{{$t('proManage.add')}}</el-button>
      <el-button
        v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_COPY')"
        type="primary"
        @click.stop="copyPro"
      >{{$t('proManage.copyPro')}}</el-button>
      <el-button
        v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_PACKAGEADD')"
        type="primary"
        @click.stop="addBao"
      >{{$t('proManage.addBao')}}</el-button>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="id" :label="$t('proManage.id')"></el-table-column>
          <el-table-column align="center" prop="productAmount" label="可贷金额">
            <template slot-scope="scope">
              <span
                v-if="scope.row.productAmount!==null&&scope.row.productAmount!==undefined&&scope.row.productAmount!==''"
              >{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.productAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" label="可贷天数"></el-table-column>
          <el-table-column align="center" prop="feeRate" :label="$t('proManage.feeRate')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.feeRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="dayInterest" :label="$t('proManage.dayInterest')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.dayInterest)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="overdueInterest"
            :label="$t('proManage.overdueInterest')"
          >
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.overdueInterest)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="overdueMaxAmount"
            :label="$t('proManage.overdueMaxAmount')"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.overdueMaxAmount!=''"
              >{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueMaxAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="overdueMaxDays"
            :label="$t('proManage.overdueMaxDays')"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="canAdvanceDay"
            :label="$t('proManage.canAdvanceDay')"
          ></el-table-column>
          <el-table-column align="center" prop="minSuccessRepayments" label="成功还款次数≥"></el-table-column>
          <el-table-column align="center" prop="appPackage" :label="$t('new.no49')"></el-table-column>
          <el-table-column align="center" prop="appName" :label="$t('new.no48')"></el-table-column>
          <el-table-column align="center" prop="serviceFeeCharge" label="服务费是否先收">
            <template slot-scope="scope">
              <span v-if="scope.row.serviceFeeCharge==1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="interestCharge" label="利息是否先收">
            <template slot-scope="scope">
              <span v-if="scope.row.interestCharge==1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="appPackage" label="可贷用户类型">
          </el-table-column>-->
          <el-table-column align="center" prop="plans" label="分期计划">
            <template slot-scope="scope">
              <span class="table_opr" @click="showPlan(scope.row.plans)">{{$t('public.no29')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            prop="operation"
            :label="$t('public.operation')"
            min-width="140"
          >
            <template slot-scope="scope">
              <span
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_EDIT')"
                class="table_opr"
                @click="modifyPre(scope.row)"
              >{{$t('public.no51')}}</span>
              <span
                class="table_opr"
                @click="delPro(scope.row.id)"
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_EDIT')"
              >{{$t('idManage.del')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- -------------分页显示栏------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0"
        ></el-pagination>
      </div>
    </el-row>

    <!-- ----------------------确认是否删除开始------------------ -->
    <el-dialog :title="$t('public.no48')" :visible.sync="del" width="550px">
      <div class="left2right">
        <span class="left"></span>
        <span class="right">确定删除该产品吗？</span>
      </div>
      <div class="left2right mt15">
        <span class="left"></span>
        <span class="right">
          <el-button type="primary" @click="delSure()">{{$t('public.no49')}}</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- ----------------------确认是否删除结束------------------- -->

    <!-- ----------------------添加修改产品开始------------------ -->
    <el-dialog :title="$t('proManage.add')" :visible.sync="add" width="550px">
      <addpro
        :addclose="addclose"
        :pro-list="proList"
        :user-greade-option="options"
        :app-name-option="appNameOption"
      ></addpro>
    </el-dialog>
    <!-- ----------------------确认是否上架结束------------------- -->

    <!-- ------------------确认是否修改开始-------------------- -->
    <el-dialog
      :title="$t('public.no29')+'/'+$t('public.no51')+$t('proManage.product')"
      :visible.sync="modify"
      width="550px"
    >
      <el-form
        class="demo-ruleForm"
        size="mini"
        label-position="left"
        ref="ruleForm2"
        :rules="rules"
        label-width="130px"
        :model="ruleForm2"
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
        <el-form-item label="可贷天数" prop="productPeriod">
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
          <el-input type="text" v-model="amount" :disabled="true" style="width:240px"></el-input>
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
        <!-- <el-form-item label="借款产品slogan" prop="loanSlogan">
          <el-input type="text" v-model="ruleForm2.loanSlogan"></el-input>
        </el-form-item>
        <el-form-item label="投资产品slogan">
          <el-input type="text" v-model="ruleForm2.investmentSlogan"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="modifySure('ruleForm2')">{{$t('public.no41')}}</el-button>
          <el-button @click="reset">{{$t('public.no50')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <!-- ------------------复制包名开始-------------------- -->
    <el-dialog :title="$t('proManage.copyPro')" :visible.sync="dialogCopyVisible" width="600px">
      <el-form :model="copyForm" size="small" ref="copyForm" label-width="140px">
        <el-form-item :label="$t('new.no49')">
          <el-select
            size="small"
            v-model="copyForm.appPackageOld"
            :placeholder="$t('public.placeholder')"
          >
            <el-option
              v-for="item in copyOption1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('proManage.no1')">
          <el-select
            size="small"
            v-model="copyForm.appPackageNew"
            :placeholder="$t('public.placeholder')"
          >
            <el-option
              v-for="item in copyOption2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCopyVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="copySure">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    <!-- ------------------复制包名结束-------------------- -->

    <!-- ------------------添加包名开始-------------------- -->
    <el-dialog :title="$t('proManage.addBao')" :visible.sync="dialogAddVisible" width="600px">
      <el-form :model="addForm" size="small" ref="addForm" label-width="140px">
        <el-form-item :label="$t('new.no49')">
          <el-input v-model="addForm.appPackage" style="width:215px;"></el-input>
        </el-form-item>
        <el-form-item :label="$t('new.no48')">
          <el-input v-model="addForm.appName" style="width:215px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="addBaoSure">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    <!-- ------------------添加包名结束-------------------- -->

    <!------------------- 查看分期计划开始 --------------------->
    <el-dialog title="分期计划" :visible.sync="dialogPlanVisible" width="600px">
      <el-table :data="PlanData" show-summary>
        <el-table-column label="期数" prop="stages" width="150">
          <template slot-scope="scope">
            <span>第{{scope.row.stages}}期</span>
          </template>
        </el-table-column>
        <el-table-column label="天数分期" prop="period" width="200"></el-table-column>
        <el-table-column label="金额分期" prop="amount"></el-table-column>
      </el-table>
    </el-dialog>
    <!------------------- 查看分期计划结束 --------------------->
    <div class="foot"></div>
  </div>
</template>
<script>
import addpro from "./addpro";

export default {
  components: {
    addpro
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
    return {
      flag: true,
      dialogCopyVisible: false,
      dialogAddVisible: false,
      dialogPlanVisible: false,
      sessionid: "",
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      // 查看详情产品信息数据对应字段
      formInline: {
        appName: "",
        appPackage: ""
      },
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
        // loanSlogan: "", //借款产品slogan
        // investmentSlogan: "", //投资产品slogan
        plans: [], //分期数组
        id: ""
      },
      amount: "",
      tableData: [], // 数据模拟
      del: false, // 删除弹窗
      modify: false, // 修改弹窗
      add: false, // 添加弹窗
      delId: "", // 删除目标行数对应的id
      modifyId: "", // 修改目标行数对应的id
      pushId: "", // 上架目标行数对应的id
      appNameOption: [], // APP名字下拉框
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
        // loanSlogan: [{ required: true, trigger: "blur", required: true }],
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
      },
      options: [],
      options3: [], // APP名下拉选框信息
      options4: [], // APP包名身份状态下拉选框信息
      copyOption1: [], // 有数据的包名下拉框
      copyOption2: [], // 没有数据的包名下拉框
      copyForm: {
        appPackageOld: "",
        appPackageNew: ""
      },
      addForm: {
        appPackage: "",
        appName: ""
      },
      PlanData: [], //分期计划数据
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
      advanceArr:[{value:1,label:'是'},{value:2,label:'否'}],
      inputArr: [], //分期数对应的input数组
      NoPayBackTimeArr: [
        { value: 0, label: 0 },
        { value: 1, label: 1 },
        { value: 2, label: 2 }
      ]
    };
  },
  methods: {
    // 分页按钮第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.proList();
    },
    select() {
      if (this.flag) {
        this.currentPage = 1;
        this.proList();
      }
    },
    //计算应还金额
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
          this.amount = res.data.data;
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
    // 删除按钮弹窗
    delPro(id) {
      this.del = true;
      this.delId = id;
    },
    // 修改按钮弹窗
    modifyPre(e) {
      console.log(e);
      // this.ruleForm2 = e;
      let arr = [];
      e.plans.forEach(i => {
        arr.push({ stages: i.stages, amount: i.amount, period: i.period });
      });
      console.log(arr, "9999");
      this.amount = e.amount;
      this.ruleForm2.id = e.id;
      this.ruleForm2.productAmount = e.productAmount;
      this.ruleForm2.productPeriod = e.productPeriod;
      this.ruleForm2.feeRate = e.feeRate;
      this.ruleForm2.serviceFeeCharge = e.serviceFeeCharge;
      this.ruleForm2.interestCharge = e.interestCharge;
      this.ruleForm2.dayInterest = e.dayInterest;
      this.ruleForm2.overdueInterest = e.overdueInterest;
      this.ruleForm2.overdueMaxDays = e.overdueMaxDays;
      this.ruleForm2.overdueMaxAmount = e.overdueMaxAmount;
      this.ruleForm2.appPackage = e.appPackage;
      this.ruleForm2.minSuccessRepayments = e.minSuccessRepayments;
      this.ruleForm2.totalPeriod = e.totalPeriod;
      this.ruleForm2.gracePeriod = e.gracePeriod;
      this.ruleForm2.investmentRate = e.investmentRate;
      // this.ruleForm2.loanSlogan = e.loanSlogan;
      // this.ruleForm2.investmentSlogan = e.investmentSlogan;
      this.ruleForm2.plans = arr;
      this.inputArr=arr
      this.modify = true;
    },

    //查看分期计划
    showPlan(e) {
      console.log(e, "222");
      this.PlanData = e;
      this.dialogPlanVisible = true;
    },
    reset() {
      this.modify = false;
    },
    // 删除确认操作
    delSure() {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_remove,
          sessionid: this.sessionid
        },
        id: this.delId
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t("idManage.no3"));
          this.proList();
        } else {
          this.$globalMsg.error(this.$t("idManage.no4"));
        }
        this.del = false;
      });
    },
    // 修改确认操作
    modifySure(formName) {
      if (this.flag) {
        this.flag = false;
        this.$refs[formName].validate(valid => {
          if (valid) {
            let option = {
              header: {
                action: this.$store.state.actionMap.pro_add_modify,
                ...this.$base,
                sessionid: this.sessionid
              },
              method: "edit",
              ...this.ruleForm2
              // productPeriod:this.ruleForm2.productPeriod,

              // id: this.modifyId
            };
            this.$axios.post("", option).then(res => {
              this.flag = true;
              if (res.data.header.code == 0) {
                this.$globalMsg.success(this.$t("idManage.no5"));
                this.proList();
                this.modify = false;
              } else {
                this.$globalMsg.error(this.$t("idManage.no6"));
              }
            });
          } else {
            this.flag = true;
            return false;
          }
        });
      }
    },
    // 产品添加功能
    addloans() {
      this.add = true;
    },
    addclose() {
      this.add = false;
    },
    // 获取产品列表
    proList() {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_list,
          page: { index: this.currentPage, size: 10 },
          sessionid: this.sessionid
        },
        ...this.formInline
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      });
    },
    // 获取app名字和包名
    getAppName() {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
          sessionid: this.sessionid
        },
        optionGroup: "package"
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            this.appNameOption.push({
              value: value.optionValue,
              label: value.optionValue
            }); // app包名
            this.options3.push({
              value: value.optionName,
              label: value.optionName
            }); // APP名
          });
        }
      });
    },
    // 获取用户等级
    getUserType() {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
          sessionid: this.sessionid
        },
        optionGroup: "user.loan.grade"
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          let brr = res.data.data;
          brr.forEach(value => {
            this.options.push({
              value: value.optionValue,
              label: value.optionValue
            });
          });
        }
      });
    },
    addBao() {
      this.dialogAddVisible = true;
      this.addForm = {
        appPackage: "",
        appName: ""
      };
    },
    copyPro() {
      this.dialogCopyVisible = true;
      this.copyForm = {
        appPackageOld: "",
        appPackageNew: ""
      };
    },
    copySure() {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.COPYPACKAGE001,
          sessionid: this.sessionid
        },
        ...this.copyForm
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t("message.success"));
          this.proList();
          this.dialogCopyVisible = false;
          this.getAppBao(2);
        } else {
          this.$globalMsg.error(this.$t("idManage.err"));
        }
      });
    },
    addBaoSure() {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ADDPACKAGE001,
          sessionid: this.sessionid
        },
        ...this.addForm
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t("message.success"));
          this.getAppBao(2);
          this.dialogAddVisible = false;
        } else {
          this.$globalMsg.error(this.$t("idManage.err"));
        }
      });
    },
    getAppBao(type) {
      this.copyOption1 = [];
      this.copyOption2 = [];
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.GETPACKAGE001,
          sessionid: this.sessionid
        },
        type
      };
      this.$axios.post("", option).then(res => {
        if (res.data.header.code == 0) {
          if (type == 1) {
            res.data.data.forEach(value => {
              this.copyOption1.push({ value: value, label: value });
            });
          }
          if (type == 2) {
            res.data.data.forEach(value => {
              this.copyOption2.push({ value: value, label: value });
            });
          }
        }
      });
    },
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
    this.proList();
    this.getAppName();
    this.getUserType();
    this.getAppBao(1);
    this.getAppBao(2);
  }
};
</script>
<style scoped lang="scss">
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
.threeTable {
  text-align: center;
  margin-top: 20px;
  margin-left: 40px;
  .tablrtr {
    height: 40px;
  }
  .tableth {
    width: 100px;
    background-color: #f2f6fc;
  }
  .tabletd {
    width: 100px;
  }
}
</style>
