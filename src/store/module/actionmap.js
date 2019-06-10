const actionmap = {
  state: {
    // 系统管理
    login: 'A0001', // 登录
    add_user: 'A0016', // 添加账号
    role_list: 'A0015', // 角色列表
    user_manage: 'A0020', // 账号管理列表
    user_del: 'A0018', // 添加注销
    user_pass: 'A0017', // 账号密码重置
    change_pass: 'A0021', // 修改自己的密码
    role_del: 'A0013', // 角色删除
    role_add: 'A0011', // 新增角色
    role_modify: 'A0012', // 修改角色
    permission: 'A0010', // 权限树状图
    permission_defCheckKeys: 'A0014',
    select_user: 'A0019',// 查看管理员信息
    change_user: 'A0022',// 修改管理员信息
    kf_people_option: 'A0023',// 获取客服员下拉框
    delgroup: 'GROUP0012',// 当前
    hasPeople: 'GROUP0013',// 当前
    // 产品管理
    pro_list: 'PRODUCT0001', // 产品列表
    vi_pro_list: 'PRODUCT000202', // 产品详细
    fpl_pro_list: 'PRODUCT0003PH', // 产品列表
    pro_add_modify: 'PRODUCT0002', // 产品新增、修改保存
    pro_remove: 'PRODUCT0004', // 产品删除
    vi_pro_add_modify: 'PRODUCT000201', // 产品新增、修改保存
    fpl_pro_add_modify: 'PRODUCT0002PH', // 产品新增、修改保存
    pro_detail: 'PRODUCT0003', // 产品详细内容
    pro_faq_select: 'QUESTION0004', // 产品详细内容
    pro_faq_del: 'QUESTION0002', // 产品详细内容
    pro_faq_update: 'QUESTION0003', // 产品详细内容
    pro_faq_add: 'QUESTION0001', // 产品详细内容
    // 用户反馈管理
    sug_list: 'FEEDBACK0001', // 用户反馈列表
    sug_detail: 'FEEDBACK0003', // 用户反馈详情
    sug_reply: 'FEEDBACK0004', // 用户反馈回复
    sug_excel: 'FEEDBACK0002', // 用户反馈excel导出
    sug_all_submit: 'FEEDBACK0005', // 用户反馈excel导出

    // 用户管理
    consumer_list: 'USER0001', // 用户管理列表
    consumer_list_excel: 'USER0002', // 用户管理列表
    consumer_detail: 'USER0003', // 用户信息详情
    consumer_loan: 'USER0004', // 用户借款详情
    addSpecialUser: 'USER0005', // 添加特殊用户
    // 借款管理
    loanmoney_list: 'ORDER0001', // 借款列表
    loneMoneyList_excel: 'ORDER0007', // 借款列表excel导出
    putMoneyList_excel: 'ORDER0008', // 放款列表excel导出
    backMoneyList_excel: 'ORDER0009', // 还款列表excel导出
    putmoney_list: 'ORDER0002', // 放款列表
    backmoney_list: 'ORDER0003', // 还款列表
    sure_backmoney: 'ORDER0004', // 手动确认还款操作
    putmoney_result: 'ORDER0005', // 向第三方确认放款结果
    backmoney_result: 'ORDER0006', // 向第三方确认还款结果
    // 风控审核管理
    auditOne_list: 'RISKCONTROL0005', // 人工初审列表
    auditTwo_list: 'RISKCONTROL0008', // 人工复审列表
    auditTotal_list: 'RISKCONTROL0011', // 人工审核统计
    auditTotal_excel: 'RISKCONTROL0012', // 人工审核统计
    audit_detail: '', // 人工初审复审详情
    audit_people: 'RISKCONTROL0013', // 审核人员列表
    auditOne_people: 'RISKCONTROL0013', // 人工初审统计
    auditOne_people_excel: 'RISKCONTROL0012', // 人工初审统计Excel导出
    auditTwo_people_excel: 'RISKCONTROL0016', // 人工复审统计Excel导出
    auditTwo_people: 'RISKCONTROL0015', // 人工复审统计
    zhipai: 'RISKCONTROL0014', // 人工复审指派
    RISKCONTROL0017: 'RISKCONTROL0017',
    RISKCONTROL0018: 'RISKCONTROL0018',
    RISKCONTROL0019: 'RISKCONTROL0019',
    ME0015: 'ME0015',
    ME0016: 'ME0016',
    
    // 我的审核订单
    myAuditOne_list: 'ME0001', // 我的人工初审
    myAudit_claim: 'ME0003', // 我的订单认领
    myAuditDetail_list: 'ME0004', // 我的人工初审复审详细
    telRecord_one: 'ME0005', // 电话审核联系人记录
    telRecord_submit: 'ME0006', // 电话审核
    reject: 'ME0007', // 初审复审驳回原因
    Result_oneSubmit: 'ME0008', // 初审结果提交
    noteNumber: 'ME0012', // 短信标签对应个数统计
    noteRecord_List: 'ME0010', // 短信列表统计
    telNumber: 'ME0011', // 电话标签对应个数统计
    telRecord_List: 'ME0009', // 电话列表统计
    myAuditTwo_list: 'REVIEW0002', // 我的人工复审
    audit_result: 'REVIEW0003', // 机审初审复审结果查询
    Result_twoSubmit: 'REVIEW0001', // 复审结果提交
    follow_submit: 'ME0014', // 跟踪结果提交
    follow_history: 'ME0013', // 跟踪结果查询
    back_reason: 'DICT0002', // 跟踪结果查询
    back_reason_submit: 'ORDER0030', // 跟踪结果查询
    add_content: 'ORDER0031', // 添加紧急联系人
    select_allData: 'DICT0001', // 查询字典
    all_picupload: 'F0002', // 查询字典通用图片上传
    // 财务数据
    putMoney_logList: 'LL0001', // 放款日志列表
    putMoney_logExcel: 'LL0002', // 放款日志列表导出Excel
    backMoney_logList: 'RPL0001', // 还款日志列表
    backMoney_logExcel: 'RPL0002', // 还款日志列表导出Excel
    financetable: 'AR0001', // 财务报表列表
    financetable_excel: 'AR0002', // 财务报表列表导出Excel
    // 统计管理
    through_rate: 'REPORT0001', // 通过率报表
    through_rate_excel: 'EXPREPORT0001', // 通过率报表
    first_rate: 'REPORT0002', // 首逾率报表
    first_rate_excel: 'EXPREPORT0002', // 首逾率报表
    back_rate: 'REPORT0003', // 回款率报表
    back_rate_excel: 'EXPREPORT0003', // 回款率报表
    // 工作台
    admin_home: 'REPORT0004', // 工作台数据
    REPORT0006: 'REPORT0006', // 工作台数据
    // 贷后运营
    loanOperation_list: 'REPORT0005', // 总催回报表
    note_list: 'SMSDEMO0001', // 短信模版列表
    note_del: 'SMSDEMO0002', // 短信模版删除
    note_add_edit: 'SMSDEMO0003', // 短信添加修改
    // 贷后管理
    overdueCouponApply_list: 'OVERCOUPON0001', // 逾期优惠券列表
    overdueCouponApply_change_status: 'OCOUSQ0001', // 逾期优惠券修改状态
    overdueCouponApply_detail: 'OCOUSQ0002', // 逾期优惠券和部分还款详情
    overdueCoupon_list_excel: 'OVERCOUPON0002', // 逾期优惠券列表导出

    partialRepaymentApply_list: 'PARTIAL0002', // 部分还款列表
    partialRepaymentApply_change_status: 'PARTIAL0001', // 部分还款修改状态
    partialRepayment_list_excel: 'PARTIAL0004',  // 部分还款优惠券导出

    comeOperation_list: 'CM0001', // 入催订单列表
    order_operation: 'CM0004', // 入催订单转派
    todayorder_operation: 'CM0005', // 今日订单转派
    todayCollection_list: 'CM0006', // 每日催收统计
    todayCollection_list_excel: 'CM0010', // 每日催收统计
    todaySendOrder_list: 'CM0002', // 每日派单统计
    todaySendOrder_list_excel: 'CM0009', // 每日派单统计
    collection_admin: 'CM0008', // 催收员列表
    todayCollection_detail: 'CM0003', // 每日订单转派查看详细
    adminCollection_total: 'CM0007', // 催收员催收统计
    adminCollection_total_excel: 'CM0011', // 催收员催收统计
    payCode_list: 'ORDER0020', // 还款码生成管理列表
    payCode_add: 'ORDER0021', // 还款码生成管理添加
    cuishou_list: 'MECOLLECTION0005', // 催收记录列表
    address_list: 'MECOLLECTION0006', // 通讯录列表
    cuishou_part:'PARTIAL0001',// 催收详情部分还款申请
    cuishou_remission:'OCOUSQ0001',// 催收详情逾期减免申请
    coupon_markCode:'OCOUSQ0003',// 逾期优惠券申请生成还款码
    outpoolList:'CM0012',// 委外资源池列表
    outpool_out:'CM0013',// 委外资源池委外按钮功能
    outpool_zhuan:'CM0014',// 委外资源池转派按钮功能
    // 我的催收订单
    myOperation_list: 'MECOLLECTION0001', // 我的催收订单
    myOperation_detail: 'MECOLLECTION0002', // 我的催收详情
    telOperation_submit: 'MECOLLECTION0003', // 催收电话提交
    noteOperation_submit: 'MECOLLECTION0004', // 发送催收短信
    workAnalysis_list: 'MECOLLECTION00010', // 工作分析
    
    // 客服管理
    kf_telCome: 'KF0016',
    kf_telCome_add: 'KF0017',
    kf_noBackOrder: 'KF0011',
    kf_noBackOrder_excel: 'KF0018',
    kf_noBackOrder_detail: 'KF0012',
    kf_myOveDate: 'KF0013',
    kf_myOveDate_detail: 'KF0014',
    kf_myOveDate_detail_submit: 'KF0015',
    kf_total: 'KF0020',
    kf_total_excel: 'KF0021',
    // 组名相关
    group_List: 'GROUP0004',
    group_type: 'GROUP0003',
    group_groupName: 'GROUP0001',
    group_leaderName: 'GROUP0002',
    group_update: 'GROUP0010',
    little_group_update: 'GROUP0005',
    little_group_leader: 'GROUP0008',
    little_group_group: 'GROUP0009',
    little_group_add: 'GROUP0006',
    little_group_modify: 'GROUP0007',
    little_group_detail: 'GROUP0011',
    // 优惠券相关
    coupon_userDetail: 'UC001',
    // 优惠券设置
    couponsSettingList: 'COUPON0010',
    couponsSettingEdit: 'COUPON0011',
    couponsSettingDelete: 'COUPON0012',
    // 优惠券活动列表
    activityList: 'COUPON0013',
    activityEdit: 'COUPON0014',
    activity_list_excel: 'COUPON0015',
    // 优惠券使用或者其他优惠券
    couponUsed: 'COUPON0016',
    couponUsed_list_excel: 'COUPON0017',
    // 其他优惠券
    sendOtherCoupon: 'OCOUPON0001',
    otherCoupon_list_excel: 'COUPON0017',
    // 计划推广列表
    addPularizePlane: 'BANNER0005',
    popularizeList: 'BANNER0002',
    popularizeDetail: 'BH0001',
    popularize_list_excel: 'BH0002',
    // 邀请好友
    inviteList: 'INVITE0001L',
    inviteDetailde: 'INVITE0002L',
    invite_list_excel: 'EXPINVITE0001L',
    // 现金提现
    cashList: 'MONEY0001',
    cash_list_excel: 'EXPMONEY0001',
    // 渠道数据
    channelDataList: 'CHANNEL0001',
    channelDataExcel: 'CHANNEL0002',
    // 委外管理
    outSourcedList: 'ENTRUST0001',
    outSourcedList_goback: 'ENTRUST0002',
    outSourcedList_zhuan: 'ENTRUST0003',
    judgeOrderNum: 'ENTRUST0009',
    averageSure: 'ENTRUST0004',
    selfdomSure: 'ENTRUST0005',
    getselfdomTable: 'ENTRUST0006',
    outSourcedList_total: 'ENTRUST0007',
    outSourcedList_total_excel: 'ENTRUST0008',
    CM0016: 'CM0016',
    ENTRUST0010: 'ENTRUST0010',

    // 官网贷款
    website_myorderList:'MT0001',
    website_myorderListClaim:'MT0002',
    website_myorderListDetail:'MT0003',
    website_myorderListSubmit:'MT0004',
    website_myorderListExcel:'MT0005',
    website_loansApplyList:'MT0006',
    website_loansApplyListExcel:'MT0007',
    website_userSubmitList:'MT0009',
    website_userSubmitListExcel:'MT0010',
    // 消息推送相关
    MESSAGEPUSH0001:'MESSAGEPUSH0001',// 手动消息推送列表
    MESSAGEPUSH0002:'MESSAGEPUSH0002',// 手动消息推送发送
    MESSAGEPUSH0003:'MESSAGEPUSH0003',// 手动消息查看详情
    MESSAGEPUSH0004:'MESSAGEPUSH0004',// 内置消息删除
    MESSAGEPUSH0005:'MESSAGEPUSH0005',// 内置消息增加/修改
    MESSAGEPUSH0006:'MESSAGEPUSH0006',// 内置消息列表
    OCOUPON0002:'OCOUPON0002',// 其它优惠券群发
    GETPACKAGE001:'GETPACKAGE001',// 获取有数据无数据包名
    COPYPACKAGE001:'COPYPACKAGE001',// 复制包操作
    ADDPACKAGE001:'ADDPACKAGE001',// 添加包名操作

    ORDER0010:'ORDER0010',// 还款列表获取还款日志
    ORDER0011:'ORDER0011',// 还款列表获取还款日志修改确认
    ORDERP0002:'ORDERP0002',// 还款待处理列表
    ORDERP0004:'ORDERP0004',// 放款待处理列表
    ORDERP0003:'ORDERP0003',// 还款待处理列表导出
    ORDERP0005:'ORDERP0005',// 放款待处理列表导出
    ORDERP0006:'ORDERP0006',// 还款放款待处理列表处理内容查询
    ORDERP0001:'ORDERP0001',// 借款列表处理提交
    ORDERP0007:'ORDERP0007',// 还款放款待处理列表处理提交
    PARTIAL0005:'PARTIAL0005',// 部分还款申请生成还款码

    PRODUCT0013:'PRODUCT0013',// app包管理
    PRODUCT0014:'PRODUCT0014',// app包管理确定按钮
    MECOLLECTION00011:'MECOLLECTION00011',// 催收列表获取语音结果

    TELEPHONE0001:'TELEPHONE0001',// 录音列表获取ID
    TELEPHONE0002:'TELEPHONE0002',// 录音列表获取
    MECOLLECTION00014:'MECOLLECTION00014',// 提交他人还款或态度恶劣审核结果
    MECOLLECTION00013:'MECOLLECTION00013',// 获取态度恶劣和他人还款人员列表
    MECOLLECTION00012:'MECOLLECTION00012',// 提交态度恶劣或他人还款的用户

    PRODUCT0015:'PRODUCT0015',// 逾期分期列表
    PRODUCT0016:'PRODUCT0016',// 逾期分期列表添加修改
    PRODUCT0017:'PRODUCT0017',// 逾期分期列表添加修改

    PRODUCT0003PH:'PRODUCT0003PH',// 菲律宾产品列表
    PRODUCT0002PH:'PRODUCT0002PH',// 菲律宾产品列表
    
    SYSCONFIG0001:'SYSCONFIG0001',// 系统配置
    SYSCONFIG0002:'SYSCONFIG0002',// 系统配置

    ME0017:'ME0017',// 缓存审核状态
    ME0018:'ME0018',// 添加电审记录
    ME0019:'ME0019',// 获取电话审核记录
    ME0020:'ME0020',// 获取电话审核记录
    ME0021:'ME0021',// 获取电话审核记录
    ME0022:'ME0022',// 获取电话审核记录
    ME0023:'ME0023',// 获取电话审核记录
    ME0024:'ME0024',// 获取电话审核记录
    ME0025:'ME0025',// 获取电话审核记录

  }

}
export default actionmap
