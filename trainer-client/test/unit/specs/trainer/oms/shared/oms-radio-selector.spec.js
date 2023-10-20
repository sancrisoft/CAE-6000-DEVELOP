/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import sinon from 'sinon'
import { expect } from 'chai'
import radioSelector from '@/components/trainer/oms/shared/oms-radio-selector'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('shared/oms-radio-selector', () => {
  let store
  let wrapper
  let propsData
  let emitSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
    propsData = {
      value: 0,
      id: 'id',
      name: 'abcd',
      event: '',
      checked: false,
      disabled: false
    }

    wrapper = mount(radioSelector, { store, propsData })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should emit event', done => {
    wrapper.find('#id')[0]
    wrapper.trigger('change')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should be diabled', done => {
    propsData.disabled = true
    wrapper = mount(radioSelector, { store, propsData })

    wrapper.find('#id')[0]
    wrapper.trigger('change')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.false
      done()
    })
  })
})
