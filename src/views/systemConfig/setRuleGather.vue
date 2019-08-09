<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('add.no44')}}</el-breadcrumb-item>
        <el-breadcrumb-item>配置规则集</el-breadcrumb-item>
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
          <span>结果:</span>
          <el-select size="small" clearable v-model="formInline.executeResult" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input ml15">
          <el-button type="primary" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>
    

    <div class="list_operation" >
      <el-button 
        type="primary" 
        @click="showDetail">
        +配置规则集
      </el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <!-- v-if="$store.state.common.permiss.includes('RIGHT_RULE_ENGINE_LIST')" -->
    <div class="table" >
      <el-table :data="tableData" size="small" @selection-change="handleSelectionChange">
        <el-table-column type="selection"  width="55">
        </el-table-column>
        <el-table-column align="center" prop="id" label="ID">
        </el-table-column>
        <el-table-column align="center" prop="ruleType" label="规则集">
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
            <span >{{scope.row.executeResult==1?'Transfer':scope.row.executeResult==2?'pass':scope.row.executeResult==-1?'reject':''}}</span>
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
      </el-table>
    </div>


    
    <el-dialog title="查看并修改" :visible.sync="detailFlag" width="600" >
      <h3 style="margin-top:-20px;margin-bottom:20px;">请选择使用规则集</h3>
      <el-checkbox-group v-model="ruleSelect" >
        <div class="types">
          <ul>
            <li v-for="(item,i) in ruleSetList" :key="i">
              <el-checkbox :label="item.value">
                <span>{{item.label}}</span>
              </el-checkbox>
            </li>
          </ul>
        </div>
      </el-checkbox-group>
      <div style="height:40px;"></div>
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
  name: 'ruleGather',
  data () {
    return {
      flag: true,
      sessionid: '',
      formInline: {// 查询信息数据对应字段
        id: '',
        ruleName: '',
        executeResult: '',
      },
      tableData: [],
      detailFlag: false,
      detailData: {},
      options6: [
        {label:'请选择',value:''},
        {id:1,label:'Reject',value:-1},
        {id:2,label:'Pass',value:2},
        {id:3,label:'Transfer',value:1},
      ],
      tableSelection: {},
      ruleNameList: [],
      ruleSetList: [],
      ruleSelect: [],
    }
  },
  methods: {
    handleSelectionChange (val) { // 表格选中项数据
      this.tableSelection = val.map(value=>{
        return value = value.id
      })
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
    submit(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0008,
          'sessionid': this.sessionid
        },
        ruleIds: this.tableSelection,
        ruleSetIds: this.ruleSelect,
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
      this.detailFlag = false;
      this.tableSelection = [];
      this.ruleSelect = [];
    },
    showDetail(){
      this.detailFlag = true;
    },
    select(){
      this.getTableData()
    },
    getRuleNameList(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0004,
          'sessionid': this.sessionid
        },
        id: this.detailData.id,
      }
      this.$axios.post('',option).then(res=>{
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.ruleSetName;
            value.value = value.id;
          })
          this.ruleSetList = arr;
        }
      })
    }
  },
  watch: {
    detailFlag(){
      if(!this.detailFlag){
        this.detailClose()
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.getTableData();
    this.getRuleNameList();
    
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
        // width: 56px;
        margin-right: 20px;
      }
    }
  }
</style>
