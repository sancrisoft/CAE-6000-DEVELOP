import nav from '@/api/mocks/navigation'

// no duplicates files here
const _filesToTransfer = [
  { file: '_EXCEEDENCES_10Nov17174246$6348583337', fileName: 'SIM1     _EXCEEDENCES_10Nov17174246$6348583337', selected: true },
  { file: '_EXCEEDENCES_10Nov17193626$6348584019', fileName: 'SIM1     _EXCEEDENCES_10Nov17193626$6348584019', selected: true },
  { file: '_FAULTMSGS_10Nov17174513$648583353350', fileName: 'SIM1     _FAULTMSGS_10Nov17174513$648583353350', selected: true },
  { file: '_FDES_10Nov17174507$63485833514290417', fileName: 'SIM1     _FDES_10Nov17174507$63485833514290417', selected: true },
  { file: '_EXCEEDENCES_10Nov17174246$63485833370', fileName: 'SIM1     _EXCEEDENCES_10Nov17174246$63485833370', selected: true },
  { file: '_EXCEEDENCES_10Nov17193626$63485840190', fileName: 'SIM1     _EXCEEDENCES_10Nov17193626$63485840190', selected: true },
  { file: '_FAULTMSGS_10Nov17174513$6485833533500', fileName: 'SIM1     _FAULTMSGS_10Nov17174513$6485833533500', selected: true },
  { file: '_FDES_10Nov17174507$634858335142904170', fileName: 'SIM1     _FDES_10Nov17174507$634858335142904170', selected: true },
  { file: '_LIFECYCLE_10Nov17174252$634858337483', fileName: 'SIM1     _LIFECYCLE_10Nov17174252$634858337483', selected: true }
]

const infomgmtmenu = {
  componentName: 'infomgmtmenu',
  header: nav.defaultHeader,
  data: {
    items: [
      { label: 'Configure Wireless Lan', enabled: 1, target: 'configureWirelessLan' },
      { label: 'Manage Wireless Lan Connection', enabled: 1, target: 'manageWirelessLanConnection' },
      { label: 'Manage Files', enabled: 1, target: 'manageFiles' },
      { label: 'Backup Media Sets', enabled: 1, target: 'backupMediaSets' },
      { label: 'Restore Media Sets', enabled: 1, target: 'restoreMediaSets' },
      { label: 'Manage Cellular Device', enabled: 1, target: 'manageCellularDevice' }
    ]
  }
}

const infoMgmtheader = {
  maintMenuSectionsVisibility: false,
  viewBtnVisible: false,
  viewBackBtnLabel: 'Return to<br/>Info Management',
  viewBackBtnVisible: true
}

const configurewirelesslan = {
  componentName: 'configurewirelesslan',
  header: infoMgmtheader,
  data: {
    encryptionTypes: [{id: 0, label: 'Open None', selected: 1}],
    keyCodes: [{id: 0, label: 'ascii', selected: 1}],
    configurations: [
      {id: 0, priority: 1, desc: 'abcd'},
      {id: 1, priority: 2, desc: 'efgh'},
      {id: 2, priority: 3, desc: 'ijkl'}
    ]
  }
}

const managewirelesslanconnection = {
  componentName: 'managewirelesslanconnection',
  header: {
    viewBtnVisible: false,
    viewBackBtnLabel: 'Return to<br/>Info Management',
    viewBackBtnVisible: true
  },
  data: {}
}
const managefiles = {
  componentName: 'managefiles',
  header: infoMgmtheader,
  fileTransferMessage: 'IMS to USB device', // default
  fileTransferMessagesList: ['IMS to USB device', 'USB device to IMS'],
  filesToTransferList: _filesToTransfer,
  data: {
    filesToTransfer: {
      tousb: _filesToTransfer,
      fromusb: []
    },
    usbdirectory: nav.selectedUSBDirectory
  }
}
const backupmediasets = {
  componentName: 'backupmediasets',
  header: {
    maintMenuSectionsVisibility: false,
    viewBtnVisible: false,
    viewBackBtnLabel: 'Return to<br/>Info Management',
    viewBackBtnVisible: true
  },
  fileTransferMessage: 'IMS to USB device', // default
  fileTransferMessagesList: ['IMS to USB device', 'USB device to IMS'],
  filesToTransferList: _filesToTransfer,
  data: {
    filesToTransfer: {
      tousb: _filesToTransfer,
      fromusb: []
    },
    usbdirectory: nav.selectedUSBDirectory
  }
}
const restoremediasets = {
  componentName: 'restoreemediasets',
  header: infoMgmtheader,
  fileTransferMessage: 'IMS to USB device', // default
  fileTransferMessagesList: ['IMS to USB device', 'USB device to IMS'],
  filesToTransferList: [],
  data: {
    filesToTransfer: {
      tousb: _filesToTransfer,
      fromusb: []
    },
    usbdirectory: nav.selectedUSBDirectory
  }
}

const managecellulardevice = {
  componentName: 'managecellulardevice',
  header: infoMgmtheader,
  data: {}
}

export default {
  infomgmtmenu: infomgmtmenu,
  configurewirelesslan: configurewirelesslan,
  managewirelesslanconnection: managewirelesslanconnection,
  managefiles: managefiles,
  backupmediasets: backupmediasets,
  restoremediasets: restoremediasets,
  managecellulardevice: managecellulardevice
}
