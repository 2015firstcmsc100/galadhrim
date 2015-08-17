var mysql = require('mysql'),
	config = require(__dirname + '/../../config/config').db;

	console.log(config);

	db = mysql.createConnection({
		host     : config.host,
		user     : config.user,
		password : config.pass,
		database : config.name
});

module.exports = db;