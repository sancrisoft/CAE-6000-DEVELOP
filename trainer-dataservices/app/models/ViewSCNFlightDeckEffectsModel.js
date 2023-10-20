const db = require('../services/dbManager');
const ConstantsModel = require('./ConstantsModel.js')
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const SqlUtil = require('../utils/SqlUtil.js')

const ViewSCNFlightDeckEffectsModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Scenario Builder',
    componentName: 'scnfde',
    data: {
    }
  },

  returnPayload: function (p_options) {
    let self = this

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

  getEqidPayload: function (p_options, formData) {
    return new Promise(function (resolve, reject) {

      sql = formData.faultCode ? 'SELECT (CASE WHEN COUNT(1) > 0 THEN EQID ELSE -1 END) AS eqid FROM Equation WHERE FaultCode = \'' + formData.faultCode + '\'' : 'SELECT \'' + formData.casid + '\' AS eqid'
      db.get(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getRecordCountPayload: function (p_options, formData, eqid) {
    return new Promise(function (resolve, reject) {

      sql = 'SELECT id, COUNT(*) AS recordCount FROM scnFdes ' +
      ' WHERE scenarioID = \'' + formData.scn_Id + '\' AND eqid || IFNULL(SUBSTR(date_time, 1, INSTR(date_time, \' \') - 1), \'\') = ' + SqlUtil.defaultTo(eqid + formData.date.split(' ').slice(0, 1), 'NULL')

      db.get(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getUpsertPayload: function (p_options, formData, eqid) {
    return new Promise(function (resolve, reject) {
      if (formData.id) {
        sql = 'DELETE FROM scnFdes '

        if (p_options.action === 'edit') {
          sql = 'UPDATE scnFdes SET ' +
            (!CoreUtil.isNullOrUndefined(formData.fl) ? 'flightLeg = ' + SqlUtil.defaultTo(formData.fl, 'NULL') + ',' : '') +
            (!CoreUtil.isNullOrUndefined(formData.phase) ? 'flightPhase = ' + SqlUtil.defaultTo(formData.phase, 'NULL') + ',' : '') +
            (!CoreUtil.isNullOrUndefined(formData.status) ? 'status = \'' + (formData.status === ConstantsModel.STATUS_ACTIVE || CoreUtil.isEquivalentToTrue(formData.status) ? ConstantsModel.STATUS_ACTIVE : ConstantsModel.STATUS_NOTACTIVE) + '\',' : '') +
            (!CoreUtil.isNullOrUndefined(formData.occurences) ? 'occurences = ' + SqlUtil.defaultTo(formData.occurences, 'NULL') + ',' : '') +
            (!CoreUtil.isNullOrUndefined(formData.date) ? 'date_time = ' + SqlUtil.defaultTo(formData.date, 'NULL') + ',' : '') +
            'eqid = ' + SqlUtil.defaultTo(eqid, 'NULL') + ' '
        }

        sql += ' WHERE id = ' + formData.id
      } else {
        sql = 'INSERT INTO scnFdes ' +
          '(scenarioID, ' +
          'flightLeg, ' +
          'flightPhase, ' +
          'fligthLegCounter, ' +
          'status, ' +
          'occurences, ' +
          'date_time, ' +
          'idOrign, ' +
          'eqid) ' +
          ' VALUES ' +
          '(' + SqlUtil.defaultTo(formData.scn_Id, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.fl, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.phase, 'NULL') + ',' +
          '\'\',' +
          '\'' + (formData.status === ConstantsModel.STATUS_ACTIVE || CoreUtil.isEquivalentToTrue(formData.status) ? ConstantsModel.STATUS_ACTIVE : ConstantsModel.STATUS_NOTACTIVE) + '\',' +
          SqlUtil.defaultTo(formData.occurences, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.date, 'NULL') + ',' +
          '\'\',' +
          SqlUtil.defaultTo(eqid, 'NULL') +
          ') '
      }

      db.run(sql, [], (err) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(this)
      })
    })
  },


  getPayload: function (p_options) {
    let self = this
    // if (req.query.editor) {
    this._config.editMode = true
    // }

    let formData = Object.assign({ date: '' }, p_options.data)
    formData.date = CoreUtil.defaultTo(formData.date, '').toUpperCase()

    return new Promise(async function (resolve, reject) {
      let sql = 'SELECT 0'
      let err = ''
      let eqid = 0

      self.getEqidPayload(p_options, formData).then(function (result) {
        eqid = result['eqid']
        if (eqid === -1) {
          err = 'Fault code ' + formData.faultCode + ' is invalid.'
        }
        console.log('eqid-' + eqid)

        if (!err && p_options.action === 'upsert') {
          console.log('----------------upsert')
          self.getRecordCountPayload(p_options, formData, eqid).then(function (result) {
            let recordCount = result['recordCount']
            let id = result['id']
            // Expect either 0 or 1 record, but not more.
            switch (recordCount) {
              case 1:
                formData.id = id
              case 0:
                p_options.action = 'edit'
                break
              default:
                err = 'Upsert should affect only 1 record and ' + recordCount + ' are found with given criteria.'
                break
            }
            console.log('recordCount - ' + recordCount)

          }, function (err) {
            console.log(err)
            reject(err)
          })
        }

        if (!err && !CoreUtil.isEquivalentString(formData.scn_Id, self._config.defaultScenarioId)) {
          console.log('-------------------edit')
          self.getUpsertPayload(p_options, formData, eqid).then(function (result) {
            if (err) {
              reject(err)
            } else {
              // Return properties inherent to run(). (REF 7d475829-b0f7-4b7e-a4d0-ec35f3ab41ac)
              console.log('-----------------run')
              resolve({
                lastId: formData.id || result['lastID'],
                changes: result['changes']
              })
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
    })
  },

  setFaultsPayload: function (p_options) {
    let self = this

    let formData = Object.assign({ date: '' }, p_options.data)
    formData.date = CoreUtil.defaultTo(formData.date, '').toUpperCase()

    return new Promise(async function (resolve, reject) {
      if (!CoreUtil.isEquivalentString(formData.scn_Id, self._config.defaultScenarioId)) {
        // Prevent circular dependency. (REF bd6ccf80-b7d8-454b-a86f-12322226076f)
        const ScenarioBuilderController = require('../controllers/ScenarioBuilderController.js')

        let fktFdeFaults = []

        for (const faultObj of formData.faults) {
          let faultId
          try {
            faultId = await ScenarioBuilderController.upsertFault(formData.scn_Id, {
              eqid: faultObj.value,
              status: 'Active'
            })
          } catch (err) {
            err
            continue
          }

          // Keep track of FKT ids.
          fktFdeFaults = [...fktFdeFaults, {
            scenarioId: formData.scn_Id,
            fdeId: p_options.store.fdeId,
            faultId
          }]
        }

        try {
          // Clear all Faults linked to FDEs.
          await ScenarioBuilderController.deleteFktFdeFault({
            scenarioId: formData.scn_Id,
            fdeId: p_options.store.fdeId
          })
        } catch (err) {
          err
        }

        // Link FDEs to Faults in FKT.
        for (const fktFdeFault of fktFdeFaults) {
          try {
            await ScenarioBuilderController.upsertFktFdeFault(fktFdeFault)
          } catch (err) {
            err
            continue
          }
        }
      }

      resolve()
    })
  },

  formatPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)
    if (p_options.id) {
      p_options.data.scn_Id = p_options.id
    }

    let self = this

    return new Promise(function (resolve, reject) {
      self.getPayload(p_options).then(async function (result) {
        let formatted = {
          status: 'OK',
          lastId: result.lastId
        }

        // Attach Faults to FDE if any.
        if ((p_options.data.faults || []).length) {
          p_options.store.fdeId = result.lastId
          await self.setFaultsPayload(p_options)
        }

        resolve(formatted)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }
})

module.exports = ViewSCNFlightDeckEffectsModel
