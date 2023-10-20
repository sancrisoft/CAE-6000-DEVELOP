const db = require('../services/dbManager');
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewLruSysOperationsModel = ({

  _config: Object.assign(config,
    {
    fetchATAs : ['27'],
    pageType : 'D'
  }),

  payload: {
    title: 'LRU/System Operations',
    componentName: 'lrusysoperations',
    header: _nav.maintMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
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
    ataCombo: [],
    lruComboLabel: 'Select LRU/Systems',
    lruCombo: [],
    data: {
      files: ['file1.map', 'file2.map', 'file3.map', 'file4.map', 'file5.map'],
      items: {}
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload().then(function (result) {
        self.payload = Object.assign({}, self.payload, result)
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPagesPayload: function (lruId) {
    let self = this
    let type = 'D'

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT PAGE.PAGE_ID, PAGE_TABLE.PAGE_TABLE_ID, PAGE_TABLE.LRU_ID, PAGE_TABLE.NAME AS PAGETitle, ' +
        ' PAGE_TABLE.TYPE AS PageType ' +
        ' FROM  LRU_tar ' +
        ' Inner Join PAGE_TABLE On LRU_tar.LRU_ID = PAGE_TABLE.LRU_ID  ' +
        ' Inner Join PAGE On PAGE.PAGE_TABLE_ID = PAGE_TABLE.PAGE_TABLE_ID   ' +
        ' WHERE PAGE_TABLE.LRU_ID = ' + lruId +
        //' AND  PAGE_TABLE.TYPE = "'+type+'" ' +
        ' ORDER BY PAGE.TITLE ASC'

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  formatDataReaderPayload: function (lru,ata) {
    let self = this
    let lruId = lru['LRUID']

    return new Promise(function (resolve, reject) {

      self.getPagesPayload(lruId).then(function (result) {
        let formatted_pages = []
        let formatted_rigging = []
        let formatted_tests = []
        formatted_pages.push({
          type: 'Data Reader',
          target: 'lrusysdatareader',
          label: lru['LRU_LABEL'],
          id: ''+lru['LRUID'],
          lrus: [
            {
              lru: lru['LRU_NAME'],
              data: []
            }
          ]
        })

        let promisePayload = result.map(function (resource, i) {
            if (resource['PageType'] == `D`){
              if( !formatted_pages.find (item => item.type === resource['PAGETitle']) ) {
                formatted_pages.push(
                  {
                    type: resource['PAGETitle'],
                    target: 'lrusysgenericpagingstatus',
                    id: '' + resource['PAGE_TABLE_ID'],
                    label: '',
                    pages: []
                  }
                )
              }
            }
            else if (resource['PageType'] == `R`){
              if( !formatted_rigging.find (item => item.type === resource['PAGETitle']) ) {
                formatted_rigging.push(
                  {
                    type: resource['PAGETitle'],
                    target: 'lrusysgenerictest',
                    id: '' + resource['PAGE_TABLE_ID'],
                    label: '',
                    test: {}
                  }
                )
              }
            }
            else if (resource['PageType'] == `T`){
              if( !formatted_tests.find (item => item.type === resource['PAGETitle']) ) {
                formatted_tests.push(
                  {
                    type: resource['PAGETitle'],
                    target: 'lrusysgenerictest',
                    id: '' + resource['PAGE_TABLE_ID'],
                    label: '',
                    test: {}
                  }
                )
              }
            }
        })

        Promise.all(promisePayload).then(function(){
          console.log('we have pages for ' + lru['LRUID']+ ' : ' + formatted_pages)

          resolve( {
            type: ata,
            key: '' + lru['LRUID'],
            data: formatted_pages,
            rigging: formatted_rigging,
            tests: formatted_tests
          } )

        }).catch(function(err){
          console.log(err)
          reject(err)
        })



      }, function (err) {
        console.log(err)
        reject(err)
      })

    })
  },

  getPayload: function () {
    let self = this
    
    return new Promise(function (resolve, reject) {
      let sql = 'SELECT LRU.InstanceDesc as name,LRU_tar.LRU_ID as LRUID,  ATAChapter.ChapterNum as ATA_NUMBER,  ' +
        ' ATAChapter.ChapterDesc as ATA  , LRU_tar.`LRU_NAME` as LRU_LABEL , LRU_tar.`LRU_USAGE` , SYS_LRU.`LRU_NAME` as LRU_NAME,  ' +
        ' SUBSTR(ATAChapter.ChapterNum, 1 ,2 ) as ATA_MAIN_NUMBER ' +
        ' FROM ATAChapter ' +
        ' LEFT JOIN SYS_LRU ON (SYS_LRU.`ATA_NUM` = ATAChapter.ChapterNum)' +
        ' LEFT JOIN LRU ON (SYS_LRU.`LRU_ID` = LRU.LRUID)' +
        ' LEFT JOIN LRU_tar ON (LRU_tar.`LRU_ID` = LRU.`LRUID`)  ' +
        ' ORDER BY ATA_MAIN_NUMBER ASC, LRU_NAME ASC '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  formatPayload: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      self.getPayload().then(function (result) {
        let formatted = []
        formatted['ataCombo'] = []
        formatted['lruCombo'] = []
        formatted.data = {}
        formatted.data.items = {}
        formatted.data.items.lrus = []

        let promisePayload = result.map(function (resource, i) {

          let ataSplit = resource['ATA_NUMBER'].split('-')

          if ( ataSplit[1] === '00' &&
            ataSplit[2] === '00' &&
            !formatted['ataCombo'].find (item => item.key === ataSplit[0]) ) {
            formatted['ataCombo'].push(
              {
                label: resource['ATA_NUMBER'] + ' - '+ resource['ATA'],
                id: i,
                key: ataSplit[0],
                selected: (i == 0) ? 1 : 0,
                rigable: 0,
                testable: 1,
                enabled: 1
              }
            )
          }

          if (resource['LRU_NAME'] &&
            resource['LRU_NAME'] !== '' &&
            !formatted['lruCombo'].find (item => item.key === resource['LRUID']) ) {
            formatted['lruCombo'].push(
              {
                label: resource['LRU_NAME'],
                id: i,
                type: ataSplit[0],
                key: '' + resource['LRUID'],
                selected: 0,
                enabled: 1,
                rigable: 0,
                testable: 0
              }
            )
          }
        })

        let promiseDataPayload = result.map(function (resource, i) {

          let ataSplit = resource['ATA_NUMBER'].split('-')

          if (resource['LRU_NAME'] && resource['LRU_NAME'] !== '') {

            return new Promise(function (resolve, reject) {
              self.selectedDataLru(resource, ataSplit[0]).then(function (result) {
                console.log('pushed')
                formatted.data.items.lrus.push(result)
                resolve (result)
              }, function (err) {
                console.log(err)
                reject(err)
              })
            }, function (err) {
              console.log(err)
              reject(err)
            })

          }
        })

        Promise.all(promisePayload).then(function(){
          Promise.all(promiseDataPayload).then(function(){
              resolve(formatted)
          }).catch(function(err){
            console.log(err)
            reject(err)
          })
        }).catch(function(err){
          console.log(err)
          reject(err)
        })

      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  selectedDataLru: function (resource, ata) {
    let self = this

    return new Promise(function (resolve, reject) {

      let formatted_lru_data = {
        type: ata,
        key: '' + resource['LRUID'],
        data: [
          {
            type: 'Data Reader',
            target: 'lrusysdatareader',
            label: resource['LRU_LABEL'],
            id: resource['LRUID'],
            lrus: [
              {
                lru: resource['LRU_NAME'],
                data: []
              }
            ]
          }
        ]
      }

      //if(self._config.fetchATAs.includes(ata)) {
        console.log('foundLRU')
        self.formatDataReaderPayload(resource, ata).then(function (result) {
            resolve (result)
        }, function (err) {
          console.log(err)
          reject(err)
        })
      //}
      //else{
        //resolve (formatted_lru_data)
      //}
    })
  }
})

module.exports = ViewLruSysOperationsModel
