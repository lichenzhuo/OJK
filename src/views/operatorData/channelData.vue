<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('channelData.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('channelData.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('channelData.crumbsTwo')}}</p>
    </div>
     
  <!-- ------------- 搜索查询栏 ------------------------ -->
    <search-filter 
      :filter="filter" 
      @search="search" 
      @output="putExcel" 
      :searchRight="$store.state.common.permiss.includes('RIGHT_CHANNEL_DATA_QUERY')"
      :outputRight="$store.state.common.permiss.includes('RIGHT_CHANNEL_DATA_EXP')">
    </search-filter>
  
  <!-- ----- 选项卡 ------ -->
    <div class="tabs" v-if="$store.state.common.permiss.includes('RIGHT_CHANNEL_DATA_LIST')">
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
                  id="day"
                  size="small"
                  v-model="selectDay"
                  value-format="yyyy-MM-dd" 
                  type="daterange" 
                  range-separator="~" 
                  :default-value="$store.state.common.preMonth"
                  :start-placeholder="$t('public.beginTime')"
                  :end-placeholder="$t('public.endTime')"
                  @change="search">
                </el-date-picker>
                <el-date-picker
                  id="week"
                  v-if="activeTab == 2"    
                  v-model="weekTime"
                  type="week"
                  size="small"
                  format="yyyy 第 WW 周"
                  :picker-options="pickerOptions"
                  @change="search">
                </el-date-picker>
                <el-date-picker
                  id="month"
                  size="small"
                  v-if="activeTab == 3"
                  v-model="selectMonth"
                  value-format="yyyy-MM"
                  type="month"
                  @change="search">
                </el-date-picker>
              </div>
              <div class="checkbox-wrap flex flex-col flex-align-end">
                <el-button type="text" @click="showCheckbox=!showCheckbox">{{$t('public.no80')}}</el-button>
                <template v-if="showCheckbox">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="item in showOptions" :label="item.value" :key="item.value">{{$t(item.label)}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </div>
            </div>
            <div class="table">
              <template>
                <el-table :data="list" size="small" border  v-loading="loadFlag">
                  <el-table-column align="center" prop="appTypeName" :label="$t('new.no49')" >
                  </el-table-column>
                  <el-table-column align="center" :label="$t('channelData.no1')" width="180px">
                    <template slot-scope="scope">
                      <span v-if="parseInt(activeTab)===2">{{scope.row.strTime+'~'+scope.row.strTimeEnd}}</span>
                      <span v-else>{{scope.row.strTime}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column  prop="mediaSourceName" :label="$t('channelData.no2')">
                    <template slot-scope="scope">
                      <span class="cp text" @click="channelData(scope.row.mediaSource,scope.row.firstMediasource)">{{scope.row.mediaSourceName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="installCount" :label="$t('channelData.no3')">
                  </el-table-column>
                  <el-table-column align="center" prop="registerCount" :label="$t('channelData.no4')">
                  </el-table-column>
                  <el-table-column align="center" prop="orderCount" :label="$t('channelData.no5')">
                  </el-table-column>
                  <el-table-column align="center" prop="orderMoneyCount" :label="$t('channelData.no6')">
                  </el-table-column>
                  <el-table-column align="center" prop="loanCount" :label="$t('channelData.no7')">
                  </el-table-column>
                  <el-table-column align="center" prop="loanMoneyCount" :label="$t('channelData.no8')">
                  </el-table-column>
                  <el-table-column align="center" prop="installRate" :label="$t('channelData.no9')">
                    <template slot-scope="scope">
                      <span>{{$store.getters.twoPoint(scope.row.installRate)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="registerRate" :label="$t('channelData.no10')">
                    <template slot-scope="scope">
                      <span>{{$store.getters.twoPoint(scope.row.registerRate)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="loanRate" :label="$t('channelData.no11')">
                    <template slot-scope="scope">
                      <span>{{$store.getters.twoPoint(scope.row.loanRate)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="repeatTwice" :label="$t('channelData.no12')" v-if="checkList.includes(1)">
                  </el-table-column>
                  <el-table-column align="center" prop="repeatThreeTimes" :label="$t('channelData.no13')" v-if="checkList.includes(2)">
                  </el-table-column>
                  <el-table-column align="center" prop="repeatMoreTimes" :label="$t('channelData.no14')" v-if="checkList.includes(3)">
                  </el-table-column>
                  <el-table-column align="center" prop="overdueCount" :label="$t('channelData.no15')" v-if="checkList.includes(4)">
                  </el-table-column>
                  <el-table-column align="center" prop="overdueCountMoney" :label="$t('channelData.no16')" v-if="checkList.includes(5)">
                  </el-table-column>
                  <!-- <el-table-column align="center" prop="blackUserHitRate" :label="$t('channelData.no17')"  v-if="checkList.includes(6)">
                    <template slot-scope="scope">
                      <span>{{$store.getters.twoPoint(scope.row.blackUserHitRate)}}%</span>
                    </template>
                  </el-table-column> -->
                </el-table>
              </template>
            </div>

            <!-- ------------  分页显示栏  ------------------------ -->
              <el-row type="flex" justify="end">
                  <div class="pages">
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

  </div>
</template>
<script>
import searchFilter from '../../components/component/filter'
export default {
  components: {searchFilter},
  data () {
    return {
      filter: {
        channelData: '',
        appType:''
      },
      loadFlag: true,
      activeTab: '1',
      list: [],
      selectDay: '',
      selectWeek: '',
      weekTime: '',
      selectMonth: '',
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      condition: {},
      flag:true,
      showCheckbox: false,
      showOptions: [
        {
          value:1,
          label: 'channelData.no12'
        },
        {
          value:2,
          label: 'channelData.no13'
        },
        {
          value:3,
          label: 'channelData.no14'
        },
        {
          value:4,
          label: 'channelData.no15'
        },
        {
          value:5,
          label: 'channelData.no16'
        }
      ],
      checkList: [],
      pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e7;
				},
				firstDayOfWeek: 1
      },
      firstMediasource: ''
    }
  },
  mounted () {
    this.fetchData();
  },
  watch: {
    weekTime (val) {
      let date = new Date(val).getTime();
      this.selectWeek = this.$store.getters.getYMD(date);
    }
  },
  methods: {
    fetchData () {
      this.loadFlag = true;
      const self = this;
      self.condition.mediaSource = this.filter.channelData?this.filter.channelData:''
      self.condition.appType = this.filter.appType?this.filter.appType:''
      self.condition.timeType = this.activeTab?this.activeTab:1
      self.condition.timeBegin = parseInt(this.activeTab)===1?(this.selectDay[0]?this.selectDay[0]:''):parseInt(this.activeTab)===2?this.selectWeek:parseInt(this.activeTab)===3?this.selectMonth:''
      self.condition.timeEnd = parseInt(this.activeTab)===1?(this.selectDay[1]?this.selectDay[1]:''):''
      // self.condition = {
      //   mediaSource: this.filter.channelData?this.filter.channelData:'',
      //   appType: this.filter.appType?this.filter.appType:'',
      //   timeType: this.activeTab?this.activeTab:1,
      //   timeBegin: parseInt(this.activeTab)===1?(this.selectDay[0]?this.selectDay[0]:''):parseInt(this.activeTab)===2?this.selectWeek:parseInt(this.activeTab)===3?this.selectMonth:'',
      //   timeEnd: parseInt(this.activeTab)===1?(this.selectDay[1]?this.selectDay[1]:''):''
      // }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.channelDataList,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        ...self.condition
      }
      this.$axios.post('', option).then(res => {
        this.loadFlag = false;
        if (res.data.header.code == 0) {
          self.list = res.data.data;
          self.page.total = res.data.header.page.total;
        } else {
          self.$message.error(res.data.header.msg);
        }
      })
    },
    channelData (mediaSource,firstMediasource) {
      if(mediaSource){
        this.loadFlag = true;
        const self = this;
        self.condition.firstMediasource = firstMediasource?0:mediaSource
        this.firstMediasource = mediaSource
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.channelDataList,
            sessionid: sessionStorage.getItem('sessionid'),
            page: {
              index: this.page.current,
              size: this.page.size
            }
          },
          ...self.condition
        }
        this.$axios.post('', option).then(res => {
          this.loadFlag = false;
          if (res.data.header.code == 0) {
            self.list = res.data.data;
            self.page.total = res.data.header.page.total;
          } else {
            self.$message.error(res.data.header.msg);
          }
        })
      } else {
        this.firstMediasource = ''
      }
      
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val;
      this.fetchData();
    },
    search () {
      this.page.current = 1
      this.fetchData();
    },
    putExcel () {
      if (this.flag) {
        this.flag = false;
        const self = this
        self.condition = {
          mediaSource: this.filter.channelData?this.filter.channelData:'',
          appType: this.filter.appType?this.filter.appType:'',
          timeType: this.activeTab?this.activeTab:1,
          timeBegin: parseInt(this.activeTab)===1?(this.selectDay[0]?this.selectDay[0]:''):parseInt(this.activeTab)===2?this.selectWeek:parseInt(this.activeTab)===3?this.selectMonth:'',
          timeEnd: parseInt(this.activeTab)===1?(this.selectDay[1]?this.selectDay[1]:''):''
        }
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.channelDataExcel,
            sessionid: sessionStorage.getItem('sessionid'),
            page: {
              index: this.page.current,
              size: this.page.size
            }
          },
          ...self.condition,
          firstMediasource: this.firstMediasource
        }
        this.$axios.post('', option).then(res => {
          this.flag = true;
          if (res.data.header.code == 0) {
            let title = res.data.data.titles;
            let fields = res.data.data.fields;
            let data = res.data.data.data;
            this.$export2Excel(title,fields,data);
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  
  .tabs {
    background: #fff;
    padding: 20px;
  }
  .top-wrap {
    height: 90px;
    .checkbox-wrap  {
      padding:10px;
    }
  }
  .text{
    color:#1D7BFF;
    text-decoration: underline;
  }
</style>


