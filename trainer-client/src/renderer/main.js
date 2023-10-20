// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import App from './components/app'
import vSelect from 'vue-select'
import appContext from './store/modules/app-context'
import dateFilter from './components/trainer/oms/shared/filters/oms-date-filter'
import eventBus from './components/trainer/oms/shared/utils/event-bus'
import omsDisabledItem from '@/components/trainer/oms/shared/oms-disabled-item'
Vue.config.productionTip = false
Vue.use(Vuex, eventBus, dateFilter, omsDisabledItem)
Vue.component('v-select', vSelect)
const stores = new Vuex.Store({
  modules: {
    appContext: appContext
  },
  strict: process.env.NODE_ENV !== 'production'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: stores,
  router,
  render: (h) => h(App)
})
