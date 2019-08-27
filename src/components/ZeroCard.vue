<template>
  <v-card
    class="mx-auto zero-card"
    light
    v-ripple="{ class: `${colors[colorIndex]}--text text--accent-4` }"
    hover
    @click="clickCard"
    ref="zeroCard"
  >
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
import { clearTimeout, setTimeout } from 'timers';
let lastTime = 0
let clickTimer
export default {
  props: {
    hitokoto: {
      type: Object
    }
  },
  data () {
    return {
      colors: ['red','purple','light-blue','teal'],
      colorIndex: 0
    }
  },
  filters: {
    hitoFilter(value) {
      switch (value) {
        case "a":
          return "动画";
        case "b":
          return "漫画";
        case "c":
          return "游戏";
        case "d":
          return "小说";
        case "e":
          return "原创";
        case "f":
          return "网络";
        default:
          return "其他";
      }
    }
  },
  methods: {
    clickCard() {
      let date = new Date()
      let nowTime = date.getTime()
      if ( nowTime - lastTime < 400 ) {
        lastTime = 0
        clickTimer && clearTimeout(clickTimer) 
      } else {
        lastTime = nowTime
        clickTimer = setTimeout(() => {
          let index = this.$data.colorIndex
          index < 3 ? index++ : index=0
          this.$data.colorIndex = index
          }, 400)
      }
    },
    onResize() {
      console.log(this.$refs.zeroCard.style.height)
    }
  },
  mounted() {
      console.log(this.$refs.zeroCard.style.height)
  }
}
</script>

<style lang="stylus" scoped>
.zero-card
  min-height 100px
  max-height 300px
  transition all .5s
</style>