/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import DataLoadOverlays from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-overlays'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)
let store
let wrapper
let emitSpy
describe('trainer/oms/maintMenu/dataLoad/components/data-load-overlays', () => {
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            startLoadTxt: 'startLoadTxt'
          }
        }
      },
      actions: {
        'appContext/setSelectedView': sinon.spy()
      }
    })

    wrapper = shallow(DataLoadOverlays, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should show loading window', () => {
    wrapper.setProps({startload: true})
    let overlay = wrapper.find('#startload')[0]
    expect(overlay).to.not.be.undefined
  })

  it('should show download window', () => {
    wrapper.setProps({download: 1})
    let overlay = wrapper.find('#download')[0]
    expect(overlay).to.not.be.undefined
  })

  it('should show enterpassword window', () => {
    wrapper.setProps({enterpassword: 1})
    let overlay = wrapper.find('#enterpassword')[0]
    expect(overlay).to.not.be.undefined
  })

  it('should close continue window', () => {
    wrapper.vm.closeContinue()
    expect(emitSpy.called).to.be.true
  })
  it('should switchView', () => {
    wrapper.vm.switchView()
    expect(emitSpy.called).to.be.true
  })
})
