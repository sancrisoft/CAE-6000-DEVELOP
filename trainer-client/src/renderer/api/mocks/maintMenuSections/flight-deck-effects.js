
import nav from '@/api/mocks/navigation'

export default {
  title: 'Flight Deck Effects',
  componentName: 'flightdeckeffects',
  componentDetailsTarget: 'flightdeckeffectssummary',
  header: nav.maintMenuHeader,
  sortedData: [],
  viewComboLabel: 'View',
  viewCombo: [
    {label: 'Active FDEs', id: 0, key: 'active', selected: 1},
    {label: 'Historical FDEs', key: 'historical', id: 1, selected: 0},
    {label: 'All FDEs', id: 2, key: 'all', selected: 0}
  ],
  sortComboLabel: 'Sort by',
  sortCombo: [
    {label: 'Alphabetically', id: 0, key: 'cas', selected: 0},
    {label: 'Category', id: 1, key: 'category', selected: 1},
    {label: 'Date & Time', id: 2, key: 'dateDesc', selected: 0}
  ],
  data: {
    items: [
      { id: '0', cas: 'ap 1 fail', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 0, category: 'Advisory', totalFaults: 1, date: 'Apr 30 2015 1:58 PM' },
      { id: '1', cas: 'ap egt  sensors', active: 1, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 0, category: 'Caution', totalFaults: 1, date: 'Apr 28 2015 06:05 AM' },
      { id: '2', cas: 'hyd pump 3a fail', active: 1, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 0, category: 'Advisory', totalFaults: 0, date: 'Apr 28 2015 07:05 AM' },
      { id: '3', cas: 'svfail', active: 1, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 0, category: 'Advisory', totalFaults: 0, date: 'Apr 28 2015 2:11 PM' },
      { id: '4', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' },
      { id: '5', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' },
      { id: '6', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' },
      { id: '7', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' },
      { id: '8', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' },
      { id: '9', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' },
      { id: '10', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' },
      { id: '11', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' },
      { id: '12', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' },
      { id: '13', cas: 'wing a/ice ovht', active: 0, fault: { code: '322C01', desc: 'Pitch SVO-1 is reporting that it is failed' }, desc: 'Description', historical: 1, category: 'Warning', totalFaults: 0, date: 'Apr 28 2015 06:16 AM' }

    ]
  }
}
