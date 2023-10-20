const _ = require('lodash')
const config = require('../config/config');
const db = require('../services/dbManager');
const dateFormat = require('dateformat')

const USBDumpModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'USB Dump Data',
    componentName: 'usbdumpdata',
    data: {
      items: [
      ]
    }
  },

  returnPayload: function (req) {
    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload().then(function (result) {
        self.payload.data = result
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
      let sql = ' SELECT id, device, prefix, todayMinus, suffix ' +
        ' FROM IMSusbDump ' +
        ' ORDER BY id ASC '

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

        let promiseRecordTable = result.map(function (resource, i) {
          let recordDate = dateFormat((Date.now() - resource['todayMinus']), 'ddmmmyy')
            let recordFilename = resource['prefix'] + recordDate + resource['suffix']

            let root_item = {
              file: recordFilename,
              fileName: resource['device'] + '  ' + recordFilename,
              selected: true
            }

            formatted.push(root_item)

        })

        Promise.all(promiseRecordTable).then(function(){
          resolve (formatted)
        })
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }
})

module.exports = USBDumpModel
