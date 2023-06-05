/*
    存储当前登录信息

*/
export default {
  namespaced: true,
  state: {
    patientInfo: ''
  },
  mutations: {
    // 登录设置信息
    setPatient(state, paylod) {
      console.log('到这里了,这里是setPatient', paylod)
      state.patientInfo = paylod
    },
    // 退出清空数据
    removePatient(state, payload) {
      state.patientInfo = ''
    }
  }
}
