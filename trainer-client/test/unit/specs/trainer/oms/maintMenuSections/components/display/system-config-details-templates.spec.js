/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import systemConfigDetailsTemplates from '@/components/trainer/oms/maintMenuSections/components/display/system-config-details-templates'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/display/system-config-details-templates.vue', () => {
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

    wrapper = shallow(systemConfigDetailsTemplates, {
      store,
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should show ApmConfig temalte by default', () => {
    expect(wrapper.vm.isApmConfiguration).to.be.true
  })

  it('should show APM template by default', () => {
    let propsData = {
      type: 'apm'
    }

    wrapper = shallow(systemConfigDetailsTemplates, {
      store,
      propsData
    })
    expect(wrapper.vm.isApm).to.be.true
  })

  it('should show TSO template by default', () => {
    let propsData = {
      type: 'tso'
    }

    wrapper = shallow(systemConfigDetailsTemplates, {
      store,
      propsData
    })
    expect(wrapper.vm.isTso).to.be.true
  })

  it('should show Crosscheck template by default', () => {
    let propsData = {
      type: 'crosscheck'
    }

    wrapper = shallow(systemConfigDetailsTemplates, {
      store,
      propsData
    })
    expect(wrapper.vm.isCrosscheck).to.be.true
  })
})
