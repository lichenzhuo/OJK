import Vue from 'vue'
import App from './App.vue'

import './config.js'

import router from './router/index'
import store from './store/index'
import 'babel-polyfill'

import './assets/css/main.css' // 外部样式
import './assets/css/resources.scss' // 外部样式

import Blob from './vender/Blob.js'
import Export2Excel from './vender/export2Excel.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/icon/iconfont.css' // icon字体

import './utils/fn.js' // 公共头部
import './utils/axios.js' // 请求

import './utils/excel.js' // 输出EXCEL文件
import './utils/makeExcel' // 前端导出excel

import JsEncrypt from 'jsencrypt/bin/jsencrypt'

import i18n from './i18n/i18n'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')