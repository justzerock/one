<template>
  <v-layout align-content-start justify-center column fill-height>
    <v-layout row wrap justify-center align-content-center
      class="about-layout"
    >
      <v-flex xs10 lg8
        class="about-card-bg"
      >
        <zero-card
          :hitokoto="about"
          @dbclick="iLoveIt"
        ></zero-card>
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
          :color="loveWeb"
          x-large
        >favorite</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import ZeroCard from '../components/ZeroCard'

export default {
  data () {
    return {
      about: {
        hitokoto: '简单的网页，数据来自一言网（Hitokoto.cn），使用Vue.js + Vuetify制作，网页背景色取自当前时间值，例如12:34:56时，颜色值为#123456，实时变化',
        from: '刘亦岳',
        type: 'z' }
    }
  },
  components: {
    ZeroCard
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
.btn-box
  height 150px
  .btn-like
    display block
    margin 30px auto
    transition all .3s
</style>
