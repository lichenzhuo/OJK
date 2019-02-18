<template>
  <div class="userSuggest">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('proManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('proManage.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- ------------------ 横条 ------------------- -->
    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('proManage.title')}}</p>
        </div>
      </el-col>
    </el-row>
    <!-- v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_ADD')" -->
    <div class="search" v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_PACKAGEADD')">
      <el-row type="flex" justify="start" align="middle" :gutter="10">
        <el-col :span="3">
          <div class="search-add" @click="addBao">
            {{$t('proManage.addBao')}}
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="tableList">
      <ul>
        <li v-for="(item,index) in tableData" :key="index">
          <div v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_EDIT')" class="delButton" @click="delPro(item.id)">×</div>
          <div class="product-all" >
            <p>
              <span>产品名称</span>
              <span>{{item.appName}}</span>
            </p>
            <p>
              <span v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_COPY')" class="cp" @click="copyloans(item.appPackage)">{{$t('proManage.copyPro')}}</span>
              <!-- <span>&nbsp</span> -->
              <span class="cp" style="color:#1D7BFF;" @click="addloans(item.id)">修改数据</span>
              
            </p>
          </div>
          <div class="product">
            <div class="product-1">
              <div class="pro-title">
                {{item.productAmountMax?item.productAmountMax+''+$store.state.common.vi_currency:$store.state.common.nullData}}
                <div class="pro-mini-title">
                  <div class="money pic">
                    <img src="../../assets/img/money.png" alt="">
                  </div>
                  <span>{{$t('proManage.productAmount')}}</span>
                </div>
              </div>
              <div class="block">
                <el-slider v-model="value1[index]" :step="item.productAmountPer" :min="item.productAmountMin" :max="item.productAmountMax"></el-slider>
              </div>
              <div class="scope">
                <span>{{item.productAmountMin?item.productAmountMin+''+$store.state.common.vi_currency:$store.state.common.nullData}}</span>
                <span>{{item.productAmountMax?item.productAmountMax+''+$store.state.common.vi_currency:$store.state.common.nullData}}</span>
              </div>
            </div>
            <div class="product-1">
              <div class="pro-title">
                {{item.productPeriodMax?item.productPeriodMax+'day':$store.state.common.nullData}}
                <div class="pro-mini-title">
                  <div class="money pic">
                    <img src="../../assets/img/time.png" alt="">
                  </div>
                  <span>{{$t('proManage.period')}}</span>
                </div>
              </div>
              <div class="block">
                <el-slider v-model="value2[index]" :step="item.productPeriodPer" :min="item.productPeriodMin" :max="item.productPeriodMax"></el-slider>
              </div>
              <div class="scope bottom-border">
                <span>{{item.productPeriodMin?item.productPeriodMin+'day':$store.state.common.nullData}}</span>
                <span>{{item.productPeriodMax?item.productPeriodMax+'day':$store.state.common.nullData}}</span>
              </div>
            </div>
          </div>
          <!-- 越南版的滑块产品结束 -->

          <!-- 越南版的滑块产品开始 -->
          <div class="product-bottom">
            <p>
              <span>{{$t('proManage.dayInterest')}}</span>
              <span v-if="item.dayInterest!==null&&item.dayInterest!==undefined&&item.dayInterest!==''">{{$store.getters.twoPoint(item.dayInterest)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
            <p>
              <span>{{$t('proManage.feeRate')}}</span>
              <span v-if="item.feeRate!==null&&item.feeRate!==undefined&&item.feeRate!==''">{{$store.getters.twoPoint(item.feeRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
            <p>
              <span>{{$t('proManage.overdueInterest')}}</span>
              <span v-if="item.overdueInterest!==null&&item.overdueInterest!==undefined&&item.overdueInterest!==''">{{$store.getters.twoPoint(item.overdueInterest)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
            
            
          </div>
          <div class="product-bottom">
            <p>
              <span>{{$t('proManage.overdueMaxAmount')}}</span>
              <span v-if="item.overdueMaxRate!==null&&item.overdueMaxRate!==undefined&&item.overdueMaxRate!==''">{{$store.getters.twoPoint(item.overdueMaxRate)}}%</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
            <p>
              <span>{{$t('proManage.overdueMaxDays')}}</span>
              <span v-if="item.overdueMaxDays!==null&&item.overdueMaxDays!==undefined&&item.overdueMaxDays!==''">{{item.overdueMaxDays}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
          </div>
          <div class="product-bottom">
            <p>
              <span>{{$t('proManage.canAdvanceType')}}</span>
              <span v-if="item.canAdvanceType!==null&&item.canAdvanceType!==undefined&&item.canAdvanceType!==''">{{item.canAdvanceType==1?$t('new.no47'):$t('new.no46')}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
            <p>
              <span>{{$t('proManage.canAdvanceDay')}}</span>
              <span v-if="item.canAdvanceDay!==null&&item.canAdvanceDay!==undefined&&item.canAdvanceDay!==''">{{item.canAdvanceDay}}</span>
              <span v-else>{{$store.state.common.nullData}}</span>
            </p>
          </div>
        </li>
        <li v-if="$store.state.common.permiss.includes('RIGHT_PRODUCT_LIST_ADD')" class="addPro" @click="modifyPre">
          <span class="cp">+</span>
        </li>
      </ul>
    </div>

    <!-- ----------------------确认是否删除开始------------------ -->
    <div v-if="del" class="del">
      <div class="del-main">
        <div class="del-main-head">
          <span></span>
          <p>{{$t('public.no48')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="del=false"></i>
        </div>
        <div class="del-main-con">
          <div class="del-con-one">确定删除该产品吗？</div>
          <div class="del-but">
            <div class="del-but-1" @click="delSure()">{{$t('public.no49')}}</div>
            <div class="del-but-1 active" @click="del=false">{{$t('public.no50')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------确认是否删除结束------------------- -->
    
    <!-- ----------------------确认是否上架开始------------------ -->
    <div v-if="add" class="del">
      <div class="del-main">
        <div class="del-main-head">
          <span></span>
          <p>{{addOrEdit=='edit'?$t('proManage.edit'):$t('proManage.add')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="add=false"></i>
        </div>
        <div class="del-main-con">
          <addpro :addclose="addclose" :type="addOrEdit" :productId="productId" :pro-list="proInfor" :app-name-option="appNameOption"></addpro>
        </div>
      </div>
    </div>
    <!-- ----------------------确认是否上架结束------------------- -->

    <!-- ------------------确认是否修改开始-------------------- -->
    <div v-if="modify" class="modify">
      <div class="modify-main">
        <div class="modify-main-head">
          <span></span>
          <p>{{$t('public.no29')}}/{{$t('public.no51')}}{{$t('proManage.product')}}</p>
          <i class="el-icon-shop-guanbi icon-color" style="cursor:pointer" @click="modify=false"></i>
        </div>
        <div class="modify-main-con">
          <div class="modify-con">
            <el-form class="demo-ruleForm" label-position="left" ref="ruleForm2" :rules="rules" label-width="110px" :model="ruleForm2">
              <el-form-item :label="$t('proManage.productAmount')" prop="productAmount">
                  <el-input type="text" v-model="ruleForm2.productAmount" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('proManage.period')" prop="productPeriod">
                  <el-input type="text" v-model="ruleForm2.productPeriod" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('proManage.feeRate')" prop="feeRate">
                  <el-input type="text" v-model="ruleForm2.feeRate" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('proManage.dayInterest')" prop="dayInterest">
                  <el-input type="text" v-model="ruleForm2.dayInterest" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('proManage.overdueInterest')" prop="overdueInterest">
                  <el-input type="text" v-model="ruleForm2.overdueInterest" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('proManage.overdueMaxAmount')" prop="overdueMaxAmount">
                  <el-input type="text" v-model="ruleForm2.overdueMaxAmount" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('proManage.overdueMaxDays')" prop="overdueMaxDays">
                  <el-input type="text" v-model="ruleForm2.overdueMaxDays" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('proManage.canAdvanceDay')" prop="canAdvanceDay">
                  <el-input type="text" v-model="ruleForm2.canAdvanceDay" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="modifySure('ruleForm2')">{{$t('public.no41')}}</el-button>
                  <el-button @click="reset">{{$t('public.no50')}}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- <div class="modify-but">
            <div class="modify-but-1" @click="modifySure">确认</div>
            <div class="modify-but-1 active" @click="modify=false">取消</div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- ------------------ 确认是否修改结束 -------------------- -->

    <!-- ------------------复制包名开始-------------------- -->
    <el-dialog :title="$t('proManage.copyPro')" :visible.sync="dialogCopyVisible"  width="600px">
      <el-form :model="copyForm" size="small" ref="copyForm" label-width="140px">
        <el-form-item :label="$t('new.no49')">
          <el-select size="small" disabled v-model="copyForm.appPackageOld" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in copyOption1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('proManage.no1')">
          <el-select size="small" v-model="copyForm.appPackageNew" :placeholder="$t('public.placeholder')">
            <el-option v-for="item in copyOption2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCopyVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="copySure">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    <!-- ------------------复制包名结束-------------------- -->

    <!-- ------------------添加包名开始-------------------- -->
    <el-dialog :title="$t('proManage.addBao')" :visible.sync="dialogAddVisible"  width="600px">
      <el-form :model="addForm" size="small" ref="addForm" label-width="140px">
        <el-form-item :label="$t('new.no49')">
          <el-input v-model="addForm.appPackage" style="width:215px;"></el-input>
        </el-form-item>
        <el-form-item :label="$t('new.no48')">
          <el-input v-model="addForm.appName" style="width:215px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="addBaoSure">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    <!-- ------------------添加包名结束-------------------- -->

    <div class="foot" style="height:60px;"></div>

  </div>
</template>
<script>
import addpro from './addpro-yuenan'

export default{
  components: {
    addpro
  },
  data () {
    var validateNumber = (rule, value, callback) => {
      let reg = /^\+?[1-9][0-9]*$/
      if (value === '') {
        callback(new Error(this.$t('login.required')))
      } else {
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(this.$t('login.num')))
        }
      }
    }
    var validateFloat = (rule, value, callback) => {
      let reg = /^[0-9]+(.[0-9]{1,4})?$/
      if (value === '') {
        callback(new Error(this.$t('login.required')))
      } else {
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(this.$t('login.float')))
        }
      }
    }
    return {
      flag: true,
      sessionid: '',
      pageTotal: 0, // 分页总数
      currentPage: 1, // 当前页下标
      productId: '', // 选中的产品ID
      dialogCopyVisible: false,
      dialogAddVisible: false,
      // 查看详情产品信息数据对应字段
      ruleForm2: {
        productAmount: '',
        productPeriod: '',
        feeRate: '',
        dayInterest: '',
        overdueInterest: '',
        overdueMaxDays: '',
        canAdvanceDay: '',
        overdueMaxAmount: ''
      },
      value1: {}, // 滑块1选中值
      value2: {}, // 滑块2选中值
      tableData: {
        productAmountPer: 0,
        productAmountMin: 0,
        productAmountMax: 0,
        productPeriodPer: 0,
        productPeriodMin: 0,
        productPeriodMax: 0
      }, // 数据模拟
      del: false, // 删除弹窗
      modify: false, // 修改弹窗
      add: false, // 添加弹窗
      delId: '', // 删除目标行数对应的id
      modifyId: '', // 修改目标行数对应的id
      pushId: '', // 上架目标行数对应的id
      proAll: '',
      addOrEdit: '',
      appNameOption: [], // APP名字下拉框
      copyOption1:[],// 有数据的包名下拉框
      copyOption2:[],// 没有数据的包名下拉框
      copyForm:{
        appPackageOld:'',
        appPackageNew:'',
      },
      addForm:{
        appPackage:'',
        appName:''
      },
    }
  },
  methods: {
    handleCurrentChange (val) { // 分页按钮第几页
      this.currentPage = val
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_list,
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
    delPro (id) { // 删除按钮弹窗
      this.del = true
      this.delId = id
    },
    modifyPre () { // 修改按钮弹窗
      this.addOrEdit = 'add'
      this.add = true
    },
    reset () {
      this.modify = false
    },
    delSure () { // 删除确认操作
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_remove,
          'sessionid': this.sessionid
        },
        id: this.delId
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('idManage.no3'))
          this.proInfor()
        }else{
          this.$globalMsg.error(this.$t('idManage.no4'))
        }
        this.del = false
      })
    }, 
    modifySure (formName) { // 修改确认操作
      if (this.flag) {
        this.flag = false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let option = {
              header: {
                action: this.$store.state.actionMap.pro_add_modify,
                ...this.$base,
                sessionid: this.sessionid
              },
              method: 'edit',
              ...this.ruleForm2,
              id: this.modifyId
            }
            this.$axios.post('', option).then(res => {
              this.flag = true
              if (res.data.header.code == 0) {
                this.$globalMsg.success(this.$t('idManage.no5'))
                this.proList()
                this.modify = false
              } else {
                this.$globalMsg.error(this.$t('idManage.no6'))
              }
            })
          } else {
            this.flag = true
            return false
          }
        })
      }
    },
    pushSure () { // 上架确认操作

    },
    addloans (id) { // 产品添加功能
      this.addOrEdit = 'edit'
      this.productId = id
      this.add = true
    },
    addclose () {
      this.add = false
    },
    proList () { // 获取产品列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.vi_pro_list,
          'sessionid': this.sessionid
        },
        id: this.productId ? this.productId : 12
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if (res.data.data) {
            this.tableData = res.data.data
          }
        }
      })
    },
    proInfor () { // 获取产品详情
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.pro_list,
          'page': {'index': 1, 'size': 500},
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if (res.data.data) {
            this.tableData = res.data.data
          }
        }
      })
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
            this.appNameOption.push({value: value.optionValue, label: value.optionValue})
          })
        }
      })
    },
    addBao(){
      this.dialogAddVisible = true;
      this.addForm = {
        appPackage:'',
        appName:''
      }
    },
    copyloans(appPackage){
      this.dialogCopyVisible = true;
      this.copyForm = {
        appPackageOld:appPackage,
        appPackageNew:''
      }
    },
    copySure(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.COPYPACKAGE001,
          'sessionid': this.sessionid
        },
        ...this.copyForm
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
          this.proInfor()
          this.getAppBao(2)
          this.dialogCopyVisible = false;
        } else {
          this.$globalMsg.error(this.$t('idManage.err'))
        }
      })
    },
    addBaoSure(){
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.ADDPACKAGE001,
          'sessionid': this.sessionid
        },
        ...this.addForm
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.$globalMsg.success(this.$t('message.success'))
          this.getAppBao(2)
          this.dialogAddVisible = false;
        } else {
          this.$globalMsg.error(this.$t('idManage.err'))
        }
      })
    },
    getAppBao(type){
      this.copyOption1 = [];
      this.copyOption2 = [];
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.GETPACKAGE001,
          'sessionid': this.sessionid
        },
        type
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          if(type==1){
            res.data.data.forEach(value=>{
              this.copyOption1.push({value:value,label:value})
            })
          }
          if(type==2){
            res.data.data.forEach(value=>{
              this.copyOption2.push({value:value,label:value})
            })
          }
        }
      })
    }
  },
  mounted () {
    let sessionid = sessionStorage.getItem('sessionid')
    this.sessionid = sessionid
    this.proInfor()
    this.getAppName()
    this.getAppBao(2)
  }
}
</script>
<style scoped lang="scss">
$color1:#1D7BFF;
$color2:#333;
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}
@mixin p-span {
  p{
    line-height: 24px;
    span:nth-child(1){
      white-space: nowrap;
      color: $color1;
      font-size: 16px;
    }
    span:nth-child(2),span:nth-child(3),span:nth-child(4){
      color: $color2;
      font-size: 16px;
      margin: 0 10px;
      word-break: break-all;
    } 
  }
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
  margin-bottom: 20px;
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
  margin-bottom: 22px;
  padding: 10px 10px;
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

.table {
  width: 100%;
  min-height: 530px;
}

.pro-imglist{
  width: 100px;
  height: 68px;
  margin: 0 auto;
}

.tableList{
  width: 100%;
  height: auto;
  ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 49%;
      margin-bottom: 20px;
      border: 1px dashed #ddd;
      position: relative;
    }
  }
}

