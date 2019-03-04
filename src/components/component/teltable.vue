<template>
  <div v-if="orderNo&&userId&&type">
    <div class="list_operation mt0" style="margin-top:0;">
      <el-button :class="{active:activeId==1}" type="primary" @click="filter('',1)">{{$t('auditDetail.no34')}}</el-button>
      <el-button class="ml15" type="primary" :class="{active:activeId==2}" @click="filter('isRelative',2)">
        {{$t('auditDetail.no37')}}{{telDataNum.relativesCount?telDataNum.relativesCount:0}}{{$t('auditDetail.no40')}}
      </el-button>
      <el-button class="ml15" type="primary" :class="{active:activeId==3}" @click="filter('isInContact',3)">
        {{$t('auditDetail.no38')}}{{String(telDataNum.callRate?telDataNum.callRate*100:0).slice(0,5)}}%
      </el-button>
      <el-button class="ml15" type="primary" :class="{active:activeId==4}" @click="filter('isDun',4)">
        {{$t('auditDetail.no39')}}{{telDataNum.dunCount?telDataNum.dunCount:0}}{{$t('auditDetail.no40')}}
      </el-button>
    </div>

    <div >
      <template>
        <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
          <el-table-column align="center" prop="name" :label="$t('public.name')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('public.userTel')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="contactCnt" :label="$t('public.no44')" min-width="100">
          </el-table-column>
          <el-table-column align="center" prop="isInContact" :label="$t('public.no45')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.isInContact!==null&&scope.row.isInContact!==undefined&&scope.row.isInContact!==''">{{$t($store.getters.is_addressBook(scope.row.isInContact))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="callOrOut" :label="$t('public.no46')" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.callOrOut!==null&&scope.row.callOrOut!==undefined&&scope.row.callOrOut!==''" :class="{active1:scope.row.callOrOut==1,active2:scope.row.callOrOut==2,active3:scope.row.callOrOut==3}">
                {{$t($store.getters.contactStatus(scope.row.callOrOut))}}
              </span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="keepTime" :label="$t('new.no57')" min-width="100">
          </el-table-column>
          <template v-if="$store.state.common.lang==='PHL'">
            <el-table-column align="center" prop="operator" :label="$t('fei.no8')" min-width="100">
            </el-table-column>
          </template>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="140">
            <template slot-scope="scope" v-if="block==2">
              <span style="color:#547ef6;cursor:pointer" @click="socialDetali(scope.row.phone,scope.row.relation,scope.row.name)">{{$t('auditDetail.no42')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, ->"
            :total="pageTotal?pageTotal:0"
            >
          </el-pagination>
        </div>
    </el-row>

    <!-- ------------------ 点击回复弹窗开始 -------------------- -->
    <div v-if="flag" class="reply">
      <div class="reply-main">
        <div class="reply-main-head">
          <span></span>
          <p>{{$t('auditDetail.no42')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="flag=false"></i>
        </div>
        <div class="reply-main-con">
          <div class="chu-select">
            <div class="chu-select-left">{{$t('auditDetail.no43')}}</div>
            <div class="chu-select-right">
              <el-select size="small" v-model="status1" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="chu-select">
            <div class="chu-select-left">{{$t('public.no37')}}</div>
            <div class="chu-select-right">
              <textarea class="search_inpu" v-model="remark" :placeholder="$t('public.no42')+'~'"></textarea>
            </div>
          </div>
          <div class="reply-but" @click="telSubmit">{{$t('public.no41')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击回复弹窗结束 -------------------- -->

  </div>

</template>
<script>
export default {
  props: {
    orderNo: [String, Number],
    userId: [String, Number],
    orderId: [String, Number],
    detail: [Function],
    type: [String, Number]
  },
  data () {
    return {
      activeId: 1,
      block: false,
      pageTotal: 0, // 分页总数
      tableData: [], // 表格信息数据模拟
      currentPage: 1, // 分页当前页下标
      flag: false, // 弹窗开关
      options: this.$store.state.options.telStatus_select, // 下拉选框内容
      keywords: '', // 当前选中的关键词
      remark: '', // 电话审核备注提交
      telDataNum: {// 电话标签个数统计
        relativesCount: '', // 亲属名单个数
        dunCount: '', // 催收电话
        callRate: ''// 通讯录联系人占比
      },
      data: [],
      loading: true,
      id: '', // 当前行的ID
      name: '', // 当前行的名字
      phone: '', // 电话审核提交当前电话
      status1: '', // 电话审核提交当前状态
      relation: ''// 电话审核提交与借贷人关系
    }
  },
  methods: {
    socialDetali (phone, relation, name) { // 点击查看详情
      this.flag = true
      this.phone = phone
      this.relation = relation
      this.name = name
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.telRecord_List,
          'page': {'index': val, 'size': 10},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId,
        keywords: this.keywords
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
        }
      })
    },
    filter (str, id) { // 敏感词点击操作
      this.activeId = id
      this.keywords = str
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.telRecord_List,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId,
        keywords: str
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    telList () { // 电话记录列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.telRecord_List,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId
      }
      this.$axios.post('',option).then(res=>{
        this.loading = false;
        if(res.data.header.code==0){
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    },
    telDataNumber () { // 电话标签记录统计
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.telNumber,
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo,
        userId: this.userId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.userUrgentContact = res.data.data.userUrgentContact
          this.telDataNum.relativesCount = res.data.data.relativesCount
          this.telDataNum.dunCount = res.data.data.dunCount
          this.telDataNum.callRate = res.data.data.callRate
        }
      })
    },
    telSubmit () { // 电话审核提交
      if (this.remark) {
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.telRecord_submit,
            'sessionid': this.sessionid
          },
          orderNo: this.orderNo,
          orderId: this.orderId,
          approveType: this.type,
          userName: this.name,
          phone: this.phone,
          connectStatus: this.status1,
          relation: this.relation,
          remark: this.remark
        }
        this.$axios.post('', option).then(res => {
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.flag = false
          this.remark = ''
          this.status1 = ''
          setTimeout(() => {
            this.detail()
          }, 500)
        })
      } else {
        this.$globalMsg.error(this.$t('public.no42'))
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.block = this.$route.query.block
    if (this.orderNo) {
      this.telList()
      this.telDataNumber()
    }
  }
}
</script>

<style lang="scss" scoped>

.reply{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main{
    width: 694px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
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
      .chu-select{
        margin: 20px 20px;
        padding: 5px 0;
        display: flex;
        .chu-select-left{
          width: 15%;
          
        }
        .chu-select-right{
          width: 85%;
          .search_inpu{
            width: 100%;
            height: 150px;
            padding: 5px;
            font-size: 16px;
          }
        }
      }
      .reply-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 0 auto;
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
