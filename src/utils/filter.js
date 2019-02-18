import Vue from 'vue'

// 订单审核状态  插值语法Vue.filter使用规则
Vue.filter('rejectStatus', function (status) {
  switch (status) {
    case -10:
      return '机审驳回'
      break
    case -20:
      return '人工初审驳回'
      break
    case -30:
      return '人工复审驳回'
      break
    case -40:
      return '三方放款单创建失败'
      break
    case -41:
      return '放款失败'
      break
    case -50:
      return '还款失败'
      break
    case -60:
      return '已逾期'
      break
    case -70:
      return '已坏账'
      break
    case 1:
      return '待机审'
      break
    case 10:
      return '机审通过'
      break
    case 20:
      return '待人工初审'
      break
    case 21:
      return '人工初审通过'
      break
    case 30:
      return '待人工复审'
      break
    case 31:
      return '人工复审通过'
      break
    case 40:
      return '待放款'
      break
    case 41:
      return '三方订单创建成功'
      break
    case 42:
      return '放款中'
      break
    case 43:
      return '放款成功'
      break
    case 50:
      return '部分还款'
      break
    case 51:
      return '已还款'
      break
    default:
      return '其它'
  }
})

// 是否在通讯录订单状态
Vue.filter('is_addressBook', function (status) {
  switch (status) {
    case 1:
      return '是'
      break
    default:
      return '否'
  }
})

// 联系状态
Vue.filter('contactStatus', function (status) {
  switch (status) {
    case 1:
      return '呼出'
      break
    default:
      return '接入'
  }
})

// 电话接通状态
Vue.filter('tel_through', function (status) {
  switch (status) {
    case -1:
      return '未接'
      break
    case -2:
      return '关机'
      break
    case -3:
      return '停机'
      break
    case -4:
      return '空号'
      break
    case -5:
      return '关系有假'
      break
    case 1:
      return '接通真实'
      break
    case 2:
      return '其它'
      break
  }
})

// 教育程度
Vue.filter('education', function (status) {
  switch (status) {
    case 1:
      return '小学'
      break
    case 2:
      return '初中'
      break
    case 3:
      return '高中'
      break
    case 4:
      return '大专'
      break
    case 5:
      return '本科'
      break
    case 6:
      return '硕士'
      break
    case 7:
      return '博士及以上'
      break
    default:
      return '其它'
  }
})

// 婚姻状况
Vue.filter('marriage', function (status) {
  switch (status) {
    case 1:
      return '单身'
      break
    case 2:
      return '已婚'
      break
    case 3:
      return '离异'
      break
    case 4:
      return '丧偶'
      break
    default:
      return '其它'
  }
})

// 生育状况
Vue.filter('birthState', function (status) {
  switch (status) {
    case 1:
      return '未生育'
      break
    case 2:
      return '一个'
      break
    case 3:
      return '两个'
      break
    case 4:
      return '两个以上'
      break
    default:
      return '其它'
  }
})

// 客户端
Vue.filter('clientStatus', function (status) {
  switch (status) {
    case 2:
      return '微信'
      break
    case 3:
      return 'PC'
      break
    case 4:
      return 'Android'
      break
    case 5:
      return 'IOS'
      break
    default:
      return '其它'
  }
})

// 性别
Vue.filter('sexStatus', function (status) {
  switch (status) {
    case 1:
      return '男'
      break
    case 2:
      return '女'
      break
    case 3:
      return '未知'
      break
    default:
      return '其它'
  }
})

// 居住时长
Vue.filter('liveTime', function (status) {
  switch (status) {
    case 1:
      return '三个月及其以内'
      break
    case 2:
      return '四个月'
      break
    case 3:
      return '五个月'
      break
    case 4:
      return '六个月'
      break
    case 5:
      return '六个月以上'
      break
    default:
      return '其它'
  }
})

// 银行卡状态
Vue.filter('bankIdStatus', function (status) {
  switch (status) {
    case 1:
      return '有效'
      break
    case -1:
      return '无效'
      break
    default:
      return '其它'
  }
})

// 是否逾期状态
Vue.filter('overdueState', function (status) {
  switch (status) {
    case 1:
      return '已逾期'
      break
    case -1:
      return '未逾期'
      break
    default:
      return '其它'
  }
})

