/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import lruSysOperations from '@/components/trainer/oms/maintMenuSections/lru-sys-operations'
import omsScrollableMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable-consumer-mixin'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/lru-sys-operations.vue', () => {
  let store
  let wrapper
  let emitSpy
  let setScrollSpy
  let actions = {
    'appContext/lruSysCacheItem': sinon.spy(),
    'appContext/setContextMenuSelectedItem': sinon.spy(),
    'appContext/resetContextMenuSelectedChildItem': sinon.spy(),
    'appContext/omsViewPort/maintMenuFilterDataList': sinon.spy(),
    'appContext/setSelectedTab': sinon.spy()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          selectedTab: 0,
          omsViewPort: {
            title: 'Utility Functions',
            sortedData: [
              {
                data: [{}],
                config: { formatedData: '' },
                rigging: [{}],
                tests: [{}],
                nvm: [{}]
              }
            ]
          }
        }
      },
      actions
    })

    setScrollSpy = sinon.spy(omsScrollableMixin.methods, 'setScroll')

    wrapper = mount(lruSysOperations, {
      store
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
    setScrollSpy.restore()
  })

  it('should show tabs', () => {
    let tabs = wrapper.find('.vue-tabs')[0]
    expect(tabs).to.not.be.undefined
  })

  it('should navigate when tab items us clicked', done => {
    wrapper.vm.dataItemClicked({ target: 'aView' })
    Vue.nextTick(() => {
      expect(emitSpy.calledWith('switchView', { component: 'maintMenu', view: 'aView' })).to.be.true
      done()
    })
  })

  it('should set the selected tab into the store and setScroll', done => {
    wrapper.vm.setSelectedTab(0)
    Vue.nextTick(() => {
      expect(setScrollSpy.called).to.be.true
      done()
    })
  })
})
