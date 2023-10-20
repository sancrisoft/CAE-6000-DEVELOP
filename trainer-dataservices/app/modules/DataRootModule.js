const sqlite3 = require('@journeyapps/sqlcipher').verbose();
const path = require('path');
const db = require('../services/dbManager');
const config = require('../config/config.js');

const DataRootModule = ({
  _config: Object.assign(config, {}),

  sharedLoadsetsPath: './static/data/shared/loadsets',
  privateLoadsetsPath: './static/data/private/mpuica/loadsets',
  privateDataPath: './static/data/private/mpuica/data',
  dataFileName: 'g7000-vx.x.x_vx-OMS.db3',
  omstarVersion: 'OMSTAR_811-2641-3B062817',
  omstVersion: '810-0099-3B00062817',
  omstarFileMask: 'COL_OMSTAR-600001',
  omstFileMask: 'COL_OMST-600001',
  tarFileExt: '01',
  imatarFileExt: '02',
  configFileExt: '07',
  acmFileExt: '03',

  configTables: [
    //'EquationDataPresort',
    //'Ambiguity',
    //'ATAChapter',
    // 'DataField',
    // 'DataLink',
    // 'DataSource',
    // 'DataSourceGroup',
    // 'DataType',
    // 'Equation',
    // 'FDECategory',
    // 'FDEEquation',
    // 'FDELink',
    // 'IMSconfig',
    // 'IMSdbstatus',
    // 'IMSlicenseMgmt',
    // 'IMStargetLRU',
    // 'IMSusbDump',
    // 'IMSconfig',
    // 'IMSusbSticks',
    // 'LRUParameter',
    // 'IMSconfig',
    // 'LRUParameter',
    // 'LRUParameterEnums',
    // 'LRU_tar',
    //'StrappingWord',
    //'SystemParameter',
    //'SystemParameterGroup',
    //'LruType'
  ],
  omstarTables: [
    'LRUParameter',
    'COMPONENT',
    'LRU',
    'PAGE',
    'PAGE_TABLE',
    'SYS_LRU'
  ],
  acmTables: [
    'acm_trend',
    'acm_lcd_group',
    'acm_lcd',
    'acm_exceedance',
    'acm_group'
  ],
/*
  tables to generate the sql query
 */
  OMSTTables :
   [
     'ATAChapter',
     'DataField',
     'DataLink',
     'DataSource',
     'DataSourceGroup',
     'DataType',
     'FDECategory',
     'LRU',
     'LruType',
     'StrappingWord'
  ],
  OMSTAR1Tables: [
    'LRUParameter',
    'LRUParameterEnums'
  ],

  OMSTAR2Tables :
  [
    'COMPONENT',
    'LRU_tar',
    'PAGE',
    'PAGE_TABLE',
    'SYS_LRU',
    'FIELDLOADABLE_LRU'
  ],

  EQTables :
  [
    'Ambiguity',
    'EquationDataPresort',
    'FDEEquation',
    'FDELink',
    'SystemParameter',
    'SystemParameterGroup',
    'Equation'
  ],

  getQuery: function () {
    let self = this
    return new Promise(function (resolve) {
      let formatted = ``

      formatted += `\n\n`
      self.OMSTTables.forEach(function(table){
        formatted += `CREATE TABLE IF NOT EXISTS main.${table} AS SELECT * FROM oms.${table} WHERE 0; \n`
        formatted += `INSERT INTO main.${table} SELECT * FROM oms.${table};\n`
      })
      formatted += `\n\n`

      self.OMSTAR1Tables.forEach(function(table){
        formatted += `CREATE TABLE IF NOT EXISTS main.${table} AS SELECT * FROM star1.${table} WHERE 0;\n`
        formatted += `INSERT INTO main.${table} SELECT * FROM star1.${table};\n`
      })
      formatted += `\n\n`

      self.OMSTAR2Tables.forEach(function(table){
        formatted += `CREATE TABLE IF NOT EXISTS main.${table} AS SELECT * FROM star2.${table} WHERE 0;\n`
        formatted += `INSERT INTO main.${table} SELECT * FROM star2.${table};\n`
      })
      formatted += `\n\n`

      self.EQTables.forEach(function(table){
        formatted += `CREATE TABLE IF NOT EXISTS main.${table} AS SELECT * FROM eq.${table} WHERE 0;\n`
        formatted += `INSERT INTO main.${table} SELECT * FROM eq.${table};\n`
      })
      formatted += `\n\n`

      resolve(formatted)
    })
  },

  testDB: function (dbFileName) {
    let self = this

    return new Promise(function (resolve, reject) {
      db.serialize(() => {
        db.all("SELECT name FROM 'sqlite_master' WHERE type='table'", (err, rows) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve(rows)
        })
      })
    })
  },

  loadOMST: function () {
    let self = this
    console.log('loadOMST')
    return new Promise(function (resolve, reject) {

      const configFile = self.sharedLoadsetsPath + '/' + self.omstVersion + '/' + self.omstFileMask + '.' + self.configFileExt
      //const configFile = self.sharedLoadsetsPath + '/' + self.omstVersion + '/config.db3'
      const dataFile = self.privateDataPath + '/' + self.dataFileName

      console.log('source param:' + configFile)
      console.log('target param:' + dataFile)

      let targetDb = new sqlite3.Database(dataFile, sqlite3.OPEN_WRITE, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        }
      })
      targetDb.run(`PRAGMA KEY = '${self._config.cipherKey}'`);
      console.log('target:' + dataFile)

      let sourceDb = new sqlite3.Database(configFile, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        }

        console.log('source:' + configFile)
      })
      sourceDb.run(`PRAGMA KEY = '${self._config.cipherKey}'`);

      let promiseArr = self.configTables.map(function (resource) {
        return self.transferDbTable( sourceDb, targetDb, resource).then(function (result) {
          return result
        })
      });

      Promise.all(promiseArr).then(function(resultsArray){

        targetDb.close((err) => {
          if (err) {
            console.log(err)
          }
          console.log('Close the target database connection.')
        })
        sourceDb.close((err) => {
          if (err) {
            console.log(err)
          }
          console.log('Close the source database connection.')
        })

        resolve(resultsArray)

      }).catch(function(err){
        reject(err)
      })
    })
  },

  transferDbTable: function (sourceDb, targetDb, table) {
    let self = this
    return new Promise(function (resolve, reject) {

      console.log(`Copying ${table} table`)

      targetDb.run(`DELETE FROM ${table}`)

      sourceDb.each(`SELECT * FROM ${table}`, (error, row) => {
        console.log(row);
        const keys = Object.keys(row); // ['column1', 'column2']
        const columns = keys.toString(); // 'column1,column2'
        let parameters = {};
        let values = '';

        // Generate values and named parameters
        Object.keys(row).forEach((r) => {
          let key = '$' + r;
          // Generates '$column1,$column2'
          values = ( values === '' ) ? key : values.concat(',', key);
          // Generates { $column1: 'foo', $column2: 'bar' }
          parameters[key] = row[r];
        });
        // SQL: insert into OneTable (column1,column2) values ($column1,$column2)
        // Parameters: { $column1: 'foo', $column2: 'bar' }
        targetDb.run(`INSERT INTO ${table} (${columns}) VALUES (${values})`, parameters,
          (err) => {
            if (err) {
              reject(err); // optional: again, you might choose to swallow this error.
            }
          });
      })
      console.log(`Done - ${table} table`)
      resolve (`done ${table}`)
    })

  },

  transferDbAll: function (dbFile, dataFile, dbTables) {
    let targetDb = new sqlite3.Database(dataFile, sqlite3.OPEN_WRITE, (err) => {
      if (err) {
        console.log(err)
      }
      console.log('Connected to the target database.')
    })
    targetDb.run(`PRAGMA KEY = '${this._config.cipherKey}'`);

    targetDb.run(`ATTACH ${dbFile} AS src`)

    this.configTables.forEach((table) => {
      console.log(`Copying ${table} table`)
      targetDb.run(`CREATE TABLE IF NOT EXISTS ${table} AS SELECT * FROM src.${table} WHERE 0`)
      targetDb.run(`INSERT INTO ${table} SELECT * FROM src.${table}`)
    })

    targetDb.close((err) => {
      if (err) {
        console.log(err)
      }
      console.log('Close the target database connection.')
    })
  },

  transferDb: function (dbFile, dataFile, dbTables) {
    let self = this
    return new Promise(function (resolve, reject) {
      self.readFromDb(dbFile, dbTables).then(function (result) {
        // self.writeToDbTable(dataFile, dbTables, result)
        resolve(result)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  readFromDb: function (dbFile, dbTables) {
    let self = this
    return new Promise(function (resolve, reject) {
      let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        }
      })
      db.run(`PRAGMA KEY = '${self._config.cipherKey}'`);

      self.readFromAllDbTables(db, dbTables).then(function (result) {
        console.log('all done')

        resolve(result)

        db.close((err) => {
          if (err) {
            console.log(err)
            reject(err)
          }
        })
      }, function (err) {
        db.close((err) => {
          if (err) {
            console.log(err)
            reject(err)
          }
        })

        console.log(err)
        reject(err)
      })
    })
  },

  readFromAllDbTables: function (db, dbTables) {
    let self = this
    return new Promise(function (resolve, reject) {
      Promise.all(
        dbTables.reduce(function (p, table) {
          self.mapDbTable(db, table).then(function (result) {
            resolve({table: result})
          }, function (err) {
            console.log(err)
            reject(err)
          })
        })
      ).then(function (result) {
        resolve(result)
      }, function (err) {
        console.log(err)
        reject(err)
      }
      )
    }, function (err) {
      console.log(err)
    })
  },

  mapDbTable: function (db, table) {
    let self = this
    return new Promise(function (resolve, reject) {
      self.readFromDbTable(db, table).then(function (result) {
        console.log('dbMAP==================================================')
        console.log(result)
        resolve(result)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  readFromDbTable: function (db, dbTable) {
    return new Promise(function (resolve, reject) {
      db.serialize(() => {
        db.all("SELECT * FROM '" + dbTable + "';", (err, rows) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve(rows)
        })
      })
    })
  },

  // ============================================== write

  writeToDb: function (dbFile, dbTables) {
    let self = this
    return new Promise(function (resolve, reject) {
      let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        }
      })
      db.run(`PRAGMA KEY = '${self._config.cipherKey}'`);

      self.readFromAllDbTables(db, dbTables).then(function (result) {
        console.log('all done')

        resolve(result)

        db.close((err) => {
          if (err) {
            console.log(err)
            reject(err)
          }
        })
      }, function (err) {
        db.close((err) => {
          if (err) {
            console.log(err)
            reject(err)
          }
        })

        console.log(err)
        reject(err)
      })
    })
  },

  writeToAllDbTables: function (db, dbTables) {
    let self = this
    return dbTables.reduce(function (promise, table) {
      return new Promise(function (resolve, reject) {
        return self.readFromDbTable(db, table).then(function (result) {
          resolve(result)
        })
      })
    })
  },

  writeToDbTable: function (db, dbTable) {
    return new Promise(function (resolve, reject) {
      db.serialize(() => {
        db.all("SELECT * FROM '" + dbTable + "';", (err, rows) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve(rows)
        })
      })
    })
  },

  loadOMSTAR: function () {
    return 'poo'
  },

  addSet: function (dataSets, tableName, setsPath) {

  }

})

module.exports = DataRootModule
