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

      <v-toolbar-title>亦言</v-toolbar-title>
      <v-icon 
        small 
        class="ml-2"
        v-if="loading"
      >fas fa-circle-notch fa-spin</v-icon>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height 
      class="primary v-container">
        <v-layout align-content-start justify-center column fill-height>
          <v-layout row wrap justify-center align-content-center>            
            <v-flex xs12 sm10 lg8>
              <zero-card 
                class="zero-card"
                v-bind:hitoContent="hitos.hitokoto"
                v-bind:hitoFrom="hitos.from"
                v-bind:hitoType="hitos.type|hitokotos"
              ></zero-card>
              <v-layout row wrap justify-end>
                <v-btn icon color="primary" disabled>
                  <v-icon>fas fa-chevron-circle-left</v-icon>
                </v-btn>
                <v-btn icon color="primary">
                  <v-icon>fas fa-chevron-circle-right</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout class="primary" justify-center align-end>
            <v-btn small icon color="primary"
              @click="expand = !expand"
            >
              <v-icon>info</v-icon>
            </v-btn>

            <v-flex shrink>
              <v-expand-x-transition>
                <div v-show="expand" style="white-space: nowrap; border-radius:28px ">
                  <v-chip
                    @click="copyHex"
                  >当前背景色：<span class="primary--text">{{timeHex}}</span></v-chip>
                </div>
              </v-expand-x-transition>
            </v-flex>
            <v-snackbar
              v-model="snackbar"
              bottom
              multi-line
              :timeout="timeout"
              :color="tipColor"
            >
              {{ copyTip }}
              <v-btn
                flat
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </v-snackbar>
          </v-layout>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ZeroDrawerList from './components/ZeroDrawerList'
import ZeroCard from './components/ZeroCard'
import { formatDate } from './utils/formatDate'
import { api } from './utils/axios'
import { setInterval } from 'timers'

export default {
  name: 'App',
  data () {
    return {
      drawer: null, //  抽屉开关
      loading: true,  //  工具栏加载动画
      timeHex: formatDate(new Date(), 'time'),
      expand: false,  //  展开过渡
      snackbar: false,  //    提示消息
      timeout: 1500,  //  提示消息·消失时长
      copyTip: '',  //  复制·提示语
      tipColor: '', //  提示消息 ·颜色
      hitos: {},  //  一言内容
      type: ['a','b','c','d','e','f','g'],  //  一言类型
      //
    }
  },
  components: {
    ZeroDrawerList,
    ZeroCard
  },
  filters: {
    hitokotos (value) {
      switch (value) {
        case 'a':
          return '动画'
        case 'b':
          return '漫画'
        case 'c':
          return '游戏'
        case 'd':
          return '小说'
        case 'e':
          return '原创'
        case 'f':
          return '网络'
        default:
          return '其他'
      }
    }
  },
  localStorage: {
    hitokotos: {
      type: Array
    }
  },
  methods: {
    changeTheme () {
      let _this = this
      let primary = formatDate(new Date(), 'time')
      _this.$data.timeHex = primary
      _this.$vuetify.theme.primary = primary
    },
    copyHex () {
      let _this = this
      _this.$copyText(_this.$data.timeHex).then(function (e) {
        _this.$data.snackbar = true
        _this.$data.copyTip = "复制成功"
        _this.$data.tipColor = "success"
      }, function (e) {
        _this.$data.snackbar = true
        _this.$data.copyTip = "复制失败"
        _this.$data.tipColor = "error"
      })
    },
    getHitokoto () {
      let _this = this
      let hitokotos = _this.$localStorage.get('hitokotos')
      _this.$data.loading = true
      api.get('https://v1.hitokoto.cn/')
        .then((res) => {
          hitokotos.push(res)
          _this.$localStorage.set('hitokotos', hitokotos)
          _this.$data.loading = false
        })
    },
    switchHitokoto (value) {
      let _this = this
      let hitokotos = _this.$localStorage.get('hitokotos')
    } 
  },
  mounted () {
    let _this = this
    let themeTimer = setInterval(function() {
      _this.changeTheme()
    }, 1000)
    let hitokotos = []
    let types = _this.$data.type
    for (let i=0; i<types.length; i++) {
      api.get('https://v1.hitokoto.cn/', { params: { c: types[i] }} )
        .then((res) => {
          //_this.hitos = res
          hitokotos.push(res)
          _this.$localStorage.set('hitokotos', hitokotos)
          console.log(res)
          if (i===0) {
            _this.hitos = _this.$localStorage.get('hitokotos')[0]
            _this.$data.loading = false
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-toolbar,.v-container
  transition all .2s
.zero-card
  border-radius 20px
</style>
