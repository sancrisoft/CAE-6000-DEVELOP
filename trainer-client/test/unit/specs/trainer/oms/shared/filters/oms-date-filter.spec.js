/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import dateFilter from '@/components/trainer/oms/shared/filters/oms-date-filter'
import dateFilterTemplate from '@/../test/unit/specs/trainer/oms/shared/filters/oms-date-filter-template'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(dateFilter)

describe('/oms/shared/filters/oms-date-filter', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(dateFilterTemplate)
  })

  afterEach(() => {
  })

  it('should forma date to DDMMYYYY', () => {
    let DDMMYYYY = wrapper.find('span')[0]
    expect(DDMMYYYY.text()).to.equal('30APR2015')
  })
  it('should format date to DDMMYYYY hh:mm', () => {
    let date = wrapper.find('span')[1]
    expect(date.text()).to.equal('30APR2015 13:58')
  })
})
