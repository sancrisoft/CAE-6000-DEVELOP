import nav from '@/api/mocks/navigation'
const electronicTSOnameplatesubsystems = {
  ADFR65006500: {
    label: 'Includes TSO approved SW for subsystemsType No. ADFR-6500',
    subsystems: [
      { label: 'Type No: FDSA-6500', type: 'D0-178B Level A', mfr: '0EFD0', rcpn: '810-0180-007', date: 'December 30, 2015', location: 'Manufacturer and Location' },
      { label: 'FAA TSOs: C113, SEE INST MNL', type: 'RED LABEL', mfr: '0EFD0', rcpn: '810-0234-1B0003-05', date: 'December 30, 2015', manufacturer: 'Manufacturer and Location' },
      { label: 'Type No: FDSA-6500', type: 'D0-178B Level A', mfr: '0EFD0', rcpn: '810-0180-007', date: 'December 30, 2015', location: 'Manufacturer and Location' },
      { label: 'FAA TSOs: C113, SEE INST MNL', type: 'RED LABEL', mfr: '0EFD0', rcpn: '810-0234-1B0003-05', date: 'December 30, 2015', manufacturer: 'Manufacturer and Location' },
      { label: 'Type No: FDSA-6500', type: 'D0-178B Level A', mfr: '0EFD0', rcpn: '810-0180-007', date: 'December 30, 2015', location: 'Manufacturer and Location' },
      { label: 'FAA TSOs: C113, SEE INST MNL', type: 'RED LABEL', mfr: '0EFD0', rcpn: '810-0234-1B0003-05', date: 'December 30, 2015', manufacturer: 'Manufacturer and Location' }
    ]
  }
}

const crosschecktemplate = {
  label: 'ID_061: L-AFD',
  status: 'Unknown',
  data: [
    { 'APM HW PN': '822-2332-900/100' },
    { 'Installed HW PN': '' },
    { 'APM SW PN': '1B0-405A-ALLAFD-oPS', 'CRC': '3U0BDQDM' },
    { 'Installed SW PN': '', 'CRC': '00000000' }
  ]
}

export default {
  title: 'System Configuration',
  componentName: 'systemconfig',
  header: nav.maintMenuHeader,
  viewComboLabel: 'View',
  viewCombo: [
    {label: 'APM Configuration Option Partition', key: 'apmConfiguration', id: '0', selected: 1},
    {label: 'APM Third Party Parameters Partition', key: 'apmThirdParty', id: '1', selected: 0},
    {label: 'IMA Software Part Numbers ', key: 'softPartNumber', id: '2', selected: 0}
  ],
  data: {
    items: [
      { id: '0',
        value: '00',
        type: '0', // view type as per viewCombo id
        leftAPM: '0010101111001001',
        rightAPM: '0010101111001001',
        details: {
          header: 'APM Word',
          items: [
            { bits: '9', label: 'Terrain Installed', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' },
            { bits: '10', label: 'GLS', leftApm: 'installed', rightApm: 'installed' }
          ]
        }
      },
      { id: '1',
        value: '021_14_HDPH Low Volume Setting',
        type: '1',
        leftApm: '15',
        rightApm: '15'
      },
      { id: '2',
        name: 'APM 1',
        type: '2',
        position: 'left',
        cpn: '810-0311-3B0001-22',
        details: {
          header: 'Electronic TSO Nameplate',
          items: [
            { label: 'Type No: AFDA-6500', mfr: '0EFD0', type: 'EMOD # 07', rcpn: '810-0063-1B0002-07', details: electronicTSOnameplatesubsystems.ADFR65006500, date: 'December 30, 2015', manufacturer: 'Manufacturer and Location' }
          ]
        }
      },
      { id: '3',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '4',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '5',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '6',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '7',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '8',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '9',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '10',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '11',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '12',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '13',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '14',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '15',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '16',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      },
      { id: '17',
        name: 'APM 2',
        type: '2',
        position: 'right',
        cpn: '', // ------------- invalid shows yellow
        details: {
          header: '',
          items: [crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate, crosschecktemplate]
        }
      }
    ]
  }
}
