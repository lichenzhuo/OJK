<template>
  <div class="operatorManage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('inviteFriend.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('inviteFriend.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('inviteFriend.crumbsTwo')}}</p>
        </div>
      </el-col>
    </el-row>
     
  <!-- -------------搜索查询栏------------------------ -->
  <search-filter 
    :filter="filter" 
    @search="search" 
    @output="putExcel" 
    :searchRight="$store.state.common.permiss.includes('RIGHT_RECORD_INVITE_QUERY')" 
    :outputRight="$store.state.common.permiss.includes('RIGHT_RECORD_INVITE_EXP')">
  </search-filter>
  
  <!-- ------------  优惠券列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_RECORD_INVITE_LIST')">
      <template>
        <el-table :data="couponsList" size="small" stripe style="width: 100%"  empty-text>
          <el-table-column align="center" prop="inviteId" :label="$t('public.userId')">
          </el-table-column>
          <el-table-column align="center" prop="registerCount" :label="$t('public.registerUser')">
          </el-table-column>
          <el-table-column align="center" prop="lendingCount" :label="$t('inviteFriend.no1')">
          </el-table-column>
          <el-table-column align="center" prop="lendingDayCount" :label="$t('inviteFriend.no2')">
          </el-table-column>
          <el-table-column align="center" prop="overCount" :label="$t('inviteFriend.no3')">
          </el-table-column>
          <el-table-column align="center" prop="overdueCount" :label="$t('inviteFriend.no4')">
          </el-table-column>
          <el-table-column align="center" :label="$t('public.operation')" 
            v-if="$store.state.common.permiss.includes('RIGHT_RECORD_INVITE_ONE_LIST')">
            <template slot-scope="scope">
              <el-button @click="detailed(scope.row)" type="text" size="small">{{$t('public.no29')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

  <!-- ---------------  用户邀请详情 ---------------- -->
    <el-dialog title="" :visible.sync="dialogTableVisible" center>
      <div class="dialog-wrap">
        <div class="table">
          <template>
            <el-table :data="userDetail" size="small" stripe style="width: 100%"  empty-text>
              <el-table-column align="center" prop="id" :label="$t('public.userId')">
              </el-table-column>
              <el-table-column align="center" prop="name" :label="$t('public.name')">
              </el-table-column>
              <el-table-column align="center" prop="strRegisterTime" :label="$t('public.registerDate')" width="200">
              </el-table-column>
              <el-table-column align="center" :label="$t('public.approveStatus')">
                <template slot-scope="scope">
                  <template v-if="$store.state.common.lang!=='PHL'">
                    <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.userSelfStatus(scope.row.status))}}</span>
                    <span v-else>{{$store.state.common.nullData}}</span>
                  </template>
                  <template v-else>
                    <span v-if="scope.row.status!==null&&scope.row.status!==undefined&&scope.row.status!==''">{{$t($store.getters.userSelfStatus1(scope.row.status))}}</span>
                    <span v-else>{{$store.state.common.nullData}}</span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="loanOrder" :label="$t('public.historyOrder')">
              </el-table-column>
              <el-table-column align="center" prop="lendingOrder" :label="$t('public.lendingOrder')">
              </el-table-column>
              <el-table-column align="center" :label="$t('public.operation')" 
                v-if="$store.state.common.permiss.includes('RIGHT_RECORD_INVITE_ONE_LIST')">
                <template slot-scope="scope">
                  <router-link :to="'/userdetail?userId=' + scope.row.id">
                    <el-button type="text" size="small">{{$t('public.userDetail')}}</el-button>
                  </router-link>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </el-dialog>
    
  <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page.current"
            layout="total, prev, pager, next, ->"
            :total="page.total?page.total:0">
          </el-pagination>
        </div>
    </el-row>

  </div>
</template>
<script>
import searchFilter from '../../components/component/filter'
export default {
  name: 'operatorManage',
  components: {searchFilter},
  data () {
    return {
      condition: {},
      dialogTableVisible: false,
      formLabelWidth: '90px',
      couponsList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      filter: {
        userId: ''
      },
      userDetail:[],
      flag: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData (condition) {
      const self = this
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.inviteList,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        inviteId: condition?parseInt(condition.userId):''
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          self.couponsList = res.data.data
          self.page.total = res.data.header.page.total
        } else {
          self.$message.error(res.data.header.msg)
        }
      })
    },
    search (condition) {
      const self= this
      self.page.current = 1
      self.condition = condition
      this.fetchData(self.condition)
    },
    putExcel (condition) {
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.invite_list_excel,
            'page': {'index': this.page.current, 'size': 10},
            'sessionid': sessionStorage.getItem('sessionid')
          },
          inviteId: condition?parseInt(condition.userId):''
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
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      this.fetchData(this.condition)
    },
    detailed (obj) {
      const self = this
      self.dialogTableVisible = true
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.inviteDetailde,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        inviteId: obj?parseInt(obj.inviteId):''
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          self.userDetail = res.data.data
          // self.page.total = res.data.header.page.total
        } else {
          self.$message.error(res.data.header.msg)
        }
      })
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
  
  .operatorManage {
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
        // margin-right: 10px;
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

