#Labour Geocoder

Data on CCG codes, names and boundaries from: https://www.england.nhs.uk/resources/ccg-maps/

Data on UK postcodes and admin zones from the OS: https://www.ordnancesurvey.co.uk/business-and-government/products/code-point-open.html

Data on Local Authority cuts from Local Authority 2011-2012 Spending power, House of Commons library, April 2016 and Core spending power: local government finance settlement, DCLG, December 2015

All other data from the ONS

##To Create Postgres Db
Follow instructions here to install PostGres and PostGis: http://www.postgresql.org/download/ http://postgis.net/install/

- Create a database and user (locally we've called our db geocoder and are using a user called postgres)

- So you don't get prompted for a password each time, set the variable PGPASSWORD to your user password

- Run SQL in this order
``` 
$ cd path/to/labour-geocoder/sql
$ psql -U postgres -d geocoder -a -f tables.sql
$ psql -U postgres -d geocoder -a -f populateTypes.sql

$ psql -U postgres -d geocoder -a -f populate*.sql

$ cd path/to/labour-geocoder/sql/postcodes
$ for i in $(ls); do psql -U postgres -d geocoder -f $i; done

$ psql -U postgres -d geocoder -a -f createLatLngs.sql

$ cd path/to/labour-geocoder/sql/la
$ for i in $(ls); do psql -U postgres -d geocoder -f $i; done

$ cd path/to/labour-geocoder/sql/counties
$ for i in $(ls); do psql -U postgres -d geocoder -f $i; done

$ cd path/to/labour-geocoder/sql/areaLookup
$ for i in $(ls); do psql -U postgres -d geocoder -f $i; done
```

##To Run

Install dependencies and start app using npm
```
$ cd path/to/labour-geocoder
$ npm install
$ npm start
```

##Endpoints
Append "?location=true" to include GeoJson location with each response:
- postcode latitude/longitude and all admin areas: /search/[POSTCODE]
- localauthority by postcode: /search/localauthority/[POSTCODE]
- county by postcode: /search/county/[POSTCODE]
- CCG by postcode: /search/ccg/[POSTCODE]
- nearest NHS Trust by postcode: /search/trust/[POSTCODE]


##Legacy Endpoints
- postcode latitude/longitude/northing/easting details: /v1/search/[POSTCODE]
- local authority by postcode, including cuts data: /v1/search/localauthority/[POSTCODE]
- county by postcode, including cuts data: /v1/search/county/[POSTCODE]
- local authority by onscode, including cuts data: /v1/localcuts/[POSTCODE]
- county by onscode, including cuts data: /v1/localcuts/county/[POSTCODE]