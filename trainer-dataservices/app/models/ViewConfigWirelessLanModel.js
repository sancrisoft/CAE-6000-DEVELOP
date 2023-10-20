const _eicas = require('../models/EicasModel.js')

function ViewConfigWirelessLanModel () {
  const payload = {
    componentName: 'configurewirelesslan',
    header: {
      viewBtnVisible: false,
      viewBackBtnLabel: 'Return to<br/>Info Management',
      viewBackBtnVisible: true
    },
    eicasMessages: _eicas.getEICAS(),
    data: {
      encryptionTypes: [{id: 0, label: 'Open None', selected: 1}],
      keyCodes: [{id: 0, label: 'ascii', selected: 1}],
      configurations: [
        {id: 0, priority: 1, desc: 'abcd'},
        {id: 1, priority: 2, desc: 'efgh'},
        {id: 2, priority: 3, desc: 'ijkl'}
      ]
    }
  }

  return payload
}

module.exports = ViewConfigWirelessLanModel
