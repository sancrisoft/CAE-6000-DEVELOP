/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import DataLoadLoader from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-loader'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/maintMenu/dataLoad/components/data-load-loader.vue', () => {
  let store
  let wrapper
  let emitSpy
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            data: {
              errors: [
                {itemName: 'item1', type: 'DCM L_DCM_A', error: 'An error occured'},
                {itemName: 'item2', type: 'targetLRU', error: 'Target not responsing'}
              ]
            }
          }
        },
        actions: {
          'appContext/setSelectedView': sinon.spy()
        }
      }
    })

    wrapper = mount(DataLoadLoader, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should show errorIndicator', () => {
    wrapper.vm.loadedData = true
    let table = wrapper.find('table')[0]
    let progress = table.find('.loadingProgress')[0]
    clock.tick(5000)
    expect(progress).to.not.be.undefined
  })
  it('should hide error indicator when error is shown', done => {
    wrapper.vm.showErrors()
    Vue.nextTick(() => {
      expect(wrapper.vm.errorIndicator).to.be.false
      expect(wrapper.vm.error).to.be.true
      done()
    })
  })
})
