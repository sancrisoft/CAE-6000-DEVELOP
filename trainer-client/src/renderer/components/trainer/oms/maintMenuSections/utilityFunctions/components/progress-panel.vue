<template>
  <div class="row">
    <hr>
    <div v-show="transferCompleted" class="flex-center complete">{{completeLabel}}</div>
    <div v-show="inProgress" class="progress">
      <p class="flex-center">{{inProgressLabel}}</p>
      <p class="overall-progress">{{progressBarLabel}}:</p>
      <oms-progress-bar class="flex-center"
        :size="40"
        :transferCompleted="transferCompleted"
        :completedRatio="transferCompletedRatio">
      </oms-progress-bar>
    </div>
    <confirm-panel
      v-show="confirmPanel"
      header="Confirm Selection"
      :bodyTxt="bodyTxt"
      @submit="submit"
      @reset="reset">
    </confirm-panel>
  </div>
</template>
<script>
import omsProgressBar from '@/components/trainer/oms/shared/oms-progress-bar'
import confirmPanel from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/confirm-panel'

const completedRatioInterval = 500
let loaderInterval = null
export default {
  name: 'progresspanel',
  data () {
    return {
      inProgress: false,
      inProgressCompleted: false,
      transferCompleted: false,
      transferCompletedRatio: 0
    }
  },
  watch: {
    confirmPanel () {
      this.transferCompleted = false
    }
  },
  props: {
    completeLabel: {
      type: String,
      default: ''
    },
    inProgressLabel: {
      type: String,
      default: ''
    },
    progressBarLabel: {
      type: String,
      default: ''
    },
    confirmPanel: {
      type: Boolean,
      default: false
    },
    bodyTxt: {
      type: String,
      default: ''
    },
    inputValue: {
      type: String,
      default: ''
    },
    actionType: {
      type: String,
      default: 'changeTailNumber'
    }
  },
  components: {
    confirmPanel,
    omsProgressBar
  },
  methods: {
    reset () {
      this.$emit('hideConfirmPanel')
      this.toggleLayer('transferComplete', false)
      this.toggleLayer('inProgress', false)

      this.newTailNo = null
    },
    setTransfer () {
      this.transferCompletedRatio = 0
      this.$emit('hideConfirmPanel')
      this.toggleLayer('transferComplete', false)
      this.toggleLayer('inProgress', true)
    },
    toggleLayer (prop, bool) {
      this[prop] = bool
    },
    toggleSelectsAvailability (state) {
      this.$bus.$emit('maintMenuAvailabilityState', state)
      this.$bus.$emit('omsBtnsAvailabilityState', state)
      this.$bus.$emit('cautionPanelAvailabilityState', state)
      this.$emit('availabilityState', state)
    },
    submit () {
      let loaderCountIntervalRatio = 20
      let updatedValue = this.inputValue
      let actionType = this.actionType
      let getters = this.$store.getters
      this.toggleSelectsAvailability(true)
      this.setTransfer()
      loaderInterval = setInterval(() => {
        this.transferCompletedRatio = this.transferCompletedRatio + loaderCountIntervalRatio
        if (this.transferCompletedRatio >= 100) {
          clearInterval(loaderInterval)
          setTimeout(() => {
            switch (actionType) {
              case 'changeTailNumber':
                this.$store.dispatch('appContext/changeTailNumber', updatedValue)
                break
              case 'deleteMaintenanceData':
                let selectedDataType = getters['appContext/omsViewPort/getViewComboSelectedState']('dataTypeCombo')
                this.$store.dispatch('appContext/deleteMaintenanceData', selectedDataType.key)
                break
            }
            this.reset()
            this.toggleSelectsAvailability(false)
            this.toggleLayer('transferCompleted', true)
          }, 1000)
        }
      }, completedRatioInterval)
    }
  }
}
</script>
<style lang="scss" scoped>
 hr {
   margin-bottom: 2vh
 }
 .overall-progress {
   margin: 4vh 0 0 8vh;
 }
</style>


