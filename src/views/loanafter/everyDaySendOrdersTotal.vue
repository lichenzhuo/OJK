<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterManage.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('loanAfterManage.crumbsFour')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <div class="search-input">
          <span>{{$t('loanAfterManage.name')}}:</span>
          <el-select clearable size="small" v-model="formInline.adminId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('loanAfterManage.type1')}}:</span>
          <el-select size="small" clearable v-model="formInline.type" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no20')}}:</span>
          <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no21')}}:</span>
          <el-select clearable size="small" v-model="formInline.leaderId" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,index) in options5" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('totalManage.timeSelect')}}:</span>
          <el-date-picker 
            id="date1"
            size="small"
            v-model="searchTime" 
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_DISTRIBUTION_STATISTICS_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_DISTRIBUTION_STATISTICS_EXP')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
          </div>
        </template>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_DISTRIBUTION_STATISTICS_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe :summary-method="getSummaries"
          show-summary>
          <el-table-column align="center" prop="time" :label="$t('public.no33')" width="160">
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('loanAfterManage.name')">
          </el-table-column>
          <el-table-column align="center" prop="roleName" :label="$t('loanAfterManage.type1')">
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('new.no18')">
          </el-table-column>
          <el-table-column align="center" prop="leaderName" :label="$t('new.no19')">
          </el-table-column>
          <el-table-column align="center" prop="number" :label="$t('loanAfterManage.fenpeidanliang')">
          </el-table-column>
          <el-table-column align="center" prop="transferNumber" :label="$t('loanAfterManage.zhuanpailiang')">
          </el-table-column>
          <el-table-column align="center" prop="money" :label="$t('loanAfterManage.yinghuanbenxi')">
            <template slot-scope="scope">
              <span v-if="scope.row.money!==null&&scope.row.money!==undefined&&scope.row.money!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(scope.row.money)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span class="table_opr" @click="detail(scope.row.adminId,scope.row.time,scope.row.roleName,scope.row.groupId)">{{$t('loanAfterManage.sel')}}</span>
              <template v-if="$store.state.common.permiss.includes('RIGHT_DISTRIBUTION_STATISTICS_SHIFT')">
                <span 
                  v-if="$store.getters.isToady(scope.row.time)"
                  class="table_opr"  
                  @click="redeploy(scope.row.adminId,scope.row.time,scope.row.number,scope.row.type,scope.row.groupId)">
                {{$t('loanAfterManage.redeploy')}}
                </span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_DISTRIBUTION_STATISTICS_LIST')">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0"
          >
        </el-pagination>
      </div>
    </el-row>

    <div class="foot"></div>
    
    <!-- ------------------ 点击查看详情弹窗开始 -------------------- -->
    <el-dialog :title="$t('loanAfterManage.sel')" :visible.sync="detailFlag" width="90%">
      <fendantable :time="time" :admin-id="adminId" :type="type" :groupId="groupId"></fendantable>
    </el-dialog>
    <!-- ------------------ 点击查看详情弹窗结束 -------------------- -->

    <!-- ------------------ 点击转派弹窗开始 -------------------- -->
    <div v-if="redeployFlag" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p>{{$t('loanAfterManage.redeploy')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="redeployFlag=false"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-con-one">
            <p>{{$t('loanAfterManage.total')}}: <span>{{redeployData.total}}</span> </p>
          </div>
          <div class="detail-con-one">
            <div class="detail-con-one-4">
              {{$t('loanAfterManage.redeployTo')}}:
            </div>
            <div class="detail-con-one-3">
              <ul>
                <li v-for="(item,index) in options3" :key="index">
                  <el-radio v-model="peopleId" :label="item.id">
                    <span>{{item.name}}</span>
                  </el-radio>
                </li>
              </ul>
            </div>
          </div>
          <div class="detail-con-one">
            <div class="detail-con-one-4">
              {{$t('public.no37')}}:
            </div>
            <div class="detail-con-one-3">
              <textarea class="search_inpu" v-model="reason" :placeholder="$t('public.no42')+'~'"></textarea>
            </div>
          </div>
          <div class="detail-but" @click="redeploySubmit">{{$t('loanAfterManage.sure')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击转派弹窗结束 -------------------- -->

  </div>
</template>
<script>
import fendantable from '../../components/component/fendantable'
export default {
  name: 'everyDaySendOrdersTotal',
  components: {
    fendantable
  },
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      flag: true, // 点击一次开关
      searchTime: [], // 最后催收时间
      formInline: {// 用户查询信息数据对应字段
        adminId: '',
        type: '',
        groupId: '',
        leaderId: '',
        distributionTimeBegin: '',
        distributionTimeEnd: ''
      },
      currentPage: 1, // 当前页下标
      options1: [], // 逾期类型
      options2: [], // 全部催收员列表
      options3: [], // 在职催收员列
      options4: [], // 组名
      options5: [], // 组长
      tableData: [], // 列表信息数据模拟
      tableData1: [], // 列表信息数据模拟
      detailFlag: false, // 查看详情开关
      redeployFlag: false, // 转派点击开关
      adminId: '', // 用户ID
      time: '', // 当日订单时间
      type: '', // 当日订单状态逾期类型
      tableList: [], // 查看信息列表
      redeployData: {// 转派确认传送的数据
        total: '',
        adminId: ''
      },
      peopleId: [],
      reason: '',
      groupId: ''
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.statisticsList();
    },
    statisticsList () { // 获取催回统计列表
      this.tableData1 = [];
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.todaySendOrder_list,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data.dispatchList;
          this.tableData1 = res.data.data['pieceSum'];
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    select () { // 点击查询按钮操作
      this.$store.commit('todaypaidanList', this.formInline);
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.statisticsList();
      }
    },
    detail (adminId, time, type, groupId) { // 点击查看操作
      this.adminId = adminId;
      this.time = time;
      this.type = type;
      this.detailFlag = true;
      this.groupId = groupId || 0;
    },
    redeploy (adminId, time, number, type, groupId) { // 点击转派开关
      this.redeployData.adminId = adminId;
      this.time = time;
      this.redeployData.total = number;
      this.adminId = adminId;
      this.type = type;
      this.groupId = groupId || 0;
      this.operationAdmin2(this.type);// 获取催收员列表
      this.redeployFlag = true;
    },
    redeploySubmit () { // 确认转派操作
      if (this.peopleId == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.adminFirst'));
        return;
      }
      if (this.reason == '') {
        this.$globalMsg.error(this.$t('loanAfterManage.placeholder'));
        return;
      }
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.todayorder_operation,
            'sessionid': this.sessionid
          },
          adminIds: this.peopleId,
          groupId: this.groupId,
          lastAdminId: this.adminId,
          remark: this.reason,
          type: this.type
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
            this.statisticsList();// 获取每日派单列表
          } else {
            this.$globalMsg.error(this.$t('message.warning'));
          }
          this.peopleId = '';
          this.reason = '';
          this.redeployFlag = false;
        })
      }
    },
    operationAdmin () { // 获取全部催收员列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        status: 1,
        type:0,
        outSource:1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options2 = arr;
        }
      })
    },
    operationAdmin2 (type) { // 根据催收类型获取在职催收员列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        type: type,
        status: 1,
        outSource:1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options3 = arr.filter(value => {
            return value.value != this.redeployData.adminId;
          })
        }
      })
    },
    operationAdmin1 () { // 获取在职催收员列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.collection_admin,
          'sessionid': this.sessionid
        },
        status: 1,
        type:0,
        outSource:1
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data;
          arr.forEach(value => {
            value.value = value.id;
            value.label = value.name;
          })
          this.options3 = arr.filter(value => {
            return value.value != this.redeployData.adminId;
          })
        }
      })
    },
    groupList () { // 获取组名列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_groupName,
          'sessionid': this.sessionid
        },
        type: 2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options4.push({value: value.id, label: value.groupName});
          })
        }
      })
    },
    leaderName_option () { // 获取组长列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_leaderName,
          'sessionid': this.sessionid
        },
        type: 2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options5.push({value: value.leaderId, label: value.leaderName});
          })
        }
      })
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.todaySendOrder_list_excel,
            'page': {'index': this.currentPage, 'size': 10},
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
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.options1 = arr;
        }
      })
    },
    getSummaries() {
      const sums = [
        this.$t('public.addTotal'),
        '-',
        '-',
        '-',
        '-',
        this.tableData1.allocationQuantity,
        this.tableData1.transferOrder,
        this.tableData1.payPrincipalInterest,
      ];
      return sums;
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.distributionTimeBegin = this.searchTime[0];
        this.formInline.distributionTimeEnd = this.searchTime[1];
      } else {
        this.formInline.distributionTimeBegin = '';
        this.formInline.distributionTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.todaypaidanList_select) !== '{}') {
      this.formInline = this.$store.state.common.todaypaidanList_select;
      if(this.formInline.distributionTimeBegin!==''){
        this.searchTime.push(this.formInline.distributionTimeBegin);
      this.searchTime.push(this.formInline.distributionTimeEnd);
      }
      
    }
    this.statisticsList();// 获取每日派单列表
    this.operationAdmin();// 获取催收员列表
    this.groupList();// 获取组员列表
    this.leaderName_option();// 获取组长列表
    this.getcollectionType();// 获取催收阶段
  }
}
</script>
<style scoped lang="scss">
// 转派详情
.detail{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .detail-main{
    width: 640px;
    height: auto;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom:5px;
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
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
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
      height: auto;
      padding: 10px 30px;
      .detail-con-one{
        width: 100%;
        display: flex;
        margin: 10px 0;
        p{
          margin: 10px 40px 20px 0;
          padding-left: 14px;
          color: #999;
          span{
            color: #000;
            margin: 0 5px;
          }
        }
        .detail-con-one-3{
          width: 100%;
          height: auto;
          ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            li{
              width: 33%;
              margin: 5px 0;
            }
          }
          textarea{
            padding: 5px;
            width: 100%;
            height: 60px;
          }
        }
        .detail-con-one-4{
          width: 100px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          color: #999;
          
        }
      }
      .detail-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 10px auto;
        text-align: center;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}

</style>
