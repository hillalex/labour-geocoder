var express = require('express')
    , router = express.Router()
    , config = require('../config')
    , db = require('../db')
    , legacy = require('../middlewares/legacy')
    , logger = require('labour-logger')(db);

router.get('/search/:postcode', logger, function (req, res) {

    // search for this postcode
    legacy.searchPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

router.get('/search/localauthority/:postcode', function (req, res) {

    legacy.searchLaByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

router.get('/search/county/:postcode', function (req, res) {

    legacy.searchCountyByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

router.get('/localcuts/:onscode', function (req, res) {

    // search for this postcode
    legacy.getAuthorityByONSCode(req.params["onscode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});

router.get('/localcuts/county/:onscode', function (req, res) {

    // search for this postcode
    legacy.getCountyByONSCode(req.params["onscode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});

module.exports = router;