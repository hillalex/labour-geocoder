create table postcode(
        postcode varchar(10) unique primary key,
        northing integer,
        easting integer,
        longitude decimal(18,6),
        latitude decimal(18,6),
        location geometry
);

create table area(
        ONSCode varchar(255) primary key,
        areaTypeId integer references areaTypes (areaTypeId),
        name varchar(255),
        location geometry
);

create table entity(
        ONSCode varchar(255) primary key,
        entityTypeId integer references entityTypes (entityTypeId),
        name varchar(255),
        location geometry
);

create table areasForPostcodes(
        ONSCode varchar(255) references area (ONSCode),
        postcode varchar(10) references postcode (postcode),
        areaTypeId integer references areaType (areaTypeId),
        name varchar(255)
);

create table entityType(
    entityTypeId serial primary key,
    entityTypeName varchar(255)
);

create table areaType(
    areaTypeId serial primary key,
    areaTypeName varchar(255)
);

create table statistics(
        statTypeId integer references statType (statTypeId),
        ONSCode varchar(255),
        value varchar(255),
        date timestamp
);

create table statType(
    statTypeId serial primary key,
    statTypeName varchar(255),
    dataTypeId integer references dataType (dataTypeId)
);

create table dataType(
    dataTypeId serial primary key,
    dataTypeName varchar(100)
);