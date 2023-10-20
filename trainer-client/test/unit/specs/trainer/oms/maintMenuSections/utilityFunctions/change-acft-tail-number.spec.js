/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import changeAcftTailNumber from '@/components/trainer/oms/maintMenuSections/utilityFunctions/change-acft-tail-number'
import progessPanel from '@/components/trainer/oms/maintMenuSections/utilityFunctions/components/progress-panel'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/utilityFunctions/change-acft-tail-number.vue', () => {
  let store
  let wrapper
  let submitSpy
  let resetSpy
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    store = new Vuex.Store({
      state: {
        appContext: {
          tailNumber: '1234',
          omsViewPort: {
            title: 'aTitle'
          }
        }
      }
    })
    submitSpy = sinon.spy(progessPanel.methods, 'submit')
    resetSpy = sinon.spy(progessPanel.methods, 'reset')
    wrapper = mount(changeAcftTailNumber, { store })
  })

  afterEach(() => {
    submitSpy.restore()
    resetSpy.restore()
  })

  it('should show tail number', () => {
    let number = wrapper.find('#tailNumber')[0]
    expect(number.text()).to.equal('1234')
  })

  it('should allow to set new tail number', () => {
    let form = wrapper.find('form')[0]
    let newTailNoInput = form.find('input')[0]
    newTailNoInput.element.value = '5678'
    newTailNoInput.trigger('input')
    expect(wrapper.data().newTailNo).to.equal('5678')
  })

  it('should show update panel on submit', () => {
    let form = wrapper.find('form')[0]
    let newTailNoInput = form.find('input')[0]
    newTailNoInput.element.value = '5678'
    newTailNoInput.trigger('input')

    form.trigger('submit')
    expect(wrapper.vm.confirmPanel).to.be.true
  })

  it('should submit changes when clicked yes', () => {
    let form = wrapper.find('form')[0]
    let newTailNoInput = form.find('input')[0]
    newTailNoInput.element.value = '5678'
    newTailNoInput.trigger('input')

    form.trigger('submit')

    let yesbtn = wrapper.find('.yes-no-form .btn')[0]
    yesbtn.trigger('click')

    clock.tick(1000)
    expect(submitSpy.called).to.be.true
  })

  it('should cancel changes when clicked no', () => {
    let form = wrapper.find('form')[0]
    let newTailNoInput = form.find('input')[0]
    newTailNoInput.element.value = '5678'
    newTailNoInput.trigger('input')

    form.trigger('submit')

    let yesbtn = wrapper.find('.yes-no-form .btn')[1]
    yesbtn.trigger('click')

    expect(wrapper.data().newTailNo).to.equal(null)
    expect(resetSpy.called).to.be.true
  })
})
