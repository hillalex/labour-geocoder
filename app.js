var express = require('express')
    , app = express()
    , cors = require('cors')
    , config = require('./config');

var corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = config.whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    }
};

app.use(cors(corsOptions));
app.use(require('./controllers'));

server = require('http').createServer(app);

var port = config.port || config.PORT;
var ip = config.ip || config.IP;

server.listen(port, ip);

console.log("app listening on " + ip + ":" + port);