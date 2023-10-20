/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import lruSysNVMpanel from '@/components/trainer/oms/maintMenuSections/components/lru-sys/lru-sys-nvm-panel'
import maintReportsMock from '@/api/mocks/maintMenuSections/maint-reports'
import omsFileTransferProgressConsumerMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-file-transfer-progress-consumer-mixin'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenuSections/components/lru-sys/lru-sys-nvm-panel.vue', () => {
  let store
  let wrapper
  let clock
  let startSpy

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            writeToComboLabel: maintReportsMock.writeToComboLabel,
            writeToCombo: maintReportsMock.writeToCombo,
            data: {
              files: ['file1.xxx', 'file2.xxx', 'file3.xxx', 'file4.xxx', 'file5.xxx']
            }
          }
        }
      }
    })

    startSpy = sinon.spy(omsFileTransferProgressConsumerMixin.methods, 'start')

    wrapper = shallow(lruSysNVMpanel, {
      store
    })
  })

  afterEach(() => {
    startSpy.restore()
  })

  it('should select write selection', () => {
    wrapper.vm.select(1)
    expect(wrapper.vm.selectedOutput).to.equal(1)
  })

  it('should show select form when not transferring', () => {
    let select = wrapper.find('.selectorForm')[0]
    expect(select).to.not.be.undefined
  })

  it('should transfer files when clicking start btn', () => {
    let startBtn = wrapper.find('.startBtn')[0]
    startBtn.trigger('click')
    wrapper.transferCompletedRatio = 120
    wrapper.update()
    clock.tick(500)
    expect(startSpy.called).to.be.true
  })

  it('should show caution panel when not transferring', () => {
    let caution = wrapper.find('.caution')[0]
    expect(caution).to.not.be.undefined
  })

  it('should show Confirm Selection prompt when clearing NVM data', () => {
    let clearNVMbtn = wrapper.find('.clearBtn')[0]
    clearNVMbtn.trigger('click')
    expect(wrapper.vm.confirmPanel).to.be.true
  })

  it('should close Confirm Clearing NVM Data Selection prompt When clickin No', () => {
    wrapper.vm.clearNVM()
    wrapper.vm.cancelConfirm()
    expect(wrapper.vm.confirmPanel).to.be.false
  })

  it('should show a progress bar while clearing NVM data', () => {
    wrapper.vm.clearNVM()
    expect(wrapper.vm.confirmPanel).to.be.false
    expect(wrapper.vm.clearingNVMdata).to.be.true

    wrapper.vm.completedRatio = 120
    wrapper.update()
    clock.tick(1250)
    expect(wrapper.vm.clearingNVMdata).to.be.false
    expect(wrapper.find('.clearNVMlabel').length).to.be.greaterThan(0)
  })
})
