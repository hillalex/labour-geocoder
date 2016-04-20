var express = require('express')
    , router = express.Router()
    , candidates = require('../middlewares/candidates'),
    areas = require('../middlewares/areas');

router.get('/pcc/:postcode', function (req, res) {

    areas.getPFAByPostcode(req.params["postcode"], function (err, result) {

        if (result) {
            candidates.getCandidate(result.onscode, '2016', function (err, result) {

                if (result)
                    res.status(200).json(result);

                else {
                    var status = err.statusCode || 500;
                    res.status(status).json(err);
                }
            });
        }

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });


});

module.exports = router;