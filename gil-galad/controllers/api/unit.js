var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');

exports.findOne = function (req, res, next) {
	db.query("SELECT * FROM unit WHERE _id=? LIMIT 1", [req.params.id], function(err, rows) {
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


exports.remove = function(req, res, next) {
	db.query("UPDATE unit SET _recStatus='Deleted' WHERE _id=?", [req.params.id], function(err, row) {
		if (err) return next(err);
		if (row.affectedRows === 0) {
			res.send(400, {message: 'Unit ('+req.params.id+') was not removed.'});
		} else{
			selectOne(req.params.id, function(updatedRow){
				res.status(202).send(updatedRow);
			});
		}
		
	});
};

// Update unit
exports.update = function(req, res, next) {
	db.query("UPDATE unit SET ? WHERE _id=?", [req.body, req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(updatedRow) {
			if (!updatedRow) {
				res.send(553, {message: 'Unit ('+req.params.id+') was not updated.'});
			} else {
				res.send(updatedRow);
			}
		});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM unit WHERE _id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}
