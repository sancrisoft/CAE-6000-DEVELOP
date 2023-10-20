/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import manageFiles from '@/components/trainer/oms/maintMenu/infoMgmt/manage-files'
import infoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/doscMaintMenu/infoMgmt/manage-files.vue', () => {
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
            }
          }
        }
      },
      actions
    })

    propsData = {
    }
    viewBackBtnClickedSpy = sinon.spy(infoMgmtBaseViewMixin.methods, 'viewBackBtnClicked')
    wrapper = mount(manageFiles, { store, propsData })
  })

  afterEach(() => {
    viewBackBtnClickedSpy.restore()
  })

  it('should go back', () => {
    wrapper.vm.viewBackBtnClicked()
    expect(viewBackBtnClickedSpy.called).to.be.true
  })
})
