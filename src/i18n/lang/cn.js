﻿import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  login: {// 登录相关
    management_system: '后台管理系统',
    login: '登录',
    required: '必填',
    pass: {
      no1: '请再次输入密码',
      no2: '两次输入密码不一致',
      no3: '不能与旧密码一样',
      no4: '密码长度不小于6位'
    },
    num: '请输入整数',
    float: '请输入整数或小数',
    zero: '请输入0-1之间的数字'
  },
  message: {// 提示框提示消息相关
    error: '网络错误，稍后再试',
    success: '操作成功',
    warning: '操作失败',
    warn: '订单已驳回，不能电话审核'
  },
  header: {// 头部信息
    title: '后台管理系统',
    main: '首页',
    changePass: '修改密码',
    exit: '安全退出',
    submit: '提交',
    cancel: '取消',
    oldPassWord: '旧密码',
    newPassWord: '新密码',
    newPassWordTwo: '确认密码'
  },
  sidebar: {// 侧边栏相关信息
    adminHome: '工作台',
    userManage: '用户管理',
    userList: '用户列表',
    userSuggest: '用户反馈',
    loanManage: '借款管理',
    loanMoneyList: '借款列表',
    putMoneyList: '放款列表',
    backMoneyList: '还款列表',
    riskManage: '风控审核管理',
    labourAuditListOne: '人工初审列表',
    labourAuditListTwo: '人工复审列表',
    labourAuditTotal: '人工审核统计',
    labourAuditTotalOne: '人工初审统计',
    labourAuditTotalTwo: '人工复审统计',
    myAuditOrder: '我的审核订单',
    myLabourAuditOne: '我的人工初审',
    myLabourAuditTwo: '我的人工复审',
    financialData: '财务数据',
    putMoneyLog: '放款日志列表',
    backMoneyLog: '还款日志列表',
    productManage: '产品管理',
    productList: '产品列表',
    loanAfterManage: '内催管理',
    comeOrderList: '入催订单列表',
    todayOperatesTotal: '每日派单统计',
    todaycuihuiTotal: '每日催回统计',
    adminTotal: '催收员催收统计',
    loanAfterOperates: '贷后运营',
    noteTemplate: '催收短信模版',
    comeTable: '总催回报表',
    comeReceiveManage: '催收管理',
    myComeOrder: '我的催收订单',
    statisticsManage: '统计管理',
    passRateList: '通过率报表',
    comeRateList: '入催率报表',
    firstRateList: '逾期率报表',
    backMoneyRateList: '回款率报表',
    system: '系统管理',
    accountManage: '账号管理',
    permission: '权限分配',
    operator: '运营管理',
    operatorData: '运营数据'
  },
  adminHome: {// 首页相关信息
    todayData: '今日数据',
    todyRegisterNum: '当天注册',
    loanMoneyApply: '借款申请',
    throughOrderNum: '通过单量',
    throughRate: '通过率',
    putMoneyRate: '放款量',
    backMoneyRate: '还款量',
    dataTotal: '累计数据',
    hisPutMoneyTotal: '历史放款总量',
    hisBackMoneyTotal: '历史还款总量',
    unit: '笔',
    moneyUnit: '元',
    nowData: '实时数据',
    waitBackMoney: '待还款总余额',
    noBackMoney: '逾期未还款总余额',
    thisWeekBackMoney: '本周每天还款笔数',
    thisWeekPutMoney: '本周每天放款笔数',
    monday: '周一',
    tuesday: '周二',
    wednesday: '周三',
    thursday: '周四',
    friday: '周五',
    saturday: '周六',
    sunday: '周日',
    number: '数量',
    no1:'历史放款本金',
    no2:'历史回款金额',
    no3:'在贷总单量',
    no4:'在贷总余额',
    no5:'逾期未还总单量',
    no6:'新注册用户量',
    no7:'新用户申请量',
    no8:'复借用户申请量',
    no9:'新用户放款量',
    no10:'复借用户放款量',
    no11:'到期还款笔数',
    no12:'逾期还款笔数',
    no13:'本周数据走势',
    no14:'本月数据走势',
    no15:'到期还款量',
    no16:'逾期还款量',
    no17:'当天申请',
    no18:'当天放款',
    no19:'机审通过量',
    no20:'当天放款',
  },
  userList: {// 用户列表相关
    crumbsOne: '用户管理',
    crumbsTwo: '用户列表',
    userStatus: {
      no1: '未认证',
      no2: '部分认证',
      no3: '部分认证',
      no4: '部分认证',
      no5: '部分认证',
      no6: '已认证',
      no7: '其它'
    },
    blackStatus: {
      no1: '黑名单',
      no2: '灰名单',
      no3: '正常',
      no4: '其它'
    },
    blackStatus_option: {
      no1: '黑名单',
      no2: '白名单',
      no3: '灰名单',
      no4: '正常'
    },
    approveStatus_option: {
      no1: '已认证',
      no2: '未认证',
      no3: '部分认证',
      no4: '认证失效'
    }

  },
  userDetail: {// 用户列表详情相关
    crumbs: '用户列表详情',
    sex_status: {
      no1: '男',
      no2: '女',
      no3: '未知',
      no4: '保密'
    },
    marriage_status: {
      no1: '单身',
      no2: '已婚',
      no3: '离异',
      no4: '丧偶',
      no5: '其它'
    },
    birth_state: {
      no1: '未生育',
      no2: '一个',
      no3: '两个',
      no4: '两个以上',
      no5: '其它'
    },
    client_status: {
      no1: '微信',
      no2: 'PC',
      no3: 'Android',
      no4: 'IOS',
      no5: '其它'
    },
    overdue_state: {
      no1: '已逾期',
      no2: '未逾期',
      no3: '其它'
    },
    reject_status: {
      no1: '机审驳回',
      no2: '人工初审驳回',
      no3: '人工复审驳回',
      no4: '三方放款单创建失败',
      no5: '放款失败',
      no6: '还款失败',
      no7: '已逾期',
      no8: '已坏账',
      no9: '待机审',
      no10: '机审通过',
      no11: '待人工初审',
      no12: '人工初审通过',
      no13: '待人工复审',
      no14: '人工复审通过',
      no15: '待放款',
      no16: '三方订单创建成功',
      no17: '放款中',
      no18: '放款成功',
      no19: '部分还款',
      no20: '已还款',
      no21: '其它',
      no22: '待还款',
      no23: '机审失败'
    },
    education_status: {
      no1: '高中',
      no2: '专科',
      no3: '本科',
      no4: '硕士',
      no5: '博士',
      no6: '硕士',
      no7: '博士及以上',
      no8: '其它',
      no9: '研究生',
    },
    vi_edu: {
      no1: '小学',
      no2: '初中',
      no3: '高中',
      no4: '学士',
      no5: '硕士',
      no6: '博士'
    },
    phl_edu: {
      no1: '小学',
      no2: '中学',
      no3: '本科',
      no4: '研究生',
      no5: '博士',
      no6: '其它'
    },
    liveTime_status: {
      no1: '三个月及其以内',
      no2: '四个月',
      no3: '五个月',
      no4: '六个月',
      no5: '六个月以上',
      no6: '其它'
    },
    bankId_status: {
      no1: '有效',
      no2: '无效',
      no3: '其它'
    }
  },
  userSuggest: {// 用户反馈列表相关
    crumbsOne: '用户反馈列表',
    title: '用户反馈列表',
    noteStatus: '消息状态',
    suggest_option: {
      no1: '已处理',
      no2: '未处理',
      no3: '已回复'
    },
    suggest: '意见内容',
    status: '状态',
    replyContent: '回复内容',
    adminName: '操作人',
    replay: '回复',
    sugStatus: {
      no1: '未处理',
      no2: '已处理',
      no3: '未处理'
    },
    sugType:{
      no1: '还款问题',
      no2: '收款问题',
      no3: '使用问题',
      no4: '其他'
    },
    title1: '查看意见内容',
    title2: '内容回复',
    sugReply: '意见回复',
    sureSubmit: '确认发送消息',
    placeholder: '请输入回复内容',
    success: '反馈成功',
    err: '反馈失败',
    replyFirst: '请先回复',
    all: '批量处理'
  },
  myAuditList: {// 我的审核订单相关
    no1: '我的审核订单',
    no2: '我的人工初审',
    no3: '人工初审订单列表',
    no4: '初审订单认领',
    no5: '人工初审',
    no6: '我的人工复审',
    no7: '人工复审订单列表',
    no8: '复审订单认领',
    no9: '人工复审',
    no10: '人工初审详情',
    no11: '人工复审详情',
    no12: '人工初审通过',
    no13: '人工初审驳回',
    no14: '人工复审通过',
    no15: '人工复审驳回',
    telThrough_status: {
      no1: '未接',
      no2: '关机',
      no3: '停机',
      no4: '空号',
      no5: '关系有假',
      no6: '接通真实',
      no7: '其它'
    }
  },
  auditDetail: {// 订单审核详情相关
    no1: '个人详细数据',
    no2: '身份验证',
    no3: '身份检测通过',
    no4: '身份检测未通过',
    no5: '工作单位信息',
    no6: '公司地址核实结果通过',
    no7: '公司地址核实结果未通过',
    no8: '与该联系人联系',
    no9: '次',
    no10: '相似度',
    no11: '机审结果展示',
    no12: '人工初审结果',
    no13: '人工初审',
    no14: '机审时间',
    no15: '机审结果',
    no16: '通过',
    no17: '不通过',
    no18: '原因类别',
    no19: '原因自类别',
    no20: '初审时间',
    no21: '初审结果',
    no22: '电话审核记录',
    no23: '驳回原因',
    no24: '请选择初审结果',
    no25: '请选择驳回原因',
    no26: '提交成功',
    no27: '复审时间',
    no28: '复审结果',
    no29: '请选择复审结果',
    no30: '网络错误，稍后再试',
    no31: '短信内容',
    no32: '接收方',
    no33: '发送方',
    no34: '全部',
    no35: '逾期',
    no36: '欠债',
    no37: '亲属名单',
    no38: '通讯录联系人占比',
    no39: '催收电话',
    no40: '个',
    no41: '时间',
    no42: '电话审核',
    no43: '通话结果',
    no44: '血型',
    no45: '宗教信仰',
    no46: '出生地点和日期',
    no47: '职业',
    no48: '省份',
    no49: '城市',
    no50: '地区',
    no51: '乡村',
    no52: '国籍',
    no53: '有效期',
    no54: '婚姻',
    no55: '地址',
    no56: '公司名称',
    no57: '查询机构类型',
    no58: '查询次数',
    no59: '查询日期',
    no60: '检测结果',
    no61: '结果描述',
    no62: '人工复审',
    no63: '银行卡信息',
    no64: '查看更多',
    no65: '跟踪记录',
    no66: '历史跟踪记录',
    no67: '记录时间',
    no68: '内容',
    no69: '多头借贷',
    no70: '贷款平台电话',
    isOverdue: {
      no1: '逾期',
      no2: '未逾期',
      no3: '其它'
    },
    isAdressBook: {
      no1: '是',
      no2: '否'
    },
    contactStatus: {
      no1: '呼入',
      no2: '呼出'
    },
    telStatus_option: {
      no1: '未接',
      no2: '关机',
      no3: '停机',
      no4: '空号',
      no5: '接通真实',
      no6: '关系有假',
      no7: '其它'
    },
    orderMultiCheck: {
      no1: '调用接口发生异常',
      no2: '查询无结果',
      no3: '查询有结果',
      no4: '其它'
    }
  },
  idManage: {// 用户管理相关
    replace: '重置密码',
    del: '删除',
    id: '账号ID',
    name: '账户名',
    roleId: '角色',
    crumbsOne: '系统管理',
    crumbsTwo: '账号管理',
    userList: '账号列表',
    userName: '账户名',
    roleName: '角色身份',
    add: '添加账号',
    delRole: '确定要删除该账户吗',
    roleIdStatus: {
      no1: '产品',
      no2: '运营',
      no3: '商务',
      no4: '开发',
      no5: '初审',
      no6: '复审',
      no7: '其它'
    },
    order_options: {
      no1: '超级管理员',
      no2: '产品经理',
      no3: '开发工程师',
      no4: '商务经理'
    },
    adduser_options: {
      no1: '产品',
      no2: '运营',
      no3: '商务',
      no4: '开发'
    },
    no1: '账户名称',
    no2: '账户密码',
    no3: '删除成功',
    no4: '删除失败',
    no5: '修改成功',
    no6: '修改失败',
    no7: '账号名称',
    no8: '真实姓名',
    no9: '账号角色',
    no10: '账号密码',
    success: '添加成功',
    err: '添加失败'
  },
  permission: {// 用户权限相关
    crumbsOne: '权限管理',
    title: '角色权限管理列表',
    add: '添加角色',
    id: '角色ID',
    type: '角色',
    del: '删除',
    modify: '权限修改',
    delUser: '确定要删除该角色吗',
    modifyTitle: '权限修改',
    typeName: '角色名称',
    success: '添加成功',
    err: '添加失败'
  },
  proManage: {// 产品列表相关
    crumbsOne: '产品管理',
    crumbsTwo: '产品列表',
    crumbsThree: '常见问题',
    crumbsFour: 'APP包名管理',
    crumbsFive: '逾期分期',
    title: '产品管理列表',
    add: '增加产品',
    edit: '修改产品',
    id: '产品ID',
    amount: '借款本金',
    period: '借款周期',
    feeRate: '服务费率',
    dayInterest: '日利率',
    overdueInterest: '逾期费率',
    overdueMaxAmount: '逾期封顶',
    product: '产品',
    productAmount: '可贷金额',
    del: '确定要删除该卡片吗',
    overdueMaxDays: '最多逾期天数',
    canAdvanceDay: '可提前还款天数',
    canAdvanceType: '可提前还款类型',
    userGrade: '用户层级',
    faqSelect: {
      no1: '借款相关',
      no2: '还款相关'
    },
    userGrade_option: {
      no1: 'NORMAL',
      no2: 'WHITE',
      no3: 'GRAY1',
      no4: 'GRAY2',
      no5: 'GRAY4',
      no6: 'ALL'
    },
    faqId: '问题ID',
    faqTitle: '问题标题',
    request: '回答内容',
    faqState: '问题类型',
    joinTime: '添加时间',
    sure: '确定',
    delFaq: '确定删除该问题吗',
    copyPro:'复制产品',
    addBao:'添加包名',
    no1:'复制到',
    no2:'包ID',
    no3:'跳转APP包名',
    no4:'添加/修改数据',
    no5:'跳转到',
  },
  loanMoney: {// 借款管理相关
    crumbsOne: '借款管理',
    crumbsTwo: '还款列表',
    crumbsThr: '借款列表',
    crumbsFour: '放款列表',
    crumbsFive: '借款详情',
    title: '还款管理列表',
    title2: '借款管理列表',
    title3: '放款管理列表',
    placeholder: '请输入备注说明',
    resultStatus: '放款结果状态',
    resultDesc: '放款结果描述',
    orderDetail: '订单详情',
    isOverdue_options: {
      no1: '是',
      no2: '否'
    }
  },
  loanMoneyDetail: {// 借款详情相关
    userInfor: '用户信息',
    currentInterest: '利息费',
    feeAmount: '服务费',
    overdueInterest: '逾期费用',
    bankName: '收款银行名称',
    bankNo: '收款银行账号',
    opeHistory: '操作记录',
    opePeople: '操作人',
    opeType: '操作类型',
    opeTime: '操作时间',
    opeCon: '操作内容',
    opeType2: '审核类型',
    opeResult: '操作结果',
    loanMoney: '借款',
    putMoney: '放款',
    backMoney: '还款',
    loanMoneyRecordStatus: {
      no1: '机审',
      no2: '人工初审',
      no3: '人工复审',
      no4: '其它'
    },
    loanMoneyResultStatus: {
      no1: '通过',
      no2: '未通过',
      no3: '其它'
    },
    backMoneyResultStatus: {
      no1: '还款失败',
      no2: '当前订单不支持还款码操作',
      no3: '获取还款码失败',
      no4: '还款单创建失败',
      no5: '人工确认还款失败',
      no6: '部分还款',
      no7: '已还款',
      no8: '获取还款码成功',
      no9: '还款单创建成功',
      no10: '还款单创建中',
      no11: '人工确认还款成功',
      no12: '其它'
    },
    putMoneyResultStatus: {
      no1: '三方放款单创建失败',
      no2: '放款失败',
      no3: '待放款',
      no4: '三方订单创建成功',
      no5: '放款中',
      no6: '放款成功',
      no7: '其它'
    }
  },
  finance: {// 财务数据相关
    crumbsOne: '财务数据',
    crumbsTwo: '还款日志列表',
    crumbsThr: '放款日志列表',
    crumbsFour: '财务报表',
    repaymentNo: '还款流水',
    title2: '放款日志列表',
    createTime: '创建时间',
    channel: '通道',
    payType: '还款方式',
    feeAmount: '手续费',
    bluePaymentCode: '16位还款码',
    successTime: '打款成功时间',
    bluePromotionId: '渠道ID',
    bluePayeeCountry: '收款国家',
    bluePayeeAccount: '银行账户',
    bluePayeeType: '收款方',
    amount: '打款金额',
    blueCurrency: '币种',
    status: '打款状态',
    loanTime: '打款时间',
    dealId: '交易ID',
    dealCode: '交易申请码',
    dealType: '交易类型',
    successDate: '打款成功时间',
    account: '收款账户',
    putMoneyType: '放款类型',
    backLog_options_status: {// 还款日志下拉框状态共用
      no1: '还款失败',
      no2: '当前订单不支持还款码操作',
      no3: '获取还款码失败',
      no4: '还款单创建失败',
      no5: '人工确认还款失败',
      no6: '部分还款',
      no7: '已还款',
      no8: '获取还款码成功',
      no9: '还款单创建成功',
      no10: '还款单创建中',
      no11: '人工确认还款成功',
      no12: '-'
    },
    putLog_options_status: {// 放款日志下拉框状态共用
      no1: '三方放款单创建失败',
      no2: '放款失败',
      no3: '待放款',
      no4: '三方订单创建成功',
      no5: '放款中',
      no6: '放款成功',
      no7: '其它'
    },
    backMoneyType_options: {
      no1: 'ATM',
      no2: '便利店',
      no3: 'NL',
      no4: 'ECPAY',
      no5: 'ATM_ONLINE',
      no6: 'ATM_OFFLINE',
      no7: 'Viettel',
      no8: 'BIDV',
      no9: 'ACB',
    },
    thirdChannel_options: {
      no1: 'BluePay',
      no2: 'NganLuong',
      no3: 'dokypay',
    },
    putType: {
      no1: '借款',
      no2: '提现'
    }
  },
  riskManage: {// 风控审核管理
    crumbsOne: '风控审核管理',
    crumbsTwo: '人工初审列表',
    crumbsThr: '人工复审列表',
    crumbsFour: '人工审核统计',
    title1: '人工初审列表',
    title2: '人工复审列表',
    title3: '人工审核统计管理列表',
    selectTime: '时间选择',
    reviewCount: '审核单量',
    successCount: '审核成功单量',
    failCount: '审核失败单量',
    successRate: '审核通过率',
    recheckOrder_options: {
      no1: '人工复审不通过',
      no2: '待人工复审',
      no3: '人工复审通过'
    },
    auditType_status: {
      no1: '机审',
      no2: '人工初审',
      no3: '人工复审',
      no4: '未知'
    },
    auditTotal_options: {
      no1: '人工初审',
      no2: '人工复审'
    }
  },
  totalManage: {// 统计管理
    crumbsOne: '统计管理',
    crumbsTwo: '回款率报表',
    crumbsThr: '逾期率报表',
    crumbsFour: '通过率报表',
    timeSelect: '日期选择',
    applyCount: '申请单量',
    machineCount: '机审通过单量',
    firstCount: '人工初审通过单量',
    reviewCount: '人工复审通过单量',
    laveCount: '余件',
    returnCount: '应还单量',
    returnMoney: '应收金额',
    realReturnCount: '已还单量',
    realReturnMonry: '已还金额',
    noReturnCount: '未还单量',
    noReturnMonry: '未还金额',
    lendingCount: '放款单量',
    amount: '放款金额',
    overCount: '已还单量',
    firstRate: '首日逾期率',
    money: '金额',
    order: '单量',
    overDueNow: '当前逾期率',
    no1:'已还总金额',
    no2:'应还本金',
    no3:'应还利息',
    no4:'应还罚息',
    no5:'未还本金',
    no6:'未还利息',
    no7:'未还罚息',
    no8:'未还总金额',
  },
  OutsourcedManage:{// 委外管理
    no1:'委外管理',
    no2:'委外订单列表',
    no3:'每日委外统计',
    no4:'委外日期',
    no5:'委外公司',
    no6:'委外阶段',
    no7:'委案单量',
    no8:'委案金额',
    no9:'回款单量',
    no10:'回款金额',
    no11:'回款率',
    no12:'委外订单详情',
    no13:'撤回',
    no14:'个性分单',
    no15:'平均分单',
    no16:'个案件撤回委外资源池',
    no17:'未分配的单量',
    no18:'数值未超出',
    no19:'数值超出',
    no20:'请先输入分单数',
    no21:'总分配单量',
    no22:'已催回单量',
    no23:'待催单量',
    no24:'分配',
    no25:'账户',
    no26:'委外单量',
    no27:'委外金额',
    no28:'回款单量',
    no29:'回款金额',
    no30:'回款率',
    no31:'委外催回统计',
    no32:'催回日期',
  },
  auditManage:{// 审核管理
    no1:'审核管理',
  },
  loanAfterOperation: {// 贷后运营
    crumbsOne: '贷后运营',
    crumbsTwo: '总催回报表',
    crumbsThree: '催收短信模版',
    crumbsFour: '每日入催统计',
    title: '催收短信模版列表',
    collectionCnt: '催回单量',
    repaymentAmount: '催回金额',
    collectionRate: '催回金额占比',
    repaymentAmountRate: '催回单量占比',
    add: '添加模版',
    noteType: '短信类型',
    id: '短信ID',
    content: '短信内容',
    type: '短信类型',
    addNote: '添加短信模版',
    add1: '添 加',
    add2: '添加',
    del: '确认删除该短信模板吗',
    rucuiorder: '入催单量',
    rucuimoney: '入催金额'
  },
  loanAfterManage: {// 内催管理
    crumbsOne: '内催管理',
    crumbsTwo: '入催订单列表',
    crumbsThree: '入催订单详情',
    crumbsFour: '每日派单统计',
    crumbsFive: '每日催回统计',
    crumbssix: '还款码生成管理',
    crumbsSeven: '逾期优惠券申请',
    crumbsEight: '部分还款申请',
    couponStatus: '优惠券状态',
    couponEffectiveDate: '优惠时间',
    orderId: '催收ID',
    status: '催收状态',
    name: '催收员',
    time: '最后催收时间',
    type: '逾期类型',
    type1: '催收类型',
    waitAmount: '待还金额',
    redeploy: '转派',
    sel: '查看',
    redeployTo: '转派给',
    sure: '确认转派',
    paidanTime: '派单时间',
    userType: '用户角色',
    fenpeidanliang: '分配单量',
    yinghuanbenxi: '应还本息',
    total: '订单总数',
    num: '催回单数',
    money: '催回金额',
    historyMoney: '历史催收金额',
    nowMoney: '当前催收金额',
    alreadyMoney: '已催回金额',
    noneMoney: '待催金额',
    historyNum: '历史催收订单量',
    nowNum: '当前催收订单量',
    alreadyNum: '已催回订单量',
    noneNum: '待催订单量',
    reason: '转派原因',
    selFirst: '请先选择订单',
    adminFirst: '请先选择催收员',
    placeholder: '请填写转派原因',
    paycodeState: '还款码状态',
    paycodetime: '生成时间',
    payType: '还款方式',
    paycode: '还款码',
    lostTime: '失效时间',
    addPaycode: '生成还款码',
    firstOne: '请输入订单号',
    firstTwo: '请选择还款方式',
    zhuanpailiang: '转派单量',
    no1:'委外资源池',
    no2:'委外',
    no3:'委外给',
    paycompany: {
      no1: 'otc',
      no2: 'BNI',
      no3: 'Permate(BCA)',
      no4: 'Mandiri',
      no5: 'dandan',
      no6: 'lawson',
      no7: 'Permate(ITpay)',
    },
    collection_option: {
      no1: '挂断',
      no2: '未接',
      no3: '拒接',
      no4: '停机',
      no5: '关机',
      no6: '空号',
      no7: '手机号易主',
      no8: '拒绝还款',
      no9: '他人愿意转告',
      no10: '他人愿意代偿',
      no11: '投诉意向',
      no12: '有还款意向',
      no13: '无还款能力',
      no14: '承诺还款',
      no15: '还款掉单',
      no16: '其它',
      no17: '催收完成',
      no18: '其它',
      no19: '未处理',
      no20: '未提醒',
      no21: 'TLP WA',
      no22: 'SMS WA',
      no23: 'SMS',
    },
    fendan_option: {
      no1: '未处理',
      no2: '正常处理结束',
      no3: '转派',
      no4: '系统强制处理'
    },
    note_option: {
      no1: 'S1阶段',
      no2: 'S2阶段',
      no3: 'M1阶段',
      no4: 'M2阶段',
      no5: 'M3阶段',
      no6: '其它'
    },
    note_option1: {
      no1: 'S1',
      no2: 'S2',
      no3: 'M1',
      no4: 'M2',
      no5: 'M3',
      no6: '其它',
      no7: 'S3',
      no8: 'M3+'
    }
  },
  operationList: {
    crumbsOne: '催收管理',
    crumbsTwo: '我的催收订单',
    crumbsThree: '催收订单详情',
    crumbsFour: '工作分析',
    no1: '催收'
  },
  operationDetail: {
    no1: '身份证住址',
    no2: '借款ID',
    no3: '利率',
    no4: '逾期费率',
    no5: '逾期费',
    no6: '实际到账金额',
    no7: '是否承诺还款',
    no8: '承诺还款时间',
    no9: '备注',
    no10: '催收状态',
    no11: '是',
    no12: '否',
    no13: '联系方式',
    no14: '联系次数',
    no15: '次',
    no16: '催收类型',
    no17: '催收内容',
    no18: '催收员',
    no19: '催收时间',
    no20: '请选择状态',
    no21: '请选择是否承诺还款',
    no22: '提 交',
    no23: '接通状态',
    no24: '承诺还款',
    no25: '发送短信',
    no26: '承诺时间',
    no27: '输入承诺还款时间',
    no28: '请选择联系人',
    no29: '请选择短信模版',
    no30: '分配总单量',
    no31: '分配总金额',
    no32: '催回总单量',
    no33: '催回总金额',
    no34: '待催总单量',
    no35: '待催总金额',
    no36: '当日催回单量',
    no37: '当日催回金额',
    no38: '本周催回单量',
    no39: '本周催回金额',
    no40: '本月催回单量',
    no41: '本月催回金额',
    no42: '本周催回',
    no43: '本周分配',
    tab1: {
      no1: '用户信息',
      no2: '借款信息'
    },
    tab2: {
      no1: '催收记录',
      no2: '紧急联系人',
      no3: '通话联系人'
    },
    tab3: {
      no1: '电话催收',
      no2: '短信催收',
      no3: '特权申请',
    },
    type: {
      no1: '电话',
      no2: '短信'
    }
  },
  serviceManage: {
    crumbsOne: '客服管理',
    crumbsTwo: '到期未还订单列表',
    crumbsThree: '我的到期温提',
    crumbsFour: '电话来访记录',
    crumbsFive: '温提统计列表',
    service: '客服员',
    notice1: '已提醒',
    notice2: '未提醒',
    paidantime: '派单时间',
    telNotice: '电话提醒',
    telNoticeHis: '历史电话提醒',
    telNoticeOperation: '电话提醒操作',
    index: '序号',
    noticeTime: '提醒时间',
    telResult: '接听结果',
    isno: '是否承诺还款',
    isJoin: '是否注册',
    isLoan: '是否借款',
    isResult: '是否解决',
    requestDes: '问题描述',
    requestRes: '解答内容',
    add: '添加记录',
    firstOne: '请输入手机号',
    firstTwo: '请输入用户名',
    firstThree: '请输入问题',
    firstFour: '请输入答复',
    firstFive: '请选择是否解决',
    no1: '分配单量',
    no2: '提醒单量',
    no3: '已还款单量',
    no4: '未还款单量',
  },
  channelManage: {
    crumbsOne: '渠道管理',
    crumbsTwo: '渠道进件统计',
    crumbsThree: '渠道收支统计',
    crumbsFour: '渠道首逾统计',
    service: '客服员',
    name: '渠道名称',
    no1: '净件量',
    no2: '注册量',
    no3: '下载量',
    no4: '注册并下载量',
    no5: '总进件量',
    no6: '申请单量',
    no7: '放款单量',
    no8: '放款金额',
    no9: '还款单量',
    no10: '还款金额',
    no11: '逾期单量',
    no12: '逾期金额',
    no13: '激活转化率',
    no14: '申请笔数',
    no15: '申请转化率',
    no16: '放款笔数',
    no17: '放款转化率',
    no18: '添加渠道',
    no19: '渠道ID',
    no20: '渠道简称',
    no21: '渠道链接',
    no22: '作废',
    no23: '生效',
    no24: '渠道简称',
    no25: '链接参数',
    no26: '确定作启用该渠道链接，启用之后链接将可以访问',
    no27: '确定作作废该渠道链接，作废之后链接将不可访问'
  },
  staffManage: {
    crumbsOne: '员工管理',
    crumbsTwo: '信审员列表',
    crumbsThree: '信审小组',
    crumbsFour: '催收员列表',
    crumbsFive: '催收小组',
    crumbssix: '客服员列表',
    service: '客服小组',
    id: '账号ID',
    kefu: '客服',
    groupId: '小组ID',
    kefuzuyuan: '客服组员',
    xinshenyuan: '信审员'
  },
  websiteLoans:{
    no1:'官网贷款',
    no2:'用户提交列表',
    no3:'我的跟踪订单',
    no4:'贷款申请列表',
    no5:'贷款类型',
    no6:'跟踪员',
    no7:'申请额度',
    no8:'申请周期',
    no9:'补充材料',
    no10:'借款额度',
    no11:'借款周期',
    no12:'下载链接',
    no13:'跟踪时间',
    no14:'用户认领',
    loanType:{
      no1:'学生贷',
      no2:'租房贷',
      no3:'摩托车贷',
      no4:'love贷',
      no5:'visa贷',
      no6:'信用贷',
    },
    tailafterStatus:{
      no1:'已跟进',
      no2:'未跟进',
      no3:'已下载',
      no4:'已申请',
      no5:'拒绝申请',
      no6:'已注册',
      no7:'已无需求',
      no8:'已获得贷款',
      no9:'愿意申请',
      no10:'无人接听',
    }
  },
  operatorManage:{
    no1:'手动消息推送',
    no2:'内置消息推送',
    no3:'消息ID',
    no4:'发送类型',
    no5:'发送时间',
    no6:'消息发送',
    no7:'已推送消息数',
    no8:'已送达消息数',
    no9:'已点击消息数',
    no10:'发送标题',
    no11:'消息描述',
    no12:'消息内容',
    no13:'最新订单状态',
    no14:'成功还款次数',
    no15:'最大逾期天数',
    no16:'消息推送内容',
    no17:'发送对象设置',
    no18:'发送对象',
    no19:'发送标题',
    no20:'确定删除',
    no21:'群发优惠券',
    no22:'成功还款次数',
    no23:'用户上传',
    no24:'上传',
    sendType:{
      no1:'单发',
      no2:'群发',
    },
    sendObj:{
      no1:'完成注册',
      no2:'完成认证',
      no3:'认证失效',
      no4:'人工初审驳回',
      no5:'人工复审驳回',
      no6:'人工复审通过',
      no7:'放款失败',
      no8:'放款成功',
      no9:'到期前2天',
      no10:'到期前1天',
      no11:'到期当天',
      no12:'逾期1~3天',
      no13:'逾期4~7天',
      no14:'逾期8~10天',
      no15:'还款成功',
      no16:'还款失败',
      no17:'优惠券到账',
      no18:'优惠券到期前2天',
      no19:'优惠券到期前1天',
      no20:'优惠券到期当天',
      no21:'审核照片退回',
    }
  },
  public: {// 一些公共的经常出现的
    userId: '用户ID',
    registerUser: '注册用户',
    orderNo: '订单号',
    orderId: '订单ID',
    backId: '还款流水号',
    putId: '放款流水号',
    backMoneyId: '还款ID',
    userPhone: '手机号码',
    userTel: '手机号',
    registerPhone: '注册手机号',
    registerClient: '注册客户端',
    registerChannel: '注册渠道',
    userName: '用户姓名',
    name: '姓名',
    sex: '性别',
    birthday: '出生日期',
    approveStatus: '认证状态',
    historyOrder: '申请订单',
    lendingOrder: '借款成功订单',
    userDetail: '用户详情',
    userSelfStatus: '用户状态',
    inforStatus: '信息状态',
    bodyStatus: '身份状态',
    orderStatus: '订单状态',
    loanNum: '借款单数',
    isOverdue: '是否逾期',
    registerDate: '注册时间',
    submitDate: '提交时间',
    CreateDate: '申请时间',
    CreateTime: '应还时间',
    account: '收款账户',
    backMoneyDate: '还款时间',
    beginTime: '开始时间',
    endTime: '结束时间',
    select: '查询',
    excel: '导出Excel',
    operation: '操作',
    detail: '查看详情',
    placeholder: '请选择',
    addTotal: '总和',
    imgLimit: '图片大小不超过400K',
    no1: '真实姓名',
    no2: '身份证号',
    no3: '婚姻状况',
    no4: '生育状况',
    no5: '教育程度',
    no6: '当前所在地',
    no7: '详细地址',
    no8: '居住时间',
    no9: '单位名称',
    no10: '入职时间',
    no11: '单位职务',
    no12: '单位电话',
    no13: '每月收入',
    no14: '单位所在地址',
    no15: '单位详细地址',
    no16: '紧急联系人',
    no17: '关系',
    no18: '联系方式',
    no19: '银行名称',
    no20: '银行卡号',
    no21: '添加时间',
    no22: '状态',
    no23: '暂无数据',
    no24: '借款本金',
    no25: '借款周期',
    no26: '天',
    no27: '应还金额',
    no28: '逾期天数',
    no29: '查看',
    no30: '借款金额',
    no31: '借款周期',
    no32: '审核员',
    no33: '日期',
    no34: '借款所在地',
    no35: '身份验证',
    no36: '银行卡账户',
    no37: '备注',
    no38: '备注信息',
    no39: '联系人名称',
    no40: '联系结果',
    no41: '提交',
    no42: '请输入备注内容',
    no43: '是否逾期',
    no44: '联系次数',
    no45: '是否保存通讯录',
    no46: '联系状态',
    no47: '确认发送',
    no48: '提示',
    no49: '确认',
    no50: '取消',
    no51: '修改',
    no52: '合同下载',
    no53: '逾期',
    no54: '本金',
    no55: '利息',
    no56: '逾期罚息',
    no57: '还款金额',
    no58: '放款日期',
    no59: '应还日期',
    no60: '还款日期',
    no61: '确认还款',
    no62: '还款结果',
    no63: '当前住址',
    no64: '单位住址',
    no65: '已还金额',
    no66: '实际还款时间',
    no67: '确认放款',
    no68: '还款单状态',
    no69: '应还款日期',
    no70: '实际还款时间',
    no71: '入催时间',
    no72: '逾期减免',
    no73: '驳回',
    no74: '逾期优惠券审核',
    no75: '请选择优惠时间',
    no76: '审核',
    no77: '逾期优惠券查看',
    no78: '部分还款审核',
    no79: '部分还款查看',
    no80: '展示字段',
    no81: '还款码生成时间',
    no82: '结果创建时间',
    no83: '交易码',
    no84: '请上传图片',
    no85: '还款凭证',
    no86: '逾期服务费',
    no87: '分配日期',
    no88: '请输入必填项',
    no89: '请选择用户',
    no90: '派单日期',
  },
  tab: {// 用户详情选项卡
    no1: '身份验证信息',
    no2: '个人信息认证',
    no3: '工作单位信息',
    no4: '紧急联系人信息',
    no5: '银行卡信息',
    no6: '历史借款记录',
    no7: '优惠券'
  },
  tab2: {// 初审详情选项卡
    no1: '用户信息',
    no2: '通话记录信息',
    no3: '短信信息记录',
    no4: '历史借款记录',
    no5: '收款账户信息'
  },
  tab3: {// 复审详情选项卡
    no1: '用户信息',
    no2: '通话记录信息',
    no3: '短信信息记录',
    no4: '历史借款记录',
    no5: 'OCR身份检测',
    no6: '公司检测',
    no7: '多平台检测',
    no8: '反欺诈'
  },
  pic: {// 图片相关
    no1: '身份证照片',
    no2: '活体检测照片',
    no3: '工资单照片',
    no4: '身份证反面照片',
    no5: '公正正面照片',
    no6: '公正反面照片',
    no7: '银行卡照片',
    no8:'工作证明',
    no9:'工资单',
    no10:'存折',
    no11:'税卡',
    no12:'证件照',
    no13:'活体照',
    no14:'居住照',
    no15:'工作照',
    no16:'工资单照片',
    no17:'工牌',
    no18:'授权许可证',
  },
  back: {
    no1: '点击',
    no2: '返回上一页'
  },
  new: {
    no1: '指派',
    no2: '认领单量',
    no3: '逾期单量',
    no4: '逾期率',
    no5: '还款流水号',
    no6: '复审通过单量',
    no7: '复审通过率',
    no8: '跟踪状态',
    no9: '审核时间',
    no10: '退回',
    no11: '退回原因',
    no12: '催收阶段',
    no13: '认领时间',
    no14: '确认指派',
    no15: '指派给',
    no16: '指派原因',
    no17: '请填写指派原因',
    no18: '小组组名',
    no19: '小组组长',
    no20: '组名',
    no21: '组长',
    no22: '修改小组',
    no23: '小组名称',
    no24: '小组ID',
    no25: '创建小组',
    no26: '初审信审员',
    no27: '复审信审员',
    no28: '成立时间',
    no29: '小组成员',
    no30: '电审阶段',
    no31: '电审记录',
    no32: '已选中',
    no33: '未选中',
    no34: '提醒状态',
    no35: '请输入小组名称',
    no36: '请选择组长',
    no37: '已退回',
    no38: '退回次数',
    no39: '身份证正面照退回',
    no40: '身份证反面照退回',
    no41: '公证正面照退回',
    no42: '公证反面照退回',
    no43: '请输入问题类型',
    no44: '请输入问题标题',
    no45: '请输入问题答案',
    no46: '按比例',
    no47: '固定天数',
    no48: 'APP名',
    no49: 'APP包名',
    no50: '添加紧急联系人',
    no51: 'APP深夜登录次数',
    no52: '请选择关系',
    no53: '请输入姓名',
    no54: '请输入手机号',
    no55: 'WhatsApp',
    no56: '年龄',
    no57: '通话总时长',
    no58: '信审记录',
    no59: '审核阶段',
    no60: '部分还款',
    no61: '逾期减免',
    no62: '部分还款金额',
    no63: '减免金额',
    no64: '该订单暂时没有特权',
    no65: '添加特殊名单',
    no66: '死亡名单',
    no67: '优惠还款码',
    no68: '还款码有效期',
    no69:'概况分析',
    no70:'是否委外',
    no71:'分单占比',
    no72:'当前小组下没有组员',
    no73:'当前小组下有组员',
    no74:'是否新客',
    no75:'历史借款成功次数',
    no76:'逾期次数',
    no77:'最大逾期天数',
    no78:'历史还款次数',
    no79:'愿意还款',
    no80:'拒绝还款',
    no81:'无人接听',
    no82:'投诉倾向',
    no83:'最近群呼时间',
    no84:'最近群呼结果',
    no85:'接通',
    no86:'未接通',
    no87:'群呼时间',
    no88:'群呼结果',
    no89:'提交成功',
    no90:'提交失败',
    no91:'通话时长',
    no92:'是否紧急联系人',
    no93:'语音群呼结果',
    no94:'呼叫时间',
    no95:'呼叫结果',
    followStatus: {
      no1: '初审未跟踪',
      no2: '初审进行中',
      no3: '初审已跟踪',
      no4: '复审未跟踪',
      no5: '复审进行中',
      no6: '复审已跟踪'
    },
    followStatus1: {
      no1: '未跟踪',
      no2: '进行中',
      no3: '已跟踪',
      no4: '审核中',
      no5: '待提交补充资料',
    },
    noticeOption: {
      no1: '未提醒'
    }
  },
  yuenan: {
    no1: '身份证发行日期',
    no2: '当前所在省',
    no3: '当前所在县',
    no4: '当前所在街道',
    no5: '所在行业',
    no6: '单位所在省',
    no7: '单位所在县',
    no8: '单位所在街道',
    no9: '借款所在地理位置展示',
    no10: '收款账户',
    no11: '电子钱包',
    no12: '账号',
    no13: '最近催收记录',
    no14: '历史借款',
    no15: '单位所在市',
    no16: '当前所在楼盘',
    no17: '当前所在市',
    no18: '账户类型',
    no19: '邮箱',
    no20: '持卡人姓名',
    no21: '卡片时间',
    no22: '反馈类型',
    no23: '新号段',
    no24: '提醒次数',
    no25: '备选手机号',
    no26: '订单创建时间',
    no27: '还款渠道',
    no28: '正常还款单量',
    no29: '逾期还款单量',
    no30: '是否复制',
    no31: '复制',
    no32: '不是复制',
    no33: '个人主页',
    no34: '好友姓名',
    no35: '好友',
    no36: '发送类型',
    no37: '发送设备',
    no38: '消息推送',
    no39: '站内信',
    no40: '所有',
    no41: 'Android',
    no42: 'IOS',
    product: {
      no1: '可贷最小金额',
      no2: '可贷最大金额',
      no3: '金额区域增长',
      no4: '可借最短周期',
      no5: '可借最长周期',
      no6: '周期区域增长'
    },
    idType:{
      no1: 'CMND 1',
      no2: 'CMND 2',
      no3: 'CMND 3',
      no4: '未知',
    }
  },
  fei: {
    id: '证件ID号',
    idType: '证件类型',
    inComeDate: '工资发放日',
    loanId: '借款编号',
    back: '取款店',
    backCode: '取款码',
    xianzhi: '金额限制点',
    sanCode: '三方取款码',
    no1: '发送日期',
    no2: '发送状态',
    no3: '邮件发送',
    no4: '发件账户',
    no5: '邮件内容',
    no6: '发送数量',
    no7: '导出',
    no8:'运营商',
    no9:'大于0',
    no10:'0',
    no11:'审核资料补充',
    no12:'子女数量',
    no13:'银行账户图片',
    no14:'最后跟进时间',
    no15: '提醒次数',
    no16: '是否有效',
    no17: '分期期数',
    no18: '到期应还金额',
    no19: '最近应还日期',
    no20: '最大逾期天数',
    no21: '总逾期费',
    no22: '借款用途',
    no23: '分期还款计划',
    no24: '期数',
    no25: '每期逾期费',
    no26: '每期应还金额',
    no27: '每期已还金额',
    no28: '注册',
    no29: '申请',
    no30: '分期期数',
    no31: '逾期分期',
    no32: '应还金额最小值',
    no33: '应还金额最大值',
    no34: '每期天数',
    no35: '分期手续费率',
    no36: '应用阶段',
    no37: '逾期未还期数',
    no38: '最近还款时间',
    no39: '是否销账',
    no40: '还款期数',
    no41: '每期逾期罚息',
    no42: '未销账',
    no43: '已销账',
    no44: '逾期分期总金额',
    no45: '居住场所照',
    no46: '工作场所照',
    no47: '附加信息',
    no48: '暂无信息',
    no49: '埋点信息',
    no50: '补充信息',
    status:{
      no1: '下单成功',
      no2: '未到期',
      no3: '到期已还',
      no4: '到期未还',
      no5: '部分还款',
      no6: '逾期已还',
      no7: '逾期未还',
    }
  },
  couponSetting: {
    crumbsOne: '运营管理',
    crumbsTwo: '优惠券设置',
    edit: '添加优惠券'
  },
  filter: {
    orderId: '订单ID',
    userId: '用户ID',
    phone: '手机号',
    couponId: '优惠券ID',
    couponItem: '优惠项',
    couponTarget: '优惠对象',
    status: '状态',
    couponName: '优惠券名称',
    couponCon: '优惠内容',
    couponUnit: '优惠单位',
    validTime: '有效时间',
    popularizeTime: '推广时间',
    interest: '减免利息',
    usedDate: '使用时间',
    addModify: '添加/修改优惠券',
    addModifyActivity: '添加/修改优惠活动',
    addModifyOtherCoupon: '发放优惠券',
    couponUseStatus: {
      no1: '未使用',
      no2: '已使用',
      no3: '已过期',
      no4: '已提现',
      no5: '逾期优惠待审核',
      no6: '逾期优惠驳回'
    },
    couponType: {
      no1: '免息金额',
      no2: '免息天数',
      no3: '奖励金额',
      no4: '利息折扣',
      no5: '逾期优惠',
      no6: '逾期减免',
    },
    activityDateRange: '活动时间',
    dateRange: '开始时间',
    createDate: '开始时间',
    cashTime: '提现时间',
    getDate: '领取时间',
    adType: '广告类型',
    everyDayPut: '每日发行量',
    getNum: '领取量',
    twoGet: '复借次数',
    validType: '有效期类型',
    overdueOrderStatusOptions: {
      no1: '已还款',
      no2: '待还款',
      no3: '部分还款'
    },
    partialRepaymentApplyOption: {
      no1: '已还款',
      no2: '待还款',
      no3: '部分还款'
    },
    activityStatusOptions: {
      no1: '未开始',
      no2: '进行中',
      no3: '已结束'
    },
    couponStatusOptions: {
      no1: '未使用',
      no2: '已使用',
      no3: '已过期',
      no4: '已提现'
    },
    couponTargetOptions: {
      no1: '新注册用户',
      no2: '邀请成功放款（30天内）',
      no3: '正常还款',
      no4: '复借成功',
      no5: '邀请注册成功（30天内）',
      no6: '邀请申请借款（30天内）',
      no7: '邀请正常还款（30天内）',
    },
    adTypeOptions: {
      no1: '开屏广告',
      no2: '弹窗广告',
      no3: '浮窗广告'
    },
    adStatusOptions: {
      no1: '展示中',
      no2: '未开始',
      no3: '已结束'
    },
    overdueStatusOptions: {
      no1: '已使用',
      no2: '未使用',
      no3: '未发放',
      no4: '已驳回'
    },
    cashStatusOptions: {
      no1: '提现失败',
      no2: '待提现',
      no3: '提现中',
      no4: '提现成功'
    },
    expiryTypeOption: {
      no1: '时间范围',
      no2: '有效天数'
    },
    channelData: '渠道数据',
    timeSelect: '时间选择'
  },
  channelData: {
    crumbsOne: '运营数据',
    crumbsTwo: '渠道数据',
    day: '按日查看',
    week: '按周查看',
    mouth: '按月查看',
    no1: '日期',
    no2: '渠道名称',
    no3: '安装数',
    no4: '注册数',
    no5: '借款笔数',
    no6: '借款金额(本金)',
    no7: '放款笔数',
    no8: '放款金额(本金)',
    no9: '安装转化率',
    no10: '注册转化率',
    no11: '借款转化率',
    no12: '复借2次用户数',
    no13: '复借3次用户数',
    no14: '复借3次以上用户数',
    no15: '逾期总笔数',
    no16: '逾期总金额',
    no17: '黑名单命中率',
    no18: '占今日申请量比例',
    no19: '放款笔数',
    no20: '占今日放款量比例',
    no21: '黑名单命中个数',
    no22: '申请日期',
    no23: '申请笔数',
  },
  activity: {
    crumbsOne: '运营管理',
    crumbsTwo: '优惠活动列表',
    edit: '优惠活动'
  },
  otherCoupons: {
    crumbsOne: '运营管理',
    crumbsTwo: '其他优惠券',
    edit: '发放优惠券',
    no1: '优惠券状态',
    no2: '备注'
  },
  couponUsed: {
    crumbsOne: '运营管理',
    crumbsTwo: '优惠券使用',
    no1: '用户ID',
    no2: '优惠券ID',
    no3: '优惠项',
    no4: '优惠内容',
    no5: '有效天数',
    no6: '领取时间',
    no7: '有效时间',
    no8: '使用时间',
    no9: '状态'
  },
  popularizeList: {
    crumbsOne: '运营管理',
    crumbsTwo: '推广计划列表',
    edit: '添加推广计划',
    popupAd: '弹窗广告',
    floatAd: '浮窗广告',
    openScreenAd: '开屏广告',
    id: '推广ID',
    pic: '图片',
    href: '链接',
    putPic: '上传图片',
    addModify: '添加/修改推广计划'
  },
  inviteFriend: {
    crumbsOne: '运营数据',
    crumbsTwo: '邀请好友',
    no1: '放款成功订单',
    no2: '邀请放款成功（30天）',
    no3: '正常还款订单',
    no4: '逾期订单'
  },
  cash: {
    crumbsOne: '运营数据',
    crumbsTwo: '现金提现',
    no1: '提现ID',
    no2: '用户ID',
    no3: '提现金额',
    no4: '使用现金券',
    no5: '提现时间',
    no6: '提现状态',
    id: '优惠券ID'
  },
  yn:{
    no1:'放款处理中',
    no2:'还款处理中',
    no3:'已完成',
    no4:'处理问题',
    no5:'处理状态',
    no6:'待处理',
    no7:'已提交三方',
    no8:'已处理',
    no9:'处理',
    no10:'处理类型',
    no11:'还款状态未更新',
    no12:'用户未收到款项',
    no13:'还款待处理',
    no14:'放款待处理',
    no15:'还款成功时间',
    no16:'问题还款码',
    no17:'提报人员',
    no18:'处理时间',
    no19:'订单流水号',
    no20:'订单状态修改',
    no21:'宝付',
    no22:'合利宝',
    no23:'易宝',
    no24:'信用贷-代扣',
    no25:'订单创建时间',
    no26:'恢复催收',
    no27:'发薪日期',
    no28:'借款用途',
    no29:'电审录音',
    no30:'催收录音',
    no31:'呼叫时间',
    no32:'通话时长',
    no33:'被叫号码',
    no34:'播放',
    no35:'信审录音',
    no36:'他人替还标记审核',
    no37:'态度恶劣标记审核',
    no38:'提交催收员',
    no39:'审核时间',
    no40:'同意',
    no41:'驳回',
    no42:'是否同意',
    no43:'他人替还',
    no44:'态度恶劣',
    no45:'暂停',
    no46:'电话呼叫',
    no47:'审核结果',
    no48:'待审核',
    no49:'请谨慎判断，同意之后该用户便无法再次借款',
    no50:'客服录音',
    no51:'评分',
    no52:'无',
    loanUse:{
      'no1':'结婚',
      'no2':'装修',
      'no3':'购房',
      'no4':'看病',
      'no5':'旅游',
      'no6':'做生意',
      'no7':'生孩子',
      'no8':'缴纳学费',
      'no9':'聚会',
      'no10':'购车',
      'no11':'炒股票',
    }
  },
  add:{
    no1: '反馈类型',
    no2: '借款金额',
    no3: '逾期分期列表',
    no4: '逾期分期金额',
    no5: '必须满足一个条件',
    no6: '我的逾期分期订单',
    no7: '借款客户端',
    no8: 'Android',
    no9: 'IOS',
    no10: '所有',
    no11: '客服记录',
    no12: '客服阶段',
    no13: '机审通过率',
    no14: '人审通过率',
    no15: '放款通过率',
    no16: '首逾率',
    no17: '人审数据查看',
    no18: '审核日期',
    no19: '审核新客单量',
    no20: '新客通过单量',
    no21: '新客通过率',
    no22: '新客首逾率',
    no23: '审核老客单量',
    no24: '老客通过单量',
    no25: '老客通过率',
    no26: '老客首逾率',
    no27: '总通过率',
    no28: '总首逾率',
    no29: '今日',
    no30: '昨日',
    no31: '本周',
    no32: '上周',
    no33: '新客机审驳回前五的原因占比',
    no34: '新客人审驳回前五的原因占比',
    no35: '拒绝原因',
    no36: '驳回占比',
    no37: '请选择对应的逾期类型进行分单',
    no38: '',
    no39: '机审驳回查看',
    no40: '新客初审驳回前五的原因占比',
    no41: '新客复审驳回前五的原因占比',
    no42: '温提',
    no43: '到期日期',
    no44: '系统配置',
    no45: '规则引擎',
    no46: '是否挂起',
    no47: '重新放款',
    no48: '历史成功放款次数',
    no49: '银行卡有效期年',
    no50: '请联系用户确认以下账户信息是否正确',
    no51: '放款渠道',
    no52: '还款流水状态',
    no53: '还款成功',
    no54: '身份证类型',
    no55: '请选择身份证类型',
    no56: '银行卡有效期月',
    no57: '开户行地址',
    no58: '申请GPS地址',
    no59: '家庭地址',
    no60: '公司地址',
    no61: '*该用户为复借用户，无须进行资料审核，但必须确认用户的当前工作状态',
    no62: '工作经营状态',
    no63: '无变化',
    no64: '已换工作',
    no65: '失业/倒闭',
    no66: '请先完成所有审核内容',
    no67: '通过',
    no68: '拒绝',
    no69: '申请渠道',
    no70: '注册渠道',
    no71: '转电销',
    no72: '营销转化',
    no73: '用户数量',
    no74: '导流APP链接',
    no75: '手动个性分单',
    no76: '未分配的老客单量',
    no77: '未分配的新客单量',
    no78: '分配新客',
    no79: '分配老客',
  },
  ...zhLocale
}
export default cn
