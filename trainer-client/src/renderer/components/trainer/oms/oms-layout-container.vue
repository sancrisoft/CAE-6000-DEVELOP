<template>
  <div class="oms"
  :class="{'custom-cursor': customCursor}">
    <div class="oms-viewport-header">
      <oms-view-switcher
        :fixedSize="1.5"
        :highlight="false"
        :dynamicLabel="false"
        :downArrow="false"
        componentListName="'manageMenu'"
        componentListLabel="m"
        :list="manageList"
        @setView="setView">
      </oms-view-switcher>
      <oms-view-switcher
        :fixedSize="14"
        :dynamicLabel="true"
        componentListName="maintMenu"
        :list="maintList"
        @setView="setView">
      </oms-view-switcher>
      <oms-view-switcher v-show="maintMenuSectionsVisibility"
        :fixedSize="10"
        :highlight="false"
        :dynamicLabel="false"
        componentListName="maintMenuSections"
        componentListLabel="Maint Menu"
        :list="maintMenuSectionsList"
        @setView="setView">
      </oms-view-switcher>
      <view-btns></view-btns>
      <div class="flex-right" v-if="pageCounter">
        <oms-paging-counter counterName="ViewportHeader" :digits="1"></oms-paging-counter>
      </div>
    </div>
    <component :is="currentView" class="oms-viewport" :editMode="editMode" :parentPage="parentPage"
      @switchView="setView">
    </component>
  </div>
</template>

<script>
import omsViewSwitcher from '@/components/trainer/oms/shared/dynamicComponents/oms-view-switcher'
import viewBtns from '@/components/trainer/oms/shared/dynamicComponents/view-btns'
import pagerCounterDisplay from '@/components/trainer/oms/shared/paging/oms-paging-counter'

import dataLoad from '@/components/trainer/oms/maintMenu/data-load'
import dataLoadMenu from '@/components/trainer/oms/maintMenu/dataLoad/data-load-menu'
import loadAircraftSoftwareSet from '@/components/trainer/oms/maintMenu/dataLoad/views/load-aircraft-software-set'
import loadNewDocumentsTables from '@/components/trainer/oms/maintMenu/dataLoad/views/load-new-documents-tables'
import loadNewMisconfiguredLRU from '@/components/trainer/oms/maintMenu/dataLoad/views/load-new-misconfigured-lru'
import reloadDataSoftware from '@/components/trainer/oms/maintMenu/dataLoad/views/reload-data-software'
import reloadLRU from '@/components/trainer/oms/maintMenu/dataLoad/views/reload-lru'
import performFieldServiceDataLoad from '@/components/trainer/oms/maintMenu/dataLoad/views/perform-field-service-data-load'
import dbStatus from '@/components/trainer/oms/maintMenu/db-status'

import infoMgmtMenu from '@/components/trainer/oms/maintMenu/info-mgmt-menu'
import configureWirelessLan from '@/components/trainer/oms/maintMenu/infoMgmt/configure-wireless-lan'
import manageWirelessLanConnection from '@/components/trainer/oms/maintMenu/infoMgmt/manage-wireless-lan-connection'
import manageFiles from '@/components/trainer/oms/maintMenu/infoMgmt/manage-files'
import backupMediaSets from '@/components/trainer/oms/maintMenu/infoMgmt/backup-media-sets'
import restoreMediaSets from '@/components/trainer/oms/maintMenu/infoMgmt/restore-media-sets'
import manageCellularDevice from '@/components/trainer/oms/maintMenu/infoMgmt/manage-cellular-device'
import licenceMgmt from '@/components/trainer/oms/maintMenu/licence-mgmt'

