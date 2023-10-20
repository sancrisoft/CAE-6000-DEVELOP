/* eslint-disable no-unused-expressions */

import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import systemExceedances from '@/components/trainer/oms/maintMenuSections/system-exceedances'
import maintMenuBaseViewMixin from '@/components/trainer/oms/maintMenuSections/components/mixins/maint-menu-base-view-mixin'
import utils from '@/components/trainer/oms/shared/utils/oms-utils'
import appContext from '@/store/modules/app-context'
import systemExceedancesMock from '@/api/mocks/maintMenuSections/system-exceedances'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, appContext, utils, maintMenuBaseViewMixin)

polyfill()

describe('maintMenuSection pages', () => {
  let store
  let wrapper
  let emitSpy
  let offSpy
  let clock

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
          omsViewPort: systemExceedancesMock
        }
      },
      actions
    })

    systemExceedancesMock.sortedData = [{ata: '27-50-00'}, {ata: {}}]

    let propsData = {
    }

    wrapper = shallow(systemExceedances, {
      store,
      propsData
    })
    wrapper.vm.maxItemsPerPage = 1
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    emitSpy.restore()
    offSpy.restore()
  })

  it('should update page counter on load', () => {
    clock.tick(50)
    expect(emitSpy.called).to.be.true
  })

  it('should page sorted data', () => {
    expect(wrapper.vm.pages.length).to.equal(2)
  })

  it('should chunk sortedData into pages on Combo changes', () => {
    systemExceedancesMock.sortedData = [{}, {}, {}]
    wrapper.update()
    wrapper.vm.$bus.$emit('viewSelected', 1)
    wrapper.vm.$bus.$emit('sortSelected', 1)
    expect(wrapper.vm.pages.length).to.equal(3)
    expect(wrapper.vm.sortedData.length).to.equal(3)
  })

  it('should show next page', () => {
    wrapper.vm.nextPage()
    expect(wrapper.vm.currentPage).to.equal(2)
  })

  it('should switch to summary view', () => {
    wrapper.vm.switchView(0)
    expect(emitSpy.args[0][1].id).to.equal('0')
  })

  it('should show previous page', () => {
    wrapper.vm.nextPage()
    wrapper.vm.previousPage()
    expect(wrapper.vm.currentPage).to.equal(1)
  })

  it('should show faults messages ata', () => {
    expect(wrapper.vm.pageFirstItemAta).to.equal('27-50-00')
  })

  it('should remove events', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })
})
