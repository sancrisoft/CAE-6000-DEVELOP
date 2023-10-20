/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import restoreMediaSets from '@/components/trainer/oms/maintMenu/infoMgmt/restore-media-sets'
import infoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/doscMaintMenu/infoMgmt/restore-media-sets.vue', () => {
  let store
  let wrapper
  let propsData
  let viewBackBtnClickedSpy
  let setFilesToBeTransferredSpy
  let offSpy

  beforeEach(() => {
    let actions = {
      'appContext/omsViewPort/setInfoMgmtViewFilesToTransfer': sinon.spy(),
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/setSelectedView': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            data: {
            }
          }
        }
      },
      actions
    })

    propsData = {}
    setFilesToBeTransferredSpy = sinon.spy(restoreMediaSets.methods, 'setFilesToBeTransferred')
    viewBackBtnClickedSpy = sinon.spy(infoMgmtBaseViewMixin.methods, 'viewBackBtnClicked')
    wrapper = mount(restoreMediaSets, { store, propsData })
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    viewBackBtnClickedSpy.restore()
    setFilesToBeTransferredSpy.restore()
    offSpy.restore()
  })

  it('should show No Data Available when data object is empty', () => {
    let noDataDisplay = wrapper.find('.no-data-display')
    console.log(noDataDisplay)

    expect(noDataDisplay.length).to.be.greaterThan(0)
  })

  it('should set filesToBeTransferred', done => {
    wrapper.vm.$bus.$emit('filesToBeTransferredChanged', {})
    Vue.nextTick(() => {
      expect(setFilesToBeTransferredSpy.called).to.be.true
      done()
    })
  })

  it('should go back', () => {
    wrapper.vm.viewBackBtnClicked()
    expect(viewBackBtnClickedSpy.called).to.be.true
  })

  it('should detroy events', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })
})
