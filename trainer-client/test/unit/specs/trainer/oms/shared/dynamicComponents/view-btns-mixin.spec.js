/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import Mixin from '@/components/trainer/oms/shared/dynamicComponents/view-btns-consumer-mixin'
import DataLoad from '@/components/trainer/oms/maintMenu/data-load'
import DataLoadBaseMixin from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-base-mixin'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus, Mixin, DataLoadBaseMixin)

let wrapper
let store
let actions
let mutations
let viewBtnClickSpy
let viewBackBtnClickSpy
let offSpy
let consoleStub

describe('trainer/shared/dynamicComponents/view-btns-mixin', () => {
  beforeEach(() => {
    actions = {
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/setSelectedView': sinon.spy(),
      'appContext/getContent': sinon.spy(),
      'appContext/omsViewPort/setHeaderLabel': sinon.spy(),
      'appContext/omsViewPort/resetViewSelectedItems': sinon.spy()
    }

    mutations = {
      'appContext/omsViewPort/RESET_VIEW_SELECTED_ITEM': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            header: {
              viewBtnLabel: 'Maintenance Data Load',
              viewBtnLabelStates: {}
            },
            data: {}
          }
        }
      },
      actions,
      mutations
    })

    wrapper = mount(DataLoad, { store })
    viewBtnClickSpy = sinon.spy(DataLoadBaseMixin.methods, 'viewBtnClicked')
    viewBackBtnClickSpy = sinon.spy(DataLoadBaseMixin.methods, 'viewBackBtnClicked')
    offSpy = sinon.spy(wrapper.vm, '$off')
    consoleStub = sinon.stub(global.console, 'warn').callsFake(() => {
      return false
    })
  })

  afterEach(() => {
    viewBtnClickSpy.restore()
    viewBackBtnClickSpy.restore()
    offSpy.restore()
    consoleStub.restore()
  })

  it.skip('should call overridden viewBtnClick event', done => {
    wrapper.vm.$bus.$emit('viewBtnEvent')

    Vue.nextTick(() => {
      expect(viewBtnClickSpy.called).to.be.true
      done()
    })
  })

  it.skip('should call overridden viewBackBtnClick event', done => {
    wrapper.vm.$bus.$emit('viewBackBtnEvent')
    Vue.nextTick(() => {
      expect(viewBackBtnClickSpy.called).to.be.true
      done()
    })
  })

  it('should warn when viewBtnClick is not overriden', done => {
    Mixin.methods.viewBtnClicked()

    Vue.nextTick(() => {
      expect(consoleStub.called).to.be.true
      done()
    })
  })

  it('should warn when viewBackBtnClick in not overriden', done => {
    Mixin.methods.viewBackBtnClicked()

    Vue.nextTick(() => {
      expect(consoleStub.called).to.be.true
      done()
    })
  })

  it('should destroy btns events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
