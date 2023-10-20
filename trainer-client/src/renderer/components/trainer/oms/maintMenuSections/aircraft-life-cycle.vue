
<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
    <div v-else class="row">
      <parameter-group-selector></parameter-group-selector>
      <parameter-group-display-list></parameter-group-display-list>
    </div>
  </div>
</template>

<script>
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
export default {
  name: 'aircraftlifecycle',
  mixins: [baseView]
}
</script>
