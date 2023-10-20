const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
// Authentication module.
const auth = require('http-auth')
const basic = auth.basic({
  realm: "Dev Area.",
  file: __dirname + "/.htpasswd"
})

app.use(auth.connect(basic))
app.use(express.static(__dirname + '/web'))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/web/index.html'))
});

app.listen(8080);
