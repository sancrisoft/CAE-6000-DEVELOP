import nav from '@/api/mocks/navigation'

export default {
  title: 'Lru/System Operations',
  componentName: 'lrusysoperations',
  header: nav.maintMenuHeader,
  viewComboLabel: 'View',
  viewCombo: [
    {label: 'All ATAs', id: '0', key: 'allATAs', selected: 1, enabled: 1},
    {label: 'Rigable LRUs', id: '1', key: 'rigable', selected: 0, enabled: 1},
    {label: 'Testable LRUs', id: '2', key: 'testable', selected: 0, enabled: 1}
  ],
  writeToComboLabel: 'Write NVM Data to',
  writeToCombo: [
    {label: 'Cockpit Printer', id: '0', selected: 1},
    {label: 'Datalink', id: '1', selected: 0},
    {label: 'IMS USB', id: '2', selected: 0},
    {label: 'AHMU', id: '3', selected: 0}
  ],
  ataComboLabel: 'Select ATA',
  ataCombo: [
    {label: '21 - Air Conditioning', id: '0', key: '21', selected: 1, rigable: 0, testable: 1, enabled: 1},
    {label: '22 - Auto Flight', id: '1', key: '22', selected: 0, rigable: 0, testable: 0, enabled: 1},
    {label: '23 - Communications', id: '2', key: '23', selected: 0, rigable: 0, testable: 0, enabled: 0},
    {label: '24 - Electrical Power', id: '3', key: '24', selected: 0, rigable: 0, testable: 1, enabled: 0},
    {label: '26 - Fire Protection', id: '4', key: '26', selected: 0, rigable: 0, testable: 1, enabled: 0},
    {label: '27 - Flight Controls', id: '5', key: '27', selected: 0, rigable: 1, testable: 1, enabled: 0},
    {label: '28 - Fuel', id: '6', key: '28', selected: 0, rigable: 0, testable: 1, enabled: 0},
    {label: '30 - Ice & Rain Protection', id: '7', key: '30', selected: 0, rigable: 0, testable: 1, enabled: 0},
    {label: '31 - Instruments & Recording', id: '8', key: '31', selected: 0, rigable: 0, testable: 1, enabled: 0},
    {label: '32 - Landing Gear', id: '9', key: '32', selected: 0, rigable: 1, testable: 1, enabled: 1},
    {label: '34 - Navigation', id: '10', key: '34', selected: 0, rigable: 0, testable: 1, enabled: 0},
    {label: '36 - Pneumatics', id: '11', key: '36', selected: 0, rigable: 0, testable: 1, enabled: 0},
    {label: '49 - Apu', id: '12', key: '49', selected: 0, rigable: 1, testable: 0, enabled: 1},
    {label: '73 - Engine Fuel & Control', id: '13', key: '73', selected: 0, rigable: 0, testable: 0, enabled: 0},
    {label: '76 - Engine Controls', id: '14', key: '76', selected: 0, rigable: 0, testable: 0, enabled: 0},
    {label: '77 - Engine Indicating', id: '15', key: '77', selected: 0, rigable: 0, testable: 1, enabled: 0}
  ],
  lruComboLabel: 'Select LRU/Systems',
  lruCombo: [
    {label: 'Air conditionning Sys Con 1', id: '0', type: '21', key: 'airConditionningSysCon1', selected: 1, enabled: 1, rigable: 0, testable: 0},
    {label: 'Air conditionning Sys Con 1A', id: '1', type: '21', key: 'airConditionningSysCon1a', selected: 0, enabled: 1, rigable: 0, testable: 1},
    {label: 'Air conditionning Sys Con 1B', id: '2', type: '21', key: 'airConditionningSysCon1b', selected: 0, enabled: 0, rigable: 0, testable: 1},
    {label: 'Air conditionning Sys Con 2', id: '3', type: '21', key: 'airConditionningSysCon2', selected: 0, enabled: 0, rigable: 0, testable: 0},
    {label: 'Air conditionning Sys Con 2A', id: '4', type: '21', key: 'airConditionningSysCon2a', selected: 0, enabled: 0, rigable: 0, testable: 1},
    {label: 'Air conditionning Sys Con 2B', id: '5', type: '21', key: 'airConditionningSysCon2b', selected: 0, enabled: 0, rigable: 0, testable: 1},
    {label: 'CabinPresure Controller 1', id: '6', type: '21', key: 'cabinPresureController1', selected: 0, enabled: 0, rigable: 0, testable: 1},
    {label: 'CabinPresure Controller 2', id: '7', type: '21', key: 'cabinPresureController2', selected: 0, enabled: 0, rigable: 0, testable: 1},
    {label: 'Flight Control Panel', id: '8', type: '22', key: 'flightControlPanel', selected: 0, enabled: 1},
    {label: 'Steering Control Unit', id: '9', type: '32', key: 'steeringControlUnit', selected: 0, enabled: 1, rigable: 1, testable: 0},
    {label: 'Brake Control Unit', id: '10', type: '32', key: 'breakControlUnit', selected: 0, enabled: 1, rigable: 0, testable: 1},
    {label: 'APU Fadec', id: '11', type: '49', key: 'apufadec', selected: 0, enabled: 1, rigable: 1, testable: 0}
  ],
  data: {
    files: ['file1.xxx', 'file2.xxx', 'file3.xxx', 'file4.xxx', 'file5.xxx'],
    items: {
      lrus: [
        { type: '21',
          key: 'airConditionningSysCon1',
          data: [
            {
              type: 'Data Reader',
              target: 'lrusysdatareader',
              label: 'ACSC_1',
              lrus: [
                { lru: 'Air Conditioning Sys Con 1',
                  data: [
                    {
                      label: '350 ACSC1A OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { type: '21',
          key: 'airConditionningSysCon1a',
          data: [
            {
              type: 'Pack Data',
              target: 'lrusysgenericpagingstatus',
              pages: [
                `<h1>Pack Data</h1><p>Turn to page 2 to enable the data to be Polulated</p>`,
                `<table class="treeColumn50-25-25">
                  <tr><td>Pack Temparature Sencors</td><td></td><td></td></td></tr>
                  <tr><td>Pack Inlet</td><td>0</td><td>DEB C</td></td></tr>
                  <tr><td>Compressor Discharge</td><td>0</td><td>DEB C</td></td></tr>
                  <tr><td>Pack (Water Extractor)</td><td>0</td><td>DEB C</td></td></tr>
                  <tr><td>Pack Discharge</td><td>0</td><td>DEB C</td></td></tr>
                  <tr><td>Mixing Manifold</td><td>0</td><td>DEB C</td></td></tr>
                </table>`,
                `<table class="treeColumn50-25-25">
                  <tr><td>Pack Pressure Transducers</td><td></td><td></td></td></tr>
                  <tr><td>Pack Inlet</td><td>0</td><td>PSI</td></td></tr>
                  <tr><td>Pack Inlet Flow</td><td>0</td><td>PSI</td></td></tr>
                  <tr><td>Pack Discharge</td><td>0</td><td>PSI</td></td></tr>
                  <tr><td>Measure Pack Flow</td><td>0</td><td>LB/MIN</td></td></tr>
                </table>`,
                `<table class="treeColumn50-25-25">
                  <tr><td>Trim Temparature</td><td></td><td></td></td></tr>
                  <tr><td>FWD Cabin Duck</td><td>0</td><td>Deg C</td></td></tr>
                  <tr><td>AFT Cabin Duck</td><td>0</td><td>Deg C</td></td></tr>
                  <tr><td>FWD Cabin Ventilated</td><td>0</td><td>Deg C</td></td></tr>
                  <tr><td>AFT Cabin Ventilated</td><td>0</td><td>Deg C</td></td></tr>
                </table>`,
                `<p>Operator could change the state by selecting push button on control panel</p>
                  <h1>Channel A</h1>
                  <table class="twoColumn50 condensed"></table>
                  <tr><td>Control Panel PBA and Valves Status</td><td></td>Inactive</td></tr>
                  <tr><td></td><td></td></td></tr>
                  <tr><td>Left Pack Man</td><td></td>Man</td></tr>
                  <tr><td>Left Pack</td><td></td>Off</td></tr>
                  <tr><td>Flow Control Valve</td><td></td>Open</td></tr>
                  <tr><td>Left Pack Flow</td><td></td>Invalid</td></tr>
                  <tr><td>Flood Valve</td><td></td>Intern. Position</td></tr>
                  <tr><td>Recirc</td><td></td>Off</td></tr>
                  <tr><td>Trim Air</td><td></td>Off</td></tr>
                  <tr><td>Hot air Shut-Off Valve</td><td></td>Not L.O.</td></tr>
                  <tr><td>Aux Press</td><td></td>Off</td></tr>
                  <tr><td>Temperature Control Valve</td><td></td>Intern. Position</td></tr>
                  <tr><td>FWD Cabin Trim Air Valve</td><td></td>Intern. Position</td></tr>
                  <tr><td>AFT Cabin Trim Air Valve</td><td></td>Intern. Position</td></tr>
                  <tr><td>Fan Air Valve</td><td></td>Intern. Position</td></tr>
                  <tr><td>Recirculation Fan</td><td></td>Under + Fault</td></tr>
                  <tr><td>AV Rack Fan Speed</td><td></td>low</td></tr>
                  <tr><td>Aircraft Config</td><td></td>GX</td></tr>
                  <tr><td></td><td></td></td></tr>
                  <tr><td>Temparatire Selectors</td><td></td></td></tr>
                  <tr><td></td><td></td></td></tr>
                  <tr><td>FWD Cabin</td><td>0</td>DEG C</td></tr>
                  <tr><td>AFT Cabin</td><td>0</td>DEG C</td></tr>
                  <tr><td>Passengers Fwd Cabin</td><td>0</td>DEG C</td></tr>
                  <tr><td>Passengers AFT Cabin</td><td>0</td>DEG C</td></tr>`,
                `<table class="twoColumn50percent">
                  <tr><td>Distribution System</td><td></td></tr>
                  <tr><td>AFT Duct Overhaet (ACSC 1A)</td><td>: No</td></tr>
                  <tr><td>FWT Duct Overhaet (ACSC 1A)</td><td>: No</td></tr>
                  <tr><td>Cockpit Duct Overheat (ACSC 2A)</td><td>: No</td></tr>
                  <tr><td></td><td></td></tr>
                  <tr><td>Control System (Left=ACSC 1A)</td><td></td></tr>
                  <tr><td>Left Pack Discharge Overheat</td><td>: No</td></tr>
                  <tr><td>Left PDD Heater Command</td><td>: Off</td></tr>
                  <tr><td>Left Pack "HITEMP"</td><td>: No</td></tr>
                  <tr><td></td><td></td></tr>
                  <tr><td>Control System (Right=ACSC 2A)</td><td></td></tr>
                  <tr><td>Right Pack Discharge Overheat</td><td>: No</td></tr>
                  <tr><td>Right PDD heater Command</td><td>: Off</td></tr>
                  <tr><td>Right pack "HITEMP"</td><td>: No</td></tr>
                </table>`
              ]
            }
          ],
          tests: [{
            type: 'Initiated Built-in-tests',
            target: '' // disabled
          }],
          nvm: true
        },
        { type: '22',
          key: 'flightControlPanel',
          config: {
            // formatedData: 'Type:ADC-302- CPN:822-2504-003<br>App CPCI: 832-5433-205<br><br>Type: act...'
          },
          data: [
            {
              type: 'Config/Status',
              target: 'lrusysgenericpagingstatus',
              label: '',
              pages: [
                `<table class="twoColumn50percent">
                  <tr><td>Control Column (A)</td><td>: Disconnected</td></tr>
                  <tr><td>Control Column (B)</td><td>: Disconnected</td></tr>
                  <tr><td>Toga Pushed (A)</td><td>: Not Pushed</td></tr>
                  <tr><td>Toga Pushed (B)</td><td>: Not Pushed</td></tr>
                  <tr><td>AT Disconnect (A)</td><td>: Not Pushed</td></tr>
                  <tr><td>AT Disconnect (B)</td><td>: Not Pushed</td></tr>
                  <tr><td>Pilot Sync/TCS (A)</td><td>: Not Pushed</td></tr>
                  <tr><td>Co-Pilot Sync/TCS (A)</td><td>: Not Pushed</td></tr>
                  <tr><td>Pilot Sync/TCS (B)</td><td>: Not Pushed</td></tr>
                  <tr><td>Co-Pilot Sync/TCS (B)</td><td>: Not Pushed</td></tr>
                </table>`
              ]
            },
            {
              type: 'Data Reader',
              target: 'lrusysdatareader',
              label: 'ACSC_1',
              lrus: [
                { lru: 'Air Conditioning Sys Con 1',
                  data: [
                    {
                      label: '350 ACSC1A OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    },
                    {
                      label: '350 ACSC1B OMS Status',
                      bits: [
                        { label: 'Fault Memory Status', from: '0', to: '19' },
                        { label: 'Internal Fault', from: '0', to: '20' }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'Diagnostic Word',
              target: 'lrusysgenericpagingstatus',
              label: '',
              pages: [
                `<table class="treeColumn50-25-25">
                  <tr><td>Label 350</td><td>L Bus</td><td>R Bus</td></tr>
                  <tr><td>Panel ID (B13-11)</td><td>ID 0</td><td>ID 0</td></tr>
                  <tr><td>ARINC 429 Not Detected (B14)</td><td>False</td><td>False</td></tr>
                  <tr><td>LCD01 Not Detected (B15)</td><td>False</td><td>False</td></tr>
                  <tr><td>LCD23 Not Detected (B16)</td><td>False</td><td>False</td></tr>
                  <tr><td>LCD45 Not Detected (B17)</td><td>False</td><td>False</td></tr>
                  <tr><td>A/D Not Detected (B18)</td><td>False</td><td>False</td></tr>
                  <tr><td>CCD Not Detected (B19)</td><td>False</td><td>False</td></tr>
                  <tr><td>Keypad Fault (B22)</td><td>No Fault</td><td>No Fault</td></tr>
                  <tr><td>ID Strap Fault (B23)</td><td>No Fault</td><td>No Fault</td></tr>
                </table>`
              ]
            }
          ]
        },
        { type: '32',
          key: 'steeringControlUnit',
          data: [
            {
              type: 'NWS Rigging Status',
              target: 'lrusysgenericpagingstatus',
              label: '',
              pages: [
                `<table class="treeColumn50-25-25 condensed">
                  <tr><td>Pressure Switch 2</td><td>(L354 B14)</td><td>False</td></tr>
                  <tr><td>Pilot HW RDVT Rigging</td><td>(L354 B15)</td><td>OK</td></tr>
                  <tr><td>Co-Pilot HW RVDT Rigging</td><td>(L354 B16)</td><td>OK</td></tr>
                  <tr><td>Rudder RDVT Rigging</td><td>(L354 B17)</td><td>OK</td></tr>
                  <tr><td>Right FB LVDT Rigging</td><td>(L354 B18)</td><td>False</td></tr>
                  <tr><td>Left FB LVDT Rigging</td><td>(L354 B19)</td><td>OK</td></tr>
                  <tr><td>Pilot Rigging/SCU</td><td>(L354 B20)</td><td>OK</td></tr>
                  <tr><td>Co-Pilot Rigging/SCU</td><td>(L354 B21)</td><td>OK</td></tr>
                  <tr><td>Rudder Pedal Rigging/SCU</td><td>(L354 B22)</td><td>OK</td></tr>
                  <tr><td>EHVS Rigging/SCU</td><td>(L354 B23)</td><td>OK</td></tr>
                  <tr><td>Right FB LVDT Rigging/SCU</td><td>(L354 B24)</td><td>OK</td></tr>
                  <tr><td>Left FB LVDT Rigging/SCU</td><td>(L354 B25)</td><td>OK</td></tr>
                  <tr><td>WOW 1</td><td>(L354 B26)</td><td>False</td></tr>
                  <tr><td>WOW 2</td><td>(L354 B27)</td><td>Fals</td></tr>
                  <tr><td>Downlock</td><td>(L354 B28)</td><td>False</td></tr>
                  <tr><td>Pressure Switch 1</td><td>(L354 B29)</td><td>False</td></tr>
                  <tr><td></td><td></td><td></td></tr>
                  <tr><td></td><td></td><td></td></tr>
                  <tr><td>Pilot Handwheel Position</td><td></td><td>0</td></tr>
                  <tr><td>Ruder Pedal Posn</td><td></td><td>0</td></tr>
                  <tr><td>Left Feedback Position</td><td></td><td>0</td></tr>
                  <tr><td>Right Feedback Positio</td><td></td><td>0</td></tr>
                </table>`
              ]
            }
          ]
        },
        { type: '32',
          key: 'breakControlUnit',
          data: [
            { type: 'Autobrake Status Pages', target: '' },
            { type: 'Chanel A Status Pages', target: '' },
            { type: 'Chanel B Status Pages', target: '' },
            { type: 'INBD Selector Valve Status', target: '' },
            { type: 'OUTBD Selector Valve Status', target: '' },
            { type: 'System Data Pages', target: '' }
          ],
          tests: [
            { type: 'Control Valve Resistance tests CH A', target: '' },
            { type: 'Control Valve Resistance tests CH B', target: '' },
            { type: 'Discrete EICAS Diplay Test Autobrake', target: '' },
            { type: 'Discrete EICAS Diplay Test CH a', target: '' },
            { type: 'Discrete EICAS Diplay Test CH B', target: '' },
            { type: 'Hardware Monitor Operatio CH A', target: '' },
            { type: 'Hardware Monitor Operatio CH B', target: '' },
            { type: 'Pedal (LVDT) Loop Back Test CH A', target: '' },
            { type: 'Pedal (LVDT) Loop Back Test CH B', target: '' },
            { type: 'Pressure Pulse Tests CH A & CH B', target: '' },
            { type: 'Shutoff Valve Operations Test CH A & CH B', target: '' },
            { type: 'Wheel Speed XDCR Resistance Test CH A', target: '' },
            { type: 'Wheel Speed XDCR Resistance Test CH B', target: '' },
            { type: 'Wheel Speed XDCR Resistance Test CH B', target: '' },
            { type: 'Wheel Speed XDCR Resistance Test CH B', target: '' },
            { type: 'Wheel Speed XDCR Resistance Test CH B', target: '' }
          ]
        },
        { type: '49',
          key: 'apufadec',
          data: [
            { type: 'Apu Data Status',
              target: 'lrusysgenericpagingstatus',
              pages: [
                `<table class="tableTwoColumn">
                  <tr><td>Prestart test Sequence</td><td>Inactive</td></tr>
                  <tr><td>FADEC Idle Waiting For Start</td><td>Inactive</td></tr>
                  <tr><td>Fuel Request Signal</td><td>Active</td></tr>
                  <tr><td>Start Signal</td><td>Inactive</td></tr>
                  <tr><td>Inlet Door In Transit</td><td>Active</td></tr>
                  <tr><td>Start Sequence</td><td>Inactive</td></tr>
                  <tr><td>Generator Ready To Load Signal</td><td>Active</td></tr>
                  <tr><td>BleedAir Ready To Load Signal</td><td>Active</td></tr>
                  <tr><td>Esential Mode Operations</td><td>Active</td></tr>
                  <tr><td>LCV Operating In Manual Mode</td><td>Inactive</td></tr>
                  <tr><td>MES Mode</td><td>Inactive</td></tr>
                  <tr><td>Cooldown Sequence</td><td>Inactive</td></tr>
                  <tr><td>Shutdown Sequence</td><td>Inactive</td></tr>
                  <tr><td>Maintenance test Sequence</td><td>Inactive</td></tr>
                </table>`,
                `<table class="tableTreeColumn">
                  <tr><td>Speed:</td><td>100</td><td>%</td></tr>
                  <tr><td>EGT:</td><td>0</td><td>C</td></tr>
                  <tr><td>Inlet Press (P2):</td><td>5</td><td>PSIA</td></tr>
                  <tr><td>Inlet Temp (T2):</td><td>10</td><td>C</td></tr>
                  <tr><td>Oil Level:</td><td>4.5</td><td>QT</td></tr>
                  <tr><td>Oil Temp:</td><td>21</td><td>C</td></tr>
                  <tr><td>APU Hours:</td><td>1200</td><td></td></tr>
                  <tr><td>APU Cycles:</td><td>602</td><td></td></tr>
                  <tr><td>Fire S/D:</td><td>Inactive</td><td></td></tr>
                  <tr><td>APU S/D-Compartment SW:</td><td>No Fault</td><td></td></tr>
                  <tr><td>APU S/D-Service Panel SW:</td><td>No Fault</td><td></td></tr>
                  </table>`,
                `<table class="tableTreeColumn">
                  <tr><td>Speed:</td><td>100</td><td>%</td></tr>
                  <tr><td>EGT:</td><td>0</td><td>C</td></tr>
                  <tr><td>EGT Red Limit:</td><td>655</td><td>C</td></tr>
                  <tr><td>LCV Position:</td><td>10</td><td>DEG</td></tr>
                  <tr><td>Door Position:</td><td>45</td><td>DEG</td></tr>
                  <tr><td>FuelFlow:</td><td>300</td><td>LB/HR</td></tr>
                  <tr><td>Starter Volts:</td><td>0</td><td>V</td></tr>
                </table>`
              ]
            }
          ],
          rigging: [
            { type: 'APU Door Rigging',
              target: 'lrusysgenerictest',
              test: {
                label: 'FADEC-APU DOOR RIGGING',
                duration: 30,
                description: `THIS TEST IS USED TO CALIBRATE THE APU<br>
                  DOOR AND POSITION SENSOR. THE TESTS FIRST<br>
                  VERIFIES PROPER OPERATION OF THE POSITION<br>
                  SENSOR. WITH THE DOOR FULLY CLOSED, THE<br>
                  POSITION DISPLAY IS RESET TO ZERO. THE<br>
                  DOOR IS THEN OPENED TO ALLOW THE OPERATOR<br>
                  TO VERIFY PROPER ACTUATOR OPERATION. AT<br>
                  THE END OF THE TEST THE DOOR IS RETURNED<br>
                  TO FULL CLOSED POSITION.<br>
                  <span style="color: red">* * * WARNING * * *<br>
                    THE APU DOOR WILL BE OPENED AND CLOSED<br>
                    DURING THIS TEST. MAKE SURE THAT NO<br>
                    PERSONS ARE NEAR THE DOOR. THE DOOR CAN<br>
                    CLOSE AND CAUSE INJURIES TO PERSONS.</span><br>
                  DURING THIS TEST, THE APU IS NOT OPERABLE<br>
                  PRIOR TO STARTING THIS TEST, SET THE<br>
                  APU SWITCH TO "OFF"<br>
                  PRESS "Continue" TO CONTINUE TEST<br>
                  PRESS "CANCEL" TO CANCEL TEST`,
                success: {
                  status: 1,
                  message: 'Success'
                },
                failure: {
                  status: 0,
                  message: 'Failure, Time limit exceeded'
                }
              }
            },
            { type: 'APU Self Test', target: '' }
          ],
          nvm: true
        }
      ]
    }
  }
}
