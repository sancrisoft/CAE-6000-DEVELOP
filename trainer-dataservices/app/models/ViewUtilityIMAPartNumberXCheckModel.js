const _ = require('lodash')
const db = require('../services/dbManager');
const ConstantsModel = require('./ConstantsModel.js')
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const _editor = require('../models/EditorModel.js')
const config = require('../config/config.js')

const ViewUtilityIMAPartNumberXCheckModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'IMA Part Number Crosscheck Details',
    componentName: 'imapartnumbercrosscheckdetails',
    parentComponentName: 'utilityfunctions',
    header: _nav.utilMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    sortComboLabel: 'Sort by',
    sortCombo: [
      {label: 'ID Number', id: 0, key: 'systemId', selected: 1},
      {label: 'Status', id: 1, key: 'status', selected: 0}
    ],
    data: {
    }
  },

  returnPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)

    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload(p_options).then(function (result) {
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

  getPayload: function (p_options) {
    let self = this
    // if (req.query.editor) {
    this._config.editMode = true
    // }

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT id, displayid, name, status, apm_hw_pn, installed_hw_pn , apm_sw_pn, installed_sw_pn, crc1, crc2 ' +
        ' FROM IMAPartNUmberCrosscheckDetails ' +
        ' ORDER BY id ASC ;'

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  formatPayload: function (p_options) {
    let self = this
    return new Promise(function (resolve, reject) {
      self.getPayload(p_options).then(function (result) {
        let formatted = {}
        formatted.items = []

        for (let i in result) {
          formatted.items.push(
            {
              systemId: result[i]['displayid'],
              label: result[i]['name'],
              status: result[i]['status'],
              apmhwpn: result[i]['apm_hw_pn'],
              instaledhwpn: result[i]['installed_hw_pn'],
              apmswpn: { label: result[i]['apm_sw_pn'], crc: result[i]['crc1'] },
              instaledswpn: { label: result[i]['installed_sw_pn'], crc: result[i]['crc2'] }
            },
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

module.exports = ViewUtilityIMAPartNumberXCheckModel
