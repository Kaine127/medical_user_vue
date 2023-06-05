<template>
  <div class="home">

   <div>
    <div class="topImg">
      <img class="image" src="@/assets/hospital.png">
    </div>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      已预约挂号
    </van-divider>
    <!-- 已挂号列表 -->
    <div class="userRegister">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
      <van-swipe-cell  v-for="item in userRegisterList" :key="item.id">
        <van-cell :border="false"  :title="item.registerDay">
          <div class="registerInfo">
            <div class="info1">
              <div>&emsp;&emsp;{{ item.week }}</div>
             <div>&emsp;&emsp;&emsp;就诊者：{{ item.registerName }}</div>
            </div>
            <div class="info2">
              <div>&emsp;&emsp;医生：{{ item.doctorName }}</div>
             <div>&emsp;&emsp;签到码：{{ item.sign }}</div>
            </div>
          </div>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" class="registerDeleteButton" @click="registerDelete(item.id)" />
        </template>
      </van-swipe-cell>
      </van-list>
    </div>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      可挂号的医生列表
    </van-divider>
    <!-- 医生列表 -->
    <div class="doctorList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="到底了,下拉刷新"
        @load="onLoad"
      >
        <van-cell class="doctorInfo" v-for="(value,key) in doctorMap" :key="key" :title="value">
          <div><van-button type="warning" size="small" class="registerButton"  @click="doRegister(key,value)">预约挂号</van-button></div>
        </van-cell>
      </van-list>
    </div>
   </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapMutations } from 'vuex'
export default {
  components: {},
  data () {
    return {
      doctorMap: '',
      userRegisterList: '',
      loading: false,
      finished: true
    }
  },
  methods: {
    ...mapMutations('register', ['setDoctorInfo', 'removeDoctorInfo']),
    async timeTest() {
      console.log('这里似乎是时间测试方法')
      this.$api.getRegisterDoctor()
    },
    async getRegisterDoctor() {
      console.log('这里是获取医生列表')
      const res = await this.$api.getRegisterDoctor()
      console.log('这里是获取医生列表后', res)
      this.doctorMap = res.data.data
    },
    onLoad() {

    },
    async doRegister(id, name) {
      console.log('这里是挂号方法', id, name)
      this.setDoctorInfo({ doctorId: id, doctorName: name })
      this.$router.push('/registerTimeList')
    },
    async getUserRegisterList() {
      console.log('这里是获取用户的挂号信息')
      const res = await this.$api.getUserRegisterList()
      console.log('这里是获取用户挂号信息的结果', res)
      this.userRegisterList = res.data.data
    },
    async registerDelete(val) {
      console.log('要删除的挂号id为:', val)
      const res = await this.$api.registerDelete({ id: val })
      console.log('这里是删除之后', res)
      if (res.data.code === 200) {
        Toast.success('删除成功')
        setTimeout(() => {
          this.init()
        }, 500)
      }
    },
    init() {
      this.getRegisterDoctor()
      this.getUserRegisterList()
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.doctorInfo{
  align-items: center;
  padding: 0;
  padding-left: 6.944vw;
  font-size: 5vw;
  font-family: "楷体";
  .registerButton{
    font-size: 5vw;
  }
}
.registerInfo{
  display: flex;
  flex-direction: column;
  .info1{
    display: flex;
    flex-direction: row;
  }
  .info2{
    display: flex;
    flex-direction: row;
  }
}
.van-cell__value{
    min-width: 85%;
  }
  .registerDeleteButton{
    height: 100%;
  }
  .image{
    height: 150px;
    width: 100%;
  }
</style>
