/* eslint-disable no-unused-expressions */

import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import omsPager from '@/components/trainer/oms/shared/paging/oms-pager'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('shared/paging/oms-pager', () => {
  let wrapper
  let store
  let actions
  let clock
  let addSpacerRowSpy
  let offSpy
  let emitSpy
  let getElementByIdStub

  beforeEach(() => {
    actions = {
      'appContext/registerCurrentSelectedKnob': sinon.spy()
    }

    clock = sinon.useFakeTimers()

    store = new Vuex.Store({
      actions
    })

    addSpacerRowSpy = sinon.spy(omsPager.methods, 'addSpacerRow')

    getElementByIdStub = sinon.stub(global.document, 'getElementById').callsFake(() => {
      return {
        setAttribute: () => {},
        insertRow: () => {},
        rows: () => { return [{}, {}] },
        scrollBy: () => {}
      }
    })

    let propsData = {
      currentPage: 1,
      pages: 3
    }

    wrapper = mount(omsPager, {
      store,
      propsData,
      slots: {
        // scrollableContent: {}
      }
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    addSpacerRowSpy.restore()
    getElementByIdStub.restore()
    offSpy.restore()
    emitSpy.restore()
  })

  it('should add an extra row for last page to be even', () => {
    clock.tick(500)
    expect(addSpacerRowSpy.called).to.be.true
  })

  it('should go to next page', done => {
    wrapper.vm.$bus.$emit(`omsKnob-increase${wrapper.vm.id}PagingCounter`)
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should go set scroll', done => {
    wrapper.vm.$bus.$emit(`omsKnob-decrease${wrapper.vm.id}PagingCounter`)
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should increase page count', () => {
    wrapper.vm.pages = 3
    wrapper.vm.nextPage()
    wrapper.update()
    expect(wrapper.vm.currentPage).to.equal(2)
  })

  it('should decrease page count', () => {
    wrapper.vm.pages = 3
    wrapper.vm.currentPage = 3
    wrapper.vm.previousPage()
    wrapper.update()
    expect(wrapper.vm.currentPage).to.equal(2)
  })

  it('should destroy events', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })
})
