/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import backupMediaSets from '@/components/trainer/oms/maintMenu/infoMgmt/backup-media-sets'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/doscMaintMenu/infoMgmt/backup-media-sets.vue', () => {
  let store
  let wrapper
  let emitSpy

  beforeEach(() => {
    let actions = {
      'appContext/omsViewPort/setInfoMgmtFileTransferSelectedFiles': sinon.spy(),
      'appContext/omsViewPort/setInfoMgmtfileTransferMessage': sinon.spy(),
      'appContext/omsViewPort/resetInfoMgmtViewFilesToTransfer': sinon.spy(),
      'resetInfoMgmtViewFilesToTransfer': sinon.spy(),
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/setSelectedView': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            filesToTransferList: [
              { file: '_EXCEEDENCES_10Nov17174246$6348583337', fileName: 'SIM1_EXCEEDENCES_10Nov17174246$6348583337', selected: true },
              { file: '_EXCEEDENCES_10Nov17193626$6348584019', fileName: 'SIM1_EXCEEDENCES_10Nov17193626$6348584019', selected: false }
            ],
            data: {}
          }
        }
      },
      actions
    })

    wrapper = mount(backupMediaSets, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should set fileTransferSelector to 0', done => {
    wrapper.vm.$bus.$emit('fileTransferSelectorChanged', '0')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should set filesToBeTransferred', done => {
    wrapper.vm.$bus.$emit('filesToBeTransferredChanged', { label: '' })
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })
})
