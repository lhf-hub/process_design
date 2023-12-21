import requests from '@/utils/request'
export default {
  namespaced: true,
  state () {
    return {
      // 部门员工列表
      workersList: []
    }
  },
  mutations: {
    updateList (state, newList) {
      console.log(newList)
      state.workersList = newList
    }
  },
  actions: {
    async getList (context) {
      // 模块名
      const res = await requests.get('/employee')
      console.log(res)
      context.commit('updateList', res)
    }
  },
  getters: {

  }
}
