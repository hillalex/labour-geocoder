var expect = require("chai").expect;
var mockrequire = require('mockrequire');

var testError = "Random error";
var singleResult = {"postcode": "\"AB565YJ\"", "easting": "349451", "northing": "861557"};
var multiResult = [{"_source": singleResult}];

// set up mock elasticsearch to return an error when postcodes are searched
var erroringsearch = mockrequire("../../middlewares/search", {
    '../config': {elasticHost: "whatever"},
    'elasticsearch': {
        Client: function () {
            return {
                search: function (opts, cb) {
                    if (opts.type == "postcode")
                    cb(testError)
                }
            }
        }
    }
});

describe("Search with postcode error", function () {
    describe("#searchPostcode()", function () {
        it("should call callback with error", function () {

            erroringsearch.searchPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal(testError);

            });

        });

    });

    describe("#searchCCGByPostcode()", function () {
        it("should call callback with error", function () {

            erroringsearch.searchCCGByPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal(testError);

            });

        });

    });

    describe("#searchTrustByPostcode()", function () {
        it("should call callback with error", function () {

            erroringsearch.searchTrustByPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal(testError);

            });

        });

    });

});

// set up mock elasticsearch to return an error for ccg search and trust search
var erroringobjectsearch = mockrequire("../../middlewares/search", {
    '../config': {elasticHost: "whatever"},
    'elasticsearch': {
        Client: function () {
            return {
                search: function (opts, cb) {
                    if (opts.type== "postcode")
                    cb(null, {hits: {hits: multiResult}});

                    else if (opts.type=="ccg")
                    cb("CCG error")

                    else
                    cb("Trust error")
                }
            }
        }
    }
});

describe("Search with postcode error", function () {


    describe("#searchCCGByPostcode()", function () {
        it("should call callback with error", function () {

            erroringobjectsearch.searchCCGByPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal("CCG error");

            });

        });

    });

    describe("#searchTrustByPostcode()", function () {
        it("should call callback with error", function () {

            erroringobjectsearch.searchTrustByPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal("Trust error");

            });

        });

    });

});

// set up mock elasticsearch to return results
var resultsearch = mockrequire("../../middlewares/search", {
    '../config': {elasticHost: "whatever"},
    'elasticsearch': {
        Client: function () {
            return {
                search: function (opts, cb) {
                    cb(null, {hits: {hits: multiResult}})
                }
            }
        }
    }
});


describe("Search with results", function () {
    describe("#searchPostcode()", function () {
        it("should call callback with result", function () {

            resultsearch.searchPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal(null);
                expect(resp).to.equal(singleResult);
            });

        });

    });

    describe("#searchCCGByPostcode()", function () {
        it("should call callback with result", function () {

            resultsearch.searchCCGByPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal(null);
                expect(resp).to.equal(singleResult);
            });

        });

    });

    describe("#searchTrustByPostcode()", function () {
        it("should call callback with result", function () {

            resultsearch.searchTrustByPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal(null);
                expect(resp).to.equal(singleResult);
            });

        });

    });

});

// set up mock elasticsearch to return no postcode results
var nopostcodesearch = mockrequire("../../middlewares/search", {
    '../config': {elasticHost: "whatever"},
    'elasticsearch': {
        Client: function () {
            return {
                search: function (opts, cb) {
                    if (opts.type == "postcode")
                        cb(null, {hits: {hits: []}})
                }
            }
        }
    }
});


describe("Search with no postcode results", function () {
    describe("#searchPostcode()", function () {
        it("should call callback with result", function () {

            nopostcodesearch.searchPostcode("sw85pz", function (err, resp) {

                expect(err).to.equal("Postcode not found");

            });

        });

    });

    describe("#searchCCGByPostcode()", function () {
        it("should call callback with result", function () {

            nopostcodesearch.searchCCGByPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal("Postcode not found")
            });

        });

    });

    describe("#searchTrustByPostcode()", function () {
        it("should call callback with result", function () {

            nopostcodesearch.searchTrustByPostcode("sw85pz", function (err, resp) {
                expect(err).to.equal("Postcode not found");

            });

        });

    });

});

// set up mock elasticsearch to return no ccg results
var noccgsearch = mockrequire("../../middlewares/search", {
    '../config': {elasticHost: "whatever"},
    'elasticsearch': {
        Client: function () {
            return {
                search: function (opts, cb) {
                    if (opts.type == "postcode")
                        cb(null, {hits: {hits: multiResult}});
                    if (opts.type == "ccg")
                        cb(null, {hits: {hits: []}})

                }
            }
        }
    }
});


describe("Search with no CCG result", function () {

    describe("#searchCCGByPostcode()", function () {
        it("should call callback with result", function () {

            noccgsearch.searchCCGByPostcode("sw85pz", function (err, resp) {

                expect(err).to.equal("No CCG found for this postcode")
            });

        });

    });

});

// set up mock elasticsearch to return no trust results
var notrustsearch = mockrequire("../../middlewares/search", {
    '../config': {elasticHost: "whatever"},
    'elasticsearch': {
        Client: function () {
            return {
                search: function (opts, cb) {
                    if (opts.type == "postcode")
                        cb(null, {hits: {hits: multiResult}});
                    if (opts.type == "ccg")
                        cb(null, {hits: {hits: []}})

                }
            }
        }
    }
});


describe("Search with no Trust result", function () {

    describe("#searchCCGByPostcode()", function () {
        it("should call callback with result", function () {

            notrustsearch.searchTrustByPostcode("sw85pz", function (err, resp) {

                expect(err).to.equal("No trust found within 20km of this postcode")
            });

        });

    });

});