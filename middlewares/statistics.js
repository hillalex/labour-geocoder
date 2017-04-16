var config = require("../config"),
    pgUtils = require("../utils/pgUtils"),
    db = require('../db');

exports.getStatsForEntity = function (code, cb) {

    var onscode = pgUtils.normaliseONSCode(code);
    db.query("SELECT s.value, s.date, t.stattypeid,t.stattypename from statistics s" +
            " join stattype t on t.stattypeid = s.stattypeid " +
            " where s.onscode=$1",
        [onscode])
        .then(function (resp) {
            var result = {};

            for (var i = 0; i < resp.length; i++) {
                result[resp[i]['stattypeid']] = resp[i];
            }

            cb(null, result);
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.getStatTypes = function (cb) {

    db.query("SELECT * from stattype")
        .then(function (resp) {
            cb(null, resp);
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.getStatTypeById = function (id, cb) {

    db.query("SELECT * from stattype where stattypeid = $1", [id])
        .then(function (resp) {
            cb(null, resp);
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.getCutsByONSCode = function (code, cb) {

    var onscode = pgUtils.normaliseONSCode(code);
    db.query("SELECT s.value, st.statTypeName from statistics s" +
            " join statType st on s.statTypeId = st.statTypeId" +
            " where s.onscode=$1" +
            " and s.statTypeId in "
            + "(select statTypeId from statType where statTypeName in ('totalcuts', 'percentagecuts', 'perhouseholdcuts'))",
        [onscode])
        .then(function (resp) {
            cb(null, resp);
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.getByONSCodeAndStatTypeName = function (code, name, cb) {

    var onscode = pgUtils.normaliseONSCode(code);
    db.query("SELECT s.value, st.statTypeName from statistics s" +
        " join statType st on s.statTypeId = st.statTypeId" +
        " where s.onscode=$1" +
        " and st.statTypeName=$2",
        [onscode, name])
        .then(function (resp) {
            cb(null, resp);
        })
        .catch(function (err) {
            cb(err);
        });

};