var mysql = require('mysql')
    ,config = require('./config');

exports.pool = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPw,
    database: config.dbName,
    connectionLimit: 10,
    supportBigNumbers: true
});