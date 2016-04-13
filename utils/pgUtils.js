var pgp = require('pg-promise')();

exports.geom = function (place) {
    place.latitude = parseFloat(place.latitude);
    place.longitude = parseFloat(place.longitude);

    return {
        _rawDBType: true,
        formatDBType: function () {
            return pgp.as.format("ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)", place);
        }
    }
};

exports.areaTypeId = function (typeName) {
    return "(select areaTypeId from areaType where areaTypeName = '" + typeName + "')";
};

exports.entityTypeId = function (typeName) {
    return "(select entityTypeId from entityType where entityTypeName = '" + typeName + "')";
};

exports.selectAreaSqlString = function (typeName, includeLocation) {

    var sql = "SELECT a.name, a.onscode";

    if (includeLocation)
    sql += ",ST_AsGeoJSON(a.location) as location";

    sql+= " from areasForPostcodes ap join area a on ap.onscode = a.onscode" +
        " where a.areaTypeId = " +
        exports.areaTypeId(typeName)
        + " and ap.postcode=$1";

    return sql;
};

exports.geocodeAreaSqlString = function (typeName, includeLocation) {

    var sql = "SELECT name, onscode";

    if (includeLocation)
        sql += ",ST_AsGeoJSON(location) as location";

    sql+= " from area where areaTypeId = " +
        exports.areaTypeId(typeName)
        + " and ST_contains(location,  $1)";

    return sql;
};

exports.geocodeEntitySqlString = function(typeName, includeLocation){
    var sql= "SELECT name, onscode";

    if (includeLocation)
        sql+=",ST_AsGeoJSON(location) as location";

    sql+= " from entity where entityTypeId = " +
        exports.entityTypeId(typeName)
        + " ORDER BY ST_Distance(location, $1) LIMIT 1;";

    return sql;
};