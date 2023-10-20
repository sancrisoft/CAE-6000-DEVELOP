/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import omsselect from '@/components/trainer/oms/shared/dynamicComponents/oms-select'
import omsSelectMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-select-base-mixin'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('shared/oms-select', () => {
  let store
  let wrapper
  let propsData
  let list
  let getElementByIdStub
  let disabledSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        omsViewPort: {
          selectedDetails: []
        },
        appContext: {
          appConfig: {}
        }
      }
    })

    propsData = {
      comboWidth: 40,
      chunked: true,
      maxChunckedItems: 1,
      eventName: 'aCustomEvent',
      list: [
        { label: 'map', target: 'map', id: '1', enabled: 1, selected: 0 },
        { label: 'chart', target: 'charts', id: '2', enabled: 0, selected: 0 },
        { label: 'fms', target: 'fms', id: '3', enabled: 0, selected: 0 },
        { label: 'cns', target: 'cns', id: '4', enabled: 0, selected: 0 },
        { label: 'chkl', target: 'eclsys', id: '5', enabled: 0, selected: 0 },
        { label: 'sys', target: 'eclsys', id: '6', enabled: 0, selected: 0 },
        { label: 'docs', target: 'docs', id: '7', enabled: 0, selected: 0 },
        { label: 'maint', target: 'maintmenu', id: '8', enabled: 1, selected: 1, default: 1 }]
    }

    disabledSpy = sinon.spy(omsSelectMixin.methods, 'disabledItem')

    getElementByIdStub = sinon.stub(global.document, 'getElementById').callsFake(() => {
      return {
        offsetWidth: 20
      }
    })

    wrapper = shallow(omsselect, { store, propsData })
    list = wrapper.find('.wrapper')[0]
  })

  afterEach(() => {
    getElementByIdStub.restore()
    disabledSpy.restore()
  })

  it('should select', () => {
    let first = wrapper.find('li')[0]
    first.trigger('click')
    expect(disabledSpy.called).to.be.true
  })

  it('should toggle/close combo ', () => {
    wrapper.trigger('click')
    wrapper.trigger('click')
    expect(list.hasClass('opened')).to.be.false
  })

  it('should show have previous or previous when chunked is true', () => {
    expect(wrapper.vm.chunkedList.length).to.be.greaterThan(0)
  })

  it('should have Next when chunk is not last', () => {
    let next = wrapper.find('li')[1]
    expect(next.text()).to.contain('Next')
  })

  it('should have Prev when chunk not first', () => {
    let next = wrapper.find('li')[1]
    next.trigger('click')
    let prev = wrapper.find('li')[0]
    expect(prev.text()).to.contain('Prev')
  })

  it('should return to previous', () => {
    let next = wrapper.find('li')[1]
    next.trigger('click')
    let prev = wrapper.find('li')[0]
    prev.trigger('click')
    expect(wrapper.vm.chunckedIndex).to.equal(0)
  })
})
