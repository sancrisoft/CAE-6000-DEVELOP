/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import omsLayout from '@/components/trainer/oms/oms-layout-container'
import nav from '@/api/mocks/navigation'
import appContext from '@/store/modules/app-context'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/oms-layout-container.vue', () => {
  let store
  let actions
  let getters
  let wrapper
  let setCurrentViewSpy
  let setViewSpy
  let mockRouter
  let getContextMenuListSelectedStateSpy
  let offSpy
  let loadViewSpy

  beforeEach(() => {
    actions = {
      'appContext/getContent': sinon.stub(appContext.actions, 'getContent').callsFake(() => {
        return {}
      }),
      'appContext/setContent': sinon.stub(appContext.actions, 'setContent').callsFake(() => {
        return true
      }),
      'appContext/omsViewPort/maintMenuFilterDataList': sinon.spy(),
      'appContext/setSelectedView': sinon.spy(),
      'appContext/omsViewPort/resetViewSelectedItems': sinon.spy(),
      'appContext/omsViewPort/setHeaderLabel': sinon.spy(),
      'appContext/getContextMenuListSelectedState': sinon.spy(),
      'appContext/setContextMenuSelectedItem': sinon.spy(),
      'appContext/resetContextMenuSelectedChildItem': sinon.spy(),
      'appContext/omsViewPort/removeInfoMgmtFileTransferSelectedFiles': sinon.spy()
    }

    getters = {
      'appContext/getContextMenuListSelectedState': sinon.stub(appContext.getters, 'getContextMenuListSelectedState').callsFake((menu) => {
        return { id: 1, label: 'flight deck effects', target: 'flightDeckEffects', enabled: 1, selected: 1, child: { target: 'flightdeckeffectssummary', selected: 1 } }
      })
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          appConfig: {
            acftType: '7000',
            showPagerDisplayArrows: true
          },
          contextMenusLists: {
            'manageMenu': nav.viewSwitchers.manageMenu,
            'maintMenu': nav.viewSwitchers.maintMenu,
            'maintMenuSections': nav.viewSwitchers.maintMenuSections
          },
          omsViewPort: {
            header: {
              viewBtnLabel: '',
              viewBtnLabelStates: {}
            },
            data: {
              maintmenu: {
                main: [
                  { label: 'View FlightDeck Effects', target: 'flightDeckEffects' },
                  { label: 'View Fault Messages', target: 'faultMessages' },
                  { label: 'View Service Messages', target: 'serviceMessages' },
                  { label: 'View System Exceedances', target: 'systemExceedances' },
                  { label: 'View System Trends', target: 'systemTrends' },
                  { label: 'View Aircraft Life Cycle Data', target: 'faultMessages' },
                  { label: 'View System Parameters', target: 'systemParameters' },
                  { label: 'View LRU/System Operations', target: 'lruSysOperations' },
                  { label: 'View System Configuration Data', target: 'systemConfig' },
                  { label: 'View System Maintenance Reports', target: 'maintReports' }
                ],
                utility: [
                  { label: 'View System Utility Functions', target: 'utilityFunctions' }
                ]
              }
            }
          }
        },
        scenarios: {
          currentScenario: 'default',
          list: []
        }
      },
      actions,
      getters
    })

    function fakeGetter (menu) {
      return store.state.appContext.contextMenusLists[menu].filter((item) => {
        if (item.selected) {
          return item
        }
      })
    }

    getContextMenuListSelectedStateSpy = sinon.stub(omsLayout.methods, 'getContextMenuListSelectedState').callsFake(fakeGetter)

    setCurrentViewSpy = sinon.spy(omsLayout.methods, 'setCurrentView')
    setViewSpy = sinon.spy(omsLayout.methods, 'setView')
    loadViewSpy = sinon.spy(omsLayout.methods, 'loadView')
    mockRouter = new Router({
      routes: [
        {
          path: '/trainer',
          name: 'trainer-layout'
        }
      ]
    })

    let propsData = {
      currentView: 'maintmenu',
      maintMenuSectionsVisibility: false
    }

    wrapper = mount(omsLayout, { store, router: mockRouter, propsData })
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    setCurrentViewSpy.restore()
    setViewSpy.restore()
    getContextMenuListSelectedStateSpy.restore()
    loadViewSpy.restore()
    offSpy.restore()
    actions['appContext/getContent'].restore()
    actions['appContext/setContent'].restore()
    getters['appContext/getContextMenuListSelectedState'].restore()
  })

  it('should load targeted view', done => {
    wrapper.vm.loadView({ component: 'maintmenu', view: 'manageFiles' })
    Vue.nextTick(() => {
      expect(actions['appContext/getContent'].called).to.be.true
      done()
    })
  })

  it('should set view Content', done => {
    wrapper.vm.loadView({ component: 'maintMenu', view: 'manageFiles' })
    Vue.nextTick(() => {
      expect(actions['appContext/getContent'].called).to.be.true
      Vue.nextTick(() => {
        expect(actions['appContext/setContent'].called).to.be.true
        done()
      })
      done()
    })
  })

  it('should load currentView', done => {
    wrapper.vm.loadView({ component: 'maintMenu', view: 'manageFiles' })
    Vue.nextTick(() => {
      expect(actions['appContext/getContent'].called).to.be.true
      Vue.nextTick(() => {
        expect(actions['appContext/setContent'].called).to.be.true
        done()
        Vue.nextTick(() => {
          expect(setCurrentViewSpy.called).to.be.true
          expect(wrapper.data().currentView.toLowerCase()).to.equal('managefiles')
          done()
        })
      })
    })
  })

  it('should return to maintMenuSection previously selected item', done => {
    wrapper.vm.setView({ component: 'maintMenu', view: 'maintmenu' })
    Vue.nextTick(() => {
      expect(loadViewSpy.calledWith({ component: 'maintMenu', view: 'flightdeckeffectssummary', id: 1 }))
      done()
    })
  })

  it('should change view through bus event', done => {
    wrapper.vm.$bus.$emit('switchView', { component: 'maintMenu', view: 'maintmenu' })

    Vue.nextTick(() => {
      expect(setViewSpy.called).to.be.true
      done()
    })
  })

  it('should detroy events', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })
})
