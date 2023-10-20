/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import omsfileTransferProgressConsumerMixin from '@/components/trainer/oms/shared/dynamicComponents/oms-file-transfer-progress-consumer-mixin'
import maintReports from '@/components/trainer/oms/maintMenuSections/maint-reports'

import mock from '@/api/mocks/maintMenuSections/maint-reports'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, omsfileTransferProgressConsumerMixin)

describe('trainer/oms/maintMenuSections/maint-reports', () => {
  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: mock
        }
      }
    })
    wrapper = shallow(maintReports, {
      store
    })
  })

  afterEach(() => {
  })

  it('should be defined', () => {
    expect(wrapper).to.not.be.undefined
  })
})
