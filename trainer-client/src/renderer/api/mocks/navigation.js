const defaultHeader = {
  viewBtnVisible: false,
  viewBackBtnVisible: false,
  maintMenuSectionsVisibility: false
}

const maintMenuHeader = {
  viewBtnVisible: false,
  viewBackBtnVisible: false,
  maintMenuSectionsVisibility: true
}

const viewSwitchers = {
  'manageMenuDisabledText': 'For training purposes, only MAINT option is available.',
  'manageMenu': [
    { label: 'map', target: 'map', enabled: 0, selected: 0 },
    { label: 'charts', target: 'charts', enabled: 0, selected: 0 },
    { label: 'fms', target: 'fms', enabled: 0, selected: 0 },
    { label: 'ecl/sys', target: 'eclsys', enabled: 0, selected: 0 },
    { label: 'cns', target: 'cns', enabled: 0, selected: 0 },
    { label: 'video', target: 'video', enabled: 0, selected: 0 },
    { label: 'docs/maint', target: 'maintmenu', enabled: 1, selected: 1, default: 1 }
  ],
  'maintMenu': [
    { label: 'maint', target: 'maintmenu', enabled: 1, selected: 1, default: 1 },
    { label: 'data load', target: 'dataLoad', enabled: 1, selected: 0 },
    { label: 'db status', target: 'dbStatus', enabled: 1, selected: 0 },
    { label: 'info mgmt', target: 'infoMgmtMenu', enabled: 1, selected: 0 },
    { label: 'license mgmt', target: 'licenceMgmt', enabled: 1, selected: 0 }
  ],
  'maintMenuSections': [
    { id: 0, label: 'maint menu', target: 'maintmenu', enabled: 1, selected: 0, default: 1 },
    { id: 1, label: 'flight deck effects', target: 'flightDeckEffects', enabled: 1, selected: 1, child: { target: 'flightdeckeffectssummary', selected: 1 } },
    { id: 2, label: 'fault messages', target: 'faultMessages', enabled: 1, selected: 0, child: { target: 'faultmessagessummary', selected: 0 } },
    { id: 3, label: 'service messages', target: 'servicesMessages', enabled: 1, selected: 0, child: { target: 'servicesmessagessummary', selected: 0 } },
    { id: 4, label: 'system exceedances', target: 'systemExceedances', enabled: 1, selected: 0, child: { target: 'systemexceedancessummary', selected: 0 } },
    { id: 5, label: 'system trends', target: 'systemTrends', enabled: 1, selected: 0, child: { target: 'systemtrendssummary', selected: 0 } },
    { id: 6, label: 'aircraft life cycle', target: 'aircraftLifeCycle', enabled: 1, selected: 0 },
    { id: 7, label: 'system parameters', target: 'systemParameters', enabled: 1, selected: 0 },
    { id: 8, label: 'lru/sys operations', target: 'lruSysOperations', enabled: 1, selected: 0 },
    { id: 9, label: 'system config', target: 'systemConfig', enabled: 1, selected: 0 },
    { id: 10, label: 'maint reports', target: 'maintReports', enabled: 1, selected: 0 },
    { id: 11, label: 'utility functions', target: 'utilityFunctions', enabled: 1, selected: 0 }
  ]
}

