var express = require('express')
    , router = express.Router();

router.use('/search', require('./search'));
router.use('/stats', require('./stats'));
router.use('/logs', require('./logs'));
router.use('/candidates', require('./candidates'));
router.use('/v1', require('./legacy'));

module.exports = router;