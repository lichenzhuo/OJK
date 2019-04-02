const options = {
  state: {
    order_select: [// 订单状态
      {value: '', label: 'public.placeholder'},
      {value: '-10', label: 'userDetail.reject_status.no1'}, // 机审驳回
      {value: '-11', label: 'userDetail.reject_status.no23'}, // 机审失败
      {value: '-20', label: 'userDetail.reject_status.no2'}, // 人工初审驳回
      {value: '-30', label: 'userDetail.reject_status.no3'}, // 人工复审驳回
      {value: '-40', label: 'userDetail.reject_status.no4'}, // 三方放款单创建失败
      {value: '-41', label: 'userDetail.reject_status.no5'}, // 放款失败
      {value: '-50', label: 'userDetail.reject_status.no6'}, // 还款失败
      {value: '-60', label: 'userDetail.reject_status.no7'}, // 已逾期
      {value: '-70', label: 'userDetail.reject_status.no8'}, // 已坏账
      {value: '1', label: 'userDetail.reject_status.no9'}, // 待机审
      {value: '10', label: 'userDetail.reject_status.no10'}, // 机审通过
      {value: '20', label: 'userDetail.reject_status.no11'}, // 待人工初审
      {value: '21', label: 'userDetail.reject_status.no12'}, // 人工初审通过
      {value: '30', label: 'userDetail.reject_status.no13'}, // 待人工复审
      {value: '31', label: 'userDetail.reject_status.no14'}, // 人工复审通过
      {value: '40', label: 'userDetail.reject_status.no15'}, // 待放款
      {value: '41', label: 'userDetail.reject_status.no16'}, // 三方订单创建成功
      {value: '42', label: 'userDetail.reject_status.no17'}, // 放款中
      {value: '43', label: 'userDetail.reject_status.no18'}, // 放款成功
      {value: '50', label: 'userDetail.reject_status.no19'}, // 部分还款
      {value: '51', label: 'userDetail.reject_status.no20'}// 已还款
    ],
    backOrder_status:[
      {value: '', label: 'public.placeholder'},
      {value: '50', label: 'userDetail.reject_status.no19'}, // 部分还款
      {value: '51', label: 'userDetail.reject_status.no20'}// 已还款
    ],
    loanMoney_options: [// 借款列表订单状态
      {value: '', label: 'public.placeholder'},
      {value: '-10', label: 'userDetail.reject_status.no1'}, // 机审驳回 3
      {value: '-20', label: 'userDetail.reject_status.no2'}, // 人工初审驳回 5
      {value: '-30', label: 'userDetail.reject_status.no3'}, // 人工复审驳回 8
      {value: '1', label: 'userDetail.reject_status.no9'}, // 待机审 1
      {value: '10', label: 'userDetail.reject_status.no10'}, // 机审通过 2
      {value: '20', label: 'userDetail.reject_status.no11'}, // 待人工初审 6
      {value: '21', label: 'userDetail.reject_status.no12'}, // 人工初审通过 4
      {value: '30', label: 'userDetail.reject_status.no13'}, // 待人工复审 9
      {value: '31', label: 'userDetail.reject_status.no14'}// 人工复审通过 7
    ],
    putMoney_options: [// 放款订单状态下拉框
      {value: '', label: 'public.placeholder'},
      {value: '-41', label: 'userDetail.reject_status.no5'}, // 放款失败
      {value: '40', label: 'userDetail.reject_status.no15'}, // 待放款
      {value: '42', label: 'userDetail.reject_status.no17'}, // 放款中
      {value: '43', label: 'userDetail.reject_status.no18'}// 放款成功
    ],
    backMoney_options: [// 还款订单状态下拉框
      {value: '', label: 'public.placeholder'},
      {value: '-50', label: 'userDetail.reject_status.no6'}, // 还款失败
      {value: '50', label: 'userDetail.reject_status.no19'}, // 部分还款
      {value: '51', label: 'userDetail.reject_status.no20'}, // 已还款
      {value: '43', label: 'userDetail.reject_status.no22'}// 待还款
    ],
    telStatus_select: [// 电话状态分类
      {value: '', label: 'public.placeholder'},
      {value: '-1', label: 'myAuditList.telThrough_status.no1'}, // 未接
      {value: '-2', label: 'myAuditList.telThrough_status.no2'}, // 关机
      {value: '-3', label: 'myAuditList.telThrough_status.no3'}, // 停机
      {value: '-4', label: 'myAuditList.telThrough_status.no4'}, // 空号
      {value: '-5', label: 'myAuditList.telThrough_status.no5'}, // 接通真实
      {value: '1', label: 'myAuditList.telThrough_status.no6'} // 关系有假
    ],
    userOrderStatus: [// 用户身份下拉框
      {value: '', label: 'public.placeholder'},
      { value: '1', label: 'idManage.order_options.no1' }, // 超级管理员
      { value: '2', label: 'idManage.order_options.no2' }, // 产品经理
      { value: '3', label: 'idManage.order_options.no3' }, // 开发工程师
      { value: '4', label: 'idManage.order_options.no4' }// 商务经理
    ],
    backMoneyLog_select: [// 还款日志下拉框
      {value: '', label: 'public.placeholder'},
      { value: '-50', label: 'finance.backLog_options_status.no1' }, // 还款失败
      { value: '-51', label: 'finance.backLog_options_status.no2' }, // 当前订单不支持还款码操作
      { value: '-52', label: 'finance.backLog_options_status.no3' }, // 获取还款码失败
      { value: '-53', label: 'finance.backLog_options_status.no4' }, // 还款单创建失败
      { value: '-54', label: 'finance.backLog_options_status.no5' }, // 人工确认还款失败
      { value: '50', label: 'finance.backLog_options_status.no6' }, // 部分还款
      { value: '51', label: 'finance.backLog_options_status.no7' }, // 已还款
      { value: '52', label: 'finance.backLog_options_status.no8' }, // 获取还款码成功
      { value: '53', label: 'finance.backLog_options_status.no9' }, // 还款单创建成功
      { value: '54', label: 'finance.backLog_options_status.no10' }, // 还款单创建中
      { value: '55', label: 'finance.backLog_options_status.no11' }// 人工确认还款成功
    ],
    putMoneyLog_select: [// 放款日志下拉框
      {value: '', label: 'public.placeholder'},
      { value: '-40', label: 'finance.putLog_options_status.no1' }, // 三方放款单创建失败
      { value: '-41', label: 'finance.putLog_options_status.no2' }, // 放款失败
      { value: '40', label: 'finance.putLog_options_status.no3' }, // 待放款
      { value: '41', label: 'finance.putLog_options_status.no4' }, // 三方订单创建成功
      { value: '42', label: 'finance.putLog_options_status.no5' }, // 放款中
      { value: '43', label: 'finance.putLog_options_status.no6' }// 放款成功
    ],
    putMoneyLog_putType: [// 放款日志放款类型下拉框
      {value: '', label: 'public.placeholder'},
      { value: '1', label: 'finance.putType.no1' }, // 借款
      { value: '2', label: 'finance.putType.no2' } // 提现
    ],
    thirdChannel: [// 第三方通道
      {value: '', label: 'public.placeholder'},
      {value: 'bluepay', label: 'finance.thirdChannel_options.no1'},// bluepay
      {value: 'dokypay', label: 'finance.thirdChannel_options.no3'},// dokypay
    ],
    thirdChannel_vi: [// 第三方通道
      {value: '', label: 'public.placeholder'},
      {value: 'NganLuong', label: 'finance.thirdChannel_options.no2'}// NganLuong
    ],
    approveStatus_options: [// 信息认证状态
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'userList.approveStatus_option.no1'}, // 已认证
      {value: '2', label: 'userList.approveStatus_option.no2'}, // 未认证
      {value: '3', label: 'userList.approveStatus_option.no3'}, // 部分认证
      {value: '-2', label: 'userList.approveStatus_option.no4'}// 认证失效
    ],
    blackStatus_options: [// 身份状态下拉选框信息
      {value: '', label: 'public.placeholder'},
      {value: '-1', label: 'userList.blackStatus_option.no1'}, // 黑名单
      {value: '2', label: 'userList.blackStatus_option.no2'}, // 白名单
      {value: '-2', label: 'userList.blackStatus_option.no3'}, // 灰名单
      {value: '-3', label: 'new.no66'},  // 死亡名单
      {value: '1', label: 'userList.blackStatus_option.no4'}// 正常
    ],
    suggest_option: [// 用户建议已反馈未反馈
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'userSuggest.suggest_option.no3'}, // 已回复
      {value: '2', label: 'userSuggest.suggest_option.no2'}, // 未处理
      {value: '3', label: 'userSuggest.suggest_option.no1'} // 已处理
    ],
    sugType_option: [// 用户建议反馈类型
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'userSuggest.sugType.no1'}, // 还款反馈
      {value: '2', label: 'userSuggest.sugType.no2'}, // 产品建议
      {value: '3', label: 'userSuggest.sugType.no3'} // 放款反馈
    ],
    suggest_option_allData: [// 用户建议已反馈未反馈
      {value: '', label: 'public.placeholder'},
      {value: '3', label: 'userSuggest.suggest_option.no1'} // 已处理
    ],
    peopleAuditOne_option: [// 人工初审结果
      {value: '', label: 'public.placeholder'}, //
      {value: '1', label: 'myAuditList.no12'}, // 人工初审通过
      {value: '-1', label: 'myAuditList.no13'}// 人工初审驳回
    ],
    peopleAuditTwo_option: [// 人工复审结果
      {value: '', label: 'public.placeholder'}, //
      {value: '1', label: 'myAuditList.no14'}, // 人工复审通过
      {value: '-1', label: 'myAuditList.no15'}// 人工复审驳回
    ],
    addUser_option: [// 添加用户身份
      {value: '1', label: 'idManage.adduser_options.no1'}, // 产品
      {value: '2', label: 'idManage.adduser_options.no2'}, // 运营
      {value: '3', label: 'idManage.adduser_options.no3'}, // 商务
      {value: '4', label: 'idManage.adduser_options.no4'}, // 开发
      {value: '5', label: 'idManage.adduser_options.no5'}, // 初审
      {value: '6', label: 'idManage.adduser_options.no6'}// 复审
    ],
    isOverdue_option: [// 是否逾期
      {value: '', label: 'public.placeholder'}, //
      {value: '1', label: 'loanMoney.isOverdue_options.no1'}, // 是
      {value: '-1', label: 'loanMoney.isOverdue_options.no2'}// 否
    ],
    isout_option: [// 是否委外
      {value: '', label: 'public.placeholder'}, //
      {value: 2, label: 'loanMoney.isOverdue_options.no1'}, // 是
      {value: 1, label: 'loanMoney.isOverdue_options.no2'}// 否
    ],
    partialRepaymentApplyPayTypeOption: [// 还款方式
      {value: 'permata', label: 'finance.partialRepaymentApplyPayTypeOption.no1'},
      {value: 'mandiri', label: 'finance.partialRepaymentApplyPayTypeOption.no2'},
      {value: 'bni', label: 'finance.partialRepaymentApplyPayTypeOption.no3'},
      {value: 'otc', label: 'finance.partialRepaymentApplyPayTypeOption.no4'},
      {value: 'dandan', label: 'finance.partialRepaymentApplyPayTypeOption.no5'},
      {value: 'lawson', label: 'finance.partialRepaymentApplyPayTypeOption.no6'},
    ],
    channelAll_option: [// 支付方式
      {value: '', label: 'public.placeholder'},
      {value: 'otc', label: 'loanAfterManage.paycompany.no1'}, // otc
      {value: 'bni', label: 'loanAfterManage.paycompany.no2'}, // BNI
      {value: 'permata', label: 'loanAfterManage.paycompany.no3'}, // Permate(BCA)
      {value: 'mandiri', label: 'loanAfterManage.paycompany.no4'},// Mandiri
      {value: 'dandan', label: 'loanAfterManage.paycompany.no5'}, // dandan
      {value: 'lawson', label: 'loanAfterManage.paycompany.no6'}// lawson
    ],
    backMoneyType_option: [// 还款方式
      {value: '', label: 'public.placeholder'},
      {value: 'atm', label: 'finance.backMoneyType_options.no1'}, // ATM
      {value: 'otc', label: 'finance.backMoneyType_options.no2'} // 便利店
    ],
    backMoneyType_option_vi: [// 还款方式
      {value: '', label: 'public.placeholder'},
      {value: 'NL', label: 'finance.backMoneyType_options.no3'}, // NL
      {value: 'ATM_ONLINE', label: 'finance.backMoneyType_options.no5'}, // ATM_ONLINE
      {value: 'ATM_OFFLINE', label: 'finance.backMoneyType_options.no6'}, // ATM_OFFLINE
      {value: 'VN_BANK', label: 'finance.backMoneyType_options.no7'}, // VN_BANK
    ],
    backMoneyType_option_PHL: [// 还款方式
      {value: '', label: 'public.placeholder'},
      {value: 'ECPAY', label: 'finance.backMoneyType_options.no4'}// ECPAY
    ],
    peopleAuditOneStatus_options: [// 我的初审订单状态下拉框
      {value: '', label: 'public.placeholder'},
      {value: '-20', label: 'userDetail.reject_status.no2'}, // 人工初审驳回
      {value: '20', label: 'userDetail.reject_status.no11'}, // 待人工初审
      {value: '21', label: 'userDetail.reject_status.no12'}// 人工初审通过
    ],
    peopleAuditOneStatus_options1: [// 初审订单审核状态下拉框
      {value: '', label: 'public.placeholder'},
      {value: '-20', label: 'userDetail.reject_status.no2'}, // 人工初审驳回
      {value: '10', label: 'userDetail.reject_status.no10'}, // 机审通过
      {value: '20', label: 'userDetail.reject_status.no11'}, // 待人工初审
      {value: '21', label: 'userDetail.reject_status.no12'}// 人工初审通过
    ],
    recheckOrder_option: [// 我的复审列表订单状态下拉选框信息
      {value: '', label: 'public.placeholder'},
      {value: '-30', label: 'riskManage.recheckOrder_options.no1'}, // 人工复审不通过
      {value: '30', label: 'riskManage.recheckOrder_options.no2'}, // 待人工复审
      {value: '31', label: 'riskManage.recheckOrder_options.no3'}// 人工复审通过
    ],
    recheckOrder_option1: [// 复审列表订单审核状态下拉选框信息
      {value: '', label: 'public.placeholder'},
      {value: '-30', label: 'riskManage.recheckOrder_options.no1'}, // 人工复审不通过
      {value: '30', label: 'riskManage.recheckOrder_options.no2'}, // 待人工复审
      {value: '31', label: 'riskManage.recheckOrder_options.no3'}, // 人工复审通过
      {value: '21', label: 'userDetail.reject_status.no12'}// 人工初审通过
    ],
    auditTotal_option: [// 审核统计查询栏下拉框
      {value: '', label: 'public.placeholder'},
      {value: '2', label: 'riskManage.auditTotal_options.no1'}, // 人工初审
      {value: '3', label: 'riskManage.auditTotal_options.no2'}// 人工复审
    ],
    note_option: [// 短信类型阶段下拉框
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'loanAfterManage.note_option.no1'}, // S1
      {value: '2', label: 'loanAfterManage.note_option.no2'}, // S2
      {value: '3', label: 'loanAfterManage.note_option.no3'}, // M1
      {value: '4', label: 'loanAfterManage.note_option.no4'}, // M2
      {value: '5', label: 'loanAfterManage.note_option.no5'}// M3
    ],
    note_option_two: [// 短信类型阶段下拉框
      {value: '1', label: 'loanAfterManage.note_option.no1'}, // S1
      {value: '2', label: 'loanAfterManage.note_option.no2'}, // S2
      {value: '3', label: 'loanAfterManage.note_option.no3'}, // M1
      {value: '4', label: 'loanAfterManage.note_option.no4'}, // M2
      {value: '5', label: 'loanAfterManage.note_option.no5'}// M3
    ],
    collection_option: [// 催收状态
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'loanAfterManage.collection_option.no19'}, // 未处理
      {value: '10', label: 'loanAfterManage.collection_option.no1'}, // 挂断
      {value: '11', label: 'loanAfterManage.collection_option.no2'}, // 未接
      {value: '12', label: 'loanAfterManage.collection_option.no3'}, // 拒接
      {value: '13', label: 'loanAfterManage.collection_option.no4'}, // 停机
      {value: '14', label: 'loanAfterManage.collection_option.no5'}, // 关机
      {value: '15', label: 'loanAfterManage.collection_option.no6'}, // 空号
      {value: '16', label: 'loanAfterManage.collection_option.no7'}, // 手机号易主
      {value: '20', label: 'loanAfterManage.collection_option.no8'}, // 拒绝还款
      {value: '21', label: 'loanAfterManage.collection_option.no9'}, // 他人愿意转告
      {value: '22', label: 'loanAfterManage.collection_option.no10'}, // 他人愿意代偿
      {value: '23', label: 'loanAfterManage.collection_option.no11'}, // 投诉意向
      {value: '24', label: 'loanAfterManage.collection_option.no12'}, // 有还款意向
      {value: '25', label: 'loanAfterManage.collection_option.no13'}, // 无还款能力
      {value: '26', label: 'loanAfterManage.collection_option.no14'}, // 承诺还款
      {value: '30', label: 'loanAfterManage.collection_option.no15'}, // 还款掉单
      {value: '40', label: 'loanAfterManage.collection_option.no16'}, // 其他
      {value: '41', label: 'loanAfterManage.collection_option.no21'}, // TLP WA
      {value: '42', label: 'loanAfterManage.collection_option.no22'}, // SMS WA
      {value: '43', label: 'loanAfterManage.collection_option.no23'}, // SMS
      {value: '100', label: 'loanAfterManage.collection_option.no17'}// 催收完成
    ],
    collection_option_submit: [// 催收详情接通状态下拉框
      {value: '', label: 'public.placeholder'},
      {value: '10', label: 'loanAfterManage.collection_option.no1'}, // 挂断
      {value: '11', label: 'loanAfterManage.collection_option.no2'}, // 未接
      {value: '12', label: 'loanAfterManage.collection_option.no3'}, // 拒接
      {value: '13', label: 'loanAfterManage.collection_option.no4'}, // 停机
      {value: '14', label: 'loanAfterManage.collection_option.no5'}, // 关机
      {value: '15', label: 'loanAfterManage.collection_option.no6'}, // 空号
      {value: '16', label: 'loanAfterManage.collection_option.no7'}, // 手机号易主
      {value: '20', label: 'loanAfterManage.collection_option.no8'}, // 拒绝还款
      {value: '21', label: 'loanAfterManage.collection_option.no9'}, // 他人愿意转告
      {value: '22', label: 'loanAfterManage.collection_option.no10'}, // 他人愿意代偿
      {value: '23', label: 'loanAfterManage.collection_option.no11'}, // 投诉意向
      {value: '24', label: 'loanAfterManage.collection_option.no12'}, // 有还款意向
      {value: '25', label: 'loanAfterManage.collection_option.no13'}, // 无还款能力
      {value: '26', label: 'loanAfterManage.collection_option.no14'}, // 承诺还款
      {value: '30', label: 'loanAfterManage.collection_option.no15'}, // 还款掉单
      {value: '41', label: 'loanAfterManage.collection_option.no21'}, // TLP WA
      {value: '42', label: 'loanAfterManage.collection_option.no22'}, // SMS WA
      {value: '43', label: 'loanAfterManage.collection_option.no23'}, // SMS
      {value: '40', label: 'loanAfterManage.collection_option.no16'} // 其他
    ],
    follow_option: [// 跟踪状态
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'new.followStatus1.no1'}, // 未跟踪
      {value: '2', label: 'new.followStatus1.no2'}, // 进行中
      {value: '3', label: 'new.followStatus1.no3'}// 已跟踪
    ],
    follow_option2: [// 跟踪状态
      {value: '', label: 'public.placeholder'},
      {value: '4', label: 'new.followStatus1.no1'}, // 未跟踪
      {value: '5', label: 'new.followStatus1.no2'}, // 进行中
      {value: '6', label: 'new.followStatus1.no3'}// 已跟踪
    ],
    faq_option: [// 常见问题选择类型
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'proManage.faqSelect.no1'}, // 借款相关
      {value: '2', label: 'proManage.faqSelect.no2'}// 还款相关
    ],
    faq_option2: [// 常见问题选择类型
      {value: '1', label: 'proManage.faqSelect.no1'}, // 借款相关
      {value: '2', label: 'proManage.faqSelect.no2'}// 还款相关
    ],
    paymentCode_option: [// 还款码状态
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'userDetail.bankId_status.no1'}, // 有效
      {value: '-1', label: 'userDetail.bankId_status.no2'}// 无效
    ],
    overdueRemind_option: [// 我的到期温提提醒状态
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'serviceManage.notice1'}, // 已提醒
      {value: '2', label: 'serviceManage.notice2'}// 未提醒
    ],
    
    notice_option: [// 提醒状态下拉框
      {value: '', label: 'public.placeholder'},
      {value: '-1', label: 'new.noticeOption.no1'}, // 未提醒
      {value: '10', label: 'loanAfterManage.collection_option.no1'}, // 挂断
      {value: '11', label: 'loanAfterManage.collection_option.no2'}, // 未接
      {value: '12', label: 'loanAfterManage.collection_option.no3'}, // 拒接
      {value: '13', label: 'loanAfterManage.collection_option.no4'}, // 停机
      {value: '14', label: 'loanAfterManage.collection_option.no5'}, // 关机
      {value: '15', label: 'loanAfterManage.collection_option.no6'}, // 空号
      {value: '16', label: 'loanAfterManage.collection_option.no7'}, // 手机号易主
      {value: '20', label: 'loanAfterManage.collection_option.no8'}, // 拒绝还款
      {value: '24', label: 'loanAfterManage.collection_option.no12'}, // 有还款意向
      {value: '25', label: 'loanAfterManage.collection_option.no13'}, // 无还款能力
      {value: '26', label: 'loanAfterManage.collection_option.no14'}, // 承诺还款
      {value: '40', label: 'loanAfterManage.collection_option.no16'}// 其他
    ],
    notice_option2: [// 提醒状态下拉框
      {value: '', label: 'public.placeholder'},
      {value: '10', label: 'loanAfterManage.collection_option.no1'}, // 挂断
      {value: '11', label: 'loanAfterManage.collection_option.no2'}, // 未接
      {value: '12', label: 'loanAfterManage.collection_option.no3'}, // 拒接
      {value: '13', label: 'loanAfterManage.collection_option.no4'}, // 停机
      {value: '14', label: 'loanAfterManage.collection_option.no5'}, // 关机
      {value: '15', label: 'loanAfterManage.collection_option.no6'}, // 空号
      {value: '16', label: 'loanAfterManage.collection_option.no7'}, // 手机号易主
      {value: '20', label: 'loanAfterManage.collection_option.no8'}, // 拒绝还款
      {value: '24', label: 'loanAfterManage.collection_option.no12'}, // 有还款意向
      {value: '25', label: 'loanAfterManage.collection_option.no13'}, // 无还款能力
      {value: '26', label: 'loanAfterManage.collection_option.no14'}, // 承诺还款
      {value: '40', label: 'loanAfterManage.collection_option.no16'} // 其他
    ],
    registerClient: [
      {value: '', label: 'public.placeholder'},
      // {value: "2",label: "userDetail.client_status.no1"},// 微信
      {value: '3', label: 'userDetail.client_status.no2'}, // PC
      {value: '4', label: 'userDetail.client_status.no3'}, // 安卓
      {value: '5', label: 'userDetail.client_status.no4'}// ios
    ],
    userGrade_option: [
      {value: '01', label: 'proManage.userGrade_option.no1'}, // NORMAL
      {value: '02', label: 'proManage.userGrade_option.no2'}, // WHITE
      {value: 'H1', label: 'proManage.userGrade_option.no3'}, // GRAY1
      {value: 'H2', label: 'proManage.userGrade_option.no4'}, // GRAY2
      {value: 'H3', label: 'proManage.userGrade_option.no5'}, // GRAY3
      {value: '11', label: 'proManage.userGrade_option.no6'} // ALL
    ],
    couponType_option: [
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'filter.couponType.no1'}, // 免息金额
      {value: '2', label: 'filter.couponType.no2'}, // 免息天数
      {value: '3', label: 'filter.couponType.no3'}, // 奖励金额
      {value: '4', label: 'filter.couponType.no4'} // 利息折扣
    ],
    couponType_option_PHL: [
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'filter.couponType.no1'}, // 免息金额
      {value: '2', label: 'filter.couponType.no2'}, // 免息天数
      {value: '3', label: 'filter.couponType.no3'}, // 奖励金额
      {value: '4', label: 'filter.couponType.no4'}, // 利息折扣
      {value: '5', label: 'filter.couponType.no6'} // 逾期减免
    ],
    //   24:有还款意向, 25:无还款能力, 26:承诺还款, 40:其他）',
    // permata， mandiri， bni， otc
    couponType: [
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'filter.couponType.no1'}, // 免息金额
      {value: 2, label: 'filter.couponType.no2'}, // 免息天数
      {value: 3, label: 'filter.couponType.no3'}, // 奖励金额
      {value: 4, label: 'filter.couponType.no4'} // 利息折扣
    ],
    activityStatusOptions: [
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'filter.activityStatusOptions.no1'}, // 未开始
      {value: 2, label: 'filter.activityStatusOptions.no2'}, // 进行中
      {value: 3, label: 'filter.activityStatusOptions.no3'} // 已结束
    ],
    couponStatusOptions: [
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'filter.couponStatusOptions.no1'}, // 未使用
      {value: -1, label: 'filter.couponStatusOptions.no2'}, // 已使用
      {value: -2, label: 'filter.couponStatusOptions.no3'}, // 已过期
      {value: -3, label: 'filter.couponStatusOptions.no4'} // 已提现
    ],
    couponTargetOptions: [
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'filter.couponTargetOptions.no1'}, // 新注册用户
      {value: 2, label: 'filter.couponTargetOptions.no2'}, // 邀请成功放款（30天内）
      {value: 3, label: 'filter.couponTargetOptions.no3'}, // 正常还款
      {value: 4, label: 'filter.couponTargetOptions.no4'}, // 复借成功
      {value: 6, label: 'filter.couponTargetOptions.no5'}, // 注册
      {value: 7, label: 'filter.couponTargetOptions.no6'}, // 申请
      {value: 8, label: 'filter.couponTargetOptions.no7'} // 正常还款
    ],
    periodTypeOption: [
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'filter.expiryTypeOption.no1'}, // 时间范围
      {value: 2, label: 'filter.expiryTypeOption.no2'} // 有效天数
    ],
    adTypeOptions: [
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'filter.adTypeOptions.no1'}, // 开屏广告
      {value: 2, label: 'filter.adTypeOptions.no2'}, // 弹窗广告
      {value: 3, label: 'filter.adTypeOptions.no3'} // 浮窗广告
    ],
    adStatusOptions: [
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'filter.adStatusOptions.no1'}, // 展示中
      {value: 2, label: 'filter.adStatusOptions.no2'}, // 未开始
      {value: 3, label: 'filter.adStatusOptions.no3'} // 已结束
    ],
    overdueOrderStatusOptions: [ // 逾期优惠券页面订单状态
      {value: '', label: 'public.placeholder'},
      {value: 51, label: 'filter.overdueOrderStatusOptions.no1'}, // 已还款
      {value: 43, label: 'filter.overdueOrderStatusOptions.no2'}, // 待还款
      {value: 50, label: 'filter.overdueOrderStatusOptions.no3'}  // 部分还款
    ],
    partialRepaymentApplyOption: [ // 部分还款页面订单状态
      {value: '', label: 'public.placeholder'},
      {value: 51, label: 'filter.partialRepaymentApplyOption.no1'}, // 已还款
      {value: 43, label: 'filter.partialRepaymentApplyOption.no2'}, // 待还款
      {value: 50, label: 'filter.partialRepaymentApplyOption.no3'}  // 部分还
    ],
    overdueStatusOptions: [
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'filter.couponUseStatus.no1'}, // 未使用
      {value: -1, label: 'filter.couponUseStatus.no2'}, // 已使用
      {value: -2, label: 'filter.couponUseStatus.no3'}, // 已过期
      {value: -3, label: 'filter.couponUseStatus.no4'}, // 已提现
      {value: -4, label: 'filter.couponUseStatus.no6'}, // 逾期优惠驳回
      {value: 2, label: 'filter.couponUseStatus.no5'} // 逾期优惠待审核
    ],
    cashStatusOptions: [
      {value: '', label: 'public.placeholder'},
      {value: -41, label: 'filter.cashStatusOptions.no1'}, // 提现失败
      {value: 40, label: 'filter.cashStatusOptions.no2'}, // 待提现
      {value: 42, label: 'filter.cashStatusOptions.no3'}, // 提现中
      {value: 43, label: 'filter.cashStatusOptions.no4'} // 提现成功
    ],
    returnMoney_option: [
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'fei.no10'}, // 等于0
      {value: 2, label: 'fei.no9'}  // 大于0
    ],
    addSpecialUser: [
      {value: -1, label: 'userList.blackStatus_option.no1'}, // 黑名单
      {value: -3, label: 'new.no66'}  // 死亡名单
    ],
    channelDataOptions: [],
    loansType_options:[// 贷款类型
      {value: '', label: 'public.placeholder'},
      {value: 2, label: 'websiteLoans.loanType.no1'}, // 学生贷
      {value: 3, label: 'websiteLoans.loanType.no2'}, // 租房贷
      {value: 6, label: 'websiteLoans.loanType.no3'}, // 摩托车贷
      {value: 5, label: 'websiteLoans.loanType.no4'}, // love贷
      {value: 4, label: 'websiteLoans.loanType.no5'}, // visa贷
      {value: 1, label: 'websiteLoans.loanType.no6'}, // 现金贷
    ],
    trackStatus_options:[// 跟踪状态
      {value: '', label: 'public.placeholder'},
      {value: -1, label: 'websiteLoans.tailafterStatus.no2'}, // 未跟进
      {value: 1, label: 'websiteLoans.tailafterStatus.no6'}, // 已注册
      {value: 2, label: 'websiteLoans.tailafterStatus.no4'}, // 已申请
      {value: 3, label: 'websiteLoans.tailafterStatus.no5'}, // 拒绝申请
      {value: 4, label: 'websiteLoans.tailafterStatus.no7'}, // 已无需求
      {value: 5, label: 'websiteLoans.tailafterStatus.no8'}, // 已获得贷款
      {value: 6, label: 'websiteLoans.tailafterStatus.no9'}, // 愿意申请
      {value: 9, label: 'loanAfterManage.collection_option.no4'}, // 停机
      {value: 9, label: 'loanAfterManage.collection_option.no1'}, // 挂断
      {value: 10, label: 'loanAfterManage.collection_option.no6'}, // 空号
      {value: 7, label: 'loanAfterManage.collection_option.no18'}, // 其它
      {value: 11, label: 'websiteLoans.tailafterStatus.no10'}, // 无人接听
      {value: 12, label: 'loanAfterManage.collection_option.no3'}, // 拒接
    ],
    websiteOrderStatus_options:[
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'userDetail.reject_status.no9'}, // 待机审
      {value: '10', label: 'userDetail.reject_status.no10'}, // 机审通过
      {value: '-10', label: 'userDetail.reject_status.no1'}, // 机审驳回
      {value: '-20', label: 'userDetail.reject_status.no2'}, // 人工初审驳回
      {value: '21', label: 'userDetail.reject_status.no12'}, // 人工初审通过
    ],
    sendTypeOption:[
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'operatorManage.sendType.no1'}, // 单发
      {value: '2', label: 'operatorManage.sendType.no2'}, // 群发
    ],
    operatorManage_approveStatus: [// 信息认证状态
      {value: '', label: 'public.placeholder'},
      {value: '1', label: 'userList.approveStatus_option.no1'}, // 已认证
      {value: '2', label: 'userList.approveStatus_option.no2'}, // 未认证
      {value: '3', label: 'userList.approveStatus_option.no3'}, // 部分认证
    ],
    operatorManage_blackStatus: [// 身份状态下拉选框信息
      {value: '', label: 'public.placeholder'},
      {value: '-1', label: 'userList.blackStatus_option.no1'}, // 黑名单
      {value: '2', label: 'userList.blackStatus_option.no2'}, // 白名单
      {value: '-2', label: 'userList.blackStatus_option.no3'}, // 灰名单
    ],
    operatorManage_orderStatus: [// 身份状态下拉选框信息
      {value: '', label: 'public.placeholder'},
      {value: '10', label: 'userDetail.reject_status.no10'}, // 机审通过
      {value: '-20', label: 'userDetail.reject_status.no2'}, // 人工初审驳回
      {value: '21', label: 'userDetail.reject_status.no12'}, // 人工初审通过
      {value: '-30', label: 'userDetail.reject_status.no3'}, // 人工复审驳回
      {value: '31', label: 'userDetail.reject_status.no14'}, // 人工复审通过
      {value: '-41', label: 'userDetail.reject_status.no5'}, // 放款失败
      {value: '-50', label: 'userDetail.reject_status.no6'}, // 还款失败
      {value: '50', label: 'userDetail.reject_status.no19'}, // 部分还款
      {value: '43', label: 'userDetail.reject_status.no18'}, // 放款成功
      {value: '51', label: 'userDetail.reject_status.no20'}// 已还款
    ],
    sendObj_options: [// 发送对象下拉选框信息
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'operatorManage.sendObj.no1'}, // 完成注册
      {value: 2, label: 'operatorManage.sendObj.no2'}, // 完成认证
      {value: 3, label: 'operatorManage.sendObj.no3'}, // 认证失效
      {value: 4, label: 'operatorManage.sendObj.no4'}, // 人工初审驳回
      {value: 5, label: 'operatorManage.sendObj.no5'}, // 人工复审驳回
      {value: 6, label: 'operatorManage.sendObj.no6'}, // 人工复审通过
      {value: 7, label: 'operatorManage.sendObj.no7'}, // 放款失败
      {value: 8, label: 'operatorManage.sendObj.no8'}, // 放款成功
      {value: 9, label: 'operatorManage.sendObj.no9'}, // 到期前2天
      {value: 10, label: 'operatorManage.sendObj.no10'}, // 到期前1天
      {value: 11, label: 'operatorManage.sendObj.no11'}, // 到期当天
      {value: 12, label: 'operatorManage.sendObj.no12'}, // 逾期1~3天
      {value: 13, label: 'operatorManage.sendObj.no13'}, // 逾期4~7天
      {value: 14, label: 'operatorManage.sendObj.no14'}, // 逾期8~10天
      {value: 15, label: 'operatorManage.sendObj.no15'}, // 还款成功
      {value: 16, label: 'operatorManage.sendObj.no16'}, // 还款失败
      {value: 17, label: 'operatorManage.sendObj.no17'}, // 优惠券到账
      {value: 18, label: 'operatorManage.sendObj.no18'}, // 优惠券到期前2天
      {value: 19, label: 'operatorManage.sendObj.no19'}, // 优惠券到期前1天
      {value: 20, label: 'operatorManage.sendObj.no20'}, // 优惠券到期当天
      {value: 21, label: 'operatorManage.sendObj.no21'}, // 审核照片退回
    ],
    vi_backList_orderStatus: [// 还款列表修改弹窗订单状态
      {value: 51, label: 'filter.overdueOrderStatusOptions.no1'}, // 已还款
      {value: 50, label: 'filter.overdueOrderStatusOptions.no3'}  // 部分还款
    ],
    backMoneyList_backType_vi: [// 还款渠道
      {value: 'NL', label: 'finance.backMoneyType_options.no3'}, // NL
      {value: 'VN_BANK', label: 'finance.backMoneyType_options.no7'}, // VN_BANK
    ],
    handlingProblem:[// 处理问题
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'yn.no1'},  // 放款处理中
      {value: 2, label: 'yn.no2'},  // 还款处理中
      {value: 3, label: 'yn.no3'},  // 已完成
    ],
    handlingStatus:[// 处理状态
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'yn.no6'},  // 待处理
      {value: 2, label: 'yn.no7'},  // 已提交三方
      {value: 3, label: 'yn.no8'},  // 已处理
    ],
    handlingStatus1:[// 处理状态
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'yn.no6'},  // 待处理
      {value: 2, label: 'yn.no7'},  // 已提交三方
      {value: 3, label: 'yn.no8'},  // 已处理
      {value: 4, label: 'yn.no26'},  // 恢复催收
    ],
    handlingType:[// 处理类型
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'yn.no11'},  // 还款状态未更新
      {value: 2, label: 'yn.no12'}   // 用户未收到款项
    ],
    thirdChannel_putAwait: [// 放款通道
      {value: '', label: 'public.placeholder'},
      {value: 'bluepay', label: 'yn.no21'},// 宝付,
      {value: 'bluepay', label: 'yn.no22'},// 合利宝
      {value: 'bluepay', label: 'yn.no23'},// 易宝
      {value: 'bluepay', label: 'yn.no24'}// 信用贷-代扣
    ],
    putStatus_putAwait: [// 打款状态
      {value: '', label: 'public.placeholder'},
      {value: '-41', label: 'userDetail.reject_status.no5'}, // 放款失败
      {value: '43', label: 'userDetail.reject_status.no18'}, // 放款成功
    ],
    putStatus_putAwait1: [// 弹窗订单状态修改
      {value: '', label: 'public.placeholder'},
      {value: '-41', label: 'userDetail.reject_status.no5'} // 放款失败
    ],
    backMoney_backType_vi: [// 还款渠道
      {value: 'NL', label: 'finance.backMoneyType_options.no3'}, // NL
      {value: 'VN_BANK', label: 'finance.backMoneyType_options.no7'}, // VN_BANK
      {value: 'ATM_ONLINE', label: 'finance.backMoneyType_options.no5'}, // ATM_ONLINE
      {value: 'ATM_OFFLINE', label: 'finance.backMoneyType_options.no6'}, // ATM_OFFLINE
      {value: 'BIDV', label: 'finance.backMoneyType_options.no8'}, // BIDV
      {value: 'ACB', label: 'finance.backMoneyType_options.no9'}, // ACB
    ],
    groupCalls_options: [// 群呼结果
      {value: '', label: 'public.placeholder'},
      {value: 0, label: 'new.no89'}, // 提交成功
      {value: 1, label: 'new.no85'}, // 接通
      {value: -1, label: 'new.no86'}, // 未接通
      {value: -2, label: 'new.no90'}, // 提交失败
    ],
    auditResult_options: [// 审核是否通过结果
      {value: 1, label: 'yn.no40'}, // 同意
      {value: -1, label: 'yn.no41'}, // 驳回
    ],
    buildInSendType_options: [// 内置消息推送发送类型
      {value: '', label: 'public.placeholder'},
      {value: 1, label: 'yuenan.no38'}, // 消息推送
      {value: 2, label: 'yuenan.no39'}, // 站内信
    ],
    buildInSendDevice_options: [// 内置消息推送发送类型
      {value: '', label: 'public.placeholder'},
      {value: -1, label: 'yuenan.no40'}, // 所有
      {value: 1, label: 'yuenan.no42'}, // ios
      {value: 2, label: 'yuenan.no41'}, // android
    ],
  }
}
export default options
