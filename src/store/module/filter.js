const filters = {
  state: {

  },
  mutations: {

  },
  getters: {
    rejectStatus: (state) => (status) => { // 订单审核状态
      switch (status) {
        case -10:
          return 'userDetail.reject_status.no1'// 机审驳回
          break
        case -11:
          return 'userDetail.reject_status.no23'// 机审失败
          break
        case -20:
          return 'userDetail.reject_status.no2'// 人工初审驳回
          break
        case -30:
          return 'userDetail.reject_status.no3'// 人工复审驳回
          break
        case -40:
          return 'userDetail.reject_status.no4'// 三方放款单创建失败
          break
        case -41:
          return 'userDetail.reject_status.no5'// 放款失败
          break
        case -50:
          return 'userDetail.reject_status.no6'// 还款失败
          break
        case -60:
          return 'userDetail.reject_status.no7'// 已逾期
          break
        case -70:
          return 'userDetail.reject_status.no8'// 已坏账
          break
        case 1:
          return 'userDetail.reject_status.no9'// 待机审
          break
        case 10:
          return 'userDetail.reject_status.no10'// 机审通过
          break
        case 20:
          return 'userDetail.reject_status.no11'// 待人工初审
          break
        case 21:
          return 'userDetail.reject_status.no12'// 人工初审通过
          break
        case 30:
          return 'userDetail.reject_status.no13'// 待人工复审
          break
        case 31:
          return 'userDetail.reject_status.no14'// 人工复审通过
          break
        case 40:
          return 'userDetail.reject_status.no15'// 待放款
          break
        case 41:
          return 'userDetail.reject_status.no16'// 三方订单创建成功
          break
        case 42:
          return 'userDetail.reject_status.no17'// 放款中
          break
        case 43:
          return 'userDetail.reject_status.no18'// 放款成功
          break
        case 50:
          return 'userDetail.reject_status.no19'// 部分还款
          break
        case 51:
          return 'userDetail.reject_status.no20'// 已还款
          break
        default:
          return 'userDetail.reject_status.no21'// 其他
      }
    },
    backList_rejectStatus: (state) => (status) => { // 订单审核状态
      switch (status) {
        case -10:
          return 'userDetail.reject_status.no1'// 机审驳回
          break
        case -20:
          return 'userDetail.reject_status.no2'// 人工初审驳回
          break
        case -30:
          return 'userDetail.reject_status.no3'// 人工复审驳回
          break
        case -40:
          return 'userDetail.reject_status.no4'// 三方放款单创建失败
          break
        case -41:
          return 'userDetail.reject_status.no5'// 放款失败
          break
        case -50:
          return 'userDetail.reject_status.no6'// 还款失败
          break
        case -60:
          return 'userDetail.reject_status.no7'// 已逾期
          break
        case -70:
          return 'userDetail.reject_status.no8'// 已坏账
          break
        case 1:
          return 'userDetail.reject_status.no9'// 待机审
          break
        case 10:
          return 'userDetail.reject_status.no10'// 机审通过
          break
        case 20:
          return 'userDetail.reject_status.no11'// 待人工初审
          break
        case 21:
          return 'userDetail.reject_status.no12'// 人工初审通过
          break
        case 30:
          return 'userDetail.reject_status.no13'// 待人工复审
          break
        case 31:
          return 'userDetail.reject_status.no14'// 人工复审通过
          break
        case 40:
          return 'userDetail.reject_status.no15'// 待放款
          break
        case 41:
          return 'userDetail.reject_status.no16'// 三方订单创建成功
          break
        case 42:
          return 'userDetail.reject_status.no17'// 放款中
          break
        case 43:
          return 'userDetail.reject_status.no22'// 待还款
          break
        case 50:
          return 'userDetail.reject_status.no19'// 部分还款
          break
        case 51:
          return 'userDetail.reject_status.no20'// 已还款
          break
        default:
          return 'userDetail.reject_status.no21'// 其他
      }
    },
    is_addressBook: (state) => (status) => { // 是否在通讯录订单状态
      switch (status) {
        case 1:
          return 'auditDetail.isAdressBook.no1'// 是
          break
        default:
          return 'auditDetail.isAdressBook.no2'// 否
      }
    },
    is_addressBook1: (state) => (status) => { // 是否在通讯录订单状态
      switch (status) {
        case 1:
          return 'auditDetail.isAdressBook.no2'// 是
          break
        default:
          return 'auditDetail.isAdressBook.no1'// 否
      }
    },
    contactStatus: (state) => (status) => { // 通话状态
      switch (status) {
        case 1:
          return 'auditDetail.contactStatus.no1'// 呼入
          break
        case 2:
          return 'auditDetail.contactStatus.no2'// 呼出
          break
        case 3:
          return 'auditDetail.telStatus_option.no1'// 未接
          break
        default:
          return 'finance.backLog_options_status.no12'// --
      }
    },
    tel_through: (state) => (status) => { // 电话接通状态
      switch (status) {
        case -1:
          return 'myAuditList.telThrough_status.no1'// 未接
          break
        case -2:
          return 'myAuditList.telThrough_status.no2'// 关机
          break
        case -3:
          return 'myAuditList.telThrough_status.no3'// 停机
          break
        case -4:
          return 'myAuditList.telThrough_status.no4'// 空号
          break
        case -5:
          return 'myAuditList.telThrough_status.no5'// 关系有假
          break
        case 1:
          return 'myAuditList.telThrough_status.no6'// 接通真实
          break
        case 2:
          return 'myAuditList.telThrough_status.no7'// 其它
          break
      }
    },
    education: (state) => (status) => { // 教育程度
      switch (status) {
        case 1:
          return 'userDetail.education_status.no1'// 小学
          break
        case 2:
          return 'userDetail.education_status.no2'// 初中
          break
        case 3:
          return 'userDetail.education_status.no3'// 高中
          break
        case 4:
          return 'userDetail.education_status.no4'// 大专
          break
        case 5:
          return 'userDetail.education_status.no5'// 本科
          break
        // case 6:
        //   return 'userDetail.education_status.no6'// 硕士
        // break;
        // case 7:
        //   return 'userDetail.education_status.no7'// 博士及以上
        // break;
        default:
          return 'userDetail.education_status.no8'// 其它
      }
    },
    education_phl: (state) => (status) => { // 教育程度
      switch (status) {
        case 1:
          return 'userDetail.phl_edu.no1'// 小学
          break
        case 2:
          return 'userDetail.phl_edu.no2'// 中学
          break
        case 3:
          return 'userDetail.phl_edu.no3'// 本科
          break
        case 4:
          return 'userDetail.phl_edu.no4'// 研究生
        break;
        case 5:
          return 'userDetail.phl_edu.no5'// 博士
        break;
        default:
          return 'userDetail.phl_edu.no6'// 其它
      }
    },
    vi_education: (state) => (status) => { // 教育程度
      switch (status) {
        case 1:
          return 'userDetail.vi_edu.no1'// 小学
          break
        case 2:
          return 'userDetail.vi_edu.no2'// 初中
          break
        case 3:
          return 'userDetail.vi_edu.no3'// 高中
          break
        case 4:
          return 'userDetail.vi_edu.no4'// 学士
          break
        case 5:
          return 'userDetail.vi_edu.no5'// 硕士
          break
        case 6:
          return 'userDetail.vi_edu.no6'// 博士
          break
        default:
          return 'userDetail.education_status.no8'// 其它
      }
    },
    marriage: (state) => (status) => { // 婚姻状况
      switch (status) {
        case 1:
          return 'userDetail.marriage_status.no1'// 单身
          break
        case 2:
          return 'userDetail.marriage_status.no2'// 已婚
          break
        case 3:
          return 'userDetail.marriage_status.no3'// 离异
          break
        case 4:
          return 'userDetail.marriage_status.no4'// 丧偶
          break
        default:
          return 'userDetail.marriage_status.no5'// 其它
      }
    },
    birthState: (state) => (status) => { // 生育状况
      switch (status) {
        case 1:
          return 'userDetail.birth_state.no1'// 未生育
          break
        case 2:
          return 'userDetail.birth_state.no2'// 一个
          break
        case 3:
          return 'userDetail.birth_state.no3'// 两个
          break
        case 4:
          return 'userDetail.birth_state.no4'// 两个以上
          break
        default:
          return 'userDetail.birth_state.no5'// 其它
      }
    },
    clientStatus: (state) => (status) => { // 客户端
      switch (status) {
        case 2:
          return 'userDetail.client_status.no1'// 微信
          break
        case 3:
          return 'userDetail.client_status.no2'// PC
          break
        case 4:
          return 'userDetail.client_status.no3'// Android
          break
        case 5:
          return 'userDetail.client_status.no4'// IOS
          break
        default:
          return 'userDetail.client_status.no5'// 其它
      }
    },
    sexStatus: (state) => (status) => { // 性别
      switch (status) {
        case 1:
          return 'userDetail.sex_status.no1'// 男
          break
        case 2:
          return 'userDetail.sex_status.no2'// 女
          break
        case 3:
          return 'userDetail.sex_status.no3'// 未知
          break
        default:
          return 'userDetail.sex_status.no4'// 保密
      }
    },
    liveTime: (state) => (status) => { // 居住时长
      switch (status) {
        case 1:
          return 'userDetail.liveTime_status.no1'// 三个月及其以内
          break
        case 2:
          return 'userDetail.liveTime_status.no2'// 四个月
          break
        case 3:
          return 'userDetail.liveTime_status.no3'// 五个月
          break
        case 4:
          return 'userDetail.liveTime_status.no4'// 六个月
          break
        case 5:
          return 'userDetail.liveTime_status.no5'// 六个月以上
          break
        default:
          return 'userDetail.liveTime_status.no6'// 其它
      }
    },
    bankIdStatus: (state) => (status) => { // 银行卡状态
      switch (status) {
        case 1:
          return 'userDetail.bankId_status.no1'// 有效
          break
        case -1:
          return 'userDetail.bankId_status.no2'// 无效
          break
        default:
          return 'userDetail.bankId_status.no3'// 其它
      }
    },
    overdueState: (state) => (status) => { // 是否逾期状态
      switch (status) {
        case 1:
          return 'userDetail.overdue_state.no1'// 已逾期
          break
        case -1:
          return 'userDetail.overdue_state.no2'// 未逾期
          break
        default:
          return 'userDetail.overdue_state.no3'// 其它
      }
    },
    userSelfStatus: (state) => (status) => { // 个人信息身份状态
      switch (status) {
        case -2:
          return 'userList.approveStatus_option.no4'// 认证失效
          break
        case 1:
          return 'userList.userStatus.no1'// 未认证
          break
        case 2:
          return 'userList.userStatus.no2'// 身份信息已验证
          break
        case 3:
          return 'userList.userStatus.no3'// 个人信息已验证
          break
        case 4:
          return 'userList.userStatus.no4'// 紧急联系人已验证
          break
        case 5:
          return 'userList.userStatus.no5'// 工作信息已验证
          break
        case 6:
          return 'userList.userStatus.no6'// 银行卡已验证
          break
        default:
          return 'userList.userStatus.no7'// 其它
      }
    },
    userSelfStatus1: (state) => (status) => { // 个人信息身份状态
      switch (status) {
        case 1:
          return 'userList.userStatus.no1'// 未认证
          break
        case 2:
          return 'userList.userStatus.no2'// 身份信息已验证
          break
        case 3:
          return 'userList.userStatus.no3'// 个人信息已验证
          break
        case 4:
          return 'userList.userStatus.no4'// 紧急联系人已验证
          break
        case 5:
          return 'userList.userStatus.no6'// 银行卡已验证(已认证)
          break
        case 6:
          return 'userList.userStatus.no6'// 银行卡已验证(已认证)
          break
        default:
          return 'userList.userStatus.no7'// 其它
      }
    },
    new_userSelfStatus: (state) => (status) => { // 个人信息身份状态
      switch (status) {
        case 0:
          return 'userList.userStatus.no1'// 未认证
          break
        case 1:
          return 'userList.userStatus.no2'// 身份信息已验证
          break
        case 2:
          return 'userList.userStatus.no6'// 银行卡已验证(已认证)
          break
        case -2:
          return 'userList.approveStatus_option.no4'// 认证失效
          break
        default:
          return 'userList.userStatus.no7'// 其它
      }
    },
    isAuth_Status: (state) => (status) => { // 个人信息身份状态
      switch (status) {
        case 1:
          return 'userList.approveStatus_option.no1'// 已认证
          break
        case 2:
          return 'userList.approveStatus_option.no2'// 未认证
          break
        case 3:
          return 'userList.approveStatus_option.no3'// 部分认证
          break
        default:
          return 'userList.userStatus.no7'// 其它
      }
    },
    blackStatus: (state) => (status) => { // 是否是黑名单
      switch (status) {
        case -1:
          return 'userList.blackStatus.no1'// 黑名单
          break
        case -2:
          return 'userList.blackStatus.no2'// 灰名单
          break
        case -3:
          return 'new.no66'// 死亡名单
          break
        case 1:
          return 'userList.blackStatus.no3'// 正常
          break
        case 2:
          return 'userList.blackStatus_option.no2'// 白名单
          break
        default:
          return 'userList.blackStatus.no4'// 其它
      }
    },
    sugStatus: (state) => (status) => { // 用户反馈状态
      switch (status) {
        case 1:
          return 'userSuggest.suggest_option.no2'// 未处理
          break
        case 2:
          return 'userSuggest.suggest_option.no2'// 未处理
          break
        case 3:
          return 'userSuggest.suggest_option.no3'// 已回复
          break
        case 4:
          return 'userSuggest.suggest_option.no1'// 已处理
          break
        default:
          return 'userSuggest.suggest_option.no2'// 未处理
      }
    },
    sugTypeStatus: (state) => (status) => { // 用户反馈状态
      switch (status) {
        case 1:
          return 'userSuggest.sugType.no1' // 还款反馈
          break
        case 2:
          return 'userSuggest.sugType.no2'// 产品建议
          break
        case 3:
          return 'userSuggest.sugType.no3'// 放款反馈
          break
        default:
          return 'userSuggest.sugType.no4'// 其它
      }
    },
    auditType: (state) => (status) => { // 审核统计审核类型
      switch (status) {
        case 1:
          return 'riskManage.auditType_status.no1'// 机审
          break
        case 2:
          return 'riskManage.auditType_status.no2'// 人工初审
          break
        case 3:
          return 'riskManage.auditType_status.no3'// 人工复审
          break
        default:
          return 'riskManage.auditType_status.no4'// 未知
      }
    },
    overDue: (state) => (status) => { // 订单是否逾期
      switch (status) {
        case 1:
          return 'auditDetail.isOverdue.no1'// 逾期
          break
        case -1:
          return 'auditDetail.isOverdue.no2'// 未逾期
          break
        default:
          return 'auditDetail.isOverdue.no3'// 其它
      }
    },
    putMoneyLogStatus: (state) => (status) => { // 财务数据/放款日志列表
      switch (status) {
        case -40:
          return 'finance.putLog_options_status.no1'// 三方放款单创建失败
          break
        case -41:
          return 'finance.putLog_options_status.no2'// 放款失败
          break
        case 40:
          return 'finance.putLog_options_status.no3'// 待放款
          break
        case 41:
          return 'finance.putLog_options_status.no4'// 三方订单创建成功
          break
        case 42:
          return 'finance.putLog_options_status.no5'// 放款中
          break
        case 43:
          return 'finance.putLog_options_status.no6'// 放款成功
          break
        default:
          return 'finance.putLog_options_status.no7' // 其它
      }
    },
    backMoneyLogStatus: (state) => (status) => { // 财务数据/还款日志列表
      switch (status) {
        case -50:
          return 'finance.backLog_options_status.no1'// 还款失败
          break
        case -51:
          return 'finance.backLog_options_status.no2'// 当前订单不支持还款码操作
          break
        case -52:
          return 'finance.backLog_options_status.no3'// 获取还款码失败
          break
        case -53:
          return 'finance.backLog_options_status.no4'// 还款单创建失败
          break
        case -54:
          return 'finance.backLog_options_status.no5'// 人工确认还款失败
          break
        case 50:
          return 'finance.backLog_options_status.no6'// 部分还款
          break
        case 51:
          return 'finance.backLog_options_status.no7'// 已还款
          break
        case 52:
          return 'finance.backLog_options_status.no8'// 获取还款码成功
          break
        case 53:
          return 'finance.backLog_options_status.no9'// 还款单创建成功
          break
        case 54:
          return 'finance.backLog_options_status.no10'// 还款单创建中
          break
        case 55:
          return 'finance.backLog_options_status.no11'// 人工确认还款成功
          break
        default:
          return 'finance.backLog_options_status.no12'// 其它
      }
    },
    roleIdStatus: (state) => (status) => { // 用户身份
      switch (status) {
        case 1:
          return 'idManage.roleIdStatus.no1'// 产品
          break
        case 2:
          return 'idManage.roleIdStatus.no2'// 运营
          break
        case 3:
          return 'idManage.roleIdStatus.no3'// 商务
          break
        case 4:
          return 'idManage.roleIdStatus.no4'// 开发
          break
        case 5:
          return 'idManage.roleIdStatus.no5'// 初审
          break
        case 6:
          return 'idManage.roleIdStatus.no6'// 复审
          break
        default:
          return 'idManage.roleIdStatus.no7'// 其它
      }
    },
    loanMoneyRecordStatus: (state) => (status) => { // 借款审核记录借款操作类型
      switch (status) {
        case 1:
          return 'loanMoneyDetail.loanMoneyRecordStatus.no1'// 机审
          break
        case 2:
          return 'loanMoneyDetail.loanMoneyRecordStatus.no2'// 人工初审
          break
        case 3:
          return 'loanMoneyDetail.loanMoneyRecordStatus.no3'// 人工复审
          break
        default:
          return 'loanMoneyDetail.loanMoneyRecordStatus.no4'// 其它
      }
    },
    loanMoneyResultStatus: (state) => (status) => { // 借款审核记录借款审核结果
      switch (status) {
        case 1:
          return 'loanMoneyDetail.loanMoneyResultStatus.no1'// 通过
          break
        case -1:
          return 'loanMoneyDetail.loanMoneyResultStatus.no2'// 未通过
          break
        default:
          return 'loanMoneyDetail.loanMoneyResultStatus.no3'// 其它
      }
    },
    backMoneyResultStatus: (state) => (status) => { // 借款审核记录还款审核结果
      switch (status) {
        case -50:
          return 'loanMoneyDetail.backMoneyResultStatus.no1'// 还款失败
          break
        case -51:
          return 'loanMoneyDetail.backMoneyResultStatus.no2'// 当前订单不支持还款码操作
          break
        case -52:
          return 'loanMoneyDetail.backMoneyResultStatus.no3'// 获取还款码失败
          break
        case -53:
          return 'loanMoneyDetail.backMoneyResultStatus.no4'// 还款单创建失败
          break
        case -54:
          return 'loanMoneyDetail.backMoneyResultStatus.no5'// 人工确认还款失败
          break
        case 50:
          return 'loanMoneyDetail.backMoneyResultStatus.no6'// 部分还款
          break
        case 51:
          return 'loanMoneyDetail.backMoneyResultStatus.no7'// 已还款
          break
        case 52:
          return 'loanMoneyDetail.backMoneyResultStatus.no8'// 获取还款码成功
          break
        case 53:
          return 'loanMoneyDetail.backMoneyResultStatus.no9'// 还款单创建成功
          break
        case 54:
          return 'loanMoneyDetail.backMoneyResultStatus.no10'// 还款单创建中
          break
        case 55:
          return 'loanMoneyDetail.backMoneyResultStatus.no11'// 人工确认还款成功
          break
        default:
          return 'loanMoneyDetail.backMoneyResultStatus.no12'// 其它
      }
    },
    putMoneyResultStatus: (state) => (status) => { // 借款审核记录放款审核结果
      switch (status) {
        case -40:
          return 'loanMoneyDetail.putMoneyResultStatus.no1'// 三方放款单创建失败
          break
        case -41:
          return 'loanMoneyDetail.putMoneyResultStatus.no2'// 放款失败
          break
        case 40:
          return 'loanMoneyDetail.putMoneyResultStatus.no3'// 待放款
          break
        case 41:
          return 'loanMoneyDetail.putMoneyResultStatus.no4'// 三方订单创建成功
          break
        case 42:
          return 'loanMoneyDetail.putMoneyResultStatus.no5'// 放款中
          break
        case 43:
          return 'loanMoneyDetail.putMoneyResultStatus.no6'// 放款成功
          break
        default:
          return 'loanMoneyDetail.putMoneyResultStatus.no7'// 其它
      }
    },
    orderMultiCheckStatus: (state) => (status) => { // 多平台检测
      switch (status) {
        case -2:
          return 'auditDetail.orderMultiCheck.no1'// 调用接口发生异常
          break
        case 2:
          return 'auditDetail.orderMultiCheck.no2'// 查询无结果
          break
        case 1:
          return 'auditDetail.orderMultiCheck.no3'// 查询有结果
          break
        default:
          return 'auditDetail.orderMultiCheck.no1'// 调用接口发生异常
      }
    },
    operationStatus: (state) => (status) => { // 催收状态
      switch (status) {
        case 0:
          return 'loanAfterManage.collection_option.no19'// 未处理
          break
        case 10:
          return 'loanAfterManage.collection_option.no1'// 挂断
          break
        case 11:
          return 'loanAfterManage.collection_option.no2'// 未接
          break
        case 12:
          return 'loanAfterManage.collection_option.no3'// 拒接
          break
        case 13:
          return 'loanAfterManage.collection_option.no4'// 停机
          break
        case 14:
          return 'loanAfterManage.collection_option.no5'// 关机
          break
        case 15:
          return 'loanAfterManage.collection_option.no6'// 空号
          break
        case 16:
          return 'loanAfterManage.collection_option.no7'// 手机号易主
          break
        case 20:
          return 'loanAfterManage.collection_option.no8'// 拒绝还款
          break
        case 21:
          return 'loanAfterManage.collection_option.no9'// 他人愿意转告
          break
        case 22:
          return 'loanAfterManage.collection_option.no10'// 他人愿意代偿
          break
        case 23:
          return 'loanAfterManage.collection_option.no11'// 投诉意向
          break
        case 24:
          return 'loanAfterManage.collection_option.no12'// 有还款意向
          break
        case 25:
          return 'loanAfterManage.collection_option.no13'// 无还款能力
          break
        case 26:
          return 'loanAfterManage.collection_option.no14'// 承诺还款
          break
        case 30:
          return 'loanAfterManage.collection_option.no15'// 还款掉单
          break
        case 40:
          return 'loanAfterManage.collection_option.no16'// 其他
          break
        case 100:
          return 'loanAfterManage.collection_option.no17'// 催收完成
          break
        default:
          return 'loanAfterManage.collection_option.no19'// 未处理
      }
    },
    myoveNoticeStatus: (state) => (status) => { // 催收状态
      switch (status) {
        case -1:
          return 'loanAfterManage.collection_option.no20'// 未处理
          break
        case 10:
          return 'loanAfterManage.collection_option.no1'// 挂断
          break
        case 11:
          return 'loanAfterManage.collection_option.no2'// 未接
          break
        case 12:
          return 'loanAfterManage.collection_option.no3'// 拒接
          break
        case 13:
          return 'loanAfterManage.collection_option.no4'// 停机
          break
        case 14:
          return 'loanAfterManage.collection_option.no5'// 关机
          break
        case 15:
          return 'loanAfterManage.collection_option.no6'// 空号
          break
        case 16:
          return 'loanAfterManage.collection_option.no7'// 手机号易主
          break
        case 20:
          return 'loanAfterManage.collection_option.no8'// 拒绝还款
          break
        case 21:
          return 'loanAfterManage.collection_option.no9'// 他人愿意转告
          break
        case 22:
          return 'loanAfterManage.collection_option.no10'// 他人愿意代偿
          break
        case 23:
          return 'loanAfterManage.collection_option.no11'// 投诉意向
          break
        case 24:
          return 'loanAfterManage.collection_option.no12'// 有还款意向
          break
        case 25:
          return 'loanAfterManage.collection_option.no13'// 无还款能力
          break
        case 26:
          return 'loanAfterManage.collection_option.no14'// 承诺还款
          break
        case 30:
          return 'loanAfterManage.collection_option.no15'// 还款掉单
          break
        case 40:
          return 'loanAfterManage.collection_option.no16'// 其他
          break
        case 100:
          return 'loanAfterManage.collection_option.no17'// 催收完成
          break
        default:
          return 'loanAfterManage.collection_option.no19'// 未处理
      }
    },
    operationStatus1: (state) => (status) => { // 分单列表催收状态
      switch (status) {
        case 0:
          return 'loanAfterManage.fendan_option.no1'// 未处理
          break
        case 1:
          return 'loanAfterManage.fendan_option.no2'// 承诺还款
          break
        case 2:
          return 'loanAfterManage.fendan_option.no3'// 还款掉单
          break
        case 3:
          return 'loanAfterManage.fendan_option.no4'// 其他
          break
        default:
          return 'loanAfterManage.fendan_option.no1'// 未处理
      }
    },
    collectionStatus: (state) => (status) => { // 催收阶段
      switch (status) {
        case 1:
          return 'loanAfterManage.note_option1.no1'// S1
          break
        case 2:
          return 'loanAfterManage.note_option1.no2'// S2
          break
        case 3:
          return 'loanAfterManage.note_option1.no3'// M1
          break
        case 4:
          return 'loanAfterManage.note_option1.no4'// M2
          break
        case 5:
          return 'loanAfterManage.note_option1.no5'// M3
          break
        case 6:
          return 'loanAfterManage.note_option1.no7'// s3
          break
        case 7:
          return 'loanAfterManage.note_option1.no8'// M3+
          break
        default:
          return 'loanAfterManage.note_option1.no6'// 其它
      }
    },
    follow_status: (state) => (status) => { // 催收状态
      switch (status) {
        case 1:
          return 'new.followStatus1.no1'// 未跟踪
          break
        case 2:
          return 'new.followStatus1.no2'// 进行中
          break
        case 3:
          return 'new.followStatus1.no3'// 已跟踪
          break
        case 4:
          return 'new.followStatus1.no1'// 未跟踪
          break
        case 5:
          return 'new.followStatus1.no2'// 进行中
          break
        case 6:
          return 'new.followStatus1.no3'// 已跟踪
          break
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    // ----------------下面是越南状态判断------------------
    vi_putMoneyLogStatus: (state) => (status) => { // 催收状态
      switch (status) {
        case 'E00':
          return 'Success'// 未跟踪
          break
        case 'E99':
          return 'Unknown Error'// 进行中
          break
        case 'E03':
          return 'Inexistent email'// 已跟踪
          break
        case 'E04':
          return 'Money transfer failed'// 未跟踪
          break
        case 'E10':
          return '3 months of permitted time'// 进行中
          break
        case 'E11':
          return 'Lack of parameter'// 已跟踪
          break
        case 'E13':
          return 'Wrong time'// 已跟踪
          break
        case 'E14':
          return 'Not to transfer money to yourself'// 已跟踪
          break
        case 'E15':
          return 'No data'// 已跟踪
          break
        case 'E98':
          return 'Wrong merchant information'// 已跟踪
          break
        case -99:
          return 'request error'// 已跟踪
          break
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    idCardTypeStatus: (state) => (status) => { // 催收状态
      switch (status) {
        case '1':
          return 'SSS'// 未跟踪
          break
        case '2':
          return 'UMID'// 进行中
          break
        case '3':
          return 'Drivers license'// 已跟踪
          break
        case '4':
          return 'TIN'// 未跟踪
          break
      }
    },
    couponUseState: (state) => (status) => { // 优惠券状态
      switch (status) {
        case 1:
          return 'filter.couponUseStatus.no1'// 未使用
        case 2:
          return 'filter.couponUseStatus.no5'// 逾期优惠待审核
        case -1:
          return 'filter.couponUseStatus.no2'// 已使用
        case -2:
          return 'filter.couponUseStatus.no3'// 已过期
        case -3:
          return 'filter.couponUseStatus.no4'// 已提现
        case -4:
          return 'filter.couponUseStatus.no6'// 逾期优惠驳回
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    couponTypeState: (state) => (status) => { // 优惠券类型
      switch (status) {
        case 1:
          return 'filter.couponType.no1'// 免息金额
          break
        case 2:
          return 'filter.couponType.no2'// 免息天数
          break
        case 3:
          return 'filter.couponType.no3'// 奖励金额
          break
        case 4:
          return 'filter.couponType.no4'// 利息折扣
          break
        case 5:
          return 'filter.couponType.no5'// 逾期优惠
          break
        default:
          return 'finance.backLog_options_status.no12'// --
      }
    },
    userGradeState: (state) => (status) => { // 优惠券类型
      switch (status) {
        case '01':
          return 'proManage.userGrade_option.no1'// NOMOR
          break
        case '02':
          return 'proManage.userGrade_option.no2'// WRITE
          break
        case 'H1':
          return 'proManage.userGrade_option.no3'// GROP1
          break
        case 'H2':
          return 'proManage.userGrade_option.no4'// GROP2
          break
        case 'H3':
          return 'proManage.userGrade_option.no5'// GROP3
          break
        case '11':
          return 'proManage.userGrade_option.no6'// ALL
          break
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    loanTypeState: (state) => (status) => { // 贷款类型
      switch (status) {
        case 2:
          return 'websiteLoans.loanType.no1'// 学生贷
          break
        case 3:
          return 'websiteLoans.loanType.no2'// 租房贷
          break
        case 6:
          return 'websiteLoans.loanType.no3'// 摩托车贷
          break
        case 5:
          return 'websiteLoans.loanType.no4'// love贷
          break
        case 4:
          return 'websiteLoans.loanType.no5'// visa贷
          break
        case 1:
          return 'websiteLoans.loanType.no6'// 现金贷
          break
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    sendTypeState: (state) => (status) => { // 发送消息类型
      switch (status) {
        case 1:
          return 'operatorManage.sendType.no1'// 单发
          break
        case 2:
          return 'operatorManage.sendType.no2'// 群发
          break
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    trackStatus_Status: (state) => (status) => { // 跟踪状态
      switch (status) {
        case -1:
          return 'websiteLoans.tailafterStatus.no2' // 未跟进
          break
        case 1:
          return 'websiteLoans.tailafterStatus.no6' // 已注册
          break
        case 2:
          return 'websiteLoans.tailafterStatus.no4' // 已申请
          break
        case 3:
          return 'websiteLoans.tailafterStatus.no5' // 拒绝申请
          break
        case 4:
          return 'websiteLoans.tailafterStatus.no7' // 已无需求
          break
        case 5:
          return 'websiteLoans.tailafterStatus.no8' // 已获得贷款
          break
        case 6:
          return 'websiteLoans.tailafterStatus.no9' // 愿意申请
          break
        case 8:
          return 'loanAfterManage.collection_option.no4' // 停机
          break
        case 9:
          return 'loanAfterManage.collection_option.no1' // 挂断
          break
        case 10:
          return 'loanAfterManage.collection_option.no6' // 空号
          break
        case 7:
          return 'loanAfterManage.collection_option.no18' // 其它
          break
        case 11:
          return 'websiteLoans.tailafterStatus.no10' // 无人接听
          break
        case 12:
          return 'loanAfterManage.collection_option.no3' // 拒接
          break
      }
    },
    vn_phone: (state) => (phone) =>{
      if(phone.length < 10){
        return '-'
      }
      var first = phone.substr(0,3);
      var last = phone.substr(3);
      switch (first) {
        case '162':
          return '32'+last
          break
        case '163':
          return '33'+last
          break
        case '164':
          return '34'+last
          break
        case '165':
          return '35'+last
          break
        case '166':
          return '36'+last
          break
        case '167':
          return '37'+last
          break
        case '168':
          return '38'+last
          break
        case '169':
          return '39'+last
          break
        case '120':
          return '70'+last
          break
        case '121':
          return '79'+last
          break
        case '122':
          return '77'+last
          break
        case '126':
          return '76'+last
          break
        case '128':
          return '78'+last
          break
        case '123':
          return '83'+last
          break
        case '124':
          return '84'+last
          break
        case '125':
          return '85'+last
          break
        case '127':
          return '81'+last
          break
        case '129':
          return '82'+last
          break
        case '186':
          return '56'+last
          break
        case '188':
          return '58'+last
          break
        case '199':
          return '59'+last
          break
        default:
          return '-'
      }
    },
    sendObjStatus: (state) => (status) => { // 发送消息类型
      switch (status) {
        case 1:
          return 'operatorManage.sendObj.no1'// 单发
          break
        case 2:
          return 'operatorManage.sendObj.no2'// 群发
          break
        case 3:
          return 'operatorManage.sendObj.no3'// 单发
          break
        case 4:
          return 'operatorManage.sendObj.no4'// 单发
          break
        case 5:
          return 'operatorManage.sendObj.no5'// 单发
          break
        case 6:
          return 'operatorManage.sendObj.no6'// 单发
          break
        case 7:
          return 'operatorManage.sendObj.no7'// 单发
          break
        case 8:
          return 'operatorManage.sendObj.no8'// 单发
          break
        case 9:
          return 'operatorManage.sendObj.no9'// 单发
          break
        case 10:
          return 'operatorManage.sendObj.no10'// 单发
          break
        case 1:
          return 'operatorManage.sendObj.no1'// 单发
          break
        case 11:
          return 'operatorManage.sendObj.no11'// 单发
          break
        case 12:
          return 'operatorManage.sendObj.no12'// 单发
          break
        case 13:
          return 'operatorManage.sendObj.no13'// 单发
          break
        case 14:
          return 'operatorManage.sendObj.no14'// 单发
          break
        case 15:
          return 'operatorManage.sendObj.no15'// 单发
          break
        case 16:
          return 'operatorManage.sendObj.no16'// 单发
          break
        case 17:
          return 'operatorManage.sendObj.no17'// 单发
          break
        case 18:
          return 'operatorManage.sendObj.no18'// 单发
          break
        case 19:
          return 'operatorManage.sendObj.no19'// 单发
          break
        case 20:
          return 'operatorManage.sendObj.no20'// 单发
          break
        case 21:
          return 'operatorManage.sendObj.no21'// 单发
          break
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    handlingProblem: (state) => (status) => { // 处理问题
      switch (status) {
        case 1:
          return 'yn.no1'// 放款处理中
          break
        case 2:
          return 'yn.no2'// 还款处理中
          break
        case 3:
          return 'yn.no3'// 已完成
          break
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    handlingProblem1: (state) => (status) => { // 处理问题
      switch (status) {
        case 1:
          return 'yn.no11'// 还款状态未更新
          break
        case 2:
          return 'yn.no12'// 用户未收到款项
          break
        default:
          return '-'// 其它
      }
    },
    handlingStatus: (state) => (status) => { // 处理状态
      switch (status) {
        case 1:
          return 'yn.no6'// 待处理
          break
        case 2:
          return 'yn.no7'// 已提交三方
          break
        case 3:
          return 'yn.no8'// 已处理
          break
        case 4:
          return 'yn.no26'// 恢复催收
          break
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    putMoneyAwait_putStatus: (state) => (status) => { // 处理状态
      switch (status) {
        case 1:
          return 'yn.no6'// 待处理
          break
        case 2:
          return 'yn.no7'// 已提交三方
          break
        case 3:
          return 'yn.no8'// 已处理
          break
        default:
          return 'loanAfterManage.collection_option.no18'// 其它
      }
    },
    callStatus_status: (state) => (status) => { // 群呼结果
      switch (status) {
        case 0:
          return 'new.no89'// 提交成功
          break
        case 1:
          return 'new.no85'// 接通
          break
        case -1:
          return 'new.no86'// 未接通
          break
        case -2:
          return 'new.no90'// 提交失败
          break
        default:
          return 'public.no91'// -
      }
    },
  }
}
export default filters
