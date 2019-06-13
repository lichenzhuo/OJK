const ynDEV = 'back.sanjinxia'; // 测试环境
const vnDEV = 'back-vn'; // 测试环境
const phDEV = 'back-ph'; // 测试环境

// 根据地址包含不同字符串判断哪个国家
const ynPRO = 'admin.myrupiah123'; // 印尼生产环境
const ynPRO1 = 'admin.kilatrupiah'; // 印尼包生产环境
const ynPRO2 = 'admin.kilatloan'; // 印尼包生产环境

const vnPRO1 = 'admin.mydong'; // 越南生产环境
const vnPRO = 'dongabc'; // 越南生产环境

const phPRO = 'admin.getpeso'; // 菲律宾生产环境

const ynBACK = 'back.myrupiah123'; // 印尼包生产环境
const vnBACK = 'back.mydong'; // 越南生产环境
const phBACK = 'back.getpeso'; // 菲律宾生产环境

const vnCASH = 'dongcash'; // 菲律宾生产环境
const instantcsh = 'instantcsh'; // 越南没有LOGO的

const oladmin_yn = 'oladmin_yn'; // 国内访问国外正式系统
const oladmin_vn = 'oladmin_vn'; // 国内访问国外正式系统
const oladmin_ph = 'oladmin_ph'; // 国内访问国外正式系统
const oladmin_kl = 'oladmin_kl'; // 国内访问国外正式系统

const pesodana = 'pesodana'; // 国内访问国外正式系统
const danayn = 'danayn.com'; // 国内访问国外正式系统

const fullCurrentDomain = window.location.href.split('?')[0];

let domain = '';
let headerTotal = '';
let lang = '';
let first_unit = '';
let last_unit = '';
let moneySplit = '$1.';
if (fullCurrentDomain.indexOf(ynDEV) > -1) {
  domain = `http://api.sanjinxia.com`;
  headerTotal = 'Go Dana';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(oladmin_yn) > -1) {
  domain = `http://olapi_yn.sanjinxia.com`;
  headerTotal = 'Go Dana';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(pesodana) > -1) {
  domain = `http://api.pesodana.com`;
  headerTotal = 'Go Dana';
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
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(vnDEV) > -1) {
  domain = `http://api-vn.sanjinxia.com`;
  headerTotal = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(oladmin_vn) > -1) {
  domain = `http://olapi_vn.sanjinxia.com`;
  headerTotal = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf('dongcash.com') > -1) {
  domain = `http://api.dongcash.com`;
  headerTotal = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(phDEV) > -1) {
  domain = `http://api-ph.sanjinxia.com`;
  headerTotal = 'Get Peso';
  lang = 'PHL';
  first_unit = '';
  last_unit = 'PHP';
  moneySplit = '$1,'
} else if (fullCurrentDomain.indexOf(oladmin_ph) > -1) {
  domain = `http://olapi_ph.sanjinxia.com`;
  headerTotal = 'Get Peso';
  lang = 'PHL';
  first_unit = '';
  last_unit = 'PHP';
  moneySplit = '$1,'
} else if (fullCurrentDomain.indexOf(ynPRO) > -1) {
  domain = `http://api.myrupiah123.com`;
  headerTotal = 'Go Dana';
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
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(ynPRO2) > -1) {
  domain = `http://api.kilatloan.com`;
  headerTotal = 'kilatloan';
  lang = 'id';
  first_unit = 'Rp';
  last_unit = '';
} else if (fullCurrentDomain.indexOf(vnPRO) > -1) {
  domain = `http://api.dongabc.com`;
  headerTotal = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(vnPRO1) > -1) {
  domain = `https://api.mydong.vn`;
  headerTotal = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(vnBACK) > -1) {
  domain = `http://apiyanshi.mydong.vn`;
  headerTotal = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(vnCASH) > -1) {
  domain = `http://api.dongcash.com`;
  headerTotal = 'My Dong';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(instantcsh) > -1) {
  domain = `http://api.instantcsh.com`;
  headerTotal = 'i Cash';
  lang = 'vi';
  first_unit = '';
  last_unit = 'VND';
} else if (fullCurrentDomain.indexOf(phPRO) > -1) {
  domain = `https://api.getpeso.ph`;
  headerTotal = 'Get Peso';
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
  // domain = 'http://api.sanjinxia.com'; //  id测试接口
  domain = `http://api-vn.sanjinxia.com`; // vn 本地接口
  // domain = `http://10.0.53.89:10025`; // vn 本地接口
  // domain = `http://api-ph.sanjinxia.com`; // ph 本地接口
  // domain = `http://api.myrupiah123.com`; // ph 本地接口
  headerTotal = 'Go Dana';
  lang = 'vi';// 切换语言版本 vi 越南  id 印尼 PHL 菲律宾
  first_unit = 'Rp';
  last_unit = '';
}

global.config = {
  requestUrl: `${domain}/xjdApi/doCallAdmin`, // 请求地址
  excelUrl: `${domain}/xjdApi/exportExcel`, // 请求地址
  headerTotal: headerTotal,
  documentTile: headerTotal+'后台管理系统',
  lang: lang,
  first_unit: first_unit,
  last_unit: last_unit,
  moneySplit: moneySplit
};
