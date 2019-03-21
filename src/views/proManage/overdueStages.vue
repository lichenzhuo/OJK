<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('proManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('fei.no31')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------------ 横条 ------------------- -->
    <div class="paixu">
      <span></span>
      <p>{{$t('fei.no31')}}</p>
    </div>

    <!-- ------------ 搜索查询栏结束 -------------- -->
    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_OVERDUE_INSTALMENT_PRODUCT_ADD')">
      <el-button type="primary" @click="addUser">
        +{{$t('proManage.add')}}
      </el-button>
    </div>
    
    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_OVERDUE_INSTALMENT_PRODUCT_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="id" label="产品ID">
          </el-table-column>
          <el-table-column align="center" prop="returnMoneyMin" label="应还金额最小值">
          </el-table-column>
          <el-table-column align="center" prop="returnMoneyMax" label="应还金额最大值">
          </el-table-column>
          <el-table-column align="center" prop="instalment" label="分期期数">
          </el-table-column>
          <el-table-column align="center" prop="instalmentDays" label="每期天数">
          </el-table-column>
          <el-table-column align="center" prop="feeRate" label="分期手续费率">
          </el-table-column>
          <el-table-column align="center" prop="overdueType" label="应用阶段">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_OVERDUE_INSTALMENT_PRODUCT_EDIT')"
                class="table_opr"
                @click="changePro(scope.row)">
                {{$t('public.no51')}}
              </span>
              <span 
                class="table_opr" 
                @click="delPro(scope.row.id)"
                v-if="$store.state.common.permiss.includes('RIGHT_OVERDUE_INSTALMENT_PRODUCT_DEL')"
                >{{$t('idManage.del')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- ----------------------确认是否添加账号开始------------------ -->
    <el-dialog title="添加/修改" :visible.sync="addOrchange" width="600px">
      <el-form :model="ruleForm2" size="small" status-icon :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
        <el-form-item label="应还金额最小值" prop="returnMoneyMin">
            <el-input type="user" v-model="ruleForm2.returnMoneyMin" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="应还金额最大值" prop="returnMoneyMax">
            <el-input type="user" v-model="ruleForm2.returnMoneyMax" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分期期数" prop="instalment">
            <el-input type="user" v-model="ruleForm2.instalment" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="每期天数" prop="instalmentDays">
            <el-input type="user" v-model="ruleForm2.instalmentDays" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分期手续费率" prop="feeRate">
            <el-input type="user" v-model="ruleForm2.feeRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="还款手续费" prop="feeAmount">
            <el-input type="user" v-model="ruleForm2.feeAmount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('new.no12')" >
          <el-checkbox-group v-model="ruleForm2.overdueTypeList" >
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
          <el-button @click="addClose">{{$t('public.no50')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- ----------------------确认是否添加账号结束------------------- -->

    <!-- -------------- 分页显示栏开始 ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_OVERDUE_INSTALMENT_PRODUCT_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>
    <!-- -------------分页显示栏开始------------------------ -->

    <!-- ----------------------确认是否删除开始------------------ -->
    <el-dialog :title="$t('public.no48')" :visible.sync="delFlag" width="550px">
      <div class="left2right">
        <span class="left"></span>
        <span class="right">确定删除该产品吗？</span>
      </div>
      <div class="left2right mt15">
        <span class="left"></span>
        <span class="right">
          <el-button type="primary" @click="delSure">{{$t('public.no49')}}</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- ---------------------- 确认是否删除结束 ------------------- -->

    <div class="foot"></div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      tableData: [], // 用户信息数据模拟
      collectionType: [], // 催收阶段类型
      addOrchange: false, // 添加修改账号弹窗
      add: false, // 添加账号弹窗
      change: false, // 修改账号弹窗
      delFlag: false, // 修改账号弹窗
      changeId: '', // 修改目标行数对应的id
      delId: '', // 修改目标行数对应的id
      ruleForm2: {
        returnMoneyMin: '',
        returnMoneyMax: '',
        instalment: '',
        instalmentDays: '',
        feeRate: '',
        feeAmount: '',
        overdueTypeList: []
      },
      rules: {
        returnMoneyMin: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        returnMoneyMax: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        instalment: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        instalmentDays: [
          { required: true, message: this.$t('login.required'), trigger: 'change' }
        ],
        feeRate: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        feeAmount: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ],
        collectionTypes: [
          { required: true, message: this.$t('login.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页当前页下标
      this.currentPage = val;
      this.getTableList();
    },
    changePro (row) { // 修改按钮弹窗
      this.modifyId = row.id;
      this.ruleForm2.returnMoneyMin = row.returnMoneyMin;
      this.ruleForm2.returnMoneyMax = row.returnMoneyMax;
      this.ruleForm2.instalment = row.instalment;
      this.ruleForm2.instalmentDays = row.instalmentDays;
      this.ruleForm2.feeRate = row.feeRate;
      this.ruleForm2.feeAmount = row.feeAmount;
      this.ruleForm2.overdueTypeList = row.overdueTypeList;
      this.modify = true;
    },
    submitForm (formName) {
      let option = {
        header: {
          action: this.$store.state.actionMap.PRODUCT0016,
          ...this.$base,
          sessionid: this.sessionid
        },
        id: this.change?this.changeId:undefined,
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
            this.getTableList();
          })
        } else {
          return false;
        }
      })
    },
    addUser () { // 添加账号开关
      this.add = true;
    },
    getTableList () { // 获取列表数据
      let option = {
        header: {
          action: this.$store.state.actionMap.PRODUCT0015,
          ...this.$base,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    addClose () {
      this.add = false;
      this.change = false;
      this.$refs.ruleForm2.resetFields();
      this.ruleForm2 = {
        returnMoneyMin: '',
        returnMoneyMax: '',
        instalment: '',
        instalmentDays: '',
        feeRate: '',
        feeAmount: '',
        overdueTypeList: []
      }
    },
    getcollectionType(){ // 获取催收阶段
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'overdue.type'
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.collectionType = arr;
        }
      })
    },
    delPro (id) { // 删除按钮弹窗
      this.delFlag = true;
      this.delId = id;
    },
    delSure(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PRODUCT0017,
          'sessionid': this.sessionid
        },
        id: this.delId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('idManage.no3'));
          this.getTableList();
        }else{
          this.$globalMsg.error( res.data.header.msg);
        }
        this.delFlag = false;
      })
    }
  },
  watch: {
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableList();// 获取账号列表
    this.getcollectionType();// 获取催收阶段
  }
}
</script>
<style scoped lang="scss">
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
