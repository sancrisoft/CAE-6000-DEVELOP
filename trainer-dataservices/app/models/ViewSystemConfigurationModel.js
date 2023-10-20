const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewSystemConfigurationModel = ({

  _config: Object.assign(config, {
    apm : [
      '0111001000110101',
      '0010001000110101',
      '1111001000000100',
      '0110101010110101',
      '0010110000010001',
      '1001001000000100',
      '0111001000110101',
      '1001001000000100',
      '0111001011110101',
      '1100001001000100',
      '0111001000110101',
      '0111001000110101',
      '1101001000000100',
      '0010101000110101',
      '0110101010110101',
      '0010110000010001',
      '1001101000000100',
      '0111111000110101',
      '1001101000000100',
      '0111011010010101',
      '1100101001000100',
      '0010110000010001',
      '0111001000110101',
      '0010001000110101',
      '1111001000000100',
      '0110101010110101',
      '0010110000010001',
      '1001001000000100',
      '0111001000110101',
      '1001001000000100',
      '0111001011110101',
      '1100001001000100',
      '0111001000110101',
      '0111001000110101',
      '1101001000000100',
      '0010101000110101',
      '0110101010110101',
      '0010110000010001',
      '1001101000000100',
      '0111111000110101',
      '1001101000000100',
      '0111011010010101',
      '1100101001000100'

    ]
  }),

  payload: {
    title: 'System Configuration',
    componentName: 'systemconfig',
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    viewComboLabel: 'View',
    viewCombo: [
      {label: 'APM Configuration Option Partition', key: 'apmConfiguration', id: '0', selected: 0},
      {label: 'APM Third Party Parameters Partition', key: 'apmThirdParty', id: '1', selected: 0},
      {label: 'IMA Software Part Numbers ', key: 'softPartNumber', id: '2', selected: 1}
    ],
    data: {
      items: [
      ]
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload().then(function (result) {
        self.payload.data.items = result
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
      /* todo: fix the typo in DB and here too */
      let sql3p = 'SELECT id, description, leftAPM, rigthAPM as rightAPM' +
          ' FROM scnIMAthirdParty ' +
          ' WHERE scenarioID = ' + self._config.defaultScenarioId +
        ' ORDER BY id ASC ;'

      let sqlapm = 'SELECT id, description, word, bits, leftAPM, rigthAPM as rightAPM' +
        ' FROM scnAPMWordBits ' +
        // ' LEFT OUTER JOIN DataField ON DataField.DataFieldName LIKE scnAPMWordBits.description ' +
        ' WHERE scenarioID = ' + self._config.defaultScenarioId +
        ' ORDER BY id ASC, word ASC, bits ASC ;'

      let sql = 'SELECT id, type, position, cpn, main, sub ' +
        ' FROM IMASoftwarePartNumber ORDER BY id ASC ;'

      db.all(sql, [], (err, resultima) => {
        if (err) {
          return console.error(err.message)
        }
        db.all(sql3p, [], (err, result3p) => {
          if (err) {
            return console.error(err.message)
          }
          db.all(sqlapm, [], (err, resultapm) => {
            if (err) {
              return console.error(err.message)
            }

            let result = {
              apm3p : result3p,
              ima : resultima,
              apm : resultapm
            }
            resolve(result)
          })
        })
      })
    })
  },

  formatPayload: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      self.getPayload().then(function (result) {
        let formatted = []
        let pages = []
        let words = {}

        for (let i in result.apm){
          let word = result.apm[i]['word']

          if (!words.hasOwnProperty(word)) {
            words[word] = []
          }

          words[word].push({
            bits: result.apm[i]['bits'],
            label: result.apm[i]['description'],
            leftApm: result.apm[i]['leftAPM'],
            rightApm: result.apm[i]['rightAPM']
          })
        }

        for (w=0; w<Object.keys(words).length; w++) {
          pages.push(words[''+w])
        }

        for (let t=0; t <Object.keys(words).length; t++) {

          formatted.push(
            {
              id: t,
              value: (t < 10) ? '0'+ t : t,
              type: '0',
              leftAPM: self._config.apm[t],
              rightAPM: self._config.apm[t],
              details : {
                header: 'APM Word',
                item_index: (t),
                items: pages
              }
            })
        }

        for (let i in result.apm3p) {

          if (formatted.find(item => item.value === result.apm3p[i]['description']) &&
          (result.apm3p[i]['description'] === 'Aircraft Serial Number' || result.apm3p[i]['description'] === 'Aircraft Registration Number')) {
            let spacer = ''
            if (result.apm3p[i]['description'] === 'Aircraft Serial Number') {
              spacer = ' '
            }
            let ind = formatted.findIndex(item => item.value === result.apm3p[i]['description'])
            formatted[ind].leftApm = formatted[ind].leftApm + spacer + result.apm3p[i]['leftAPM']
            formatted[ind].rightApm = formatted[ind].rightApm + spacer + result.apm3p[i]['rightAPM']
          }
          else {
            formatted.push(
              {
                id: result.apm3p[i]['id'],
                value: result.apm3p[i]['description'],
                type: '1',
                leftApm: result.apm3p[i]['leftAPM'],
                rightApm: result.apm3p[i]['rightAPM']
              }
            )
          }

        }
        for (let i in result.ima) {

          formatted.push(
            {
              id: result.ima[i]['id'],
              name: result.ima[i]['type'],
              type: '2',
              position: result.ima[i]['position'],
              cpn: result.ima[i]['cpn'],
              details: {
                header: 'Electronic TSO Nameplate',
                items: [
                  result.ima[i]['main'] + '\\n\\nIncludes TSO approved SW for subsystems\\n\\n' + result.ima[i]['sub']
                ]
              }
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

module.exports = ViewSystemConfigurationModel
