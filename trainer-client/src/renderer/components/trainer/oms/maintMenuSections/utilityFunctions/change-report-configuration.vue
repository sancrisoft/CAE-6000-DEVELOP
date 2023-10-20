<template>
 <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <oms-no-data-display v-if="!hasSortedData"></oms-no-data-display>
    <div v-else class="row">
      <parameter-group-selector></parameter-group-selector>
      <div class="checkBoxList">
        <oms-table-list
          :items="filteredReports"
          itemLabel="label">
        </oms-table-list>
      </div>
    </div>
 </div>
</template>
<script>
import omsNoDataDisplay from '@/components/trainer/oms/shared/oms-no-data-display'
import parameterGroupSelector from '@/components/trainer/oms/maintMenuSections/components/parameter-group/parameter-group-selector'
import utilityFunctionsViewMixin from '@/components/trainer/oms/maintMenuSections/utilityFunctions/utility-functions-view-mixin'
import omsTableList from '@/components/trainer/oms/shared/dynamicComponents/oms-table-list'
import { mapState } from 'vuex'

export default {
  data: {
    parameterGroupId: '0',
    filteredReports: []
  },
  created () {
    this.$store.dispatch('appContext/omsViewPort/maintMenuFilterDataList')
    this.parameterGroupId = '1'
    this.reloadTableList()
  },
  computed: {
    ...mapState({
      sortedData: state => state.appContext.omsViewPort.sortedData,
      reportsConfig: state => state.appContext.omsViewPort.data.items
    }),
    hasSortedData () {
      return true
    }
  },
  mounted () {
    this.$bus.$on('parameterGroupSelected', (selectedId) => {
      this.$store.dispatch('appContext/omsViewPort/updateComboSelection', { comboName: 'parameterGroupCombo', selectedId: selectedId })
    })
    this.$bus.$on('parameterComboChanged', (selectedGroup) => {
      this.parameterGroupId = selectedGroup
      this.reloadTableList()
    })
  },
  beforeDestroy () {
    this.$bus.$off('parameterGroupSelected')
  },
  components: {
    omsNoDataDisplay,
    parameterGroupSelector,
    omsTableList
  },
  mixins: [utilityFunctionsViewMixin],
  methods: {
    reloadTableList () {
      this.filteredReports = this.reportsConfig.filter(item => {
        if (item.type === this.parameterGroupId) {
          return true
        }
        return false
      })

      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
.checkBoxList {
  margin-top: 4vh;

  /deep/ .selected .oms-checkbox-item-name {
    color: #fff;
  }
}


</style>
