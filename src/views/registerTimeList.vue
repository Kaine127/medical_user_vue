<template>
  <div class="registerTimeList">
    <div class="register_title">
      <div class="title_icon" @click="$router.go(-1)">
        <van-icon name="arrow-left" />
      </div>
      <div class="title_text">医生: {{ doctorName }} 的可预约挂号列表</div>
      <div></div>
    </div>
    <div class="TimeList">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item.id" :title="item.registerDay" :title-style="{ paddingTop: '0.833vw' }">
            <div class="registerItem">
              <!-- <div>{{ item.registerDay }}</div> -->
              <div class="item1">{{ item.week }}&emsp;&emsp;</div>
              <div class="item2">剩余可挂号数：{{ item.number }}</div>&emsp;
              <div class="item3"><van-button class="registerButton" plain hairline type="primary" size="small" @click="selectPatient(item)">挂号</van-button></div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <!-- 点击挂号后的挂号信息确认名单 -->
      <van-popup v-model="show" position="right">
        <van-form @submit="onSubmit">
          <van-field
            v-model="selectedTime.registerDay"
            name="registerDay"
            label="就诊日期："
          />
          <van-field
            v-model="selectedTime.week"
            name="week"
            label="就诊时间："
          />
          <van-field
            readonly
            clickable
            name="picker"
            required
            :value="selectedTime.patientName"
            label="就诊者"
            :rules="[{ required: true, message: '请选择就诊者' }]"
            placeholder="点击选择就诊者"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :default-index="0"
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </van-popup>

    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState('register', ['doctorInfo'])
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: true,
      refreshing: false,
      show: false,
      showPicker: false,
      content: '',
      doctorName: '',
      selectedTime: {
        registerDay: '',
        week: '',
        patientName: ''

      },
      columns: ['请添加就诊者信息', '请添加就诊者信息']
    }
  },
  methods: {
    onLoad() {

    },
    onRefresh() {
      // 清空列表数据
      // this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.onLoad()
    },
    async getRegisterList() {
      const res = await this.$api.getRegisterList({ doctorId: this.doctorInfo.doctorId })
      console.log('这里是获取后', res)
      this.list = res.data.data
    },
    init() {
      this.doctorName = this.doctorInfo.doctorName
      this.getRegisterList()
    },
    confirmClick() {
      this.show = false
    },
    selectPatient(val) {
      console.log('这里是选择病人类', val)
      this.selectedTime = JSON.parse(JSON.stringify(val))
      this.selectedTime.patientName = ''
      console.log('这里是验证对象添加', this.selectedTime)
      this.show = true
    },
    onSubmit() {
      this.doRegister()
    },
    onConfirm(value) {
      this.selectedTime.patientName = value
      this.showPicker = false
    },
    async getPatientSelections() {
      const res = await this.$api.getPatientSelections()
      console.log('这里获取了该账户下的就诊者姓名列表', res)
      this.columns = res.data.data
    },
    async doRegister() {
      Toast.success('操作成功')
      console.log('这里进行进行预约挂号验证', this.selectedTime)

      const res = await this.$api.doRegister(this.selectedTime)
      if (res.data.code === 200) {
        Toast.success('挂号成功')
        setTimeout(() => {
          this.$router.push('/home')
        }, 500)
      }
    }

  },
  created () {
    this.init()
    this.getPatientSelections()
  }
}
</script>
<style lang="less" scoped>
 .register_title{
    padding-top: 2%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .title_icon{
      font-size: 8.333vw;
    }

    .title_text{
      font-size: 5.556vw;
      font-family: "黑体";
    }
  }

  .registerItem{
    display: flex;
    align-items: center;
  }

  .van-cell__value{
    min-width: 80%;
  }
  .registerButton{
    align-items: center;
    border-bottom: 4.167vw;
    height: 6.944vw;
    width: 13.889vw;
  }
</style>
