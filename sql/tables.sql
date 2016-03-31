create database local_cuts;

use database local_cuts;

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
    onscode varchar(10),
    location geometry(MultiPolygon, 4326)
);

create table postcode(
        postcode varchar(10),
        longitude decimal(18,6),
        latitude decimal(18,6),
);

create table trust(
        name varchar(10),
        location geometry(Point, 4326)
);


