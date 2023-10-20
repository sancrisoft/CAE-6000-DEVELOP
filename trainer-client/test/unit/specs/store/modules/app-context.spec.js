/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import axios from 'axios'
import { mount } from 'avoriaz'
import sinon from 'sinon'
import { expect } from 'chai'
import App from '@/components/app'
import appContext from '@/store/modules/app-context'
import appContextService from '@/api/app-context-service'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, appContext)

describe('app-context store', () => {
  let store
  let actions
  let mutations
  let getters
  let axiosGetStub
  let appContextServiceGetSpy
  let getMockContentSpy

  let state = {
    fileTransferMessage: [],
    contextMenusLists: [
      {selected: true, label: ''}
    ],
    header: {
      viewBtnVisible: false,
      viewBackBtnLabel: 'Return to<br/>Info Management',
      viewBackBtnVisible: true
    },
    selectedDetails: [],
    fileTransferMessagesList: [],
    filesToTransferList: [
      { file: '_EXCEEDENCES_10Nov17174246$6348583337', fileName: 'SIM1     _EXCEEDENCES_10Nov17174246$6348583337', selected: true },
      { file: '_EXCEEDENCES_10Nov17193626$6348584019', fileName: 'SIM1     _EXCEEDENCES_10Nov17193626$6348584019', selected: true }
    ],
    appContext: {
      contextMenusLists: {
        'manageMenu': [
          { label: 'maint-menu', target: 'maintmenu', enabled: 1, selected: 1 }
        ],
        'maintMenu': [
          { label: 'maint', target: 'maintmenu', enabled: 1, selected: 1 },
          { label: 'data load', target: 'dataLoad', enabled: 1, selected: 0 },
          { label: 'db status', target: 'dbStatus', enabled: 1, selected: 0 },
          { label: 'info mgmt', target: 'infoMgmtMenu', enabled: 1, selected: 0 },
          { label: 'licence mgmt', target: 'licenceMgmt', enabled: 1, selected: 0 }
        ],
        'maintMenuSections': [
          { label: 'maint menu', target: 'maintmenu', enabled: 1, selected: 0 },
          { label: 'flight deck effects', target: 'flightDeckEffects', enabled: 1, selected: 1 },
          { label: 'fault messages', target: 'faultMessages', enabled: 1, selected: 0 },
          { label: 'service messages', target: 'servicesMessages', enabled: 1, selected: 0 },
          { label: 'system exceedances', target: 'systemExceedances', enabled: 1, selected: 0 },
          { label: 'system trends', target: 'systemTrends', enabled: 1, selected: 0 },
          { label: 'aircraft life cycle', target: 'aircraftLifeCycle', enabled: 1, selected: 0 },
          { label: 'system parameters', target: 'systemParameters', enabled: 1, selected: 0 },
          { label: 'lru/sys operations', target: 'lruSysOperations', enabled: 1, selected: 0 },
          { label: 'system config', target: 'systemConfig', enabled: 1, selected: 0 },
          { label: 'maint reports', target: 'maintReports', enabled: 1, selected: 0 },
          { label: 'utility functions', target: 'utilityFunctions', enabled: 1, selected: 0 }
        ]
      }
    },
    scenarios: [{
      label: 'default'
    }],
    data: {
      filesToTransfer: {
        tousb: [],
        fromusb: []
      },
      items: [{ selected: true }]
    }
  }

  beforeEach(() => {
    actions = {
      'appContext/getAppContext': sinon.spy(appContext.actions, 'getAppContext'),
      'appContext/resetContextMenus': sinon.spy(appContext.actions, 'resetContextMenus'),
      'appContext/getContent': sinon.spy(appContext.actions, 'getContent'),
      'appContext/setContent': sinon.spy(appContext.actions, 'setContent'),
      'appContext/setSelectedView': sinon.spy(appContext.actions, 'setSelectedView'),
      'appContext/resetComponentListItemSelection': sinon.spy(appContext.actions, 'resetComponentListItemSelection'),
      'appContext/omsViewPort/setInfoMgmtfileTransferMessage': sinon.spy(appContext.modules.omsViewPort.actions, 'setInfoMgmtfileTransferMessage'),
      'appContext/omsViewPort/removeInfoMgmtFileTransferSelectedFiles': sinon.spy(appContext.modules.omsViewPort.actions, 'removeInfoMgmtFileTransferSelectedFiles'),
      'appContext/omsViewPort/setInfoMgmtFileTransferSelectedFiles': sinon.spy(appContext.modules.omsViewPort.actions, 'setInfoMgmtFileTransferSelectedFiles'),
      'appContext/omsViewPort/setInfoMgmtViewFilesToTransfer': sinon.spy(appContext.modules.omsViewPort.actions, 'setInfoMgmtViewFilesToTransfer'),
      'appContext/omsViewPort/resetInfoMgmtViewFilesToTransfer': sinon.spy(appContext.modules.omsViewPort.actions, 'resetInfoMgmtViewFilesToTransfer'),
      'appContext/omsViewPort/toggleInfoMgmtViewSelectedFileToTransfer': sinon.spy(appContext.modules.omsViewPort.actions, 'toggleInfoMgmtViewSelectedFileToTransfer'),
      'appContext/omsViewPort/resetViewSelectedItems': sinon.spy(appContext.modules.omsViewPort.actions, 'resetViewSelectedItems'),
      'appContext/omsViewPort/toggleViewSelectedItem': sinon.spy(appContext.modules.omsViewPort.actions, 'toggleViewSelectedItem'),
      'appContext/omsViewPort/setViewSelectSelectedItem': sinon.spy(appContext.modules.omsViewPort.actions, 'setViewSelectSelectedItem'),
      'appContext/omsViewPort/setHeaderLabel': sinon.spy(appContext.modules.omsViewPort.actions, 'setHeaderLabel')
    }

    mutations = {
      'SET_SCENARIOS': sinon.spy(appContext.mutations, 'SET_SCENARIOS'),
      'SET_CONTEXTMENUS': sinon.spy(appContext.mutations, 'SET_CONTEXTMENUS'),
      'SET_APPCONFIG': sinon.spy(appContext.mutations, 'SET_APPCONFIG'),
      'RESET_COMPONENT_LIST_ITEM_SELECTION': sinon.spy(appContext.mutations, 'RESET_COMPONENT_LIST_ITEM_SELECTION'),
      'SET_CONTENT': sinon.spy(appContext.mutations, 'SET_CONTENT'),
      'SET_SELECTEDVIEW': sinon.spy(appContext.mutations, 'SET_SELECTEDVIEW'),
      'SET_INFOMGMT_FILE_TRANSFER_SELECTED_MESSAGE': sinon.spy(appContext.modules.omsViewPort.mutations, 'SET_INFOMGMT_FILE_TRANSFER_SELECTED_MESSAGE'),
      'REMOVE_INFOMGMT_FILE_TRANSFER_SELECTED_FILES': sinon.spy(appContext.modules.omsViewPort.mutations, 'REMOVE_INFOMGMT_FILE_TRANSFER_SELECTED_FILES'),
      'SET_INFOMGMT_FILE_TRANSFER_SELECTED_FILES': sinon.spy(appContext.modules.omsViewPort.mutations, 'SET_INFOMGMT_FILE_TRANSFER_SELECTED_FILES'),
      'SET_INFOMGMT_VIEW_FILES_TO_TRANSFER': sinon.spy(appContext.modules.omsViewPort.mutations, 'SET_INFOMGMT_VIEW_FILES_TO_TRANSFER'),
      'RESET_INFOMGMT_VIEW_FILES_TO_TRANSFER': sinon.spy(appContext.modules.omsViewPort.mutations, 'RESET_INFOMGMT_VIEW_FILES_TO_TRANSFER'),
      'TOGGLE_INFOMGMT_VIEW_SELECTED_FILE_TO_TRANSFER': sinon.spy(appContext.modules.omsViewPort.mutations, 'TOGGLE_INFOMGMT_VIEW_SELECTED_FILE_TO_TRANSFER'),
      'RESET_VIEW_SELECTED_ITEM': sinon.spy(appContext.modules.omsViewPort.mutations, 'RESET_VIEW_SELECTED_ITEM'),
      'SET_VIEW_SELECTED_ITEM': sinon.spy(appContext.modules.omsViewPort.mutations, 'SET_VIEW_SELECTED_ITEM'),
      'SET_VIEW_SELECT_SELECTED_ITEM': sinon.spy(appContext.modules.omsViewPort.mutations, 'SET_VIEW_SELECT_SELECTED_ITEM'),
      'SET_HEADER_LABEL': sinon.spy(appContext.modules.omsViewPort.mutations, 'SET_HEADER_LABEL')
    }

    getters = {
      'appContext/getContextMenuListSelectedState': sinon.spy(appContext.getters, 'getContextMenuListSelectedState')
    }

    axiosGetStub = sinon.stub(axios, 'get').returns({})
    appContextServiceGetSpy = sinon.stub(appContextService, 'get').returns({
      appConfig: {
        mocked: false
      }
    })
    getMockContentSpy = sinon.spy(appContextService, 'getMockContent')

    store = new Vuex.Store({
      state: state,
      actions,
      mutations,
      getters
    })

    let mockRouter = new Router({
      routes: [
        {
          path: '/',
          name: ''
        }
      ]
    })

    mount(App, { store, router: mockRouter })
  })

  afterEach(() => {
    actions['appContext/getAppContext'].restore()
    actions['appContext/resetContextMenus'].restore()
    actions['appContext/getContent'].restore()
    actions['appContext/setContent'].restore()
    actions['appContext/setSelectedView'].restore()
    actions['appContext/resetComponentListItemSelection'].restore()
    actions['appContext/omsViewPort/setInfoMgmtfileTransferMessage'].restore()
    actions['appContext/omsViewPort/removeInfoMgmtFileTransferSelectedFiles'].restore()
    actions['appContext/omsViewPort/setInfoMgmtFileTransferSelectedFiles'].restore()
    actions['appContext/omsViewPort/setInfoMgmtViewFilesToTransfer'].restore()
    actions['appContext/omsViewPort/resetInfoMgmtViewFilesToTransfer'].restore()
    actions['appContext/omsViewPort/toggleInfoMgmtViewSelectedFileToTransfer'].restore()
    actions['appContext/omsViewPort/resetViewSelectedItems'].restore()
    actions['appContext/omsViewPort/toggleViewSelectedItem'].restore()
    actions['appContext/omsViewPort/setViewSelectSelectedItem'].restore()
    actions['appContext/omsViewPort/setHeaderLabel'].restore()

    mutations['SET_SCENARIOS'].restore()
    mutations['SET_CONTEXTMENUS'].restore()
    mutations['SET_APPCONFIG'].restore()
    mutations['RESET_COMPONENT_LIST_ITEM_SELECTION'].restore()
    mutations['SET_CONTENT'].restore()
    mutations['SET_SELECTEDVIEW'].restore()
    mutations['SET_INFOMGMT_FILE_TRANSFER_SELECTED_MESSAGE'].restore()
    mutations['REMOVE_INFOMGMT_FILE_TRANSFER_SELECTED_FILES'].restore()
    mutations['SET_INFOMGMT_FILE_TRANSFER_SELECTED_FILES'].restore()
    mutations['SET_INFOMGMT_VIEW_FILES_TO_TRANSFER'].restore()
    mutations['RESET_INFOMGMT_VIEW_FILES_TO_TRANSFER'].restore()
    mutations['TOGGLE_INFOMGMT_VIEW_SELECTED_FILE_TO_TRANSFER'].restore()
    mutations['RESET_VIEW_SELECTED_ITEM'].restore()
    mutations['SET_VIEW_SELECTED_ITEM'].restore()
    mutations['SET_VIEW_SELECT_SELECTED_ITEM'].restore()
    mutations['SET_HEADER_LABEL'].restore()

    getters['appContext/getContextMenuListSelectedState'].restore()

    axiosGetStub.restore()
    appContextServiceGetSpy.restore()
    getMockContentSpy.restore()
  })
  describe('module/omsViewPort', () => {
    it('should set InfoMgmt fileTransferMessage', done => {
      store.dispatch('appContext/omsViewPort/setInfoMgmtfileTransferMessage', 0)
      Vue.nextTick(() => {
        expect(mutations['SET_INFOMGMT_FILE_TRANSFER_SELECTED_MESSAGE'].called).to.be.true
        done()
      })
    })

    it('should remove InfoMgmt fileTransfer Selected Files', done => {
      store.dispatch('appContext/omsViewPort/removeInfoMgmtFileTransferSelectedFiles', 0)
      Vue.nextTick(() => {
        expect(mutations['REMOVE_INFOMGMT_FILE_TRANSFER_SELECTED_FILES'].called).to.be.true
        done()
      })
    })

    it('should set InfoMgmt fileTransfer Selected Files', done => {
      store.dispatch('appContext/omsViewPort/setInfoMgmtFileTransferSelectedFiles', 0)
      Vue.nextTick(() => {
        expect(mutations['SET_INFOMGMT_FILE_TRANSFER_SELECTED_FILES'].called).to.be.true
        done()
      })
    })

    it('should set InfoMgmt files to Transfer', done => {
      store.dispatch('appContext/omsViewPort/setInfoMgmtViewFilesToTransfer', {fileName: ''})
      Vue.nextTick(() => {
        expect(mutations['SET_INFOMGMT_VIEW_FILES_TO_TRANSFER'].called).to.be.true
        done()
      })
    })
    it('should reset InfoMgmt files to Transfer', done => {
      store.dispatch('appContext/omsViewPort/resetInfoMgmtViewFilesToTransfer', {fileName: ''})
      Vue.nextTick(() => {
        expect(mutations['RESET_INFOMGMT_VIEW_FILES_TO_TRANSFER'].called).to.be.true
        done()
      })
    })

    it.skip('should toggle InfoMgmt view selected files to Transfer', done => {
      store.dispatch('appContext/omsViewPort/toggleInfoMgmtViewSelectedFileToTransfer', {fileName: 'aName'})
      Vue.nextTick(() => {
        expect(mutations['TOGGLE_INFOMGMT_VIEW_SELECTED_FILE_TO_TRANSFER'].called).to.be.true
        done()
      })
    })
    it('should reset InfoMgmt view selected Items', done => {
      store.dispatch('appContext/omsViewPort/resetViewSelectedItems')
      Vue.nextTick(() => {
        expect(mutations['RESET_VIEW_SELECTED_ITEM'].called).to.be.true
        done()
      })
    })

    it('should toggle InfoMgmt view selected Items', done => {
      store.dispatch('appContext/omsViewPort/toggleViewSelectedItem', 0)
      Vue.nextTick(() => {
        expect(mutations['SET_VIEW_SELECTED_ITEM'].called).to.be.true
        done()
      })
    })
    it('should set InfoMgmt view selected Items', done => {
      store.dispatch('appContext/omsViewPort/setViewSelectSelectedItem', 0)
      Vue.nextTick(() => {
        expect(mutations['SET_VIEW_SELECT_SELECTED_ITEM'].called).to.be.true
        done()
      })
    })
    it('should set header label', done => {
      store.dispatch('appContext/omsViewPort/setHeaderLabel', {
        label: 'viewBtnLabel',
        value: 'storeValue'
      })
      Vue.nextTick(() => {
        expect(mutations['SET_HEADER_LABEL'].called).to.be.true
        done()
      })
    })
  })

  it('should get mocked content when appconfig.mocked is set to true', done => {
    store.dispatch('appContext/getContent', { component: 'maintMenu', view: 'maintmenu' })
    Vue.nextTick(() => {
      expect(getMockContentSpy.called).to.be.true
      done()
    })
  })

  it.skip('should get real content when appconfig.mocked is set to false', done => {
    store.dispatch('appContext/getContent', { component: 'maintMenu', view: 'maintmenu' })
    Vue.nextTick(() => {
      expect(axiosGetStub.called).to.be.true
      done()
    })
  })

  it('should set content from appContext/getContent response', done => {
    store.dispatch('appContext/setContent', { component: 'maintMenu', view: 'maintmenu' })
    Vue.nextTick(() => {
      expect(mutations['SET_CONTENT'].called).to.be.true
      done()
    })
  })

  it('should reset header menus', done => {
    store.dispatch('appContext/resetContextMenus')

    Vue.nextTick(() => {
      expect(mutations['RESET_COMPONENT_LIST_ITEM_SELECTION'].called).to.be.true
      done()
    })
  })

  it('should load content when changing currentView', done => {
    store.dispatch('appContext/setContent', {data: {}})

    Vue.nextTick(() => {
      expect(mutations['SET_CONTENT'].called).to.be.true
      done()
    })
  })

  it('should set the selected view', done => {
    let obj = { component: 'maintMenu', view: 'maintmenu' }
    store.dispatch('appContext/setSelectedView', obj)

    Vue.nextTick(() => {
      expect(mutations['RESET_COMPONENT_LIST_ITEM_SELECTION'].called).to.be.true
      expect(mutations['SET_SELECTEDVIEW'].called).to.be.true
      done()
    })
  })

  it('should set omsViewSwitcher selected item to default', done => {
    store.dispatch('appContext/resetComponentListItemSelection', 'maintMenu')

    Vue.nextTick(() => {
      expect(mutations['RESET_COMPONENT_LIST_ITEM_SELECTION'].called).to.be.true
      done()
    })
  })

  it('maintMenu maint', () => {
    let view = store.getters['appContext/getContextMenuListSelectedState']('maintMenu')

    expect(view.target).to.equal('maintmenu')
    expect(view.label).to.equal('maint')
  })
})
