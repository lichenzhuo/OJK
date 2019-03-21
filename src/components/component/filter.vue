<template>
  <div class="search">
    <el-row type="flex" justify="start" :gutter="10">
      <el-col :md="6" :lg="6" :xl="4" v-if="filter.hasOwnProperty('orderId')">
        <div class="search-input">
          <span>{{$t('filter.orderId')}}:</span>
          <el-input size="small" label="orderId" v-model="filter.orderId"></el-input>
        </div>
      </el-col>
      <el-col :md="6" :lg="6" :xl="4" v-if="filter.hasOwnProperty('messageId')">
        <div class="search-input">
          <span>{{$t('operatorManage.no3')}}:</span>
          <el-input size="small" label="messageId" v-model="filter.messageId"></el-input>
        </div>
      </el-col>
      <el-col :md="6" :lg="6" :xl="4" v-if="filter.hasOwnProperty('userId')">
        <div class="search-input">
          <span>{{$t('filter.userId')}}:</span>
          <el-input size="small" label="userId" v-model="filter.userId"></el-input>
        </div>
      </el-col>
      <el-col :md="6" :lg="6" :xl="4" v-if="filter.hasOwnProperty('phone')">
        <div class="search-input">
          <span>{{$t('filter.phone')}}:</span>
          <el-input size="small" label="phone" v-model="filter.phone"></el-input>
        </div>
      </el-col>
      <el-col :md="6" :lg="6" :xl="4" v-if="filter.hasOwnProperty('couponId')">
        <div class="search-input">
          <span>{{$t('filter.couponId')}}:</span>
          <el-input size="small" label="couponId" v-model="filter.couponId"></el-input>
        </div>
      </el-col>
      <div class="search-input" v-if="filter.hasOwnProperty('couponType')">
        <span>{{$t('filter.couponItem')}}:</span>
        <el-select size="small" v-model="filter.couponType">
          <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in couponTypeOption" :key="i"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('sendType')">
        <span>{{$t('operatorManage.no18')}}:</span>
        <el-select size="small" v-model="filter.sendType">
          <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in sendTypeOption" :key="i"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('sendObj')">
        <span>{{$t('operatorManage.no4')}}:</span>
        <el-select size="small" v-model="filter.sendObj">
          <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in options1" :key="i"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('couponTarget')">
        <span>{{$t('filter.couponTarget')}}:</span>
        <el-select size="small" v-model="filter.couponTarget">
          <el-option v-for="item in couponTargetOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
        <!-- <el-input size="small" label="couponTarget" v-model="filter.couponTarget"></el-input> -->
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('activityStatus')">
        <span>{{$t('filter.status')}}:</span>
        <el-select size="small" v-model="filter.activityStatus">
          <el-option v-for="item in activityStatusOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('couponStatus')">
        <span>{{$t('filter.status')}}:</span>
        <el-select size="small" v-model="filter.couponStatus">
          <el-option v-for="item in couponStatusOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('adType')">
        <span>{{$t('filter.adType')}}:</span>
        <el-select size="small" v-model="filter.adType">
          <el-option v-for="item in adTypeOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('adStatus')">
        <span>{{$t('filter.status')}}:</span>
        <el-select size="small" v-model="filter.adStatus">
          <el-option v-for="item in adStatusOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('overdueStatus')">
        <span>{{$t('filter.status')}}:</span>
        <el-select size="small" v-model="filter.overdueStatus">
          <el-option v-for="item in overdueStatusOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('appType')">
        <span>{{$t('new.no49')}}:</span>
        <el-select size="small" clearable v-model="filter.appType" :placeholder="$t('public.placeholder')">
          <el-option v-for="item in appNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('appPackage')">
        <span>{{$t('new.no49')}}:</span>
        <el-select size="small" clearable v-model="filter.appPackage" :placeholder="$t('public.placeholder')">
          <el-option v-for="item in appPackageOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('otherCouponStatus')">
        <span>{{$t('filter.status')}}:</span>
        <el-select size="small" v-model="filter.otherCouponStatus">
          <el-option v-for="item in otherCouponStatusOption" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('dateRange')">
        <span>{{$t('filter.dateRange')}}:</span>
        <el-date-picker
          size="small"
          v-model="filter.dateRange"
          value-format="yyyy-MM-dd" 
          type="daterange" 
          range-separator="~" 
          :default-value="$store.state.common.preMonth"
          :start-placeholder="$t('public.beginTime')"
          :end-placeholder="$t('public.endTime')">
        </el-date-picker>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('getDate')">
        <span>{{$t('filter.getDate')}}:</span>
        <el-date-picker
          size="small"
          v-model="filter.getDate" 
          value-format="yyyy-MM-dd" 
          type="daterange" 
          range-separator="~" 
          :default-value="$store.state.common.preMonth"
          :start-placeholder="$t('public.beginTime')" 
          :end-placeholder="$t('public.endTime')">
        </el-date-picker>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('usedDate')">
        <span>{{$t('filter.usedDate')}}:</span>
        <el-date-picker
          size="small"
          v-model="filter.usedDate" 
          value-format="yyyy-MM-dd" 
          type="daterange" 
          range-separator="~" 
          :default-value="$store.state.common.preMonth"
          :start-placeholder="$t('public.beginTime')" 
          :end-placeholder="$t('public.endTime')">
        </el-date-picker>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('cashStatus')">
        <span>{{$t('filter.status')}}:</span>
        <el-select size="small" v-model="filter.cashStatus">
          <el-option v-for="item in cashStatusOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('cashTime')">
        <span>{{$t('filter.cashTime')}}:</span>
        <el-date-picker
          size="small"
          v-model="filter.cashTime" 
          value-format="yyyy-MM-dd" 
          type="daterange" 
          range-separator="~" 
          :default-value="$store.state.common.preMonth"
          :start-placeholder="$t('public.beginTime')" 
          :end-placeholder="$t('public.endTime')">
        </el-date-picker>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('sendTime')">
        <span>{{$t('operatorManage.no5')}}:</span>
        <el-date-picker
          size="small"
          v-model="filter.sendTime" 
          value-format="yyyy-MM-dd" 
          type="daterange" 
          range-separator="~" 
          :default-value="$store.state.common.preMonth"
          :start-placeholder="$t('public.beginTime')" 
          :end-placeholder="$t('public.endTime')">
        </el-date-picker>
      </div>
      <div class="search-input" v-if="filter.hasOwnProperty('channelData')">
        <span>{{$t('filter.channelData')}}:</span>
        <el-select v-model="filter.channelData" placeholder="请选择">
          <el-option
            v-for="item in channelDataOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <template>
        <div class="search-input" v-if="searchRight">
          <el-button type="primary" class="button-color" @click="select">{{$t('public.select')}}</el-button>
        </div>
      </template>
      <template>
        <div class="search-input" v-if="outputRight">
          <el-button type="primary" class="button-color" @click="putExcel">{{$t('public.excel')}}</el-button>
        </div>
      </template>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    filter: {
      type: Object,
      default: {}
    },
    searchRight: {
      type: Boolean,
      default: false
    },
    outputRight: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activityStatusOptions: this.$store.state.options.activityStatusOptions,
      couponTypeOption:  this.$store.state.options.couponType,
      couponStatusOptions: this.$store.state.options.couponStatusOptions,
      couponTargetOptions: this.$store.state.options.couponTargetOptions,
      adTypeOptions: this.$store.state.options.adTypeOptions,
      adStatusOptions: this.$store.state.options.adStatusOptions,
      overdueStatusOptions: this.$store.state.options.overdueStatusOptions,
      cashStatusOptions: this.$store.state.options.cashStatusOptions,
      sendTypeOption: this.$store.state.options.sendTypeOption,
      options1:this.$store.state.options.buildInSendType_options,
      channelDataOptions: [],
      appNameOptions: [],
      appPackageOptions: []
    }
  },
  mounted () {
    if(this.filter.hasOwnProperty('channelData')){
      this.fetchOption()
    }
    if(this.filter.hasOwnProperty('appType')||this.filter.hasOwnProperty('appPackage')){
      this.getAppName();
    }
  },
  methods: {
    fetchOption() {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.select_allData,
          sessionid: sessionStorage.getItem('sessionid')
        }
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.channelDataOptions = res.data.data['appsflyer.media.source']
          this.channelDataOptions.forEach(value => { // 用户选择第一个驳回原因的时候检测status2的值动态生成第二个驳回原因的值
            value.value = value.optionValue// 取optionValue值作为选择框的value值
            value.label = value.optionName// 取optionName值作为选择框的labe
          })
        }
      })
    },
    select () {
      this.$emit('search', this.filter)
    },
    putExcel () {
      this.$emit('output', this.filter)
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
          let arr = res.data.data.package;
          arr.forEach(value => {
            this.appNameOptions.push({value: value.remark, label: value.optionValue})
            this.appPackageOptions.push({value: value.optionValue, label: value.optionValue})
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">

</style>
