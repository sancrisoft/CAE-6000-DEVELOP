
export default {
  title: 'System Exceedance Summary',
  parentComponentName: 'systemExceedance',
  componentName: 'systemExceedancesummary',
  header: {
    maintMenuSectionsVisibility: true,
    viewBackBtnLabel: 'Return To<br> Sys Exceed',
    viewBtnVisible: false,
    viewBackBtnVisible: true
  },
  parameterGroupComboLabel: 'Parameter Group',
  parameterGroupCombo: [
    {label: 'Avionics System Parameters', id: '0', key: 'AvionicsSystem', selected: 1},
    {label: 'Engine 2 Exceedance Parameters', id: '1', key: 'Engine2Exceedance', selected: 0}
  ],
  data: {
    items: [
      { id: '0',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '1',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '2',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '3',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '4',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '5',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '6',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '7',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '8',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '9',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '10',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '11',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '12',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '13',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      },
      { id: '14',
        cas: 'L eng N2 Transient',
        threshold: '99.8%',
        flightPhase: 'Taxi',
        date: 'Apr 30 2015 1:58 PM',
        flightLeg: '-20',
        peak: '65',
        duration: '28',
        uom: 'SEC',
        parameters: [
          { name: 'PO (FRM ADC)', value: '1159', type: '0', uom: 'Feet' },
          { name: 'P2O (FRM ADC)', value: '31', type: '0', uom: 'InHg' },
          { name: 'T2O (FRM ADC)', value: '17', type: '0', uom: 'DEG C' },
          { name: 'Ma (FRM ADC)', value: '243', type: '1', uom: 'CAS' },
          { name: 'HP AIR BLEED VALVE POSITION', type: '1', value: '0', uom: 'POSITION' }
        ]
      }
    ]
  }
}
