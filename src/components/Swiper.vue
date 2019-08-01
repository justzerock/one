<template>
  <swiper 
    ref="mySwiper"
    :options="swiperOption"
  >
    <swiper-slide class="demo-text"
      v-for="(item, index) in hitos"
      :key=index
    >
      <v-flex xs10 lg8>
        <zero-card
          class="zero-card"
          v-bind:hitoContent="item.hitokoto"
          v-bind:hitoFrom="item.from"
          v-bind:hitoType="item.type|hitokotos"
        ></zero-card>
      </v-flex>
    </swiper-slide>
  </swiper>
</template>

<script>
import ZeroCard from './ZeroCard'

export default {
  props: {
    hitos: {
      type: Array,
      default: function () {
        return [{id: 543, hitokoto: "我秃了，我也变强了", type: "a", from: "一拳超人", creator: "没了", created_at: "1472551554"},{"id":872,"hitokoto":"忌妒别人，不会给自己增加任何的好处。忌妒别人，也不可能减少别人的成就。","type":"g","from":"佛教禅语","creator":"hitokoto","created_at":"1478787580"},{"id":4142,"hitokoto":"你能留给岁月的，岁月能留给你的，除了一个最好的自己，别无他物。","type":"e","from":"原创","creator":"竹恋蝶","created_at":"1543562384"},{"id":3635,"hitokoto":"我说：“ 我确信 你知道的，只有努力，才不会让自己轻易地被别人打倒或者看不起。”\r\n你说：“ 我知道，我知道，我一直都知道。”","type":"e","from":"Nice·南先生","creator":"Nice南先生","created_at":"1526718612"},{"id":558,"hitokoto":"正因为生命有限，所以才显得重要，正因为生命有限，所以才更应该努力不懈！","type":"a","from":"名侦探柯南","creator":"贝贝","created_at":"1472978465"},{"id":3643,"hitokoto":"纵有疾风起人生不言弃","type":"g","from":"宫崎骏","creator":"woober","created_at":"1527740056"}]
      }
    }
  },
  data () {
    return {
      swiperOption: {

      }
      //hitos: [{"id":621,"hitokoto":"以后继续来一起练习打篮球","type":"a","from":"湊智花","creator":"树形图设计者","created_at":"1475080882"},{"id":3639,"hitokoto":"What, so everyone's supposed to sleep every single night now? You realize that nighttime makes up half of all time?","type":"a","from":"Rick","creator":"zP1nG","created_at":"1527205085"},{"id":872,"hitokoto":"忌妒别人，不会给自己增加任何的好处。忌妒别人，也不可能减少别人的成就。","type":"g","from":"佛教禅语","creator":"hitokoto","created_at":"1478787580"},{"id":4142,"hitokoto":"你能留给岁月的，岁月能留给你的，除了一个最好的自己，别无他物。","type":"e","from":"原创","creator":"竹恋蝶","created_at":"1543562384"},{"id":3635,"hitokoto":"我说：“ 我确信 你知道的，只有努力，才不会让自己轻易地被别人打倒或者看不起。”\r\n你说：“ 我知道，我知道，我一直都知道。”","type":"e","from":"Nice·南先生","creator":"Nice南先生","created_at":"1526718612"},{"id":411,"hitokoto":"无论是丢下还是被丢下，都是一样痛苦的。","type":"f","from":"网络","creator":"锡了个纸","created_at":"1468949606"},{"id":1349,"hitokoto":"末将于禁，愿为曹家世代赴汤蹈火。","type":"b","from":"镇魂街","creator":"死木芽","created_at":"1515592778"}]
    }
  },
  components: {
    ZeroCard
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
}
</script>

<style lang="stylus" scoped>
.zero-card
  border-radius 20px
.swiper-slide
  display flex
  justify-content center
  align-items center
</style>