const usbDirectories = [
  [], // not selected -should not show F://
  [ // USBstick1
    { file: '810-0096-1B0001',
      selected: false,
      fileName: '810-0096-1B0001_FILES.LUM',
      childs: [
        { file: '810-0096-1B0001', selected: false, fileName: '810-0096-1B0001_FILES.LUM' },
        { file: '810-0096-1B0002', selected: false, fileName: '810-0096-1B0002_FILES.LUM' },
        { file: '810-0096-1B0003', selected: false, fileName: '810-0096-1B0003_FILES.LUM' },
        { file: '810-0096-1B0004', selected: false, fileName: '810-0096-1B0004FILES.LUM' },
        { file: '810-0096-1B0005', selected: false, fileName: '810-0096-1B0005_FILES.LUM' },
        { file: '810-0096-1B0006', selected: false, fileName: '810-0096-1B0006_FILES.LUM' },
        { file: '810-0096-1B0007', selected: false, fileName: '810-0096-1B0007_FILES.LUM' },
        { file: '810-0096-1B0008', selected: false, fileName: '810-0096-1B0008_FILES.LUM' },
        { file: '810-0096-1B0009', selected: false, fileName: '810-0096-1B0009_FILES.LUM' },
        { file: '810-0096-1B0010', selected: false, fileName: '810-0096-1B00010_FILES.LUM' },
        { file: '810-0096-1B0011', selected: false, fileName: '810-0096-1B00011_FILES.LUM' },
        { file: '810-0096-1B0012', selected: false, fileName: '810-0096-1B00012_FILES.LUM' },
        { file: '810-0096-1B0013', selected: false, fileName: '810-0096-1B00013_FILES.LUM' },
        { file: '810-0096-1B0014', selected: false, fileName: '810-0096-1B00014_FILES.LUM' },
        { file: '810-0096-1B0015', selected: false, fileName: '810-0096-1B00015_FILES.LUM' },
        { file: '810-0096-1B0016', selected: false, fileName: '810-0096-1B00016_FILES.LUM' },
        { file: '810-0096-1B0017', selected: false, fileName: '810-0096-1B00017_FILES.LUM' },
        { file: '810-0096-1B0018', selected: false, fileName: '810-0096-1B00018_FILES.LUM' },
        { file: '810-0096-1B0019', selected: false, fileName: '810-0096-1B00019_FILES.LUM' },
        { file: '810-0096-1B0020', selected: false, fileName: '810-0096-1B00020_FILES.LUM' }
      ]
    },
    { file: '810-0096-1B0002', selected: false, fileName: '810-0096-1B0002_FILES.LUM' },
    { file: '810-0096-1B0003', selected: false, fileName: '810-0096-1B0003_FILES.LUM' },
    { file: '810-0096-1B0004', selected: false, fileName: '810-0096-1B0004_FILES.LUM' },
    { file: '810-0096-1B0005', selected: false, fileName: '810-0096-1B0005_FILES.LUM' },
    { file: '810-0096-1B0006', selected: false, fileName: '810-0096-1B0006_FILES.LUM' },
    { file: '810-0096-1B0007', selected: false, fileName: '810-0096-1B0007_FILES.LUM' },
    { file: '810-0096-1B0008', selected: false, fileName: '810-0096-1B0008_FILES.LUM' },
    { file: '810-0096-1B0009', selected: false, fileName: '810-0096-1B0009_FILES.LUM' },
    { file: '810-0096-1B0010', selected: false, fileName: '810-0096-1B00010_FILES.LUM' },
    { file: '810-0096-1B0011', selected: false, fileName: '810-0096-1B00011_FILES.LUM' },
    { file: '810-0096-1B0012', selected: false, fileName: '810-0096-1B00012_FILES.LUM' },
    { file: '810-0096-1B0013', selected: false, fileName: '810-0096-1B00013_FILES.LUM' },
    { file: '810-0096-1B0014', selected: false, fileName: '810-0096-1B00014_FILES.LUM' },
    { file: '810-0096-1B0015', selected: false, fileName: '810-0096-1B00015_FILES.LUM' },
    { file: '810-0096-1B0016', selected: false, fileName: '810-0096-1B00016_FILES.LUM' },
    { file: '810-0096-1B0017', selected: false, fileName: '810-0096-1B00017_FILES.LUM' },
    { file: '810-0096-1B0018', selected: false, fileName: '810-0096-1B00018_FILES.LUM' },
    { file: '810-0096-1B0019', selected: false, fileName: '810-0096-1B00019_FILES.LUM' },
    { file: '810-0096-1B0020', selected: false, fileName: '810-0096-1B00020_FILES.LUM' }
  ],
  [{ file: '810-0096-1B0002', selected: false, fileName: '810-0096-1B0002_FILES.LUM' }], // USB stick2
  [{ file: '810-0096-1B0003', selected: false, fileName: '810-0096-1B0003_FILES.LUM' }], // USB stick3
  [{ file: '810-0096-1B0004', selected: false, fileName: '810-0096-1B0004_FILES.LUM' }], // USB stick4
  [{ file: '810-0096-1B0005', selected: false, fileName: '810-0096-1B0005_FILES.LUM' }], // USB stick5
  [{ file: '810-0096-1B0006', selected: false, fileName: '810-0096-1B0006_FILES.LUM' }], // USB stick6
  [{ file: '810-0096-FieldLoad', selected: false, fileName: '810-0096-fieldLoad_FILES.LUM' }], // USB field Load
  [{ file: '810-0096-NavDoc' }], // USB Stick Nav/Doc
  [] //  USN Stick BLANK
]

const selectedUSBDirectory = usbDirectories[1]

export default {
  defaultHeader: defaultHeader,
  maintMenuHeader: maintMenuHeader,
  viewSwitchers: viewSwitchers,
  usbDirectories: usbDirectories,
  selectedUSBDirectory: selectedUSBDirectory
}
