import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hitokoto: {},
    favorites: [],
    favoritesID: [],
    myTitle: '亦言',
    loveWeb: false,
    primary: '#41555D',
    colorName: '黯',
    dataOrigin: 'random',
    cardMode: 'normal',
    showTip: true
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
    setMyTitle (state, myTitle) {
      state.myTitle = myTitle
    },
    setLoveWeb (state, loveWeb) {
      state.loveWeb = loveWeb
    },
    setPrimary (state, primary) {
      state.primary = primary
    },
    setColorName (state, colorName) {
      state.colorName = colorName
    },
    setDataOrigin (state, dataOrigin) {
      state.dataOrigin = dataOrigin
    },
    setCardMode (state, cardMode) {
      state.cardMode = cardMode
    },
    setShowTip (state, showTip) {
      state.showTip = showTip
    }
  },
  plugins: [createPersiste()]
})
