<template>
  <div class="main">
    <!-- ------------ 今日数据开始 ------------------------ -->   
    <template v-if="$store.state.common.permiss.includes('RIGHT_WORKS_DAY')">
      <el-row>
        <el-col :span="24">
          <div class="paixu">
            <span></span><p>{{$t('adminHome.todayData')}}</p>
          </div>
        </el-col>
      </el-row>
      <div class="total">
        <ul>
          <li>
            <p><span class="bgc1"></span>{{$t('adminHome.todyRegisterNum')}}</p>
            <p class="cl1" v-if="mainData.today.regCount!==''">{{mainData.today.regCount}}</p>
            <p class="cl1" v-else>{{$store.state.common.nullData}}</p>
          </li>
          <div class="line"></div>
          <li>
            <p><span class="bgc1"></span>{{$t('adminHome.no17')}}</p>
            <p class="cl1" v-if="mainData.today.applyToday!==''">{{mainData.today.applyToday}}</p>
            <p class="cl1" v-else>{{$store.state.common.nullData}}</p>
          </li>
          <div class="line"></div>
          <li>
            <p><span class="bgc2"></span>{{$t('adminHome.no7')}}</p>
            <p class="cl2" v-if="mainData.today.orderCountNew!==''">{{mainData.today.orderCountNew}}</p>
            <p class="cl2" v-else>{{$store.state.common.nullData}}</p>
          </li>
          <div class="line"></div>
          <li>
            <p><span class="bgc1"></span>{{$t('adminHome.no8')}}</p>
            <p class="cl1" v-if="mainData.today.orderCountOld!==''">{{mainData.today.orderCountOld}}</p>
            <p class="cl1" v-else>{{$store.state.common.nullData}}</p>
          </li>
          <div class="line"></div>
          <li>
            <p><span class="bgc2"></span>{{$t('adminHome.no15')}}</p>
            <p class="cl2" v-if="mainData.today.repaymentCount!==''">{{mainData.today.repaymentCount}}</p>
            <p class="cl2" v-else>{{$store.state.common.nullData}}</p>
          </li>
          
        </ul>
        <ul>
          <li>
            <p><span class="bgc3"></span>{{$t('new.no6')}}</p>
            <p class="cl3" v-if="mainData.today.orderPassCount!==''">{{mainData.today.orderPassCount}}</p>
            <p class="cl3" v-else>{{$store.state.common.nullData}}</p>
          </li>
          <div class="line"></div>
          <li>
            <p><span class="bgc3"></span>{{$t('adminHome.no18')}}</p>
            <p class="cl3" v-if="mainData.today.lendingToday!==''">{{mainData.today.lendingToday}}</p>
            <p class="cl3" v-else>{{$store.state.common.nullData}}</p>
          </li>
          <div class="line"></div>
          <li>
            <p><span class="bgc2"></span>{{$t('adminHome.no9')}}</p>
            <p class="cl2" v-if="mainData.today.lendingCountNew!==''">{{mainData.today.lendingCountNew}}</p>
            <p class="cl2" v-else>{{$store.state.common.nullData}}</p>
          </li>
          <div class="line"></div>
          <li>
            <p><span class="bgc3"></span>{{$t('adminHome.no10')}}</p>
            <p class="cl3" v-if="mainData.today.lendingCountOld!==''">{{mainData.today.lendingCountOld}}</p>
            <p class="cl3" v-else>{{$store.state.common.nullData}}</p>
          </li>
          <div class="line"></div>
          <li>
            <p><span class="bgc3"></span>{{$t('adminHome.no16')}}</p>
            <p class="cl3" v-if="mainData.today.repaymentOverDueCount!==''">{{mainData.today.repaymentOverDueCount}}</p>
            <p class="cl3" v-else>{{$store.state.common.nullData}}</p>
          </li>
        </ul>
      </div>
    </template> 
    
    <!-- ------------ 累计数据开始 ------------------------ -->    
    <el-row type="flex" class="row-bg" justify="space-between" :gutter="40">
      <template v-if="$store.state.common.permiss.includes('RIGHT_WORKS_ALL')">
        <el-col  :span="12">
          <div class="paixu">
            <span></span><p>{{$t('adminHome.dataTotal')}}</p>
          </div>
          <div class="tongji">
            <ul>
              <li>
                <div class="box left">
                  <p class="cl5">{{$t('adminHome.hisPutMoneyTotal')}}</p>
                  <p class="mgt15 cl1">
                    <span v-if="mainData.all.lendingCount!==''">{{mainData.all.lendingCount}}</span> 
                    <span v-else>{{$store.state.common.nullData}}</span>
                    {{$t('adminHome.unit')}}
                  </p>
                </div>
                <div class="box right">
                  <p class="cl5">{{$t('adminHome.no1')}}</p>
                  <p class="mgt15 cl1">
                    <span v-if="mainData.all.lendingAmount!==''">{{$store.state.common.id_currency}} {{$store.getters.moneySplit(mainData.all.lendingAmount)}}{{$store.state.common.vi_currency}}</span> 
                    <span v-else>{{$store.state.common.nullData}}</span>
                  </p>
                </div>
              </li>
              <div class="line"></div>
              <li>
                <div class="box left">
                  <p class="cl5">{{$t('adminHome.hisBackMoneyTotal')}}</p>
                  <p class="mgt15 cl1">
                    <span v-if="mainData.all.repaymentCount!==''">{{mainData.all.repaymentCount}}</span> 
                    <span v-else>{{$store.state.common.nullData}}</span>
                    {{$t('adminHome.unit')}}
                  </p>
                </div>
                <div class="box right">
                  <p class="cl5">{{$t('adminHome.hisBackMoneyTotal')}}</p>
                  <p class="mgt15 cl1">
                    <span v-if="mainData.all.repaymentAmount!==''">{{$store.state.common.id_currency}} {{$store.getters.moneySplit(mainData.all.repaymentAmount)}}{{$store.state.common.vi_currency}}</span> 
                    <span v-else>{{$store.state.common.nullData}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
      </template>
      <template v-if="$store.state.common.permiss.includes('RIGHT_WORKS_CURRENT')">
        <el-col :span="12">
          <div class="paixu">
            <span></span><p>{{$t('adminHome.nowData')}}</p>
          </div>
          <div class="tongji">
            <ul>
              <li>
                <div class="box left">
                  <p class="cl5">{{$t('adminHome.no3')}}</p>
                  <p class="mgt15 cl4">
                    <span  v-if="mainData.amount.allCount!=''">{{mainData.amount.allCount}}</span> 
                    <span  v-else>{{$store.state.common.nullData}}</span>
                    {{$t('adminHome.unit')}}
                  </p>
                </div>
                <div class="box right">
                  <p class="cl5">{{$t('adminHome.no4')}}</p>
                  <p class="mgt15 cl4">
                    <span v-if="mainData.amount.allAmount!=''">{{$store.state.common.id_currency}} {{$store.getters.moneySplit(mainData.amount.allAmount)}}{{$store.state.common.vi_currency}}</span> 
                    <span v-else>{{$store.state.common.nullData}}</span>
                  </p>
                </div>
              </li>
              <div class="line"></div>
              <li>
                <div class="box left">
                  <p class="cl5">{{$t('adminHome.no5')}}</p>
                  <p class="mgt15 cl3">
                    <span v-if="mainData.amount.overCount!=''">{{mainData.amount.overCount}}</span> 
                    <span v-else>{{$store.state.common.nullData}}</span>
                    {{$t('adminHome.unit')}}
                  </p>
                </div>
                <div class="box right">
                  <p class="cl5">{{$t('adminHome.noBackMoney')}}</p>
                  <p class="mgt15 cl3">
                    <span v-if="mainData.amount.overAmount!==''">{{$store.state.common.id_currency}} {{$store.getters.moneySplit(mainData.amount.overAmount)}}{{$store.state.common.vi_currency}}</span> 
                    <span v-else>{{$store.state.common.nullData}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
      </template>
    </el-row>

    <!-- ------------ 图表开始 ------------------------ --> 
    <el-row type="flex" class="row-bg mgb20" justify="center">
      <template v-if="$store.state.common.permiss.includes('RIGHT_WORKS_AREA')">
        <el-col :md="22" :lg="22" :xl="22">
          <div class="line">
            <div id="myChart1" style="width:100%;height:600px;"></div>
          </div>
        </el-col>
      </template>
    </el-row>
    
    <el-row type="flex" class="row-bg" justify="center">
      <template v-if="$store.state.common.permiss.includes('RIGHT_WORKS_WEEK')">
        <el-col :md="22" :lg="22" :xl="22">
          <div class="line">
            <div id="myChart2" style="width:100%;height:580px;"></div>
          </div>
        </el-col>
      </template>
    </el-row>

    <!-- -------------- 底部空白------------------------ -->
    <div class="foot"></div>
  </div>
</template>
<script>
  // 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/grid')
require('echarts/lib/component/legendScroll')
// require('echarts/lib/component/legend')
export default {
  name: 'userManage',
  data () {
    return {
      sessionid: '',
      mainData: {// 数据汇总
        all: '', // 累计数据
        amount: '', // 实时数据
        today: ''// 当日数据
      },
      data1: [], // 本周
      data2: [], // 本月
      flag: false
    }
  },
  computed: {
    lang1 () { // 还款标题
      return this.$t('adminHome.no13')
    },
    lang2 () { // 图表鼠标移入显示数量
      return this.$t('adminHome.number')
    },
    lang3 () { // 本月标题
      let now = new Date()
      let yearn  = now.getFullYear();
      let month = now.getMonth()+1;
      return yearn + '-' + month + this.$t('adminHome.no14')
    },
    week () { // 星期国际化
      return [this.$t('adminHome.monday'), this.$t('adminHome.tuesday'), this.$t('adminHome.wednesday'), this.$t('adminHome.thursday'), this.$t('adminHome.friday'), this.$t('adminHome.saturday'), this.$t('adminHome.sunday')]
    },
    desc () { // 星期国际化
      return [this.$t('adminHome.no6'), this.$t('adminHome.no7'), this.$t('adminHome.no8'), this.$t('adminHome.no9'), this.$t('adminHome.no10'), this.$t('adminHome.no11'), this.$t('adminHome.no12')]
    }
  },
  methods: {
    dataList () { // 获取页面数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.admin_home,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.mainData.all = res.data.data.all
          this.mainData.amount = res.data.data.amount
          this.mainData.today = res.data.data.today
          this.data1 = res.data.data.sevenDayData
          this.data2 = res.data.data.oneMonthData
          
          this.drawLine1()// 还款量统计图
          this.drawLine2()// 放款量统计图
        }
      })
    },
    drawLine1 () {    // 本周每日还款量统计图
      if (this.data1) {
        let myChart = echarts.init(document.getElementById('myChart1'))
        var colors = ['#4FC913', '#AD98D9', '#50A8EC', '#FFB075', '#D26F75', '#828DAA', '#E1C810']
        myChart.setOption({
          color: colors,
          title: {
            text: this.lang1,
            left: 'center',
            top: 10,
            textStyle: {
              color: '#333'
            }
          },
          legend: {
              data:this.desc,
              orient:'vertical',
              left:'20',
              top:'50',
              height:'auto',
              itemGap:20
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
          },
          grid: {
            left: '14%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.week
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
              {
                  name:this.$t('adminHome.no6'),
                  type:'line',
                  smooth: true,
                  data:this.data1.registerCountWeek
              },
              {
                  name:this.$t('adminHome.no7'),
                  type:'line',
                  smooth: true,
                  data:this.data1.newApplyCountWeek
              },
              {
                  name:this.$t('adminHome.no8'),
                  type:'line',
                  smooth: true,
                  data:this.data1.oldApplyCountWeek
              },
              {
                  name:this.$t('adminHome.no9'),
                  type:'line',
                  smooth: true,
                  data:this.data1.newLendCountWeek
              },
              {
                  name:this.$t('adminHome.no10'),
                  type:'line',
                  smooth: true,
                  data:this.data1.oldLendCountWeek
              },
              {
                  name:this.$t('adminHome.no11'),
                  type:'line',
                  smooth: true,
                  data:this.data1.repaymentWeek
              },
              {
                  name:this.$t('adminHome.no12'),
                  type:'line',
                  smooth: true,
                  data:this.data1.overDueWeek
              }
          ]
        })
      }
    },
    drawLine2 () {    // 本周每日放款量统计图
      if (this.data2) {
        let myChart = echarts.init(document.getElementById('myChart2'))
        var colors = ['#4FC913', '#AD98D9', '#50A8EC', '#FFB075', '#D26F75', '#828DAA', '#E1C810']
        // 绘制图表
        myChart.setOption({
          color: colors,
          title: {
            text: this.lang3,
            left: 'center',
            top: 10,
            textStyle: {
              color: '#333'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
              data:this.desc,
              orient:'vertical',
              left:'20',
              top:'50',
              height:'auto',
              itemGap:20
          },
          grid: {
            left: '14%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
              {
                  name:this.$t('adminHome.no6'),
                  type:'line',
                  smooth: true,
                  data:this.data2.registerCountMonth
              },
              {
                  name:this.$t('adminHome.no7'),
                  type:'line',
                  smooth: true,
                  data:this.data2.newApplyCountMonth
              },
              {
                  name:this.$t('adminHome.no8'),
                  type:'line',
                  smooth: true,
                  data:this.data2.oldApplyCountMonth
              },
              {
                  name:this.$t('adminHome.no9'),
                  type:'line',
                  smooth: true,
                  data:this.data2.newLendCountMonth
              },
              {
                  name:this.$t('adminHome.no10'),
                  type:'line',
                  smooth: true,
                  data:this.data2.oldLendCountMonth
              },
              {
                  name:this.$t('adminHome.no11'),
                  type:'line',
                  smooth: true,
                  data:this.data2.repaymentMonth
              },
              {
                  name:this.$t('adminHome.no12'),
                  type:'line',
                  smooth: true,
                  data:this.data2.overDueMonth
              }
          ]
        })
      }
    }

  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    let list = sessionStorage.getItem('list')
    this.$store.commit('filterPreList', {list})
    // MENU_WORKS
    if(this.$store.state.common.permiss.includes('MENU_WORKS')){
      this.dataList()
    }
  }
}
</script>
<style scoped lang="scss">

