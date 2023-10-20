const _ = require('lodash')
const db = require('../services/dbManager');
const config = require('../config/config.js')

const USBStickModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'USB Stick Data',
    componentName: 'usbstickdata',
    data: {
      items: [
      ]
    }
  },

  returnPayload: function (req) {
    let self = this
    let stickName = req.query.usb

    return new Promise(function (resolve, reject) {
      self.formatPayload(stickName).then(function (result) {
        self.payload.data = result
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function (stickName) {
    let self = this

    if(!stickName || stickName === ''){
      stickName = '%'
    }

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT Id, StickName, FileName, navdoc, TargetLRU, TargetLRUname ' +
        ' FROM IMSusbSticks ' +
        ' WHERE StickName LIKE "' + stickName + '" ' +
        ' AND FileName LIKE "%FILES.LUM" ' +
        ' ORDER BY FileName ASC '

        db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  formatPayload: function (stickName) {
    let self = this
    return new Promise(function (resolve, reject) {
      self.getPayload(stickName).then(function (result) {
        let formatted = []

        let promiseRecordTable = result.map(function (resource, i) {
          let record_row = resource['FileName'].split('/')

          let fileListName = record_row[0] + '_FILES.LUM'
          let fileSelected = false
          if(!stickName || stickName === ''){
            fileListName = record_row[0]
            fileSelected = true
          }

            let root_item = {
              file: record_row[0],
              selected: fileSelected,
              fileName: fileListName,
              childs: []
            }

            if (record_row.length > 2 ) {
              child_item = {
                file: record_row[1],
                selected: false,
                fileName: record_row[1] + '_FILES.LUM',
                childs: []
              }

              if (formatted.find(item => item.file === record_row[0])) {
                let ind = formatted.findIndex(item => item.file === record_row[0])
                formatted[ind].childs.push(child_item)
              }
              else {
                root_item.childs.push(child_item)
              }

            }

            if (!formatted.find(item => item.file === record_row[0])) {
              formatted.push(root_item)
            }
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

module.exports = USBStickModel
