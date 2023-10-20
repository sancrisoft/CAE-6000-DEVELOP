/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import lruSysGenericTest from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-generic-test'
import lruSysOperationsMock from '@/api/mocks/maintMenuSections/lru-sys-operations'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/lru-sys/lru-sys-generic-test.vue', () => {
  let store
  let wrapper
  let emitSpy
  let offSpy
  let clock
  let resetSpy

  let cachedData = lruSysOperationsMock.data.items.lrus[5].rigging[0]
  lruSysOperationsMock.data.items.lrus[5].rigging[0].test.duration = 2

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    store = new Vuex.Store({
      state: {
        appContext: {
          cachedData: cachedData
        }
      }
    })

    let propsData = {
    }

    resetSpy = sinon.spy(lruSysGenericTest.methods, 'reset')

    wrapper = shallow(lruSysGenericTest, {
      store,
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
    resetSpy.restore()
  })

  it('should get data from cachedData', () => {
    console.log(lruSysOperationsMock.data.items.lrus[5].rigging[0].type)
    expect(wrapper.vm.test.description.length).to.be.greaterThan(0)
  })

  it('should get an HTML test description', () => {
    expect(wrapper.vm.test.description).to.contain('<')
  })

  it('should show success message when succes.status is true', () => {
    expect(wrapper.vm.resultMessage).to.equal(lruSysOperationsMock.data.items.lrus[5].rigging[0].test.success.message)
  })

  it('should show failure message when failure.success is false and failure.status is true', () => {
    lruSysOperationsMock.data.items.lrus[5].rigging[0].test.success.status = 0
    lruSysOperationsMock.data.items.lrus[5].rigging[0].test.failure.status = 1
    expect(wrapper.vm.resultMessage).to.equal(lruSysOperationsMock.data.items.lrus[5].rigging[0].test.failure.message)
  })

  it('should show test progress until duration reached', () => {
    wrapper.vm.start()
    clock.tick(1000)
    expect(wrapper.vm.progress).to.equal(1)
  })

  it('should show stop progress when duration is reached', () => {
    wrapper.vm.start()
    clock.tick(1000)
    clock.tick(1000)
    expect(wrapper.vm.remaining).to.equal(0)
  })

  it('should switch back to parentComponent when cancelling from intro screen', () => {
    wrapper.vm.cancel()
    expect(emitSpy.called).to.be.true
  })

  it('should reset test ounced started', () => {
    wrapper.vm.intro = 0
    wrapper.vm.cancel()
    expect(resetSpy.called).to.be.true
  })
})
