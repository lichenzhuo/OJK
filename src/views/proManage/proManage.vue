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
          <el-select size="small" filterable  clearable v-model="formInline.appName" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,i) in options3" :key="i" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no49')}}:</span>
          <el-select size="small" filterable clearable v-model="formInline.appPackage" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,i) in appNameOption" :key="i" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_QUERY')">
          <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="list_operation">
      <el-button 
      v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_ADD')" 
      type="primary" 
      @click.stop="addloans">
      +{{$t('proManage.add')}}
      </el-button>
      <el-button 
      v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_COPY')" 
      type="primary" 
      @click.stop="copyPro">
      {{$t('proManage.copyPro')}}
      </el-button>
      <el-button 
      v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_PACKAGEADD')" 
      type="primary" 
      @click.stop="addBao">
      {{$t('proManage.addBao')}}
      </el-button>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe >
          <el-table-column align="center" prop="id" :label="$t('proManage.id')">
          </el-table-column>
          <el-table-column align="center" prop="productAmount" :label="$t('proManage.amount')">
            <template slot-scope="scope">
              <span v-if="scope.row.productAmount!==null&&scope.row.productAmount!==undefined&&scope.row.productAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.productAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('proManage.period')">
          </el-table-column>
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
          <el-table-column align="center" prop="overdueInterest" :label="$t('proManage.overdueInterest')">
            <template slot-scope="scope">
              <span>{{$store.getters.twoPoint(scope.row.overdueInterest)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueMaxAmount" :label="$t('proManage.overdueMaxAmount')">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueMaxAmount!=''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueMaxAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueMaxDays" :label="$t('proManage.overdueMaxDays')">
          </el-table-column>
          <el-table-column align="center" prop="canAdvanceDay" :label="$t('proManage.canAdvanceDay')">
          </el-table-column>
          <!-- <el-table-column align="center" prop="userGrade" :label="$t('proManage.userGrade')">
            <template slot-scope="scope">
              <span v-if="scope.row.userGrade!=''">{{scope.row.userGrade}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="minSuccessRepayments" label="成功还款次数≥">
          </el-table-column>
          <el-table-column align="center" prop="userOverdueMaxDays" label="最大逾期天数≤">
          </el-table-column>
          <el-table-column align="center" prop="appPackage" :label="$t('new.no49')">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="140">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_EDIT')"
                class="table_opr"
                @click="modifyPre(scope.row.id,scope.row.productAmount,scope.row.productPeriod,scope.row.feeRate,scope.row.dayInterest,scope.row.overdueInterest,scope.row.overdueMaxAmount,scope.row.overdueMaxDays,scope.row.canAdvanceDay,scope.row.userGrade,scope.row.appPackage,scope.row.minSuccessRepayments,scope.row.userOverdueMaxDays)">
              {{$t('public.no29')}}/{{$t('public.no51')}}
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
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- -------------分页显示栏------------------------ -->
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
    <!-- ----------------------确认是否删除结束------------------- -->
    
    <!-- ----------------------添加修改产品开始------------------ -->
    <el-dialog :title="$t('proManage.add')" :visible.sync="add" width="550px">
      <addpro 
        :addclose="addclose" 
        :pro-list="proList" 
        :user-greade-option="options" 
        :app-name-option="appNameOption">
      </addpro>
    </el-dialog>
    <!-- ----------------------确认是否上架结束------------------- -->

    <!-- ------------------确认是否修改开始-------------------- -->
    <el-dialog :title="$t('public.no29')+'/'+$t('public.no51')+$t('proManage.product')" :visible.sync="modify" width="550px">
      <el-form class="demo-ruleForm" size="mini" 
        label-position="left" 
        ref="ruleForm2" 
        :rules="rules" 
        label-width="130px" :model="ruleForm2">
        <el-form-item :label="$t('new.no48')" prop="appPackage">
          <el-select v-model="ruleForm2.appPackage" placeholder="请选择APP包名">
            <el-option v-for="item in appNameOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('proManage.productAmount')" prop="productAmount">
            <el-input type="text" v-model="ruleForm2.productAmount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.period')" prop="productPeriod">
            <el-input type="text" v-model="ruleForm2.productPeriod" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.feeRate')" prop="feeRate">
            <el-input type="text" v-model="ruleForm2.feeRate" auto-complete="off"></el-input>
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
        <!-- <el-form-item :label="$t('proManage.userGrade')" prop="userGrade">
          <el-checkbox-group v-model="ruleForm2.userGrade">
            <div class="types">
              <ul>
                <li v-for="value in options" :key="value.value">
                  <el-checkbox :label="value.value"><span>{{value.label}}</span></el-checkbox>
                </li>
              </ul>
            </div>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item>
            <el-button type="primary" @click="modifySure('ruleForm2')">{{$t('public.no41')}}</el-button>
            <el-button @click="reset">{{$t('public.no50')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <!-- ------------------复制包名开始-------------------- -->
    <el-dialog :title="$t('proManage.copyPro')" :visible.sync="dialogCopyVisible"  width="600px">
      <el-form :model="copyForm" size="small" ref="copyForm" label-width="140px">
        <el-form-item :label="$t('new.no49')">
          <el-select size="small" v-model="copyForm.appPackageOld" :placeholder="$t('public.placeholder')">
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

    <div class="foot"></div>

  </div>
</template>
<script>
import addpro from './addpro'

export default{
  components: {
    addpro
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
      flag: true,
      dialogCopyVisible: false,
      dialogAddVisible: false,
      sessionid: '',
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      // 查看详情产品信息数据对应字段
      formInline: {
        appName: '',
        appPackage: ''
      },
      ruleForm2: {
        productAmount: '',
        productPeriod: '',
        feeRate: '',
        dayInterest: '',
        overdueInterest: '',
        overdueMaxDays: '',
        canAdvanceDay: '',
        overdueMaxAmount: '',
        userGrade: [],
        appPackage: '',
        minSuccessRepayments: '',
        userOverdueMaxDays: '',
      },
      tableData: [], // 数据模拟
      del: false, // 删除弹窗
      modify: false, // 修改弹窗
      add: false, // 添加弹窗
      delId: '', // 删除目标行数对应的id
      modifyId: '', // 修改目标行数对应的id
      pushId: '', // 上架目标行数对应的id
      appNameOption: [], // APP名字下拉框
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
        overdueMaxAmount: [
          { validator: validateFloat, trigger: 'blur', required: true }
        ],
        overdueMaxDays: [
          { validator: validateNumber, trigger: 'blur', required: true }
        ],
        canAdvanceDay: [
          { validator: validateNumber, trigger: 'blur', required: true }
        ],
        minSuccessRepayments: [
          { validator: validateNumber2, trigger: 'blur', required: true }
        ],
        userGrade: [
          { required: true, trigger: 'change' }
        ],
        appPackage: [
          { required: true, trigger: 'change' }
        ]
      },
      options: [],
      options3: [], // APP名下拉选框信息
      options4: [], // APP包名身份状态下拉选框信息
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
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮第几页
      this.currentPage = val;
      this.proList();
    },
    select(){
      if(this.flag){
        this.currentPage = 1;
        this.proList();
      }
    },
    delPro (id) { // 删除按钮弹窗
      this.del = true;
      this.delId = id;
    },
    modifyPre (id, ...arr) { // 修改按钮弹窗
      this.modify = true;
      this.modifyId = id;
      this.ruleForm2.productAmount = arr[0];
      this.ruleForm2.productPeriod = arr[1];
      this.ruleForm2.feeRate = arr[2];
      this.ruleForm2.dayInterest = arr[3];
      this.ruleForm2.overdueInterest = arr[4];
      this.ruleForm2.overdueMaxAmount = arr[5];
      this.ruleForm2.overdueMaxDays = arr[6];
      this.ruleForm2.canAdvanceDay = arr[7];
      // this.ruleForm2.userGrade = arr[8].split(',');
      this.ruleForm2.appPackage = arr[9];
      this.ruleForm2.minSuccessRepayments = arr[10];
      this.ruleForm2.userOverdueMaxDays = arr[11];
    },
    reset () {
      this.modify = false;
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
          this.proList();
        }else{
          this.$globalMsg.error(this.$t('idManage.no4'));
        }
        this.del = false;
      })
    }, 
    modifySure (formName) { // 修改确认操作
      if (this.flag) {
        this.flag = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let option = {
              header: {
                action: this.$store.state.actionMap.pro_add_modify,
                ...this.$base,
                sessionid: this.sessionid
              },
              method: 'edit',
              ...this.ruleForm2,
              // userGrade:this.ruleForm2.userGrade.join(','),
              id: this.modifyId
            }
            this.$axios.post('', option).then(res => {
              this.flag = true;
              if (res.data.header.code == 0) {
                this.$globalMsg.success(this.$t('idManage.no5'));
                this.proList();
                this.modify = false;
              } else {
                this.$globalMsg.error(this.$t('idManage.no6'));
              }
            })
          } else {
            this.flag = true;
            return false;
          }
        })
      }
    },
    addloans () { // 产品添加功能
      this.add = true;
    },
    addclose () {
      this.add = false;
    },
    proList () { // 获取产品列表
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
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
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
          let brr = res.data.data['user.loan.grade'];
          arr.forEach(value => {
            this.appNameOption.push({value: value.optionValue, label: value.optionValue});
            // this.options4.push({value: value.optionValue, label: value.optionValue});
            this.options3.push({value: value.optionName, label: value.optionName});
          })
          brr.forEach(value => {
            this.options.push({value: value.optionValue, label: value.optionValue});
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
    copyPro(){
      this.dialogCopyVisible = true;
      this.copyForm = {
        appPackageOld:'',
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
          this.proList();
          this.dialogCopyVisible = false;
          this.getAppBao(2);
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
    }
  },
  mounted () {
    let sessionid = sessionStorage.getItem('sessionid');
    this.sessionid = sessionid;
    this.proList();
    this.getAppName();
    this.getAppBao(1);
    this.getAppBao(2);
  }
}
</script>
<style scoped lang="scss">
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
