import maintMenu from '@/api/mocks/maintMenuSections/maint-menu'
import aircraftLifeCycle from '@/api/mocks/maintMenuSections/aircraft-life-cycle'
import faultMessages from '@/api/mocks/maintMenuSections/fault-messages'
import faultMessagesSummary from '@/api/mocks/maintMenuSections/fault-messages-summary'
import flightDeckEffects from '@/api/mocks/maintMenuSections/flight-deck-effects'
import flightDeckEffectsSummary from '@/api/mocks/maintMenuSections/flight-deck-effects-summary'
import lruSysOperations from '@/api/mocks/maintMenuSections/lru-sys-operations'
import lruSysDataReader from '@/api/mocks/maintMenuSections/lru-sys-data-reader'
import lruSysMaintReports from '@/api/mocks/maintMenuSections/lru-sys-maint-reports'
import lruSysGenericPagingStatus from '@/api/mocks/maintMenuSections/lru-sys-generic-paging-status'
import maintReports from '@/api/mocks/maintMenuSections/maint-reports'
import servicesMessages from '@/api/mocks/maintMenuSections/services-messages'
import servicesMessagesSummary from '@/api/mocks/maintMenuSections/services-messages-summary'
import systemConfig from '@/api/mocks/maintMenuSections/system-config'
import systemExceedances from '@/api/mocks/maintMenuSections/system-exceedances'
import systemExceedancesSummary from '@/api/mocks/maintMenuSections/system-exceedances-summary'
import systemParameters from '@/api/mocks/maintMenuSections/system-parameters'
import systemTrends from '@/api/mocks/maintMenuSections/system-trends'
import systemTrendsSummary from '@/api/mocks/maintMenuSections/system-trends-summary'
import utilityFunctions from '@/api/mocks/maintMenuSections/utility-functions'
import changeAcftTailNumber from '@/api/mocks/maintMenuSections/utilities/change-acft-tail-number'
import changeAcftLifeCycleData from '@/api/mocks/maintMenuSections/utilities/change-acft-life-cycle-data'
import deleteMaintenanceFiles from '@/api/mocks/maintMenuSections/utilities/delete-maintenance-files'
import deleteStoredMaintenanceData from '@/api/mocks/maintMenuSections/utilities/delete-stored-maintenance-data'
import viewLoadedMaintenanceFiles from '@/api/mocks/maintMenuSections/utilities/view-loaded-maintenance-files'
import changeAutomaticallyInitiatedReports from '@/api/mocks/maintMenuSections/utilities/change-automatically-initiated-reports'
import imaPartNumberCrosscheckDetails from '@/api/mocks/maintMenuSections/utilities/ima-part-number-crosscheck-details'

export default {
  maintmenu: maintMenu,
  aircraftlifecycle: aircraftLifeCycle,
  faultmessages: faultMessages,
  faultmessagessummary: faultMessagesSummary,
  flightdeckeffects: flightDeckEffects,
  flightdeckeffectssummary: flightDeckEffectsSummary,
  lrusysoperations: lruSysOperations,
  lrusysdatareader: lruSysDataReader,
  lrusysmaintreports: lruSysMaintReports,
  lrusysgenericpagingstatus: lruSysGenericPagingStatus,
  maintreports: maintReports,
  servicesmessages: servicesMessages,
  servicesmessagessummary: servicesMessagesSummary,
  systemconfig: systemConfig,
  systemexceedances: systemExceedances,
  systemexceedancessummary: systemExceedancesSummary,
  systemparameters: systemParameters,
  systemtrends: systemTrends,
  systemtrendssummary: systemTrendsSummary,
  utilityfunctions: utilityFunctions,
  changeacfttailnumber: changeAcftTailNumber,
  changeacftlifecycledata: changeAcftLifeCycleData,
  deletemaintenancefiles: deleteMaintenanceFiles,
  deletestoredmaintenancedata: deleteStoredMaintenanceData,
  viewloadedmaintenancefiles: viewLoadedMaintenanceFiles,
  changeautomaticallyinitiatedreports: changeAutomaticallyInitiatedReports,
  imapartnumbercrosscheckdetails: imaPartNumberCrosscheckDetails
}
