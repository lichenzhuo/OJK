<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('serviceManage.crumbsFive')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('serviceManage.crumbsFive')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row :gutter=10>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('public.no87')}}:</span>
            <el-date-picker 
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
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('public.CreateTime')}}:</span>
            <el-date-picker 
              v-model="searchTime1" 
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
        <!-- 优惠券状态 -->
        <el-col :md="8" :lg="6" :xl="4">
          <div class="search-input">
            <span>{{$t('serviceManage.service')}}:</span>
            <el-select clearable size="small" v-model="formInline.customerServicerId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_STATISTICS_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_LIST_EXP')">
          <el-col :md="5" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_STATISTICS_LIST')">
      <template>
        <el-table :data="tableData" size="small" style="width: 100%" empty-text>
          <el-table-column align="center" prop="strDateTime" :label="$t('public.no87')" width="180">
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.strRefundTime!==null&&scope.row.strRefundTime!==undefined&&scope.row.strRefundTime!==''">{{scope.row.strRefundTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template> -->
          </el-table-column>
          <el-table-column align="center" prop="strMustRefundTime" :label="$t('public.CreateTime')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="servicerName" :label="$t('serviceManage.service')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="assignOrderCount" :label="$t('serviceManage.no1')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="reminderOrderCount" :label="$t('serviceManage.no2')" min-width="100">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="normalRepaidOrderCount" :label="$t('yuenan.no28')" min-width="100">
            </el-table-column>
            <el-table-column align="center" prop="overDueRepaidOrderCount" :label="$t('yuenan.no29')" min-width="100">
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" prop="repaidOrderCount" :label="$t('serviceManage.no3')" min-width="100">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="noRepaidOrderCount" :label="$t('serviceManage.no4')" min-width="100">
          </el-table-column>
        </el-table>
        <el-table :data="tableData1" :row-style="rowStyle" :show-header="false" size="small" :row-class-name="tableRowClassName" style="width: 100%">
          <el-table-column align="center" prop="strRefundTime" :label="$t('public.no33')" width="180">
            <template slot-scope="scope">
              <span>{{$t('public.addTotal')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strMustRefundTime" :label="$t('public.CreateTime')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="servicerName" :label="$t('serviceManage.service')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="assignOrderCount" :label="$t('serviceManage.no1')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="reminderOrderCount" :label="$t('serviceManage.no2')" min-width="100">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="normalRepaidOrderCount" :label="$t('yuenan.no28')" min-width="100">
            </el-table-column>
            <el-table-column align="center" prop="overDueRepaidOrderCount" :label="$t('yuenan.no29')" min-width="100">
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" prop="repaidOrderCount" :label="$t('serviceManage.no3')" min-width="100">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="noRepaidOrderCount" :label="$t('serviceManage.no4')" min-width="100">
          </el-table-column>
        </el-table>
      </template>
    </div>
    
    

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_STATISTICS_LIST')">
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
      searchTime1: [],
      // 用户查询信息数据对应字段
      formInline: {
        distributionBeginTime: '',
        distributionEndTime: '',
        mustRefundBeginTime: '',
        mustRefundEndTime: '',
        customerServicerId: ''
      },
      options1:[],// 客服员下拉框列表
      currentPage: 1,// 当前页下标
      tableData:[],// 用户信息数据模拟
      tableData1:[],// 用户信息数据模拟
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
      this.tableData1 = []
      this.currentPage = val
      this.formList();
    },
    formList () { // 获取回款率列表
      this.tableData1 = []
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_total,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        this.flag = true;
        if(res.data.header.code==0){
          this.tableData = res.data.data.reminderStatistics;
          this.tableData1.push(res.data.data.reminderStatisticsAll) ;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 搜索栏查询按钮点击操作
      this.tableData1 = []
      this.$store.commit('rateOfReturn', this.formInline)
      if (this.flag) {
        this.flag = false
        this.formList();
      }
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.kf_total_excel,
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
    getServerPeople () { // 获取客服员下拉框
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_people_option,
          'sessionid': this.sessionid
        },
        type: 3,
        ...this.formInline
      }
      this.$axios.post('',option).then(res=>{
        if(res.data.header.code==0){
          res.data.data.forEach(value=>{
            this.options1.push({value:value.id,label:value.name})
          })
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.distributionBeginTime = this.searchTime[0]
        this.formInline.distributionEndTime = this.searchTime[1]
      } else {
        this.formInline.distributionBeginTime = ''
        this.formInline.distributionEndTime = ''
      }
    },
    searchTime1 () {
      if (this.searchTime1) {
        this.formInline.mustRefundBeginTime = this.searchTime1[0]
        this.formInline.mustRefundEndTime = this.searchTime1[1]
      } else {
        this.formInline.mustRefundBeginTime = ''
        this.formInline.mustRefundEndTime = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.formList()
    this.getServerPeople()
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
