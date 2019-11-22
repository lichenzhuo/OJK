const ynDEV = 'back.sanjinxia'; // 测试环境
const vnDEV = 'back-vn'; // 测试环境
const phDEV = 'back-ph'; // 测试环境

// 根据地址包含不同字符串判断哪个国家
const ynPRO = 'admin.myrupiah123'; // 印尼生产环境
const ynPRO1 = 'admin.kilatrupiah'; // 印尼包生产环境
const ynPRO2 = 'admin.kilatloan'; // 印尼包生产环境
const ynPRO3 = 'demoyn.dongcash'; // 印尼包生产环境
const ynPRO4 = 'admin.danahidup'; // 印尼包生产环境
const ynPRO5 = 'admin.flashloan2019'; // 印尼包生产环境

const vnPRO1 = 'admin.mydong'; // 越南生产环境
const vnPRO = 'dongabc'; // 越南生产环境
const vnPRO2 = 'sharkdong'; // 越南生产环境

const phPRO = 'admin.getpeso'; // 菲律宾生产环境

const ynBACK = 'back.myrupiah123'; // 印尼包生产环境
const vnBACK = 'back.mydong'; // 越南生产环境
const phBACK = 'back.getpeso'; // 菲律宾生产环境

const vnCASH = 'admin.dongcash'; // 菲律宾生产环境
const instantcsh = 'instantcsh'; // 越南没有LOGO的I Cash

const oladmin_yn = 'oladmin_yn'; // 国内访问国外正式系统
const oladmin_vn = 'oladmin_vn'; // 国内访问国外正式系统
const oladmin_ph = 'oladmin_ph'; // 国内访问国外正式系统
const oladmin_kl = 'oladmin_kl'; // 国内访问国外正式系统

const pesodana = 'pesodana'; // 国内访问国外正式系统
const danayn = 'danayn.com'; // 国内访问国外正式系统
const dongvtm = 'dongvtm.com'; // 国内访问国外正式系统
const vaytocdo = 'vaytocdo'; // 国内访问国外正式系统

const qlinkhy = 'qlinkhy'; // 三方
const vinacashone = 'vinacashone'; // 三方
const vaygapvip = '761616.vip'; // 三方
const tencentsu = 'tencentsu'; // 三方
const cash_daday = 'cash-mama'; // 三方

const fullCurrentDomain = window.location.href.split('?')[0];

