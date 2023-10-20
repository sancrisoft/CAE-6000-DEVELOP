const cipherKey = 'omsstuff';
const path = require('path');
const config = require('../config/config');
const sqlite3 = require('@journeyapps/sqlcipher').verbose();

const dbFile = path.join(__dirname, "../../" + config.privateDataPath + '/' + config.dataFileName);

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		console.log(err)
		reject(err)
	}
});

db.run(`PRAGMA KEY = '${cipherKey}'`);

// [`exit`, `SIGINT`, `SIGTERM`].forEach((eventType) => {
// 	process.on(eventType, () => {
// 		db.close((err) => {
// 		  if (err) {
// 		    console.log(err)
// 		  }
// 		})
// 	});
// })

module.exports = db;