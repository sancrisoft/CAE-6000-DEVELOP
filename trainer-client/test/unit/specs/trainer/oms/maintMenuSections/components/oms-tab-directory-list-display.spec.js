/* eslint-disable no-unused-expressions */
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import tabDirectoryListDisplay from '@/components/trainer/oms/maintMenuSections/components/tab-directory-list-display'
import lruData from '@/api/mocks/maintMenuSections/lruData'
import { polyfill } from 'es6-promise'
polyfill()

describe('trainer/oms/maintMenuSections/components/ tab-directory-list-display.vue', () => {
  let wrapper
  let emitSpy

  beforeEach(() => {
    let propsData = {
      items: lruData.mock
    }

    wrapper = shallow(tabDirectoryListDisplay, {
      propsData
    })
    emitSpy = sinon.spy(wrapper.vm.$bus, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should expand item', () => {
    wrapper.vm.$bus.$emit('directorylist.expandCollapse', true)
    expect(emitSpy.args[0][1]).to.be.true
  })

  it('should collapse item', () => {
    wrapper.vm.$bus.$emit('directorylist.expandCollapse', false)
    expect(emitSpy.args[0][1]).to.be.false
  })
})
