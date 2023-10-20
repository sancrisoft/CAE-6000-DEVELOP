/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import progressPanel from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/progress-panel'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/utilityFunctions/components/progress-panel.vue', () => {
  let store
  let wrapper
  let emitSpy
  let offSpy
  let clock
  let resetSpy

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    let actions = {
      'appContext/changeTailNumber': sinon.spy(),
      'appContext/deleteMaintenanceData': sinon.spy()
    }

    let getters = {
      'appContext/omsViewPort/getViewComboSelectedState': sinon.spy()
    }

    let propsData = {
      actionType: '',
      inputValue: 'newValue'
    }

    resetSpy = sinon.spy(progressPanel.methods, 'reset')
    store = new Vuex.Store({
      state: {},
      propsData,
      actions,
      getters
    })
    wrapper = shallow(progressPanel, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
    resetSpy.restore()
  })

  it('should show progress panel until reaching completion', () => {
    wrapper.vm.submit()
    expect(wrapper.vm.actionType).to.equal('changeTailNumber')
  })

  it('should update tail number', () => {
    wrapper.vm.submit()
    wrapper.vm.transferCompletedRatio = 100
    wrapper.update()

    clock.tick(1500)
    expect(wrapper.vm.actionType).to.equal('changeTailNumber')
  })

  it('should update tail number', () => {
    wrapper.vm.submit()
    wrapper.vm.transferCompletedRatio = 100
    wrapper.vm.actionType = 'changeTailNumber'
    wrapper.update()

    clock.tick(1500)
    expect(wrapper.vm.actionType).to.equal('changeTailNumber')
  })

  it('should delete Maintenance Data', () => {
    wrapper.vm.submit()
    wrapper.vm.transferCompletedRatio = 100
    wrapper.vm.actionType = 'deleteMaintenanceData'
    wrapper.update()

    clock.tick(1500)
    expect(wrapper.vm.actionType).to.equal('deleteMaintenanceData')
  })
})
