<template>
  <div class="public_main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{$t('otherCoupons.crumbsOne')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('otherCoupons.crumbsTwo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="paixu">
      <span></span>
      <p>{{$t('otherCoupons.crumbsTwo')}}</p>
    </div>

    <!-- ***************  搜索查询栏  *************** -->
    <search-filter :filter="filter" :searchRight="true" :outputRight="true" @search="search" @output="putExcel"></search-filter>

    <!-- ***************  发放优惠券  *************** -->
    <div class="list_operation">
      <el-button v-if="$store.state.common.permiss.includes('RIGHT_OTHER_COUPON_ISSUE')" type="primary" @click="sendCoupons()">
        +{{$t('otherCoupons.edit')}}
      </el-button>
      <el-button v-if="$store.state.common.permiss.includes('RIGHT_OTHER_COUPON_BATCH')" type="primary" @click="allSendCoupons()">
        +{{$t('operatorManage.no21')}}
      </el-button>
    </div>

    <!-- ***************  优惠券列表  *************** -->
    <div class="table">
      <template>
        <el-table :data="couponsList" size="small" stripe>
          <el-table-column align="center" prop="userId" :label="$t('couponUsed.no1')">
          </el-table-column>
          <el-table-column align="center" :label="$t('couponUsed.no3')">
            <template slot-scope="scope">
              <span v-if="scope.row.couponType === 1">{{$t('filter.couponType.no1')}}</span>
              <span v-if="scope.row.couponType === 2">{{$t('filter.couponType.no2')}}</span>
              <span v-if="scope.row.couponType === 3">{{$t('filter.couponType.no3')}}</span>
              <span v-if="scope.row.couponType === 4">{{$t('filter.couponType.no4')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('couponUsed.no4')">
            <template slot-scope="scope">
              <span v-if="parseInt(scope.row.couponType) === 1">{{scope.row.couponAmount+''+scope.row.unit}}</span>
              <span v-if="parseInt(scope.row.couponType) === 2">{{scope.row.couponDays+''+scope.row.unit}}</span>
              <span v-if="parseInt(scope.row.couponType) === 3">{{scope.row.couponAmount+''+scope.row.unit}}</span>
              <span v-if="parseInt(scope.row.couponType) === 4">{{scope.row.couponInterest+''+scope.row.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('couponUsed.no7')">
            <template slot-scope="scope">
              <p>{{scope.row.strEffectiveTimeBegin?(scope.row.strEffectiveTimeBegin+'~'+scope.row.strEffectiveTimeEnd): ''}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('otherCoupons.no1')">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">{{$t('filter.couponStatusOptions.no1')}}</span>
              <span v-if="scope.row.status === -1">{{$t('filter.couponStatusOptions.no2')}}</span>
              <span v-if="scope.row.status === -2">{{$t('filter.couponStatusOptions.no3')}}</span>
              <span v-if="scope.row.status === -3">{{$t('filter.couponStatusOptions.no4')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" :label="$t('otherCoupons.no2')">
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- ***************  添加活动弹框  *************** -->
    <el-dialog :title="$t('filter.addModifyOtherCoupon')" :visible.sync="dialogFormVisible" width="660px">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item :label="$t('public.userId')" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.userId"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.couponItem')" :label-width="formLabelWidth">
          <el-select v-model="form.couponType">
            <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in couponTypeOption" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('filter.couponType.no1')" prop="couponAmount" :label-width="formLabelWidth" v-if="parseInt(form.couponType) === 1 || form.couponType  === ''">
          <el-input type="number" v-model="form.couponAmount"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.couponType.no2')" prop="couponDays" :label-width="formLabelWidth" v-if="parseInt(form.couponType) === 2">
          <el-input type="number" v-model="form.couponDays"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.couponType.no3')" prop="couponAmount" :label-width="formLabelWidth" v-if="parseInt(form.couponType) === 3">
          <el-input type="number" v-model="form.couponAmount"></el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.couponType.no4')" prop="couponInterest" :label-width="formLabelWidth" v-if="parseInt(form.couponType) === 4">
          <el-input type="number" v-model="form.couponInterest"></el-input>
        </el-form-item>
        <el-form-item :label="$t('otherCoupons.no2')" prop="remark" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.remark">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('filter.validTime')" :label-width="formLabelWidth">
          <el-date-picker size="small" id="cteateTime" v-model="form.dateRange" value-format="yyyy-MM-dd" type="daterange" range-separator="~"
            :default-value="$store.state.common.preMonth" :picker-options="pickerOptions" :start-placeholder="$t('public.beginTime')"
            :end-placeholder="$t('public.endTime')">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="save">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>

    <!-- ------------  群发活动弹框  ------------------------ -->
    <el-dialog :title="$t('operatorManage.no21')" :visible.sync="dialogAllFormVisible" width="1200px">
      <div class="allsend">
        <ul>
          <li>
            <h4 class="mb10">{{$t('operatorManage.no17')}}</h4>
            <el-form :inline="true" :model="allForm1" size="small" ref="allForm1" label-width="120px">
              <el-form-item :label="$t('public.userSelfStatus')">
                <el-select v-model="allForm1.isBlack" :placeholder="$t('public.placeholder')">
                  <el-option v-for="(item,index) in option2" :key="index" :label="$t(item.label)" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('public.approveStatus')">
                <el-select v-model="allForm1.status" :placeholder="$t('public.placeholder')">
                  <el-option v-for="(item,index) in option3" :key="index" :label="$t(item.label)" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('public.orderStatus')">
                <el-select v-model="allForm1.lastOrderStatus" :placeholder="$t('public.placeholder')">
                  <el-option v-for="(item,index) in option4" :key="index" :label="$t(item.label)" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('operatorManage.no22')">
                <el-input type="text" style="width:100px;" v-model="allForm1.loanSuccessAmount"></el-input>
                ~
                <el-input type="text" style="width:100px;" v-model="allForm1.loanSuccessAmount"></el-input>
              </el-form-item>
              <el-form-item :label="$t('operatorManage.no15')">
                <el-input type="text" style="width:100px;" v-model="allForm1.overdueDays"></el-input>
                ~
                <el-input type="text" style="width:100px;" v-model="allForm1.overdueDays"></el-input>
              </el-form-item>
              <el-form-item :label="$t('public.no59')">
                <el-date-picker id="successtime" size="small" v-model="allForm1.overdueDay" type="daterange" range-separator="~" :default-value="$store.state.common.preMonth"
                  :start-placeholder="$t('public.beginTime')" :end-placeholder="$t('public.endTime')">
                </el-date-picker>
              </el-form-item>
              <el-form-item :label="$t('operatorManage.no23')">
                <el-upload class="upload-demo" :action="$axios.defaults.baseURL" :http-request="httpRequest" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  :before-upload="beforeUpload" :on-remove="removeHandler" :on-success="uploadSuccess" ref="upload">
                  <el-button size="small" type="primary">{{$t('operatorManage.no24')}}</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
          </li>
          <li>
            <h4 class="mb10">{{$t('couponSetting.crumbsTwo')}}</h4>
            <el-form :model="allForm2" :rules="rules" ref="allForm2" size="small">
              <el-form-item :label="$t('filter.couponItem')" prop="couponType" :label-width="formLabelWidth">
                <el-select v-model="allForm2.couponType">
                  <el-option :label="$t(item.label)" :value="item.value" v-for="(item, i) in couponTypeOption" :key="i"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('filter.couponType.no1')" prop="couponAmount" :label-width="formLabelWidth" v-if="parseInt(allForm2.couponType) === 1 || allForm2.couponType  === ''">
                <el-input type="number" v-model="allForm2.couponAmount"></el-input>
              </el-form-item>
              <el-form-item :label="$t('filter.couponType.no2')" prop="couponDays" :label-width="formLabelWidth" v-if="parseInt(allForm2.couponType) === 2">
                <el-input type="number" v-model="allForm2.couponDays"></el-input>
              </el-form-item>
              <el-form-item :label="$t('filter.couponType.no3')" prop="couponAmount" :label-width="formLabelWidth" v-if="parseInt(allForm2.couponType) === 3">
                <el-input type="number" v-model="allForm2.couponAmount"></el-input>
              </el-form-item>
              <el-form-item :label="$t('filter.couponType.no4')" prop="couponInterest" :label-width="formLabelWidth" v-if="parseInt(allForm2.couponType) === 4">
                <el-input type="number" v-model="allForm2.couponInterest"></el-input>
              </el-form-item>
              <el-form-item :label="$t('otherCoupons.no2')" prop="remark" :label-width="formLabelWidth">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="allForm2.remark">
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('filter.validTime')" prop="dateRange" :label-width="formLabelWidth">
                <el-date-picker size="small" id="cteateTime" v-model="allForm2.dateRange" value-format="yyyy-MM-dd" type="daterange" range-separator="~"
                  :default-value="$store.state.common.preMonth" :picker-options="pickerOptions" :start-placeholder="$t('public.beginTime')"
                  :end-placeholder="$t('public.endTime')">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAllFormVisible = false">{{$t('public.no50')}}</el-button>
        <el-button type="primary" @click="allsave">{{$t('public.no49')}}</el-button>
      </div>
    </el-dialog>

    <!-- *****************  分页   ***************** -->
    <el-row type="flex" justify="end">
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page="page.current" layout="total, prev, pager, next, ->" :total="page.total?page.total:0">
        </el-pagination>
      </div>
    </el-row>

  </div>
</template>
<script>

  import searchFilter from "../../components/component/filter";
  export default {
    name: "otherCoupons",
    components: {
      searchFilter
    },
    data() {
      var validateNum = (rule, value, callback) => {
        if (!value || !/^[1-9]\d*$/.test(value)) {
          callback(new Error(this.$t("login.num")));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        dialogAllFormVisible: false,
        formLabelWidth: "90px",
        couponsList: [],
        searchTime: [],
        page: {
          current: 1,
          size: 10,
          total: 0
        },
        filter: {
          userId: "",
          couponType: "",
          couponStatus: "",
          dateRange: ""
        },
        form: {
          userId: "",
          couponType: "",
          couponAmount: "",
          couponDays: "",
          couponInterest: "",
          remark: "",
          dateRange: ""
        },
        allForm2: {
          couponType: "",
          couponAmount: "",
          couponDays: "",
          couponInterest: "",
          remark: "",
          dateRange: ""
        },
        rules: {
          couponAmount: [{
            validator: validateNum,
            trigger: "change"
          }],
          couponDays: [{
            validator: validateNum,
            trigger: "change"
          }],
          couponInterest: [{
            validator: validateNum,
            trigger: "change"
          }],
          couponType: [{
            required: true,
            message: this.$t("login.required"),
            trigger: "change"
          }],
          remark: [{
            required: true,
            message: this.$t("login.required"),
            trigger: "change"
          }],
          dateRange: [{
            required: true,
            message: this.$t("login.required"),
            trigger: "change"
          }]
        },
        allForm1: {
          isBlack: "",
          status: "",
          lastOrderStatus: "",
          loanSuccessAmount: "",
          overdueDays: ""
        },
        option2: this.$store.state.options.operatorManage_blackStatus,
        option3: this.$store.state.options.operatorManage_approveStatus,
        option4: this.$store.state.options.operatorManage_orderStatus,
        couponTypeOption: this.$store.state.options.couponType,
        flag: true,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        fileReader: "", // 图片上传new FileReader()的实例化
        fileList: [], // 资料补充图片
        fileType: "", // 资料补充图片
        base64Str: "" // 资料补充图片
      };
    },
    mounted() {
      this.fetchData();
      this.fileReader = new FileReader();
    },
    methods: {
      fetchData(condition) {
        const self = this;
        let option = {
          header: {
            ...this.$base,
            action: this.$store.state.actionMap.couponUsed,
            sessionid: sessionStorage.getItem("sessionid"),
            page: {
              index: this.page.current,
              size: this.page.size
            }
          },
          type: 2,
          userId: condition ? condition.userId : "",
          couponType: condition ? condition.couponType : "",
          status: condition ? condition.couponStatus : "",
          effectiveTimeBegin: condition ?
            condition.dateRange ? condition.dateRange[0] : "" :
            "",
          effectiveTimeEnd: condition ?
            condition.dateRange ? condition.dateRange[1] : "" :
            ""
        };
        this.$axios.post("", option).then(res => {
          if (res.data.header.code == 0) {
            self.couponsList = res.data.data;
            self.page.total = res.data.header.page.total;
          } else {
            self.$message.error(res.data.header.msg);
          }
        });
      },
      search(condition) {
        const self = this;
        self.page.current = 1;
        self.condition = condition;
        this.fetchData(self.condition);
      },
      putExcel(condition) {
        if (this.flag) {
          this.flag = false;
          let option = {
            header: {
              ...this.$base,
              action: this.$store.state.actionMap.otherCoupon_list_excel,
              page: {
                index: this.page.current,
                size: this.page.size
              },
              sessionid: sessionStorage.getItem("sessionid")
            },
            type: 2,
            userId: condition ? condition.userId : "",
            couponType: condition ? condition.couponType : "",
            status: condition ? condition.couponStatus : "",
            effectiveTimeBegin: condition ?
              condition.dateRange ? condition.dateRange[0] : "" :
              "",
            effectiveTimeEnd: condition ?
              condition.dateRange ? condition.dateRange[1] : "" :
              ""
          };
          this.$axios.post("", option).then(res => {
            this.flag = true;
            if (res.data.header.code == 0) {
              let title = res.data.data.titles;
              let fields = res.data.data.fields;
              let data = res.data.data.data;
              this.$export2Excel(title, fields, data);
            }
          });
        }
      },
      handleCurrentChange(val) {// 分页按钮点击操作
        this.page.current = val;
        this.fetchData(this.condition);
      },
      sendCoupons() {
        const self = this;
        self.dialogFormVisible = true;
        self.form = {
          userId: "",
          couponType: "",
          couponAmount: "",
          couponDays: "",
          couponInterest: "",
          remark: "",
          dateRange: ""
        };
      },
      save() {
        const self = this;
        self.$refs.ruleForm.validate(valid => {
          if (valid) {
            let option = {
              header: {
                ...this.$base,
                action: this.$store.state.actionMap.sendOtherCoupon,
                sessionid: sessionStorage.getItem("sessionid")
              },
              type: 2,
              userId: self.form.userId,
              remark: self.form.remark,
              couponType: self.form.couponType,
              couponAmount: self.form.couponType === 1 || self.form.couponType === 3 ?
                self.form.couponAmount :
                "",
              couponDays: self.form.couponType === 2 ? self.form.couponDays : "",
              couponInterest: self.form.couponType === 4 ? self.form.couponInterest : "",
              effectiveTimeBegin: self.form.dateRange ?
                self.form.dateRange[0] :
                "",
              effectiveTimeEnd: self.form.dateRange ? self.form.dateRange[1] : ""
            };
            this.$axios.post("", option).then(res => {
              if (res.data.header.code == 0) {
                self.$message.success(self.$t("message.success"));
                this.fetchData();
              } else {
                self.$message.error(res.data.header.msg);
              }
            });
            self.dialogFormVisible = false;
          } else {
            return false;
          }
        });
      },
      allSendCoupons() {
        this.dialogAllFormVisible = true;
        self.allForm1 = {
          isBlack: "",
          status: "",
          lastOrderStatus: "",
          loanSuccessAmount: "",
          overdueDays: ""
        };
      },
      allsave() {
        const self = this;
        self.$refs.allForm2.validate(valid => {
          if (valid) {
            if (
              this.allForm1.isBlack === "" &&
              this.allForm1.status === "" &&
              this.allForm1.lastOrderStatus === "" &&
              this.allForm1.loanSuccessAmount === "" &&
              this.allForm1.overdueDays === "" &&
              this.base64Str === ""
            ) {
              self.$message.error(self.$t("operationDetail.no20"));
              return;
            }
            let option = {
              header: {
                ...this.$base,
                action: this.$store.state.actionMap.OCOUPON0002,
                sessionid: sessionStorage.getItem("sessionid")
              },
              type: 2,
              remark: self.allForm2.remark,
              couponType: self.allForm2.couponType,
              couponAmount: self.allForm2.couponType === 1 || self.allForm2.couponType === 3 ?
                self.allForm2.couponAmount :
                "",
              couponDays: self.allForm2.couponType === 2 ? self.allForm2.couponDays : "",
              couponInterest: self.allForm2.couponType === 4 ?
                self.allForm2.couponInterest :
                "",
              effectiveTimeBegin: self.allForm2.dateRange ?
                self.allForm2.dateRange[0] :
                "",
              effectiveTimeEnd: self.allForm2.dateRange ?
                self.allForm2.dateRange[1] :
                "",
              ...this.allForm1,
              fileType: this.fileType,
              fileBase64: this.base64Str
            };
            this.$axios.post("", option).then(res => {
              if (res.data.header.code == 0) {
                if (res.data.data > 0) {
                  self.$message.success(self.$t("message.success"));
                  this.fetchData();
                } else {
                  self.$message.error(self.$t("message.warning"));
                }
                this.fileList = [];
                this.allForm2 = {};
                this.dialogAllFormVisible = false;
              } else {
                self.$message.error(res.data.header.msg);
              }
            });
          } else {
            return false;
          }
        });
      },
      httpRequest(options) {
        let file = options.file;
        let filename = file.name;
        this.fileType = filename.slice(filename.lastIndexOf(".") + 1);
        if (file) {
          this.fileReader.readAsDataURL(file);
        }
        this.fileReader.onload = () => {
          this.base64Str = this.fileReader.result.split(",")[1];
          options.onSuccess("123", file);
        };
      },
      removeHandler(file) {
        this.fileList = this.fileList.filter(value => {
          return file.uid !== value.uid;
        });
      },
      beforeUpload() {
        if (this.fileList.length >= 1) {
          this.$globalMsg.error("At most 1 files");
          return false;
        }
        // if (!isLt5M) {
        //   alert('The max size is 5MB')
        //   return false
        // }
      },
      uploadSuccess(res, file) {
        let data = res;
        this.fileList.push({
          data,
          uid: file.uid
        });
      }
    },
    watch: {
      searchTime() {
        if (this.searchTime) {
          this.formInline.createTimeBegin = this.$store.getters.yyyy_m_d(
            this.searchTime[0]
          );
          this.formInline.createTimeEnd = this.$store.getters.yyyy_m_d(
            this.searchTime[1]
          );
        } else {
          this.formInline.createTimeBegin = "";
          this.formInline.createTimeEnd = "";
        }
      },
      dialogAllFormVisible() {
        if (!this.dialogAllFormVisible) {
          this.fileList.length = 0;
          this.$refs.upload.clearFiles();
        }
      }
    }
  };
</script>
<style scoped lang="scss">
  .allsend {
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      li {
        width: 49%;
      }
    }
  }

  .mb10 {
    margin-bottom: 10px;
  }
</style>