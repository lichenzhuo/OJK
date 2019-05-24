<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('add.no44')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('add.no45')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table">
      <template>
        <el-table :data="tableData" size="small" >
          <el-table-column align="center" prop="strLoanTime" label="ID">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="规则集">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="执行顺序">
            <template slot-scope="scope">
              <el-input type="number"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="是否启用">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="条件1">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="阈值1">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="逻辑关系">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="条件2">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="阈值2">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="逻辑关系">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="条件3">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="阈值3">
          </el-table-column>
          <el-table-column align="center" prop="strLoanTime" label="禁言天数">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" label="操作">
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

    <el-dialog title="查看并修改" :visible.sync="detailFlag" width="95%">
      <table>
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
            风控地区风控地区风控地区风控地区
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
              <el-radio label="reject" ></el-radio>
              <el-radio label="pass"></el-radio>
              <el-radio label="Transfer"></el-radio>
            </el-radio-group>
          </td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>
            <el-input type="number" size="small" style="width:80px" v-model="notTalking"></el-input>
          </td>
        </tr>
      </table>
      <div class="button">
        <el-button type="primary" >确认</el-button>
        <el-button type="primary" >取消</el-button>
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
      detailFlag: true,
      sequence: '',// 顺序
      isUsing: false,// 是否启用
      result: '',// 结果
      notTalking: '',// 结果
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.getTableData();
    },
    getTableData () { // 获取首逾率列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.first_rate,
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
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    // this.getTableData()
  }
}
</script>
<style scoped lang="scss">
  .ruletable{
    width: 100%;
  }
  table{
    margin-bottom: 1em;
    overflow: auto;
    box-sizing: border-box;
    display: block;
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
  table label.el-radio{
    margin-right: 10px;
  }
</style>
