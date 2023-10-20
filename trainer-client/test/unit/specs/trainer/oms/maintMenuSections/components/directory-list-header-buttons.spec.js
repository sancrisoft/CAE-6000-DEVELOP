/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import directoryListHeaderButtons from '@/components/trainer/oms/maintMenuSections/components/directory-list-header-buttons'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/directory-list-header-buttons.vue', () => {
  let store
  let wrapper
  let emitSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })

    wrapper = shallow(directoryListHeaderButtons, {
      store
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should Refresh list', () => {
    let refreshBtn = wrapper.find('.btn')[0]
    refreshBtn.trigger('click')
    expect(emitSpy.called).to.be.true
  })

  it('should Expand All list items', () => {
    let expandAllBtn = wrapper.find('.btn')[1]
    expandAllBtn.trigger('click')
    expect(emitSpy.called).to.be.true
  })

  it('should Collapse All list items', () => {
    let collapseAllBtn = wrapper.find('.btn')[2]
    collapseAllBtn.trigger('click')
    expect(emitSpy.called).to.be.true
  })
})
