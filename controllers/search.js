var express = require('express')
    , router = express.Router()
    , config = require('../config')
    , logger = require('../middlewares/logger')({
        host: '127.0.0.1',
        port: '5432',
        db: config.dbLogging,
        user: config.pgUser,
        pw: config.pgPassword
    }),
    search = require('../middlewares/searchPg');

router.get('/ccg/:postcode', function (req, res) {

    // search for the CCG for this postcode
    search.searchCCGByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });


});

router.get('/trust/:postcode', function (req, res) {

    // search for the nearest NHS trust to this postcode
    search.searchTrustByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });


});

router.get('/localauthority/:postcode', function (req, res) {

    // search for this postcode
    search.searchLaByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

router.get('/county/:postcode', function (req, res) {

    // search for this postcode
    search.searchCountyByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

router.get('/region/:name', function (req, res) {

    // search for this postcode
    search.searchRegionByName(req.params["name"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

router.get('/:postcode', logger, function (req, res) {

    // search for this postcode
    search.searchPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

module.exports = router;