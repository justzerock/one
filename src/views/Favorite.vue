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
        >
        <zero-card
          class="fav-card"
          :hitokoto="item"
          :favorite="favorite"
          :favoriteID="String(item.id)"
          :poetTextStyle="poetTextStyle"
          :cardTextStyle="cardTextStyle"
          :IDs="IDs"
          :expandIDs="expandIDs"
          @zclick="showIcon(String(item.id))"
          @switchMode="switchCardMode(String(item.id))"
        />
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
      IDs: [],
      expandIDs: [],
      dialog: false,
      poetTextStyle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      cardTextStyle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center'
      }
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
      return this.IDs.length
    },
    listStyle () {
      let obj = this.showNav && this.getFavoritesID.length !== 1
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
      let index = this.IDs.indexOf(id)
      if (index === -1) {
        this.IDs.push(id)
      } else {
        this.IDs.splice(index, 1)
      }
      this.checkBottom()
    },
    checkBottom () {
      this.showNav = this.getSelCardCount > 0
    },
    checkCard () {
      let favIds = this.getFavoritesID
      let IDs = []
      for (let item of favIds) {
        IDs.push(item)
      }
      this.IDs = IDs
    },
    cancleCard () {
      this.IDs = []
      this.checkBottom()
    },
    openDialog () {
      this.dialog = true
    },
    cancelDialog () {
      this.dialog = false
    },
    deleteCard () {
      let _this = this
      let favorites = []
      let favoritesID = []
      let IDs = _this.IDs
      if (_this.getSelCardCount !== _this.getFavoritesID.length) {
        favorites = _this.getFavorites
        favoritesID = _this.getFavoritesID
        for (let item of IDs) {
          let index = favoritesID.indexOf(item)
          favorites.splice(index, 1)
          favoritesID.splice(index, 1)
        }
      }
      _this.$store.commit('setFavoritesID', favoritesID)
      _this.$store.commit('setFavorites', favorites)
      _this.cancleCard()
      _this.dialog = false
      _this.setTitle()
    },
    setTitle () {
      this.$store.commit('setMyTitle', '收藏 (' + this.getFavorites.length + ')')
    },
    /* 切换卡片显示模式 */
    switchCardMode (id) {
      let index = this.expandIDs.indexOf(id)
      if (index === -1) {
        this.expandIDs.push(id)
      } else {
        this.expandIDs.splice(index, 1)
      }
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
  transition all .5s ease-in-out
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
      transition all .5s ease-in-out
.fav-card
  for i in 1..4
    @media (min-width 2**(i+7)px)
      width (90/i)vw
      height 10vh
      display flex
</style>
