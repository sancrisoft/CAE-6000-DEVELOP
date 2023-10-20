<template>
  <div class="inner-viewport-content maint-menu-summary">
    <h1>{{title}}</h1>
    <oms-no-data-display v-if="!hasSummary"></oms-no-data-display>
    <div v-else class="row">
      <system-exceedances-item-display :item="summary" :bullet="false"></system-exceedances-item-display>
      <hr>
      <parameter-group-selector></parameter-group-selector>
      <parameter-group-display-list></parameter-group-display-list>
    </div>
  </div>
</template>

<script>
import baseSummaryView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-summary-view-mixin'
import systemExceedancesItemDisplay from '@/components/trainer/oms/maintMenuSections/components/display/system-exceedances-item-display'
export default {
  name: 'systemexceedancessummary',
  mixins: [baseSummaryView],
  components: {
    systemExceedancesItemDisplay
  }
}
</script>
<style lang="scss" scoped>
  form.selectorForm {
    width: 77%;
  }
</style>


