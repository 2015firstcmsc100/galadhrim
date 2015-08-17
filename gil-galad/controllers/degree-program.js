var	logger = require(__dirname + '/../../lib/logger'),
    db = require(__dirname + '/../lib/mysql');


exports.find = function(req, res, next) {
	db.query("SELECT * FROM degree_program", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};