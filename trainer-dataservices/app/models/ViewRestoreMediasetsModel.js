const _ = require('lodash')
const config = require('../config/config.js')
const _eicas = require('../models/EicasModel.js')
const _usbStick = require('../models/USBStickModel.js')

const ViewRestoreMediasetsModel = ({
  _config: Object.assign(config, {}),

  payload: {
    componentName: 'restoremediasets',
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

  returnPayload: function (req) {
    let self = this
    let stickName = 'USB-1'// req.query.usb

    return new Promise(function (resolve, reject) {
      self.formatPayload(stickName).then(function (result) {
        self.payload.filesToTransferList = result.default
        self.payload.data.filesToTransfer.tousb = result.default
        self.payload.data.usbdirectory = result.usb
        console.log(self.payload.filesToTransferList)
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
        _usbStick.formatPayload().then(function (result2) {
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
  }

})

module.exports = ViewRestoreMediasetsModel
