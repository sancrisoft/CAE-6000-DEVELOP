/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import LicenceMgmt from '@/components/trainer/oms/maintMenu/licence-mgmt'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/doscMaintMenu/licence-mgmt.vue', () => {
  let store
  let wrapper
  let propsData
  let confirmStub
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    let actions = {
      'appContext/setContextMenuSelectedItem': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            data: {
              licences: [
                { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'disabled' },
                { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled' }
              ]
            }
          }
        }
      },
      actions
    })

    propsData = {
      validationMessage: 'Validation Message'
    }

    confirmStub = sinon.stub(window, 'confirm').returns(true)

    wrapper = shallow(LicenceMgmt, { store, propsData })
  })

  afterEach(() => {
    confirmStub.restore()
  })

  it('should show key input', () => {
    let btn = wrapper.find('.activation-key')[0]
    btn.trigger('click')
    expect(wrapper.vm.keyInput).to.be.true
  })

  it('should show Cycle System Power Dialog', () => {
    wrapper.vm.validate('1234567890ABC')
    clock.tick(1000)
    expect(wrapper.vm.keyValid).to.be.true
  })

  it('should show ALM overlay', () => {
    wrapper.vm.showSystemPowerCycleDialog()
    clock.tick(1000)
    expect(confirmStub.called).to.be.true
    expect(wrapper.vm.recycling).to.be.true
    clock.tick(2000)
  })

  it('should not show ALM overlay when key is invalid', () => {
    wrapper.vm.validate('1234')
    expect(confirmStub.called).to.be.false
    expect(wrapper.vm.recycling).to.be.false
  })

  it('should hide ALM overlay after delay * 2', () => {
    wrapper.vm.showSystemPowerCycleDialog()
    clock.tick(2000)
    expect(wrapper.data().recycling).to.be.false
    expect(wrapper.data().keyInput).to.be.false
    expect(wrapper.data().validating).to.be.false
  })
})
