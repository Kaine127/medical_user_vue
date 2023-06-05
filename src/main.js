import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import api from './api'
Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$msg = Toast

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
