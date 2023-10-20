// node test-sqlcipher-fts.js
'use strict';

var sqlite3 = require('@journeyapps/sqlcipher');
const path = require('path');

let config = {
  cipherKey: 'omsstuff'
}

let db = new sqlite3.Database('./static/data/private/mpuica/data/g7000.sqlcipher', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.log(err)
    reject(err)
  }
})

db.run(`PRAGMA KEY = '${config.cipherKey}'`);

let sql = ' SELECT ' +
  ' CASE ' +
  " WHEN ((todayMinus != 0 AND DATETIME('now') >= datetime('now','-'||todayMinus||' DAY')) AND (todayPlus != 0 AND DATETIME('now') <= datetime('now','+'||todayPlus||' DAY') )) " +
  " THEN 'CURRENT' ELSE statusPartNo  " +
  ' END AS status, ' +
  ' CASE ' +
  " WHEN todayMinus = 0 THEN '' ELSE date('now','-'||todayMinus||' DAY')  " +
  ' END AS begin,  ' +
  ' CASE  ' +
  " WHEN todayPlus = 0 THEN '' ELSE date('now','+'||todayPlus||' DAY')  " +
  ' END AS end,  ' +
  ' statusPartNo ,  ' +
  ' identifier,  ' +
  ' cycleInfo,  ' +
  ' IMSdbstatus.database as name ,  ' +
  ' todayMinus as beginAS3, ' +
  ' todayPlus as endAS3 , ' +
  ' ValidityPeriod as validityPeriod, ' +
  ' (SELECT count(*) FROM IMSdbstatus) as count  ' +
  ' FROM IMSdbstatus '

db.all(sql, [], (err, result) => {
  if (err) {
    return console.error(err.message)
  }
  console.log(result)

  db.close((err) => {
    if (err) {
      console.log(err)
      // reject(err)
    }
  })
})
