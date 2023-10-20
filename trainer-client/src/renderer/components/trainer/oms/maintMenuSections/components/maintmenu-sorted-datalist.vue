<template>
  <ul class="maint-data-table row"
  :class="{'hoverable-list':!isStatic}"
    v-on:mouseenter="setKnob(totalPages)">
    <slot name='maint-data-table-content'></slot>
  </ul>
</template>
<script>
import omsKnob from '@/components/trainer/oms/shared/paging/oms-knob-consumer-mixin'
export default {
  name: 'maintmenusorteddatalist',
  props: {
    totalPages: {
      type: Number,
      default: 1
    }
  },
  computed: {
    isStatic () {
      return this.$options.propsData && this.$options.propsData.static
    }
  },
  mixins: [omsKnob]
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
.maint-data-table {
  margin: 1vh 0.5vh;
  padding: 0;
  list-style-type: none;
  width: 100%;
  .hoverable-list li {
      height: auto !important;
      padding: 0.5vh;
      margin: 0;
      line-height: 2vh;
  }
  table {
    width: 98%;
    margin: 0 1%;
  }

  td {
    width: 33%;
    font-size: $default-text-size;
    vertical-align: top;
    line-height: auto;
    &.bullet {
      width: 5%;
    }
  }
}
</style>

