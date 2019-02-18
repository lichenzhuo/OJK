<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('userList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('userList.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('userList.crumbsTwo')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userId')}}:</span>
            <el-input size="small" label="ID" v-model="formInline.userId"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="4" :xl="5">
          <div class="search-input">
            <span>{{$t('public.userName')}}:</span>
            <el-input size="small" label="name" v-model="formInline.name"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="5" :xl="5">
          <div class="search-input">
            <span>{{$t('public.userPhone')}}:</span>
            <el-input size="small" label="tel" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xl="4">
          <div class="search-input">
            <span>{{$t('public.registerChannel')}}:</span>
            <el-input size="small" label="regChannel" v-model="formInline.regChannel"></el-input>
          </div>
        </el-col>
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('public.approveStatus')}}:</span>
            <el-select size="small" v-model="formInline.isAuth" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('public.userSelfStatus')}}:</span>
            <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no48')}}:</span>
            <el-select size="small" clearable v-model="formInline.appName" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :md="8" :lg="6" :xl="5">
          <div class="search-input">
            <span>{{$t('new.no49')}}:</span>
            <el-select size="small" clearable v-model="formInline.appPackage" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <template v-if="$store.state.common.lang==='vi'">
          <el-col :md="8" :lg="6" :xl="5">
            <div class="search-input">
              <span>{{$t('public.registerClient')}}:</span>
              <el-select size="small" v-model="formInline.regDevice" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options5" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :md="8" :lg="5" :xl="4">
            <div class="search-input">
              <span>{{$t('public.no2')}}:</span>
              <el-input size="small" label="idCard" v-model="formInline.idCard"></el-input>
            </div>
          </el-col>
        </template>
        <el-col :md="14" :lg="11" :xl="7">
          <div class="search-input">
            <span>{{$t('public.registerDate')}}:</span>
            <el-date-picker 
              id="date1"
              v-model="searchTime" 
              size="small"
              type="daterange" 
              range-separator="~" 
              :default-value="$store.state.common.preMonth" 
              :start-placeholder="$t('public.beginTime')" 
              :end-placeholder="$t('public.endTime')">
            </el-date-picker>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        <template v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_EXP')">
          <el-col :md="5" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
        
    </div>

    <div class="search act" v-if="$store.state.common.permiss.includes('RIGHT_ADD_SPECIAL_USER_STATUS')">
      <el-row :gutter='10'>
        <el-col :span="5">
          <div class="search-input">
            <el-button type="primary" class="button-color" @click="addFlagShow">{{$t('new.no65')}}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_LIST')">
      <template v-if="$store.state.common.lang==='vi'">
        <el-table 
          :data="tableData" 
          size="small"
          style="width: 100%"
          highlight-current-row
          @current-change="tableRowChange"
        >
          <el-table-column align="right" label="" width="60">
            <template slot-scope="scope">
              <template>
                <el-radio v-model="radioVal"
                          :label="scope.row.id"
                          >&nbsp;
                </el-radio>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="id" :label="$t('public.userId')" width="120">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userPhone')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('public.name')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="idCard" :label="$t('public.no2')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="regChannel" :label="$t('public.registerChannel')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="isAuth" :label="$t('public.approveStatus')" min-width="160">
            <template slot-scope="scope">
              <template>
                <span v-if="scope.row.isAuth!==null&&scope.row.isAuth!==undefined&&scope.row.isAuth!==''">{{$t($store.getters.new_userSelfStatus(scope.row.isAuth))}}</span>
                <span v-else>{{$store.state.common.nullData}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="orderCount" :label="$t('public.loanNum')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="isBlack" :label="$t('public.userSelfStatus')" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isBlack!==null&&scope.row.isBlack!==undefined&&scope.row.isBlack!==''">{{$t($store.getters.blackStatus(scope.row.isBlack))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strRegTime" :label="$t('public.registerDate')" min-width="140">
          </el-table-column>
          <el-table-column align="center" prop="appName" :label="$t('new.no48')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="appPackage" :label="$t('new.no49')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="regDeviceName" :label="$t('public.registerClient')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="160">
            <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_DETAIL')">
              <span style="color:#547ef6;cursor:pointer" @click="socialDetali(scope.row.id)">{{$t('public.detail')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-table 
          :data="tableData" 
          size="small" 
          style="width: 100%"
          highlight-current-row
          @current-change="tableRowChange"
        >
          <el-table-column align="right" label="" width="60">
            <template slot-scope="scope">
              <template>
                <el-radio v-model="radioVal"
                          :label="scope.row.id"
                          >&nbsp;
                </el-radio>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="id" :label="$t('public.userId')" width="100">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userPhone')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="name" :label="$t('public.name')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="regChannel" :label="$t('public.registerChannel')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="isAuth" :label="$t('public.approveStatus')" min-width="160">
            <template slot-scope="scope">
              <template>
                <span v-if="scope.row.isAuth!==null&&scope.row.isAuth!==undefined&&scope.row.isAuth!==''">{{$t($store.getters.new_userSelfStatus(scope.row.isAuth))}}</span>
                <span v-else>{{$store.state.common.nullData}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="orderCount" :label="$t('public.loanNum')" min-width="160">
          </el-table-column>
          <el-table-column align="center" prop="isBlack" :label="$t('public.userSelfStatus')" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isBlack!==null&&scope.row.isBlack!==undefined&&scope.row.isBlack!==''">{{$t($store.getters.blackStatus(scope.row.isBlack))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strRegTime" :label="$t('public.registerDate')" min-width="140">
          </el-table-column>
          <el-table-column align="center" prop="appName" :label="$t('new.no48')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="appPackage" :label="$t('new.no49')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="160">
            <template slot-scope="scope" v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_DETAIL')">
              <span style="color:#547ef6;cursor:pointer" @click="socialDetali(scope.row.id)">{{$t('public.detail')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_USER_LIST_LIST')">
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

    <div v-if="addFlag" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('new.no65')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="addFlagClose"></i>
        </div>
        <div class="reply-main-con">
          <div class="reply-con-one">
            <div class="reply-con-one-1">
              {{$t('public.userSelfStatus')}}:
            </div>
            <div class="reply-con-one-2">
              <el-select size="small" v-model="addUser.userStatus" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options6" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('public.no37')}}:
            </div>
            <div class="reply-con-one-3">
              <textarea class="search_input" v-model="addUser.remark" :placeholder="$t('loanMoney.placeholder')+'~'"></textarea>
            </div>
          </div>
          <div class="reply-but" @click="addUserSubmit">{{$t('public.no47')}}</div>
        </div>
      </div>
    </div>

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
      searchTime: [], // 查询日期
      // 用户查询信息数据对应字段
      formInline: {
        userId: '',
        name: '',
        phone: '',
        idCard: '',
        regChannel: '',
        regDateBegin: '',
        regDateEnd: '',
        status: '',
        appName: '',
        appPackage: '',
        regDevice: '',
        isAuth: ''
      },
      currentPage: 1, // 当前页下标
      addFlag: false, // 添加特殊名单弹窗开关
      options1: this.$store.state.options.approveStatus_options, // 认证状态下拉选框信息
      options2: this.$store.state.options.blackStatus_options, // 身份状态下拉选框信息
      options3: [], // APP名下拉选框信息
      options4: [], // APP包名身份状态下拉选框信息
      tableData: [], // 用户信息数据模拟
      options5: this.$store.state.options.registerClient, // 注册客户端类型
      options6: this.$store.state.options.addSpecialUser,  // 添加特殊名单用户状态
      addUser: {
        userStatus: '',
        remark: ''
      },
      tableSelect:'',
      radioVal:'',
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.userList()
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.tableSelect = ''
      this.radioVal = ''
      this.currentPage = val
      this.userList()
    },
    socialDetali (id) { // 查看详情操作
      this.$router.push({path: '/userdetail?userId=' + id})
    },
    select () { // 点击查询按钮操作
      this.tableSelect = ''
      this.radioVal = ''
      this.$store.commit('userList', this.formInline)
      if (this.flag) {
        this.flag = false;
        this.userList()
      }
    },
    userList () { // 获取用户列表
      this.tableSelect = ''
      this.radioVal = ''
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.consumer_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
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
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.consumer_list_excel,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          }, 
          ...this.formInline
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            window.location.href = res.data.data.fileName;
          }
        })
      }
    },
    getAppName () { // 获取app名字和包名
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.select_allData,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let arr = res.data.data.package
          arr.forEach(value => {
            this.options3.push({value: value.optionName, label: value.optionName})
            this.options4.push({value: value.optionValue, label: value.optionValue})
          })
          this.addContent = true
        }
      })
    },
    addFlagShow () {
      if(this.tableSelect==''){
        this.$globalMsg.error(this.$t('public.no89'))
      }else{
        this.addFlag = true
      }
    },
    addFlagClose () {
      this.addFlag = false
      this.addUser.userStatus = ''
      this.addUser.remark = ''
    },
    addUserSubmit () {
      if (this.addUser.userStatus == '' || this.addUser.remark == '') {
        this.$globalMsg.error(this.$t('public.no88'))
        return
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.addSpecialUser,
          'sessionid': this.sessionid
        },
        id: this.tableSelect,
        status: this.addUser.userStatus,
        remark:this.addUser.remark
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
        }else {
          this.$globalMsg.error(res.data.header.msg)
        }
        this.userList()
        this.addFlag = false
        this.addUser.userStatus = ''
        this.addUser.remark = ''
      })
    },
    tableRowChange (val) {
      this.tableSelect = val.id
      this.radioVal = val.id
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.regDateBegin = this.$store.getters.yyyy_m_d( this.searchTime[0])
        this.formInline.regDateEnd = this.$store.getters.yyyy_m_d( this.searchTime[1])
        
      } else {
        this.formInline.regDateBegin = ''
        this.formInline.regDateEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.userList_select) !== '{}') {
      this.formInline = this.$store.state.common.userList_select
      if(this.formInline.regDateBegin!==''){
        this.searchTime.push(this.formInline.regDateBegin)
        this.searchTime.push(this.formInline.regDateEnd)
      }
      
    }
    this.userList()
    this.getAppName()
  }
}
</script>
<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table .el-table__body tr.current-row>td{
  background-color: #3b56ee;
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
.act{
  padding: 5px 28px 5px 5px;
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

.reply{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main{
    width: 694px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom:5px; 
    .reply-main-head{
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
    .reply-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .reply-con-one{
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        .reply-con-one-1{
          width: 100px;
          height: 40px;
          text-align: left;
          line-height: 40px;
          color: #999;
        }
        .reply-con-one-2{
          width: 560px;
          height: 40px;
          line-height: 40px;
        }
        .reply-con-one-3{
          width: 560px;
          height: 100%;
          margin-bottom: 10px;
          textarea{
            width: 100%;
            height: 100px;
            font-size: 16px;
            padding: 5px;
          }
        }
        .reply-con-one-4{
          width: 100px;
          height: 40px;
          text-align: left;
          color: #999;
          
        }
      }
      .reply-con-two{
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
        textarea{
          width: 100%;
          height: 100%;
          padding: 10px;
          font-size: 16px;
          background-color: #f4f6fb;
          color: #000;
        }
      }
      .reply-but{
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
