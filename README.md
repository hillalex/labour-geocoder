#Localised data on Tory cuts

Data on CCG codes, names and boundaries from: https://www.england.nhs.uk/resources/ccg-maps/

Data on UK postcodes from the OS: https://www.ordnancesurvey.co.uk/business-and-government/products/code-point-open.html

All other data from the ONS

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

##To Create Postgres Db
Follow instructions here to install postgres: https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html

- Create a database and user (locally we've called our db uk_cuts and are using a user called postgres)

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

##Endpoints
- postcode latitude/longitude/northing/easting details: /search/[POSTCODE]
- nearest NHS Trust by postcode, including financial risk rating: /search/trust/[POSTCODE]
- CCG by postcode: /search/ccg/[POSTCODE]
- local authority by postcode, including cuts data: /search/localauthority/[POSTCODE]
- 5 closest local authorities by postcode, including cuts data: /localcuts/nearby/[POSTCODE]
- data on best off local authority in terms of percentage cuts in a region: /localcuts/bestoff/[REGION]
- data on best off local authority in absolute terms in a region: /localcuts/bestoffabsolute/[REGION]
- data on local authority by onscode: /localcuts/[ONSCODE]
