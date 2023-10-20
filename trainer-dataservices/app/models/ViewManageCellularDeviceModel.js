const _eicas = require('../models/EicasModel.js')

function ViewManageCellularDeviceModel () {
  const payload = {
    componentName: 'managecellulardevice',
    header: {
      viewBtnVisible: false,
      viewBackBtnLabel: 'Return to<br/>Info Management',
      viewBackBtnVisible: true
    },
    eicasMessages: _eicas.getEICAS(),
    data: {}
  }

  return payload
}

module.exports = ViewManageCellularDeviceModel
