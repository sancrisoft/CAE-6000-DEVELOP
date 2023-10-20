const _ = require('lodash')
const db = require('../services/dbManager');
const config = require('../config/config.js');

const USBSticksListModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'USB Sticks',
    componentName: 'usbsticks',
    data: {
      items: [
      ]
    }
  },

  returnPayload: function (p_options) {
    if (_.isUndefined(p_options)) {
      p_options = {}
    }

    let self = this
    // if (req.query.editor) {
    this._config.editMode = true
    // }

    return new Promise(function (resolve, reject) {
      self.formatPayload().then(function (result) {
        if (_.isFunction(p_options.reduceCallback)) {
          result = p_options.reduceCallback(result)
        }

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
      let sql = ' SELECT DISTINCT StickName ' +
        ' FROM IMSusbSticks ' +
        ' ORDER BY StickName ASC '

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
        let formatted = {}
        formatted.items = []
        for (let i in result) {
          formatted.items.push(result[i]['StickName'])
        }
        resolve (formatted)

      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }

})

module.exports = USBSticksListModel
