const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewMaintReportsModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Maintenance Reports',
    componentName: 'maintreports',
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    reportComboLabel: 'Report Type',
    reportCombo: [
      {label: 'Flight Deck Effects', id: '0', selected: 1},
      {label: 'Fault Messages', id: '1', selected: 0},
      {label: 'Service Messages', id: '2', selected: 0},
      {label: 'System Exceedances', id: '23', selected: 0},
      {label: 'System Trends', id: '4', selected: 0},
      {label: 'Life Cycle Data', id: '5', selected: 0},
      {label: 'System Parameters', id: '6', selected: 0},
      {label: 'System Configuration Data', id: '7', selected: 0},
      {label: 'LRU Diagnostic Data', id: '8', selected: 0},
      {label: 'User ACMS Data', id: '9', selected: 0},
      {label: 'All Reports', id: '10', selected: 0}
    ],
    flightLegComboLabel: 'Flight Leg Range',
    flightLegCombo: [
      {label: 'All Flight Legs', id: '1', selected: 1},
      {label: 'All Legs Since Last Written', id: '2', selected: 0},
      {label: 'Current Flight Leg', id: '3', selected: 0},
      {label: 'Custom Range', id: '4', selected: 0}
    ],
    lastFlightLeg: { value: '', date: 'Aug 10 2018 1:58 PM' },
    writeToComboLabel: 'Write To',
    writeToCombo: [
      {label: 'Cockpit Printer', id: '0', selected: 1},
      {label: 'Datalink', id: '1', selected: 0},
      {label: 'IMS USB', id: '2', selected: 0}
    ],
    fromComboLabel: 'From',
    fromCombo: [
      {label: '---', id: '99', selected: 1},
      {label: '0', id: '0', selected: 0},
      {label: '-1', id: '1', selected: 0},
      {label: '-2', id: '2', selected: 0},
      {label: '-3', id: '3', selected: 0},
      {label: '-4', id: '4', selected: 0},
      {label: '-5', id: '5', selected: 0},
      {label: '-6', id: '6', selected: 0},
      {label: '-7', id: '7', selected: 0},
      {label: '-8', id: '8', selected: 0},
      {label: '-9', id: '9', selected: 0},
      {label: '-10', id: '10', selected: 0},
      {label: '-11', id: '11', selected: 0},
      {label: '-12', id: '12', selected: 0},
      {label: '-13', id: '13', selected: 0}

    ],
    toComboLabel: 'To',
    toCombo: [
      {label: '---', id: '99', selected: 1},
      {label: '0', id: '0', selected: 0},
      {label: '-1', id: '1', selected: 0},
      {label: '-2', id: '2', selected: 0},
      {label: '-3', id: '3', selected: 0},
      {label: '-4', id: '4', selected: 0},
      {label: '-5', id: '5', selected: 0},
      {label: '-6', id: '6', selected: 0},
      {label: '-7', id: '7', selected: 0},
      {label: '-8', id: '8', selected: 0},
      {label: '-9', id: '9', selected: 0},
      {label: '-10', id: '10', selected: 0},
      {label: '-11', id: '11', selected: 0},
      {label: '-12', id: '12', selected: 0},
      {label: '-13', id: '13', selected: 0}
    ],
    data: {
      files: ['file1.map', 'file2.map', 'file3.map', 'file4.map', 'file5.map']
    }
  },

  returnPayload: function () {
    let self = this
    return Promise.resolve(self.payload)
  }

})

module.exports = ViewMaintReportsModel
