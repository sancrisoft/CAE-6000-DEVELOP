<template>
  <div class="wrapper">
    <div v-if="viewBtnVisible"
      @click="viewBtnClick"
      class="oms-viewport-header btn uppercase"
      v-html="viewBtnLabel"
      :class="{disabled:btnDisabled}">
    </div>
    <div v-if="viewBackBtnVisible || viewBackBtnOverride"
      @click="viewBackBtnClick"
      class="oms-viewport-header btn uppercase"
      v-html="viewBackBtnLabel || viewBackBtnOverride.label"
      :class="{disabled:btnDisabled}">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      btnDisabled: false
    }
  },
  name: 'viewbtns',
  computed: {
    ...mapState({
      viewBtnLabel: state => state.appContext.omsViewPort.header.viewBtnLabel,
      viewBackBtnLabel: state => state.appContext.omsViewPort.header.viewBackBtnLabel,
      viewBtnVisible: state => state.appContext.omsViewPort.header.viewBtnVisible,
      viewBackBtnVisible: state => state.appContext.omsViewPort.header.viewBackBtnVisible,
      viewBackBtnOverride: state => state.appContext.viewBackBtnOverride
    })
  },
  mounted () {
    this.$bus.$on('omsBtnsAvailabilityState', (state) => {
      this.btnDisabled = state
    })
  },
  beforeDestroy () {
    this.$bus.$off('omsBtnsAvailabilityState')
  },
  methods: {
    viewBtnClick () {
      this.$bus.$emit('viewBtnEvent')
    },
    viewBackBtnClick () {
      this.$bus.$emit('viewBackBtnEvent')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
.wrapper {
  float: left;
}
.oms-viewport-header {
  &.btn {
    position: relative;
    height: 5vh;
    text-align: left;
    white-space: nowrap;
    box-sizing: border-box;
    margin-right: 0.5vh;
    @include oms-combo-border;

    &.disabled {
      @include oms-btn-disabled()
    }
  }
}

</style>
