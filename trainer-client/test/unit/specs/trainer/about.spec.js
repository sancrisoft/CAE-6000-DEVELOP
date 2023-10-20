/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import About from '@/components/trainer/about'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/about.vue', () => {
  let store
  let versionsList
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        appContext: {
          appConfig: {
            omsSoftwareversion: '1234',
            omstVersion: 'ABCD',
            omstarVersion: '5678',
            projectName: 'Global Vision OMS Trainer'
          }
        }
      }
    })

    let wrapper = mount(About, { store })
    versionsList = wrapper.find('.about')[0]
  })

  it('should show omsSoftwareversion', () => {
    let omsSoftwareversion = versionsList.find('ul li')[0]
    expect(omsSoftwareversion.text()).to.contain('1234')
  })

  it('should show omstVersion', () => {
    let omstVersion = versionsList.find('ul li')[1]
    expect(omstVersion.text()).to.contain('ABCD')
  })

  it('should show omstarVersion', () => {
    let omstarVersion = versionsList.find('ul li')[2]
    expect(omstarVersion.text()).to.contain('5678')
  })
})
