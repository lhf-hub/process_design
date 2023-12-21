import Vue from 'vue'
import Vuex from 'vuex'
import clients from './clients'
import workers from './workers'
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
    clients,
    workers
  }
})
