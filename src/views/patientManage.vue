<template>
  <div class="manage_page">
    <div class="manage_title">
      <div class="back_icon" @click="$router.go(-1)">
        <van-icon name="arrow-left" />
      </div>
      <div class="patient_title">就诊者信息管理 </div>
      <div class="patient_add" ><van-icon name="plus" @click="$router.push('/patientAdd')"/></div>
    </div>
    <div class="patient_list">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item v-for="(item,index) in patientList" :key="index"  :title="item.patientName" >
          <div class="detail">
            <div class="detail_1">
              <div >姓名：{{ item.patientName }}</div>
            </div>
            <div class="detail_2">
              <div >年龄：{{ item.patientAge }}&emsp;&emsp;  性别：{{ item.patientSex }}</div>
            </div>
            <div class="detail_3">
              <div >电话号码：{{ item.patientPhone }}</div>
            </div>
            <div class="detail_4">
              <div >地址：{{ item.patientAddress }}</div>
            </div>
            <div class="detail_5">
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              <van-button type="info" size="small" @click="patientCase(item)">病例查看</van-button>&emsp;
              <van-button type="primary" size="small" @click="patientEdit(item)">编辑</van-button>&emsp;
              <van-button type="warning" size="small" @Click="patientDelete(item)">删除</van-button>
            </div>
          </div>

        </van-collapse-item>
        <div class="editback" @click="$router.push('/userinfo')">返回个人中心</div>
      </van-collapse>
    </div>
    <van-action-sheet v-model="show" title="标题">
      <div class="sheet_content">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in caseList" :key="item.id" :title="item.listTitle">
            <van-button type="primary" size="small" @click="caseView(item)">查看</van-button>
          </van-cell>
        </van-list>
      </div>
    </van-action-sheet>
    <!-- 单个往期病例弹窗 -->
    <van-dialog v-model="dialogShow"
      title="往期病例"
      @confirm="confirmClick"
      >
      <div class="case_content">
        <iframe :src="caseUrl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
      </div>
      </van-dialog>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState('login', ['userinfo'])
  },
  data () {
    return {
      caseUrl: '',
      dialogShow: false,
      caseList: [],
      loading: false,
      finished: true,
      show: false,
      activeName: '就诊者列表',
      patientList: []
    }
  },
  methods: {
    ...mapMutations('patient', ['setPatient', 'removePatient']),
    async getPatientList(id) {
      const res = await this.$api.getPatientList({ userId: id })
      this.patientList = res.data.data
    },
    patientCase(val) {
      this.getPatientCase(val)
      this.show = true
    },
    patientEdit(val) {
      console.log('这里是编辑前', val)
      this.setPatient(val)
      this.$router.push('/patientAdd')
    },
    // 显示往期病例
    caseView(val) {
      console.log('这里是检查病例', val)
      this.caseUrl = val.simpleCase
      this.dialogShow = true
    },
    // 获取病人的往期病例
    async getPatientCase(val) {
      console.log('这里是获取往期病例', val)
      const res = await this.$api.getPatientCase({ patientId: val.id })
      console.log('这里是获取病例', res.data)
      this.caseList = res.data.data
    },
    onLoad() {

    },
    confirmClick() {
      this.dialogShow = false
    },
    async patientDelete(val) {
      console.log('这里是删除前', val)
      const res = await this.$api.deletePatient(this.patient)
      console.log('这里是添加或修改之后', res)
      if (res.data.code === 200) {
        Toast.success('删除成功')
        this.finalProcess()
        setTimeout(() => {
          this.$router.push('/patientManage')
        }, 500)
      }
      if (res.data.code !== 200) {
        Toast.fail('删除失败,请重试')
      }
    }
  },
  created () {
    this.removePatient()
    this.getPatientList(this.userinfo.user.id)
  }
}
</script>
<style lang="less" scoped>
.manage_page{
  display: flex;
  flex-direction: column;
}

.manage_title{
  padding-top: 2%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 6.111vw;
  font-family: '楷体';
  .patient_title{
    padding-left: 6.944vw;
  }
  .patient_add{
    font-size: 8.333vw;
  }
  .back_icon{
    font-size: 8.333vw;
  }

}
.sheet_content {
    padding: 16px 16px 500px;
  }
.case_content{
  width: 100%;
  height: 400px;
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
