const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const maintReports = require('../models/ViewMaintReportsModel.js')
const config = require('../config/config.js')

const ViewLruSysMaintenanaceReportsModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Maintenance Reports',
    componentName: 'lrusysmaintreports',
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICASLRU(),
    reportComboLabel: maintReports.payload.reportComboLabel,
    reportCombo: 'LRU/SYS Config Contents',
    flightLegComboLabel: maintReports.payload.flightLegComboLabel,
    flightLegCombo: 'Current Flight Leg',
    lastFlightLeg: maintReports.payload.lastFlightLeg,
    writeToComboLabel: maintReports.payload.writeToComboLabel,
    writeToCombo: maintReports.payload.writeToCombo,
    fromComboLabel: maintReports.payload.fromComboLabel,
    fromCombo: maintReports.payload.fromCombo,
    toComboLabel: maintReports.payload.toComboLabel,
    toCombo: maintReports.payload.toCombo,
    data: {
      files: ['file1.map', 'file2.map', 'file3.map', 'file4.map', 'file5.map']
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve) {
        resolve(self.payload)
    })
  }
})

module.exports = ViewLruSysMaintenanaceReportsModel
