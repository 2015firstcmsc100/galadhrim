var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM curriculum", function(err, rows) {
		if (err) return next(err);
			res.status(200);
			res.send(rows);
	});
};


var selectOne = function(id, callback) {
	db.query("SELECT * FROM curriculum WHERE _id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);

		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
};


exports.update = function(req, res, next) {
	db.query("UPDATE curriculum SET ?, code = ?, name = ? WHERE _id=?", [req.body, req.params.code, req.params.name, req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(updated) {
			if (updated == null) {
				res.send(404, {message: 'Curriculum ('+req.params.id+') was not found.'});
			}
			if (!updated) {
				res.send(400, {message: 'Curriculum ('+req.params.id+') was not updated.'});
			} else {
				res.send(updated);
			}
		});
	});
};
