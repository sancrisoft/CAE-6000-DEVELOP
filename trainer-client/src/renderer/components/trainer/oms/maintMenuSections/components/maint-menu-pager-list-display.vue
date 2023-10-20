<template>
  <div class="maint-menu-pager-list-header">
    <slot name='pagerHeaderContent'></slot>
  </div>
</template>
<script>
export default {
  name: 'maintmenupagerlistheader'
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
  .maint-menu-pager-list-header {
    height: 3.5vh;
    width: 100%;
    padding: 0 0.5vh;
    box-sizing: border-box;
    margin: 0;
    border: $default-border;
    border-radius: $default-list-border-radius;
  }
</style>
