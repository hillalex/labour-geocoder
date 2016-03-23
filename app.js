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

var port = config.PORT || config.port;
var ip = config.IP || config.ip;

app.listen(port);

console.log("app listening on " + ip + ":" + port);