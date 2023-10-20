import nav from '@/api/mocks/navigation'

export default {
  title: 'System Trends',
  componentName: 'systemtrends',
  componentDetailsTarget: 'systemtrendssummary',
  header: nav.maintMenuHeader,
  sortComboLabel: 'Sort by',
  sortCombo: [
    {label: 'Most-Recent To oldest', id: 0, key: 'dateDesc', selected: 1},
    {label: 'Oldest To Most-Recent', id: 1, key: 'dateAsc', selected: 0},
    {label: 'Flight Phase & Most-Recent To oldest', id: 3, key: 'flightPhase-dateDesc', selected: 0},
    {label: 'Flight Phase & Oldest To Most-Recent', id: 4, key: 'flightPhase-dateAsc', selected: 0}
  ],
  data: {
    items: [
      { id: '0', name: 'TREND (1) TAKE OFF', flightLeg: '0', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '1', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '2', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '3', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '4', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '5', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '6', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '7', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '8', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '9', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '10', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '11', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '12', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '13', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '14', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '15', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' },
      { id: '16', name: 'TREND (1) TAKE OFF', flightLeg: '-1', flightPhase: 'Takeoff', date: 'Apr 30 2015 1:58 PM' }
    ]
  }
}
