/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import omscheckboxselector from '@/components/trainer/oms/shared/oms-checkbox-selector'
import { polyfill } from 'es6-promise'
polyfill()

describe('shared/oms-checkbox-selector', () => {
  let wrapper
  beforeEach(() => {
    let propsData = {
      selected: true
    }
    wrapper = mount(omscheckboxselector, { propsData })
  })

  afterEach(() => {
  })

  it('should be selected', done => {
    Vue.nextTick(() => {
      expect(wrapper.hasClass('selected')).to.equal(true)
      done()
    })
  })
})
