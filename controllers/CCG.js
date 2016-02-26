var express = require('express')
    , router = express.Router()
    , db = require('../db')
    , CCG = require('../middlewares/CCG')(db.pool);

console.log(require('../middlewares/CCG')(db.pool));
router.get('/', function (req, res) {

    CCG.getAllCCGs(function(e, results){
        if (e)
        {
            res.json({
                error: true,
                message: "Retrieving CCG data failed"
            });

        }
        else{
            res.json(results);
        }
    });
});

router.get('/:code', function (req, res) {

    CCG.getCCG(req.params['code'], function(e, results){
        if (e)
        {
            res.json({
                error: true,
                message: "Retrieving CCG data failed"
            });

        }
        else{
            res.json(results);
        }
    });
});

router.get('/coordinates/:code', function (req, res) {

    CCG.getCoordinates(req.params['code'], function(e, results){
        if (e)
        {
            res.json({
                error: true,
                message: "Retrieving CCG data failed"
            });

        }
        else{
            res.json(results);
        }
    });
});

module.exports = router;