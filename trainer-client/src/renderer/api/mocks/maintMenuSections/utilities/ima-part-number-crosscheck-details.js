export default {
  title: 'IMA Part Number Crosscheck Details',
  componentName: 'imapartnumbercrosscheckdetails',
  parentComponentName: 'utilityfunctions',
  sortComboLabel: 'Sort by',
  sortCombo: [
    {label: 'ID Number', id: 0, key: 'systemId', selected: 1},
    {label: 'Status', id: 1, key: 'status', selected: 0}
  ],
  header: {
    maintMenuSectionsVisibility: true,
    viewBackBtnLabel: 'Return To<br> Util Menu',
    viewBtnVisible: false,
    viewBackBtnVisible: true
  },
  data: {
    items: [
      { systemId: '000',
        label: 'ID_000: F-IPC SLOT 7',
        status: 'Correct',
        apmhwpn: '822-2323-001',
        instaledhwpn: '822-2323-001',
        apmswpn: { label: '1B0-405A-ALLAFD-OPS', crc: '18E977F8' },
        instaledswpn: { label: '810-0260', crc: '18E977F8' }
      },
      {
        systemId: '001',
        label: 'ID_000: F-IPC SLOT 2',
        status: 'Unknown',
        apmhwpn: '822-1992-002',
        instaledhwpn: '822-1992-002',
        apmswpn: { label: '1B0-405A-F-IPC-02-OPS', crc: '19B82AD6' },
        instaledswpn: { label: '1B0-405A-F-IPC-02-OPS', crc: '19B82AD6' }
      },
      {
        systemId: '003',
        label: 'ID_003: F-IPC SLOT 2',
        status: 'Miscompare',
        apmhwpn: '822-1992-002',
        instaledhwpn: '822-1992-002',
        apmswpn: { label: '1B0-405A-F-IPC-02-OPS', crc: '19B82AD6' },
        instaledswpn: { label: '1B0-405A-F-IPC-02-OPS', crc: '19B82AD6' }
      }

    ]
  }
}
