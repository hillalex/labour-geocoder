var path = require('path');
var fs = require('fs');

var env = process.env['NODE_ENV'] || 'development';
var json_path = path.join(__dirname, '/config', env + '.json');

var config = JSON.parse(fs.readFileSync(json_path));
config.port = process.env.PORT || config.port;
config.ip = process.env.IP || config.port;
config.siteUrl = process.env.port || config.siteUrl;
config.elasticHost = process.env.elasticHost || config.elasticHost;
config.whitelist = process.env.whitelist || config.whitelist;
config.env = env;

module.exports = config;