const db = require('../services/dbManager');
const ConstantsModel = require('./ConstantsModel.js')
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const SqlUtil = require('../utils/SqlUtil.js')

const ViewSCNFaultMessagesModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Scenario Builder',
    componentName: 'scnfaultmessages',
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

      sql = formData.faultCode ? 'SELECT (CASE WHEN COUNT(1) > 0 THEN EQID ELSE -1 END) AS eqid FROM Equation WHERE FaultCode = \'' + formData.faultCode + '\'' : 'SELECT \'' + formData.eqid + '\' AS eqid'
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

      sql = 'SELECT id, COUNT(*) AS recordCount FROM scnFaults ' +
      ' WHERE scenarioID = \'' + formData.scn_Id + '\' AND eqid || IFNULL(SUBSTR(dataTime, 1, INSTR(dataTime, \' \') - 1), \'\') = ' + SqlUtil.defaultTo(eqid + formData.date.split(' ').slice(0, 1), 'NULL')

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
        sql = 'DELETE FROM scnFaults '

        if (p_options.action === 'edit') {
          sql = 'UPDATE scnFaults SET ' +
            (!CoreUtil.isNullOrUndefined(formData.flightLeg) ? 'fligthLeg = ' + SqlUtil.defaultTo(formData.flightLeg, 'NULL') + ',' : '') +
            (!CoreUtil.isNullOrUndefined(formData.flightPhase) ? 'fligthPhase = ' + SqlUtil.defaultTo(formData.flightPhase, 'NULL') + ',' : '') +
            (!CoreUtil.isNullOrUndefined(formData.status) ? 'status = \'' + (formData.status === ConstantsModel.STATUS_ACTIVE || CoreUtil.isEquivalentToTrue(formData.status) ? ConstantsModel.STATUS_ACTIVE : ConstantsModel.STATUS_NOTACTIVE) + '\',' : '') +
            (!CoreUtil.isNullOrUndefined(formData.occurences) ? 'occurences = ' + SqlUtil.defaultTo(formData.occurences, 'NULL') + ',' : '') +
            (!CoreUtil.isNullOrUndefined(formData.date) ? 'dataTime = ' + SqlUtil.defaultTo(formData.date, 'NULL') + ',' : '') +
            'eqid = ' + SqlUtil.defaultTo(eqid, 'NULL') + ' '
        }

        sql += ' WHERE id = ' + formData.id
      } else {
        sql = 'INSERT INTO scnFaults ' +
          '(scenarioID, ' +
          'fligthLeg, ' +
          'fligthPhase, ' +
          'fligthLegCounter, ' +
          'status, ' +
          'occurences, ' +
          'dataTime, ' +
          'createdAT, ' +
          'idOrign, ' +
          'eqid) ' +
          ' VALUES ' +
          '(' + SqlUtil.defaultTo(formData.scn_Id, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.flightLeg, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.flightPhase, 'NULL') + ',' +
          '\'\',' +
          '\'' + (formData.status === ConstantsModel.STATUS_ACTIVE || CoreUtil.isEquivalentToTrue(formData.status) ? ConstantsModel.STATUS_ACTIVE : ConstantsModel.STATUS_NOTACTIVE) + '\',' +
          SqlUtil.defaultTo(formData.occurences, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.date, 'NULL') + ',' +
          '\'' + Date.now() + '\',' +
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

    return new Promise(function (resolve, reject) {
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

  formatPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)
    if (p_options.id) {
      p_options.data.scn_Id = p_options.id
    }

    let self = this

    return new Promise(function (resolve, reject) {
      self.getPayload(p_options).then(function (result) {
        let formatted = {
          status: 'OK',
          lastId: result.lastId
        }

        resolve(formatted)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }
})

module.exports = ViewSCNFaultMessagesModel
