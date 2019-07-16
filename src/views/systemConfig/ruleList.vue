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
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>规则集ID:</span>
            <el-input size="small" label="phone" v-model="formInline.id"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>是否启用:</span>
          <el-select size="small" clearable v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>用户类型:</span>
          <el-select size="small" clearable v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>用户等级:</span>
          <el-select size="small" clearable v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input ml15">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
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
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_RULE_ENGINE_LIST')">
      <template>
        <el-table :data="tableData" size="small" >
          <el-table-column align="center" prop="id" label="规则集ID">
          </el-table-column>
          <el-table-column align="center" prop="ruleType" label="规则集名称">
          </el-table-column>
          <el-table-column align="center" prop="executeSort" label="用户类型">
          </el-table-column>
          <el-table-column align="center" prop="executeSort" label="对应用户等级">
          </el-table-column>
          <el-table-column align="center" prop="executeSort" label="状态">
          </el-table-column>
          <el-table-column align="center" prop="executeSort" label="启用规则条数">
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
    
    <el-dialog title="添加/修改" :visible.sync="dialogFlag" width="560" top="20vh">
      <el-form :model="ruleForm" size="small" ref="ruleForm" label-width="130px">
        <el-form-item label="规则集名称" prop="isBorrow">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="isBorrow">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="1">新客</el-radio>
            <el-radio label="2">老客</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户等级" prop="isBorrow" v-if="ruleForm.type==2">
          <el-radio-group v-model="ruleForm.grade">
            <el-radio label="1">H1</el-radio>
            <el-radio label="2">H2</el-radio>
            <el-radio label="3">H3</el-radio>
            <el-radio label="4">H4</el-radio>
            <el-radio label="5">H5</el-radio>
          </el-radio-group>
        </el-form-item>
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
      },
      tableData: [],
      detailFlag: false,
      options1: [
        {label:'请选择',value:''},
        {id:1,label:'启用',value:1},
        {id:2,label:'关闭',value:-1},
      ],
      options2: [
        {label:'请选择',value:''},
        {id:1,label:'新客',value:1},
        {id:2,label:'老客',value:-1},
      ],
      options3: [],
      dialogFlag: false,
      ruleForm: {}
    }
  },
  methods: {
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
          action: this.$store.state.actionMap.SYSCONFIG0002,
          'sessionid': this.sessionid
        },
        id: this.detailData.id,
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
      this.conditionOne = '';
      this.conditionTwo = '';
      this.conditionThree = '';
      this.thresholdOne = '';
      this.thresholdTwo = '';
      this.thresholdThree = '';
      this.modifyHitory = {};
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
