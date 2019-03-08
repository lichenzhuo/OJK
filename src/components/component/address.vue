<template>
  <div class="component">
      <ul>
        <li v-for="(item,index) in tableData" :key="index">
          <el-radio-group v-model="activeData" class="radio1">
            <el-radio :label="item.name+','+item.relation+','+item.phone">
              <span class="cl555" :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99,fw600:item.isEffective===1,cl777:item.isEffective!==1}">{{item.name}}</span>
              <span class="cl555" :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99,fw600:item.isEffective===1,cl777:item.isEffective!==1}" style="margin:0 5px;" >{{item.phone}}</span>
              <span class="cl555" :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99,fw600:item.isEffective===1,cl777:item.isEffective!==1}">{{item.contactCnt?item.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
              <span class="cl555" :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99,fw600:item.isEffective===1,cl777:item.isEffective!==1}" style="margin:0 5px;" >{{item.keepTime?item.keepTime:0}}s</span>
              
            </el-radio>
          </el-radio-group>
        </li>
      </ul>
      

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
        <div class="pages">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next,  ->"
            :total="pageTotal?pageTotal:0"
            :page-size="30"
          >
          </el-pagination>
        </div>
    </el-row>
  </div>

</template>
<script>
export default {
  props: {
    orderNo: [String, Number],
    getAddress: Function
  },
  data () {
    return {
      sessionid: '', // 分页当前页下标
      currentPage: 1, // 分页当前页下标
      pageTotal: 0, // 分页总数
      tableData: [],
      activeData: ''
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val;
      this.tableList();
    },
    tableList () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.address_list,
          'page': {'index': this.currentPage, 'size': 30},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }
      })
    }
  },
  watch: {
    activeData () {
      this.getAddress(this.activeData);
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.tableList();
    // this.$emit('getAddressList', this.tableList);
  }
}
</script>
<style lang="scss" scoped>

.component{
  width: 100%;
  height: auto;
  ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    li{
      width: 33%;
      margin-bottom: 10px;
    }
  }
}

span.active1{
  color: rgb(238, 45, 55);
}

.el-radio span{
  user-select: text;
}


</style>
