export default {
  title: 'Delete Maintenance Files',
  parentComponentName: 'utilityfunctions',
  componentName: 'deleteMaintenancefiles',
  header: {
    maintMenuSectionsVisibility: true,
    viewBackBtnLabel: 'Return To<br> Util Menu',
    viewBtnVisible: false,
    viewBackBtnVisible: true
  },
  fileTypeComboLabel: 'File Type',
  fileTypeCombo: [
    {label: 'Test & Riggin Files', id: 0, key: 'test/rigging', selected: 1},
    {label: 'User AMCS Table', id: 1, key: 'amcs', selected: 0}
  ],
  data: {}
}
