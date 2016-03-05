#How Sick Is Your NHS?

Data on CCG codes, names and boundaries from: https://www.england.nhs.uk/resources/ccg-maps/

Data on UK postcodes from the OS: https://www.ordnancesurvey.co.uk/business-and-government/products/code-point-open.html

##To Create Index
Follow instructions here to install elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html

- Create index:
```$ curl -XPUT 'http://localhost:9200/nhs/'```

- Add mappings:
```
$ cd path/to/nhs-api/json/mappings
$ curl -s -XPOST 'http://localhost:9200/nhs/postcode/_mapping' --data-binary @postcode.json
$ curl -s -XPOST 'http://localhost:9200/nhs/ccg/_mapping' --data-binary @ccg.json
$ curl -s -XPOST 'http://localhost:9200/nhs/trust/_mapping' --data-binary @trust.json
```

- Populate index with postcode data:
``` 
$ cd path/to/nhs-api/json/postcodes
$ for i in $(ls); do curl -s -XPOST 'http://localhost:9200/nhs/postcode/_bulk' --data-binary @$i; done
```

- Populate index with CCG data:
```
$ cd path/to/nhs-api/json
$ curl -s -XPOST 'http://localhost:9200/nhs/ccg/_bulk' --data-binary @ccgs.json
```

- Populate index with NHS Trust data:
```
$ cd path/to/nhs-api/json
$ curl -s -XPOST 'http://localhost:9200/nhs/trust/_bulk' --data-binary @trusts.json
```

##To Run

Install dependencies and start app using npm
```
$ cd path/to/nhs-api
$ npm install
$ npm start
```

##Endpoints
- postcode latitude/longitude/northing/easting details: /search/[POSTCODE]
- nearest NHS Trust by postcode: /search/[POSTCODE]
- CCG by postcode: /search/trust/[POSTCODE]