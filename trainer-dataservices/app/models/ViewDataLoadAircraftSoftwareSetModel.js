const _ = require('lodash')
const db = require('../services/dbManager');
const config = require('../config/config.js')
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewDataLoadAircraftSoftwareSetModel = ({
  _config: Object.assign(config, {}),
  payload: {
    componentName: 'loadaircraftsoftwareset',
    header: _nav.dataLoaderSubpagesHeader(),
    title: 'Load Aircraft Software Set',
    detailsHeader: 'Software Set Details',
    headerLeft: 'Target/LRU',
    headerRight: 'Data/Software',
    softwareSetSelectLabel: 'Select Aircraft <br>Software Set',
    databasesOptionsSelectLabel: 'Loading of Databases <br>and Documents/Tables',
    databasesOptionsList: [
      { label: 'Load New else Reload Installed', id: 0, selected: true }
    ],
    data: {
      items: [
      ]
    },
    errors: [
    ]
  },

  returnPayload: function (req) {
    let self = this
    let stickName = req.query.usb

    return new Promise(function (resolve, reject) {
      self.formatPayload(stickName).then(function (result) {
        self.payload.data.items = result
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function (stickName) {
    let self = this
    //stick name for software is  USB-1
    if(!stickName || stickName === ''){
      stickName = '%'
    }

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT Id, StickName, FileName, navdoc, TargetLRU, TargetLRUname ' +
        ' FROM IMSusbSticks ' +
        ' WHERE StickName LIKE "' + stickName + '" ' +
        ' AND FileName LIKE "%FILES.LUM" ' +
        ' AND navdoc = 99 ' + // software = 99
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
        let formatted_item_data = []
        let promiseRecordTable = result.map(function (resource, i) {
          let record_row = resource['FileName'].split('/')

          let target_lru = resource['TargetLRUname'].split(',')

            let root_item = {
              itemName: record_row[0],
              selected: false,
              status: 'OK',
              data: target_lru
            }

            if (!formatted_item_data.find(item => item.itemName === record_row[0])) {
              formatted_item_data.push(root_item)
            }
        })
        formatted.push({ label: '1B0-304B-LR-APM-CFG',
        id: 0,
        selected: true,
        data: formatted_item_data
      })

        Promise.all(promiseRecordTable).then(function(){
          console.log(formatted)
          resolve (formatted)
        })
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }
})

module.exports = ViewDataLoadAircraftSoftwareSetModel
