<template>
  <div class="userSuggest">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('loanAfterOperation.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('loanAfterOperation.crumbsThree')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- ------------------ 横条 ------------------- -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('loanAfterOperation.title')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search">
      <el-row type="flex" justify="start" align="middle" :gutter="10">
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_ADD')">
          <el-col :md="8" :lg="5" :xl="4">
            <div class="search-add" @click="addNote">
              +{{$t('loanAfterOperation.add')}}
            </div>
          </el-col>
        </template>
        
        <el-col :md="8" :lg="5" :xl="4">
          <div class="search-input">
            <span>{{$t('loanAfterOperation.noteType')}}:</span>
            <el-select size="small" clearable v-model="formInline.type" :placeholder="$t('public.placeholder')">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <template v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_QUERY')">
          <el-col :md="3" :lg="2" :xl="2">
            <div class="search-input">
              <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
            </div>
          </el-col>
        </template>
        
      </el-row>
    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_LIST')">
      <template>
        <el-table :data="tableData" stripe style="width: 100%" empty-text>
          <el-table-column align="center" prop="id" :label="$t('loanAfterOperation.id')" width="120">
          </el-table-column>
          <el-table-column align="center" prop="content" :label="$t('loanAfterOperation.content')" :show-overflow-tooltip="true" min-width="400">
          </el-table-column>
          <el-table-column align="center" prop="type" :label="$t('loanAfterOperation.type')" min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.type!==null&&scope.row.type!==undefined&&scope.row.type!==''">{{$t($store.getters.collectionStatus(scope.row.type))}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="160">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_EDIT')"
                style="color:#547ef6;cursor:pointer;margin:0 5px;" 
                @click="modify(scope.row.id,scope.row.type,scope.row.content)">
                {{$t('public.no51')}}
              </span>
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_LOANS_OPERATES_SMS_DEL')"
                style="color:#547ef6;cursor:pointer;margin:0 5px;" 
                @click="del(scope.row.id)">
              {{$t('idManage.del')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- ------------------ 点击修改弹窗开始 -------------------- -->
    <div v-if="modifyFlag||addFlag" class="detail">
      <div class="detail-main">
        <div class="detail-main-head">
          <span></span>
          <p>{{$t('loanAfterOperation.addNote')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="addClose"></i>
        </div>
        <div class="detail-main-con">
          <div class="detail-con-one">
            <div class="search-input">
              <span style="width:100px;">{{$t('loanAfterOperation.type')}}:</span>
              <el-select size="small" v-model="noteStyle" :placeholder="$t('public.placeholder')">
                <el-option v-for="item in options" :key="item.value" :label="$t(item.label)" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="detail-con-one">
            <div class="detail-con-one-4">
              {{$t('loanAfterOperation.content')}}:
            </div>
            <div class="detail-con-one-3">
              <textarea class="search_input" v-model="noteCon"></textarea>
            </div>
          </div>
          <div class="detail-but" @click="modifySubmit">{{$t('public.no49')}}</div>
        </div>
      </div>
    </div>
    <!-- ------------------ 点击修改弹窗结束 -------------------- -->

    <!-- ----------------------确认是否删除开始------------------ -->
    <div v-if="delFlag" class="del">
      <div class="del-main">
        <div class="del-main-head">
          <span></span>
          <p>{{$t('public.no48')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="delFlag=false"></i>
        </div>
        <div class="del-main-con">
          <div class="del-con-one">{{$t('loanAfterOperation.del')}}?</div>
          <div class="del-but">
            <div class="del-but-1" @click="delSure()">{{$t('public.no49')}}</div>
            <div class="del-but-1 active" @click="delFlag=false">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="foot"></div>

  </div>
</template>
<script>
export default{
  data () {
    return {
      sessionid: '',
      flag: true, // 点击一次开关
      pageTotal: 0, // 分页总数
      formInline: {// 查询信息数据对应字段
        type: ''
      },
      currentPage: 1, // 当前页下标
      options: [], // 短信类型阶段下拉框
      noteStyle: 1, // 短信修改模版选中项
      tableData: [], // 用户信息数据模拟
      delFlag: false, // 删除弹窗开关
      modifyFlag: false, // 修改弹窗开关
      addFlag: false, // 添加弹窗开关
      delId: '', // 选择的是当前删除行的ID
      modifyId: '', // 选择的是当前详情行的ID
      noteCon: ''// 短信内容
    }
  },
  methods: {
    handleCurrentChange () { // 分页按钮第几页
      this.noteList();
    },
    modify (id, type, content) { // 点击修改查看详情
      this.modifyFlag = true
      this.modifyId = id
      this.noteStyle = String(type)
      this.noteCon = content
    },
    addNote () { // 添加短信模版
      this.noteStyle = ''
      this.noteCon = ''
      this.addFlag = true
    },
    modifySubmit () { // 添加修改确认操作
      if (this.flag) {
        this.flag = false
        let option
        if (this.modifyFlag) {
          option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.note_add_edit,
              sessionid: this.sessionid
            },
            method: 'edit',
            type: this.noteStyle,
            content: this.noteCon,
            id: this.modifyId
          }
        } else {
          option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.note_add_edit,
              sessionid: this.sessionid
            },
            method: 'add',
            type: this.noteStyle,
            content: this.noteCon
          }
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
            this.noteList()
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
          this.noteStyle = ''
          this.noteCon = ''
          this.addClose()
        })
      }
    },
    del (id) { // 删除按钮操作
      this.delFlag = true
      this.delId = id
    },
    delSure () { // 删除确认操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.note_del,
            'page': {'index': this.currentPage, 'size': 10},
            'sessionid': this.sessionid
          },
          id: this.delId
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('idManage.no3'))
            this.noteList()
          } else {
            this.$globalMsg.error(this.$t('idManage.no4'))
          }
          this.delFlag = false
        })
      }
    },
    select () { // 查询按钮点击操作
      this.$store.commit('cuishouNoteList', this.formInline)
      if (this.flag) {
        this.flag = false
        this.noteList();
      }
    },
    noteList () { // 获取短信模版列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.note_list,
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
        }
      })
    },
    addClose () {
      this.addFlag = false
      this.modifyFlag = false
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
          this.options = arr;
        }
      })
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    if (JSON.stringify(this.$store.state.common.cuishouNoteList_select) !== '{}') {
      this.formInline = this.$store.state.common.cuishouNoteList_select
    }
    this.noteList()// 获取短信模版列表
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
  height: auto;
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
    cursor: pointer;
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

.table {
  width: 100%;
  min-height: 440px;
}



// 查看详情
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
    width: 694px;
    height: auto;
    // margin-top: -450px;
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
        // display: flex;
        margin: 10px 0;
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
          width: 100%;
          height: 100%;
          margin-bottom: 10px;
          textarea{
            width: 100%;
            height: 100px;
            font-size: 16px;
            padding: 5px;
          }
        }
        .detail-con-one-4{
          width: auto;
          color: #999;
          MARGIN-BOTTOM: 5px;
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

.del{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  z-index: 100;
  background-color: rgba(182, 189, 205, 0.6);
  .del-main{
    width: 474px;
    height: 240px;
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


</style>
