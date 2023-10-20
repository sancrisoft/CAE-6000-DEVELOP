/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import maintReportsForm from '@/components/trainer/oms/maintMenuSections/maint-reports-form'

import mock from '@/api/mocks/maintMenuSections/maint-reports'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/maint-reports', () => {
  let store
  let wrapper
  let emitSpy
  let actions = {
    'appContext/omsViewPort/updateComboSelection': sinon.spy()
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          appConfig: {
            acftType: 'global6000'
          },
          omsViewPort: mock
        }
      },
      actions
    })
    wrapper = shallow(maintReportsForm, {
      store
    })

    emitSpy = sinon.spy(wrapper.vm, '$emit')
  })

  afterEach(() => {
  })

  it('should select reports', () => {
    wrapper.vm.reportSelected(0)
    expect(actions['appContext/omsViewPort/updateComboSelection'].called).to.be.true
  })

  it('should select flight leg', () => {
    wrapper.vm.flightLegSelected(0)
    expect(actions['appContext/omsViewPort/updateComboSelection'].called).to.be.true
  })

  it('should select from', () => {
    wrapper.vm.fromSelected(0)
    expect(actions['appContext/omsViewPort/updateComboSelection'].called).to.be.true
  })

  it('should select to', () => {
    wrapper.vm.toSelected(0)
    expect(actions['appContext/omsViewPort/updateComboSelection'].called).to.be.true
  })

  it('should select writeTo', () => {
    wrapper.vm.writeToSelected(0)
    expect(actions['appContext/omsViewPort/updateComboSelection'].called).to.be.true
  })

  it('should start file transfer progress', () => {
    wrapper.vm.start()
    expect(emitSpy.called).to.be.true
  })
})
