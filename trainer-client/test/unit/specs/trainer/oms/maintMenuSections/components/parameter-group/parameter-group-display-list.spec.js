/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import parameterGroupDisplayList from '@/components/trainer/oms/maintMenuSections/components/parameter-group/parameter-group-display-list'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/parameter-group/parameter-group-display-list.vue', () => {
  let store
  let wrapper
  let emitSpy
  let actions = {
    'appContext/omsViewPort/changeAcftLifecyleData': sinon.spy()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            sortedData: []
          }
        }
      },
      actions
    })

    let propsData = {
      dynamic: true
    }

    wrapper = shallow(parameterGroupDisplayList, {
      store,
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should allow to change dynamic items', () => {
    wrapper.vm.changeItemValue()
    expect(wrapper.vm.dynamic).to.be.true
    expect(wrapper.vm.confirmPanel).to.be.true
  })

  it('should close confirm panel', done => {
    wrapper.vm.confirmPanel = true
    wrapper.vm.$bus.$emit('closeWindow', 'confirmPanel')
    Vue.nextTick(() => {
      expect(wrapper.vm.confirmPanel).to.be.false
      done()
    })
  })

  it('should submit changes', () => {
    wrapper.vm.submit({})
    expect(actions['appContext/omsViewPort/changeAcftLifecyleData'].called).to.be.true
  })
})
