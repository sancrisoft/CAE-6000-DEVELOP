const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewUtilityDeleteStoredMaintenanceFilesModel = ({

  payload: {
    title: 'Delete Stored Maintenance Data',
    parentComponentName: 'utilityfunctions',
    componentName: 'deletestoredmaintenancedata',
    header: _nav.utilMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    dataTypeComboLabel: 'Data Type',
    dataTypeCombo: [
      {label: 'Fault Messages & FDEs', id: 0, key: 'fault/fdes', selected: 1},
      {label: 'Service Messages', id: 1, key: 'messages', selected: 0},
      {label: 'System Exceedances', id: 2, key: 'exceedances', selected: 0},
      {label: 'System Trends', id: 3, key: 'trends', selected: 0},
      {label: 'User ACMS data', id: 2, key: 'acms', selected: 0}
    ],
    data: {
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve) {
      resolve(self.payload)
    })
  }

})

module.exports = ViewUtilityDeleteStoredMaintenanceFilesModel
