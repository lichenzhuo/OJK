<template>
  <div class="main">

    <button @click="export2Excel"  size="small">导出EXCEL</button>
    
  </div>
</template>
<script>



export default {
  name: 'userManage',
  data () {
    return {
      fileList:[],
      tableData:[],
      fileReader:'',
      base64:''
    }
  },
  computed: {
    
  },
  methods: {
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../vender/export2Excel');
        const tHeader = ['序号', 'IMSI', 'MSISDN', '证件号码', '姓名'];
        const filterVal = ['age', 'appName', 'appPackage', 'cityId', 'haveNewCoupon','id','regTime'];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '列表excel');
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    userList () { // 获取用户列表
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.consumer_list,
          'page': {'index': this.currentPage, 'size': this.pageNumber},
          'sessionid': this.sessionid
        },
        ...this.formInline
      }
      this.$axios.post('', option).then(res => {
        this.flag = true;
        if (res.data.header.code == 0) {
          this.tableData = res.data.data
        }
      })
    },
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid')
    this.userList()
  }
}
</script>
<style scoped lang="scss">

$color1:red;  // 放款还款总量颜色
@mixin background($url) {
  background-image: url($url);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 10px;
  overflow: hidden;
}
@mixin title{
  .head-title {
    font-size: 18px;
    line-height: 40px;
  }
  .head-nub {
    font-size: 22px;
    word-break: break-all;
  }
}
@mixin flex-cen{
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  width: 100%;
  height: 100%;
  padding:20px 30px;
  background-color: rgba(246, 249, 252, 1);
}

// 分割样式
.paixu {
  width: 100%;
  height: 48px;
  line-height: 48px;
  // background: rgba(224, 229, 246, 1);
  border-radius: 4px;
  margin-bottom: 10px;
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

// 顶部日活跃量的样式
.bgc1{
  background-color: #205CFF;
}
.bgc2{
  background-color: #FF9959;
}
.bgc3{
  background-color: #FC7E7E;
}
.cl1{
  color: #205CFF;
}
.cl2{
  color: #FF9959;
}
.cl3{
  color: #FC7E7E;
}
.cl4{
  color: #4FC913;
}
.cl5{
  color: #000000;
}
.total{
  width: 100%;
  ul{
    width: 100%;
    height: 162px;
    margin-bottom: 16px;
    background-color: #fff;
    border-radius:4px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    // justify-content: space-between;
    li{
      width: 20%;
      p{
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p:nth-child(1){
        font-size: 16px;
        span{
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 18px;
        }
      }
      p:nth-child(2){
        margin-top: 20px;
        font-size: 30px;
      }
    }
    .line{
      width: 0px;
      height: 104px;
      border: 1px dashed #ddd;
    }
  }
}



.tongji{
  width: 100%;
  // height: 200px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 30px 34px;
  ul{
    width: 100%;
    li{
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      .box{
        display: flex;
        flex-wrap: wrap;
        padding-top: 30px;
        padding-bottom: 30px;
        p{
          width: 100%;
          text-align: center;
        }
        .mgt15{
          margin-top: 15px;
        }
      }
      .left{
        width: 40%;
      }
      .right{
        flex: auto;
      }
    }
    .line{
      width: 100%;
      height: 0px;
      border: 1px dashed #ddd;
    }
  }
  .tongji-1{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #444;
    font-size: 16px;
    flex-wrap: wrap;
    padding-left: 20px;
    span{
      font-size: 22px;
      color: $color1;
      font-weight: bold;
      padding: 0 10px;
      word-break: break-all;
    }
  }
}




</style>
