<template>
  <div class="overlay" :class="{uppercase:uppercase}">
    <oms-window :size="size" :header="header">
      <div slot="windowContent">{{bodyTxt}}</div>
    </oms-window>
  </div>
</template>
<script>
import omsWindow from '@/components/trainer/oms/shared/oms-window'
export default {
  name: 'omsoverlaypanel',
  components: {
    omsWindow
  },
  props: {
    bodyTxt: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    windowPropName: {
      type: String,
      default: ''
    }
  }
}
</script>

