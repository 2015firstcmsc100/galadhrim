var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');


exports.findOne = function (req, res, next) {
	db.query("SELECT * FROM room WHERE _id=?  and _recStatus='ACTIVE' LIMIT 1", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404);
			res.send({message: 'Room not found.'});
		} else {
			res.status(200);
			res.send(rows[0]);
		}
	});
}

exports.find = function (req, res, next) {
	db.query("SELECT * FROM room",  function(err, rows) {
		if (err) return next(err);
		else {
			res.status(200);
			res.send(rows);
		}
	});
}
