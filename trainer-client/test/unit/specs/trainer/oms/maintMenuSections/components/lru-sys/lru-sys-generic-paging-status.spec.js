/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import lruSysGenericPagingStatus from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-generic-paging-status'
import lruSysGenericPagingStatusMock from '@/api/mocks/maintMenuSections/lru-sys-generic-paging-status'
import lruSysOperationsMock from '@/api/mocks/maintMenuSections/lru-sys-operations'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/lru-sys/lru-sys-generic-paging-status.vue', () => {
  let store
  let wrapper
  let emitSpy
  let offSpy

  let cachedData = lruSysOperationsMock.data.items.lrus[1].data[0]

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          cachedData: cachedData,
          omsViewPort: lruSysGenericPagingStatusMock
        }
      }
    })

    let propsData = {
    }

    wrapper = shallow(lruSysGenericPagingStatus, {
      store,
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
  })

  it('should contain a list of html pages', () => {
    expect(wrapper.vm.pages.length).to.be.greaterThan(0)
  })

  it('should set viewBackBtnLabel', () => {
    expect(wrapper.vm.viewBackBtnLabel).to.equal(lruSysGenericPagingStatusMock.header.viewBackBtnLabel)
  })

  it('should enabled maintMenuSections when going back to parent vue', done => {
    wrapper.vm.viewBackBtnClicked()
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should destroy events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
