var express = require('express'),
    requestify = require('requestify')
    , Curl = require('node-libcurl').Curl
    , router = express.Router();

router.post('/:url', function (req, res) {

    var data = [];
     Object.keys(req.body).forEach(function(key){
        data.push({ name: key, contents: req.body[key], type: 'text/html'});
    });

    var curl = new Curl();

    curl.setOpt( 'URL', 'http://www.labour.org.uk/page/sapi/' + req.params['url'] );
    curl.setOpt( 'HTTPPOST', data);

    curl.on( 'end', function( statusCode, body, headers ) {

        res.status(statusCode).end();
        this.close();
    } );
    curl.on( 'error', function( statusCode, body, headers ) {

        res.status(statusCode).end();

        this.close();
    } );

    curl.perform();
});

module.exports = router;