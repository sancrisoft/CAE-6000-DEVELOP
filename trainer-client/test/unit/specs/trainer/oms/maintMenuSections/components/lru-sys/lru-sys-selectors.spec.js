/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import lruSysSelectors from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-selectors'
import lruSysOperationsMock from '@/api/mocks/maintMenuSections/lru-sys-operations'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/lru-sys/lru-sys-selectors.vue', () => {
  let store
  let wrapper
  let clock
  let actions = {
    'appContext/omsViewPort/updateATAcomboSelection': sinon.spy(),
    'appContext/omsViewPort/updateLRUcomboSelection': sinon.spy()
  }

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: lruSysOperationsMock
        }
      },
      actions
    })

    wrapper = shallow(lruSysSelectors, {
      store
    })
  })

  afterEach(() => {
  })

  it('should update ataCombo with previouslyAtaSelectedId when loading', () => {
    clock.tick(250)
    expect(actions['appContext/omsViewPort/updateATAcomboSelection'].called).to.be.true
  })

  it('should select View', () => {
    wrapper.vm.viewSelected(0)
    expect(actions['appContext/omsViewPort/updateATAcomboSelection'].called)
  })

  it('should select ATA', () => {
    wrapper.vm.ataSelected(0)
    expect(actions['appContext/omsViewPort/updateATAcomboSelection'].called)
  })

  it('should select LRU', () => {
    wrapper.vm.lruSelected(0)
    expect(actions['appContext/omsViewPort/updateLRUcomboSelection'].called)
  })
})
