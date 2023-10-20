/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import lruSysMaintenanceReportsBtn from '@/components/trainer/oms/maintMenuSections/components/lru-sys/components/lru-sys-maintenance-reports-btn'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/lru-sys/components/lru-sys-maintenance-reports-btn.vue', () => {
  let store
  let wrapper
  let emitSpy
  let actions = {
    'appContext/setViewBackBtnOverride': sinon.spy()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            componentName: 'aView',
            header: {
              viewBackBtnLabel: 'Return to ...'
            }
          }
        }
      },
      actions
    })

    wrapper = shallow(lruSysMaintenanceReportsBtn, {
      store
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should should override backBtn before switching to MaintenanceReport', () => {
    wrapper.vm.gotoMaintenanceReports()

    expect(actions['appContext/setViewBackBtnOverride'].called).to.be.true
    expect(emitSpy.called).to.be.true
  })
})
