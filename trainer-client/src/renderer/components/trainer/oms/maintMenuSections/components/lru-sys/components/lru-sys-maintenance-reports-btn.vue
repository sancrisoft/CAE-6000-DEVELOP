<template>
  <div class="btn slim" @click.stop="gotoMaintenanceReports">Write Maintenance Reports</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      componentName: state => state.appContext.omsViewPort.componentName,
      viewBackBtnLabel: state => state.appContext.omsViewPort.header.viewBackBtnLabel
    })
  },
  methods: {
    gotoMaintenanceReports () {
      this.$store.dispatch('appContext/setViewBackBtnOverride', {
        label: this.viewBackBtnLabel || 'Return to <br> LRU/SYS ...',
        target: this.componentName || this.$parent.$options._componentTag})
      this.$bus.$emit('switchView', { component: 'maintMenu', view: 'lrusysmaintreports' })
    }
  }
}
</script>
<style scoped>
.btn.slim {
  white-space: nowrap
}
</style>

