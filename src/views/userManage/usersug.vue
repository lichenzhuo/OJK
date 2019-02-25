<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('userList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('userSuggest.crumbsOne')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------------ 横条 ------------------- -->
    <div class="paixu">
      <span></span>
      <p>{{$t('userSuggest.title')}}</p>
    </div>

    <!-- ------------ 搜索查询栏开始 -------------- -->
    <div class="search">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :md="8" :lg="6" :xl="4">
          <div class="search-input">
            <span>{{$t('public.registerPhone')}}:</span>
            <el-input size="small" label="phone" v-model="formInline.phone"></el-input>
          </div>
        </el-col>
        <template v-if="$store.state.common.lang==='vi'">
          <el-col :md="8" :lg="5" :xl="4">
            <div class="search-input">
              <span>{{$t('public.no2')}}:</span>
              <el-input size="small" label="idCard" v-model="formInline.idCard"></el-input>
            </div>
          </el-col>
        </template>
        <div class="search-input">
          <span>{{$t('public.submitDate')}}:</span>
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
        <div class="search-input">
          <span>{{$t('userSuggest.noteStatus')}}:</span>
          <el-select size="small" v-model="formInline.status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input">
          <span>{{$t('yuenan.no22')}}:</span>
          <el-select size="small" v-model="formInline.feedbackType" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options2" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-input ml15" v-if="$store.state.common.permiss.includes('RIGHT_USER_FEEDBACK_QUERY')">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
        
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->


    <!-- ------------ 列表附加功能开始 -------------- -->
    <div class="list_operation">
      <el-button v-if="allFlag" type="primary" class="button-color" @click.stop="allDataDispose">+{{$t('userSuggest.all')}}</el-button>
      <el-button v-else type="info" class="button-color" >+{{$t('userSuggest.all')}}</el-button>
    </div>
    <!-- ------------ 列表附加功能结束 -------------- -->

    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_USER_FEEDBACK_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" :selectable="unSelect" width="55">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.registerPhone')" >
          </el-table-column>
          <template v-if="$store.state.common.lang==='vi'">
            <el-table-column align="center" prop="idCard" :label="$t('public.no2')" >
            </el-table-column>
          </template>
          <el-table-column align="center" prop="createTime" :label="$t('public.submitDate')" width="86">
          </el-table-column>
          <el-table-column align="center" prop="content" :label="$t('userSuggest.suggest')" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('userSuggest.status')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.sugStatus(scope.row.status))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="feedbackType" :label="$t('yuenan.no22')" >
            <template slot-scope="scope">
              <span>{{$t($store.getters.sugTypeStatus(scope.row.feedbackType))}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="adminName" :label="$t('userSuggest.adminName')" >
          </el-table-column>
          <el-table-column fixed="right" align="center" prop="operation" :label="$t('public.operation')" >
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_USER_FEEDBACK_SHOW')"
                class="table_opr" 
                @click="sugDetail(scope.row.id,scope.row.phone,scope.row.createTime,scope.row.content,scope.row.replyContent,scope.row.feedbackPictureUrl)"
              >
                {{$t('public.detail')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_USER_FEEDBACK_REPLY')&&(scope.row.status==2||scope.row.status==1)"
                style="color:#547ef6;cursor:pointer;margin:0 5px;"
                @click="reply(scope.row.id,scope.row.phone,scope.row.content,scope.row.replyContent,scope.row.feedbackPictureUrl)"
              >
              {{$t('userSuggest.replay')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- -------------分页显示栏------------------------ -->
    <el-row type="flex" justify="end" >
      <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_USER_FEEDBACK_LIST')">
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

    <!-- ------------------ 点击查看详情弹窗开始 -------------------- -->
    <el-dialog :title="$t('userSuggest.title1')" :visible.sync="detailFlag" width="650px">
      <div class="left2right">
        <span class="left">{{$t('public.userPhone')}}:  </span>
        <span class="right">{{tel}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('public.submitDate')}}:  </span>
        <span class="right">{{time}}</span>
      </div>
      <div class="left2right">
        <span class="left">{{$t('userSuggest.suggest')}}:  </span>
        <div class="right">
          <el-input type="textarea" :rows="4" v-model="sugCon" disabled></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left"></span>
        <div class="right">
          <div v-if="feedbackPictureUrl" class="detail_pic pic" @click="openBox({imgUrl:feedbackPictureUrl})">
            <img :src="feedbackPictureUrl" alt="">
          </div>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('userSuggest.sugReply')}}:  </span>
        <div class="right">
          <el-input type="textarea" :rows="4" v-model="replyContent" disabled></el-input>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 点击查看详情弹窗结束 -------------------- -->

    <!-- ------------------ 点击回复弹窗开始 -------------------- -->
    <el-dialog :title="$t('userSuggest.title2')" :visible.sync="replyFlag" width="650px">
      <div class="reply-main">
        <div class="reply-main-con">
          <div class="reply-con-one">
            <div class="reply-con-one-1">
              {{$t('public.userPhone')}}:
            </div>
            <div class="reply-con-one-2">
              {{tel}}
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('userSuggest.suggest')}}:
            </div>
            <div class="reply-con-one-5">
              <textarea class="search_input" v-model="sugCon" disabled></textarea>
              <div v-if="feedbackPictureUrl" class="imgbox pic" @click="openBox({imgUrl:feedbackPictureUrl})">
                <img :src="feedbackPictureUrl" alt="">
              </div>
            </div>
          </div>
          <div class="reply-con-one">
            <div class="reply-con-one-4">
              {{$t('userSuggest.sugReply')}}:
            </div>
            <div class="reply-con-one-3">
              <textarea class="search_input" v-model="replyCon" :placeholder="$t('userSuggest.placeholder')+'~'"></textarea>
            </div>
          </div>
          <div class="reply-but" @click="replySubmit">{{$t('userSuggest.sureSubmit')}}</div>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 点击回复弹窗结束 -------------------- -->

    <!-- ------------------ 点击批量处理弹窗开始 -------------------- -->
    <el-dialog :title="$t('userSuggest.all')" :visible.sync="allDataFlag" width="750px">
      <el-table :data="multipleSelection" size="small" stripe style="width: 100%">
        <el-table-column align="center" prop="phone" :label="$t('public.registerPhone')" width="120">
        </el-table-column>
        <el-table-column align="center" prop="content" :label="$t('userSuggest.suggest')" :show-overflow-tooltip="true" min-width="200">
        </el-table-column>
        <el-table-column align="center" prop="createTime" :label="$t('public.submitDate')" width="140">
        </el-table-column>
      </el-table>
      <div class="left2right mt15">
        <span class="left">{{$t('userSuggest.suggest')}}:  </span>
        <div class="right">
          <el-select size="small" v-model="allData_status" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in options" :key="item.value" :label="$t(item.label)" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="left2right">
        <span class="left">{{$t('public.no37')}}:  </span>
        <div class="right">
          <el-input type="textarea" :rows="4" v-model="remark"></el-input>
        </div>
      </div>
      <div class="left2right">
        <span class="left"></span>
        <div class="right">
          <el-button type="primary" size="small" @click="allDataSubmit">{{$t('proManage.sure')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- ------------------ 点击批量处理弹窗结束 -------------------- -->

    <div class="foot"></div>

    <transition name="fade">
      <app-lightbox :close="closeBox" :imgsource="currentObj" v-if="lightBoxToggle"></app-lightbox>
    </transition>
    
  </div>
</template>
<script>
import appLightbox from '../../components/component/lightbox'// 图片点击放大组件
export default{
  components: {
    appLightbox
  },
  data () {
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      pageNumber: 10, // 每页条数
      searchTime: [], // 查询日期
      formInline: {// 点击查询按钮对应数据
        status: '',
        phone: '',
        idCard: '',
        subTimeBegin: '',
        subTimeEnd: ''
      },
      currentPage: 1, // 当前页下标
      options1: this.$store.state.options.suggest_option, // 下拉选框信息
      options2: this.$store.state.options.sugType_option, // 反馈类型下拉选框信息
      options: this.$store.state.options.suggest_option_allData, // 下拉选框信息
      tableData: [], // 用户信息数据模拟
      replyFlag: false, // 回复弹窗开关
      detailFlag: false, // 详情弹窗开关
      allFlag: false, // 批量处理展示与否
      replyId: '', // 选择的是当前回复行的ID
      id2: '', // 选择的是当前详情行的ID
      time: '', // 点击详情需要传递的时间数据
      tel: '', // 点击详情需要传递的电话号码数据
      replyCon: '', // 回复的内容
      sugCon: '', // 用户建议
      sugCon1: 'ndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndjndbdndj', // 用户建议
      replyContent: '', // 查看详情回复的内容展示
      feedbackPictureUrl: '', // 查看详情回复的图片展示
      multipleSelection: [], // 可勾选表格选中项
      allDataFlag: false, // 可勾选表格选中项
      allData_status: '', // 批量提交状态值
      remark: '',// 批量提交备注
      currentObj: '', // 当前点击选中的图片信息
      lightBoxToggle: false// 图片放大显示层开关
    }
  },
  methods: {
    sugDetail (id, tel, time, sug, replyContent,feedbackPictureUrl) { // 点击查看详情
      this.detailFlag = true;
      this.id2 = id;
      this.tel = tel;
      this.time = time;
      this.sugCon = sug;
      this.replyContent = replyContent;
      this.feedbackPictureUrl = feedbackPictureUrl;
    },
    handleSizeChange (val) {// 每页条数变化时操作
      this.pageNumber = val;
      this.sugList();
    },
    handleCurrentChange (val) { // 分页按钮第几页
      this.currentPage = val;
      this.sugList();
    },
    reply (id, tel, sug, reply,feedbackPictureUrl) { // 回复按钮操作
      this.replyFlag = true;
      this.replyId = id;
      this.tel = tel;
      this.sugCon = sug;
      this.replyCon = reply;
      this.feedbackPictureUrl = feedbackPictureUrl;
    },
    replySubmit () { // 回复确认要做的事情
      if (this.flag) {
        this.flag = false;
        if (this.replyCon) {
          let option = {
            header: {
              action: this.$store.state.actionMap.sug_reply,
              ...this.$base,
              sessionid: this.sessionid
            },
            id: this.replyId,
            content: this.replyCon
          }
          this.$axios.post('', option).then(res => {
            this.flag = true;
            if (res.data.header.code == 0) {
              this.$globalMsg.success(this.$t('userSuggest.success'));
              this.sugList();
            } else {
              this.$globalMsg.err(this.$t('userSuggest.err'));
            }
            this.replyFlag = false;
          })
        } else {
          this.$globalMsg.error(this.$t('userSuggest.replyFirst'));
          this.flag = true;
        }
      }
    },
    select () { // 点击查询按钮
      this.$store.commit('userSugList', this.formInline);
      if (this.flag) {
        this.flag = false;
        this.sugList();
      }
    },
    sugList () { // 获取用户反馈列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.sug_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
          if (this.formInline.phone !== '') {
            this.allFlag = true;
          } else {
            this.allFlag = false;
          }
        }
      })
    },
    unSelect (row) {
      return !!(row.status == 1 || row.status == 2);
    },
    allDataDispose () { // 批量处理弹窗开关
      if(this.allFlag){
        if (this.multipleSelection == '') {
          this.$globalMsg.error(this.$t('loanAfterManage.selFirst'));
        } else {
          this.allDataFlag = true;
        }
      }
      
    },
    handleSelectionChange (val) { // 表格选中项数据
      this.multipleSelection = val;
    },
    allDataSubmit () { // 批量处理确认操作
      if (this.remark == '') {
        this.$globalMsg.error(this.$t('userSuggest.placeholder'));
        return;
      }
      let arr = [];
      this.multipleSelection.forEach(value => {
        arr.push(Number(value.id));
      })
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.sug_all_submit,
            'sessionid': this.sessionid
          },
          replyContent: this.remark,
          status: 4,
          ids: arr
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          this.allFlag = false;
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('userSuggest.success'));
          } else {
            this.$globalMsg.error(res.data.header.msg);
          }
          this.allDataFlagClose();
          this.sugList();
        })
      }
    },
    allDataFlagClose () {
      this.remark = '';
      this.allDataFlag = false;
    },
    detailClose () {
      this.detailFlag = false;
      this.feedbackPictureUrl = '';
    },
    replyClose () {
      this.replyFlag = false;
      this.feedbackPictureUrl = '';
    },
    openBox (obj) { // 图片放大显示
      this.currentObj = obj
      this.lightBoxToggle = !this.lightBoxToggle
    },
    closeBox () { // 图片放大关闭
      this.lightBoxToggle = false
    },
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.subTimeBegin = this.$store.getters.yyyy_m_d(this.searchTime[0]);
        this.formInline.subTimeEnd = this.$store.getters.yyyy_m_d(this.searchTime[1]);
      } else {
        this.formInline.subTimeBegin = '';
        this.formInline.subTimeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    if (JSON.stringify(this.$store.state.common.userSugList_select) !== '{}') {
      this.formInline = this.$store.state.common.userSugList_select;
      if(this.formInline.subTimeBegin!==''){
        this.searchTime.push(this.formInline.subTimeBegin);
        this.searchTime.push(this.formInline.subTimeEnd);
      }
      
    }
    this.sugList();// 获取用户反馈列表
  }
}
</script>
<style scoped lang="scss">
.table {
  min-height: 440px;
}

.reply-main{
  width: 100%;
  .reply-main-con{
    width: 100%;
    height: auto;
    padding: 10px 0;
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
      .reply-con-one-5{
        width: 560px;
        height: 100px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        textarea{
          width: 70%;
          height: 100px;
          font-size: 16px;
          padding: 5px;
        }
        .imgbox{
          width: 24%;
          height: 100px;
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

.detail_pic{
  width: 200px;
}

</style>
