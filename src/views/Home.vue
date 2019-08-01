<template>
  <v-layout align-content-start justify-center column fill-height>
    <v-layout row wrap justify-center align-content-center>
      <swiper/>
      <v-flex xs10 lg8>
        <v-layout row wrap justify-end>
          <v-btn icon color="primary" :disabled="btnPrev" @click="switchHitokoto('prev')">
            <v-icon>fas fa-chevron-circle-left</v-icon>
          </v-btn>
          <v-btn
            icon
            color="primary"
            :disabled="btnNext"
            @click="switchHitokoto('next')"
            :loading="loading"
          >
            <v-icon>fas fa-chevron-circle-right</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout class="primary" justify-center align-end>
      <v-btn small icon color="primary" @click="expand = !expand">
        <v-icon>info</v-icon>
      </v-btn>

      <v-flex shrink>
        <v-expand-x-transition>
          <div v-show="expand" style="white-space: nowrap; border-radius:28px ">
            <v-chip @click="copyHex">
              当前背景色：
              <span class="primary--text">{{getTimeHex}}</span>
            </v-chip>
          </div>
        </v-expand-x-transition>
      </v-flex>
      <v-snackbar v-model="snackbar" bottom multi-line :timeout="timeout" :color="tipColor">
        {{ copyTip }}
        <v-btn flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-layout>
  </v-layout>
</template>

<script>
import Swiper from "../components/Swiper";
import { formatDate } from "../utils/formatDate";
import { api } from "../utils/axios";

export default {
  data() {
    return {
      loading: true, //  工具栏加载动画
      expand: false, //  展开过渡
      snackbar: false, //    提示消息
      timeout: 1500, //  提示消息·消失时长
      copyTip: "", //  复制·提示语
      tipColor: "", //  提示消息 ·颜色
      hitos: {}, //  一言内容
      curIndex: 0, //  当前索引
      type: ["a", "b", "c", "d", "e", "f", "g"], //  一言类型
      btnPrev: true,
      btnNext: false,
      favorites: []
    };
  },
  components: {
    Swiper
  },
  filters: {
    hitokotos(value) {
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
  localStorage: {
    hitokotos: {
      type: Array
    },
    curIndex: {
      type: Number
    }
  },
  computed: {
    getTimeHex() {
      return this.$vuetify.theme.primary
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
      let _this = this;
      let favorites = _this.$localStorage.get("favorites", []);
      // favorites = favorites === 'novalue' ? [] : favorites
      let hitos = _this.$data.hitos;
      favorites.push(hitos);
      _this.$localStorage.set("favorites", favorites);
    },
    getHitokoto() {
      let _this = this;
      let hitokotos = _this.$localStorage.get("hitokotos");
      let curIndex = _this.$localStorage.get("curIndex") - 1;
      _this.$data.loading = true;
      api.get("https://v1.hitokoto.cn/").then(res => {
        if (hitokotos.length > 6) {
          hitokotos.splice(0, 1);
          _this.$localStorage.set("curIndex", curIndex);
        }
        hitokotos.push(res);
        _this.$localStorage.set("hitokotos", hitokotos);
        _this.$data.loading = false;
      });
    },
    getManyHitokoto() {
      let _this = this;
      let hitokotos = _this.$localStorage.get("hitokotos");
      let curIndex = _this.$localStorage.get("curIndex");
      if (hitokotos.length > 0) {
        _this.$data.hitos = hitokotos[curIndex];
        _this.$data.btnPrev = curIndex === 0 ? true : false;
        _this.$data.loading = false;
      } else {
        let types = _this.$data.type;
        for (let i = 0; i < types.length; i++) {
          api
            .get("https://v1.hitokoto.cn/", { params: { c: types[i] } })
            .then(res => {
              //_this.hitos = res
              hitokotos.push(res);
              _this.$localStorage.set("hitokotos", hitokotos);
              if (i === 0) {
                _this.$data.hitos = _this.$localStorage.get("hitokotos")[0];
                _this.$localStorage.set("curIndex", 0);
                _this.$data.loading = false;
              }
            });
        }
      }
    },
    switchHitokoto(value) {
      let _this = this;
      let hitokotos = _this.$localStorage.get("hitokotos");
      let curIndex = _this.$localStorage.get("curIndex");
      value === "prev" ? curIndex-- : curIndex++;
      _this.$localStorage.set("curIndex", curIndex);
      _this.$data.hitos = hitokotos[curIndex];
      _this.$data.btnPrev = curIndex === 0 ? true : false;
      value === "next" && curIndex > 5 ? _this.getHitokoto() : "";
    }
  },
  mounted() {
    let _this = this;
    /* let themeTimer = setInterval(function() {
      _this.$data.timeHex = _this.$vuetify.theme.primary
    }, 1000); */
    _this.$myTitle = '亦言'
    console.log(_this.$myTitle)
    _this.getManyHitokoto();
  }
};
</script>

<style lang="stylus" scoped>
.zero-card
  border-radius 20px
</style>
