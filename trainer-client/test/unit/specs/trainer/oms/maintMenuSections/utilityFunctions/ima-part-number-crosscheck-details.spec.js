/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import imaPartNumberCrosscheckDetails from '@/components/trainer/oms/maintMenuSections/utilityFunctions/ima-part-number-crosscheck-details'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/maintMenuSections/utilityFunctions/ima-part-number-crosscheck-details.vue', () => {
  let store
  let wrapper
  let emitSpy

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
            items: [
              { systemId: '000',
                label: 'ID_000: F-IPC SLOT 7',
                status: 'Correct',
                apmhwpn: '822-2323-001',
                instaledhwpn: '822-2323-001',
                apmswpn: { label: '1B0-405A-ALLAFD-OPS', crc: '18E977F8' },
                instaledswpn: { label: '810-0260', crc: '18E977F8' }
              },
              {
                systemId: '001',
                label: 'ID_001: F-IPC SLOT 2',
                status: 'Unknown',
                apmhwpn: '822-1992-002',
                instaledhwpn: '822-1992-002',
                apmswpn: { label: '1B0-405A-F-IPC-02-OPS', crc: '19B82AD6' },
                instaledswpn: { label: '1B0-405A-F-IPC-02-OPS', crc: '19B82AD6' }
              }
            ]
          }
        }
      },
      actions
    })

    wrapper = shallow(imaPartNumberCrosscheckDetails, {
      store
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should sort by ID Number', () => {
    wrapper.vm.sortSelected(0)
    wrapper.update()
    expect(emitSpy.called).to.be.true
  })

  it('should sort by Status', () => {
    wrapper.vm.sortSelected(1)
    expect(emitSpy.called).to.be.true
  })
})
