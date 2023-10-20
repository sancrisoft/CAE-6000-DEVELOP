
<template>
  <data-load-layout
    :parentComponentName="currentView">
  </data-load-layout>
</template>
<script>
import dataLoadLayout from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-layout'
import baseView from '@/components/trainer/oms/maintMenu/dataLoad/views/data-load-base-view-mixin'
export default {
  name: 'reloadlru',
  mixins: [baseView],
  components: {
    dataLoadLayout
  }
}
</script>
