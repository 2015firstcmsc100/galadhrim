var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM course", function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'No course found.'});
		} else {
			res.send(rows);
		}
	});
};