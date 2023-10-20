const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewUtilityFunctionsModel = ({

  payload: {
    title: 'Utility Functions Menu',
    componentName: 'utilityfunctions',
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    data: {
      items: {
        maintenanceDataTargets: [
          { label: 'Change Aircraft Tail Number', target: 'changeacfttailnumber', enabled: 1, userType: 'user' },
          { label: 'Change Aircraft Life Cycle Data', target: 'changeacftlifecycledata', enabled: 1, userType: 'user' }
        ],
        maintenanceDataFiles: [
          { label: 'Delete Stored Maintenance Data', target: 'deletestoredmaintenancedata', enabled: 1, userType: 'user' },
          { label: 'Delete Maintenance Files', target: 'deletemaintenancefiles', enabled: 1, userType: 'user' },
          { label: 'View Loaded Maintenance Files', target: 'viewloadedmaintenancefiles', enabled: 1, userType: 'user' },
          { label: 'View IMA Part Number Crosscheck Details', target: 'imapartnumbercrosscheckdetails', enabled: 1, userType: 'admin' }
        ]
      }
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve) {
      resolve(self.payload)
    })
  }

})

module.exports = ViewUtilityFunctionsModel
