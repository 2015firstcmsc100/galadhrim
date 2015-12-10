var logger = require(__dirname + '/../../../../lib/logger'),
	db = require(__dirname + '/../lib/mysql');
	
exports.update = function(req, res, next) {
	db.query("UPDATE role SET ? WHERE userId=? && _id=?", [req.body, req.params.userId, req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.userId, req.params.id, function(updatedRow) {
			if (!updatedRow) {
				res.send(400, {message: 'Role was not updated.'});
			} else {
				res.send(200, updatedRow);
			}
		});
	});
};

var selectOne = function(id, userId, callback) {
	db.query("SELECT * FROM role WHERE userId=? && _id=? LIMIT 1", [userId], [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}
