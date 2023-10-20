const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewUtilityChangeAcftLifeCycleDataModel = ({

  payload: {
    title: 'Change Automatically Initiated Reports',
    parentComponentName: 'utilityfunctions',
    componentName: 'changeautomaticallyinitiatedreports',
    header: _nav.utilMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    data: {
      items: [
        { label: 'PEM Pressed', id: '0', selected: true, trigger: 'Fault Messages (Condensed)', destination: 'Datalink' },
        { label: 'PEM Pressed', id: '1', selected: true, trigger: 'Flight Deck Effects (Condensed)', destination: 'Datalink' },
        { label: 'PEM Pressed', id: '2', selected: true, trigger: 'Fault Messages (Condensed)', destination: 'IMS USB' },
        { label: 'PEM Pressed', id: '3', selected: false, trigger: 'Flight Deck Effects (Condensed)', destination: 'IMS USB' },
        { label: 'Real Time Fault Trigger', id: '4', selected: false, trigger: 'Fault Messages (Condensed)', destination: 'AHMU Fault Msgs' },
        { label: 'FDE Trigger', id: '5', selected: true, trigger: 'Flight Deck Effects Inflight', destination: 'AHMU Fault Msgs' },
        { label: 'Real Time Trend Trigger', id: '6', selected: true, trigger: 'System Trends (Realtime)', destination: 'AHMU End of Flt' },
        { label: 'Maint_Flight_Leg_Increment_trigger', id: '7', selected: true, trigger: 'Service Messages (EOF)', destination: 'AHMU End of Flt' },
        { label: 'Engine_Start_WOW_trigger', id: '8', selected: false, trigger: 'LRU COnfig Data', destination: 'AHMU Sys Cfg' },
        { label: 'Engine_Start_WOW_trigger', id: '9', selected: true, trigger: 'System Strapping Data', destination: 'AHMU Sys Cfg' },
        { label: 'Engine_Start_WOW_trigger', id: '10', selected: true, trigger: 'System Config Data', destination: 'AHMU Sys Cfg' },
        { label: 'Maint_Flight_Leg_Increment_trigger', id: '11', selected: true, trigger: 'Life Cycle Data', destination: 'AHMU End of Flt' },
        { label: 'Maint_Flight_Leg_Increment_trigger', id: '12', selected: true, trigger: 'Fault Messages (EOF)', destination: 'AHMU End of Flt' },
        { label: 'Maint_Flight_Leg_Increment_trigger', id: '13', selected: true, trigger: 'Flight Deck Effects (EOF)', destination: 'AHMU End of Flt' },
        { label: 'Real Time Fault Trigger', id: '14', selected: true, trigger: 'Fault Messages (Real Time)', destination: 'AHMU End of Flt' },
        { label: 'Real Time FDE Trigger', id: '15', selected: true, trigger: 'Flight Deck Effects (Real TIme)', destination: 'AHMU End of Flt' },
        { label: 'Real Time Service Trigger', id: '16', selected: true, trigger: 'Service Messages (Real Time)', destination: 'AHMU End of Flt' },
        { label: 'Real Time Exc Trigger', id: '17', selected: true, trigger: 'System Exceedances (Real Time)', destination: 'AHMU End of Flt' }
      ]
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve) {
      resolve(self.payload)
    })
  }

})

module.exports = ViewUtilityChangeAcftLifeCycleDataModel
