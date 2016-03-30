var pgp = require('pg-promise')(),
    postcodeUtils = require('../utils/postcodeUtils'),
    os = require("ospoint");

var cn = {
    host: '127.0.0.1', // server name or IP address;
    port: 5432,
    database: 'uk_cuts',
    user: 'postgres',
    password: 'postgres'
};

var db = pgp(cn);

exports.searchPostcode = function (postcode, cb) {

    // normalise postcode so its in the same format as database
    postcode = postcodeUtils.normalizePostcode(postcode).substring(1, 8);

    // look up in db
    db.one("select * from postcode where postcode=$1", postcode)
        .then(function (doc) {
            var point = new os(doc.northing, doc.easting);
            var latlong = point.toWGS84();
            doc.latitude = Math.round(latlong.latitude * Math.pow(10, 6)) / Math.pow(10, 6);
            doc.longitude = Math.round(latlong.longitude * Math.pow(10, 6)) / Math.pow(10, 6);
            cb(null, doc);
        })
        .catch(function (err) {
            cb(err);
        });
};

exports.searchLaByPostcode = function (postcode, cb) {
    // search for lat/lng of postcode
    exports.searchPostcode(postcode, function (err, latLng) {

        if (err)
            cb(err);

        else
        // now search for local authority
            db.one("SELECT name, onscode, region, totalcuts, percentagecuts, ST_AsGeoJSON(location)"
                    + " as lalocation from localauthority WHERE ST_contains(location,  ST_GeomFromText('POINT($1 $2)', 4326))",
                [latLng.longitude, latLng.latitude])
                .then(function (resp) {
                    cb(null, resp);

                }).catch(function (err) {
                cb(err);
            });

    });
};

exports.searchNearbyLaByPostcode = function (postcode, cb) {
    // search for lat/lng of postcode
    exports.searchPostcode(postcode, function (err, latLng) {

        if (err)
            cb(err);

        else {
            var sql =
                "SELECT name, onscode, region, totalcuts, percentagecuts " +
                "FROM localauthority where totalcuts < 0" +
                "ORDER BY ST_Distance(location, ST_GeomFromText('POINT($1 $2)', 4326)) LIMIT 5;";
            // now search for local authority
            db.many(sql, [latLng.longitude, latLng.latitude])
                .then(function (resp) {
                    cb(null, resp);

                }).catch(function (err) {
                cb(err);
            });
        }

    });

};