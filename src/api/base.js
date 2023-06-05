const api = process.env.VUE_APP_BASE_API// /api

const base = {
  // 出诊管理数据
  login: api + '/user/login',
  sendCode: api + '/user/sms'
}

// 导出
export default base
