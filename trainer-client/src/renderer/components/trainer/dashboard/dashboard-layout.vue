<template>
  <div>
  <div class="oms-viewport-content">
    <div class="left">
    </div>
    <div class="right">
      <eicas class="eicas"></eicas>
    </div>
  </div>
  <div class="oms-viewport-message">
    <div class="left">
    </div>
    <div class="right">
      <eicas></eicas>
    </div>
  </div>
</div>
</template>

<script>
import eicas from './eicas'
export default {
  name: 'dashboard',
  components: {
    eicas
  }
}
</script>

<style scoped>
.left, .right {
  min-height: 20vh;
  flex-direction: row;
  flex: 1;
  width: 0;
  height:  100%
}
.eicas {
  height: 39vh;
  overflow-y: scroll;
}
</style>
