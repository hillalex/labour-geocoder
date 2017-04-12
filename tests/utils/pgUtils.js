var expect = require("chai").expect;

var pgUtils = require("../../utils/pgUtils");

describe("PostgresUtils", function () {
    describe("#normalizePostcode()", function () {
        it("should return sql query for getting areaTypeId", function () {

            var result = pgUtils.areaTypeId("test");
            expect(result).to.equal("(select areaTypeId from areaType where areaTypeName = 'test')");

        });

        it("should return sql query for getting entityTypeId", function () {

            var result = pgUtils.entityTypeId("test");
            expect(result).to.equal("(select entityTypeId from entityType where entityTypeName = 'test')");

        });

        it("should return sql query for getting area with location by postcode", function () {

            var result = pgUtils.selectAreaSqlString("test", true);
            expect(result).to.equal("SELECT a.name, a.onscode, ST_AsGeoJSON(a.location) as location"
                + " from areasForPostcodes ap join area a on ap.onscode = a.onscode" +
                " where a.areaTypeId = (select areaTypeId from areaType where areaTypeName = 'test')"
                + " and ap.postcode=$1");

        });

        it("should return sql query for getting area without location by postcode", function () {

            var result = pgUtils.selectAreaSqlString("test", false);
            expect(result).to.equal("SELECT a.name, a.onscode"
                + " from areasForPostcodes ap join area a on ap.onscode = a.onscode" +
                " where a.areaTypeId = (select areaTypeId from areaType where areaTypeName = 'test')"
                + " and ap.postcode=$1");

        });

        it("should return sql query for getting area with location by location", function () {

            var result = pgUtils.geocodeAreaSqlString("test", true);
            expect(result).to.equal("SELECT name, onscode, ST_AsGeoJSON(location) as location"
                + " from area where areaTypeId = (select areaTypeId from areaType where areaTypeName = 'test')"
                + " and ST_contains(location,  $1)");

        });

        it("should return sql query for getting area without location by location", function () {

            var result = pgUtils.geocodeAreaSqlString("test", false);
            expect(result).to.equal("SELECT name, onscode"
                + " from area where areaTypeId = (select areaTypeId from areaType where areaTypeName = 'test')"
                + " and ST_contains(location,  $1)");

        });

        it("should return sql query for getting entity with location by location", function () {

            var result = pgUtils.geocodeEntitySqlString("test", true);
            expect(result).to.equal("SELECT name, onscode, ST_AsGeoJSON(location) as location"
                + " from entity where entityTypeId = (select entityTypeId from entityType where entityTypeName = 'test')"
                + " ORDER BY ST_Distance(location, $1) LIMIT 1;");
        });

        it("should return sql query for getting entity without location by location", function () {

            var result = pgUtils.geocodeEntitySqlString("test", false);
            expect(result).to.equal("SELECT name, onscode"
                + " from entity where entityTypeId = (select entityTypeId from entityType where entityTypeName = 'test')"
                + " ORDER BY ST_Distance(location, $1) LIMIT 1;");
        });

    });
});