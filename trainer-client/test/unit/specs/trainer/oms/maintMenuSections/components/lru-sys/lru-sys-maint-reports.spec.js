/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import lruSysMaintReports from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-maint-reports'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/lru-sys/lru-sys-maint-reports.vue', () => {
  let store
  let wrapper
  let emitSpy
  let offSpy

  let actions = {
    'appContext/omsViewPort/updateComboSelection': sinon.spy(),
    'appContext/setContextMenuSelectedItem': sinon.spy(),
    'appContext/resetContextMenuSelectedChildItem': sinon.spy(),
    'appContext/omsViewPort/maintMenuFilterDataList': sinon.spy(),
    'appContext/resetViewBackBtnOverride': sinon.spy()
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          viewBackBtnOverride: {
            label: 'overriddenLabel',
            target: 'overriddenTarget'
          },
          omsViewPort: {
            sortedData: [],
            data: {
              files: ['file1.xxx', 'file2.xxx', 'file3.xxx', 'file4.xxx', 'file5.xxx']
            }
          }
        }
      },
      actions
    })

    let propsData = {
    }

    wrapper = shallow(lruSysMaintReports, {
      store,
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
  })

  it('should set backBtn withview BackBtnOverride data', () => {
    expect(wrapper.vm.viewBackBtnOverride.label).to.equal('overriddenLabel')
  })

  it('should go back to overridden target', () => {
    wrapper.vm.viewBackBtnClicked()
    expect(emitSpy.args[0][0]).to.equal('switchView')
    expect(emitSpy.args[0][1].view).to.equal('overriddenTarget')
  })
  it('should reset BackBtnOverride when going back to parent view', () => {
    wrapper.destroy()
    expect(actions['appContext/resetViewBackBtnOverride'].called).to.be.true
  })
})
