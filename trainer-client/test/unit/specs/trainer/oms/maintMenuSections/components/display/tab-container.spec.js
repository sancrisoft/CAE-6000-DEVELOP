/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import tabContainer from '@/components/trainer/oms/maintMenuSections/components/display/tab-container'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/display/tab-container.vue', () => {
  let store
  let wrapper
  let emitSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          selectedTab: 0,
          omsViewPort: {
          }
        }
      }
    })

    let propsData = {

    }

    wrapper = shallow(tabContainer, {
      store,
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should show directory list by default', () => {
    expect(wrapper.vm.isDirectory).to.be.true
  })

  it('should show a fault List', () => {
    let propsData = {
      type: 'faultList'
    }

    wrapper = shallow(tabContainer, {
      store,
      propsData
    })
    expect(wrapper.vm.isFaultList).to.be.true
  })

  it('should show a fde Details', () => {
    let propsData = {
      type: 'fdeDetail'
    }

    wrapper = shallow(tabContainer, {
      store,
      propsData
    })
    expect(wrapper.vm.isFDEdetail).to.be.true
  })

  it('should switch view', done => {
    wrapper.vm.switchView('target', 'id')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })
})
