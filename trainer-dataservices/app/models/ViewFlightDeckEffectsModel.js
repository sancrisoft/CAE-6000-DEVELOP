const _ = require('lodash')
const db = require('../services/dbManager');
const ConstantsModel = require('./ConstantsModel.js')
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const _editor = require('../models/EditorModel.js')
const config = require('../config/config.js')

const ViewFlightDeckEffectsModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Flight Deck Effects',
    componentName: 'flightdeckeffects',
    componentDetailsTarget: 'flightdeck' +
    'effectssummary',
    header: _nav.maintMenuHeader(),
    eicasMessages: [],
    sortedData: [],
    viewComboLabel: 'View',
    viewCombo: [
      {label: 'Active FDEs', id: 0, key: 'active', selected: 1},
      {label: 'Historical FDEs', key: 'historical', id: 1, selected: 0},
      {label: 'All FDEs', id: 2, key: 'all', selected: 0}
    ],
    sortComboLabel: 'Sort by',
    sortCombo: [
      {label: 'Alphabetically', id: 0, key: 'cas', selected: 1},
      {label: 'Category', id: 1, key: 'category', selected: 0},
      {label: 'Date & Time', id: 2, key: 'dateDesc', selected: 0}
    ],
    data: {
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

  getCASPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT Equation.EQID as eqid, EqDesc as name, LRUID as lruid, FDECategory.FDECategoryDesc as category, FDELink.FDEEqID as fdeeqid ' +
        ' FROM Equation ' +
        ' LEFT JOIN FDEEquation on FDEEquation.EqID = Equation.EQID ' +
        ' LEFT JOIN FDECategory on FDECategory.FDECategoryID = FDEEquation.FDECategoryID ' +
        ' LEFT JOIN FDELink on FDELink.EQID = Equation.EQID AND Equation.LRUID <> "0" ' +
        ' WHERE EqDesc <> "" ' +
        ' ORDER BY EqDesc ASC '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getFaultsPayload: function (p_options) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql =' SELECT Equation.EQID as eqid, Equation.`EqDesc` as name, scenarioID, scnFaults.id as id ' +
        ' FROM scnFaults ' +
        ' INNER JOIN Equation ON scnFaults.eqid = Equation.EQID ' +
        ' INNER JOIN scnFdeLinkFault ON scnFdeLinkFault.fault_id = scnFaults.id ' +
        ' WHERE scenarioID  = ' + (p_options.id || self._config.defaultScenarioId) +
        ' AND scnFdeLinkFault.fde_id = ' + p_options.store.fde + ''

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getPayload: function (p_options) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT Equation.EQID as eqid, FDECategory.FDECategoryDesc as category, FDECategory.FDECategoryID as order_id, FaultCode, Details , date_time, ' +
        ' (SELECT COUNT(fde_id)  FROM scnFdeLinkFault  WHERE scnFdeLinkFault.`fde_id`= scnFdes.id and scnFdeLinkFault.`scenario_id` = "' + (p_options.id || self._config.defaultScenarioId) + '" )  as numberOfFaults ,  ' +
        ' fligthLegCounter, Equation.`EqDesc` as name, flightLeg, flightPhase, status, occurences, Equation.`Details` as description, scenarioID, scnFdes.id as id ' +
        ' FROM scnFdes ' +
        ' INNER JOIN Equation ON scnFdes.eqid = Equation.EQID ' +
        ' INNER JOIN FDEEquation on  FDEEquation.EqID = Equation.EQID ' +
        ' INNER JOIN FDECategory on  FDECategory.`FDECategoryID` = FDEEquation.`FDECategoryID` ' +
        ' WHERE scenarioID  = ' + (p_options.id || self._config.defaultScenarioId) + ''

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

      self.getPayload(p_options).then(async function (result) {
        let formatted = {
          items: []
        }

        for (let i in result) {
          let faults = []
          if (result[i]['numberOfFaults'] != 0){
            // Store id for use in getFaultsPayload().
            p_options.store.fde = result[i]['id'];

            await self.getFaultsPayload(p_options).then(function (result3) {
              for (let j in result3) {
                faults.push({
                  value: result3[j]['eqid'],
                  label: result3[j]['name']
                })
              }
            }, function (err) {
              console.log(err)
              reject(err)
            })
          }

          formatted.items.push(
            {
              id: result[i]['id'],
              cas: result[i]['name'],
              casid: result[i]['eqid'],
              active: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 0 : 1,
              faults: faults,
              desc: 'Description',
              historical: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 1 : 0,
              category: result[i]['category'],
              totalFaults: result[i]['numberOfFaults'],
              date: result[i]['date_time'],
              fl: result[i]['flightLeg'],
              status: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 0 : 1,
              occurences: result[i]['occurences'],
              phase: result[i]['flightPhase']
            }
          )
        }

        if (self._config.editMode) {
          self.getCASPayload().then(function (result2) {
            formatted.edit = {}
            formatted.edit.cases = []
            formatted.edit.faults = []
            for (let i in result2) {
              if ( '' + result2[i]['lruid'] === '0' ) {
                formatted.edit.cases.push(
                  {
                    id: result2[i]['eqid'],
                    category: result2[i]['category'],
                    name: result2[i]['name']
                  }
                )
              } else {
                formatted.edit.faults.push(
                  {
                    value: result2[i]['eqid'],
                    casid: result2[i]['fdeeqid'],
                    label: result2[i]['name']
                  }
                )
              }

            }
            formatted.edit.categories = _editor.defaults.categories
            formatted.edit.phases = _editor.defaults.phases
            formatted.edit.occurences = _editor.defaults.occurences
            formatted.edit.fls = _editor.defaults.fls

            resolve(formatted)

          }, function (err) {
            console.log(err)
            reject(err)
          })
        }
        else {
          resolve(formatted)
        }

      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }

})

module.exports = ViewFlightDeckEffectsModel
