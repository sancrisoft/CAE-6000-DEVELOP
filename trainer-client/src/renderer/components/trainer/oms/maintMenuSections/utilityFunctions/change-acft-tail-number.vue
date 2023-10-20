<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <div class="row">
      <caution-panel
        :target="target"
        bodyTxt="Changing the Aircraft Tail Number will reset
        all counters and delete all stored maintenance data including
        faults, exceedances, trends, and life cycle data.">
      </caution-panel>
    </div>
    <div class="row flex-start">
      <span class="text-shaded">Current Tail Number:</span>
      <span id="tailNumber">{{tailNumber}}</span>
    </div>
    <div class="row flex-start">
      <span class="text-shaded">New Tail Number:</span>
      <span>
        <form class="changeTailNo no-margin" @submit.stop="setConfirmPanel(true)">
          <input v-model="newTailNo">
        </form>
      </span>
    </div>
    <progress-panel
      completeLabel="Change Tail Number Complete"
      inProgressLabel="Change Tail Number in Progress"
      progressBarLabel="Overall Progress"
      actionType="changeTailNumber"
      :confirmPanel="confirmPanel"
      :inputValue="newTailNo"
      :bodyTxt="yesNoFormBodyTxt"
      @hideConfirmPanel="reset">
    </progress-panel>
  </div>
</template>
<script>
import utilityFunctionsViewMixin from '@/components/trainer/oms/maintMenuSections/utilityFunctions/utility-functions-view-mixin'
import cautionPanel from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/caution-panel'
import progressPanel from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/progress-panel'
import confirmPanelConsumerMixin from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/confirm-panel-consumer-mixin'

import { mapState } from 'vuex'

export default {
  data () {
    return {
      newTailNo: null
    }
  },
  name: 'changeacfttailnumber',
  computed: {
    ...mapState({
      tailNumber: state => state.appContext.tailNumber
    }),
    yesNoFormBodyTxt () {
      return 'Change Aircraft Tail Number to ' + this.newTailNo + ' ?'
    }
  },
  components: {
    cautionPanel,
    progressPanel
  },
  mixins: [utilityFunctionsViewMixin, confirmPanelConsumerMixin]
}
</script>
<style lang="scss" scoped>
  .changeTailNo {
    input {
      width: 4vh;
    }
  }
</style>


