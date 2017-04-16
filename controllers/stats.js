var express = require('express')
    , router = express.Router()
    , stats = require('../middlewares/statistics'),
    areas = require('../middlewares/areas');

router.get('/cuts/:onscode', function (req, res) {

    // search cuts stats for this postcode
    stats.getCutsByONSCode(req.params["onscode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});

router.get('/cuts/:onscode/:type', function (req, res) {

    // search cuts stats for this postcode
    stats.getByONSCodeAndStatTypeName(req.params["onscode"], req.params["type"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});

router.get('/types', function (req, res) {

    // get all stat types
    stats.getStatTypes(function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});

router.get('/types/:id', function (req, res) {

    // get a stat type
    stats.getStatTypeById(req.params["id"],function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});

router.get('/:onscode', function (req, res) {

    // get all stats for this onscode
    stats.getStatsForEntity(req.params["onscode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});


module.exports = router;