import maintMenu from '@/components/trainer/oms/maintMenu/maint-menu'
import flightDeckEffects from '@/components/trainer/oms/maintMenuSections/flight-deck-effects'
import flightDeckEffectsSummary from '@/components/trainer/oms/maintMenuSections/flight-deck-effects-summary'
import faultMessages from '@/components/trainer/oms/maintMenuSections/fault-messages'
import faultMessagesSummary from '@/components/trainer/oms/maintMenuSections/fault-messages-summary'
import servicesMessages from '@/components/trainer/oms/maintMenuSections/services-messages'
import servicesMessagesSummary from '@/components/trainer/oms/maintMenuSections/services-messages-summary'
import systemExceedances from '@/components/trainer/oms/maintMenuSections/system-exceedances'
import systemExceedancesSummary from '@/components/trainer/oms/maintMenuSections/system-exceedances-summary'
import systemTrends from '@/components/trainer/oms/maintMenuSections/system-trends'
import systemTrendsSummary from '@/components/trainer/oms/maintMenuSections/system-trends-summary'
import aircraftLifeCycle from '@/components/trainer/oms/maintMenuSections/aircraft-life-cycle'
import systemParameters from '@/components/trainer/oms/maintMenuSections/system-parameters'
import lruSysOperations from '@/components/trainer/oms/maintMenuSections/lru-sys-operations'
import lruSysDataReader from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-data-reader'
import lruSysMaintReports from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-maint-reports'
import lruSysGenericTest from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-generic-test'
import lruSysGenericPagingStatus from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-generic-paging-status'
import systemConfig from '@/components/trainer/oms/maintMenuSections/system-config'
import maintReports from '@/components/trainer/oms/maintMenuSections/maint-reports'

