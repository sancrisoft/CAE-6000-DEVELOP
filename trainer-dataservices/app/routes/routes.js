const express = require('express')
const router = express.Router()

const env = require('../config/env.js');

const Authentication = require('../modules/Authentication')
const TargetDispatchController = require('../controllers/TargetDispatchController')
const DataRootController = require('../controllers/DataRootController')

function corsHeader (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
}
router.use(corsHeader);
router.options('/*', corsHeader, function (req, res, next) {
  // Add extra allowed headers for JWT.
  res.header('Access-Control-Allow-Headers', res.get('Access-Control-Allow-Headers') + ', ' + env.jwt.headers.token + ', ' + env.jwt.headers.consumer);
  res.sendStatus(200);
});

router.all('/api', Authentication.JWTVerifier, TargetDispatchController.send)

// Add non-production (debugging) routes.
if (process.env.NODE_ENV !== 'production') {
  router.get('/dataroot', DataRootController.load)
  router.get('/drtest', DataRootController.test)
  router.get('/getquery', DataRootController.getquery)
}

router.all('/*', (req, res) => {
  res.sendStatus(405)
})

module.exports = router
