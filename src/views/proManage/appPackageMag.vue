<template>
  <div class="all">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('proManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('proManage.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('proManage.crumbsFour')}}</p>
        </div>
      </el-col>
    </el-row>
     
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
        <el-table :data="tableData" size="small" stripe style="width: 100%"  empty-text>
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
    this.sessionid = sessionStorage.getItem('sessionid')
    this.getTableData()
  },
  watch:{
    appPackageVisible(){
      if(!this.appPackageVisible){
        this.diaLogForm = {}
      }
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      this.getTableData();
    },
    select () { // 查询按钮点击操作
      if (this.flag) {
        this.flag = false
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
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
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
        this.flag = false
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
            this.getTableData()
          } else {
            this.$globalMsg.error(this.$t('message.warning'))
          }
          this.appPackageVisible = false;
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @mixin flex-cen {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @mixin p-span {
    p{
      line-height: 24px;
      span:nth-child(1){
        white-space: nowrap;
        color: $color1;
        font-size: 16px;
      }
      span:nth-child(2),span:nth-child(3),span:nth-child(4){
        color: $color2;
        font-size: 16px;
        margin: 0 10px;
        word-break: break-all;
      } 
    }
  }
  
  .all {
    width: 100%;
    height: auto;
    padding: 20px 30px;
    background-color: rgba(246, 249, 252, 1);
    position: relative;
    .paixu {
      width: 100%;
      height: 48px;
      line-height: 48px;
      background: rgba(224, 229, 246, 1);
      border-radius: 4px;
      span {
        display: block;
        float: left;
        margin-top: 10px;
        background-color: rgba(84, 126, 245, 1);
        width: 4px;
        height: 30px;
        border-radius: 5px;
      }
      p {
        color: rgba(84, 126, 245, 1);
        font-size: 16px;
        margin-left: 20px;
      }
      
    }
    .search {
      width: 100%;
      background-color: #ffffff;
      margin-top: 18px;
      margin-bottom: 22px;
      padding: 22px 28px 22px 5px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      .search-add{
        width: 114px;
        height: 100%;
        border: 1px solid #547ef6;
        border-radius:5px;
        text-align: center;
        line-height: 36px;
        color:#547ef5;
        margin-left: 30px;
        cursor:pointer;
      }
      .search-input {
        height: 50px;
        display: flex;
        align-items: center;
        margin-right: 10px;
        & > span {
          padding: 0 5px;
          font-size: 14px;
          white-space: nowrap;
          @include flex-cen;
        }
        .el-input {
          flex: auto;
          @include flex-cen;
        }
        .el-date-editor {
          margin: 0 5px;
        }
        .el-select {
          flex: auto;
          @include flex-cen;
        }
        .el-button--primary{
          height: 40px;
          
        }
        .button-color{
          background-color: #1D7BFF;
          border-color: #547ef6;
        }
      }
    }
  }
  .el-dialog{
    width: 1200px!important;
    
  }
  .table{
    width: 100%;
    min-height: 440px;
  }
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body{
    margin: 0;
    padding: 0;
    width: 1200px;
    height: 630px;
    
  }
</style>
<style>
.el-dialog--center{
  /* height: 600px; */
     margin-top: 20vh!important;
  }
</style>

