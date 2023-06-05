<template>
  <div class="login">
    <LoginTop middleTop="登录就诊者用户端"></LoginTop>
    <div class="login_form">
      <van-form ref="form" @submit="onSubmit">
        <van-field
            v-model="phone"
            type="phone"
            clearable
            name="phone"
            :rules="userTel"
            placeholder="请输入手机号" />
        <van-field
            v-model="sms"
            center
            clearable
            placeholder="请输入短信验证码"
            type="digit"
            >
            <template #button>
                <van-button
                type="primary"
                @click="sendCode"
                :disabled="disabled"
                native-type="button">
                {{codeMsg}}
                </van-button>
            </template>
        </van-field>
        <div style="margin: 0.4267rem;">
            <van-button
            round
            block
            type="info"
            native-type="submit"
            >登录
            </van-button>
        </div>
    </van-form>
    </div>
  </div>
</template>

<script>
import LoginTop from '@/components/LoginTop.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    LoginTop
  },
  data () {
    return {
      phone: '',
      sms: '',
      disabled: false,
      codeNum: 60,
      codeMsg: '获取短信验证码',
      userTel: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'onBlur'
        },
        {
          validator: value => {
            return /^1[23456789]\d{9}$/.test(value)
          },
          message: '请输入正确格式的手机号'
        }
      ]

    }
  },
  methods: {
    ...mapMutations('login', ['setUser']),
    // 获取短信验证码
    async sendCode() {
      console.log('这里是获取验证码')
      // 验证手机号格式是否正确
      if (!this.userTel[1].validator(this.phone)) return
      console.log('这里是获取验证码,并通过了校验')
      // 请求短信验证码接口
      const res = await this.$api.sendCode({
        phone: this.phone
      })
      if (res.data.code === 200) {
        console.log('这里是成功方法区', res.data)
      }
      // 禁用按钮
      this.disabled = true
      // 倒计时
      const timer = setInterval(() => {
        --this.codeNum
        this.codeMsg = `重新发送(${this.codeNum})`
      }, 1000)
      // 判断什么时候停止定时器
      const timer1 = setInterval(() => {
        clearInterval(timer)
        console.log('判断什么时候停止定时器')
        this.codeNum = 60
        this.disabled = false
        this.codeMsg = '发送验证码'
        clearInterval(timer1)
      }, 60000)
    },
    async onSubmit() {
      // 进行用户登录
      // 验证手机号格式是否正确
      if (!this.userTel[1].validator(this.phone)) return
      // 1. 获取用户输入的内容 2. 请求接口  3. 请求成功-存储登录信息--进入首页
      const res = await this.$api.login({
        phone: this.phone,
        code: this.sms
      })
      console.log('登录接口请求----', res)
      if (res.data.code === 200) {
        // 存储登录信息--vuex
        console.log('这里是是setUser前', res.data.data.user)
        console.log('这里是是setUser前', res.data.data.token)
        this.setUser({ user: res.data.data.user, token: res.data.data.token })
        // 登录成功了---进入首页
        console.log('进入首页了')
        this.$router.push('/')
      }
    }
  },
  created () {}
}
</script>
<style lang="less" scoped>
  /deep/ .login_form{
    height: 50%;
    font-size: 13.889vw;
  }
</style>
