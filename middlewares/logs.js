var loggingdb = require('../loggingdb');

exports.log = function (body, cb) {

    loggingdb.query("insert into signups (form, name, email, postcode) " +
        "values (${form}, ${name},${email},${postcode});",
        body)
        .then(function () {
            loggingdb.query("select * from signups where form = ${form} and email = ${email}",
                body)
                .then(function(resp){
                   // more than one entry so pass back conflict
                    if (resp.length > 1)
                    cb(409);

                    // fine, return 200
                    else {
                        cb(200);}

                })
                .catch(function(e){
                    cb(500);
                });

        })
        .catch(function (e) {
            cb(500);
        });
};