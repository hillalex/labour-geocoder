var express = require('express')
    , router = express.Router()
    , cuts = require('../middlewares/localcuts');

router.get('/bestoffabsolute/:region', function (req, res) {

    // search for this postcode
    cuts.leastCutsInRegion(req.params["region"], function (err, result) {

        if (result)
            res.json(result);

        else res.json(err);
    });

});

router.get('/bestoff/:region', function(req, res){

    // search for this postcode
    cuts.leastPercentageCutsInRegion(req.params["region"], function (err, result) {

        if (result)
            res.json(result);

        else res.json(err);
    });
});

module.exports = router;