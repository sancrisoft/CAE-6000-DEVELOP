const _ = require('lodash')
const db = require('../services/dbManager');
const config = require('../config/config.js')
const _eicas = require('../models/EicasModel.js')
const _usbStick = require('../models/USBStickModel.js')
const _usbDump = require('../models/USBDumpModel.js')

const ViewManageFilesModel = ({
  _config: Object.assign(config, {}),

  payload: {
    componentName: 'managefiles',
    header: {
      viewBtnVisible: false,
      viewBackBtnLabel: 'Return to<br/>Info Management',
      viewBackBtnVisible: true
    },
    eicasMessages: _eicas.getEICAS(),
    fileTransferMessage: 'IMS to USB device', // default
    fileTransferMessagesList: ['IMS to USB device', 'USB device to IMS'],
    filesToTransferList: [],
    data: {
      filesToTransfer: {
        tousb: [],
        fromusb: []
      },
      usbdirectory: [] // _usbStick.getUSBDirectories('USB-1')
    }
  },

  returnPayload: function (p_options) {
    let self = this
    let stickName = 'USB-3'

    if ('query' in p_options && 'usb' in p_options.query){
      stickName = p_options.query.usb
    } else if ('usb' in p_options) {
      stickName = p_options.usb
    }

    if(p_options && p_options.action === 'addtoims' && p_options.data) {
      for (let item in p_options.data) {
        self.addToIMS(p_options.data[item].fileName)
      }
    }

    if(p_options && p_options.action === 'remfromims') {
      p_options.data.forEach( function(item) {
        self.RemoveFromIMS(item.fileName)
      })
    }

    return new Promise(function (resolve, reject) {
      self.formatPayload(stickName).then(function (result) {
        self.payload.filesToTransferList = result.default
        self.payload.data.filesToTransfer.tousb = result.default
        self.payload.data.usbdirectory = result.usb
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  formatPayload: function (stickName) {
    let self = this

    return new Promise(function (resolve, reject) {
      _usbStick.formatPayload(stickName).then(function (result) {
        let formatted = []
        formatted.usb = result
        _usbDump.formatPayload().then(function (result2) {
          formatted.default = result2
          resolve (formatted)
        }, function (err) {
          console.log(err)
          reject(err)
        })

      }, function (err) {
        console.log(err)
        reject(err)
      })

    }, function (err) {
        console.log(err)
        reject(err)
      })
  },

  addToIMS: function (fileName) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = ' UPDATE IMSusbSticks SET inIMS = 1 WHERE FileName LIKE "%'+ fileName +'" '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  RemoveFromIMS: function (fileName) {
    let self = this

    return new Promise(function (resolve, reject) {
      let sql = ' UPDATE IMSusbSticks SET inIMS = 0 WHERE FileName LIKE "%'+ fileName +'" '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })

  }

})

module.exports = ViewManageFilesModel
