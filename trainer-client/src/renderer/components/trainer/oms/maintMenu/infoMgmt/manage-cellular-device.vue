<template>
  <div class="inner-container-content">
    <h1 class="uppercase">Manage Cellular Device</h1>
     <div class="oms-checkbox-selector">
      <oms-checkbox-selector
        :selected="true">
        <div slot="oms-checkbox-item-name"
          class="oms-checkbox-item-name uppercase">Enable Wireless LAN / Cellular</div>
      </oms-checkbox-selector>
     </div>
     <div class="override">
        <h2 class="uppercase">Available Transfer Connections</h2>
        <info-mgmt-file-transfer-selector
          v-if="resetValue"
          inbound="disconnected"
          :inboundValue="0"
          outbound="Connect to GSM"
          :outboundValue="1"
          name="cellularConnection"
          event="cellularConnectionChanged">
        </info-mgmt-file-transfer-selector>
      </div>
    <div class="statusBox uppercase">{{status}}</div>
    <div id="connectingPanel" v-if="error">
      <oms-window size="half" class="floating-panel"
        header="Cellular Device Error">
        <div slot="windowContent">Could not connect to modem. If device was just inserted, wait 5 seconds and retry.</div>
      </oms-window>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import infoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import omscheckboxselector from '@/components/trainer/oms/shared/oms-checkbox-selector'
import omswindow from '@/components/trainer/oms/shared/oms-window'

let errorDelay = 5000
let statuses = ['unknown', 'connecting', 'error']

export default {
  data () {
    return {
      status: 'unknown',
      error: false,
      resetValue: 1
    }
  },
  mounted () {
    this.$bus.$on('cellularConnectionChanged', (selectedValue) => {
      this.transfer(selectedValue)
    })
  },
  beforeDestroy () {
    this.$bus.$off('cellularConnectionChanged')
  },
  name: 'managecellulardevice',
  mixins: [infoMgmtBaseViewMixin],
  components: {
    'oms-checkbox-selector': omscheckboxselector,
    'oms-window': omswindow
  },
  methods: {
    transfer: function (selectedValue) {
      this.status = statuses[1]
      setTimeout(() => {
        this.toggleError()
        this.displayErrorStatus()

        setTimeout(() => {
          this.toggleError()
          this.resetSelector()
        }, errorDelay)
      }, errorDelay)
    },
    displayErrorStatus: function () {
      this.status = statuses[2]
    },
    resetSelector: function () {
      // hard reset
      let vm = this
      vm.resetValue = 0
      Vue.nextTick(function () {
        vm.resetValue = 1
      })
    },
    toggleError: function () {
      this.error = !this.error
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/vars';

div.override div.flex-center div.selector {
  width: 100% !important
}

.oms-checkbox-selector {
  margin: 4vh 0
}

.selector td {
  min-width: 50%
}

.statusBox {
  width: 100%;
  height: auto;
  line-height: 2vh;
  font-size: $default-text-size;
  margin: 2vh 0.1vh 0 0;
  padding: 1vh;
  box-sizing: border-box;
  border: $default-border
}
</style>
