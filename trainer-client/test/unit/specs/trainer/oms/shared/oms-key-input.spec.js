/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import sinon from 'sinon'
import { expect } from 'chai'
import omsKeyInput from '@/components/trainer/oms/shared/oms-key-input'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('shared/oms-key-input', () => {
  let store
  let wrapper
  let input
  let form
  let resetSpy
  let enableSpy
  let disableSpy
  let emitSpy
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    store = new Vuex.Store({
      state: {}
    })
    let propsData = {
      validateEvent: 'validate',
      validationMessage: 'invalidMessage',
      label: 'Enter Password'
    }

    resetSpy = sinon.spy(omsKeyInput.methods, 'reset')
    enableSpy = sinon.spy(omsKeyInput.methods, 'enable')
    disableSpy = sinon.spy(omsKeyInput.methods, 'disable')
    wrapper = mount(omsKeyInput, { store, propsData })
    emitSpy = sinon.stub(wrapper.vm, '$emit').callsFake((key) => {
      if (key !== 'MAINT') {
        wrapper.vm.$options.propsData.validationMessage = 'Invalid'
      }
    })
    form = wrapper.find('form')[0]
    input = form.find('input[name=key]')[0]
  })

  afterEach(() => {
    resetSpy.restore()
    enableSpy.restore()
    disableSpy.restore()
  })

  it('should reset on focus', () => {
    input.trigger('focus')
    expect(resetSpy.called).to.be.true
  })

  it('should enable on keyup', () => {
    input.trigger('keyup')
    expect(enableSpy.called).to.be.true
  })

  it('should disable on mouseout', () => {
    input.trigger('mouseout')
    expect(disableSpy.called).to.be.true
  })

  it('should switch key with validationMessage when an error message is suplied by parent', () => {
    wrapper.data().key = '1234'
    wrapper.update()
    wrapper.vm.validate()
    clock.tick(200)
    expect(emitSpy.called).to.be.true
    expect(wrapper.vm.$options.propsData.validationMessage).to.equal('Invalid')
  })

  it('should apply invalid class when validationMessage has length', done => {
    wrapper.vm.$options.propsData.validationMessage = 'Invalid'
    wrapper.vm.setValidationMessage()

    Vue.nextTick(() => {
      expect(wrapper.vm.error).to.be.true
      expect(input.hasClass('invalid')).to.be.true
      done()
    })
  })

  it('should replace invalid value with validation message', done => {
    wrapper.vm.$options.propsData.validationMessage = 'Invalid'
    wrapper.vm.setValidationMessage()

    Vue.nextTick(() => {
      expect(wrapper.vm.error).to.be.true
      expect(input.hasClass('invalid')).to.be.true
      expect(wrapper.vm.key).to.equal('Invalid')
      done()
    })
  })

  it('should reset key value after validating', done => {
    wrapper.vm.$options.propsData.validationMessage = ''
    wrapper.vm.setValidationMessage()

    Vue.nextTick(() => {
      expect(wrapper.vm.error).to.be.false
      expect(input.hasClass('invalid')).to.be.false
      done()
    })
  })
})
