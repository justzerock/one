<template>
  <v-layout align-content-start justify-center column fill-height>
    <v-layout row wrap justify-center align-content-center
      class="about-layout"
    >
      <v-flex
        class="about-card-bg"
      >
        <zero-more
          class="about-card"
          :dataPoet="aboutData"
          :about="about"
          @dbabout="iLoveIt"
        />
      </v-flex>
    </v-layout>
    <div class="btn-box">
      <v-btn
        class="btn-like"
        icon
        color="primary"
        x-large
        @click="iLoveIt"
        >
        <v-icon
          :class="[{love: getLoveWeb}, 'like-icon']"
          :color="loveWeb"
          x-large
        >if if-heart-circle</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import ZeroMore from '../components/ZeroMore'

export default {
  data () {
    return {
      aboutData: {
        title: '关于亦言',
        from: '程序员',
        author: '刘亦岳',
        content: ['一个简单的Web应用',
          '数据来自一言网（Hitokoto.cn）',
          '与今日诗词（jinrishici.com）',
          '使用Vue.js + Vuetify制作',
          '支持pwa，可以离线运行',
          '(๑• . •๑)']
      },
      poetTextStyle: {
        display: 'block'
      },
      about: true
    }
  },
  components: {
    ZeroMore
  },
  computed: {
    loveWeb () {
      let color = this.getLoveWeb ? 'error' : 'white'
      return color
    },
    getLoveWeb () {
      return this.$store.state.loveWeb
    }
  },
  methods: {
    iLoveIt () {
      let love = this.getLoveWeb
      this.$store.commit('setLoveWeb', !love)
    }
  },
  mounted () {
    let _this = this
    _this.$store.commit('setMyTitle', '关于')
  }
}
</script>

<style lang="stylus" scoped>
.about-layout
  position relative
  .about-card-bg
    position absolute
    top 50%
    transform translateY(-50%)
.about-card
  for i in 1..4
    @media (min-width: 2**(i+7)px)
      width: (80/i+10)vw
      height 65vh
      position relative
      opacity 1
      border-radius 10px
      overflow hidden
.btn-box
  height 120px
  display flex
  align-items center
  justify-content center
  .btn-like
    height 44px
    width 44px
    display block
    transition all .5s ease-in-out
    box-shadow 2px 2px 2px rgba(0, 0, 0, 0.2)
    &:active
      animation press 1s ease-in-out
    .like-icon
      height 44px
      width 44px
      border-radius 100%
      &.love
        background #fff
        animation press 1s ease-in-out
@keyframes press {
  0%, 100% {
    transform scale(1)
  }
  20%, 80% {
    transform scale(1.2)
  }
  40%, 60% {
    transform scale(1.1)
  }
  50% {
    transform scale(1.3)
  }
}
</style>
