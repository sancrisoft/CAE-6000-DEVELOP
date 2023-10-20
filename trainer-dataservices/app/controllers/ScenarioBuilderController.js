const db = require('../services/dbManager');
const config = require('../config/config.js')

const CoreUtil = require('../utils/CoreUtil.js')
const SqlUtil = require('../utils/SqlUtil.js')
const XmlUtil = require('../utils/XmlUtil.js')

const ViewScenarioBuilderModel = require('../models/ViewScenarioBuilderModel')
const ViewSCNFlightDeckEffectsModel = require('../models/ViewSCNFlightDeckEffectsModel')
const ViewSCNFaultMessagesModel = require('../models/ViewSCNFaultMessagesModel')

const LruModule = require('../modules/LruModule.js')

const ScenarioBuilderController = ({

  _config: Object.assign(config, {}),

  _scnTables: [
    {
      tableName: 'scnScenarios',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnScenarios\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`name\` text NOT NULL,
          \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          \`version\` text,
          \`description\` text,
          \`author\` text,
          \`tailNumber\` varchar(25) DEFAULT '9001',
          \`flightLegCounter\` text,
          \`updated_at\` datetime DEFAULT NULL
        );
      `,
      properties: {
        scenarioIdColumn: 'id'
      }
    },
    {
      tableName: 'scnAPMWordBits',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnAPMWordBits\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`description\` varchar(155) ,
          \`leftAPM\` varchar(155) ,
          \`rigthAPM\` varchar(155),
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnFaults',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnFaults\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`fligthLeg\` varchar(60) ,
          \`fligthPhase\` varchar(60) ,
          \`fligthLegCounter\` varchar(60) ,
          \`status\` varchar(10) DEFAULT 'Not Active',
          \`occurences\` varchar(60) ,
          \`dataTime\` varchar(60) DEFAULT NULL,
          \`createdAT\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          \`idOrign\` int(11) DEFAULT NULL,
          \`eqid\` int(11) DEFAULT NULL,
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      triggers: [
        {
          triggerName: 'scnFaults_trigger',
          triggerQuery: `CREATE TRIGGER IF NOT EXISTS \`scnFaults_trigger\`
            AFTER INSERT ON \`scnFaults\`
            FOR EACH ROW
            WHEN NEW.\`dataTime\` IS NULL OR NEW.\`dataTime\` = ''
            BEGIN
                UPDATE \`scnFaults\` SET \`dataTime\` = (DATETIME(0, "unixepoch")) WHERE \`id\` = NEW.\`id\`;
            END;
          `,
        }
      ],
      queries: [
        `UPDATE \`scnFaults\`
          SET \`status\` = 'Active',
          \`occurences\` = '1'
          WHERE \`occurences\` = 'Active'
        `
      ],
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnFdeLinkFault',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnFdeLinkFault\` (
          \`fault_id\` int(11) NOT NULL,
          \`fde_id\` int(11) NOT NULL,
          \`scenario_id\` int(11) NOT NULL,
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          FOREIGN KEY (scenario_id) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE,
          FOREIGN KEY (fault_id) REFERENCES \`scnFaults\`(id) ON DELETE CASCADE,
          FOREIGN KEY (fde_id) REFERENCES \`scnFdes\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenario_id'
      }
    },
    {
      tableName: 'scnFdes',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnFdes\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`idOrign\` int(11) DEFAULT NULL,
          \`date_time\` varchar(60) DEFAULT NULL,
          \`fligthLegCounter\` int(11) DEFAULT NULL,
          \`flightLeg\` varchar(60) DEFAULT '',
          \`status\` varchar(10) DEFAULT 'Not Active',
          \`occurences\` varchar(60) DEFAULT '',
          \`flightPhase\` varchar(60) DEFAULT '',
          \`eqid\` int(11) DEFAULT NULL,
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      triggers: [
        {
          triggerName: 'scnFdes_trigger',
          triggerQuery: `CREATE TRIGGER IF NOT EXISTS \`scnFdes_trigger\`
            AFTER INSERT ON \`scnFdes\`
            FOR EACH ROW
            WHEN NEW.\`date_time\` IS NULL OR NEW.\`date_time\` = ''
            BEGIN
                UPDATE \`scnFdes\` SET \`date_time\` = (DATETIME(0, "unixepoch")) WHERE \`id\` = NEW.\`id\`;
            END;
          `,
        }
      ],
      queries: [
        `UPDATE \`scnFdes\`
          SET \`status\` = 'Active',
          \`occurences\` = '1'
          WHERE \`occurences\` = 'Active'
        `
      ],
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnIMAthirdParty',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnIMAthirdParty\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`description\` varchar(155) ,
          \`leftAPM\` varchar(155) ,
          \`rigthAPM\` varchar(155),
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnLifeCycleDatas',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnLifeCycleDatas\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`name\` varchar(32) ,
          \`value\` text,
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnMessages',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnMessages\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`ata\` varchar(255) NOT NULL DEFAULT '',
          \`fligthLeg\` varchar(255) NOT NULL DEFAULT '',
          \`dateTime\` varchar(255) DEFAULT NULL,
          \`fligthPhase\` varchar(255) NOT NULL DEFAULT '',
          \`fligthLegCounter\` varchar(255) NOT NULL DEFAULT '',
          \`status\` varchar(10) NOT NULL DEFAULT 'Not Active',
          \`occurences\` varchar(255) NOT NULL DEFAULT '',
          eqid int(11),
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      triggers: [
        {
          triggerName: 'scnMessages_trigger',
          triggerQuery: `CREATE TRIGGER IF NOT EXISTS \`scnMessages_trigger\`
            AFTER INSERT ON \`scnMessages\`
            FOR EACH ROW
            WHEN NEW.\`dateTime\` IS NULL OR NEW.\`dateTime\` = ''
            BEGIN
                UPDATE \`scnMessages\` SET \`dateTime\` = (DATETIME(0, "unixepoch")) WHERE \`id\` = NEW.\`id\`;
            END;
          `,
        }
      ],
      queries: [
        `UPDATE \`scnMessages\`
          SET \`status\` = 'Active',
          \`occurences\` = '1'
          WHERE \`occurences\` = 'Active'
        `
      ],
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnSuspectedLRUs',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnSuspectedLRUs\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`messageID\` int(11) NOT NULL,
          \`name\` varchar(110),
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnSystemExceedances',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnSystemExceedances\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`date_time\` text DEFAULT NULL,
          \`peak\` text ,
          \`duration\` int(11) DEFAULT NULL,
          \`flightPhase\` text ,
          \`flightLeg\` text ,
          \`flightLegCounter\` text ,
          \`name\` text ,
          \`threshold\` text,
          \`acm_exceedance_ID\` INTEGER,
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      triggers: [
        {
          triggerName: 'scnSystemExceedances_trigger',
          triggerQuery: `CREATE TRIGGER IF NOT EXISTS \`scnSystemExceedances_trigger\`
            AFTER INSERT ON \`scnSystemExceedances\`
            FOR EACH ROW
            WHEN NEW.\`date_time\` IS NULL OR NEW.\`date_time\` = ''
            BEGIN
                UPDATE \`scnSystemExceedances\` SET \`date_time\` = (DATETIME(0, "unixepoch")) WHERE \`id\` = NEW.\`id\`;
            END;
          `,
        }
      ],
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnSystemParameters',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnSystemParameters\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`name\` varchar(32) ,
          \`value\` int(11) DEFAULT NULL,
          \`acm_param_ID\` INTEGER ,
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnTargetLRU',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnTargetLRU\` (
          \`scenarioID\` int(11) NOT NULL,
          \`idTargetLRU\` varchar(111) NOT NULL DEFAULT '',
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnTrends',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnTrends\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\` int(11) NOT NULL,
          \`date_time\` varchar(60) DEFAULT NULL,
          \`flightLeg\` varchar(60) ,
          \`flightLegCounter\` varchar(60) ,
          \`flightPhase\` varchar(60) ,
          \`acm_trend_id\` int(11) NOT NULL,
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      triggers: [
        {
          triggerName: 'scnTrends_trigger',
          triggerQuery: `CREATE TRIGGER IF NOT EXISTS \`scnTrends_trigger\`
            AFTER INSERT ON \`scnTrends\`
            FOR EACH ROW
            WHEN NEW.\`date_time\` IS NULL OR NEW.\`date_time\` = ''
            BEGIN
                UPDATE \`scnTrends\` SET \`date_time\` = (DATETIME(0, "unixepoch")) WHERE \`id\` = NEW.\`id\`;
            END;
          `,
        }
      ],
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnFields',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnFields\` (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          scenarioID int(11),
          DataFieldID int(11) NOT NULL DEFAULT '0',
          name varchar(50) DEFAULT NULL,
          DataTypeID int(11) DEFAULT '0',
          value varchar(255),
          contextType varchar(8),
          contextId int(11),
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnComponentParameter',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnComponentParameter\` (
          \`id\`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          \`scenarioID\`	INTEGER NOT NULL,
          \`componentID\`	INTEGER NOT NULL,
          \`parameterValue\`	TEXT,
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    },
    {
      tableName: 'scnSystemParametersVariables',
      schema: `
        CREATE TABLE IF NOT EXISTS \`scnSystemParametersVariables\` (
          \`id\` INTEGER PRIMARY KEY AUTOINCREMENT,
          \`variableID\` INT NOT NULL,
          \`scenarioID\` int(11) NOT NULL,
          \`value\` int(11) DEFAULT NULL,
          FOREIGN KEY (scenarioID) REFERENCES \`scnScenarios\`(id) ON DELETE CASCADE
        );
      `,
      properties: {
        scenarioIdColumn: 'scenarioID'
      }
    }
  ],

  refreshTables: function () {
    let self = this

    return new Promise(async function (resolve, reject) {
      // Uncomment below to enforce constraints during the transaction.
      // await db.run('PRAGMA foreign_keys = ON')

      await db.run('BEGIN TRANSACTION')

      for (let scnTable of self._scnTables) {
        await db.run('CREATE TABLE `tempTable` AS SELECT * FROM `' + scnTable.tableName + '`')

        // Extract all the data.
        let exportObj = await db.all('SELECT * FROM `tempTable`')

        await db.run('DROP TABLE `' + scnTable.tableName + '`')

        await db.run(scnTable.schema)

        if (scnTable.triggers) {
          for (let trigger of scnTable.triggers) {
            await db.run('DROP TRIGGER IF EXISTS `' + trigger.triggerName + '`')

            await db.run(trigger.triggerQuery)
          }
        }

        // Extract the column structure for the new table.
        let targetObj = await db.all('PRAGMA table_info(`' + scnTable.tableName + '`)')
        let targetColumnNames = targetObj.map(row => row.name)

        // Import all records into the corresponding table.
        for (let row of exportObj) {
          let targetColumnValues = targetColumnNames.map(targetColumnName => SqlUtil.defaultTo(row[targetColumnName], ''))

          await db.run(
            'INSERT INTO `' + scnTable.tableName + '` ' +
              '(`' + targetColumnNames.join('`, `') + '`)' +
              ' VALUES ' +
              '(' + targetColumnValues.join(', ') + ')'
          )
        }

        if (scnTable.queries) {
          for (let query of scnTable.queries) {
            await db.run(query)
          }
        }

        await db.run('DROP TABLE `tempTable`')
      }

      await db.run('COMMIT')

      resolve()
    })
  },

  removeInvalidIds: function () {
    let self = this

    return new Promise(async function (resolve, reject) {
      // Uncomment below to enforce constraints during the transaction.
      // await db.run('PRAGMA foreign_keys = ON')

      await db.run('BEGIN TRANSACTION')

      for (let scnTable of self._scnTables) {
        await db.run('DELETE FROM `' + scnTable.tableName + '` WHERE `' + scnTable.properties.scenarioIdColumn + '` NOT IN (SELECT id FROM `scnScenarios`)')
      }

      await db.run('COMMIT')

      resolve()
    })
  },

  duplicateScenario: function (p_id, p_saveAsName = '') {
    let self = this

    return new Promise(function (resolve, reject) {
      self.exportScenario(p_id).then((result) => {
        let exportJson = JSON.stringify(result)
        let importObj = JSON.parse(exportJson)

        // Change name of duplicated scenario.
        if (p_saveAsName !== '' && importObj.scnScenarios[0]) {
          importObj.scnScenarios[0].name = p_saveAsName
        }

        ScenarioBuilderController.importScenario(importObj).then(function (nextId) {
          resolve(nextId)
        }, (err) => {
          reject(err)
        })
      }, (err) => {
        reject(err)
      })
    })
  },

  exportScenario: function (p_id) {
    let self = this

    return new Promise(async function (resolve, reject) {
      let exportObj = {}

      // Uncomment below to enforce constraints during the transaction.
      // await db.run('PRAGMA foreign_keys = ON')

      await db.run('BEGIN TRANSACTION')

      for (let scnTable of self._scnTables) {
        let scenarioIdColumns

        // Create an empty shell table and import all records into the shell table.
        await db.run('CREATE TABLE `tempTable` AS SELECT * FROM `' + scnTable.tableName + '` WHERE `' + scnTable.properties.scenarioIdColumn + '` = ' + p_id)

        // Extract all the data.
        exportObj[scnTable.tableName] = await db.all('SELECT * FROM `tempTable`')

        await db.run('DROP TABLE `tempTable`')
      }

      await db.run('COMMIT')

      resolve(exportObj)
    })
  },

  importScenario: function (p_importObj) {
    let self = this

    return new Promise(async function (resolve, reject) {
      let fktTableMapping = {}

      // Uncomment below to enforce constraints during the transaction.
      // await db.run('PRAGMA foreign_keys = ON')

      await db.run('BEGIN TRANSACTION')

      // Determine the next scenario id to assign for the imported scenario.
      await db.run('CREATE TEMPORARY TABLE `nextScenarioId` AS SELECT MAX(id) + 1 as nextId FROM `scnScenarios`')

      let { nextId } = await db.get('SELECT nextId FROM `nextScenarioId`')

      for (let scnTable of self._scnTables) {
        // Skip invalid tables.
        if (!p_importObj[scnTable.tableName]) {
          continue
        }

        fktTableMapping[scnTable.tableName] = []

        // Import all records into the corresponding table.
        for (let row of p_importObj[scnTable.tableName]) {
          // Put scenario id first so it overwrites the imported value.
          // Put id last to empty the primary key and not cause constraint errors.
          let { lastID } = await db.run(
            'INSERT INTO `' + scnTable.tableName + '` (' +
              '`' + scnTable.properties.scenarioIdColumn + '`, ' +
              '`' + Object.keys(row).join('`, `') + '`, ' +
              '`id`' +
              ') VALUES (' +
              '(SELECT nextId FROM `nextScenarioId`), ' +
              '\'' + Object.values(row).join('\', \'') + '\', ' +
              'NULL)'
            )

          // Set properties inherent to run(). (REF 7d475829-b0f7-4b7e-a4d0-ec35f3ab41ac)
          fktTableMapping[scnTable.tableName] = [...fktTableMapping[scnTable.tableName], ...[{ fktOldId: row['id'], fktNewId: lastID }]]
        }
      }

      await db.run('COMMIT')

      // Update foreign key tables with new ids.
      await self.updateForeignKeyTableIds(nextId, fktTableMapping)

      resolve(nextId)
    })
  },

  updateForeignKeyTableIds: function (p_scenarioId, p_fktTableMappingObj) {
    let self = this

    return new Promise(async function (resolve, reject) {
      // Uncomment below to enforce constraints during the transaction.
      // await db.run('PRAGMA foreign_keys = ON')

      await db.run('BEGIN TRANSACTION')

      for (let scnTable of self._scnTables) {
        // Skip invalid tables.
        if (!p_fktTableMappingObj[scnTable.tableName]) {
          continue
        }

        // Adjust foreign key table ids.
        switch (scnTable.tableName) {
          case 'scnFdeLinkFault':
            for (let row of p_fktTableMappingObj['scnFdes']) {
              await db.run('UPDATE `' + scnTable.tableName + '` SET fde_id = ' + row['fktNewId'] + ' WHERE `' + scnTable.properties.scenarioIdColumn + '` = ' + p_scenarioId + ' AND fde_id = ' + row['fktOldId'])
            }
            for (let row of p_fktTableMappingObj['scnFaults']) {
              await db.run('UPDATE `' + scnTable.tableName + '` SET fault_id = ' + row['fktNewId'] + ' WHERE `' + scnTable.properties.scenarioIdColumn + '` = ' + p_scenarioId + ' AND fault_id = ' + row['fktOldId'])
            }
            break
        }
      }

      await db.run('COMMIT')

      resolve()
    })
  },

  loadAircraftReport: function (p_scenarioId, p_xmlString) {
    let self = this

    return new Promise(async function (resolve, reject) {
      let report = {}

      try {
        report = XmlUtil.xml2json(p_xmlString)
      }
      catch (e) {
        reject(e)

        return
      }

      let reportType = Object.keys(report)[0]
      report = report[reportType]

      if (!report) {
        reject('Invalid input.')
        return
      }

      let p_scnOptions = {}
      let fktFdeFaults = []

      switch (reportType) {
        case 'FDEs_Report':
          let fdes = report.FDE

          for (const fde of fdes) {
            let fdeId
            try {
              fdeId = await self.upsertFde(p_scenarioId, {
                faultCode: fde.Fault_Code,
                flightLeg: fde.Flight_Leg,
                flightPhase: fde.Flight_Phase,
                status: fde.Status,
                occurrences: fde.Occurrences,
                date: fde.FDE_Logged_Date_Time,
                eqid: fde.Equation_ID
              })

              await self.upsertLruData(p_scenarioId, {
                eqid: fde.Equation_ID,
                contextType: 'fde',
                contextId: fdeId,
                lruData: fde.FDE_Data
              })
            } catch (err) {
              err
              continue
            }

            if (!CoreUtil.isEquivalentString(fde.Number_of_Faults, 0)) {
              let faults = fde.Correlated_Fault_Msgs.Fault_Msg.length ? fde.Correlated_Fault_Msgs.Fault_Msg : [fde.Correlated_Fault_Msgs.Fault_Msg]

              if (!CoreUtil.isEquivalentString(fde.Number_of_Faults, faults.length)) {
                reject('Number_of_Faults count (' + fde.Number_of_Faults + ') mismatch with Correlated_Fault_Msgs size (' + faults.length + ').')
                return
              }

              for (const fault of faults) {
                let faultId
                try {
                  faultId = await self.upsertFault(p_scenarioId, {
                    faultCode: fault.Fault_Code,
                    flightLeg: fault.Flight_Leg,
                    date: fault.Logged_date_Time,
                    eqid: fault.Equation_ID
                  })
                } catch (err) {
                  err
                  continue
                }

                // Keep track of FKT ids.
                fktFdeFaults = [...fktFdeFaults, {
                  scenarioId: p_scenarioId,
                  fdeId,
                  faultId
                }]
              }
            }
          }
          break
        case 'FaultMsgs_Report':
          let faults = report.Fault_Message

          for (const fault of faults) {
            let faultId
            try {
              faultId = await self.upsertFault(p_scenarioId, {
                faultCode: fault.Fault_Code,
                flightLeg: fault.Flight_Leg,
                flightPhase: fault.Flight_Phase,
                status: fault.Status,
                occurrences: fault.Occurrences,
                date: fault.Logged_Date_Time,
                eqid: fault.Equation_ID
              })

              await self.upsertLruData(p_scenarioId, {
                eqid: fault.Equation_ID,
                contextType: 'fault',
                contextId: faultId,
                lruData: fault.Data_Used_to_Determine_Fault
              })
            } catch (err) {
              err
              continue
            }

            if (fault.Correlated_Flight_Deck_Effects.FDE) {
              let fdes = fault.Correlated_Flight_Deck_Effects.FDE.length ? fault.Correlated_Flight_Deck_Effects.FDE : [fault.Correlated_Flight_Deck_Effects.FDE]

              for (const fde of fdes) {
                let fdeId
                try {
                  fdeId = await self.upsertFde(p_scenarioId, {
                    faultCode: fde.Fault_Code,
                    flightLeg: fde.Flight_Leg,
                    flightPhase: fde.Flight_Phase,
                    date: fde.FDE_Logged_Date_Time,
                    eqid: fde.Equation_ID
                  })
                } catch (err) {
                  err
                  continue
                }

                // Keep track of FKT ids.
                fktFdeFaults = [...fktFdeFaults, {
                  scenarioId: p_scenarioId,
                  fdeId,
                  faultId
                }]
              }
            }
          }
          break
        default:
          reject('Unknown format.')
          break
      }

      // Link FDEs to Faults in FKT.
      for (const fktFdeFault of fktFdeFaults) {
        try {
          await self.upsertFktFdeFault(fktFdeFault)
        } catch (err) {
          err
          continue
        }
      }

      resolve(p_scenarioId)
    })
  },

  upsertFde: (p_scenarioId, p_fdeObj) => {
    let self = this

    return new Promise(async function (resolve, reject) {
      let p_scnOptions = {
        action: 'upsert',
        id: p_scenarioId,
        data: {
          faultCode: p_fdeObj.faultCode,
          fl: p_fdeObj.flightLeg,
          phase: CoreUtil.toTitleCase(p_fdeObj.flightPhase),
          status: p_fdeObj.status,
          occurences: p_fdeObj.occurrences,
          date: p_fdeObj.date,
          casid: p_fdeObj.eqid
        }
      }

      let fdeId
      await ViewSCNFlightDeckEffectsModel.returnPayload(p_scnOptions).then(result => {
        fdeId = result.data.lastId

        resolve(fdeId)
      }, err => {
        reject(err)
      })
    })
  },

  upsertFault: (p_scenarioId, p_faultObj) => {
    let self = this

    return new Promise(async function (resolve, reject) {
      let p_scnOptions = {
        action: 'upsert',
        id: p_scenarioId,
        data: {
          faultCode: p_faultObj.faultCode,
          flightLeg: p_faultObj.flightLeg,
          flightPhase: p_faultObj.flightPhase ? CoreUtil.toTitleCase(p_faultObj.flightPhase) : null,
          status: p_faultObj.status,
          occurences: p_faultObj.occurrences,
          date: p_faultObj.date,
          eqid: p_faultObj.eqid
        }
      }

      let faultId
      await ViewSCNFaultMessagesModel.returnPayload(p_scnOptions).then(result => {
        faultId = result.data.lastId

        resolve(faultId)
      }, err => {
        reject(err)
      })
    })
  },

  upsertFktFdeFault: (p_fktFdeFaultObj) => {
    let self = this

    return new Promise(async function (resolve, reject) {
      let p_fktOptions = {
        action: 'fkt',
        data: {
          action: 'insert',
          fktTable: 'scnFdeLinkFault',
          fktColumns: [
            {
              key: 'scenario_id',
              value: p_fktFdeFaultObj.scenarioId
            },
            {
              key: 'fde_id',
              value: p_fktFdeFaultObj.fdeId
            },
            {
              key: 'fault_id',
              value: p_fktFdeFaultObj.faultId
            }
          ]
        }
      }

      await ViewScenarioBuilderModel.returnPayload(p_fktOptions).then(result => {
        resolve(result)
      }, err => {
        reject(err)
      })
    })
  },

  deleteFktFdeFault: (p_fktFdeFaultObj) => {
    let self = this

    return new Promise(async function (resolve, reject) {
      let p_fktOptions = {
        action: 'fkt',
        data: {
          action: 'delete',
          fktTable: 'scnFdeLinkFault',
          fktColumns: [
            {
              key: 'scenario_id',
              value: p_fktFdeFaultObj.scenarioId
            },
            {
              key: 'fde_id',
              value: p_fktFdeFaultObj.fdeId
            }
          ]
        }
      }

      await ViewScenarioBuilderModel.returnPayload(p_fktOptions).then(result => {
        resolve(result)
      }, err => {
        reject(err)
      })
    })
  },

  upsertLruData: function (p_scenarioId, p_lruDataObj) {
    let self = this

    return new Promise(async function (resolve, reject) {
      if (!p_lruDataObj.lruData) {
        resolve()
      }
      else {
        // Set lruData as a string.
        p_lruDataObj.lruData = p_lruDataObj.lruData._cdata

        let p_scnOptions = {
          action: 'upsert',
          id: p_scenarioId,
          data: p_lruDataObj
        }

        await LruModule.upsertLruData(p_scnOptions).then(result => {
          resolve()
        }, err => {
          reject(err)
        })
      }
    })
  }

})

module.exports = ScenarioBuilderController
