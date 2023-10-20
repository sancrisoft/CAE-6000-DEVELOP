const db = require('../services/dbManager');
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')
const mocks = require('../mocks/SystemParametersMocks')
const CoreUtil = require('../utils/CoreUtil.js')

const ViewSystemTrendsSummaryModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'System Trends Summary',
    parentComponentName: 'systemTrends',
    componentName: 'systemTrendsSummary',
    header: {
      maintMenuSectionsVisibility: true,
      viewBackBtnLabel: 'Return To<br> Sys Trends',
      viewBtnVisible: false,
      viewBackBtnVisible: true
    },
    eicasMessages: _eicas.getEICAS(),
    parameterGroupComboLabel: 'Parameter Group',
    parameterGroupCombo: mocks.SystemTrendParameterGroupCombo,
    data: {

    }
  },

  returnPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)

    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload(p_options).then(function (result) {
        self.payload.data = result;
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
        ' INNER  JOIN scnTrends ' +
        ' ON ( scnTrends.acm_trend_id = acm_trend.ID AND scnTrends.scenarioID  = '+ (p_options.id || self._config.defaultScenarioId) +
        ' AND scnTrends.id = ' + p_options.data.id + ') '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getGroupPayload: function (p_options, group_id) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT ID as id, NAME as name, PARAM_ID as param_id ' +
        ' FROM acm_group ' +
        ' WHERE acm_group.ID IN (' + group_id + ') ' +
        ' ORDER BY NAME ASC'

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getParamPayload: function (p_options, param_id) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT scnSystemParameters.value as param_value, acm_param.NAME as param_name, acm_param.UNIT as uom, scnSystemParameters.scenarioID ' +
        ' FROM acm_param ' +
        ' LEFT JOIN ScnSystemParameters ' +
        ' ON (scnSystemParameters.acm_param_ID = acm_param.ID AND scnSystemParameters.scenarioID  = '+ (p_options.id || self._config.defaultScenarioId) + ') ' +
        ' WHERE acm_param.ID IN (' + param_id + ') ' +
        ' ORDER BY acm_param.NAME ASC '

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
      self.getPayload(p_options).then( async function (result) {
        let formatted = {}
        for (let i in result) {
          if (CoreUtil.isEquivalentString(result[i]['id'], p_options.data.id))
          formatted =
            {
              id: result[i]['id'],
              name: result[i]['name'],
              flightLeg: result[i]['flightLeg'],
              flightPhase: result[i]['flightPhase'],
              date: result[i]['date_time'],
              parameters: []
            }
          await self.getGroupPayload(p_options, result[i]['group_id']).then( async function (result2) {

            self.payload.parameterGroupCombo = []
            for (let j in result2) {

              self.payload.parameterGroupCombo.push(
                {
                  label: result2[j]['name'],
                  id: result2[j]['id'],
                  key: result2[j]['name'].replace(/\s/g,''),
                  selected: ( j === '0' ) ? 1 : 0
                }
              )

              await self.getParamPayload(p_options, result2[j]['param_id']).then(function (result3) {

                for (let k in result3) {
                  let param  = (result3[k]['param_value'] !== null) ? result3[k]['param_value'] : '0'
                  formatted.parameters.push(
                    {
                      name: result3[k]['param_name'],
                      value: param,
                      uom: result3[k]['uom'],
                      type: result2[j]['id']
                    }
                  )
                }

              }, function (err) {
                console.log(err)
                reject(err)
              })

            }

          }, function (err) {
            console.log(err)
            reject(err)
          })

        }

        resolve(formatted)

      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }

})

module.exports = ViewSystemTrendsSummaryModel
