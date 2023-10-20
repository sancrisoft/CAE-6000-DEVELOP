//app.js
'use strict';
const routes = require('./app/routes/routes.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// post body parser
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(bodyParser.json());


app.use('/', routes);

app.get('/', (req, res) => {
  res.send(`I am the g6000 OMS/IMS DataServices and I am running. Welcome!`);
});

module.exports = app;
