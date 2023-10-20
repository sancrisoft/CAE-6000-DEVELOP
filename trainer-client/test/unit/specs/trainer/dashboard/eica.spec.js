/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import EICAS from '@/components/trainer/dashboard/eicas'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/dashboard/eicas.vue', () => {
  let store
  let wrapper
  let eicas
  let eicasList
  let state = {
    appContext: {
      eicasMessages: [
        { label: 'APU EGT SENDORS', color: 'yellow', blink: true }
      ],
      omsViewPort: {}
    }
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: state
    })

    wrapper = shallow(EICAS, { store })
    eicas = wrapper.find('ul')[0]
    eicasList = eicas.find('li')
  })

  describe('default eicas messages', () => {
    it('should get eicas default from appContext', () => {
      expect(eicasList.length).to.equal(1)
    })

    it('should blink when blink is true', () => {
      expect(eicasList[0].hasClass('blink'))
    })

    it('should be the right color', () => {
      expect(eicasList[0].hasStyle('color', 'yellow'))
    })
  })

  describe('eicas messages overridden in omsViewPort', () => {
    beforeEach(() => {
      state.appContext.omsViewPort.eicasMessages = state.appContext.eicasMessages
      state.appContext.omsViewPort.eicasMessages.push(
        { label: 'HYD PUMP 3A FAIL', color: 'cyan', blink: false }
      )

      store = new Vuex.Store({
        state: state
      })

      wrapper = shallow(EICAS, { store })
      eicas = wrapper.find('ul')[0]
      eicasList = eicas.find('li')
    })

    it('should get eicas messages from omsViewPort', () => {
      expect(eicasList.length).to.equal(2)
    })
  })
})
