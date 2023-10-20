/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import sinon from 'sinon'
import { expect } from 'chai'
import maint from '@/components/trainer/oms/maintMenu/maint-menu'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenu/maint-menu.vue', () => {
  let actions
  let store
  let wrapper

  const _content = {
    main: [
      { label: 'View FlightDeck Effects', target: 'flightDeckEffects', messages: { label: 'Actives', value: 4 } },
      { label: 'View Fault Messages', target: 'faultMessages', messages: { label: 'Actives', value: 0 } },
      { label: 'View Service Messages', target: 'serviceMessages', messages: { label: 'Actives', value: 0 } },
      { label: 'View System Exceedances', target: 'systemExceedances', messages: { label: 'Actives', value: 0 } },
      { label: 'View System Trends', target: 'systemTrends', messages: {} },
      { label: 'View Aircraft Life Cycle Data', target: 'faultMessages', messages: {} },
      { label: 'View System Parameters', target: 'systemParameters', messages: {} },
      { label: 'View LRU/System Operations', target: 'lruSysOperations', messages: {} },
      { label: 'View System Configuration Data', target: 'systemConfig', messages: {} },
      { label: 'View System Maintenance Reports', target: 'maintReports', messages: {} }
    ],
    utility: [
      { label: 'View System Utility Functions', target: 'utilityFunctions' }
    ]
  }

  beforeEach(() => {
    actions = {
      'appContext/resetContextMenuSelectedChildItem': sinon.spy(),
      'appContext/setContextMenuSelectedItem': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appConfig: {
          mocked: true
        },
        appContext: {
          omsViewPort: {
            header: {},
            data: _content
          }
        }
      },
      actions
    })

    wrapper = shallow(maint, { store })
  })

  afterEach(() => {
  })

  it('should be defined', () => {
    expect(wrapper).to.not.be.undefined
  })
})
