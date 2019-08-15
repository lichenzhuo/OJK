<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('add.no44')}}</el-breadcrumb-item>
        <el-breadcrumb-item>规则引擎</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>规则集ID:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.id"></el-input>
        </div>
        <div class="search-input">
          <span>状态:</span>
          <el-select size="small" clearable v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>用户类型:</span>
          <el-select size="small" clearable v-model="formInline.loanUserType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>用户等级:</span>
          <el-select size="small" clearable v-model="formInline.userLoanGrade" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in userGradeAllOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input ml15">
          <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>

    <div class="list_operation" >
      <el-button 
        type="primary" 
        @click="showAdd">
        +创建规则集
      </el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" >
      <template>
        <el-table :data="tableData" size="small" >
          <el-table-column align="center" prop="id" label="规则集ID">
          </el-table-column>
          <el-table-column align="center" prop="ruleSetName" label="规则集名称">
          </el-table-column>
          <el-table-column align="center" prop="userType" label="用户类型">
            <template slot-scope="scope">
              <span>{{scope.row.userType==1?'新客':scope.row.userType==2?'老客':''}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="userLoanGradeSet" label="对应用户等级">
          </el-table-column>
          <el-table-column align="center" prop="status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status==1?'启用':scope.row.status==-1?'关闭':''}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="onStatusCount" label="启用规则条数">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" label="操作" min-width="160">
            <template slot-scope="scope">
              <span 
                
                class="table_opr"
                @click="showModify(scope.row.id,scope.row.userLoanGradeSet,scope.row.ruleSetName,scope.row.userType)">
                修改
              </span>
              <span 
                class="table_opr"
                @click="jumpAddRule(scope.row.id,scope.row.ruleSetName)">
                添加规则
              </span>
              <span class="table_opr"
                @click="jumpDetailRule(scope.row.id,scope.row.ruleSetName)">
                查看规则
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    
    <el-dialog title="添加/修改" :visible.sync="dialogFlag" width="560" top="20vh">
      <el-form :model="ruleForm" size="small" ref="ruleForm" label-width="130px">
        <el-form-item label="规则集名称">
          <el-input v-model="ruleForm.ruleSetName"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-radio-group v-model="ruleForm.userType">
            <el-radio :label="1">新客</el-radio>
            <el-radio :label="2">老客</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户等级" v-if="ruleForm.userType==2">
          <el-checkbox-group v-model="ruleForm.userLoanGrades" v-if="isAddFlag" >
            <div class="types">
              <ul>
                <li v-for="(item,i) in userGradeOptions" :key="i">
                  <el-checkbox :label="item.value" disabled @change="getCheckboxChange(item.value)"></el-checkbox>
                </li>
              </ul>
            </div>
          </el-checkbox-group>
          <el-checkbox-group v-model="ruleForm.userLoanGrades" v-if="isModifyFlag">
            <div class="types">
              <ul>
                <li v-for="(item,i) in userGradeOptions" :key="i">
                  <el-checkbox :label="item.value" :disabled="item.disabled" @change="getCheckboxChange(item.value)"></el-checkbox>
                </li>
              </ul>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户等级" v-if="ruleForm.userType==1">
          <el-checkbox-group v-model="ruleForm.userLoanGrades" v-if="isAddFlag" >
            <div class="types">
              <ul>
                <li v-for="(item,i) in userGradeNewOptions" :key="i">
                  <el-checkbox :label="item.value" disabled @change="getCheckboxChange(item.value)"></el-checkbox>
                </li>
              </ul>
            </div>
          </el-checkbox-group>
          <el-checkbox-group v-model="ruleForm.userLoanGrades" v-if="isModifyFlag">
            <div class="types">
              <ul>
                <li v-for="(item,i) in userGradeNewOptions" :key="i">
                  <el-checkbox :label="item.value" :disabled="item.disabled" @change="getCheckboxChange(item.value)"></el-checkbox>
                </li>
              </ul>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <p class="pl120 red" v-for="(item,i) in userTypeLabel" :key="i">
          {{item.userLoanGrade}} 原执行规则集 {{item.ruleSetName}};
        </p>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="submit">确认</el-button>
        <el-button type="primary" @click="detailClose">取消</el-button>
      </div>
    </el-dialog>

    <div class="foot"></div>

  </div>
</template>

<script>
export default {
  name: 'ruleEngine',
  data () {
    return {
      flag: true,
      sessionid: '',
      formInline: {// 查询信息数据对应字段
        id: '',
        status: '',
        userLoanGrade: '',
        loanUserType: '',
      },
      tableData: [],
      detailFlag: false,
      options1: [
        {label:'请选择',value:''},
        {id:1,label:'启用',value:1},
        {id:-1,label:'关闭',value:-1},
      ],
      options2: [
        {label:'请选择',value:''},
        {id:1,label:'新客',value:1},
        {id:2,label:'老客',value:2},
      ],
      options3: [],
      userGradeOptions: [],
      userGradeNewOptions: [],
      userGradeAllOptions: [],
      dialogFlag: false,// 添加修改弹窗
      ruleForm: {
        id: '',
        ruleSetName: '',
        userType: '',
        userLoanGrades: [],
      },
      isAddFlag: false,
      isModifyFlag: false,
      isDisabled: false,
      userTypeLabel: []
    }
  },
  methods: {
    getTableData () { // 获取列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0004,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data;
        }
      })
    },
    submit(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0005,
          'sessionid': this.sessionid
        },
        ...this.ruleForm
      }
      this.$axios.post('',option).then(res=>{
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
          this.getTableData();
          this.detailClose();
        } else {
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    },
    detailClose(){
      this.dialogFlag = false;
      this.isModifyFlag = false;
      this.isAddFlag = false;
      this.ruleForm.id = '';
      this.ruleForm.ruleSetName = '';
      this.ruleForm.userType = '';
      this.ruleForm.userLoanGradeSet = '';
      this.userTypeLabel = [];
      this.userGradeOptions.forEach(item=>{
          item.disabled = false;
      })
      this.userGradeNewOptions.forEach(item=>{
          item.disabled = false;
      })
    },
    showAdd(){
      this.isAddFlag = true;
      this.dialogFlag = true;
    },
    showModify(id,userLoanGradeSet,ruleSetName,userType){
      this.ruleForm.id = id;
      this.ruleForm.ruleSetName = ruleSetName;
      this.ruleForm.userType = userType;
      this.ruleForm.userLoanGrades = userLoanGradeSet?userLoanGradeSet.split(','):[];
      let haveGrade = userLoanGradeSet?userLoanGradeSet.split(','):[]
      if(userType==2){
        this.userGradeOptions.forEach(item=>{
          if(haveGrade.includes(item.value)){
            item.disabled = true;
          }
        })
      }
      if(userType==1){
        this.userGradeNewOptions.forEach(item=>{
          if(haveGrade.includes(item.value)){
            item.disabled = true;
          }
        })
      }
      
      
      this.isModifyFlag = true;
      this.dialogFlag = true;
    },
    jumpAddRule(ruleSetId,ruleSetName){
      this.$router.push({
        path: '/AddRuleEngine',
        query: {
          ruleSetId,ruleSetName
        }
      })
    },
    jumpDetailRule(ruleSetId,ruleSetName,updateTime,isExcute){
      this.$router.push({
        path: '/ruleDetailList',
        query: {
          ruleSetId,ruleSetName,updateTime,isExcute
        }
      })
    },
    getsexStatus () { // 获取app名字和包名
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
          'sessionid': this.sessionid
        },
        optionGroup:'sex'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName;
            value.value = value.optionName;
          })
          this.options2 = arr;
        }
      })
    },
    select(){
      this.getTableData()
    },
    getsuerGrade () { // 获取用户等级
      this.userGradeOptions = [];
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0009,
          'sessionid': this.sessionid
        },
        userType: 2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.userLoanGrade;
            value.value = value.userLoanGrade;
            value.disabled = false;
          })
          this.userGradeOptions = arr;
        }
      })
    },
    getsuerGradeAll () { // 获取用户等级
      this.userGradeOptions = [];
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0009,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.userLoanGrade;
            value.value = value.userLoanGrade;
            value.disabled = false;
          })
          this.userGradeAllOptions = arr;
        }
      })
    },
    getsuerGradeNew () { // 获取用户等级
      this.userGradeOptions = [];
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0009,
          'sessionid': this.sessionid
        },
        userType: 1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.userLoanGrade;
            value.value = value.userLoanGrade;
            value.disabled = false;
          })
          this.userGradeNewOptions = arr;
        }
      })
    },
    getCheckboxChange(){
      // console.log(value)
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0010,
          'sessionid': this.sessionid
        },
        ruleSetId: this.ruleForm.id,
        userLoanGrades: this.ruleForm.userLoanGrades
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          if(res.data.data){
            // res.data.data.map(value=>{

            // })
            this.userTypeLabel = res.data.data
            // this.userTypeLabel+=`${value} 原执行规则集 "${res.data.data[0].ruleSetName}";<br>`
          }
        }
      })
    }
  },
  watch: {
    dialogFlag(){
      if(!this.dialogFlag){
        this.detailClose()
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.getTableData();
    this.getsuerGrade();
    this.getsuerGradeAll();
    this.getsuerGradeNew();
    
  }
}
</script>

<style scoped lang="scss">
  .ruletable{
    width: 100%;
  }
  .box{
    width: 100%;
  }
  table{
    margin-bottom: 1em;
    overflow: auto;
    box-sizing: border-box;
    display: table;
    text-shadow: 0px 1px 0px #fff;
    border-collapse: collapse;
    border-spacing: 0;
    color: #292e31;
    font-size: 14px;
    tr:last-child {
        border-bottom: 1px solid #ccc;
    }
    tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }
    th {
        padding: 5px 10px;
        border-bottom: 1px solid #ccc;
        vertical-align: bottom;
        line-height: 1.6;
        text-align: left;
        font-weight: bold;
        display: table-cell;
    }
    tr:nth-child(odd)>td {
        background-color: #f8f8f8;
    }
    td.nowrap {
        word-break: keep-all;
        white-space: nowrap;
    }
    td{
        display: table-cell;
        padding: 10px;
        vertical-align: top;
        line-height: 1.6;
    }
  }
  table label.el-radio {
    margin-right: 10px;
  }
  .button {
    display: flex;
    justify-content: center;
    button: {
      margin: 0 20px;
    }
  }
  .types{
    width: 100%;
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 56px;
        margin-right: 20px;
      }
    }
  }
  .pl120{
    padding-left: 120px;
    margin-bottom: 16px;
  }
</style>
