const _ = require('lodash')
const db = require('../services/dbManager');
const config = require('../config/config.js')
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewDataLoadNewDocumentsTablesModel = ({
  _config: Object.assign(config, {}),
  payload: {
    componentName: 'loadnewdocumentstables',
    header: _nav.dataLoaderSubpagesHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Load New Documents & Tables',
    detailsHeader: 'Documents & Tables Details',
    headerLeft: 'Document/Table',
    headerRight: 'Target/LRU',
    data: {
      items: []
    },
    errors: [
    ]
  },

  returnPayload: function (req) {
    let self = this
    let stickName = req.query.usb

    return new Promise(function (resolve, reject) {
      self.formatPayload(stickName).then(function (result) {
        self.payload.data.items = result.data
        self.payload.data.errors = result.errors
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function (stickName) {
    let self = this
    stickName = '%'

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT Id, StickName, FileName, navdoc, TargetLRU, TargetLRUname, inIMS ' +
        ' FROM IMSusbSticks ' +
        ' WHERE FileName LIKE "%FILES.LUM" ' +
        ' AND navdoc = 0 ' +
        ' AND inIMS = 1 ' +
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
        let formatted = {}
        formatted.data = []
        formatted.errors = []

        let promiseRecordTable = result.map(function (resource, i) {
          let record_row = resource['FileName'].split('/')

          let target_lru = resource['TargetLRUname'].split(',')

            let root_item = {
              itemName: record_row[0],
              id: resource['Id'],
              selected: false,
              status: 'OK',
              data: target_lru
            }
            let root_error = {
              itemName: record_row[0],
              type: target_lru,
              error: 'Target Not Responding - Ensure target is properly configured for data load operation, cycle power on target, and try again',
            }

            if (!formatted.data.find(item => item.itemName === record_row[0])) {
              formatted.data.push(root_item)
              formatted.errors.push(root_error)
            }
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

module.exports = ViewDataLoadNewDocumentsTablesModel

