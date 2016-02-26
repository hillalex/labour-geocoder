var express = require('express')
    , router = express.Router();

router.use('/CCG', require('./CCG'));


module.exports = router;