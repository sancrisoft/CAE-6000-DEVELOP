/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import fileTransferPanel from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-file-transfer-panel'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/doscMaintMenu/infoMgmt/components/file-transfer-panel', () => {
  let store
  let actions
  let wrapper
  let emitSpy
  let toggleSelectedSpy
  let setIntervalStub

  beforeEach(() => {
    actions = {
      'appContext/omsViewPort/removeInfoMgmtFileTransferSelectedFiles': sinon.spy(),
      'appContext/omsViewPort/toggleInfoMgmtViewSelectedFileToTransfer': sinon.spy()
    }
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            fileTransferMessage: 'IMS to USB device',
            fileTransferMessagesList: ['IMS to USB device', 'USB device to IMS'],
            filesToTransferList: [
              { file: '_EXCEEDENCES_10Nov17174246$6348583337', fileName: 'SIM1     _EXCEEDENCES_10Nov17174246$6348583337', selected: true },
              { file: '_EXCEEDENCES_10Nov17193626$6348584019', fileName: 'SIM1     _EXCEEDENCES_10Nov17193626$6348584019', selected: true }
            ]
          }
        }
      },
      actions
    })
    toggleSelectedSpy = sinon.spy(fileTransferPanel.methods, 'toggleSelected')
    setIntervalStub = sinon.stub(global.window, 'setInterval').callsFake((func) => { return func })
    wrapper = mount(fileTransferPanel, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
    toggleSelectedSpy.restore()
    setIntervalStub.restore()
  })

  it('should transfer selected files', done => {
    let clock = sinon.useFakeTimers()
    wrapper.vm.$bus.$emit('transferFiles')
    clock.tick(1000)
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should reset when complete', done => {
    let clock = sinon.useFakeTimers()
    wrapper.vm.complete = true
    wrapper.update()
    wrapper.vm.$bus.$emit('transferFiles')
    clock.tick(1000)

    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should cancel file transfer', done => {
    wrapper.vm.$bus.$emit('cancelFileTransfer')

    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should toggle selected file', () => {
    let item = wrapper.find('.oms-scrollable-item')[0]
    item.trigger('click')
    expect(toggleSelectedSpy.called).to.be.true
  })
})
