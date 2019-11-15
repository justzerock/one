<template>
  <v-layout align-content-start justify-center column fill-height>
    <v-layout wrap justify-center align-content-center fill-height
      class="home-layout"
    >
      <v-flex
        class="home-card-bg"
      >
        <zero-card
          class="home-card"
          :hitokoto="hitokoto"
          :cardTextStyle="cardTextStyle"
          :cardNormalStyle="cardNormalStyle"
          :cardPoetStyle="cardPoetStyle"
          :modeBtnStyle="modeBtnStyle"
          :favIconStyle="favIconStyle"
          :poetTextStyle="poetTextStyle"
          @dbclick="addFavorite"
          @delFav="addFavorite"
          @switchMode="switchCardMode"
        />
        <zero-hand
          :start="start"
        />
      </v-flex>
    </v-layout>
    <div class="btn-box">
      <zero-loading
        class="btn-load"
        :loading="loading"
        @click="getSomeThing('load')"
      />
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
import ZeroHand from '../components/ZeroHand'
import ZeroLoading from '../components/ZeroLoading'
import { api } from '../utils/axios'
const jinrishici = require('jinrishici')

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
      cardNormalStyle: {},
      cardPoetStyle: {
        height: '30vh'
      },
      cardTextStyle: {},
      modeBtnStyle: {},
      favIconStyle: {},
      poetTextStyle: {
        display: 'block'
      },
      start: false
    }
  },
  components: {
    ZeroCard,
    ZeroLoading,
    ZeroHand
  },
  computed: {
    getHitokoto () {
      return this.$store.state.hitokoto
    },
    getFavoritesID () {
      return this.$store.state.favoritesID
    },
    getFavorites () {
      return this.$store.state.favorites
    },
    getDataOrigin () {
      return this.$store.state.dataOrigin
    },
    getCardMode () {
      return this.$store.state.cardMode
    },
    getShowTip () {
      return this.$store.state.showTip
    }
  },
  methods: {
    /* 提示信息 */
    setSnackbar (color, tip) {
      this.snackbar = true
      this.snackbarColor = color
      this.snackbarTip = tip
    },
    /* 显示提示动画 */
    setShowTip () {
      let _this = this
      if (this.getShowTip) {
        setTimeout(() => {
          _this.start = true
          setTimeout(() => {
            _this.start = false
          }, 6000)
        }, 500)
      }
    },
    /* 设置加载过渡 */
    setLoading (opt) {
      let _this = this
      let loading = opt === 'start' ? () => {
        _this.cardTextStyle = {
          opacity: 0.4
        }
        _this.loading = true
      } : () => {
        _this.cardTextStyle = {
          opacity: 1
        }
        _this.loading = false
      }
      loading()
    },
    /* 添加收藏 */
    addFavorite () {
      let _this = this
      let hitokoto = _this.getHitokoto
      let id = hitokoto.id
      let favorites = _this.getFavorites
      let favoritesID = _this.getFavoritesID
      let index = favoritesID.indexOf(String(id))
      if (Object.keys(favoritesID).length === 0) {
        favoritesID = []
        favorites = []
      }
      if (index !== -1) {
        favoritesID.splice(index, 1)
        favorites.splice(index, 1)
      } else {
        favoritesID.push(String(id))
        favorites.push(hitokoto)
      }
      _this.$store.commit('setFavoritesID', favoritesID)
      _this.$store.commit('setFavorites', favorites)
      _this.$store.commit('setShowTip', false)
      _this.checkFavorites()
    },
    /* 获取一言 */
    getNewHitokoto () {
      let _this = this
      let hitokoto = {}
      api.get('https://oneapi.zerock.top').then(res => {
        hitokoto = res
        hitokoto.dataType = 'hito'
        _this.hitokoto = hitokoto
        _this.$store.commit('setHitokoto', hitokoto)
        _this.checkFavorites()
        _this.setLoading('stop')
        _this.setShowTip()
      }).catch(erro => {
        _this.setLoading('stop')
        _this.setSnackbar('error', '(๑• . •๑)~~出错了，请稍后重试')
      })
    },
    /* 获取今日诗词 */
    getNewPoem () {
      let _this = this
      if (!navigator.onLine) {
        _this.setLoading('stop')
        _this.setSnackbar('error', '(๑• . •๑)~~出错了，请稍后重试')
        return
      }
      jinrishici.load(result => {
        let data = result.data
        data.content = data.content.split(/[，]/g)
        data.dataType = 'poet'
        _this.hitokoto = data
        _this.$store.commit('setHitokoto', data)
        _this.checkFavorites()
        _this.setLoading('stop')
        _this.setShowTip()
      // eslint-disable-next-line handle-callback-err
      }, errData => {
        _this.setLoading('stop')
        _this.setSnackbar('error', '(๑• . •๑)~~出错了，请稍后重试')
      })
    },
    /* 判断数据源 */
    getSomeThing (opt) {
      let _this = this
      let hitokoto = _this.getHitokoto
      if (Object.keys(hitokoto).length === 0 || opt === 'load') {
        let origin = _this.getDataOrigin
        _this.setLoading('start')
        if (origin === 'hito') {
          _this.getNewHitokoto()
        } else if (origin === 'poem') {
          _this.getNewPoem()
        } else {
          if (Math.random() > 0.5) {
            _this.getNewHitokoto()
          } else {
            _this.getNewPoem()
          }
        }
      } else {
        _this.hitokoto = hitokoto
        _this.checkFavorites()
        _this.setLoading('stop')
      }
    },
    /* 检查是否已收藏 */
    checkFavorites () {
      let _this = this
      let hitokoto = _this.getHitokoto
      let favoritesID = _this.getFavoritesID
      let index = favoritesID.indexOf(String(hitokoto.id))
      let check = index === -1 ? () => {
        _this.favIconStyle = {
          transform: 'translateY(-100%)'
        }
      } : () => {
        _this.favIconStyle = {
          transform: 'translateY(0)'
        }
      }
      check()
    },
    /* 切换卡片显示模式 */
    switchCardMode (mode, opt) {
      let _this = this
      if (opt === 'switch') {
        if (mode === 'normal') {
          _this.poetStyle()
        } else {
          _this.normalStyle()
        }
        mode = mode === 'normal' ? 'poet' : 'normal'
        _this.$store.commit('setCardMode', mode)
      } else {
        if (mode === 'poet') {
          _this.poetStyle()
        } else {
          _this.normalStyle()
        }
      }
    },
    poetStyle () {
      let _this = this
      _this.cardNormalStyle = {
        height: '55vh'
      }
      _this.cardTextStyle = {
        opacity: 0
      }
      _this.cardPoetStyle = {
        height: '55vh',
        opacity: 1
      }
      _this.modeBtnStyle = {
        transform: 'rotateX(180deg)'
      }
    },
    normalStyle () {
      let _this = this
      _this.cardNormalStyle = {
        height: '30vh'
      }
      _this.cardTextStyle = {
        opacity: 1
      }
      _this.cardPoetStyle = {
        height: '30vh',
        opacity: 0
      }
      _this.modeBtnStyle = {
        transform: 'rotateX(0)'
      }
    }
  },
  mounted () {
    let _this = this
    _this.$store.commit('setMyTitle', '(๑• . •๑)')
    _this.getSomeThing('start')
    _this.switchCardMode(_this.getCardMode, '')
  }
}
</script>

<style lang="stylus" scoped>
.home-layout
  position relative
.home-card-bg
  position absolute
  top 50%
  transform translate(0, -50%)
  border-radius 2px
  transition all .5s ease-in-out
.home-card
  transition all .5s ease-in-out
  display flex
  align-items center
  text-align center
  border-radius 10px
.home-card
  for i in 1..4
    @media (min-width: 2**(i+7)px)
      width: (80/i+10)vw
      height 30vh
.btn-box
  height 120px
  display flex
  align-items center
  justify-content center
  .btn-load
    display block
    transition all 2s ease-in-out
    &.loading
      animation loading 1s infinite
@keyframes loading {
  0% {
    transform rotate(0)
  }
  100% {
    transform rotate(360deg)
  }
}
</style>
