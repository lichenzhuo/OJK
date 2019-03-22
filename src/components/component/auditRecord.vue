<template>
  <div v-if="orderId">
    <div class="table">
      <template>
        <el-table :data="tableData" stripe size="small">
          <el-table-column align="center" prop="name" :label="name" >
          </el-table-column>
          <el-table-column align="center" prop="createTime" :label="$t('yn.no31')" >
          </el-table-column>
          <el-table-column align="center" prop="duration" :label="$t('yn.no32')" >
          </el-table-column>
          <el-table-column align="center" prop="phone" :label="$t('yn.no33')" >
          </el-table-column>
          <el-table-column align="center" prop="operation" :label="$t('public.operation')" min-width="100">
            <template slot-scope="scope">
              <span class="table_opr" @click="openWindow(scope.row.facetimePhotoUrl)">{{$t('yn.no34')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <el-dialog :visible.sync="audioFlag" width="500px">
      <audio :src="src" ref="audio" width=300 height=45 type=audio/mpeg  controls volume="0" controlsList="nodownload" oncontextmenu="return false">
        Your browser does not support the audio element.
      </audio>
    </el-dialog>

    <!-- ------------  分页显示栏  ------------------------ -->
    <el-row type="flex" justify="end">
      <div class="pages">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, ->"
          :total="pageTotal?pageTotal:0"
          >
        </el-pagination>
      </div>
    </el-row>

  </div>

</template>
<script>
export default {
  props: [
    'type',
    'orderId',
  ],
  data () {
    return {
      currentPage: 1, // 分页当前页下标
      pageTotal: 0, // 分页总数
      id: '', // 当前行的ID
      audioFlag: false, // 当前行的ID
      tableData:[],
      src:''
    }
  },
  computed:{
    name(){
      if(this.type=='1'){
        return this.$t('staffManage.xinshenyuan');
      }
      if(this.type=='2'){
        return this.$t('operationDetail.no18');
      }
    }
  },
  methods: {
    openWindow (src) {
      this.audioFlag = true;
      this.src = src;
    },
    handleCurrentChange (val) { // 分页按钮点击操作
      this.currentPage = val
      this.getTableList();
    },
    getTableList () {
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.TELEPHONE0002,
          'page': {'index': this.currentPage, 'size': 10},
          'sessionid': this.sessionid
        },
        orderId: this.orderId,
        type: this.type
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.header.page.total;
        }else{
          this.tableData = [];
          this.$globalMsg.error(res.data.header.msg);
        }
      })
    },
  },
  watch:{
    audioFlag(){
      if(!this.audioFlag){
        this.$refs.audio.pause();
        this.$refs.audio.currentTime = 0;
      }
    },
    type(){
      if(this.type==1){
        this.getTableList();
      }
      if(this.type==2){
        this.getTableList();
      }
    }
  },
  mounted () {
    this.sessionid = sessionStorage.getItem('sessionid');
    this.$nextTick(() => {
      this.getTableList();
    })
    
  }
}
</script>
<style lang="scss" scoped>

.table {
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
}

</style>
