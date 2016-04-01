var express = require('express')
    , logger = require('../middlewares/logger')
    , router = express.Router();

router.use('/search', require('./search'));
router.use('/localcuts', require('./localcuts'));

// log a url and an action for analytics
router.post('/log', function (req, res) {

    logger.logClick(req.body["url"], req.body["action"], req.body["location"])
        .then(function (r) {
            res.status(200).end();
        })
        .catch(function (e) {
            res.status(500).end();
        })

});

module.exports = router;