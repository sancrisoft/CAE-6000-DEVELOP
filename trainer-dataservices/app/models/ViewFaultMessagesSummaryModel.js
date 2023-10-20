const db = require('../services/dbManager');
const ConstantsModel = require('./ConstantsModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const LruModule = require('../modules/LruModule.js')

const ViewFaultMessagesSummaryModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Fault Messages Summary',
    parentComponentName: 'faultMessages',
    componentName: 'faultMessagesSummary',
    header: {
      maintMenuSectionsVisibility: true,
      viewBackBtnLabel: 'Return To<br> Fault MSGS',
      viewBtnVisible: false,
      viewBackBtnVisible: true
    },
    eicasMessages: _eicas.getEICAS(),
    data: {

    }
  },

  returnPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)
    let self = this

    console.log(p_options)

    if(p_options.originating === 'flightDeckEffects') {
      this.payload.header.viewBackBtnLabel = 'Return<br>To FDES'
      this.payload.parentComponentName = 'flightDeckEffects'
    }

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
      let sql = 'SELECT Equation.EQID as eqid, Equation.LRUID as lruid, FaultCode as faultCode, Details as details, ATAChapter.`ChapterNum` as ata, dataTime as date_time, fligthLegCounter, fligthLeg, fligthPhase, status, occurences, Equation.`EqDesc` as description, scenarioID, scnFaults.id as id, ' +
        ' (SELECT COUNT(fault_id)  FROM scnFdeLinkFault  WHERE scnFdeLinkFault.`fault_id`= scnFaults.id and scnFdeLinkFault.`scenario_id` = ' + (p_options.id || self._config.defaultScenarioId) + ' )  as numberOfFDEs ' +
        'FROM scnFaults ' +
        ' INNER JOIN Equation ON scnFaults.eqid = Equation.EQID ' +
        ' INNER JOIN LRU ON Equation.`LRUID` = LRU.`LRUID` ' +
        ' INNER JOIN `LruType` ON LruType.`LruTypeId` = LRU.`LRUTypeID` ' +
        ' INNER JOIN ATAChapter ON ATAChapter.`ATAChapterID` = LruType.AtaChapterId ' +
        ' WHERE scenarioID  = '  + (p_options.id || self._config.defaultScenarioId) + ' '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  getFDEsPayload: function (p_options) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT Equation.EQID as eqid  , FDECategoryDesc as category , FDECategory.FDECategoryID as order_id, ' +
        ' FaultCode, Details ,date_time, ' +
        ' (SELECT COUNT(fde_id)  FROM scnFdeLinkFault  WHERE scnFdeLinkFault.`fde_id`= scnFdes.id and scnFdeLinkFault.`scenario_id` = ' + (p_options.id || self._config.defaultScenarioId) + ' )  as numberOfFaults ,  ' +
        ' fligthLegCounter,Equation.`EqDesc` as name,flightLeg,flightPhase,status,occurences,Equation.`Details` as description, scenarioID, scnFdes.id as id  ' +
        ' FROM scnFdes ' +
        ' INNER JOIN Equation ON scnFdes.eqid = Equation.EQID ' +
        ' INNER JOIN FDEEquation on  FDEEquation.EqID = Equation.EQID ' +
        ' INNER JOIN FDECategory on  FDECategory.`FDECategoryID` = FDEEquation.`FDECategoryID` ' +
        ' INNER JOIN scnFdeLinkFault ON scnFdeLinkFault.fde_id = scnFdes.id ' +
        ' WHERE scenarioID  = ' + (p_options.id || self._config.defaultScenarioId) +
        ' AND scnFdeLinkFault.fault_id = ' + p_options.store.fault + ''

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
        let formatted = {}

        for (let i in result) {
          // Identify the correct fault.
          if (CoreUtil.isEquivalentString(result[i]['id'], p_options.data.id)) {
            // Store details of the fault.
            formatted = {
              id: result[i]['id'],
              cas: result[i]['description'],
              active: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 0 : 1,
              desc: result[i]['details'],
              historical: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 1 : 0,
              totalFDEs: result[i]['numberOfFDEs'],
              ata: result[i]['ata'],
              date: result[i]['date_time'],
              fault: {
                code: result[i]['faultCode'],
                desc: result[i]['details']
              },
              msgData: [],
              lruData: [],
              fdeData: []
            }

            if (result[i]['numberOfFDEs'] !== 0) {
              // Store id for use in getFDEsPayload().
              p_options.store.fault = result[i]['id'];

              await self.getFDEsPayload(p_options).then(function (result2) {
                for (let j in result2) {
                  formatted.fdeData.push(
                    {
                      id: result2[j]['id'],
                      target: 'flightDeckEffectsSummary',
                      cas: result2[j]['name'],
                      active: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 0 : 1,
                      historical: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 1 : 0,
                      category: result2[j]['category'],
                      totalFaults: result2[j]['numberOfFaults'],
                      flightLeg: result2[j]['flightLeg'],
                      date: result2[j]['date_time']
                    }
                  )
                }
              }, function (err) {
                console.log(err)
                reject(err)
              })
            }

            await LruModule.formatLruData(result[i]['eqid'], { contextType: LruModule._constants.contextType.faultmessages, contextId: formatted.id }).then(function (lruDataObj) {
              formatted.msgData = lruDataObj.lruDataNonZero
              formatted.lruData = lruDataObj.lruData
            }, function (err) {
              console.log(err)
              reject(err)
            })

            resolve(formatted)
            return
          }
        }
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }

})

module.exports = ViewFaultMessagesSummaryModel
