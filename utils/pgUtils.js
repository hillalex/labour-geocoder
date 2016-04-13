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

exports.typeId = function (typeName) {
    return "(select entityTypeId from entityType where entityTypeName = '" + typeName + "')";
};

exports.selectAreaSqlString = function (typeName, includeLocation) {

    var sql = "SELECT name, onscode";

    if (includeLocation)
    sql += ",ST_AsGeoJSON(location) as location";

    sql+= " from area where areaTypeId = " +
        exports.typeId(typeName)
        + " and ST_contains(location,  $1)";

    return sql;
};

exports.selectEntitySqlString = function(typeName, includeLocation){
    var sql= "SELECT name, onscode";

    if (includeLocation)
        sql+=",ST_AsGeoJSON(location) as location";

    sql+= " from entity where entityTypeId = " +
        exports.typeId(typeName)
    + " ORDER BY ST_Distance(location, $1) LIMIT 1;";

    return sql;
};