import requests from '@/utils/request'
export default {
  namespaced: true,
  state () {
    return {
      // 客户列表
      clientsList: []
    }
  },
  mutations: {
    updateList (state, newList) {
      state.clientsList = newList
    }
  },
  actions: {
    async getList (context) {
      // 模块名
      const res = await requests.get('/client')
      console.log(res)
      context.commit('updateList', res)
    }
  },
  getters: {

  }
}
