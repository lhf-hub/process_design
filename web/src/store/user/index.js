// export default {
//   namespaced: true,
//   state () {
//     return {
//       userList: {
//         account_id: 'AAA',
//         account_passWord: '123456',
//         supervisor_id: 'zhuguan3',
//         role: 'Boss',
//         employee_id: 'zhuguan3',
//         employee_name: 'hyrsfdez',
//         department_id: '3'
//       }

//     }
//   },
//   actions: {

//   },
//   mutations: {
//     updateList (state, newList) {
//       state.userList = newList
//     }

//   },
//   getters: {
//     // async getList (context, newList) {
//     //   context.commit('updateList', newList)
//     // }

//   }
// }
export default {
  namespaced: true,
  state () {
    return {
      userList: {
        isLogin: false,
        account_id: '',
        account_passWord: '',
        supervisor_id: '',
        role: '',
        employee_id: '',
        employee_name: '',
        department_id: ''
      }
    }
  },
  actions: {
    updateList ({ commit }, newList) {
      commit('updateList', newList)
    }
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
