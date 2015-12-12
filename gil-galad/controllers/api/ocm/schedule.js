var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');

exports.find = function(req, res, next) {
	db.query("select * from slot where status like ("ENLISTED" or "RESERVED") and studentId=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Schedule not found.'});
		} else {
			res.send(rows[0]);
		}
	});
};
