const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewDataLoadPerformFieldServiceDataLoadModel () {
  const payload = {
    parentComponentName: 'maintenancedataloadmenu',
    componentName: 'performfieldservicedataload',
    eicasMessages: _eicas.getEICAS(),
    startLoadtxt: 'Searching for Data/Software and Targets/LRUs',
    header: _nav.dataLoaderSubpagesHeader(),
    loadSourceComboLabel: 'Load Source',

    loadSourceCombo: [
      { label: 'New Data/SW',
        id: '0',
        key: 'NewDataSW',
        selected: 1,
        data: [
          { label: 'ADC Left',
            key: 'NewDataSWTarget1',
            id: '0',
            selected: 0,
            details: {
              label: 'ADC Left Info',
              typeName: 'ADC',
              position: 'LEFT',
              hardwareId: 'ADC_LEFT',
              name: 'RCU_ADC_LEFT',
              manufacturer: 'RCU',
              ip: '128.0.0.0'
            },
            lrus: []
          },
          { label: 'ADC Right',
            key: 'NewDataSWTarget2',
            id: '1',
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
            lrus: []
          }
        ]
      },
      { label: 'Installed Data/SW',
        id: '1',
        key: 'InstalledDataSW',
        selected: 0,
        data: [
          { label: 'ADC Left',
            key: 'NewDataSWTarget1',
            id: '2',
            selected: 0,
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
                selected: 0,
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
    selectOrderComboLabel: 'Selection <br>Order',
    selectTargetLRUcomboLabel: 'Select <br>Target/LRU',
    selectDataSWcomboLabel: 'Select <br>Data/SW',
    title: 'Data Load',
    data: {
      items: [
        {itemName: 'item1', id: '0', selected: false, status: 'Error', data: ['abcd', 'efg']}
      ]
    }
  }

  return payload
}

module.exports = ViewDataLoadPerformFieldServiceDataLoadModel
