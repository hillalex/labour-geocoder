var elasticsearch = require('elasticsearch'),
    postcodeUtils = require('../utils/postcodeutils'),
    os = require('ospoint'),
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
        type: 'postcode',
        body: {
            query: {
                term: {
                    code: postcode
                }

            }
        }
    }, function (err, resp) {
        if (resp) {

            var result = resp.hits.hits[0];

            // if matched a postcode, use the lat long to find CCG
            if (result) {
                var doc = result._source;
                var point = new os(doc.northing, doc.easting);
                var latlong = point.toWGS84();
                doc.latitude = Math.round(latlong.latitude * Math.pow(10, 6)) / Math.pow(10, 6);
                doc.longitude = Math.round(latlong.longitude * Math.pow(10, 6)) / Math.pow(10, 6);

                cb(null, doc)
            }

            else cb("Postcode not found")
        }
        else cb(err);

    });

};

exports.searchCCGByPostcode = function (postcode, cb) {
    // search for details about postcode
    exports.searchPostcode(postcode, function (err, result) {

        if (err)
        cb(err);

        else
        exports.searchCCGByLatLng(result, cb);

    });
};


exports.searchTrustByPostcode = function (postcode, cb) {
    // search for lat/lng of postcode
    exports.searchPostcode(postcode, function (err, result) {

        if (err)
        cb(err);

        else
        // now search for trusts nearby
        client.search({
            index: 'nhs',
            type: 'trust',
            body: {
                query: {
                    filtered: {
                        query: {
                            match_all: {}
                        },
                        filter: {
                            geo_distance: {
                                distance: "20km",
                                trustlocation: [result.latitude, result.longitude]
                            }
                        }
                    }
                }
            }
        }, function (err, resp) {

            if (err)
                cb(err);
            else {
                if (resp.hits.hits[0])
                    cb(null, resp.hits.hits[0]._source);
                else
                    cb("No trust found within 20km of this postcode")
            }
        });

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
                    "ccglocation": {
                        "shape": {
                            "type": "circle",
                            "coordinates": [latLng.latitude, latLng.longitude],
                            "radius": "100m"
                        },
                        "relation": "intersects"
                    }
                }
            }
        }
    }, function (err, resp) {
        if (err)
            cb(err);
        else {
            if (resp.hits.hits[0])
                cb(null, resp.hits.hits[0]._source);
            else
                cb("No CCG found for this postcode")
        }
    })

};

