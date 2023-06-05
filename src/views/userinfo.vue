<template>
  <div class="userinfo">
    <img src="@/assets/backImg.png" class="back_img">
    <UserDetail></UserDetail>
  </div>
</template>

<script>
import UserDetail from '@/components/user/userDetail.vue'
export default {
  components: {
    UserDetail
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
.userinfo {
  height: 90%;
  .back_img{
    height: 91px;
    width: 100%;
  }
}
</style>
