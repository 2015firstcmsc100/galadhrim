var logger = require(__dirname + '/../../../../lib/logger'),
    db = require(__dirname + '/../../../lib/mysql');

exports.update = function(req, res, next) {
	db.query("UPDATE slot SET status = 'RESERVED', _updated = now() WHERE studentId = ?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};
