<template>
  <v-layout align-content-start justify-center column fill-height>
    <v-layout wrap justify-center align-content-center fill-height>
      <v-flex xs10 lg8
        class="home-card-bg"
        :class="getTransform"
      >
        <zero-card
          class="home-card"
          :class="getTransform"
          :hitokoto="hitokoto"
          @dbclick="addFavorite"
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
        @click="getNewHitokoto('load')"
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
        flat
        style="background:none"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import ZeroCard from '../components/ZeroCard'
import { api } from '../utils/axios'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
      loading: true, //  工具栏加载动画
      expand: false, //  展开过渡
      snackbar: false, //    提示消息
      snackbarTip: '', //  复制·提示语
      snackbarColor: '', //  提示消息 ·颜色
      timeout: 1500,
      hitokoto: {}, //  一言内容
      type: ['a', 'b', 'c', 'd', 'e', 'f', 'g'] //  一言类型
    }
  },
  components: {
    ZeroCard
  },
  computed: {
    getTimeHex () {
      return this.$vuetify.theme.primary
    },
    getHitokoto () {
      return this.$store.state.hitokoto
    },
    getFavoritesID () {
      return this.$store.state.favoritesID
    },
    getFavorites () {
      return this.$store.state.favorites
    },
    getTransform () {
      return this.$store.state.transform
    }
  },
  methods: {
    setSnackbar (color, tip) {
      this.$data.snackbar = true
      this.$data.snackbarColor = color
      this.$data.snackbarTip = tip
    },
    addFavorite () {
      let _this = this
      let hitokoto = _this.getHitokoto
      let id = hitokoto.id
      let favorites = _this.getFavorites
      let favoritesID = _this.getFavoritesID
      let index = favoritesID.indexOf(id)
      let transform = 'transform'
      let favoritesColor = 'error'
      if (Object.keys(favoritesID).length === 0) {
        favoritesID = []
        favorites = []
      }
      if (index !== -1) {
        favoritesID.splice(index, 1)
        favorites.splice(index, 1)
        transform = ''
        favoritesColor = 'white'
      } else {
        favoritesID.push(id)
        favorites.push(hitokoto)
      }
      _this.$store.commit('setFavoritesID', favoritesID)
      _this.$store.commit('setFavorites', favorites)
      _this.$store.commit('setTransform', transform)
      _this.$store.commit('setFavoritesColor', favoritesColor)
    },
    getNewHitokoto (opt) {
      let _this = this
      let hitokoto = _this.getHitokoto
      let zeroCard = document.getElementsByClassName('zero-card')[0]
      let zeroCardStyle = document.getElementsByClassName('zero-card')[0].style
      let oldHeight = zeroCard.clientHeight
      zeroCardStyle.height = 'auto'
      _this.$data.loading = true
      if (Object.keys(hitokoto).length === 0 || opt === 'load') {
        api.get('https://v1.hitokoto.cn/').then(res => {
          _this.$data.loading = false
          hitokoto = res
          _this.$data.hitokoto = hitokoto
          _this.$store.commit('setHitokoto', hitokoto)
          _this.checkFavorites()
          _this.$nextTick(() => {
            let newHeight = zeroCard.clientHeight
            zeroCardStyle.height = oldHeight + 'px'
            setTimeout(() => {
              zeroCardStyle.height = newHeight + 'px'
            }, 16)
          })
        }).catch(erro => {
          _this.$data.loading = false
          _this.setSnackbar('error', '(๑• . •๑)~~出错了，请稍后重试')
        })
      } else {
        _this.$data.hitokoto = hitokoto
        _this.checkFavorites()
        _this.$data.loading = false
      }
    },
    checkFavorites () {
      let hitokoto = this.getHitokoto
      let favoritesID = this.getFavoritesID
      let index = favoritesID.indexOf(hitokoto.id)
      let favoritesColor = index === -1 ? 'white' : 'error'
      let transform = index === -1 ? '' : 'transform'
      this.$store.commit('setFavoritesColor', favoritesColor)
      this.$store.commit('setTransform', transform)
    }
  },
  mounted () {
    let _this = this
    _this.$store.commit('setMyTitle', '亦言')
    _this.getNewHitokoto('start')
  }
}
</script>

<style lang="stylus" scoped>
.home-card-bg
  border-radius 2px
  background #FB5E5B
  transition all .3s
  &.transform
    transform translateX(10px)
.home-card
  transition all .3s
  &.transform
    transform translateX(-20px)
.btn-box
  height 150px
  .btn-load
    display block
    margin 30px auto
</style>
