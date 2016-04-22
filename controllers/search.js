var express = require('express')
    , router = express.Router()
    , config = require('../config')
    , db = require('../db')
    , logger = require('labour-logger')(db),
    postcodes = require("../middlewares/postcodes"),
    areas = require('../middlewares/areas'),
    entities = require('../middlewares/entities');

router.get('/ccg/:postcode', function (req, res) {

    // search for the CCG for this postcode
    areas.getCCGByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    }, req.query["location"]);


});

router.get('/trust/:postcode', function (req, res) {

    // search for the nearest NHS trust to this postcode
    entities.getTrustByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    }, req.query["location"]);


});

router.get('/localauthority/:postcode', function (req, res) {

    // search for this postcode
    areas.getLaByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    }, req.query["location"]);

});

router.get('/county/:postcode', function (req, res) {

    // search for this postcode
    areas.getCountyByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    }, req.query["location"]);

});

router.get('/pfa/:postcode', function (req, res) {

    // search for this postcode
    areas.getPFAByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    }, req.query["location"]);

});

router.get('/:postcode', logger, function (req, res) {

    // search for this postcode
    postcodes.getPostcodeWithAreas(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

module.exports = router;