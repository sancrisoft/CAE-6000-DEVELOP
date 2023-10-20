/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import sinon from 'sinon'
import { expect } from 'chai'
import omsHoverableListMenu from '@/components/trainer/oms/shared/oms-hoverable-list-menu'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('shared/oms-radio-selector', () => {
  let store
  let wrapper
  let propsData
  let emitSpy

  let items = {
    items: [
      { label: 'item1',
        target: '',
        enabled: true,
        messages: { label: 'Active', value: 2 }
      },
      { label: 'item2', target: '', enabled: false }
    ]
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
    propsData = items

    wrapper = mount(omsHoverableListMenu, { store, propsData })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should switchView', done => {
    let item = wrapper.find('.hoverable-list-item')[0]
    item.trigger('click')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should not switchView when disabled', done => {
    let item = wrapper.find('.hoverable-list-item')[1]
    item.trigger('click')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.false
      done()
    })
  })

  it('should show messages and count', () => {
    let item = wrapper.find('.hoverable-list-item')[0]
    expect(item.text()).to.contain('(2 Active)')
  })
})
