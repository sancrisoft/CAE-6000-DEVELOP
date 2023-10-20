const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewDBStatusModel = ({

  _config: Object.assign(config, {}),

  payload: {
    componentName: 'dbstatus',
    pageCounter: true,
    header: _nav.defaultMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    data: {
      statuses: [

      ]
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload().then(function (result) {
        self.payload.data.statuses = result
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT ' +
        ' CASE ' +
        " WHEN ((todayMinus != 0 AND DATETIME('now') >= datetime('now','-'||todayMinus||' DAY')) AND (todayPlus != 0 AND DATETIME('now') <= datetime('now','+'||todayPlus||' DAY') )) " +
        " THEN 'CURRENT' ELSE statusPartNo  " +
        ' END AS status, ' +
        ' CASE ' +
        " WHEN todayMinus = 0 THEN '' ELSE date('now','-'||todayMinus||' DAY')  " +
        ' END AS begin,  ' +
        ' CASE  ' +
        " WHEN todayPlus = 0 THEN '' ELSE date('now','+'||todayPlus||' DAY')  " +
        ' END AS end,  ' +
        ' statusPartNo ,  ' +
        ' identifier,  ' +
        ' cycleInfo,  ' +
        ' IMSdbstatus.database as name ,  ' +
        ' todayMinus as beginAS3, ' +
        ' todayPlus as endAS3 , ' +
        ' ValidityPeriod as validityPeriod, ' +
        ' (SELECT count(*) FROM IMSdbstatus) as count  ' +
        ' FROM IMSdbstatus '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  formatPayload: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      self.getPayload().then(function (result) {
        let formatted = []
        for (let i in result) {
          let begin = result[i]['begin']
          let end = result[i]['validityPeriod'] === 'N/A' ? 'N/A' : result[i]['end']
          let statusPartNo = result[i]['statusPartNo']

          if (result[i]['statusPartNo'] == 'Not Current') {
            begin = '2019-09-01'
            end = '2019-09-14'
          }

          let ci = 'EFF: ' + begin + ' to  ' + end  + ' <br> ' +
          'EFF: ' + begin + ' to  ' + end  + ' '
          // 'EFF: '{(today - todayMinus - 86400000) - (todayMinus + todayPlus)} to {(today - todayMinus - 86400000)}
          formatted.push(
            {
              db: result[i]['name'],
              id: i,
              status: statusPartNo,
              begin: begin || '',
              end: end || '',
              // begin: '01NOV2016',
              // end: '01NOV2016',
              details: [
                { label: 'Identifier', value: result[i]['identifier'] },
                { label: 'Cycle Information',
                  value: ci // TODO: FORMAT THE CORRECT VALUES
                },
                { label: 'Coverage Region', value: 'World' }
              ]
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

module.exports = ViewDBStatusModel
