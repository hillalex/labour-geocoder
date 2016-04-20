var db = require('../db'),
    config = require('../config'),
    postcodes = require("./postcodes"),
    postcodeUtils = require('../utils/postcodeUtils'),
    pgUtils = require('../utils/pgUtils');

exports.getTrustByPostcode = function (postcode, cb, includeLocation) {
    // search for lat/lng of postcode
    postcodes.getPostcode(postcode, function (err, latLng) {

        if (err)
            cb(err);

        else
        // now search for local authority
            db.query(pgUtils.geocodeEntitySqlString("trust", includeLocation),
                [pgUtils.geom(latLng)])
                .then(function (resp) {
                    if (resp[0])
                        cb(null, resp[0]);

                    else cb("No trust found for this postcode");

                }).catch(function (err) {
                cb(err);
            });

    });
};