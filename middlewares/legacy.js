/**
 * these are all deprecated methods - included for backwards compatability
 */

var config = require('../config'),
    postcodeUtils = require('../utils/postcodeUtils'),
    postcodes = require('./postcodes'),
    db = require('../db');

exports.searchPostcode = function (postcode, cb) {

    if (postcodes.tryNormalisePostcode(postcode, cb))
    db.one("select latitude,longitude,postcode from postcode where postcode=$1", postcode)
        .then(function (doc) {
            doc.latitude = parseFloat(doc.latitude);
            doc.longitude = parseFloat(doc.longitude);
            cb(null, doc);
        })
        .catch(function (err) {
            cb(err);
        });
};

exports.searchLaByPostcode = function (postcode, cb) {

    if (postcodes.tryNormalisePostcode(postcode, cb))
    db.query("SELECT a.name, a.onscode," +
            " s.value, st.statTypeName," +
            " ST_AsGeoJSON(a.location)"
            + " as lalocation from area a" +
            " inner join areasforPostcodes ap" +
            " on ap.onscode = a.onscode " +
            " inner join statistics s " +
            " on s.onscode = ap.onscode" +
            " inner join statType st " +
            " on st.statTypeId = s.statTypeId" +
            " where ap.postcode = $1 " +
            "and a.areaTypeId = (select areaTypeId from areaType where areaTypename = 'localauthority')",
        [postcode])
        .then(function (resp) {
            if (resp[0]) {
                var result = makeResponse(resp, "lalocation");
                cb(null, result);
            }
            else cb("No local authority found for this postcode");
        })
        .catch(function (err) {
            cb(err);
        });

};

exports.searchCountyByPostcode = function (postcode, cb) {

    if (postcodes.tryNormalisePostcode(postcode, cb))
        db.query("SELECT a.name, a.onscode," +
            " s.value, st.statTypeName," +
            " ST_AsGeoJSON(a.location)"
            + " as countylocation from area a" +
            " inner join areasforPostcodes ap" +
            " on ap.onscode = a.onscode " +
            " inner join statistics s " +
            " on s.onscode = ap.onscode" +
            " inner join statType st " +
            " on st.statTypeId = s.statTypeId" +
            " where ap.postcode = $1 " +
            "and a.areaTypeId = (select areaTypeId from areaType where areaTypename = 'county')",
        [postcode])
        .then(function (resp) {
            if (resp[0]) {
                var result = makeResponse(resp, "countylocation");
                cb(null, result);
            }
            else cb("No county found for this postcode");
        })
        .catch(function (err) {
            cb(err);
        });

};

function makeResponse(resp, locationType){
    var result = {};
    result.name = resp[0].name;
    result.onscode = resp[0].onscode;
    result[locationType] = resp[0][locationType];

    for (var i = 0; i < resp.length; i++) {
        result[resp[i]['stattypename']] = resp[i]['value'];
    }

    return result;
}


exports.getAuthorityByONSCode = function (code, cb) {

    db.query("SELECT a.name, a.onscode," +
    " s.value, st.statTypeName," +
    " ST_AsGeoJSON(a.location)"
    + " as lalocation from area a" +
    " inner join statistics s " +
    " on s.onscode = a.onscode" +
    " inner join statType st " +
    " on st.statTypeId = s.statTypeId" +
    " where a.onscode = $1 " +
    "and a.areaTypeId = (select areaTypeId from areaType where areaTypename = 'localauthority')",code)
        .then(function (resp) {
            if (resp[0]) {
                var result = makeResponse(resp, "lalocation");
                cb(null, result);
            }
            else cb("No local authority found for this onscode");

        }).catch(function (err) {
        cb(err);
    });

};

exports.getCountyByONSCode = function (code, cb) {

    db.query(" s.value, st.statTypeName," +
    " ST_AsGeoJSON(a.location)"
    + " as countylocation from area a" +
    " inner join statistics s " +
    " on s.onscode = a.onscode" +
    " inner join statType st " +
    " on st.statTypeId = s.statTypeId" +
    " where a.onscode = $1 " +
    "and a.areaTypeId = (select areaTypeId from areaType where areaTypename = 'county')",
        [code])
    .then(function (resp) {
        if (resp[0]) {
            var result = makeResponse(resp, "countylocation");
            cb(null, result);
        }
        else cb("No county found for this onscode");
    })
        .catch(function (err) {
            cb(err);
        });
};
