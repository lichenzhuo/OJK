<template>
  <div class="echats">
    <div ref="pie" id="myChart" style="width: 100%;height:500px;background-color:#fff"></div>
  </div>
</template>
<script>
  // 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/gauge')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
    data () {
      return {

      }
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      drawLine () {
      // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
        myChart.setOption({
          color: ['#ddd', '#ff6700', '#547ef6'],
          tooltip: {
            formatter: '{a} <br/>{c} {b}'
          },
          toolbox: {
            show: true,
            feature: {
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
            {
              name: '分数情况',
              type: 'gauge',
              // radius: '50%',
              min: 300,
              max: 800,
              radius: 170,
              splitNumber: 10,
              startAngle: 180,
              endAngle: 0,
              axisLine: {
                lineStyle: {
                  color: [[0.4, '#d71345'], [0.5, '#f47920'], [0.6, '#fcaf17'], [0.8, '#78cdd1'], [1, '#45b97c']],
                  width: 6,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 20
                }
              },
              axisLabel: {
                distance: 10
              },
              axisTick: {            // 坐标轴小标记
                length: 8,        // 属性length控制线长
                show: false,
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              splitLine: {           // 分隔线
                show: false,
                length: 0,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto'
                }
              },
              pointer: {
                width: 8
              },
              title: {
                offsetCenter: [0, '-120%'],       // x, y，单位px
                textStyle: {
                  color: '#000',
                  fontSize: 22
                }
              },
              detail: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder'
              },
              data: [{value: 670, name: '欺诈分'}]
            }
          ]
        })
      }
    }
}
</script>
<style lang="scss" scoped>
.echats{
  width: 100%;
  height: 100%;
  background-color: rgb(209, 208, 208);
}
</style>
