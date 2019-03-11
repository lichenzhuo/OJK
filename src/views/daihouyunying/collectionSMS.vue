<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterOperation.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterOperation.crumbsThree')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------------ 横条 ------------------- -->
    <div class="paixu">
      <span></span>
      <p>{{$t('loanAfterOperation.title')}}</p>
    </div>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_ADD')">
          <div class="search-input">
            <el-button type="primary"  @click="addNote">
              +{{$t('loanAfterOperation.add')}}
            </el-button>
          </div>
        </template>
        <div class="search-input">
          <span>{{$t('loanAfterOperation.noteType')}}:</span>
          <el-select size="small" clearable v-model="formInline.type" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_LIST')">
      <template>
        <el-table :data="tableData" stripe size="small">
          <el-table-column align="center" prop="id" :label="$t('loanAfterOperation.id')" >
          </el-table-column>
          <el-table-column align="center" prop="content" :label="$t('loanAfterOperation.content')">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('loanAfterOperation.type')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.collectionStatus(scope.row.type))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_EDIT')"
                class="table_opr" 
                @click="modify(scope.row.id,scope.row.type,scope.row.content)">
                {{$t('public.no51')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_DEL')"
                class="table_opr" 
                @click="del(scope.row.id)">
              {{$t('idManage.del')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- ------------------ 点击修改弹窗开始 -------------------- -->
    <el-dialog :title="$t('loanAfterOperation.addNote')" :visible.sync="modifyOrAdd" width="650px">
      <div class="left2right">
        <span class="left">{{$t('loanAfterOperation.type')}}:</span>
        <div class="right">
          <el-select size="small" v-model="noteStyle" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('loanAfterOperation.content')}}:</span>
        <div class="right">
          <el-input type="textarea" :rows="4" v-model="noteCon"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left"></span>
        <div class="right">
          <el-button type="primary" @click="modifySubmit">{{$t('public.no49')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 点击修改弹窗结束 -------------------- -->

    <!-- ----------------------确认是否删除开始------------------ -->
    <el-dialog :title="$t('public.no48')" :visible.sync="delFlag" width="550px">
      <div class="left2right">
        <span class="left"></span>
        <span class="right">{{$t('loanAfterOperation.del')}}？</span>
      </div>
      <div class="left2right mt15">
        <span class="left"></span>
        <span class="right">
          <el-button type="primary" @click="delSure()">{{$t('public.no49')}}</el-button>
        </span>
      </div>
    </el-dialog>

    <div class="foot"></div>

  </div>
</template>
<script>
export default{
  data () {
    return {
      sessionid: '',
      flag: true, // 点击一次开关
      pageTotal: 0, // 分页总数
      formInline: {// 查询信息数据对应字段
        type: ''
      },
      currentPage: 1, // 当前页下标
      options: [], // 短信类型阶段下拉框
      noteStyle: 1, // 短信修改模版选中项
      tableData: [], // 用户信息数据模拟
      delFlag: false, // 删除弹窗开关
      modifyFlag: false, // 修改弹窗开关
      addFlag: false, // 添加弹窗开关
      modifyOrAdd: false, // 添加弹窗开关
      delId: '', // 选择的是当前删除行的ID
      modifyId: '', // 选择的是当前详情行的ID
      noteCon: '',// 短信内容
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮第几页
      this.currentPage = val;
      this.noteList();
    },
    modify (id, type, content) { // 点击修改查看详情
      this.modifyFlag = true;
      this.modifyId = id;
      this.noteStyle = String(type);
      this.noteCon = content;
      this.modifyOrAdd = true;
    },
    addNote () { // 添加短信模版
      this.noteStyle = '';
      this.noteCon = '';
      this.addFlag = true;
      this.modifyOrAdd = true;
    },
    modifySubmit () { // 添加修改确认操作
      if (this.flag) {
        this.flag = false;
        let option
        if (this.modifyFlag) {
          option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.note_add_edit,
              sessionid: this.sessionid
            },
            method: 'edit',
            type: this.noteStyle,
            content: this.noteCon,
            id: this.modifyId
          }
        } else {
          option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.note_add_edit,
              sessionid: this.sessionid
            },
            method: 'add',
            type: this.noteStyle,
            content: this.noteCon
          }
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
            this.noteList();
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.noteStyle = '';
          this.noteCon = '';
          this.addClose();
        })
      }
    },
    del (id) { // 删除按钮操作
      this.delFlag = true;
      this.delId = id;
    },
    delSure () { // 删除确认操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.note_del,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          id: this.delId
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('idManage.no3'));
            this.noteList();
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.delFlag = false;
        })
      }
    },
    select () { // 查询按钮点击操作
      this.$store.commit('cuishouNoteList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.noteList();
      }
    },
    noteList () { // 获取短信模版列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.note_list,
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
        }
      })
    },
    addClose () {
      this.addFlag = false;
      this.modifyFlag = false;
      this.modifyOrAdd = false;
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
            value.label = value.optionName
            value.value = value.optionValue
          })
          this.options = arr;
        }
      })
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.cuishouNoteList_select) !== '{}') {
      this.formInline = this.$store.state.common.cuishouNoteList_select;
    }
    this.noteList();// 获取短信模版列表
    this.getcollectionType();// 获取催收阶段
  }
}
</script>
<style scoped lang="scss">

</style>
