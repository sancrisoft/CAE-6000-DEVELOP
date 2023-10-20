const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewUtilityDeleteMaintenanceFilesModel = ({

  payload: {
    title: 'Delete Maintenance Files',
    parentComponentName: 'utilityfunctions',
    componentName: 'deletemaintenancefiles',
    header: _nav.utilMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    fileTypeComboLabel: 'File Type',
    fileTypeCombo: [
      {label: 'Test & Riggin Files', id: 0, key: 'test/rigging', selected: 1},
      {label: 'User AMCS Table', id: 1, key: 'amcs', selected: 0}
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

module.exports = ViewUtilityDeleteMaintenanceFilesModel
