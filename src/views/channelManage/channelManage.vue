<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('channelManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('channelManage.crumbsOne')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('channelManage.crumbsOne')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('channelManage.name')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.name"></el-input>
          </div>
        </el-col>
          <div class="search-input">
            <span>{{$t('loanAfterManage.paycodetime')}}:</span>
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
          <div class="search-input">
            <span>{{$t('channelManage.name')}}:</span>
            <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <template >
          <div class="search-input">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <div class="list_operation">
      <el-button type="primary" @click="add=true">{{$t('channelManage.no18')}}</el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table">
      <template>
        <el-table :data="tableData" size="small" stripe >
          <el-table-column align="center" prop="strCreateTime" :label="$t('channelManage.no19')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.strCreateTime!=''">{{scope.row.strCreateTime.slice(0,10)}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="applyCount" :label="$t('channelManage.name')">
          </el-table-column>
          <el-table-column align="center" prop="machineCount" :label="$t('channelManage.no20')">
          </el-table-column>
          <el-table-column align="center" prop="firstCount" :label="$t('channelManage.no21')">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('public.no22')">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')">
            <template slot-scope="scope">
              <span v-if="scope.row.status!==1" @click="del1=true">{{$t('channelManage.no22')}}</span>
              <span v-else @click="del2=true">{{$t('channelManage.no23')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <el-col :lg="12" :xl="11">
        <div class="pages">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
        </div>
      </el-col>
    </el-row>


    <!-- ------------------确认是否添加开始-------------------- -->
    <div v-if="add" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('channelManage.no18')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="add=false"></i>
        </div>
        <div class="reply-main-con">
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('channelManage.name')}}:
            </div>
            <div class="reply-con-one-3">
              <el-input size="small"  label="phone" v-model="ruleForm2.name1"></el-input>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('channelManage.no24')}}:
            </div>
            <div class="reply-con-one-3">
              <el-input size="small" label="phone" v-model="ruleForm2.name2"></el-input>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('channelManage.no25')}}:
            </div>
            <div class="reply-con-one-3">
              <el-input size="small"  label="phone" v-model="ruleForm2.url"></el-input>
            </div>
          </div>
          <div class="reply-but" @click="addSure">{{$t('proManage.sure')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 确认是否添加结束 -------------------- -->

    <!-- ----------------------确认是否删除开始------------------ -->
    <div v-if="del1||del2" class="del">
      <div class="del-main">
        <div class="del-main-head">
          <span></span>
          <p>{{$t('public.no48')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="del=false"></i>
        </div>
        <div class="del-main-con">
          <div class="del-con-one">{{delCon}}？</div>
          <div class="del-but">
            <div class="del-but-1" @click="delSure()">{{$t('public.no49')}}</div>
            <div class="del-but-1 active" @click="delClose">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------确认是否删除结束------------------- -->

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
      pageTotal: 0,
      searchTime: [],
      options: this.$store.state.options.paymentCode_option,
      // 用户查询信息数据对应字段
      formInline: {
        status: '',
        name: '',
        dayBegin: '',
        dayEnd: ''
      },
      currentPage: 1, // 当前页下标
      // 用户信息数据模拟
      tableData: [],
      add: false,
      del1: false, // 生效按钮点击弹窗
      del2: false, // 作废按钮点击弹窗
      ruleForm2: {
        name1: '',
        name2: '',
        url: ''
      },
      delCon: ''
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      this.formList();
    },
    formList () { // 获取通过率列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.through_rate,
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
    select () { // 搜索栏查询按钮点击操作
      if (this.flag) {
        this.flag = false
        this.formList();
      }
    },
    valid () { // 生效按钮操作

    },
    cancellation () { // 作废按钮操作

    },
    addSure () { // 作废生效弹窗

    },
    delSure () {

    },
    delClose () {
      this.del1 = false
      this.del2 = false
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.dayBegin = this.searchTime[0]
        this.formInline.dayEnd = this.searchTime[1]
      } else {
        this.formInline.dayBegin = ''
        this.formInline.dayEnd = ''
      }
    },
    del1 () {
      if (del1) {
        this.delCon = this.$t('channelManage.no26')
      }
    },
    del2 () {
      if (del2) {
        this.delCon = this.$t('channelManage.no27')
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    
    // this.formList();
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


.reply{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main{
    width: 566px;
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
      padding: 30px 30px;
      .reply-con-one{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        .reply-con-one-1{
          width: 100px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          color: #999;
          margin-bottom: 20px;
        }
        .reply-con-one-2{
          width: 350px;
          height: 40px;
          line-height: 40px;
          margin-bottom: 10px;
        }
        .reply-con-one-3{
          width: 350px;
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
          text-align: center;
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

.del {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .del-main {
    width: 474px;
    height: 240px;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .del-main-head {
      width: 100%;
      height: 48px;
      background-color: #333a4d;
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
      .icon-color {
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .del-main-con {
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .del-con-one {
        width: 100%;
        height: 40px;
        padding-top: 10px;
        color: #6b7283;
        font-size: 16px;
        text-align: center;
        margin: 30px 0;
      }
      .del-con-two {
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
      }
      .del-but {
        width: 260px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .del-but-1 {
          width: 45%;
          height: 100%;
          background-color: #547ef5;
          border-radius: 5px;
          text-align: center;
          line-height: 38px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
        .active {
          background-color: #ebeef6;
          color: #333;
        }
      }
    }
  }
}
</style>
