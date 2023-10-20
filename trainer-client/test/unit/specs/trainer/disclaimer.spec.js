/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import Disclaimer from '@/components/trainer/disclaimer'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/disclaimer.vue', () => {
  let store
  let wrapper
  let emitSpy
  let mutations = {
    'appContext/ACCEPT_DISCLAIMER': sinon.spy()
  }

  let appContext = {
    disclaimerAccepted: false,
    appConfig: {
      disclaimerFormatedText: 'Some formated text'
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: appContext
      },
      mutations
    })
    wrapper = shallow(Disclaimer, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should hide disclaimer ounced accepted', done => {
    let disclaimerBtn = wrapper.find('.btn')[0]
    disclaimerBtn.trigger('click')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })
})
