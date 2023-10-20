/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import DataLoadMainPanel from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-main-panel'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/maintMenu/dataLoad/components/data-load-main-panel.vue', () => {
  let store
  let wrapper
  let emitSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            selectedDetails: [],
            componentName: 'aName',
            data: {
              items: [
                {itemName: 'item1', id: '0', selected: true, status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item2', id: '1', selected: true, status: 'Error', data: ['abcd', 'efg']}
              ]
            }
          }
        },
        actions: {
          'appContext/setSelectedView': sinon.spy()
        }
      }
    })

    let propsData = {}
    wrapper = mount(DataLoadMainPanel, { store, propsData })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should show loading message on init', () => {
    expect(wrapper).to.not.be.undefined
  })

  it('should hide detailPanel and unselect clicked item', () => {
    let toggle = wrapper.find('.oms-scrollable-item')[0]
    toggle.trigger('click')
    expect(emitSpy.called).to.be.true
  })

  it('should start load', () => {
    let startBtn = wrapper.find('.btn')[0]
    startBtn.trigger('click')
    expect(emitSpy.called).to.be.true
  })

  it('should show details', () => {
    let startBtn = wrapper.find('.btn')[1]
    startBtn.trigger('click')
    expect(emitSpy.called).to.be.true
  })
})
