#How Sick Is Your NHS?

Data on CCG codes, names and boundaries from: https://www.england.nhs.uk/resources/ccg-maps/
Data on UK postcodes from the OS: https://www.ordnancesurvey.co.uk/business-and-government/products/code-point-open.html

##To Create Index
Follow instructions here to install elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html

- Create index:
```$ curl -XPUT 'http://localhost:9200/nhs/'```

- Populate index with postcode data:
```/path/to/nhs-api/json/postcodes
$ for i in $(ls); do curl -s -XPOST 'http://localhost:9200/nhs/postcodes/_bulk' --data-binary @$i; done
```

- Populate index with CCG data:
```/path/to/nhs-api/json
$ curl -s -XPOST 'http://localhost:9200/nhs/ccg/_bulk' --data-binary @docs.json
```

