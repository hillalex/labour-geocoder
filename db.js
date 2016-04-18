var pgp = require('pg-promise')(),
    config = require('./config');

var cn = {
    host: config.pgHost,
    port: 5432,
    database: config.dbName,
    user: config.pgUser,
    password: config.pgPassword
};

module.exports = pgp(cn);