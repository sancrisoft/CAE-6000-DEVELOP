/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import deleteStoredMaintenanceData from '@/components/trainer/oms/maintMenuSections/utilityFunctions/delete-stored-maintenance-data'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/utilityFunctions/delete-stored-maintenance-data.vue', () => {
  let store
  let wrapper
  let actions = {
    'appContext/omsViewPort/updateComboSelection': sinon.spy()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            dataTypeComboLabel: 'Data Type',
            dataTypeCombo: [
              {label: 'Fault Messages FDEs', id: 0, key: 'fault/fdes', selected: 1},
              {label: 'Service Messages', id: 1, key: 'messages', selected: 0},
              {label: 'System Exceedances', id: 2, key: 'exceedances', selected: 0},
              {label: 'System Trends', id: 3, key: 'trends', selected: 0},
              {label: 'User ACMS data', id: 2, key: 'acms', selected: 0}
            ]
          }
        }
      },
      actions
    })

    wrapper = mount(deleteStoredMaintenanceData, {
      store
    })
  })

  afterEach(() => {
  })

  it('should show Data Type Combo', () => {
    let form = wrapper.find('.selectorForm')[0]
    let label = form.find('.oms-select-label')[0]
    expect(label.text()).to.equal('Data Type')
  })

  it('should show combo selected item', () => {
    let form = wrapper.find('.selectorForm')[0]
    let selected = form.find('.select-panel-list.selected')[0]
    expect(selected.text()).to.equal('Fault Messages FDEs')
  })

  it('should show confirm selection panel when deleting', () => {
    let deleteBtn = wrapper.find('.deleteBtn')[0]
    deleteBtn.trigger('click')
    expect(wrapper.data().confirmPanel).to.be.true
  })
})
