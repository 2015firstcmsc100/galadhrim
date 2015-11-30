var logger = require(__dirname + '/../../lib/logger'),
    db = require(__dirname + '/../lib/mysql');


exports.find = function(req, res, next) {
	db.query("SELECT * FROM curriculum", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};


exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM curriculum WHERE id=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Curriculum not found.'});
		} else {
			res.send(rows[0]);
		}
	});
};

exports.insert = function(req, res, next) {
	if (!req.body.code) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: code'});
	}
	if (!req.body.name) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: name'});
	}
	if (!req.body.degreeProgramId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: degreeProgramId'});
	}
	
	db.query("INSERT INTO curriculum(code, name, degreeProgramId) VALUES(?, ?, ?)", [req.body.code, 		req.body.name, req.body.degreeProgramId], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.send(552, {message: 'Curriculum ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};


exports.update = function(req, res, next) {
	db.query("UPDATE curriculum SET ? WHERE _id=?", [req.body, req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(updatedRow) {
			if (!updatedRow) {
				res.send(553, {message: 'Curriculum ('+req.params.id+') was not updated.'});
			} else {
				res.send(updatedRow);
			}
		});
	});
};


exports.remove = function(req, res, next) {
	db.query("DELETE FROM curriculum WHERE _id=?", [req.params.id], function(err, row) {
		if (err) return next(err);
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Curriculum ('+req.params.id+') was not removed.'});
		} else {
			res.send(202, row);
		}
		
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
}
