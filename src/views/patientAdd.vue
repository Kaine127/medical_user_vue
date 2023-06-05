<template>
  <div class="patient_add">
    <div class="add_title">
      <div class="title_icon" @click="$router.go(-1)">
        <van-icon name="arrow-left" />
      </div>
      <div class="title_text">请输入就诊者信息</div>
      <div></div>
    </div>
    <div class="add_info">
      <van-form validate-first @failed="onFailed">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          label="姓名: "
          v-model="patient.patientName"
          name="patientName"
          placeholder="输入就诊者姓名"
          :rules="[{ namePattern, message: '请输入正确内容' }]"
        />
        <van-field
          label="年龄: "
          v-model="patient.patientAge"
          name="patientAge"
          placeholder="输入就诊者年龄"
          :rules="[{ agePattern, message: '请输入正确内容' }]"
        />
        <van-field
          readonly
          clickable
          name="patientSex"
          :value="patient.patientSex"
          label="性别: "
          placeholder="点击选择就诊者性别"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          label="身份证: "
          v-model="patient.idNumber"
          name="idNumber"
          placeholder="输入就诊者身份证"
          :rules="[{ validator:idValidator, message: '请输入正确内容' }]"
        />
        <van-field
          label="手机号: "
          v-model="patient.patientPhone"
          name="patientPhone"
          placeholder="输入就诊者手机号"
          :rules="patientFrom.tel"
        />
        <van-field
          label="地址: "
          v-model="patient.patientAddress"
          name="patientAddress"
          placeholder="输入就诊者地址"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="patientSubmit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState('patient', ['patientInfo'])
  },
  data () {
    return {
      patient: {
        id: '',
        patientName: '',
        patientAge: '',
        patientSex: '男',
        idNumber: '',
        patientAddress: '',
        patientPhone: ''
      },
      namePattern: /^[\u4e00-\u9fa5]{0,5}$/,
      agePattern: /^[0-9]+(.[0-9]{1,3})?$/,
      columns: ['男', '女'],
      showPicker: false,
      patientFrom: {
        tel: [
          { required: true, message: '手机号码不能为空！' },
          {
            validator: (val) => {
              return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(val)
            },
            message: '格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations('patient', ['setPatient', 'removePatient']),
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val)
    },
    async idValidator(val) {
      if (/^\d{15}|\d{18}$/.test(val) || /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/.test(val)) {
        const res = await this.$api.checkIdNumber({ idNumber: val })
        console.log('这里是检查身份证方法', res)
        if (res.data.code === 200) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading('验证中...')

        setTimeout(() => {
          Toast.clear()
          resolve(/\d{6}/.test(val))
        }, 1000)
      })
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo)
    },
    onConfirm(value) {
      this.patient.patientSex = value
      this.showPicker = false
    },
    async patientSubmit() {
      console.log('hahahahahahah', this.patient.id)
      let res = null
      if (this.patient.id === '') {
        console.log('这里是进行新增就诊者的信息提交')
        res = await this.$api.savePatient(this.patient)
      }
      console.log('这里是进行更新就诊者的信息提交')
      res = await this.$api.updatePatient(this.patient)
      console.log('这里是添加或修改之后', res)
      if (res.data.code === 200) {
        Toast.success('操作成功')
        this.finalProcess()
        setTimeout(() => {
          this.$router.push('/patientManage')
        }, 500)
      }
      if (res.data.code !== 200) {
        Toast.fail('录入失败,请重试')
      }
    },
    checkInfo() {
      if (this.patientInfo !== '') {
        this.patient = this.patientInfo
      }
    },
    finalProcess() {
      this.removePatient()
    }
  },
  created () {
    this.checkInfo()
  }
}
</script>
<style lang="less" scoped>
.patient_add {
  display: flex;
  flex-direction: column;
  .add_title{
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
}
</style>
