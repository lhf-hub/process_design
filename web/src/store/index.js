import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import department from './department'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPathName: ''
  },
  getters: {
  },
  mutations: {
    setPath (state) {
      state.currentPathName = localStorage.getItem('currentPathName')
    }
  },
  actions: {
  },
  modules: {
    user,
    department
  }
})
