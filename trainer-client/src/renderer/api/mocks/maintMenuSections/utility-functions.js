import nav from '@/api/mocks/navigation'

export default {
  title: 'Utility Functions Menu',
  componentName: 'utilityfunctions',
  header: nav.maintMenuHeader,
  data: {
    items: {
      maintenanceDataTargets: [
        { label: 'Change Aircraft Tail Number', target: 'changeacfttailnumber', enabled: 1, userType: 'user' },
        { label: 'Change Aircraft Life Cycle Data', target: 'changeacftlifecycledata', enabled: 1, userType: 'user' },
        { label: 'Change Automatically Initiated Reports', target: 'changeautomaticallyinitiatedreports', enabled: 1, userType: 'user' }
      ],
      maintenanceDataFiles: [
        { label: 'Delete Stored Maintenance Data', target: 'deletestoredmaintenancedata', enabled: 1, userType: 'user' },
        { label: 'Delete Maintenance Files', target: 'deletemaintenancefiles', enabled: 1, userType: 'user' },
        { label: 'View Loaded Maintenance Files', target: 'viewloadedmaintenancefiles', enabled: 1, userType: 'user' },
        { label: 'View IMA Part Number Crosscheck Details', target: 'imapartnumbercrosscheckdetails', enabled: 1, userType: 'admin' }
      ]
    }
  }
}
