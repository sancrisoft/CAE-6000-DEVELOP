<template>
  <oms-scrollable rootClasses="lry-sys-tab-content">
    <div slot="scrollableContent">
      <ul class="hoverable-list">
        <li class="hoverable-list-item"
          v-for="(item, index) in items" :key="index"
          @click.stop="switchView(item)"
          :class="{disabled:!hasTarget(item)}" >
          <span class="hoverable-list-item-bullet"></span>
          {{item.type}}
        </li>
      </ul>
    </div>
  </oms-scrollable>
</template>
<script>
import omsScrollable from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable'
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    switchView (item) {
      this.$emit('tabListItemClicked', item)
    },
    hasTarget (item) {
      return item.target.length
    }
  },
  components: {
    omsScrollable
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
.lry-sys-tab-content {
  position : relative;
  width: 100%;
  min-height: 64vh;
  overflow: hidden
}
</style>


