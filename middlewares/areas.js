var db = require('../db'),
    config = require('../config'),
    postcodeUtils = require('../utils/postcodeUtils'),
    pgUtils = require('../utils/pgUtils');

exports.getPostcode = function (postcode, cb) {

    // normalise postcode so its in the same format as database
    postcode = postcodeUtils.normalizePostcode(postcode).substring(1, 8);

    // look up in db
    db.one("select postcode, latitude, longitude from postcode where postcode=$1", postcode)
        .then(function (doc) {
            cb(null, doc);
        })
        .catch(function (err) {
            cb(err);
        });
};

exports.getCCGByPostcode = function (postcode, cb, includeLocation) {
    // search for details about postcode
    exports.getPostcode(postcode, function (err, latLng) {

        if (err)
            cb(err);

        else
        // now search for ccg
            db.query(pgUtils.selectAreaSqlString("ccg", includeLocation),
                [pgUtils.geom(latLng)])
                .then(function (resp) {
                    if (resp[0])
                        cb(null, resp[0]);
                    else cb("No CCG found for this postcode");
                })
                .catch(function (err) {
                    cb(err);
                });

    });
};

exports.getLaByPostcode = function (postcode, cb, includeLocation) {
    // search for lat/lng of postcode
    exports.getPostcode(postcode, function (err, latLng) {

        if (err)
            cb(err);

        // now search for local authority
        db.query(pgUtils.selectAreaSqlString('localauthority', includeLocation),
            [pgUtils.geom(latLng)])
            .then(function (resp) {
                if (resp[0])
                    cb(null, resp[0]);
                else cb("No local authority found for this postcode");
            })
            .catch(function (err) {
                cb(err);
            });

    });
};

exports.getCountyByPostcode = function (postcode, cb, includeLocation) {
    // search for lat/lng of postcode
    exports.getPostcode(postcode, function (err, latLng) {

        if (err)
            cb(err);

        else
        // now search for local authority
            db.query(pgUtils.selectAreaSqlString('county', includeLocation),
                [pgUtils.geom(latLng)])
                .then(function (resp) {
                    if (resp[0])
                        cb(null, resp[0]);

                    else cb("No county found for this postcode");

                }).catch(function (err) {
                cb(err);
            });

    });
};