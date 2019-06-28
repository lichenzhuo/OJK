<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('sidebar.system')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('staffManage.crumbssix')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('staffManage.crumbssix')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
          <div class="search-input">
            <span>{{$t('staffManage.id')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.adminId"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('staffManage.kefu')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.name"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.phone"></el-input>
          </div>
          <div class="search-input">
            <span>{{$t('permission.type')}}:</span>
            <el-select clearable size="small" v-model="formInline.roleId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('new.no20')}}:</span>
            <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('new.no21')}}:</span>
            <el-select clearable size="small" v-model="formInline.leaderId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <span>{{$t('public.no21')}}:</span>
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_CUSTSERVICE_QUERY')">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
        </template>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_CUSTSERVICE_LIST')">
      <template>
        <el-table :data="tableData" stripe >
          <el-table-column align="center" prop="adminId" :label="$t('staffManage.id')" width="160">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('staffManage.kefu')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userPhone')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="roleName" :label="$t('permission.type')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="createTime" :label="$t('public.no21')" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.createTime!==null&&scope.row.createTime!==undefined&&scope.row.createTime!==''">{{$store.getters.getYMD(scope.row.createTime)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('new.no18')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="leaderName" :label="$t('new.no19')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <span 
              v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_CUSTSERVICE_EDIT')"
              style="color:#547ef6;cursor:pointer" 
              @click="detail(scope.row.groupId,scope.row.adminId)">{{$t('new.no22')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_CUSTSERVICE_LIST')">
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

    <!-- ------------------ 点击转派弹窗开始 -------------------- -->
    <div v-if="modifyFlag" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p>{{$t('new.no22')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="modifyFlag=false"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-con-one">
            <div class="search-input">
              <span style="width:100px;">{{$t('new.no23')}}:</span>
              <el-select size="small" v-model="groupId" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- <div class="detail-con-one">
            <div class="search-input">
              <span style="width:100px;">{{$t('new.no19')}}:</span>
              <el-select size="small" v-model="groupTop" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options5" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div> -->
          <div class="detail-but" @click="updateGroup">{{$t('proManage.sure')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击转派弹窗结束 -------------------- -->

  </div>
</template>
<script>
export default {
  name: 'servicePeopleList',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      flag: true, // 点击一次开关
      searchTime: [], // 最后催收时间
      formInline: {// 用户查询信息数据对应字段
        adminId: '',
        name: '',
        phone: '',
        roleId: '',
        type: 3,
        groupId: '',
        overdueType: '',
        leaderId: '',
        beginTime: '',
        endTime: ''
      },
      currentPage: 1, // 当前页下标
      options1: [], // 角色列表
      options2: [], // 组名列表
      options3: [], // 组长列表
      options4: [], // 修改小组小组名称
      tableData: [{id: 1}], // 列表信息数据模拟
      modifyFlag: false, // 转派点击开关
      adminId: '', // 用户ID
      groupId: '', // 弹窗组名选中项
      memberId: ''// 当前选中组
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.statisticsList();
    },
    statisticsList () { // 获取客服员列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_List,
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
    select () { // 点击查询按钮操作
      if (this.flag) {
        this.currentPage = 1;
        this.flag = false;
        this.statisticsList();
      }
    },
    detail (groupId, memberId) { // 点击查看操作
      this.modifyFlag = true;
      this.groupId = groupId;
      this.memberId = memberId;
    },
    updateGroup () { // 确认转派操作
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.group_update,
            'sessionid': this.sessionid
          },
          memberId: this.memberId,
          groupId: this.groupId,
          type: 3
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
          } else {
            this.$globalMsg.error(this.$t('message.warning'));
          }
          this.modifyFlag = false;
        })
      }
    },
    type_option () { // 获取角色列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_type,
          'sessionid': this.sessionid
        },
        type: 3
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options1.push({value: value.roleId, label: value.roleName});
          })
        }
      })
    },
    groupName_option () { // 获取组名列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.group_groupName,
          'sessionid': this.sessionid
        },
        type: 3
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options2.push({value: value.id, label: value.groupName});
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
        type: 3
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options3.push({value: value.leaderId, label: value.leaderName});
          })
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.beginTime = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.endTime = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.beginTime = '';
        this.formInline.endTime = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    
    this.statisticsList();// 获取每日派单列表
    this.type_option();// 获取角色下拉框列表
    this.groupName_option();// 获取组员下拉框列表
    this.leaderName_option();// 获取组长下拉框列表
  }
}
</script>
<style scoped lang="scss">
// 修改小组
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
        margin: 30px 0;
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
          width: 560px;
          height: auto;
          ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            li{
              width: 33%;
            }
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
