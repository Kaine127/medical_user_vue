import axios from '@/utils/request'
import base from './base'
import login from './login/login.js'
import user from './user/user.js'

const api = {
  // 医生列表数据
  userLogin(params) {
    const res = axios({
      url: base.login,
      method: 'post',
      data: params
    })
    console.log('这里是结果', res)
    return res
  },
  ...login,
  ...user
}

export default api
