/**
 * Mocking client-server messages
 */

import nav from '@/api/mocks/navigation'
import dataLoadContent from '@/api/mocks/data-load'
import dbStatusContent from '@/api/mocks/db-status'
import infoMgmtContent from '@/api/mocks/info-mgmt'
import licenceMgmtContent from '@/api/mocks/licence-mgmt'
import maintContent from '@/api/mocks/maintMenuSections/maint'
import env from '../config/env'

const _appConfig = {
  projectName: 'Global 6000 OMS/IMS Trainer',
  projectDescription: `The OMS/IMS Trainer emulates the OMS implemented in the Global 6000 featuring the Global Vision Flight Deck and Global 6000 aircraft.
    It represents a static state of the aircraft's faults based on scenarios built by Bombardier Aircraft Training instructors.`,
  omsSoftwareversion: '2.2.10',
  omstVersion: '810-0099-1B0002-0201',
  omstarVersion: 'OMSTAR_V40101',
  omsEQVersion: 's',
  disclaimerFormatedText: `<p>The Global OMS/IMS Trainer is for training purposes only and does not reflect all possible aircraft configurations. Specific system details and/or operating procedures can be found in the Aircraft Maintenance Publications.</p>` +
  `<p>All rights reserved. The recipient of this software, by its retention and use, agrees to hold in confidence the data and information that form part of such software contained herein.</p>`,
  demoFormatedText: `<b>Note:</b> This is a trainer. Although the labels and the layout of the pages are as similar as possible to the real OMS, the display values might be different from the real airplane OMS`,
  role: 'admin', // student, admin
  editMode: false,
  showPagerDisplayArrows: true,
  omsPasswordInputPassword: 'MAINT',
  adminInputPassword: 'COLLINS',
  customCursor: true,
  mocked: false,
  apiURL: env.apiUrl,
  jwt: env.jwt,
  defaultScenarioId: 157,
  acftType: 'global6000' // global7500, cSeries
}

// TODO: remove from build prod
const content = {
  default: {
    header: nav.defaultHeader,
    data: {}
  },

  // docs/maint data-load bindings
  dataloadmenu: dataLoadContent.dataloadmenu,
  loadnewdocumentstables: dataLoadContent.loadnewdocumentstables,
  loadnewmisconfiguredlru: dataLoadContent.loadnewmisconfiguredlru,
  loadaircraftsoftwareset: dataLoadContent.loadaircraftsoftwareset,
  reloaddatasoftware: dataLoadContent.reloaddatasoftware,
  performfieldservicedataload: dataLoadContent.performfieldservicedataload,
  reloadlru: dataLoadContent.reloadlru,
  dataload: dataLoadContent.dataload,

  // docs/maint db-status bindings
  dbstatus: dbStatusContent.dbstatus,

  // docs/maint info-mgmt
  infomgmtmenu: infoMgmtContent.infomgmtmenu,
  configurewirelesslan: infoMgmtContent.configurewirelesslan,
  managewirelesslanconnection: infoMgmtContent.managewirelesslanconnection,
  managefiles: infoMgmtContent.managefiles,
  backupmediasets: infoMgmtContent.backupmediasets,
  restoremediasets: infoMgmtContent.restoremediasets,
  managecellulardevice: infoMgmtContent.managecellulardevice,

  //  docs/maint  licenceMgmt
  licencemgmt: licenceMgmtContent.licencemgmt,

  // maint section
  maintmenu: maintContent.maintmenu,
  aircraftlifecycle: maintContent.aircraftlifecycle,
  faultmessages: maintContent.faultmessages,
  faultmessagessummary: maintContent.faultmessagessummary,
  flightdeckeffects: maintContent.flightdeckeffects,
  flightdeckeffectssummary: maintContent.flightdeckeffectssummary,
  lrusysoperations: maintContent.lrusysoperations,
  lrusysdatareader: maintContent.lrusysdatareader,
  lrusysmaintreports: maintContent.lrusysmaintreports,
  lrusysgenericpagingstatus: maintContent.lrusysgenericpagingstatus,
  maintreports: maintContent.maintreports,
  servicesmessages: maintContent.servicesmessages,
  servicesmessagessummary: maintContent.servicesmessagessummary,
  systemconfig: maintContent.systemconfig,
  systemexceedances: maintContent.systemexceedances,
  systemexceedancessummary: maintContent.systemexceedancessummary,
  systemparameters: maintContent.systemparameters,
  systemtrends: maintContent.systemtrends,
  systemtrendssummary: maintContent.systemtrendssummary,
  utilityfunctions: maintContent.utilityfunctions,
  imapartnumbercrosscheckdetails: maintContent.imapartnumbercrosscheckdetails,
  changeacftlifecycledata: maintContent.changeacftlifecycledata,
  changeacfttailnumber: maintContent.changeacfttailnumber,
  deletemaintenancefiles: maintContent.deletemaintenancefiles,
  deletestoredmaintenancedata: maintContent.deletestoredmaintenancedata,
  viewloadedmaintenancefiles: maintContent.viewloadedmaintenancefiles,
  changeautomaticallyinitiatedreports: maintContent.changeautomaticallyinitiatedreports
}
// end

const get = function () {
  return {
    viewSwitchers: nav.viewSwitchers,
    appConfig: _appConfig
  }
}

// TODO: remove from build prod
const getMockContent = function (view, userType) {
  return Promise.resolve().then(function () {
    if (content[view]) {
      // eliminate references - remove Observable with  JSON.parse(JSON.stringify() Object.assign does not work
      let payload = JSON.parse(JSON.stringify(content[view]))

      if (payload.data.items && view === 'dataloadmenu' && userType === 'user') {
        payload.data.items = payload.data.items.filter(item => item.userType === 'user')
      }

      return payload
    } else {
      return content.default
    }
  })
}
// end todo

export default {
  getMockContent: getMockContent, // TODO: remove from build prod
  get: get
}
