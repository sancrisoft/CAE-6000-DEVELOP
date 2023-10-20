const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewUtilityChangeReportConfigurationModel = ({

  payload: {
    title: 'Change Report Configuration',
    parentComponentName: 'utilityfunctions',
    componentName: 'changereportconfiguration',
    header: _nav.utilMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    sortedData: [],
    parameterGroupComboLabel: 'Report Type',
    parameterGroupCombo: [
      {id: '1', label: 'Flight Deck Effects', selected: 1},
      {id: '2', label: 'Flight Deck Effects (XML)', selected: 0},
      {id: '3', label: 'Fault Messages', selected: 0},
      {id: '4', label: 'Fault Messages (XML)', selected: 0},
      {id: '5', label: 'Service Messages', selected: 0},
      {id: '6', label: 'Service Messages (XML)', selected: 0},
      {id: '7', label: 'Fault Messages (RealTime)', selected: 0},
      {id: '8', label: 'Service Messages (RealTime)', selected: 0},
    ],
    data: {
      items: [
        { label: 'Flight Deck Effects Active', id: '1', selected: false, type: '1'},
        { label: 'Flight Deck Effects Logged', id: '2', selected: true, type: '1'},
        { label: 'Flight Deck Effects (XML) Active', id: '3', selected: false, type: '2'},
        { label: 'Flight Deck Effects (XML) Logged', id: '4', selected: true, type: '2'},
        { label: 'Fault Messages Active', id: '5', selected: false, type: '3'},
        { label: 'Fault Messages Logged', id: '6', selected: true, type: '3'},
        { label: 'Fault Messages (XML) Active', id: '7', selected: false, type: '4'},
        { label: 'Fault Messages (XML) Logged', id: '8', selected: true, type: '4'},
        { label: 'Service Messages Active', id: '5', selected: false, type: '5'},
        { label: 'Service Messages Logged', id: '6', selected: true, type: '5'},
        { label: 'Service Messages (XML) Active', id: '7', selected: false, type: '6'},
        { label: 'Service Messages (XML) Logged', id: '8', selected: true, type: '6'},
        { label: 'Fault Messages (RealTime) Active', id: '9', selected: false, type: '7'},
        { label: 'Fault Messages (RealTime) Logged', id: '10', selected: true, type: '7'},
        { label: 'Service Messages (RealTime) Active', id: '11', selected: false, type: '8'},
        { label: 'Service Messages (RealTime) Logged', id: '12', selected: true, type: '8'}
      ]
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve) {
      resolve(self.payload)
    })
  }

})

module.exports = ViewUtilityChangeReportConfigurationModel
