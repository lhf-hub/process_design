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
  { path: '/' },
  { path: '/clientsInfo', name: '客户管理', component: () => import('@/views/clients') },
  { path: '/workersInfo', name: '员工管理', component: () => import('@/views/workers') },
  { path: '/myTask', name: '工作台', component: () => import('@/views/myTask') },
  { path: '/assignTasks', name: '分配任务', component: () => import('@/views/assign') },
  { path: '/sendEmail', name: '邮箱', component: () => import('@/views/email') },
  { path: '/myWorkersInfo', name: '我的员工', component: () => import('@/views/myWorkersInfo') },
  { path: '/analysis', name: '绩效评估', component: () => import('@/views/analysis') }

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