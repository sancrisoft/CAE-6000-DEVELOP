const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewSystemParametersModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'System Parameters',
    componentName: 'systemparameters',
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    parameterGroupComboLabel: 'Parameter Group',
    parameterGroupCombo: [],
    data: {
      parameters: [
      ]
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload().then(function (result) {
        self.payload.parameterGroupCombo = result.group
        self.payload.data.parameters = result.data
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
      let sql = 'SELECT sp.SystemParameterID, sp.SystemParameterGroupID as group_id, spg.SystemParameterGroup, spg.OrderIndex as group_index, ' +
      ' sp.Name, sp.VariableID, sp.Units, sp.OrderIndex as param_index, spv.id, spv.value, spv.scenarioID ' +
      ' FROM SystemParameter AS sp ' +
      ' INNER JOIN SystemParameterGroup AS spg ' +
      ' ON sp.SystemParameterGroupID = spg.SystemParameterGroupID ' +
      ' LEFT JOIN scnSystemParametersVariables AS spv ' +
      ' ON sp.VariableID = spv.VariableID ' +
      ' AND spv.scenarioID =   ' + self._config.defaultScenarioId + ' ' +
      ' ORDER BY spg.OrderIndex ASC, sp.OrderIndex ASC '

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
        formatted.data = []
        formatted.group = []

        for (let i in result) {
          if( !formatted.group.find (item => item.id === result[i]['group_id']+'' ) ) {
            console.log('found group:' + result[i]['SystemParameterGroup'])

            formatted.group.push(
              {
                id: result[i]['group_id']+'' ,
                label: result[i]['SystemParameterGroup']+'',
                selected: (result[i]['group_index'] == 0) ? 1 : 0
              }
            )
          }
            let param = (result[i]['value'] !== null ) ? result[i]['value'] : '0.0000'
          formatted.data.push(
            {
              id: i,
              name: result[i]['Name'],
              value: '' + param + '',
              type: '' + result[i]['group_id'] + '',
              uom: result[i]['Units']+''
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

module.exports = ViewSystemParametersModel
