/*
    存储当前登录信息

*/
export default {
  namespaced: true,
  state: {
    doctorInfo: {
      doctorId: '',
      doctorName: ''
    }
  },
  mutations: {
    // 登录设置信息
    setDoctorInfo(state, paylod) {
      console.log('到这里了,这里是setDdctorInfo', paylod)
      state.doctorInfo = paylod
    },
    // 退出清空数据
    removeDoctorInfo(state, payload) {
      state.doctorInfo = ''
    }
  }
}
