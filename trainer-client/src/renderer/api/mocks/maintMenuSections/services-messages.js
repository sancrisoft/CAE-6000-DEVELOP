import nav from '@/api/mocks/navigation'

export default {
  title: 'Service Messages',
  componentName: 'servicesmessages',
  componentDetailsTarget: 'servicesmessagessummary',
  header: nav.maintMenuHeader,
  sortedData: [],
  viewComboLabel: 'View',
  viewCombo: [
    {label: 'Active FDEs', id: 0, key: 'active', selected: 1},
    {label: 'Historical FDEs', id: 1, key: 'historical', selected: 0},
    {label: 'All FDEs', id: 2, key: 'all', selected: 0}
  ],
  sortComboLabel: 'Sort by',
  sortCombo: [
    {label: 'Alphabetically', id: 0, key: 'cas', selected: 1},
    {label: 'Category', id: 1, key: 'category', selected: 0},
    {label: 'Date & Time', id: 2, key: 'dateDesc', selected: 0}
  ],
  data: {
    items: [
      { id: '0', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '1', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '2', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '3', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '4', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '5', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '6', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '7', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '8', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '9', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '10', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '11', cas: 'Pitch SVO 1 has an interval fault', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' },
      { id: '12', cas: 'Pitch 12', active: 1, historical: 0, ata: '27-50-00', date: 'Apr 30 2015 1:58 PM' }
    ]
  }
}
