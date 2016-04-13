#Localised data on Tory cuts

Data on CCG codes, names and boundaries from: https://www.england.nhs.uk/resources/ccg-maps/

Data on UK postcodes from the OS: https://www.ordnancesurvey.co.uk/business-and-government/products/code-point-open.html

All other data from the ONS

##To Create Postgres Db
Follow instructions here to install postgres: https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html

- Create a database and user (locally we've called our db uk_cuts and are using a user called postgres)

- So you don't get prompted for a password each time, set the variable PGPASSWORD to your user password

- Run SQL in this order
``` 
$ cd path/to/labour-geocoder/sql
$ psql -U postgres -d uk_cuts -a -f tables.sql
$ psql -U postgres -d uk_cuts -a -f populateTypes.sql

$ psql -U postgres -d uk_cuts -a -f populate*.sql

$ cd path/to/labour-geocoder/sql/postcodes
$ for i in $(ls); do psql -U postgres -d uk_cuts -f $i; done

$ psql -U postgres -d uk_cuts -a -f createLatLngs.sql

$ cd path/to/labour-geocoder/sql/la
$ for i in $(ls); do psql -U postgres -d uk_cuts -f $i; done

$ cd path/to/labour-geocoder/sql/counties
$ for i in $(ls); do psql -U postgres -d uk_cuts -f $i; done

$ cd path/to/labour-geocoder/sql/areaLookup
$ for i in $(ls); do psql -U postgres -d uk_cuts -f $i; done

```

##To Run

Install dependencies and start app using npm
```
$ cd path/to/labour-geocoder
$ npm install
$ npm start
```

##Endpoints
- postcode latitude/longitude and all admin areas: /search/[POSTCODE]
- localauthority by postcode: /search/trust/[POSTCODE]
- county by postcode: /search/county/[POSTCODE]
- CCG by postcode: /search/ccg/[POSTCODE]
- nearest NHS Trust by postcode: /search/trust/[POSTCODE]

##Legacy Endpoints
- postcode latitude/longitude/northing/easting details: /v1/search/[POSTCODE]
- local authority by postcode, including cuts data: /v1/search/localauthority/[POSTCODE]
- county by postcode, including cuts data: /v1/search/county/[POSTCODE]
- local authority by onscode, including cuts data: /v1/localcuts/[POSTCODE]
- county by onscode, including cuts data: /v1/localcuts/county/[POSTCODE]