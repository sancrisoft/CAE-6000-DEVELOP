export default {
  title: 'Data Reader',
  eicasMessages: [
    { label: 'APU EGT SENSORS', color: 'yellow', blink: false },
    { label: 'MAINT MODE ACTIVE', color: 'cyan', blink: true },
    { label: 'HYD PUMP 3A FAIL', color: 'cyan', blink: false },
    { label: 'SVS FAIL', color: 'cyan', blink: false },
    { label: 'APU 1 FAIL', color: 'cyan', blink: false }
  ],
  componentName: 'lrusysdatareader',
  parentComponentName: 'lruSysOperations',
  header: {
    maintMenuSectionsVisibility: true,
    viewBackBtnLabel: 'Return To<br> Lru/Sys OPS',
    viewBtnVisible: false,
    viewBackBtnVisible: true
  },
  data: {} // data was previously fetched into store
}
