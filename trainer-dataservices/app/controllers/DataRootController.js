
const DataRootModule = require('../modules/DataRootModule.js')

const DataRootController = ({

  /**
   * method to push the payload as a stringifyed JSON
   *
   * @param req
   * @param res
   */
  load: function (req, res) {
    let param = req.query.target
    switch (param) {
      case 'loadall':
        DataRootModule.loadOMST(param).then(function (result) {
          console.log(result)
          res.json({'foo': result})
        }, function (err) {
          console.log(err)
          res.json({'foo': err})
        })
        break
      default:
        res.json({'foo': 'default'})
    }
  },

  test: function (req, res) {
    let param = req.query.target
    DataRootModule.testDB(param).then(function (result) {
      console.log(result)
      res.json({'foo': result})
    }, function (err) {
      console.log(err)
      res.json({'foo': err})
    })
  },

  getquery: function (req, res) {
    DataRootModule.getQuery().then(function (result) {
      console.log(result)
      res.json({'foo': result})
    }, function (err) {
      console.log(err)
      res.json({'foo': err})
    })
  }

})

module.exports = DataRootController
