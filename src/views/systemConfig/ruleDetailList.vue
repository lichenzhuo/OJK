<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('add.no44')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('add.no45')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>规则ID:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.ruleId"></el-input>
        </div>
        <div class="search-input">
          <span>规则名称:</span>
          <el-input size="small" style="width:130px;" v-model="formInline.ruleName"></el-input>
        </div>
        <div class="search-input">
          <span>是否启用:</span>
          <el-select size="small" clearable v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
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
        >
        确定修改顺序
      </el-button>
      <el-button 
        type="primary" 
        @click="gogogo"
        >
        立即执行
      </el-button>
    </div>
    <p class="time">上次调整时间：yy-mm-dd ss：mm（未执行）</p>

    <!-- -------------表单显示栏------------------------ -->
    <!-- <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_RULE_ENGINE_LIST')">
      <template>
        <el-table :data="tableData" size="small" >
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
    </div> -->
    <div class="box">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">规则名称</th>
            <th scope="col">执行顺序</th>
            <th scope="col">是否启用</th>
            <th scope="col">执行结果</th>
            <th scope="col">条件1</th>
            <th scope="col">阈值1</th>
            <th scope="col">逻辑关系</th>
            <th scope="col">条件2</th>
            <th scope="col">阈值2</th>
            <th scope="col">逻辑关系</th>
            <th scope="col">条件3</th>
            <th scope="col">禁言天数</th>
            <th scope="col">执行顺序</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <draggable type="transition" v-model="tableData" tag="tbody">
          <!-- <transition-group type="transition" > -->
            <tr v-for="item in tableData" :key="item.id">
              <td>{{ item.id }}</td>
              <td style="width:200px;word-break:break-all;">{{ item.ruleType }}</td>
              <td>{{ item.id }}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td style="width:100px"><span class="table_opr">修改</span><span class="table_opr">删除</span></td>
            </tr>
          <!-- </transition-group> -->
          
        </draggable>
      </table>
    </div>
    
    
    <el-dialog title="查看并修改" :visible.sync="detailFlag" width="95%" top="20vh">
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
          <!-- 不需要修改的类型 -->
          <!-- v-if="type1Array.includes(detailData.id)" -->
          <tr v-if="type1Array.includes(detailData.id)">
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

          <!-- id等于2的时候 -->
          <tr v-else-if="detailData.id==2">
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
            <td >
              <el-select size="small" clearable v-model="conditionOne" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>{{detailData.thresholdOne}}</td>
            <td>{{detailData.logicRelationOne}}</td>
            <td>
              <el-select size="small" clearable v-model="conditionTwo" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>{{detailData.thresholdTwo}}</td>
            <td>{{detailData.logicRelationTwo}}</td>
            <td>
              <el-select size="small" clearable v-model="conditionThree" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>{{detailData.thresholdThree}}</td>
            <td>
              <el-input type="number" size="small" style="width:80px" v-model="notTalking"></el-input>
            </td>
          </tr>

          <!-- 剩下的所有可输入的类型 -->
          <tr v-else>
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
            <td>
              <el-input v-if="detailData.conditionOne" type="number" size="small" style="width:80px" v-model="thresholdOne"></el-input>
              <span v-else>-</span>
            </td>
            <td>{{detailData.logicRelationOne}}</td>
            <td>{{detailData.conditionTwo}}</td>
            <td>
              <el-input v-if="detailData.conditionTwo&&detailData.id!=3" type="number" size="small" style="width:80px" v-model="thresholdTwo"></el-input>
              <el-select v-else-if="detailData.id==3" size="small" clearable v-model="thresholdTwo" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <span v-else>-</span>
            </td>
            <td>{{detailData.logicRelationTwo}}</td>
            <td>{{detailData.conditionThree}}</td>
            <td>
              <el-input v-if="detailData.conditionThree&&detailData.id!=53" type="number" size="small" style="width:80px" v-model="thresholdThree"></el-input>
              <el-select v-else-if="detailData.id==53" size="small" clearable v-model="thresholdThree" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <span v-else>-</span>
            </td>
            <td>
              <el-input type="number" size="small" style="width:80px" v-model="notTalking"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <template v-if="detailData.id==2">
        <h4>风控禁区的筛选</h4>
        <el-checkbox-group v-model="cityIds">
          <el-checkbox v-for="(value,i) in options4" :key="i" :label="value.value">{{value.label}}</el-checkbox>
        </el-checkbox-group>
      </template>
      <p class="mt15">上次修改时间: {{modifyHitory.strCreateTime}} </p>
      <p class="mt15" >上次修改内容: <span v-html="modifyHitory.all"> {{modifyHitory.all}} </span>   </p>
      <div class="button">
        <el-button type="primary" @click="submit">确认</el-button>
        <el-button type="primary" @click="detailClose">取消</el-button>
      </div>
    </el-dialog>

    <div class="foot"></div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
      draggable,
  },
  name: 'ruleEngine',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0,
      currentPage: 1,// 当前页下标
      ruleSetName: '',
      formInline: {// 查询信息数据对应字段
        ruleSetId: '',
        id: '',
        status: '',
      },
      // 用户信息数据模拟
      tableData: [
        {id:1,configStatus:0,ruleType:'13123213123'},
        {id:2,configStatus:1,ruleType:'33333333333333333'},
        {id:3,configStatus:1,ruleType:'44444444444443'},
        {id:4,configStatus:1,ruleType:'44444444444443'},
      ],
      type1Array: [1,23,25,37,48,49,50,51,54,56,57,58],
      detailFlag: false,
      sequence: '',// 顺序
      isUsing: false,// 是否启用
      result: '',// 结果
      notTalking: '',// 结果
      detailData: {},
      options1: [
        {id: 1, label: 'OCR地址', value: 'OCR地址'},
        {id: 2, label: '居住地', value: '居住地'},
        {id: 3, label: 'GPS地址', value: 'GPS地址'},
        {id: 4, label: '工作地', value: '工作地'},
      ],
      options2: [],
      options3: [],
      options4: [
        {id: 11, label: 'ACEH', value: '11'},
        {id: 14, label: 'RIAU', value: '14'},
        {id: 16, label: 'SUMATERA SELATAN', value: '16'},
        {id: 18, label: 'LAMPUNG', value: '18'},
        {id: 19, label: 'KEPULAUAN BANGKA BELITUNG', value: '19'},
        {id: 52, label: 'NUSA TENGGARA BARAT', value: '52'},
        {id: 53, label: 'NUSA TENGGARA TIMUR', value: '53'},
        {id: 65, label: 'KALIMANTAN UTARA', value: '65'},
        {id: 71, label: 'SULAWESI UTARA', value: '71'},
        {id: 72, label: 'SULAWESI TENGAH', value: '72'},
        {id: 73, label: 'SULAWESI SELATAN', value: '73'},
        {id: 74, label: 'SULAWESI TENGGARA', value: '74'},
        {id: 75, label: 'GORONTALO', value: '75'},
        {id: 76, label: 'SULAWESI BARAT', value: '76'},
        {id: 81, label: 'MALUKU', value: '81'},
        {id: 82, label: 'MALUKU UTARA', value: '82'},
        {id: 94, label: 'PAPUA', value: '94'},
        {id: 8171, label: 'KOTA AMBON', value: '8171'},
        {id: 9401, label: 'KABUPATEN MERAUKE', value: '9401'},
      ],
      options5: [
        {id:1,label:'启用',value:1},
        {id:2,label:'不启用',value:-1},
      ],
      options6: [
        {label:'请选择',value:''},
        {id:1,label:'Reject',value:-1},
        {id:2,label:'Pass',value:2},
        {id:3,label:'Transfer',value:1},
      ],
      collectionType: [],
      conditionOne: '',
      conditionTwo: '',
      conditionThree: '',
      thresholdOne: '',
      thresholdTwo: '',
      thresholdThree: '',
      cityIds: [],
      modifyHitory: {},
    }
  },
  computed: {
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
      this.thresholdOne = row.thresholdOne;
      this.thresholdTwo = row.thresholdTwo;
      this.thresholdThree = row.thresholdThree;
      this.conditionOne = row.conditionOne;
      this.conditionTwo = row.conditionTwo;
      this.conditionThree = row.conditionThree;
      this.getModifyHistory();
      
      if(row.cityIds&&row.cityIds.length){
        this.cityIds = row.cityIds
      }
      
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
        conditionOne: this.conditionOne,
        conditionTwo: this.conditionTwo,
        conditionThree: this.conditionThree,
        thresholdOne: this.thresholdOne,
        thresholdTwo: this.thresholdTwo,
        thresholdThree: this.thresholdThree,
        cityList: [],
      }
      if(this.detailData.id==2){
        this.cityIds.forEach(value=>{
          switch(value){
            case '11':
              return option.cityList.push(`${value},ACEH`);
            case '14':
              return option.cityList.push(`${value},RIAU`);
            case '16':
              return option.cityList.push(`${value},SUMATERA SELATAN`);
            case '18':
              return option.cityList.push(`${value},LAMPUNG`);
            case '19':
              return option.cityList.push(`${value},KEPULAUAN BANGKA BELITUNG`);
            case '52':
              return option.cityList.push(`${value},NUSA TENGGARA BARAT`);
            case '53':
              return option.cityList.push(`${value},NUSA TENGGARA TIMUR`);
            case '65':
              return option.cityList.push(`${value},KALIMANTAN UTARA`);
            case '71':
              return option.cityList.push(`${value},SULAWESI UTARA`);
            case '72':
              return option.cityList.push(`${value},SULAWESI TENGAH`);
            case '73':
              return option.cityList.push(`${value},SULAWESI SELATAN`);
            case '74':
              return option.cityList.push(`${value},SULAWESI TENGGARA`);
            case '75':
              return option.cityList.push(`${value},GORONTALO`);
            case '76':
              return option.cityList.push(`${value},SULAWESI BARAT`);
            case '81':
              return option.cityList.push(`${value},MALUKU`);
            case '82':
              return option.cityList.push(`${value},MALUKU UTARA`);
            case '94':
              return option.cityList.push(`${value},PAPUA`);
            case '8171':
              return option.cityList.push(`${value},KOTA AMBON`);
            case '9401':
              return option.cityList.push(`${value},KABUPATEN MERAUKE`);
          }
        })
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
    getcollectionType(){ // 获取催收阶段
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.back_reason,
        },
        optionGroup:'overdue.type'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value=>{
            value.label = value.optionName;
            value.value = value.optionName;
          })
          this.options3 = arr;
        }
      })
    },
    getModifyHistory(){// 获取上次修改记录
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0003,
          'sessionid': this.sessionid
        },
        id: this.detailData.id,
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if(res.data.data){
            let history = res.data.data;
            this.modifyHitory.strCreateTime = history.strCreateTime
            let str = ''
            if(history.exceuteLimit){
              str+=` 禁言天数: ${history.exceuteLimit}; `
            }
            if(history.executeResult){
              str+=` 执行结果: ${history.executeResult==-1?'拒绝':history.executeResult==1?'转人工':'直接放款'}; `
            }
            if(history.executeSort){
              str+=` 执行顺序: ${history.executeSort}; `
            }
            if(history.status){
              str+=` 是否启用: ${history.status==1?'启用':'不启用'}; `
            }
            if(history.conditionOne){
              str+=` 条件1: ${history.conditionOne}; `
            }
            if(history.thresholdOne){
              str+=` 阈值1: ${history.thresholdOne}; `
            }
            if(history.conditionTwo){
              str+=`条件2: ${history.conditionTwo}; `
            }
            if(history.thresholdTwo){
              str+=` 阈值2: ${history.thresholdTwo}; `
            }
            if(history.conditionThree){
              str+=` 条件3: ${history.conditionThree}; `
            }
            if(history.thresholdThree){
              str+=` 阈值3: ${history.thresholdThree}; `
            }
            this.modifyHitory.all = str
            // this.modifyHitory.all = `禁言天数:${history.exceuteLimit}, 执行结果:${history.executeResult}, 执行顺序:${history.executeSort}, 是否启用:${history.status}, 条件1:${history.conditionOne}, 阈值1:${history.thresholdOne}, 条件2:${history.conditionTwo}, 阈值2:${history.thresholdTwo},  阈值3:${history.conditionThree},  阈值3:${history.thresholdThree},`
          
          }
          this.detailFlag = true;
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
    gogogo(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.SYSCONFIG0007,
          'sessionid': this.sessionid
        },
        ruleSetId: this.formInline.ruleSetId,
      }
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
    this.sessionid = sessionStorage.getItem('sessionid');
    this.formInline.ruleSetId = this.$route.query.ruleSetId;
    this.ruleSetName = this.$route.query.ruleSetName;
    // this.getTableData();
    // this.getsexStatus();
    // this.getcollectionType();
    
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
        // vertical-align: bottom;
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
        vertical-align: middle;
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
  .time{
    background-color: #ffffff;
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
</style>
