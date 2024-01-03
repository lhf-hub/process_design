export default {
  namespaced: true,
  state () {
    return {
      userList: {
        account_id: 'AAA',
        account_passWord: '123456',
        supervisor_id: '1',
        role: 'Boss',
        employee_id: '1',
        employee_name: '1',
        department_id: '2'
      }

    }
  },
  actions: {

  },
  mutations: {
    updateList (state, newList) {
      state.userList = newList
    }

  },
  getters: {
    async getList (context, newList) {
      context.commit('updateList', newList)
    }

  }
}
