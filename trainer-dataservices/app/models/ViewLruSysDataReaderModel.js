const db = require('../services/dbManager');
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewLruSysDataReaderModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Data Reader',
    componentName: 'lrusysdatareader',
    parentComponentName: 'lruSysOperations',
    header: {
      maintMenuSectionsVisibility: true,
      viewBackBtnLabel: 'Return To<br> Lru/Sys OPS',
      viewBtnVisible: false,
      viewBackBtnVisible: true
    },
    eicasMessages: _eicas.getEICASLRU(),
    data: {
    }
  },

  returnPayload: function (req) {
    let self = this
    let lruId = req.query.id

    return new Promise(function (resolve, reject) {
      self.formatPayload(lruId).then(function (result) {
        self.payload.data = result
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function (lruId) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT ' +
        ' lru , sys_lru.LRU_NAME as lru_label, lru_tar.LRU_NAME as lru_name, lru_t.LRUID as lru_id , ' +
        ' GROUP_CONCAT(data_souce, "@") AS data_source,  GROUP_CONCAT(data_field, "@") AS data_field ' +
        ' FROM ( SELECT DISTINCT LRU.InstanceDesc as lru ,' +
        ' CASE ' +
        ' WHEN TYPE = 1 ' +
        ' THEN DataSourceGroup.DataSourceGroupID||"~"||TYPE||"~"||DataSource.`RemappedLabel`||"~"||DataSource.Name' +
        ' WHEN TYPE = 2 ' +
        ' THEN DataSourceGroup.DataSourceGroupID||"~"||TYPE||"~"||DataSource.`NDOID`||"~"||DataSource.Name' +
        ' END as data_souce ,' +
        ' CASE ' +
        ' WHEN TYPE = 3 ' +
        ' THEN DataSourceGroup.DataSourceGroupID||"~"||DataField.DataFieldName||"~"|| Coalesce(scF1.value, scF2.value,"0")||"~"||DataField.`StopBit` '+
        ' END as data_field ' +
        ' FROM EquationDataPresort ' +
        ' LEFT OUTER JOIN LRU ON (LRU.LRUID = EquationDataPresort.LRUID) ' +
        ' LEFT OUTER JOIN DataSourceGroup ON (EquationDataPresort.DataSourceGroupID = DataSourceGroup.DataSourceGroupID)  ' +
        ' LEFT OUTER JOIN DataSource ON (DataSourceGroup.DataSourceID = DataSource.DataSourceID) ' +
        ' LEFT OUTER JOIN DataField ON (DataField.DataFieldID = EquationDataPresort.DataFieldID)' +
        ' LEFT OUTER JOIN scnFields as scF1 ON (scF1.DataFieldID = EquationDataPresort.DataFieldID AND scF1.`scenarioID` =  ' + self._config.defaultScenarioId + ' ) ' +
        ' LEFT OUTER JOIN scnFields as scF2 ON (scF2.DataFieldID = EquationDataPresort.DataFieldID AND scF2.`scenarioID` = (SELECT scnScenarios.id from scnScenarios WHERE scnScenarios.name = "default")) ' +
        ' WHERE LRU.LRUID = '+ lruId +' AND EquationDataPresort.`DataSourceGroupID` > -1 AND EquationDataPresort.EQID = -1 ) EquationDataPresort ' +
        ' LEFT JOIN LRU AS lru_t ON (lru_t.LRUID = '+ lruId +') ' +
        ' LEFT JOIN LRU_tar AS lru_tar ON (lru_tar.LRU_ID = '+ lruId +') ' +
        ' LEFT JOIN SYS_LRU AS sys_lru ON (sys_lru.LRU_ID = '+ lruId +') ' +
        ' GROUP BY lru'

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  formatPayload: function (lruId) {
    let self = this

    return new Promise(function (resolve, reject) {
      self.getPayload(lruId).then(function (lruResult) {
        let lru_data = []
        let lru_data_bits = []

        if (lruResult[0] && lruResult[0]['data_source']) {
          let data_source_collection = lruResult[0]['data_source'].split('@')
          let data_field_collection = lruResult[0]['data_field'].split('@')

          for (let i = 0, len = data_source_collection.length; i < len; i++) {
            let data_source = data_source_collection[i].split('~')
            lru_data_bits = []
            if (lruResult[0]['data_field']) {
              for (let j = 0, len = data_field_collection.length ; j < len; j++) {
                let data_field = data_field_collection[j].split('~')
                if(data_field[0] == data_source[0]){
                  lru_data_bits.push(
                    {
                      "label": data_field[1],
                      "from": data_field[2],
                      "to": data_field[3]
                    }
                  )
                }
              }
            }
            lru_data.push(
              {
                "label": data_source[2] + ' ' + data_source[3],
                "fieldid": ''+data_source[0],
                "identifier": ''+data_source[1],
                "stopBit": ''+data_source[2],
                "bits": lru_data_bits
              }
            )
          }
          resolve({
            type: 'Data Reader',
            target: 'lrusysdatareader',
            label: lruResult[0]['lru_name'],
            lrus: [
              {
                lru: lruResult[0]['lru_label'],
                data : lru_data
              }
            ]
          })
        } else {
          resolve({})
        }
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }
})

module.exports = ViewLruSysDataReaderModel
