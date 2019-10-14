<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      temporary
    >
      <zero-drawer-list/>
    </v-navigation-drawer>
    <v-toolbar
      app
      color="primary"
      class="v-toolbar"
      dark
      scroll-off-screen
      flat
    >
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>{{getMyTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon
        v-if="this.$route.path !== '/favorite' && this.$route.path !== '/about'"
        @click="addFavorite"
      >
        <v-icon
          :color="getFavoriteColor"
        >fa fa-heart</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height
      class="primary v-container pa-0">
        <transition>
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ZeroDrawerList from './components/ZeroDrawerList'
import { formatDate } from './utils/formatDate'
import { setThemeColor } from './utils/setThemeColor'
import { setInterval } from 'timers'

export default {
  name: 'App',
  data () {
    return {
      drawer: null, //  抽屉开关
      hexTimer: null
    }
  },
  components: {
    ZeroDrawerList
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
    getFavoriteColor () {
      return this.$store.state.favoritesColor
    },
    getMyTitle () {
      return this.$store.state.myTitle
    },
    getHexTimer () {
      return this.$store.state.hexTimer
    },
    getPrimary () {
      return this.$store.state.primary
    }
  },
  methods: {
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
    changeTheme () {
      let _this = this
      let primary = formatDate(new Date(), 'time')
      _this.$vuetify.theme.primary = primary
      setThemeColor(primary)
    },
    setHexTimer (isTimer) {
      if (!isTimer && this.hexTimer) {
        clearInterval(this.hexTimer._id)
        this.hexTimer = null
        this.$vuetify.theme.primary = this.getPrimary
        setThemeColor(this.getPrimary)
      } else if (isTimer) {
        this.hexTimer = setInterval(() => {
          this.changeTheme()
        }, 1000)
      } else {
        this.$vuetify.theme.primary = this.getPrimary
        setThemeColor(this.getPrimary)
      }
    }
  },
  watch: {
    getHexTimer: function () {
      this.setHexTimer(this.getHexTimer)
    }
  },
  created () {
    this.setHexTimer(this.getHexTimer)
  },
  beforeDestroy () {
    clearInterval(this.hexTimer._id)
    this.hexTimer = null
  }
}
</script>

<style lang="stylus" scoped>
.v-toolbar,.v-container
  transition all .2s
</style>
