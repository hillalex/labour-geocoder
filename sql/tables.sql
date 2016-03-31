create table ccg(
      name varchar(255),
      CCGcode varchar(255),
      location geometry(MultiPolygon, 4326)
);

create table localauthority(
    name varchar(255),
    region varchar(255),
    totalcuts decimal(18,6),
    percentagecuts decimal(18,6),
    perhouseholdcuts decimal(18,6)
    onscode varchar(10),
    location geometry(MultiPolygon, 4326)
);

create table postcode(
        postcode varchar(10),
        northing integer,
        easting integer,
        longitude decimal(18,6),
        latitude decimal(18,6)
);

create table trust(
        name varchar(10),
        location geometry(Point, 4326)
);


create table county(
        name varchar(255),
        onscode varchar(10),
        totalcuts decimal(18,6),
        percentagecuts decimal(18,6),
        perhouseholdcuts decimal(18,6),
        location geometry(MultiPolygon, 4326)
);