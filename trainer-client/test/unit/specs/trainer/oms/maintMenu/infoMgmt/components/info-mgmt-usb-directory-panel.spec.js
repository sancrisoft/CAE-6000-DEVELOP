/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import usbDirectoryPanel from '@/components/trainer/oms/maintMenu/infoMgmt/components/info-mgmt-usb-directory-panel'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('trainer/oms/doscMaintMenu/infoMgmt/components/info-mgmt-usb-directory-panel', () => {
  let store
  let actions
  let wrapper
  let emitSpy
  let toggleSpy

  beforeEach(() => {
    actions = {
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/setSelectedView': sinon.spy(),
      'appContext/omsViewPort/removeInfoMgmtFileTransferSelectedFiles': sinon.spy()
    }
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            data: {
              usbdirectory: [
                { file: '810-0096-1B0001',
                  selected: false,
                  fileName: '810-0096-1B0001_FILES.LUM',
                  childs: [
                    { file: '810-0096-1B0001', selected: false, fileName: '810-0096-1B0001_FILES.LUM' },
                    { file: '810-0096-1B0002', selected: false, fileName: '810-0096-1B0002_FILES.LUM' }
                  ]
                },
                { file: '810-0096-1B0002', selected: false, fileName: '810-0096-1B0002_FILES.LUM' }
              ]
            }
          }
        }
      },
      actions
    })

    toggleSpy = sinon.spy(usbDirectoryPanel.methods, 'toggle')
    wrapper = mount(usbDirectoryPanel, { store })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
    toggleSpy.restore()
  })

  it('should expand list items', () => {
    let expandable = wrapper.find('.oms-directory-list span.expandable')[0]
    expandable.trigger('click')
    expect(toggleSpy.called).to.be.true
  })

  it('should collapse list items visibility', () => {
    let expandable = wrapper.find('.oms-directory-list span.expandable')[0]
    expandable.trigger('click')
    expandable.trigger('click')
    expect(toggleSpy.called).to.be.true
  })

  it('should set file to be transferred', done => {
    let childExpandable = wrapper.find('.oms-directory-list li span.expandable')[0]
    wrapper.vm.$options.parent = {
      currentView: ''
    }
    wrapper.update()
    childExpandable.trigger('click')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it.skip('should set file to be transferred when currentView is backupmediasets', done => {
    let childExpandable = wrapper.find('.oms-directory-list li span.expandable')[0]
    wrapper.vm.$options.parent = {
      currentView: 'backupmediasets'
    }
    wrapper.update()
    childExpandable.trigger('click')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.false
      done()
    })
  })
})
