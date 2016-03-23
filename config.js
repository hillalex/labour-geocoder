var path = require('path');
var fs = require('fs');

var env = process.env['NODE_ENV'] || 'development';
var json_path = path.join(__dirname, '/config', env + '.json');
var config = {};

if (env == "development")
    config = JSON.parse(fs.readFileSync(json_path));

else
    config = process.env;

config.env = env;

console.log(config.env, config.PORT, config.IP);

module.exports = config;