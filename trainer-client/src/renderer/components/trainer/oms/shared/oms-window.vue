<template>
  <div class='oms-window' :class="size">
    <div class='body'>
        <div class='header'>
          <span class="label">{{ header }}</span>
          <oms-paging-counter counterName="omsPager" location="omsWindow"></oms-paging-counter>
          <div v-if="hasClose" class='close btn' @click.stop='close'> X </div>
        </div>
        <div class='window-content'>
          <slot name='windowContent'></slot>
        </div>
    </div>
  </div>
</template>

<script>
import omsPagingCounter from '@/components/trainer/oms/shared/paging/oms-paging-counter'
export default {
  name: 'omswindow',
  props: {
    header: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      required: true
    },
    windowPropName: {
      default: false
    }
  },
  components: {
    omsPagingCounter
  },
  computed: {
    hasClose () {
      return this.$options.propsData.windowPropName && this.$options.propsData.windowPropName.length
    }
  },
  methods: {
    close () {
      this.$bus.$emit('closeWindow', this.$props.windowPropName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/oms-window';
</style>
