var db = require('../db'),
    config = require('../config'),
    postcodeUtils = require('../utils/postcodeUtils'),
    pgUtils = require('../utils/pgUtils');

exports.getPostcodeWithAreas = function (postcode, cb) {

    if (exports.tryNormalisePostcode(postcode, cb))
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

exports.getPostcode = function (postcode, cb) {

    if (exports.tryNormalisePostcode(postcode, cb))
        db.query("select postcode, latitude, longitude from postcode where postcode=$1", postcode)
            .then(function (doc) {
                if (doc[0]) {
                    cb(null, doc[0])
                }
                else cb("No postcode found");
            })
            .catch(function (err) {
                cb(err);
            });
};


exports.tryNormalisePostcode = function (postcode, cb) {

    // normalise postcode so its in the same format as database
    postcode = postcodeUtils.normalizePostcode(postcode);

    if (!postcode)
        cb("Invalid postcode");

    else
        postcode = postcode.substring(1, 8);

    return postcode;
};