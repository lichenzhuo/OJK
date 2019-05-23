<template>
  <div class="public_main" >
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('riskManage.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('add.no39')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- ------------  今日昨日  ------------------------ -->
    <div class="tabs mb20" v-if="$store.state.common.permiss.includes('RIGHT_MACHINE_REJECT_TOP')">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr1" :key="index" :class="{active:active1==value.id}" @click="activeDay(value.id)">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <li  v-show="active1==1">
          <template v-if="$store.state.common.lang==='vi'">
            <el-row type="flex" class="row-bg" justify="space-between" :gutter="40" >
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart1" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.machineRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.machineRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.machineRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.machineRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.machineRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.machineRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart2" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.firstApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart3" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.secondApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.secondApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.secondApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.secondApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.secondApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
            </el-row>
          </template>
          <template v-if="$store.state.common.lang==='id'">
            <el-row type="flex" class="row-bg" justify="space-between" :gutter="40" >
              <el-col :md="12" :lg="12" :xl="12">
                <div class="line">
                  <div id="myChart1" style="width: 100%;height:440px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.machineRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.machineRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.machineRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.machineRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.machineRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.machineRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="12" :lg="12" :xl="12">
                <div class="line">
                  <div id="myChart2" style="width: 100%;height:440px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.firstApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
            </el-row>
          </template>
        </li>
        <li  v-show="active1==2">
          <template v-if="$store.state.common.lang==='vi'">
            <el-row type="flex" class="row-bg" justify="space-between" :gutter="40" >
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart4" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.machineRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.machineRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.machineRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.machineRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.machineRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.machineRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart5" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.firstApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart6" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.secondApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.secondApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.secondApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.secondApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.secondApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.secondApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
            </el-row>
          </template>
          <template v-if="$store.state.common.lang==='id'">
            <el-row type="flex" class="row-bg" justify="space-between" :gutter="40" >
              <el-col :md="12" :lg="12" :xl="12">
                <div class="line">
                  <div id="myChart4" style="width: 100%;height:440px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.machineRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.machineRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.machineRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.machineRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.machineRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.machineRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.machineRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="12" :lg="12" :xl="12">
                <div class="line">
                  <div id="myChart5" style="width: 100%;height:440px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataDay.firstApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataDay.firstApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataDay.firstApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
            </el-row>
          </template>
          
        </li>
      </ul>
    </div>
    <!-- ------------  本周上周  ------------------------ -->
    <div class="tabs mb20" v-if="$store.state.common.permiss.includes('RIGHT_MACHINE_REJECT_TOP')">
      <ul class="tabs_title">
        <li v-for="(value,index) in arr2" :key="index" :class="{active:active2==value.id}" @click="active2=value.id">
          <span>{{value.title}}</span>
        </li>
      </ul>
      <ul class="tabs_main">
        <li  v-show="active2==3">
          <template v-if="$store.state.common.lang==='vi'">
            <el-row type="flex" class="row-bg" justify="space-between" :gutter="40" >
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart7" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.machineRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataDay.machineRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.machineRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.machineRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.machineRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.machineRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart8" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.firstApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart9" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.secondApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.secondApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.secondApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.secondApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.secondApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
            </el-row>
          </template>
          <template v-if="$store.state.common.lang==='id'">
            <el-row type="flex" class="row-bg" justify="space-between" :gutter="40" >
              <el-col :md="12" :lg="12" :xl="12">
                <div class="line">
                  <div id="myChart7" style="width: 100%;height:440px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.machineRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataWeek.machineRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.machineRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.machineRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.machineRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.machineRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="12" :lg="12" :xl="12">
                <div class="line">
                  <div id="myChart8" style="width: 100%;height:440px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.firstApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
            </el-row>
          </template>
        </li>
        <li  v-show="active2==4">
          <template v-if="$store.state.common.lang==='vi'">
            <el-row type="flex" class="row-bg" justify="space-between" :gutter="40" >
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart10" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.machineRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataWeek.machineRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.machineRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.machineRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.machineRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.machineRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart11" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.firstApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" :xl="8">
                <div class="line">
                  <div id="myChart12" style="width: 100%;height:360px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.secondApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.secondApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.secondApproceRejectList[1]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.secondApproceRejectList[1]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.secondApproceRejectList[1]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.secondApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
            </el-row>
          </template>
          <template v-if="$store.state.common.lang==='id'">
            <el-row type="flex" class="row-bg" justify="space-between" :gutter="40" >
              <el-col :md="12" :lg="12" :xl="12">
                <div class="line">
                  <div id="myChart10" style="width: 100%;height:440px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.machineRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataWeek.machineRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.machineRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[2]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.machineRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[3]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.machineRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.machineRejectList[4]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.machineRejectList[4]}}</span></p>
                </div>
              </el-col>
              <el-col :md="12" :lg="12" :xl="12">
                <div class="line">
                  <div id="myChart11" style="width: 100%;height:440px;"></div>
                </div>
                <div class="pd-lr-10 flex flex-wrap flex-align-center" v-if="echartDataWeek.firstApproceRejectList.length">
                  <p class="flex mb10"><span class="box1 color1"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[0]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[1]"><span class="box1 color2"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[1]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[1]"><span class="box1 color3"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[2]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[1]"><span class="box1 color4"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[3]}}</span></p>
                  <p class="flex mb10" v-if="echartDataWeek.firstApproceRejectList[1]"><span class="box1 color5"></span><span class="mr10">{{echartDataWeek.firstApproceRejectList[4]}}</span></p>
                </div>
              </el-col>
            </el-row>
          </template>
        </li>
      </ul>
    </div>

    <!-- ------------  列表开始  v-if="$store.state.common.permiss.includes('RIGHT_MACHINE_REJECT_EXP')"  ------------------------ --> 
    <div class="list_operation" >
      <el-button 
        v-if="$store.state.common.permiss.includes('RIGHT_MACHINE_REJECT_EXP')"
        type="primary" 
        @click="putExcel"
      >
      {{$t('public.excel')}}
      </el-button>
    </div>
    <div class="tabs" v-if="$store.state.common.permiss.includes('RIGHT_MACHINE_REJECT_LIST')">
      <template>
        <el-tabs v-model="activeTab" @tab-click="search">
          <el-tab-pane :label="$t('channelData.day')" name="1">
          </el-tab-pane>
          <el-tab-pane :label="$t('channelData.week')" name="2">
          </el-tab-pane>
          <el-tab-pane :label="$t('channelData.mouth')" name="3">
          </el-tab-pane>
          <div class="table-wrap">
            <div class="top-wrap flex flex-justify-between">
              <div class="search-input flex-align-center flex-justify-end">
                <span>{{$t('filter.timeSelect')}}:</span>
                <el-date-picker
                  v-if="activeTab == 1"
                  size="small"
                  v-model="selectDay"
                  type="daterange" 
                  range-separator="~" 
                  :default-value="$store.state.common.preMonth"
                  :start-placeholder="$t('public.beginTime')"
                  :end-placeholder="$t('public.endTime')">
                </el-date-picker>
                <el-date-picker
                  v-if="activeTab == 2"    
                  v-model="weekTime"
                  type="week"
                  size="small"
                  format="yyyy 第 WW 周"
                  :picker-options="pickerOptions">
                </el-date-picker>
                <el-date-picker
                  size="small"
                  v-if="activeTab == 3"
                  v-model="selectMonth"
                  value-format="yyyy-MM"
                  type="month">
                </el-date-picker>
                <span class="ml15">{{$t('loanMoneyDetail.opeType2')}}:</span>
                <el-select clearable size="small" v-model="auditSelect" :placeholder="$t('public.placeholder')">
                  <el-option v-for="item in options1" :key="item.value" :label="$t(item.label)" :value="item.value">
                  </el-option>
                </el-select>
                <span class="ml15"></span>
                <el-button 
                  v-if="$store.state.common.permiss.includes('RIGHT_MACHINE_REJECT_QUERY')"
                  type="primary" 
                  @click="search"
                >
                {{$t('public.select')}}
                </el-button>
              </div>
            </div>
            <div class="table">
              <template>
                <el-table :data="list" size="small" >
                  <el-table-column align="center" :label="$t('channelData.no1')" width="200px">
                    <template slot-scope="scope">
                      <span v-if="parseInt(activeTab)===1">{{scope.row.strApproveTime}}</span>
                      <span v-if="parseInt(activeTab)===2">{{scope.row.strApproveTime+'~'+scope.row.strApproveTimeEnd}}</span>
                      <span v-if="parseInt(activeTab)===3">{{scope.row.weekTime}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="approveType" :label="$t('loanMoneyDetail.opeType2')">
                    <template slot-scope="scope">
                      <span>{{$t($store.getters.auditType(scope.row.approveType))}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="rejectReason" :label="$t('add.no35')">
                  </el-table-column>
                  <el-table-column align="center" prop="rejectPercent" :label="$t('add.no36')">
                    <template slot-scope="scope">
                      <span>{{$store.getters.twoPoint(scope.row.rejectPercent)}}%</span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column align="center" prop="registerRate" :label="$t('channelData.no10')">
                    <template slot-scope="scope">
                      <span>{{$store.getters.twoPoint(scope.row.registerRate)}}%</span>
                    </template>
                  </el-table-column> -->
                </el-table>
              </template>
            </div>

            <!-- ------------  分页显示栏  ------------------------ -->
            <el-row type="flex" justify="end">
                <div class="pages" v-if="$store.state.common.permiss.includes('RIGHT_MACHINE_REJECT_LIST')">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page.current"
                    layout="total, prev, pager, next, ->"
                    :total="page.total?page.total:0">
                  </el-pagination>
                </div>
            </el-row>
          </div>
        </el-tabs>
      </template>
    </div>

    <!-- -------------- 底部空白------------------------ -->
    <div class="foot"></div>
  </div>
</template>
<script>
  // 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件 bar柱状图
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/grid')
export default {
  name: 'rejectSelect',
  data () {
    return {
      sessionid: '',
      data1: [], // 今日机审
      data2: [], // 今日人审
      data3: [], // 昨日机审
      data4: [], // 昨日人审
      flag: true,
      active1: 1, // 第一个选项卡当前选中项
      active2: 3, // 第一个选项卡当前选中项
      activeTab: '1',
      list: [],
      selectDay: [],
      formInline:{
        timeBegin: '',
        timeEnd: '',
      },
      selectWeek: '',
      weekTime: '',
      selectMonth: '',
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      condition: {},
      pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e7;
				},
				firstDayOfWeek: 1
      },
      echartDataDay:{
        firstApproceRejectList: [],
        firstApproceRejectPercentList: [],
        secondApproceRejectList: [],
        secondApproceRejectPercentList: [],
        machineRejectList: [],
        machineRejectPercentList: [],
      },
      echartDataWeek:{
        firstApproceRejectList: [],
        firstApproceRejectPercentList: [],
        secondApproceRejectList: [],
        secondApproceRejectPercentList: [],
        machineRejectList: [],
        machineRejectPercentList: [],
      },
      auditSelect: '1',
      options1: this.$store.state.options.auditType_option,
    }
  },
  computed: {
    arr1 () {
      return [
        {id: 1, title: this.$t('add.no29')},
        {id: 2, title: this.$t('add.no30')},
      ];
    },
    arr2 () {
      return [
        {id: 3, title: this.$t('add.no31')},
        {id: 4, title: this.$t('add.no32')},
      ];
    },
    lang1 () { // 机审
      return this.$t('add.no33');
    },
    lang2 () { // 人审
      return this.$t('add.no40');
    },
    lang3 () { // 人审
      return this.$t('add.no41');
    },
  },
  methods: {
    dataListDay (timeType) { // 获取页面数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.RISKCONTROL0017,
          'sessionid': this.sessionid
        },
        timeType
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.echartDataDay.firstApproceRejectList = res.data.data.firstApproceRejectList;
          this.echartDataDay.firstApproceRejectPercentList = res.data.data.firstApproceRejectPercentList;
          this.echartDataDay.secondApproceRejectList = res.data.data.secondApproceRejectList;
          this.echartDataDay.secondApproceRejectPercentList = res.data.data.secondApproceRejectPercentList;
          this.echartDataDay.machineRejectList = res.data.data.machineRejectList;
          this.echartDataDay.machineRejectPercentList = res.data.data.machineRejectPercentList;
          this.drawLine1();// 日机审
          this.drawLine2();// 日初审
          this.drawLine3();// 日复审
        }
      })
    },
    dataListWeek (timeType) { // 获取页面数据
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.RISKCONTROL0017,
          'sessionid': this.sessionid
        },
        timeType
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.echartDataWeek.firstApproceRejectList = res.data.data.firstApproceRejectList;
          this.echartDataWeek.firstApproceRejectPercentList = res.data.data.firstApproceRejectPercentList;
          this.echartDataWeek.secondApproceRejectList = res.data.data.secondApproceRejectList;
          this.echartDataWeek.secondApproceRejectPercentList = res.data.data.secondApproceRejectPercentList;
          this.echartDataWeek.machineRejectList = res.data.data.machineRejectList;
          this.echartDataWeek.machineRejectPercentList = res.data.data.machineRejectPercentList;
          this.drawLine4();// 周机审
          this.drawLine5();// 周初审
          this.drawLine6();// 周复审
        }
      })
    },
    drawLine1 () {    // 今日数据
      let myChart , title = this.lang1, data = this.echartDataDay.machineRejectPercentList;
      if(this.active1==1){
        myChart = echarts.init(document.getElementById('myChart1'));
      }
      if(this.active1==2){
        myChart = echarts.init(document.getElementById('myChart4'));
      }
      this.getEchart(myChart, title, data);
    },
    drawLine2 () {    // 昨日数据
      let myChart, title = this.lang2, data = this.echartDataDay.firstApproceRejectPercentList;
      if(this.active1==1){
        myChart = echarts.init(document.getElementById('myChart2'));
      }
      if(this.active1==2){
        myChart = echarts.init(document.getElementById('myChart5'));
      }
      this.getEchart(myChart, title, data);
    },
    drawLine3 () {    // 昨日数据
      let myChart, title = this.lang3, data = this.echartDataDay.secondApproceRejectPercentList;
      if(this.active1==1){
        myChart = echarts.init(document.getElementById('myChart3'));
      }
      if(this.active1==2){
        myChart = echarts.init(document.getElementById('myChart6'));
      }
      this.getEchart(myChart, title, data);
    },
    drawLine4 () {    // 今日数据
      let myChart , title = this.lang1, data = this.echartDataWeek.machineRejectPercentList;
      if(this.active2==3){
        myChart = echarts.init(document.getElementById('myChart7'));
      }
      if(this.active2==4){
        myChart = echarts.init(document.getElementById('myChart10'));
      }
      this.getEchart(myChart, title, data);
    },
    drawLine5 () {    // 今日数据
      let myChart , title = this.lang2, data = this.echartDataWeek.firstApproceRejectPercentList;
      if(this.active2==3){
        myChart = echarts.init(document.getElementById('myChart8'));
      }
      if(this.active2==4){
        myChart = echarts.init(document.getElementById('myChart11'));
      }
      this.getEchart(myChart, title, data);
    },
    drawLine6 () {    // 今日数据
      let myChart , title = this.lang3, data = this.echartDataWeek.secondApproceRejectPercentList;
      if(this.active2==3){
        myChart = echarts.init(document.getElementById('myChart9'));
      }
      if(this.active2==4){
        myChart = echarts.init(document.getElementById('myChart12'));
      }
      this.getEchart(myChart, title, data);
    },
    getEchart(dom,title,data){
      dom.setOption({
        title: {
          text: title,
          left: 'center',
          top: 10,
          textStyle: {
            color: '#333'
          }
        },
        xAxis: {
            type : 'category',
        },
        yAxis: {
            type : 'value'
        },
        series: [
            {
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                    }
                },
                data: data,
                itemStyle: {
                    normal: {
                        // 随机显示
                        //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        // 定制显示（按顺序）
                        color: function(params) { 
                            var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3']; 
                            return colorList[params.dataIndex] 
                        }
                    },
                },
            },
        ]
      })
    },
    fetchData () {
      const self = this;
      self.condition = {
        timeType: this.activeTab?this.activeTab:1,
        timeBegin: parseInt(this.activeTab)===1?this.formInline.timeBegin:parseInt(this.activeTab)===2?this.selectWeek:parseInt(this.activeTab)===3?this.selectMonth:'',
        timeEnd: parseInt(this.activeTab)===1?this.formInline.timeEnd:'',
        approveType: this.auditSelect
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.RISKCONTROL0018,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        ...self.condition
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          self.list = res.data.data;
          self.page.total = res.data.header.page.total;
        } else {
          self.$message.error(res.data.header.msg);
        }
      })
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val;
      this.fetchData();
    },
    search () {
      this.page.current = 1;
      this.fetchData();
    },
    activeDay(id){
      this.active1 = id;
      this.$store.commit('rejectSelectTodayOrYesterday', id)
    },
    activeWeek(id){
      this.active2 = id;
      this.$store.commit('rejectSelectweekOryesLastweek', id)
    },
    putExcel () { // excel下载操作
      if (this.flag) {
        this.flag = false
        const self = this;
        self.condition = {
          timeType: this.activeTab?this.activeTab:1,
          timeBegin: parseInt(this.activeTab)===1?(this.selectDay[0]?this.selectDay[0]:''):parseInt(this.activeTab)===2?this.selectWeek:parseInt(this.activeTab)===3?this.selectMonth:'',
          timeEnd: parseInt(this.activeTab)===1?(this.selectDay[1]?this.selectDay[1]:''):'',
          approveType: this.auditSelect
        }
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.RISKCONTROL0019,
            'page': {'index': this.currentPage, 'size': this.pageNumber},
            'sessionid': this.sessionid
          }, 
          ...self.condition
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title, fields, data);
          }
        })
      }
    },
  },
  watch: {
    weekTime (val) {
      if(val){
        let date = new Date(val).getTime();
        this.selectWeek = this.$store.getters.getYMD(date);
      }else{
        this.selectWeek = ''
      }
    },
    active1(val){
      this.dataListDay(val);
    },
    active2(val){
      this.dataListWeek(val);
    },
    selectDay () {
      if (this.selectDay) {
        this.formInline.timeBegin = this.$store.getters.yyyy_m_d( this.selectDay[0]);
        this.formInline.timeEnd = this.$store.getters.yyyy_m_d( this.selectDay[1]);
      } else {
        this.formInline.timeBegin = '';
        this.formInline.timeEnd = '';
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.dataListDay(1);
    this.dataListWeek(3);
    this.fetchData();
  }
}
</script>
<style scoped lang="scss">

.line{
  width: 100%;
  height: auto;
}
.color1{
  background-color: #C33531;
}
.color2{
  background-color: #EFE42A;
}
.color3{
  background-color: #64BD3D;
}
.color4{
  background-color: #EE9201;
}
.color5{
  background-color: #29AAE3;
}
.box1{
  display: block;
  width: 2px;
  height: 20px;
  margin-right: 5px;
}
.mr10{
  margin-right: 10px;
}
.mb10{
  margin-bottom: 10px;
}
.pd-lr-10{
  padding: 0 10px;
  margin-top: -26px;
  p{
    width: 50%;
    font-size: 12px;
  }
}
.tabs {
  background: #fff;
  padding: 20px;
}
.top-wrap {
  height: 80px;
  .checkbox-wrap  {
    padding:10px;
  }
}

</style>
