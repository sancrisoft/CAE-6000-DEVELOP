import nav from '@/api/mocks/navigation'

export default {
  title: 'System Exceedances',
  componentName: 'systemexceedances',
  componentDetailsTarget: 'systemexceedancessummary',
  sortedData: [],
  header: nav.maintMenuHeader,
  sortComboLabel: 'Sort by',
  sortCombo: [
    {label: 'Most-Recent To oldest', id: 0, key: 'dateDesc', selected: 1},
    {label: 'Oldest To Most-Recent', id: 1, key: 'dateAsc', selected: 0},
    {label: 'Flight Phase', id: 3, key: 'flightPhase', selected: 0},
    {label: 'Alphabetically', id: 4, key: 'cas', selected: 0}
  ],
  data: {
    items: [
      { id: '0', cas: 'L eng N2 Transient', date: 'Apr 30 2015 1:58 PM', threshold: '99.8%', flightPhase: 'Taxi', flightLeg: '-20', peak: '65', duration: '28', uom: 'SEC' },
      { id: '1', cas: 'L eng N2 Transient', date: 'Apr 30 2015 1:58 PM', threshold: '99.8%', flightPhase: 'Taxi', flightLeg: '-20', peak: '65', duration: '28', uom: 'SEC' },
      { id: '12', cas: 'L eng N2 Transient', date: 'Apr 30 2015 1:58 PM', threshold: '99.8%', flightPhase: 'Taxi', flightLeg: '-20', peak: '65', duration: '28', uom: 'SEC' },
      { id: '4', cas: 'L eng N2 Transient', date: 'Apr 30 2015 1:58 PM', threshold: '99.8%', flightPhase: 'Taxi', flightLeg: '-20', peak: '65', duration: '28', uom: 'SEC' },
      { id: '5', cas: 'L eng N2 Transient', date: 'Apr 30 2015 1:58 PM', threshold: '99.8%', flightPhase: 'Taxi', flightLeg: '-20', peak: '65', duration: '28', uom: 'SEC' },
      { id: '6', cas: 'L eng N2 Transient', date: 'Apr 30 2015 1:58 PM', threshold: '99.8%', flightPhase: 'Taxi', flightLeg: '-20', peak: '65', duration: '28', uom: 'SEC' },
      { id: '7', cas: 'XXXXXXXXXXXXXXX', date: 'Apr 30 2015 1:58 PM', threshold: '99.8%', flightPhase: 'Taxi', flightLeg: '-20', peak: '65', duration: '28', uom: 'SEC' }
    ]
  }
}
