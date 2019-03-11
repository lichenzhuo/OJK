<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('proManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('proManage.crumbsThree')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------------ 横条 ------------------- -->
    <div class="paixu">
      <span></span>
      <p>{{$t('proManage.crumbsThree')}}</p>
    </div>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_ADD')">
      <el-row type="flex" justify="start" align="middle" >
        <div class="search-input">
          <span>{{$t('proManage.faqState')}}:</span>
          <el-select size="small" v-model="formInline.type" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input" v-if="$store.state.common.lang==='vi'">
          <span>{{$t('new.no49')}}:</span>
          <el-input size="small" style="width:200px;" label="orderId" v-model="formInline.appPackage"></el-input>
        </div>
        <div class="search-input" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <div class="list_operation" >
      <el-button type="primary" @click="openAdd">+{{$t('proManage.crumbsThree')}}</el-button>
    </div>

    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe >
          <el-table-column align="center" prop="id" :label="$t('proManage.faqId')" >
          </el-table-column>
          <el-table-column align="center" prop="title" :label="$t('proManage.faqTitle')" >
          </el-table-column>
          <el-table-column align="center" prop="answer" :label="$t('proManage.request')" >
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('proManage.faqState')" >
            <template slot-scope="scope">
              <span v-if="scope.row.type!=''">{{scope.row.type==1?$t('loanMoneyDetail.loanMoney'):$t('loanMoneyDetail.backMoney')}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="createTime" :label="$t('proManage.joinTime')" width="86">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="appPackage" :label="$t('new.no49')">
            </el-table-column>
            <el-table-column align="center" prop="pid" :label="$t('yuenan.no30')">
              <template slot-scope="scope">
                <span v-if="scope.row.pid!=''">{{scope.row.pid===0?$t('yuenan.no32'):$t('yuenan.no31')}}</span>
                <span v-else>{{$store.state.common.nullData}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_EDIT')"
                class="table_opr" 
                @click="openModify(scope.row.id,scope.row.title,scope.row.answer,scope.row.type)">
                {{$t('public.no51')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_DEL')"
                class="table_opr"
                @click="delPre(scope.row.id)">
                {{$t('permission.del')}}
              </span>  
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- -------------分页显示栏------------------------ -->
    <el-row  type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>

    <!-- ----------------------确认是否删除开始------------------ -->
    <el-dialog :title="$t('public.no48')" :visible.sync="del" width="550px">
      <div class="left2right">
        <span class="left"></span>
        <span class="right">{{$t('proManage.delFaq')}}？</span>
      </div>
      <div class="left2right mt15">
        <span class="left"></span>
        <span class="right">
          <el-button type="primary" @click="delSure()">{{$t('public.no49')}}</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- ----------------------确认是否删除结束------------------- -->

    <!-- ------------------确认是否修改开始-------------------- -->
    <el-dialog :title="$t('public.no29')+'/'+$t('public.no51')" :visible.sync="modifyOrAdd" width="650px">
      <div class="left2right">
        <p class="left">{{$t('proManage.faqState')}}:</p>
        <div class="right">
          <el-select size="small" v-model="ruleForm2.type" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="left2right" v-if="$store.state.common.lang==='vi'&&add">
        <p class="left">{{$t('new.no49')}}:</p>
        <div class="right">
          <el-input size="small"  v-model="ruleForm2.appPackage"></el-input>
        </div>
      </div>
      <div class="left2right">
        <p class="left">{{$t('proManage.faqTitle')}}:</p>
        <div class="right">
          <el-input type="textarea" rows="4" v-model="ruleForm2.title" :placeholder="$t('userSuggest.placeholder')+'~'"></el-input>
        </div>
      </div>
      <div class="left2right">
        <p class="left">{{$t('proManage.request')}}:</p>
        <div class="right">
          <el-input type="textarea" rows="4" v-model="ruleForm2.answer" :placeholder="$t('userSuggest.placeholder')+'~'"></el-input>
        </div>
      </div>
      <div class="left2right">
        <p class="left"></p>
        <div class="right">
          <el-button type="primary" size="small" @click="modifySure">{{$t('proManage.sure')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <div class="foot"></div>

  </div>
</template>
<script>
export default{
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      // 查看详情产品信息数据对应字段
      formInline: {
        type: '',
        appPackage:''
      },
      options1: this.$store.state.options.faq_option,
      options2: this.$store.state.options.faq_option2,
      tableData: [{id: 1, title: '123', answer: '456', type: '1'}], // 数据模拟
      del: false, // 删除弹窗
      modify: false, // 修改弹窗
      add: false, // 添加弹窗
      delId: '', // 删除目标行数对应的id
      modifyId: '', // 修改目标行数对应的id
      ruleForm2: {
        title: '',
        answer: '',
        type: '',
        appPackage:''
      },
      modifyOrAdd:false
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮第几页
      this.currentPage = val
      this.faqList();
    },
    delPre (id) { // 删除按钮弹窗
      this.del = true
      this.delId = id
    },
    openModify (id, title, answer, type) { // 修改按钮弹窗
      this.modify = true;
      this.modifyId = id;
      this.ruleForm2.title = title;
      this.ruleForm2.answer = answer;
      this.ruleForm2.type = String(type);
      this.modifyOrAdd = true;
    },
    delSure () { // 删除确认操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.pro_faq_del,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          id: this.delId
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
            this.faqList();
          } else {
            this.$globalMsg.error(this.$t('message.warning'));
          }
          this.del = false;
        })
      }
    },
    modifySure () { // 修改确认操作
      if (this.ruleForm2.type == '') {
        this.$globalMsg.error(this.$t('new.no43'))
        return
      }
      if (this.ruleForm2.title == '') {
        this.$globalMsg.error(this.$t('new.no44'))
        return
      }
      if(this.add&&this.$store.state.common.lang==='vi'){
        if (this.ruleForm2.appPackage == '') {
          this.$globalMsg.error(this.$t('public.no88'))
          return
        }
      }
      if (this.ruleForm2.answer == '') {
        this.$globalMsg.error(this.$t('new.no45'))
        return
      }

      let option = {
        header: {
          action: this.$store.state.actionMap.pro_faq_add,
          ...this.$base,
          sessionid: this.sessionid
        },
        ...this.ruleForm2
      }
      if (this.modify) {
        option.id = this.modifyId
        option.header.action = this.$store.state.actionMap.pro_faq_update
      }
      if (this.flag) {
        this.flag = false;
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
            this.faqList();
          } else {
            this.$globalMsg.error(this.$t('message.warning'));
          }
          this.openClose();
        })
      }
    },
    faqList () { // 获取产品列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_faq_select,
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
    select () { // 查询按钮点击操作
      this.currentPage = 1;
      this.faqList();
    },
    openAdd(){
      this.add = true;
      this.modifyOrAdd = true;
    },
    openClose () {
      this.add = false;
      this.modify = false;
      this.modifyOrAdd = false;
      this.ruleForm2.type = '';
      this.ruleForm2.title = '';
      this.ruleForm2.answer = '';
      this.ruleForm2.appPackage = '';
    }
  },
  watch:{
    modifyOrAdd(){
      if(!this.modifyOrAdd){
        this.openClose();
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.faqList();
  }
}
</script>
<style scoped lang="scss">

</style>
