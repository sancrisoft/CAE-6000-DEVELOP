/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import changeAcftLifeCycleData from '@/components/trainer/oms/maintMenuSections/utilityFunctions/change-acft-life-cycle-data'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/maintMenuSections/utilityFunctions/change-acft-life-cycle-data.vue', () => {
  let store
  let wrapper
  let emitSpy
  let actions
  let offSpy

  beforeEach(() => {
    actions = {
      'appContext/omsViewPort/maintMenuFilterDataList': sinon.spy(),
      'appContext/omsViewPort/updateComboSelection': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            sortedData: [{}]
          }
        }
      },
      actions
    })
    wrapper = mount(changeAcftLifeCycleData, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
  })

  it('should sort data', () => {
    expect(wrapper.vm.hasSortedData).to.equal(1)
  })

  it('should listen to parameterGroupCombo updates', done => {
    wrapper.vm.$bus.$emit('parameterGroupSelected', 1)
    Vue.nextTick(() => {
      expect(actions['appContext/omsViewPort/updateComboSelection'].called).to.be.true
      done()
    })
  })
  it('should destroy event', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })
})
