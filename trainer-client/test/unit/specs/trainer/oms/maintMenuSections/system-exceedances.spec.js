/* eslint-disable no-unused-expressions */
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import systemExceedances from '@/components/trainer/oms/maintMenuSections/system-exceedances'
import { polyfill } from 'es6-promise'
polyfill()

describe('trainer/oms/maintMenuSections/system-config.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(systemExceedances, {
    })
  })

  afterEach(() => {
  })

  it('should override maxItemsPerPage', () => {
    expect(wrapper.vm.maxItemsPerPage).to.equal(6)
  })
})
