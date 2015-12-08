var	logger = require(__dirname + '/../../lib/logger'),
    db = require(__dirname + '/../lib/mysql');


exports.update = function(req, res, next) {
	db.query("UPDATE employee SET ? WHERE id=?", [req.body, req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(updated) {
			if (!updated) {
				res.send(400, {message: 'Update Unsuccessfull'});
			} else {
				res.send(updatedRow);
			}
		});
	});
};