/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import fileTransfer from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-file-transfer'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/doscMaintMenu/infoMgmt/components/file-transfer', () => {
  let store
  let wrapper
  let emitSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            fileTransferMessage: 'IMS to USB device',
            fileTransferMessagesList: ['IMS to USB device', 'USB device to IMS']
          }
        }
      }
    })
    wrapper = mount(fileTransfer, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should set File Loader State', done => {
    wrapper.vm.$bus.$emit('fileTransferState', {
      transferring: true,
      completedRatio: 0
    })
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should be completed', done => {
    wrapper.vm.$bus.$emit('fileTransferState', {
      transferring: true,
      completedRatio: 100
    })
    Vue.nextTick(() => {
      expect(wrapper.vm.transferCompleted).to.be.true
      done()
    })
  })
})
