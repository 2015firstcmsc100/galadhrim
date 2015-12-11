var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');


exports.findEmployees = function(req, res, next) {
	db.query("SELECT * FROM employee", function(err, rows) {
		if (err) res.send(400, {message: 'Bad Request.'});
		else {
			res.send(200, rows);
		}
	});
};

exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM employee WHERE _id=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Employee not found.'});
		} else {
			res.send(rows[0]);
		}
	});
};


exports.insert = function(req, res, next) {
	if (!req.body.firstName) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: firstName'});
	}
	if (!req.body.lastName) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: lastName'});
	}
	if (!req.body.unitId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: unitId'});
	}
	
	db.query("INSERT INTO employee (firstName, middleName, lastName, unitId) VALUES(?, ?, ?, ?)", [req.body.firstName, req.body.middleName, req.body.lastName, req.body.unitId], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.send(400, {message: 'Employee (' + row.insertId + ') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

exports.remove = function(req, res, next) {
	db.query("UPDATE employee SET _recStatus = 'Deleted' WHERE _id=?", [req.params.id], function(err, row) {
		if(err) return next(err);
		if(row.length === 0){
			res.send(404, {message: 'Employee ('+req.params.id+') was not removed. '})
		}else{
			selectOne(req.params.id, function(updatedRow){
				res.status(202).send(updatedRow);
			});
		}
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM employee WHERE _id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
};

