var express = require('express')
    , app = express()
    , cors = require('cors')
    , config = require('./config');

var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = config.whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    }
};

app.use(cors(corsOptions));
app.use(require('./controllers'));

server = require('http').createServer(app);

var port = config.port;
var ip = config.ip;

server.listen(port, ip);