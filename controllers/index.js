var express = require('express')
    , router = express.Router();

router.use('/search', require('./search'));
router.use('/stats', require('./stats'));

module.exports = router;