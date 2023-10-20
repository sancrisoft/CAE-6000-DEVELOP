const db = require('../services/dbManager');
const ConstantsModel = require('./ConstantsModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const LruModule = require('../modules/LruModule.js')

const ViewFlightDeckEffectsSummaryModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Flight Deck Effects Summary',
    parentComponentName: 'flightDeckEffects',
    componentName: 'flightDeckEffectsSummary',
    header: {
      maintMenuSectionsVisibility: true,
      viewBackBtnLabel: 'Return<br>To FDES',
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

  getFaultsPayload: function (p_options) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql =' SELECT Equation.EQID as eqid, Equation.LRUID as lruid, Equation.FaultCode as faultCode, Equation.Details as details, ' +
        ' ATAChapter.ChapterNum as ata, scnFaults.dataTime as date_time, scnFaults.fligthLegCounter, scnFaults.fligthLeg, scnFaults.fligthPhase, ' +
        ' scnFaults.status, scnFaults.occurences, Equation.EqDesc as name, scnFaults.scenarioID, scnFaults.id as id ' +
        ' FROM scnFaults ' +
        ' INNER JOIN Equation ON scnFaults.eqid = Equation.EQID ' +
        ' INNER JOIN LRU ON Equation.`LRUID` = LRU.`LRUID` ' +
        ' INNER JOIN `LruType` ON LruType.`LruTypeId` = LRU.`LRUTypeID` ' +
        ' INNER JOIN ATAChapter ON ATAChapter.`ATAChapterID` = LruType.AtaChapterId ' +
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

  formatPayload: function (p_options) {
    let self = this
    return new Promise(function (resolve, reject) {
      self.getPayload(p_options).then(async function (result) {
        let formatted = {}

        for (let i in result) {
          // Identify the correct FDE.
          if (CoreUtil.isEquivalentString(result[i]['id'], p_options.data.id)) {
            // Store details of the FDE.
            formatted = {
              id: result[i]['id'],
              cas: result[i]['name'],
              active: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 0 : 1,
              desc: result[i]['description'],
              historical: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 1 : 0,
              category: result[i]['category'],
              totalFaults: result[i]['numberOfFaults'],
              date: result[i]['date_time'],
              code: result[i]['FaultCode'],
              status: 1,
              faultMSGS: [],
              fdeData: []
            }

            if (result[i]['numberOfFaults'] !== 0) {
              // Store id for use in getFaultsPayload().
              p_options.store.fde = result[i]['id'];

              await self.getFaultsPayload(p_options).then(function (result2) {
                for (let j in result2) {
                  formatted.faultMSGS.push(
                    {
                      id: result2[j]['id'],
                      target: 'faultMessagesSummary',
                      cas: result2[j]['name'],
                      active: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 0 : 1,
                      historical: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 1 : 0,
                      ata: result2[j]['ata'],
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

            await LruModule.formatLruData(result[i]['eqid'], { contextType: LruModule._constants.contextType.flightdeckeffects, contextId: formatted.id }).then(function (lruDataObj) {
              formatted.fdeData = lruDataObj.lruData
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

module.exports = ViewFlightDeckEffectsSummaryModel
