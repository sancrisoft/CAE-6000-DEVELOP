<template>
<div class="nvm-wrapper">
  <div class="row"
    v-show="!transferInProgress">
    <form class="selectorForm flex-center">
      <label class="oms-select-label table-text-shaded">{{writeToComboLabel}}</label>
      <oms-select
        @changeOutput="select"
        eventName="changeOutput"
        :list="writeToCombo"
        :comboWidth="15">
      </oms-select>
    </form>
    <div class="btn startBtn slim flex-center" @click.stop="start">Start</div>
    <div v-show="complete" class="row complete flex-center complete">
      <span>Write Complete</span>
    </div>
  </div>
  <oms-file-transfer-progress
    v-show="transferInProgress"
    :transferInProgress="transferInProgress"
    :transferCompletedRatio="transferCompletedRatio"
    :transferCompleted="transferCompleted"
    :overAllTransferCompleted="overAllTransferCompleted"
    :overAllTransferCompletedRatio="overAllTransferCompletedRatio"
    :headerMessage="inProgressMessage"
    upperComboMessage="Retreiving Data"
    :lowerComboMessage="writingToDevice"
    :files="files"
    @cancel="cancel">
  </oms-file-transfer-progress>

  <div v-if="!transferInProgress" class='row caution'>
    <h1>Caution</h1>
    <p>Pressing the clear NVM button will clear LRU internal fault NVM</p>
    <div v-if="clearingNVMdata">
      <p class="clearNVMlabel">Clearing NVM Data</p>
      <oms-progress-bar
        :size="40"
        :transferCompleted="transferCompleted"
        :completedRatio="completedRatio">
      </oms-progress-bar>
    </div>
    <div v-else class="btn clearBtn slim flex-center" @click.stop="prompt">Clear NVM</div>
  </div>
  <oms-window v-if="confirmPanel" class="flex-center" size="half" header="Confirm Selection" windowPropName="confirmPanel">
    <div slot="windowContent">
      Clear LRU Internal fault NVM?
       <form class="yes-no-form">
        <div class="btn large slim" @click.stop="clearNVM">YES</div>
        <div class="btn large slim" @click.stop="cancelConfirm">NO</div>
       </form>
    </div>
  </oms-window>
</div>
</template>
<script>
import omsWindow from '@/components/trainer/oms/shared/oms-window'
import omsSelect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
import omsFileTransferProgress from '@/components/trainer/oms/shared/dynamicComponents/oms-file-transfer-progress'
import omsFileTransferProgressConsumerMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-file-transfer-progress-consumer-mixin'
import omsProgressBar from '@/components/trainer/oms/shared/oms-progress-bar'
import { mapState } from 'vuex'
const loadingFilesDelay = 1250
export default {
  data () {
    return {
      confirmPanel: false,
      selectedOutput: 0,
      transferring: false,
      transferCompleted: true,
      completedRatio: 0,
      clearingNVMdata: false
    }
  },
  name: 'lrusysnvmpanel',
  mixins: [omsFileTransferProgressConsumerMixin],
  components: {
    omsWindow,
    omsSelect,
    omsFileTransferProgress,
    omsProgressBar
  },
  computed: {
    ...mapState({
      writeToComboLabel: state => state.appContext.omsViewPort.writeToComboLabel,
      writeToCombo: state => state.appContext.omsViewPort.writeToCombo
    })
  },
  methods: {
    prompt () {
      this.confirmPanel = true
    },
    clearNVM () {
      this.confirmPanel = false
      this.clearingNVMdata = true
      this.completedRatio = 0
      this.transferCompleted = false
      let loaderInterval = setInterval(() => {
        this.completedRatio = this.completedRatio + 20
        if (this.completedRatio > 100) {
          clearInterval(loaderInterval)
          this.transferCompleted = true
          this.clearingNVMdata = false
        }
      }, loadingFilesDelay)
    },
    cancelConfirm () {
      this.confirmPanel = false
    },
    select (id) {
      this.selectedOutput = id
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/vars';
  .clearNVMlabel {
    color: $wh
  }
  .complete {
    margin: 2vh 0
  }
  form.selectorForm .oms-select-label {
    margin-right: 1.5vh;
    display: inline-block;
    line-height: 3.5vh;
    margin-bottom: 2vh;
  }
  .download {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: $bl
  }

  .caution {
    position: absolute;
    bottom: 3vh;
    left: 2vh;
    right: 2vh;
    color: $yellow;
    border: $default-border;
    border-color: $yellow;
    height: 16vh;
    padding: 2vh;
    h1 {
      margin: 1vh 0 2vh 0
    }
  }
  h1 {
    margin: 5vh 0
  }
  .startBtn, .clearBtn {
    width: 12vh;
  }

  form.yes-no-form {
    left: 24vh;
  }
</style>

