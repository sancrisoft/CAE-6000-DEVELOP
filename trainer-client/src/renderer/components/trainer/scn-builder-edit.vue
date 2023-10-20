<template>
  <transition name="bounce">
    <div class="modal-wrapper flex-center">
      <div class="scnBuilderModal editModal">
        <h1>{{ editData.action.toUpperCase() }} {{ editData.title }}</h1>

        <div class="flex-center sb-content">
          <scnFde v-if="scnFdeShown" :editData="editData"></scnFde>
          <scnFaultMessages v-if="scnFaultMessagesShown" :editData="editData"></scnFaultMessages>
          <scnServiceMessages v-if="scnServiceMessagesShown" :editData="editData"></scnServiceMessages>
          <scnSystemExceedances v-if="scnSystemExceedancesShown" :editData="editData"></scnSystemExceedances>
          <scnSystemTrends v-if="scnSystemTrendsShown" :editData="editData"></scnSystemTrends>
          <scnAcftLifecycle v-if="scnAcftLifecycleShown" :editData="editData"></scnAcftLifecycle>
          <scnSystemParameters v-if="scnSystemParametersShown" :editData="editData"></scnSystemParameters>
          <scnLruSys v-if="scnLruSysShown" :editData="editData"></scnLruSys>
          <scnImsSetup v-if="scnImsSetupShown" :editData="editData"></scnImsSetup>

          <scnEditScn v-if="scnEditScnShown" :editData="editData"></scnEditScn>
          <scnCopyScn v-if="scnCopyScnShown" :editData="editData"></scnCopyScn>
          <scnImportScn v-if="scnImportScnShown" :editData="editData"></scnImportScn>
          <scnExportScn v-if="scnExportScnShown" :editData="editData"></scnExportScn>
          <scnLoadReport v-if="scnLoadReportShown" :editData="editData"></scnLoadReport>

        </div>

        <div class="flex-center sb-menu">
          <div class="flex-center">
            <div id="save" class="btn" :class="{ disabled: attributes.noSave }" @click.stop="saveEditor()">SAVE</div>
          </div>
          <div class="flex-center">
            <div id="close" class="btn" @click.stop="closeEditor()">CLOSE</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import scnFde from '@/components/trainer/scn-builder/scn-fde'
  import scnFaultMessages from '@/components/trainer/scn-builder/scn-fault-messages'
  import scnServiceMessages from '@/components/trainer/scn-builder/scn-service-messages'
  import scnSystemExceedances from '@/components/trainer/scn-builder/scn-system-exceedances'
  import scnSystemTrends from '@/components/trainer/scn-builder/scn-system-trends'
  import scnAcftLifecycle from '@/components/trainer/scn-builder/scn-acft-lifecycle'
  import scnSystemParameters from '@/components/trainer/scn-builder/scn-system-parameters'
  import scnLruSys from '@/components/trainer/scn-builder/scn-lru-sys'
  import scnImsSetup from '@/components/trainer/scn-builder/scn-ims-setup'
  import scnEditScn from '@/components/trainer/scn-builder/scn-edit-scn'
  import scnCopyScn from '@/components/trainer/scn-builder/scn-copy-scn'
  import scnImportScn from '@/components/trainer/scn-builder/scn-import-scn'
  import scnExportScn from '@/components/trainer/scn-builder/scn-export-scn'
  import scnLoadReport from '@/components/trainer/scn-builder/scn-load-report'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        item: this.editData.data,
        title: this.editData.title,
        action: this.editData.action,
        attributes: this.editData.attributes,
        scnFdeShown: false,
        scnFaultMessagesShown: false,
        scnServiceMessagesShown: false,
        scnSystemExceedancesShown: false,
        scnSystemTrendsShown: false,
        scnAcftLifecycleShown: false,
        scnSystemParametersShown: false,
        scnLruSysShown: false,
        scnImsSetupShown: false,
        scnEditScnShown: false,
        scnCopyScnShown: false,
        scnImportScnShown: false,
        scnExportScnShown: false,
        scnLoadReportShown: false
      }
    },
    name: 'scnBuilderEdit',
    components: {
      scnFde,
      scnFaultMessages,
      scnServiceMessages,
      scnSystemExceedances,
      scnSystemTrends,
      scnAcftLifecycle,
      scnSystemParameters,
      scnLruSys,
      scnImsSetup,
      scnEditScn,
      scnCopyScn,
      scnImportScn,
      scnExportScn,
      scnLoadReport
    },
    computed: {
      ...mapState({
        editStore: state => state.appContext.omsViewPort.data.edit
      })

    },
    mounted () {
      this.$bus.$on('editScn', () => {
        this.editScn()
      })
      this.$bus.$on('copyScn', () => {
        this.copyScn()
      })
      this.$bus.$on('importScn', () => {
        this.importScn()
      })
      this.$bus.$on('exportScn', () => {
        this.exportScn()
      })
      this.$bus.$on('loadReport', () => {
        this.loadReport()
      })

      let targetName = this.editData.type || ''
      switch (targetName) {
        case 'editScn' : this.editScn()
          break
        case 'copyScn' : this.copyScn()
          break
        case 'importScn' : this.importScn()
          break
        case 'exportScn' : this.exportScn()
          break
        case 'loadReport' : this.loadReport()
          break
        case 'fde' : this.fdeShow()
          break
        case 'faultmessages' : this.faultMessagesShow()
          break
        case 'servicemessages' : this.serviceMessagesShow()
          break
        case 'systemexceedances' : this.systemExceedancesShow()
          break
        case 'systemtrends' : this.systemTrendsShow()
          break
        case 'acftlifecycle' : this.acftLifecycleShow()
          break
        case 'systemparameters' : this.systemParametersShow()
          break
        case 'lrusys' : this.lruSysShow()
          break
        case 'imssetup' : this.imsSetupShow()
          break
      }
    },
    beforeDestroy () {
      this.$bus.$off('editScn')
      this.$bus.$off('copyScn')
      this.$bus.$off('importScn')
      this.$bus.$off('exportScn')
      this.$bus.$off('loadReport')
    },
    methods: {
      saveEditor () {
        if (this.editData.callback) {
          this.editData.callback(this.editData.data)
        } else {
          var obj = { name: 'scn' + this.editData.type, data: this.editData.data, action: this.editData.action }
          this.$store.dispatch('appContext/postSBContent', obj)
            .then((response) => {
              if (response.data.data.status !== 'OK') {
                this.$bus.$emit('openScnBuilderConfirm', { 'type': 'confirmNotice', 'title': 'Error', 'message': response.data.data.status, 'action': '' })
              } else {
                // Call switchView() to reload view after the data has changed. (REF fe7242fd-7dc0-4d52-970e-6a55954fa351)
                this.$bus.$emit('switchView', { reloadView: true })
              }
            })
        }

        this.$bus.$emit('closeScnBuilderEdit')
      },
      closeEditor () {
        this.$bus.$emit('closeScnBuilderEdit')
      },
      closeAll () {
        this.$bus.$emit('closeScnBuilderConfirm')

        this.scnFdeShown = false
        this.scnFaultMessagesShown = false
        this.scnServiceMessagesShown = false
        this.scnSystemExceedancesShown = false
        this.scnSystemTrendsShown = false
        this.scnAcftLifecycleShown = false
        this.scnSystemParametersShown = false
        this.scnLruSysShown = false
        this.scnImsSetupShown = false
        this.scnEditScnShown = false
        this.scnCopyScnShown = false
        this.scnImportScnShown = false
        this.scnExportScnShown = false
        this.scnLoadReportShown = false
      },
      editScn () {
        this.closeAll()
        this.scnEditScnShown = true
      },
      copyScn () {
        this.closeAll()
        this.scnCopyScnShown = true
      },
      importScn () {
        this.closeAll()
        this.scnImportScnShown = true
      },
      exportScn () {
        this.closeAll()
        this.scnExportScnShown = true
      },
      loadReport () {
        this.closeAll()
        this.scnLoadReportShown = true
      },
      fdeShow () {
        this.closeAll()
        this.scnFdeShown = true
      },
      faultMessagesShow () {
        this.closeAll()
        this.scnFaultMessagesShown = true
      },
      serviceMessagesShow () {
        this.closeAll()
        this.scnServiceMessagesShown = true
      },
      systemExceedancesShow () {
        this.closeAll()
        this.scnSystemExceedancesShown = true
      },
      systemTrendsShow () {
        this.closeAll()
        this.scnSystemTrendsShown = true
      },
      acftLifecycleShow () {
        this.closeAll()
        this.scnAcftLifecycleShown = true
      },
      systemParametersShow () {
        this.closeAll()
        this.scnSystemParametersShown = true
      },
      lruSysShow () {
        this.closeAll()
        this.scnLruSysShown = true
      },
      imsSetupShow () {
        this.closeAll()
        this.scnImsSetupShown = true
      }

    },
    props: {
      editData: {
        type: Object
      }
    }
  }
</script>
