// 定义接口----
import axios from '@/utils/request'
// 环境变量
const api = process.env.VUE_APP_BASE_API// /api

const base = {
  // 出诊管理数据
  login: api + '/user/login',
  sendCode: api + '/user/sms',
  getUser: api + '/user/getUser',
  updateUser: api + '/user/updateUser'
}

export default {
  /**
   * 就诊者用户添加
   */
  login(params) {
    console.log('登录方法,参数为:', params)
    return axios({
      url: base.login,
      method: 'post',
      data: params
    })
  },
  /**
   * 发送验证码
   */
  sendCode(params) {
    console.log('验证码发送,参数为:', params)
    return axios.get(base.sendCode, { params })
  },
  /**
   * 获取用户信息
   */
  getUser(params) {
    console.log('这里要进行获取getUser,url为', base.getUser)
    return axios({
      url: base.getUser,
      method: 'post',
      data: params
    })
  },
  /**
   * 更新用户信息
   */
  updateUser(params) {
    console.log('这里是更新用户', params)
    return axios({
      url: base.updateUser,
      method: 'post',
      data: params
    })
  }
}
