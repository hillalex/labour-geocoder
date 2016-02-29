var express = require('express')
    , router = express.Router();

router.use('/CCG', require('./CCG'));
router.use('/search', require('./search'));
module.exports = router;