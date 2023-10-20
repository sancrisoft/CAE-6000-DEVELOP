import nav from '@/api/mocks/navigation'

const dbstatus = {
  componentName: 'dbstatus',
  pageCounter: true,
  header: nav.defaultHeader,
  data: {
    statuses: [
      {
        db: 'db1',
        id: '0',
        status: 'Current',
        begin: '01NOV2017',
        end: '01DEC2018',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -01' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2016', end: '01DEC2017', active: 0 },
              { begin: '01NOV2012', end: '01DEC2013', active: 1 }]
          },
          { label: 'Coverage Region', value: 'World' }
        ]
      },
      {
        db: 'db2',
        id: '1',
        status: 'Invalid',
        begin: '01NOV2017',
        end: '01DEC2018',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -01' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2016', end: '01DEC2017', active: 0 },
              { begin: '01NOV2012', end: '01DEC2013', active: 1 }]
          },
          { label: 'Coverage Region', value: 'Canada' }
        ]
      },
      {
        db: 'db3',
        id: '2',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db4',
        id: '3',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db5',
        id: '4',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db6',
        id: '5',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db7',
        id: '6',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db8',
        id: '7',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db9',
        id: '8',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db10',
        id: '9',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db11',
        id: '10',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db12',
        id: '11',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db13',
        id: '12',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db14',
        id: '13',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db15',
        id: '14',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db16',
        id: '15',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db17',
        id: '16',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db18',
        id: '17',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db19',
        id: '18',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db20',
        id: '19',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db21',
        id: '20',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      },
      {
        db: 'db22',
        id: '21',
        status: 'Not Current',
        begin: '',
        end: '',
        details: [
          { label: 'Identifier', value: '000-0000-1B0000 -02' },
          { label: 'Cycle Information',
            value: [
              { begin: '01NOV2017', end: '01DEC2018', active: 0 },
              { begin: '01NOV2014', end: '01DEC2015', active: 0 }]
          },
          { label: 'Coverage Region', value: 'MTL' }
        ]
      }
    ]
  }
}

export default {
  dbstatus: dbstatus
}
