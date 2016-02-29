var express = require('express')
    , router = express.Router()
    , search = require('../middlewares/search');

router.get('/:postcode', function (req, res) {

    // search for the CCG for this postcode
    search. searchCCGByPostcode(req.params["postcode"], function (err, results) {

        if (results)
            res.json(results);

        else res.json(err);
    });


});

module.exports = router;