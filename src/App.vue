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
      <v-icon
        @click.stop="drawer = !drawer"
      >if if-{{getPath === '/favorite' ? 'bookmark' : getPath === '/about' ? 'info' : 'home'}}</v-icon>
      <v-toolbar-title
        @click.stop="drawer = !drawer"
        class="title"
      >{{getMyTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
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
import { setThemeColor } from './utils/setThemeColor'

export default {
  name: 'App',
  data () {
    return {
      drawer: null //  抽屉开关
    }
  },
  components: {
    ZeroDrawerList
  },
  computed: {
    getMyTitle () {
      return this.$store.state.myTitle
    },
    getPrimary () {
      return this.$store.state.primary
    },
    getPath () {
      let path = this.$route.path
      let icon = 'home'
      if (path === '/favorite') {
        icon = 'bookmark'
      } else if (path === '/about') {
        icon = ''
      }
      return this.$route.path
    }
  },
  methods: {
    changeTheme (color) {
      let _this = this
      _this.$vuetify.theme.primary = color
      setThemeColor(color)
    }
  },
  watch: {
    getPrimary: function (val) {
      this.changeTheme(val)
    }
  },
  created () {
    let primary = this.getPrimary
    this.changeTheme(primary)
  }
}
</script>

<style lang="stylus" scoped>
.v-toolbar,.v-container
  transition all .2s
  z-index 3
.title
  cursor pointer
  user-select none
</style>
