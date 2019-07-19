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
          <el-select size="small" clearable v-model="formInline.appName" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no49')}}:</span>
          <el-select size="small" clearable v-model="formInline.appPackage" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in appNameOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_QUERY')">
          <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>

    <!-- v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_ADD')" -->
    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_PACKAGEADD')">
      <el-button 
        type="primary" 
        v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_ADD')" 
        @click="addProduct">
        {{$t('proManage.add')}}
      </el-button>
      <el-button 
        type="primary" 
        @click.stop="addBao">
        {{$t('proManage.addBao')}}
      </el-button>
    </div>


    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe >
          <el-table-column align="center" prop="id" label="产品ID">
          </el-table-column>
          <el-table-column align="center" prop="productAmountMax" label="最大金额">
            <template slot-scope="scope">
              <span>{{$store.getters.moneySplit(scope.row.productAmountMax)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productAmountMin" label="最小金额">
            <template slot-scope="scope">
              <span>{{$store.getters.moneySplit(scope.row.productAmountMin)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productAmountPer" label="金额区域增长">
          </el-table-column>
          <el-table-column align="center" prop="productPeriodMax" label="最长周期">
          </el-table-column>
          <el-table-column align="center" prop="productPeriodMin" label="最短周期">
          </el-table-column>
          <el-table-column align="center" prop="productPeriodPer" label="周期区域增长">
          </el-table-column>
          <el-table-column align="center" prop="dayInterest" label="日利率">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.dayInterest)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="feeRate" label="服务费率">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.feeRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="userGrade" label="逾期费率">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.overdueInterest)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueMaxRate" label="逾期封顶">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.overdueMaxRate)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueMaxDays" label="逾期最大天数">
          </el-table-column>
          <el-table-column align="center" prop="canAdvanceType" label="可提前还款类型">
            <template slot-scope="scope">
              <span>{{scope.row.canAdvanceType==1?$t('new.no47'):$t('new.no46')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="canAdvanceDay" label="可提前还款天数">
          </el-table-column>
          <el-table-column align="center" prop="minSuccessRepayments" label="要求成功还款次数">
          </el-table-column>
          <el-table-column align="center" prop="userOverdueMaxDays" label="要求最大逾期天数">
          </el-table-column>
          <el-table-column align="center" prop="appName" label="APP名">
          </el-table-column>
          <el-table-column align="center" prop="appPackage" label="APP包名">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" label="操作" width="180">
            <template slot-scope="scope">
              <span 
                class="table_opr"
                @click="modifyProduct(scope.row.id)">
                {{$t('public.no51')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_COPY')"
                class="table_opr"
                @click="copyloans(scope.row.appPackage)">
                {{$t('proManage.copyPro')}}
              </span>
              <span 
                class="table_opr" 
                @click="delPro(scope.row.id)"
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_EDIT')"
                >{{$t('idManage.del')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-row  type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
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
    <!-- ---------------------- 确认是否删除结束 ------------------- -->
    
    <!-- ---------------------- 添加修改产品开始 ------------------ -->
    <el-dialog :title="addOrEdit=='edit'?$t('proManage.edit'):$t('proManage.add')" :visible.sync="add" width="550px">
      <el-form :model="ruleForm2" size="mini" status-icon :rules="rules" ref="ruleForm" label-width="140px">
        <el-form-item :label="$t('new.no49')" prop="appPackage">
          <el-select v-model="ruleForm2.appPackage" placeholder="请选择APP包名">
            <el-option v-for="item in appNameOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no1')" prop="productAmountMin">
            <el-input type="text" v-model="ruleForm2.productAmountMin" ></el-input>
        </el-form-item>
       <el-form-item :label="$t('yuenan.product.no2')" prop="productAmountMax">
            <el-input type="text" v-model="ruleForm2.productAmountMax" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no3')" prop="productAmountPer">
            <el-input type="text" v-model="ruleForm2.productAmountPer" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no4')" prop="productPeriodMin">
            <el-input type="text" v-model="ruleForm2.productPeriodMin" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no5')" prop="productPeriodMax">
            <el-input type="text" v-model="ruleForm2.productPeriodMax" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('yuenan.product.no6')" prop="productPeriodPer">
            <el-input type="text" v-model="ruleForm2.productPeriodPer" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.dayInterest')" prop="dayInterest">
            <el-input type="text" v-model="ruleForm2.dayInterest" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.feeRate')" prop="feeRate">
          <el-input type="text" v-model="ruleForm2.feeRate" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.overdueInterest')" prop="overdueInterest">
          <el-input type="text" v-model="ruleForm2.overdueInterest" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.overdueMaxAmount')" prop="overdueMaxRate">
          <el-input type="text" v-model="ruleForm2.overdueMaxRate" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.overdueMaxDays')" prop="overdueMaxDays">
          <el-input type="text" v-model="ruleForm2.overdueMaxDays" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.canAdvanceType')" prop="canAdvanceType">
          <el-select v-model="ruleForm2.canAdvanceType" placeholder="请选择可提前还款类型">
            <el-option label="固定天数" :value="1"></el-option>
            <el-option label="按比例" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('proManage.canAdvanceDay')" prop="canAdvanceDay">
          <el-input type="text" v-model="ruleForm2.canAdvanceDay" ></el-input>
        </el-form-item>
        <el-form-item label="最小成功还款次数" prop="minSuccessRepayments">
          <el-input type="text" v-model="ruleForm2.minSuccessRepayments" ></el-input>
        </el-form-item>
        <el-form-item label="最大逾期天数" prop="userOverdueMaxDays">
          <el-input type="text" v-model="ruleForm2.userOverdueMaxDays" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{$t('public.no41')}}</el-button>
            <el-button @click="addclose">{{$t('public.no50')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- ---------------------- 添加修改产品结束 ------------------- -->

    <!-- ------------------复制包名开始-------------------- -->
    <el-dialog :title="$t('proManage.copyPro')" :visible.sync="dialogCopyVisible"  width="600px">
      <el-form :model="copyForm" size="small" ref="copyForm" label-width="140px">
        <el-form-item :label="$t('new.no49')">
          <el-select size="small" disabled v-model="copyForm.appPackageOld" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in copyOption1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('proManage.no1')">
          <el-select size="small" v-model="copyForm.appPackageNew" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in copyOption2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
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
    <el-dialog :title="$t('proManage.addBao')" :visible.sync="dialogAddVisible"  width="600px">
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

    <div class="foot" style="height:60px;"></div>

  </div>
</template>
<script>
export default{
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
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      productId: '', // 选中的产品ID
      dialogCopyVisible: false,
      dialogAddVisible: false,
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
        appPackage: '',
        minSuccessRepayments: '',
        userOverdueMaxDays: '',
        canAdvanceType: ''
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
        // userOverdueMaxDays: [
        //   { validator: validateNumber1, trigger: 'blur' }
        // ],
        minSuccessRepayments: [
          { validator: validateNumber1, trigger: 'blur' }
        ],
        canAdvanceType: [
          { required: true, message: '请选择可提前还款类型', trigger: 'change' }
        ],
        appPackage: [
          { required: true, trigger: 'change' }
        ]
      },
      tableData: [],
      del: false, // 删除弹窗
      add: false, // 添加弹窗
      delId: '', // 删除目标行数对应的id
      modifyId: '', // 修改目标行数对应的id
      addOrEdit: '',
      appNameOption: [], // APP名字下拉框
      options3: [], // APP名字下拉框
      copyOption1:[],// 有数据的包名下拉框
      copyOption2:[],// 没有数据的包名下拉框
      copyForm:{
        appPackageOld:'',
        appPackageNew:'',
      },
      addForm:{
        appPackage:'',
        appName:''
      },
      formInline: {
        appName: '',
        appPackage: ''
      },
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮第几页
      this.currentPage = val;
      this.proInfor();
    },
    select(){
      if(this.flag){
        this.currentPage = 1;
        this.proInfor();
      }
    },
    delPro (id) { // 删除按钮弹窗
      this.del = true
      this.delId = id
    },
    addProduct () { // 添加按钮弹窗
    
    // console.log(this.$refs.ruleForm)
      // this.$refs.ruleForm.resetFields();
      this.addOrEdit = 'add';
      this.add = true;
    },
    delSure () { // 删除确认操作
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_remove,
          'sessionid': this.sessionid
        },
        id: this.delId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('idManage.no3'));
          this.proInfor();
        }else{
          this.$globalMsg.error(this.$t('idManage.no4'));
        }
        this.del = false;
      })
    },
    modifyProduct (id) { // 产品修改弹窗
      // this.ruleForm2 = {};
      this.addOrEdit = 'edit';
      this.productId = id;
      // this.$refs.ruleForm2.resetFields();
      this.proData (id);
      
    },
    addclose () {
      this.add = false;
      this.$refs.ruleForm.resetFields();
      this.ruleForm2 = {
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
        appPackage: '',
        minSuccessRepayments: '',
        userOverdueMaxDays: '',
        canAdvanceType: ''
      };
    },
    proInfor () { // 获取产品详情
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_list,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if (res.data.data) {
            this.tableData = res.data.data;
            this.pageTotal = res.data.header.page.total;
          }
        }
      })
    },
    getAppName () { // 获取app名字和包名
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.select_allData,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data.package;
          arr.forEach(value => {
            this.appNameOption.push({value: value.optionValue, label: value.optionValue});
            this.options3.push({value: value.optionName, label: value.optionName});
          })
        }
      })
    },
    addBao(){
      this.dialogAddVisible = true;
      this.addForm = {
        appPackage:'',
        appName:''
      }
    },
    copyloans(appPackage){
      this.dialogCopyVisible = true;
      this.copyForm = {
        appPackageOld:appPackage,
        appPackageNew:''
      }
    },
    copySure(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.COPYPACKAGE001,
          'sessionid': this.sessionid
        },
        ...this.copyForm
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
          this.proInfor();
          this.getAppBao(2);
          this.dialogCopyVisible = false;
        } else {
          this.$globalMsg.error(this.$t('idManage.err'));
        }
      })
    },
    addBaoSure(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ADDPACKAGE001,
          'sessionid': this.sessionid
        },
        ...this.addForm
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
          this.getAppBao(2);
          this.dialogAddVisible = false;
        } else {
          this.$globalMsg.error(this.$t('idManage.err'));
        }
      })
    },
    getAppBao(type){
      this.copyOption1 = [];
      this.copyOption2 = [];
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.GETPACKAGE001,
          'sessionid': this.sessionid
        },
        type
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if(type==1){
            res.data.data.forEach(value=>{
              this.copyOption1.push({value:value,label:value});
            })
          }
          if(type==2){
            res.data.data.forEach(value=>{
              this.copyOption2.push({value:value,label:value});
            })
          }
        }
      })
    },
    submitForm (formName) {// 修改添加提交操作
      let option = {
        header: {
          action: this.$store.state.actionMap.vi_pro_add_modify,
          ...this.$base,
          sessionid: this.sessionid
        },
        method: this.addOrEdit=='edit'?'edit':'add',
        id: this.addOrEdit=='edit'?this.productId:undefined,
        ...this.ruleForm2
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', option).then(res => {
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('message.success'));
            } else {
              this.$globalMsg.error(res.data.header.msg);
            }
            this.addclose();
            this.proInfor();
          })
        }
      })
    },
    proData (id) {// 根据产品ID查询产品数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.vi_pro_list,
          'page': {'index': 1, 'size': 10},
          'sessionid': this.sessionid
        },
        id
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if (res.data.data) {
            this.ruleForm2.productAmountMin = res.data.data.productAmountMin;
            this.ruleForm2.productAmountMax = res.data.data.productAmountMax;
            this.ruleForm2.productAmountPer = res.data.data.productAmountPer;
            this.ruleForm2.productPeriodMin = res.data.data.productPeriodMin;
            this.ruleForm2.productPeriodMax = res.data.data.productPeriodMax;
            this.ruleForm2.productPeriodPer = res.data.data.productPeriodPer;
            this.ruleForm2.dayInterest = res.data.data.dayInterest;
            this.ruleForm2.feeRate = res.data.data.feeRate;
            this.ruleForm2.overdueMaxDays = res.data.data.overdueMaxDays;
            this.ruleForm2.canAdvanceDay = res.data.data.canAdvanceDay;
            this.ruleForm2.overdueMaxRate = res.data.data.overdueMaxRate;
            this.ruleForm2.overdueInterest = res.data.data.overdueInterest;
            this.ruleForm2.canAdvanceType = res.data.data.canAdvanceType;
            this.ruleForm2.appPackage = res.data.data.appPackage;
            this.ruleForm2.minSuccessRepayments = res.data.data.minSuccessRepayments;
            this.ruleForm2.userOverdueMaxDays = res.data.data.userOverdueMaxDays==-1?'':res.data.data.userOverdueMaxDays;
            this.add = true;
          }
        }
      })
    }
  },
  watch:{
    add(){
      if(!this.add){
        this.addclose();
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.proInfor();
    this.getAppName();
    this.getAppBao(2);
  }
}
</script>
<style scoped lang="scss">
.tableList{
  width: 100%;
  height: auto;
  ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 49%;
      margin-bottom: 20px;
      border: 1px dashed #ddd;
      position: relative;
    }
  }
}

.delButton{
  position: absolute;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 26px;
  right: 0;
  top: 0;
  z-index: 1;
  cursor: pointer;
}
.addPro{
  height:700px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size: 30px;
  border: 1px dashed #ddd;
}

.product{
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 20px 0;
  .product-1{
    width: 100%;
    padding: 10px 20px;
    .pro-title{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #1D7BFF;
      font-size: 24px;
      position: relative;
      .pro-mini-title{
        position: absolute;
        left: 0;
        top: 0;
        width: 200px;
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333;
        .money{
          width: 20px;
          height: 22px;
          margin: 0 20px 0 0;
        }
      }
    }
  }
  .block{
    margin: 30px 0 5px;
  }
  .scope{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bottom-border{
    border-bottom: 1px dashed #ddd;
  }
}
.product-all{
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 20px 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  // margin-top: 20px;
  @include p-span();
}
.product-bottom{
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @include p-span();
  p{
    width: 33%;
  }
}

</style>
