<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      temporary
    >
      <zero-drawer-list>
      </zero-drawer-list>
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
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon
        v-if="this.$route.path === '/'"
        @click="addFavorite()"
      >
        <v-icon
          :color="getFavoriteColor"
        >favorite</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height
      class="primary v-container pa-0">
        <router-view></router-view>
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
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ZeroDrawerList from './components/ZeroDrawerList'
import { formatDate } from './utils/formatDate'
import { setThemeColor } from './utils/setThemeColor'
import { api } from './utils/axios'
import { setInterval } from 'timers'

export default {
  name: 'App',
  data () {
    return {
      drawer: null, //  抽屉开关
      title: this.$myTitle,
      snackbar: false, //    提示消息
      snackbarTip: "", //  复制·提示语
      snackbarColor: "", //  提示消息 ·颜色
      timeout: 1500
      //
    }
  },
  components: {
    ZeroDrawerList
  },
  computed: {
    gethitokoto() {
      return this.$store.state.hitokoto
    },
    getFavoritesID() {
      return this.$store.state.favoritesID
    },
    getFavorites() {
      return this.$store.state.favorites
    },
    getFavoriteColor() {
      return this.$store.state.favoritesColor
    }
  },
  methods: {
    changeTheme () {
      let _this = this
      let primary = formatDate(new Date(), 'time')
      _this.$vuetify.theme.primary = primary
      setThemeColor(primary)
    },
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
    }
  },
  mounted () {
    let _this = this
    let themeTimer = setInterval(function() {
      _this.changeTheme()
    }, 1000)
  }
}
</script>

<style lang="stylus" scoped>
.v-toolbar,.v-container
  transition all .2s
</style>
