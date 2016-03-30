var elasticsearch = require('elasticsearch'),
    postcodeUtils = require('../utils/postcodeUtils'),
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
                    postcode: postcode
                }

            }
        }
    }, function (err, resp) {
        if (resp) {

            if (!resp.hits) {
                cb("Error with ElasticSearch host");
            }

            else {
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

                else cb({statusCode: 404, message: "Postcode not found"})
            }
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
                        function_score: {
                            linear: {
                                trustlocation: {
                                    scale: "10km",
                                    origin: [result.latitude, result.longitude]
                                }
                            }
                        }
                    }
                }
            }, function (err, resp) {

                if (err)
                    cb(err);
                else {
                    if (!resp.hits) {
                        cb({statusCode: 500, message: "Error with ElasticSearch host"});
                    }
                    else if (resp.hits.hits[0])
                        cb(null, resp.hits.hits[0]._source);
                    else
                        cb({statusCode: 404, message: "No trust found within 20km of this postcode"})
                }
            });

    });
};


exports.searchLaByPostcode = function (postcode, cb) {
    // search for lat/lng of postcode
    exports.searchPostcode(postcode, function (err, latLng) {

        if (err)
            cb(err);

        else
        // now search for local authority
            client.search({
                index: 'nhs',
                type: 'localauthority',
                body: {
                    "query": {
                        "match_all": {}
                    },
                    "filter": {
                        "geo_shape": {
                            "lalocation": {
                                "shape": {
                                    "type": "point",
                                    "coordinates": [latLng.longitude, latLng.latitude]
                                },
                                "relation": "intersects"
                            }
                        }
                    }
                }
            }, function (err, resp) {

                if (err)
                    cb(err);
                else if (!resp.hits) {
                    cb({statusCode: 500, message: "Error with ElasticSearch host"});
                }
                else {

                    if (resp.hits.hits[0])
                    //cb(null, resp.hits.hits.length);
                        cb(null, resp.hits.hits[0]._source);
                    else
                        cb({statusCode: 404, message: "No local authority found for this postcode"})
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
                            "type": "point",
                            "coordinates": [latLng.latitude, latLng.longitude]
                        },
                        "relation": "intersects"
                    }
                }
            }
        }
    }, function (err, resp) {
        if (err)
            cb(err);
        else if (!resp.hits) {
            cb({statusCode: 500, message: "Error with ElasticSearch host"});
        }
        else {
            if (resp.hits.hits[0])
                cb(null, resp.hits.hits[0]._source);
            else
                cb({statusCode: 404, message: "No CCG found for this postcode"})
        }
    })

};

