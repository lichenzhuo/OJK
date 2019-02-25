<template>
  <div class="operatorManage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('channelData.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('channelData.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="paixu">
          <span></span>
          <p>{{$t('channelData.crumbsTwo')}}</p>
        </div>
      </el-col>
    </el-row>
     
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
                  format="yyyy 第 WW 周"
                  :picker-options="pickerOptions"
                  @change="search">
                </el-date-picker>
                <el-date-picker
                  id="month"
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
                <el-table :data="list" size="small" border style="width: 100%">
                  <el-table-column align="center" prop="appTypeName" :label="$t('new.no49')" >
                  </el-table-column>
                  <el-table-column align="center" :label="$t('channelData.no1')" width="180px">
                    <template slot-scope="scope">
                      <span v-if="parseInt(activeTab)===2">{{scope.row.strTime+'~'+scope.row.strTimeEnd}}</span>
                      <span v-else>{{scope.row.strTime}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="mediaSourceName" :label="$t('channelData.no2')">
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
                      <span v-if="scope.row.installRate!==null&&scope.row.installRate!==undefined&&scope.row.installRate!==''">{{$store.getters.twoPoint(scope.row.installRate)}}%</span>
                      <span v-else>{{$store.state.common.nullData}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="registerRate" :label="$t('channelData.no10')">
                    <template slot-scope="scope">
                      <span v-if="scope.row.registerRate!==null&&scope.row.registerRate!==undefined&&scope.row.registerRate!==''">{{$store.getters.twoPoint(scope.row.registerRate)}}%</span>
                      <span v-else>{{$store.state.common.nullData}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="loanRate" :label="$t('channelData.no11')">
                    <template slot-scope="scope">
                      <span v-if="scope.row.loanRate!==null&&scope.row.loanRate!==undefined&&scope.row.loanRate!==''">{{$store.getters.twoPoint(scope.row.loanRate)}}%</span>
                      <span v-else>{{$store.state.common.nullData}}</span>
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
    }
  },
  mounted () {
    this.fetchData()
  },
  watch: {
    weekTime (val) {
      let date = new Date(val).getTime()
      this.selectWeek = this.$store.getters.getYMD(date)
    }
  },
  methods: {
    fetchData () {
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
        if (res.data.header.code == 0) {
          self.list = res.data.data
          self.page.total = res.data.header.page.total
        } else {
          self.$message.error(res.data.header.msg)
        }
      })
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val
      this.fetchData()
    },
    search () {
      this.fetchData()
    },
    putExcel () {
      if (this.flag) {
        this.flag = false;
        const self = this
        self.condition = {
          mediaSource: this.filter.channelData?this.filter.channelData:'',
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
          ...self.condition
        }
        this.$axios.post('', option).then(res => {
          this.flag = true
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
  @mixin flex-cen {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .operatorManage {
    width: 100%;
    height: auto;
    padding: 20px 30px;
    background-color: rgba(246, 249, 252, 1);
    position: relative;
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
    .tabs {
      background: #fff;
      padding: 20px;
    }
    .search-input{
      padding: 20px;
    }
    .top-wrap {
      height: 90px;
      .checkbox-wrap  {
        padding:10px;
      }
    }
  }
</style>


