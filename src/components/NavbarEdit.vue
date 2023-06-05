<template>
  <div class="">
    <van-nav-bar
      :title="this.title"
      left-text="返回"
      right-text="登出"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['title'],
  components: {},
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations('login', ['removeUser']),
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push('/login')
      // 清空登录
      this.removeUser()
      console.log('----退出登录----------------')
      localStorage.removeItem('info') // 删除有问题 需要单独删除模块名称  vuex持久化注意的 插件--
      localStorage.removeItem('login')
    }
  },
  created () {}
}
</script>
<style lang="less" scoped>
</style>
