import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'

Vue.use(Vuex)

const hitos = [{id: 543, hitokoto: "我秃了，我也变强了", type: "a", from: "一拳超人", creator: "没了", created_at: "1472551554"},{"id":872,"hitokoto":"忌妒别人，不会给自己增加任何的好处。忌妒别人，也不可能减少别人的成就。","type":"g","from":"佛教禅语","creator":"hitokoto","created_at":"1478787580"},{"id":4142,"hitokoto":"你能留给岁月的，岁月能留给你的，除了一个最好的自己，别无他物。","type":"e","from":"原创","creator":"竹恋蝶","created_at":"1543562384"},{"id":3635,"hitokoto":"我说：“ 我确信 你知道的，只有努力，才不会让自己轻易地被别人打倒或者看不起。”\r\n你说：“ 我知道，我知道，我一直都知道。”","type":"e","from":"Nice·南先生","creator":"Nice南先生","created_at":"1526718612"},{"id":558,"hitokoto":"正因为生命有限，所以才显得重要，正因为生命有限，所以才更应该努力不懈！","type":"a","from":"名侦探柯南","creator":"贝贝","created_at":"1472978465"},{"id":3643,"hitokoto":"纵有疾风起人生不言弃","type":"g","from":"宫崎骏","creator":"woober","created_at":"1527740056"}]

export default new Vuex.Store({
  state: {
    hitokotos: {},
    curIndex: 0,
    favorites: []
  },
  getters: {
    getHitokotos(state) {
      return state.hitokotos
    },
    getCurIndex(state) {
      return state.curIndex
    },
    getFavorites(state) {
      return state.favorites
    }
  },
  mutations: {
    setHitokotos(state, hitokotos) {
      state.hitokotos = hitokotos
    },
    setCurIndex(state, curIndex) {
      state.curIndex = curIndex
    },
    setFavorites(state, favorites) {
      state.favorites = favorites
    }
  },
  actions: {

  },
  plugins: [createPersiste()]
})
