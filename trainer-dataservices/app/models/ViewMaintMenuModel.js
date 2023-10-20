const _ = require('lodash')
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewFlightDeckEffectsModel = require('../models/ViewFlightDeckEffectsModel.js')
const ViewFaultMessagesModel = require('../models/ViewFaultMessagesModel.js')
const ViewServiceMessagesModel = require('../models/ViewServiceMessagesModel.js')
const ViewSystemExceedancesModel = require('../models/ViewSystemExceedancesModel.js')

const ViewMaintMenuModel = ({

  payload: {
    componentName: 'maintmenu',
    header: _nav.defaultMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    data: {
      main: [
        { label: 'View Flight Deck Effects', target: 'flightDeckEffects', enabled: 1, messages: { label: 'Actives', value: ' 7' } },
        { label: 'View Fault Messages', target: 'faultMessages', enabled: 1, messages: { label: 'Actives', value: ' 3' } },
        { label: 'View Service Messages', target: 'servicesMessages', enabled: 1, messages: { label: 'Actives', value: ' 3' } },
        { label: 'View System Exceedances', target: 'systemExceedances', enabled: 1, messages: { label: 'Stored', value: ' 4' } },
        { label: 'View System Trends', target: 'systemTrends', enabled: 1, messages: {} },
        { label: 'View Aircraft Life Cycle Data', target: 'aircraftLifeCycle', enabled: 1, messages: {} },
        { label: 'View System Parameters', target: 'systemParameters', enabled: 1, messages: {} },
        { label: 'Perform LRU/System Operations', target: 'lruSysOperations', enabled: 1, messages: {} },
        { label: 'View System Configuration Data', target: 'systemConfig', enabled: 1, messages: {} },
        { label: 'Write Maintenance Reports', target: 'maintReports', enabled: 1, messages: {} }
      ],
      utility: [
        { label: 'Utility Functions', target: 'utilityFunctions', enabled: 1 }
      ]
    }
  },

  returnPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)

    let self = this

    let reduceActive = (items) => {
      return _.reduce(items, function(count, item) {
        return count + (item.active ? 1 : 0)
      }, 0)
    }

    return new Promise(function (resolve, reject) {
      Promise.all([
        ViewFlightDeckEffectsModel.returnPayload(
          Object.assign(p_options, {
            reduceCallback: function (result) {
              return reduceActive(result.items)
            }
          })
        ),
        ViewFaultMessagesModel.returnPayload(
          Object.assign(p_options, {
            reduceCallback: function (result) {
              return reduceActive(result.items)
            }
          })
        ),
        ViewServiceMessagesModel.returnPayload(
          Object.assign(p_options, {
            reduceCallback: function (result) {
              return reduceActive(result.items)
            }
          })
        ),
        ViewSystemExceedancesModel.returnPayload(
          Object.assign(p_options, {
            reduceCallback: function (result) {
              return result.items.length
            }
          })
        )
      ]).then(
        (results) => {
          // Replace hard-coded message values with payload results, assuming order of promises match items in the original payload.
          for (let i = 0; i < results.length; i++) {
            self.payload.data.main[i].messages.value = results[i].data;
          }

          resolve(self.payload)
        },
        (err) => {
          console.log(err)
          reject(err)
        }
      )
    })
  }

})

module.exports = ViewMaintMenuModel
