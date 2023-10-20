/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import dataLoadMenu from '@/components/trainer/oms/maintMenu/dataLoad/data-load-menu'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenu/dataLoad.vue', () => {
  let store
  let wrapper
  let propsData
  let emitSpy

  beforeEach(() => {
    let actions = {
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/setSelectedView': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            data: {
              items: [
                {
                  label: '1B0-304B-LR-APM-CFG',
                  id: 0,
                  selected: true,
                  data: [
                    {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']},
                    {itemName: 'item2', status: 'Error', data: ['abcd', 'efg']},
                    {itemName: 'item3', status: 'Error', data: ['abcd', 'efg']},
                    {itemName: 'item4', status: 'Error', data: ['abcd', 'efg']},
                    {itemName: 'item5', status: 'Error', data: ['abcd', 'efg']}
                  ]
                },
                { label: '1B0-304B-AB-CDE-FGH',
                  id: 1,
                  selected: false,
                  data: [
                    {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']}
                  ]
                }
              ]
            }
          }
        }
      },
      actions
    })

    propsData = {
    }
    wrapper = mount(dataLoadMenu, { store, propsData })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('shoud return to data-load', () => {
    wrapper.vm.viewBtnClicked()
    expect(emitSpy.called).to.be.true
  })
})
