function logger(options){

    var cn = {
        host: options.host,
        port: options.port,
        database: options.db,
        user: options.user,
        password: options.pw
    };

    var db = require('pg-promise')()(cn);

    return function inst(req, res, next) {

        db.query("insert into logs (url, body, timestamp) values ($1,$2, CURRENT_TIMESTAMP)", [req.originalUrl, req.body]);
        next();
    };
}

exports = module.exports = logger;