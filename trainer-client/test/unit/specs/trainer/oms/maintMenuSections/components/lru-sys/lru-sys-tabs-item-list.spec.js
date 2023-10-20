/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import lruSysTabsItemList from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-tabs-item-list'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/lru-sys/lru-sys-tabs-item-list.vue', () => {
  let store
  let wrapper
  let actions = {
    'appContext/omsViewPort/updateATAcomboSelection': sinon.spy(),
    'appContext/omsViewPort/updateLRUcomboSelection': sinon.spy()
  }
  let emitSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            items: [{ label: '', target: '' }]
          }
        }
      },
      actions
    })

    wrapper = shallow(lruSysTabsItemList, {
      store
    })
    emitSpy = sinon.spy(wrapper.vm, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should switchView', () => {
    wrapper.vm.switchView()
    expect(emitSpy.called).to.be.true
  })

  it('should disable list items without target', () => {
    let disabled = wrapper.vm.hasTarget({ label: '', target: '' })
    expect(disabled).to.equal(0)
  })
})
