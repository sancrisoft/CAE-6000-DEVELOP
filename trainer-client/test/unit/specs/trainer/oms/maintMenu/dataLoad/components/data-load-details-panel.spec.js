/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import DataLoadDetailsPanel from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-details-panel'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/maintMenu/dataLoad/components/data-load-details-panel.vue', () => {
  let store
  let wrapper
  let emitSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            componentName: 'reloaddatasoftware',
            title: 'Reload Data Software',
            detailsHeader: 'Data & Software Details',
            errorsHeader: 'Load Error Summary',
            headerLeft: 'Data/Software',
            headerRight: 'Target/LRU',
            startLoadTxt: 'Initializing LRUs Please wait',
            data: [
              {itemName: 'item1', id: '0', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item2', id: '1', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item3', id: '2', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item4', id: '3', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item5', id: '4', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item6', id: '5', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item7', id: '6', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item8', id: '7', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item9', id: '8', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item10', id: '9', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item11', id: '10', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item12', id: '11', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item13', id: '12', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item14', id: '13', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item15', id: '14', status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item16', id: '15', status: 'Error', data: ['abcd', 'efg']}
            ],
            errors: [
              {itemName: 'item1', type: 'DCM L_DCM_A', error: 'An error occured'},
              {itemName: 'item2', type: 'targetLRU', error: 'Target not responsing'}
            ],
            selectedDetails: []
          }
        }
      },
      actions: {
        'appContext/setSelectedView': sinon.spy()
      }
    })
    let details = [
      {itemName: 'item1', id: '0', status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item2', id: '1', status: 'Error', data: ['abcd', 'efg']}
    ]

    wrapper = mount(DataLoadDetailsPanel, { store, details })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should be defined', () => {
    expect(wrapper).to.not.be.undefined
  })
})
