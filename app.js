var express = require('express')
    , app = express()
    , config = require('./config');

app.use(require('./controllers'));

server = require('http').createServer(app);

var port = process.env.OPENSHIFT_NODEJS_PORT || config.port;
var ip = process.env.OPENSHIFT_NODEJS_IP || config.ip;

server.listen(port, ip);