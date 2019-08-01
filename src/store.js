import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hitokotos: [] || localStorage.getItem('hitokotos'),
    curIndex: 0 || localStorage.getItem('curIndex'),
    favorites: [] || localStorage.getItem('favorites')
  },
  getters: {
    
  },
  mutations: {

  },
  actions: {

  }
})
