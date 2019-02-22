import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Login from '../components/login/Login.vue'

Vue.use(Router)

// @@@@@@@@@@@@@@@@@@@@@@@  系统首页  @@@@@@@@@@@@@@@@@@@@@@@
let adminhome = resolve => require(['../views/adminHome.vue'], resolve)

let proManage// 产品管理列表
let chushendetail//  我的初审订单详情
let fushendetail//  我的复审订单详情
// @@@@@@@@@@@@@@@@@@@@@@@  财务数据列表  @@@@@@@@@@@@@@@@@@@@@@@
let backloglist
let putloglist
let userDetail//  ----------------  用户详情   -----------------
let loanMoneyDetail//  ----------------  借款详情   -----------------
let backMoney
let cuishouDetail

if (store.state.common.lang === 'id') {
  proManage = resolve => require(['../views/proManage/proManage.vue'], resolve)
  chushendetail = resolve => require(['../views/woderengongshenhe/chushenDetail/chushendetail.vue'], resolve)
  fushendetail = resolve => require(['../views/woderengongshenhe/chushenDetail/fushendetail.vue'], resolve)
  backloglist = resolve => require(['../views/finance/backloglist.vue'], resolve)
  putloglist = resolve => require(['../views/finance/putloglist.vue'], resolve)
  userDetail = resolve => require(['../views/userManage/userdetail/userdetail.vue'], resolve)
  loanMoneyDetail = resolve => require(['../views/loanMoneyList/detail/loanMoneyDetail.vue'], resolve)
  backMoney = resolve => require(['../views/loanMoneyList/backMoneyList.vue'], resolve)
  cuishouDetail = resolve => require(['../views/cuishou/cuishouDetail.vue'], resolve)
} else if (store.state.common.lang === 'vi') {
  proManage = resolve => require(['../views/proManage/proManage-yuenan.vue'], resolve)
  chushendetail = resolve => require(['../views/woderengongshenhe/chushenDetail/chushendetail-yuenan.vue'], resolve)
  fushendetail = resolve => require(['../views/woderengongshenhe/chushenDetail/fushendetail-yuenan.vue'], resolve)
  backloglist = resolve => require(['../views/finance/backloglist-yuenan.vue'], resolve)
  putloglist = resolve => require(['../views/finance/putloglist-yuenan.vue'], resolve)
  userDetail = resolve => require(['../views/userManage/userdetail/userdetail-yuenan.vue'], resolve)
  loanMoneyDetail = resolve => require(['../views/loanMoneyList/detail/loanMoneyDetail-yuenan.vue'], resolve)
  backMoney = resolve => require(['../views/loanMoneyList/backMoneyList-yuenan.vue'], resolve)
  cuishouDetail = resolve => require(['../views/cuishou/cuishouDetail.vue'], resolve)
} else if (store.state.common.lang === 'PHL') {
  proManage = resolve => require(['../views/proManage/proManage-feilvbin.vue'], resolve)
  chushendetail = resolve => require(['../views/woderengongshenhe/chushenDetail/chushendetail-feilvbin.vue'], resolve)
  fushendetail = resolve => require(['../views/woderengongshenhe/chushenDetail/fushendetail-feilvbin.vue'], resolve)
  backloglist = resolve => require(['../views/finance/backloglist-feilvbin.vue'], resolve)
  putloglist = resolve => require(['../views/finance/putloglist-feilvbin.vue'], resolve)
  userDetail = resolve => require(['../views/userManage/userdetail/userdetail-feilvbin.vue'], resolve)
  loanMoneyDetail = resolve => require(['../views/loanMoneyList/detail/loanMoneyDetail-feilvbin.vue'], resolve)
  backMoney = resolve => require(['../views/loanMoneyList/backMoneyList-feilvbin.vue'], resolve)
  cuishouDetail = resolve => require(['../views/cuishou/cuishouDetail-feilvbin.vue'], resolve)
}

