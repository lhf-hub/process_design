import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

// 添加以下代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Mange',
    component: () => import('@/views/manage'),
    redirect: '/login',
    children: [
      { path: '/clientsInfo', name: '客户管理', component: () => import('@/views/clients') },
      { path: '/employeeInfo', name: '员工管理', component: () => import('@/views/employee') },
      { path: '/myTask', name: '工作台', component: () => import('@/views/myTask') },
      { path: '/assignTasks', name: '分配任务', component: () => import('@/views/assign') },
      { path: '/analysis', name: '绩效评估', component: () => import('@/views/analysis') },
      { path: '/cloud', name: '云盘', component: () => import('@/views/cloud') },
      { path: '/person', name: '个人信息', component: () => import('@/views/person') },
      { path: '/monitor', name: '监控室', component: () => import('@/views/monitor') }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login')

  },
  {
    path: '/register',
    name: '注册',
    component: () => import('@/views/register')

  },
  {
    path: '/monitor',
    name: '监控',
    component: () => import('@/views/monitor')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem('currentPathName', to.name)// 设置当前路由,为了 在header组件中去使用
  // alert(to.name)
  store.commit('setPath') // 触发store的数据更新
  next() // 放行路由
})
export default router
