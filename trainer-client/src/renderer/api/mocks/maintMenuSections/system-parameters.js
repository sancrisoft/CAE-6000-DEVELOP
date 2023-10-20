import nav from '@/api/mocks/navigation'

export default {
  title: 'System Parameters',
  componentName: 'systemparameters',
  header: nav.maintMenuHeader,
  parameterGroupComboLabel: 'Parameter Group',
  parameterGroupCombo: [
    { id: '0', label: 'Brake Controls', selected: 1 },
    { id: '1', label: 'True Airspeed', selected: 0 },
    { id: '2', label: 'Miscellaneous', selected: 0 },
    { id: '3', label: 'LRU Status ATA 21-24', selected: 0 },
    { id: '4', label: 'LRU Status ATA 24', selected: 0 },
    { id: '5', label: 'LRU Status ATA 26-27-28', selected: 0 },
    { id: '6', label: 'LRU Status ATA 30-32-34', selected: 0 },
    { id: '7', label: 'LRU Status ATA 36-49-73-77', selected: 0 }
  ],
  data: {
    parameters: [
      { id: '0', name: 'System #3_ Hydrolic_Pressure', value: 3000, type: '0', uom: 'PSI' },
      { id: '1', name: 'True_Airspeed_L+ADC', value: 0, type: '1', uom: 'KNT' },
      { id: '3', name: 'Pilot L Pedal Position', value: 50, type: '2', uom: '%' },
      { id: '4', name: 'CPC1', value: 0, type: '3', uom: '-' },
      { id: '5', name: 'DPC_A', value: 0, type: '4', uom: '-' },
      { id: '6', name: 'FIDEEX', value: 0, type: '5', uom: '-' },
      { id: '7', name: 'EVSHC', value: 0, type: '6', uom: '-' },
      { id: '8', name: 'BMC1-A', value: 0, type: '7', uom: '-' }
    ]
  }
}
