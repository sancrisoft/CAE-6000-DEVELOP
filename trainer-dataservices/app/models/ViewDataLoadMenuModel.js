const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewDataLoadMenuModel () {
  const payload = {
    componentName: 'dataloadmenu',
    header: _nav.dataLoaderHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Maintenance Data Load Menu',
    data: {
      items:[
        { label: 'Load New Documents & Tables', target: 'loadNewDocumentsTables', enabled: 1, userType: 'user' },
      { label: 'Load New / Misconfigured LRU', target: 'loadNewMisconfiguredLRU', enabled: 1, userType: 'user' },
      { label: 'Load Aircraft Software Set', target: 'loadAircraftSoftwareSet', enabled: 1, userType: 'user' },
      { label: 'Reload Data & Software', target: 'reloadDataSoftware', enabled: 1, userType: 'user' },
      { label: 'Reload LRU', target: 'reloadLRU', enabled: 1, userType: 'user' },
      { label: 'Perform Field Service Data Load', target: 'performFieldServiceDataLoad', enabled: 1, userType: 'admin' }
      ]
    }
  }

  return payload
}

module.exports = ViewDataLoadMenuModel
