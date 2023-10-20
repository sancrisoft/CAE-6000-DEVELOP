<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <maint-reports-form
      @startTransferProgress="start"
      :reportComboOverride="true"
      :flightLegComboOverride="true"
      :transferInProgress="transferInProgress">
    </maint-reports-form>
    <hr>
    <oms-file-transfer-progress
      :complete="complete"
      :transferInProgress="transferInProgress"
      :transferCompletedRatio="transferCompletedRatio"
      :transferCompleted="transferCompleted"
      :overAllTransferCompleted="overAllTransferCompleted"
      :overAllTransferCompletedRatio="overAllTransferCompletedRatio"
      :inProgressFile="inProgressFile"
      :upperComboMessage="writingToFile"
      :files="files"
      @cancel="cancel">
    </oms-file-transfer-progress>
  </div>
</template>

<script>
import maintReportsForm from '@/components/trainer/oms/maintMenuSections/maint-reports-form'
import omsFileTransferProgress from '@/components/trainer/oms/shared/dynamicComponents/oms-file-transfer-progress'
import omsFileTransferProgressConsumerMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-file-transfer-progress-consumer-mixin'
import viewBtnsConsumerMixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
import { mapState } from 'vuex'
export default {
  name: 'lrusysmaintreports',
  mixins: [omsFileTransferProgressConsumerMixin, viewBtnsConsumerMixin],
  components: {
    maintReportsForm,
    omsFileTransferProgress
  },
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title,
      viewBackBtnOverride: state => state.appContext.viewBackBtnOverride
    })
  },
  beforeDestroy () {
    this.$store.dispatch('appContext/resetViewBackBtnOverride')
  },
  methods: {
    viewBackBtnClicked () {
      if (this.viewBackBtnOverride) {
        this.$bus.$emit('switchView', { component: 'maintMenuSections', view: this.viewBackBtnOverride.target })
      }
    }
  }
}
</script>

