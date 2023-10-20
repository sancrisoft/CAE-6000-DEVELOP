/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import dataLoadBaseMixin from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-base-mixin'
import DataLoad from '@/components/trainer/oms/maintMenu/data-load'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

let store
let actions
beforeEach(() => {
  actions = {
    'appContext/getAppContext': sinon.spy(),
    'scenarios/getScenariosList': sinon.spy(),
    'appContext/omsViewPort/toggleViewSelectedItem': sinon.spy(),
    'appContext/setSelectedView': sinon.spy()
  }
  store = new Vuex.Store({
    state: {
      appContext: {
        omsViewPort: {
          header: {
            viewBtnLabel: 'Load new<br>Databases',
            viewBtnLabelStates: {
              default: 'Maintenance<br>Data Load',
              alternate: 'Load New<br>Databases'
            },
            viewBackBtnLabel: 'Return To Maint<br>Data Load Menu',
            viewBtnVisible: true,
            viewBackBtnVisible: false
          },
          data: [],
          selectedDetails: [
            {itemName: 'item1', id: '0', selected: false, status: 'Error', data: ['abcd', 'efg']},
            {itemName: 'item2', id: '1', selected: false, status: 'Error', data: ['abcd', 'efg']}
          ]
        }
      }
    },
    actions
  })

  shallow(DataLoad, { store })
})

describe('trainer/oms/maintMenu/dataLoad/components/data-load-base-mixin', () => {
  it('should de defined', () => {
    expect(dataLoadBaseMixin).to.not.be.undefined
  })
})
