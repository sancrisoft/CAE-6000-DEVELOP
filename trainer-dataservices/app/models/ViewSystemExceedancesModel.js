const _ = require('lodash')
const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const _editor = require('../models/EditorModel.js')
const config = require('../config/config.js')

const ViewSystemExceedancesModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'System Exceedances',
    componentName: 'systemexceedances',
    componentDetailsTarget: 'systemexceedancessummary',
    sortedData: [],
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    sortComboLabel: 'Sort by',
    sortCombo: [
      {label: 'Most-Recent To oldest', id: 0, key: 'dateDesc', selected: 1},
      {label: 'Oldest To Most-Recent', id: 1, key: 'dateAsc', selected: 0},
      {label: 'Flight Phase', id: 3, key: 'flightPhase', selected: 0},
      {label: 'Alphabetically', id: 4, key: 'cas', selected: 0}
    ],
    data: {
      items: [
      ]
    }
  },

  returnPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)

    let self = this
    // if (req.query.editor) {
    this._config.editMode = true
    // }

    return new Promise(function (resolve, reject) {
      self.formatPayload(p_options).then(function (result) {
        if (_.isFunction(p_options.reduceCallback)) {
          result = p_options.reduceCallback(result)
        }

        self.payload.data = result
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
      let sql = 'SELECT scnSystemExceedances.id as id, date_time , peak ,scnSystemExceedances.duration , flightPhase , flightLeg , flightLegCounter , acm_exceedance.NAME as name , acm_exceedance.THRESHOLD as threshold , scenarioID , GROUP_ID as group_id ' +
        ' FROM acm_exceedance ' +
        "INNER  JOIN scnSystemExceedances ON (scnSystemExceedances.acm_exceedance_ID = acm_exceedance.ID and  scenarioID  = '" + (p_options.id || self._config.defaultScenarioId) + "' ) "

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getExceedancesPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT NAME as name , ID as id ' +
        ' FROM acm_exceedance '

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
        let formatted = {}
        formatted.items = []
        for (let i in result) {
          formatted.items.push(
            {
              id: result[i]['id'],
              cas: result[i]['name'],
              date: result[i]['date_time'],
              threshold: result[i]['threshold'],
              flightPhase: result[i]['flightPhase'],
              flightLeg: result[i]['flightLeg'],
              peak: result[i]['peak'],
              duration: result[i]['duration'],
              uom: 'SEC'
            }
          )
        }
        self.getExceedancesPayload().then(function (result2) {
          formatted.edit = {}
          formatted.edit.exceedances = []
          for (let i in result2) {
            formatted.edit.exceedances.push(
              {
                id: result2[i]['id'],
                label: result2[i]['name']
              }
            )
          }

          formatted.edit.phases = _editor.defaults.phases
          formatted.edit.occurences = _editor.defaults.occurences
          formatted.edit.fls = _editor.defaults.fls

          resolve(formatted)

        }, function (err) {
          console.log(err)
          reject(err)
        })
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }

})

module.exports = ViewSystemExceedancesModel
