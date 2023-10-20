<template>
<div class="inner-viewport-content">
  <div v-if="intro" class="intro">
    <h1>{{label}}</h1>
    <div class="description" v-html="description"></div>
  </div>
  <div  v-if="progress" class="progress uppercase">
    <p>Duration: {{duration}} sec <span class="spacer"></span>Time Remaining: {{remaining}}</p>
    <p>Test Result: In progress</p>
  </div>
  <div v-if="result" class="result uppercase" :class="{success: isSuccess, failure: isFailure}">
    <p>Test result: {{resultMessage}}</p>
  </div>
  <div class="btn-wrapper flex-justified">
    <div class="btn slim" @click.stop="start">Continue</div>
    <lru-sys-maintenance-reports-btn></lru-sys-maintenance-reports-btn>
    <div class="btn slim" @click.stop="cancel">Cancel</div>
  </div>
</div>
</template>
<script>
import lruSysMaintenanceReportsBtn from '@/components/trainer/oms/maintMenuSections/components/lru-sys/components/lru-sys-maintenance-reports-btn'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      intro: 1,
      progress: 0,
      result: 0,
      remaining: ''
    }
  },
  name: 'lrusysgenerictest',
  computed: {
    ...mapState({
      test: state => state.appContext.omsViewPort.data,
      label: state => state.appContext.omsViewPort.data.label,
      description: state => state.appContext.omsViewPort.data.description,
      duration: state => state.appContext.omsViewPort.data.duration,
      isSuccess: state => state.appContext.omsViewPort.data.success.status,
      isFailure: state => state.appContext.omsViewPort.data.failure.status
    }),
    resultMessage () {
      if (this.isSuccess) {
        return this.test['success'].message
      } else if (this.isFailure) {
        return this.test['failure'].message
      }
    }
  },
  mounted () {
    this.remaining = this.duration
  },
  methods: {
    cancel () {
      if (this.intro) {
        this.$bus.$emit('switchView', { component: 'maintMenuSections', view: 'lrusysoperations' })
      } else {
        this.reset()
      }
    },
    reset () {
      this.remaining = this.duration
      this.intro = 1
      this.progress = 0
      this.result = 0
    },
    start () {
      this.intro = 0
      this.progress = 1
      this.result = 0

      let vm = this
      let countner = setInterval(() => {
        vm.remaining--
        if (vm.remaining === 0) {
          clearInterval(countner)
          vm.progress = 0
          vm.result = 1
        }
      }, 1000)
    }
  },
  components: {
    lruSysMaintenanceReportsBtn
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/vars';
  .spacer {
    display: inline-block;
    width: 1vh
  }
  .success {
    color: $lightGreen
  }
  .failure {
    color: $yellow
  }
  .intro, .progress, .result, .description {
    width: 100%
  }
  .progress, .result, .description {
    line-height: 2vh;
    margin-top: 5vh;
    margin-left: 1vh;
  }
  .description {
    line-height: 3vh;
    width: 95%;
    margin-top: 10vh;
    font-size: 2vh;
  }
  .btn-wrapper {
    position: absolute;
    display: flex;
    align-content: space-between;
    right: 0;
    left: 0;
    bottom: 0;
    height: 3vh;
    margin: 1vh;
    box-sizing: border-box;

    .slim {
      padding-left: 3vh;
      padding-right: 3vh
    }
  }
</style>

