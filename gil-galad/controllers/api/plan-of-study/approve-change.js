var logger = require(__dirname + '../../../../lib/logger'),
    db = require(__dirname + '../../../lib/mysql');

exports.update = function(req, res, next) {
	db.query("UPDATE plan_of_study SET isApproved = 'APPROVED', _updated = now() WHERE _id = ?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};
