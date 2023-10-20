/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import configureWirelessLan from '@/components/trainer/oms/maintMenu/infoMgmt/configure-wireless-lan'
import infoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/doscMaintMenu/infoMgmt/configure-wireless-lan.vue', () => {
  let store
  let wrapper
  let propsData
  let viewBackBtnClickedSpy

  beforeEach(() => {
    let actions = {
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/setSelectedView': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            data: {
              encryptionTypes: [{id: 0, label: 'Open None', selected: 1}],
              keyCodes: [{id: 0, label: 'ascii', selected: 1}],
              configurations: [
                {id: 0, priority: 1, desc: 'abcd'},
                {id: 1, priority: 2, desc: 'efgh'},
                {id: 2, priority: 3, desc: 'ijkl'}
              ]
            }
          }
        }
      },
      actions
    })

    propsData = {
    }
    viewBackBtnClickedSpy = sinon.spy(infoMgmtBaseViewMixin.methods, 'viewBackBtnClicked')
    wrapper = mount(configureWirelessLan, { store, propsData })
  })

  afterEach(() => {
    viewBackBtnClickedSpy.restore()
  })

  it('should set selected encryptionType', () => {
    wrapper.vm.selectEncryptionType(0)
    expect(wrapper.vm.selectedEncryptionType.label).to.equal('Open None')
  })

  it('should set selected KeyCode', () => {
    wrapper.vm.selectKeyCode(0)
    expect(wrapper.vm.selectedKeyCode.label).to.equal('ascii')
  })

  it('should go back', () => {
    wrapper.vm.viewBackBtnClicked()
    expect(viewBackBtnClickedSpy.called).to.be.true
  })
})
