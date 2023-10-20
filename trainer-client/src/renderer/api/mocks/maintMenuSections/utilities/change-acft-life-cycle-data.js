import aircraftLifeCycle from '@/api/mocks/maintMenuSections/aircraft-life-cycle'
export default {
  title: 'Change Aircraft Life Cycle Data',
  parentComponentName: 'utilityfunctions',
  componentName: 'acftlifecycledata',
  header: {
    maintMenuSectionsVisibility: true,
    viewBackBtnLabel: 'Return To<br> Util Menu',
    viewBtnVisible: false,
    viewBackBtnVisible: true
  },
  parameterGroupComboLabel: aircraftLifeCycle.parameterGroupComboLabel,
  parameterGroupCombo: aircraftLifeCycle.parameterGroupCombo,
  data: aircraftLifeCycle.data
}
