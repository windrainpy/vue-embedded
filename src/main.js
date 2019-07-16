import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.sass'

import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI, {
  size: 'small'
})

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
