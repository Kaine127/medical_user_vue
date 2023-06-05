import axios from 'axios'
import router from '@/router'
import store from '@/store'
import Vue from 'vue'
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080'
})

instance.interceptors.request.use(function (config) {
  if (store.state.login.userinfo.token) {
    config.headers.token = store.state.login.userinfo.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401 || error.response.status === 402) {
    router.push('/login')
    Vue.prototype.$msg.fail(error.response.data.message)
  }
  return Promise.reject(error)
})

export default instance
