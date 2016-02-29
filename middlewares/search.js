var elasticsearch = require('elasticsearch'),
    postcodeUtils = require('../utils/postcodeutils')
    , os = require('ospoint'),
    config = require('../config');

var client = new elasticsearch.Client({
    host: config.elasticHost
});

exports.searchPostcode = function (postcode, cb) {

    // normalise postcode so its in the same format as elasticsearch index
    postcode = postcodeUtils.normalizePostcode(postcode);

    // geocode postcode to get full details including lat/long
    client.search({
        index: 'nhs',
        type: 'postcodes',
        body: {
            query: {
                match: {
                    postcode: postcode
                }
            }
        }
    }).then(function (resp) {
        cb(null, resp.hits.hits)
    }).catch(function (error) {
        cb(error);
    });

};

exports.searchCCGByPostcode = function (postcode, cb) {

    // search for details about postcode
    this.searchPostcode(postcode, function (err, results) {
        var result = results[0];

        // if matched a postcode, use the lat long to find CCG
        if (result) {
            var doc = result._source;
            var point = new os(doc.northing, doc.easting);
            var latlong = point.toWGS84();
            doc.latitude = Math.round(latlong.latitude * Math.pow(10, 6)) / Math.pow(10, 6);
            doc.longitude = Math.round(latlong.longitude * Math.pow(10, 6)) / Math.pow(10, 6);

            this.searchCCGByLatLng(doc, cb);
        }
        else cb("Postcode not found")
    });
};


exports.searchCCGByLatLng = function (latLng, cb) {

    client.search({
        index: 'nhs',
        type: 'ccg',
        body: {
            "query": {
                "match_all": {}
            },
            "filter": {
                "geo_shape": {
                    "location": {
                        "shape": {
                            "type": "circle",
                            "coordinates": [latlng.longitude, latlng.latitude],
                            "radius": "100m"
                        },
                        "relation": "intersects"
                    }
                }
            }
        }
    }).then(function (resp) {
        cb(null, resp.hits.hits);

    }).catch(function (error) {
        cb(error);
    });

};

