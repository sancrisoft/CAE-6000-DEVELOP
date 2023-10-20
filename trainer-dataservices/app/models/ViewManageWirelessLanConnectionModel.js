const _eicas = require('../models/EicasModel.js')

function viewManageWirelessLanConnectionModel () {
  const payload = {
    componentName: 'managewirelesslanconnection',
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

module.exports = viewManageWirelessLanConnectionModel
