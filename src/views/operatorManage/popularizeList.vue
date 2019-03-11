<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('popularizeList.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('popularizeList.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('popularizeList.crumbsTwo')}}</p>
    </div>
     
  <!-- -------------搜索查询栏------------------------ -->
  <search-filter :filter="filter" @search="search" @output="putExcel" :searchRight="$store.state.common.permiss.includes('MENU_PROMOT_PLAN_QUERY')" :outputRight="$store.state.common.permiss.includes('RIGHT_PROMOT_PLAN_EXP')"></search-filter>
  
  <!-- ------------  添加活动  ------------------------ -->
    <div class="list_operation" v-if="$store.state.common.permiss.includes('RIGHT_PROMOT_PLAN_ADD')">
      <el-button type="primary" @click="edit()">
        +{{$t('popularizeList.edit')}}
      </el-button>
    </div>

  <!-- ------------  优惠券列表  ------------------------ -->
    <div class="table" v-if="$store.state.common.permiss.includes('MENU_PROMOT_PLAN_LIST')">
      <template>
        <el-table :data="list" size="small" stripe>
          <el-table-column align="center" prop="id" :label="$t('popularizeList.id')">
          </el-table-column>
          <el-table-column align="center" prop="position" :label="$t('filter.adType')">
            <template slot-scope="scope">
              <p>{{scope.row.position===1?$t('popularizeList.openScreenAd'):scope.row.position===2?$t('popularizeList.popupAd'):scope.row.position===3?$t('popularizeList.floatAd'):''}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="strPicUrl" :label="$t('popularizeList.pic')">
            <template slot-scope="scope">
              <img :src="scope.row.strPicUrl" alt="" width="180" height="180">
            </template>
          </el-table-column>
          <el-table-column align="center" prop="targetUrl" :label="$t('popularizeList.href')">
          </el-table-column>
          <el-table-column align="center" :label="$t('filter.popularizeTime')">
            <template slot-scope="scope">
              <p>{{scope.row.strBeginTime+'~'+scope.row.strEndTime}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" :label="$t('filter.status')">
          </el-table-column>
          <el-table-column 
            v-if="$store.state.common.permiss.includes('RIGHT_PROMOT_PLAN_EDIT')"
            :label="$t('public.operation')">
            <template slot-scope="scope">
              <el-button 
                @click.native.prevent="edit(scope.row.id)"
                type="text"
                size="small">
                {{$t('public.no51')}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  <!-- ------------  添加活动弹框  ------------------------ -->
    <el-dialog :title="$t('popularizeList.addModify')" :visible.sync="dialogFormVisible"  width="660px">
      <el-form :model="form">
        <el-form-item :label="$t('filter.adType')" :label-width="formLabelWidth">
          <el-select v-model="form.adType">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in adTypeList" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('popularizeList.putPic')" :label-width="formLabelWidth">
          <div class="imgList flex">
            <div class="flex flex-align-end">
              <a href="javascript:;" 
                 :style="'background-image: url('+form.imgBase64+');background-size: cover'" 
                 class="add-btn">
                 <div 
                    class="add-icon" 
                    :class="form.imgBase64?'':error?'red-border':'grey-bg'">
                    <span v-if="!form.imgBase64">+</span>
                    <input type="file" class="updata" @change="imgChange" accept=".gif,.jpg,.jpeg,.png,.mp4">
                 </div>
              </a>
              <span class="red">{{$t('public.imgLimit')}}</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('popularizeList.href')" :label-width="formLabelWidth" >
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.activityDateRange')" :label-width="formLabelWidth">
          <el-date-picker
            size="small"
            id="datapicker"
            v-model="form.dateRange"
            value-format="yyyy-MM-dd" 
            type="daterange" 
            range-separator="~" 
            :default-value="$store.state.common.preMonth"
            :start-placeholder="$t('public.beginTime')" 
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="save(form.id)">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>
    
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
</template>
<script>
import searchFilter from '../../components/component/filter'
import ImageFile from '../../utils/image-file'
export default {
  name: 'popularizeList',
  components: {searchFilter},
  data () {
    return {
      condition: {},
      dialogFormVisible: false,
      formLabelWidth: '90px',
      list: [],
      page: {
        current: 1,
        total: 0,
        size: 10
      },
      filter: {
        adType: '',
        adStatus: ''
      },
      form: {
        adType: '',
        imgType: '',
        imgBase64: '',
        href: '',
        dateRange: ''
      },
      error: '',
      flag: true,
      adTypeList: this.$store.state.options.adTypeOptions
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    fetchData (condition) {
      const self = this;
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.popularizeList,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        position: condition ? condition.adType : '',
        status: condition ? condition.adStatus : ''
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0) {
          let date = new Date();
          date = self.$store.getters.getYMD(date);
          res.data.data.forEach((item) => {
            if (date < item.strBeginTime) {
              item.status = '未开始';
            } else if (date === item.strBeginTime || (date > item.strBeginTime && (date < item.strEndTime || date === item.strEndTime))) {
              item.status = '进行中';
            } else if (date > item.strEndTime) {
              item.status = '已结束';
            }
          })
          self.list = res.data.data;
          self.page.total = res.data.header.page.total;
        } else {
          self.$message.error(res.data.header.msg);
        }
      })
    },
    edit (id) {
      const self = this;
      self.dialogFormVisible = true;
      if (id) {
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.popularizeDetail,
            sessionid: sessionStorage.getItem('sessionid')
          },
          bannerId: id
        }
        this.$axios.post('', option).then(res => {
          if (res.data.header.code == 0) {
            self.form.id = res.data.data.id,
            self.form.adType = res.data.data.position,
            self.form.imgType = res.data.data.sort,
            self.form.imgBase64 = res.data.data.strPicUrl,
            self.form.href = res.data.data.targetUrl,
            self.form.dateRange = [res.data.data.strBeginTime, res.data.data.strEndTime]
          } else {
            self.$message.error(res.data.header.msg)
          }
        })
      } else {
        self.form = {
          adType: '',
          imgType: '',
          imgBase64: '',
          href: '',
          dateRange: ''
        }
      }
    },
    save (id) {
      const self = this;
      let method = 'add';
      if (typeof (id) === 'number') {
        method = 'edit';
      } else {
        id = '';
      }
      let option = {
        header: {
          ...this.$base,
          action: this.$store.state.actionMap.addPularizePlane,
          sessionid: sessionStorage.getItem('sessionid'),
          page: {
            index: this.page.current,
            size: this.page.size
          }
        },
        method: method,
        url: self.form.href,
        position: self.form.adType,
        id: id || '',
        picType: self.form.imgType,
        pic: self.form.imgBase64.split(',')[1],
        beginTime: self.form.dateRange[0],
        endTime: self.form.dateRange[1]
      }
      this.$axios.post('', option).then(res => {
        if (res.data.header.code == 0 && res.data.data === 1) {
          self.dialogFormVisible = false;
          self.$message.success('操作成功！');
          self.fetchData()
        } else {
          self.$message.error(res.data.header.msg);
        }
      })
    },
    imgChange (e) {
      const self = this;
      // let e = window.event || arguments[0]
      let image = new ImageFile();
      image.compress({file: e.target.files[0]}).then(res => {
        const imgRes = res;
        if(imgRes.blob.size>(400*1024)){
          self.$message.error(this.$t('public.imgLimit'));
        }else{
          self.form.imgType = imgRes.blob.type;
          self.form.imgBase64 = imgRes.dataURL;
          
        }
      })
    },
    search (condition) {
      const self= this;
      self.page.current = 1;
      self.condition = condition;
      this.fetchData(self.condition);
    },
    putExcel (condition) {
      if (this.flag) {
        this.flag = false;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.popularize_list_excel,
            'page': {'index': this.page.current, 'size': 10},
            'sessionid': sessionStorage.getItem('sessionid')
          },
          position: condition ? condition.adType : '',
          status: condition ? condition.adStatus : ''
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
    },

    handleCurrentChange (val) { // 分页按钮点击操作
      this.page.current = val;
      this.fetchData(this.condition);
    }
  }
}
</script>
<style scoped lang="scss">
  .add-btn {
    width: 320px;
    display: block;
    text-decoration: none;
    margin: 14px 5px;
    height: 200px;
    .red-border{
      border: dashed 2px red;
    }
    .grey-bg {
      border: dashed 2px #c0c4cc;
      background:rgba(243,246,255,1);
    }
    .add-icon {
      width: 320px;
      height: 200px;
      border-radius: 5px;
      position: relative;
      text-align: center;
      span {
        line-height: 200px;
        font-size: 56px;
        color: #ccc;
      }
      input.updata
      {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        overflow: hidden;
      }
    } 
  }
  .red {
    color: red;
  }
</style>
