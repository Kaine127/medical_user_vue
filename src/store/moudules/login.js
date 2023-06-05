/*
    存储当前登录信息

*/
export default {
  namespaced: true,
  state: {
    userinfo: {
      // 用户信息
      user: '',
      token: ''
    }
  },
  mutations: {
    // 登录设置信息
    setUser(state, paylod) {
      console.log('到这里了,这里是setUser', paylod)
      state.userinfo = paylod
    },
    // 退出清空数据
    removeUser(state, payload) {
      state.userinfo = {
        user: '',
        token: ''
      }
    },
    // 单独设置用户信息
    setInfo(state, payload) {
      state.userinfo.user = payload
    }
  }
}
