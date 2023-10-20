//server.js
'use strict';

const env = require('./app/config/env.js');

process.env.NODE_ENV = env.environment;

const app = require('./app');

// Constants
const PORT = env.server.port;
const HOST = env.server.host;

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
