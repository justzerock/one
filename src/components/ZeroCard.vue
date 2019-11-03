<template>
  <v-card
    class="mx-auto zero-card"
    :class="[isExpand ? 'fav-card-expand' : !favorite ? '' : 'fav-card-close']"
    :style="cardNormalStyle"
    light
    v-ripple="{ class: `${colors[colorIndex]}--text text--accent-4` }"
    hover
    @click="clickCard"
  >
    <div
      v-if="favorite"
      class="icon-sel"
      :class="classIsShow"
      >
      <v-icon dark class="icon-sel-icon">if if-close</v-icon>
    </div>
    <v-card-text
      class="card-text"
      :class="[isExpand ? 'fav-text-expand' : !favorite ? '' : 'fav-text-close', setCardTextClass]"
      :style="cardTextStyle"
    >
      <span
        :style="poetTextStyle"
      >{{hitokoto.hitokoto | fromFilter}}</span>
      <span
        v-for="(item, index) in hitokoto.content"
        :key="index"
        :style="poetTextStyle"
      >
        {{ index === hitokoto.content.length -1 ? item : item + '，'  }}
      </span>
    </v-card-text>
    <v-btn flat icon
      class="btn-switch"
      :class="[isExpand ? 'fav-switch-expand' : !favorite ? '' : 'fav-switch-close']"
      @click.stop="switchMode(getCardMode)"
      :style="modeBtnStyle"
      >
      <v-icon
        color="grey"
      >if if-arrow-down</v-icon>
    </v-btn>
    <v-icon
      v-if="!favorite"
      class="fav-icon"
      color="error"
      :style="favIconStyle"
      @click="delFav"
    >if if-bookmark</v-icon>
    <div
      class="show-more"
      :class="[isExpand ? 'fav-poet-expand' : !favorite ? '' : 'fav-poet-close']"
      :style="cardPoetStyle"
    >
      <div
        scrollable
        class="px-3 card-poet"
        :class="aboutClass"
        >
        <div class="py-2 headline">{{ getContent('title') }}</div>
        <div class="py-1 subheading author">{{ getContent('from') }} · {{ getContent('author') }}</div>
        <div
          v-for="(item, index) in getContent('content')"
          :key="index">
          <div class="py-1 subheading"
          >{{item}}</div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
let lastTime = 0
export default {
  props: {
    hitokoto: {
      type: Object,
      default: () => {
        return {
          content: [
            '暂时无法获取内容',
            '请稍后重试'
          ],
          origin: {
            content: [
              '暂时无法获取内容',
              '请稍后重试'
            ],
            title: '',
            dynasty: ''
          }
        }
      }
    },
    about: {
      type: Boolean,
      default: false
    },
    cardNormalStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cardPoetStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cardTextStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    modeBtnStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    favIconStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    poetTextStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    favorite: {
      type: Boolean,
      default: false
    },
    favoriteID: {
      type: String,
      default: ''
    },
    IDs: {
      type: Array,
      default: () => {
        return []
      }
    },
    expandIDs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      colors: ['red', 'deep-purple', 'light-blue', 'teal', 'lime', 'orange'],
      colorIndex: 0,
      toggleCardAction: ''
    }
  },
  filters: {
    fromFilter (value) {
      if (!value) return ''
      if (value.length > 36) {
        return value.slice(0, 33) + '...'
      }
      return value
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
      if (this.favorite) {
        this.$emit('zclick')
      } else {
        if (nowTime - lastTime < 400) {
          lastTime = 0
          this.$emit('dbclick')
        } else {
          lastTime = nowTime
        }
      }
    },
    switchMode (mode) {
      if (this.favorite) {
        this.$emit('switchMode')
      } else {
        this.$emit('switchMode', mode, 'switch')
      }
    },
    delFav () {
      this.$emit('delFav')
    },
    getContent (type) {
      let text = ''
      let obj = this.hitokoto
      if (obj.dataType === 'hito') {
        switch (type) {
          case 'short':
            text = obj.hitokoto
            break
          case 'title':
            text = obj.hitokoto
            break
          case 'from':
            text = obj.from
            break
          case 'author':
            text = obj.creator
            break
          case 'content':
            text = ''
            break
        }
      } else {
        let origin = obj.origin
        switch (type) {
          case 'short':
            text = obj.content
            break
          case 'title':
            text = origin.title
            break
          case 'from':
            text = origin.dynasty
            break
          case 'author':
            text = origin.author
            break
          case 'content':
            text = origin.content
            break
        }
      }
      return text
    }
  },
  computed: {
    classIsShow () {
      let IDs = this.$props.IDs
      let favoriteID = this.$props.favoriteID
      let isShow = IDs.indexOf(favoriteID) > -1 ? 'show-icon' : 'hide-icon'
      return isShow
    },
    isExpand () {
      let expandIDs = this.$props.expandIDs
      let favoriteID = this.$props.favoriteID
      let isExpand = false
      if (expandIDs.indexOf(favoriteID) > -1) {
        isExpand = true
      }
      return isExpand
    },
    getCardMode () {
      return this.$store.state.cardMode || 'normal'
    },
    setCardTextClass () {
      return this.favorite ? 'subheading py-2 pl-3 pr-5' : 'subheading py-5 px-3'
    },
    aboutClass () {
      return this.about ? 'py-3' : 'py-5'
    }
  }
}
</script>

<style lang="stylus" scoped>
.zero-card
  overflow hidden
  will-change height
  &.fav-card-close
    height 10vh
  &.fav-card-expand
    height 50vh
.icon-sel
  width 30px
  height 30px
  position absolute
  right 0
  border-radius 0 2px 0 30px
  background #fc5c59
  opacity 0
  transition all .3s ease-in-out
  z-index 2
  &.show-icon
    opacity 1
  &.hide-icon
    opacity 0
  .icon-sel-icon
    width 20px
    height 20px
    position absolute
    right 0px
    top 0px
    display flex
.btn-switch
  position absolute
  transition all .5s ease-in-out
  right 0
  bottom 0
  z-index 2
  &.fav-switch-close
    transform rotateX(0)
  &.fav-switch-expand
    transform rotateX(180deg)
.card-text
  transition all .5s ease-in-out
  &.fav-text-close
    opacity 1
  &.fav-text-expand
    opacity 0
.fav-icon
  position: absolute;
  left: 10px;
  top: 0;
  z-index: 2;
  transform: translateY(-100%);
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
  transition all .5s ease-in-out
  will-change height
  opacity 0
  &.fav-poet-close
    height 10vh
  &.fav-poet-expand
    height 50vh
    opacity 1
.card-poet
  overflow-y scroll
.subheading.author
  color #5c5c5c
</style>
