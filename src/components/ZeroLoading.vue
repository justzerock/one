<template>
  <div
    class="circles"
    @click="load"
    >
    <div
      :class="[{loading: loading}, 'primary-circle']"
    />
    <div
      :class="[{loading: loading}, 'secondary-circle']"
    />
    <div
      :class="[{loading: loading}, 'primary-static']"
    />
    <div
      :class="[{loading: loading}, 'secondary-static']"
    />
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    load () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus" scoped>
.circles
  width 56px
  height 56px
  position relative
  cursor pointer
  .primary-circle, .secondary-circle
    width: 100%
    height: 100%
    border-radius: 50%
    background-color: #fff
    opacity: 0
    position: absolute
    top: 0
    left: 0
    transition all .3s ease-in-out
    animation: bounce 2.0s infinite ease-in-out
    &.loading
      opacity .6
  .secondary-circle
    animation-delay: -1.0s
  .primary-static, .secondary-static
    width: 100%
    height: 100%
    border-radius: 50%
    background-color: #fff
    opacity: .6
    position: absolute
    top: 0
    left: 0
    transition all .3s ease-in-out
    box-shadow 2px 2px 2px rgba(0, 0, 0, .2)
    &.loading
      opacity 0
  .secondary-static
    box-shadow 4px 4px 4px rgba(0, 0, 0, .2)
    transform scale(.5)
    animation: button 4.0s infinite ease-in-out
    &:active
      box-shadow 1px 1px 1px rgba(0, 0, 0, .1)
      opacity .4
@keyframes button {
  0%, 100% {
    transform scale(.5)
  }
  25%, 75% {
    transform scale(.48)
  }
  50% {
    transform scale(.52)
  }
}
@keyframes bounce {
  0%, 100% {
    transform: scale(0.5)
  } 50% {
    transform: scale(1.0)
  }
}
</style>
