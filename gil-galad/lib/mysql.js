var mysql = require('mysql'),
	logger = require(__dirname + '/../../lib/logger'),
	config = require(__dirname + '/../../config/config').db;

	logger.log('info', 'Connecting to database at ' + config.host);

	db = mysql.createConnection({
		host     : config.host,
		user     : config.user,
		password : config.pass,
		database : config.name
	});

module.exports = db;