/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import omsPagingArrows from '@/components/trainer/oms/shared/paging/oms-paging-arrows'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('shared/paging/oms-paging-arrows', () => {
  let store
  let wrapper
  let previousPageSpy
  let nextPageSpy
  let propsData = {
    headertext: 'some text'
  }

  previousPageSpy = sinon.spy(omsPagingArrows.methods, 'previousPage')
  nextPageSpy = sinon.spy(omsPagingArrows.methods, 'nextPage')

  beforeEach(() => {
    store = new Vuex.Store({})
    wrapper = mount(omsPagingArrows, { store, propsData })
  })

  afterEach(() => {
  })

  it('should show headertext', () => {
    let text = wrapper.find('.counter-text span')[1].text()
    expect(text).to.equal('some text')
  })

  it('should go to previous page', () => {
    let prev = wrapper.find('.prev')[0]
    prev.trigger('click')
    expect(previousPageSpy.called).to.be.true
  })

  it('should go to next page', () => {
    let next = wrapper.find('.next')[0]
    next.trigger('click')
    expect(nextPageSpy.called).to.be.true
  })
})
