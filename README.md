#Localised data on Tory cuts

Data on CCG codes, names and boundaries from: https://www.england.nhs.uk/resources/ccg-maps/

Data on UK postcodes from the OS: https://www.ordnancesurvey.co.uk/business-and-government/products/code-point-open.html

Data on Local Authority cuts from Local Authority 2011-2012 Spending power, House of Commons library, April 2016 and Core spending power: local government finance settlement, DCLG, December 2015

All other data from the ONS

##Option to use either Elasticsearch or PostGres middleware (work in progress)

##To Create PostGres Db
Follow instructions here to install PostGres and PostGis: http://www.postgresql.org/download/ http://postgis.net/install/

- Create a database and user (locally we've called our db uk_cuts and are using a user called postgres) and enable the PostGis extension

- So you don't get prompted for a password each time, set the variable PGPASSWORD to your user password

- Add tables and stored procedures
``` 
$ cd path/to/labour-geocoder/sql
$ psql -U postgres -d uk_cuts -a -f tables.sql
$ psql -U postgres -d uk_cuts -a -f sprocs.sql
```

- Populate table with postcode data:
``` 
$ cd path/to/labour-geocoder/sql/postcodes
$ for i in $(ls); do psql -U postgres -d uk_cuts -a -f $i; done
```

- Populate table with localauthority data:
```
$ cd path/to/labour-geocoder/sql/localauthorities
$ for i in $(ls); do psql -U postgres -d uk_cuts -a -f $i; done
```

##To Run

Install dependencies and start app using npm
```
$ cd path/to/labour-geocoder
$ npm install
$ npm start
```

##To Create Elasticsearch Index 
Follow instructions here to install elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html

- Create index:
```$ curl -XPUT 'http://localhost:9200/nhs/'```

- Add mappings:
```
$ cd path/to/labour-geocoder/json/mappings
$ curl -s -XPOST 'http://localhost:9200/nhs/postcode/_mapping' --data-binary @postcode.json
$ curl -s -XPOST 'http://localhost:9200/nhs/ccg/_mapping' --data-binary @ccg.json
$ curl -s -XPOST 'http://localhost:9200/nhs/trust/_mapping' --data-binary @trust.json
$ curl -s -XPOST 'http://localhost:9200/nhs/localauthority/_mapping' --data-binary @la.json
```

- Populate index with postcode data:
``` 
$ cd path/to/labour-geocoder/json/postcodes
$ for i in $(ls); do curl -s -XPOST 'http://localhost:9200/nhs/postcode/_bulk' --data-binary @$i; done
```

- Populate index with CCG data:
```
$ cd path/to/labour-geocoder/json
$ curl -s -XPOST 'http://localhost:9200/nhs/ccg/_bulk' --data-binary @ccgs.json
```

- Populate index with NHS Trust data:
```
$ cd path/to/labour-geocoder/json
$ curl -s -XPOST 'http://localhost:9200/nhs/trust/_bulk' --data-binary @trusts.json
```

- Populate index with Local Authority data:
```
$ cd path/to/labour-geocoder/json/localauthorities
$ for i in $(ls); do curl -s -XPOST 'http://localhost:9200/nhs/localauthority/_bulk' --data-binary @$i; done
```

##Endpoints
- postcode latitude/longitude/northing/easting details: /search/[POSTCODE] (works with either middleware)
- nearest NHS Trust by postcode, including financial risk rating: /search/trust/[POSTCODE] (only works with Elasticsearch)
- CCG by postcode: /search/ccg/[POSTCODE]  (only works with Elasticsearch)
- local authority by postcode, including cuts data: /search/localauthority/[POSTCODE]  (works with either middleware)
- county by postcode, including cuts data: /search/county/[POSTCODE]  (only works with PostGis)
- local authority by onscode, including cuts data: /localcuts/[POSTCODE]  (only works with PostGis)
- county by onscode, including cuts data: /localcuts/county/[POSTCODE]  (only works with PostGis)
- 5 closest local authorities by postcode, including cuts data: /localcuts/nearby/[POSTCODE]  (only works with PostGis)
- data on best off local authority in terms of percentage cuts in a region: /localcuts/bestoff/[REGION]  (works with either middleware)
- data on best off local authority in absolute terms in a region: /localcuts/bestoffabsolute/[REGION]  (works with either middleware)
- data on local authority by onscode: /localcuts/[ONSCODE]  (only works with PostGis)
