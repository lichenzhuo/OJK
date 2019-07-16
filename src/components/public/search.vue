<template>
  <div class="wrap">
    <div class="search">
			<el-row type="flex" justify="start" :gutter="10">
				<div v-for="(item, i) in searchDataReal" :key="i" >
					<div class="search-input" v-if="item.type === 'input'">
						<span >{{item.label}}：</span>
						<el-input size="small" :style="{width:item.width}" v-model="item.value" :maxlength='item.maxLength'/>
					</div>
					<div class="search-input" v-if="item.type === 'select'">
						<span >{{item.label}}：</span>
						<el-select v-model="item.value" size="small" v-if="item.langFlag">
							<el-option  v-for="(op, index) in item.option" :key="index" :label="$t(op.label)" :value="op.value"></el-option>
						</el-select>
						<el-select clearable v-model="item.value" size="small" v-else>
							<el-option  v-for="(op, index) in item.option" :key="index" :label="op.label" :value="op.value"></el-option>
						</el-select>
					</div>
					<div class="search-input" v-if="item.type === 'rangePicker'">
						<span >{{item.label}}：</span>
						<el-date-picker  
							size="small"
							v-model="item.value" 
							value-format="yyyy-MM-dd" 
							type="daterange" 
							range-separator="~" 
							:default-value="$store.state.common.preMonth" 
							:start-placeholder="$t('public.beginTime')" 
							:end-placeholder="$t('public.endTime')"/>
					</div>
					<div class="search-input" v-if="item.type === 'doubleInput'">
						<span :class="{highlight:item.value[0]!==''}">{{item.label}}：</span>
						<el-input style="width:50px;" v-model="item.value[0]" maxlength='4'/>
						~
						<el-input style="width:50px;" v-model="item.value[1]" maxlength='4'/>
					</div>
				</div>
				<!-- 按钮 -->
				<div class="search-input ml15" v-if="searchRight">
					<el-button type="primary" size="small" @click="search"><span>{{$t('public.select')}}</span></el-button>
				</div>
				<div class="search-input ml15" v-if="outputRight">
					<el-button type="primary" size="small" @click="putExcel"><span>{{$t('public.excel')}}</span></el-button>
				</div>
			</el-row>
      <!-- 遍历筛选项 -->
      
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
			searchDataReal: [],
			queryFlag: false,
			excelFlag: false,
      phoneValue: '',
    };
  },
  props: {
    searchData: {
      type: Array,
      default: [],
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
  watch: {
    filter(val, oldVal) {
      this.$emit('change', val, oldVal);
    },
    searchData(val) {
      this.$nextTick(() => {
        this.searchDataReal = val;
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.searchDataReal = this.searchData;
    });
  },
  computed: {
    filter() {
      const obj = {};
      this.searchDataReal.forEach((item) => {
        obj[item.attr] = item.value;
      });
      return obj;
    },
  },
  methods: {
    search() {
      this.$emit('search', this.filter);
    },
    putExcel() {
      this.$emit('putExcel', this.filter);
    },
  },
};
</script>
<style lang="scss" scoped>


</style>
