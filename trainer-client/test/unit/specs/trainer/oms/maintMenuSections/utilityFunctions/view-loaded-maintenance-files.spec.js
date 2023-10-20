/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import viewLoadedMaintenanceFiles from '@/components/trainer/oms/maintMenuSections/utilityFunctions/view-loaded-maintenance-files'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/utilityFunctions/delete-maintenance-files.vue', () => {
  let store
  let wrapper
  let actions = {
    'appContext/setContextMenuSelectedItem': sinon.spy(),
    'appContext/resetContextMenuSelectedChildItem': sinon.spy(),
    'appContext/omsViewPort/maintMenuFilterDataList': sinon.spy(),
    'appContext/omsViewPort/updateComboSelection': sinon.spy()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
          }
        }
      },
      actions
    })

    wrapper = shallow(viewLoadedMaintenanceFiles, {
      store
    })
  })

  afterEach(() => {
  })

  it('should show Name Column', () => {
    let header = wrapper.find('.static-table-header')[0]
    let columns = header.find('.text-shaded')
    expect(columns[0].text()).to.equal('Name')
  })

  it('should show Size Column', () => {
    let header = wrapper.find('.static-table-header')[0]
    let columns = header.find('.text-shaded')
    expect(columns[1].text()).to.equal('Size (KB)')
  })
})
