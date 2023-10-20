<template>
 <div class="inner-viewport-content maint-menu-summary">
    <h1>{{title}}</h1>
    <oms-no-data-display v-if="!hasSummary"></oms-no-data-display>
    <div v-else class="row">
      <system-trends-item-display :item="summary" :bullet="false"></system-trends-item-display>
      <hr>
      <parameter-group-selector></parameter-group-selector>
      <parameter-group-display-list></parameter-group-display-list>
    </div>
 </div>
</template>
<script>
import baseSummaryView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-summary-view-mixin'
import systemTrendsItemDisplay from '@/components/trainer/oms/maintMenuSections/components/display/system-trends-item-display'
export default {
  name: 'systemtrendssummary',
  mixins: [baseSummaryView],
  components: {
    systemTrendsItemDisplay
  }
}
</script>
<style lang="scss" scoped>
  form.selectorForm {
    width: 77%;
  }
  /deep/ .parameter-group-display-list {
    & tr {
     height: 2vh !important;
    }
    & td {
      line-height: 1.8vh !important;
    }
  }
</style>

