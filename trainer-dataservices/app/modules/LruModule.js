const db = require('../services/dbManager');
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const SqlUtil = require('../utils/SqlUtil.js')

const LruModule = ({

  _config: Object.assign(config, {}),

  _constants: {
    contextType: {
      flightdeckeffects: 'fde',
      faultmessages: 'fault',
      servicemessages: 'service'
    },
    get contextTypes() {
      return [
        {
          key: this.contextType.flightdeckeffects,
          value: 'flightdeckeffects'
        },
        {
          key: this.contextType.faultmessages,
          value: 'faultmessages'
        },
        {
          key: this.contextType.servicemessages,
          value: 'servicesmessages'
        }
      ]
    }
  },

  payload: {
    title: 'Scenario Builder',
    componentName: 'LruModule',
    data: {}
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

  formatPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)
    if (p_options.id) {
      p_options.data.scn_Id = p_options.id
    }

    let self = this

    return new Promise(function (resolve, reject) {
      switch (p_options.action) {
        case 'upsert':
          // Fix the value for contextType.
          let i = self._constants.contextTypes.findIndex(item => p_options.data.contextType.toLowerCase().indexOf(item.value) !== -1)
          if (i !== -1) {
            p_options.data.contextType = self._constants.contextTypes[i].key
          }

          self.upsertLruDataPayload(p_options).then(async function (result) {
            let formatted = {
              status: 'OK',
              lastId: result.lastId
            }

            resolve(formatted)
          }, function (err) {
            console.log(err)
            reject(err)
          })
          break
        default:
          resolve({
            status: '404'
          })
      }
    })
  },

  getLruDataPayload:  function (eqid, p_options = {}) {
    let self = this

    return new Promise(async function (resolve, reject) {
      let sql = ' SELECT DISTINCT EquationDataPresort.EQID as eq_id, EquationDataPresort.LRUID as lru_id, ' +
        'DataField.DataFieldID df_id, DataField.DataFieldName as df_name, DataField.StartBit as df_bits, ' +
        'DataSource.Name as ds_name, DataSource.RemappedLabel AS ds_label, ' +
        'scnFields.value as df_value, ' +
        'LRU.InstanceDesc as lru_name ' +
        ' FROM EquationDataPresort ' +
        ' INNER JOIN LRU on LRU.LRUID = EquationDataPresort.LRUID ' +
        ' INNER JOIN DataField ON EquationDataPresort.DataFieldID = DataField.DataFieldID ' +
        ' INNER JOIN DataSourceGroup ON DataSourceGroup.DataSourceGroupID = EquationDataPresort.DataSourceGroupID ' +
        ' INNER JOIN DataSource ON DataSource.DataSourceID = DataSourceGroup.DataSourceID' +
        ' LEFT JOIN scnFields ON (' +
        '   scnFields.DataFieldID = DataField.DataFieldID' +
        '   ' + (p_options.contextType && p_options.contextId ? 'AND scnFields.contextType = \'' + p_options.contextType + '\' AND scnFields.contextId = ' + p_options.contextId : '') +
        ' )' +
        ' WHERE EquationDataPresort.EQID  = ' + eqid + '' +
        ' ;'

        db.all(sql, [], (err, result) => {
          if (err) {
            return console.error(err.message)
          }
          resolve(result)
        })
    })
  },

  formatLruData: function(eqid, p_options = {}) {
    let self = this

    return new Promise(function (resolve, reject) {
      let lruData = []
      let lruDataNonZero = []
      let dataFieldValues = []

      self.getLruDataPayload(eqid, p_options).then(function (result) {
        function parseLruData(p_options) {
          let lruData = []

          for (let i in result) {
            // Skip records where data field value is equivalent to 0 or NaN.
            if (p_options.skipIfZeroOrNaN) {
              let dataFieldValue = parseInt(result[i]['df_value'])

              if (dataFieldValue === 0 || isNaN(dataFieldValue)) {
                continue
              }
            }

            if (lruData.find(item => item.lru === result[i]['lru_name'])) {
              let j = lruData.findIndex(item => item.lru === result[i]['lru_name'])
              if (lruData[j].data.find(item => item.label.NDOname === result[i]['ds_name'])) {
                let k = lruData[j].data.findIndex(item => item.label.NDOname === result[i]['ds_name'])
                lruData[j].data[k].label.items.push({
                  desc: result[i]['df_name'],
                  dataFieldId: result[i]['df_id'],
                  NDOnumber: result[i]['df_value'],
                  bits: (p_options.useFakeBitsIfZero && result[i]['df_bits'] === 0) ? (i % 23 + 9) : result[i]['df_bits']
                })

                dataFieldValues.push({
                  lruName: result[i]['lru_name'],
                  labelName: result[i]['ds_name'],
                  dataFieldName: result[i]['df_name'],
                  dataFieldId: result[i]['df_id'],
                  dataFieldValue: result[i]['df_value']
                })
              } else {
                lruData[j].data.push ({
                  label: {
                    labelNumber: result[i]['ds_label'],
                    NDOname: result[i]['ds_name'],
                    items: [
                      {
                        desc: result[i]['df_name'],
                        dataFieldId: result[i]['df_id'],
                        NDOnumber: result[i]['df_value'],
                        bits: (p_options.useFakeBitsIfZero && result[i]['df_bits'] === 0) ? (i % 23 + 9) : result[i]['df_bits']
                      }
                    ]
                  }

                })

                dataFieldValues.push({
                  lruName: result[i]['lru_name'],
                  labelName: result[i]['ds_name'],
                  dataFieldName: result[i]['df_name'],
                  dataFieldId: result[i]['df_id'],
                  dataFieldValue: result[i]['df_value']
                })
              }
            }
            else {
              lruData.push({
                lru: result[i]['lru_name'],
                data: [
                  {
                    label: {
                      labelNumber: result[i]['ds_label'],
                      NDOname: result[i]['ds_name'],
                      items: [
                        {
                          desc: result[i]['df_name'],
                          dataFieldId: result[i]['df_id'],
                          NDOnumber: result[i]['df_value'],
                          bits: (p_options.useFakeBitsIfZero && result[i]['df_bits'] === 0) ? (i % 23 + 9) : result[i]['df_bits']
                        }
                      ]
                    }
                  }
                ]
              })

              dataFieldValues.push({
                lruName: result[i]['lru_name'],
                labelName: result[i]['ds_name'],
                dataFieldName: result[i]['df_name'],
                dataFieldId: result[i]['df_id'],
                dataFieldValue: result[i]['df_value']
              })
            }
          }

          return lruData
        }

        // Use the same result set to generate two LRU data sets.
        lruData = parseLruData(p_options)
        lruDataNonZero = parseLruData(Object.assign({}, p_options, { skipIfZeroOrNaN: true }))

        if (p_options.getDataFieldValues) {
          resolve({
            dataFieldValues
          })
          return
        }

        resolve({
          lruData,
          lruDataNonZero
        })
      }, function (err) {
        console.log(err)
        reject(err)
      })

    })
  },

  upsertLruData: function(p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)
    if (p_options.id) {
      p_options.data.scn_Id = p_options.id
    }

    let self = this

    return new Promise(function (resolve, reject) {
      // Collect all LRU data.
      let lruData = []
      let lruObject = {
        lruName: '',
        labelName: '',
        dataFieldName: '',
        dataFieldId: -1,
        dataFieldValue: -1,
        get isComplete() {
          return this.lruName !== '' && this.labelName !== '' && this.dataFieldName !== ''
        },
        isEquivalent: function (lruObj) {
          return this.lruName === lruObj.lruName && this.labelName === lruObj.labelName && this.dataFieldName === lruObj.dataFieldName
        },
        reset: function () {
          this.lruName = ''
          this.labelName = ''
          this.dataFieldName = ''
          this.dataFieldValue = -1
        },
        setLruName: function (lruName) {
          this.reset()
          this.lruName = lruName
        },
        setLabelName: function (lruName, labelName) {
          this.reset()
          this.lruName = lruName
          this.labelName = labelName
        },
        setDataField: function (lruName, labelName, dataFieldName, dataFieldValue) {
          this.reset()
          this.lruName = lruName
          this.labelName = labelName
          this.dataFieldName = dataFieldName
          this.dataFieldValue = dataFieldValue
        }
      }

      // Build array of LRU data objects based on aircraft report, which doesn't contain dataFieldId.
      p_options.data.lruData.split(/\r?\n/).forEach(line => {
        line = line.trim()

        if (line.indexOf('LRU:') !== -1) {
          let lruName = line.split(/LRU:/)

          lruObject.setLruName(lruName[1].trim())
        }
        else if (line.indexOf('LABEL:') !== -1 || line.indexOf('NDO:') !== -1) {
          let labelName = line.split(/(VALUE|NDO_ID):/)

          lruObject.setLabelName(lruObject.lruName, labelName[0].substr(labelName[0].indexOf(':') + 1).trim())
        }
        else if (line.indexOf('FIELD:') !== -1) {
          let dataField = line.split(/VALUE:/)

          lruObject.setDataField(lruObject.lruName, lruObject.labelName, dataField[0].substr(dataField[0].indexOf(':') + 1).trim(), dataField[1].trim())
        }

        if (lruObject.isComplete) {
          lruData.push(Object.assign({}, lruObject))
        }
      })

      // Retrieve array of LRU data objects based on eqid, which contains dataFieldId.
      self.formatLruData(p_options.data.eqid, Object.assign({ getDataFieldValues: true }, p_options.data)).then(async function (result) {
        for (let i in result) {
          for (let j in lruData) {
            // Match LRU data object between aircraft report and database.
            if (lruData[j].isEquivalent(result[i])) {
              lruData[j].dataFieldId = result[i].dataFieldId

              let p_scnOptions = Object.assign({}, p_options, { data: Object.assign({}, p_options.data, lruData[j]) })

              // Add LRU data value from aircraft report into database.
              await self.upsertLruDataPayload(p_scnOptions)
            }
          }
        }

        resolve()
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },
  upsertLruDataPayload: function(p_options = {}) {
    let self = this

    let formData = Object.assign({ date: '' }, p_options.data)
    formData.date = CoreUtil.defaultTo(formData.date, '').toUpperCase()

    return new Promise(async function (resolve, reject) {
      let sql = 'SELECT 0'
      let err

      if (p_options.action === 'upsert') {
        sql = 'SELECT id, COUNT(*) AS recordCount FROM scnFields ' +
          ' WHERE scenarioID = \'' + formData.scn_Id + '\' AND contextType = \'' + formData.contextType + '\' AND contextId = \'' + formData.contextId + '\' AND DataFieldID = \'' + formData.dataFieldId + '\''

        let { id, recordCount } = await db.get(sql)

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
      }

      if (!err && !CoreUtil.isEquivalentString(formData.scn_Id, self._config.defaultScenarioId)) {
        if (formData.id) {
          sql = 'DELETE FROM scnFields '

          if (p_options.action === 'edit') {
            sql = 'UPDATE scnFields SET ' +
              (!CoreUtil.isNullOrUndefined(formData.dataFieldId) ? 'DataFieldID = ' + SqlUtil.defaultTo(formData.dataFieldId, '0') + ',' : '') +
              (!CoreUtil.isNullOrUndefined(formData.dataFieldValue) ? 'value = ' + SqlUtil.defaultTo(formData.dataFieldValue, 'NULL') + ',' : '') +
              (!CoreUtil.isNullOrUndefined(formData.contextType) ? 'contextType = ' + SqlUtil.defaultTo(formData.contextType, 'NULL') + ',' : '') +
              (!CoreUtil.isNullOrUndefined(formData.contextId) ? 'contextId = ' + SqlUtil.defaultTo(formData.contextId, 'NULL') + ',' : '') +
              'id = ' + formData.id + ' '
          }

          sql += ' WHERE id = ' + formData.id
        } else {
          sql = 'INSERT INTO scnFields ' +
            '(scenarioID, ' +
            'DataFieldID, ' +
            'value, ' +
            'contextType, ' +
            'contextId) ' +
            ' VALUES ' +
            '(' + SqlUtil.defaultTo(formData.scn_Id, 'NULL') + ',' +
            SqlUtil.defaultTo(formData.dataFieldId, '0') + ',' +
            SqlUtil.defaultTo(formData.dataFieldValue, 'NULL') + ',' +
            SqlUtil.defaultTo(formData.contextType, 'NULL') + ',' +
            SqlUtil.defaultTo(formData.contextId, 'NULL') +
            ') '
        }
      }

      let dbResultObj = await db.run(sql, [])

      if (err) {
        reject(err)
      } else {
        // Return properties inherent to run(). (REF 7d475829-b0f7-4b7e-a4d0-ec35f3ab41ac)
        resolve({
          lastId: formData.id || dbResultObj.lastID,
          changes: dbResultObj.changes
        })
      }
    })
  }

})

module.exports = LruModule
