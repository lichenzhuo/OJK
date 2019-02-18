import Vue from 'vue'
const putExcel = (option) => {
  var excelForm = document.createElement('form')
  excelForm.setAttribute('style', 'display:none')
  excelForm.setAttribute('method', 'get')
  excelForm.setAttribute('action', global.config.excelUrl) // 印尼测试
  // excelForm.setAttribute('action', 'http://api.sanjinxia.com/xjdApi/exportExcel') // 印尼测试
  // excelForm.setAttribute("action","http://api.myrupiah123.com/xjdApi/exportExcel") // 印尼线上
  // excelForm.setAttribute("action","http://api.kilatrupiah.com/xjdApi/exportExcel") // 印尼线上马甲包kilatrupiah
  // excelForm.setAttribute("action","http://api.kilatloan.com/xjdApi/exportExcel") // 印尼线上马甲包kilatloan
  // excelForm.setAttribute("action","http://api-vn.sanjinxia.com/xjdApi/exportExcel") // 越南测试
  // excelForm.setAttribute("action","https://api.mydong.vn/xjdApi/exportExcel") // 越南上线
  // excelForm.setAttribute("action","http://api-ph.sanjinxia.com/xjdApi/exportExcel") // 菲律宾测试
  //  excelForm.setAttribute("action","https://api.getpeso.ph/xjdApi/exportExcel") // 菲律宾上线
  var excelInput = document.createElement('input')
  excelInput.value = JSON.stringify(option)
  excelInput.name = 'excelInput'
  excelInput.target = '_blank'
  document.body.appendChild(excelForm)
  excelForm.appendChild(excelInput)
  excelForm.submit()
}
Vue.prototype.$excel = putExcel
