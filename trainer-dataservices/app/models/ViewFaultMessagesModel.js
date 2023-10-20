const _ = require('lodash')
const db = require('../services/dbManager');
const ConstantsModel = require('./ConstantsModel.js')
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const _editor = require('../models/EditorModel.js')
const config = require('../config/config.js')

const ViewFaultMessagesModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Fault Messages',
    componentName: 'faultmessages',
    componentDetailsTarget: 'faultmessagessummary',
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    sortedData: [],
    viewComboLabel: 'View',
    viewCombo: [
      {label: 'Active Messages', id: 0, key: 'active', selected: 1},
      {label: 'Historical Messages', id: 1, key: 'historical', selected: 0},
      {label: 'All Messages', id: 2, key: 'all', selected: 0}
    ],
    sortComboLabel: 'Sort by',
    sortCombo: [
      {label: 'ATA', id: 0, key: 'cas', selected: 1},
      {label: 'Date & Time', id: 2, key: 'dateDesc', selected: 0},
      {label: 'Messages (Alphabetically)', id: 1, key: 'category', selected: 0}
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

  getPayload: function (p_options) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT Equation.EQID as eqid, Equation.LRUID as lruid, FaultCode as faultCode, Details as details, ATAChapter.ChapterNum as ata, ATAChapter.ChapterDesc as ata_name, dataTime as date_time, fligthLegCounter, fligthLeg, fligthPhase, status, occurences, Equation.`EqDesc` as name, scenarioID, scnFaults.id as id, ' +
        ' (SELECT COUNT(fault_id)  FROM scnFdeLinkFault  WHERE scnFdeLinkFault.`fault_id`= scnFaults.id and scnFdeLinkFault.`scenario_id` = ' + (p_options.id || self._config.defaultScenarioId) + ' )  as numberOfFDEs ' +
        ' FROM scnFaults ' +
        ' INNER JOIN Equation ON scnFaults.eqid = Equation.EQID ' +
        ' INNER JOIN LRU ON Equation.`LRUID` = LRU.`LRUID` ' +
        ' INNER JOIN `LruType` ON LruType.`LruTypeId` = LRU.`LRUTypeID` ' +
        ' INNER JOIN ATAChapter ON ATAChapter.`ATAChapterID` = LruType.AtaChapterId ' +
        ' WHERE scenarioID  = ' + (p_options.id || self._config.defaultScenarioId) + ''

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getATAPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT LRU.InstanceDesc as name, LRU.LRUID,  ATAChapter.ChapterNum as ATA_NUMBER,  ' +
        ' ATAChapter.ChapterDesc as ATA, LRU.`InstanceDesc` as LRU_NAME,  ' +
        ' SUBSTR(ATAChapter.ChapterNum, 1 ,2 ) as ATA_MAIN_NUMBER ' +
        ' FROM ATAChapter ' +
        ' INNER JOIN `LruType` ON LruType.`AtaChapterId` = ATAChapter.`ATAChapterID` ' +
        ' INNER JOIN LRU ON LRU.LRUTypeID = LruType.`LruTypeId`' +
        ' INNER JOIN Equation ON (Equation.`LRUID` = LRU.`LRUID`)  ' +
        ' ORDER BY ATA_MAIN_NUMBER ASC, LRU_NAME ASC '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }

        resolve(result)
      })
    })
  },

  getCASPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT EQID as eqid, EqDesc as name, LRUID as lruid ' +
        ' FROM Equation ' +
        ' WHERE EqDesc <> "" ' +
        ' AND LRUID <> 0 ' +
        ' ORDER BY EqDesc ASC '

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
          formatted.items.push(
            {
              id: result[i]['id'],
              eqid: result[i]['eqid'],
              cas: result[i]['name'],
              active: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 0 : 1,
              historical: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 1 : 0,
              totalFDEs: result[i]['numberOfFDEs'],
              ata: result[i]['ata'],
              ata_label: result[i]['ata'] + ' - ' + result[i]['ata_name'],
              flightLeg: result[i]['fligthLeg'],
              flightPhase: result[i]['fligthPhase'],
              status: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 0 : 1,
              occurences: result[i]['occurences'],
              date: result[i]['date_time']
            }
          )
        }

        self.getATAPayload().then(function (result2) {
          formatted.edit ={}
          formatted.edit['atas'] = []
          formatted.edit['lrus'] = []
          formatted.edit['faults'] = []

          let ataObj = {}
          let lruObj = {}

          let promisePayload = result2.map(function (resource, i) {
            ataObj[resource['ATA_NUMBER']] = {
              label: resource['ATA_NUMBER'] + ' - '+ resource['ATA'],
              key: resource['ATA_NUMBER']
            }

            if (resource['LRU_NAME'] && resource['LRU_NAME'] !== '') {
              lruObj[resource['LRUID']] = {
                label: resource['LRU_NAME'],
                ata: resource['ATA_NUMBER'],
                key: resource['LRUID']
              }
            }
          })

          formatted.edit['atas'] = Object.values(ataObj)
          formatted.edit['lrus'] = Object.values(lruObj)

          Promise.all(promisePayload).then(function(){

            self.getCASPayload().then(function (result3) {
              for (let j in result3) {
                formatted.edit.faults.push({
                  value: result3[j]['eqid'],
                  lruid: result3[j]['lruid'],
                  label: result3[j]['name']
                })
              }

              formatted.edit.phases = _editor.defaults.phases
              formatted.edit.occurences = _editor.defaults.occurences
              formatted.edit.fls = _editor.defaults.fls

              resolve(formatted)

            }, function (err) {
              console.log(err)
              reject(err)
            })

          }).catch(function(err){
            console.log(err)
            reject(err)
          })
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

module.exports = ViewFaultMessagesModel
