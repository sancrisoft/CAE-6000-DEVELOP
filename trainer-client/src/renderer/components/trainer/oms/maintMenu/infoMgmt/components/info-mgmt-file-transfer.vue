<template>
  <div class="loaderContainer">
    <div v-if="transferring">
      <p class="loaderMessage">
        <span v-if="!transferCompleted">Transfer in Progress:</span>
        <span class="loaderMessage" v-if="transferCompleted">Transfer Complete:</span>
        {{fileTransferMessage}}
      </p>
      <oms-progress-bar
        :size="50"
        :transferCompleted="transferCompleted"
        :completedRatio="completedRatio">
      </oms-progress-bar>
    </div>
  </div>
</template>
<script>
import omsProgressBar from '@/components/trainer/oms/shared/oms-progress-bar'
import { mapState } from 'vuex'
export default {
  name: 'filetransferloader',
  data () {
    return {
      transferring: false,
      transferCompleted: true,
      completedRatio: 0
    }
  },
  mounted () {
    this.$bus.$on('fileTransferState', (state) => {
      this.setFileLoaderState(state)
    })
  },
  beforeDestroy () {
    this.$bus.$off('fileTransferState')
  },
  computed: {
    ...mapState({
      fileTransferMessage: state => state.appContext.omsViewPort.fileTransferMessage
    })
  },
  methods: {
    setFileLoaderState: function (state) {
      this.transferring = state.transferring
      this.completedRatio = state.completedRatio
      this.transferCompleted = (state.completedRatio === 100)
    }
  },
  components: {
    omsProgressBar
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
  .loaderContainer {
    margin: 1vh 0;
    min-height: 5vh;
  }
  .loaderMessage {
    margin: 0
  }
</style>
