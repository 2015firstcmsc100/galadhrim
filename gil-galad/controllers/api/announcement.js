var logger = require(__dirname + '/../../../lib/logger'),
    db = require(__dirname + '/../../lib/mysql');
var async = require('async');

exports.insert = function(req, res, next) {
	if (!req.params.userId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: userId'});
	}
	if (!req.params.title) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: title'});
	}
	if (!req.params.description) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: description'});
	}
  if (!req.params.datePosted) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: datePosted'});
	}
  if (!req.params.expiryDate) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: expiryDate'});
	}

	db.query("INSERT INTO announcement(userId, title, description, datePosted, expiryDate) VALUES(?, ?, ?, ?, ?)", [req.params.userId, req.params.title, req.params.description, req.params.datePosted, req.params.expiryDate], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.send(400, {message: 'Announcement ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM announcement WHERE id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}

exports.findOne = function (req, res, next) {
	db.query("SELECT * FROM announcement WHERE _id=? LIMIT 1", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404);
			res.send({message: 'Announcement not found.'});
		} else {
			res.status(200);
			res.send(rows[0]);
		}
	});
}

exports.find = function (req, res, next) {
	db.query("SELECT * FROM announcement ",  function(err, rows) {
		if (err) return next(err);
		 else {
			res.status(200);
			res.send(rows);
		}
	});
};

exports.remove = function(req, res) {

	//Use async to avoid callback hell
	/*
		1) Checks if there is a row with id req.params.id and is active. If not, return 404 (2nd callback)
		2) If it exists, it sets _recStatus to inactive
		3) Select the newly edited row and throw it to user
	*/
	async.waterfall([
		function(callback) {
			db.query("SELECT COUNT (*) as count FROM announcement WHERE _recStatus = 'ACTIVE' AND _id = ?",
			[req.params.id], function(err, rows) {		
				if(err) {
					callback(err, null);
				} else {
					callback(null, rows);	
				}

			});
		}, function(data, callback) {
			// callback(null, data[0]);
			if(data[0].count === 0) {
				callback(404, null);
			} else {
				callback(null, true);
			}
		}, function(data, callback) {
			db.query("UPDATE announcement SET _recStatus = 'INACTIVE' WHERE _id = ?",
				[req.params.id], function(err, rows) {
					if(err) {
						callback(err, null);
					} else {
						callback(null, true);	
					}
			});
		}, function(data, callback) {
			db.query("SELECT * FROM announcement WHERE _recStatus = 'INACTIVE' AND _id = ?",
				[req.params.id], function(err, rows) {
					if(err) {
						callback(err, null);
					} else {
						callback(null, rows[0]);	
					}
			});
		}
	], function(err, data) {
		if(err) {
			res.send(err);
		} else {
			res.send(data);
		}
	});
};