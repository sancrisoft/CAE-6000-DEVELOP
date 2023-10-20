<template>
  <div class="inner-viewport-content">
    <h1>{{title}}</h1>
    <maint-reports-form @startTransferProgress="start"
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
import { mapState } from 'vuex'
export default {
  name: 'maintreports',
  computed: {
    ...mapState({
      title: state => state.appContext.omsViewPort.title
    })
  },
  mixins: [omsFileTransferProgressConsumerMixin],
  components: {
    maintReportsForm,
    omsFileTransferProgress
  }
}
</script>
