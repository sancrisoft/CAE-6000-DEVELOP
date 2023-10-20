/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import systemConfig from '@/components/trainer/oms/maintMenuSections/system-config'
import appContext from '@/store/modules/app-context'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, appContext)

describe('trainer/oms/maintMenuSections/system-config.vue', () => {
  let store
  let wrapper
  let emitSpy
  let offSpy
  let isViewTypeStub
  let isValidCPNspy

  let actions = {
    'appContext/resetContextMenuSelectedChildItem': sinon.spy(),
    'appContext/omsViewPort/maintMenuFilterDataList': sinon.spy(),
    'appContext/setContextMenuSelectedItem': sinon.spy()
  }

  let getters = {
    'appContext/omsViewPort/getViewComboSelectedState': sinon.stub(appContext.modules.omsViewPort.getters, 'getViewComboSelectedState').callsFake((menu) => {
      return { id: 1, label: 'label', target: '', enabled: 1 }
    })
  }

  function isViewTypeFake (key) {
    switch (key) {
      case 'apmConfiguration':
        return true
      case 'softPartNumber':
        return true
      case 'apmThirdParty':
        return true
    }
  }

  isViewTypeStub = sinon.stub(systemConfig.methods, 'isViewType').callsFake(isViewTypeFake)

  isValidCPNspy = sinon.spy(systemConfig.methods, 'isValidCPN')

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          selectedTab: 0,
          omsViewPort: {
            title: 'Utility Functions',
            sortedData: [ { cpn: [{}] }, { cpn: [{}] } ]
          }
        }
      },
      actions,
      getters
    })

    let propsData = {
      currentPage: 1,
      maxItemsPerPage: 1,
      selectedItem: {
        details: {
          items: [{selected: true}],
          header: 'detailsHeader'
        }
      }
    }

    wrapper = shallow(systemConfig, {
      store,
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
    isViewTypeStub.restore()
    isValidCPNspy.restore()
    getters['appContext/omsViewPort/getViewComboSelectedState'].restore()
  })

  it('should set isValidCPN', () => {
    expect(isValidCPNspy.called).to.be.true
  })

  it('should show details', () => {
    wrapper.vm.showDetails(0)
    expect(wrapper.vm.sysConfigDetails).to.be.true
  })

  it('should parse details header', () => {
    wrapper.vm.selectedItem = { details: { header: 'detailsHeader' } }
    wrapper.update()
    expect(wrapper.vm.header).to.equal('detailsHeader')
  })

  it('should hide layer', done => {
    wrapper.vm.$bus.$emit('closeWindow')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should desroy events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
