// 初始化权限列表
let list = JSON.parse(sessionStorage.getItem('list'))
let filterPer = () => {
  let arr = []
  if (list) {
    list.forEach(item => {
      if (item.uniqueSign) {
        arr.push(item.uniqueSign)
      }
    })
  }
  return arr
}
// console.log(global.config.headerTotal)
// 获取当前时间的前一个月/秒时间，解决时间选择器出现1970的bug
function getPreMonth () {
  // var nowdate = new Date();
  // nowdate.setMonth(nowdate.getMonth()-1);
  var prve = new Date(new Date().getTime()+1000)
  // var y = nowdate.getFullYear();
  // var m = nowdate.getMonth()+1;
  // var d = nowdate.getDate();
  // var formatwdate = y+'/'+m+'/'+d;
  var formatwdate = new Date(prve)
  return formatwdate
}

const common = {
  state: {
    nullData: '-',
    publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRXYFYTGI9uVipfl9P5loLAWLRIQPpSznBc1ACIpCO/ptKYLXjzunWz2TyCj5OV1yjs9pEIcyOnxs6ESplsUOsEakf6wDgox6sU3A51mQmQlm6ALxtfguurZGOJ0Ksg/gL1q97YWTSMsH9R1slDV95nvMKsQAd4Yd/6i+2/ihaxQIDAQAB',
    lang: global.config.lang, // 切换语言版本 vi 越南  id 印尼 PHL 菲律宾
    id_currency: global.config.first_unit, // 印尼金钱单位 Rp
    vi_currency: global.config.last_unit, // 越南金钱单位 VND 菲律宾金钱单位PHP
    permiss: filterPer(),
    preMonth: getPreMonth(),
    userList_select: {},
    userSugList_select: {},
    loanMoneyList_select: {
      orderNo: '',
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        applyTimeBegin: '',
        applyTimeEnd: '',
        orderState: ''
    },
    backMoneyList_select: {
      orderNo: '',
        orderId: '',
        userId: '',
        name: '',
        phone: '',
        orderState: '',
        isOverdue: '',
        refundTimeBegin: '',
        refundTimeEnd: '',
        repayTimeBegin: '',
        repayTimeEnd: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
        overdueBegin: '',
        overdueEnd: ''
    },
    putMoneyList_select: {
      orderNo: '',
      orderId: '',
      userId: '',
      name: '',
      phone: '',
      loanTimeBegin: '',
      loanTimeEnd: '',
      applyTimeBegin: '',
      applyTimeEnd: '',
      orderState: ''
    },
    rengongchushen_select: {},
    rengongfushen_select: {},
    rengongtongji_select: {},
    rengongchushentongji_select: {},
    rengongfushentongji_select: {},
    myrengongchushen_select: {},
    myrengongfushen_select: {},
    backMoneyLogList_select: {
      orderNo: "",
      orderId: "",
      userId: "",
      repaymentNo:'',
      payType: "",
      thirdChannel: "",
      paySuccessBegin: "",
      paySuccessEnd: "",
      createTimeBegin: "",
      createTimeEnd: "",
      status: "",
      couponType:''
    },
    putMoneyLogList_select: {
      transactionId: "",
      orderId: "",
      userName:'',
      phone: "",
      thirdChannel: "",
      applyTimeBegin: "",
      applyTimeEnd: "",
      createTimeBegin: "",
      createTimeEnd: "",
      loanTimeBegin: "",
      loanTimeEnd: "",
      status: "",
      loanType:''
    },
    rucuiList_select: {},
    todaypaidanList_select: {},
    todaycuihuiList_select: {},
    collectionPeopleList_select: {},
    mycuishouList_select: {},
    tongguolv_select: {},
    shouyulv_select: {},
    huikuanlv_select: {},
    idMangeList_select: {},
    cuishouNoteList_select: {},
    cuihuiTotalList_select: {},
    noBackOrderList_select: {},
    myOveDateRemindList_select: {},
    telComeList_select: {},
    payCodeList_select: {},
  },
  getters: {
    moneySplit: () => (str) => { // 金钱做处理，印尼、越南'$1.' 菲律宾'$1,'
      if(str){
        return String(str).split('.').map(
          function (val, index) {
            return index == 1 ? val : val.split('').reverse().join('').replace(/(\d{3})\B/g, global.config.moneySplit).split('').reverse().join('')
          }
        ).join('.')
      }else{
        return '-';
      }
      
    },
    toArray: () => (obj) => {
      // let arr = []
      let arr = obj.split('-')
      return arr
    },
    yyyy_m_d: () => (str) => {
      var date = new Date(str)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      return Y + M + D
    },
    perManage: () => (id) => { // 根据id获取权限点
      let arr = []
      list.filter(value => {
        return value.supperId == id
      }).forEach(item => {
        if (item.uniqueSign) {
          arr.push(item.uniqueSign)
        }
      })
      return arr
    },
    getper: (state) => (list) => { // 获取权限点
      let arr = []
      list.forEach(item => {
        if (item.uniqueSign) {
          arr.push(item.uniqueSign)
        }
      })
      state.permiss = arr
    },
    twoPoint: () => (str) => { // 截取小数点后两位
      var aNew
      var re = /([0-9]+\.[0-9]{2})[0-9]*/
      aNew = String(str * 100).replace(re, '$1')
      return aNew
    },
    dayData: () => (obj) => { // 首页数据图
      let arr = []
      if (obj.day0 !== '') {
        arr.push(obj.day0)
      }
      if (obj.day1 !== '') {
        arr.push(obj.day1)
      }
      if (obj.day2 !== '') {
        arr.push(obj.day2)
      }
      if (obj.day3 !== '') {
        arr.push(obj.day3)
      }
      if (obj.day4 !== '') {
        arr.push(obj.day4)
      }
      if (obj.day5 !== '') {
        arr.push(obj.day5)
      }
      if (obj.day6 !== '') {
        arr.push(obj.day6)
      }
      return arr
    },
    uniqueArray: () => (arr) => { // 数组去重
      var res = []
      var json = {}
      for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
          res.push(arr[i])
          json[arr[i]] = 1
        }
      }
      return res
    },
    isToady: () => (str) => { // 判断是否是今日
      if (String(new Date(str)).slice(0, 15) === String(new Date()).slice(0, 15)) {
        return true
      } else {
        return false
      }
    },
    getYMD: () => (str) => { // 时间戳转换为时间格式
      var date = new Date(Number(str))
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
      return Y + M + D

    },
    getYMDHMS: () => (str) => {
      var date = new Date(Number(str))
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
      let H = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      let Mi = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      let S = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      return `${Y}${M}${D} ${H}:${Mi}:${S}`
    },
    getAge: () => (str) => { // 根据时间获取年龄
      var strBirthdayArr = str.split('-')
      var birthYear = strBirthdayArr[0]

      var d = new Date()
      var nowYear = d.getFullYear()

      var age = nowYear - birthYear
      return age
    }
  },
  mutations: {
    filterPreList (state, list) { // 筛选初符合条件的路由
      let arr = []
      JSON.parse(list.list).forEach(item => {
        if (item.uniqueSign) {
          arr.push(item.uniqueSign)
        }
      })
      state.permiss = arr
    },
    getPreMouth (state) {
      var nowdate = new Date()
      nowdate.setMonth(nowdate.getMonth() - 1)
      var y = nowdate.getFullYear()
      var m = nowdate.getMonth() + 1
      var d = nowdate.getDate()
      var formatwdate = y + '-' + m + '-' + d
      state.PreMouth = formatwdate
    },
    userList (state, list) {
      state.userList_select = list
    },
    userSugList (state, list) {
      state.userSugList_select = list
    },
    loanMoneyList (state, list) {
      state.loanMoneyList_select = list
    },
    backMoneyList (state, list) {
      state.backMoneyList_select = list
    },
    putMoneyList (state, list) {
      state.putMoneyList_select = list
    },
    rengongchushenList (state, list) {
      state.rengongchushen_select = list
    },
    rengongfushenList (state, list) {
      state.rengongfushen_select = list
    },
    rengongtongjiList (state, list) {
      state.rengongtongji_select = list
    },
    rengongchushentongjiList (state, list) {
      state.rengongchushentongji_select = list
    },
    rengongfushentongjiList (state, list) {
      state.rengongfushentongji_select = list
    },
    myrengongchushenList (state, list) {
      state.myrengongchushen_select = list
    },
    myrengongfushenList (state, list) {
      state.myrengongfushen_select = list
    },
    backMoneyLogList (state, list) {
      state.backMoneyLogList_select = list
    },
    putMoneyLogList (state, list) {
      state.putMoneyLogList_select = list
    },
    rucuiList (state, list) {
      state.rucuiList_select = list
    },
    todaypaidanList (state, list) {
      state.todaypaidanList_select = list
    },
    todaycuihuiList (state, list) {
      state.todaycuihuiList_select = list
    },
    collectionPeopleList (state, list) {
      state.collectionPeopleList_select = list
    },
    mycuishouList (state, list) {
      state.mycuishouList_select = list
    },
    passingRate (state, list) {
      state.tongguolv_select = list
    },
    overdueRate (state, list) {
      state.shouyulv_select = list
    },
    rateOfReturn (state, list) {
      state.huikuanlv_select = list
    },
    idMangeList (state, list) {
      state.idMangeList_select = list
    },
    cuishouNoteList (state, list) {
      state.cuishouNoteList_select = list
    },
    noBackOrderList (state, list) {
      state.noBackOrderList_select = list
    },
    myOveDateRemindList (state, list) {
      state.myOveDateRemindList_select = list
    },
    telComeList (state, list) {
      state.telComeList_select = list
    },
    payCodeList (state, list) {
      state.payCodeList_select = list
    },
    kefuList_group (state, list) {
      state.kefuList_select = list
    },
    creditAuditPeopleList_group (state, list) {
      state.creditAuditPeopleList_select = list
    },
    collectionPeopleList_group (state, list) {
      state.collectionPeopleList_group_select = list
    },
    kefuList_group_list (state, list) {
      state.kefuList_group_select = list
    },
    creditAuditPeopleList_group_list (state, list) {
      state.creditAuditPeopleList_group_select = list
    },
    collectionPeopleList_group_list (state, list) {
      state.collectionPeopleList_group1_select = list
    },
    

  }

}

export default common
