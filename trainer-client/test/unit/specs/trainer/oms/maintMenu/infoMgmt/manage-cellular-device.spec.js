/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import manageCellularDevice from '@/components/trainer/oms/maintMenu/infoMgmt/manage-cellular-device'
import infoMgmtBaseViewMixin from '@/components/trainer/oms/maintMenu/infoMgmt/info-mgmt-base-view-mixin'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/doscMaintMenu/infoMgmt/manage-cellular-device.vue', () => {
  let store
  let wrapper
  let propsData
  let viewBackBtnClickedSpy
  let emitSpy
  let offSpy
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
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
    wrapper = mount(manageCellularDevice, { store, propsData })

    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm.$bus, '$off')
  })

  afterEach(() => {
    viewBackBtnClickedSpy.restore()
    emitSpy.restore()
    offSpy.restore()
  })

  describe('when selecting Connect to GMS', () => {
    it('should transfer files', done => {
      wrapper.vm.$bus.$emit('cellularConnectionChanged', 1)
      Vue.nextTick(() => {
        expect(emitSpy.called).to.be.true
        done()
      })
    })

    it('should set display label to connecting', (done) => {
      wrapper.vm.$bus.$emit('cellularConnectionChanged', 1)
      Vue.nextTick(() => {
        expect(wrapper.vm.status).to.equal('connecting')
        done()
      })
    })
  })

  describe('error scenario', () => {
    it('should show connecting panel', () => {
      wrapper.vm.error = 0
      wrapper.vm.toggleError()
      expect(wrapper.vm.error).to.be.true
    })

    it('should hide connectingPanel after delay', () => {
      wrapper.vm.error = 1
      wrapper.vm.toggleError()
      expect(wrapper.vm.error).to.be.false
    })

    it('should show error status after delay', () => {
      wrapper.vm.$bus.$emit('cellularConnectionChanged', '1')
      clock.tick(2000)
      wrapper.vm.displayErrorStatus()

      expect(wrapper.vm.status).to.equal('error')
    })

    it('should reset selected to disconected ', (done) => {
      wrapper.vm.resetSelector()
      Vue.nextTick(() => {
        expect(wrapper.vm.resetValue).to.equal(1)
        done()
      })
    })
  })
  it('should go back', () => {
    wrapper.vm.viewBackBtnClicked()
    expect(viewBackBtnClickedSpy.called).to.be.true
  })

  it('should destroy events', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })
})
