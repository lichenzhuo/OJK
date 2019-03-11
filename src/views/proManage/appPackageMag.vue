<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('proManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('proManage.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('proManage.crumbsFour')}}</p>
    </div>
     
    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search" >
      <el-row type="flex" justify="start" align="middle" >
        <div class="search-input">
          <span>{{$t('new.no49')}}:</span>
          <el-input size="small" label="name" v-model="formInline.appPackage"></el-input>
        </div>
        <div class="search-input" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_APP_PACKAGE_MANAGE_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->
  
  <!-- ------------  app包管理列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_APP_PACKAGE_MANAGE_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="id" :label="$t('proManage.no2')">
          </el-table-column>
          <el-table-column align="center" prop="optionValue" :label="$t('new.no49')">
          </el-table-column>
          <el-table-column align="center" prop="optionName" :label="$t('proManage.no3')">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" >
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_APP_PACKAGE_MANAGE_EDIT')"
                style="color:#547ef6;cursor:pointer;" 
                @click="dialogShow(scope.row)">
                {{$t('proManage.no4')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ---------------  app包跳转弹窗 ---------------- -->
    <el-dialog :visible.sync="appPackageVisible" :title="$t('proManage.no4')" width="540px" >
      <el-form :model="diaLogForm" size="medium" label-width="120px">
        <el-form-item :label="$t('new.no49')" >
          <el-input type="text" v-model="diaLogForm.appPackage" disabled style="width:215px"></el-input>
        </el-form-item>
        <el-form-item :label="$t('proManage.no5')" >
          <el-input type="text" v-model="diaLogForm.appPackageNew" style="width:215px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="appPackageVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="save">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    
    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_APP_PACKAGE_MANAGE_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout=" prev, pager, next, total,->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
      </div>
    </el-row>

  </div>
</template>
<script>
export default {
  name: 'appPackage',
  data () {
    return {
      sessionid: '',
      appPackageVisible: false,
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      tableData: [],
      diaLogForm:{
        id:'',
        appPackage:'',
        appPackageNew:'',
      },
      formInline:{
        appPackage:''
      },
      flag: true
    }
  },
  mounted() {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.getTableData();
  },
  watch:{
    appPackageVisible(){
      if(!this.appPackageVisible){
        this.diaLogForm = {};
      }
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.getTableData();
    },
    select () { // 查询按钮点击操作
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.getTableData();
      }
    },
    getTableData () { // 获取列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PRODUCT0013,
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
    dialogShow(row){
      this.diaLogForm.id = row.id;
      this.diaLogForm.appPackage = row.optionValue;
      this.appPackageVisible = true;
    },
    save(){// 弹窗确定操作
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.PRODUCT0014,
          'sessionid': this.sessionid
        },
        id:this.diaLogForm.id,
        appPackage:this.diaLogForm.appPackage,
        appPackageNew:this.diaLogForm.appPackageNew
      }
      if (this.flag) {
        this.flag = false;
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
            this.getTableData();
          } else {
            this.$globalMsg.error(this.$t('message.warning'));
          }
          this.appPackageVisible = false;
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">

</style>

