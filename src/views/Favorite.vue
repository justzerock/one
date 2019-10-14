<template>
  <v-layout align-content-start justify-center column>
    <v-layout row wrap align-content-center justify-center
      class="fav-layout"
      :class="onlyOne"
      :style="listStyle">
      <v-flex
        class="fav-card-bg"
        :class="onlyOne"
        v-for="(item, index) in getFavorites"
        :key="index"
        xs10 sm8 md5 lg3>
        <zero-card
          class="fav-card"
          :hitokoto="item"
          :favorite="favorite"
          :favoriteID="item.id"
          :ids="ids"
          @zclick="showIcon(item.id)"
          ></zero-card>
        </v-flex>
    </v-layout>
    <zero-bottom
      :showNav="showNav"
      :count="getSelCardCount"
      @cancleCard="cancleCard"
      @checkCard="checkCard"
      @deleteCard="openDialog"
    />
    <zero-dialog
      :dialog="dialog"
      @deleteCard="deleteCard"
      @cancelDialog="cancelDialog"
    />
  </v-layout>
</template>

<script>
import ZeroCard from '../components/ZeroCard'
import ZeroBottom from '../components/ZeroBottom'
import ZeroDialog from '../components/ZeroDialog'

export default {
  data () {
    return {
      favorite: true,
      showNav: false,
      ids: [],
      dialog: false
    }
  },
  components: {
    ZeroCard,
    ZeroBottom,
    ZeroDialog
  },
  computed: {
    getFavoritesID () {
      return this.$store.state.favoritesID
    },
    getFavorites () {
      return this.$store.state.favorites
    },
    getSelCardCount () {
      return this.$data.ids.length
    },
    listStyle () {
      let obj = this.$data.showNav && this.getFavoritesID.length !== 1
        ? { marginBottom: '56px' }
        : {}
      return obj
    },
    onlyOne () {
      let theClass = this.getFavoritesID.length === 1 ? 'only-one' : ''
      return theClass
    }
  },
  methods: {
    showIcon (id) {
      let index = this.$data.ids.indexOf(id)
      if (index === -1) {
        this.$data.ids.push(id)
      } else {
        this.$data.ids.splice(index, 1)
      }
      this.checkBottom()
    },
    checkBottom () {
      this.$data.showNav = this.getSelCardCount > 0
    },
    checkCard () {
      let favIds = this.getFavoritesID
      let ids = []
      for (let item of favIds) {
        ids.push(item)
      }
      this.$data.ids = ids
    },
    cancleCard () {
      this.$data.ids = []
      this.checkBottom()
    },
    openDialog () {
      this.$data.dialog = true
    },
    cancelDialog () {
      this.$data.dialog = false
    },
    deleteCard () {
      let _this = this
      let favorites = []
      let favoritesID = []
      let ids = _this.$data.ids
      if (_this.getSelCardCount !== _this.getFavoritesID.length) {
        favorites = _this.getFavorites
        favoritesID = _this.getFavoritesID
        for (let item of ids) {
          let index = favoritesID.indexOf(item)
          favorites.splice(index, 1)
          favoritesID.splice(index, 1)
        }
      }
      _this.$store.commit('setFavoritesID', favoritesID)
      _this.$store.commit('setFavorites', favorites)
      _this.cancleCard()
      _this.$data.dialog = false
      _this.setTitle()
    },
    setTitle () {
      this.$store.commit('setMyTitle', '收藏 (' + this.getFavorites.length + ')')
    }
  },
  mounted () {
    this.setTitle()
  }
}
</script>

<style lang="stylus" scoped>
.fav-layout
  position relative
  transition all .2s
  &.only-one
    margin-bottom 150px
  .fav-card-bg
    margin 10px
    &.only-one
      position absolute
      top 50%
      transform translateY(-50%)
      margin 0
    & .fav-card
      box-sizing border-box
      transition all .3s
</style>
