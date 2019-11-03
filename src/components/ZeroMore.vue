<template>
  <v-card
    v-ripple="{ class: `${colors[colorIndex]}--text text--accent-4` }"
    class="show-more"
    @click="clickCard"
  >
    <div
      scrollable
      class="px-3 cus-scroll"
      :class="aboutClass"
      >
      <div class="py-2 headline">{{dataPoet.title}}</div>
      <div class="py-1 subheading author">{{dataPoet.dynasty}} · {{dataPoet.author}}</div>
      <div
        v-for="item in dataPoet.content"
        :key="item.index">
        <div class="py-1 subheading"
        >{{item}}</div>
      </div>
    </div>
  </v-card>
</template>

<script>
let lastTime = 0
export default {
  props: {
    dataPoet: {
      type: Object,
      default: () => {
        return {
          content: '没有内容'
        }
      }
    },
    about: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      colors: ['red', 'deep-purple', 'light-blue', 'teal', 'lime', 'orange'],
      colorIndex: 0
    }
  },
  methods: {
    clickCard () {
      let date = new Date()
      let nowTime = date.getTime()
      let index = this.colorIndex
      let colors = this.colors
      index < colors.length - 1 ? index++ : index = 0
      this.colorIndex = index
      if (nowTime - lastTime < 400) {
        lastTime = 0
        this.$emit('dbabout')
      } else {
        lastTime = nowTime
      }
    }
  },
  computed: {
    aboutClass () {
      return this.about ? 'py-3' : 'py-5'
    }
  }
}
</script>

<style lang="stylus" scoped>
.show-more
  display flex
  position absolute
  top 0
  flex-direction column
  justify-content center
  align-content center
  text-align center
  background #ffffff
  width 100%
  transition all .5s ease
  opacity 0
.cus-scroll
  overflow-y scroll
.subheading.author
  color #5c5c5c
</style>
