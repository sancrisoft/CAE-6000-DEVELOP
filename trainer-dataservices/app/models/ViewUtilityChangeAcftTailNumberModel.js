const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewUtilityChangeAcftTailNumberModel = ({

  payload: {
    title: 'Change Aircraft Tail Number',
    parentComponentName: 'utilityfunctions',
    componentName: 'changeacfttailnumber',
    header: _nav.utilMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
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

module.exports = ViewUtilityChangeAcftTailNumberModel
