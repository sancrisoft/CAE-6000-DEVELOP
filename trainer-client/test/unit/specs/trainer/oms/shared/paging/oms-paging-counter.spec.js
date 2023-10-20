/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import Counter from '@/components/trainer/oms/shared/paging/oms-paging-counter'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('shared/paging/oms-paging-counter', () => {
  let store
  let wrapper
  let offSpy
  let appContext = {
    getters: {
      getSelectedKnob: () => {
      }
    }
  }
  let state = {
    selectedKnob: {
      name: 'selectedKnobName',
      status: '',
      pages: ''
    },
    appContext: {
      appConfig: {
        showPagerDisplayArrows: true
      }
    }
  }
  let getters = {
    'appContext/getSelectedKnob': sinon.stub(appContext.getters, 'getSelectedKnob').callsFake(() => {
      return state.selectedKnob
    })
  }
  let propsData = {
    counterName: 'CounterInstance'
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: state,
      getters
    })

    wrapper = shallow(Counter, { store, propsData })

    offSpy = sinon.spy(wrapper.vm, '$off')
    wrapper.data().show = true
    wrapper.update()
  })

  afterEach(() => {
    offSpy.restore()
    getters['appContext/getSelectedKnob'].restore()
  })

  it('should reset the page counter', done => {
    wrapper.vm.$bus.$emit('resetCounterInstancePagingCounter')
    Vue.nextTick(() => {
      expect(wrapper.data().current).to.equal(0)
      expect(wrapper.data().pages).to.equal(0)
      expect(wrapper.data().counterShown).to.be.false
      done()
    })
  })

  it('should update the page counter', done => {
    wrapper.vm.$bus.$emit('setCounterInstancePagingCounter', {current: 1, pages: 2})
    Vue.nextTick(() => {
      expect(wrapper.data().current).to.contain(1)
      expect(wrapper.data().pages).to.contain(2)
      done()
    })
  })
  it('should contain defined digits (002) or (02)', () => {
    let propsData = {
      counterName: 'CounterInstance',
      digits: 3
    }
    wrapper = shallow(Counter, { store, propsData })
    wrapper.vm.$bus.$emit('setCounterInstancePagingCounter', {current: 1, pages: 2})
    wrapper.update()
    expect(wrapper.vm.current.length).to.equal(3)
  })

  it('should destroy events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
