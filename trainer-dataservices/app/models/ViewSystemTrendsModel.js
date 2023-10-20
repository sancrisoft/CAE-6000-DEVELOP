const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const _editor = require('../models/EditorModel.js')
const config = require('../config/config.js')

const ViewSystemTrendsModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'System Trends',
    componentName: 'systemtrends',
    componentDetailsTarget: 'systemtrendssummary',
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    sortComboLabel: 'Sort by',
    sortCombo: [
      {label: 'Most-Recent To oldest', id: 0, key: 'dateDesc', selected: 1},
      {label: 'Oldest To Most-Recent', id: 1, key: 'dateAsc', selected: 0},
      {label: 'Flight Phase & Most-Recent To oldest', id: 3, key: 'flightPhase-dateDesc', selected: 0},
      {label: 'Flight Phase & Oldest To Most-Recent', id: 4, key: 'flightPhase-dateAsc', selected: 0}
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
      let sql = 'SELECT scnTrends.id as id, acm_trend.NAME as name , acm_trend.ID  as acm_trend_id , scnTrends.date_time as date_time, scnTrends.`flightPhase` as flightPhase , scnTrends.`flightLeg` as flightLeg, GROUP_ID as group_id ' +
        ' FROM acm_trend ' +
        ' INNER JOIN  scnTrends ON (scnTrends.acm_trend_id = acm_trend.ID )  ' +
        ' WHERE scenarioID  = ' + (p_options.id || self._config.defaultScenarioId) + ''

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getTrendsPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT  NAME as name , ID as id ' +
        ' FROM acm_trend '

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
          let formattedName = (result[i]['name'].length > 24)
            ? result[i]['name'].substr(0, 16)
            : result[i]['name']
          formatted.items.push(
            {
              id: result[i]['id'],
              acm_trend_id: result[i]['acm_trend_id'],
              name: formattedName,
              date: result[i]['date_time'],
              flightPhase: result[i]['flightPhase'],
              flightLeg: result[i]['flightLeg']
            }
          )
        }
        self.getTrendsPayload().then(function (result2) {
          formatted.edit = {}
          formatted.edit.trends = []
          for (let i in result2) {
            let formattedName2 = (result2[i]['name'].length > 24)
              ? result2[i]['name'].substr(0, 16)
              : result2[i]['name']
            formatted.edit.trends.push(
              {
                id: result2[i]['id'],
                label: formattedName2,
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

module.exports = ViewSystemTrendsModel
