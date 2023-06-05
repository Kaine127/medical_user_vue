// 定义接口----
import axios from '@/utils/request'
// 环境变量
const api = process.env.VUE_APP_BASE_API// /api

const base = {
  upload: api + '/user/uploadAvatar',
  checkIdNumber: api + '/user/checkIdNumber',
  savePatient: api + '/user/savePatient',
  getPatientList: api + '/patient/getPatientList',
  updatePatient: api + '/user/updatePatient',
  deletePatient: api + '/user/deletePatient',
  getRegisterList: api + '/register/getRegisterList',
  getRegisterDoctor: api + '/register/getRegisterDoctor',
  doRegister: api + '/register/doRegister',
  getPatientSelections: api + '/patient/getPatientSelections',
  getUserRegisterList: api + '/register/getUserRegisterList',
  registerDelete: api + '/register/registerDelete',
  // 获取往期病例
  getPatientCase: api + '/case/getPatientCase'

}

export default {
  upload(params) {
    console.log('上传方法,参数为:', params)
    return axios({
      url: base.upload,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }

    })
  },
  checkIdNumber(params) {
    console.log('这里是身份证操作')
    return axios({
      url: base.checkIdNumber,
      method: 'post',
      data: params
    })
  },
  savePatient(params) {
    console.log('这里是添加就诊者方法', params)
    return axios({
      url: base.savePatient,
      method: 'post',
      data: params
    })
  },
  getPatientList(params) {
    console.log('这里是获取就诊者列表', params)
    return axios.get(base.getPatientList, { params })
  },
  updatePatient(params) {
    console.log('这里是更新就诊者操作1')
    return axios({
      url: base.updatePatient,
      method: 'put',
      data: params
    })
  },
  deletePatient(params) {
    console.log('这里是删除就诊者操作1')
    return axios({
      url: base.deletePatient,
      method: 'put',
      data: params
    })
  },
  getRegisterList(params) {
    console.log('这里是获得选择医生的可预约时间列表')
    return axios({
      url: base.getRegisterList,
      method: 'post',
      data: params
    })
  },
  getRegisterDoctor() {
    console.log('这里是获取医生信息列表')
    return axios.get(base.getRegisterDoctor)
  },
  doRegister(params) {
    console.log('这里是进行预约挂号的方法', params)
    return axios({
      url: base.doRegister,
      method: 'post',
      data: params
    })
  },
  getPatientSelections() {
    console.log('这里是获取用户账户下的就诊者名字')
    return axios.get(base.getPatientSelections)
  },
  getUserRegisterList() {
    console.log('这里是获取用户已挂号信息')
    return axios.get(base.getUserRegisterList)
  },
  registerDelete(params) {
    console.log('这里是删除方法')
    return axios({
      url: base.registerDelete,
      method: 'delete',
      data: params
    })
  },
  getPatientCase(params) {
    return axios({
      url: base.getPatientCase,
      method: 'post',
      data: params
    })
  }

}
