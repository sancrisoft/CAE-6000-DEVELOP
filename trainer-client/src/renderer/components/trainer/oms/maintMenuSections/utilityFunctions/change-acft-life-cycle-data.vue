<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
    <div v-else class="row">
      <parameter-group-selector></parameter-group-selector>
      <parameter-group-display-list :dynamic="true"></parameter-group-display-list>
    </div>
  </div>
</template>
<script>
import omsNoDataDisplay from '@/components/trainer/oms/shared/oms-no-data-display'
import parameterGroupSelector from '@/components/trainer/oms/maintMenuSections/components/parameter-group/parameter-group-selector'
import parameterGroupDisplayList from '@/components/trainer/oms/maintMenuSections/components/parameter-group/parameter-group-display-list'
import utilityFunctionsViewMixin from '@/components/trainer/oms/maintMenuSections/utilityFunctions/utility-functions-view-mixin'
import { mapState } from 'vuex'
export default {
  name: 'changeacftlifecycledata',
  created () {
    this.$store.dispatch('appContext/omsViewPort/maintMenuFilterDataList')
  },
  computed: {
    ...mapState({
      sortedData: state => state.appContext.omsViewPort.sortedData
    }),
    hasSortedData () {
      return true
    }
  },
  mounted () {
    this.$bus.$on('parameterGroupSelected', (selectedId) => {
      this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'parameterGroupCombo', selectedId: selectedId })
    })
  },
  beforeDestroy () {
    this.$bus.$off('parameterGroupSelected')
  },
  components: {
    omsNoDataDisplay,
    parameterGroupSelector,
    parameterGroupDisplayList
  },
  mixins: [utilityFunctionsViewMixin]
}
</script>
