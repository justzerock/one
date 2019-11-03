<template>
  <div
    v-if="div"
    class="zero-hand"
    :class="[hand ? 'circles' : '']"
  >
    <div
      class="circle-1"
      :class="[circles ? 'circles' : '']"
    ></div>
    <div
      class="circle-2"
      :class="[circles ? 'circles' : '']"
    ></div>
    <v-icon
      color="primary"
      class="show-hand"
      :class="[circles ? 'circles' : '']"
    >if if-hand</v-icon>
    <v-icon
      color="error"
      class="show-bm"
      :class="[hand ? 'circles' : '']"
      :style="{transform: bookmark ? 'translateY(0)' : 'translateY(-100%)'}"
    >if if-bookmark</v-icon>
    <span
      class="show-tp"
      :class="[circles ? 'circles' : '']"
    >双击收藏</span>
  </div>
</template>

<script>
export default {
  props: {
    start: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      div: false,
      hand: false,
      bookmark: false,
      circles: false
    }
  },
  computed: {
    getShowTip () {
      return this.$store.state.showTip
    }
  },
  watch: {
    start: function (val) {
      let _this = this
      if (this.getShowTip && val) {
        this.div = true
        setTimeout(() => {
          _this.hand = true
          setTimeout(() => {
            _this.circles = true
            setTimeout(() => {
              _this.bookmark = true
              setTimeout(() => {
                _this.circles = false
                _this.bookmark = false
                setTimeout(() => {
                  _this.hand = false
                  _this.div = false
                }, 500)
              }, 3000)
            }, 1500)
          }, 500)
        }, 500)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.zero-hand
  width 100px
  height 100px
  display flex
  justify-content center
  align-items center
  position absolute
  top 0
  overflow hidden
  opacity 0
  transition all 1s ease
  &.circles
    opacity 1
.show-hand
  border-radius 100%
  padding 10px
  transform scale(0) translateY(8px)
  filter drop-shadow(2px 2px 2px rgba(0, 0, 0, .2))
  transition all 1s ease
  &.circles
    transform scale(1) translateY(8px)
.show-bm
  position absolute
  top 0
  left 10px
  transition all .3s ease
  opacity 0
  &.circles
    opacity 1
.circle-1, .circle-2
  width 100%
  height 100%
  position absolute
  background #7f84b5
  border-radius 100%
  opacity 0
  transition all .3s ease
  &.circles
    animation ripple 1s ease-in-out
.circle-2.circles
  animation-delay: .5s
@keyframes ripple {
  0% {
    transform scale(0)
    opacity .5
  }
  100% {
    transform scale(1)
    opacity 0
  }
}
.show-tp
  position absolute
  top 20px
  color #7f84b5
  font-weight bold
  opacity 0
  transition all 1s ease
  transform scale(0)
  &.circles
    transform scale(1)
    opacity 1
</style>
