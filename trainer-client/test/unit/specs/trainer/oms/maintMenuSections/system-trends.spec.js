/* eslint-disable no-unused-expressions */
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import systemTrends from '@/components/trainer/oms/maintMenuSections/system-trends'
import { polyfill } from 'es6-promise'
polyfill()

describe('trainer/oms/maintMenuSections/system-config.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(systemTrends, {
    })
  })

  afterEach(() => {
  })

  it('should override maxItemsPerPage', () => {
    expect(wrapper.vm.maxItemsPerPage).to.equal(15)
  })
})
