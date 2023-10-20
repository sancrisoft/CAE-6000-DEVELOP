/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import cautionPanel from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/caution-panel'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/maintMenuSections/utilityFunctions/components/caution-panel.vue', () => {
  let store
  let wrapper
  let emitSpy
  let offSpy

  beforeEach(() => {
    let actions = {
      'appContext/setViewBackBtnOverride': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            componentName: 'aComponentName',
            header: {
              viewBackBtnLabel: 'Got to lrusySys...'
            }
          }
        }
      },
      actions
    })
    wrapper = mount(cautionPanel, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
  })

  it('should disable Write Maintenance Reports btn while in progress', done => {
    wrapper.vm.gotoMaintenanceReports()
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should destroy events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
