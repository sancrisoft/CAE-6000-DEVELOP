const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewAircraftLifeCycleModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Aircraft Life Cycle Data',
    componentName: 'aircraftlifecycle',
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    sortedData: [],
    parameterGroupComboLabel: 'Parameter Group',
    parameterGroupCombo: [
    ],
    data: {
      parameters: [
      ]
    }
  },

  returnPayload: function (p_options) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)

    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload(p_options).then(function (result) {
        self.payload.data.parameters = result
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function (p_options) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = "SELECT * , (select count(*) FROM scnLifeCycleDatas  WHERE scenarioID ='" + (p_options.id || self._config.defaultScenarioId) + "' ) as count FROM scnLifeCycleDatas WHERE scenarioID  = '" + (p_options.id || self._config.defaultScenarioId) + "' ;"

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  formatPayload: function (p_options) {
    let self = this
    return new Promise(function (resolve, reject) {
      self.getPayload(p_options).then(function (result) {
        let formatted = []
        for (let i in result) {
          formatted.push(
            {
              id: i,
              name: result[i]['name'],
              value: result[i]['value'],
              type: '0',
              uom: 'HRS'
            }
          )
        }
        resolve(formatted)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }

})

module.exports = ViewAircraftLifeCycleModel
