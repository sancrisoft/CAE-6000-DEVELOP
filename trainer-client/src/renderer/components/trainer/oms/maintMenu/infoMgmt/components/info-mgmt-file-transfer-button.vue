<template>
  <div class="row button-container">
    <div class="btn x-large" @click.stop="transferFiles">
      <span v-if="!complete && !transferring">{{transfer}}</span>
      <span v-if="transferring && !complete" @click.stop="cancelTransfer">{{cancel}}</span>
      <span v-if="complete"  @click.stop="cancelTransfer">{{completed}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      transferring: false,
      complete: false
    }
  },
  props: {
    transfer: {
      type: String,
      default: 'Transfer'
    },
    cancel: {
      type: String,
      default: 'Cancel'
    },
    completed: {
      type: String,
      default: 'Completed'
    }
  },
  computed: {
    ...mapState({
      filesToTransferList: state => state.appContext.omsViewPort.filesToTransferList
    })
  },
  mounted () {
    this.$bus.$on('fileTransferState', (state) => {
      this.setBtnState(state)
    })
  },
  beforeDestroy () {
    this.$bus.$off('fileTransferState')
  },
  name: 'infomgmttransferfilebuttton',
  methods: {
    cancelTransfer: function () {
      this.transferring = false
      this.complete = false
      this.$bus.$emit('cancelFileTransfer')
    },
    transferFiles: function () {
      if (this.filesToTransferList && this.filesToTransferList.length) {
        let selectedFiles = this.filesToTransferList.filter((item) => {
          return item.selected
        })

        if (selectedFiles.length) {
          this.transferring = true
          this.complete = false
          this.$bus.$emit('transferFiles')
        } else {
          this.$bus.$emit('fileTransferState', {
            transferring: false,
            complete: false
          })
        }
      }
    },
    setBtnState: function (state) {
      this.transferring = state.transferring
      this.complete = state.complete
    }
  }
}
</script>
