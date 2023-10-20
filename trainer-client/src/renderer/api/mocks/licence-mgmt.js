import nav from '@/api/mocks/navigation'

const licencemgmt = {
  title: 'Application Licence Management',
  componentName: 'licencemgmt',
  header: nav.defaultHeader,
  data: {
    activationNo: '03HTGL',
    licences: [
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'disabled' },
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled' },
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled' },
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled' },
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled' },
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'disabled' },
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled' },
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled' },
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled' },
      { typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled' }
    ]
  }
}
export default {
  licencemgmt: licencemgmt
}
