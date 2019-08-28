<template>
  <v-layout align-content-start justify-center column fill-height>
    <v-layout row wrap justify-center align-content-center>
      <v-flex xs10 lg8>
        <zero-card
          v-bind:hitokoto="hitokotos"
        />
      </v-flex>
    </v-layout>
    <div class="btn-box">
      <v-btn
        class="btn-load"
        icon
        color="primary"
        x-large
        :loading="loading"
        @click="getHitokoto('load')"
        >
        <v-icon 
          x-large
        >fas fa-circle-notch</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import ZeroCard from "../components/ZeroCard"
import { formatDate } from "../utils/formatDate"
import { api } from "../utils/axios"
import { truncate } from 'fs'
import { setTimeout } from 'timers'

export default {
  data() {
    return {
      loading: true, //  工具栏加载动画
      expand: false, //  展开过渡
      snackbar: false, //    提示消息
      timeout: 1500, //  提示消息·消失时长
      copyTip: "", //  复制·提示语
      tipColor: "", //  提示消息 ·颜色
      hitokotos: {}, //  一言内容
      type: ["a", "b", "c", "d", "e", "f", "g"], //  一言类型
      favorites: []
    };
  },
  components: {
    ZeroCard
  },
  computed: {
    getTimeHex() {
      return this.$vuetify.theme.primary
    },
    getHitokotos() {
      return this.$store.getters.getHitokotos
    },
    getFavorites() {
      return this.$store.getters.getFavorites
    },
    getCurIndex() {
      return this.$store.getters.getCurIndex
    }
  },
  methods: {
    copyHex() {
      let _this = this;
      _this.$copyText(_this.getTimeHex).then(
        function(e) {
          _this.$data.snackbar = true;
          _this.$data.copyTip = "复制成功";
          _this.$data.tipColor = "success";
        },
        function(e) {
          _this.$data.snackbar = true;
          _this.$data.copyTip = "复制失败";
          _this.$data.tipColor = "error";
        }
      );
    },
    addFavorite(id) {
      let _this = this
      let favorites = _this.getFavorites
      // favorites = favorites === 'novalue' ? [] : favorites
      let hitokotos = _this.$data.hitokotos
      let curIndex = _this.$data.curIndex
      favorites.push(hitokotos[curIndex])
      _this.$store.commit('setFavorites', favorites)
    },
    getHitokoto(opt) {
      let _this = this
      let hitokotos = _this.getHitokotos
      let zeroCard = document.getElementsByClassName('zero-card')[0]
      let zeroCardStyle = document.getElementsByClassName('zero-card')[0].style
      let oldHeight = zeroCard.clientHeight
      zeroCardStyle.transition = 'none'
      zeroCardStyle.height = 'auto'
      if (Object.keys(hitokotos).length === 0 || opt === 'load') {
        _this.$data.loading = true
        api.get("https://v1.hitokoto.cn/").then(res => {
          hitokotos = res
          _this.$data.hitokotos = hitokotos
          _this.$store.commit('setHitokotos', hitokotos)
          _this.$nextTick(()=> {
            let newHeight = zeroCard.clientHeight
            zeroCardStyle.height = oldHeight + 'px'
            zeroCardStyle.transition = 'height 300ms ease'
            setTimeout(()=>{
              zeroCardStyle.height = newHeight + 'px'
            }, 16)
            setTimeout(()=>{
              _this.$data.loading = false
            },200)
          })
        })
      } else {
        _this.$data.hitokotos = hitokotos
        _this.$data.loading = false
      }
    },
    getManyHitokoto() {
      let _this = this
      let hitokotos = _this.getHitokotos
      let curIndex = _this.getCurIndex
      if (hitokotos.length > 0) {
        _this.$data.hitokotos = hitokotos
        _this.$data.btnPrev = curIndex === 0 ? true : false
        _this.$data.loading = false
      } else {
        let types = _this.$data.type
        for (let i = 0; i < types.length; i++) {
          api
            .get("https://v1.hitokoto.cn/", { params: { c: types[i] } })
            .then(res => {
              //_this.hitokotos = res
              hitokotos.push(res)
              _this.$store.commit('setHitokotos', hitokotos)
              if (i === 0) {
                _this.$data.hitokotos = _this.getHitokotos
                _this.$store.commit('setCurIndex', 0)
                _this.$data.loading = false
              }
            })
        }
      }
    },
    switchHitokoto(value) {
      let _this = this
      //let hitokotos = _this.getHitokotos
      let curIndex = _this.getCurIndex
      value === "prev" ? curIndex-- : curIndex++
      _this.$refs.swiper.slideTo(curIndex)
      _this.$store.commit('setCurIndex', curIndex)
      //_this.$data.hitokotos = hitokotos
      _this.$data.btnPrev = curIndex === 0 ? true : false
      //value === "next" && curIndex > 5 ? _this.getHitokoto() : ""
      if ( value === 'next' && curIndex > 5 ) {
        setTimeout(function() {
          _this.getHitokoto()
        }, 1000)
      }
    },
    switcherSync(activeIndex) {
      this.$data.btnPrev = activeIndex == 0 ? true : false
      this.$store.commit('setCurIndex', activeIndex)
      console.log('emit:'+ activeIndex)
    }
  },
  mounted() {
    let _this = this
    _this.$myTitle = '亦言'
    _this.getHitokoto('start')
  }
};
</script>

<style lang="stylus" scoped>
.btn-box
  height 150px
  .btn-load
    display block
    margin 30px auto
</style>