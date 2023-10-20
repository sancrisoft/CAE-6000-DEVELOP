<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <div class="row">
      <caution-panel
        target="deletestoredmaintenancedatamaintenancereports"
        bodyTxt="Deleting selected data will result in loss of all flight leg history for
        the associated functionality">
      </caution-panel>
    </div>
    <div class="row flex-start">
      <form class="selectorForm">
        <span class="oms-select-label table-text-shaded">{{dataTypeComboLabel}}</span>
        <oms-select
          @dataTypeComboChanged="dataTypeSelected"
          eventName="dataTypeComboChanged"
          :list="dataTypeCombo"
          :disabled="availabilityState">
        </oms-select>
      </form>
    </div>
    <div class="row flex-start">
      <div class="btn large slim deleteBtn" :class="{hidden:availabilityState}" @click.stop="setConfirmPanel(true)">Delete</div>
    </div>
    <progress-panel
      completeLabel="Delete Complete"
      inProgressLabel="Delete in Progress"
      progressBarLabel="Delete Progress"
      actionType="deleteMaintenanceData"
      :confirmPanel="confirmPanel"
      @hideConfirmPanel="reset"
      @availabilityState="setAvailabilityState">
    </progress-panel>
  </div>
</template>
<script>
import utilityFunctionsViewMixin from '@/components/trainer/oms/maintMenuSections/utilityFunctions/utility-functions-view-mixin'
import cautionPanel from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/caution-panel'
import omsSelect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
import progressPanel from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/progress-panel'
import confirmPanelConsumerMixin from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/confirm-panel-consumer-mixin'
import { mapState } from 'vuex'
export default {
  name: 'deletestoredmaintenancedata',
  computed: {
    ...mapState({
      dataTypeComboLabel: state => state.appContext.omsViewPort.dataTypeComboLabel,
      dataTypeCombo: state => state.appContext.omsViewPort.dataTypeCombo
    })
  },
  mixins: [utilityFunctionsViewMixin, confirmPanelConsumerMixin],
  components: {
    cautionPanel,
    omsSelect,
    progressPanel
  },
  methods: {
    dataTypeSelected (id) {
      // console.log(id)
    }
  }
}
</script>
<style lang="scss" scoped>
.deleteBtn {
  margin-left: 2vh
}
</style>

