import nav from '@/api/mocks/navigation'

export default {
  title: 'Aircraft Life Cycle Data',
  componentName: 'aircraftlifecycle',
  header: nav.maintMenuHeader,
  sortedData: [],
  parameterGroupComboLabel: 'Parameter Group',
  parameterGroupCombo: [
    { id: '0', label: 'pitch', selected: 1 },
    { id: '1', label: 'general', selected: 0 },
    { id: '2', label: 'rudder', selected: 0 },
    { id: '3', label: 'aileron', selected: 0 },
    { id: '4', label: 'apu door', selected: 0 },
    { id: '5', label: 'pax door', selected: 0 }
  ],
  data: {
    parameters: [
      { id: '0', name: 'Pitch Feel ACTR LH', value: 25, type: '0', uom: 'HRS' },
      { id: '1', name: 'Total Number of Landings', value: 2, type: '1', uom: 'LAND' },
      { id: '3', name: 'Rudder travel Limiter ACTR RH', value: 35, type: '2', uom: 'HRS' },
      { id: '4', name: 'Alteron TRim ACTR', value: 35, type: '3', uom: 'HRS' },
      { id: '5', name: 'Apu Door Linear ACTR', value: 35, type: '4', uom: 'HRS' },
      { id: '6', name: 'Pax Door ACTR Motor XXXXXXX', value: 2, type: '5', uom: 'LAN' },
      { id: '7', name: 'Pax Door ACTR Motor', value: 2, type: '6', uom: 'LAN' },
      { id: '8', name: 'Pitch Feel ACTR LH', value: 25, type: '0', uom: 'HRS' },
      { id: '9', name: 'Total Number of Landings', value: 2, type: '1', uom: 'LAND' },
      { id: '10', name: 'Rudder travel Limiter ACTR RH', value: 35, type: '2', uom: 'HRS' },
      { id: '11', name: 'Alteron TRim ACTR', value: 35, type: '3', uom: 'HRS' },
      { id: '12', name: 'Apu Door Linear ACTR', value: 35, type: '4', uom: 'HRS' },
      { id: '13', name: 'Pax Door ACTR Motor XXXXXXX', value: 2, type: '5', uom: 'LAN' },
      { id: '14', name: 'Pax Door ACTR Motor', value: 2, type: '6', uom: 'LAN' }
    ]
  }
}
