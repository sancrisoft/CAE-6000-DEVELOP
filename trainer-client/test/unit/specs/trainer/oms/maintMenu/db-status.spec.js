/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import DbStatus from '@/components/trainer/oms/maintMenu/db-status'
import omsTablePager from '@/components/trainer/oms/shared/paging/oms-table-pager'
import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/doscMaintMenu/db-status.vue', () => {
  let store
  let wrapper
  let propsData
  let closeSpy
  let table
  let offSpy
  let emitSpy

  beforeEach(() => {
    let actions = {
      'appContext/omsViewPort/setHeaderLabel': sinon.spy(),
      'appContext/setContextMenuSelectedItem': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            header: {},
            data: {
              statuses: [
                {
                  db: 'db1',
                  id: '0',
                  status: 'Current',
                  begin: '01NOV2017',
                  end: '01DEC2018',
                  details: [
                    { label: 'Identifier', value: '000-0000-1B0000 -01' },
                    { label: 'Cycle Information',
                      value: [
                        { begin: '01NOV2016', end: '01DEC2017' },
                        { begin: '01NOV2012', end: '01DEC2013' }]
                    },
                    { label: 'Coverage Region', value: 'World' }
                  ]
                },
                {
                  db: 'db1',
                  id: '1',
                  status: 'Invalid',
                  begin: '01NOV2017',
                  end: '01DEC2018',
                  details: [
                    { label: 'Identifier', value: '000-0000-1B0000 -01' },
                    { label: 'Cycle Information',
                      value: [
                        { begin: '01NOV2016', end: '01DEC2017' },
                        { begin: '01NOV2012', end: '01DEC2013' }]
                    },
                    { label: 'Coverage Region', value: 'Canada' }
                  ]
                },
                {
                  db: 'db2',
                  id: '2',
                  status: 'Not Current',
                  begin: '',
                  end: '',
                  details: [
                    { label: 'Identifier', value: '000-0000-1B0000 -02' },
                    { label: 'Cycle Information',
                      value: [
                        { begin: '01NOV2017', end: '01DEC2018' },
                        { begin: '01NOV2014', end: '01DEC2015' }]
                    },
                    { label: 'Coverage Region', value: 'MTL' }
                  ]
                }
              ]
            }
          }
        }
      },
      actions
    })

    propsData = {
      detailsPanel: false,
      itemsPerPage: 1,
      current: {
        db: 'db1',
        id: '0',
        status: 'Current',
        begin: '01NOV2017',
        end: '01DEC2018',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -01' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2016', end: '01DEC2017' },
              { begin: '01NOV2012', end: '01DEC2013' }]
          },
          { label: 'Coverage Region', value: 'World' }
        ]
      }
    }
    closeSpy = sinon.spy(DbStatus.methods, 'toggleDetails')

    wrapper = mount(DbStatus, {
      store,
      propsData,
      components: {
        omsTablePager
      }
    })

    emitSpy = sinon.spy(wrapper.vm, '$emit')
    offSpy = sinon.spy(wrapper.vm, '$off')
    table = wrapper.find('table.db-status')[0]
    wrapper.vm.current = {'db': 'abcd'}
  })

  afterEach(() => {
    closeSpy.restore()
    offSpy.restore()
    emitSpy.restore()
  })

  it('should show a list', () => {
    let list = table.find('tbody tr')
    expect(list.length).to.be.greaterThan(0)
  })

  it('should highlight invalid or notcurrent rows/cells', () => {
    let listitem2 = table.find('tbody tr')[1]
    let listitem3 = table.find('tbody tr')[2]

    expect(listitem2.hasClass('invalid')).to.be.true
    expect(listitem3.hasClass('notcurrent')).to.be.true
  })

  it('should replace empty dates with ---', () => {
    let listitem2 = table.find('tbody tr')[2]
    let cell2 = listitem2.find('td')[2]
    expect(cell2.text()).to.equal('---')
  })

  it('should show detailsPanel', () => {
    let list = table.find('tbody tr')[0]
    let firstCell = list.find('td')[0]
    firstCell.trigger('click')

    expect(wrapper.data().detailsPanel).to.be.true
  })

  it('should close detailsPanel', () => {
    wrapper.vm.detailsPanel = true
    wrapper.vm.$bus.$emit('closeWindow')

    expect(wrapper.data().detailsPanel).to.be.false
    expect(closeSpy.called).to.be.true
  })

  it('should have a capitalized header', done => {
    Vue.nextTick(() => {
      let header = wrapper.vm.getHeader()
      expect(header).to.equal('ABCD')
      done()
    })
  })

  it('should destroy closeWindow event', done => {
    wrapper.destroy()
    Vue.nextTick(() => {
      expect(offSpy.called).to.be.true
      done()
    })
  })

  it('should got to previous page', done => {
    wrapper.vm.$emit('omsKnobDecrease')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })
  it('should got to next page', done => {
    wrapper.vm.$emit('omsKnobIncrease')
    Vue.nextTick(() => {
      expect(emitSpy.called).to.be.true
      done()
    })
  })
})
