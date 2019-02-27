<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" background-color="rgba(51,58,77,1)" class="el-menu-vertical-demo"  router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ $t(item.title) }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ $t(subItem.title) }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>{{ $t(item.title) }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          items: []
        }
      },
      computed: {
        onRoutes () {
          return this.$route.path.replace('/', '')
        }
      },
      methods: {
        sidebar () {
          let list = JSON.parse(sessionStorage.getItem('list'))
          let item = []
          list.forEach(value => {
            if(value){
                      // 工作台
              if (value.uniqueSign == 'MENU_WORKS') {
                item.push({icon: 'el-icon-shop-shouye', index: 'adminhome', title: 'sidebar.adminHome'})
              }

                      // 用户管理
              if (value.uniqueSign == 'MENU_USER') {
                item.push({icon: 'el-icon-shop-user',
                  index: '3',
                  title: 'sidebar.userManage',
                  subs: [
                  ]
                })
              }
              if (value.uniqueSign == 'MENU_USER_LIST') {
                item.filter(index => {
                  return index.index == '3'
                })[0].subs.push({index: 'userlist', title: 'sidebar.userList'})
              }
              
              if (value.uniqueSign == 'MENU_USER_FEEDBACK') {
                item.filter(index => {
                  return index.index == '3'
                })[0].subs.push({index: 'usersug', title: 'sidebar.userSuggest'})
              }
                      // 借款管理
              if (value.uniqueSign == 'MENU_LOAN') {
                item.push({icon: 'el-icon-shop-chanpin2',
                  index: '4',
                  title: 'sidebar.loanManage',
                  subs: [
                  ]
                })
              }
              if (value.uniqueSign == 'MENU_LOAN_LIST') {
                item.filter(index => {
                  return index.index == '4'
                })[0].subs.push({index: 'loanmoney', title: 'sidebar.loanMoneyList'})
              }
              if (value.uniqueSign == 'MENU_LOAN_LENDING') {
                item.filter(index => {
                  return index.index == '4'
                })[0].subs.push({index: 'putmoney', title: 'sidebar.putMoneyList'})
              }
              if (value.uniqueSign == 'MENU_LOAN_REPAY') {
                item.filter(index => {
                  return index.index == '4'
                })[0].subs.push({index: 'backmoney', title: 'sidebar.backMoneyList'})
              }
              if (value.uniqueSign == 'MENU_LOAN_REPAY_PROCESSED') {
                item.filter(index => {
                  return index.index == '4'
                })[0].subs.push({index: 'backmoneyawait', title: 'yn.no13'})
              }
              if (value.uniqueSign == 'MENU_LOAN_LENDING_PROCESSED') {
                item.filter(index => {
                  return index.index == '4'
                })[0].subs.push({index: 'putmoneyawait', title: 'yn.no14'})
              }

                      // 风控审核管理
              if (value.uniqueSign == 'MENU_RISKCONTROL') {
                item.push({icon: 'el-icon-shop-zhengxin',
                  index: '5',
                  title: 'sidebar.riskManage',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_RISKCONTROL_FIRST') {
                item.filter(index => {
                  return index.index == '5'
                })[0].subs.push({index: 'peopleFirstAudit', title: 'sidebar.labourAuditListOne'})
              }
              if (value.uniqueSign == 'MENU_RISKCONTROL_REVIEW') {
                item.filter(index => {
                  return index.index == '5'
                })[0].subs.push({index: 'peopleSecondAudit', title: 'sidebar.labourAuditListTwo'})
              }
              if (value.uniqueSign == 'MENU_RISKCONTROL_RPT') {
                item.filter(index => {
                  return index.index == '5'
                })[0].subs.push({index: 'peopleFirstAuditTotal', title: 'sidebar.labourAuditTotalOne'})
              }
              if (value.uniqueSign == 'MENU_RISKCONTROL_RPT_REVIEW') {
                item.filter(index => {
                  return index.index == '5'
                })[0].subs.push({index: 'peopleSecondAuditTotal', title: 'sidebar.labourAuditTotalTwo'})
              }

                      // 我的审核订单
              if (value.uniqueSign == 'MENU_ME') {
                item.push({icon: 'el-icon-shop-wenjian',
                  index: '2',
                  title: 'sidebar.myAuditOrder',
                  subs: [
                  ]
                })
              }
              if (value.uniqueSign == 'MENU_ME_FIRST') {
                item.filter(index => {
                  return index.index == '2'
                })[0].subs.push({index: 'myFirstAuditList', title: 'sidebar.myLabourAuditOne'})
              }
              if (value.uniqueSign == 'MENU_ME_REVIEW') {
                item.filter(index => {
                  return index.index == '2'
                })[0].subs.push({index: 'mySecondtAuditList', title: 'sidebar.myLabourAuditTwo'})
              }

                      // 财务数据
              if (value.uniqueSign == 'MENU_ACCOUNT') {
                item.push({icon: 'el-icon-shop-chanpin3fankui',
                  index: '1',
                  title: 'sidebar.financialData',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_ACCOUNT_LENDING') {
                item.filter(index => {
                  return index.index == '1'
                })[0].subs.push({index: 'putloglist', title: 'sidebar.putMoneyLog'})
              }
              if (value.uniqueSign == 'MENU_ACCOUNT_REPAY') {
                item.filter(index => {
                  return index.index == '1'
                })[0].subs.push({index: 'backloglist', title: 'sidebar.backMoneyLog'})
              }

              //    财务报表
              if (value.uniqueSign == 'MENU_ACCOUNT_REPORT') {
                item.filter(index => {
                  return index.index == '1'
                })[0].subs.push({index: 'financetable', title: 'finance.crumbsFour'})
              }

              // 产品管理
              if (value.uniqueSign == 'MENU_PRODUCT') {
                item.push({icon: 'el-icon-shop-shujutongji',
                  index: '6',
                  title: 'sidebar.productManage',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_PRODUCT_LIST') {
                item.filter(index => {
                  return index.index == '6'
                })[0].subs.push({index: 'promanage', title: 'sidebar.productList'})
              }
              if (value.uniqueSign == 'MENU_PRODUCT_PROBLEM') {
                item.filter(index => {
                  return index.index == '6'
                })[0].subs.push({index: 'faq', title: 'proManage.crumbsThree'})
              }
              if (value.uniqueSign == 'MENU_PRODUCT_APP_PACKAGE_MANAGE') {
                item.filter(index => {
                  return index.index == '6'
                })[0].subs.push({index: 'apppackagemag', title: 'proManage.crumbsFour'})
              }

              // 运营管理
              if (value.uniqueSign == 'MENU_OPERATE') {
                item.push({icon: 'el-icon-tickets',
                  index: '14',
                  title: 'sidebar.operator',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_OPERATE_COUPON') {
                item.filter(index => {
                  return index.index == '14'
                })[0].subs.push({index: 'couponSetting', title: 'couponSetting.crumbsTwo'})
              }
              if (value.uniqueSign == 'MENU_OPERATE_ACTIVITY') {
                item.filter(index => {
                  return index.index == '14'
                })[0].subs.push({index: 'activity', title: 'activity.crumbsTwo'})
              }
              if (value.uniqueSign == 'MENU_OPERATE_COUPON_USE') {
                item.filter(index => {
                  return index.index == '14'
                })[0].subs.push({index: 'couponUsed', title: 'couponUsed.crumbsTwo'})
              }
              if (value.uniqueSign == 'MENU_OTHER_COUPON') {
                item.filter(index => {
                  return index.index == '14'
                })[0].subs.push({index: 'otherCoupons', title: 'otherCoupons.crumbsTwo'})
              }
              if (value.uniqueSign == 'MENU_PROMOT_PLAN') {
                item.filter(index => {
                  return index.index == '14'
                })[0].subs.push({index: 'popularizeList', title: 'popularizeList.crumbsTwo'})
              }
              // MENU_MESSAGE_PUSH_HAND
              if (value.uniqueSign == 'MENU_PROMOT_PLAN') {
                item.filter(index => {
                  return index.index == '14'
                })[0].subs.push({index: 'buildinnoteput', title: 'operatorManage.no2'})
              }
              // MENU_MESSAGE_PUSH_AUTO
              if (value.uniqueSign == 'MENU_PROMOT_PLAN') {
                item.filter(index => {
                  return index.index == '14'
                })[0].subs.push({index: 'manualnoteput', title: 'operatorManage.no1'})
              }

              // 运营数据
              if (value.uniqueSign == 'MENU_RECORD') {
                item.push({icon: 'el-icon-shop-shujutongji',
                  index: '12',
                  title: 'sidebar.operatorData',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_RECORD_INVITE') {
                item.filter(index => {
                  return index.index == '12'
                })[0].subs.push({index: 'inviteFriend', title: 'inviteFriend.crumbsTwo'})
              }
              if (value.uniqueSign == 'MENU_RECORD_WITHDRAW') {
                item.filter(index => {
                  return index.index == '12'
                })[0].subs.push({index: 'cash', title: 'cash.crumbsTwo'})
              }
              if (value.uniqueSign == 'MENU_CHANNEL_DATA') {
                item.filter(index => {
                  return index.index == '12'
                })[0].subs.push({index: 'channelData', title: 'channelData.crumbsTwo'})
              }
      
              // 贷后运营
              if (value.uniqueSign == 'MENU_LOANS_OPERATES') {
                item.push({icon: 'el-icon-star-on',
                  index: '11',
                  title: 'sidebar.loanAfterOperates',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_LOANS_OPERATES_SMS') {
                item.filter(index => {
                  return index.index == '11'
                })[0].subs.push({index: 'collectionSMS', title: 'sidebar.noteTemplate'})
              }
              if (value.uniqueSign == 'MENU_LOANS_OPERATES_RPT') {
                item.filter(index => {
                  return index.index == '11'
                })[0].subs.push({index: 'collectionReport', title: 'sidebar.comeTable'})
              }

              // 贷后管理 
              if (value.uniqueSign == 'MENU_LOANLAST') {
                item.push({icon: 'el-icon-view',
                  index: '10',
                  title: 'sidebar.loanAfterManage',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_LOANLAST_INCOME') {
                item.filter(index => {
                  return index.index == '10'
                })[0].subs.push({index: 'inTheRushOrders', title: 'sidebar.comeOrderList'})
              }
              if (value.uniqueSign == 'MENU_DISTRIBUTION_STATISTICS_DAY') {
                item.filter(index => {
                  return index.index == '10'
                })[0].subs.push({index: 'everyDaySendOrdersTotal', title: 'sidebar.todayOperatesTotal'})
              }
              if (value.uniqueSign == 'MENU_COLLECTION_STATISTICS_DAY') {
                item.filter(index => {
                  return index.index == '10'
                })[0].subs.push({index: 'everyDayPushBackTotal', title: 'sidebar.todaycuihuiTotal'})
              }
              if (value.uniqueSign == 'MENU_COLLECTOR_STATISTICS') {
                item.filter(index => {
                  return index.index == '10'
                })[0].subs.push({index: 'debtCollectorTotal', title: 'sidebar.adminTotal'})
              }
              if (value.uniqueSign == 'MENU_OUTSOURCING_RESOURCE_POOL') {
                item.filter(index => {
                  return index.index == '10'
                })[0].subs.push({index: 'outsourcedresourcepool', title: 'loanAfterManage.no1'})
              }

              // @@@@@@@@     审核管理     @@@@@@@@@
              if (value.uniqueSign == 'MENU_AUDIT_MANAGEMENT') {
                item.push({icon: 'el-icon-printer',
                  index: '16',
                  title: 'auditManage.no1',
                  subs: []
                })
              }
              // 逾期优惠券申请
              if (value.uniqueSign == 'MENU_OVERDUE_COUPON') {
                item.filter(index => {
                  return index.index == '16'
                })[0].subs.push({index: 'overdueCouponApply', title: 'loanAfterManage.crumbsSeven'})
              }
              // 部分还款申请
              if (value.uniqueSign == 'MENU_PARTIAL_REPAYMENT_APPLICATION') {
                item.filter(index => {
                  return index.index == '16'
                })[0].subs.push({index: 'partialRepaymentApply', title: 'loanAfterManage.crumbsEight'})
              }
              // 生成还款码
              if (value.uniqueSign == 'MENU_REPAYMENT_CODE') {
                item.filter(index => {
                  return index.index == '16'
                })[0].subs.push({index: 'paymentcode', title: 'loanAfterManage.crumbssix'})
              }

                      // 催收管理
              if (value.uniqueSign == 'MENU_COLLECT') {
                item.push({
                  icon: 'el-icon-star-on',
                  index: '8',
                  title: 'sidebar.comeReceiveManage',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_COLLECT_ME') {
                item.filter(index => {
                  return index.index == '8'
                })[0].subs.push({index: 'myCollectionOrderList', title: 'sidebar.myComeOrder'})
              }
              if (value.uniqueSign == 'MENU_COLLECT_ME_WORK_ANALYSIS') {
                item.filter(index => {
                  return index.index == '8'
                })[0].subs.push({index: 'workanalysis', title: 'operationList.crumbsFour'})
              }
              
              // 委外管理
              if (value.uniqueSign == 'MENU_OUTSOURCING_MANAGEMENT') {
                item.push({
                  icon: 'el-icon-news',
                  index: '15',
                  title: 'OutsourcedManage.no1',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_OUTSOURCING_MANAGEMENT_LIST') {// 委外订单列表
                item.filter(index => {
                  return index.index == '15'
                })[0].subs.push({index: 'outsourcedorderlist', title: 'OutsourcedManage.no2'})
              }
              if (value.uniqueSign == 'MENU_ENTRUST_DAILY_REPORT') {// 每日委外统计
                item.filter(index => {
                  return index.index == '15'
                })[0].subs.push({index: 'everydayoutsourcedtotal', title: 'OutsourcedManage.no3'})
              }
              

                      // 客服管理
              if (value.uniqueSign == 'MENU_CUSTOMER_SERVICE') {
                item.push({icon: 'el-icon-news',
                  index: '13',
                  title: 'serviceManage.crumbsOne',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_CUSTOMER_SERVICE_REFUND') {
                item.filter(index => {
                  return index.index == '13'
                })[0].subs.push({index: 'nobackorderlist', title: 'serviceManage.crumbsTwo'})
              }
              if (value.uniqueSign == 'MENU_CUSTOMER_SERVICE_REMIND') {
                item.filter(index => {
                  return index.index == '13'
                })[0].subs.push({index: 'myovedateremind', title: 'serviceManage.crumbsThree'})
              }
              if (value.uniqueSign == 'MENU_CUSTOMER_SERVICE_VISIT') {
                item.filter(index => {
                  return index.index == '13'
                })[0].subs.push({index: 'telcomelist', title: 'serviceManage.crumbsFour'})
              }
              if (value.uniqueSign == 'MENU_CUSTOMER_SERVICE_STATISTICS') {
                item.filter(index => {
                  return index.index == '13'
                })[0].subs.push({index: 'myovedateremindtotal', title: 'serviceManage.crumbsFive'})
              }
                      // 统计管理
              if (value.uniqueSign == 'MENU_REPORT') {
                item.push({
                  icon: 'el-icon-menu',
                  index: '9',
                  title: 'sidebar.statisticsManage',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_REPORT_PASS') {
                item.filter(index => {
                  return index.index == '9'
                })[0].subs.push({index: 'passingRate', title: 'sidebar.passRateList'})
              }
              if (value.uniqueSign == 'MENU_REPORT_INCOME') {
                item.filter(index => {
                  return index.index == '9'
                })[0].subs.push({index: 'overdueRate', title: 'sidebar.firstRateList'})
              }
              if (value.uniqueSign == 'MENU_REPORT_REPAY') {
                item.filter(index => {
                  return index.index == '9'
                })[0].subs.push({index: 'rateOfReturn', title: 'sidebar.backMoneyRateList'})
              }
                      // 系统管理
              if (value.uniqueSign == 'MENU_SYSTEM') {
                item.push({icon: 'el-icon-shop-shezhi',
                  index: '7',
                  title: 'sidebar.system',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_SYSTEIM_USER') {
                item.filter(index => {
                  return index.index == '7'
                })[0].subs.push({index: 'idmanagement', title: 'sidebar.accountManage'})
              }
              if (value.uniqueSign == 'MENU_SYSTEM_RIGHT') {
                item.filter(index => {
                  return index.index == '7'
                })[0].subs.push({index: 'permission', title: 'sidebar.permission'})
              }
              if (value.uniqueSign == 'MENU_SYSTEM_CUSTSERVICE') {
                item.filter(index => {
                  return index.index == '7'
                })[0].subs.push({index: 'servicePeopleList', title: 'staffManage.crumbssix'})
              }
              if (value.uniqueSign == 'MENU_SYSTEM_CUSTSERVICE_GROUP') {
                item.filter(index => {
                  return index.index == '7'
                })[0].subs.push({index: 'serviceGroup', title: 'staffManage.service'})
              }
              if (value.uniqueSign == 'MENU_SYSTEM_APPROVE') {
                item.filter(index => {
                  return index.index == '7'
                })[0].subs.push({index: 'creditAuditPeopleList', title: 'staffManage.crumbsTwo'})
              }
              if (value.uniqueSign == 'MENU_SYSTEM_APPROVE_GROUP') {
                item.filter(index => {
                  return index.index == '7'
                })[0].subs.push({index: 'creditAuditGroup', title: 'staffManage.crumbsThree'})
              }
              if (value.uniqueSign == 'MENU_SYSTEM_COLLECTION') {
                item.filter(index => {
                  return index.index == '7'
                })[0].subs.push({index: 'collectionPeopleList', title: 'staffManage.crumbsFour'})
              }
              if (value.uniqueSign == 'MENU_SYSTEM_COLLECTION_GROUP') {
                item.filter(index => {
                  return index.index == '7'
                })[0].subs.push({index: 'collectionGroup', title: 'staffManage.crumbsFive'})
              }

              // 官网贷款
              if (value.uniqueSign == 'MENU_PC_LOAN') {
                item.push({
                  icon: 'el-icon-menu',
                  index: '17',
                  title: 'websiteLoans.no1',
                  subs: []
                })
              }
              if (value.uniqueSign == 'MENU_PC_USER_LIST') {
                item.filter(index => {
                  return index.index == '17'
                })[0].subs.push({index: 'usersubmitlist', title: 'websiteLoans.no2'})
              }
              if (value.uniqueSign == 'MENU_PC_USER_ME') {
                item.filter(index => {
                  return index.index == '17'
                })[0].subs.push({index: 'mytailafterorder', title: 'websiteLoans.no3'})
              }
              if (value.uniqueSign == 'MENU_PC_LOAN_LIST') {
                item.filter(index => {
                  return index.index == '17'
                })[0].subs.push({index: 'loansapplylist', title: 'websiteLoans.no4'})
              }
            }
          })
          this.items = item
        }
      },
      mounted () {
        this.sidebar()
      }
    
    }
</script>

<style scoped lang="scss">
    .sidebar{
        display: block;
        position: absolute;
        // background-color: rgba(246, 249, 252, 1);
        width: 270px;
        left: 0;
        top: 94px;
        bottom:0;
        overflow-y: scroll;
        .el-menu-item{
            font-size: 12px;
            padding:0 10px;

        }
        li.el-submenu > div.el-submenu__title{
            font-size: 12px;
        }
    }
    .el-menu-item [class^=el-icon-]{
        font-size: 14px;
    }
    .el-submenu [class^=el-icon-]{
        font-size: 14px;
    }
    .sidebar > ul {
        height:100%;
        
    }
    
    /* .el-menu>li> ul> li.is-active{
        background-color: #1D7BFF;
        color: #ffffff;
    } */
    .el-menu > li.is-active{
        background-color: #1D7BFF !important;
        color: #ffffff !important;
    }
    div.sidebar .el-menu-vertical-demo li.is-opened{
        background-color: #48576a;
    }
    .el-menu>li >ul >li:hover{
        background-color: #1D7BFF !important;
        color: #ffffff;
    }
    .el-submenu__title{
        background-color: #1D7BFF !important;
        color: #ffffff !important;
    }
    
</style>
