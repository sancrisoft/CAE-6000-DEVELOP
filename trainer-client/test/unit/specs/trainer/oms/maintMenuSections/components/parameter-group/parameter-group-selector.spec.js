/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import parameterGroupSelector from '@/components/trainer/oms/maintMenuSections/components/parameter-group/parameter-group-selector'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/parameter-group/parameter-group-selector.vue', () => {
  let store
  let wrapper
  let emitSpy
  let actions = {
    'appContext/omsViewPort/updateComboSelection': sinon.spy(),
    'appContext/setViewBackBtnOverride': sinon.spy()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            parameterGroupComboLabel: 'Parameter Group',
            parameterGroupCombo: [
              { id: '0', label: 'Brake Controls', selected: 1 },
              { id: '1', label: 'True Airspeed', selected: 0 }
            ]
          }
        }
      },
      actions
    })

    wrapper = shallow(parameterGroupSelector, {
      store
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should select parameter group', () => {
    wrapper.vm.parameterGroupSelected(0)
    expect(actions['appContext/omsViewPort/updateComboSelection'].args[0][1].selectedId).to.equal(0)
  })
})
