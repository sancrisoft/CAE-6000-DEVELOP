/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import utilityFunctions from '@/components/trainer/oms/maintMenuSections/utility-functions'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/utility-functions.vue', () => {
  let store
  let wrapper
  let actions = {
    'appContext/omsViewPort/updateComboSelection': sinon.spy(),
    'appContext/setContextMenuSelectedItem': sinon.spy(),
    'appContext/resetContextMenuSelectedChildItem': sinon.spy(),
    'appContext/omsViewPort/maintMenuFilterDataList': sinon.spy()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            title: 'Utility Functions',
            data: {
              items: {
                maintenanceDataTargets: [
                  { label: 'Change Aircraft Tail Number', target: 'changeacfttailnumber', enabled: 1, userType: 'user' },
                  { label: 'Change Aircraft Life Cycle Data', target: 'changeacftlifecycledata', enabled: 1, userType: 'user' },
                  { label: 'Change Automatically Initiated Reports', target: 'changeautomaticallyinitiatedreports', enabled: 1, userType: 'user' }
                ],
                maintenanceDataFiles: [
                  { label: 'Delete Stored Maintenance Data', target: 'deletestoredmaintenancedata', enabled: 1, userType: 'user' },
                  { label: 'Delete Maintenance Files', target: 'deletemaintenancefiles', enabled: 1, userType: 'user' },
                  { label: 'View Loaded Maintenance Files', target: 'viewloadedmaintenancefiles', enabled: 1, userType: 'user' },
                  { label: 'View IMA Part Number Crosscheck Details', target: 'imapartnumbercrosscheckdetails', enabled: 1, userType: 'admin' }
                ]
              }
            }
          }
        }
      },
      actions
    })

    wrapper = shallow(utilityFunctions, {
      store
    })
  })

  afterEach(() => {
  })

  it('should show admin item when entering pasword Collins', () => {
    wrapper.vm.showUtilities()
    wrapper.update()
    expect(wrapper.vm.filteredMaintenanceDataFiles.length).to.equal(4)
  })

  it('should filter out admin items when entering password MAINT', () => {
    wrapper.vm.showUtilities('user')
    wrapper.update()
    expect(wrapper.vm.filteredMaintenanceDataFiles.length).to.equal(3)
  })
})
