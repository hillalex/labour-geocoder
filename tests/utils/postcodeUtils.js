var expect = require("chai").expect;
var assert = require('chai').assert;

var postcodeUtils = require("../../utils/postcodeUtils");

describe("PostcodeUtils", function () {
    describe("#normalizePostcode()", function () {
        it("should return false for invalid postcode length", function () {

            var result = postcodeUtils.normalizePostcode("sw88885pz")
            assert.isFalse(result);

            result = postcodeUtils.normalizePostcode("123");
            assert.isFalse(result);
        });

        it("should add a space to a 6 digit postcode", function () {

            var result = postcodeUtils.normalizePostcode("sw85pz");
           expect(result).to.equal("sw8 5pz");
        });

        it("should add 2 spaces to a 5 digit postcode", function () {

            var result = postcodeUtils.normalizePostcode("n15pz");
            expect(result).to.equal("n1  5pz");
        });

        it("should return 7 digit postcodes", function () {

            var result = postcodeUtils.normalizePostcode("sw135pz");
            expect(result).to.equal("sw135pz");
        });

        it("should handle postcodes with spaces in them", function () {

            var result = postcodeUtils.normalizePostcode("sw8 5pz");
            expect(result).to.equal("sw8 5pz");
            result = postcodeUtils.normalizePostcode("se15 2pq");
            expect(result).to.equal("se152pq");
        });


    });
});