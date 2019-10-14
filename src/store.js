import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hitokoto: {},
    favorites: [],
    favoritesID: [],
    favoritesColor: 'white',
    myTitle: '亦言',
    transform: '',
    loveWeb: false
  },
  mutations: {
    setHitokoto (state, hitokoto) {
      state.hitokoto = hitokoto
    },
    setFavoritesID (state, favoritesID) {
      state.favoritesID = favoritesID
    },
    setFavorites (state, favorites) {
      state.favorites = favorites
    },
    setFavoritesColor (state, favoritesColor) {
      state.favoritesColor = favoritesColor
    },
    setMyTitle (state, myTitle) {
      state.myTitle = myTitle
    },
    setTransform (state, transform) {
      state.transform = transform
    },
    setLoveWeb (state, loveWeb) {
      state.loveWeb = loveWeb
    }
  },
  plugins: [createPersiste()]
})
