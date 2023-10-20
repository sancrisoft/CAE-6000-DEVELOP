/* eslint-disable no-unused-expressions */

import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import systemExceedancesSummary from '@/components/trainer/oms/maintMenuSections/system-exceedances-summary'
import maintMenuBaseSummaryViewMixin from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-summary-view-mixin'
import appContext from '@/store/modules/app-context'
import nav from '@/api/mocks/navigation'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, appContext)

polyfill()

describe('maintMenuSection summary pages', () => {
  let store
  let wrapper
  let emitSpy
  let offSpy
  let refreshSpy
  let expandAllSpy
  let collapseAll
  let clock
  let getContextMenuListSelectedStateSpy

  let actions = {
    'appContext/omsViewPort/maintMenuFilterDataList': sinon.spy(),
    'appContext/setContextMenuSelectedItem': sinon.spy(),
    'appContext/setContextMenuSelectedChildItem': sinon.spy(),
    'appContext/setSelectedView': sinon.spy(),
    'appContext/omsViewPort/updateComboSelection': sinon.spy(),
    'appContext/resetContextMenuSelectedChildItem': sinon.spy()
  }

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    store = new Vuex.Store({
      state: {
        appContext: {
          contextMenusLists: {
            'manageMenu': nav.viewSwitchers.manageMenu,
            'maintMenu': nav.viewSwitchers.maintMenu,
            'maintMenuSections': nav.viewSwitchers.maintMenuSections
          },
          selectedTab: 0,
          omsViewPort: {
            title: 'System Exceedances Summary',
            header: {},
            data: {
              fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' },
              faultMSGS: [{}],
              fdeData: [{}],
              msgData: [{}],
              lruData: []
            },
            sortedData: []
          }
        }
      },
      actions
    })

    function fakeGetter (menu) {
      return store.state.appContext.contextMenusLists[menu].filter((item) => {
        if (item.selected) {
          return item
        }
      })
    }

    getContextMenuListSelectedStateSpy = sinon.stub(maintMenuBaseSummaryViewMixin.methods, 'getContextMenuListSelectedState').callsFake(fakeGetter)

    refreshSpy = sinon.spy(maintMenuBaseSummaryViewMixin.methods, 'refresh')
    expandAllSpy = sinon.spy(maintMenuBaseSummaryViewMixin.methods, 'expandAll')
    collapseAll = sinon.spy(maintMenuBaseSummaryViewMixin.methods, 'collapseAll')

    let propsData = {
    }

    wrapper = shallow(systemExceedancesSummary, {
      store,
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
    refreshSpy.restore()
    collapseAll.restore()
    expandAllSpy.restore()
    getContextMenuListSelectedStateSpy.restore()
  })

  it('should destroy events', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })

  it('should refresh', () => {
    wrapper.vm.$bus.$emit('directory-list-refresh')
    clock.tick(500)
    expect(refreshSpy.called).to.be.true
  })

  it('should expand all', done => {
    wrapper.vm.$bus.$emit('directory-list-expandAll')
    Vue.nextTick(() => {
      expect(emitSpy.args[0][0]).to.equal('directory-list-expandAll')
      done()
    })
  })

  it('should collapse all', done => {
    wrapper.vm.$bus.$emit('directory-list-collapseAll')
    Vue.nextTick(() => {
      expect(emitSpy.args[0][0]).to.equal('directory-list-collapseAll')
      done()
    })
  })

  it('should override viewBackBtn', done => {
    wrapper.vm.viewBackBtnClicked()
    Vue.nextTick(() => {
      expect(actions['appContext/resetContextMenuSelectedChildItem'].called).to.be.true
      expect(emitSpy.calledWith('switchView')).to.be.true
      done()
    })
  })

  it('should show faultMSGS', () => {
    expect(wrapper.vm.hasFaultMSGS).to.be.greaterThan(0)
  })

  it('should show FDEs', () => {
    expect(wrapper.vm.hasFDEs).to.be.greaterThan(0)
  })

  it('should show faultCode', () => {
    expect(wrapper.vm.hasFaultCode).to.be.greaterThan(0)
  })

  it('should show MSG', () => {
    expect(wrapper.vm.hasMSG).to.be.greaterThan(0)
  })

  it('should show No Data Available when no data', () => {
    expect(wrapper.vm.hasLRU).to.equal(0)
  })
})
