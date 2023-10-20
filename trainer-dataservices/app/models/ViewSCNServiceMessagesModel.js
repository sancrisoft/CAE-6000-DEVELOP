const db = require('../services/dbManager');
const ConstantsModel = require('./ConstantsModel.js')
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const SqlUtil = require('../utils/SqlUtil.js')

const ViewSCNServiceMessagesModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Scenario Builder',
    componentName: 'scnservicemessages',
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

  getPayload: function (p_options) {
    let self = this
    // if (req.query.editor) {
    this._config.editMode = true
    // }

    let formData = p_options.data

    return new Promise(function (resolve, reject) {
      let sql
      if (CoreUtil.isEquivalentString(formData.scn_Id, self._config.defaultScenarioId)) {
        sql = 'SELECT 0'
      } else if (formData.id) {
        sql = 'DELETE FROM scnMessages '

        if (p_options.action === 'edit') {
          sql = 'UPDATE scnMessages SET ' +
            'fligthLeg = ' + SqlUtil.defaultTo(formData.flightLeg, '') + ',' +
            'fligthPhase = ' + SqlUtil.defaultTo(formData.flightPhase, '') + ',' +
            'fligthLegCounter = \'\', ' +
            'ata = ' + SqlUtil.defaultTo(formData.ata, '') + ',' +
            'status = \'' + (formData.status === ConstantsModel.STATUS_ACTIVE || CoreUtil.isEquivalentToTrue(formData.status) ? ConstantsModel.STATUS_ACTIVE : ConstantsModel.STATUS_NOTACTIVE) + '\',' +
            'occurences = ' + SqlUtil.defaultTo(formData.occurences, '') + ',' +
            'dateTime = ' + SqlUtil.defaultTo(formData.date, '') + ',' +
            'eqid = ' + SqlUtil.defaultTo(formData.eqid, '') + ' '
        }

        sql += ' WHERE id = ' + formData.id
      } else {
        sql = 'INSERT INTO scnMessages ' +
          '(scenarioID, ' +
          'fligthLeg, ' +
          'fligthPhase, ' +
          'fligthLegCounter, ' +
          'ata, ' +
          'status, ' +
          'occurences, ' +
          'dateTime, ' +
          'eqid) ' +
          ' VALUES ' +
          '(' + SqlUtil.defaultTo(formData.scn_Id, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.flightLeg, '') + ',' +
          SqlUtil.defaultTo(formData.flightPhase, '') + ',' +
          '\'\',' +
          SqlUtil.defaultTo(formData.ata, '') + ',' +
          '\'' + (formData.status === ConstantsModel.STATUS_ACTIVE || CoreUtil.isEquivalentToTrue(formData.status) ? ConstantsModel.STATUS_ACTIVE : ConstantsModel.STATUS_NOTACTIVE) + '\',' +
          SqlUtil.defaultTo(formData.occurences, '') + ',' +
          SqlUtil.defaultTo(formData.date, '') + ',' +
          SqlUtil.defaultTo(formData.eqid, '') +
          ') '
      }

      db.run(sql, [], function (err) {
        if (err) {
          return console.error(err.message)
        }

        // Return properties inherent to run(). (REF 7d475829-b0f7-4b7e-a4d0-ec35f3ab41ac)
        resolve({
          lastId: this.lastID,
          changes: this.changes
        })
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

module.exports = ViewSCNServiceMessagesModel