import utilityFunctions from '@/components/trainer/oms/maintMenuSections/utility-functions'
import changeAcftLifeCycleData from '@/components/trainer/oms/maintMenuSections/utilityFunctions/change-acft-life-cycle-data'
import changeAcftTailNumber from '@/components/trainer/oms/maintMenuSections/utilityFunctions/change-acft-tail-number'
import deleteMaintenanceFiles from '@/components/trainer/oms/maintMenuSections/utilityFunctions/delete-maintenance-files'
import deleteStoredMaintenanceData from '@/components/trainer/oms/maintMenuSections/utilityFunctions/delete-stored-maintenance-data'
import viewLoadedMaintenanceFiles from '@/components/trainer/oms/maintMenuSections/utilityFunctions/view-loaded-maintenance-files'
import changeAutomaticallyInitiatedReports from '@/components/trainer/oms/maintMenuSections/utilityFunctions/change-automatically-initiated-reports'
import changeReportConfiguration from '@/components/trainer/oms/maintMenuSections/utilityFunctions/change-report-configuration'
import imaPartNumberCrosscheckDetails from '@/components/trainer/oms/maintMenuSections/utilityFunctions/ima-part-number-crosscheck-details'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      currentComponent: '',
      currentView: '',
      parentPage: 0
    }
  },
  created () {
    // load default page
    this.loadView({component: 'maintMenu', view: 'maintmenu'})
  },
  mounted () {
    this.$bus.$on('switchView', (obj) => {
      this.setView(obj)
    })
  },
  beforeDestroy () {
    this.$bus.$off('switchView')
  },
  name: 'oms',
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'oms-view-switcher': omsViewSwitcher,
    'view-btns': viewBtns,
    'oms-paging-counter': pagerCounterDisplay,
    'dataload': dataLoad,
    'dataloadmenu': dataLoadMenu,
    'loadaircraftsoftwareset': loadAircraftSoftwareSet,
    'loadnewdocumentstables': loadNewDocumentsTables,
    'loadnewmisconfiguredlru': loadNewMisconfiguredLRU,
    'reloaddatasoftware': reloadDataSoftware,
    'reloadlru': reloadLRU,
    'performfieldservicedataload': performFieldServiceDataLoad,
    'dbstatus': dbStatus,
    'infomgmtmenu': infoMgmtMenu,
    'configurewirelesslan': configureWirelessLan,
    'managewirelesslanconnection': manageWirelessLanConnection,
    'managefiles': manageFiles,
    'backupmediasets': backupMediaSets,
    'restoremediasets': restoreMediaSets,
    'managecellulardevice': manageCellularDevice,
    'licencemgmt': licenceMgmt,
    'maintmenu': maintMenu,
    'flightdeckeffects': flightDeckEffects,
    'flightdeckeffectssummary': flightDeckEffectsSummary,
    'faultmessages': faultMessages,
    'faultmessagessummary': faultMessagesSummary,
    'servicesmessages': servicesMessages,
    'servicesmessagessummary': servicesMessagesSummary,
    'systemexceedances': systemExceedances,
    'systemexceedancessummary': systemExceedancesSummary,
    'systemtrends': systemTrends,
    'systemtrendssummary': systemTrendsSummary,
    'aircraftlifecycle': aircraftLifeCycle,
    'systemparameters': systemParameters,
    'lrusysoperations': lruSysOperations,
    'lrusysdatareader': lruSysDataReader,
    'lrusysgenerictest': lruSysGenericTest,
    'lrusysgenericpagingstatus': lruSysGenericPagingStatus,
    'lrusysmaintreports': lruSysMaintReports,
    'systemconfig': systemConfig,
    'maintreports': maintReports,
    'utilityfunctions': utilityFunctions,
    'imapartnumbercrosscheckdetails': imaPartNumberCrosscheckDetails,
    'changeacftlifecycledata': changeAcftLifeCycleData,
    'changeacfttailnumber': changeAcftTailNumber,
    'deletemaintenancefiles': deleteMaintenanceFiles,
    'deletestoredmaintenancedata': deleteStoredMaintenanceData,
    'viewloadedmaintenancefiles': viewLoadedMaintenanceFiles,
    'changeautomaticallyinitiatedreports': changeAutomaticallyInitiatedReports,
    'changereportconfiguration': changeReportConfiguration
  },
  computed: {
    ...mapState({
      maintList: state => state.appContext.contextMenusLists['maintMenu'],
      maintMenuSectionsList: state => state.appContext.contextMenusLists['maintMenuSections'],
      maintMenuSectionsVisibility: state => state.appContext.omsViewPort.header.maintMenuSectionsVisibility,
      manageList: state => state.appContext.contextMenusLists['manageMenu'],
      pageCounter: state => state.appContext.omsViewPort.pageCounter,
      customCursor: state => state.appContext.appConfig.customCursor
    })
  },
  methods: {
    setView (obj) {
      if (obj.component === 'maintMenu' && obj.view === 'maintmenu') {
        let maintMenuState = this.getContextMenuListSelectedState('maintMenuSections')
        if (maintMenuState.child && maintMenuState.child.selected) {
          obj.id = maintMenuState.id.toString()
          obj.view = maintMenuState.child.target
        } else {
          obj.view = maintMenuState.target
        }
      }
      this.loadView(obj)
    },
    loadView (obj) {
      if (obj.reloadView) {
        // Re-assign current component and view if reloading the view.
        Object.assign(obj, {
          component: this.currentComponent,
          view: this.currentView
        })
      }

      if (!obj.view) return

      if (obj.view.toLowerCase() !== this.currentView.toLowerCase() || obj.reloadView) {
        this.$store.dispatch('appContext/getContent', obj)
          .then((response) => {
            this.$store.dispatch('appContext/setContent', response.data)
          })
          .then(() => {
            this.setCurrentView(obj)

            if (obj.reloadView) {
              // Trigger reload of view since only the data has changed.
              this.$bus.$emit('maintMenuBaseViewLoad')
            }
          })
      }
    },
    setCurrentView (obj) {
      this.currentComponent = obj.component
      this.currentView = obj.view.toLowerCase()
      this.parentPage = obj.parentPage || 0
    },
    getContextMenuListSelectedState (menu) {
      return this.$store.getters['appContext/getContextMenuListSelectedState'](menu)
    }
  }
}
</script>
