<template>
  <v-bottom-nav
    :active.sync="activeBtn"
    :value="showNav"
    fixed
    color="white"
  >
    <v-btn
      flat
      color="primary"
      @click="cancleCard"
    >
      <span>取消</span>
      <v-icon>fa fa-times</v-icon>
    </v-btn>

    <v-btn
      flat
      color="teal"
      @click="checkCard"
    >
      <span>全选</span>
      <v-icon>fa fa-check-square</v-icon>
    </v-btn>

    <v-btn
      flat
      color="error"
      @click="deleteCard"
    >
      <span>删除已选 ({{count}})</span>
      <v-icon>fa fa-trash</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  data () {
    return {
      activeBtn: 2
    }
  },
  props: {
    showNav: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    cancleCard () {
      this.$emit('cancleCard')
    },
    checkCard () {
      this.$emit('checkCard')
    },
    deleteCard () {
      this.$emit('deleteCard')
    }
  }
}
</script>
