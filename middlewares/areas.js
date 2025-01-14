var db = require('../db'),
    config = require('../config'),
    postcodes = require("./postcodes"),
    postcodeUtils = require('../utils/postcodeUtils'),
    pgUtils = require('../utils/pgUtils');

exports.getPostcode = function (postcode, cb) {

    postcode = postcodes.tryNormalisePostcode(postcode, cb);
    if (postcode)
    db.query("select p.latitude, p.longitude, a.onscode, at.areaTypeName " +
            "from postcode p" +
            " left join areasForPostcodes ap on ap.postcode = p.postcode" +
            " left join area a on a.onscode = ap.onscode" +
            " left join areaType at on a.areaTypeId = at.areaTypeId" +
            " where p.postcode=$1", postcode)
        .then(function (resp) {

            if (resp[0]) {
                var result = {};
                result.postcode = postcode;
                result.latitude = resp[0].latitude;
                result.longitude = resp[0].longitude;
                result.areas = {};
                for (var i = 0; i < resp.length; i++) {
                    if (resp[i]['areatypename'] != null)
                        result.areas[resp[i]['areatypename']] = resp[i]['onscode'];
                }
                cb(null, result);
            }

            else cb("No postcode found");
        })
        .catch(function (err) {
            cb(err);
        });
};

exports.getCCGByPostcode = function (postcode, cb, includeLocation) {

    postcode = postcodes.tryNormalisePostcode(postcode, cb);
    if (postcode)
    db.query(pgUtils.selectAreaSqlString("ccg", includeLocation),
        [postcode])
        .then(function (resp) {
            if (resp[0])
                cb(null, resp[0]);
            else cb("No CCG found for this postcode");
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.getPFAByPostcode = function (postcode, cb, includeLocation) {

    postcode = postcodes.tryNormalisePostcode(postcode, cb);
    if (postcode)
    db.query(pgUtils.selectAreaSqlString("pfa", includeLocation),
        [postcode])
        .then(function (resp) {
            if (resp[0])
                cb(null, resp[0]);
            else cb("No PFA found for this postcode");
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.getLaByPostcode = function (postcode, cb, includeLocation) {

    postcode = postcodes.tryNormalisePostcode(postcode, cb);
    if (postcode)
    db.query(pgUtils.selectAreaSqlString('localauthority', includeLocation),
        [postcode])
        .then(function (resp) {
            if (resp[0])
                cb(null, resp[0]);
            else cb("No local authority found for this postcode");
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.getNearbyLocalAuthoritiesByPostcode = function (postcode, cb) {

    postcode = postcodes.tryNormalisePostcode(postcode, cb);
    if (postcode)
        db.query(pgUtils.geocodeNearbyAreasSqlString('localauthority'),
            [postcode])
            .then(function (resp) {
                if (resp.length > 0)
                    cb(null, resp);
                else cb("No local authority found for this postcode");
            })
            .catch(function (err) {
                cb(err);
            });

};

exports.getCountyByPostcode = function (postcode, cb, includeLocation) {

    postcode = postcodes.tryNormalisePostcode(postcode, cb);
    if (postcode)
    db.query(pgUtils.selectAreaSqlString('county', includeLocation),
        [postcode])
        .then(function (resp) {
            if (resp[0])
                cb(null, resp[0]);

            else cb("No county found for this postcode");

        }).catch(function (err) {
        cb(err);
    });

};