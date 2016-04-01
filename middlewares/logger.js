var pgp = require('pg-promise')(),
    config = require('../config');

var cn = {
    host: '127.0.0.1', // server name or IP address;
    port: 5432,
    database: config.dbLogging,
    user: config.pgUser,
    password: config.pgPassword
};
var db = pgp(cn);

exports.logClick = function (url, action) {
    console.log(url, action)
    return db.query("insert into clicks (url, action, timestamp) values ($1,$2, CURRENT_TIMESTAMP)", [url, action])
};