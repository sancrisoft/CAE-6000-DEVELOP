<template>
  <div class="loaderContainer">
    <div>
      <p class="flex-center">Overall Load Progress:</p>
      <oms-progress-bar class="flex-center"
        :size="30"
        :transferCompleted="transferCompleted"
        :completedRatio="completedRatio">
      </oms-progress-bar>
      <table class="errorsList" v-show="loadedData">
        <tr v-for="(item, index) in errors" :key="index">
          <td class="error">
            <p>{{item.itemName}}</p>
            <p>{{item.type}}</p>
            <p v-if="errorIndicator" class="loadingProgress">{{errorIndicatorText}}</p>
            <p v-if="error" class="itemError">{{item.error}}</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import dataLoadErrorsPanel from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-errors-panel'
import omsProgressBar from '@/components/trainer/oms/shared/oms-progress-bar'
import { mapState } from 'vuex'
const loaderDelay = 5000
const errorDelay = 5000
const loadedDataDelay = 1500
const lruDelay = 2500
const errorIndicatorText = ['Checking Files', 'Waiting for LRU']
export default {
  data () {
    return {
      error: false,
      errorIndicator: true,
      loadedData: false
    }
  },
  props: {
    transferCompleted: {
      type: Boolean,
      default: false
    },
    completedRatio: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      errors: state => state.appContext.omsViewPort.data.errors
    })
  },
  components: {
    dataLoadErrorsPanel,
    omsProgressBar
  },
  created () {
    this.initLoader()
    this.errorIndicatorText = errorIndicatorText[0]
    setTimeout(() => {
      this.errorIndicatorText = errorIndicatorText[1]
    }, lruDelay)
  },
  methods: {
    showErrors () {
      this.errorIndicator = false
      this.error = true
    },
    initLoader () {
      setTimeout(() => {
        this.$bus.$emit('loaderDone')
      }, loaderDelay)

      setTimeout(() => {
        this.showErrors()
      }, errorDelay)

      setTimeout(() => {
        this.loadedData = true
      }, loadedDataDelay)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
@import '~@/assets/oms-loading-progress';

  @include loadingProgress;

  .loadingProgress {
    border: none
  }

  table {
    width: 100%;
    border-collapse: collapse
  }
  .loaderContainer {
    align-self: flex-start;
    width: 100%;
    padding: 1vh;
    margin-top: 6vh;
  }
  .loader {
    margin-bottom: 2vh;
  }
  .flex-center {
    margin: 1vh auto;
  }
  .errorsList {
    .indicator {
      margin-left: 4vh;
      &:before {
        top: -0.1vh
      }
    }
  }
  .error {
    border: $default-border;
    margin: 1vh;
    padding: 0 1vh;
    &.indicator {
        margin-left: 2vh;
    }
  }

  .itemError {
    color: $yellow;
  }
</style>

