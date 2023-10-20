/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import maintmenuSortedDatalistSelectors from '@/components/trainer/oms/maintMenuSections/components/maintmenu-sorted-datalist-selectors'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/maintMenuSections/components/maintmenu-sorted-datalist-selectors.vue', () => {
  let store
  let wrapper
  let emitSpy

  let actions = {
    'appContext/omsViewPort/updateComboSelection': sinon.spy(),
    'appContext/omsViewPort/updateLRUcomboSelection': sinon.spy()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            viewCombo: [],
            viewComboLabel: 'View',
            sortCombo: [],
            sortComboLabel: 'Sort',
            lruCombo: [],
            lruComboLabel: 'LRU'
          }
        }
      },
      actions
    })

    let propsData = {
      view: true,
      sort: true,
      lru: true
    }

    wrapper = shallow(maintmenuSortedDatalistSelectors, {
      store,
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should show View combo', () => {
    let comboLabel = wrapper.find('form label')[0]
    expect(comboLabel.text()).to.equal('View')
  })

  it('should sort with selected View with list item unique id', () => {
    wrapper.vm.viewSelected('uniqueID')
    expect(actions['appContext/omsViewPort/updateComboSelection'].called).to.be.true
  })

  it('should show Sort combo', () => {
    let comboLabel = wrapper.find('form label')[1]
    expect(comboLabel.text()).to.equal('Sort')
  })

  it('should sort with selected Sort with list item unique id', () => {
    wrapper.vm.sortSelected('uniqueID')
    expect(actions['appContext/omsViewPort/updateComboSelection'].called).to.be.true
  })

  it('should show LRU combo', () => {
    let comboLabel = wrapper.find('form label')[2]
    expect(comboLabel.text()).to.equal('LRU')
  })

  it('should sort with selected LRU with list item unique id', () => {
    wrapper.vm.lruSelected('uniqueID')
    expect(actions['appContext/omsViewPort/updateLRUcomboSelection'].called).to.be.true
  })
})
