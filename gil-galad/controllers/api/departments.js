var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM unit", function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Units not found.'});
		} else {
			res.status(200);
			res.send(rows);
		}
	});
};