// 个人信息身份状态
Vue.filter('userSelfStatus', function (status) {
  switch (status) {
    case 1:
      return '已注册'
      break
    case 2:
      return '身份信息已验证'
      break
    case 3:
      return '个人信息已验证'
      break
    case 4:
      return '紧急联系人已验证'
      break
    case 5:
      return '工作信息已验证'
      break
    case 6:
      return '银行卡已验证'
      break
    default:
      return '其它'
  }
})

// 是否是黑名单
Vue.filter('blackStatus', function (status) {
  switch (status) {
    case -1:
      return '黑名单'
      break
    case -2:
      return '灰名单'
      break
    case 1:
      return '正常'
      break
    default:
      return '其它'
  }
})

// 用户反馈状态
Vue.filter('sugStatus', function (status) {
  switch (status) {
    case 1:
      return '已提交'
      break
    case 2:
      return '已查看'
      break
    case 3:
      return '已回复'
      break
    default:
      return '已提交'
  }
})

// 审核统计审核类型
Vue.filter('auditType', function (status) {
  switch (status) {
    case 1:
      return '机审'
      break
    case 2:
      return '人工初审'
      break
    case 3:
      return '人工复审'
      break
    default:
      return '未知'
  }
})

// 订单是否逾期
Vue.filter('overDue', function (status) {
  switch (status) {
    case 1:
      return '逾期'
      break
    case -1:
      return '未逾期'
      break
    default:
      return '其它'
  }
})

// 财务数据/放款日志列表
Vue.filter('putMoneyLogStatus', function (status) {
  switch (status) {
    case -40:
      return '三方放款单创建失败'
      break
    case -41:
      return '放款失败'
      break
    case 40:
      return '待放款'
      break
    case 41:
      return '三方订单创建成功'
      break
    case 42:
      return '放款中'
      break
    case 43:
      return '放款成功'
      break
    default:
      return '其它'
  }
})

// 财务数据/还款日志列表
Vue.filter('backMoneyLogStatus', function (status) {
  switch (status) {
    case -50:
      return '还款失败'
      break
    case -51:
      return '当前订单不支持还款码操作'
      break
    case -52:
      return '获取还款码失败'
      break
    case -53:
      return '还款单创建失败'
      break
    case -54:
      return '人工确认还款失败'
      break
    case 50:
      return '部分还款'
      break
    case 51:
      return '已还款'
      break
    case 52:
      return '获取还款码成功'
      break
    case 53:
      return '还款单创建成功'
      break
    case 54:
      return '还款单创建中'
      break
    case 55:
      return '人工确认还款成功'
      break
    default:
      return '其它'
  }
})

// 用户身份
Vue.filter('roleIdStatus', function (status) {
  switch (status) {
    case 1:
      return '商务经理'
      break
    case 2:
      return '产品经理'
      break
    case 3:
      return '开发工程师'
      break
    case 4:
      return '超级管理员'
      break
    default:
      return '其它'
  }
})

// 借款审核记录借款操作类型
Vue.filter('loanMoneyRecordStatus', function (status) {
  switch (status) {
    case 1:
      return '机审'
      break
    case 2:
      return '人工初审'
      break
    case 3:
      return '人工复审'
      break
    default:
      return '其它'
  }
})

// 借款审核记录借款审核结果
Vue.filter('loanMoneyResultStatus', function (status) {
  switch (status) {
    case 1:
      return '通过'
      break
    case -1:
      return '未通过'
      break
    default:
      return '其它'
  }
})

// 借款审核记录还款审核结果
Vue.filter('backMoneyResultStatus', function (status) {
  switch (status) {
    case -50:
      return '还款失败'
      break
    case -51:
      return '当前订单不支持还款码操作'
      break
    case -52:
      return '获取还款码失败'
      break
    case -53:
      return '还款单创建失败'
      break
    case -54:
      return '人工确认还款失败'
      break
    case 50:
      return '部分还款'
      break
    case 51:
      return '已还款'
      break
    case 52:
      return '获取还款码成功'
      break
    case 53:
      return '还款单创建成功'
      break
    case 54:
      return '还款单创建中'
      break
    case 55:
      return '人工确认还款成功'
      break
    default:
      return '其它'
  }
})

// 借款审核记录放款审核结果
Vue.filter('putMoneyResultStatus', function (status) {
  switch (status) {
    case -40:
      return '三方放款单创建失败'
      break
    case -41:
      return '放款失败'
      break
    case 40:
      return '待放款'
      break
    case 41:
      return '三方订单创建成功'
      break
    case 42:
      return '放款中'
      break
    case 43:
      return '放款成功'
      break
    default:
      return '其它'
  }
})
