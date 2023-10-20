const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewLicenceMgmtModel = ({

  _config: Object.assign(config, {}),

  payload: {
    componentName: 'licencemgmt',
    pageCounter: true,
    header: _nav.defaultMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    data: {
      activationNo: '4CXCR9',
      licences: [
      ]
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload().then(function (result) {
        self.payload.data.licences = result
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
      let sql = ' SELECT id , type, part, status, description ' +
        ' FROM IMSlicenseMgmt ' +
        ' ORDER BY status DESC, type ASC '

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
          formatted.push(
            {
              typeNo: result[i]['type'],
              type: result[i]['description'],
              partNo: result[i]['part'],
              status: result[i]['status']
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

module.exports = ViewLicenceMgmtModel

