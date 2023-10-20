/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import omsPasswordInput from '@/components/trainer/oms/shared/oms-password-input'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/shared/oms-password-input.vue', () => {
  let store
  let wrapper
  let emitSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          appConfig: {
            omsPasswordInputPassword: 'MAINT'
          }
        }
      }
    })
    wrapper = shallow(omsPasswordInput, { store })
    emitSpy = sinon.spy(wrapper.vm, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should switch view vue when password is valid', () => {
    wrapper.vm.validateKeyInput('MAINT')
    expect(emitSpy.called).to.be.true
  })

  it('should show set invalid password', () => {
    wrapper.vm.validateKeyInput('1234')
    expect(wrapper.vm.invalidMessage).to.equal('Invalid Password')
  })
})
