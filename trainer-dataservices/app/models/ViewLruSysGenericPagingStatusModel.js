const db = require('../services/dbManager');
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')
const _ = require('lodash')

const ViewLruSysGenericPagingStatusModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: '',
    componentName: 'lrusysgenericpagingstatus',
    parentComponentName: 'lruSysOperations',
    header: {
      maintMenuSectionsVisibility: true,
      viewBackBtnLabel: 'Return To<br> Lru/Sys OPS',
      viewBtnVisible: false,
      viewBackBtnVisible: true
    },
    eicasMessages: _eicas.getEICASLRU(),
    data: []
  },

  returnPayload: function (req) {
    let self = this
    let pageTabId = req.query.id

    return new Promise(function (resolve, reject) {
      self.formatPayload(pageTabId).then(function (result) {
        self.payload.data = result
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function (pageTabId) {
    let self = this
    let type = 'D'

    return new Promise(function (resolve, reject) {
      let sql = 'SELECT comp.COMP_ID, comp.COMP_TYPE, comp.COMP_ROW,comp.COMP_COL, comp.COMP_COLOR, ' +
        ' comp.COMP_JUSTIC, comp.COMP_TYPE, comp.COMP_LENGTH, comp.COMP_TEXT, comp.COMP_PARAM, ' +
        ' page.TITLE, pt.NAME, pt.LRU_ID, page.PAGE_ID as PAGE_ID, page.PAGE_TABLE_ID as PAGE_TABLE_ID, ' +
        ' cp.parameterValue ' +
        ' FROM PAGE_TABLE as pt ' +
        ' INNER JOIN PAGE as page ' +
        ' ON page.PAGE_TABLE_ID = pt.PAGE_TABLE_ID ' +
        ' INNER JOIN COMPONENT AS comp ' +
        ' ON comp.PAGE_ID = page.PAGE_ID ' +
        ' LEFT JOIN scnComponentParameter AS cp ' +
        ' ON cp.componentID = comp.COMP_ID ' +
        ' AND cp.scenarioID = ' + self._config.defaultScenarioId +
        ' WHERE pt.PAGE_TABLE_ID = ' + pageTabId +
        ' ORDER BY page.PAGE_ID ASC, comp.COMP_ROW ASC, comp.COMP_COL ASC '

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)
      })
    })
  },

  formatPayload: function (pageTabId) {
    let self = this

    return new Promise(function (resolve, reject) {

      const numRows = 34 // 0 - 33
      const numCols = 57 // 0 - 56

      let start_row =  `<div class="genericPageRow">`
      let end_row = `</div>`
      let start_cell =  `<div class="genericPageCell">`
      let end_cell = `</div>`
      let extracted = {}
      let formatted_pages = []
      let complete_page = ``
      let page_template = {}

      for (let i = 0; i < numRows; i++){
        page_template[''+i] = {}
        for (let j = 0; j < numCols; j++) {
          page_template[''+i][''+j] = ` `
        }
      }
      self.getPayload(pageTabId).then(function (result) {

        let promisePayload = result.map(function (resource, i) {
          if( typeof extracted[''+resource['PAGE_ID']] === "undefined" ) {
            extracted[''+resource['PAGE_ID']] = _.cloneDeep(page_template)
            self.payload.title = resource['TITLE']
          }

          switch(resource['COMP_COLOR']) {
            case 0 :
              cl = `white`
              break
            case 1 :
              cl = `red`
              break
            case 2 :
              cl = `yellow`
              break
            case 3 :
            case 4 :
            case 7 :
            case 9 :
              cl = `cyan`
              break
            default:
              cl = `white`
              break
          }

          let param = (resource['parameterValue'] !== null ) ? resource['parameterValue'] : 0
            extracted[''+resource['PAGE_ID']][''+resource['COMP_ROW']][''+resource['COMP_COL']] =
              `<div class="genericPageCellValue" style="color: ` + cl + `;" data-component-id="` + resource['COMP_ID'] + `">` +
              ( (resource['COMP_TYPE'] === 'PARAMETER') ? param : resource['COMP_TEXT'] ) +
              `</div>`
        })

        console.log(extracted)

        Promise.all(promisePayload).then(function(){

          for ( ePageKey in extracted ) {
            complete_page = ``
            let ePage = extracted[''+ePageKey]
            for ( eRowKey in ePage ) {
              let eRow = ePage[''+eRowKey]
              complete_page += start_row
              for ( eCellKey in eRow ) {
                let eCell = eRow[''+eCellKey]
                complete_page += start_cell
                complete_page += eCell
                complete_page += end_cell
              }
              complete_page += end_row
            }
            formatted_pages.push(complete_page)
          }

          resolve( formatted_pages )

        }).catch(function(err){
          console.log(err)
          reject(err)
        })

      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }
})

module.exports = ViewLruSysGenericPagingStatusModel
