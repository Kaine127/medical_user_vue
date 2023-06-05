<template>
  <div class="">
    <NavBarEdit title="用户详细信息编辑"></NavBarEdit>
    <div v-if="user.id" class="editViews">
      <div style="margin-bottom:2.778vw;"></div>
      <div class="uploadfile">
          <div class="uploadimg"><van-uploader preview-size="100vw" :after-read="afterRead" /></div>
          <UserBanner left="头像">
              <img :src="user.avatar"  slot="right" alt="" v-if="user.avatar">
              <img src="@/assets/default_img.jpg"  slot="right" alt="" v-else>
          </UserBanner>
      </div>

      <UserBanner left="名称" @bannerClick="show = true">
          <a href="javascript:;" slot="right">{{user.name}}</a>
      </UserBanner>

      <UserBanner left="手机号">
          <a href="javascript:;" slot="right" >{{user.phone}}</a>
      </UserBanner>

      <UserBanner left="性别" @bannerClick="sexShow = true">
           <a href="javascript:;" slot="right" >{{user.sex}}</a>
      </UserBanner>

      <div class="editback" @click="$router.push('/userinfo')">返回个人中心</div>

      <van-dialog v-model="show"
      title="名称"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="content = ''"
      >
          <van-field v-model="content"  autofocus />
      </van-dialog>

       <van-action-sheet v-model="sexShow" cancel-text="取消" :actions="actions" @select="onSelect" />
  </div>
  </div>

</template>

<script>
import NavBarEdit from '@/components/NavbarEdit.vue'
import UserBanner from '@/components/user/userBanner.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    NavBarEdit,
    UserBanner
  },
  computed: {
    ...mapState('login', ['userinfo'])
  },
  data () {
    return {
      user: {
      },
      show: false,
      sexShow: false,
      content: '',
      actions: [
        { name: '男', val: '男' },
        { name: '女', val: '女' }
      ]
    }
  },
  methods: {
    ...mapMutations('login', ['setInfo']),
    // 进入组件调取数据渲染页面
    async selectUser() {
      const res = await this.$api.getUser({ userId: this.userinfo.user.id })
      if (res.data.code === 200) {
        console.log('获取用户成功', res.data)
        this.user = res.data.data
      }
    },
    async afterRead(file) {
      const fromdata = new FormData()
      fromdata.append('file', file.file)
      const res = await this.$api.upload(fromdata)
      console.log('这里是上传后，得到的结果是', res.data)
      this.user.avatar = res.data.data.url
      this.UserUpdate()
      this.$refs.navbar.NavInit()
    },
    async UserUpdate() {
      console.log('这里是上传串图片前', this.user)
      console.log('这里是上传串图片前', this.user.id)
      const res = await this.$api.updateUser(this.user)
      if (res.data.code === 200) {
        this.$msg.fail('修改成功')
        const afterUpdate = await this.$api.getUser({ userId: this.userinfo.user.id })
        console.log('这里是更新后', afterUpdate.data)
        this.setInfo(afterUpdate.data.data)
      }
    },
    confirmClick() {
      this.user.name = this.content
      this.UserUpdate()
      this.content = ''
    },
    onSelect(data) {
      this.user.sex = data.val
      this.UserUpdate()
      this.sexShow = false
    }
  },
  created () {
    this.selectUser()
  }
}
</script>
<style lang="less" scoped>
.editViews a{
    color: #333;
}
.editViews img{
    height: 12.778vw;
    width: 12.778vw;
    border-radius: 50%;
}
.uploadfile{
    overflow: hidden;
    position: relative;
    .uploadimg{
        opacity: 0;
        position: absolute;
    }
}
.editback{
    margin-top: 5.556vw;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    color: #999;
    padding: 4.167vw 0;
    font-size: 4vw;
}
</style>
