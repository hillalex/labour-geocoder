var express = require('express')
    , router = express.Router()
    , logs = require('../middlewares/logs');

router.post('/signup', function(req,res){

    logs.log(req.body, function(status){

        res.sendStatus(status);

    });

});

module.exports = router;