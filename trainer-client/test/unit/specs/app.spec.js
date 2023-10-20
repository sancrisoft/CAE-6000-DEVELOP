/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import sinon from 'sinon'
import { expect } from 'chai'
import App from '@/components/app'
import eventBus from '@/components/trainer/oms/shared/utils/event-bus'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex, eventBus)

describe('app.vue', () => {
  let actions
  let store
  let mockRouter

  beforeEach(() => {
    actions = {
      'appContext/getAppContext': sinon.spy(),
      'scenarios/getScenariosList': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          appConfig: {
            projectName: 'some projet'
          }
        },
        scenarios: [{
          label: 'default'
        }]
      },
      actions
    })

    mockRouter = new Router({
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
  })

  it('should load application context data', () => {
    expect(actions['appContext/getAppContext'].calledOnce).to.be.true
  })
})
