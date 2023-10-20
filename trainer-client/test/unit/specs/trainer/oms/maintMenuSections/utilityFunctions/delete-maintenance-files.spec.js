/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import deleteMaintenanceFiles from '@/components/trainer/oms/maintMenuSections/utilityFunctions/delete-maintenance-files'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/utilityFunctions/delete-maintenance-files.vue', () => {
  let store
  let wrapper
  let actions = {
    'appContext/omsViewPort/updateComboSelection': sinon.spy()
  }
  let emitSpy
  let offSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            parentComponentName: 'target',
            fileTypeComboLabel: 'File Type',
            fileTypeCombo: [
              {label: 'Test & Riggin Files', id: 0, key: 'test/rigging', selected: 1},
              {label: 'User AMCS Table', id: 1, key: 'amcs', selected: 0}
            ]
          }
        }
      },
      actions
    })

    wrapper = mount(deleteMaintenanceFiles, {
      store
    })
    offSpy = sinon.spy(wrapper.vm, '$off')
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
  })

  it('should show FileType Combo', () => {
    let form = wrapper.find('.selectorForm')[0]
    let label = form.find('.oms-select-label')[0]
    expect(label.text()).to.equal('File Type')
  })

  it('should show combo selected item', () => {
    let form = wrapper.find('.selectorForm')[0]
    let selected = form.find('.select-panel-list.selected')[0]
    expect(selected.text()).to.equal('Test & Riggin Files')
  })

  it('should show confirm selection panel when deleting', () => {
    let deleteBtn = wrapper.find('.deleteBtn')[0]
    deleteBtn.trigger('click')
    expect(wrapper.data().confirmPanel).to.be.true
  })

  it('should set availability state', () => {
    wrapper.vm.setAvailabilityState(true)
    expect(wrapper.vm.availabilityState).to.be.true
  })

  it('should set backBtn target to parentComponentName', done => {
    wrapper.vm.viewBackBtnClicked()
    Vue.nextTick(() => {
      expect(emitSpy.args[0][1].view).to.equal('target')
      done()
    })
  })

  it('should destroy events', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })
})
