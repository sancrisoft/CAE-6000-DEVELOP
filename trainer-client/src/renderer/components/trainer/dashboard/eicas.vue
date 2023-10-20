<template>
  <ul>
    <li v-for="(item, index) in messages"
    :key="index"
    :style="{ color: item.color}"
    :class="{ blink: item.blink }">
      {{item.label}}</li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'eicas',
  computed: {
    ...mapState({
      messages: state => state.appContext.omsViewPort.eicasMessages || state.appContext.eicasMessages
    })
  }
}
</script>

<style lang="scss" scoped>

ul {
  list-style-type: none
}

.blink {
  animation: blinker 1s 1s 2
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
