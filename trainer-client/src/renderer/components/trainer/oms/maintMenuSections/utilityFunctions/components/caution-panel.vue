<template>
   <div class="container caution">
        <div class="">
          <p class="flex-center">Caution</p>
          <p class="flex-center caution-text">
           {{bodyTxt}}
          </p>
          <div class="row button-container">
            <div class="table-text-shaded">Save Data</div>
            <div class="btn slim"
              :class="{disabled:disabled}"
              @click.stop="gotoMaintenanceReports">Write Maintenance Reports</div>
          </div>
        </div>
      </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      disabled: false
    }
  },
  computed: {
    ...mapState({
      viewBackBtnLabel: state => state.appContext.omsViewPort.header.viewBackBtnLabel,
      componentName: state => state.appContext.omsViewPort.componentName
    })
  },
  props: {
    bodyTxt: {
      type: String
    },
    target: {
      type: String
    }
  },
  mounted () {
    this.$bus.$on('cautionPanelAvailabilityState', (state) => {
      this.disabled = state
    })
  },
  beforeDestroy () {
    this.$bus.$off('cautionPanelAvailabilityState')
  },
  methods: {
    gotoMaintenanceReports () {
      this.$store.dispatch('appContext/setViewBackBtnOverride', { label: this.viewBackBtnLabel, target: this.componentName })
      this.$bus.$emit('switchView', { component: 'maintMenu', view: 'lrusysmaintreports' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/vars';
  .caution {
    border: $default-border;
    border-color: $yellow;
    color: $yellow;
    display: flex;
    justify-content: center;
    margin: 3vh;
    padding: 3vh 8vh;
  }
  .caution-text {
    text-align: center;
    margin: 3vh 0;
  }
  .table-text-shaded {
    margin-right: 2vh
  }
</style>


