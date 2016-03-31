var config = require("../config"),
    pgp = require('pg-promise')();

var cn = {
    host: '127.0.0.1', // server name or IP address;
    port: 5432,
    database: config.dbName,
    user: config.pgUser,
    password: config.pgPassword
};

var db = pgp(cn);

exports.leastCutsInRegion = function (region, cb) {

    // now search for local authority
    db.query("select * from get_bestoff_absolute($1, 'regioncursor'); fetch 1 from regioncursor;", region)
        .then(function (resp) {
            cb(null, resp[1]);

        }).catch(function (err) {
        cb(err);
    });

};

exports.leastPercentageCutsInRegion = function (region, cb) {

    // now search for local authority
    db.query("select * from get_bestoff($1, 'regioncursor'); fetch 1 from regioncursor;", region)
        .then(function (resp) {
            cb(null, resp[1]);

        }).catch(function (err) {
        cb(err);
    });

};

exports.getAuthorityByONSCode = function (code, cb) {

    // now search for local authority
    db.query("select * from localauthority where onscode=$1", code)
        .then(function (resp) {

            cb(null, resp[0]);

        }).catch(function (err) {
        cb(err);
    });

};

exports.getCountyByONSCode = function (code, cb) {

    // now search for local authority
    db.query("select * from county where onscode=$1", code)
        .then(function (resp) {

            cb(null, resp[0]);

        }).catch(function (err) {
        cb(err);
    });

};