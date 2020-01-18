<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('sidebar.system')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('staffManage.crumbsFive')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('staffManage.crumbsFive')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
          <div class="search-input">
            <span>{{$t('new.no24')}}:</span>
            <el-input size="small" style="width:130px;" v-model="formInline.groupId"></el-input>
          </div>
        <div class="search-input">
          <span>{{$t('new.no21')}}:</span>
          <el-select clearable size="small" v-model="formInline.leaderId" :placeholder="$t('public.placeholder')">
            <el-option v-for="(item,index) in options3" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('new.no28')}}:</span>
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
        <template v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_GROUP_QUERY')">
          <div class="search-input">
            <el-button type="primary"  @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_GROUP_CREATE')">
      <el-button type="primary" @click="addGroup">{{$t('new.no25')}}</el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_GROUP_LIST')">
      <template>
        <el-table :data="tableData" stripe size="small">
          <el-table-column align="center" prop="id" :label="$t('new.no24')">
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('new.no18')">
          </el-table-column>
          <el-table-column align="center" prop="leaderName" :label="$t('new.no19')">
          </el-table-column>
          <el-table-column align="center" prop="total" :label="$t('loanAfterManage.name')">
          </el-table-column>
          <el-table-column align="center" prop="outSource" :label="$t('new.no70')">
            <template slot-scope="scope">
              <span>{{$t($store.getters.is_addressBook1(scope.row.outSource))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outProportion" :label="$t('new.no71')">
          </el-table-column>
          <el-table-column align="center" prop="createTime" :label="$t('new.no28')" width="86">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <span
              v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_GROUP_EDIT')"
              style="color:#547ef6;cursor:pointer" 
              @click="detail(scope.row.groupName,scope.row.leaderId,scope.row.id,scope.row.outSource,scope.row.outProportion)">
              {{$t('public.no51')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_DEL')"
                style="margin-left:10px;color:#547ef6;cursor:pointer"
                @click="delBegin(scope.row.id)">
                {{$t('idManage.del')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_GROUP_LIST')">
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
    <div v-if="modifyFlag||addFlag" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p>{{$t('loanAfterOperation.add2')}}/{{$t('new.no22')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="modifyClose"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-con-one">
            <div class="search-input">
              <span style="width:100px;">{{$t('new.no23')}}:</span>
              <el-input size="small" label="orderId" v-model="groupName"></el-input>
            </div>
          </div>
          <div class="detail-con-one">
            <div class="search-input1">
              <span style="width:100px;">{{$t('new.no19')}}:</span>
              <el-select size="small" clearable  v-model="leaderId" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="detail-con-one" >
            <div class="search-input1">
              <span style="width:100px;">{{$t('new.no70')}}:</span>
              <el-select size="small" clearable v-model="outSource" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options6" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="detail-con-one" v-if="outSource==2">
            <div class="search-input">
              <span style="width:100px;">{{$t('new.no71')}}:</span>
              <el-input size="small" label="outProportion" v-model="outProportion"></el-input>
            </div>
          </div>
          <div class="detail-con-one" v-if="outSource==2">
            <span style="width:100px;">{{$t('new.no12')}}:</span>
            <el-checkbox-group v-model="collectionTypes">
              <div class="types">
                <ul>
                  <li v-for="value in collectionType" :key="value.value">
                    <el-checkbox :label="value.value"><span>{{value.label}}</span></el-checkbox>
                  </li>
                </ul>
              </div>
            </el-checkbox-group>
          </div>
          <div class="detail-con-one">
            <div class="search-input1">
              <span style="width:100px;">{{$t('new.no29')}}:</span>
              <el-transfer style="width:600px;"
                v-model="value1" 
                :data="group"
                @change="rightChange"
                :titles="[this.$t('new.no33'), this.$t('new.no32')]"
              ></el-transfer>
            </div>
          </div>
          <div class="detail-but" @click="modifySubmit">{{$t('proManage.sure')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击转派弹窗结束 -------------------- -->

    <el-dialog title="" :visible.sync="delFlag" center width="500px">
      <div style="height:40px;">{{$t(isdel)}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delFlag = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="delSure">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: 'collectionGroup',
  data () {
    return {
      sessionid: '',
      pageTotal: 0, // 分页总数
      flag: true, // 点击一次开关
      searchTime: [], // 最后催收时间
      formInline: {// 用户查询信息数据对应字段
        groupId: '',
        type: 2,
        leaderId: '',
        beginTime: '',
        EndTime: ''
      },
      currentPage: 1, // 当前页下标
      options1: [], // 默认弹窗所有成员
      options3: [], // 查询栏组长列表
      options5: [], // 弹窗组长列表
      options6: this.$store.state.options.isout_option, // 是否委外
      tableData: [], // 列表信息数据模拟
      modifyFlag: false, // 修改点击开关
      addFlag: false, // 窗口点击开关
      adminId: '', // 用户ID
      groupName: '', // 弹窗组名选中项
      leaderId: '', // 弹窗组长选中项
      leaderName: '', // 弹窗组长选中项
      groupId: '', // 当前行小组ID
      outSource: '', // 是否委外
      outProportion: '', // 委外占比
      group: [], // 穿梭框左侧值
      value1: [], // 穿梭框右侧值
      collectionType: [], // 催收阶段
      collectionTypes: [], // 催收阶段选中值
      defGroupInfo: {// 验证弹窗值是否被修改
        groupName: '',
        leaderId: ''
      },
      changeFlag: false,
      delFlag: false,
      delId: '',
      isdel:''// 是否删除提示该小组下是否有人
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val;
      this.dataList();
    },
    dataList () { // 获取催回统计列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.little_group_update,
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
        this.dataList();
      }
    },
    detail (groupName, leaderId, groupId,outSource,outProportion) { // 点击修改操作
      this.groupId = groupId;
      this.outSource = outSource;
      this.outProportion = outProportion;
      this.groupName_option();
      this.group_detail();
    },
    addGroup () { // 添加小组按钮操作
      this.groupName = '';
      this.leaderId = '';
      this.outSource = '';
      this.outProportion = '';
      this.collectionTypes = [];
      this.value1 = [];
      this.groupName_option();
      this.addFlag = true;
    },
    modifySubmit () { // 确认添加修改操作
      if (this.groupName == '') {
        this.$globalMsg.error(this.$t('new.no35'));
        return;
      }
      if (this.leaderId == '') {
        this.$globalMsg.error(this.$t('new.no36'));
        return;
      }
      let option
      if (this.addFlag) {
        this.value1.push(this.leaderId);
        let memberId = this.$store.getters.uniqueArray(this.value1);
        option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.little_group_add,
            'sessionid': this.sessionid
          },
          groupName: this.groupName,
          type: 2,
          leaderId: this.leaderId,
          leaderName: this.leaderName,
          collectTypes: this.collectionTypes.join(','),
          outProportion: this.outProportion,
          outSource: this.outSource,
          memberId: memberId
        }
      } else {
        // if (this.leaderId == this.defGroupInfo.leaderId && this.groupName == this.defGroupInfo.groupName) {
        //   return
        // }
        this.value1.push(this.leaderId);
        let memberId = this.$store.getters.uniqueArray(this.value1);
        option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.little_group_modify,
            'sessionid': this.sessionid
          },
          groupName: this.groupName,
          groupId: this.groupId,
          type: 2,
          leaderId: this.leaderId,
          leaderName: this.leaderName,
          collectTypes: this.collectionTypes.join(','),
          memberId: memberId,
          outProportion: this.outProportion,
          outSource: this.outSource
        }
      }
      if (this.flag) {
        this.flag = false;
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'));
          } else {
            this.$globalMsg.error(this.$t('message.warning'));
          }
          this.modifyClose();
          this.dataList();
        })
      }
    },
    modifyClose () { // 添加修改关闭操作
      this.groupName = '';
      this.leaderId = '';
      this.leaderName = '';
      this.outProportion = '';
      this.collectionTypes = [];
      this.outSource = '';
      this.group = [];
      this.value1 = [];
      this.modifyFlag = false;
      this.addFlag = false;
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
            this.options3.push({value: value.leaderId, label: value.leaderName});
          })
        }
      })
    },
    groupName_option () { // 获取所有组员角色列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.little_group_group,
          'sessionid': this.sessionid
        },
        type: 2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if (res.data.data) {
            res.data.data.forEach(value => {
              this.group.push({key: Number(value.id), label: value.name});
            })
          }
        }
      })
    },
    group_detail () { // 根据当前行查询弹窗所需小组成员信息
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.little_group_detail,
          'sessionid': this.sessionid
        },
        groupId: this.groupId,
        type: 2
      }
      this.$axios.post('', option).then(res => {
        this.value1 = []
        if (res.data.header.code == 0) {
          let arr = [];
          res.data.data.groupMembers.forEach(value => {
            arr.push(value.adminId);
            this.group.push({key: Number(value.adminId), label: value.name});
          })
          this.value1 = arr;
          this.collectionTypes = res.data.data.group.collectType ? res.data.data.group.collectType.split(',') : [];
          this.defGroupInfo.groupName = res.data.data.group.groupName;
          this.defGroupInfo.leaderId = res.data.data.group.leaderId;
          this.leaderId = res.data.data.group.leaderId;
          this.leaderName = res.data.data.group.leaderName;
          this.groupName = res.data.data.group.groupName;
          this.modifyFlag = true;
        }
      })
    },
    rightChange () {
      this.changeFlag = true;
    },
    alert_leaderName_option () { // 获取弹出框组长列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.little_group_leader,
          'sessionid': this.sessionid
        },
        type: 2
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            this.options5.push({value: value.id, leaderName: value.name, label: value.name});
          })
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
            value.label = value.optionName;
            value.value = value.optionValue;
          })
          this.collectionType = arr;
        }
      })
    },
    delBegin(id) {
      this.delId = id;
      this.haspeople(id);
    },
    haspeople(id) {// 当前小组下是否有人
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.hasPeople,
          'sessionid': this.sessionid
        },
        groupId:id
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if(res.data.data===1){
            this.isdel = 'new.no72';
          }else{
            this.isdel = 'new.no73';
          }
          this.delFlag = true;
        }
      })
    },
    delSure() {// 确认删除小组
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.delgroup,
          'sessionid': this.sessionid
        },
        groupId:this.delId,
        type: '2'
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'));
          this.dataList();
          this.delFlag = false;
        }else {
          this.$globalMsg.success(res.data.header.msg);
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.beginTime = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.EndTime = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.beginTime = '';
        this.formInline.EndTime = '';
      }
    },
    leaderId () {
      if (this.leaderId !== '') {
        this.leaderName = this.options5.filter(value => {
          return value.value == this.leaderId;
        })[0].leaderName
      }
    },
    outProportion(){
      if(this.outProportion>1){
        this.outProportion = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    
    this.dataList();// 获取每日派单列表
    this.leaderName_option();// 获取查询栏组长下拉框列表
    this.getcollectionType();// 获取催收阶段
    this.alert_leaderName_option();// 获取弹出框组长下拉框列表
  }
}
</script>
<style scoped lang="scss">
// .el-transfer-panel{
//   width: 180px !important
// }
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}

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
        margin: 10px 0;
        .search-input{
          display: flex;
        }
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
.types{
  width: 100%;
  ul{
    display: flex;
    flex-wrap: nowrap;
    li{
      flex: 1;
      margin-right: 20px;
    }
  }
}


</style>
