<template>
  <div class="gezi">
      <ul>
        <li v-for="(item,index) in tableData" :key="index">
          <el-radio-group v-model="activeData" class="radio1">
            <el-radio :label="item.name+','+item.relation+','+item.phone">
              <span :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99}">{{item.name}}</span>
              <span :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99}" style="margin:0 20px;" >{{item.phone}}</span>
              <span :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99}">{{item.contactCnt?item.contactCnt:0}}{{$t('operationDetail.no15')}}</span>
              <span :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99}" style="margin:0 10px;" >{{item.keepTime?item.keepTime:0}}s </span>
              <span v-if="$store.state.common.lang==='PHL'" :class="{active1:item.relation!=9&&item.relation!=98&&item.relation!=99}">{{item.operator?item.operator:''}}</span>
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
      currentPage: 1, // 分页当前页下标
      sessionid: '', // 分页当前页下标
      pageTotal: 0, // 分页总数
      tableData: [],
      activeData: ''
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.address_list,
          'page': {'index': val, 'size': 30},
          'sessionid': this.sessionid
        },
        orderNo: this.orderNo
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
        }
      })
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
          this.tableData = res.data.data
          this.pageTotal = res.data.header.page.total
        }
      })
    }
  },
  watch: {
    activeData () {
      this.getAddress(this.activeData)
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.tableList()
  }
}
</script>
<style lang="scss" scoped>
@mixin flex-cen {
  display: flex;
  justify-content: center;
  align-items: center;
}
.gezi{
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

.table {
  width: 100%;
  min-height: 240px;
}
span.active1{
  color: rgb(238, 45, 55);
}
span.active2{
  color: #8FD78D;
}
span.active3{
  color: #3b56ee;
}


.reply{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  @include flex-cen;
  background-color: rgba(182, 189, 205, 0.6);
  .reply-main{
    width: 694px;
    height: auto;
    // margin-top: -450px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    .reply-main-head{
      width: 100%;
      height: 48px;
      background-color: #333A4D;
      line-height: 48px;
      position: relative;
      span {
        display: block;
        float: left;
        margin-top: 12px;
        margin-left: 16px;
        background-color: rgba(255, 255, 255, 1);
        width: 2px;
        height: 26px;
        border-radius: 5px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        margin-left: 30px;
      }
      .icon-color{
        display: block;
        color: #fff;
        font-size: 22px;
        position: absolute;
        right: 16px;
        top: 14px;
      }
    }
    .reply-main-con{
      width: 100%;
      height: auto;
      padding: 10px 30px;
      .chu-select{
        margin: 20px 20px;
        padding: 5px 0;
        display: flex;
        .chu-select-left{
          width: 15%;
          
        }
        .chu-select-right{
          width: 85%;
          .search_inpu{
            width: 100%;
            height: 150px;
            padding: 5px;
            font-size: 16px;
          }
        }
      }
      .reply-but{
        width: 220px;
        height: 38px;
        background-color: #547ef5;
        border-radius: 5px;
        margin: 0 auto;
        text-align: center;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
.el-radio span{
  user-select: text;
}


</style>
