<template>
  <v-layout align-content-start justify-center column fill-height>
    <v-layout row wrap justify-center align-content-center>
      <v-flex xs10 lg8>
        <zero-card
          v-bind:hitokoto="about"
        ></zero-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import ZeroCard from '../components/ZeroCard'

export default {
  data() {
    return {
      about: { hitokoto: '简单的网页，数据来自一言网（Hitokoto.cn），使用Vue.js + Vuetify制作', from: '刘亦岳', type: 'z' }
    }
  },
  components: {
    ZeroCard
  },
  mounted() {
    let _this = this
    _this.$myTitle = '关于'
  }
}
</script>
