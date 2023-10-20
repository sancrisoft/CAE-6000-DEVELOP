/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import sinon from 'sinon'
import { expect } from 'chai'
import Switcher from '@/components/trainer/oms/shared/dynamicComponents/oms-view-switcher'
import omsSelectMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-select-base-mixin'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, omsSelectMixin)

describe('shared/dynamicComponents/oms-view-switcher.vue', () => {
  let store
  let wrapper
  let mockRouter
  let toggleSpy
  let selectItemSpy
  let propsData
  let getElementByIdStub
  let confirmStub
  let changeViewSpy
  let offSpy

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            manageMenuDisabledText: '',
            selectedDetails: []
          }
        }
      }
    })

    mockRouter = new Router({
      routes: [
        {
          path: '/',
          name: ''
        }
      ]
    })
  })

  describe('selector interaction', () => {
    beforeEach(() => {
      propsData = {
        dynamicLabel: true,
        componentListName: 'manageMenu',
        list: [
          { label: 'map', target: 'map', enabled: 0, selected: 0 },
          { label: 'chart', target: 'charts', enabled: 0, selected: 0 },
          { label: 'fms', target: 'fms', enabled: 0, selected: 0 },
          { label: 'cns', target: 'cns', enabled: 0, selected: 0 },
          { label: 'chkl', target: 'eclsys', enabled: 0, selected: 0 },
          { label: 'sys', target: 'eclsys', enabled: 0, selected: 0 },
          // { label: 'docs', target: 'docs', enabled: 0, selected: 0 },
          { label: 'maint', target: 'maintmenu', enabled: 1, selected: 1 }]
      }
      toggleSpy = sinon.spy(omsSelectMixin.methods, 'toggle')
      changeViewSpy = sinon.spy(Switcher.methods, 'changeView')
      selectItemSpy = sinon.spy(Switcher.methods, 'selectItem')
      getElementByIdStub = sinon.stub(global.document, 'getElementById').callsFake(() => {
        return {
          offsetWidth: 20
        }
      })
      confirmStub = sinon.stub(global.window, 'confirm').returns(true)

      wrapper = mount(Switcher, { store, router: mockRouter, propsData })
      offSpy = sinon.spy(wrapper.vm, '$off')
    })

    afterEach(() => {
      offSpy.restore()
      toggleSpy.restore()
      selectItemSpy.restore()
      getElementByIdStub.restore()
      confirmStub.restore()
      changeViewSpy.restore()
    })

    it('event should toogle manageMenu', done => {
      wrapper.vm.$bus.$emit('manageMenuToggle')
      Vue.nextTick(() => {
        expect(toggleSpy.called).to.be.true
        done()
      })
    })

    it('event should select manageMenu next item', () => {
      wrapper.vm.$bus.$emit('manageMenuSelect', wrapper.vm.$props.list, 'next')
      expect(selectItemSpy.called).to.be.true
    })

    it('event should select manageMenu next item when direction is next', () => {
      let list = [
        { label: 'map', target: 'map', enabled: 0, selected: 1 },
        { label: 'chart', target: 'charts', enabled: 0, selected: 0 },
        { label: 'fms', target: 'fms', enabled: 0, selected: 0 },
        { label: 'cns', target: 'cns', enabled: 0, selected: 0 },
        { label: 'chkl', target: 'eclsys', enabled: 0, selected: 0 },
        { label: 'sys', target: 'eclsys', enabled: 0, selected: 0 },
        { label: 'docs', target: 'docs', enabled: 0, selected: 0 },
        { label: 'maint', target: 'maintmenu', enabled: 1, selected: 1 }]
      wrapper.vm.$bus.$emit('manageMenuSelect', list, 'next')
      expect(selectItemSpy.called).to.be.true
    })

    it('event should select manageMenu first item when last selected is last and directions is next', () => {
      let list = [
        { label: 'map', target: 'map', enabled: 0, selected: 0 },
        { label: 'chart', target: 'charts', enabled: 0, selected: 0 },
        { label: 'fms', target: 'fms', enabled: 0, selected: 0 },
        { label: 'cns', target: 'cns', enabled: 0, selected: 0 },
        { label: 'chkl', target: 'eclsys', enabled: 0, selected: 0 },
        { label: 'sys', target: 'eclsys', enabled: 0, selected: 0 },
        { label: 'docs', target: 'docs', enabled: 0, selected: 0 },
        { label: 'maint', target: 'maintmenu', enabled: 1, selected: 1 }]
      wrapper.vm.$bus.$emit('manageMenuSelect', list, 'next')
      expect(selectItemSpy.called).to.be.true
    })

    it('event should select manageMenu previous item when direction is previous', () => {
      let list = [
        { label: 'map', target: 'map', enabled: 0, selected: 0 },
        { label: 'chart', target: 'charts', enabled: 0, selected: 1 },
        { label: 'fms', target: 'fms', enabled: 0, selected: 0 },
        { label: 'cns', target: 'cns', enabled: 0, selected: 0 },
        { label: 'chkl', target: 'eclsys', enabled: 0, selected: 0 },
        { label: 'sys', target: 'eclsys', enabled: 0, selected: 0 },
        { label: 'docs', target: 'docs', enabled: 0, selected: 0 },
        { label: 'maint', target: 'maintmenu', enabled: 1, selected: 0 }]
      wrapper.vm.$bus.$emit('manageMenuSelect', list, 'previous')
      expect(selectItemSpy.called).to.be.true
    })

    it('event should select manageMenu last item when first is selected and direction is previous', () => {
      let list = [
        { label: 'map', target: 'map', enabled: 0, selected: 1 },
        { label: 'chart', target: 'charts', enabled: 0, selected: 0 },
        { label: 'fms', target: 'fms', enabled: 0, selected: 0 },
        { label: 'cns', target: 'cns', enabled: 0, selected: 0 },
        { label: 'chkl', target: 'eclsys', enabled: 0, selected: 0 },
        { label: 'sys', target: 'eclsys', enabled: 0, selected: 0 },
        { label: 'docs', target: 'docs', enabled: 0, selected: 0 },
        { label: 'maint', target: 'maintmenu', enabled: 1, selected: 0 }]
      wrapper.vm.$bus.$emit('manageMenuSelect', list, 'previous')
      expect(selectItemSpy.called).to.be.true
    })

    it('should switch current view when an enabled list item is clicked', done => {
      let propsData = {
        dynamicLabel: true,
        componentListName: 'maintMenuSections',
        list: [
          { label: 'maint', target: 'maintmenu', enabled: 1, selected: 0 }
        ]
      }
      wrapper = mount(Switcher, { store, propsData })
      let item = wrapper.find('ul')[0].find('li')[0]
      console.log(item)

      item.trigger('click')
      Vue.nextTick(() => {
        expect(changeViewSpy.called).to.be.true
        done()
      })
    })

    it('should disable maintMenu availability', done => {
      propsData = {
        dynamicLabel: true,
        componentListName: 'maintMenu'
      }
      wrapper = mount(Switcher, { store, router: mockRouter, propsData })
      wrapper.vm.$bus.$emit('maintMenuAvailabilityState', true)
      Vue.nextTick(() => {
        expect(wrapper.data().maintMenuDisabled).to.be.true
        done()
      })
    })

    it('should disable oms-views-witcher availability', done => {
      wrapper.vm.$bus.$emit('omsViewSwitcherAvailabilityState', true)
      Vue.nextTick(() => {
        expect(wrapper.data().selectsDisabled).to.be.true
        done()
      })
    })

    it('should disable maintMenuSections availability', done => {
      let propsData = {
        dynamicLabel: true,
        componentListName: 'maintMenuSections'
      }
      wrapper = mount(Switcher, { store, propsData })

      wrapper.vm.$bus.$emit('maintMenuSectionsAvailabilityState', true)
      Vue.nextTick(() => {
        expect(wrapper.data().maintMenuDisabled).to.be.true
        done()
      })
    })

    it('should destroy events', done => {
      wrapper.destroy()
      Vue.nextTick(() => {
        expect(offSpy.called).to.be.true
        done()
      })
    })
  })

  describe('defaults and configurations', () => {
    it('should highlight labels by default', () => {
      let propsData = {
        dynamicLabel: true,
        componentListName: 'listName'
      }
      wrapper = mount(Switcher, { store, propsData })

      let el = wrapper.find('.list-label')[0]
      expect(el.hasClass('highlight')).to.be.true
    })

    it('should show the Down Arrow by default', () => {
      let propsData = {
        dynamicLabel: true,
        componentListName: 'listName'
      }
      wrapper = mount(Switcher, { store, propsData })
      let el = wrapper.find('.label')[0]
      expect(el.hasClass('downArrow')).to.be.true
    })

    it('should set a fixed label title when a value is passed', () => {
      let propsData = {
        dynamicLabel: false,
        componentListName: 'listName',
        componentListLabel: 'Maint Menu'
      }
      wrapper = mount(Switcher, { store, propsData })
      let el = wrapper.find('.list-label')[0]
      expect(el.text()).to.equal('Maint Menu')
    })

    it('should set highlighted label when a value is passed', done => {
      let propsData = {
        highlight: false,
        componentListName: 'listName'
      }
      wrapper = mount(Switcher, { store, propsData })
      let el = wrapper.find('.list-label')[0]

      Vue.nextTick(() => {
        expect(el.hasClass('highlight')).to.be.false
        done()
      })
    })

    it('should set combo width when a value is passed', done => {
      let propsData = {
        fixedSize: 10,
        componentListName: 'listName'
      }
      wrapper = mount(Switcher, { store, propsData })
      let el = wrapper.find('.label')[0]

      Vue.nextTick(() => {
        expect(el.hasStyle('width', '10vh')).to.be.true
        done()
      })
    })

    it('should hide the Down Arrow when a value is passed', () => {
      let propsData = {
        downArrow: false,
        componentListName: 'listName'
      }
      wrapper = mount(Switcher, { store, propsData })
      let el = wrapper.find('.label')[0]
      expect(el.hasClass('downArrow')).to.be.false
    })
  })
})
