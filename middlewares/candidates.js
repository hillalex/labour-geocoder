var db = require('../db'),
    config = require('../config');

exports.getCandidate = function (onscode, year, cb) {

    // look up in db
    db.query("select * from candidate where area=$1 " +
        " and date_part('year',date)=$2", [onscode, year])
        .then(function (doc) {
            cb(null, doc);
        })
        .catch(function (err) {
            cb(err);
        });
};