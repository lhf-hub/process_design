import requests from '@/utils/request'
export default {
  namespaced: true,
  state () {
    return {
      // 部门列表
      departmentList: []
    }
  },
  mutations: {
    updateList (state, newList) {
      state.departmentList = newList
    }
  },
  actions: {
    async getList (context) {
      const newList = []
      // 模块名
      await requests.get('/employee/getDepartmentEmployee').then((res) => {
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            const { id, name } = res.data[i]
            newList[i] = { id, name }
          }
          context.commit('updateList', newList)
        }
      })
    }
  },
  getters: {

  }
}
