<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    let _this = this
    _this.$myTitle = '关于'
    console.log(_this.$myTitle)
  }
}
</script>
