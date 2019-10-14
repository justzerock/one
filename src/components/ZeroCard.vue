<template>
  <v-card
    class="mx-auto zero-card"
    light
    v-ripple="{ class: `${colors[colorIndex]}--text text--accent-4` }"
    hover
    @click="clickCard"
  >
    <div
      v-if="favorite"
      class="icon-sel"
      v-bind:class="classIsShow"
      >
      <v-icon dark class="icon-sel-icon">fa fa-check</v-icon>
    </div>
    <v-card-text
      class="subheading pt-5 pb-4 px-5"
      style="width:inherit"
    >
      {{hitokoto.hitokoto}}
    </v-card-text>

    <v-card-actions class="text-xs-center">
      <v-layout row wrap>
        <v-chip color="primary" text-color="white">
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          {{hitokoto.from}}
        </v-chip>
        <v-chip color="secondary" text-color="white">
          <v-avatar class="secondary darken-1">
            <v-icon>star</v-icon>
          </v-avatar>
          {{hitokoto.type|hitoFilter}}
        </v-chip>
      </v-layout>
    </v-card-actions>

  </v-card>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers'
let lastTime = 0
let clickTimer
export default {
  props: {
    hitokoto: {
      type: Object,
      default: () => {
        return {
          hitokoto: '或许是通往Hitokoto的道路出现一点阻碍，莫急，点击下方按钮重试吧',
          from: '刘亦岳',
          type: 'g'
        }
      }
    },
    myHeight: {
      type: String,
      default: 'height: auto'
    },
    favorite: {
      type: Boolean,
      default: false
    },
    favoriteID: {
      type: Number,
      default: 0
    },
    ids: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      colors: ['red', 'deep-purple', 'light-blue', 'teal', 'lime', 'orange'],
      colorIndex: 0
    }
  },
  filters: {
    hitoFilter (value) {
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
        case 'g':
          return '其他'
        default:
          return '关于'
      }
    }
  },
  methods: {
    clickCard () {
      let date = new Date()
      let nowTime = date.getTime()
      let index = this.$data.colorIndex
      let colors = this.$data.colors
      index < colors.length - 1 ? index++ : index = 0
      this.$data.colorIndex = index
      this.$emit('zclick')
      if (nowTime - lastTime < 400) {
        lastTime = 0
        clickTimer && clearTimeout(clickTimer)
        this.$emit('dbclick')
      } else {
        lastTime = nowTime
        clickTimer = setTimeout(() => {
        }, 400)
      }
    },
    delCard (id) {
      console.log(id)
    }
  },
  computed: {
    classIsShow () {
      let ids = this.$props.ids
      let favoriteID = this.$props.favoriteID
      let isShow = ids.indexOf(favoriteID) > -1 ? 'show-icon' : 'hide-icon'
      return isShow
    }
  }
}
</script>

<style lang="stylus" scoped>
.icon-sel
  width 45px
  height 45px
  position absolute
  right 0
  border-radius 0 0 0 45px
  background #fc5c59
  opacity 0
  transition all .3s
  &.show-icon
    opacity 1
  &.hide-icon
    opacity 0
  .icon-sel-icon
    width 30px
    height 30px
    position absolute
    right 3px
    top 3px
    display flex
</style>
