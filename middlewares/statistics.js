var config = require("../config"),
    pgUtils = require("../utils/pgUtils"),
    db = require('../db');

exports.getStatForEntity = function (statType, code, cb) {

    db.query("SELECT * from statistics where onscode=$1",
        [code])
        .then(function (resp) {
            if (resp[0])
                cb(null, resp[0]);
            else cb("No statistics found.");
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.getCutsByONSCode = function (code, cb) {

    db.query("SELECT * from statistics where onscode=$1 and statTypeId="
            + "(select statTypeId from statType where statTypeName in ('totalcuts', 'percentagecuts', 'perhouseholdcuts')",
        [code])
        .then(function (resp) {
            if (resp[0])
                cb(null, resp[0]);
            else cb("No statistics found.");
        })
        .catch(function (err) {
            cb(err);
        });

};