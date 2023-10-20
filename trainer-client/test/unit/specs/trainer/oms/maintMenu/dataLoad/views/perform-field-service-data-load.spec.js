/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import { expect } from 'chai'
import performFieldServiceDataLoad from '@/components/trainer/oms/maintMenu/dataLoad/views/perform-field-service-data-load'

import { polyfill } from 'es6-promise'
polyfill()

Vue.use(Vuex)

describe('trainer/oms/maintMenu/dataLoad/views/perform-field-service-data-load.vue', () => {
  let store
  let wrapper
  let clock
  let offSpy
  let loadSourceSelectedSpy
  let actions
  let propsData

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    actions = {
      'appContext/maintMenuSectionsAvailabilityState': sinon.spy(),
      'appContext/omsBtnsAvailabilityState': sinon.spy(),
      'appContext/omsViewPort/updateFieldServiceDataLoadComboSelection': sinon.spy(),
      'appContext/omsViewPort/updateComboSelection': sinon.spy()
    }

    let mutations = {
      'appContext/omsViewPort/RESET_FIELD_SERVICE_DATA_LOAD_COMBO_SELECTION': sinon.spy()
    }

    store = new Vuex.Store({
      state: {
        appContext: {
          omsViewPort: {
            title: 'aTitle',
            data: {
              items: [
                {itemName: 'item1', id: '0', selected: false, status: 'Error', data: ['abcd', 'efg']}
              ]
            },
            loadSourceCombo: [
              { label: 'Installed Data/SW',
                id: '0',
                key: 'InstalledDataSW',
                selected: 1,
                data: [
                  { label: 'ADC Left',
                    key: 'NewDataSWTarget1',
                    id: '2',
                    selected: 1,
                    details: {
                      label: 'ADC Left Info',
                      typeName: 'ADC',
                      position: 'LEFT',
                      hardwareId: 'ADC_LEFT',
                      name: 'RCU_ADC_LEFT',
                      manufacturer: 'RCU',
                      ip: '128.0.0.0'
                    },
                    lrus: [
                      { label: 'Data SW 1',
                        id: '0',
                        selected: 1,
                        details: {
                          label: 'Data SW 1',
                          arinc: '8002',
                          lrus: ['CCM_ID_2', 'CCM_ID_34', 'CCM_ID_66', 'CCM_ID_98'],
                          files: [{filename: 'BRS_DCfg.rsp'}]
                        }
                      },
                      { label: 'Data SW 2',
                        id: '1',
                        selected: 0,
                        details: {
                          label: 'Data SW 2',
                          arinc: '8002',
                          lrus: ['CCM_ID_2', 'CCM_ID_34', 'CCM_ID_66', 'CCM_ID_98'],
                          files: [{filename: 'BRS_DCfg.rsp'}]
                        }
                      }
                    ]
                  },
                  { label: 'ADC Right',
                    key: 'NewDataSWTarget2',
                    id: '3',
                    selected: 0,
                    details: {
                      label: 'ADC Right Info',
                      typeName: 'ADC',
                      position: 'RIGHT',
                      hardwareId: 'ADC_RIGHT',
                      name: 'RCU_ADC_RIGHT',
                      manufacturer: 'RCU',
                      ip: '128.0.0.0'
                    },
                    lrus: [
                      { label: 'Data SW 1',
                        id: '2',
                        selected: 0,
                        details: {
                          label: 'Data SW 1',
                          arinc: '8002',
                          lrus: ['CCM_ID_2', 'CCM_ID_34', 'CCM_ID_66', 'CCM_ID_98'],
                          files: [{filename: 'BRS_DCfg.rsp'}]
                        }
                      },
                      { label: 'Data SW 2',
                        id: '3',
                        selected: 0,
                        details: {
                          label: 'Data SW 2',
                          arinc: '8002',
                          lrus: ['CCM_ID_2', 'CCM_ID_34', 'CCM_ID_66', 'CCM_ID_98'],
                          files: [{filename: 'BRS_DCfg.rsp'}]
                        }
                      }
                    ]
                  }
                ]
              },
              { label: 'Backup Data/SW', id: '2', key: 'BackupDataSW', selected: 0, data: [] },
              { label: 'USB Drive', id: '3', key: 'usbDrive', selected: 0, data: [] }
            ],
            loadSourceComboLabel: [],
            selectOrderComboLabel: '',
            selectTargetLRUcomboLabel: '',
            selectDataSWcomboLabel: ''
          }
        }
      },
      actions,
      mutations
    })

    propsData = {
      selectionOrder: 0,
      selectedTargetLRUkey: 'InstalledDataSW',
      selectedLoadSource: [{ label: '', id: '0', key: '', selected: 1 }],
      selectedTargetLRULlist: [
        { label: '', id: '0', key: '', selected: 1 },
        { label: '', id: '1', key: '', selected: 0 }
      ],
      selectedTargetLRUinfo: {
        label: 'Data SW 2',
        arinc: '8002',
        lrus: ['CCM_ID_2', 'CCM_ID_34', 'CCM_ID_66', 'CCM_ID_98'],
        files: [{filename: 'BRS_DCfg.rsp'}]
      },
      selectedDataSWlist: [{ label: '', id: '0', key: '', selected: 1 }],
      selectedDataSWinfo: {
        label: 'Data SW 2',
        arinc: '8002',
        lrus: ['CCM_ID_2', 'CCM_ID_34', 'CCM_ID_66', 'CCM_ID_98'],
        files: [{filename: 'BRS_DCfg.rsp'}]
      },
      targetLRUdetailsPanel: false,
      dataSWdetailsPanel: false,
      selectedDataSW: false
    }
    loadSourceSelectedSpy = sinon.spy(performFieldServiceDataLoad.methods, 'loadSourceSelected')
    wrapper = mount(performFieldServiceDataLoad, { store, propsData })
    offSpy = sinon.spy(wrapper.vm, '$off')
  })

  afterEach(() => {
    offSpy.restore()
    loadSourceSelectedSpy.restore()
  })

  it('should be disabled while loading', () => {
    clock.tick(2000)
    expect(wrapper.data().startload).to.be.false
  })

  it('should select load source', () => {
    let value = 0
    wrapper.vm.loadSourceSelected(value)
    expect(wrapper.data().loadSourceValue).to.equal(value)
  })

  it('should change selection order', () => {
    let value = '0'
    wrapper.vm.selectionOrderChanged(value)
    expect(wrapper.data().selectionOrder).to.equal(Number(value))
  })

  it('should select target/LRU', () => {
    let selectedId = '2'
    wrapper.vm.selectTargetLRUSelected(selectedId)
    expect(actions['appContext/omsViewPort/updateFieldServiceDataLoadComboSelection'].calledOnce).to.be.true
  })

  it('should select data/SW', () => {
    let selectedId = '3'
    wrapper.vm.selectDataSWSelected(selectedId)
    expect(actions['appContext/omsViewPort/updateFieldServiceDataLoadComboSelection'].calledOnce).to.be.true
  })

  it('should set selected TargetLRU details', () => {
    wrapper.vm.setSelectedTargetLRUdetails()
    expect(wrapper.data().selectedTargetLRUinfo).to.not.be.undefined
  })
  it('should show selected TargetLRU details panel', () => {
    wrapper.vm.setSelectedTargetLRUdetails()
    let infoBtn = wrapper.find('.btn')[3]
    infoBtn.trigger('çlick')
    expect(wrapper.vm.targetLRUdetailsPanel).to.be.true
  })

  it('should set selected DataSW details', () => {
    wrapper.vm.setSelectedDataSWdetails()
    expect(wrapper.data().selectedDataSWinfo).to.not.be.undefined
  })

  it('should show selected DataSW details panel', () => {
    wrapper.vm.setSelectedDataSWdetails()
    let infoBtn = wrapper.find('.btn')[4]
    infoBtn.trigger('çlick')
    expect(wrapper.vm.dataSWdetailsPanel).to.be.true
  })

  it('should disable start load when no DataSW is selected or detailpanel is visible', () => {
    store.state.appContext.omsViewPort.loadSourceCombo[0].data[0].lrus[0].selected = 0
    wrapper = mount(performFieldServiceDataLoad, { store, propsData })
    let startBtn = wrapper.find('.btn.start')[0]
    expect(startBtn.hasClass('disabled')).to.be.true
  })

  it('should disable selected LRU/Tartget when DataSW Firsts selected', () => {
    wrapper.vm.selectionOrder = 1
    wrapper.update()
    let targetLRUselect = wrapper.find('[id^="oms-select"]')[0]
    expect(targetLRUselect.hasClass('disabled')).to.be.true
  })

  it('should destroy events', () => {
    wrapper.destroy()
    expect(offSpy.called).to.be.true
  })
})