$color1:red;  // 放款还款总量颜色
@mixin background($url) {
  background-image: url($url);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 10px;
  overflow: hidden;
}
@mixin title{
  .head-title {
    font-size: 18px;
    line-height: 40px;
  }
  .head-nub {
    font-size: 22px;
    word-break: break-all;
  }
}
@mixin flex-cen{
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  width: 100%;
  height: 100%;
  padding:20px 30px;
  background-color: rgba(246, 249, 252, 1);
}

// 分割样式
.paixu {
  width: 100%;
  height: 48px;
  line-height: 48px;
  // background: rgba(224, 229, 246, 1);
  border-radius: 4px;
  margin-bottom: 10px;
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

// 顶部日活跃量的样式
.bgc1{
  background-color: #205CFF;
}
.bgc2{
  background-color: #FF9959;
}
.bgc3{
  background-color: #FC7E7E;
}
.cl1{
  color: #205CFF;
}
.cl2{
  color: #FF9959;
}
.cl3{
  color: #FC7E7E;
}
.cl4{
  color: #4FC913;
}
.cl5{
  color: #000000;
}
.total{
  width: 100%;
  ul{
    width: 100%;
    height: 162px;
    margin-bottom: 16px;
    background-color: #fff;
    border-radius:4px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    // justify-content: space-between;
    li{
      width: 20%;
      p{
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p:nth-child(1){
        font-size: 16px;
        span{
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 18px;
        }
      }
      p:nth-child(2){
        margin-top: 20px;
        font-size: 30px;
      }
    }
    .line{
      width: 0px;
      height: 104px;
      border: 1px dashed #ddd;
    }
  }
}



.tongji{
  width: 100%;
  // height: 200px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 30px 34px;
  ul{
    width: 100%;
    li{
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      .box{
        display: flex;
        flex-wrap: wrap;
        padding-top: 30px;
        padding-bottom: 30px;
        p{
          width: 100%;
          text-align: center;
        }
        .mgt15{
          margin-top: 15px;
        }
      }
      .left{
        width: 40%;
      }
      .right{
        flex: auto;
      }
    }
    .line{
      width: 100%;
      height: 0px;
      border: 1px dashed #ddd;
    }
  }
  .tongji-1{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #444;
    font-size: 16px;
    flex-wrap: wrap;
    padding-left: 20px;
    span{
      font-size: 22px;
      color: $color1;
      font-weight: bold;
      padding: 0 10px;
      word-break: break-all;
    }
  }
}




</style>
