var express = require('express')
    , router = express.Router()
    , stats = require('../middlewares/statistics'),
    entities = require('../middlewares/areas');

router.get('/cuts/:onscode', function (req, res) {

    // search cuts stats for this postcode
    stats.getCutsByONSCode (req.params["onscode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});

module.exports = router;