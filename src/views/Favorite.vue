<template>
  <div>
    <div
      v-for="(item, index) in getFavorites"
      :key="index"
    >
      <zero-card
        v-bind:hitokoto="item"
      ></zero-card>
    </div>
  </div>
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