<template>
  <div class="layout">
    <Navbar></Navbar>
    <div class="infomation">
      <router-view/>
    </div>
    <div class="nav">
      <!-- 底部导航 -->
      <van-tabbar route>
        <van-tabbar-item icon="search" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/userinfo">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/navbar.vue'
export default {
  components: {
    Navbar
  },
  data () {
    return {

    }
  },
  methods: {},
  created () {}
}
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
}
</style>
