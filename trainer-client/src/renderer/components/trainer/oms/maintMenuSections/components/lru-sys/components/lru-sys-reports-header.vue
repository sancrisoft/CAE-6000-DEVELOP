<template>
  <div class="row flex-justified header-wrapper">
    <div></div>
    <lru-sys-maintenance-reports-btn></lru-sys-maintenance-reports-btn>
    <oms-paging-counter counterName="omsPager"></oms-paging-counter>
  </div>
</template>
<script>
import lruSysMaintenanceReportsBtn from '@/components/trainer/oms/maintMenuSections/components/lru-sys/components/lru-sys-maintenance-reports-btn'
import omsPagingCounter from '@/components/trainer/oms/shared/paging/oms-paging-counter'
export default {
  components: {
    lruSysMaintenanceReportsBtn,
    omsPagingCounter
  }
}
</script>
<style lang="scss">
.header-wrapper {
  margin-top: 1vh;
  > div {
    min-width: 25%
  }
}
</style>


