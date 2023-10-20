/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import Asidemenu from '@/components/trainer/asidemenu'
import omsKnobHandle from '@/components/trainer/oms/shared/paging/oms-knob-handle-mixin'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/asidemenu.vue', () => {
  let wrapper
  let store
  let scenarios
  let usbs
  let setCurrentScenarioSpy
  let setCurrentUsbSpy
  let emitSpy
  let knobNextSpy
  let knobPrevSpy
  let appContext = {
    getters: {
      getSelectedKnob: () => {}
    }
  }
  let state = {
    selectedKnob: { name: 'selectedKnobName' },
    appContext: {
      selectedScenario: 'default',
      scenarios: [
        { label: 'default', id: 0, selected: 1 },
        { label: 'option 1', id: 1 }
      ],
      usbList: [
        { label: 'default', id: 0, selected: 0, data: {} },
        { label: 'USB Stick 1', id: 1, selected: 1, data: {} }
      ]
    }
  }
  let actions = {
    'appContext/setSelectedScenario': sinon.spy(),
    'appContext/setSelectedUSB': sinon.spy(),
    'appContext/resetContextMenus': sinon.spy()
  }

  let getters = {
    'appContext/getSelectedKnob': sinon.stub(appContext.getters, 'getSelectedKnob').callsFake(() => {
      return state.selectedKnob
    })
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: state,
      actions,
      getters,
      components: {
        omsKnobHandle
      }
    })
    setCurrentScenarioSpy = sinon.spy(Asidemenu.methods, 'setCurrentScenario')
    setCurrentUsbSpy = sinon.spy(Asidemenu.methods, 'setCurrentUsb')
    knobNextSpy = sinon.spy(omsKnobHandle.methods, 'next')
    knobPrevSpy = sinon.spy(omsKnobHandle.methods, 'prev')

    wrapper = shallow(Asidemenu, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    scenarios = wrapper.find('form select')[0]
    usbs = wrapper.find('form select')[1]
  })

  afterEach(() => {
    setCurrentScenarioSpy.restore()
    setCurrentUsbSpy.restore()
    emitSpy.restore()
    knobNextSpy.restore()
    knobPrevSpy.restore()
    getters['appContext/getSelectedKnob'].restore()
  })

  it('should show scenarios list', () => {
    expect(scenarios.find('option').length).to.be.greaterThan(0)
  })

  it('should show USbs list', () => {
    expect(scenarios.find('option').length).to.be.greaterThan(0)
  })

  it('should set selected scenario', () => {
    let selected = scenarios.find('select')[0]
    selected.trigger('change')
    expect(setCurrentScenarioSpy.called).to.be.true
  })

  it('should set selected USB', () => {
    let selected = usbs.find('select')[0]
    selected.trigger('change')
    expect(setCurrentUsbSpy.called).to.be.true
  })

  it('should toggle about', () => {
    let btn = wrapper.find('[title="About application"]')[0]
    btn.trigger('click')
    expect(emitSpy.calledWith('toggleAbout')).to.be.true
  })

  it('should toggle disclaimer', () => {
    let btn = wrapper.find('[title="Application disclaimer"]')[0]
    btn.trigger('click')
    expect(emitSpy.calledWith('toggleDisclaimer')).to.be.true
  })

  it('should trigger knob increase', () => {
    let increaseBtn = wrapper.find('[title="turn knob right"]')[0]
    increaseBtn.trigger('click')
    expect(knobNextSpy.called).to.be.true
    expect(emitSpy.calledWith(`omsKnob-increase${state.selectedKnob.name}PagingCounter`)).to.be.true
  })

  it('should trigger knob decrease', () => {
    let increaseBtn = wrapper.find('[title="turn knob left"]')[0]
    increaseBtn.trigger('click')
    expect(knobPrevSpy.called).to.be.true
    expect(emitSpy.calledWith(`omsKnob-decrease${state.selectedKnob.name}PagingCounter`)).to.be.true
  })
})