let domain = '';
let headerTotal = '';
let lang = '';
let first_unit = '';
let last_unit = '';
let moneySplit = '$1.';
let headerImg = '';
if (fullCurrentDomain.indexOf(ynDEV) > -1) {
  domain = `http://api.sanjinxia.com`;
  headerTotal = 'Go Dana';
  headerImg = 'Go Dana';
  headerTotal = 'Go Dana';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(oladmin_yn) > -1) {
  domain = `http://olapi_yn.sanjinxia.com`;
  headerTotal = 'Go Dana';
  headerImg = 'Go Dana';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(pesodana) > -1) {
  domain = `http://api.pesodana.com`;
  headerTotal = 'Go Dana';
  headerImg = 'Go Dana';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(danayn) > -1) {
  domain = `http://api.danayn.com`;
  headerTotal = 'EasyCash';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(oladmin_kl) > -1) {
  domain = `http://olapi_kl.sanjinxia.com`;
  headerTotal = 'Go Dana';
  headerImg = 'Go Dana';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(vnDEV) > -1) {
  domain = `http://api-vn.sanjinxia.com`;
  headerTotal = 'My Dong';
  headerImg = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(oladmin_vn) > -1) {
  domain = `http://olapi_vn.sanjinxia.com`;
  headerTotal = 'My Dong';
  headerImg = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(vaytocdo) > -1) {
  domain = `http://api.vaytocdo.com`;
  headerTotal = 'vaytocdo';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(vaygapvip) > -1) {
  domain = `http://api.761616.vip`;
  headerTotal = 'vaygap';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(tencentsu) > -1) {
  domain = `http://api.tencentsu.com`;
  headerTotal = 'tencentsu';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(cash_daday) > -1) {
  domain = `http://api.cash-daday.com`;
  headerTotal = 'Cash Mama';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(vinacashone) > -1) {
  domain = `http://api.vinacashone.com`;
  headerTotal = 'vinacash';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(dongvtm) > -1) {
  domain = `http://api.dongvtm.com`;
  headerTotal = 'My Dong';
  headerImg = 'dongvtm';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(phDEV) > -1) {
  domain = `http://api-ph.sanjinxia.com`;
  headerTotal = 'Get Peso';
  headerImg = 'Get Peso';
  lang = 'PHL';
  first_unit = '';
  last_unit = 'PHP';
  moneySplit = '$1,'
} else if (fullCurrentDomain.indexOf(oladmin_ph) > -1) {
  domain = `http://olapi_ph.sanjinxia.com`;
  headerTotal = 'Get Peso';
  headerImg = 'Get Peso';
  lang = 'PHL';
  first_unit = '';
  last_unit = 'PHP';
  moneySplit = '$1,'
} else if (fullCurrentDomain.indexOf(ynPRO) > -1) {
  domain = `http://api.myrupiah123.com`;
  headerTotal = 'Go Dana';
  headerImg = 'Go Dana';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(ynBACK) > -1) {
  domain = `http://apiyanshi.myrupiah123.com`;
  headerTotal = 'Go Dana';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(ynPRO1) > -1) {
  domain = `http://api.kilatrupiah.com`;
  headerTotal = 'kilatrupiah';
  headerImg = 'kilatrupiah';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(ynPRO2) > -1) {
  domain = `http://api.kilatloan.com`;
  headerTotal = 'kilatloan';
  headerImg = 'kilatloan';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(ynPRO3) > -1) {
  domain = `http://apiyn.dongcash.com`;
  headerTotal = 'Demo';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(ynPRO4) > -1) {
  domain = `http://api.danahidup.com`;
  headerTotal = 'danahidup';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(ynPRO5) > -1) {
  domain = `http://api.flashloan2019.com`;
  headerTotal = 'Flashloan';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(vnPRO) > -1) {
  domain = `http://api.dongabc.com`;
  headerTotal = 'My Dong';
  headerImg = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(vnPRO2) > -1) {
  domain = `http://api.sharkdong.top`;
  headerTotal = 'Sharkdong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(vnPRO1) > -1) {
  domain = `https://api.mydong.vn`;
  headerTotal = 'My Dong';
  headerImg = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
}else if (fullCurrentDomain.indexOf(qlinkhy) > -1) {
  domain = `http://api.qlinkhy.com`;
  headerTotal = 'Qlink';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(vnCASH) > -1) {
  domain = `http://api.dongcash.com`;
  headerTotal = 'DEMO';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(instantcsh) > -1) {
  // http://admin.instantcsh.com
  domain = `http://api.instantcsh.com`;
  headerTotal = 'i Cash';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(phPRO) > -1) {
  domain = `https://api.getpeso.ph`;
  headerTotal = 'Get Peso';
  headerImg = 'Get Peso';
  lang = 'PHL';
  first_unit = '';
  last_unit = 'PHP';
  moneySplit = '$1,';
} else if (fullCurrentDomain.indexOf(phBACK) > -1) {
  domain = `http://apiyanshi.getpeso.ph`;
  headerTotal = 'Get Peso';
  lang = 'PHL';
  first_unit = '';
  last_unit = 'PHP';
  moneySplit = '$1,';
} else {
  domain = 'http://api.sanjinxia.com'; //  id测试接口
  // domain = `http://api-vn.sanjinxia.com`; // vn 本地接口
  // domain = `http://10.0.53.139:10025`; // vn 本地接口
  // domain = `http://api-ph.sanjinxia.com`; // ph 测试接口
  // domain = `http://api.myrupiah123.com`; // ph 本地接口
  headerTotal = 'My Dong';
  lang = 'id';// 切换语言版本 vi 越南  id 印尼 PHL 菲律宾
  first_unit = 'Rp';
  last_unit = '';
}

global.config = {
  requestUrl: `${domain}/xjdApi/doCallAdmin`, // 请求地址
  excelUrl: `${domain}/xjdApi/exportExcel`, // 请求地址
  headerTotal: headerTotal,
  headerImg: headerImg,
  documentTile: headerTotal+'后台管理系统',
  lang: lang,
  first_unit: first_unit,
  last_unit: last_unit,
  moneySplit: moneySplit
};
