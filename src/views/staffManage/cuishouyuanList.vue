<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('sidebar.system')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('staffManage.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('staffManage.crumbsFour')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('staffManage.id')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.adminId"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('loanAfterManage.name')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('loanAfterManage.type1')}}:</span>
            <el-select clearable size="small" v-model="formInline.overdueType" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no20')}}:</span>
            <el-select clearable size="small" v-model="formInline.groupId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no21')}}:</span>
            <el-select clearable size="small" v-model="formInline.leaderId" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="14" :lg="11" :xl="7">
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
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_LIST')">
      <template>
        <el-table :data="tableData" stripe style="width: 100%" empty-text>
          <el-table-column align="center" prop="adminId" :label="$t('staffManage.id')" width="160">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('loanAfterManage.name')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userPhone')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="createTime" :label="$t('public.no21')" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.createTime!==null&&scope.row.createTime!==undefined&&scope.row.createTime!==''">{{$store.getters.getYMD(scope.row.createTime)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="overdueType" :label="$t('loanAfterManage.type1')" min-width="120">
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.overdueType!==null&&scope.row.overdueType!==undefined&&scope.row.overdueType!==''">{{$t($store.getters.collectionStatus(scope.row.overdueType))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template> -->
          </el-table-column>
          <el-table-column align="center" prop="groupName" :label="$t('new.no18')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="leaderName" :label="$t('new.no19')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <span 
              v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_EDIT')"
              style="color:#547ef6;cursor:pointer" 
              @click="detail(scope.row.groupId,scope.row.adminId)">{{$t('new.no22')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_COLLECTION_LIST')">
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
                <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- <div class="detail-con-one">
            <div class="search-input">
              <span style="width:100px;">{{$t('new.no19')}}:</span>
              <el-select size="small" v-model="leaderName" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options3" :key="item.value" :label="$t(item.label)" :value="item.value">
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
  name: 'userManage',
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
        type: 2,
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
      options4: [], // 组长列表
      tableData: [], // 列表信息数据模拟
      modifyFlag: false, // 转派点击开关
      adminId: '', // 用户ID
      groupId: '', // 弹窗组名选中项
      memberId: ''// 当前选中组
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      this.dataList();
    },
    dataList () { // 获取催回统计列表
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
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    select () { // 点击查询按钮操作
      this.$store.commit('cuishouyuanList_group', this.formInline)
      if (this.flag) {
        this.flag = false
        this.dataList();
      }
    },
    detail (groupId, memberId) { // 点击查看操作
      this.modifyFlag = true
      this.groupId = groupId
      this.memberId = memberId
    },
    updateGroup () { // 确认转派操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.group_update,
            'sessionid': this.sessionid
          },
          memberId: this.memberId,
          groupId: this.groupId,
          type: 2
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
          } else {
            this.$globalMsg.error(this.$t('message.warning'))
          }
          this.modifyFlag = false
        })
      }
    },
    groupName_option () { // 获取组名列表
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
            this.options2.push({value: value.id, label: value.groupName})
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
            this.options3.push({value: value.leaderId, label: value.leaderName})
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
            value.label = value.optionName
            value.value = value.optionValue
          })
          this.options1 = arr;
        }
      })
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.beginTime = this.searchTime[0]
        this.formInline.endTime = this.searchTime[1]
      } else {
        this.formInline.beginTime = ''
        this.formInline.endTime = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.cuishouyuanList_group_select) !== '{}') {
      this.formInline = this.$store.state.common.cuishouyuanList_group_select
      if(this.formInline.beginTime!==''){
        this.searchTime.push(this.formInline.beginTime)
        this.searchTime.push(this.formInline.EndTime)
      }
    }
    this.dataList()// 获取每日派单列表
    this.groupName_option()// 获取组员下拉框列表
    this.leaderName_option()// 获取组长下拉框列表
    this.getcollectionType()// 获取催收阶段
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
  min-height: 530px;
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
