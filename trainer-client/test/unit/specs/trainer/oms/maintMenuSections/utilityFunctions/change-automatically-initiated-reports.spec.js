/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import changeAutomaticallyInitiatedReports from '@/components/trainer/oms/maintMenuSections/utilityFunctions/change-automatically-initiated-reports'
import baseView from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import maintmenuSortedDatalist from '@/components/trainer/oms/maintMenuSections/components/maintmenu-sorted-datalist'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus, maintmenuSortedDatalist)

describe('trainer/oms/maintMenuSections/utilityFunctions/change-automatically-initiated-reports.vue', () => {
  let store
  let wrapper
  let emitSpy
  let actions
  let setAllVisibleItemsSpy
  let nextPageSpy
  let previousPageSpy
  let offSpy

  beforeEach(() => {
    actions = {
      'appContext/omsViewPort/setCheckboxItem': sinon.spy(),
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/resetContextMenuSelectedChildItem': sinon.spy(),
      'appContext/omsViewPort/maintMenuFilterDataList': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            sortedData: [{}, {}],
            toggleSelected: {}
          }
        }
      },
      actions
    })

    setAllVisibleItemsSpy = sinon.spy(changeAutomaticallyInitiatedReports.methods, 'setAllVisibleItems')
    nextPageSpy = sinon.spy(baseView.methods, 'nextPage')
    previousPageSpy = sinon.spy(baseView.methods, 'previousPage')

    wrapper = mount(changeAutomaticallyInitiatedReports, {
      store
    })
    offSpy = sinon.spy(wrapper.vm, '$off')
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    setAllVisibleItemsSpy.restore()
    emitSpy.restore()
    nextPageSpy.restore()
    previousPageSpy.restore()
    offSpy.restore()
  })

  it('should show report trigger header', () => {
    let headerTitle = wrapper.find('.static-table-header')[0].find('.text-shaded')[0]
    expect(headerTitle.text()).to.equal('Report Trigger')
  })

  it('should check all items', done => {
    let checkAllBtn = wrapper.find('.oms-selector-list-btn')[0].find('.btn')[0]
    checkAllBtn.trigger('click')
    Vue.nextTick(() => {
      expect(setAllVisibleItemsSpy.calledWith(true)).to.be.true
      done()
    })
  })

  it('should go to next page when Knob handle is triggered', () => {
    wrapper.vm.$emit('omsKnobIncrease')
    expect(nextPageSpy.called).to.be.true
  })

  it('should go to previous page', () => {
    wrapper.vm.$emit('omsKnobDecrease')
    expect(previousPageSpy.called).to.be.true
  })

  it('should destroy events', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })
})
