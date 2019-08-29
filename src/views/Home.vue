<template>
  <v-layout align-content-start justify-center column fill-height>
    <v-layout row wrap justify-center align-content-center>
      <v-flex xs10 lg8>
        <zero-card
          v-bind:hitokoto="hitokoto"
          @like="addFavorite"
        />
      </v-flex>
    </v-layout>
    <div class="btn-box">
      <v-btn
        class="btn-load"
        icon
        color="primary"
        x-large
        :loading="loading"
        @click="getHitokoto('load')"
        >
        <v-icon 
          x-large
        >fas fa-circle-notch</v-icon>
      </v-btn>
    </div>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="timeout"
    >
      {{ snackbarTip }}
      <v-btn
        text
        style="background:none"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import ZeroCard from "../components/ZeroCard"
import { formatDate } from "../utils/formatDate"
import { api } from "../utils/axios"
import { truncate } from 'fs'
import { setTimeout } from 'timers'

export default {
  data() {
    return {
      loading: true, //  工具栏加载动画
      expand: false, //  展开过渡
      snackbar: false, //    提示消息
      snackbarTip: "", //  复制·提示语
      snackbarColor: "", //  提示消息 ·颜色
      timeout: 1500,
      hitokoto: {}, //  一言内容
      type: ["a", "b", "c", "d", "e", "f", "g"], //  一言类型
    };
  },
  components: {
    ZeroCard
  },
  computed: {
    getTimeHex() {
      return this.$vuetify.theme.primary
    },
    gethitokoto() {
      return this.$store.state.hitokoto
    },
    getFavoritesID() {
      return this.$store.state.favoritesID
    },
    getFavorites() {
      return this.$store.state.favorites
    }
  },
  methods: {
    setSnackbar(color, tip) {
      this.$data.snackbar = true
      this.$data.snackbarColor = color
      this.$data.snackbarTip = tip
    },
    addFavorite() {
      let _this = this
      let hitokoto = _this.gethitokoto
      let id = hitokoto.id
      let favorites = _this.getFavorites
      let favoritesID = _this.getFavoritesID
      let index = favoritesID.indexOf(id)
      if (Object.keys(favoritesID).length === 0) {
        favoritesID = []
        favorites = []
      }
      if (index !== -1) {
        favoritesID.splice(index,1)
        favorites.splice(index,1)
        _this.$store.commit('setFavoritesID', favoritesID)
        _this.$store.commit('setFavorites', favorites)
        _this.setSnackbar('info', '^_^ 取消收藏')
        _this.$store.commit('setFavoritesColor', 'white')
      } else {
        favoritesID.push(id)
        favorites.push(hitokoto)
        _this.$store.commit('setFavoritesID', favoritesID)
        _this.$store.commit('setFavorites', favorites)
        _this.setSnackbar('pink', '^_^ 已收藏')
        _this.$store.commit('setFavoritesColor', 'red')
      }
    },
    getHitokoto(opt) {
      let _this = this
      let hitokoto = _this.gethitokoto
      let zeroCard = document.getElementsByClassName('zero-card')[0]
      let zeroCardStyle = document.getElementsByClassName('zero-card')[0].style
      let oldHeight = zeroCard.clientHeight
      zeroCardStyle.transition = 'none'
      zeroCardStyle.height = 'auto'
      _this.$data.loading = true
      if (Object.keys(hitokoto).length === 0 || opt === 'load') {
        api.get("https://v1.hitokoto.cn/").then(res => {
          _this.$data.loading = false
          hitokoto = res
          _this.$data.hitokoto = hitokoto
          _this.$store.commit('sethitokoto', hitokoto)
          _this.checkFavorites()
          _this.$nextTick(()=> {
            let newHeight = zeroCard.clientHeight
            zeroCardStyle.height = oldHeight + 'px'
            zeroCardStyle.transition = 'height 300ms ease'
            setTimeout(()=>{
              zeroCardStyle.height = newHeight + 'px'
            }, 16)
          })
        }).catch(erro=>{
          _this.$data.loading = false
          _this.setSnackbar('error', '(๑• . •๑)~~出错了，请稍后重试')
        })
      } else {
        _this.$data.hitokoto = hitokoto
        _this.checkFavorites()
        _this.$data.loading = false
      }
    },
    getManyHitokoto() {
      let _this = this
      let hitokoto = _this.gethitokoto
      let curIndex = _this.getCurIndex
      if (hitokoto.length > 0) {
        _this.$data.hitokoto = hitokoto
        _this.$data.btnPrev = curIndex === 0 ? true : false
        _this.$data.loading = false
      } else {
        let types = _this.$data.type
        for (let i = 0; i < types.length; i++) {
          api
            .get("https://v1.hitokoto.cn/", { params: { c: types[i] } })
            .then(res => {
              //_this.hitokoto = res
              hitokoto.push(res)
              _this.$store.commit('sethitokoto', hitokoto)
              if (i === 0) {
                _this.$data.hitokoto = _this.gethitokoto
                _this.$store.commit('setCurIndex', 0)
                _this.$data.loading = false
              }
            })
        }
      }
    },
    switchHitokoto(value) {
      let _this = this
      //let hitokoto = _this.gethitokoto
      let curIndex = _this.getCurIndex
      value === "prev" ? curIndex-- : curIndex++
      _this.$refs.swiper.slideTo(curIndex)
      _this.$store.commit('setCurIndex', curIndex)
      //_this.$data.hitokoto = hitokoto
      _this.$data.btnPrev = curIndex === 0 ? true : false
      //value === "next" && curIndex > 5 ? _this.getHitokoto() : ""
      if ( value === 'next' && curIndex > 5 ) {
        setTimeout(function() {
          _this.getHitokoto()
        }, 1000)
      }
    },
    switcherSync(activeIndex) {
      this.$data.btnPrev = activeIndex == 0 ? true : false
      this.$store.commit('setCurIndex', activeIndex)
      console.log('emit:'+ activeIndex)
    },
    checkFavorites() {
      let hitokoto = this.gethitokoto
      let favoritesID = this.getFavoritesID
      let index = favoritesID.indexOf(hitokoto.id)
      let favoritesColor = index === -1 ? 'white' : 'red'
      this.$store.commit('setFavoritesColor', favoritesColor)
    }
  },
  mounted() {
    let _this = this
    _this.$myTitle = '亦言'
    _this.getHitokoto('start')
  }
};
</script>

<style lang="stylus" scoped>
.btn-box
  height 150px
  .btn-load
    display block
    margin 30px auto
</style>