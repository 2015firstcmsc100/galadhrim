var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.findOne = function (req, res, next) {
	db.query("SELECT * FROM unit WHERE id=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404);
			res.send({message: 'Unit not found.'});
		} else {
			res.status(200);
			res.send(rows[0]);
		}
	});
}
