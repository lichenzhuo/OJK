import Vue from 'vue'
import Vuex from 'vuex'

import actionMap from './module/actionmap'
import filters from './module/filter'
import options from './module/option'
import common from './module/common'
import watchstate from './module/watchState'
import group from './module/group'
import postHeader from './module/baseHeader'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    actionMap,
    filters,
    watchstate,
    common,
    group,
    options,
    postHeader
  },

  actions: {

  }
})
export default store
