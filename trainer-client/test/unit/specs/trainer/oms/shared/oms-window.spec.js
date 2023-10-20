/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
// import sinon from 'sinon'
import { expect } from 'chai'
import Window from '@/components/trainer/oms/shared/oms-window'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('shared/oms-window', () => {
  let store
  let wrapper
  let propsData
  let closeSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          appConfig: {}
        }
      }
    })

    propsData = {
      size: 'half',
      header: 'header label',
      windowPropName: 'theWindow',
      slots: {
        scrollableContent: '<table></table>'
      }
    }
    closeSpy = sinon.spy(Window.methods, 'close')
    wrapper = mount(Window, { store, propsData })
  })

  afterEach(() => {
    closeSpy.restore()
  })

  it('should contain a header', () => {
    let omswindow = wrapper.find('.oms-window .label')[0]
    expect(omswindow.text()).to.equal('header label')
  })

  it('should contain a size', () => {
    let omswindow = wrapper.find('.oms-window')[0]
    expect(omswindow.hasClass('half')).to.be.true
  })

  it('should close', () => {
    let close = wrapper.find('.oms-window .close')[0]
    close.trigger('click')

    expect(closeSpy.called).to.be.true
  })
})
