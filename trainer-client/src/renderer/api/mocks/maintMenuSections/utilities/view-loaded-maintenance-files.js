export default {
  title: 'View Loaded Maintenance Files',
  parentComponentName: 'utilityfunctions',
  componentName: 'viewloadedmaintenancefiles',
  sortedData: [],
  header: {
    maintMenuSectionsVisibility: true,
    viewBackBtnLabel: 'Return To<br> Util Menu',
    viewBtnVisible: false,
    viewBackBtnVisible: true
  },
  viewComboLabel: 'View',
  viewCombo: [
    {label: 'Diagnostic Tables', id: 0, key: 'diagnostic', selected: 1},
    {label: 'Test & Rigging Files', id: 1, key: 'test/rigging', selected: 0},
    {label: 'User ACMS Tables', id: 2, key: 'acms', selected: 0}
  ],
  sortComboLabel: 'Sort by',
  sortCombo: [
    {label: 'File name (Alphabetically)', id: 0, key: 'fileName', selected: 1},
    {label: 'Date & Time', id: 2, key: 'dateDesc', selected: 0}
  ],
  data: {
    items: [
      { filename: 'tmp/a', type: '0', size: '181898', date: 'Apr 30 2015 1:58 PM' },
      { filename: 'tmp/test/rigging', type: '1', size: '181898', date: 'Apr 30 2015 1:58 PM' },
      { filename: 'tmp/acms', type: '2', size: '181898', date: 'Apr 30 2015 1:58 PM' },
      { filename: 'tmp/B', type: '0', size: '181898', date: 'Jan 01 2015 0:00 PM' },
      { filename: 'tmp/test/rigging/B', type: '1', size: '181898', date: 'JAn 01 2015 0:00 PM' },
      { filename: 'tmp/acms/B', type: '2', size: '181898', date: 'Jan 01 2015 0:00 PM' }
    ]
  }
}
