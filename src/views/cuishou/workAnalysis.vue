<template>
  <div class="public_main" >
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('operationList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('operationList.crumbsFour')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- ------------ 工作概况开始 ------------------------ --> 
    <div class="tabControl">
      <ul class="tab_title">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active1==value.id}" @click="active1=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tab_content">
        <li class="tab_content_oneType" v-if="active1==1">
          <div class="oneType_line">
            <p>
              <span>{{$t('operationDetail.no30')}}:</span>
              <span v-if="mainData.distributionMap.distributionCount!==''">{{mainData.distributionMap.distributionCount}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>
              <span>{{$t('operationDetail.no31')}}:</span>
              <span v-if="mainData.distributionMap.distributionAmount!==null&&mainData.distributionMap.distributionAmount!==undefined&&mainData.distributionMap.distributionAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(mainData.distributionMap.distributionAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p >
              <span>{{$t('operationDetail.no36')}}:</span>
              <span v-if="mainData.dayCountAndAmount.collectionCount!==null&&mainData.dayCountAndAmount.collectionCount!==undefined&&mainData.dayCountAndAmount.collectionCount!==''">{{mainData.dayCountAndAmount.collectionCount}}</span>
              <span v-else> {{$store.state.common.nullData}} </span>
            </p>
            <p >
              <span>{{$t('operationDetail.no37')}}:</span>
              <span v-if="mainData.dayCountAndAmount.collectionAmount!==null&&mainData.dayCountAndAmount.collectionAmount!==undefined&&mainData.dayCountAndAmount.collectionAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(mainData.dayCountAndAmount.collectionAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else> {{$store.state.common.nullData}} </span>
            </p>
          </div>
          <div class="oneType_line">
            <p>
              <span>{{$t('operationDetail.no32')}}:</span>
              <span v-if="mainData.distributionMap.refundCount!==null&&mainData.distributionMap.refundCount!==undefined&&mainData.distributionMap.refundCount!==''">{{mainData.distributionMap.refundCount}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>
              <span>{{$t('operationDetail.no33')}}:</span>
              <span v-if="mainData.distributionMap.refundAmount!==null&&mainData.distributionMap.refundAmount!==undefined&&mainData.distributionMap.refundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(mainData.distributionMap.refundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <template>
              <p>
                <span>{{$t('operationDetail.no38')}}:</span>
                <span v-if="mainData.weekCountAndAmount.collectionCount!==null&&mainData.weekCountAndAmount.collectionCount!==undefined&&mainData.weekCountAndAmount.collectionCount!==''">{{mainData.weekCountAndAmount.collectionCount}}</span>
                <span v-else>{{$store.state.common.nullData}}</span> 
              </p>
            </template>
            <p>
              <span>{{$t('operationDetail.no39')}}:</span>
              <span v-if="mainData.weekCountAndAmount.collectionAmount!==null&&mainData.weekCountAndAmount.collectionAmount!==undefined&&mainData.weekCountAndAmount.collectionAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(mainData.weekCountAndAmount.collectionAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div>
          <div class="oneType_line">
            <p>
              <span>{{$t('operationDetail.no34')}}:</span>
              <span v-if="mainData.distributionMap.noRefundCount!==null&&mainData.distributionMap.noRefundCount!==undefined&&mainData.distributionMap.noRefundCount!==''">{{mainData.distributionMap.noRefundCount}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>
              <span>{{$t('operationDetail.no35')}}:</span>
              <span v-if="mainData.distributionMap.noRefundAmount!==null&&mainData.distributionMap.noRefundAmount!==undefined&&mainData.distributionMap.noRefundAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(mainData.distributionMap.noRefundAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>
              <span>{{$t('operationDetail.no40')}}:</span>
              <span v-if="mainData.monthCountAndAmount.collectionCount!==null&&mainData.monthCountAndAmount.collectionCount!==undefined&&mainData.monthCountAndAmount.collectionCount!==''">{{mainData.monthCountAndAmount.collectionCount}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
            <p>
              <span>{{$t('operationDetail.no41')}}:</span>
              <span v-if="mainData.monthCountAndAmount.collectionAmount!==null&&mainData.monthCountAndAmount.collectionAmount!==undefined&&mainData.monthCountAndAmount.collectionAmount!==''">{{$store.state.common.id_currency}}{{$store.getters.moneySplit(mainData.monthCountAndAmount.collectionAmount)}}{{$store.state.common.vi_currency}}</span>
              <span v-else>{{$store.state.common.nullData}}</span> 
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- ------------ 图表开始 ------------------------ --> 
    <el-row type="flex" class="row-bg" justify="space-between" :gutter="40" v-if="this.data1&&this.data3">
      <template >
        <el-col :md="22" :lg="12" :xl="12">
          <div class="line">
            <div id="myChart1" style="width: 100%;height:580px;"></div>
          </div>
        </el-col>
      </template>
      <template >
        <el-col :md="22" :lg="12" :xl="12">
          <div class="line">
            <div id="myChart2" style="width: 100%;height:580px;"></div>
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
export default {
  name: 'workAnalysis',
  data () {
    return {
      sessionid: '',// 
      mainData: {// 数据汇总
        distributionMap: '', // 总类数据
        dayCountAndAmount: '', // 当日数据
        weekCountAndAmount: '',// 本周数据
        monthCountAndAmount: ''// 当月数据
      },
      data1: [], // 本周催回单量
      data2: [], // 本周催回金额
      data3: [], // 本周分配单量
      data4: [], // 本周分配金额
      flag: false,
      active1: 1, // 第一个选项卡当前选中项
    }
  },
  computed: {
    arr1 () {
      return [
        {id: 1, title: this.$t('new.no69')}
      ];
    },
    lang1 () { // 还款标题
      return this.$t('operationDetail.no42');
    },
    lang3 () { // 放款标题
      return this.$t('operationDetail.no43');
    },
    week () { // 星期国际化
      return [this.$t('adminHome.monday'), this.$t('adminHome.tuesday'), this.$t('adminHome.wednesday'), this.$t('adminHome.thursday'), this.$t('adminHome.friday'), this.$t('adminHome.saturday'), this.$t('adminHome.sunday')];
    }
  },
  methods: {
    dataList () { // 获取页面数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.workAnalysis_list,
          'sessionid': this.sessionid
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.mainData.distributionMap = res.data.data.distributionMap;
          this.mainData.dayCountAndAmount = res.data.data.dayCountAndAmount;
          this.mainData.weekCountAndAmount = res.data.data.weekCountAndAmount;
          this.mainData.monthCountAndAmount = res.data.data.monthCountAndAmount;
          this.data1 = res.data.data.weekCollectionCountList;// 单量
          this.data2 = res.data.data.weekCollectionAmountList;// 金额
          this.data3 = res.data.data.weekDistributionCountList;// 单量
          this.data4 = res.data.data.weekDistributionAmountList;// 金额
          this.drawLine1();// 还款量统计图
          this.drawLine2();// 放款量统计图
        }
      })
    },
    drawLine1 () {    // 本周每日还款量统计图
      if (this.data1) {
        let myChart = echarts.init(document.getElementById('myChart1'));
        var colors = ['#ff0000', '#00cc00'];
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
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
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
                  name:this.$t('totalManage.order'),
                  type:'line',
                  data:this.data1
              },
              {
                  name:this.$t('totalManage.money'),
                  type:'line',
                  data:this.data2
              }
          ]
        })
      }
    },
    drawLine2 () {    // 本周每日放款量统计图
      if (this.data3) {
        let myChart = echarts.init(document.getElementById('myChart2'));
        var colors = ['#ff0000', '#00cc00'];
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
          grid: {
            left: '3%',
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
                  name:this.$t('totalManage.order'),
                  type:'line',
                  data:this.data3
              },
              {
                  name:this.$t('totalManage.money'),
                  type:'line',
                  data:this.data4
              }
          ]
        })
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.dataList();
  }
}
</script>
<style scoped lang="scss">

.line{
  width: 100%;
  height: auto;
}


</style>
