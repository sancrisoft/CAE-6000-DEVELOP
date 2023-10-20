
const _dataLoadHeader = {
  viewBtnLabel: 'Maintenance<br>Data Load',
  viewBtnLabelStates: {
    default: 'Maintenance<br>Data Load',
    alternate: 'Load New<br>Databases'
  },
  maintMenuSectionsVisibility: false,
  viewBackBtnLabel: 'Return To <br>Data Load Menu',
  viewBtnVisible: true,
  viewBackBtnVisible: false
}

const _dataLoadHeaderNoBtn = {
  viewBtnLabel: 'Maintenance<br>Data Load',
  viewBtnLabelStates: {
    default: 'Maintenance<br>Data Load',
    alternate: 'Load New<br>Databases'
  },
  maintMenuSectionsVisibility: false,
  viewBackBtnLabel: 'Return To <br>Data Load Menu',
  viewBtnVisible: false,
  viewBackBtnVisible: false
}

const subPagesExtend = {
  viewBackBtnVisible: true
}

const _dataLoadSubPagesHeader = { ..._dataLoadHeader, ...subPagesExtend }

const dataloadmenu = {
  componentName: 'dataloadmenu',
  header: _dataLoadHeader,
  title: 'Maintenance Data Load Menu',
  data: {
    items: [
      { label: 'Load New Documents & Tables', target: 'loadNewDocumentsTables', enabled: 1, userType: 'user' },
      { label: 'Load New / Misconfigured LRU', target: 'loadNewMisconfiguredLRU', enabled: 1, userType: 'user' },
      { label: 'Load Aircraft Software Set', target: 'loadAircraftSoftwareSet', enabled: 1, userType: 'user' },
      { label: 'Reload Data & Software', target: 'reloadDataSoftware', enabled: 1, userType: 'user' },
      { label: 'Reload LRU', target: 'reloadLRU', enabled: 1, userType: 'user' },
      { label: 'Perform Field Service Data Load', target: 'performFieldServiceDataLoad', enabled: 1, userType: 'admin' }
    ]
  }
}

const loadnewdocumentstables = {
  componentName: 'loadnewdocumentstables',
  header: _dataLoadHeaderNoBtn,
  title: 'Load New Documents & Tables',
  detailsHeader: 'Documents & Tables Details',
  headerLeft: 'Document/Table',
  headerRight: 'Target/LRU',
  data: {
    items: []
  }
}

const loadnewmisconfiguredlru = {
  componentName: 'loadnewmisconfiguredlru',
  header: _dataLoadHeaderNoBtn,
  title: 'Load New Misconfigured LRU',
  detailsHeader: 'LRU Details',
  headerLeft: 'Target/LRU',
  headerRight: 'Data/Software',
  startLoadTxt: 'Initializing LRUs Please wait',
  data: {
    items: []
  }
}

const loadaircraftsoftwareset = {
  componentName: 'loadaircraftsoftwareset',
  header: _dataLoadSubPagesHeader,
  title: 'Load Aircraft Software Set',
  detailsHeader: 'Software Set Details',
  headerLeft: 'Target/LRU',
  headerRight: 'Data/Software',
  softwareSetSelectLabel: 'Select Aircraft <br>Software Set',
  databasesOptionsSelectLabel: 'Loading of Databases <br>and Documents/Tables',
  databasesOptionsList: [
    { label: 'Load New else Reload Installed', id: 0, selected: true }
  ],
  data: {
    items: [
      { label: '1B0-304B-LR-APM-CFG',
        id: 0,
        selected: true,
        data: [
          {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']},
          {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']},
          {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']},
          {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']},
          {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']}
        ]
      },
      { label: '1B0-304B-AB-CDE-FGH',
        id: 1,
        selected: false,
        data: [
          {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']}
        ]
      }
    ]
  }
}
const reloaddatasoftware = {
  componentName: 'reloaddatasoftware',
  header: _dataLoadSubPagesHeader,
  title: 'Reload Data Software',
  detailsHeader: 'Data & Software Details',
  errorsHeader: 'Load Error Summary',
  headerLeft: 'Data/Software',
  headerRight: 'Target/LRU',
  startLoadTxt: 'Initializing LRUs Please wait',
  data: {
    items: [
      {itemName: 'item1', id: '0', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item2', id: '1', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item3', id: '2', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item4', id: '3', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item5', id: '4', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item6', id: '5', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item7', id: '6', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item8', id: '7', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item9', id: '8', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item10', id: '9', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item11', id: '10', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item12', id: '11', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item13', id: '12', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item14', id: '13', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item15', id: '14', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item16', id: '15', selected: false, status: 'Error', data: ['abcd', 'efg']}
    ],
    errors: [
      {itemName: 'item1', type: 'DCM L_DCM_A', error: 'An error occured'},
      {itemName: 'item2', type: 'targetLRU', error: 'Target not responding'}
    ]
  }
}

const reloadlru = {
  componentName: 'reloadlru',
  header: _dataLoadSubPagesHeader,
  title: 'Reload LRU',
  detailsHeader: 'LRU Details',
  errorsHeader: 'Load Error Summary',
  headerLeft: 'Target/LRU',
  headerRight: 'Data/Software',
  startLoadTxt: 'Initializing LRUs Please wait',
  data: {
    items: [
      {itemName: 'item1', id: '0', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item2', id: '1', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item3', id: '2', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item4', id: '3', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item5', id: '4', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item6', id: '5', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item7', id: '6', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item8', id: '7', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item9', id: '8', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item10', id: '9', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item11', id: '10', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item12', id: '11', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item13', id: '12', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item14', id: '13', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item15', id: '14', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item16', id: '15', selected: false, status: 'Error', data: ['abcd', 'efg']}
    ],
    errors: [
      {itemName: 'item1', type: 'DCM L_DCM_A', error: 'An error occured'},
      {itemName: 'item2', type: 'targetLRU', error: 'Target not responding'}
    ]
  }
}

const performfieldservicedataload = {
  parentComponentName: 'maintenancedataloadmenu',
  componentName: 'performfieldservicedataload',
  startLoadtxt: 'Searching for Data/Software and Targets/LRUs',
  header: {
    viewBtnLabel: '',
    maintMenuSectionsVisibility: true,
    viewBackBtnLabel: 'Return To <br>Data Load Menu',
    viewBtnVisible: false,
    viewBackBtnVisible: true
  },
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

const dataload = {
  componentName: 'dataload',
  header: _dataLoadHeader,
  // header: _dataLoadHeaderNoBtn,
  title: 'Load New Databases',
  detailsHeader: 'Database Details',
  errorsHeader: 'Load Error Summary',
  startLoadTxt: 'Initializing LRUs Please wait',
  headerLeft: 'Database',
  headerRight: 'Target/LRU',
  data: {
    items: [
      {itemName: 'item1', id: '0', selected: false, status: 'Error', data: ['abcd', 'efg']}
    ],
    errors: [
      {itemName: 'item1', type: 'DCM L_DCM_A', error: 'An error occured'},
      {itemName: 'item2', type: 'targetLRU', error: 'Target not responding'}
    ]
  }
}

export default {
  dataloadmenu: dataloadmenu,
  loadnewdocumentstables: loadnewdocumentstables,
  loadnewmisconfiguredlru: loadnewmisconfiguredlru,
  loadaircraftsoftwareset: loadaircraftsoftwareset,
  reloaddatasoftware: reloaddatasoftware,
  reloadlru: reloadlru,
  performfieldservicedataload: performfieldservicedataload,
  dataload: dataload
}
