import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false

//filters
import { shortDateFilter } from './filters/dateFilter'
Vue.filter('shortDateFilter', shortDateFilter)

new Vue({
  router,
  vuetify,
  VueTheMask,
  render: (h) => h(App),
}).$mount('#app')
