var express = require('express')
    , router = express.Router()
    , config = require('../config')
    , db = require('../db')
    , logger = require('labour-logger')(db),
    entities = require('../middlewares/areas');

router.get('/ccg/:postcode', function (req, res) {

    // search for the CCG for this postcode
    entities.getCCGByPostcode(req.params["postcode"], function (err, result) {

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
    entities.getTrustByPostcode(req.params["postcode"], function (err, result) {

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
    entities.getLaByPostcode(req.params["postcode"], function (err, result) {

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
    entities.getCountyByPostcode(req.params["postcode"], function (err, result) {

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
    entities.getPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

module.exports = router;