import Vue from 'vue'
import VueI18n from 'vue-i18n'
// element国际化
import locale from 'element-ui/lib/locale'
import messages from './lang'
Vue.use(VueI18n)
// 从localStorage中拿到用户的语言选择，如果没有，那默认中文。
const i18n = new VueI18n({
  locale: sessionStorage.lang || 'cn',
  messages
})
locale.i18n((key, value) => i18n.t(key, value)) // 为了实现element插件的多语言切换
export default i18n