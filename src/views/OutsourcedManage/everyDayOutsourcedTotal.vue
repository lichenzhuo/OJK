<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('OutsourcedManage.no1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('OutsourcedManage.no3')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('OutsourcedManage.no3')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row :gutter="10" type="flex" justify="start">
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('OutsourcedManage.no4')}}:</span>
            <el-date-picker 
              id="date1"
              v-model="searchTime" 
              size="small"
              value-format="yyyy-MM-dd" 
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        </el-col>
        <!-- <el-col :md="8" :lg="5" :xl="4"> -->
          <div class="search-input">
            <span>{{$t('loanAfterManage.name')}}:</span>
            <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <!-- </el-col> -->
        <!-- <el-col :md="8" :lg="5" :xl="4"> -->
          <div class="search-input">
            <span>{{$t('OutsourcedManage.no5')}}:</span>
            <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <!-- </el-col> -->
        <!-- <el-col :md="8" :lg="5" :xl="4"> -->
          <div class="search-input">
            <span>{{$t('OutsourcedManage.no6')}}:</span>
            <el-select clearable size="small" clearable v-model="formInline.type" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <!-- </el-col> -->
        <template v-if="$store.state.common.permiss.includes('RIGHT_ENTRUST_DAILY_REPORT_QUREY')">
          <!-- <el-col :md="3" :lg="2" :xl="2"> -->
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_ENTRUST_DAILY_REPORT_EXP')">
          <!-- <el-col :md="5" :lg="2" :xl="2"> -->
            <div class="search-input ml15">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_ENTRUST_DAILY_REPORT_LIST')">
      <template>
        <el-table :data="tableData" size="small" style="width: 100%" empty-text>
          <el-table-column align="center" prop="strCreateTime" :label="$t('OutsourcedManage.no4')" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.strCreateTime!==null&&scope.row.strCreateTime!==undefined&&scope.row.strCreateTime!==''">{{scope.row.strCreateTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('OutsourcedManage.no5')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('loanAfterManage.name')" min-width="80">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('OutsourcedManage.no6')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.type!==null&&scope.row.type!==undefined&&scope.row.type!==''">{{$t($store.getters.collectionStatus(scope.row.type))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="allCollection" :label="$t('OutsourcedManage.no26')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="allMoney" :label="$t('OutsourcedManage.no27')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.allMoney!==null&&scope.row.allMoney!==undefined&&scope.row.allMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.allMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnCount" :label="$t('OutsourcedManage.no28')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="returnMoney" :label="$t('OutsourcedManage.no29')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnCountRate" :label="$t('OutsourcedManage.no30')+'('+$t('totalManage.order')+')'" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.returnCountRate!==null&&scope.row.returnCountRate!==undefined&&scope.row.returnCountRate!==''">{{$store.getters.twoPoint(scope.row.returnCountRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="returnMoneyRate" :label="$t('OutsourcedManage.no30')+'('+$t('totalManage.money')+')'" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.returnMoneyRate!==null&&scope.row.returnMoneyRate!==undefined&&scope.row.returnMoneyRate!==''">{{$store.getters.twoPoint(scope.row.returnMoneyRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-table :data="tableData1" :row-style="rowStyle" :show-header="false" size="small" :row-class-name="tableRowClassName" style="width: 100%">
        <el-table-column align="center" prop="strCreateTime" :label="$t('public.CreateDate')" width="140">
          <template slot-scope="scope">
            <span>{{$t('public.addTotal')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="groupName" :label="$t('OutsourcedManage.no5')" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="adminName" :label="$t('loanAfterManage.name')" min-width="80">
        </el-table-column>
        <el-table-column align="center" prop="type" :label="$t('OutsourcedManage.no6')" min-width="80">
        </el-table-column>
        <el-table-column align="center" prop="allCollection" :label="$t('OutsourcedManage.no26')" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="allMoney" :label="$t('OutsourcedManage.no27')" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.allMoney!==null&&scope.row.allMoney!==undefined&&scope.row.allMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.allMoney)}}{{$store.state.common.vi_currency}}</span>
            <span v-else>{{$store.state.common.nullData}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="returnCount" :label="$t('OutsourcedManage.no28')" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="returnMoney" :label="$t('OutsourcedManage.no29')" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.returnMoney!==null&&scope.row.returnMoney!==undefined&&scope.row.returnMoney!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.returnMoney)}}{{$store.state.common.vi_currency}}</span>
            <span v-else>{{$store.state.common.nullData}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="returnCountRate" :label="$t('OutsourcedManage.no30')+'('+$t('totalManage.order')+')'" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.returnCountRate!==null&&scope.row.returnCountRate!==undefined&&scope.row.returnCountRate!==''">{{$store.getters.twoPoint(scope.row.returnCountRate)}}%</span>
            <span v-else>{{$store.state.common.nullData}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="returnMoneyRate" :label="$t('OutsourcedManage.no30')+'('+$t('totalManage.money')+')'" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.returnMoneyRate!==null&&scope.row.returnMoneyRate!==undefined&&scope.row.returnMoneyRate!==''">{{$store.getters.twoPoint(scope.row.returnMoneyRate)}}%</span>
            <span v-else>{{$store.state.common.nullData}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end" v-if="$store.state.common.permiss.includes('RIGHT_ENTRUST_DAILY_REPORT_LIST')">
        <div class="pages">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="sizes, prev, pager, next, total,->"
            :page-sizes="[10, 15, 20, 30]"
            :page-size="pageNumber"
            @size-change="handleSizeChange"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
        </div>
    </el-row>

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [],
      // 用户查询信息数据对应字段
      formInline: {
        groupId:'',
        adminId:'',
        type:'',
        distributionTimeBegin: '',
        distributionTimeEnd: ''
      },
      options1:[],// 委外公司下拉框
      options2:[],// 委外阶段下拉框
      options3: [], // 在职催收员列表
      currentPage: 1,// 当前页下标
      tableData:[],// 列表数据1
      tableData1:[],// 列表数据2
      rowStyle:{
        backgroundColor:'rgb(241,241,241)'
      }
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.formList();
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.formList()
    },
    formList () { // 获取回款率列表
      this.tableData1 = []
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.outSourcedList_total,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data.dailyRepost;
          this.tableData1.push(res.data.data.dailyRepostTotal);
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 搜索栏查询按钮点击操作
      if (this.flag) {
        this.flag = false
        this.formList()
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.outSourcedList_total_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          },
          ...this.formInline
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'warning-row';
      }
      return '';
    },
    getOutCompany () { // 获取委外公司名称
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_groupName,
          'sessionid': this.sessionid
        },
        outSource:2,
        type:2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data
          arr.forEach(value => {
            value.value = value.id
            value.label = value.groupName
          })
          this.options1 = arr;
        }
      })
    },
    collectionPeople () { // 获取催收人员列表数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        status: 1,
        type:0,
        outSource:2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data
          arr.forEach(value => {
            value.value = value.id
            value.label = value.name
          })
          this.options3 = arr
        }
      })
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
          this.options2 = arr;
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.distributionTimeBegin = this.searchTime[0]
        this.formInline.distributionTimeEnd = this.searchTime[1]
      } else {
        this.formInline.distributionTimeBegin = ''
        this.formInline.distributionTimeEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.formList()
    this.getOutCompany()
    this.getcollectionType()// 获取催收阶段
    this.collectionPeople()// 获取催收人员
  }
}
</script>
<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}

