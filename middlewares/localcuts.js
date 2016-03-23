var elasticsearch = require('elasticsearch'),
    config = require('../config');

var client = new elasticsearch.Client({
    host: config.elasticHost
});

exports.leastCutsInRegion = function (region, cb) {

    client.search({
        index: 'nhs',
        type: 'localauthority',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                region: region
                            }
                        },
                        {
                            function_score: {

                                linear: {
                                    totalcuts: {
                                        origin: 0,
                                        scale: 1
                                    }

                                },
                                score_mode: "max"
                            }
                        }
                    ]
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
                cb("No local authority found for this region")
        }
    })

};

exports.leastPercentageCutsInRegion = function (region, cb) {

    client.search({
        index: 'nhs',
        type: 'localauthority',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                region: region
                            }
                        },
                        {
                            function_score: {

                                linear: {
                                    percentagecuts: {
                                        origin: 0,
                                        scale: 1
                                    }

                                },
                                score_mode: "min"
                            }
                        }
                    ]
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
                cb("No local authority found for this region")
        }
    })

};