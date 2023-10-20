/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import lruSysDataReader from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-data-reader'
import lruSysDataReaderMock from '@/api/mocks/maintMenuSections/lru-sys-data-reader'
import lruSysOperationsMock from '@/api/mocks/maintMenuSections/lru-sys-operations'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/lru-sys/lru-sys-data-reader.vue', () => {
  let store
  let wrapper
  let emitSpy
  let offSpy
  let clock

  let cachedData = lruSysOperationsMock.data.items.lrus[0].data[0]

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    store = new Vuex.Store({
      state: {
        appContext: {
          cachedData: cachedData,
          omsViewPort: lruSysDataReaderMock
        }
      }
    })

    let propsData = {
    }

    wrapper = shallow(lruSysDataReader, {
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

  it('should previously cached a list of lrus', () => {
    expect(wrapper.vm.item.lrus.length).to.be.greaterThan(0)
  })

  it('should show lru label in title', () => {
    let title = wrapper.find('h1')[0]
    expect(title.text()).to.contain(lruSysOperationsMock.data.items.lrus[0].data[0].label)
  })

  it('should set viewBackBtnLabel', () => {
    expect(wrapper.vm.viewBackBtnLabel).to.equal(lruSysDataReaderMock.header.viewBackBtnLabel)
  })

  it('should enabled maintMenuSections when going back to parent vue', done => {
    wrapper.vm.viewBackBtnClicked()
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should refresh list repopulating it after 2 sec', () => {
    wrapper.vm.refresh()
    expect(wrapper.vm.list.length).to.equal(0)
    clock.tick(2000)
    expect(wrapper.vm.list.length).to.greaterThan(0)
  })

  it('should destroy events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
