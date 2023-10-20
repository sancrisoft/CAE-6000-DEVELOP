/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import InfoMgmtMenu from '@/components/trainer/oms/maintMenu/info-mgmt-menu'
import InfoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/doscMaintMenu/info-mgmt-menu.vue', () => {
  let store
  let wrapper
  let propsData
  let switchViewSpy
  let emitSpy
  let clock
  let data

  beforeEach(() => {
    let actions = {
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/setSelectedView': sinon.spy()
    }

    data = {
      items: [
        { label: 'Configure Wireless Lan', enabled: true, target: 'configureWirelessLan' },
        { label: 'Manage Wireless Lan Connection', enabled: false, target: 'manageWirelessLanConnection' },
        { label: 'Manage Files', enabled: true, target: 'manageFiles' },
        { label: 'Backup Media Sets', enabled: true, target: 'backupMediaSets' },
        { label: 'Restore Media Sets', enabled: true, target: 'restoreMediaSets' },
        { label: 'Manage Cellular Device', enabled: true, target: 'manageCellularDevice' }
      ]
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            data: data
          }
        }
      },
      actions
    })

    propsData = {
      maxCharExceeded: true
    }
    clock = sinon.useFakeTimers()
    switchViewSpy = sinon.spy(InfoMgmtBaseViewMixin.methods, 'switchView')
    wrapper = mount(InfoMgmtMenu, { store, propsData })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    wrapper.vm.current = {'db': 'abcd'}
  })

  afterEach(() => {
    switchViewSpy.restore()
    emitSpy.restore()
  })

  it('should show maxCharExceeded Panel only ounce', () => {
    let list = wrapper.find('#maxCharExceeded')
    clock.tick(2000)
    expect(list.length).to.be.greaterThan(0)
  })

  it('should show a list', () => {
    let list = wrapper.find('.hoverable-list')
    expect(list.length).to.be.greaterThan(0)
  })

  it('should switch view', () => {
    wrapper.vm.switchView({ srcElement: { dataset: {} } }, {enabled: true})
    expect(switchViewSpy.called).to.be.true
  })

  it('should not switchView when item is disabled', () => {
    wrapper.vm.switchView({}, {enabled: false})
    expect(emitSpy.called).to.be.false
  })

  it('should go to parent view when clicking backBtn', done => {
    wrapper.vm.viewBackBtnClicked()
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })
})
