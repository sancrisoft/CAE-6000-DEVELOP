/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import DataLoadBaseMixin from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-base-mixin'
import DataLoadLayout from '@/components/trainer/oms/maintMenu/dataLoad/components/data-load-layout'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, DataLoadBaseMixin, eventBus)

describe('trainer/oms/maintMenu/dataLoad/components/data-load-layout.vue', () => {
  let store
  let wrapper
  let propsData
  let showErrorsPanelSpy
  let initOverlaysSpy
  let emitSpy
  let offSpy

  beforeEach(() => {
    let actions = {
      'appContext/getContent': sinon.spy(),
      'appContext/omsViewPort/toggleViewSelectedItem': sinon.spy(),
      'appContext/omsViewPort/resetViewSelectedItems': sinon.spy(),
      'appContext/omsViewPort/setHeaderLabel': sinon.stub().callsFake(() => {
        return true
      }),
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/setSelectedView': sinon.spy()
    }

    let mutations = {
      'appContext/omsViewPort/RESET_VIEW_SELECTED_ITEM': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            header: {
              viewBtnLabel: 'Maintenance Data Load',
              viewBtnLabelStates: {
                default: 'Maintenance Data Load',
                alternate: 'Load New Databases'
              },
              viewBtnVisible: true,
              viewBackBtnVisible: false
            },
            title: 'Load New Databases',
            detailsHeader: 'Database Details',
            headerLeft: 'Database',
            headerRight: 'Target/LRU',
            componentName: 'dataload',
            data: {
              items: [
                {itemName: 'item1', id: '0', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item2', id: '1', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item3', id: '2', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item4', id: '3', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item5', id: '4', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item6', id: '5', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item7', id: '6', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item8', id: '7', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item9', id: '8', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item10', id: '9', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item11', id: '10', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item12', id: '11', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item13', id: '12', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item14', id: '13', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item15', id: '14', status: 'Error', data: ['abcd', 'efg']},
                {itemName: 'item16', id: '15', status: 'Error', data: ['abcd', 'efg']}
              ]
            },
            selectedDetails: [
              {itemName: 'item1', id: '0', selected: false, status: 'Error', data: ['abcd', 'efg']},
              {itemName: 'item2', id: '1', selected: false, status: 'Error', data: ['abcd', 'efg']}
            ]
          }
        }
      },
      actions,
      mutations
    })

    propsData = {
      download: true,
      enterpassword: false,
      detailsPanel: false,
      mainPanel: false,
      parentComponentName: 'dataload'
    }
    showErrorsPanelSpy = sinon.spy(DataLoadLayout.methods, 'showErrorsPanel')
    initOverlaysSpy = sinon.spy(DataLoadBaseMixin.methods, 'initOverlays')
    wrapper = mount(DataLoadLayout, { store, propsData })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
    wrapper.data().selectedDetails = [
      {itemName: 'item16', id: '15', status: 'Error', data: ['abcd', 'efg']}
    ]
    wrapper.update()
  })

  afterEach(() => {
    showErrorsPanelSpy.restore()
    initOverlaysSpy.restore()
    emitSpy.restore()
    offSpy.restore()
  })

  it('should show loading message on init', done => {
    Vue.nextTick(() => {
      let layer = wrapper.find('#download')
      expect(layer.length).to.be.greaterThan(0)
      done()
    })
  })

  it('should show enterpassword layer', done => {
    wrapper.vm.enterpassword = true
    wrapper.update()
    Vue.nextTick(() => {
      let layer = wrapper.find('#enterpassword')
      expect(layer.length).to.be.greaterThan(0)
      done()
    })
  })

  it('should show download layer', done => {
    wrapper.vm.download = true

    Vue.nextTick(() => {
      let layer = wrapper.find('#download')
      expect(layer.length).to.be.greaterThan(0)
      done()
    })
  })

  it('should show error dataload errors', done => {
    wrapper.vm.loaderError = true

    Vue.nextTick(() => {
      let loader = wrapper.find('.error')[0]
      let btn = loader.find('.btn')[0]
      btn.trigger('click')

      expect(showErrorsPanelSpy.called).to.be.true
      done()
    })
  })

  it('should show StartloadPanel', () => {
    wrapper.vm.showStartloadPanel()
    // wrapper.vm.$bus.$emit('startload')
    expect(wrapper.data().startload).to.be.true
  })

  it('should show details window', done => {
    // wrapper.vm.$bus.$emit('showDetailsWindow')
    wrapper.vm.showDetailsWindow()
    Vue.nextTick(() => {
      expect(wrapper.data().detailsPanel).to.be.true
      expect(emitSpy.called).to.be.true
      done()
    })
  })

  it('should show btn default label when maintance is shown an reset overlays', () => {
    wrapper.data.enterpassword = true
    wrapper.update()
    wrapper.vm.viewBtnClicked()
    expect(initOverlaysSpy.called).to.be.true
  })

  it('should hide loader and show loaderError', () => {
    wrapper.vm.$bus.$emit('loaderError')
    expect(wrapper.vm.loader).to.be.false
    expect(wrapper.vm.loaderError).to.be.true
  })

  it('should destroy events', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })
})
