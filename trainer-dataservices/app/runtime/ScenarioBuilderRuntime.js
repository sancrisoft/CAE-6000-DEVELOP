// Run using "node app/runtime/ScenarioBuilderRuntime.js" at the root of "trainer-dataservices".

const _config = require('../config/config.js')

var scripts = {
  scenarioBuilderTablesFix: false,
  duplicateDefaultScenario: false,
  loadAcftReport: false
}

const ScenarioBuilderController = require('../controllers/ScenarioBuilderController.js')

if (scripts.scenarioBuilderTablesFix) {
  ScenarioBuilderController.refreshTables().then(function () {
    ScenarioBuilderController.removeInvalidIds()
  })
}

if (scripts.duplicateDefaultScenario) {
  ScenarioBuilderController.duplicateScenario(_config.defaultScenarioId)
}

if (scripts.loadAcftReport) {
  const xmlFile = './static/data/private/jlam/data/---------_FDEsXML_26Apr2018203847.xml'
  // const xmlFile = './static/data/private/jlam/data/---------_FaultMsgsXML_26Apr2018203922.xml'

  let xmlString = require('fs').readFileSync(xmlFile, 'utf8');

  ScenarioBuilderController.loadAircraftReport(_config.defaultScenarioId, xmlString).then((result) => {
    console.log(result)
  }, (err) => {
    console.log(err)
  })
}
