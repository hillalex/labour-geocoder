var config = require("../config"),
    pgUtils = require("../utils/pgUtils"),
    db = require('../db');

exports.getStatForEntity = function (statType, code, cb) {

    db.query("SELECT * from statistics where onscode=$1",
        [code])
        .then(function (resp) {
                cb(null, resp);
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.getCutsByONSCode = function (code, cb) {

    db.query("SELECT s.value, st.statTypeName from statistics s" +
        " join statType st on s.statTypeId = st.statTypeId" +
        " where s.onscode=$1" +
        " and s.statTypeId in "
            + "(select statTypeId from statType where statTypeName in ('totalcuts', 'percentagecuts', 'perhouseholdcuts'))",
        [code])
        .then(function (resp) {
                cb(null, resp);
        })
        .catch(function (err) {
            cb(err);
        });

};