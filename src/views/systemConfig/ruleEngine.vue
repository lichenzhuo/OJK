<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('add.no44')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('add.no45')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_RULE_ENGINE_LIST')">
      <template>
        <el-table :data="tableData" size="small" >
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
          <el-table-column fixed="right" align="center" prop="operation" label="操作">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_RULE_ENGINE_EDIT')"
                class="table_opr"
                @click="modifyRule(scope.row)">
                修改
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <!-- <el-row type="flex" justify="end">
      <div class="pages">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row> -->
    
    <el-dialog title="查看并修改" :visible.sync="detailFlag" width="95%" top="30vh">
      <div class="box">
        <table class="box">
          <tr>
            <th>规则集</th>
            <th>执行顺序</th>
            <th>是否启用</th>
            <th>结果</th>
            <th>条件1</th>
            <th>阈值1</th>
            <th>逻辑关系</th>
            <th>条件2</th>
            <th>阈值2</th>
            <th>逻辑关系</th>
            <th>条件3</th>
            <th>阈值3</th>
            <th>禁言天数</th>
          </tr>
          <tr >
            <td >
              {{detailData.ruleType}}
            </td>
            <td >
              <el-input type="number" size="small" style="width:60px" v-model="sequence"></el-input>
            </td>
            <td >
              <el-switch
                v-model="isUsing"
                active-color="#13ce66"
                inactive-color="#dddddd">
              </el-switch>
            </td>
            <td class="nowrap">
              <el-radio-group v-model="result" size="small">
                <el-radio :label="-1" >reject</el-radio>
                <el-radio :label="2">pass</el-radio>
                <el-radio :label="1">Transfer</el-radio>
              </el-radio-group>
            </td>
            <td>{{detailData.conditionOne}}</td>
            <td>{{detailData.thresholdOne}}</td>
            <td>{{detailData.logicRelationOne}}</td>
            <td>{{detailData.conditionTwo}}</td>
            <td>{{detailData.thresholdTwo}}</td>
            <td>{{detailData.logicRelationTwo}}</td>
            <td>{{detailData.conditionThree}}</td>
            <td>{{detailData.thresholdThree}}</td>
            <td>
              <el-input type="number" size="small" style="width:80px" v-model="notTalking"></el-input>
            </td>
          </tr>
        </table>
      </div>
      
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
      pageTotal: 0,
      // 当前页下标
      currentPage: 1,
      // 用户信息数据模拟
      tableData:[],
      detailFlag: false,
      sequence: '',// 顺序
      isUsing: false,// 是否启用
      result: '',// 结果
      notTalking: '',// 结果
      detailData:{},
      options1: [
        {id: 1, label: 'OCR地址', value: 1},
        {id: 2, label: '居住地', value: 2},
        {id: 3, label: 'GPS地址', value: 3},
        {id: 4, label: '工作地', value: 4},
      ]
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
    modifyRule(row){
      this.detailData = row;
      this.isUsing = row.status==1?true:false;
      this.sequence = row.executeSort;
      this.notTalking = row.exceuteLimit;
      this.result = row.executeResult;
      this.detailFlag = true;
    },
    submit(){
      if(this.result==''&&this.notTalking==''&&this.sequence==''){
        return this.$globalMsg.error('必须选择一个条件');
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0002,
          'sessionid': this.sessionid
        },
        id: this.detailData.id,
        status: this.isUsing?'1':'-1',
        executeResult: this.result,
        exceuteLimit: this.notTalking,
        executeSort: this.sequence,
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
      this.sequence = '';
      this.isUsing = false;
      this.result = '';
      this.notTalking = '';
    },
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
    this.getTableData()
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
