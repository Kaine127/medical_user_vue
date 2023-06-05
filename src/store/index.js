import Vue from 'vue'
import Vuex from 'vuex'
import login from './moudules/login.js'
import patient from './moudules/patient.js'
import register from './moudules/register.js'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    patient,
    register
  },
  // plugins:[] vuex插件-持久化 数组语法 多个插件名称
  plugins: [
    createPersistedstate({
      key: 'info', // 存储vuex数据的任意键名--本地存储里面 localStorage
      paths: ['register', 'login', 'patient'] // 存储的模块名称一级全局state数据  不写默认存储所有内容
    })
    // ...
  ]
})
