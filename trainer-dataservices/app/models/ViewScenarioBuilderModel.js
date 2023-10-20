const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const _editor = require('../models/EditorModel.js')
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const SqlUtil = require('../utils/SqlUtil.js')

const ViewScenarioBuilderModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Scenario Builder',
    componentName: 'scnbuilder',
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

  executePayload: function (sql) {
    let self = this
    // if (req.query.editor) {
    this._config.editMode = true
    // }

    return new Promise(function (resolve, reject) {
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

  getPayload: function () {
    let self = this
    // if (req.query.editor) {
    this._config.editMode = true
    // }

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT id, name, created_at, description, author, tailNumber, updated_at' +
        ' FROM scnScenarios '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  formatPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)

    let self = this,
      formatted = {}

    let formData = Object.assign({ date: '' }, p_options.data)

    return new Promise(async function (resolve, reject) {
      if (p_options.action) {
        let sql = ''

        // Prevent circular dependency. (REF bd6ccf80-b7d8-454b-a86f-12322226076f)
        const ScenarioBuilderController = require('../controllers/ScenarioBuilderController.js')

        switch (p_options.action) {
          case 'create':
            sql = 'INSERT' +
              ' INTO scnScenarios (name, version, description, author, tailNumber, flightLegCounter, updated_at)' +
              ' VALUES (' +
                SqlUtil.defaultTo(formData.name, 'NULL') + ', ' +
                SqlUtil.defaultTo(formData.version, 'NULL') + ', ' +
                SqlUtil.defaultTo(formData.description, 'NULL') + ', ' +
                SqlUtil.defaultTo(formData.author, 'NULL') + ', ' +
                SqlUtil.defaultTo(formData.tailNumber, 'NULL') + ', ' +
                SqlUtil.defaultTo(formData.flightLegCounter, 'NULL') + ', ' +
                'CURRENT_TIMESTAMP' +
              ')'
            break
          case 'delete':
            sql = 'DELETE' +
              ' FROM scnScenarios ' +
              ' WHERE id = ' + p_options.id
            break
          case 'update':
            sql = 'UPDATE scnScenarios SET ' +
              (!CoreUtil.isNullOrUndefined(formData.name) ? 'name = ' + SqlUtil.defaultTo(formData.name, 'NULL') + ',' : '') +
              (!CoreUtil.isNullOrUndefined(formData.version) ? 'version = ' + SqlUtil.defaultTo(formData.version, 'NULL') + ',' : '') +
              (!CoreUtil.isNullOrUndefined(formData.description) ? 'description = ' + SqlUtil.defaultTo(formData.description, 'NULL') + ',' : '') +
              (!CoreUtil.isNullOrUndefined(formData.author) ? 'author = ' + SqlUtil.defaultTo(formData.author, 'NULL') + ',' : '') +
              (!CoreUtil.isNullOrUndefined(formData.tailNumber) ? 'tailNumber = ' + SqlUtil.defaultTo(formData.tailNumber, 'NULL') + ',' : '') +
              (!CoreUtil.isNullOrUndefined(formData.flightLegCounter) ? 'flightLegCounter = ' + SqlUtil.defaultTo(formData.flightLegCounter, 'NULL') + ',' : '') +
              ' updated_at = CURRENT_TIMESTAMP' +
              ' WHERE id = ' + p_options.id
            break
          case 'copy':
            await ScenarioBuilderController.duplicateScenario(p_options.id, formData.saveAsName).then(function (result) {
              console.log('Copied scenario id "' + p_options.id + '".')

              resolve(JSON.stringify(result))
            }, function (err) {
              console.log(err)
              reject(err)
            })

            return
          case 'export':
            await ScenarioBuilderController.exportScenario(p_options.id).then(function (result) {
              console.log('Exported scenario id "' + p_options.id + '".')

              resolve(JSON.stringify(result))
            }, function (err) {
              console.log(err)
              reject(err)
            })

            return
          case 'import':
            try {
              let scenarioJsonObj = JSON.parse(formData.scenarioJsonString)

              await ScenarioBuilderController.importScenario(scenarioJsonObj).then(function (nextId) {
                console.log('Imported scenario into id "' + nextId + '".')

                resolve(nextId)
              }, function (err) {
                console.log(err)
                reject(err)
              })
            } catch (err) {
              reject(err)
            }
            return
          case 'fkt':
            let fktAction = (formData.action || '').toLowerCase()

            // Delete a record before re-adding it, similar to an INSERT OR REPLACE in sqllite.
            if (fktAction === 'insert') {
              let p_fktOptions = Object.assign({}, p_options)
              p_fktOptions.data.action = 'delete'

              await self.returnPayload(p_fktOptions)
            }

            switch (fktAction) {
              case 'insert':
                sql += fktAction.toUpperCase() + ' INTO '
                break
              case 'delete':
                sql += fktAction.toUpperCase() + ' FROM '
                break
            }

            sql += formData.fktTable + ' '

            switch (fktAction) {
              case 'insert':
                let columnNames = ''
                let columnValues = ''

                // Create list of all column names and values to add to SQL query.
                for (const fktColumnObj of (formData.fktColumns || {})) {
                  columnNames += '`' + fktColumnObj.key + '`, '
                  columnValues += '\'' + fktColumnObj.value + '\', '
                }

                // Remove trailing comma from the name and value strings.
                sql += '(' + columnNames.slice(0, -2) + ') VALUES (' + columnValues.slice(0, -2) + ')'
                break
              case 'delete':
                let whereConditions = ''

                // Create list of all conditions to add to SQL query.
                for (const fktColumnObj of (formData.fktColumns || {})) {
                  whereConditions += '`' + fktColumnObj.key + '` = \'' + fktColumnObj.value + '\' AND '
                }

                // Remove trailing AND from the condition string.
                sql += 'WHERE ' + whereConditions.slice(0, -5)
                break
            }
            break
          case 'loadAircraftReport':
            try {
              if (!formData.aircraftReportXml) {
                reject('No report provided.')

                return
              }

              await ScenarioBuilderController.loadAircraftReport(p_options.id, formData.aircraftReportXml).then(function (scenarioId) {
                console.log('Imported aircraft report into scenario id "' + scenarioId + '".')

                resolve(scenarioId)
              }, function (err) {
                console.log(err)
                reject(err)
              })
            } catch (err) {
              reject(err)
            }
            return
        }

        await self.executePayload(sql).then(function (result) {
          formatted = {
            status: 'OK',
            lastId: result.lastId
          }
        }, function (err) {
          console.log(err)
          reject(err)
        })

        // Resolve immediately if action is in list.
        if (['fkt'].indexOf(p_options.action) !== -1) {
          resolve(formatted)

          return
        }
      }

      self.getPayload().then(function (result) {
        formatted.scenarios = []
        for (let i in result) {
          formatted.scenarios.push(
            {
              id: result[i]['id'],
              name: result[i]['name'],
              version: result[i]['version'],
              description: result[i]['description'],
              author: result[i]['author'],
              tailNumber: result[i]['tailNumber'],
              flightLegCounter: result[i]['flightLegCounter'],
              created: result[i]['created_at'],
              modified: result[i]['updated_at']
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

module.exports = ViewScenarioBuilderModel
