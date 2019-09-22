<template>
  <v-layout align-content-start justify-center column>
    <v-layout row wrap justify-center align-content-center>
      <v-flex
        class="fav-card"
        v-for="(item, index) in getFavorites"
        :key="index"
        xs10 sm8 md5 lg3>
        <zero-card
          v-bind:hitokoto="item"
          ></zero-card>
        </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import ZeroCard from "../components/ZeroCard"

export default {
  components: {
    ZeroCard
  },
  computed: {
    getFavoritesID() {
      return this.$store.state.favoritesID
    },
    getFavorites() {
      return this.$store.state.favorites
    }
  }  
}
</script>

<style lang="stylus" scoped>
.fav-card 
  margin 10px
</style>