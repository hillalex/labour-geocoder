var express = require('express')
    , router = express.Router()
    , cuts = require('../middlewares/localcutsPg'),
      search = require("../middlewares/searchPg");

router.get('/bestoffabsolute/:region', function (req, res) {

    // search for this postcode
    cuts.leastCutsInRegion(req.params["region"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

router.get('/nearby/:postcode', function (req, res) {

    // search for this postcode
    search.searchNearbyLaByPostcode(req.params["postcode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });

});

router.get('/bestoff/:region', function (req, res) {

    // search for this postcode
    cuts.leastPercentageCutsInRegion(req.params["region"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});

router.get('/:onscode', function (req, res) {

    // search for this postcode
   cuts.getAuthorityByONSCode(req.params["onscode"], function (err, result) {

        if (result)
            res.status(200).json(result);

        else {
            var status = err.statusCode || 500;
            res.status(status).json(err);
        }
    });
});


module.exports = router;