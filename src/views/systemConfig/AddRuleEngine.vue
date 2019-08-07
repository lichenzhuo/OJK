<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('add.no44')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/ruleList'}">规则引擎</el-breadcrumb-item>
        <el-breadcrumb-item>添加到规则集</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>规则ID:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.id"></el-input>
        </div>
        <div class="search-input">
          <span>规则名称:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.ruleName"></el-input>
        </div>
        <div class="search-input">
          <span>状态:</span>
          <el-select size="small" clearable v-model="formInline.configStatus" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>结果:</span>
          <el-select size="small" clearable v-model="formInline.executeResult" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
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
        添加至-{{ruleSetName}}
      </el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_RULE_ENGINE_LIST')">
      <template>
        <el-table :data="tableData" size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection" :selectable="unSelect" width="55">
          </el-table-column>
          <el-table-column align="center" prop="id" label="ID">
          </el-table-column>
          <el-table-column align="center" prop="ruleType" label="规则名称">
          </el-table-column>
          <el-table-column align="center" prop="executeSort" label="执行顺序">
          </el-table-column>
          <el-table-column align="center" prop="status" label="是否启用">
            <template slot-scope="scope">
              <span >{{scope.row.status==1?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="executeResult" label="执行结果">
            <template slot-scope="scope">
              <span >{{scope.row.executeResult==1?'Transfer':scope.row.executeResult==2?'Pass':scope.row.executeResult==-1?'Reject':''}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="conditionOne" label="条件1">
          </el-table-column>
          <el-table-column align="center" prop="thresholdOne" label="阈值1">
          </el-table-column>
          <el-table-column align="center" prop="logicRelationOne" label="逻辑关系">
          </el-table-column>
          <el-table-column align="center" prop="conditionTwo" label="条件2">
          </el-table-column>
          <el-table-column align="center" prop="thresholdTwo" label="阈值2">
          </el-table-column>
          <el-table-column align="center" prop="logicRelationTwo" label="逻辑关系">
          </el-table-column>
          <el-table-column align="center" prop="conditionThree" label="条件3">
          </el-table-column>
          <el-table-column align="center" prop="thresholdThree" label="阈值3">
          </el-table-column>
          <el-table-column align="center" prop="exceuteLimit" label="禁言天数">
          </el-table-column>
          <!-- <el-table-column fixed="right" align="center" prop="operation" label="操作">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_RULE_ENGINE_EDIT')"
                class="table_opr"
                @click="modifyRule(scope.row)">
                修改
              </span>
            </template>
          </el-table-column> -->
        </el-table>
      </template>
    </div>

    <el-dialog title="添加/修改" :visible.sync="dialogFlag" width="560" top="20vh">
      <p class="mb20">您已选中{{tableSelect.length}}条规则，配置到{{ruleSetName}}</p>
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
  name: 'AddRuleEngine',
  data () {
    return {
      flag: true,
      sessionid: '',
      ruleSetName: '',
      formInline: {// 查询信息数据对应字段
        id: '',
        ruleName: '',
        executeResult: '',
        ruleSetId: '',
        configStatus: '',
      },
      tableData: [],
      options1: [
        {label:'请选择',value:''},
        {id:1,label:'已配置',value:1},
        {id:0,label:'未配置',value:0},
      ],
      options2: [
        {label:'请选择',value:''},
        {id:1,label:'Reject',value:-1},
        {id:2,label:'Pass',value:2},
        {id:3,label:'Transfer',value:1},
      ],
      options3: [],
      userGradeOptions: [],
      tableSelect:[],
      dialogFlag: false,
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.getTableData();
    },
    getTableData () { // 获取列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0001,
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
    select(){
      this.getTableData()
    },
    handleSelectionChange (val) {
      this.tableSelect = val.map(value=>{
        return value = value.id
      })
    },
    unSelect (row) {
      return row.configStatus == 0;
    },
    showAdd(){
      this.dialogFlag = true;
    },
    submit(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0008,
          'sessionid': this.sessionid
        },
        ruleIds:this.tableSelect,
        ruleSetIds:[this.formInline.ruleSetId]
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
    }
  },
  watch: {
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.formInline.ruleSetId = this.$route.query.ruleSetId;
    this.ruleSetName = this.$route.query.ruleSetName;
    this.getTableData();
    
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
</style>
