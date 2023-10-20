/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import Trainer from '@/components/trainer/trainer-layout'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/trainer-layout.vue', () => {
  let store
  let wrapper
  let toggleAboutSpy
  let toggleDisclaimerSpy
  let confirmStub
  let offSpy

  let appContext = {
    disclaimerAccepted: false,
    appConfig: {
      omsSoftwareversion: '1234',
      omstVersion: 'ABCD',
      omstarVersion: '5678',
      projectName: 'Global Vision OMS Trainer'
    },
    scenarios: {
      currentScenario: 'default',
      list: []
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: appContext
      }
    })

    let propsData = {
      aboutShown: false,
      disclaimerShown: true
    }

    toggleAboutSpy = sinon.spy(Trainer.methods, 'toggleAbout')
    toggleDisclaimerSpy = sinon.spy(Trainer.methods, 'toggleDisclaimer')
    confirmStub = sinon.stub(global.window, 'confirm').returns(true)

    wrapper = shallow(Trainer, { store, propsData })
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    toggleAboutSpy.restore()
    toggleDisclaimerSpy.restore()
    confirmStub.restore()
    offSpy.restore()
  })

  it('should show about', done => {
    wrapper.vm.$bus.$emit('toggleAbout')

    Vue.nextTick(() => {
      expect(toggleAboutSpy.called).to.be.true
      done()
    })
  })

  it('should hide about', done => {
    wrapper.data().aboutShown = true
    appContext.disclaimerAccepted = true
    wrapper.vm.$bus.$emit('toggleAbout')

    Vue.nextTick(() => {
      expect(toggleAboutSpy.called).to.be.true
      expect(Trainer.data().aboutShown).to.be.false
      done()
    })
  })

  it('should show disclaimer on new session', () => {
    expect(wrapper.data().disclaimerShown).to.be.true
  })

  it('should hide disclaimer', done => {
    wrapper.data().disclaimerShown = true
    appContext.disclaimerAccepted = true
    wrapper.vm.$bus.$emit('toggleDisclaimer')

    Vue.nextTick(() => {
      expect(toggleDisclaimerSpy.called).to.be.true
      done()
    })
  })

  it('should destroy events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
