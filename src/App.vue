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
        @click="addFavorite()"
      >
        <v-icon>favorite</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height
      class="primary v-container pa-0">
        <router-view></router-view>
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
      favorites: [],
      title: this.$myTitle,
      //
    }
  },
  components: {
    ZeroDrawerList
  },
  methods: {
    changeTheme () {
      let _this = this
      let primary = formatDate(new Date(), 'time')
      _this.$vuetify.theme.primary = primary
      setThemeColor(primary)
    },
    addFavorite() {
      let _this = this
      let favorites = _this.getFavorites
      // favorites = favorites === 'novalue' ? [] : favorites
      let hitokotos = _this.$data.hitokotos
      let curIndex = _this.$data.curIndex
      favorites.push(hitokotos[curIndex])
      _this.$store.commit('setFavorites', favorites)
    },
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
