<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('serviceManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('serviceManage.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('serviceManage.crumbsFour')}}</p>
    </div>

    <!-- -------------搜索查询栏------------------------ -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('public.userTel')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.userPhone"></el-input>
          </div>
        </el-col>
        <div class="search-input">
          <span>{{$t('serviceManage.isJoin')}}:</span>
          <el-select size="small" v-model="formInline.userIsRegist" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('serviceManage.isLoan')}}:</span>
          <el-select size="small" v-model="formInline.userHasOrder" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('serviceManage.isResult')}}:</span>
          <el-select size="small" v-model="formInline.isSolve" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('loanMoneyDetail.opeTime')}}:</span>
          <el-date-picker 
            id="date1"
            size="small"
            v-model="searchTime" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth" 
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </div>
        <template v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_QUERY')">
          <div class="search-input ml15">
            <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
          </div>
        </template>
      </el-row>
    </div>

    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_ADD')">
      <el-button type="primary" class="button-color" @click="add=true">{{$t('serviceManage.add')}}</el-button>
    </div>

    <!-- -------------表单显示栏------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe>
          <el-table-column align="center" prop="userPhone" :label="$t('public.userTel')">
          </el-table-column>
          <el-table-column align="center" prop="userId" :label="$t('serviceManage.isJoin')">
            <template slot-scope="scope">
              <span>{{scope.row.userId?$t('auditDetail.isAdressBook.no1'):$t('auditDetail.isAdressBook.no2')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="lastOrderId" :label="$t('serviceManage.isLoan')">
            <template slot-scope="scope">
              <span>{{scope.row.lastOrderId?$t('auditDetail.isAdressBook.no1'):$t('auditDetail.isAdressBook.no2')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="question" :label="$t('serviceManage.requestDes')">
          </el-table-column>
          <el-table-column align="center" prop="answer" :label="$t('serviceManage.requestRes')">
          </el-table-column>
          <el-table-column align="center" prop="isSolve" :label="$t('serviceManage.isResult')">
            <template slot-scope="scope">
              <span>{{scope.row.isSolve==1?$t('auditDetail.isAdressBook.no1'):$t('auditDetail.isAdressBook.no2')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strUpdateTime" :label="$t('loanMoneyDetail.opeTime')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="serviceName" :label="$t('userSuggest.adminName')">
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" min-width="120">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_SHOW')"
                class="table_opr"
                @click="proModify(scope.row.userPhone,scope.row.userName,scope.row.question,scope.row.answer,scope.row.isSolve)"
              >
              {{$t('public.no29')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_LIST')">
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

    <!-- ------------------确认是否修改开始-------------------- -->
    <div v-if="add" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('loanAfterOperation.add2')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="addClose"></i>
        </div>
        <div class="reply-main-con">
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('public.userTel')}}:
            </div>
            <div class="reply-con-one-3">
              <el-input size="small" style="width:210px" label="phone" v-model="ruleForm2.userPhone"></el-input>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('public.userName')}}:
            </div>
            <div class="reply-con-one-3">
              <el-input size="small" style="width:210px" label="name" v-model="ruleForm2.userName"></el-input>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('serviceManage.requestDes')}}:
            </div>
            <div class="reply-con-one-3">
              <textarea class="search_input" v-model="ruleForm2.question" :placeholder="$t('new.no44')+'~'"></textarea>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('serviceManage.requestRes')}}:
            </div>
            <div class="reply-con-one-3">
              <textarea class="search_input" v-model="ruleForm2.answer" :placeholder="$t('new.no45')+'~'"></textarea>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('serviceManage.isResult')}}:
            </div>
            <div class="reply-con-one-3">
              <el-select size="small" v-model="ruleForm2.isSolve" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div
            v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_ADD_SUBMIT')||$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_SHOW_SUBMIT')"
            class="reply-but" 
            @click="addSure">
          {{$t('proManage.sure')}}
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="modify" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('public.no29')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="addClose"></i>
        </div>
        <div class="reply-main-con">
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('public.userTel')}}:
            </div>
            <div class="reply-con-one-3">
              <el-input size="small" style="width:210px" label="phone" disabled v-model="ruleForm2.userPhone"></el-input>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('public.userName')}}:
            </div>
            <div class="reply-con-one-3">
              <el-input size="small" style="width:210px" label="name" disabled v-model="ruleForm2.userName"></el-input>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('serviceManage.requestDes')}}:
            </div>
            <div class="reply-con-one-3">
              <textarea class="search_input" v-model="ruleForm2.question" disabled :placeholder="$t('userSuggest.placeholder')+'~'"></textarea>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('serviceManage.requestRes')}}:
            </div>
            <div class="reply-con-one-3">
              <textarea class="search_input" v-model="ruleForm2.answer" disabled :placeholder="$t('userSuggest.placeholder')+'~'"></textarea>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('serviceManage.isResult')}}:
            </div>
            <div class="reply-con-one-3">
              <el-select size="small" v-model="ruleForm2.isSolve" disabled :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div
            v-if="$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_ADD_SUBMIT')||$store.state.common.permiss.includes('RIGHT_CUSTOMER_SERVICE_VISIT_SHOW_SUBMIT')"
            class="reply-but" 
            @click="addClose">
          {{$t('proManage.sure')}}
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <div class="foot"></div>

  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      sessionid: '',
      flag: true,
      searchTime: [],
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      formInline: { // 用户查询信息数据对应字段
        userPhone: '',
        userIsRegist: '',
        userHasOrder: '',
        isSolve: '',
        updateStartTime: '',
        updateEndTime: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.isOverdue_option, // 订单状态下拉选框信息
      tableData: [], // 借款信息数据模拟
      add: false, // 添加修改记录开关
      modify: false, // 修改记录开关
      ruleForm2: {
        userPhone: '',
        userName: '',
        isSolve: '',
        question: '',
        answer: '',
        remark: ''
      }
    }
  },
  methods: {
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.kfsList();
    },
    handleCurrentChange (val) { // 分页按钮操作
      this.currentPage = val
      this.kfsList();
    },
    select () { // 点击查询按钮操作
      this.$store.commit('telComeList', this.formInline)
      if (this.flag) {
        this.flag = false
        this.kfsList();
      }
    },
    proModify (...arr) { // 查看修改操作
      this.modify = true
      this.ruleForm2.userPhone = arr[0]
      this.ruleForm2.userName = arr[1]
      this.ruleForm2.question = arr[2]
      this.ruleForm2.answer = arr[3]
      this.ruleForm2.isSolve = String(arr[4])
    },
    kfsList () { // 获取借款列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.kf_telCome,
          'page': {'index': this.currentPage, 'size': this.currentPage},
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
    addSure () {
      if (this.ruleForm2.userPhone == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstOne'))
        return
      }
      if (this.ruleForm2.userName == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstTwo'))
        return
      }
      if (this.ruleForm2.question == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstThree'))
        return
      }
      if (this.ruleForm2.answer == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstThree'))
        return
      }
      if (this.ruleForm2.isSolve == '') {
        this.$globalMsg.error(this.$t('serviceManage.firstFive'))
        return
      }
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.kf_telCome_add,
            'sessionid': this.sessionid
          },
          ...this.ruleForm2
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
            this.kfsList()
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.addClose()
        })
      }
    },
    addClose () {
      this.add = false
      this.modify = false
      this.ruleForm2.userPhone = ''
      this.ruleForm2.userName = ''
      this.ruleForm2.isSolve = ''
      this.ruleForm2.question = ''
      this.ruleForm2.answer = ''
      this.ruleForm2.remark = ''
    }

  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.updateStartTime = this.$store.getters.yyyy_m_d(this.searchTime[0])
        this.formInline.updateEndTime = this.$store.getters.yyyy_m_d(this.searchTime[1])
      } else {
        this.formInline.updateStartTime = ''
        this.formInline.updateEndTime = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.telComeList_select) !== '{}') {
      this.formInline = this.$store.state.common.telComeList_select
      if(this.formInline.updateStartTime!==''){
        this.searchTime.push(this.formInline.updateStartTime)
        this.searchTime.push(this.formInline.updateEndTime)
      }
      
    }
    this.kfsList()// 获取借款列表
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
  height: auto;
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


// 回复内容
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
        .reply-con-one-1{
          width: 100px;
          height: 40px;
          text-align: center;
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

</style>
