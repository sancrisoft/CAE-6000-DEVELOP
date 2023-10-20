/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import sinon from 'sinon'
import { expect } from 'chai'
import Scrollable from '@/components/trainer/oms/shared/dynamicComponents/oms-scrollable'
import { polyfill } from 'es6-promise'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import utils from '@/components/trainer/oms/shared/utils/oms-utils'

polyfill()

Vue.use(Vuex, eventBus)

describe('shared/oms-scrollable', () => {
  let store
  let wrapper
  let propsData
  let offSpy
  let topSpy
  let upSpy
  let downSpy
  let bottomSpy
  let getElementByIdStub
  let getRandomIdStub
  let clock
  let getters
  let setScrollSpy
  let appContext = {
    getters: {
      getSelectedKnob: () => {}
    }
  }
  let state = {
    appContext: {
      appConfig: {}
    }
  }

  beforeEach(() => {
    clock = sinon.useFakeTimers()

    getters = {
      'appContext/getSelectedKnob': sinon.stub(appContext.getters, 'getSelectedKnob').callsFake(() => {
        return {
          name: 'oms-scrollable0',
          status: true,
          pages: 1,
          location: 'default'
        }
      })
    }
    store = new Vuex.Store({
      state: state,
      getters: getters
    })

    propsData = {
      slots: {
        scrollableContent: '<table></table>'
      },
      scroll: true,
      fastScroll: true
    }

    getElementByIdStub = sinon.stub(global.document, 'getElementById').callsFake(() => {
      return {
        scrollBy: () => {},
        offsetParent: 'BODY',
        clientLeft: 0,
        offsetLeft: 0,
        children: [{
          firstChild: {
            firstChild: {
              offsetHeight: 20
            }
          }
        }]
      }
    })
    topSpy = sinon.spy(Scrollable.methods, 'top')
    upSpy = sinon.spy(Scrollable.methods, 'up')
    downSpy = sinon.spy(Scrollable.methods, 'down')
    bottomSpy = sinon.spy(Scrollable.methods, 'bottom')
    setScrollSpy = sinon.spy(Scrollable.methods, 'setScroll')
    getRandomIdStub = sinon.stub(utils, 'getRandomId').callsFake(() => {
      return 'oms-scrollable0'
    })

    wrapper = shallow(Scrollable, { store, propsData })
    offSpy = sinon.spy(wrapper.vm, '$off')
    clock.tick(500)
    wrapper.data().scroll = true
    wrapper.update()
  })

  afterEach(() => {
    clock.restore()
    offSpy.restore()
    topSpy.restore()
    upSpy.restore()
    downSpy.restore()
    getElementByIdStub.restore()
    bottomSpy.restore()
    getRandomIdStub.restore()
    setScrollSpy.restore()

    getters['appContext/getSelectedKnob'].restore()
  })

  it('should scroll to top', done => {
    let arrow = wrapper.find('.arrow-top')[0]
    arrow.trigger('click')
    Vue.nextTick(() => {
      expect(topSpy.called).to.be.true
      done()
    })
  })

  it('event should scroll to top', () => {
    wrapper.vm.$bus.$emit('scrollTop-oms-scrollable0')
    expect(topSpy.called).to.be.true
  })

  it('should scroll up', () => {
    let arrow = wrapper.find('.arrow-up')[0]
    arrow.trigger('click')
    expect(upSpy.called).to.be.true
  })

  it('event should scroll up', () => {
    wrapper.vm.$bus.$emit('scrollUp-oms-scrollable0')
    expect(upSpy.called).to.be.true
  })

  it('should scroll down', () => {
    let arrow = wrapper.find('.arrow-dwn')[0]
    arrow.trigger('click')
    expect(downSpy.called).to.be.true
  })

  it('event should scroll down', () => {
    wrapper.vm.$bus.$emit('scrollDown-oms-scrollable0')
    expect(downSpy.called).to.be.true
  })

  it('should scroll to bottom', () => {
    let arrow = wrapper.find('.arrow-dwn')[0]
    arrow.trigger('click')
    expect(downSpy.called).to.be.true
  })

  it('event should scroll to bottom', () => {
    wrapper.vm.$bus.$emit('scrollBottom-oms-scrollable0')
    expect(bottomSpy.called).to.be.true
  })

  it('should respond to oms-knob decrease', done => {
    wrapper.vm.$bus.$emit('omsKnob-decreaseoms-scrollable0PagingCounter')
    Vue.nextTick(() => {
      expect(upSpy.called).to.be.true
      done()
    })
  })

  it('should respond to oms-knob increase', done => {
    wrapper.vm.$bus.$emit('omsKnob-increaseoms-scrollable0PagingCounter')
    Vue.nextTick(() => {
      expect(downSpy.called).to.be.true
      done()
    })
  })

  it('should setScroll', done => {
    wrapper.vm.$bus.$emit('omsScrollable-setScroll')
    clock.tick(500)
    Vue.nextTick(() => {
      expect(setScrollSpy.called).to.be.true
      done()
    })
  })

  it('should hide scroll when refreshing', () => {
    wrapper.setProps({refreshing: true})
    wrapper.update()
    expect(wrapper.data().scroll).to.be.false
  })

  it('should destroy events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
