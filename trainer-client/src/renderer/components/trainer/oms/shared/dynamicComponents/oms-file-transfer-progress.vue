<template>
  <div class="row">
    <div v-show="complete" class="row flex-center complete">
      <span>Write Complete</span>
    </div>
    <div v-show="transferInProgress" class="progress-wrapper">
      <div class="flex-center progress">{{headerMessage}}</div>
      <div class="row"><span>{{upperComboMessage}}</span></div>
      <div class="row">
        <oms-progress-bar
          :size="30"
          v-bind:transferCompleted="transferCompleted"
          :completedRatio="transferCompletedRatio">
        </oms-progress-bar>
      </div>
      <div class="row"><span>{{lowerComboMessage}}</span></div>
      <div class="row">
        <oms-progress-bar
          :size="30"
          v-bind:transferCompleted="overAllTransferCompleted"
          :completedRatio="overAllTransferCompletedRatio">
        </oms-progress-bar>
        <div class="row button-container">
          <div class="btn large slim" @click.stop="cancel">Cancel</div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import omsProgressBar from '@/components/trainer/oms/shared/oms-progress-bar'
export default {
  props: {
    headerMessage: {
      type: String,
      default: 'Write in Progress'
    },
    upperComboMessage: {
      type: String,
      default: 'File name: XXXXXXX.XXX'
    },
    lowerComboMessage: {
      type: String,
      default: 'Overall Write Progress'
    },
    complete: {
      type: Boolean,
      default: false
    },
    transferInProgress: {
      type: Boolean,
      default: false
    },
    transferCompletedRatio: {
      type: Number,
      default: 0
    },
    transferCompleted: {
      type: Boolean,
      default: false
    },
    overAllTransferCompleted: {
      type: Boolean,
      default: false
    },
    overAllTransferCompletedRatio: {
      type: Number,
      default: 0
    },
    files: {
      type: Array,
      default: () => []
    }
  },
  components: {
    omsProgressBar
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
.progress {
  margin: 3vh 0
}

.complete {
  margin: 3vh 0;
}

.button-container {
  margin-top: 3vh
}

.progress-wrapper {
  width: 75%;
  margin: 0 auto;
  &.loadingProgress {
    width: 30vh !important
  }
}
</style>


