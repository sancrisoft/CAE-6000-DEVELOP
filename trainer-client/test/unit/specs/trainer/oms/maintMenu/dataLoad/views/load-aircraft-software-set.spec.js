/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import loadAircraftSoftwareSet from '@/components/trainer/oms/maintMenu/dataLoad/views/load-aircraft-software-set'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenu/dataLoad/views/load-aircraft-software-set.vue', () => {
  let store
  let wrapper

  beforeEach(() => {
    let actions = {
      'appContext/omsViewPort/setViewSelectSelectedItem': sinon.spy(),
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/setSelectedView': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          appConfig: {
            acftType: '7000'
          },
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
            },
            selectedDetails: [
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
      },
      actions
    })
    wrapper = mount(loadAircraftSoftwareSet, { store })
  })

  afterEach(() => {
  })

  it('should show default selected item details', () => {
    expect(wrapper.vm.selectedDetails.length).to.be.greaterThan(0)
  })

  it('should display a message on Start Load', () => {
    let start = wrapper.find('.button-container div')[0]
    wrapper.update()
    start.trigger('click')
    expect(wrapper.data().loadStarted).to.equal(1)
  })

  it('should select details items', done => {
    let form = wrapper.find('form')[0]
    let select = form.find('ul li')[1]
    select.trigger('click')
    Vue.nextTick(() => {
      expect(wrapper.vm.selectedDetails.length).to.equal(1)
      done()
    })
  })
})
