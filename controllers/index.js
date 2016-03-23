var express = require('express')
    , router = express.Router();

router.use('/search', require('./search'));
router.use('/localcuts', require('./localcuts'));
module.exports = router;