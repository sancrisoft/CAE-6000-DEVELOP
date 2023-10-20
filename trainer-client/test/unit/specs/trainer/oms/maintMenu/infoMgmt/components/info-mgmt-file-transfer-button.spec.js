/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import fileTransferButton from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-file-transfer-button'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/doscMaintMenu/infoMgmt/backup-media-sets.vue', () => {
  let store
  let wrapper
  let setBtnStateSpy
  let emitSpy
  let transferFilesSpy
  let filesToTransferList

  beforeEach(() => {
    let actions = {
      'appContext/setContextMenuSelectedItem': sinon.spy()
    }

    filesToTransferList = [
      { file: '_EXCEEDENCES_10Nov17174246$6348583337', fileName: 'SIM1_EXCEEDENCES_10Nov17174246$6348583337', selected: true },
      { file: '_EXCEEDENCES_10Nov17193626$6348584019', fileName: 'SIM1_EXCEEDENCES_10Nov17193626$6348584019', selected: false }
    ]

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            filesToTransferList: filesToTransferList
          }
        }
      },
      actions
    })

    setBtnStateSpy = sinon.spy(fileTransferButton.methods, 'setBtnState')
    transferFilesSpy = sinon.spy(fileTransferButton.methods, 'transferFiles')
    wrapper = mount(fileTransferButton, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
    setBtnStateSpy.restore()
    transferFilesSpy.restore()
  })

  it('should transfer files', () => {
    let transferBtn = wrapper.find('.btn')[0]
    transferBtn.trigger('click')
    expect(transferFilesSpy.called).to.be.true
  })

  it('should reset fileTransferState when selected files', () => {
    filesToTransferList[0].selected = false
    wrapper = mount(fileTransferButton, { store })

    wrapper.vm.transferFiles()

    expect(setBtnStateSpy.called).to.be.true
    expect(wrapper.vm.transferring).to.be.false
    expect(wrapper.vm.complete).to.be.false
  })

  it('should set file Transfer button State', () => {
    wrapper.vm.$bus.$emit('fileTransferState', {
      transferring: true,
      complete: false
    })
    expect(setBtnStateSpy.called).to.be.true
  })

  it('should cancel transfer', () => {
    wrapper.vm.cancelTransfer()
    expect(wrapper.vm.transferring).to.be.false
    expect(wrapper.vm.complete).to.be.false
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
    })
  })
})
