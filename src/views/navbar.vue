<template>
  <!-- 首页与我的 标题功能 -->
  <div class="navbar">
    <div class="left_img">
      <img src="@/assets/homepage.png">
    </div>
    <div class="titleName">就诊者用户端</div>
    <!-- 退出选项 -->
    <div class="right_img" @click="show = true">
      <van-icon name="guide-o" size="2rem"/>
    </div>
    <van-dialog v-model="show"
      title="用户退出"
      show-cancel-button
      @confirm="confirmClick"
      >
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;确定要退出嘛?
      </van-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  components: {},
  data () {
    return {
      show: false
    }
  },
  methods: {
    ...mapMutations('login', ['removeUser']),
    confirmClick() {
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

.navbar {
  height: 12vw;
  background-color: white;
  display: flex;
  justify-content: space-between;
  .left_img{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    img {
      width: 80%;
    }
  }
  .right_img{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    // height: 24px;
    img {
      width: 80%;
    }
  }
  .titleName{
    padding-top: 1.389vw;
    font-size: 5.556vw;
    font-family: '楷体';
  }
}
</style>
