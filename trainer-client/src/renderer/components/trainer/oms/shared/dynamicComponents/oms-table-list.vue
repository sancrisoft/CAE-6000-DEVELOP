<template>
  <table class="oms-scrollable-list">
    <tr v-for="(item, index) in items"
      :key="index">
      <td class="oms-scrollable-item" @click.stop="toggleSelected(index)">
        <oms-checkbox-selector :selected="item.selected">
          <div slot="oms-checkbox-item-name"
            class="oms-checkbox-item-name" :class="{uppercase:uppercase}" v-html="getLabel(item)"></div>
        </oms-checkbox-selector>
      </td>
    </tr>
  </table>
</template>
<script>
import omsCheckboxSelector from '@/components/trainer/oms/shared/oms-checkbox-selector'
export default {
  name: 'omstablelist',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    itemLabel: {
      type: String,
      default: 'label'
    },
    uppercase: {
      type: Boolean,
      default: false
    }
  },
  components: {
    omsCheckboxSelector
  },
  methods: {
    toggleSelected (index) {
      this.$emit('oms-table-list-item-toogle', index)
    },
    getLabel (item) {
      return item[this.$options.propsData.itemLabel]
    }
  }
}
</script>

<style lang="scss" scoped>
 @import '~@/assets/vars';

  .oms-scrollable-list {
    width: 98%;
  }

  .oms-scrollable-item {
    @include oms-scrollable-border();
    @include oms-scrollable-item();
  }
</style>

