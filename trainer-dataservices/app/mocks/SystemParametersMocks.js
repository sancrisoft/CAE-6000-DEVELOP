const SystemParametersMocks = ({

  SystemExceedancesParameterGroupComboEng1: [
    {label: 'Avionics System Parameters', id: '0', key: 'AvionicsSystem', selected: 1},
    {label: 'Engine 1 Exceedance Parameters', id: '1', key: 'Engine1Exceedance', selected: 0}
  ],


  SystemExceedancesParameterGroupComboEng2: [
    {label: 'Avionics System Parameters', id: '0', key: 'AvionicsSystem', selected: 1},
    {label: 'Engine 2 Exceedance Parameters', id: '1', key: 'Engine2Exceedance', selected: 0}
  ],

  SystemExceedancesParametersEng1: [
    { name: 'PO (FRM ADC)',type: '0', value: '1159', uom: 'Feet' },
    { name: 'P2O (FRM ADC)',type: '0', value: '31', uom: 'InHg' },
    { name: 'T2O (FRM ADC)',type: '0', value: '17', uom: 'DEG C' },
    { name: 'Ma (FRM ADC)',type: '0', value: '243', uom: 'CAS' },
    { name: 'HP AIR BLEED VALVE POSITION', type: '0', value: '0', uom: 'POSITION' },

    { name: 'N1 TRACKED VIBRATION ENG 1', type: '1', value: '0', uom: 'IPS' },
    { name: 'N2 TRACKED VIBRATION ENG 1', type: '1', value: '0', uom: 'IPS' },
    { name: 'N1 SPEED ENG 1', type: '1', value: '90', uom: '%' },
    { name: 'N2 SPEED ENG 1', type: '1', value: '94', uom: '%' },
    { name: 'TGT ENG 1', type: '1', value: '784', uom: 'DEG C' },
    { name: 'EPRCMD ENG 1', type: '1', value: '2', uom: 'RATIO' },
    { name: 'EPR ACTUAL ENG 1', type: '1', value: '2', uom: 'RATIO' },
    { name: 'TRA VALIDATED ENG 1', type: '1', value: '40', uom: 'DEG' },
    { name: 'EPR  MTO ENG 1', type: '1', value: '2', uom: 'RATIO' },
    { name: 'FUEL FLOW ENG 1', type: '1', value: '5660', uom: 'RATE' },
    { name: 'P30 BURNER PRESSURE ENG 1', type: '1', value: '15', uom: 'psia' },
    { name: 'T30 VALIDATED ENG 1', type: '1', value: '0', uom: 'DEG C' },
    { name: 'OIL TEMP VALIDATED ENG 1', type: '1', value: '70', uom: 'DEG C' },
    { name: 'OIL PRESSURE VALIDATED ENG 1', type: '1', value: '60', uom: 'psid' },
    { name: 'AIRFRAME INPUT ECHO', type: '1', value: '0', uom: 'POSITION' }
  ],

  SystemExceedancesParametersEng2: [
    { name: 'PO (FRM ADC)',type: '0', value: '1159', uom: 'Feet' },
    { name: 'P2O (FRM ADC)',type: '0', value: '31', uom: 'InHg' },
    { name: 'T2O (FRM ADC)',type: '0', value: '17', uom: 'DEG C' },
    { name: 'Ma (FRM ADC)',type: '0', value: '243', uom: 'CAS' },
    { name: 'HP AIR BLEED VALVE POSITION', type: '0', value: '0', uom: 'POSITION' },

    { name: 'N1 TRACKED VIBRATION ENG 2', type: '1', value: '0', uom: 'IPS' },
    { name: 'N2 TRACKED VIBRATION ENG 2', type: '1', value: '0', uom: 'IPS' },
    { name: 'N1 SPEED ENG 2', type: '1', value: '89', uom: '%' },
    { name: 'N2 SPEED ENG 2', type: '1', value: '93', uom: '%' },
    { name: 'TGT ENG 2', type: '1', value: '784', uom: 'DEG C' },
    { name: 'EPRCMD ENG 2', type: '1', value: '2', uom: 'RATIO' },
    { name: 'EPR ACTUAL ENG 2', type: '1', value: '2', uom: 'RATIO' },
    { name: 'TRA VALIDATED ENG 2', type: '1', value: '40', uom: 'DEG' },
    { name: 'EPR  MTO ENG 2', type: '1', value: '2', uom: 'RATIO' },
    { name: 'FUEL FLOW ENG 2', type: '1', value: '5654', uom: 'RATE' },
    { name: 'P30 BURNER PRESSURE ENG 2', type: '1', value: '15', uom: 'psia' },
    { name: 'T30 VALIDATED ENG 2', type: '1', value: '0', uom: 'DEG C' },
    { name: 'OIL TEMP VALIDATED ENG 2', type: '1', value: '70', uom: 'DEG C' },
    { name: 'OIL PRESSURE VALIDATED ENG 2', type: '1', value: '60', uom: 'psid' },
    { name: 'AIRFRAME INPUT ECHO', type: '1', value: '0', uom: 'POSITION' }
  ],

  SystemTrendParameterGroupCombo: [
    {label: 'TREND DATA PARAMETERS', id: '0', key: 'TrendData', selected: 1},
    {label: 'AVIONICS SYSTEM PARAMETERS', id: '1', key: 'AvionicsSystem', selected: 0},
    {label: 'TREND DATA PARAMETERS (CONT)', id: '2', key: 'TrendDataCont', selected: 1},
  ],

  SystemTrendParameters: [
    { name: 'PO (FRM ADC)',type: '0', value: '1159', uom: 'Feet' },
    { name: 'P2O (FRM ADC)',type: '0', value: '31', uom: 'InHg' },
    { name: 'T2O (FRM ADC)',type: '0', value: '17', uom: 'DEG C' },
    { name: 'Ma (FRM ADC)',type: '0', value: '243', uom: 'CAS' },
    { name: 'HP AIR BLEED VALVE POSITION', type: '0', value: '0', uom: 'POSITION' },

    { name: 'N1 SPEED ENG 1', type: '1', value: '90', uom: '%' },
    { name: 'N2 SPEED ENG 1', type: '1', value: '94', uom: '%' },
    { name: 'TGT ENG 1', type: '1', value: '784', uom: 'DEG C' },
    { name: 'EPRCMD ENG 1', type: '1', value: '2', uom: 'RATIO' },
    { name: 'EPR ACTUAL ENG 1', type: '1', value: '2', uom: 'RATIO' },
    { name: 'TRA VALIDATED ENG 1', type: '1', value: '40', uom: 'DEG' },
    { name: 'EPR  MTO ENG 1', type: '1', value: '2', uom: 'RATIO' },
    { name: 'FUEL FLOW ENG 1', type: '1', value: '5660', uom: 'RATE' },
    { name: 'P30 BURNER PRESSURE ENG 1', type: '1', value: '15', uom: 'psia' },
    { name: 'T30 VALIDATED ENG 1', type: '1', value: '0', uom: 'DEG C' },
    { name: 'OIL TEMP VALIDATED ENG 1', type: '1', value: '70', uom: 'DEG C' },
    { name: 'OIL PRESSURE VALIDATED ENG 1', type: '1', value: '60', uom: 'psid' },
    { name: 'N1 TRACKED VIBRATION ENG 1', type: '1', value: '0', uom: 'IPS' },
    { name: 'N2 TRACKED VIBRATION ENG 1', type: '1', value: '0', uom: 'IPS' },
    { name: 'N1 TRACKED VIBRATION ENG 2', type: '1', value: '0', uom: 'IPS' },
    { name: 'N2 TRACKED VIBRATION ENG 2', type: '1', value: '0', uom: 'IPS' },
    { name: 'N1 SPEED ENG 2', type: '1', value: '89', uom: '%' },
    { name: 'N2 SPEED ENG 2', type: '1', value: '93', uom: '%' },
    { name: 'TGT ENG 2', type: '1', value: '784', uom: 'DEG C' },
    { name: 'EPRCMD ENG 2', type: '1', value: '2', uom: 'RATIO' },
    { name: 'EPR ACTUAL ENG 2', type: '1', value: '2', uom: 'RATIO' },
    { name: 'TRA VALIDATED ENG 2', type: '1', value: '40', uom: 'DEG' },
    { name: 'EPR  MTO ENG 2', type: '1', value: '2', uom: 'RATIO' },
    { name: 'FUEL FLOW ENG 2', type: '1', value: '5654', uom: 'RATE' },
    { name: 'P30 BURNER PRESSURE ENG 2', type: '1', value: '15', uom: 'psia' },
    { name: 'T30 VALIDATED ENG 2', type: '1', value: '0', uom: 'DEG C' },
    { name: 'OIL TEMP VALIDATED ENG 2', type: '1', value: '70', uom: 'DEG C' },
    { name: 'OIL PRESSURE VALIDATED ENG 2', type: '1', value: '60', uom: 'psid' },

    { name: 'AIRFRAME INPUT ECHO', type: '2', value: '0', uom: 'POSITION' }
  ],

})

module.exports = SystemParametersMocks