.delButton{
  position: absolute;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 26px;
  right: 0;
  top: 0;
  z-index: 1;
  cursor: pointer;
}
.del{
  width: 100%;
  min-height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  @include flex-cen;
  z-index: 1002;
  padding: 10px 0; 
  background-color: rgba(182, 189, 205, 0.6);
  .del-main{
    width: 550px;
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

.modify{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .modify-main{
    width: 474px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom: 10px;
    .modify-main-head{
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
    .modify-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .modify-con{
        width: 100%;
        color: #6b7283;
        font-size: 14px;
      }
      .modify-con-two{
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
      }
      .modify-but{
        width: 260px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .modify-but-1{
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
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main{
    width: 694px;
    height: 290px;
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
      .reply-con-one{
        width: 100%;
        height: 40px;
        padding-top: 10px;
        color: #6b7283;
        font-size: 14px;
      }
      .reply-con-two{
        width: 100%;
        height: 100px;
        margin-bottom: 22px;
        textarea{
          width: 100%;
          height: 100%;
          padding: 10px;
          font-size: 14px;
          background-color: #f4f6fb;
          color: #000;
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

.addPro{
  height:700px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size: 30px;
  border: 1px dashed #ddd;
}

.product{
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 20px 0;
  .product-1{
    width: 100%;
    padding: 10px 20px;
    .pro-title{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #1D7BFF;
      font-size: 24px;
      position: relative;
      .pro-mini-title{
        position: absolute;
        left: 0;
        top: 0;
        width: 200px;
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333;
        .money{
          width: 20px;
          height: 22px;
          margin: 0 20px 0 0;
        }
      }
    }
  }
  .block{
    margin: 30px 0 5px;
  }
  .scope{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bottom-border{
    border-bottom: 1px dashed #ddd;
  }
}

.product-all{
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 20px 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  // margin-top: 20px;
  @include p-span();
}
.product-bottom{
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @include p-span();
  p{
    width: 33%;
  }
}










</style>
