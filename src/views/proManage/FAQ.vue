<template>
  <div class="userSuggest">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('proManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('proManage.crumbsThree')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- ------------------ 横条 ------------------- -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('proManage.crumbsThree')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_ADD')">
      <el-row type="flex" justify="start" align="middle" >
        <!-- <el-col :md="9" :lg="6" :xl="5"> -->
          <div class="search-input">
            <span>{{$t('proManage.faqState')}}:</span>
            <el-select size="small" v-model="formInline.type" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
              </el-option>
            </el-select>
          </div>
        <!-- </el-col> -->
        <!-- <el-col :md="6" :lg="4" :xl="4"> -->
          <div class="search-input" v-if="$store.state.common.lang==='vi'">
            <span>{{$t('new.no49')}}:</span>
            <el-input size="small" label="orderId" v-model="formInline.appPackage"></el-input>
          </div>
        <!-- </el-col> -->
        <template v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_QUERY')">
          <!-- <el-col :md="3" :lg="2" :xl="2"> -->
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          <!-- </el-col> -->
        </template>
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <div class="search act" >
      <el-row :gutter='10'>
        <el-col :span="5">
          <div class="search-input">
            <el-button type="primary" class="button-color" @click="add=true">+{{$t('proManage.crumbsThree')}}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe >
          <el-table-column align="center" prop="id" :label="$t('proManage.faqId')" width="100">
          </el-table-column>
          <el-table-column align="center" prop="title" :label="$t('proManage.faqTitle')" min-width="140">
          </el-table-column>
          <el-table-column align="center" prop="answer" :label="$t('proManage.request')" min-width="120">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('proManage.faqState')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.type!==null&&scope.row.type!==undefined&&scope.row.type!==''">{{scope.row.type==1?$t('loanMoneyDetail.loanMoney'):$t('loanMoneyDetail.backMoney')}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="createTime" :label="$t('proManage.joinTime')" min-width="120">
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="appPackage" :label="$t('new.no49')" min-width="120">
            </el-table-column>
            <el-table-column align="center" prop="pid" :label="$t('yuenan.no30')" min-width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.pid!==null&&scope.row.pid!==undefined&&scope.row.pid!==''">{{scope.row.pid===0?$t('yuenan.no32'):$t('yuenan.no31')}}</span>
                <span v-else>{{$store.state.common.nullData}}</span>
              </template>
            </el-table-column>
          </template>
          

          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="130">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_EDIT')"
                style="color:#547ef6;cursor:pointer;margin:0 5px;" 
                @click="modifyPre(scope.row.id,scope.row.title,scope.row.answer,scope.row.type)">
                {{$t('public.no51')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_DEL')"
                style="color:#547ef6;cursor:pointer;margin:0 5px;"
                @click="delPre(scope.row.id)">
                {{$t('permission.del')}}
              </span>  
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- -------------分页显示栏------------------------ -->
    <el-row  type="flex" justify="end">
        <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_PROBLEM_LIST')">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0">
        </el-pagination>
        </div>
    </el-row>

    <!-- ----------------------确认是否删除开始------------------ -->
    <div v-if="del" class="del">
      <div class="del-main">
        <div class="del-main-head">
          <span></span>
          <p>{{$t('public.no48')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="del=false"></i>
        </div>
        <div class="del-main-con">
          <div class="del-con-one">{{$t('proManage.delFaq')}}？</div>
          <div class="del-but">
            <div class="del-but-1" @click="delSure()">{{$t('public.no49')}}</div>
            <div class="del-but-1 active" @click="del=false">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------确认是否删除结束------------------- -->

    <!-- ------------------确认是否修改开始-------------------- -->
    <div v-if="modify||add" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('public.no29')}}/{{$t('public.no51')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="addClose"></i>
        </div>
        <div class="reply-main-con">
          <div class="reply-con-one">
            <div class="reply-con-one-1">
              {{$t('proManage.faqState')}}:
            </div>
            <div class="reply-con-one-2">
              <el-select size="small" v-model="ruleForm2.type" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="reply-con-one" v-if="$store.state.common.lang==='vi'&&add">
            <div class="reply-con-one-1">
              {{$t('new.no49')}}:
            </div>
            <div class="reply-con-one-2">
              <el-input size="small"  v-model="ruleForm2.appPackage"></el-input>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('proManage.faqTitle')}}:
            </div>
            <div class="reply-con-one-3">
              <textarea class="search_input" v-model="ruleForm2.title" ></textarea>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('proManage.request')}}:
            </div>
            <div class="reply-con-one-3">
              <textarea class="search_input" v-model="ruleForm2.answer" :placeholder="$t('userSuggest.placeholder')+'~'"></textarea>
            </div>
          </div>
          <div class="reply-but" @click="modifySure">{{$t('proManage.sure')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <div class="foot"></div>

  </div>
</template>
<script>
export default{
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      // 查看详情产品信息数据对应字段
      formInline: {
        type: '',
        appPackage:''
      },
      options1: this.$store.state.options.faq_option,
      options2: this.$store.state.options.faq_option2,
      tableData: [{id: 1, title: '123', answer: '456', type: '1'}], // 数据模拟
      del: false, // 删除弹窗
      modify: false, // 修改弹窗
      add: false, // 添加弹窗
      delId: '', // 删除目标行数对应的id
      modifyId: '', // 修改目标行数对应的id
      ruleForm2: {
        title: '',
        answer: '',
        type: '',
        appPackage:''
      }
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮第几页
      this.currentPage = val
      this.faqList();
    },
    delPre (id) { // 删除按钮弹窗
      this.del = true
      this.delId = id
    },
    modifyPre (id, title, answer, type) { // 修改按钮弹窗
      this.modify = true
      this.modifyId = id
      this.ruleForm2.title = title
      this.ruleForm2.answer = answer
      this.ruleForm2.type = String(type)
    },
    delSure () { // 删除确认操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.pro_faq_del,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          id: this.delId
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
            this.faqList()
          } else {
            this.$globalMsg.error(this.$t('message.warning'))
          }
          this.del = false
        })
      }
    },
    modifySure () { // 修改确认操作
      if (this.ruleForm2.type == '') {
        this.$globalMsg.error(this.$t('new.no43'))
        return
      }
      if (this.ruleForm2.title == '') {
        this.$globalMsg.error(this.$t('new.no44'))
        return
      }
      if(this.add&&this.$store.state.common.lang==='vi'){
        if (this.ruleForm2.appPackage == '') {
          this.$globalMsg.error(this.$t('public.no88'))
          return
        }
      }
      
      if (this.ruleForm2.answer == '') {
        this.$globalMsg.error(this.$t('new.no45'))
        return
      }

      let option = {
        header: {
          action: this.$store.state.actionMap.pro_faq_add,
          ...this.$base,
          sessionid: this.sessionid
        },
        ...this.ruleForm2
      }
      if (this.modify) {
        option.id = this.modifyId
        option.header.action = this.$store.state.actionMap.pro_faq_update
      }
      if (this.flag) {
        this.flag = false
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
            this.faqList()
          } else {
            this.$globalMsg.error(this.$t('message.warning'))
          }
          this.addClose()
        })
      }
    },
    faqList () { // 获取产品列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_faq_select,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    select () { // 查询按钮点击操作
      this.faqList();
    },
    addClose () {
      this.add = false
      this.modify = false
      this.ruleForm2.type = ''
      this.ruleForm2.title = ''
      this.ruleForm2.answer = ''
      this.ruleForm2.appPackage = ''
    }
  },
  mounted () {
    let sessionid = sessionStorage.getItem('sessionid')
    this.sessionid = sessionid
    this.faqList()
  }
}
</script>
<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}
.userSuggest {
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
  height: 80px;
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
    margin-right: 10px;
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
.act{
  padding: 5px 28px 5px 5px;
}

.table {
  width: 100%;
  min-height: 440px;
}

.pro-imglist{
  width: 100px;
  height: 68px;
  margin: 0 auto;
}


.del{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  @include flex-cen;
  z-index: 100;
  background-color: rgba(182, 189, 205, 0.6);
  .del-main{
    width: 474px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .del-main-head{
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
    .del-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .del-con-one{
        width: 100%;
        height: 40px;
        padding-top: 10px;
        color: #6b7283;
        font-size: 16px;
        text-align: center;
        margin: 30px 0;
      }
      .del-con-two{
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
        
      }
      .del-but{
        width: 260px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .del-but-1{
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
        .active{
          background-color: #ebeef6;
          color: #333;
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
        .reply-con-one-1{
          width: 100px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          color: #333;
          margin-bottom: 20px;
        }
        .reply-con-one-2{
          width: 560px;
          height: 40px;
          line-height: 40px;
          margin-bottom: 10px;
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
          color: #333;
          font-weight: 600;
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
