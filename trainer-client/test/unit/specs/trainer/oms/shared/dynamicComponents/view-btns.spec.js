/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
// import sinon from 'sinon'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import Button from '@/components/trainer/oms/shared/dynamicComponents/view-btns'

import { polyfill } from 'es6-promise'
polyfill()

describe('shared/dynamicComponents/view-btns.vue', () => {
  let wrapper
  let store
  let viewBtnClickSpy
  let viewBackBtnClickSpy
  let consoleStub
  let offSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          viewBackBtnOverride: {},
          omsViewPort: {
            header: {
              viewBtnLabel: 'btnLabel',
              viewBtnEvent: 'viewBtnEvent',
              viewBtnVisible: true,
              viewBackBtnVisible: true
            }
          }
        }
      }
    })

    viewBtnClickSpy = sinon.spy(Button.methods, 'viewBtnClick')
    viewBackBtnClickSpy = sinon.spy(Button.methods, 'viewBackBtnClick')
    consoleStub = sinon.stub(global.console, 'warn').callsFake(() => {
      return false
    })
    wrapper = mount(Button, { store })
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    viewBtnClickSpy.restore()
    viewBackBtnClickSpy.restore()
    consoleStub.restore()
    offSpy.restore()
  })

  it('should set button label', () => {
    let viewBtn = wrapper.find('div.btn')[0]
    expect(viewBtn.text()).to.contain(wrapper.vm.viewBtnLabel)
  })

  it('should emit a view button event', () => {
    let viewBtn = wrapper.find('div.btn')[0]
    viewBtn.trigger('click')
    expect(viewBtnClickSpy.called).to.be.true
  })

  it('should emit a view back button event', () => {
    let viewBackBtn = wrapper.find('div.btn')[1]
    viewBackBtn.trigger('click')
    expect(viewBackBtnClickSpy.called).to.be.true
  })

  it('should hide show button', () => {
    let viewBackButton = wrapper.find('div.btn')[1]
    expect(viewBackButton.hasStyle('display', 'none')).to.be.false
  })

  it('should set availability', () => {
    wrapper.vm.$bus.$emit('omsBtnsAvailabilityState', true)
    expect(wrapper.data().btnDisabled).to.be.true
  })

  it('should destroy btns availability events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
