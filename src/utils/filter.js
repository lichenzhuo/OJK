import Vue from 'vue'

// 数据为空值时显示"-"  插值语法Vue.filter使用规则
Vue.filter('dataIsTrue', value => (typeof value === 'undefined' || value === '' ? ' - ' : value))


