import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout.vue'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import Userinfo from '@/views/userinfo.vue'
import UserEdit from '@/views/edit.vue'
import PatientManage from '@/views/patientManage.vue'
import PatientAdd from '@/views/patientAdd.vue'
import RegisterTimeList from '@/views/registerTimeList.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/userinfo',
        name: 'userinfo',
        component: Userinfo
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user_edit',
    name: 'user_edit',
    component: UserEdit,
    meta: {
      istoken: true
    }
  },
  {
    path: '/patientManage',
    name: 'patientManage',
    component: PatientManage
  },
  {
    path: '/patientAdd',
    name: 'patientAdd',
    component: PatientAdd
  },
  {
    path: '/registerTimeList',
    name: 'registerTimeList',
    component: RegisterTimeList
  },
  {
    path: '*',
    redirect: '/'
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if ((!store.state.login.userinfo.token || !store.state.login.userinfo.user) && to.meta.istoken === true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router
