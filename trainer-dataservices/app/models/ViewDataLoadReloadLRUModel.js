const _ = require('lodash')
const db = require('../services/dbManager');
const config = require('../config/config.js')
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewDataLoadReloadLRUModel = ({

  _config: Object.assign(config, {}),
  payload: {
    componentName: 'reloadlru',
    header: _nav.dataLoaderSubpagesHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Reload LRU',
    detailsHeader: 'LRU Details',
    errorsHeader: 'Load Error Summary',
    headerLeft: 'Target/LRU',
    headerRight: 'Data/Software',
    startLoadTxt: 'Initializing LRUs Please wait',
    data: {
      items:[]
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

    if(!stickName || stickName === ''){
      stickName = '%'
    }

    return new Promise(function (resolve, reject) {
      let sql = ' SELECT Id, Missing, FileName, navdoc, TargetLRU, TargetLRUname ' +
        ' FROM IMSsoftware ' +
        ' WHERE FileName LIKE "%FILES.LUM" ' +
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
        formatted.errors= []

        let promiseRecordTable = result.map(function (resource, i) {
          let record_row = resource['FileName'].split('/')
          let lru_list = resource['TargetLRUname'].split(',')
          let record_length = record_row.length
          let missing = resource['Missing'] === 'OM' ? '[OPTIONAL, MISSING]' : ''

          for( k=0; k<lru_list.length; k++ ){
            if (lru_list[k] !== '' ) {
              if (!formatted.data.find(item => item.itemName === lru_list[k])) {

                let root_item = {
                  itemName: lru_list[k],
                  id: resource['Id'],
                  selected: false,
                  status: 'OK',
                  data: [{
                    info: record_row[record_length-2],
                    missing: missing
                  }]
                }
                let error_item = {
                  itemName: lru_list[k],
                  type: [record_row[record_length-2]],
                  error: 'Target Not Responding - Ensure target is properly configured for data load operation, cycle power on target, and try again',
                }

                formatted.data.push(root_item)
                formatted.errors.push(error_item)
              }
              else {
                console.log(formatted.data.find(item => item.itemName === lru_list[k]).data)
                formatted.data.find(item => item.itemName === lru_list[k]).data.push({ info: record_row[record_length-2], missing: missing })
              }
            }
          }
        })

        Promise.all(promiseRecordTable).then(function(){
          formatted.data = _.orderBy(formatted.data, 'itemName', 'asc')
          resolve (formatted)
        })
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }

})

module.exports = ViewDataLoadReloadLRUModel
