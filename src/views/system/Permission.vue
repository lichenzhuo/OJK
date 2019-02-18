<template>
  <div class="jurisdiction">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('idManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('permission.crumbsOne')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- ------------------ 横条 ------------------- -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('permission.title')}}</p>
        </div>
      </el-col>
    </el-row>

    <!-- ------------搜索查询栏开始-------------- -->
    <div class="search" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_RIGHT_ADD')">
      <el-row type="flex" justify="start" align="middle" :gutter=10>
        <el-col :span="3">
          <div class="search-add" @click="addRole = true">
            +{{$t('permission.add')}}
          </div>
        </el-col>
      </el-row>

    </div>
    <!-- ------------ 搜索查询栏结束 -------------- -->

    <!-- ------------ 表单栏开始 -------------- -->
    <div class="table" v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_RIGHT_LIST')">
      <template>
        <el-table :data="tableData" size="small" stripe style="width: 100%" >
          <el-table-column align="center" prop="id" :label="$t('permission.id')" width="180">
          </el-table-column>
          <el-table-column align="center" prop="roleName" :label="$t('permission.type')" min-width="300">
          </el-table-column>
          <el-table-column align="center" prop="createTime" :label="$t('public.no21')" min-width="300">
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="180">
            <template slot-scope="scope">
              <span 
                v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_RIGHT_EDIT')"
                style="color:#547ef6;cursor:pointer;margin:0 5px;" 
                @click="modifyPre(scope.row.id,scope.row.roleName)">
                {{$t('permission.modify')}}
              </span>
              <span 
                 v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_RIGHT_DEL')"
                style="color:#547ef6;cursor:pointer;margin:0 15px;" 
                @click="delPre(scope.row.id)">
                {{$t('permission.del')}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- ------------ 表单栏结束 -------------- -->

    <!-- ----------------------确认是否删除开始------------------ -->
    <div v-if="del" class="del">
      <div class="del-main">
        <div class="del-main-head">
          <span></span>
          <p>{{$t('public.no48')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="del=false"></i>
        </div>
        <div class="del-main-con">
          <div class="del-con-one">{{$t('permission.delUser')}}？</div>
          <div class="del-but">
            <div class="del-but-1" @click="delSure()">{{$t('public.no49')}}</div>
            <div class="del-but-1 active" @click="del=false">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------确认是否删除结束------------------- -->

    <!-- ------------------确认是否修改开始-------------------- -->
    <div v-if="modify" class="modify">
      <div class="modify-main">
        <div class="modify-main-head">
          <span></span>
          <p>{{$t('permission.modifyTitle')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="modifyClose"></i>
        </div>
        <div class="modify-main-con">
          <div class="role">
            <span>{{$t('permission.typeName')}}:</span>
            <el-input type="user" style="width:300px;" v-model="roleName" disabled auto-complete="off"></el-input>
          </div>
          <div class="modify-con">
            <el-tree
              :data="data" 
              :props="defaultProps" 
              node-key="id"
              :default-checked-keys="defCheKeys"
              @check-change="handleCheckChange1"
              show-checkbox
              ref="tree1"
            >
            </el-tree>
          </div>
          <div class="modify-but">
            <div class="modify-but-1" @click="modifySure">{{$t('public.no49')}}</div>
            <div class="modify-but-1 active" @click="modifyClose">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <!-- ------------------确认是否添加开始-------------------- -->
    <div v-if="addRole" class="modify">
      <div class="modify-main">
        <div class="modify-main-head">
          <span></span>
          <p>{{$t('permission.add')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="addRole=false"></i>
        </div>
        <div class="modify-main-con">
          <div class="role">
            <span>{{$t('permission.typeName')}}:</span>
            <el-input type="user" style="width:300px;" v-model="addRoleName" auto-complete="off"></el-input>
          </div>
          <div class="modify-con">
            <el-tree
              :data="data" 
              node-key="id"
              @check-change="handleCheckChange2"
              show-checkbox
              ref="tree2"
            >
            </el-tree>
          </div>
          <div class="modify-but">
            <div class="modify-but-1" @click="addSure">{{$t('public.no49')}}</div>
            <div class="modify-but-1 active" @click="addRole=false">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------ 确认是否添加结束 -------------------- -->

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages"  v-if="$store.state.common.permiss.includes('RIGHT_SYSTEM_RIGHT_LIST')">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, ->"
            :total="pageTotal?pageTotal:0">
          </el-pagination>
        </div>
    </el-row> 


    <div class="foot"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sessionid: '',
      flag: true,
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      searchTime: [], // 日期选择
      formInline: {// 查询栏数据
        addTimeBegin: '',
        addTimeEnd: ''
      },
      roleState: '', // 角色
      tableData: [], // 信息数据模拟
      options: [], // 角色列表下拉框
      del: false, // 删除弹窗开关
      modify: false, // 修改角色权限弹窗开关
      delId: '', // 删除目标行数对应的id
      modifyId: '', // 修改目标行数对应的id
      addRole: false, // 添加角色按钮弹窗开关
      roleName: '', // 修改角色对应的角色名
      addRoleName: '', // 添加角色对应的角色名
      defCheKeys: [], // 默认选中的角色权限列表
      keys1: [], // 修改角色权限列表数组
      keys1_parent: [], // 修改角色权限列表数组父节点的key
      keys2: [], // 添加角色权限列表数组
      keys2_parent: [], // 添加角色权限列表数组父节点的key
      data: [], // 权限列表对应数据
      defArr: [], // 权限列表对应数据
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.role_list,
          'page': {'index': val, 'size': 10},
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
        }
      })
    },
    delPre (id) { // 删除按钮弹窗
      this.del = true
      this.delId = id
    },
    delSure () { // 删除确认操作
      if (this.flag) {
        this.flag = false
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.role_del,
            'sessionid': this.sessionid
          },
          id: this.delId
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('idManage.no3'))
            this.tableData = this.tableData.filter(value => {
              return value.id != this.delId
            })
            this.del = false
          } else {
            this.$globalMsg.error(this.$t('idManage.no4'))
          }
        })
      }
    },
    modifyPre (id, name) { // 修改按钮弹窗
      this.modifyId = id
      this.roleName = name
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.permission_defCheckKeys,
          'sessionid': this.sessionid
        },
        id: this.modifyId
      }
      this.$axios.post('', option).then(res => {
        this.modify = true
        if (res.data.header.code == 0) {
          if (res.data.data.roleRights != '') {
            let defArr = []
            res.data.data.roleRights.forEach(value => {
              defArr.push(value.rightId)
            })
            let brr = []
            let crr = []
            let drr = []
            brr = defArr.filter(value => {
              if (Number(value) <= 1100) {
                return String(value).length >= 3
              }
            })
            crr = defArr.filter(value => {
              if (Number(value) > 1100) {
                return String(value).length >= 5
              }
            })
            drr = brr.concat(crr)
            this.defCheKeys = drr
          } else {
            this.defCheKeys = []
          }
        }
      })
    },
    modifySure () { // 修改确认操作
      if (this.flag) {
        this.flag = false
        let arr = this.keys1.concat(this.keys1_parent)
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.role_modify,
            'sessionid': this.sessionid
          },
          id: this.modifyId,
          roleName: this.roleName,
          rightIds: arr
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('idManage.no5'))
            this.modify = false
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
        })
      }
    },
    modifyClose () { // 修改弹窗关闭
      this.modify = false
      this.keys1 = []
    },
    addSure () { // 添加账号确认操作
      if (this.flag) {
        this.flag = false
        let arr = this.keys2.concat(this.keys2_parent)
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.role_add,
            'sessionid': this.sessionid
          },
          roleName: this.addRoleName,
          rightIds: arr
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
          if (res.data.header.code == 0) {
            this.$globalMsg.success(this.$t('message.success'))
            this.getPerList()
            this.addRole = false
          } else {
            this.$globalMsg.error(res.data.header.msg)
          }
        })
      }
    },
    handleCheckChange1 (data, checked, indeterminate) { // 修改角色对应的权限列表
      this.keys1_parent = this.$refs.tree1.getHalfCheckedKeys(true)
      this.keys1 = this.$refs.tree1.getCheckedKeys()
    },
    handleCheckChange2 (data, checked, indeterminate) { // 添加角色对应的权限列表
      this.keys2_parent = this.$refs.tree2.getHalfCheckedKeys(true)
      this.keys2 = this.$refs.tree2.getCheckedKeys()
    },
    getPerList () { // 获取角色列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.role_list,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    },
    getPerTree () { // 获取角色权限树状图列表
      let option1 = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.permission,
          'sessionid': this.sessionid
        }
      }
      let permission = []
      this.$axios.post('', option1).then(res => {
        if (res.data.header.code == 0) {
          permission = res.data.data
          permission.forEach(value => {
            value.label = value.rightName
            if (value.children) {
              value.children.forEach(item => {
                item.label = item.rightName
                if (item.children) {
                  item.children.forEach(value1 => {
                    value1.label = value1.rightName
                  })
                }
              })
            }
          })
          this.data = permission
        }
      })
    },
    select () {}, // 搜索栏点击查询按钮操作
    roleList () { // 角色列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.role_list,
          sessionid: this.sessionid,
          page: {index: 1, size: 1000}
        }
      }
      let options = []
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          res.data.data.forEach(value => {
            options.push({value: value.id, label: value.roleName})
          })
        }
      })
      this.options = options
    }
  },
  watch: {
    searchTime () {
      if (this.searchTime) {
        this.formInline.applyTimeBegin = this.searchTime[0]
        this.formInline.applyTimeEnd = this.searchTime[1]
      } else {
        this.formInline.applyTimeBegin = ''
        this.formInline.applyTimeEnd = ''
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')

    this.getPerList()// 获取权限列表
    this.getPerTree()// 获取所有权限列表树
    // this.roleList();
  }
}
</script>
<style scoped lang="scss">
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}
.jurisdiction {
  width: 100%;
  height: 100%;
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
  .search-add {
    width: 114px;
    height: 100%;
    border: 1px solid #547ef6;
    border-radius: 5px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    color: #547ef5;
    margin-left: 30px;
    cursor: pointer;
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
    .el-button--primary {
      height: 40px;
      
    }
    .button-color {
      background-color: #1D7BFF;
      border-color: #547ef6;
    }
  }
}

.table {
  width: 100%;
  min-height: 450px;
  position: relative;
  .recycle {
    width: 100px;
    height: 40px;
    position: absolute;
    top: 0px;
    right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .recycle-png {
      width: 18px;
      height: 16px;
    }
    .recycle-title {
      padding-left: 5px;
      font-size: 16px;
      color: #547ef6;
      height: 40px;
      line-height: 40px;
    }
  }
}

.switch {
  width: 24px;
  height: 16px;
  display: inline-block;
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

.modify {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .modify-main {
    width: 100%;
    height: 500px;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .modify-main-head {
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
    .modify-main-con {
      width: 100%;
      height: 450px;
      padding: 10px 30px;
      .role{
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        justify-content: flex-start;
        span{
          padding: 5px;
        }
      }
      .modify-con {
        width: 100%;
        height: 350px;
        padding: 0px 60px;
        color: #6b7283;
        font-size: 14px;
        overflow-y: scroll;
      }
      .modify-but {
        width: 260px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .modify-but-1 {
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
