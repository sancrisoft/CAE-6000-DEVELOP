export default {
  title: 'Delete Stored Maintenance Data',
  parentComponentName: 'utilityfunctions',
  componentName: 'deletestoredmaintenancedata',
  dataTypeComboLabel: 'Data Type',
  dataTypeCombo: [
    {label: 'Fault Messages FDEs', id: 0, key: 'fault/fdes', selected: 1},
    {label: 'Service Messages', id: 1, key: 'messages', selected: 0},
    {label: 'System Exceedances', id: 2, key: 'exceedances', selected: 0},
    {label: 'System Trends', id: 3, key: 'trends', selected: 0},
    {label: 'User ACMS data', id: 2, key: 'acms', selected: 0}
  ],
  header: {
    maintMenuSectionsVisibility: true,
    viewBackBtnLabel: 'Return To<br> Util Menu',
    viewBtnVisible: false,
    viewBackBtnVisible: true
  },
  data: {}
}
