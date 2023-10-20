<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'app',
    created () {
      this.$store.dispatch('appContext/getAppContext')
    }

  }
</script>

<style lang="scss">
  @import '~@/assets/layout';
</style>
