
import {mapState} from 'vuex'
const completedRatioInterval = 500
let loaderInterval = null
export default {
  data () {
    return {
      complete: false,
      transferInProgress: false,
      transferCompletedRatio: 0,
      transferCompleted: false,
      overAllTransferCompleted: false,
      overAllTransferCompletedRatio: 0,
      inProgressFile: ''
    }
  },
  computed: {
    ...mapState({
      files: state => state.appContext.omsViewPort.data.files
    }),
    outputName () {
      return this.writeToCombo[this.selectedOutput].label
    },
    writingToDevice () {
      return `Writing to USB`
    },
    inProgressMessage () {
      return `Write NVM Data to ${this.outputName}`
    },
    writingToFile () {
      return `Filename: ${this.inProgressFile}`
    }
  },
  methods: {
    start () {
      this.toggleSelectsAvailability(true)
      this.transferInProgress = true
      this.complete = false
      this.filesToLoad = [].concat(this.files)
      this.transferFiles()
    },
    cancel () {
      this.reset()
      this.complete = false
    },
    transferFiles () {
      if (this.filesToLoad && this.filesToLoad.length) {
        let file = this.filesToLoad.shift()
        this.inProgressFile = file
        this.loadFile(file)
      } else {
        this.overAllTransferCompletedRatio = 100
        this.transferCompletedRatio = 100
        setTimeout(() => {
          this.reset()
        }, 1000)
      }
    },
    reset () {
      this.toggleSelectsAvailability(false)
      clearInterval(loaderInterval)
      this.complete = true
      this.inProgressFile = ''
      this.transferInProgress = false
      this.transferCompletedRatio = 0
      this.overAllTransferCompleted = false
      this.overAllTransferCompletedRatio = 0
    },
    loadFile: function (file) {
      let loaderCountIntervalRatio = 100 / 5
      this.transferCompletedRatio = 0
      this.transferCompleted = false
      loaderInterval = setInterval(() => {
        this.transferCompletedRatio = this.transferCompletedRatio + loaderCountIntervalRatio
        if (this.transferCompletedRatio > 100) {
          this.transferCompleted = true
          clearInterval(loaderInterval)
          this.overAllTransferCompletedRatio = this.overAllTransferCompletedRatio + Math.round(100 / this.files.length)
          this.overAllTransferCompleted = !this.filesToLoad.length
          this.transferFiles()
          this.$emit('complete')
        }
      }, completedRatioInterval)
    },
    toggleSelectsAvailability (state) {
      this.$bus.$emit('maintMenuSectionsAvailabilityState', state)
      this.$bus.$emit('omsBtnsAvailabilityState', state)
      this.selectsDisabled = state
    }
  }
}
