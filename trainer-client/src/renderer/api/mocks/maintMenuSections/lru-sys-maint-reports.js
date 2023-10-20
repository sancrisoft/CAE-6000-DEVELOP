import nav from '@/api/mocks/navigation'
import maintReports from '@/api/mocks/maintMenuSections/maint-reports'
export default {
  title: 'Maintenance Reports',
  componentName: 'lrusysmaintreports',
  header: nav.maintMenuHeader,
  reportComboLabel: maintReports.reportComboLabel,
  reportCombo: 'LRU/SYS Config Contents',
  flightLegComboLabel: maintReports.flightLegComboLabel,
  flightLegCombo: 'Current Flight Leg',
  lastFlightLeg: maintReports.lastFlightLeg,
  writeToComboLabel: maintReports.writeToComboLabel,
  writeToCombo: maintReports.writeToCombo,
  fromComboLabel: maintReports.fromComboLabel,
  fromCombo: maintReports.fromCombo,
  toComboLabel: maintReports.toComboLabel,
  toCombo: maintReports.toCombo,
  data: {
    files: ['file1.map', 'file2.map', 'file3.map', 'file4.map', 'file5.map']
  }
}
