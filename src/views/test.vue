<template>
  <div class="main" >
    <h3>test</h3>
    <search-com 
    :searchData="searchData" 
    @search="search" 
    :searchRight="$store.state.common.permiss.includes('RIGHT_RECORD_WITHDRAW_QUERY')"
    :outputRight="true"
    ></search-com>
    <!-- -------------- 底部空白------------------------ -->
    <div class="foot"></div>
  </div>
</template>

<script>
import searchCom from 'src/components/public/search.vue'

export default {
  components: { searchCom },
  name: 'adminHome',
  data () {
    
    return {
      sessionid: '',
      searchData: [],
      formInLine:{
        orderId: '',
        phone: '',
        channel: '',
        beginTime: '',
        endTime: '',
      },
      currentPage:'1',
      pageNumber:'10',
    }
  },
  computed: {
    
  },
  methods: {
    updateSearchData() {
      this.searchData = [{
        type: 'input',
        label: this.$t('public.orderId'),
        attr: 'orderId',
        value: '',
        maxLength: "10",
      }, {
        type: 'input',
        label: this.$t('public.userTel'),
        attr: 'phone',
        value: '',
        maxLength: 10,
      }, {
        type: 'select',
        attr: 'channel',
        label: '渠道',
        option: [],
        value: '',
      }, {
        type: 'rangePicker',
        label: '订单创建时间',
        attr: 'applyDate',
        value: [],
      }];
      // 需要在拿到searchData后执行 初始化查询条件
    },
    search(filter) { // 搜索
      
      let option = this.$store.getters.getBaseHeader('333333',filter,{'index': this.currentPage, 'size': this.pageNumber})
      console.log(option)
    },


  },
  mounted () {
    this.updateSearchData();
  }
}
</script>
<style scoped lang="scss">

</style>
