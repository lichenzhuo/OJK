<template>
  <div class="pages">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="prev, pager, next, ->"
      :total="pageTotal?pageTotal:'1'">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    pageTotal: [Number, String],
    pageNumber: [Function]
  },
  data () {
    return {
      currentPage: 1// 当前页下标

    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageNumber(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.pages{
    height: 50px;
    margin-top: 25px;
}
</style>
