import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import requests from '@/utils/request'
import axios from 'axios'
Vue.use(VueRouter)

// 添加以下代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    component: () => import('@/views/manage'),
    children: [
      { path: '/clientsInfo', name: '客户管理', component: () => import('@/views/clients') },
      { path: '/employeeInfo', name: '员工管理', component: () => import('@/views/employee') },
      { path: '/analysis', name: '营业额统计', component: () => import('@/views/analysis') },
      { path: '/employeeAnalysis', name: '员工绩效', component: () => import('@/views/employeeAnalysis') },
      { path: '/cloud', name: '云盘', component: () => import('@/views/cloud') },
      { path: '/monitor', name: '监控室', component: () => import('@/views/monitor') },
      { path: '/myTask', name: '工作台', component: () => import('@/views/myTask') },
      { path: '/assignTasks', name: '分配任务', component: () => import('@/views/assign') },
      { path: '/employeeTask', name: '员工工作台', component: () => import('@/views/employeeTask') },
      { path: '/employeeProject', name: '员工项目管理', component: () => import('@/views/employeeProject') },

      //这里添加你的（主管的）项目管理：

    ]

  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login')

  }]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  setTimeout(() => {
    localStorage.setItem('currentPathName', to.name)// 设置当前路由,为了 在header组件中去使用
    // alert(to.name)
    store.commit('setPath') // 触发store的数据更新
    if (to.path == '/login') {
      next()
      return;
    }
    const token = localStorage.getItem('token')
    if (!token) {
      next("/login")
      return;
    }
    axios.post('http://localhost:5000/user/verify', {}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      console.log(res.data);
      if (res.data.code == 200) {
        const user = {
          isLogin: true,
          account_id: res.data.data.account_id,
          account_passWord: res.data.data.account_passWord,
          supervisor_id: res.data.data.supervisor_id,
          role: res.data.data.role,
          employee_id: res.data.data.employee_id,
          employee_name: res.data.data.employee_name,
          department_id: res.data.data.department_id,
        }
        store.dispatch('user/updateList', user)
        next()
      } else {
        next("/login")
      }
    }).catch(err => {
      next("/login")
    })

  }, 100);

})
export default router
