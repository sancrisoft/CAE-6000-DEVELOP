<template>
  <div class="inner-container-content">
    <h1 class="uppercase">Manage Files</h1>
    <oms-no-data-display v-if="!hasData"></oms-no-data-display>
    <div v-else class="row">
      <h2 class="uppercase">Transfer Direction</h2>
        <info-mgmt-file-transfer-selector
          inbound="to usb"
          :inboundValue="0"
          outbound="from usb"
          :outboundValue="1"
          name="fileTransferSelector"
          event="fileTransferSelectorChanged">
        </info-mgmt-file-transfer-selector>
      </div>
      <div>
        <h2 class="uppercase">USB Directory</h2>
        <info-mgmt-usb-directory-panel></info-mgmt-usb-directory-panel>
      </div>
      <div>
        <h2 class="uppercase">Files to be transferred</h2>
        <info-mgmt-file-transfer-panel></info-mgmt-file-transfer-panel>
      </div>
      <info-mgmt-file-transfer></info-mgmt-file-transfer>
      <info-mgmt-file-transfer-button>
      </info-mgmt-file-transfer-button>
    </div>
</template>

<script>
import infoMgmtBasePageMixin from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-base-page-mixin'
export default {
  name: 'managefiles',
  mixins: [infoMgmtBasePageMixin]
}
</script>
