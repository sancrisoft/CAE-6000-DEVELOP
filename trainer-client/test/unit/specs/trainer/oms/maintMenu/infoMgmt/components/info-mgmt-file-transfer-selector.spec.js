/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import fileTransferSelector from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-file-transfer-selector'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/doscMaintMenu/infoMgmt/components/info-mgmt-file-transfer-selector', () => {
  let store
  let actions
  let wrapper
  let emitSpy

  beforeEach(() => {
    actions = {
      'appContext/omsViewPort/setInfoMgmtFileTransferSelectedFiles': sinon.spy(),
      'appContext/omsViewPort/resetInfoMgmtViewFilesToTransfer': sinon.spy(),
      'resetInfoMgmtViewFilesToTransfer': sinon.spy(),
      'appContext/getContent': sinon.spy()
    }
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            data: {
              fileTransferSelectorValue: 1
            }
          }
        }
      },
      actions
    })

    let propsData = {
      inbound: '',
      inboundValue: 1,
      outbound: '',
      outboundValue: 1,
      name: '',
      event: ''

    }
    wrapper = mount(fileTransferSelector, { store, propsData })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
    wrapper.vm.fileTransferSelectorValue = 1
  })

  it('should set fileTransferSelector to 0', () => {
    let selector = wrapper.find('#inbound')[0]
    selector.trigger('change')
    expect(emitSpy.called).to.be.true
  })

  it('should set fileTransferSelector to 1', () => {
    let selector = wrapper.find('#outbound')[0]
    selector.trigger('change')
    expect(emitSpy.called).to.be.true
  })

  it('should set filesToBeTransferred', done => {
    wrapper.vm.$bus.$emit('filesToBeTransferredChanged', { label: '' })
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })
})