// @@@@@@@@@@@@@@@@@@@@@@@  我的订单审核列表  @@@@@@@@@@@@@@@@@@@@@@@
let wodechushen = resolve => require(['../views/woderengongshenhe/woderengongchushen.vue'], resolve)
let wodefushen = resolve => require(['../views/woderengongshenhe/woderengongfushen.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@  财务数据  @@@@@@@@@@@@@@@@@@@@@@@
let financeTable = resolve => require(['../views/finance/financeTable.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@  产品管理  @@@@@@@@@@@@@@@@@@@@@@@
let appPackageMag = resolve => require(['../views/proManage/appPackageMag.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@  用户管理  @@@@@@@@@@@@@@@@@@@@@@@
let userList = resolve => require(['../views/userManage/userlist.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@  用户建议  @@@@@@@@@@@@@@@@@@@@@@@
let userSug = resolve => require(['../views/userManage/usersug.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@  借款列表  @@@@@@@@@@@@@@@@@@@@@@@
let loanMoney = resolve => require(['../views/loanMoneyList/loanMoneyList.vue'], resolve)

let putMoney = resolve => require(['../views/loanMoneyList/putMoneyList.vue'], resolve)
let backMoneyAwait = resolve => require(['../views/loanMoneyList/backMoneyAwait.vue'], resolve)
let putMoneyAwait = resolve => require(['../views/loanMoneyList/putMoneyAwait.vue'], resolve)


//  @@@@@@@@@@@@@@@@@@@@@@@  待初审列表  @@@@@@@@@@@@@@@@@@@@@@@
let rengongchushen = resolve => require(['../views/fengkonglist/rengongchushen.vue'], resolve)
let rengongfushen = resolve => require(['../views/fengkonglist/rengongfushen.vue'], resolve)
let rengongchushentongji = resolve => require(['../views/fengkonglist/rengongchushentotal.vue'], resolve)
let rengongfushentongji = resolve => require(['../views/fengkonglist/rengongfushentotal.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@  贷后管理列表  @@@@@@@@@@@@@@@@@@@@@@@
let overdueCouponApply = resolve => require(['../views/loanafter/overdueCouponApply.vue'], resolve)
let partialRepaymentApply = resolve => require(['../views/loanafter/partialRepaymentApply.vue'], resolve)

let rucuidingdan = resolve => require(['../views/loanafter/rucuidingdan.vue'], resolve)
let rucuixiangqing = resolve => require(['../views/loanafter/rucuixiangqing/rucuixiangqing.vue'], resolve)
let meiricuihuitongji = resolve => require(['../views/loanafter/meiricuihuitongji.vue'], resolve)
let meiripaidantongji = resolve => require(['../views/loanafter/meiripaidantongji.vue'], resolve)
let cuishouyuantongji = resolve => require(['../views/loanafter/adminTotal.vue'], resolve)
let paymentCode = resolve => require(['../views/loanafter/paymentCode.vue'], resolve)
let OutsourcedResourcePool = resolve => require(['../views/loanafter/OutsourcedResourcePool.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@  催收管理列表  @@@@@@@@@@@@@@@@@@@@@@@
let wodecuishoudingdan = resolve => require(['../views/cuishou/wodecuishoudingdan.vue'], resolve)
let workAnalysis = resolve => require(['../views/cuishou/workAnalysis.vue'], resolve)


// @@@@@@@@@@@@@@@@@@@@@@@  贷后运营列表  @@@@@@@@@@@@@@@@@@@@@@@
let cuishouduanxin = resolve => require(['../views/daihouyunying/cuishouduanxin.vue'], resolve)
let cuihuibaobiao = resolve => require(['../views/daihouyunying/cuihuibaobiao.vue'], resolve)
// let meirirucui = resolve => require(['../views/daihouyunying/meirirucui.vue'], resolve);

// @@@@@@@@@@@@@@@@@@@@@@@  统计数据列表  @@@@@@@@@@@@@@@@@@@@@@@
let tongguolv = resolve => require(['../views/tongjiguanli/tongguolv.vue'], resolve)
let shouyulv = resolve => require(['../views/tongjiguanli/shouyulv.vue'], resolve)
let huikuanlv = resolve => require(['../views/tongjiguanli/huikuanlv.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@   系统权限相关   @@@@@@@@@@@@@@@@@@@@@@@
let IDmanagement = resolve => require(['../views/system/IDmanagement.vue'], resolve)
let Permission = resolve => require(['../views/system/Permission.vue'], resolve)

//  @@@@@@@@@@@@@@@@@@@@@@@  产品列表  @@@@@@@@@@@@@@@@@@@@@@@
let FAQ = resolve => require(['../views/proManage/FAQ.vue'], resolve)

//  @@@@@@@@@@@@@@@@@@@@@@@  委外管理  @@@@@@@@@@@@@@@@@@@@@@@
let everyDayOutsourcedTotal = resolve => require(['../views/OutsourcedManage/everyDayOutsourcedTotal.vue'], resolve)
let OutsourcedOrderList = resolve => require(['../views/OutsourcedManage/OutsourcedOrderList.vue'], resolve)
let OutsourcedDetail = resolve => require(['../views/OutsourcedManage/OutsourcedDetail.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@   客服管理   @@@@@@@@@@@@@@@@@@@@@@@
let myOveDateRemind = resolve => require(['../views/serviceManage/myOveDateRemind.vue'], resolve)
let myOveDateRemindTotal = resolve => require(['../views/serviceManage/myOveDateRemindTotal.vue'], resolve)
let nobackOrderList = resolve => require(['../views/serviceManage/nobackOrderList.vue'], resolve)
let telComeList = resolve => require(['../views/serviceManage/telComeList.vue'], resolve)
let telNoticeDetail = resolve => require(['../views/serviceManage/telNoticeDetail/telNoticeDetail.vue'], resolve)
let noBackdetail = resolve => require(['../views/serviceManage/telNoticeDetail/noBackDetail.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@   渠道管理   @@@@@@@@@@@@@@@@@@@@@@@
let channelManage = resolve => require(['../views/channelManage/channelManage.vue'], resolve)
let channelOvedueTotal = resolve => require(['../views/channelManage/channelOvedueTotal.vue'], resolve)
let channelComeUnitTotal = resolve => require(['../views/channelManage/channelComeUnitTotal.vue'], resolve)
let channelIncomeTotal = resolve => require(['../views/channelManage/channelIncomeTotal.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@   员工管理   @@@@@@@@@@@@@@@@@@@@@@@
let xinshenyuanList = resolve => require(['../views/staffManage/xinshenyuanList.vue'], resolve)
let xinshenxiaozu = resolve => require(['../views/staffManage/xinshenxiaozu.vue'], resolve)
let cuishouyuanList = resolve => require(['../views/staffManage/cuishouyuanList.vue'], resolve)
let cuishouxiaozu = resolve => require(['../views/staffManage/cuishouxiaozu.vue'], resolve)
let kefuyuanList = resolve => require(['../views/staffManage/kefuyuanList.vue'], resolve)
let kefuxiaozu = resolve => require(['../views/staffManage/kefuxiaozu.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@   运营管理   @@@@@@@@@@@@@@@@@@@@@@@
let couponSetting = resolve => require(['../views/operatorManage/couponSetting.vue'], resolve)
let activity = resolve => require(['../views/operatorManage/activity.vue'], resolve)
let otherCoupons = resolve => require(['../views/operatorManage/otherCoupons.vue'], resolve)
let couponUsed = resolve => require(['../views/operatorManage/couponUsed.vue'], resolve)
let popularizeList = resolve => require(['../views/operatorManage/popularizeList.vue'], resolve)
let inviteFriend = resolve => require(['../views/operatorData/inviteFriend.vue'], resolve)
let cash = resolve => require(['../views/operatorData/cash.vue'], resolve)
let channelData = resolve => require(['../views/operatorData/channelData.vue'], resolve)
let ManualnotePut = resolve => require(['../views/operatorManage/ManualnotePut.vue'], resolve)
let buildInNotePut = resolve => require(['../views/operatorManage/buildInNotePut.vue'], resolve)

// @@@@@@@@@@@@@@@@@@@@@@@   官网贷款   @@@@@@@@@@@@@@@@@@@@@@@
let userSubmitList = resolve => require(['../views/websiteLoans/userSubmitList.vue'], resolve)
let userSubmitDetail = resolve => require(['../views/websiteLoans/userSubmitDetail.vue'], resolve)
let myTailafterOrder = resolve => require(['../views/websiteLoans/myTailafterOrder.vue'], resolve)
let loansApplyList = resolve => require(['../views/websiteLoans/loansApplyList.vue'], resolve)

const router = new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
        {path: '/', redirect: '/login'},
        { path: '/login', component: Login},
        { path: '/home',
          name: 'Home',
          component: resolve => require(['../components/common/Home.vue'], resolve),
          children: [
                    // @@@@@@@@@@@@@@@@@@@@@@@  系统首页  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/adminhome', name: 'adminHome', component: adminhome },

                    // @@@@@@@@@@@@@@@@@@@@@@@  产品管理列表  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/promanage', name: 'proManage', component: proManage },
                    {path: '/apppackagemag', name: 'appPackageMag', component: appPackageMag },
                    {path: '/faq', name: 'Faq', component: FAQ },

                    // @@@@@@@@@@@@@@@@@@@@@@@  用户管理  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/userlist', name: 'userList', component: userList },
                        //  ----------------  用户详情   -----------------
                        {path: '/userdetail', name: 'userDetail', component: userDetail },

                    {path: '/usersug', name: 'userSug', component: userSug },

                    // @@@@@@@@@@@@@@@@@@@@@@@  借款列表  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/loanmoney', name: 'loanMoney', component: loanMoney },
                        //  ----------------  借款详情   -----------------
                        {path: '/loanmoneydetail', name: 'loanMoneyDetail', component: loanMoneyDetail },

                    {path: '/putmoney', name: 'putMoney', component: putMoney },
                    {path: '/backmoney', name: 'backMoney', component: backMoney },
                    {path: '/backmoneyawait', name: 'backMoneyAwait', component: backMoneyAwait },
                    {path: '/putmoneyawait', name: 'putMoneyAwait', component: putMoneyAwait },

                    //  @@@@@@@@@@@@@@@@@@@@@@@  待初审列表  @@@@@@@@@@@@@@@@@@@@@@@
                    // {path: '/daichushen',name:'daichushen', component: resolve => require(['../views/fengkonglist/daichushen.vue'], resolve)},
                    {path: '/rengongchushen', name: 'rengongchushen', component: rengongchushen },
                    {path: '/rengongfushen', name: 'rengongfushen', component: rengongfushen },
                    {path: '/rengongchushentongji', name: 'rengongchushentongji', component: rengongchushentongji },
                    {path: '/rengongfushentongji', name: 'rengongfushentongji', component: rengongfushentongji },

                    // @@@@@@@@@@@@@@@@@@@@@@@  我的订单审核列表  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/wodechushen', name: 'wodechushen', component: wodechushen },
                        //  ----------------  我的初审订单详情   -----------------
                        {path: '/chushendetail', name: 'chushendetail', component: chushendetail },

                    {path: '/wodefushen', name: 'wodefushen', component: wodefushen },
                        //  ----------------  我的复审订单详情   -----------------
                        {path: '/fushendetail', name: 'fushendetail', component: fushendetail },

                    // @@@@@@@@@@@@@@@@@@@@@@@  财务数据列表  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/backloglist', name: 'backloglist', component: backloglist },
                    {path: '/putloglist', name: 'putloglist', component: putloglist },
                    {path: '/financetable', name: 'financeTable', component: financeTable },

                    // @@@@@@@@@@@@@@@@@@@@@@@  贷后管理列表  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/overdueCouponApply', name: 'overdueCouponApply', component: overdueCouponApply },
                    {path: '/partialRepaymentApply', name: 'partialRepaymentApply', component: partialRepaymentApply },
                    {path: '/outsourcedresourcepool', name: 'OutsourcedResourcePool', component: OutsourcedResourcePool },

                    {path: '/rucuidingdan', name: 'rucuidingdan', component: rucuidingdan },
                        //  ----------------  催收订单详情订单详情   -----------------
                        {path: '/rucuixiangqing', name: 'rucuixiangqing', component: rucuixiangqing },
                    {path: '/meiricuihuitongji', name: 'meiricuihuitongji', component: meiricuihuitongji },
                    {path: '/meiripaidantongji', name: 'meiripaidantongji', component: meiripaidantongji },
                    {path: '/cuishouyuantongji', name: 'cuishouyuantongji', component: cuishouyuantongji },
                    {path: '/paymentcode', name: 'paymentCode', component: paymentCode },

                    // @@@@@@@@@@@@@@@@@@@@@@@  催收管理列表  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/wodecuishoudingdan', name: 'wodecuishoudingdan', component: wodecuishoudingdan },
                    {path: '/cuishoudetail', name: 'cuishouDetail', component: cuishouDetail },
                    {path: '/workanalysis', name: 'workAnalysis', component: workAnalysis },

                    // @@@@@@@@@@@@@@@@@@@@@@@  贷后运营列表  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/cuishouduanxin', name: 'cuishouduanxin', component: cuishouduanxin },
                    {path: '/cuihuibaobiao', name: 'cuihuibaobiao', component: cuihuibaobiao },
                    // {path: '/meirirucui',name:'meirirucui', component: meirirucui },

                    // @@@@@@@@@@@@@@@@@@@@@@@  统计数据列表  @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/tongguolv', name: 'tongguolv', component: tongguolv },
                    {path: '/shouyulv', name: 'shouyulv', component: shouyulv },
                    {path: '/huikuanlv', name: 'huikuanlv', component: huikuanlv },

                    // @@@@@@@@@@@@@@@@@@@@@@@   系统权限相关   @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/idmanagement', name: 'IDmanagement', component: IDmanagement },
                    {path: '/permission', name: 'Permission', component: Permission },
                    
                    // @@@@@@@@@@@@@@@@@@@@@@@   委外管理   @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/outsourcedorderlist', name: 'OutsourcedOrderList', component: OutsourcedOrderList },
                    {path: '/everydayoutsourcedtotal', name: 'everyDayOutsourcedTotal', component: everyDayOutsourcedTotal },
                    {path: '/outsourceddetail', name: 'OutsourcedDetail', component: OutsourcedDetail },

                    // @@@@@@@@@@@@@@@@@@@@@@@   客服管理相关   @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/myovedateremind', name: 'myOveDateRemind', component: myOveDateRemind },
                    {path: '/myovedateremindtotal', name: 'myOveDateRemindTotal', component: myOveDateRemindTotal },
                    {path: '/nobackorderlist', name: 'nobackOrderList', component: nobackOrderList },
                    {path: '/telcomelist', name: 'telComeList', component: telComeList },
                    {path: '/telnoticedetail', name: 'telNoticeDetail', component: telNoticeDetail },
                    {path: '/nobackdetail', name: 'noBackdetail', component: noBackdetail },

                    // @@@@@@@@@@@@@@@@@@@@@@@   渠道管理相关   @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/channelmanage', name: 'channelManage', component: channelManage },
                    {path: '/channeloveduetotal', name: 'channelOvedueTotal', component: channelOvedueTotal },
                    {path: '/channelcomeunittotal', name: 'channelComeUnitTotal', component: channelComeUnitTotal },
                    {path: '/channelincometotal', name: 'channelIncomeTotal', component: channelIncomeTotal },

                    // @@@@@@@@@@@@@@@@@@@@@@@   员工管理相关   @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/xinshenyuanlist', name: 'xinshenyuanList', component: xinshenyuanList },
                    {path: '/xinshenxiaozu', name: 'xinshenxiaozu', component: xinshenxiaozu },
                    {path: '/cuishouyuanlist', name: 'cuishouyuanList', component: cuishouyuanList },
                    {path: '/cuishouxiaozu', name: 'cuishouxiaozu', component: cuishouxiaozu },
                    {path: '/kefuyuanlist', name: 'kefuyuanList', component: kefuyuanList },
                    {path: '/kefuxiaozu', name: 'kefuxiaozu', component: kefuxiaozu },

                    // @@@@@@@@@@@@@@@@@@@@@@@   运营管理相关   @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/couponSetting', name: 'couponSetting', component: couponSetting },
                    {path: '/activity', name: 'activity', component: activity },
                    {path: '/otherCoupons', name: 'otherCoupons', component: otherCoupons },
                    {path: '/couponUsed', name: 'couponUsed', component: couponUsed },
                    {path: '/popularizeList', name: 'popularizeList', component: popularizeList },
                    {path: '/inviteFriend', name: 'inviteFriend', component: inviteFriend },
                    {path: '/cash', name: 'cash', component: cash },
                    {path: '/channelData', name: 'channelData', component: channelData },
                    {path: '/manualnoteput', name: 'ManualnotePut', component: ManualnotePut },
                    {path: '/buildinnoteput', name: 'buildInNotePut', component: buildInNotePut },

                    // @@@@@@@@@@@@@@@@@@@@@@@   官网贷款   @@@@@@@@@@@@@@@@@@@@@@@
                    {path: '/usersubmitlist', name: 'userSubmitList', component: userSubmitList },
                    {path: '/usersubmitdetail', name: 'userSubmitDetail', component: userSubmitDetail },
                    {path: '/mytailafterorder', name: 'myTailafterOrder', component: myTailafterOrder },
                    {path: '/loansapplylist', name: 'loansApplyList', component: loansApplyList },
                    {path: '/test', name: 'test', component: resolve =>require(['../views/test.vue'], resolve) },
          ]
        },

        { path: '*', component: resolve => require(['../components/err/Page404.vue'], resolve)}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.clear()
  }
  let user = sessionStorage.getItem('name')
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router