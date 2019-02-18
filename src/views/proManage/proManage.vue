<template>
  <div class="userSuggest">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('proManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('proManage.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- ------------------ 横条 ------------------- -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('proManage.title')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search">
      <el-row type="flex" justify="start" align="middle">
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no48')}}:</span>
            <el-select size="small" clearable v-model="formInline.appName" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no49')}}:</span>
            <el-select size="small" clearable v-model="formInline.appPackage" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in appNameOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search" >
      <el-row type="flex" justify="start" align="middle" :gutter="10">
        <el-col :span="3" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_ADD')">
          <div  class="search-add" @click="addloans">
            +{{$t('proManage.add')}}
          </div>
        </el-col>
        <el-col :span="3" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_COPY')">
          <div class="search-add" @click="copyPro">
            {{$t('proManage.copyPro')}}
          </div>
        </el-col>
        <el-col :span="3" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_PACKAGEADD')">
          <div class="search-add" @click="addBao">
            {{$t('proManage.addBao')}}
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe >
          <el-table-column align="center" prop="id" :label="$t('proManage.id')" width="100">
          </el-table-column>
          <el-table-column align="center" prop="productAmount" :label="$t('proManage.amount')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.productAmount!==null&&scope.row.productAmount!==undefined&&scope.row.productAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.productAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productPeriod" :label="$t('proManage.period')+'('+$t('public.no26')+')'" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="feeRate" :label="$t('proManage.feeRate')"  min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.feeRate!==null&&scope.row.feeRate!==undefined">{{$store.getters.twoPoint(scope.row.feeRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="dayInterest" :label="$t('proManage.dayInterest')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.dayInterest!==null&&scope.row.dayInterest!==undefined">{{$store.getters.twoPoint(scope.row.dayInterest)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueInterest" :label="$t('proManage.overdueInterest')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueInterest!==null&&scope.row.overdueInterest!==undefined&&scope.row.overdueInterest!==''">{{$store.getters.twoPoint(scope.row.overdueInterest)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueMaxAmount" :label="$t('proManage.overdueMaxAmount')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.overdueMaxAmount!==null&&scope.row.overdueMaxAmount!==undefined&&scope.row.overdueMaxAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.overdueMaxAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueMaxDays" :label="$t('proManage.overdueMaxDays')+'('+$t('public.no26')+')'" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="canAdvanceDay" :label="$t('proManage.canAdvanceDay')+'('+$t('public.no26')+')'" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="userGrade" :label="$t('proManage.userGrade')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.userGrade!==null&&scope.row.userGrade!==undefined&&scope.row.userGrade!==''">{{scope.row.userGrade}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="appPackage" :label="$t('new.no49')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="130">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_EDIT')"
                style="color:#547ef6;cursor:pointer;margin:0 5px;" 
                @click="modifyPre(scope.row.id,scope.row.productAmount,scope.row.productPeriod,scope.row.feeRate,scope.row.dayInterest,scope.row.overdueInterest,scope.row.overdueMaxAmount,scope.row.overdueMaxDays,scope.row.canAdvanceDay,scope.row.userGrade,scope.row.appPackage)">
              {{$t('public.no29')}}/{{$t('public.no51')}}
              </span>
              <span 
                style="color:#547ef6;cursor:pointer;margin:0 5px;" 
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
    <div v-if="del" class="del">
      <div class="del-main">
        <div class="del-main-head">
          <span></span>
          <p>{{$t('public.no48')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="del=false"></i>
        </div>
        <div class="del-main-con">
          <div class="del-con-one">确定删除该产品吗？</div>
          <div class="del-but">
            <div class="del-but-1" @click="delSure()">{{$t('public.no49')}}</div>
            <div class="del-but-1 active" @click="del=false">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------确认是否删除结束------------------- -->
    
    <!-- ----------------------添加修改产品开始------------------ -->
    <div v-if="add" class="del">
      <div class="del-main">
        <div class="del-main-head">
          <span></span>
          <p>{{$t('proManage.add')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="add=false"></i>
        </div>
        <div class="del-main-con">
          <addpro :addclose="addclose" :pro-list="proList" :user-greade-option="options" :app-name-option="appNameOption"></addpro>
        </div>
      </div>
    </div>
    <!-- ----------------------确认是否上架结束------------------- -->

    <!-- ------------------确认是否修改开始-------------------- -->
    <div v-if="modify" class="modify">
      <div class="modify-main">
        <div class="modify-main-head">
          <span></span>
          <p>{{$t('public.no29')}}/{{$t('public.no51')}}{{$t('proManage.product')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="modify=false"></i>
        </div>
        <div class="modify-main-con">
          <div class="modify-con">
            <el-form class="demo-ruleForm" size="mini" label-position="left" ref="ruleForm2" :rules="rules" label-width="110px" :model="ruleForm2">
              <el-form-item :label="$t('new.no48')" prop="userGrade">
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
              <el-form-item :label="$t('proManage.userGrade')" prop="userGrade">
                <el-checkbox-group v-model="ruleForm2.userGrade">
                  <div class="types">
                    <ul>
                      <li v-for="value in options" :key="value.value">
                        <el-checkbox :label="value.value"><span>{{value.label}}</span></el-checkbox>
                      </li>
                    </ul>
                  </div>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="modifySure('ruleForm2')">{{$t('public.no41')}}</el-button>
                  <el-button @click="reset">{{$t('public.no50')}}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- <div class="modify-but">
            <div class="modify-but-1" @click="modifySure">确认</div>
            <div class="modify-but-1 active" @click="modify=false">取消</div>
          </div> -->
        </div>
      </div>
    </div>
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
        overdueMaxAmount: [
          { validator: validateFloat, trigger: 'blur' }
        ],
        overdueMaxDays: [
          { validator: validateNumber, trigger: 'blur' }
        ],
        canAdvanceDay: [
          { validator: validateNumber, trigger: 'blur' }
        ],
        userGrade: [
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
      this.currentPage = val
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_list,
          'page': {'index': val, 'size': 10},
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
        }
      })
    },
    select(){
      if(this.flag){
        this.proList();
      }
    },
    delPro (id) { // 删除按钮弹窗
      this.del = true
      this.delId = id
    },
    modifyPre (id, ...arr) { // 修改按钮弹窗
      this.modify = true
      this.modifyId = id
      this.ruleForm2.productAmount = arr[0]
      this.ruleForm2.productPeriod = arr[1]
      this.ruleForm2.feeRate = arr[2]
      this.ruleForm2.dayInterest = arr[3]
      this.ruleForm2.overdueInterest = arr[4]
      this.ruleForm2.overdueMaxAmount = arr[5]
      this.ruleForm2.overdueMaxDays = arr[6]
      this.ruleForm2.canAdvanceDay = arr[7]
      this.ruleForm2.userGrade = arr[8].split(',')
      this.ruleForm2.appPackage = arr[9]
    },
    reset () {
      this.modify = false
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
          this.$globalMsg.success(this.$t('idManage.no3'))
          this.proList()
        }else{
          this.$globalMsg.error(this.$t('idManage.no4'))
        }
        this.del = false
      })
    }, 
    modifySure (formName) { // 修改确认操作
      if (this.flag) {
        this.flag = false
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
              userGrade:this.ruleForm2.userGrade.join(','),
              id: this.modifyId
            }
            this.$axios.post('', option).then(res => {
              this.flag = true
              if (res.data.header.code == 0) {
                this.$globalMsg.success(this.$t('idManage.no5'))
                this.proList()
                this.modify = false
              } else {
                this.$globalMsg.error(this.$t('idManage.no6'))
              }
            })
          } else {
            this.flag = true
            return false
          }
        })
      }
    },
    pushSure () { // 上架确认操作

    },
    addloans () { // 产品添加功能
      this.add = true
    },
    addclose () {
      this.add = false
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
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
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
          let arr = res.data.data.package
          let brr = res.data.data['user.loan.grade']
          arr.forEach(value => {
            this.appNameOption.push({value: value.optionValue, label: value.optionValue})
            // this.options4.push({value: value.optionValue, label: value.optionValue})
            this.options3.push({value: value.optionName, label: value.optionName})
          })
          brr.forEach(value => {
            this.options.push({value: value.optionValue, label: value.optionValue})
          })
          console.log(this.options)
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
          this.$globalMsg.success(this.$t('message.success'))
          this.proList()
          this.dialogCopyVisible = false;
          this.getAppBao(2)
        } else {
          this.$globalMsg.error(this.$t('idManage.err'))
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
          this.$globalMsg.success(this.$t('message.success'))
          this.getAppBao(2)
          this.dialogAddVisible = false;
        } else {
          this.$globalMsg.error(this.$t('idManage.err'))
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
              this.copyOption1.push({value:value,label:value})
            })
          }
          if(type==2){
            res.data.data.forEach(value=>{
              this.copyOption2.push({value:value,label:value})
            })
          }
        }
      })
    }
  },
  mounted () {
    let sessionid = sessionStorage.getItem('sessionid')
    this.sessionid = sessionid
    this.proList()
    this.getAppName()
    this.getAppBao(1)
    this.getAppBao(2)
  }
}
</script>
<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}
.userSuggest {
  width: 100%;
  height: auto;
  padding: 20px 30px;
  background-color: rgba(246, 249, 252, 1);
  position: relative;
}
.paixu {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: rgba(224, 229, 246, 1);
  border-radius: 4px;
  span {
    display: block;
    float: left;
    margin-top: 10px;
    background-color: rgba(84, 126, 245, 1);
    width: 4px;
    height: 30px;
    border-radius: 5px;
  }
  p {
    color: rgba(84, 126, 245, 1);
    font-size: 16px;
    margin-left: 20px;
  }
  
}
.search {
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  margin-top: 18px;
  margin-bottom: 22px;
  padding: 22px 28px 22px 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  .search-add{
    width: 114px;
    height: 100%;
    border: 1px solid #547ef6;
    border-radius:5px;
    text-align: center;
    line-height: 36px;
    color:#547ef5;
    margin-left: 30px;
    cursor:pointer;
  }
  .search-input {
    height: 50px;
    display: flex;
    align-items: center;
    // margin-right: 10px;
    & > span {
      padding: 0 5px;
      font-size: 14px;
      white-space: nowrap;
      @include flex-cen;
    }
    .el-input {
      flex: auto;
      @include flex-cen;
    }
    .el-date-editor {
      margin: 0 5px;
    }
    .el-select {
      flex: auto;
      @include flex-cen;
    }
    .el-button--primary{
      height: 40px;
      
    }
    .button-color{
      background-color: #1D7BFF;
      border-color: #547ef6;
    }
  }
}

