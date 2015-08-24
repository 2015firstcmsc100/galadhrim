var	logger = require(__dirname + '/../../lib/logger'),
    db = require(__dirname + '/../lib/mysql');


exports.find = function(req, res, next) {
	db.query("SELECT * FROM degree_program", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};


exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM degree_program WHERE id=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Degree program not found.'});
		} else {
			res.send(rows[0]);
		}
	});
};


exports.insert = function(req, res, next) {
	if (!req.body.code) {
		return res.send(551, {'error': true, 'message': 'Missing parameter: code'});
	}
	if (!req.body.name) {
		return res.send(551, {'error': true, 'message': 'Missing parameter: name'});
	}
	console.log(req.body);
	db.query("INSERT INTO degree_program(code, name) VALUES(?, ?)", [req.body.code, req.body.name], function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};


exports.update = function(req, res, next) {
	db.query("UPDATE degree_program SET code=?, name=? WHERE id=?", [req.body.code, req.body.name, req.params.id], function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};


exports.remove = function(req, res, next) {
	db.query("DELETE FROM degree_program WHERE id=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};