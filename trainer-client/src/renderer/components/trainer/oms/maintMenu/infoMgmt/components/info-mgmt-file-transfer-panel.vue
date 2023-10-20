<template>
  <oms-scrollable rootClasses="body-border-default file-transfer">
    <div slot="scrollableContent">
      <oms-table-list
        :items="filesToTransferList"
        itemLabel="fileName"
        :uppercase="true"
        @oms-table-list-item-toogle="toggleSelected">
      </oms-table-list>
    </div>
  </oms-scrollable>
</template>

<script>
import { mapState } from 'vuex'
import omsScrollable from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable'
import omsTableList from '@/components/trainer/oms/shared/dynamicComponents/oms-table-list'
import omsScrollableMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable-consumer-mixin'

const loadingDelayInterval = 1000
let loaderInterval = null
export default {
  data () {
    return {
      transferring: false,
      completedRatio: 0,
      complete: false,
      fileTransferCancelled: false
    }
  },
  mixins: [omsScrollableMixin],
  computed: {
    ...mapState({
      filesToTransferList: state => state.appContext.omsViewPort.filesToTransferList
    })
  },
  components: {
    omsScrollable,
    omsTableList
  },
  mounted () {
    this.$bus.$on('transferFiles', this.transferFiles)
    this.$bus.$on('cancelFileTransfer', this.cancelFileTransfer)
  },
  beforeDestroy () {
    this.$bus.$off('transferFiles')
    this.$bus.$off('cancelFileTransfer')
  },
  methods: {
    loadFiles: function () {
      this.transferring = !this.transferring
      this.completedRatio = 0
      this.complete = false
      this.fileTransferCancelled = false
      this.broacastFileTransferState()
    },
    cancelFileTransfer: function () {
      clearInterval(loaderInterval)
      this.resetFileTransferState()
    },
    transferFiles: function () {
      if (this.filesToTransferList && this.filesToTransferList.length) {
        let selectedItems = this.filesToTransferList.filter(item => item.selected === true)
        if (this.complete) {
          return this.completeReset()
        } else if (!selectedItems.length) {
          return false
        } else {
          this.loadFiles()
          this.saveIMSFileTransferData(selectedItems)
          let count = 0
          loaderInterval = setInterval(() => {
            count++
            this.setCompletedRatio()

            if (count === selectedItems.length + 1) {
              this.$store.dispatch('appContext/omsViewPort/removeInfoMgmtFileTransferSelectedFiles')
              this.complete = true
              this.broacastFileTransferState()
              clearInterval(loaderInterval)

              this.setScroll()
            }
          }, loadingDelayInterval)
        }
      }
    },
    setCompletedRatio: function () {
      if (this.filesToTransferList) {
        let selectedFiles = this.filesToTransferList.filter(item => item.selected === true).length
        let loaderCountIntervalRatio = 100 / selectedFiles
        let completed = (this.completedRatio + Math.round(loaderCountIntervalRatio) < 100) ? this.completedRatio + Math.round(loaderCountIntervalRatio) : 100
        this.completedRatio = completed

        this.broacastFileTransferState()
      }
    },
    completeReset: function () {
      this.complete = false
      this.transferring = false
      this.transferFilesCancelled = false

      this.broacastFileTransferState()
    },
    toggleSelected (index) {
      this.$store.dispatch('appContext/omsViewPort/toggleInfoMgmtViewSelectedFileToTransfer', index)
    },
    broacastFileTransferState () {
      this.$bus.$emit('fileTransferState', {
        transferring: this.transferring,
        completedRatio: this.completedRatio,
        complete: this.complete
      })
    },
    resetFileTransferState () {
      this.transferring = false
      this.completedRatio = 0
      this.complete = false
      this.broacastFileTransferState()
    },
    saveIMSFileTransferData (items) {
      var obj = {
        name: 'imsfiletransferdata',
        action: 'addtoims',
        data: items
      }
      this.$store.dispatch('appContext/postIMSContent', obj)
        .then((response) => {})
    }
  }
}
</script>
<style lang="scss">
  @import '~@/assets/vars';

  .file-transfer {
    min-height: 20vh !important;
  }
</style>
