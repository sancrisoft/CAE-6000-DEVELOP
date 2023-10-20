<template>
  <ul class="hoverable-list menu row">
    <li class="hoverable-list-item" v-for="(item, index) in items"
      :key="index"
      @click.stop="switchView(item)"
      :class="{disabled: !item.enabled}">
      <span class="hoverable-list-item-bullet"></span>
      {{item.label}}
      <span class="hoverable-list-messages" v-html="formatedMessages(item)"></span>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatedMessages (item) {
      if (item.messages && item.messages.value) {
        return `(${item.messages.value} ${item.messages.label})`
      }
    },
    switchView (item) {
      if (item.enabled) {
        this.$bus.$emit('switchView', { component: 'maintMenu', view: item.target })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.hoverable-list-messages {
  margin-left: 2vh
}
</style>

