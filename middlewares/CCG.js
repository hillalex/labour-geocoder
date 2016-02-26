module.exports = function (pool) {

    return {

        // gets all CCGs from the database
        getAllCCGs: function (cb) {
            var sql = "SELECT * FROM ccg";

            // get a connection from the pool
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.log(err);
                    cb(err);
                    return;
                }
                // make the query
                connection.query(sql, function (err, results) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        cb(err);
                        return;
                    }
                    cb(null, results);
                });
            });
        },

        // get a single CCG by its code
        getCCG: function (code, cb) {

            var sql = "SELECT * FROM ccg where CCGcode=?";

            // get a connection from the pool
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.log(err);
                    cb(err);
                    return;
                }
                // make the query
                connection.query(sql, code, function (err, results) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        cb(err);
                        return;
                    }
                    cb(null, results);
                });
            });


        },

        // get the coordinates for a particualr CCG
        getCoordinates: function (code, cb) {

            var sql = "SELECT * FROM coordinates where CCGcode=?";

            // get a connection from the pool
            pool.getConnection(function (err, connection) {
                if (err) {
                    cb(err);
                    return;
                }
                // make the query
                connection.query(sql, code, function (err, results) {
                    connection.release();
                    if (err) {
                        cb(err);
                        return;
                    }
                    cb(null, results);
                });
            });
        }
    }
}