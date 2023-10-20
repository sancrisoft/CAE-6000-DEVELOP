<template>
  <div class="loader">
    <div class="loadingProgress indicator" v-bind:style="{width: size+ 'vh'}" :class="{completed: transferCompleted}">
      <span class="indicator" v-bind:style="{ width: completedRatio+ '%' }"></span>
      <span class="loadedRatio">{{completedRatio}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    transferCompleted: {
      type: Boolean,
      default: false
    },
    completedRatio: {
      type: Number,
      default: 0
    },
    size: {
      type: Number
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
@import '~@/assets/oms-loading-progress';
@include loadingProgress
</style>


