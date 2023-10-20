const db = require('../services/dbManager');
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const SqlUtil = require('../utils/SqlUtil.js')

const ViewSCNSystemTrendsModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Scenario Builder',
    componentName: 'scnsystemtrends',
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
        sql = 'DELETE FROM scnTrends '

        if (p_options.action === 'edit') {
          sql = 'UPDATE scnTrends SET ' +
            'flightLeg = ' + SqlUtil.defaultTo(formData.flightLeg, 'NULL') + ',' +
            'flightPhase = ' + SqlUtil.defaultTo(formData.flightPhase, 'NULL') + ',' +
            'flightLegCounter = \'\', ' +
            'acm_trend_id = ' + SqlUtil.defaultTo(formData.acm_trend_id, 'NULL') + ',' +
            'date_time = ' + SqlUtil.defaultTo(formData.date, 'NULL') + ' '
        }

        sql += ' WHERE id = ' + formData.id
      } else {
        sql = 'INSERT INTO scnTrends ' +
          '(scenarioID, ' +
          'flightLeg, ' +
          'flightPhase, ' +
          'flightLegCounter, ' +
          'acm_trend_id, ' +
          'date_time) ' +
          ' VALUES ' +
          '(' + SqlUtil.defaultTo(formData.scn_Id, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.flightLeg, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.flightPhase, 'NULL') + ',' +
          '\'\',' +
          SqlUtil.defaultTo(formData.acm_trend_id, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.date, 'NULL') +
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

module.exports = ViewSCNSystemTrendsModel
