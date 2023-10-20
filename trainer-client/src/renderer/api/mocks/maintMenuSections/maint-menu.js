
import nav from '@/api/mocks/navigation'

export default {
  componentName: 'maintmenu',
  header: nav.defaultHeader,
  data: {
    main: [
      { label: 'View FlightDeck Effects', target: 'flightDeckEffects', enabled: 1, messages: { label: 'Actives', value: '4' } },
      { label: 'View Fault Messages', target: 'faultMessages', enabled: 1, messages: { label: 'Actives', value: '0' } },
      { label: 'View Service Messages', target: 'servicesMessages', enabled: 1, messages: { label: 'Actives', value: '0' } },
      { label: 'View System Exceedances', target: 'systemExceedances', enabled: 1, messages: { label: 'Stored', value: '0' } },
      { label: 'View System Trends', target: 'systemTrends', enabled: 1, messages: {} },
      { label: 'View Aircraft Life Cycle Data', target: 'aircraftLifeCycle', enabled: 1, messages: {} },
      { label: 'View System Parameters', target: 'systemParameters', enabled: 1, messages: {} },
      { label: 'View LRU/System Operations', target: 'lruSysOperations', enabled: 1, messages: {} },
      { label: 'View System Configuration Data', target: 'systemConfig', enabled: 1, messages: {} },
      { label: 'View System Maintenance Reports', target: 'maintReports', enabled: 1, messages: {} }
    ],
    utility: [
      { label: 'View System Utility Functions', target: 'utilityFunctions', enabled: 1 }
    ]
  }
}
