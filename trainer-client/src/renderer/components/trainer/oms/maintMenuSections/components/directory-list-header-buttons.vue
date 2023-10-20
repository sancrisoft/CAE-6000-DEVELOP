<template>
  <div class='row flex-end border-bottom tab-header'>
    <div class="btn slim left" @click.stop="refresh">Refresh</div>
    <div class="btn slim" @click.stop="expandAll">+ All</div>
    <div class="btn slim" @click.stop="collapseAll">- All</div>
  </div>
</template>
<script>
export default {
  methods: {
    refresh () {
      this.$bus.$emit('directory-list-refresh')
    },
    expandAll () {
      this.$bus.$emit('directory-list-expandAll')
    },
    collapseAll () {
      this.$bus.$emit('directory-list-collapseAll')
    }

  }
}
</script>