.table {
  width: 100%;
  min-height: 530px;
}

.pro-imglist{
  width: 100px;
  height: 68px;
  margin: 0 auto;
}


.del{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  z-index: 100;
  background-color: rgba(182, 189, 205, 0.6);
  .del-main{
    width: 474px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .del-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .del-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .del-con-one{
        width: 100%;
        height: 40px;
        padding-top: 10px;
        color: #6b7283;
        font-size: 16px;
        text-align: center;
        margin: 30px 0;
      }
      .del-con-two{
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
        
      }
      .del-but{
        width: 260px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .del-but-1{
          width: 45%;
          height: 100%;
          background-color: #547ef5;
          border-radius: 5px;
          text-align: center;
          line-height: 38px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
        .active{
          background-color: #ebeef6;
          color: #333;
        }
      }
    }
  }
}

.modify{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .modify-main{
    width: 474px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom: 10px;
    .modify-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .modify-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .modify-con{
        width: 100%;
        color: #6b7283;
        font-size: 14px;
      }
      .modify-con-two{
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
      }
      .modify-but{
        width: 260px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .modify-but-1{
          width: 45%;
          height: 100%;
          background-color: #547ef5;
          border-radius: 5px;
          text-align: center;
          line-height: 38px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
        .active{
          background-color: #ebeef6;
          color: #333;
        }
      }
    }
  }
}

.reply{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main{
    width: 694px;
    height: 290px;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .reply-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .reply-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .reply-con-one{
        width: 100%;
        height: 40px;
        padding-top: 10px;
        color: #6b7283;
        font-size: 14px;
      }
      .reply-con-two{
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
        textarea{
          width: 100%;
          height: 100%;
          padding: 10px;
          font-size: 14px;
          background-color: #f4f6fb;
          color: #000;
        }
      }
      .reply-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 0 auto;
        text-align: center;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
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
