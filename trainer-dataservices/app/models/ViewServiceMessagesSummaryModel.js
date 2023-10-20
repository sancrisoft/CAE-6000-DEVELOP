const db = require('../services/dbManager');
const ConstantsModel = require('./ConstantsModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const LruModule = require('../modules/LruModule.js')

const ViewServiceMessagesSummaryModel = ({
  _config: Object.assign(config, {}),

  payload: {
    title: 'Service Messages Summary',
    parentComponentName: 'servicesMessages',
    componentName: 'servicesMessagesSummary',
    header: {
      maintMenuSectionsVisibility: true,
      viewBackBtnLabel: 'Return To<br> Service MSGS',
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
      let sql = 'SELECT DISTINCT scnMessages.eqid as eqid, Equation.LRUID as lruid, ' +
        ' (SELECT  count(DISTINCT scnMessages.eqid) FROM scnMessages WHERE scenarioID  = ' + (p_options.id || self._config.defaultScenarioId) + ' ) as count ,'+
        ' FaultCode as faultCode, Details as details, ATAChapter.`ChapterNum` as ata, dateTime as date_time, fligthLegCounter, fligthLeg, fligthPhase, status, occurences, Equation.`EqDesc` as description, scenarioID, scnMessages.id as id ' +
        ' FROM scnMessages ' +
        ' INNER JOIN Equation ON scnMessages.eqid = Equation.eqid ' +
        ' INNER JOIN LRU ON Equation.`LRUID` = LRU.`LRUID` ' +
        ' INNER JOIN `LruType` ON LruType.`LruTypeId` = LRU.`LRUTypeID` ' +
        ' INNER JOIN ATAChapter ON ATAChapter.`ATAChapterID` = LruType.AtaChapterId ' +
        ' WHERE scenarioID  =  '+ (p_options.id || self._config.defaultScenarioId) +
        ' '

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
          // Identify the correct service message.
          if (CoreUtil.isEquivalentString(result[i]['id'], p_options.data.id)) {

            formatted =
              {
                id: result[i]['id'],
                cas: result[i]['description'],
                active: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 0 : 1,
                desc: result[i]['details'],
                historical: (result[i]['status'] !== ConstantsModel.STATUS_ACTIVE) ? 1 : 0,
                ata: result[i]['ata'],
                date: result[i]['date_time'],
                fault: {
                  code: result[i]['faultCode'],
                  desc: result[i]['details']
                },
                msgData: [],
                lruData: []
              }

            await LruModule.formatLruData(result[i]['eqid'], { contextType: LruModule._constants.contextType.servicemessages, contextId: formatted.id,  useFakeBitsIfZero : true }).then(function (lruDataObj) {
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

module.exports = ViewServiceMessagesSummaryModel
