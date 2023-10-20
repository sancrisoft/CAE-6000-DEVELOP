
<template>
  <div class="inner-container-content">
    <h1 class="uppercase">Restore Media Sets</h1>
    <oms-no-data-display v-if="!hasData"></oms-no-data-display>
    <div v-else class="row">
      <h2 class="uppercase">restore installed Media Sets</h2>
      <div class="info-mgmt-file-transfer-selector-placeHolder"></div>
      </div>
      <div>
        <h2 class="uppercase">Restore from USB Directory</h2>
        <info-mgmt-usb-directory-panel></info-mgmt-usb-directory-panel>
      </div>
      <div>
        <h2 class="uppercase">Media Sets</h2>
        <info-mgmt-file-transfer-panel></info-mgmt-file-transfer-panel>
      </div>
      <info-mgmt-file-transfer></info-mgmt-file-transfer>
      <info-mgmt-file-transfer-button
        transfer="Restore">
      </info-mgmt-file-transfer-button>
  </div>
</template>

<script>
import infoMgmtBasePageMixin from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-base-page-mixin'

export default {
  data () {
    return {
      fileTransferSelectorValue: 1
    }
  },
  name: 'restoremediasets',
  mixins: [infoMgmtBasePageMixin],
  methods: {
    setFilesToBeTransferred: function (file) { // overrides default behaviour
      this.$store.dispatch('appContext/omsViewPort/setInfoMgmtViewFilesToTransfer', [file])
    }
  }
}
</script>

<style scoped>
.info-mgmt-file-transfer-selector-placeHolder {
  height: 10vh
}
</style>
