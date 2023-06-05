<template>
  <div class="userDetail">
    <div>
      <div class="user_img">
        <img :src="userinfo.user.avatar">
      </div>
      <div class="user_edit">
        <div class="user_name">
          <div>您好 {{ userinfo.user.name }}</div>
        </div>
        <div class="user_function">
          <div class="edit_button">
            <van-button type="danger" class="button"  size="large"
            color="linear-gradient(to right, #ff6034, #ee0a24)" round  @click="$router.push('/user_edit')">
              <van-icon name="setting-o" style="font-size: 6vw"/>
              <span style="font-size: 6vw">编辑用户信息</span>
            </van-button>
          </div>
          <div class="patient_button">
            <van-button type="primary" class="button" size="large" color="linear-gradient(to right, #50FAE6, #4B56EF)" round
            @click="$router.push('/patientManage')">
              <van-icon name="friends-o" style="font-size: 6vw"/>
              <span style="font-size: 6vw">就诊者管理</span>
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState('login', ['userinfo'])
  },
  data () {
    return {
      avatarImage: ''
    }
  },
  methods: {
    toLogin(path) {
      console.log('这里是跳转页面')
      this.$router.push(
        { path }
      )
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
.userDetail{
  background-color: white;
  padding:2vw 3.333vw;
  > div:nth-child(1){
    display: flex;
  }
  .user_img{
    margin-right: 5.556vw;
    border: 1px solid black ;
    border-left: 0;
    border-top: 0;
    border-bottom: 0;
    img{
      margin-top: 5%;
      height: 23.611vw;
      width: 23.611vw;
      border-radius: 50%;
    }
  }
  .user_edit{
    flex:1;
    flex-direction: column;
    margin-right: 2%;
    .user_name{
      margin-top: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 6vw;
    }

    .user_function{
      margin-top: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 7vw;
      .edit_button{
        width: 100%;
        .button{
          height:100%;
        }
      }

      .patient_button{
        margin-top: 5%;
        width: 100%;
        .button{
          height:100%;
        }
      }
    }
  }
}
</style>