.usermanage {
  width: 100%;
  height: auto;
  padding: 20px 30px;
  background-color: rgba(246, 249, 252, 1);
  position: relative;
}
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
  height: auto;
  background-color: #ffffff;
  margin-top: 18px;
  margin-bottom: 22px;
  padding: 22px 28px 22px 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  .search-input {
    height: 50px;
    display: flex;
    align-items: center;
    // margin-right: 10px;
    & > span {
      padding: 0 5px;
      font-size: 14px;
      white-space: nowrap;
      @include flex-cen;
    }
    // .margin{
    //   margin-left: 15px;
    // }
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

.table {
  width: 100%;
  min-height: 440px;
}
span.active1{
  color: #FF6700;
}
span.active2{
  color: #8FD78D;
}
span.active3{
  color: #3b56ee;
}

//用户详情弹窗
.details{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 95%;
    height: 500px;
    margin-top: -200px;
    background-color: #ffffff;
    .detail-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 10px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .detail-main-con{
      width: 100%;
      height: 452px;
      .year{
        width: 100%;
        height: 58px;
        display: flex;
        padding-left: 50px;
        align-items: flex-end;
        .button-active{
          background-color: #409EFF;
        }
      }
      
      .detail-table{
        width: 100%;
        height: 392px;
        display: flex;
        justify-content: space-around;
        .detail-table-1{
          width: 45%;
          height: 100%;
          .detail-table-2{
            width: 100%;
            height: 100%;
            tr:nth-child(odd){
              background-color: #Ffffff;
            }
            tr:nth-child(even){
              background-color: #F4F6FB;
            }
            .table-head{
              height: 50px;
            }
            .table-head2{
              text-align: center;
            }
            .active{
              background-color: #F4F6FB;
            }
          }
        }
      }
    }
  }
} 

</style>
